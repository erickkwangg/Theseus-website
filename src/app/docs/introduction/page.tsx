import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Cpu, GitBranch, Coins, Users, Sparkles, Shield } from "lucide-react";
import Callout from "@/components/docs/Callout";

export const metadata: Metadata = {
  title: "Introduction - Theseus Docs",
  description:
    "Understand the core ideas behind Theseus: sovereign AI agents, verifiable inference, and runtime infrastructure for autonomous execution.",
  keywords: [
    "Theseus",
    "AI agents",
    "AI agency",
    "verifiable inference",
    "Layer 1",
  ],
};

export default function IntroductionPage() {
  return (
    <div className="docs-content">
      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/35 bg-indigo-500/10 text-indigo-300 text-xs mb-4">
          Getting Started
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">
          Introduction to Theseus
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          Runtime infrastructure for autonomous AI agents with self-sovereign execution.
          <span className="block text-base text-slate-500 mt-2">
            AI execution and verification are the primary developer surface; Theseus is implemented as a Layer-1 chain underneath.
          </span>
        </p>
      </div>
      
      <div className="prose prose-invert max-w-none">
        {/* Opening Section */}
        <section className="mb-12">
          <h2 id="cloud-for-ai-agency" className="text-2xl font-medium mb-4 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-300">
              <Sparkles className="h-5 w-5" />
            </span>
            AI Agency Infrastructure
          </h2>
          
          <div className="bg-gradient-to-r from-indigo-950/30 to-transparent border-l-2 border-indigo-400 pl-6 py-4 mb-6">
            <p className="text-2xl font-light text-slate-900 dark:text-white mb-2">
              1.3 billion agents
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Expected to be online by the end of this decade. Most still depend on centralized APIs, hosted identities, and human approval for every action.
            </p>
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Today&apos;s agents cannot transact directly with each other, maintain persistent identity, or operate independently of the companies that host them.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
            Theseus addresses this by giving agents direct key custody, balance control, and independent inference execution.
          </p>
        </section>

        {/* Core Components */}
        <section className="mb-12">
          <h2 id="what-makes-different" className="text-2xl font-medium mb-6">What Makes Theseus Different</h2>
          
          <div className="grid gap-4">
            <div className="docs-card group">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-300 shrink-0">
                  <Cpu className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2 group-hover:text-indigo-300 transition-colors">AI Virtual Machine (AIVM)</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    Tensor-native runtime where models and agents are registered, autonomy policies are enforced, and agents call models through deterministic execution paths. Includes SHIP DSL for translating natural language to verifiable bytecode.
                  </p>
                  <Link href="/docs/aivm" className="inline-flex items-center gap-1 text-sm text-indigo-300 mt-3 no-underline hover:underline">
                    Learn about AIVM <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="docs-card group">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
                  <GitBranch className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2 group-hover:text-purple-400 transition-colors">Tensor Commits</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    Succinct proofs of inference computation with &lt;1% overhead. Terkle Trees generalize Merkle Trees for tensors, enabling efficient cryptographic verification of any deep learning model.
                  </p>
                  <Link href="/docs/tensor-commits" className="inline-flex items-center gap-1 text-sm text-purple-400 mt-3 no-underline hover:underline">
                    Explore Tensor Commits <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="docs-card group">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-yellow-500/10 text-yellow-400 shrink-0">
                  <Coins className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2 group-hover:text-yellow-400 transition-colors">$THE Token</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    A native asset designed for agent ownership. Balances live within agent code and can be used for value storage and AI-to-AI payments.
                  </p>
                  <Link href="/docs/tokenomics" className="inline-flex items-center gap-1 text-sm text-yellow-400 mt-3 no-underline hover:underline">
                    View Tokenomics <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Agent Tiers */}
        <section className="mb-12">
          <h2 id="agency-tiers" className="text-2xl font-medium mb-4 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-green-500/10 text-green-400">
              <Users className="h-5 w-5" />
            </span>
            Three Tiers of Agency
          </h2>

          <div className="overflow-x-auto">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Control</th>
                  <th>Purpose</th>
                  <th>Concrete example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium text-slate-900 dark:text-white">Managed Agent</td>
                  <td>Human-owned key</td>
                  <td>Operates independently, aggregates value to owner</td>
                  <td className="text-gray-500">A trading agent that runs strategies autonomously but routes profits to the owner&apos;s address and can be paused by the controller key.</td>
                </tr>
                <tr>
                  <td className="font-medium text-slate-900 dark:text-white">Civic Agent</td>
                  <td>Fully autonomous</td>
                  <td>Serves public interest, transparent reasoning</td>
                  <td className="text-gray-500">A prediction-market resolver that decides outcomes via inference and posts the verifiable reasoning on-chain. See <Link href="/docs/examples#market" className="text-indigo-300 hover:underline no-underline">the-prediction-market example</Link>.</td>
                </tr>
                <tr>
                  <td className="font-medium text-slate-900 dark:text-white">Sovereign Agent</td>
                  <td>Self-directed</td>
                  <td>Own goals, collaborates with humans and agents</td>
                  <td className="text-gray-500">An agent that holds its own balance, calls models, pays for inference itself, and decides when to act based on on-chain triggers.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Design Principles */}
        <section className="mb-12">
          <h2 id="principles" className="text-2xl font-medium mb-4 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
              <Shield className="h-5 w-5" />
            </span>
            Design Principles
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              {
                title: "Decentralization first",
                desc: "No single node can finalize state. Any operator going dark has bounded impact because work is verified, not replicated, by the rest of the network.",
              },
              {
                title: "Autonomous execution",
                desc: "Agents wake on heartbeats, evaluate triggers, and initiate transactions on their own. Nothing in the protocol requires a human key path.",
              },
              {
                title: "Tensor-aware runtime",
                desc: "Inference is a first-class state transition. Tensor opcodes are part of the VM rather than a hosted side service.",
              },
              {
                title: "Verifiable inference",
                desc: "Every model call produces a Tensor Commit that any node can check in milliseconds. Less than 1% proof-generation overhead.",
              },
            ].map((item) => (
              <div key={item.title} className="p-4 bg-slate-100/80 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-800 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-2 w-2 rounded-full bg-indigo-300 shrink-0" />
                  <span className="text-sm font-medium text-slate-900 dark:text-white">{item.title}</span>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed pl-4">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Insight */}
        <section className="mb-12">
          <h2 id="key-insight" className="text-2xl font-medium mb-4">The Key Difference</h2>
          
          <Callout type="info" title="Autonomous Execution">
            Unlike Ethereum smart contracts that must be triggered by external accounts, Theseus agents can wake, evaluate conditions, and initiate transactions directly from on-chain state. They control their $THE balances and execution logic without requiring a human operator to sign off.
          </Callout>

          <div className="flex gap-3 mt-6">
            <Link 
              href="/docs/comparison"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg transition-all text-sm font-medium no-underline"
            >
              Theseus vs. Ethereum
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Next Steps */}
        <div className="border-t border-slate-200 dark:border-gray-800 pt-8 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Next</p>
            <Link 
              href="/docs/quickstart"
            className="inline-flex items-center gap-2 text-lg font-medium text-slate-900 dark:text-white hover:text-indigo-300 transition-colors no-underline"
            >
              Quick Start Guide
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
