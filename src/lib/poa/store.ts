// Credential + challenge store. Async interface with two implementations:
//
//   MemoryStore: in-process Map pinned to globalThis. Used in dev when no KV
//     env vars are set. State doesn't survive cold starts on Vercel.
//   KvStore: Vercel KV (Redis). Used in production. Survives cold starts,
//     scales across regions, ~free up to 30K commands/day.
//
// The factory picks at runtime based on `KV_REST_API_URL` (auto-provisioned
// when you enable Vercel KV / Storage). Same fail-loud rule as the chain
// reader: KV configured + unreachable → throw.

import type { Challenge, RevocationReason, StoredCredential } from "./types";

export interface CredentialStore {
  put(c: StoredCredential): Promise<void>;
  get(jti: string): Promise<StoredCredential | undefined>;
  byAgent(agentId: string): Promise<StoredCredential[]>;
  latestByAgent(agentId: string): Promise<StoredCredential | undefined>;
  revoke(jti: string, reason: RevocationReason): Promise<boolean>;
  allRevoked(): Promise<{ jti: string; reason: RevocationReason; at: number }[]>;
}

export interface ChallengeStore {
  put(c: Challenge): Promise<void>;
  consume(nonce: string): Promise<Challenge | undefined>;
}

// ─── Memory implementation ───────────────────────────────────────────────────
// Pinned to globalThis so route handlers and RSC server components share the
// same Maps in Next.js dev mode (Turbopack bundles them as separate module
// graphs otherwise).

type GlobalMaps = {
  credentials: Map<string, StoredCredential>;
  credentialsByAgent: Map<string, Set<string>>;
  challenges: Map<string, Challenge>;
};
const G_KEY = "__poa_store__";
const g = globalThis as unknown as { [G_KEY]?: GlobalMaps };
if (!g[G_KEY]) {
  g[G_KEY] = {
    credentials: new Map(),
    credentialsByAgent: new Map(),
    challenges: new Map(),
  };
}
const mem = g[G_KEY]!;

class MemoryCredentialStore implements CredentialStore {
  async put(c: StoredCredential): Promise<void> {
    mem.credentials.set(c.jti, c);
    let set = mem.credentialsByAgent.get(c.agentId);
    if (!set) {
      set = new Set();
      mem.credentialsByAgent.set(c.agentId, set);
    }
    set.add(c.jti);
  }
  async get(jti: string): Promise<StoredCredential | undefined> {
    return mem.credentials.get(jti);
  }
  async byAgent(agentId: string): Promise<StoredCredential[]> {
    const set = mem.credentialsByAgent.get(agentId);
    if (!set) return [];
    return Array.from(set)
      .map((id) => mem.credentials.get(id))
      .filter((c): c is StoredCredential => !!c);
  }
  async latestByAgent(agentId: string): Promise<StoredCredential | undefined> {
    const list = await this.byAgent(agentId);
    return list
      .filter((c) => !c.revoked)
      .sort((a, b) => b.issuedAt - a.issuedAt)[0];
  }
  async revoke(jti: string, reason: RevocationReason): Promise<boolean> {
    const c = mem.credentials.get(jti);
    if (!c || c.revoked) return false;
    c.revoked = { reason, at: Date.now() };
    return true;
  }
  async allRevoked() {
    return Array.from(mem.credentials.values())
      .filter((c) => !!c.revoked)
      .map((c) => ({
        jti: c.jti,
        ...(c.revoked as { reason: RevocationReason; at: number }),
      }));
  }
}

class MemoryChallengeStore implements ChallengeStore {
  async put(c: Challenge): Promise<void> {
    mem.challenges.set(c.nonce, c);
  }
  async consume(nonce: string): Promise<Challenge | undefined> {
    const c = mem.challenges.get(nonce);
    if (!c) return undefined;
    mem.challenges.delete(nonce);
    if (Date.now() > c.expiresAt) return undefined;
    return c;
  }
}

// ─── KV implementation ───────────────────────────────────────────────────────
// Schema:
//   poa:cred:<jti>            → StoredCredential JSON
//   poa:cred-by-agent:<addr>  → SET of jti
//   poa:revoked               → SET of revoked jti
//   poa:challenge:<nonce>     → Challenge JSON, TTL = 5 min

const K = {
  cred: (jti: string) => `poa:cred:${jti}`,
  credByAgent: (agentId: string) => `poa:cred-by-agent:${agentId}`,
  revoked: "poa:revoked",
  challenge: (nonce: string) => `poa:challenge:${nonce}`,
} as const;

const CHALLENGE_TTL_SEC = 5 * 60;

