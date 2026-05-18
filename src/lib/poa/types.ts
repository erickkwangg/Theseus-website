// Types for Proof of Agenthood: the credential format and the on-chain snapshot it attests to.
// Aligns with Theseus Architecture v1.0 (April 2026): pallet_agents holds ABG, capability surface,
// sovereignty, controller, seus balance; AKG holds run/step/inference history.

export type SS58Address = string;

export type CapabilitySurface = {
  models: string[];
  tools: string[];
  intentTypes: string[];
  subAgents: SS58Address[];
};

export type InferenceMix = {
  kzg: number;
  signatureOnly: number;
};

export type VerificationGrade = "full" | "mixed" | "lite" | "unknown";

/** Optional human-readable context surface that registered agents can publish
 *  alongside the snapshot. Omitted for agents that haven't published one
 *  (the chain only requires the cryptographic fields). When present, the
 *  PoA profile page renders an "Agent context" section so anyone can read
 *  the system prompt, inputs, and outputs the agent runs under. */
export type AgentContext = {
  /** The verbatim system prompt the agent runs under. Render in a
   *  pre-formatted block; never as HTML. */
  instructions: string;
  /** Optional identity/persona/mandate body — what becomes SOUL.md in
   *  the agent directory. When absent, the soul is heuristically
   *  extracted from the first prose paragraph of `instructions`
   *  (everything before the first `## ` heading). */
  soul?: string;
  /** What the agent reads as input each cycle. One bullet per source. */
  inputs?: string[];
  /** What the agent emits. */
  outputs?: string;
  /** Optional schedule annotation, e.g. "every 10 blocks (~60s)". */
  schedule?: string;
  /** Optional URL where the agent can be observed running. */
  demoUrl?: string;
  /** Optional pointer to the agent's deployed commitment surface (the
   *  contract on chain where its signed verdicts land). The PoA
   *  profile reads live verdict counts from this address. */
  commitmentSurface?: CommitmentSurface;
};

export type CommitmentSurface = {
  /** EVM (or chain-native) address of the deployed commitment surface. */
  address: string;
  /** Chain id, e.g. 84532 for Base Sepolia. */
  chainId: number;
  /** Human-readable chain name. */
  chainName: string;
  /** Block-explorer URL prefix for the contract address. */
  explorerAddressUrl: string;
  /** Which read function returns the cumulative verdict count.
   *  Append-only history contracts: tickCount.
   *  Gate-shape contracts: touchedXCount (specific to each contract). */
  countFn: string;
};

export type AgentSnapshot = {
  agentId: SS58Address;
  name: string;
  summary?: string;
  abgHash: string;
  abgVersion: number;
  sovereign: boolean;
  controller: SS58Address | null;
  capabilities: CapabilitySurface;
  registration: {
    atBlock: number;
    registrar: SS58Address;
  };
  funding: {
    seusBalance: string;
    active: boolean;
  };
  recentRuns: {
    sampledRuns: number;
    inferenceMix: InferenceMix;
    grade: VerificationGrade;
  };
  enclaveBound: boolean;
  snapshotAtBlock: number;
  snapshotAtTime: string;
  /** Optional published context (system prompt + I/O descriptions). */
  context?: AgentContext;
};

export type AttestationSnapshot = { kind: "snapshot" };

export type AttestationControllerAttested = {
  kind: "controller-attested";
  controller: SS58Address;
  nonce: string;
  controllerSig: string;
  signedAt: number;
};

export type Attestation = AttestationSnapshot | AttestationControllerAttested;

export type PoACredentialClaims = {
  iss: "theseus.network/poa";
  sub: SS58Address;
  jti: string;
  iat: number;
  attestation: Attestation;
  agent: AgentSnapshot;
  policy: {
    revocationListUrl: string;
    refreshHint: "event-driven";
  };
};

export type RevocationReason =
  | "agent-deregistered"
  | "balance-zero-90d"
  | "abg-changed"
  | "sovereignty-flipped"
  | "controller-rotated"
  | "operator-revoked";

export type StoredCredential = {
  jti: string;
  agentId: SS58Address;
  jws: string;
  claims: PoACredentialClaims;
  issuedAt: number;
  revoked: false | { reason: RevocationReason; at: number };
};

export type Challenge = {
  nonce: string;
  agentId: SS58Address;
  issuedAt: number;
  expiresAt: number;
};
