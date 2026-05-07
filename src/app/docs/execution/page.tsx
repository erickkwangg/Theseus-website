import Link from "next/link";
import type { Metadata } from "next";
import {
  Workflow,
  Bot,
  Cpu,
  CheckCircle,
  Clock,
  RefreshCw,
} from "lucide-react";
import Callout from "@/components/docs/Callout";
import { DocsPageJsonLd } from "@/components/JsonLd";
import PrevNext from "@/components/docs/PrevNext";

export const metadata: Metadata = {
  title: "Execution Model",
  description:
    "How Theseus agents run across blocks: the three-stage queue / prove / resume pattern, the inherent-driven resume hook, capability surface enforcement, and the call_agent origin story.",
  keywords: [
    "Theseus execution",
    "agent execution",
    "three-stage execution",
    "ABG runtime",
    "InferenceVerified",
    "OnInferenceVerified",
    "on_initialize",
    "asynchronous inference",
  ],
  alternates: { canonical: "/docs/execution" },
};

export default function ExecutionPage() {
  return (
    <div className="docs-content">
      <DocsPageJsonLd
        title="Execution Model"
        description="How Theseus agents run across blocks: the three-stage queue / prove / resume pattern, the inherent-driven resume hook, capability surface enforcement, and the call_agent origin story."
        slug="execution"
      />

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/35 bg-indigo-500/10 text-indigo-300 text-xs mb-4">
          <Workflow className="h-3 w-3" />
          Core Concepts
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">
          Execution Model
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          How an agent call lands, gets proved, and resumes — across blocks.
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="tip" title="In one paragraph">
          Inference on Theseus is never synchronous. A user can&rsquo;t submit
          a model call and read the result in the same block — the inference
          runs off-chain on a prover, the proof has to come back, and the
          chain has to verify it before any state changes. That&rsquo;s
          three stages, three different transactions, spanning multiple
          blocks. The pattern is borrowed from Substrate&rsquo;s XCM async
          model and adapted for AI workloads.
        </Callout>
        <ul className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-1.5 mb-10 ml-5 list-disc">
          <li>
            <strong>Stage 1 (queue)</strong>: <code>call_agent</code>{" "}
            interprets the agent&rsquo;s ABG until it hits a model or tool
            call, then suspends.
          </li>
          <li>
            <strong>Stage 2 (prove)</strong>: an off-chain prover picks up
            the job and submits a verified result via{" "}
            <code>submit_inference_result</code>.
          </li>
          <li>
            <strong>Stage 3 (resume)</strong>: an inherent-driven{" "}
            <code>on_initialize</code> hook scans verified results and
            resumes the agent&rsquo;s ABG with the original caller&rsquo;s
            origin.
          </li>
          <li>
            <strong>Capability surface</strong>: <code>pallet_ship</code>{" "}
            validates every emitted intent against the ABG&rsquo;s declared
            capability set. Calls outside that set are rejected.
          </li>
        </ul>

        {/* The flow */}
        <section className="mb-12">
          <h2 id="three-stages" className="text-2xl font-medium mb-6">
            The three stages
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Each stage is a distinct extrinsic with a distinct caller. The
            chain only verifies what each stage&rsquo;s extrinsic carries —
            never raw prover output, never tool results from anyone but the
            registered enclave.
          </p>

          <div className="space-y-4">
            <div className="docs-card border-indigo-900/50">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-2 text-slate-900 dark:text-slate-100">
                    Stage 1 — Queue (<code className="font-mono text-indigo-600 dark:text-indigo-300">call_agent</code>)
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
                    A signed transaction lands in a block.{" "}
                    <code>pallet_agents</code> creates an entry in{" "}
                    <code>PendingAgentJobs</code>, records the original
                    user origin, and begins interpreting the agent&rsquo;s
                    ABG. The interpreter advances through synchronous nodes
                    (conditions, sequence, parallel) until it hits a{" "}
                    <code>ModelCall</code> or <code>ToolCall</code>.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    At that point AIVM queues an inference job and emits{" "}
                    <code>InferenceQueued</code>. The agent suspends. The
                    block closes; the user&rsquo;s transaction is done.
                  </p>
                </div>
              </div>
            </div>

            <div className="docs-card border-indigo-900/50">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-300 shrink-0">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-2 text-slate-900 dark:text-slate-100">
                    Stage 2 — Prove (<code className="font-mono text-indigo-600 dark:text-indigo-300">submit_inference_result</code>)
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
                    An off-chain prover, subscribing to{" "}
                    <code>InferenceQueued</code>, picks up the job. It runs
                    the inference, generates a TensorCommitment proof (full
                    prover) or signs the output (lite prover), and submits
                    the result. AIVM verifies the proof via the native KZG
                    host function and marks the job{" "}
                    <code>InferenceVerified</code>.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    No agent state transitions occur in this stage. The
                    prover&rsquo;s role is bounded: supply the inference
                    result and the verification material. Nothing else.
                  </p>
                </div>
              </div>
            </div>

            <div className="docs-card border-indigo-900/50">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-green-500/10 text-green-600 dark:text-green-300 shrink-0">
                  <RefreshCw className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-2 text-slate-900 dark:text-slate-100">
                    Stage 3 — Resume (inherent, block-author-driven)
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
                    On every block, an{" "}
                    <code>on_initialize</code> hook scans{" "}
                    <code>InferenceVerified</code> entries (bounded by a
                    per-block weight budget). For each, the agent loop
                    resumes with the verified result, executing under the
                    original user origin recorded in Stage 1.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    The agent continues interpreting the ABG until it
                    either hits another async boundary (back to Stage 1/2)
                    or reaches a terminal node that emits SHIP intents.
                    Intents execute under the same original origin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why three stages */}
        <section className="mb-12">
          <h2 id="why" className="text-2xl font-medium mb-4">
            Why three stages, not one
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            The split exists because each stage has a different trust
            relationship with the chain.
          </p>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            <li>
              <strong>The user</strong> can submit{" "}
              <code className="font-mono">call_agent</code> but cannot run
              inference. They&rsquo;re only authorized to start the work.
            </li>
            <li>
              <strong>The prover</strong> can run inference and submit
              proofs but cannot mutate agent state. They&rsquo;re only
              authorized to supply verified results.
            </li>
            <li>
              <strong>The runtime</strong> (via the inherent hook) is the
              only thing that mutates agent state, and only after KZG
              verification has passed. State changes are always driven by
              deterministic on-chain logic, never by prover-controlled
              extrinsics.
            </li>
          </ul>

          <Callout type="info" title="Result: prover compromise can&rsquo;t change agent state">
            Even a malicious prover can only submit results for jobs already
            in the queue, and only results that pass on-chain verification.
            They can&rsquo;t synthesize new agent runs, can&rsquo;t bypass
            ABG transitions, and can&rsquo;t emit intents.
          </Callout>
        </section>

        {/* Wake triggers */}
        <section className="mb-12">
          <h2 id="wake-triggers" className="text-2xl font-medium mb-4">
            What kicks off Stage 1
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Agents don&rsquo;t run on every block — they sit dormant until
            something wakes them. There are three trigger categories:
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              {
                title: "Events",
                desc: "On-chain events the agent subscribes to: token transfers, calls from other agents, contract state changes.",
              },
              {
                title: "Time",
                desc: "Scheduled wake-ups at a specific block height or interval. Cron-shaped.",
              },
              {
                title: "External users",
                desc: "Anyone calls call_agent with an entrypoint and input.",
              },
            ].map((t) => (
              <div key={t.title} className="docs-card">
                <h3 className="text-sm font-medium mb-1.5 text-slate-900 dark:text-slate-100">
                  {t.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Origins */}
        <section className="mb-12">
          <h2 id="origins" className="text-2xl font-medium mb-4">
            The original-origin invariant
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            When <code>call_agent</code> lands in Stage 1, the chain records
            the caller&rsquo;s origin. Every later step in that
            agent&rsquo;s execution — Stage 2&rsquo;s prover submission,
            Stage 3&rsquo;s ABG resume, the eventual SHIP intents emitted
            at terminal nodes — runs under that same origin.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            That preserves two things:
          </p>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <li>
              <strong>Fee accounting</strong>. The agent pays for inference
              and tools out of its own seus balance (reverse-gas), but
              user-side fees on the originating <code>call_agent</code> are
              billed to the original caller.
            </li>
            <li>
              <strong>Authorization</strong>. SHIP intents that touch other
              accounts (transfers, contract calls) execute as the original
              caller, not as the agent. The agent can act on the
              caller&rsquo;s behalf only to the extent the caller pre-
              authorized via the entrypoint.
            </li>
          </ul>
        </section>

        {/* Capability surface */}
        <section className="mb-12">
          <h2
            id="capability-surface"
            className="text-2xl font-medium mb-4"
          >
            Capability surface enforcement
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            An agent&rsquo;s ABG declares the set of models, tools,
            sub-agents, and intent types it&rsquo;s allowed to reference.
            This <em>capability surface</em> is part of the ABG itself,
            stored on-chain at registration time.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            At every async boundary, AIVM and{" "}
            <code>pallet_tools</code> check that the requested model or tool
            is in the surface. At every terminal node,{" "}
            <code>pallet_ship</code> validates that emitted intents are
            inside it. Anything outside the surface is rejected at the
            runtime layer — the agent cannot exceed its declared
            capabilities even if the underlying model output suggests
            doing so.
          </p>
        </section>

        {/* Limits */}
        <section className="mb-12">
          <h2 id="limits" className="text-2xl font-medium mb-4">
            Per-run limits
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            Each agent run is bounded so a misbehaving model can&rsquo;t
            consume unbounded block weight or storage. The headline numbers:
          </p>
          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700/60">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100/60 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700/60">
                  <th className="text-left font-medium text-slate-600 dark:text-slate-400 px-4 py-2.5">
                    Limit
                  </th>
                  <th className="text-left font-medium text-slate-600 dark:text-slate-400 px-4 py-2.5">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Max ABG nodes", "256 per agent"],
                  ["Max steps per run", "64"],
                  ["Sync steps per tick", "16"],
                  ["Max messages per run", "10"],
                  ["Max sub-agent call depth", "2"],
                  ["Inference retries per node", "2"],
                  ["Tool retries per node", "2"],
                  ["Job expiry", "600 blocks (~1 hour)"],
                ].map(([k, v]) => (
                  <tr
                    key={k}
                    className="border-b border-slate-200 dark:border-slate-800 last:border-0"
                  >
                    <td className="px-4 py-2.5 text-slate-700 dark:text-slate-300">
                      {k}
                    </td>
                    <td className="px-4 py-2.5 font-mono text-slate-900 dark:text-slate-100">
                      {v}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Full reference at{" "}
            <Link
              href="/docs/reference/parameters"
              className="underline"
            >
              Network Parameters
            </Link>
            .
          </p>
        </section>

        {/* Navigation */}
        <div className="border-t border-slate-200 dark:border-gray-800 pt-8 grid sm:grid-cols-2 gap-4">
          <Link href="/docs/agents" className="group no-underline">
            <div className="docs-card h-full flex items-start gap-3">
              <Bot className="h-5 w-5 text-gray-500 group-hover:text-indigo-300 transition-colors shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium group-hover:text-indigo-300 transition-colors">
                  ← Agents
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Lifecycle, ABG, AKG.
                </p>
              </div>
            </div>
          </Link>
          <Link href="/docs/provers" className="group no-underline">
            <div className="docs-card h-full flex items-start gap-3">
              <Cpu className="h-5 w-5 text-gray-500 group-hover:text-indigo-300 transition-colors shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium group-hover:text-indigo-300 transition-colors">
                  Provers →
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Who runs Stage 2 and how the chain trusts them.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <PrevNext current="execution" />
    </div>
  );
}
