// GET /poa/api/snapshot/<agentId> — read an agent's current on-chain state
// without minting anything. Powers the pre-mint preview on /claim and any
// future "lookup before claiming" UX.

import { NextResponse } from "next/server";
import { getChainReader } from "@/lib/poa/chain";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ agentId: string }> },
) {
  const { agentId } = await params;
  if (!agentId) {
    return NextResponse.json({ error: "agentId-required" }, { status: 400 });
  }
  const reader = getChainReader();
  let snapshot;
  try {
    snapshot = await reader.getAgentSnapshot(agentId);
  } catch (err) {
    const detail =
      err && typeof err === "object" && "message" in err
        ? String((err as { message: unknown }).message)
        : String(err);
    return NextResponse.json(
      { error: "chain-unreachable", detail },
      { status: 503 },
    );
  }
  if (!snapshot) {
    return NextResponse.json(
      { error: "agent-not-registered" },
      { status: 404 },
    );
  }
  return NextResponse.json({ snapshot });
}
