import { NextResponse } from "next/server";
import { credentialStore } from "@/lib/poa/store";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ jti: string }> },
) {
  const { jti } = await params;
  const c = credentialStore.get(jti);
  if (!c) {
    return NextResponse.json({ error: "credential-not-found" }, { status: 404 });
  }
  const accept = req.headers.get("accept") ?? "";
  if (accept.includes("application/jwt") || accept.includes("application/jose")) {
    return new Response(c.jws, {
      status: 200,
      headers: {
        "content-type": "application/jose",
        "cache-control": "public, max-age=60, must-revalidate",
      },
    });
  }
  return NextResponse.json({
    jti: c.jti,
    agentId: c.agentId,
    issuedAt: c.issuedAt,
    revoked: c.revoked,
    jws: c.jws,
    claims: c.claims,
  });
}
