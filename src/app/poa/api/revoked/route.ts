import { NextResponse } from "next/server";
import { credentialStore } from "@/lib/poa/store";

export async function GET() {
  try {
    const revoked = await credentialStore.allRevoked();
    return NextResponse.json({
      issuer: "theseus.network/poa",
      generatedAt: new Date().toISOString(),
      revoked,
    });
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
}
