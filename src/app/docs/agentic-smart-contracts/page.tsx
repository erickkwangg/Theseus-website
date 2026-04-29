import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Bot, GitBranch, Layers, Sparkles, TrendingUp, Zap } from "lucide-react";
import Callout from "@/components/docs/Callout";
import { EXTERNAL_LINKS } from "@/config/links";
import { DocsPageJsonLd } from "@/components/JsonLd";
import PrevNext from "@/components/docs/PrevNext";

export const metadata: Metadata = {
  title: "Agentic Smart Contracts",
  description:
    "Why agents are the next evolution of smart contracts: a thesis on stateful, sovereign on-chain AI as a first-class primitive.",
  keywords: [
    "agentic smart contracts",
    "smart contracts",
    "AI agents",
    "Theseus",
    "Ethereum",
    "tensor commits",
    "verifiable inference",
  ],
};

export default function AgenticSmartContractsPage() {
  return (
    <div className="docs-content">
      <DocsPageJsonLd title="Agentic Smart Contracts" description="Why agents are the next evolution of smart contracts: a thesis on stateful, sovereign on-chain AI as a first-class primitive." slug="agentic-smart-contracts" />
      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-400 text-xs mb-4">
          <Sparkles className="h-3 w-3" />
          Thesis
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">
          Agentic Smart Contracts
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          Why agents are the next evolution of smart contracts, not a separate technology.
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="info" title="Source article">
          <p className="mb-4">
            This page summarizes the argument from the original essay. For the full piece with
            historical context and market sizing, read it on Substack.
          </p>
          <a
            href={EXTERNAL_LINKS.substackAgenticContracts}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg transition-all text-sm font-medium no-underline"
          >
            Read Full Article <ArrowRight className="h-4 w-4" />
          </a>
        </Callout>

        {/* Historical Lineage */}
        <section className="mb-12">
          <h2 id="lineage" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-700 dark:text-indigo-300">
              <Layers className="h-5 w-5" />
            </span>
            A short history of on-chain primitives
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Each generation of crypto infrastructure has done one thing: replace a class of trusted
            human intermediaries with consensus over verifiable state transitions. Agentic smart
            contracts are the next step in that lineage.
          </p>

          <div className="docs-card border-indigo-200 dark:border-indigo-900/50 mb-6">
            <div className="space-y-5">
              {[
                {
                  symbol: "₿",
                  color: "text-yellow-700 dark:text-yellow-400",
                  name: "Bitcoin (2009)",
                  desc: "Stateful, on-chain executable, non-Turing-complete code. Solved consensus over money among strangers and removed treasurers from ownership.",
                },
                {
                  symbol: "Ξ",
                  color: "text-indigo-700 dark:text-indigo-300",
                  name: "Ethereum (2014)",
                  desc: "Stateful, Turing-complete program execution replicated across every node. Removed judges from program behavior. Practical only for narrow, deterministic logic.",
                },
                {
                  symbol: "Θ",
                  color: "text-green-700 dark:text-green-400",
                  name: "Theseus (Now)",
                  desc: "Stateful, sovereign agents whose reasoning is publicly verifiable via Tensor Commits. Removes hosts from the question of what an intelligent entity will decide.",
                },
              ].map((item) => (
                <div key={item.name} className="flex items-start gap-4">
                  <span className={`${item.color} font-bold text-2xl w-8 shrink-0`}>{item.symbol}</span>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-medium mb-1">{item.name}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            The pattern matches earlier transitions in computing. Hashcash predated Bitcoin by a
            decade, but proof-of-work only became economically meaningful once it was bound to
            stateful ownership. By the same logic, today&apos;s AI agents are missing the
            stateful, sovereign substrate that made smart contracts a global market in the first
            place.
          </p>
        </section>

        {/* What Smart Contracts Do, What Agents Do */}
        <section className="mb-12">
          <h2 id="contracts-vs-agents" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-700 dark:text-indigo-300">
              <Bot className="h-5 w-5" />
            </span>
            Smart contracts and AI agents are complementary
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            A smart contract is, in the original definition, a digital contract stored on a
            blockchain that automatically executes when predetermined terms are met. It applies
            narrow, predefined rules deterministically. An AI agent does the opposite: it ingests
            varied inputs through a foundation model and produces sophisticated, non-deterministic
            outputs informed by context and external data.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="docs-card">
              <h4 className="font-medium mb-3 text-gray-700 dark:text-gray-300">Smart contracts have</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>Stateful, on-chain execution</li>
                <li>Sovereignty (no host can override them)</li>
                <li>Replicated execution consensus</li>
                <li>Narrow, deterministic logic</li>
              </ul>
            </div>
            <div className="docs-card border-indigo-200 dark:border-indigo-900/50">
              <h4 className="font-medium mb-3 text-indigo-700 dark:text-indigo-300">AI agents have</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>Reasoning over open-ended inputs</li>
                <li>Access to real-world context</li>
                <li>Sophisticated, non-deterministic outputs</li>
                <li>No native statefulness or sovereignty</li>
              </ul>
            </div>
          </div>

          <Callout type="tip" title="The missing primitive">
            What today&apos;s agents lack is exactly what smart contracts provide: stateful,
            sovereign execution that can be verified collectively. Theseus closes that gap by
            making inference itself verifiable, so an agent can run on-chain without every node
            replicating its compute.
          </Callout>
        </section>

        {/* Prior runtime attempts */}
        <section className="mb-12">
          <h2 id="prior-attempts" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-700 dark:text-indigo-300">
              <GitBranch className="h-5 w-5" />
            </span>
            Why prior runtime attempts did not unlock the design space
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Over the last decade, several runtimes have promised to extend what smart contracts can
            do. SVM, MoveVM, eWASM, and parallel execution layers like Polkadot all delivered real
            engineering improvements. None of them, however, broke out of the same design space the
            EVM defined.
          </p>

          <div className="docs-card mb-6">
            <h4 className="font-medium mb-3 text-gray-700 dark:text-gray-300">The shared constraint</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
              Every one of these runtimes still ships deterministic, Turing-complete code that gets
              fully replicated across the network. That is a tooling change, not a primitive
              change. The price you pay for full replication is what keeps complex on-chain
              applications expensive and narrow.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Vitalik&apos;s original whitepaper described general-purpose, trust-minimized
              programs powerful enough to host DAOs and programmable finance. Full state
              replication makes that vision practically out of reach for most non-trivial
              applications. Agentic smart contracts unlock it without requiring Ethereum to hard
              fork.
            </p>
          </div>
        </section>

        {/* The architectural shift */}
        <section className="mb-12">
          <h2 id="architecture" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-green-500/10 text-green-700 dark:text-green-400">
              <Zap className="h-5 w-5" />
            </span>
            The architectural shift: verify, do not replicate
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            The Theseus consensus model swaps full replication for verifiable inference. One
            node performs the inference and produces a lightweight Tensor Commit proof. Other
            nodes verify the proof before committing the result on-chain.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="docs-card">
              <h4 className="font-medium mb-3 text-gray-700 dark:text-gray-300">Ethereum-style consensus</h4>
              <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>1. Every node executes the same code</li>
                <li>2. Nodes compare resulting state</li>
                <li>3. Cost scales with what the heaviest node can run</li>
              </ol>
            </div>
            <div className="docs-card border-green-200 dark:border-green-900/50">
              <h4 className="font-medium mb-3 text-green-700 dark:text-green-400">Theseus consensus</h4>
              <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>1. One node runs the inference</li>
                <li>2. A Tensor Commit proves it ran honestly</li>
                <li>3. Other nodes verify the proof, not the work</li>
              </ol>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Verification is orders of magnitude cheaper than re-execution, so the network can host
            agents whose work would be uneconomical under full replication. Tensor Commits play
            roughly the same role for AI that proof-of-work played for ownership: a primitive that
            binds verifiable computation to public state.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/docs/tensor-commits"
              className="inline-flex items-center gap-2 bg-transparent border border-indigo-600 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-600 hover:text-slate-900 dark:hover:text-white px-5 py-2 rounded-lg transition-all text-sm no-underline"
            >
              How Tensor Commits work
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/docs/architecture"
              className="inline-flex items-center gap-2 bg-transparent border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-800 px-5 py-2 rounded-lg transition-all text-sm no-underline"
            >
              Full architecture
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Concrete example */}
        <section className="mb-12">
          <h2 id="lending-example" className="text-2xl font-medium mb-6">A concrete example: lending</h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Lending is one of the largest on-chain application categories today. The architectural
            difference between an Ethereum lending protocol and an agentic lending protocol shows
            what this primitive shift actually changes.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="docs-card">
              <h4 className="font-medium mb-3 text-gray-700 dark:text-gray-300">Lending on Ethereum today</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>An off-chain backend computes rates and risk</li>
                <li>A keeper bot pushes parameters on-chain</li>
                <li>The contract executes against oracle data</li>
                <li>Updating logic means deploying a new contract or governance upgrade</li>
              </ul>
            </div>
            <div className="docs-card border-indigo-200 dark:border-indigo-900/50">
              <h4 className="font-medium mb-3 text-indigo-700 dark:text-indigo-300">Lending as an agentic smart contract</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>The market itself is a first-class on-chain agent</li>
                <li>Pricing comes from the agent&apos;s own inference</li>
                <li>Validators verify the Tensor Commit receipt, not the work</li>
                <li>The agent can swap context or models without redeploying</li>
              </ul>
            </div>
          </div>

          <Callout type="info" title="What changes in practice">
            The lending logic is no longer split between an off-chain brain and an on-chain
            executor. The brain is the contract. Anyone can verify how a rate decision was
            reached, and the protocol can adapt without governance ceremony every time the model
            improves.
          </Callout>
        </section>

        {/* Market */}
        <section className="mb-12">
          <h2 id="market" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-green-500/10 text-green-700 dark:text-green-400">
              <TrendingUp className="h-5 w-5" />
            </span>
            Why this is a separate market, not an upgrade
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Hashcash sits at near-zero market cap. Bitcoin, which embedded the same proof-of-work
            primitive into stateful ownership, is worth orders of magnitude more. Agents and smart
            contracts have the same relationship today. Plenty of agent frameworks exist, but none
            of them are stateful or sovereign in the on-chain sense.
          </p>

          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Binding agents to a verifiable execution layer creates a market that neither smart
            contracts nor agents can address on their own. Two categories that have no good home
            today:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="docs-card border-green-200 dark:border-green-900/50">
              <h4 className="font-medium mb-2 text-green-700 dark:text-green-400">Subjective prediction markets</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Outcomes that depend on judgment, not lookups. &quot;Was the iPhone Air launch a
                flop?&quot; can be adjudicated by a publicly verifiable agent rather than a human
                committee or a centralized oracle.
              </p>
            </div>
            <div className="docs-card border-green-200 dark:border-green-900/50">
              <h4 className="font-medium mb-2 text-green-700 dark:text-green-400">AI Persons</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Fully autonomous on-chain entities that own assets, sign their own actions, and
                participate in the economy as first-class agents rather than as proxies for a
                human key.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/docs/design-space"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-lg transition-all text-sm font-medium no-underline"
            >
              Full design space
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/docs/comparison"
              className="inline-flex items-center gap-2 bg-transparent border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-800 px-5 py-2 rounded-lg transition-all text-sm no-underline"
            >
              Side-by-side with Ethereum
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Navigation */}
        <div className="border-t border-slate-200 dark:border-gray-800 pt-8 grid sm:grid-cols-2 gap-4">
          <Link href="/docs/comparison" className="group no-underline">
            <div className="docs-card h-full">
              <p className="text-sm text-slate-600 dark:text-gray-500 mb-1">Previous</p>
              <h3 className="font-medium group-hover:text-indigo-700 dark:text-indigo-300 transition-colors">
                ← Theseus vs. Ethereum
              </h3>
            </div>
          </Link>
          <Link href="/docs/design-space" className="group no-underline">
            <div className="docs-card h-full text-right">
              <p className="text-sm text-slate-600 dark:text-gray-500 mb-1">Next</p>
              <h3 className="font-medium group-hover:text-indigo-700 dark:text-indigo-300 transition-colors">
                Design Space →
              </h3>
            </div>
          </Link>
        </div>
      </div>
      <PrevNext current="agentic-smart-contracts" />

    </div>
  );
}
