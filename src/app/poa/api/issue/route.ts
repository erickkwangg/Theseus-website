import { NextResponse } from "next/server";
import { getChainReader } from "@/lib/poa/chain";
import { issueCredential } from "@/lib/poa/issue";
import { challengeStore } from "@/lib/poa/store";

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
  const agentId = typeof body.agentId === "string" ? body.agentId : null;
  if (!agentId) {
    return NextResponse.json({ error: "agentId-required" }, { status: 400 });
  }

  let controllerSig: { nonce: string; signatureHex: string; signedAt: number } | undefined;
  if (body.controllerSig) {
    const { nonce, signatureHex } = body.controllerSig;
    if (typeof nonce !== "string" || typeof signatureHex !== "string") {
      return NextResponse.json({ error: "controllerSig-malformed" }, { status: 400 });
    }
    const consumed = challengeStore.consume(nonce);
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
    // Real-chain RPC failure — fail loud rather than fall back to fixtures.
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
