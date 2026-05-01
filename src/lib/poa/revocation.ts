// Revocation logic: given a stored credential, decide whether the live on-chain
// state means it should be revoked. Pure-function so the watcher cron and the
// on-demand verifier can both call it.

import type { ChainReader } from "./chain";
import type { RevocationReason, StoredCredential } from "./types";

export async function evaluateRevocation(
  reader: ChainReader,
  credential: StoredCredential,
): Promise<RevocationReason | null> {
  const live = await reader.getAgentSnapshot(credential.agentId);
  if (!live) return "agent-deregistered";
  if (!live.funding.active) return "balance-zero-90d";

  const issued = credential.claims.agent;
  if (live.abgHash !== issued.abgHash) return "abg-changed";
  if (issued.sovereign && !live.sovereign) return "sovereignty-flipped";
  if (
    credential.claims.attestation.kind === "controller-attested" &&
    live.controller !== credential.claims.attestation.controller
  ) {
    return "controller-rotated";
  }
  return null;
}
