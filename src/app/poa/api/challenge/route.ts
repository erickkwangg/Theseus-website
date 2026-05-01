import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { challengeStore } from "@/lib/poa/store";
import { LIMITS, isBoundedString, looksLikeSs58 } from "@/lib/poa/validation";

const CHALLENGE_TTL_MS = 5 * 60 * 1000;

function errMsg(err: unknown): string {
  return err && typeof err === "object" && "message" in err
    ? String((err as { message: unknown }).message)
    : String(err);
}

export async function POST(req: Request) {
  let body: { agentId?: unknown };
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
  const nonce = crypto.randomBytes(16).toString("hex");
  const now = Date.now();
  try {
    await challengeStore.put({
      nonce,
      agentId,
      issuedAt: now,
      expiresAt: now + CHALLENGE_TTL_MS,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "store-unreachable",
        detail: errMsg(err),
      },
      { status: 503 },
    );
  }
  return NextResponse.json({
    nonce,
    agentId,
    message: `poa:${agentId}:${nonce}`,
    expiresAt: now + CHALLENGE_TTL_MS,
  });
}
