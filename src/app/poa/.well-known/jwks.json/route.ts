import { NextResponse } from "next/server";
import { publicJwks } from "@/lib/poa/credential";

export async function GET() {
  const jwks = await publicJwks();
  return NextResponse.json(jwks, {
    headers: { "cache-control": "public, max-age=300" },
  });
}
