// Per-bucket token rate limiter. KV-backed in production, in-memory in dev.
//
// Buckets are keyed by (route, ipHash) so a flood from one IP can't starve
// another. Limits are conservative defaults; tune via the per-route caller.
//
// Algorithm: fixed-window counter. Each key holds {count, windowStart}; on
// each call we either reset the window (if elapsed) or increment count and
// reject when count > limit. Simpler than a sliding window or token bucket
// and good enough for a v1 abuse cap.
//
// Failure mode: never throws on store-unreachable. If KV fails we ALLOW the
// request and console.warn once. Telemetry must not block live traffic.

import { hashIp, ipFromRequest } from "./events";

export type RateLimitConfig = {
  /** Bucket key prefix, e.g. "verify". */
  route: string;
  /** Max requests allowed per window per (route, ipHash). */
  limit: number;
  /** Window length in seconds. */
  windowSec: number;
};

export type RateLimitResult =
  | { allowed: true; remaining: number; resetAt: number }
  | { allowed: false; retryAfterSec: number; resetAt: number };

const G_KEY = "__poa_ratelimit__";
type MemBucket = { count: number; windowStart: number };
const g = globalThis as unknown as { [G_KEY]?: Map<string, MemBucket> };
if (!g[G_KEY]) g[G_KEY] = new Map();
const memBuckets = g[G_KEY]!;

type KvLike = {
  get: <T>(k: string) => Promise<T | null>;
  set: (k: string, v: unknown, opts?: { ex?: number }) => Promise<unknown>;
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

function backend(): "kv" | "memory" {
  return process.env.KV_REST_API_URL ? "kv" : "memory";
}

function bucketKey(route: string, ipHash: string, windowStart: number): string {
  return `poa:rl:${route}:${ipHash}:${windowStart}`;
}

async function memCheck(
  route: string,
  ipHash: string,
  cfg: RateLimitConfig,
): Promise<RateLimitResult> {
  const now = Date.now();
  const windowMs = cfg.windowSec * 1000;
  const windowStart = Math.floor(now / windowMs) * windowMs;
  const key = `${route}:${ipHash}:${windowStart}`;
  const cur = memBuckets.get(key) ?? { count: 0, windowStart };
  cur.count += 1;
  memBuckets.set(key, cur);
  // Best-effort cleanup of old keys.
  if (memBuckets.size > 1000) {
    for (const [k, v] of memBuckets) {
      if (now - v.windowStart > windowMs * 2) memBuckets.delete(k);
    }
  }
  const resetAt = windowStart + windowMs;
  if (cur.count > cfg.limit) {
    return {
      allowed: false,
      retryAfterSec: Math.ceil((resetAt - now) / 1000),
      resetAt,
    };
  }
  return { allowed: true, remaining: cfg.limit - cur.count, resetAt };
}

async function kvCheck(
  route: string,
  ipHash: string,
  cfg: RateLimitConfig,
): Promise<RateLimitResult> {
  const now = Date.now();
  const windowMs = cfg.windowSec * 1000;
  const windowStart = Math.floor(now / windowMs) * windowMs;
  const key = bucketKey(route, ipHash, windowStart);
  const kv = getKv();
  const count = await kv.incr(key);
  // Only set TTL on first increment; INCR auto-creates the key with no TTL.
  if (count === 1) {
    await kv.expire(key, cfg.windowSec + 5);
  }
  const resetAt = windowStart + windowMs;
  if (count > cfg.limit) {
    return {
      allowed: false,
      retryAfterSec: Math.ceil((resetAt - now) / 1000),
      resetAt,
    };
  }
  return { allowed: true, remaining: cfg.limit - count, resetAt };
}

/**
 * Check + record one hit. The caller passes the Request so we can extract
 * the IP and hash it. If the IP is missing (server-side internal call) we
 * skip the limit and allow the request unconditionally.
 *
 * Never throws. On KV failure, allows the request and logs once.
 */
export async function checkRateLimit(
  req: Request,
  cfg: RateLimitConfig,
): Promise<RateLimitResult> {
  const ip = ipFromRequest(req);
  const ipHash = hashIp(ip);
  if (!ipHash) {
    // No IP we can pin to; allow.
    return {
      allowed: true,
      remaining: cfg.limit,
      resetAt: Date.now() + cfg.windowSec * 1000,
    };
  }
  try {
    if (backend() === "kv") return await kvCheck(cfg.route, ipHash, cfg);
    return await memCheck(cfg.route, ipHash, cfg);
  } catch (err) {
    console.warn(
      "[poa.ratelimit] check failed, allowing request",
      err instanceof Error ? err.message : err,
    );
    return {
      allowed: true,
      remaining: cfg.limit,
      resetAt: Date.now() + cfg.windowSec * 1000,
    };
  }
}

/**
 * Convenience: build a 429 NextResponse-compatible body for a denied hit.
 * Caller wraps with NextResponse.json(...).
 */
export function rateLimited(result: Extract<RateLimitResult, { allowed: false }>) {
  return {
    status: 429 as const,
    body: {
      error: "rate-limited",
      retryAfterSec: result.retryAfterSec,
    } as const,
    headers: {
      "Retry-After": String(result.retryAfterSec),
      "X-RateLimit-Reset": String(Math.floor(result.resetAt / 1000)),
    },
  };
}
