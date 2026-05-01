// Issuance pipeline: snapshot agent state, optionally verify controller signature,
// mint a JWS credential, store it. Returns the stored credential or an error.

import { ulid } from "ulid";
import type { ChainReader } from "./chain";
import { mintCredential } from "./credential";
import { credentialStore } from "./store";
import type {
  Attestation,
  PoACredentialClaims,
  SS58Address,
  StoredCredential,
} from "./types";

const ISSUER = "theseus.network/poa" as const;
const REVOCATION_LIST_URL =
  process.env.POA_BASE_URL
    ? `${process.env.POA_BASE_URL}/poa/api/revoked`
    : "https://theseus.network/poa/api/revoked";

export type IssueRequest = {
  agentId: SS58Address;
  controllerSig?: { nonce: string; signatureHex: string; signedAt: number };
};

export type IssueResult =
  | { ok: true; credential: StoredCredential }
  | { ok: false; reason: string };

export async function issueCredential(
  reader: ChainReader,
  req: IssueRequest,
): Promise<IssueResult> {
  const snapshot = await reader.getAgentSnapshot(req.agentId);
  if (!snapshot) return { ok: false, reason: "agent-not-registered" };
  if (!snapshot.funding.active) return { ok: false, reason: "agent-balance-zero" };

  let attestation: Attestation;
  if (snapshot.sovereign) {
    attestation = { kind: "snapshot" };
  } else {
    if (!req.controllerSig) return { ok: false, reason: "controller-signature-required" };
    if (!snapshot.controller) return { ok: false, reason: "controller-missing-on-chain" };
    const message = `poa:${req.agentId}:${req.controllerSig.nonce}`;
    const valid = await reader.verifyControllerSignature({
      controller: snapshot.controller,
      message,
      signatureHex: req.controllerSig.signatureHex,
    });
    if (!valid) return { ok: false, reason: "invalid-controller-signature" };
    attestation = {
      kind: "controller-attested",
      controller: snapshot.controller,
      nonce: req.controllerSig.nonce,
      controllerSig: req.controllerSig.signatureHex,
      signedAt: req.controllerSig.signedAt,
    };
  }

  const jti = ulid();
  const claims: PoACredentialClaims = {
    iss: ISSUER,
    sub: snapshot.agentId,
    jti,
    iat: Math.floor(Date.now() / 1000),
    attestation,
    agent: snapshot,
    policy: {
      revocationListUrl: REVOCATION_LIST_URL,
      refreshHint: "event-driven",
    },
  };

  const jws = await mintCredential(claims);
  const stored: StoredCredential = {
    jti,
    agentId: snapshot.agentId,
    jws,
    claims,
    issuedAt: Date.now(),
    revoked: false,
  };
  credentialStore.put(stored);
  return { ok: true, credential: stored };
}
