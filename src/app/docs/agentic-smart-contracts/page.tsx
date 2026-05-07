import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Bot,
  GitBranch,
  Layers,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import Callout from "@/components/docs/Callout";
import { DocsPageJsonLd } from "@/components/JsonLd";
import PrevNext from "@/components/docs/PrevNext";

export const metadata: Metadata = {
  title: "Agentic Smart Contracts",
  description:
    "Why agents are the next evolution of smart contracts — and what becomes possible once they have full agency. The thesis, the architectural shift, and the design space it opens.",
  keywords: [
    "agentic smart contracts",
    "smart contracts",
    "AI agents",
    "Theseus",
    "Ethereum",
    "tensor commits",
    "verifiable inference",
    "design space",
    "sovereign agents",
    "AI persons",
  ],
  alternates: { canonical: "/docs/agentic-smart-contracts" },
};

export default function AgenticSmartContractsPage() {
  return (
    <div className="docs-content">
      <DocsPageJsonLd
        title="Agentic Smart Contracts"
        description="Why agents are the next evolution of smart contracts — and what becomes possible once they have full agency."
        slug="agentic-smart-contracts"
      />

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs mb-4">
          <Sparkles className="h-3 w-3" />
          Thesis
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">
          Agentic Smart Contracts
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          Why agents are the next evolution of smart contracts — and what
          becomes possible once they have full agency.
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="info" title="Source article">
          <p className="mb-4">
            This page is the doc-form summary. The full essay walks the
            history, the architectural argument, and the market sizing in
            one read.
          </p>
          <Link
            href="/blog/agents-evolution-of-smart-contracts"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg transition-all text-sm font-medium no-underline"
          >
            Read the full article <ArrowRight className="h-4 w-4" />
          </Link>
        </Callout>

        {/* Two lineages */}
        <section className="mb-12">
          <h2
            id="lineages"
            className="text-2xl font-medium mb-6 flex items-center gap-3"
          >
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-300">
              <Layers className="h-5 w-5" />
            </span>
            Two lineages, one missing piece
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Whichever side you came from, the gap is the same. Smart contracts
            need open-ended reasoning. AI agents need stateful, sovereign
            substrate. Theseus is the intersection.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="docs-card border-indigo-900/50">
              <h3 className="font-medium mb-4 text-indigo-300 flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-slate-500">
                  Crypto lineage
                </span>
              </h3>
              <div className="space-y-4">
                {[
                  {
                    symbol: "₿",
                    color: "text-yellow-400",
                    name: "Bitcoin (2009)",
                    desc: "Stateful, on-chain executable, non-Turing-complete code. Removed treasurers from money.",
                  },
                  {
                    symbol: "Ξ",
                    color: "text-indigo-300",
                    name: "Ethereum (2014)",
                    desc: "Stateful, Turing-complete program execution replicated across every node. Removed judges from program behavior. Practical only for narrow, deterministic logic.",
                  },
                  {
                    symbol: "Θ",
                    color: "text-green-400",
                    name: "Theseus (2026)",
                    desc: "Stateful, sovereign agents whose reasoning is publicly verifiable. Removes hosts from what an intelligent entity decides.",
                  },
                ].map((item) => (
                  <div key={item.name} className="flex items-start gap-3">
                    <span
                      className={`${item.color} font-bold text-xl w-7 shrink-0`}
                    >
                      {item.symbol}
                    </span>
                    <div>
                      <h4 className="text-slate-900 dark:text-white text-sm font-medium mb-1">
                        {item.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="docs-card border-green-900/50">
              <h3 className="font-medium mb-4 text-green-400 flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-slate-500">
                  AI lineage
                </span>
              </h3>
              <div className="space-y-4">
                {[
                  {
                    color: "text-slate-700 dark:text-slate-200",
                    name: "ChatGPT (2022)",
                    unlock: "Reasoning and language intelligence at scale.",
                    cannot: "Cannot act independently in the world.",
                  },
                  {
                    color: "text-indigo-300",
                    name: "OpenClaw (2025)",
                    unlock: "Execution rails for AI actions.",
                    cannot: "Cannot persist economically on its own.",
                  },
                  {
                    color: "text-green-400",
                    name: "Theseus (2026)",
                    unlock:
                      "Full agency: native ownership, settlement, persistence.",
                  },
                ].map((item) => (
                  <div key={item.name}>
                    <h4
                      className={`${item.color} text-sm font-medium mb-1`}
                    >
                      {item.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {item.unlock}
                    </p>
                    {item.cannot && (
                      <p className="text-rose-300/90 text-xs italic mt-1">
                        cannot: {item.cannot}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Callout type="tip" title="Key insight">
            Each step in either lineage removes a human dependency. Bitcoin
            removed treasurers. Ethereum removed judges. ChatGPT removed the
            human as the only source of language reasoning. Theseus removes
            the host as the entity that owns and operates an agent.
          </Callout>
        </section>

        {/* Smart contracts vs agents */}
        <section className="mb-12">
          <h2
            id="contracts-vs-agents"
            className="text-2xl font-medium mb-6 flex items-center gap-3"
          >
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-300">
              <Bot className="h-5 w-5" />
            </span>
            Smart contracts and AI agents are complementary
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            A smart contract is, in the original definition, a digital
            contract stored on a blockchain that automatically executes when
            predetermined terms are met. It applies narrow, predefined rules
            deterministically. An AI agent does the opposite: it ingests
            varied inputs through a foundation model and produces
            sophisticated, non-deterministic outputs informed by context and
            external data.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="docs-card">
              <h4 className="font-medium mb-3 text-gray-700 dark:text-gray-300">
                Smart contracts have
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>Stateful, on-chain execution</li>
                <li>Sovereignty (no host can override them)</li>
                <li>Replicated execution consensus</li>
                <li>Narrow, deterministic logic</li>
              </ul>
            </div>
            <div className="docs-card border-indigo-900/50">
              <h4 className="font-medium mb-3 text-indigo-300">
                AI agents have
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>Reasoning over open-ended inputs</li>
                <li>Access to real-world context</li>
                <li>Sophisticated, non-deterministic outputs</li>
                <li>No native statefulness or sovereignty</li>
              </ul>
            </div>
          </div>

          <Callout type="tip" title="The missing primitive">
            What today&apos;s agents lack is exactly what smart contracts
            provide: stateful, sovereign execution that can be verified
            collectively. Theseus closes that gap by making inference itself
            verifiable, so an agent can run on-chain without every node
            replicating its compute.
          </Callout>
        </section>

        {/* Why prior runtime attempts didn't unlock the design space */}
        <section className="mb-12">
          <h2
            id="prior-attempts"
            className="text-2xl font-medium mb-6 flex items-center gap-3"
          >
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-300">
              <GitBranch className="h-5 w-5" />
            </span>
            Why prior runtimes never unlocked this design space
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Over the last decade, runtimes like SVM, MoveVM, eWASM, and
            various parallel execution layers have all delivered real
            engineering improvements. None of them broke out of the design
            space the EVM defined.
          </p>

          <div className="docs-card mb-6">
            <h4 className="font-medium mb-3 text-gray-700 dark:text-gray-300">
              The shared constraint
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
              Every one of these runtimes still ships{" "}
              <strong className="text-slate-900 dark:text-white">
                deterministic, fully replicated execution
              </strong>{" "}
              across every node. That&apos;s a tooling change, not a primitive
              change. The price you pay for full replication is what keeps
              complex on-chain applications expensive and narrow.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Vitalik&apos;s original whitepaper described general-purpose,
              trust-minimized programs powerful enough to host DAOs and
              programmable finance. Full state replication makes that vision
              practically out of reach for most non-trivial applications.
              Agentic smart contracts unlock it without requiring Ethereum
              to hard fork.
            </p>
          </div>
        </section>

        {/* Architectural shift */}
        <section className="mb-12">
          <h2
            id="architecture"
            className="text-2xl font-medium mb-6 flex items-center gap-3"
          >
            <span className="p-1.5 rounded-lg bg-green-500/10 text-green-400">
              <Zap className="h-5 w-5" />
            </span>
            The shift: verify, don&rsquo;t replicate
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Theseus swaps full replication for verifiable inference. One
            node performs the inference and produces a lightweight Tensor
            Commit proof. Other nodes verify the proof — in constant time —
            before committing the result on-chain.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="docs-card">
              <h4 className="font-medium mb-3 text-gray-700 dark:text-gray-300">
                Ethereum-style consensus
              </h4>
              <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>1. Every node executes the same code</li>
                <li>2. Nodes compare resulting state</li>
                <li>3. Cost scales with what the heaviest node can run</li>
              </ol>
            </div>
            <div className="docs-card border-green-900/50">
              <h4 className="font-medium mb-3 text-green-400">
                Theseus consensus
              </h4>
              <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>1. One node runs the inference</li>
                <li>2. A Tensor Commit proves it ran honestly</li>
                <li>3. Other nodes verify the proof, not the work</li>
              </ol>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Verification is orders of magnitude cheaper than re-execution, so
            the network can host agents whose work would be uneconomical
            under full replication. Tensor Commits play roughly the same role
            for AI that proof-of-work played for ownership: a primitive that
            binds verifiable computation to public state.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/docs/tensor-commits"
              className="inline-flex items-center gap-2 bg-transparent border border-indigo-600 text-indigo-300 hover:bg-indigo-600 hover:text-slate-900 dark:hover:text-white px-5 py-2 rounded-lg transition-all text-sm no-underline"
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

        {/* Concrete example: lending */}
        <section className="mb-12">
          <h2
            id="lending-example"
            className="text-2xl font-medium mb-6"
          >
            A concrete example: lending
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Lending is one of the largest on-chain application categories
            today. The architectural difference between an Ethereum lending
            protocol and an agentic lending protocol shows what this
            primitive shift actually changes.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="docs-card">
              <h4 className="font-medium mb-3 text-gray-700 dark:text-gray-300">
                Lending on Ethereum (Aave, Compound)
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>An off-chain backend computes rates and risk</li>
                <li>A keeper bot pushes parameters on-chain</li>
                <li>The contract executes against oracle data</li>
                <li>
                  Updating logic means deploying a new contract or governance
                  upgrade
                </li>
              </ul>
            </div>
            <div className="docs-card border-green-900/50">
              <h4 className="font-medium mb-3 text-green-400">
                Lending as an agentic smart contract
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>The market itself is a first-class on-chain agent</li>
                <li>Pricing comes from the agent&apos;s own inference</li>
                <li>Validators verify the Tensor Commit, not the work</li>
                <li>
                  The agent can swap context or models without redeploying
                </li>
              </ul>
            </div>
          </div>

          <Callout type="info" title="What changes in practice">
            The lending logic is no longer split between an off-chain brain
            and an on-chain executor. The brain is the contract. Anyone can
            verify how a rate decision was reached, and the protocol can
            adapt without governance ceremony every time the model improves.
          </Callout>
        </section>

        {/* Design space */}
        <section className="mb-12">
          <h2
            id="design-space"
            className="text-2xl font-medium mb-6 flex items-center gap-3"
          >
            <span className="p-1.5 rounded-lg bg-yellow-500/10 text-yellow-400">
              <Sparkles className="h-5 w-5" />
            </span>
            What this unlocks
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Binding agents to verifiable execution creates application
            categories that have no good home today. They need open-ended
            reasoning that smart contracts can&apos;t express, and stateful
            sovereignty that hosted-AI runtimes can&apos;t provide.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {[
              {
                title: "AI Persons",
                desc: "Fully autonomous on-chain entities that own assets, sign their own actions, and participate in the economy as first-class agents — not as proxies for a human key.",
              },
              {
                title: "Subjective prediction markets",
                desc: "Outcomes that depend on judgment, not lookups. “Was the iPhone Air launch a flop?” adjudicated by a publicly verifiable agent rather than a human committee or a centralized oracle.",
              },
              {
                title: "Complex governance",
                desc: "Proposals evaluated with nuanced reasoning: read the docs, weigh the trade-offs, articulate the position. Without an agent, this work falls to a small group of humans (or doesn’t happen).",
              },
              {
                title: "Dynamic DeFi strategies",
                desc: "Liquidity managers, portfolio rebalancers, hedging agents that adjust to market state in real time, with every decision auditable and signed.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="docs-card border-green-900/50"
              >
                <h3 className="text-sm font-medium mb-1.5 text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Why this is a separate market */}
        <section className="mb-12">
          <h2
            id="market"
            className="text-2xl font-medium mb-6 flex items-center gap-3"
          >
            <span className="p-1.5 rounded-lg bg-green-500/10 text-green-400">
              <TrendingUp className="h-5 w-5" />
            </span>
            Why this is a separate market, not an upgrade
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Hashcash sits at near-zero market cap. Bitcoin, which embedded
            the same proof-of-work primitive into stateful ownership, is
            worth orders of magnitude more. Agents and smart contracts have
            the same relationship today. Plenty of agent frameworks exist,
            but none of them are stateful or sovereign in the on-chain sense.
          </p>

          <div className="bg-gradient-to-r from-green-950/30 to-transparent border-l-2 border-green-500 pl-6 py-4 mb-6">
            <div className="space-y-1 text-sm">
              <p>
                <strong className="text-slate-900 dark:text-white">
                  ChatGPT:
                </strong>{" "}
                <span className="text-gray-600 dark:text-gray-400">
                  intelligence you can query
                </span>
              </p>
              <p>
                <strong className="text-slate-900 dark:text-white">
                  OpenClaw:
                </strong>{" "}
                <span className="text-gray-600 dark:text-gray-400">
                  execution you can delegate
                </span>
              </p>
              <p>
                <strong className="text-slate-900 dark:text-white">
                  Theseus:
                </strong>{" "}
                <span className="text-gray-600 dark:text-gray-400">
                  agents with full agency — own keys, hold balances, persist
                </span>
              </p>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Like every prior crypto-primitive transition, the value won&apos;t
            arrive uniformly: a long tail of small experiments, then a few
            applications that compound. The categories above are where the
            compounding most plausibly starts.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/blog/agents-evolution-of-smart-contracts"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg transition-all text-sm font-medium no-underline"
            >
              Read the full essay
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
      </div>
      <PrevNext current="agentic-smart-contracts" />
    </div>
  );
}
