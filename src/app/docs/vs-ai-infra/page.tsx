import Link from "next/link";
import type { Metadata } from "next";
import { Network, ArrowRight, AlertTriangle } from "lucide-react";
import Callout from "@/components/docs/Callout";
import { DocsPageJsonLd } from "@/components/JsonLd";
import PrevNext from "@/components/docs/PrevNext";

export const metadata: Metadata = {
  title: "Theseus vs AI-Infra Peers",
  description:
    "How Theseus compares to Bittensor, Ritual, 0G, Modulus, Allora, and other AI-infrastructure projects.",
  keywords: [
    "Theseus vs Bittensor",
    "Theseus vs Ritual",
    "Theseus vs 0G",
    "Theseus vs Modulus",
    "Theseus vs Allora",
    "AI infrastructure",
    "verifiable inference",
  ],
};

const peers = [
  {
    name: "Bittensor",
    summary: "A subnet-based marketplace for machine intelligence, paying participants in TAO based on the quality of their model output relative to peers.",
    primary: "A compute and intelligence market.",
    differs:
      "Bittensor scores subnet output and rewards contributors. It is not a stateful execution layer where agents hold balances and call contracts. Theseus and Bittensor are complements, not substitutes.",
  },
  {
    name: "Ritual",
    summary: "A sovereign chain for AI agents and inference workloads, focusing on the developer experience of calling models from on-chain logic.",
    primary: "An on-chain inference network.",
    differs:
      "Ritual exposes inference as a callable service. Theseus treats agents as first-class state-machines and inference itself as a verified state transition with Tensor Commits, not a hosted call.",
  },
  {
    name: "0G",
    summary: "A modular AI stack that separates a high-throughput data availability layer from a serving layer for AI workloads.",
    primary: "A modular DA-and-serving stack.",
    differs:
      "0G prioritizes data throughput as a primitive. Theseus is integrated end-to-end (execution + storage + consensus) so that agent state, model weights, and verified inference share a single security model.",
  },
  {
    name: "Modulus / EZKL / zkML systems",
    summary: "Toolchains for producing zk-SNARK proofs of neural network inference, suitable for embedding into existing chains.",
    primary: "Proof tooling for inference.",
    differs:
      "zkML proofs are succinct but the prover-side overhead is typically 1000x or higher, which keeps them limited to small models. Tensor Commits target the same proof-size benefit at well under 1% prover overhead, which is the difference between proof-of-concept and frontier-scale production.",
  },
  {
    name: "Allora",
    summary: "A network of context-aware AI workers producing forecasts and intelligence as a paid service.",
    primary: "A forecasting/intelligence network.",
    differs:
      "Allora monetizes inference outputs. Theseus is the layer underneath where those outputs can be settled, paid for, and acted upon by autonomous agents with their own balances.",
  },
];

const dimensions = [
  { dim: "Inference verification", theseus: "Tensor Commits, ~2 ms verifier work", peers: "Mixed: re-execution, zkML, scoring, or trust" },
  { dim: "Native agent state", theseus: "First-class on-chain primitive", peers: "Usually contracts or off-chain workers" },
  { dim: "Agent-held balances and signing", theseus: "Native to the protocol", peers: "Typically requires an EOA or custodian" },
  { dim: "Model registration and revenue", theseus: "On-chain entity, fee accrues to model owner", peers: "Often hosted endpoints" },
  { dim: "Stack integration", theseus: "Integrated execution, storage, consensus", peers: "Often modular" },
];

export default function VsAIInfraPage() {
  return (
    <div className="docs-content">
      <DocsPageJsonLd title="Theseus vs AI-Infra Peers" description="How Theseus compares to Bittensor, Ritual, 0G, Modulus, Allora, and other AI-infrastructure projects." slug="vs-ai-infra" />
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-400 text-xs mb-4">
          <Network className="h-3 w-3" />
          Why Theseus
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">
          Theseus vs AI-Infra Peers
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          How Theseus relates to other AI-infrastructure projects, and where the differentiation actually lives.
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="info" title="Read this first">
          Most projects in this space solve part of the problem: compute markets, inference proofs, data availability, intelligence networks. Theseus is the integrated layer where stateful, sovereign agents hold balances, call models, and have their reasoning verified by the same consensus that finalizes blocks.
        </Callout>

        {/* Dimensions table */}
        <section className="mb-12">
          <h2 id="dimensions" className="text-2xl font-medium mb-4">Where Theseus differs in shape</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The peer landscape varies along a few axes. This table is the high-level read; per-project notes follow below.
          </p>
          <div className="overflow-x-auto">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Dimension</th>
                  <th className="text-indigo-700 dark:text-indigo-300">Theseus</th>
                  <th className="text-gray-600 dark:text-gray-400">AI-infra peers</th>
                </tr>
              </thead>
              <tbody>
                {dimensions.map((d) => (
                  <tr key={d.dim}>
                    <td className="font-medium text-slate-900 dark:text-white">{d.dim}</td>
                    <td className="text-indigo-700 dark:text-indigo-300">{d.theseus}</td>
                    <td>{d.peers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Per-peer notes */}
        <section className="mb-12">
          <h2 id="per-peer" className="text-2xl font-medium mb-4">Per-project notes</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Brief reads, written from public positioning. Treat these as starting points; the projects move quickly and any team comparing seriously should validate against the most recent docs.
          </p>
          <div className="space-y-4">
            {peers.map((p) => (
              <div key={p.name} className="docs-card">
                <h3 className="text-lg font-medium mb-2">{p.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{p.summary}</p>
                <div className="grid sm:grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Primary focus:</span>
                  <span className="text-slate-800 dark:text-slate-200">{p.primary}</span>
                  <span className="text-slate-600 dark:text-slate-400">Where Theseus differs:</span>
                  <span className="text-slate-700 dark:text-slate-300">{p.differs}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Caveat */}
        <section className="mb-12">
          <Callout type="warning" title="Caveat on comparisons">
            <p>
              These are summaries of public positioning, not detailed technical audits. The right
              comparison for your project depends on what you are building. If you want a more
              specific read, the Theseus team is happy to walk through it.
            </p>
          </Callout>
        </section>

        {/* Navigation */}
        <div className="border-t border-slate-200 dark:border-gray-800 pt-8 grid sm:grid-cols-2 gap-4">
          <Link href="/docs/comparison" className="group no-underline">
            <div className="docs-card h-full">
              <p className="text-sm text-slate-600 dark:text-gray-500 mb-1">Previous</p>
              <h3 className="font-medium group-hover:text-indigo-700 dark:text-indigo-300 transition-colors">← Theseus vs Ethereum</h3>
            </div>
          </Link>
          <Link href="/docs/agentic-smart-contracts" className="group no-underline">
            <div className="docs-card h-full text-right">
              <p className="text-sm text-slate-600 dark:text-gray-500 mb-1">Next</p>
              <h3 className="font-medium group-hover:text-indigo-700 dark:text-indigo-300 transition-colors">Agentic Smart Contracts →</h3>
            </div>
          </Link>
        </div>

        <p className="text-xs text-gray-600 mt-8 inline-flex items-center gap-1.5">
          <AlertTriangle className="h-3 w-3" />
          Last reviewed for the public positioning of each project. Open to updates.
        </p>
      </div>
      <PrevNext current="vs-ai-infra" />

    </div>
  );
}
