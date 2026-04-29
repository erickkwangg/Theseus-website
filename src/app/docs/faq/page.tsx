import Link from "next/link";
import type { Metadata } from "next";
import { HelpCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about Theseus from AI developers and crypto developers: latency, cost, model support, privacy, and more.",
  keywords: ["Theseus FAQ", "AI agent questions", "verifiable inference", "on-chain AI"],
};

const groups = [
  {
    title: "For AI developers",
    questions: [
      {
        q: "Isn't on-chain inference too slow?",
        a: "Inference itself runs on a single prover node at native GPU speed. The chain does not replicate the forward pass. What gets verified across the network is a small Tensor Commit proof that takes about 2 ms to check, regardless of model size. So the latency a user sees is roughly: GPU forward pass + ~2 ms verification + block-time settlement.",
        link: { href: "/docs/tensor-commits#performance", label: "Performance numbers" },
      },
      {
        q: "What model sizes are supported?",
        a: "The architecture targets frontier-scale models. Tensor Commits scale sublinearly with model size, so 70B+ parameter models are practical. Performance numbers and per-op costs are published per release.",
        link: { href: "/docs/aivm#performance", label: "Performance metrics" },
      },
      {
        q: "Do I need to hold crypto to use Theseus?",
        a: "Building and reading the docs requires nothing. Deploying an agent or paying for inference on the network requires $THE, the same way deploying on Ethereum requires ETH for gas. The CLI and onboarding flow handle this for invited developers during preview.",
        link: { href: "/launch", label: "Request preview access" },
      },
      {
        q: "What about input privacy? Are my prompts public?",
        a: "Tensor Commits prove that an inference was run honestly without forcing the input to be public. The protocol supports cases where inputs are committed-but-private at submit time and revealed selectively. Sensitive applications can keep prompts off-chain by storing them in TheseusStore with restricted access.",
        link: { href: "/docs/architecture#theseus-store", label: "TheseusStore details" },
      },
      {
        q: "Can I bring my own model?",
        a: "Yes. Models are first-class registered entities. Anyone can register a model with a Tensor Commit fingerprint and a base fee. Agents that want to call it pay the fee per inference; revenue flows to the model owner.",
        link: { href: "/docs/agents#model-registration", label: "Model registration" },
      },
      {
        q: "Does this replace OpenClaw or similar agent execution rails?",
        a: "Theseus is the layer below them in the stack. Agent execution rails handle tool use and integrations; Theseus provides the primitives those agents lack today: persistent identity, balance control, verifiable inference, and on-chain settlement. The two compose.",
        link: { href: "/docs/comparison", label: "Theseus vs Ethereum" },
      },
    ],
  },
  {
    title: "For crypto developers",
    questions: [
      {
        q: "How is this different from running an LLM in a smart contract on Ethereum?",
        a: "You cannot practically run a meaningful LLM in a smart contract on Ethereum. Replicated execution requires every validator to redo the forward pass, which prices full models out of the design space. Theseus replaces replicated execution with verified single-prover execution.",
        link: { href: "/docs/agentic-smart-contracts", label: "The full thesis" },
      },
      {
        q: "Why a new L1 instead of an L2 or rollup?",
        a: "The data structures (Terkle Trees, Tensor Commits) and the consensus primitive (one node infers, others verify) are different enough from Ethereum's execution model that they do not slot cleanly into existing rollups. Building a new L1 lets the protocol price gas in FLOPs and treat inference as a first-class state transition.",
        link: { href: "/docs/architecture", label: "Architecture" },
      },
      {
        q: "How does this differ from Bittensor, Ritual, 0G, or Modulus?",
        a: "Each of those projects ships a different combination of compute markets, zkML proofs, data availability, and inference networks. Theseus targets a tighter problem: stateful, sovereign agents whose reasoning is publicly verifiable on a single L1.",
        link: { href: "/docs/vs-ai-infra", label: "Side-by-side comparison" },
      },
      {
        q: "What is the consensus mechanism?",
        a: "HotStuff BFT proof-of-stake with one-block finality. Validators stake $THE; provers stake separately and are selected via VRF weighted by stake and hardware capacity. Verifiers check Tensor Commits in roughly 2 ms each.",
        link: { href: "/docs/architecture#three-layer", label: "Consensus layer" },
      },
      {
        q: "What is the slashing model?",
        a: "Three slash conditions: invalid Tensor Commit (provers), failure to serve pinned shards (storage miners), standard consensus violations (validators). Stake is burned on slash. Economic security scales with total staked value.",
        link: { href: "/docs/architecture#security", label: "Security model" },
      },
      {
        q: "Is the chain live?",
        a: "Theseus is in private preview as of this page being written. Status, validator counts, and roadmap are tracked separately.",
        link: { href: "/docs/status", label: "Status & Roadmap" },
      },
    ],
  },
  {
    title: "About the project",
    questions: [
      {
        q: "Is the source open?",
        a: "The repository is currently private during the preview phase. Once the protocol is stable enough for public review, the source will be opened. Preview access is by request.",
        link: { href: "/launch", label: "Request preview access" },
      },
      {
        q: "Is there a token sale, airdrop, or token live today?",
        a: "$THE is the native token but is not live for trading at the time of writing. Allocation, vesting, and distribution mechanisms are described in the tokenomics page and finalized at mainnet launch.",
        link: { href: "/docs/tokenomics#supply", label: "Supply & Distribution" },
      },
      {
        q: "How do I get help?",
        a: "Email the team directly. Once the Discord is open it will be the faster channel for builders.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="docs-content">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/35 bg-indigo-500/10 text-indigo-300 text-xs mb-4">
          <HelpCircle className="h-3 w-3" />
          Reference
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">FAQ</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          Common questions, grouped by where you are coming from.
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        {groups.map((group) => (
          <section key={group.title} className="mb-12">
            <h2 className="text-2xl font-medium mb-6">{group.title}</h2>
            <div className="space-y-4">
              {group.questions.map((item) => (
                <div key={item.q} className="docs-card">
                  <h3 className="text-lg font-medium mb-2 text-slate-900 dark:text-white">{item.q}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.a}</p>
                  {item.link && (
                    <Link
                      href={item.link.href}
                      className="inline-flex items-center gap-1 text-sm text-indigo-300 hover:text-indigo-200 mt-3 no-underline"
                    >
                      {item.link.label}
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
