import { NextResponse } from "next/server";
import { getChainReader } from "@/lib/poa/chain";
import { issueCredential } from "@/lib/poa/issue";
import { challengeStore } from "@/lib/poa/store";
import { LIMITS, isBoundedString, isHexString, looksLikeSs58 } from "@/lib/poa/validation";

type IssueBody = {
  agentId?: unknown;
  controllerSig?: { nonce?: unknown; signatureHex?: unknown };
};

export async function POST(req: Request) {
  let body: IssueBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid-json" }, { status: 400 });
  }
  if (!isBoundedString(body.agentId, LIMITS.agentId)) {
    return NextResponse.json({ error: "agentId-required" }, { status: 400 });
  }
  if (!looksLikeSs58(body.agentId)) {
    return NextResponse.json({ error: "agentId-invalid-format" }, { status: 400 });
  }
  const agentId = body.agentId;

  let controllerSig: { nonce: string; signatureHex: string; signedAt: number } | undefined;
  if (body.controllerSig) {
    const { nonce, signatureHex } = body.controllerSig;
    if (
      !isBoundedString(nonce, LIMITS.nonce) ||
      !isHexString(signatureHex, LIMITS.signatureHex)
    ) {
      return NextResponse.json({ error: "controllerSig-malformed" }, { status: 400 });
    }
    let consumed;
    try {
      consumed = await challengeStore.consume(nonce);
    } catch (err) {
      return NextResponse.json(
        {
          error: "store-unreachable",
          detail:
            err && typeof err === "object" && "message" in err
              ? String((err as { message: unknown }).message)
              : String(err),
        },
        { status: 503 },
      );
    }
    if (!consumed) {
      return NextResponse.json({ error: "challenge-expired-or-unknown" }, { status: 400 });
    }
    if (consumed.agentId !== agentId) {
      return NextResponse.json({ error: "challenge-agent-mismatch" }, { status: 400 });
    }
    controllerSig = { nonce, signatureHex, signedAt: Date.now() };
  }

  const reader = getChainReader();
  let result;
  try {
    result = await issueCredential(reader, { agentId, controllerSig });
  } catch (err) {
    // Real-chain RPC failure. Fail loud rather than fall back to fixtures.
    // `instanceof Error` can lie across module/realm boundaries (Turbopack +
    // @polkadot/api event-emitter errors), so duck-type the message instead.
    const detail =
      err && typeof err === "object" && "message" in err
        ? String((err as { message: unknown }).message)
        : String(err);
    return NextResponse.json(
      { error: "chain-unreachable", detail },
      { status: 503 },
    );
  }
  if (!result.ok) {
    return NextResponse.json({ error: result.reason }, { status: 400 });
  }
  const c = result.credential;
  return NextResponse.json({
    jti: c.jti,
    agentId: c.agentId,
    issuedAt: c.issuedAt,
    credentialUrl: `/poa/api/credential/${c.jti}`,
    pageUrl: `/poa/${c.agentId}`,
  });
}
