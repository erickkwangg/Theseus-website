import type { Metadata } from "next";
import DocsShell from "../_components/DocsShell";
import {
  Code,
  H2,
  H3,
  InlineCode,
  Lead,
  Note,
  OL,
  P,
  PrevNext,
  Strong,
  UL,
} from "../_components/prose";

export const metadata: Metadata = {
  title: "Issuing",
  description:
    "How an operator mints a Proof of Agenthood credential: challenge, controller signature, and the live issue endpoint.",
  alternates: { canonical: "/poa/docs/issuing" },
};

export default function IssuingPage() {
  return (
    <DocsShell eyebrow="Docs · Reference" title={<>Issuing a <span className="italic">credential.</span></>}>
      <Lead>
        Operators mint by signing a one-time nonce with the agent&apos;s
        controller key. No passwords, no API keys. The chain&apos;s controller
        is the only authorization.
      </Lead>

      <H2>Prerequisites</H2>

      <UL>
        <li>
          The agent must be registered in <InlineCode>pallet_agents</InlineCode>{" "}
          on the Theseus chain the deployment is pointed at.
        </li>
        <li>
          The operator must hold the agent&apos;s{" "}
          <Strong>controller key</Strong> in a browser wallet (Polkadot.js,
          Talisman, SubWallet, anything that exposes sr25519 signing through
          the Polkadot extension API).
        </li>
        <li>
          The agent&apos;s seus balance must be non-zero. A deregistered or
          empty agent cannot be credentialed.
        </li>
      </UL>

      <Note label="One credential, then revoke">
        Issuance is a one-time act. PoA does not periodically re-sign a live
        attestation. If the underlying agent state changes (ABG hash,
        controller, sovereignty), the existing credential auto-revokes on the
        next freshness check, and the operator mints a new one.
      </Note>

      <H2>The flow, end to end</H2>

      <OL>
        <li>
          The operator hits <InlineCode>/poa/claim</InlineCode> and enters
          their agent&apos;s SS58 address. The page fetches a snapshot via{" "}
          <InlineCode>GET /poa/api/snapshot/&lt;agentId&gt;</InlineCode> and
          shows what is about to be credentialed.
        </li>
        <li>
          The page requests a challenge via{" "}
          <InlineCode>POST /poa/api/challenge</InlineCode>. The server returns
          a 16-byte hex nonce bound to the agent ID, valid for five minutes.
        </li>
        <li>
          The wallet signs the challenge message{" "}
          <InlineCode>poa:&lt;agentId&gt;:&lt;nonce&gt;</InlineCode> with the
          controller key.
        </li>
        <li>
          The page posts to <InlineCode>POST /poa/api/issue</InlineCode> with
          the agent ID, nonce, and signature. The server consumes the
          challenge atomically, verifies the signature against the on-chain
          controller, mints the JWS, and returns the credential URLs.
        </li>
      </OL>

      <H2>Step 1. Request a challenge</H2>

      <Code language="bash">{`curl -X POST https://theseus.network/poa/api/challenge \\
  -H 'content-type: application/json' \\
  -d '{ "agentId": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY" }'`}</Code>

      <Code language="json">{`{
  "nonce": "9b4f...e21c",
  "agentId": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
  "message": "poa:5GrwvaEF...HGKutQY:9b4f...e21c",
  "expiresAt": 1735689600000
}`}</Code>

      <P>
        <InlineCode>message</InlineCode> is what the wallet must sign. It is
        scoped by the <InlineCode>poa:</InlineCode> prefix so a controller
        signature for PoA cannot be replayed against another protocol that
        prompts for a signed message.
      </P>

      <H3>Sign in the browser</H3>

      <Code language="ts">{`import { web3Enable, web3FromAddress } from "@polkadot/extension-dapp";

await web3Enable("Proof of Agenthood");
const injector = await web3FromAddress(controllerAddress);
const { signature } = await injector.signer.signRaw({
  address: controllerAddress,
  data: message,            // from the challenge response
  type: "bytes",
});
// signature is a 0x-prefixed hex string; strip the 0x for the issue request.`}</Code>

      <H2>Step 2. Issue</H2>

      <Code language="bash">{`curl -X POST https://theseus.network/poa/api/issue \\
  -H 'content-type: application/json' \\
  -d '{
    "agentId": "5GrwvaEF...HGKutQY",
    "controllerSig": {
      "nonce": "9b4f...e21c",
      "signatureHex": "a3b1...f7"
    }
  }'`}</Code>

      <Code language="json">{`{
  "jti": "01HQXY...",
  "agentId": "5GrwvaEF...HGKutQY",
  "issuedAt": 1735689420123,
  "credentialUrl": "/poa/api/credential/01HQXY...",
  "pageUrl": "/poa/5GrwvaEF...HGKutQY"
}`}</Code>

      <P>
        Fetch the JWS itself with{" "}
        <InlineCode>GET /poa/api/credential/&lt;jti&gt;</InlineCode>. Send{" "}
        <InlineCode>Accept: application/jose</InlineCode> for the raw JWS, or
        accept the default JSON wrapper.
      </P>

      <H2>Failure modes</H2>

      <UL>
        <li>
          <Strong>400 challenge-expired-or-unknown</Strong>. The nonce was
          already consumed or older than five minutes. Request a fresh one.
        </li>
        <li>
          <Strong>400 challenge-agent-mismatch</Strong>. The nonce was issued
          for a different agent ID than the one in the issue request.
        </li>
        <li>
          <Strong>400 controllerSig-malformed</Strong>. Signature is not a
          well-formed hex string of the expected length.
        </li>
        <li>
          <Strong>400 signature-invalid</Strong>. The chain reader confirmed
          the signature does not verify against the agent&apos;s on-chain
          controller. Most often this means the wrong wallet account signed.
        </li>
        <li>
          <Strong>400 agent-not-registered</Strong>. No{" "}
          <InlineCode>AgentInfo</InlineCode> for the given SS58 address.
        </li>
        <li>
          <Strong>503 chain-unreachable</Strong>. The Theseus RPC endpoint is
          down or misconfigured. PoA fails loud rather than silently falling
          back to fixtures.
        </li>
        <li>
          <Strong>429</Strong>. Five issues per five-minute window per IP. The
          response includes <InlineCode>Retry-After</InlineCode>.
        </li>
      </UL>

      <H2>Where the credential lives</H2>

      <P>
        After a successful issue, the credential is reachable in three places:
      </P>

      <UL>
        <li>
          <Strong>Public page</Strong>:{" "}
          <InlineCode>/poa/&lt;agentId&gt;</InlineCode>. The human-readable
          credential surface.
        </li>
        <li>
          <Strong>Raw JWS</Strong>:{" "}
          <InlineCode>/poa/api/credential/&lt;jti&gt;</InlineCode> with{" "}
          <InlineCode>Accept: application/jose</InlineCode>.
        </li>
        <li>
          <Strong>Verification endpoint</Strong>:{" "}
          <InlineCode>POST /poa/api/verify</InlineCode> with the JWS in the
          body. See the next page.
        </li>
      </UL>

      <PrevNext
        prev={{ href: "/poa/docs/credential-format", label: "Credential format" }}
        next={{ href: "/poa/docs/verifying", label: "Verifying" }}
      />
    </DocsShell>
  );
}
