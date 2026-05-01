// Dev-only helper: produces a "controller signature" for a fixture agent so the
// claim flow is demonstrable without a real sr25519 wallet. Refuses to run in
// production AND refuses to run when wired against a real Theseus node — there
// is no way to fake a real controller's sr25519 signature.

import { NextResponse } from "next/server";
import { chainMode, getChainReader } from "@/lib/poa/chain";
import { fixtureSign } from "@/lib/poa/fixtures";

export async function POST(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "dev-only" }, { status: 404 });
  }
  if (chainMode() === "polkadot") {
    return NextResponse.json(
      {
        error: "dev-sign-disabled-in-real-chain-mode",
        detail:
          "THESEUS_RPC_URL is set; the controller must sign the nonce with its real sr25519 key (e.g. via the Polkadot.js extension).",
      },
      { status: 409 },
    );
  }
  let body: { agentId?: unknown; nonce?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid-json" }, { status: 400 });
  }
  const agentId = typeof body.agentId === "string" ? body.agentId : null;
  const nonce = typeof body.nonce === "string" ? body.nonce : null;
  if (!agentId || !nonce) {
    return NextResponse.json({ error: "agentId-and-nonce-required" }, { status: 400 });
  }
  const reader = getChainReader();
  const snapshot = await reader.getAgentSnapshot(agentId);
  if (!snapshot) {
    return NextResponse.json({ error: "agent-not-registered" }, { status: 404 });
  }
  if (!snapshot.controller) {
    return NextResponse.json({ error: "agent-is-sovereign-no-signature-needed" }, { status: 400 });
  }
  const message = `poa:${agentId}:${nonce}`;
  const sig = fixtureSign(snapshot.controller, message);
  if (!sig) {
    return NextResponse.json(
      { error: "no-fixture-signing-key-for-controller", controller: snapshot.controller },
      { status: 400 },
    );
  }
  return NextResponse.json({ controller: snapshot.controller, message, signatureHex: sig });
}
