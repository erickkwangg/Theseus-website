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
