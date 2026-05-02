import { NextResponse } from "next/server";
import { credentialStore, challengeStore } from "@/lib/poa/store";
import { getChainReader } from "@/lib/poa/chain";
import {
  LIMITS,
  isBoundedString,
  isHexString,
  looksLikeSs58,
} from "@/lib/poa/validation";
import { events, hashIp, ipFromRequest } from "@/lib/poa/events";
import { checkRateLimit, rateLimited } from "@/lib/poa/ratelimit";

// POST /poa/api/revoke
//
// Controller-gated revocation. The operator obtains a challenge nonce from
// /poa/api/challenge (same flow as create), signs `poa-revoke:<agentId>:<nonce>`
// with the controller key, and posts (agentId, nonce, signatureHex) here. We:
//
//   1. consume the challenge (atomic via the store's getdel semantics)
//   2. look up the active credential for the agent
//   3. ask the chain reader to verify the signature against the agent's
//      on-chain controller (FixtureChainReader uses the demo "OK:..." rule;
//      PolkadotChainReader uses sr25519 via @polkadot/util-crypto)
//   4. mark the credential revoked with reason "operator-revoked"
//
// Failure modes are explicit:
//   - 400: validation, expired challenge, unknown nonce, agent without
//     credential, bad signature
//   - 503: store or chain unreachable

const REVOKE_PREFIX = "poa-revoke";

function errMsg(err: unknown): string {
  return err && typeof err === "object" && "message" in err
    ? String((err as { message: unknown }).message)
    : String(err);
}

type Body = {
  agentId?: unknown;
  nonce?: unknown;
  signatureHex?: unknown;
};

export async function POST(req: Request) {
  // Revoke is gated by a controller signature already; the rate limit is
  // mostly to avoid challenge-spamming. 10 per 5 minutes is plenty.
  const rl = await checkRateLimit(req, {
    route: "revoke",
    limit: 10,
    windowSec: 300,
  });
  if (!rl.allowed) {
    const out = rateLimited(rl);
    return NextResponse.json(out.body, {
      status: out.status,
      headers: out.headers,
    });
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid-json" }, { status: 400 });
  }
  if (!isBoundedString(body.agentId, LIMITS.agentId)) {
    return NextResponse.json({ error: "agentId-required" }, { status: 400 });
  }
  if (!looksLikeSs58(body.agentId)) {
    return NextResponse.json(
      { error: "agentId-invalid-format" },
      { status: 400 },
    );
  }
  if (!isBoundedString(body.nonce, LIMITS.nonce)) {
    return NextResponse.json({ error: "nonce-required" }, { status: 400 });
  }
  if (!isHexString(body.signatureHex, LIMITS.signatureHex)) {
    return NextResponse.json(
      { error: "signature-malformed" },
      { status: 400 },
    );
  }
  const agentId = body.agentId;
  const nonce = body.nonce;
  const signatureHex = body.signatureHex;

  let consumed;
  try {
    consumed = await challengeStore.consume(nonce);
  } catch (err) {
    return NextResponse.json(
      { error: "store-unreachable", detail: errMsg(err) },
      { status: 503 },
    );
  }
  if (!consumed) {
    return NextResponse.json(
      { error: "challenge-expired-or-unknown" },
      { status: 400 },
    );
  }
  if (consumed.agentId !== agentId) {
    return NextResponse.json(
      { error: "challenge-agent-mismatch" },
      { status: 400 },
    );
  }

  let stored;
  try {
    stored = await credentialStore.latestByAgent(agentId);
  } catch (err) {
    return NextResponse.json(
      { error: "store-unreachable", detail: errMsg(err) },
      { status: 503 },
    );
  }
  if (!stored) {
    return NextResponse.json(
      { error: "no-active-credential" },
      { status: 400 },
    );
  }

  const reader = getChainReader();
  let snapshot;
  try {
    snapshot = await reader.getAgentSnapshot(agentId);
  } catch (err) {
    return NextResponse.json(
      { error: "chain-unreachable", detail: errMsg(err) },
      { status: 503 },
    );
  }
  if (!snapshot) {
    return NextResponse.json({ error: "agent-not-registered" }, { status: 400 });
  }

  // Sovereign agents have no controller, so they have no one authorized to
  // retire the credential through this endpoint.
  if (!snapshot.controller) {
    return NextResponse.json(
      { error: "sovereign-agent-cannot-retire" },
      { status: 400 },
    );
  }

  const message = `${REVOKE_PREFIX}:${agentId}:${nonce}`;
  let valid: boolean;
  try {
    valid = await reader.verifyControllerSignature({
      controller: snapshot.controller,
      message,
      signatureHex,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "chain-unreachable", detail: errMsg(err) },
      { status: 503 },
    );
  }
  if (!valid) {
    return NextResponse.json(
      { error: "signature-invalid" },
      { status: 400 },
    );
  }

  let revoked: boolean;
  try {
    revoked = await credentialStore.revoke(stored.jti, "operator-revoked");
  } catch (err) {
    return NextResponse.json(
      { error: "store-unreachable", detail: errMsg(err) },
      { status: 503 },
    );
  }
  if (!revoked) {
    void events.record({
      kind: "revoke.failed",
      agentId,
      outcome: "already-revoked",
      ipHash: hashIp(ipFromRequest(req)),
    });
    return NextResponse.json(
      { error: "already-revoked" },
      { status: 409 },
    );
  }

  void events.record({
    kind: "revoke.success",
    agentId,
    outcome: "operator-revoked",
    ipHash: hashIp(ipFromRequest(req)),
  });
  return NextResponse.json({
    jti: stored.jti,
    agentId,
    revokedAt: Date.now(),
    reason: "operator-revoked",
  });
}
