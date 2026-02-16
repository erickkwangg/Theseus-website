import Link from "next/link";
import type { Metadata } from "next";
import { Code2, AlertTriangle, CheckCircle, Zap, Cpu, Bot } from "lucide-react";
import Callout from "@/components/docs/Callout";
import CodeBlock from "@/components/docs/CodeBlock";

export const metadata: Metadata = {
  title: "SHIP Language - Theseus Docs",
  description:
    "Learn SHIP: the domain-specific language that compiles AI intent into bounded, verifiable AIVM execution.",
  keywords: ["SHIP", "Theseus DSL", "AIVM bytecode", "verifiable agent programming"],
};

export default function SHIPPage() {
  return (
    <div className="docs-content">
      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/35 bg-indigo-500/10 text-indigo-300 text-xs mb-4">
          <Code2 className="h-3 w-3" />
          Development
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">
          SHIP Language
        </h1>
        <p className="text-xl text-gray-400 leading-relaxed">
          Secure Heterogeneous Inference Programming—translating natural language to verifiable bytecode.
        </p>
      </div>
        
      <div className="prose prose-invert max-w-none">
        {/* Why SHIP */}
        <section className="mb-12">
          <h2 id="why-ship" className="text-2xl font-medium mb-4">Why SHIP Is Necessary</h2>
          
          <p className="text-gray-400 mb-6">
            SHIP translates model inference outputs into executable operations: asset transfers, agent interactions, and contract calls. It provides a constrained, verifiable layer between model output and runtime execution.
          </p>

          <Callout type="warning" title="The Problem with Raw LLM Outputs">
            LLMs can generate text resembling executable logic, but they&apos;re non-deterministic and lack formal guarantees about structure, safety, or correctness. Using raw outputs for bytecode generation introduces serious issues.
          </Callout>

          <div className="grid sm:grid-cols-2 gap-3 mt-6">
            {[
              { icon: AlertTriangle, title: "Unpredictability", desc: "Hallucinations, unsafe constructs" },
              { icon: AlertTriangle, title: "Unbounded execution", desc: "DoS risks" },
              { icon: AlertTriangle, title: "No proof anchoring", desc: "Verification impossible" },
              { icon: AlertTriangle, title: "Opaque intent", desc: "Implicit goals" },
            ].map((item) => (
              <div key={item.title} className="docs-card">
                <div className="flex items-center gap-2 mb-1">
                  <item.icon className="h-4 w-4 text-yellow-400" />
                  <span className="text-white font-medium text-sm">{item.title}</span>
                </div>
                <p className="text-gray-400 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ecosystem Examples */}
        <section className="mb-12">
          <h2 id="ecosystem-examples" className="text-2xl font-medium mb-4">Ecosystem Examples</h2>
          <p className="text-gray-400 mb-6">
            Public repositories in the Theseus ecosystem show how SHIP is used in deployed applications.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="docs-card">
              <h3 className="text-lg font-medium mb-2">proof-of-lobster</h3>
              <p className="text-gray-400 text-sm mb-3">
                Demonstrates persistent agent identity, scheduled execution, and social interaction flows.
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
              <p className="text-gray-400 text-sm mb-3">
                Demonstrates agent-to-contract calls, contract-to-agent callbacks, and resolver workflows.
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
          </div>
        </section>

        {/* Design Principles */}
        <section className="mb-12">
          <h2 id="principles" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-300">
              <CheckCircle className="h-5 w-5" />
            </span>
            Design Principles
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { title: "Determinism", desc: "Static bounds, known gas/memory" },
              { title: "Verifiability", desc: "Tensor Commit proofs" },
              { title: "Traceability", desc: "Tied to agent context" },
              { title: "Composability", desc: "Staged, delegated, templated" },
            ].map((item) => (
              <div key={item.title} className="docs-card">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-white font-medium text-sm">{item.title}</span>
                </div>
                <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Execution Flow */}
        <section className="mb-12">
          <h2 id="execution" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
              <Zap className="h-5 w-5" />
            </span>
            Execution Flow
          </h2>
          
          <div className="space-y-3">
            {[
              { step: "1", title: "Inference", desc: "Agent runs model, generates output" },
              { step: "2", title: "Compilation", desc: "NL→SHIP via fine-tuned agent, then SHIP→bounded opcodes" },
              { step: "3", title: "Verification", desc: "Tensor Commit proves inference integrity, bytecode validated" },
              { step: "4", title: "Execution", desc: "Program submitted to runtime" },
            ].map((item) => (
              <div key={item.step} className="docs-card">
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500 text-white text-xs font-bold shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-medium text-sm">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Example Use Case */}
        <section className="mb-12">
          <h2 id="example" className="text-2xl font-medium mb-4">Example Use Case</h2>
          
          <p className="text-gray-400 mb-6">
            A sovereign agent runs a summarization model. The summary contains a trigger like &quot;Pay 10 $THE to agent_xyz for document processing&quot;.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="docs-card border-red-900/30">
              <h3 className="text-lg font-medium mb-2 text-red-400">Without SHIP</h3>
              <p className="text-gray-400 text-sm">
                Text parsed directly into bytecode, causing potential execution unaligned with agent&apos;s intention.
              </p>
            </div>
            <div className="docs-card border-green-900/50">
              <h3 className="text-lg font-medium mb-2 text-green-400">With SHIP</h3>
              <CodeBlock language="text" filename="example.ship">{`let payment = Transfer {
  recipient: agent_xyz,
  amount: 10 THE
};
commit(payment);`}</CodeBlock>
            </div>
          </div>
        </section>

        {/* Integration with AIVM */}
        <section className="mb-12">
          <h2 id="integration" className="text-2xl font-medium mb-4 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-300">
              <Cpu className="h-5 w-5" />
            </span>
            Integration with AIVM
          </h2>
          
          <div className="docs-card">
            <div className="space-y-3 text-sm text-gray-400">
              <p>SHIP compiles to AIVM opcodes, executed via <code className="text-indigo-300">AGENT_TICK()</code> or <code className="text-indigo-300">MODEL_INFER()</code>.</p>
              <p>Each construct maps to safe primitives: <code className="text-indigo-300">TLOAD</code>, <code className="text-indigo-300">TCUSTOM</code>, <code className="text-indigo-300">STATE_EXPORT</code>, <code className="text-indigo-300">TRANSFER_TOKEN</code>.</p>
              <p>Tensor Commits link inference outputs to on-chain outcomes.</p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="border-t border-gray-800 pt-8 grid sm:grid-cols-2 gap-4">
          <Link href="/docs/aivm" className="group no-underline">
            <div className="docs-card h-full flex items-start gap-3">
              <Cpu className="h-5 w-5 text-gray-500 group-hover:text-indigo-300 transition-colors shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium group-hover:text-indigo-300 transition-colors">← AIVM Details</h3>
                <p className="text-sm text-gray-400 mt-1">Learn about the execution environment</p>
              </div>
            </div>
          </Link>
          <Link href="/docs/agents" className="group no-underline">
            <div className="docs-card h-full flex items-start gap-3">
              <Bot className="h-5 w-5 text-gray-500 group-hover:text-indigo-300 transition-colors shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium group-hover:text-indigo-300 transition-colors">Build Agents →</h3>
                <p className="text-sm text-gray-400 mt-1">Create agents using SHIP</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
