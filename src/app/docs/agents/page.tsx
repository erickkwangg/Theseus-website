import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Bot, Layers, Zap, Users, Coins, Code2 } from "lucide-react";
import Callout from "@/components/docs/Callout";
import FlowDiagram from "@/components/docs/FlowDiagram";
import { DocsPageJsonLd } from "@/components/JsonLd";
import PrevNext from "@/components/docs/PrevNext";

export const metadata: Metadata = {
  title: "Agents",
  description:
    "Register agents and models, run autonomous inference loops, and enable secure agent-to-agent interaction on Theseus.",
  keywords: ["Theseus agents", "model registration", "autonomous agents", "AIVM", "SHIP"],
};

export default function AgentsPage() {
  return (
    <div className="docs-content">
      <DocsPageJsonLd title="Agents" description="Register agents and models, run autonomous inference loops, and enable secure agent-to-agent interaction on Theseus." slug="agents" />
      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/35 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-xs mb-4">
          <Bot className="h-3 w-3" />
          Core Concepts
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">
          Agents &amp; Models
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          Register agents, deploy models, and enable agent-to-agent interactions using $THE.
        </p>
      </div>
        
      <div className="prose prose-invert max-w-none">
        {/* ABG vs AKG */}
        <section className="mb-12">
          <h2 id="abg-vs-akg" className="text-2xl font-medium mb-4">
            Two graphs: behavior and knowledge
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            An agent on Theseus is defined by two graph structures kept side
            by side. This separation is what makes agent execution
            deterministic and replayable from on-chain data — the same
            property smart contracts have, extended to programs that include
            inference and tool calls.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="docs-card border-indigo-200 dark:border-indigo-900/50">
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded bg-indigo-500/10 px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.18em] text-indigo-700 dark:text-indigo-300">
                  ABG
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400">static · versioned</span>
              </div>
              <h3 className="font-medium text-slate-900 dark:text-white mb-2">
                Agent Behavior Graph
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
                The agent&apos;s on-chain bytecode. A directed graph of nodes
                that defines control flow plus the agent&apos;s capability
                surface — the set of models, tools, agents, and SHIP intent
                types it&apos;s allowed to reference.
              </p>
              <p className="text-slate-600 dark:text-gray-500 text-xs leading-relaxed">
                Immutable once published. Only the owner, governance, or
                (under strict rules) the agent itself can publish a new
                version. Users can inspect the ABG before interacting with
                the agent.
              </p>
            </div>

            <div className="docs-card border-green-200 dark:border-green-900/50">
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded bg-green-500/10 px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.18em] text-green-700 dark:text-green-300">
                  AKG
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400">dynamic · grows</span>
              </div>
              <h3 className="font-medium text-slate-900 dark:text-white mb-2">
                Agent Knowledge Graph
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
                The execution log. Grows during runs, capturing each session,
                each step taken, each model invocation, and each
                observation or resource produced. AKG data is mostly DA-backed
                in TheseusStore, with on-chain anchors and bounded metadata.
              </p>
              <p className="text-slate-600 dark:text-gray-500 text-xs leading-relaxed">
                Node kinds:{" "}
                <code className="text-indigo-700 dark:text-indigo-300">Agent</code>,{" "}
                <code className="text-indigo-700 dark:text-indigo-300">AgentRun</code>,{" "}
                <code className="text-indigo-700 dark:text-indigo-300">Step</code>,{" "}
                <code className="text-indigo-700 dark:text-indigo-300">ModelInvocation</code>,{" "}
                <code className="text-indigo-700 dark:text-indigo-300">Observation</code>,{" "}
                <code className="text-indigo-700 dark:text-indigo-300">Resource</code>.
              </p>
            </div>
          </div>

          <Callout type="info" title="Why two graphs">
            Source code vs. execution log. The chain replays agent behavior
            deterministically from <strong>ABG + AKG + verified inference results</strong>.
            That replayability is what lets multiple validators reach
            consensus on what the agent actually did.
          </Callout>
        </section>

        {/* ABG node types */}
        <section className="mb-12">
          <h2 id="abg-nodes" className="text-2xl font-medium mb-4">
            ABG node types
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The interpreter walks the ABG one node at a time. When it hits an
            async boundary (model call or tool call), the agent suspends and
            resumes in a later block (see{" "}
            <Link
              href="/docs/architecture#three-stage-execution"
              className="text-indigo-700 dark:text-indigo-300 hover:underline no-underline"
            >
              three-stage execution
            </Link>
            ).
          </p>

          <div className="overflow-x-auto">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Node</th>
                  <th>Behavior</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-mono text-xs font-medium text-slate-900 dark:text-white">Entry</td>
                  <td className="text-gray-600 dark:text-gray-400 text-sm">Starting point for a run or entrypoint.</td>
                </tr>
                <tr>
                  <td className="font-mono text-xs font-medium text-slate-900 dark:text-white">ModelCall</td>
                  <td className="text-gray-600 dark:text-gray-400 text-sm">Request inference from a registered model. Suspends until the prover submits a verified result.</td>
                </tr>
                <tr>
                  <td className="font-mono text-xs font-medium text-slate-900 dark:text-white">ToolCall</td>
                  <td className="text-gray-600 dark:text-gray-400 text-sm">Request tool execution (on-chain or via the blessed enclave). Suspends until the result is returned.</td>
                </tr>
                <tr>
                  <td className="font-mono text-xs font-medium text-slate-900 dark:text-white">Condition</td>
                  <td className="text-gray-600 dark:text-gray-400 text-sm">Branch over state, model output, or tool result (BranchTrue / BranchFalse / OnError).</td>
                </tr>
                <tr>
                  <td className="font-mono text-xs font-medium text-slate-900 dark:text-white">Sequence / Parallel</td>
                  <td className="text-gray-600 dark:text-gray-400 text-sm">Structural nodes for control-flow composition.</td>
                </tr>
                <tr>
                  <td className="font-mono text-xs font-medium text-slate-900 dark:text-white">Terminal</td>
                  <td className="text-gray-600 dark:text-gray-400 text-sm">End the cycle. Emits SHIP intents (transfers, context updates, cross-chain messages, contract calls) and any state changes.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-slate-600 dark:text-gray-500 text-xs mt-4">
            ABG limits: max 256 nodes per agent, 128 KB per node, max
            sub-agent call depth of 2. See{" "}
            <Link href="/docs/reference#parameters" className="text-indigo-700 dark:text-indigo-300 hover:underline no-underline">
              network parameters
            </Link>{" "}
            for the complete list.
          </p>
        </section>

        {/* See it in code */}
        <Callout type="info" title="See an agent in code">
          <p className="mb-3">
            The fields below describe how an agent is registered and runs. To see what the actual program looks like, read the full SHIP example or run it in the playground.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/docs/ship#example-full"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-all text-sm font-medium no-underline"
            >
              Full SHIP example
            </Link>
            <Link
              href="/playground"
              className="inline-flex items-center gap-2 bg-transparent border border-indigo-500/40 hover:border-indigo-400 text-indigo-700 dark:text-indigo-300 hover:text-slate-900 dark:hover:text-white px-4 py-2 rounded-lg transition-all text-sm no-underline"
            >
              Try in playground
            </Link>
          </div>
        </Callout>

        {/* Agent Registration */}
        <section className="mb-12">
          <h2 id="agent-registration" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-700 dark:text-purple-400">
              <Bot className="h-5 w-5" />
            </span>
            Agent Registration
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
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
                <tr><td className="font-medium text-slate-900 dark:text-white">Code hash</td><td>Binary verification for AIVM/HVM</td></tr>
                <tr><td className="font-medium text-slate-900 dark:text-white">Autonomy flag</td><td>0 = human-gated, 1 = sovereign</td></tr>
                <tr><td className="font-medium text-slate-900 dark:text-white">Controller identity</td><td>Optional pubkey for human override</td></tr>
                <tr><td className="font-medium text-slate-900 dark:text-white">AIVM version</td><td>Required ISA features</td></tr>
                <tr><td className="font-medium text-slate-900 dark:text-white">Resource quota</td><td>Max FLOPs per epoch</td></tr>
                <tr><td className="font-medium text-slate-900 dark:text-white">Stake</td><td>$THE locked for slashing</td></tr>
                <tr><td className="font-medium text-slate-900 dark:text-white">Initial context</td><td>Agent context from TheseusStore</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Model Registration */}
        <section className="mb-12">
          <h2 id="model-registration" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-green-500/10 text-green-700 dark:text-green-400">
              <Layers className="h-5 w-5" />
            </span>
            Model Registration
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
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
                <tr><td className="font-medium text-slate-900 dark:text-white">Name &amp; version</td><td>e.g., Llama 3.1 8B</td></tr>
                <tr><td className="font-medium text-slate-900 dark:text-white">Architecture</td><td>LLM, diffusion, GAN, etc.</td></tr>
                <tr><td className="font-medium text-slate-900 dark:text-white">Tensor Commit</td><td>Cryptographic weight fingerprint</td></tr>
                <tr><td className="font-medium text-slate-900 dark:text-white">Param count</td><td>For fee estimation</td></tr>
                <tr><td className="font-medium text-slate-900 dark:text-white">Base fee</td><td>$THE per inference</td></tr>
                <tr><td className="font-medium text-slate-900 dark:text-white">Owner</td><td>Revenue destination (address/DAO)</td></tr>
                <tr><td className="font-medium text-slate-900 dark:text-white">Weights URI</td><td>Where validators fetch params</td></tr>
                <tr><td className="font-medium text-slate-900 dark:text-white">Compute spec</td><td>For Tensor Commits generation</td></tr>
                <tr><td className="font-medium text-slate-900 dark:text-white">Permissions</td><td>Access control rules</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Inference Loop */}
        <section className="mb-12">
          <h2 id="inference-loop" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-yellow-500/10 text-yellow-700 dark:text-yellow-400">
              <Zap className="h-5 w-5" />
            </span>
            Sovereign Agent Inference Loop
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            How sovereign agents decide when to run inference, without human sign-off or off-chain schedulers:
          </p>

          <FlowDiagram
            accent="amber"
            steps={[
              { title: "Wake-up", desc: "Heartbeat tx every N blocks, keep-alive bounty, or event relay activates the agent." },
              { title: "Evaluate triggers", desc: "During AGENT_TICK: scheduled block? price crossed? memory anchor changed?" },
              { title: "Fee & balance test", desc: "Look up model cost, add proof surcharge, confirm $THE balance covers total." },
              { title: "Call the model", desc: "Submit MODEL_INFER with inputs and fee cap; scheduler assigns to prover." },
            ]}
          />

          <Callout type="success" title="Fully Sovereign">
            Agents control their own funds. Decisions are pure functions of on-chain state.
          </Callout>
        </section>

        {/* Inter-Agent Interaction */}
        <section className="mb-12">
          <h2 id="interaction" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-700 dark:text-indigo-300">
              <Users className="h-5 w-5" />
            </span>
            Inter-Agent Interaction
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Agents with an address, balance, and ABI can call each other like contracts, except either side can invoke models mid-flow.
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { title: "Discovery", desc: "Agents publish service manifests on-chain (selectors, purpose hash, access mode)" },
              { title: "Call & Pay", desc: "Caller sends AIVM request with callee, function, args, and optional capability token" },
              { title: "Model Invocation", desc: "Either side can invoke models: caller before call, callee during execution" },
              { title: "Result Handling", desc: "Same-block returns immediately; longer jobs issue promise events" },
            ].map((item) => (
              <div key={item.title} className="docs-card">
                <h3 className="text-sm font-medium mb-1 text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Model Usage Fees */}
        <section className="mb-12">
          <h2 id="fees" className="text-2xl font-medium mb-4 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-green-500/10 text-green-700 dark:text-green-400">
              <Coins className="h-5 w-5" />
            </span>
            Model Usage Fees
          </h2>
          
          <div className="docs-card">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              Model owners set base fees in $THE. Fees flow directly to owners. Built-in order book batches intents per block, converging prices to marginal cost without off-chain brokers.
            </p>
            <p className="text-slate-600 dark:text-gray-500 text-sm">
              Dishonest proofs burn the offender&apos;s stake. Economic security scales with staked value.
            </p>
          </div>
        </section>

        {/* Navigation */}
        <div className="border-t border-slate-200 dark:border-gray-800 pt-8 grid sm:grid-cols-2 gap-4">
          <Link href="/docs/ship" className="group no-underline">
            <div className="docs-card h-full flex items-start gap-3">
              <Code2 className="h-5 w-5 text-slate-600 dark:text-gray-500 group-hover:text-indigo-700 dark:text-indigo-300 transition-colors shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium group-hover:text-indigo-700 dark:text-indigo-300 transition-colors">SHIP Language →</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Write agent logic in SHIP DSL</p>
              </div>
            </div>
          </Link>
          <Link href="/docs/examples" className="group no-underline">
            <div className="docs-card h-full flex items-start gap-3">
              <Bot className="h-5 w-5 text-slate-600 dark:text-gray-500 group-hover:text-indigo-700 dark:text-indigo-300 transition-colors shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium group-hover:text-indigo-700 dark:text-indigo-300 transition-colors">Code Examples →</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">View example implementations</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <PrevNext current="agents" />

    </div>
  );
}
