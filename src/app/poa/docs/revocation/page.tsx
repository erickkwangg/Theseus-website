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
  title: "Revocation",
  description:
    "How a Proof of Agenthood credential becomes invalid: operator-initiated, automatic on-chain triggers, and the public revocation list.",
  alternates: { canonical: "/poa/docs/revocation" },
};

export default function RevocationPage() {
  return (
    <DocsShell eyebrow="Docs · Reference" title={<>Revocation.</>}>
      <Lead>
        A credential is signature-valid forever. Freshness is a separate
        question. Revocation is how PoA tells verifiers that a still-valid
        signature should no longer be trusted.
      </Lead>

      <H2>Two paths into the revocation list</H2>

      <H3>Operator-initiated</H3>

      <P>
        The controller can revoke at any time. Same shape as issuing: request
        a challenge, sign a revoke message, post to{" "}
        <InlineCode>/poa/api/revoke</InlineCode>. The signed message uses a
        different prefix from issuance,{" "}
        <InlineCode>poa-revoke:&lt;agentId&gt;:&lt;nonce&gt;</InlineCode>, so
        a signature collected for one operation cannot be replayed for the
        other.
      </P>

      <Code language="bash">{`# 1. Get a challenge
curl -X POST https://theseus.network/poa/api/challenge \\
  -H 'content-type: application/json' \\
  -d '{ "agentId": "5GrwvaEF...HGKutQY" }'

# 2. Sign 'poa-revoke:<agentId>:<nonce>' with the controller key
#    (same wallet flow as issuing, different prefix)

# 3. Post the revoke
curl -X POST https://theseus.network/poa/api/revoke \\
  -H 'content-type: application/json' \\
  -d '{
    "agentId": "5GrwvaEF...HGKutQY",
    "nonce": "...",
    "signatureHex": "..."
  }'`}</Code>

      <P>
        The credential is marked revoked with reason{" "}
        <InlineCode>operator-revoked</InlineCode>. The credential page
        immediately shows the void state. The verify endpoint reports{" "}
        <InlineCode>freshness.status === &quot;revoked&quot;</InlineCode> on
        the next request.
      </P>

      <H3>Automatic, on chain state change</H3>

      <P>
        PoA periodically reconciles every active credential against live
        chain state. A change that contradicts the signed snapshot triggers
        revocation with one of these reasons:
      </P>

      <UL>
        <li>
          <Strong>agent-deregistered</Strong>. The agent no longer has an{" "}
          <InlineCode>AgentInfo</InlineCode> on chain.
        </li>
        <li>
          <Strong>balance-zero-90d</Strong>. The agent is in the dormant or
          collectable state. State is removed at ninety days at zero seus
          balance; PoA marks the credential void as soon as the funding goes
          inactive.
        </li>
        <li>
          <Strong>abg-changed</Strong>. The on-chain ABG hash no longer
          matches the snapshot. The agent&apos;s behavior surface has been
          updated; the old credential is no longer descriptive of what runs.
        </li>
        <li>
          <Strong>controller-rotated</Strong>. The controller account on
          chain is different from the one that attested to the credential.
        </li>
        <li>
          <Strong>sovereignty-flipped</Strong>. Only meaningful once the
          chain implements sovereignty. A credential issued claiming the
          agent was sovereign is revoked if the agent later acquires a
          controller.
        </li>
      </UL>

      <Note label="Why automatic">
        Without automatic revocation, an operator could mint a credential
        describing a benign ABG, then update the on-chain ABG to do something
        different, and the old credential would still verify. Auto-revocation
        on ABG drift closes that loop.
      </Note>

      <H2>The public list</H2>

      <P>
        <InlineCode>GET /poa/api/revoked</InlineCode> returns every revoked
        credential the issuer knows about. Use it for offline verification or
        for caching the freshness check independently of{" "}
        <InlineCode>/poa/api/verify</InlineCode>.
      </P>

      <Code language="json">{`{
  "issuer": "theseus.network/poa",
  "generatedAt": "2026-05-03T12:00:00.000Z",
  "revoked": [
    {
      "jti": "01HQXY...",
      "agentId": "5GrwvaEF...HGKutQY",
      "reason": "abg-changed",
      "at": 1735689600000
    }
  ]
}`}</Code>

      <P>
        The list grows monotonically. Credentials do not come back from
        revoked. To re-credential an agent after a revoke, the operator mints
        a fresh credential, which gets a new <InlineCode>jti</InlineCode>.
      </P>

      <H2>What revocation does not do</H2>

      <UL>
        <li>
          <Strong>It does not invalidate the JWS.</Strong> The signature still
          verifies. Verifiers must check the revocation list separately. That
          is why <InlineCode>/poa/api/verify</InlineCode> reports{" "}
          <InlineCode>valid</InlineCode> and{" "}
          <InlineCode>freshness</InlineCode> as independent fields.
        </li>
        <li>
          <Strong>It does not touch the chain.</Strong> Revocation lives in
          the issuer&apos;s store. The on-chain agent is unaffected.
        </li>
        <li>
          <Strong>It does not delete data.</Strong> The original credential
          and its signed claims are still retrievable at{" "}
          <InlineCode>/poa/api/credential/&lt;jti&gt;</InlineCode> with{" "}
          <InlineCode>revoked</InlineCode> populated.
        </li>
      </UL>

      <H2>Sovereign agents and revocation</H2>

      <P>
        A sovereign agent has no controller, so the operator-initiated revoke
        path is unavailable. There is nobody authorized to sign the revoke
        message. This is by design: a sovereign agent&apos;s credential can
        only be invalidated by chain state changes that the agent itself
        cannot make. In the current alpha, no agents are sovereign; this
        constraint is documented for the future.
      </P>

      <PrevNext prev={{ href: "/poa/docs/verifying", label: "Verifying" }} />
    </DocsShell>
  );
}
