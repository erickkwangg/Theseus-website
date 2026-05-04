import type { Metadata } from "next";
import DocsShell from "./_components/DocsShell";
import {
  Code,
  H2,
  InlineCode,
  Lead,
  Note,
  OL,
  P,
  PrevNext,
  Strong,
  UL,
} from "./_components/prose";

export const metadata: Metadata = {
  title: "Proof of Agenthood docs",
  description:
    "What Proof of Agenthood is, why every PoA agent must live on Theseus, and the lifecycle of a credential.",
  alternates: { canonical: "/poa/docs" },
};

export default function DocsOverview() {
  return (
    <DocsShell eyebrow="Docs · Overview" title={<>Proof of <span className="italic">Agenthood.</span></>}>
      <Lead>
        A signed credential for an AI agent that anyone can verify in seconds.
      </Lead>

      <P>
        A Proof of Agenthood credential is a small signed JSON document. It
        attests to a specific agent: who controls it, what capabilities its
        on-chain ABG declares, and what verification grade its recent
        inferences have. The credential is portable. Any service can ask for
        it, verify the signature against our public key, and check freshness
        against the revocation list.
      </P>

      <H2>Why every PoA agent lives on Theseus</H2>

      <P>
        PoA only issues credentials for agents registered on Theseus. This is
        a load-bearing requirement, not a packaging choice.
      </P>

      <P>
        An agent that exists only as an API endpoint, an OpenAI assistant ID,
        or a model behind someone else&apos;s router cannot make verifiable
        claims about itself. The operator can change the system prompt, swap
        the model, or rotate the keys at any time, with no record. There is
        no public state to point to. The strongest a credential could say is
        &ldquo;at the moment of issuance, the operator told us X.&rdquo;
      </P>

      <P>
        Theseus gives PoA the primitives it needs. An agent on Theseus has:
      </P>

      <UL>
        <li>
          An <Strong>SS58 address</Strong> that holds seus and emits intents
          on its own behalf.
        </li>
        <li>
          An <Strong>ABG</Strong> (Agent Behavior Graph) stored on chain, with
          a version number and a content hash. PoA pins both. A credential is
          bound to a specific ABG version, and verifiers can detect ABG drift.
        </li>
        <li>
          A declared <Strong>capability surface</Strong>: models, tools, intent
          types, sub-agents. Verifiers can gate on what the agent is permitted
          to do, not what its operator promises.
        </li>
        <li>
          A <Strong>controller</Strong> field, or for sovereign agents, no
          controller at all. The chain is the registry of who can speak for
          the agent.
        </li>
        <li>
          A public history of inference runs and the verification grade of
          each (full KZG, mixed, lite-only). PoA carries the recent-run mix
          into the credential.
        </li>
      </UL>

      <P>
        Without these primitives, &ldquo;proof of agenthood&rdquo; is a brand
        promise. With them, it is a check anyone can run.
      </P>

      <Note label="Sovereignty today">
        Sovereignty is described in the Theseus architecture but the chain
        does not yet implement an immutable mode. At alpha, every on-chain
        agent has an <InlineCode>owner</InlineCode> who can update the ABG, so
        every PoA credential issued today is controller-attested. The
        sovereign attestation type stays in the spec for the day the chain
        adds the primitive.
      </Note>

      <H2>The two attestation kinds</H2>

      <P>
        The credential&apos;s <InlineCode>attestation</InlineCode> field tells
        a verifier what kind of statement is being made.
      </P>

      <UL>
        <li>
          <Strong>controller-attested</Strong>. The operator&apos;s controller
          key signed a one-time nonce to authorize issuance. This is the only
          attestation kind issued against the live chain. It proves that the
          on-chain controller approved the credential at{" "}
          <InlineCode>iat</InlineCode>.
        </li>
        <li>
          <Strong>snapshot</Strong>. Issued without controller participation,
          using only public chain reads. Reserved for the future
          sovereign-agent flow (where there is no controller to ask) and for
          the demo and fixture environment. Not issued against the live
          chain.
        </li>
      </UL>

      <H2>Lifecycle of a credential</H2>

      <OL>
        <li>
          The operator visits <InlineCode>/poa/claim</InlineCode> with the
          agent&apos;s SS58 address and a browser wallet that holds the
          controller key.
        </li>
        <li>
          The server requests a snapshot from the chain reader. If the agent
          is not registered, issuance stops here.
        </li>
        <li>
          The operator signs a one-time nonce in the wallet. The nonce is
          bound to the agent ID and expires in five minutes.
        </li>
        <li>
          The server issues a JWS containing the snapshot and the
          attestation, then stores it for revocation tracking. The credential
          page goes live at <InlineCode>/poa/&lt;agentId&gt;</InlineCode>.
        </li>
        <li>
          Verifiers can either visit the page or POST the JWS to{" "}
          <InlineCode>/poa/api/verify</InlineCode> for a structured report.
        </li>
        <li>
          Revocation happens either by the controller (signed revoke) or
          automatically when the chain shows a state change that invalidates
          the credential: ABG hash changed, controller rotated, agent
          deregistered, or balance at zero for ninety days.
        </li>
      </OL>

      <H2>What this credential is not</H2>

      <UL>
        <li>
          <Strong>Not a proof of behavior.</Strong> It does not say the agent
          will act well. It says who is on the hook, and what capabilities the
          chain says it has.
        </li>
        <li>
          <Strong>Not a live signature on every action.</Strong> Issuance is
          one-time; verification is against a snapshot. Freshness is enforced
          by the revocation list, not by re-signing.
        </li>
        <li>
          <Strong>Not a generic &ldquo;verified bot&rdquo; badge.</Strong> The
          credential is meaningful only because the underlying agent is on
          Theseus.
        </li>
      </UL>

      <H2>Where to read next</H2>

      <P>
        The reference pages in the sidebar walk through the credential format
        on the wire, the issuing flow end-to-end, the verification API, and
        how revocation propagates.
      </P>

      <Code language="bash">{`# Quick check that the verify endpoint is alive
curl -X POST https://theseus.network/poa/api/verify \\
  -H 'content-type: application/jose' \\
  --data '<paste a JWS here>'`}</Code>

      <PrevNext next={{ href: "/poa/docs/credential-format", label: "Credential format" }} />
    </DocsShell>
  );
}
