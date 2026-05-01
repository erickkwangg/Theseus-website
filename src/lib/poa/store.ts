// Credential + challenge store. In-memory map for v1 scaffolding.
// On serverless (Vercel) this resets per cold start, which is fine for the demo
// flow. Swap for Postgres / KV when persistence matters.
//
// State is pinned to globalThis so route handlers and RSC server components
// share the same Map instance. Without this, Next.js bundles them as separate
// module graphs in dev mode and each gets its own (empty) store.

import type { Challenge, RevocationReason, StoredCredential } from "./types";

type GlobalStore = {
  credentials: Map<string, StoredCredential>;
  credentialsByAgent: Map<string, Set<string>>;
  challenges: Map<string, Challenge>;
};

const KEY = "__poa_store__";
const g = globalThis as unknown as { [KEY]?: GlobalStore };
if (!g[KEY]) {
  g[KEY] = {
    credentials: new Map(),
    credentialsByAgent: new Map(),
    challenges: new Map(),
  };
}
const { credentials, credentialsByAgent, challenges } = g[KEY]!;

export const credentialStore = {
  put(c: StoredCredential): void {
    credentials.set(c.jti, c);
    let set = credentialsByAgent.get(c.agentId);
    if (!set) {
      set = new Set();
      credentialsByAgent.set(c.agentId, set);
    }
    set.add(c.jti);
  },
  get(jti: string): StoredCredential | undefined {
    return credentials.get(jti);
  },
  byAgent(agentId: string): StoredCredential[] {
    const set = credentialsByAgent.get(agentId);
    if (!set) return [];
    return Array.from(set)
      .map((id) => credentials.get(id))
      .filter((c): c is StoredCredential => !!c);
  },
  latestByAgent(agentId: string): StoredCredential | undefined {
    return this.byAgent(agentId)
      .filter((c) => !c.revoked)
      .sort((a, b) => b.issuedAt - a.issuedAt)[0];
  },
  revoke(jti: string, reason: RevocationReason): boolean {
    const c = credentials.get(jti);
    if (!c || c.revoked) return false;
    c.revoked = { reason, at: Date.now() };
    return true;
  },
  allRevoked(): { jti: string; reason: RevocationReason; at: number }[] {
    return Array.from(credentials.values())
      .filter((c) => !!c.revoked)
      .map((c) => ({ jti: c.jti, ...(c.revoked as { reason: RevocationReason; at: number }) }));
  },
  count(): number {
    return credentials.size;
  },
};

export const challengeStore = {
  put(c: Challenge): void {
    challenges.set(c.nonce, c);
  },
  consume(nonce: string): Challenge | undefined {
    const c = challenges.get(nonce);
    if (!c) return undefined;
    if (Date.now() > c.expiresAt) {
      challenges.delete(nonce);
      return undefined;
    }
    challenges.delete(nonce);
    return c;
  },
};
