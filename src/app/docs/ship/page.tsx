import Link from "next/link";
import type { Metadata } from "next";
import {
  Code2,
  CheckCircle,
  Zap,
  Cpu,
  Bot,
  Play,
  FileCode,
  Terminal,
} from "lucide-react";
import Callout from "@/components/docs/Callout";
import CodeBlock from "@/components/docs/CodeBlock";
import { DocsPageJsonLd } from "@/components/JsonLd";
import PrevNext from "@/components/docs/PrevNext";

export const metadata: Metadata = {
  title: "SHIP",
  description:
    "SHIP is the declarative DSL underneath the OpenClaw-style agent file format. Compiles to a SCALE-encoded CompiledAgent the chain registers directly.",
  keywords: [
    "SHIP",
    "SKILL.md",
    "OpenClaw-style agents",
    "agent file format",
    "Theseus agents",
    "Agent Behavior Graph",
    "ABG",
    "CompiledAgent",
    "shipc",
    "agent specification",
  ],
  alternates: { canonical: "/docs/ship" },
};

export default function SHIPPage() {
  return (
    <div className="docs-content">
      <DocsPageJsonLd
        title="SHIP"
        description="SHIP — Structured Hierarchical Instructional Programs. The declarative agent specification format that compiles to a SCALE-encoded CompiledAgent the chain registers directly."
        slug="ship"
      />
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/35 bg-indigo-500/10 text-indigo-300 text-xs mb-4">
          <Code2 className="h-3 w-3" />
          Build
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-normal mb-4 tracking-[-0.02em] [text-wrap:balance]">
          SHIP
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          Structured Hierarchical Instructional Programs. The declarative DSL
          underneath the OpenClaw-style agent file, lowered by{" "}
          <code className="font-mono text-[0.85em]">shipc</code> to a chain-ready
          CompiledAgent.
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="tip" title="In one paragraph">
          Agents author in the OpenClaw-style format (Markdown body with
          Theseus YAML frontmatter, written to <code>SKILL.md</code>), which{" "}
          <code>shipc</code> elaborates into SHIP and then lowers to a
          canonical <code>CompiledAgent</code> structure. SHIP declares the
          agent&rsquo;s metadata, its tools, and its Agent Behavior Graph
          (ABG): model calls, tool calls, routers, terminal nodes. The
          compiler emits JSON for tooling and SCALE for on-chain registration.
          The runtime never sees SHIP source — only the SCALE-encoded blob.
        </Callout>
        <ul className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-1.5 mb-10 ml-5 list-disc">
          <li>
            <strong>Declarative, not Turing-complete</strong>: SHIP describes
            graph shape and tool schemas, not arbitrary control flow.
          </li>
          <li>
            <strong>Compiles to <code>CompiledAgent</code></strong>: a SCALE-
            and JSON-encoded canonical structure that the chain decodes into
            ABG nodes on registration.
          </li>
          <li>
            <strong>Off-chain authoring</strong>: SHIP source lives in your
            repo. The chain only knows about the compiled blob — runtime
            bounds (max ABG nodes, max tools per agent, etc.) are enforced
            during decoding.
          </li>
          <li>
            <strong>Versioned</strong>: <code>0.x</code> experimental,{" "}
            <code>1.x</code> stable (backwards-compatible within major).
          </li>
        </ul>

        {/* Try in playground */}
        <Callout type="info" title="Try SHIP without installing">
          <p className="mb-3">
            The playground compiles a real SHIP agent and shows a simulated
            execution trace. Useful for getting a feel for the syntax before
            reading the rest of the page.
          </p>
          <Link
            href="/playground"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg transition-all text-sm font-medium no-underline"
          >
            <Play className="h-4 w-4" />
            Open the playground
          </Link>
        </Callout>

        {/* What SHIP describes */}
        <section className="mb-12">
          <h2
            id="what-ship-describes"
            className="text-2xl font-medium mb-4"
          >
            What a SHIP file describes
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            A SHIP file is a single, self-contained agent definition. It
            captures the four things the chain needs to register an agent and
            run it.
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              {
                title: "Agent metadata",
                desc: "Name, version, entry node, system prompt.",
              },
              {
                title: "Tool definitions",
                desc: "Names, descriptions, JSON schemas. The capability surface the runtime enforces.",
              },
              {
                title: "ABG nodes",
                desc: "Model calls, tool calls, routers, end nodes — the directed graph the runtime executes.",
              },
              {
                title: "Constants and IDs",
                desc: "Canonical 32-byte hex IDs for models and sub-agents. No fuzzy tag lookup at registration time.",
              },
            ].map((item) => (
              <div key={item.title} className="docs-card">
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

        {/* End-to-end flow */}
        <section className="mb-12">
          <h2
            id="flow"
            className="text-2xl font-medium mb-6 flex items-center gap-3"
          >
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
              <Zap className="h-5 w-5" />
            </span>
            Authoring → on-chain
          </h2>

          <div className="space-y-3">
            {[
              {
                step: "1",
                title: "Author",
                desc: "Write agent.ship in your editor. Declare metadata, tools, and the ABG.",
                icon: FileCode,
              },
              {
                step: "2",
                title: "Compile",
                desc: "shipc compile agent.ship — produces both agent.ship.json (for tooling/CI) and agent.ship.scale (for on-chain).",
                icon: Terminal,
              },
              {
                step: "3",
                title: "Register",
                desc: "Submit the SCALE blob to register_compiled_agent. The runtime decodes it into ABG nodes and enforces bounds (MaxAbgNodes, MaxToolsPerAgent, …).",
                icon: Cpu,
              },
              {
                step: "4",
                title: "Run",
                desc: "call_agent triggers the ABG. SHIP is no longer in the picture — the chain executes the decoded graph.",
                icon: Bot,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="docs-card">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-500 text-white text-xs font-bold shrink-0">
                      {item.step}
                    </span>
                    <Icon className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm text-slate-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Canonical example (from the SHIP v0.1 README) */}
        <section className="mb-12">
          <h2 id="example" className="text-2xl font-medium mb-4">
            A canonical example
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            A small ReAct-style weather agent: one model call, one router on
            whether the model emitted tool calls, one tool-execution node.
            This is the exact shape <code>shipc</code> compiles.
          </p>

          <CodeBlock language="text" filename="react_weather.ship">{`ship 0.1

// Canonical IDs (32-byte 0x-prefixed hex). Model tags are no longer accepted.
const MODEL_GPT51 = "0xe49630ccb59348a9cbbd9989e6774e8b7340b347fbcd94da1f535fb25c15f117"

agent "react_weather"
version 1
entry   model_main
system "You are a concise weather assistant. Use tools when necessary."

tools {
  """Get the weather for a city"""
  get_weather(city: string, unit?: "c" | "f")
}

graph {
  model_main: model_call(MODEL_GPT51) { next -> check_tools }
  check_tools: has_tool_calls ? tool_exec : end
  tool_exec:  tool_call         { next -> end }
}`}</CodeBlock>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="docs-card">
              <h3 className="text-sm font-medium mb-1 text-slate-900 dark:text-white">
                <code className="text-indigo-300">agent</code>,{" "}
                <code className="text-indigo-300">version</code>,{" "}
                <code className="text-indigo-300">entry</code>
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                Identifies the agent and pins which node the runtime starts
                with. The version is part of the agent&rsquo;s on-chain
                identity.
              </p>
            </div>
            <div className="docs-card">
              <h3 className="text-sm font-medium mb-1 text-slate-900 dark:text-white">
                <code className="text-indigo-300">system</code> prompt
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                Stored on-chain alongside the agent. Anyone calling{" "}
                <code>get_agent</code> can read exactly what the model is told
                to do.
              </p>
            </div>
            <div className="docs-card">
              <h3 className="text-sm font-medium mb-1 text-slate-900 dark:text-white">
                <code className="text-indigo-300">tools</code> block
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                Declares the tool surface the agent can call. Each tool has a
                description and a typed signature; the runtime rejects calls
                outside this set.
              </p>
            </div>
            <div className="docs-card">
              <h3 className="text-sm font-medium mb-1 text-slate-900 dark:text-white">
                <code className="text-indigo-300">graph</code> body
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                The ABG. Each node is a <code>model_call</code>,{" "}
                <code>tool_call</code>, router (<code>?:</code> or{" "}
                <code>match</code>), or terminal <code>end</code>. The shape
                bounds what the agent can do.
              </p>
            </div>
          </div>
        </section>

        {/* Compile + register */}
        <section className="mb-12">
          <h2
            id="compile-register"
            className="text-2xl font-medium mb-4 flex items-center gap-3"
          >
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-300">
              <Terminal className="h-5 w-5" />
            </span>
            Compile and register
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            <code>shipc</code> emits both a JSON artifact (for editors,
            explorers, CI) and a SCALE blob (for the chain) from the same
            canonical structure.
          </p>

          <CodeBlock language="bash" filename="terminal">{`# Default: compile and write both JSON and SCALE artifacts into ./artifacts
shipc compile react_weather.ship
# -> ./artifacts/react_weather.ship.json
# -> ./artifacts/react_weather.ship.scale

# SCALE only, to stdout (for piping into a deploy script)
shipc compile react_weather.ship --scale > react_weather.ship.scale

# Validate without emitting
shipc validate react_weather.ship`}</CodeBlock>

          <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
            Submit the SCALE blob via the chain&rsquo;s{" "}
            <code>register_compiled_agent</code> extrinsic. The runtime
            decodes it, applies pallet bounds, and stores{" "}
            <code>AgentInfo + AbgNodes</code>. From that point on, the agent
            is callable via <code>call_agent</code>.
          </p>

          <Callout type="info" title="The runtime doesn’t know about SHIP">
            On-chain code only ever sees a SCALE-encoded{" "}
            <code>CompiledAgent</code> blob. SHIP source, the parser, and{" "}
            <code>shipc</code> all live off-chain. That separation means new
            authoring formats can be added without touching consensus — they
            just need to produce the same canonical structure.
          </Callout>
        </section>

        {/* Design principles */}
        <section className="mb-12">
          <h2
            id="principles"
            className="text-2xl font-medium mb-6 flex items-center gap-3"
          >
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-300">
              <CheckCircle className="h-5 w-5" />
            </span>
            Design principles
          </h2>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              {
                title: "Bounded by construction",
                desc: "Max ABG nodes, max tools per agent, max system prompt size — all enforced during SCALE decoding. A SHIP file that exceeds any bound fails registration.",
              },
              {
                title: "Single source of truth",
                desc: "The same shared types power shipc’s JSON output and the runtime’s SCALE decoding. They can’t drift.",
              },
              {
                title: "Auditable",
                desc: "Anyone can inspect a deployed agent: pull AgentInfo + AbgNodes, render the graph, read the system prompt verbatim. No hidden logic.",
              },
              {
                title: "Replaceable",
                desc: "shipc is one toolchain. Anything that emits a valid CompiledAgent SCALE blob can register an agent. SHIP source isn’t a moat.",
              },
            ].map((item) => (
              <div key={item.title} className="docs-card">
                <div className="flex items-center gap-2 mb-1.5">
                  <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
                  <span className="text-slate-900 dark:text-white font-medium text-sm">
                    {item.title}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Ecosystem */}
        <section className="mb-12">
          <h2 id="ecosystem-examples" className="text-2xl font-medium mb-4">
            Ecosystem examples
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Public Theseus repos that ship SHIP-defined agents end-to-end.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="docs-card">
              <h3 className="text-lg font-medium mb-2">proof-of-lobster</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                Persistent agent identity, scheduled execution, social
                interaction flows.
              </p>
              <a
                href="https://github.com/Theseuschain/proof-of-lobster"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-300 hover:underline text-sm no-underline"
              >
                View repository →
              </a>
            </div>
            <div className="docs-card">
              <h3 className="text-lg font-medium mb-2">the-prediction-market</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                Agent-to-contract calls, contract-to-agent callbacks, resolver
                workflows.
              </p>
              <a
                href="https://github.com/Theseuschain/the-prediction-market"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-300 hover:underline text-sm no-underline"
              >
                View repository →
              </a>
            </div>
            <div className="docs-card">
              <h3 className="text-lg font-medium mb-2">SHIP toolchain</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                <code>shipc</code> compiler, shared types, runtime helper, and
                the SHIP v0.1 spec.
              </p>
              <a
                href="https://github.com/Theseuschain/SHIP"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-300 hover:underline text-sm no-underline"
              >
                View repository →
              </a>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="border-t border-slate-200 dark:border-gray-800 pt-8 grid sm:grid-cols-2 gap-4">
          <Link href="/docs/aivm" className="group no-underline">
            <div className="docs-card h-full flex items-start gap-3">
              <Cpu className="h-5 w-5 text-gray-500 group-hover:text-indigo-300 transition-colors shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium group-hover:text-indigo-300 transition-colors">
                  ← AIVM
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  How verified inference results re-enter agent execution.
                </p>
              </div>
            </div>
          </Link>
          <Link href="/docs/agents" className="group no-underline">
            <div className="docs-card h-full flex items-start gap-3">
              <Bot className="h-5 w-5 text-gray-500 group-hover:text-indigo-300 transition-colors shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium group-hover:text-indigo-300 transition-colors">
                  Agents →
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Lifecycle, ABGs, the three-stage execution model.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <PrevNext current="ship" />
    </div>
  );
}
