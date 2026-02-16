import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Bot, Layers, Zap, Users, Coins, Code2 } from "lucide-react";
import Callout from "@/components/docs/Callout";

export const metadata: Metadata = {
  title: "Agents - Theseus Docs",
  description:
    "Register agents and models, run autonomous inference loops, and enable secure agent-to-agent interaction on Theseus.",
  keywords: ["Theseus agents", "model registration", "autonomous agents", "AIVM", "SHIP"],
};

export default function AgentsPage() {
  return (
    <div className="docs-content">
      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/35 bg-indigo-500/10 text-indigo-300 text-xs mb-4">
          <Bot className="h-3 w-3" />
          Core Concepts
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">
          Agents &amp; Models
        </h1>
        <p className="text-xl text-gray-400 leading-relaxed">
          Register agents, deploy models, and enable agent-to-agent interactions using $THE.
        </p>
      </div>
        
      <div className="prose prose-invert max-w-none">
        {/* Agent Registration */}
        <section className="mb-12">
          <h2 id="agent-registration" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
              <Bot className="h-5 w-5" />
            </span>
            Agent Registration
          </h2>
          
          <p className="text-gray-400 mb-6">
            Agents register via THE1 standard. Any human or agent can deploy a new agent by supplying:
          </p>

          <div className="overflow-x-auto">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="font-medium text-white">Code hash</td><td>Binary verification for AIVM/HVM</td></tr>
                <tr><td className="font-medium text-white">Autonomy flag</td><td>0 = human-gated, 1 = sovereign</td></tr>
                <tr><td className="font-medium text-white">Controller key</td><td>Optional pubkey for human override</td></tr>
                <tr><td className="font-medium text-white">AIVM version</td><td>Required ISA features</td></tr>
                <tr><td className="font-medium text-white">Resource quota</td><td>Max FLOPs per epoch</td></tr>
                <tr><td className="font-medium text-white">Stake</td><td>$THE locked for slashing</td></tr>
                <tr><td className="font-medium text-white">Initial context</td><td>Agent context from TheseusStore</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Model Registration */}
        <section className="mb-12">
          <h2 id="model-registration" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-green-500/10 text-green-400">
              <Layers className="h-5 w-5" />
            </span>
            Model Registration
          </h2>
          
          <p className="text-gray-400 mb-6">
            Models are registered separately and can be invoked by any agent that pays the posted fee.
          </p>

          <div className="overflow-x-auto">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="font-medium text-white">Name &amp; version</td><td>e.g., Llama 3.1 8B</td></tr>
                <tr><td className="font-medium text-white">Architecture</td><td>LLM, diffusion, GAN, etc.</td></tr>
                <tr><td className="font-medium text-white">Tensor Commit</td><td>Cryptographic weight fingerprint</td></tr>
                <tr><td className="font-medium text-white">Param count</td><td>For fee estimation</td></tr>
                <tr><td className="font-medium text-white">Base fee</td><td>$THE per inference</td></tr>
                <tr><td className="font-medium text-white">Owner</td><td>Revenue destination (address/DAO)</td></tr>
                <tr><td className="font-medium text-white">Weights URI</td><td>Where validators fetch params</td></tr>
                <tr><td className="font-medium text-white">Compute spec</td><td>For Tensor Commits generation</td></tr>
                <tr><td className="font-medium text-white">Permissions</td><td>Access control rules</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Inference Loop */}
        <section className="mb-12">
          <h2 id="inference-loop" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-yellow-500/10 text-yellow-400">
              <Zap className="h-5 w-5" />
            </span>
            Sovereign Agent Inference Loop
          </h2>
          
          <p className="text-gray-400 mb-6">
            How sovereign agents decide when to run inference, without human-controlled keys or off-chain schedulers:
          </p>

          <div className="space-y-3">
            {[
              { step: "1", title: "Wake-up", desc: "Agent code activates via heartbeat tx every N blocks, keep-alive bounty, or event relay" },
              { step: "2", title: "Evaluate triggers", desc: "During AGENT_TICK, check rules: scheduled block? price crossed? memory anchor changed?" },
              { step: "3", title: "Fee & balance test", desc: "Look up model's cost, add network proof surcharge, confirm $THE balance covers total" },
              { step: "4", title: "Call the model", desc: "Submit MODEL_INFER request with inputs and fee cap. Scheduler assigns to prover" },
            ].map((item) => (
              <div key={item.step} className="docs-card">
                <div className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500 text-black text-sm font-bold shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-medium mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Callout type="success" title="Fully Sovereign">
            Agents control their own funds. Decisions are pure functions of on-chain state.
          </Callout>
        </section>

        {/* Inter-Agent Interaction */}
        <section className="mb-12">
          <h2 id="interaction" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-300">
              <Users className="h-5 w-5" />
            </span>
            Inter-Agent Interaction
          </h2>
          
          <p className="text-gray-400 mb-6">
            Agents with an address, balance, and ABI can call each other like contracts—but either side can invoke models mid-flow.
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { title: "Discovery", desc: "Agents publish service manifests on-chain (selectors, purpose hash, access mode)" },
              { title: "Call & Pay", desc: "Caller sends AIVM request with callee, function, args, and optional capability token" },
              { title: "Model Invocation", desc: "Either side can invoke models: caller before call, callee during execution" },
              { title: "Result Handling", desc: "Same-block returns immediately; longer jobs issue promise events" },
            ].map((item) => (
              <div key={item.title} className="docs-card">
                <h3 className="text-sm font-medium mb-1 text-white">{item.title}</h3>
                <p className="text-gray-400 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Model Usage Fees */}
        <section className="mb-12">
          <h2 id="fees" className="text-2xl font-medium mb-4 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-green-500/10 text-green-400">
              <Coins className="h-5 w-5" />
            </span>
            Model Usage Fees
          </h2>
          
          <div className="docs-card">
            <p className="text-gray-400 text-sm mb-3">
              Model owners set base fees in $THE. Fees flow directly to owners. Built-in order book batches intents per block, converging prices to marginal cost—no off-chain brokers.
            </p>
            <p className="text-gray-500 text-sm">
              Dishonest proofs burn the offender&apos;s stake. Economic security scales with staked value.
            </p>
          </div>
        </section>

        {/* Navigation */}
        <div className="border-t border-gray-800 pt-8 grid sm:grid-cols-2 gap-4">
          <Link href="/docs/ship" className="group no-underline">
            <div className="docs-card h-full flex items-start gap-3">
              <Code2 className="h-5 w-5 text-gray-500 group-hover:text-indigo-300 transition-colors shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium group-hover:text-indigo-300 transition-colors">SHIP Language →</h3>
                <p className="text-sm text-gray-400 mt-1">Write agent logic in SHIP DSL</p>
              </div>
            </div>
          </Link>
          <Link href="/docs/examples" className="group no-underline">
            <div className="docs-card h-full flex items-start gap-3">
              <Bot className="h-5 w-5 text-gray-500 group-hover:text-indigo-300 transition-colors shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium group-hover:text-indigo-300 transition-colors">Code Examples →</h3>
                <p className="text-sm text-gray-400 mt-1">View example implementations</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
