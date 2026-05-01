import { NextResponse } from "next/server";
import { credentialStore } from "@/lib/poa/store";

export async function GET() {
  return NextResponse.json({
    issuer: "theseus.network/poa",
    generatedAt: new Date().toISOString(),
    revoked: credentialStore.allRevoked(),
  });
}
