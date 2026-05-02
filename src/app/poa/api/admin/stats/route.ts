// GET /poa/api/admin/stats?date=YYYY-MM-DD&detail=1
//
// Returns the per-day event counts (and optionally the most recent N events)
// from the PoA event log. Auth-gated by a server-only token in POA_ADMIN_TOKEN
// passed as either:
//   - Authorization: Bearer <token>
//   - ?token=<token>  (less secure, easier for one-off curl)
//
// In dev (no POA_ADMIN_TOKEN set) the endpoint is open. In production, set
// the env var and the endpoint refuses every unauthenticated request.

import { NextResponse } from "next/server";
import { events } from "@/lib/poa/events";

function timingSafeEq(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

function isAuthorized(req: Request): boolean {
  const expected = process.env.POA_ADMIN_TOKEN;
  if (!expected) {
    if (process.env.NODE_ENV === "production") return false;
    return true; // dev convenience
  }
  const url = new URL(req.url);
  const provided =
    url.searchParams.get("token") ??
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ??
    "";
  return timingSafeEq(provided, expected);
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const url = new URL(req.url);
  const date =
    url.searchParams.get("date") ?? new Date().toISOString().slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "bad-date" }, { status: 400 });
  }
  const detail = url.searchParams.get("detail") === "1";
  try {
    const counts = await events.counts(date);
    if (!detail) {
      return NextResponse.json({
        date,
        backend: events.backend(),
        counts,
      });
    }
    const recent = await events.list(date, 100);
    return NextResponse.json({
      date,
      backend: events.backend(),
      counts,
      recent,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "store-unreachable",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 503 },
    );
  }
}
