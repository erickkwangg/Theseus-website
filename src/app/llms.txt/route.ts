const SITE_URL = "https://theseus.network";

const BODY = `# Theseus

> An open runtime where AI agents hold their own keys, balance, and state. Theseus is a Layer-1 chain with AI execution and verification as the primary developer surface.

## Core

- [Theseus](${SITE_URL}/): An open runtime for autonomous AI agents that own assets, run inference verifiably, and persist on a Layer-1 runtime.
- [Introduction](${SITE_URL}/docs/introduction): Why a runtime where agents hold their own keys, balance, and state, and how it differs from running an LLM in a smart contract.
- [Architecture](${SITE_URL}/docs/architecture): Substrate-based runtime with Theseus-specific pallets, off-chain provers, blessed enclave for tools, Layer0 bridge — verify-not-replicate consensus.
- [Status & Roadmap](${SITE_URL}/docs/status): What is live, what is in private preview, and what is planned next.

## Concepts

- [AIVM](${SITE_URL}/docs/aivm): The AI Virtual Machine. Tensor-native opcodes, deterministic execution, and cryptographic proof generation. Gas is priced in FLOPs, not opcodes.
- [Tensor Commits](${SITE_URL}/docs/tensor-commits): Succinct cryptographic proofs for verifiable model inference. ~2 ms verification regardless of model size; sublinear scaling for 70B+ parameter models.
- [Agents](${SITE_URL}/docs/agents): Registering agents and models, autonomous inference loops, and secure agent-to-agent interaction. Agents are first-class entities with balances and signing keys.
- [SHIP](${SITE_URL}/docs/ship): Structured Hierarchical Instructional Programs — declarative agent specification format. Compiles via shipc to a SCALE-encoded CompiledAgent the chain registers directly.

## System

- [Execution Model](${SITE_URL}/docs/execution): Three-stage queue / prove / resume. How an agent call lands, gets proved off-chain, and resumes via an inherent-driven on_initialize hook.
- [Provers](${SITE_URL}/docs/provers): Two-tier prover ecosystem (full TensorCommitment vs lite signature-only), VRF selection over a capacity registry, BLS12-381 + sumcheck + Plookup-style lookups.
- [Tools & Enclave](${SITE_URL}/docs/tools): On-chain tools execute deterministically; off-chain tools (web search, authenticated HTTP, x402) run inside a TEE that holds the chain's key. Credential model evolves user-provided → agent-created → self-sovereign.
- [Data Availability](${SITE_URL}/docs/data-availability): TheseusStore — content-addressed roots anchored on-chain (weights_root, context_root) make heavy data verifiable without on-chain replication. Correctness vs availability separation.
- [Security](${SITE_URL}/docs/security): Trust assumptions at alpha (validators, full prover, lite provers, blessed enclave), prover accountability, DoS defense, KZG verification cost model.
- [Governance](${SITE_URL}/docs/governance): Forkless runtime upgrades via set_code, validator vote with grace period and delegation, scope at alpha (runtime / prover set / validator set).

## Building

- [Quickstart](${SITE_URL}/docs/quickstart): Set up a Theseus node and deploy your first autonomous agent.
- [Examples](${SITE_URL}/docs/examples): Full SHIP examples and ecosystem walkthroughs.
- [Launch](${SITE_URL}/launch): Request preview access, install the CLI, and deploy your first verifiable agent.
- [Playground](${SITE_URL}/playground): Try a SHIP agent: write the agent, run it against the runtime, inspect the signed receipt.

## Comparisons

- [Theseus vs Ethereum](${SITE_URL}/docs/comparison): Architecture and trust-model differences. Why agents that act on their own require new primitives.
- [Theseus vs AI-Infra Peers](${SITE_URL}/docs/vs-ai-infra): Side-by-side with Bittensor, Ritual, 0G, Modulus, Allora.
- [Agentic Smart Contracts](${SITE_URL}/docs/agentic-smart-contracts): The thesis on agents as the next evolution of stateful, sovereign on-chain computation.

## Reference

- [FAQ](${SITE_URL}/docs/faq): Latency, cost, model support, privacy, and other common questions.
- [Glossary](${SITE_URL}/docs/glossary): AIVM, Tensor Commits, SHIP, autonomy flag, FLOPs gas, Terkle Tree, $THE, slashing, and more.
- [Tokenomics](${SITE_URL}/docs/tokenomics): $THE utility, staking, fee flows, AI-native economic primitives.

## Proof of Agenthood

A signed credential layer for Theseus agents. Anyone can verify; operators sign once with the controller key and publish a public credential page.

- [Proof of Agenthood](${SITE_URL}/poa): Landing page with the verify lookup and the create flow as peer products.
- [Verify](${SITE_URL}/poa/verify): Paste a credential token (compact JWS) to check the signature and freshness against the chain. Programmatic endpoint at POST /poa/api/verify.
- [Create](${SITE_URL}/poa/claim): Operator flow. Pick the agent, sign a one-time nonce with the controller key, receive a signed credential.
- [Agents directory](${SITE_URL}/poa/agents): Browse every agent that currently has a credential.
- Public JWKS: ${SITE_URL}/poa/.well-known/jwks.json (Ed25519, EdDSA). Verifies any credential offline with a JOSE-compatible library.
- Per-credential pages: ${SITE_URL}/poa/<agentId> renders the artifact and links to the JWS, the JWKS, the embed snippet, and the operator revoke flow.

### PoA developer docs

- [PoA docs overview](${SITE_URL}/poa/docs): Why every PoA agent must live on Theseus, the two attestation kinds (controller-attested vs snapshot), and the credential lifecycle.
- [Credential format](${SITE_URL}/poa/docs/credential-format): JWS shape, protected header, signed PoACredentialClaims, embedded AgentSnapshot, attestation tagged union, verification grade.
- [Issuing](${SITE_URL}/poa/docs/issuing): End-to-end mint flow. Challenge nonce, controller signature in browser wallet, POST /poa/api/issue, failure modes.
- [Verifying](${SITE_URL}/poa/docs/verifying): Interactive and programmatic verification. The three independent checks (signature, revocation list, chain freshness). Offline verification recipe.
- [Revocation](${SITE_URL}/poa/docs/revocation): Operator-initiated revoke flow, automatic auto-revocation triggers (abg-changed, controller-rotated, agent-deregistered, balance-zero-90d, sovereignty-flipped), public revocation list at /poa/api/revoked.

## Blog

- [Blog index](${SITE_URL}/blog): Theseus essays. Thesis, architecture, progress notes from the team.
- [The Theseus Thesis Part 1](${SITE_URL}/blog/theseus-thesis-part-1): A first-principles exploration of Theseus. Why AI agents need a substrate with sovereignty, statefulness, and verifiability.
- [The Theseus Thesis Part 2: TAM and AI Personhood](${SITE_URL}/blog/theseus-thesis-part-2): Why we are so bullish on Theseus. Annual GDP per AI person as the anchor for Theseus's TAM, compared to Bitcoin and Ethereum value accrual.
- [Agents as an Evolution of Smart Contracts](${SITE_URL}/blog/agents-evolution-of-smart-contracts): Why Theseus is what Ethereum was meant to be. Bitcoin → Ethereum → Theseus as the lineage of "what kind of decision can be verified on-chain."
- [How Theseus would've prevented the Luna collapse](${SITE_URL}/blog/preventing-the-luna-collapse): A verifiable LLM failsafe agent reading raw vault metrics could have refused the actions that fueled the death spiral. With diagrams, a day-by-day counterfactual, and a live demo.

## External

- Whitepaper: https://docsend.com/view/p9fw7vh3ygrrnwgg
- Substack mirror: https://theseuschain.substack.com (canonical posts now at ${SITE_URL}/blog)
- GitHub: https://github.com/Theseuschain/theseuschain
`;

export function GET() {
  return new Response(BODY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
