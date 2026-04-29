import type { Metadata } from "next";
import { ArrowRight, Lightbulb, TrendingUp, Sparkles, Zap } from "lucide-react";
import Callout from "@/components/docs/Callout";
import { DocsPageJsonLd } from "@/components/JsonLd";
import PrevNext from "@/components/docs/PrevNext";

export const metadata: Metadata = {
  title: "Design Space",
  description:
    "Explore applications and market opportunities unlocked by autonomous agents with verifiable AI inference.",
  keywords: ["Theseus design space", "autonomous agents", "verifiable AI", "on-chain AI", "market"],
};

export default function DesignSpacePage() {
  return (
    <div className="docs-content">
      <DocsPageJsonLd title="Design Space" description="Explore applications and market opportunities unlocked by autonomous agents with verifiable AI inference." slug="design-space" />
      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400 text-xs mb-4">
          <Lightbulb className="h-3 w-3" />
          Deep Dive
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">
          The Theseus Design Space
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          Autonomous agents with verifiable inference enable applications that are not practical on existing platforms.
        </p>
      </div>
        
      <div className="prose prose-invert max-w-none">
        {/* Read Full Article CTA */}
        <Callout type="info" title="Full Analysis Available">
          <p className="mb-4">
            This page provides an overview. For complete technical details and market dynamics, read the original article.
          </p>
          <a 
            href="https://theseuschain.substack.com/p/agents-as-an-evolution-of-smart-contracts"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg transition-all text-sm font-medium no-underline"
          >
            Read Full Article <ArrowRight className="h-4 w-4" />
          </a>
        </Callout>

        {/* Evolution Section */}
        <section className="mb-12">
          <h2 id="evolution" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-700 dark:text-indigo-300">
              <Sparkles className="h-5 w-5" />
            </span>
            Path to Full Agency
          </h2>
          
          <div className="space-y-4 mb-6">
            {[
              {
                year: "2022",
                name: "ChatGPT",
                symbol: "GPT",
                borderClass: "border-slate-200 dark:border-slate-700",
                textClass: "text-slate-800 dark:text-slate-200",
                unlock: "Reasoning and language intelligence at scale.",
                cannot: "Cannot act independently in the world.",
              },
              {
                year: "2025",
                name: "OpenClaw",
                symbol: "OC",
                borderClass: "border-indigo-200 dark:border-indigo-900/50",
                textClass: "text-indigo-700 dark:text-indigo-300",
                unlock: "Execution rails for AI actions.",
                cannot: "Cannot persist economically on its own.",
              },
              {
                year: "2026",
                name: "Theseus",
                symbol: "THE",
                borderClass: "border-green-200 dark:border-green-900/50",
                textClass: "text-green-700 dark:text-green-400",
                unlock: "Full agency with native ownership, settlement, and persistence.",
              },
            ].map((item) => (
              <div key={item.name} className={`docs-card ${item.borderClass}`}>
                <div className="flex items-start gap-4">
                  <span className={`${item.textClass} font-bold text-2xl`}>{item.symbol}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`text-lg font-medium ${item.textClass}`}>{item.name}</h3>
                      <span className="text-xs text-slate-600 dark:text-gray-500">({item.year})</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{item.unlock}</p>
                    {item.cannot ? (
                      <p className="text-rose-300/90 text-sm italic">cannot: {item.cannot}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Callout type="tip" title="Key Insight">
            Each step removes a human dependency: cognition, execution, then full agency.
          </Callout>
        </section>

        {/* Design Space Constraint */}
        <section className="mb-12">
          <h2 id="constraint" className="text-2xl font-medium mb-4">The Design Space Constraint</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Over the last decade, runtimes like SVM and MoveVM improved smart contract platforms with cleaner programming models. <strong className="text-slate-900 dark:text-white">All kept the same baseline constraint</strong>: deterministic, replicated execution across every node.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Theseus takes a different approach: tensor commitments for verifiable inference. That makes complex, intelligent applications economically feasible on-chain without giving up verifiability.
          </p>
        </section>

        {/* New Primitives */}
        <section className="mb-12">
          <h2 id="primitives" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-yellow-500/10 text-yellow-700 dark:text-yellow-400">
              <Zap className="h-5 w-5" />
            </span>
            New Primitives Enabled by Theseus
          </h2>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { title: "Subjective Prediction Markets", desc: "Adjudicate judgment-call questions like \"Was the iPhone Air launch successful?\"" },
              { title: "Sovereign Agents", desc: "Autonomous entities with goals: GPs of LP funds, marketing swarms, DAO orchestrators" },
              { title: "Complex Governance", desc: "Evaluate proposals with judgment, read docs, weigh trade-offs" },
              { title: "Dynamic DeFi Strategies", desc: "Manage liquidity, rebalance portfolios, execute strategies autonomously" },
            ].map((item) => (
              <div key={item.title} className="docs-card">
                <h3 className="text-sm font-medium mb-1.5 text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Market Size */}
        <section className="mb-12">
          <h2 id="market" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-green-500/10 text-green-700 dark:text-green-400">
              <TrendingUp className="h-5 w-5" />
            </span>
            Market Opportunity
          </h2>
          
          <div className="docs-card border-green-200 dark:border-green-900/50 mb-6">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Ethereum&apos;s market cap is tied to application value. More capable applications can expand value captured by the base layer.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Before Bitcoin, Hashcash introduced proof-of-work without a durable economic layer. Combining programmable settlement and autonomous agents with tensor commitments may open a materially larger design and market surface.
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-950/30 to-transparent border-l-2 border-green-500 pl-6 py-4">
            <div className="space-y-1 text-sm">
              <p><strong className="text-slate-900 dark:text-white">ChatGPT:</strong> <span className="text-gray-600 dark:text-gray-400">intelligence you can query</span></p>
              <p><strong className="text-slate-900 dark:text-white">OpenClaw:</strong> <span className="text-gray-600 dark:text-gray-400">execution you can delegate</span></p>
              <p><strong className="text-slate-900 dark:text-white">Theseus:</strong> <span className="text-gray-600 dark:text-gray-400">agents with full agency. Own keys, hold balances, persist</span></p>
            </div>
          </div>
        </section>

      </div>
      <PrevNext current="design-space" />

    </div>
  );
}