type KvLike = {
  set: (
    key: string,
    value: unknown,
    opts?: { ex?: number },
  ) => Promise<unknown>;
  get: <T>(key: string) => Promise<T | null>;
  del: (...keys: string[]) => Promise<number>;
  getdel: <T>(key: string) => Promise<T | null>;
  sadd: (key: string, ...members: string[]) => Promise<number>;
  smembers: (key: string) => Promise<string[]>;
  mget: <T>(...keys: string[]) => Promise<(T | null)[]>;
};

let cachedKv: KvLike | null = null;
function getKv(): KvLike {
  if (cachedKv) return cachedKv;
  // Lazy require so @vercel/kv isn't loaded into memory-mode routes.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mod = require("@vercel/kv") as { kv: KvLike };
  cachedKv = mod.kv;
  return cachedKv;
}

class KvCredentialStore implements CredentialStore {
  async put(c: StoredCredential): Promise<void> {
    const kv = getKv();
    await Promise.all([
      kv.set(K.cred(c.jti), c),
      kv.sadd(K.credByAgent(c.agentId), c.jti),
    ]);
  }
  async get(jti: string): Promise<StoredCredential | undefined> {
    const v = await getKv().get<StoredCredential>(K.cred(jti));
    return v ?? undefined;
  }
  async byAgent(agentId: string): Promise<StoredCredential[]> {
    const kv = getKv();
    const ids = await kv.smembers(K.credByAgent(agentId));
    if (ids.length === 0) return [];
    const vals = await kv.mget<StoredCredential>(
      ...ids.map((id) => K.cred(id)),
    );
    return vals.filter((c): c is StoredCredential => !!c);
  }
  async latestByAgent(agentId: string): Promise<StoredCredential | undefined> {
    const list = await this.byAgent(agentId);
    return list
      .filter((c) => !c.revoked)
      .sort((a, b) => b.issuedAt - a.issuedAt)[0];
  }
  async revoke(jti: string, reason: RevocationReason): Promise<boolean> {
    const kv = getKv();
    const c = await kv.get<StoredCredential>(K.cred(jti));
    if (!c || c.revoked) return false;
    c.revoked = { reason, at: Date.now() };
    await Promise.all([kv.set(K.cred(jti), c), kv.sadd(K.revoked, jti)]);
    return true;
  }
  async allRevoked() {
    const kv = getKv();
    const ids = await kv.smembers(K.revoked);
    if (ids.length === 0) return [];
    const vals = await kv.mget<StoredCredential>(
      ...ids.map((id) => K.cred(id)),
    );
    return vals
      .filter((c): c is StoredCredential => !!c && !!c.revoked)
      .map((c) => ({
        jti: c.jti,
        ...(c.revoked as { reason: RevocationReason; at: number }),
      }));
  }
}

class KvChallengeStore implements ChallengeStore {
  async put(c: Challenge): Promise<void> {
    await getKv().set(K.challenge(c.nonce), c, { ex: CHALLENGE_TTL_SEC });
  }
  async consume(nonce: string): Promise<Challenge | undefined> {
    // GETDEL is atomic: we read and delete in one round-trip, so a parallel
    // replay attempt sees the key missing.
    const c = await getKv().getdel<Challenge>(K.challenge(nonce));
    if (!c) return undefined;
    if (Date.now() > c.expiresAt) return undefined;
    return c;
  }
}

// ─── Factory ─────────────────────────────────────────────────────────────────

export type StoreMode = "memory" | "kv";
export function storeMode(): StoreMode {
  return process.env.KV_REST_API_URL ? "kv" : "memory";
}

let cachedCred: CredentialStore | null = null;
let cachedCh: ChallengeStore | null = null;
let cachedMode: StoreMode | null = null;

function pick(): { cred: CredentialStore; ch: ChallengeStore } {
  const mode = storeMode();
  if (cachedMode === mode && cachedCred && cachedCh) {
    return { cred: cachedCred, ch: cachedCh };
  }
  if (mode === "kv") {
    cachedCred = new KvCredentialStore();
    cachedCh = new KvChallengeStore();
  } else {
    cachedCred = new MemoryCredentialStore();
    cachedCh = new MemoryChallengeStore();
  }
  cachedMode = mode;
  return { cred: cachedCred, ch: cachedCh };
}

// Public surface: same shape as before, all methods now async.
export const credentialStore: CredentialStore = {
  put: (c) => pick().cred.put(c),
  get: (jti) => pick().cred.get(jti),
  byAgent: (id) => pick().cred.byAgent(id),
  latestByAgent: (id) => pick().cred.latestByAgent(id),
  revoke: (jti, reason) => pick().cred.revoke(jti, reason),
  allRevoked: () => pick().cred.allRevoked(),
};

export const challengeStore: ChallengeStore = {
  put: (c) => pick().ch.put(c),
  consume: (nonce) => pick().ch.consume(nonce),
};
