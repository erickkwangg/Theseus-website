import { NextResponse } from "next/server";
import { credentialStore } from "@/lib/poa/store";
import { LIMITS, isBoundedString } from "@/lib/poa/validation";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ jti: string }> },
) {
  const { jti } = await params;
  if (!isBoundedString(jti, LIMITS.jti)) {
    return NextResponse.json({ error: "jti-invalid" }, { status: 400 });
  }
  let c;
  try {
    c = await credentialStore.get(jti);
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
