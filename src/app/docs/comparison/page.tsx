import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, GitCompare, Lightbulb, TrendingUp } from "lucide-react";
import Callout from "@/components/docs/Callout";
import { EXTERNAL_LINKS } from "@/config/links";
import { DocsPageJsonLd } from "@/components/JsonLd";
import PrevNext from "@/components/docs/PrevNext";

export const metadata: Metadata = {
  title: "Theseus vs Ethereum",
  description:
    "How Theseus differs from Ethereum: agents that act on their own, on-chain inference with verifiable proofs, and a runtime that holds keys directly.",
  keywords: ["Theseus vs Ethereum", "autonomous agents", "smart contracts", "AIVM", "verifiable AI"],
  alternates: { canonical: "/docs/comparison" },
};

export default function ComparisonPage() {
  return (
    <div className="docs-content">
      <DocsPageJsonLd
        title="Theseus vs Ethereum"
        description="How Theseus differs from Ethereum: agents that act on their own, on-chain inference with verifiable proofs, and a runtime that holds keys directly."
        slug="comparison"
      />
      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs mb-4">
          <GitCompare className="h-3 w-3" />
          Deep Dive
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">
          Theseus vs. Ethereum
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          Ethereum contracts run when someone with a private key sends a transaction.
          Theseus agents run on their own.
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        {/* Core Difference */}
        <section className="mb-12">
          <h2 id="critical-difference" className="text-2xl font-medium mb-4">
            Who initiates the action
          </h2>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Every Ethereum smart contract, no matter how complex, needs an
            externally owned account (EOA) to call it. The contract holds logic
            and state, but it cannot start work on its own. Services like
            Chainlink Keepers are off-chain bots with private keys that trigger
            contracts on a schedule; the contract itself is still reactive.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Theseus agents work differently. They run on a schedule, react to
            events, and initiate transactions themselves. Their authority comes
            from consensus over valid state transitions, not from a key holder
            pressing a button.
          </p>

          <Callout type="tip" title="The shape of the difference">
            Smart contract: a vending machine. Holds inventory and logic, but
            someone has to put a coin in. Theseus agent: an autonomous shopkeeper.
            Checks inventory, restocks, sets prices, and transacts with
            suppliers, all without anyone walking up to it.
          </Callout>
        </section>

        {/* Side-by-Side */}
        <section className="mb-12">
          <h2 id="comparison-table" className="text-2xl font-medium mb-6">
            Side-by-side
          </h2>

          <div className="overflow-x-auto">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th className="text-gray-600 dark:text-gray-400">Ethereum contracts</th>
                  <th className="text-indigo-300">Theseus agents</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-indigo-950/10">
                  <td className="font-medium text-slate-900 dark:text-white">Key custody</td>
                  <td>Held by a human-controlled EOA</td>
                  <td className="text-indigo-300">Held by the agent itself</td>
                </tr>
                <tr>
                  <td className="font-medium text-slate-900 dark:text-white">Execution</td>
                  <td>Reactive, triggered by an EOA</td>
                  <td>Self-initiated on a schedule or event</td>
                </tr>
                <tr>
                  <td className="font-medium text-slate-900 dark:text-white">Intelligence</td>
                  <td>Deterministic logic only</td>
                  <td>ML inference, verifiably</td>
                </tr>
                <tr>
                  <td className="font-medium text-slate-900 dark:text-white">Logic</td>
                  <td>Conditionals, state machines</td>
                  <td>Same, plus model-driven reasoning</td>
                </tr>
                <tr>
                  <td className="font-medium text-slate-900 dark:text-white">Inference</td>
                  <td>Not practical (replicated execution)</td>
                  <td>Native, with Tensor Commit proofs</td>
                </tr>
                <tr>
                  <td className="font-medium text-slate-900 dark:text-white">Assets</td>
                  <td>Held; moved by external triggers</td>
                  <td>Held and moved by the agent</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Visual Comparison */}
        <section className="mb-12">
          <h2 id="visual-comparison" className="text-2xl font-medium mb-4">
            Interaction flow
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            On Ethereum, every action passes through an EOA holding a private key. On
            Theseus, the agent itself is the actor.
          </p>
          <div className="bg-black border border-slate-200 dark:border-gray-800 rounded-lg p-4 overflow-x-auto">
            <Image
              src="/theseus-vs-ethereum.png"
              alt="Theseus vs Ethereum interaction flow comparison"
              width={1200}
              height={600}
              className="w-full h-auto rounded"
            />
          </div>
          <p className="text-sm text-gray-500 mt-4">
            <strong>Top:</strong> Ethereum requires a developer with a private key
            to trigger every action.
            <strong className="ml-2">Bottom:</strong> Theseus agents initiate
            actions and run inference themselves.
          </p>
        </section>

        {/* Deployment */}
        <section className="mb-12">
          <h2 id="deployment" className="text-2xl font-medium mb-6">
            Same deployment shape, different result
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="docs-card">
              <h4 className="font-medium mb-3 text-gray-700 dark:text-gray-300">Smart contract</h4>
              <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2"><span className="text-gray-600">1.</span> Write Solidity</li>
                <li className="flex items-start gap-2"><span className="text-gray-600">2.</span> Compile to EVM bytecode</li>
                <li className="flex items-start gap-2"><span className="text-gray-600">3.</span> Deploy (gas)</li>
                <li className="flex items-start gap-2"><span className="text-gray-600">4.</span> Contract waits for calls</li>
                <li className="flex items-start gap-2"><span className="text-gray-600">5.</span> An EOA must trigger anything</li>
              </ol>
            </div>
            <div className="docs-card border-indigo-900/50">
              <h4 className="font-medium mb-3 text-indigo-300">Theseus agent</h4>
              <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2"><span className="text-indigo-400">1.</span> Write the agent (Python, Rust, or SHIP)</li>
                <li className="flex items-start gap-2"><span className="text-indigo-400">2.</span> Declare model bindings, policies, triggers</li>
                <li className="flex items-start gap-2"><span className="text-indigo-400">3.</span> Deploy with an initial $THE balance</li>
                <li className="flex items-start gap-2"><span className="text-indigo-400">4.</span> Agent starts operating</li>
                <li className="flex items-start gap-2"><span className="text-indigo-400">5.</span> Acts on its own, no key holder</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Design Space */}
        <section className="mb-12">
          <h2
            id="design-space"
            className="text-2xl font-medium mb-4 flex items-center gap-3"
          >
            <span className="p-1.5 rounded-lg bg-green-500/10 text-green-400">
              <Lightbulb className="h-5 w-5" />
            </span>
            What this opens up
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Self-initiated execution and verifiable inference make a class of
            applications practical that aren&apos;t today.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="docs-card">
              <h4 className="font-medium mb-3 text-gray-700 dark:text-gray-300">Ethereum supports</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• AMMs and lending</li>
                <li>• Token-voting DAOs</li>
                <li>• Objective oracles</li>
                <li>• Deterministic logic</li>
              </ul>
            </div>
            <div className="docs-card border-green-900/50">
              <h4 className="font-medium mb-3 text-green-400">Theseus adds</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Subjective resolution (prediction markets, disputes)</li>
                <li>• Governance with reasoning, not just votes</li>
                <li>• Agents with goals and balance</li>
                <li>• Adaptive strategies driven by inference</li>
              </ul>
            </div>
          </div>

          {/* Evolution Timeline */}
          <div className="docs-card border-indigo-900/50 mb-6">
            <h3 className="text-lg font-medium mb-4 text-indigo-300">A short lineage</h3>
            <div className="space-y-4">
              {[
                { symbol: "₿", color: "text-yellow-400", name: "Bitcoin (2009)", desc: "Public ownership. Removed treasurers from \"who owns what.\"" },
                { symbol: "Ξ", color: "text-indigo-300", name: "Ethereum (2014)", desc: "Public programs. Removed judges from \"what happens next.\"" },
                { symbol: "Θ", color: "text-green-400", name: "Theseus (Now)", desc: "Public decisions. Removes hosts from \"what will an intelligent entity decide?\"" },
              ].map((item) => (
                <div key={item.name} className="flex items-start gap-3">
                  <span className={`${item.color} font-bold text-xl w-6`}>{item.symbol}</span>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-medium text-sm">{item.name}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market categories: aligned with homepage Civic / Managed / Sovereign */}
          <div className="docs-card border-green-900/50">
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2 text-green-400">
              <TrendingUp className="h-5 w-5" />
              Three categories of agent
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
              Theseus supports a spectrum from human-controlled to fully self-directed.
              The three categories on the homepage map to distinct application classes:
            </p>
            <div className="space-y-3 mb-6">
              {[
                {
                  title: "Civic agents",
                  desc: "Public-good agents that read, reason, and sign their work. They don't hold funds; their job is to make outcomes cheap to verify (prediction-market resolvers, dispute arbitration, content provenance).",
                },
                {
                  title: "Managed agents",
                  desc: "User-controlled agents that operate under signed policy. Humans, DAOs, or funds can pause, upgrade, or change strategy without losing the audit trail (treasuries, keepers, fund managers).",
                },
                {
                  title: "Sovereign agents",
                  desc: "Self-directed agents that own their policy, balance, and history. They can outlast their founders, pay for their own inference, and earn fees directly. The agent becomes the counterparty.",
                },
              ].map((item) => (
                <div key={item.title} className="p-3 bg-green-950/20 border border-green-900/30 rounded-lg">
                  <span className="font-medium text-slate-900 dark:text-white text-sm">{item.title}</span>
                  <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/docs/design-space"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-lg transition-all text-sm font-medium no-underline"
              >
                Full design space
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={EXTERNAL_LINKS.substackEvolution}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-transparent border border-green-600 text-green-400 hover:bg-green-600 hover:text-slate-900 dark:hover:text-white px-5 py-2 rounded-lg transition-all text-sm no-underline"
              >
                Read the Theseus thesis
              </a>
            </div>
          </div>
        </section>
      </div>
      <PrevNext current="comparison" />

    </div>
  );
}
