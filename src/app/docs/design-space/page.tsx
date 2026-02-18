import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Lightbulb, TrendingUp, Sparkles, Zap, Users, Bot, BarChart3 } from "lucide-react";
import Callout from "@/components/docs/Callout";
import { EXTERNAL_LINKS } from "@/config/links";

export const metadata: Metadata = {
  title: "Design Space - Theseus Docs",
  description:
    "Explore applications and market opportunities unlocked by autonomous agents with verifiable AI inference.",
  keywords: ["Theseus design space", "autonomous agents", "verifiable AI", "on-chain AI", "market"],
};

export default function DesignSpacePage() {
  return (
    <div className="docs-content">
      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs mb-4">
          <Lightbulb className="h-3 w-3" />
          Deep Dive
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">
          The Theseus Design Space
        </h1>
        <p className="text-xl text-gray-400 leading-relaxed">
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
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-300">
              <Sparkles className="h-5 w-5" />
            </span>
            Path to AI Persons
          </h2>
          
          <div className="space-y-4 mb-6">
            {[
              {
                year: "2022",
                name: "ChatGPT",
                symbol: "GPT",
                borderClass: "border-slate-700",
                textClass: "text-slate-200",
                unlock: "Reasoning and language intelligence at scale.",
                cannot: "Cannot act independently in the world.",
              },
              {
                year: "2025",
                name: "OpenClaw",
                symbol: "OC",
                borderClass: "border-indigo-900/50",
                textClass: "text-indigo-300",
                unlock: "Execution rails for AI actions.",
                cannot: "Cannot persist economically on its own.",
              },
              {
                year: "2026",
                name: "Conway",
                symbol: "CW",
                borderClass: "border-purple-900/50",
                textClass: "text-purple-300",
                unlock: "Continuous autonomous web execution.",
                cannot: "Cannot be sovereign while humans retain key and credential custody.",
              },
              {
                year: "2026",
                name: "Theseus",
                symbol: "THE",
                borderClass: "border-green-900/50",
                textClass: "text-green-400",
                unlock: "AI Persons with native ownership, settlement, and persistence.",
              },
            ].map((item) => (
              <div key={item.name} className={`docs-card ${item.borderClass}`}>
                <div className="flex items-start gap-4">
                  <span className={`${item.textClass} font-bold text-2xl`}>{item.symbol}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`text-lg font-medium ${item.textClass}`}>{item.name}</h3>
                      <span className="text-xs text-gray-500">({item.year})</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{item.unlock}</p>
                    {item.cannot ? (
                      <p className="text-rose-300/90 text-sm italic">cannot: {item.cannot}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Callout type="tip" title="Key Insight">
            Each step removes a human dependency: cognition, execution, coordination, then sovereignty.
            <span className="ml-2">
              For Conway&apos;s framing, see{" "}
              <a href={EXTERNAL_LINKS.conwayTech} target="_blank" rel="noopener noreferrer">conway.tech</a>
              {" "}and{" "}
              <a href={EXTERNAL_LINKS.web4ai} target="_blank" rel="noopener noreferrer">web4.ai</a>.
            </span>
          </Callout>
        </section>

        {/* Design Space Constraint */}
        <section className="mb-12">
          <h2 id="constraint" className="text-2xl font-medium mb-4">The Design Space Constraint</h2>
          <p className="text-gray-400 mb-4">
            Over the last decade, runtimes like SVM or MoveVM improved smart contract platforms with cleaner programming models. However, <strong className="text-white">all maintained the same fundamental constraint</strong>: deterministic, replicated execution across all nodes.
          </p>
          <p className="text-gray-400">
            Theseus takes a different approach using tensor commitments for verifiable inference. This makes complex, intelligent applications economically feasible on-chain while preserving verifiability.
          </p>
        </section>

        {/* Concrete Example */}
        <section className="mb-12">
          <h2 id="example" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
              <BarChart3 className="h-5 w-5" />
            </span>
            Example: Lending Protocol
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="docs-card">
              <h3 className="text-lg font-medium mb-4 text-gray-300">Ethereum (Aave, Compound)</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-500">Off-chain:</span>
                  <p className="text-gray-400">Backend computes rates, keeper pushes on-chain</p>
                </div>
                <div>
                  <span className="text-gray-500">On-chain:</span>
                  <p className="text-gray-400">Contract executes based on predetermined formulas</p>
                </div>
                <div>
                  <span className="text-gray-500">Updates:</span>
                  <p className="text-gray-400">Deploy new contract through governance</p>
                </div>
              </div>
            </div>

            <div className="docs-card border-green-900/50">
              <h3 className="text-lg font-medium mb-4 text-green-400">Theseus</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-500">On-chain Agent:</span>
                  <p className="text-gray-400">Market runs as a first-class lending agent</p>
                </div>
                <div>
                  <span className="text-gray-500">Execution:</span>
                  <p className="text-gray-400">Pricing via inference, verified with tensor-commit</p>
                </div>
                <div>
                  <span className="text-gray-500">Updates:</span>
                  <p className="text-gray-400">Context or model swappable by creator or agent</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Primitives */}
        <section className="mb-12">
          <h2 id="primitives" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-yellow-500/10 text-yellow-400">
              <Zap className="h-5 w-5" />
            </span>
            New Primitives Enabled by Theseus
          </h2>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { title: "Subjective Prediction Markets", desc: "Adjudicate nuanced questions like \"Was the iPhone Air launch successful?\"" },
              { title: "AI Persons", desc: "Autonomous entities with goals: GPs of LP funds, marketing swarms, DAO orchestrators" },
              { title: "Complex Governance", desc: "Evaluate proposals with nuanced reasoning, read docs, analyze trade-offs" },
              { title: "Dynamic DeFi Strategies", desc: "Manage liquidity, rebalance portfolios, execute strategies autonomously" },
            ].map((item) => (
              <div key={item.title} className="docs-card">
                <h3 className="text-sm font-medium mb-1.5 text-white">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Market Size */}
        <section className="mb-12">
          <h2 id="market" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-green-500/10 text-green-400">
              <TrendingUp className="h-5 w-5" />
            </span>
            Market Opportunity
          </h2>
          
          <div className="docs-card border-green-900/50 mb-6">
            <p className="text-gray-300 mb-4">
              Ethereum&apos;s market cap is tied to application value. More capable applications can expand value captured by the base layer.
            </p>
            <p className="text-gray-400 text-sm">
              Before Bitcoin, Hashcash introduced proof-of-work without a durable economic layer. Combining programmable settlement and autonomous agents with tensor commitments may open a materially larger design and market surface.
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-950/30 to-transparent border-l-2 border-green-500 pl-6 py-4">
            <div className="space-y-1 text-sm">
              <p><strong className="text-white">ChatGPT:</strong> <span className="text-gray-400">intelligence you can query</span></p>
              <p><strong className="text-white">OpenClaw:</strong> <span className="text-gray-400">execution you can delegate</span></p>
              <p><strong className="text-white">Conway:</strong> <span className="text-gray-400">continuous autonomy you can deploy</span></p>
              <p><strong className="text-white">Theseus:</strong> <span className="text-gray-400">AI Persons with sovereign ownership and action</span></p>
            </div>
          </div>
        </section>

        {/* Full Story CTA */}
        <div className="border-t border-gray-800 pt-8">
          <div className="docs-card border-indigo-900/50 mb-6">
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2 text-indigo-300">
              <Users className="h-5 w-5" />
              Want the Full Story?
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Read the complete article with detailed examples, technical deep dives, and the full vision.
            </p>
            <a 
              href="https://theseuschain.substack.com/p/agents-as-an-evolution-of-smart-contracts"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg transition-all text-sm font-medium no-underline"
            >
              Read: Agents as an Evolution of Smart Contracts <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Navigation */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/docs/comparison" className="group no-underline">
              <div className="docs-card h-full">
                <p className="text-sm text-gray-500 mb-1">Previous</p>
                <h4 className="font-medium group-hover:text-indigo-300 transition-colors">← Technical Comparison</h4>
              </div>
            </Link>
            <a 
              href="https://theseuschain.substack.com/p/the-theseus-thesis-part-2-tam-of"
              target="_blank"
              rel="noopener noreferrer"
              className="group no-underline"
            >
              <div className="docs-card h-full text-right">
                <p className="text-sm text-gray-500 mb-1">Related</p>
                <h4 className="font-medium group-hover:text-indigo-300 transition-colors">Theseus Thesis: TAM →</h4>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
