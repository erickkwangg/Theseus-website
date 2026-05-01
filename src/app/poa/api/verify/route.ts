// POST /poa/api/verify — programmatic credential verification.
// Accepts a JWS (in body or as plain text) and returns a structured report.
// Anyone can call this — no auth, no rate-limiting at v1 (would add at scale).

import { NextResponse } from "next/server";
import { verifyCredential } from "@/lib/poa/credential";
import { credentialStore } from "@/lib/poa/store";
import { getChainReader, chainMode } from "@/lib/poa/chain";
import { evaluateRevocation } from "@/lib/poa/revocation";

type VerifyBody = { jws?: unknown };

type VerifyResult = {
  valid: boolean;
  reason?: string;
  // Present when valid is true
  claims?: unknown;
  jti?: string;
  agentId?: string;
  issuedAt?: number;
  // Present if we can also reach the chain to assess freshness
  freshness?:
    | { status: "current" }
    | { status: "revoked"; reason: string }
    | { status: "unknown"; detail: string };
  // Bookkeeping
  issuer?: string;
  kid?: string;
};

export async function POST(req: Request) {
  let jws: string | null = null;
  const ct = (req.headers.get("content-type") ?? "").toLowerCase();
  try {
    if (ct.includes("application/jose") || ct.includes("application/jwt") || ct.startsWith("text/")) {
      jws = (await req.text()).trim();
    } else {
      const body = (await req.json()) as VerifyBody;
      if (typeof body.jws === "string") jws = body.jws.trim();
    }
  } catch {
    return NextResponse.json({ valid: false, reason: "invalid-body" }, { status: 400 });
  }
  if (!jws) {
    return NextResponse.json({ valid: false, reason: "jws-required" }, { status: 400 });
  }

  const result = await verifyCredential(jws);
  if (!result.valid) {
    return NextResponse.json(
      { valid: false, reason: result.reason } satisfies VerifyResult,
      { status: 400 },
    );
  }

  const claims = result.claims;
  const out: VerifyResult = {
    valid: true,
    claims,
    jti: claims.jti,
    agentId: claims.sub,
    issuedAt: claims.iat * 1000,
    issuer: claims.iss,
    kid: "theseus-poa-2026-04",
  };

  // Try to assess freshness against the local revocation list and against the
  // chain (if reachable). Failure here doesn't invalidate the credential —
  // the JWS is signature-valid; we just can't say whether it's still current.
  const stored = credentialStore.get(claims.jti);
  if (stored?.revoked) {
    out.freshness = { status: "revoked", reason: stored.revoked.reason };
  } else {
    try {
      if (chainMode() === "polkadot" || chainMode() === "fixture") {
        const reader = getChainReader();
        // Use the credential's stored claims as the reference snapshot for the
        // revocation check, since we may not have it in our local store
        // (the JWS could have been issued by another instance and presented here).
        const synthetic = stored ?? {
          jti: claims.jti,
          agentId: claims.sub,
          jws,
          claims,
          issuedAt: claims.iat * 1000,
          revoked: false as const,
        };
        const reason = await evaluateRevocation(reader, synthetic);
        if (reason) {
          out.freshness = { status: "revoked", reason };
        } else {
          out.freshness = { status: "current" };
        }
      }
    } catch (err) {
      const detail =
        err && typeof err === "object" && "message" in err
          ? String((err as { message: unknown }).message)
          : String(err);
      out.freshness = { status: "unknown", detail };
    }
  }

  return NextResponse.json(out);
}
