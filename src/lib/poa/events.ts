// Append-only event log for PoA flows. Powers the admin stats route and
// gives us an auditable record of who did what against /poa/api/*.
//
// Storage:
//   - KV mode: list at poa:events:<YYYY-MM-DD>, lpush per event. We also
//     bump a daily counter at poa:events:counter:<date>:<kind> so the
//     stats endpoint avoids paginating the full list.
//   - Memory mode: in-process Map<date, Event[]> pinned to globalThis.
//     Doesn't survive cold starts but useful in dev + preview.
//
// Privacy:
//   - We never log JWS bodies, signatures, or nonces. Only event type +
//     agentId + outcome + timestamp. IPs are SHA-256 hashed with a
//     server-only salt before storage so logs can't be deanonymized.
//
// Failure mode: events.record() never throws. If the store is unreachable
// the event is silently dropped after one warning console.warn. We don't
// want telemetry failures to take down a live verify request.

import crypto from "node:crypto";

export type PoAEventKind =
  | "challenge.requested"
  | "challenge.consumed"
  | "issue.success"
  | "issue.failed"
  | "verify.success"
  | "verify.failed"
  | "revoke.success"
  | "revoke.failed"
  | "snapshot.read"
  | "snapshot.failed";

export type PoAEvent = {
  ts: number;
  kind: PoAEventKind;
  agentId?: string;
  // Free-form short outcome label, e.g. "challenge-expired" or "ok".
  outcome?: string;
  // SHA-256 hash of the requester's IP, salted with POA_IP_SALT. Truncated
  // to 16 hex chars so it's unique-ish without being reversible.
  ipHash?: string;
};

const SALT = process.env.POA_IP_SALT ?? "poa-dev-ip-salt";

export function hashIp(ip: string | null | undefined): string | undefined {
  if (!ip) return undefined;
  return crypto
    .createHash("sha256")
    .update(SALT + ip)
    .digest("hex")
    .slice(0, 16);
}

export function ipFromRequest(req: Request): string | null {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip");
}

function dateKey(ts = Date.now()): string {
  return new Date(ts).toISOString().slice(0, 10);
}

// ─── Memory backend ──────────────────────────────────────────────────────────

type MemEvents = Map<string, PoAEvent[]>; // date -> events
const G_EVENTS = "__poa_events__";
const g = globalThis as unknown as { [G_EVENTS]?: MemEvents };
if (!g[G_EVENTS]) g[G_EVENTS] = new Map();
const memEvents = g[G_EVENTS]!;

async function memRecord(ev: PoAEvent): Promise<void> {
  const k = dateKey(ev.ts);
  const list = memEvents.get(k) ?? [];
  list.push(ev);
  memEvents.set(k, list);
}

async function memList(date: string, limit: number): Promise<PoAEvent[]> {
  const list = memEvents.get(date) ?? [];
  // Newest first.
  return list.slice(-limit).reverse();
}

async function memCounts(date: string): Promise<Record<string, number>> {
  const list = memEvents.get(date) ?? [];
  const counts: Record<string, number> = {};
  for (const ev of list) {
    counts[ev.kind] = (counts[ev.kind] ?? 0) + 1;
  }
  return counts;
}

// ─── KV backend ──────────────────────────────────────────────────────────────

type KvLike = {
  set: (k: string, v: unknown, opts?: { ex?: number }) => Promise<unknown>;
  get: <T>(k: string) => Promise<T | null>;
  lpush: (k: string, v: string) => Promise<number>;
  lrange: (k: string, start: number, stop: number) => Promise<string[]>;
  incr: (k: string) => Promise<number>;
  expire: (k: string, sec: number) => Promise<unknown>;
};

let cachedKv: KvLike | null = null;
function getKv(): KvLike {
  if (cachedKv) return cachedKv;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mod = require("@vercel/kv") as { kv: KvLike };
  cachedKv = mod.kv;
  return cachedKv;
}

const EVENTS_TTL_SEC = 60 * 60 * 24 * 90; // 90 days

const EK = {
  list: (date: string) => `poa:events:${date}`,
  counter: (date: string, kind: string) => `poa:events:counter:${date}:${kind}`,
} as const;

async function kvRecord(ev: PoAEvent): Promise<void> {
  const kv = getKv();
  const k = dateKey(ev.ts);
  const listKey = EK.list(k);
  const counterKey = EK.counter(k, ev.kind);
  await Promise.all([
    kv.lpush(listKey, JSON.stringify(ev)),
    kv.expire(listKey, EVENTS_TTL_SEC),
    kv.incr(counterKey),
    kv.expire(counterKey, EVENTS_TTL_SEC),
  ]);
}

async function kvList(date: string, limit: number): Promise<PoAEvent[]> {
  const raw = await getKv().lrange(EK.list(date), 0, limit - 1);
  return raw
    .map((s) => {
      try {
        return JSON.parse(s) as PoAEvent;
      } catch {
        return null;
      }
    })
    .filter((e): e is PoAEvent => !!e);
}

async function kvCounts(date: string): Promise<Record<string, number>> {
  const kinds: PoAEventKind[] = [
    "challenge.requested",
    "challenge.consumed",
    "issue.success",
    "issue.failed",
    "verify.success",
    "verify.failed",
    "revoke.success",
    "revoke.failed",
    "snapshot.read",
    "snapshot.failed",
  ];
  const kv = getKv();
  const entries = await Promise.all(
    kinds.map(async (kind) => {
      const v = await kv.get<number | string>(EK.counter(date, kind));
      const n = typeof v === "number" ? v : v ? Number(v) : 0;
      return [kind, n] as const;
    }),
  );
  const counts: Record<string, number> = {};
  for (const [k, v] of entries) if (v) counts[k] = v;
  return counts;
}

// ─── Public surface ──────────────────────────────────────────────────────────

function backend(): "kv" | "memory" {
  return process.env.KV_REST_API_URL ? "kv" : "memory";
}

export const events = {
  /**
   * Fire-and-forget event recorder. Never throws; logs once on failure.
   */
  async record(ev: Omit<PoAEvent, "ts"> & { ts?: number }): Promise<void> {
    const full: PoAEvent = { ts: ev.ts ?? Date.now(), ...ev };
    try {
      if (backend() === "kv") await kvRecord(full);
      else await memRecord(full);
    } catch (err) {
      console.warn(
        "[poa.events] record failed",
        err instanceof Error ? err.message : err,
      );
    }
  },

  async list(date: string, limit = 100): Promise<PoAEvent[]> {
    if (backend() === "kv") return kvList(date, limit);
    return memList(date, limit);
  },

  async counts(date: string): Promise<Record<string, number>> {
    if (backend() === "kv") return kvCounts(date);
    return memCounts(date);
  },

  backend,
};
