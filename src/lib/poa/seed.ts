// Seeds credentials for the sovereign demo agents that ship as fixtures.
// These agents (the ETH/USD Oracle and the Stablecoin Failsafe) are
// deployed by the Theseus team for demo purposes and should appear with
// a signed credential out of the box, not as "registered without a
// credential". Idempotent: re-runs are no-ops once a credential exists.
//
// Runs lazily — on first access to a fixture agent's profile page or the
// agents directory. Fail-quiet: a seed failure shouldn't break the page.

import { getChainReader, chainMode } from "./chain";
import { FIXTURE_AGENTS } from "./fixtures";
import { issueCredential } from "./issue";
import { credentialStore } from "./store";

let seedingPromise: Promise<void> | null = null;

export function ensureFixtureCredentials(): Promise<void> {
  // Single-flight: if a seed is already in progress, wait on it. If one
  // already finished this process, return its memo.
  if (seedingPromise) return seedingPromise;
  seedingPromise = runSeed().catch((err) => {
    // Reset so a transient failure (e.g. KV blip) gets another chance on
    // the next request.
    seedingPromise = null;
    throw err;
  });
  return seedingPromise;
}

async function runSeed(): Promise<void> {
  // Only seed against the fixture chain reader. In polkadot mode, the
  // sovereign demo agents wouldn't be registered on-chain anyway, so
  // attempting to issue would just fail.
  if (chainMode() !== "fixture") return;

  const reader = getChainReader();
  const sovereignDemoAgents = Object.values(FIXTURE_AGENTS).filter(
    (a) => a.sovereign && a.context,
  );

  for (const agent of sovereignDemoAgents) {
    try {
      const existing = await credentialStore.latestByAgent(agent.agentId);
      if (existing) continue;
      await issueCredential(reader, { agentId: agent.agentId });
    } catch {
      // Best-effort. The page falls back to the snapshot-only state.
    }
  }
}
