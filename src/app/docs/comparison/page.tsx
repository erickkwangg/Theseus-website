import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, GitCompare, AlertTriangle, CheckCircle, X, Lightbulb, TrendingUp } from "lucide-react";
import Callout from "@/components/docs/Callout";

export const metadata: Metadata = {
  title: "Theseus vs Ethereum - Theseus Docs",
  description:
    "Compare Ethereum smart contracts and Theseus autonomous agents across execution model, autonomy, and verifiable AI capabilities.",
  keywords: ["Theseus vs Ethereum", "autonomous agents", "smart contracts", "AIVM", "verifiable AI"],
};

export default function ComparisonPage() {
  return (
    <div className="docs-content">
      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs mb-4">
          <GitCompare className="h-3 w-3" />
          Deep Dive
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">
          Theseus vs. Ethereum
        </h1>
        <p className="text-xl text-gray-400 leading-relaxed">
          While deployment patterns look similar, Theseus agents differ fundamentally from smart contracts.
        </p>
      </div>
        
      <div className="prose prose-invert max-w-none">
        {/* Core Difference */}
        <section className="mb-12">
          <h2 id="critical-difference" className="text-2xl font-medium mb-6">The Critical Difference: Autonomous Execution</h2>
          
          <Callout type="warning" title="Common Misconception">
            Many believe Ethereum contracts are autonomous because they execute complex logic. <strong>This is incorrect.</strong> Smart contracts are purely reactive—they cannot initiate any action without an EOA sending a transaction first.
          </Callout>

          {/* What Smart Contracts Can't Do */}
          <div className="docs-card mb-6">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <X className="h-5 w-5 text-red-400" />
              What Smart Contracts CAN&apos;T Do
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { title: "Wake up on their own", desc: "Cannot execute based on time or conditions without external triggering" },
                { title: "Initiate transactions", desc: "Must be called by an EOA (private key holder) to do anything" },
                { title: "Autonomously manage assets", desc: "Hold assets but need external triggers to move them" },
                { title: "Make autonomous decisions", desc: "Cannot evaluate and act without being triggered externally" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 p-3 bg-red-950/20 border border-red-900/30 rounded-lg">
                  <X className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-white text-sm">{item.title}</span>
                    <p className="text-gray-400 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-gray-900 border border-gray-800 rounded-lg">
              <p className="text-sm text-gray-400">
                <strong className="text-white">Note:</strong> Services like Chainlink Keepers are off-chain bots with private keys that trigger contracts. The contract itself is still reactive.
              </p>
            </div>
          </div>

          {/* What Theseus Can Do */}
          <div className="docs-card border-indigo-900/50 mb-6">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-indigo-300">
              <CheckCircle className="h-5 w-5" />
              What Theseus Agents CAN Do
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { title: "Wake up autonomously", desc: "Activate every N blocks via heartbeat—no external trigger needed" },
                { title: "Initiate transactions", desc: "Send transactions, invoke models, interact with agents on their own" },
                { title: "Autonomously manage assets", desc: "Decide when and how to use $THE without external triggers" },
                { title: "Make autonomous decisions", desc: "Evaluate triggers, run ML inference, and act on their own logic" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 p-3 bg-indigo-950/20 border border-indigo-900/30 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-indigo-300 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-white text-sm">{item.title}</span>
                    <p className="text-gray-400 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analogy */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="docs-card">
              <h4 className="font-medium mb-2 text-gray-300">Ethereum Smart Contract</h4>
              <p className="text-gray-400 text-sm">
                Like a <strong className="text-white">vending machine</strong>: Contains logic but someone must press the buttons. Cannot check inventory or restock itself.
              </p>
            </div>
            <div className="docs-card border-indigo-900/50">
              <h4 className="font-medium mb-2 text-indigo-300">Theseus Agent</h4>
              <p className="text-gray-400 text-sm">
                Like an <strong className="text-white">autonomous shopkeeper</strong>: Wakes up, checks inventory, makes restocking decisions, interacts with suppliers independently.
              </p>
            </div>
          </div>
        </section>

        {/* Side-by-Side */}
        <section className="mb-12">
          <h2 id="comparison-table" className="text-2xl font-medium mb-6">Side-by-Side Comparison</h2>

          <div className="overflow-x-auto">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th className="text-gray-400">Ethereum Contracts</th>
                  <th className="text-indigo-300">Theseus Agents</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium text-white">Execution</td>
                  <td>Reactive—triggered externally</td>
                  <td>Proactive—initiates autonomously</td>
                </tr>
                <tr>
                  <td className="font-medium text-white">Intelligence</td>
                  <td>Deterministic logic only</td>
                  <td>ML inference on-chain</td>
                </tr>
                <tr>
                  <td className="font-medium text-white">Control</td>
                  <td>Requires private keys</td>
                  <td>Self-sovereign, no keys needed</td>
                </tr>
                <tr>
                  <td className="font-medium text-white">Logic</td>
                  <td>Simple conditionals</td>
                  <td>Agentic reasoning</td>
                </tr>
                <tr>
                  <td className="font-medium text-white">Inference</td>
                  <td>Not possible</td>
                  <td>Native with verifiable proofs</td>
                </tr>
                <tr>
                  <td className="font-medium text-white">Assets</td>
                  <td>Holds but needs triggers to move</td>
                  <td>Autonomous control</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Visual Comparison */}
        <section className="mb-12">
          <h2 id="visual-comparison" className="text-2xl font-medium mb-4">Visual Comparison</h2>
          <p className="text-gray-400 mb-6">
            Ethereum requires external EOAs to initiate everything. Theseus agents wake up and act autonomously.
          </p>
          <div className="bg-black border border-gray-800 rounded-lg p-4 overflow-x-auto">
            <Image 
              src="/theseus-vs-ethereum.png" 
              alt="Theseus vs Ethereum interaction flow comparison" 
              width={1200}
              height={600}
              className="w-full h-auto rounded"
            />
          </div>
          <p className="text-sm text-gray-500 mt-4">
            <strong>Top:</strong> Ethereum requires a developer with a private key to trigger every action. 
            <strong className="ml-2">Bottom:</strong> Theseus agents initiate actions and run inference autonomously.
          </p>
        </section>

        {/* Deployment */}
        <section className="mb-12">
          <h2 id="deployment" className="text-2xl font-medium mb-6">Similar Process, Different Outcome</h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="docs-card">
              <h4 className="font-medium mb-3 text-gray-300">Smart Contract Deployment</h4>
              <ol className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2"><span className="text-gray-600">1.</span> Write Solidity code</li>
                <li className="flex items-start gap-2"><span className="text-gray-600">2.</span> Compile to EVM bytecode</li>
                <li className="flex items-start gap-2"><span className="text-gray-600">3.</span> Deploy (costs gas)</li>
                <li className="flex items-start gap-2"><span className="text-gray-600">4.</span> Contract waits for calls</li>
                <li className="flex items-start gap-2"><span className="text-gray-600">5.</span> Requires EOAs to act</li>
              </ol>
            </div>
            <div className="docs-card border-indigo-900/50">
              <h4 className="font-medium mb-3 text-indigo-300">Theseus Agent Deployment</h4>
              <ol className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2"><span className="text-indigo-400">1.</span> Write agent code (Python, Rust, SHIP)</li>
                <li className="flex items-start gap-2"><span className="text-indigo-400">2.</span> Add models, autonomy, triggers</li>
                <li className="flex items-start gap-2"><span className="text-indigo-400">3.</span> Deploy with initial $THE</li>
                <li className="flex items-start gap-2"><span className="text-indigo-400">4.</span> Agent starts operating</li>
                <li className="flex items-start gap-2"><span className="text-indigo-400">5.</span> Acts without key control</li>
              </ol>
            </div>
          </div>

          <Callout type="info" title="Key Insight">
            Ethereum contracts are reactive programs that require external triggers. Theseus agents can execute from on-chain state transitions and initiate actions independently.
          </Callout>
        </section>

        {/* Design Space */}
        <section className="mb-12">
          <h2 id="design-space" className="text-2xl font-medium mb-4 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-green-500/10 text-green-400">
              <Lightbulb className="h-5 w-5" />
            </span>
            Expanded Design Space
          </h2>
          
          <p className="text-gray-400 mb-6">
            Autonomous execution and verifiable inference enable applications that are not practical on existing platforms.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="docs-card">
              <h4 className="font-medium mb-3 text-gray-300">Ethereum Enables</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Simple DeFi (AMMs, lending)</li>
                <li>• Basic DAOs (token voting)</li>
                <li>• Objective oracles</li>
                <li>• Deterministic logic</li>
              </ul>
            </div>
            <div className="docs-card border-green-900/50">
              <h4 className="font-medium mb-3 text-green-400">Theseus Enables</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Subjective adjudication</li>
                <li>• Complex governance with reasoning</li>
                <li>• AI Persons with goals</li>
                <li>• Natural language deployment</li>
                <li>• Adaptive strategies</li>
              </ul>
            </div>
          </div>

          {/* Evolution Timeline */}
          <div className="docs-card border-indigo-900/50 mb-6">
            <h3 className="text-lg font-medium mb-4 text-indigo-300">The Evolution</h3>
            <div className="space-y-4">
              {[
                { symbol: "₿", color: "text-yellow-400", name: "Bitcoin (2009)", desc: "Public ownership. Removed treasurers from \"who owns what.\"" },
                { symbol: "Ξ", color: "text-indigo-300", name: "Ethereum (2014)", desc: "Public programs. Removed judges from \"what happens next.\"" },
                { symbol: "Θ", color: "text-green-400", name: "Theseus (2025)", desc: "Public decisions. Removes hosts from \"what will an intelligent entity decide?\"" },
              ].map((item) => (
                <div key={item.name} className="flex items-start gap-3">
                  <span className={`${item.color} font-bold text-xl w-6`}>{item.symbol}</span>
                  <div>
                    <h4 className="text-white font-medium text-sm">{item.name}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Size */}
          <div className="docs-card border-green-900/50">
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2 text-green-400">
              <TrendingUp className="h-5 w-5" />
              Market Opportunity
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Ethereum&apos;s market cap is tied to the value of applications on top of it. Increasing application capability can increase value captured by the base chain. Combining programmable settlement with autonomous agents expands the addressable application surface.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/docs/design-space"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-lg transition-all text-sm font-medium no-underline"
              >
                Full Design Space
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a 
                href="https://theseuschain.substack.com/p/agents-as-an-evolution-of-smart-contracts"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-transparent border border-green-600 text-green-400 hover:bg-green-600 hover:text-white px-5 py-2 rounded-lg transition-all text-sm no-underline"
              >
                Read Full Article
              </a>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="border-t border-gray-800 pt-8 grid sm:grid-cols-2 gap-4">
          <Link href="/docs/introduction" className="group no-underline">
            <div className="docs-card h-full">
              <p className="text-sm text-gray-500 mb-1">Previous</p>
              <h3 className="font-medium group-hover:text-indigo-300 transition-colors">← Introduction</h3>
            </div>
          </Link>
          <Link href="/docs/aivm" className="group no-underline">
            <div className="docs-card h-full text-right">
              <p className="text-sm text-gray-500 mb-1">Next</p>
              <h3 className="font-medium group-hover:text-indigo-300 transition-colors">AIVM Deep Dive →</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
