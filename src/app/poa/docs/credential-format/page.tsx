import type { Metadata } from "next";
import DocsShell from "../_components/DocsShell";
import {
  Code,
  H2,
  H3,
  InlineCode,
  Lead,
  Note,
  P,
  PrevNext,
  Strong,
  UL,
} from "../_components/prose";

export const metadata: Metadata = {
  title: "Credential format",
  description:
    "On-the-wire shape of a Proof of Agenthood credential: JWS headers, signed claims, and the embedded chain snapshot.",
  alternates: { canonical: "/poa/docs/credential-format" },
};

export default function CredentialFormatPage() {
  return (
    <DocsShell eyebrow="Docs · Reference" title={<>Credential <span className="italic">format.</span></>}>
      <Lead>
        A Proof of Agenthood credential is a compact JWS. The protected header
        names the signing key. The payload is a JSON object whose fields are
        the signed truth.
      </Lead>

      <H2>The wire format</H2>

      <P>
        Credentials are serialized as JWS Compact Serialization: three
        base64url segments joined by dots. The protected header pins the
        algorithm and the issuer&apos;s key ID. The payload carries the
        claims. The signature is over both.
      </P>

      <Code language="text">{`<base64url(header)>.<base64url(payload)>.<base64url(signature)>`}</Code>

      <H3>Protected header</H3>

      <Code language="json">{`{
  "alg": "EdDSA",
  "kid": "theseus-poa-2026-04",
  "typ": "poa+jws"
}`}</Code>

      <P>
        <Strong>alg</Strong> is fixed at <InlineCode>EdDSA</InlineCode> over
        Ed25519. <Strong>kid</Strong> identifies the issuer key; the matching
        public JWK is published at{" "}
        <InlineCode>/poa/.well-known/jwks.json</InlineCode>, so verifiers do
        not need an out-of-band key. <Strong>typ</Strong> is{" "}
        <InlineCode>poa+jws</InlineCode>, distinct from a generic JWT, so
        consumers do not accidentally treat the payload as one.
      </P>

      <H2>Signed claims</H2>

      <Code language="ts">{`type PoACredentialClaims = {
  iss: "theseus.network/poa";
  sub: SS58Address;            // the agent's SS58 address
  jti: string;                 // unique credential id
  iat: number;                 // issued-at, unix seconds
  attestation: Attestation;    // controller-attested or snapshot
  agent: AgentSnapshot;        // the chain snapshot at iat
  policy: {
    revocationListUrl: string;
    refreshHint: "event-driven";
  };
};`}</Code>

      <UL>
        <li>
          <Strong>iss</Strong>. Fixed string{" "}
          <InlineCode>theseus.network/poa</InlineCode>. Verifiers can use this
          to scope which credentials they accept.
        </li>
        <li>
          <Strong>sub</Strong>. The agent&apos;s SS58 address (Substrate
          address, prefix 42). Every credential is bound to one agent.
        </li>
        <li>
          <Strong>jti</Strong>. Unique credential id. The same agent can have
          one or more credentials over time. The active credential is the one
          surfaced at <InlineCode>/poa/&lt;agentId&gt;</InlineCode>.
        </li>
        <li>
          <Strong>iat</Strong>. Issued-at, in unix seconds. Combined with the
          embedded snapshot block height, this lets a verifier reason about
          freshness.
        </li>
        <li>
          <Strong>policy.revocationListUrl</Strong>. Where to fetch the
          revocation list (currently{" "}
          <InlineCode>/poa/api/revoked</InlineCode>). A credential is
          signature-valid even if revoked. Freshness is a separate axis.
        </li>
      </UL>

      <H2>The agent snapshot</H2>

      <P>
        The largest payload field is <InlineCode>agent</InlineCode>: an{" "}
        <InlineCode>AgentSnapshot</InlineCode> taken from{" "}
        <InlineCode>pallet_agents</InlineCode> at the moment of issuance.
      </P>

      <Code language="ts">{`type AgentSnapshot = {
  agentId: SS58Address;
  name: string;
  summary?: string;
  abgHash: string;             // content hash of the ABG
  abgVersion: number;          // monotonically increasing
  sovereign: boolean;          // false at alpha (chain has no primitive yet)
  controller: SS58Address | null;
  capabilities: {
    models: string[];
    tools: string[];
    intentTypes: string[];
    subAgents: SS58Address[];
  };
  registration: {
    atBlock: number;
    registrar: SS58Address;
  };
  funding: {
    seusBalance: string;       // decimal string, base unit
    active: boolean;
  };
  recentRuns: {
    sampledRuns: number;
    inferenceMix: { kzg: number; signatureOnly: number };
    grade: "full" | "mixed" | "lite" | "unknown";
  };
  enclaveBound: boolean;
  snapshotAtBlock: number;
  snapshotAtTime: string;      // ISO-8601
};`}</Code>

      <Note label="Bind on hashes, not names">
        When a downstream service wants to lock onto a specific agent
        configuration, gate on <InlineCode>abgHash</InlineCode> and{" "}
        <InlineCode>abgVersion</InlineCode>. <InlineCode>name</InlineCode> and{" "}
        <InlineCode>summary</InlineCode> are operator-supplied display fields
        and can change without invalidating the credential.
      </Note>

      <H2>Attestation kinds</H2>

      <P>
        The <InlineCode>attestation</InlineCode> field is a tagged union with
        two variants:
      </P>

      <Code language="ts">{`type Attestation =
  | { kind: "snapshot" }
  | {
      kind: "controller-attested";
      controller: SS58Address;
      nonce: string;
      controllerSig: string;   // hex sr25519 signature over poa:<agentId>:<nonce>
      signedAt: number;
    };`}</Code>

      <P>
        Against the live chain, every credential is{" "}
        <InlineCode>controller-attested</InlineCode>. The{" "}
        <InlineCode>snapshot</InlineCode> variant is reserved for the future
        sovereign-agent path (no controller exists, so no signature is
        possible) and the demo and fixture environment.
      </P>

      <H2>Verification grade</H2>

      <P>
        <InlineCode>recentRuns.grade</InlineCode> compresses how much of the
        agent&apos;s recent inference activity ran through full TensorCommit
        (KZG) provers versus signature-only lite provers:
      </P>

      <UL>
        <li>
          <Strong>full</Strong>. All sampled runs went through KZG provers.
        </li>
        <li>
          <Strong>mixed</Strong>. Some KZG, some lite.
        </li>
        <li>
          <Strong>lite</Strong>. Entirely signature-only. No integrity
          guarantee on the model output.
        </li>
        <li>
          <Strong>unknown</Strong>. No recent runs sampled.
        </li>
      </UL>

      <P>
        Verifiers that care about output integrity should refuse{" "}
        <InlineCode>lite</InlineCode> agents. The grade is signed into the
        credential, but it is computed at <InlineCode>iat</InlineCode>. For a
        live answer, fetch a fresh snapshot.
      </P>

      <H2>What is not signed</H2>

      <P>
        Two pieces of useful information sit alongside the credential but are
        not in the JWS:
      </P>

      <UL>
        <li>
          <Strong>Bundles</Strong>. The human-readable groupings of intent
          types shown on the credential page. Bundles can be re-derived from{" "}
          <InlineCode>capabilities.intentTypes</InlineCode> and may evolve
          over time. Programmatic consumers should gate on the raw intent
          strings.
        </li>
        <li>
          <Strong>Revocation status</Strong>. Fetched separately from{" "}
          <InlineCode>/poa/api/revoked</InlineCode>. A signed credential is
          not self-invalidating; the issuer&apos;s revocation list is the
          source of truth for freshness.
        </li>
      </UL>

      <PrevNext
        prev={{ href: "/poa/docs", label: "Overview" }}
        next={{ href: "/poa/docs/issuing", label: "Issuing" }}
      />
    </DocsShell>
  );
}
