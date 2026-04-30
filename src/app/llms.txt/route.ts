const SITE_URL = "https://theseus.network";

const BODY = `# Theseus

> An open runtime where AI agents hold their own keys, balance, and state. Theseus is a Layer-1 chain with AI execution and verification as the primary developer surface.

## Core

- [Theseus](${SITE_URL}/): An open runtime for autonomous AI agents — agents that own assets, run inference verifiably, and persist on a Layer-1 runtime.
- [Introduction](${SITE_URL}/docs/introduction): Why a runtime where agents hold their own keys, balance, and state, and how it differs from running an LLM in a smart contract.
- [Architecture](${SITE_URL}/docs/architecture): The three-layer design — AIVM execution, TheseusStore data availability, and HotStuff BFT proof-of-stake consensus.
- [Status & Roadmap](${SITE_URL}/docs/status): What is live, what is in private preview, and what is planned next.

## Concepts

- [AIVM](${SITE_URL}/docs/aivm): The AI Virtual Machine. Tensor-native opcodes, deterministic execution, and cryptographic proof generation. Gas is priced in FLOPs, not opcodes.
- [Tensor Commits](${SITE_URL}/docs/tensor-commits): Succinct cryptographic proofs for verifiable model inference. ~2 ms verification regardless of model size; sublinear scaling for 70B+ parameter models.
- [Agents](${SITE_URL}/docs/agents): Registering agents and models, autonomous inference loops, and secure agent-to-agent interaction. Agents are first-class entities with balances and signing keys.
- [SHIP Language](${SITE_URL}/docs/ship): The domain-specific language that compiles AI intent into bounded, verifiable AIVM execution.

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
- [Design Space](${SITE_URL}/docs/design-space): Applications and market opportunities unlocked by autonomous, verifiable agents.

## External

- Whitepaper: https://docsend.com/view/p9fw7vh3ygrrnwgg
- Blog: https://theseuschain.substack.com
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
