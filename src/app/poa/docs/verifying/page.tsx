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
  title: "Verifying",
  description:
    "Verify a Proof of Agenthood credential interactively at /poa/verify, or programmatically against /poa/api/verify.",
  alternates: { canonical: "/poa/docs/verifying" },
};

export default function VerifyingPage() {
  return (
    <DocsShell eyebrow="Docs · Reference" title={<>Verifying a <span className="italic">credential.</span></>}>
      <Lead>
        Anyone can verify. No wallet, no account, no auth header. Verification
        checks the signature locally, and (when reachable) asks the chain
        whether the credential is still fresh.
      </Lead>

      <H2>Two surfaces</H2>

      <UL>
        <li>
          <Strong>Interactive</Strong>:{" "}
          <InlineCode>/poa/verify</InlineCode>. Paste a JWS into the form, get
          a human-readable report.
        </li>
        <li>
          <Strong>Programmatic</Strong>:{" "}
          <InlineCode>POST /poa/api/verify</InlineCode>. Same checks, machine
          response.
        </li>
      </UL>

      <H2>What gets checked</H2>

      <P>Three independent axes:</P>

      <UL>
        <li>
          <Strong>Signature.</Strong> The JWS is verified against the
          issuer&apos;s public key (kid{" "}
          <InlineCode>theseus-poa-2026-04</InlineCode>, served from{" "}
          <InlineCode>/poa/.well-known/jwks.json</InlineCode>). The algorithm
          is pinned to <InlineCode>EdDSA</InlineCode>.
        </li>
        <li>
          <Strong>Revocation list.</Strong> The JTI is checked against the
          issuer&apos;s revocation list. Revocation can be operator-initiated
          or automatic (see the next page).
        </li>
        <li>
          <Strong>Chain freshness.</Strong> The current{" "}
          <InlineCode>AgentInfo</InlineCode> is fetched and compared against
          the snapshot in the credential. ABG drift, controller rotation,
          deregistration, or balance-zero-90d all trigger a stale verdict.
        </li>
      </UL>

      <H2>The verify endpoint</H2>

      <Code language="bash">{`# Send the raw JWS as text/plain
curl -X POST https://theseus.network/poa/api/verify \\
  -H 'content-type: application/jose' \\
  --data 'eyJhbGciOiJFZERTQSI...'

# Or wrap it in JSON
curl -X POST https://theseus.network/poa/api/verify \\
  -H 'content-type: application/json' \\
  -d '{ "jws": "eyJhbGciOiJFZERTQSI..." }'`}</Code>

      <H3>Successful response</H3>

      <Code language="json">{`{
  "valid": true,
  "jti": "01HQXY...",
  "agentId": "5GrwvaEF...HGKutQY",
  "issuedAt": 1735689420123,
  "issuer": "theseus.network/poa",
  "kid": "theseus-poa-2026-04",
  "claims": { /* the full PoACredentialClaims */ },
  "bundles": {
    "derived": true,
    "list": [
      { "category": "DeFi", "name": "Trade", "intentTypes": ["..."] }
    ]
  },
  "freshness": { "status": "current" }
}`}</Code>

      <H3>Failure responses</H3>

      <Code language="json">{`// Bad signature, wrong alg, malformed JWS all collapse to:
{ "valid": false, "reason": "signature-invalid" }

// Revoked: signature is valid, but the credential is stale.
{ "valid": true, "freshness": { "status": "revoked", "reason": "abg-changed" }, /* ... */ }

// Chain unreachable: signature valid, freshness unknown.
{ "valid": true, "freshness": { "status": "unknown", "detail": "..." }, /* ... */ }`}</Code>

      <Note label="valid vs. fresh">
        <Strong>valid: true</Strong> only means the signature checks out. A
        verifier that requires &ldquo;current and trustworthy&rdquo; should
        also require{" "}
        <InlineCode>freshness.status === &quot;current&quot;</InlineCode>. The
        two checks are kept separate so consumers can decide their own
        tolerance. A one-shot batch job might accept a credential whose chain
        freshness is unknown; an interactive flow might not.
      </Note>

      <H2>Programmatic gating</H2>

      <P>
        When a downstream service uses the credential to make a trust
        decision (for example, &ldquo;only let agents with a full KZG
        verification grade run this tool&rdquo;), gate on the{" "}
        <Strong>signed</Strong> fields:
      </P>

      <UL>
        <li>
          <InlineCode>claims.sub</InlineCode>. The agent ID this credential is
          for.
        </li>
        <li>
          <InlineCode>claims.agent.abgHash</InlineCode> /{" "}
          <InlineCode>abgVersion</InlineCode>. Pin to a specific
          configuration.
        </li>
        <li>
          <InlineCode>claims.agent.capabilities.intentTypes</InlineCode>. The
          raw permitted intents. The <InlineCode>bundles</InlineCode> field on
          the response is a display-only grouping and is marked{" "}
          <InlineCode>derived: true</InlineCode>.
        </li>
        <li>
          <InlineCode>claims.agent.recentRuns.grade</InlineCode>. Refuse{" "}
          <InlineCode>lite</InlineCode> if you require integrity guarantees.
        </li>
      </UL>

      <H2>Verifying offline</H2>

      <P>
        For environments that cannot reach the verify endpoint, the JWS is a
        standard Ed25519 JWS. Any JOSE library can verify it given the public
        JWK. Fetch the JWK once from{" "}
        <InlineCode>/poa/.well-known/jwks.json</InlineCode> and cache it. You
        will lose the freshness check; pair offline verification with a
        periodic poll of <InlineCode>/poa/api/revoked</InlineCode>.
      </P>

      <Code language="ts">{`import { compactVerify, importJWK } from "jose";

const { keys } = await fetch("https://theseus.network/poa/.well-known/jwks.json")
  .then((r) => r.json());
const key = await importJWK(keys[0], "EdDSA");

const { payload } = await compactVerify(jws, key, { algorithms: ["EdDSA"] });
const claims = JSON.parse(new TextDecoder().decode(payload));`}</Code>

      <H2>Rate limits</H2>

      <P>
        <InlineCode>POST /poa/api/verify</InlineCode> is capped at 60 requests
        per minute per IP. Comfortable for a developer iterating against the
        endpoint, tight enough to discourage casual scraping. Hitting the
        limit returns 429 with a <InlineCode>Retry-After</InlineCode> header.
      </P>

      <PrevNext
        prev={{ href: "/poa/docs/issuing", label: "Issuing" }}
        next={{ href: "/poa/docs/revocation", label: "Revocation" }}
      />
    </DocsShell>
  );
}
