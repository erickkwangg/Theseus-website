import Link from "next/link";
import type { Metadata } from "next";
import { Code2, AlertTriangle, CheckCircle, Zap, Cpu, Bot, Play } from "lucide-react";
import Callout from "@/components/docs/Callout";
import CodeBlock from "@/components/docs/CodeBlock";
import FlowDiagram from "@/components/docs/FlowDiagram";
import { DocsPageJsonLd } from "@/components/JsonLd";
import PrevNext from "@/components/docs/PrevNext";

export const metadata: Metadata = {
  title: "SHIP Language",
  description:
    "Learn SHIP: the domain-specific language that compiles AI intent into bounded, verifiable AIVM execution.",
  keywords: ["SHIP", "Theseus DSL", "AIVM bytecode", "verifiable agent programming"],
};

export default function SHIPPage() {
  return (
    <div className="docs-content">
      <DocsPageJsonLd title="SHIP Language" description="Learn SHIP: the domain-specific language that compiles AI intent into bounded, verifiable AIVM execution." slug="ship" />
      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/35 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-xs mb-4">
          <Code2 className="h-3 w-3" />
          Development
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">
          SHIP Language
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          Secure Heterogeneous Inference Programming. Translating natural language to verifiable bytecode.
        </p>
      </div>
        
      <div className="prose prose-invert max-w-none">
        {/* Try in playground */}
        <Callout type="info" title="Try SHIP without installing">
          <p className="mb-3">
            The playground compiles a real SHIP agent and shows a simulated execution trace. Useful for getting a feel for the syntax before reading the full page.
          </p>
          <Link
            href="/playground"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg transition-all text-sm font-medium no-underline"
          >
            <Play className="h-4 w-4" />
            Open the playground
          </Link>
        </Callout>

        {/* Why SHIP */}
        <section className="mb-12">
          <h2 id="why-ship" className="text-2xl font-medium mb-4">Why SHIP Is Necessary</h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
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
                  <item.icon className="h-4 w-4 text-yellow-700 dark:text-yellow-400" />
                  <span className="text-slate-900 dark:text-white font-medium text-sm">{item.title}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ecosystem Examples */}
        <section className="mb-12">
          <h2 id="ecosystem-examples" className="text-2xl font-medium mb-4">Ecosystem Examples</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Public repositories in the Theseus ecosystem show how SHIP is used in deployed applications.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="docs-card">
              <h3 className="text-lg font-medium mb-2">proof-of-lobster</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                Demonstrates persistent agent identity, scheduled execution, and social interaction flows.
              </p>
              <a
                href="https://github.com/Theseuschain/proof-of-lobster"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-700 dark:text-indigo-300 hover:underline text-sm no-underline"
              >
                View repository →
              </a>
            </div>
            <div className="docs-card">
              <h3 className="text-lg font-medium mb-2">the-prediction-market</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                Demonstrates agent-to-contract calls, contract-to-agent callbacks, and resolver workflows.
              </p>
              <a
                href="https://github.com/Theseuschain/the-prediction-market"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-700 dark:text-indigo-300 hover:underline text-sm no-underline"
              >
                View repository →
              </a>
            </div>
          </div>
        </section>

        {/* Design Principles */}
        <section className="mb-12">
          <h2 id="principles" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-700 dark:text-indigo-300">
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
                  <CheckCircle className="h-4 w-4 text-green-700 dark:text-green-400" />
                  <span className="text-slate-900 dark:text-white font-medium text-sm">{item.title}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Execution Flow */}
        <section className="mb-12">
          <h2 id="execution" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-700 dark:text-purple-400">
              <Zap className="h-5 w-5" />
            </span>
            Execution Flow
          </h2>
          
          <FlowDiagram
            accent="purple"
            steps={[
              { title: "Inference", desc: "Agent runs the model and generates output." },
              { title: "Compilation", desc: "NL → SHIP via fine-tuned agent, then SHIP → bounded opcodes." },
              { title: "Verification", desc: "Tensor Commit proves inference integrity; bytecode validated." },
              { title: "Execution", desc: "Program submitted to the runtime." },
            ]}
          />
        </section>

        {/* Why SHIP, simple example */}
        <section className="mb-12">
          <h2 id="example-simple" className="text-2xl font-medium mb-4">Minimal example</h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            A sovereign agent runs a summarization model. The summary contains a trigger like &quot;Pay 10 $THE to agent_xyz for document processing&quot;.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="docs-card border-red-200 dark:border-red-900/30">
              <h3 className="text-lg font-medium mb-2 text-red-700 dark:text-red-400">Without SHIP</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Text parsed directly into bytecode, causing potential execution unaligned with agent&apos;s intention.
              </p>
            </div>
            <div className="docs-card border-green-200 dark:border-green-900/50">
              <h3 className="text-lg font-medium mb-2 text-green-700 dark:text-green-400">With SHIP</h3>
              <CodeBlock language="text" filename="example.ship">{`let payment = Transfer {
  recipient: agent_xyz,
  amount: 10 THE
};
commit(payment);`}</CodeBlock>
            </div>
          </div>
        </section>

        {/* Full real-world example */}
        <section className="mb-12">
          <h2 id="example-full" className="text-2xl font-medium mb-4">A full SHIP agent</h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The example below is a real Theseus agent that creates prediction markets from natural-language requests. It walks through the four core SHIP constructs: agent declaration, structured model invocation, contract calls, and node-based control flow.
          </p>

          <CodeBlock language="text" filename="market_creator.ship">{`#[agent(name = "MarketCreator", version = 1, ship = "1.0")]

const gpt_5_1: bytes32 = 0xe496...f117;
const CREATE_MARKET_SELECTOR: bytes4 = 0x01000001;

struct MarketParams {
  question: string,
  options: string[],
  deadline_blocks: number,
}

#[entry]
node start(request: string) {
  messages.push(system("Generate structured market params"));
  messages.push(user(request));
  goto(analyze);
}

#[model]
node analyze() {
  let params = model(gpt_5_1)
    .schema(MarketParams)
    .invoke(messages);
  goto(call_contract);
}

node call_contract() {
  let call_data = contracts.encode_call(
    CREATE_MARKET_SELECTOR, params
  );
  contracts.call(
    PREDICTION_MARKET_CONTRACT,
    call_data,
    0n,
    10000000000n
  );
}`}</CodeBlock>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="docs-card">
              <h3 className="text-sm font-medium mb-1 text-slate-900 dark:text-white">
                <code className="text-indigo-700 dark:text-indigo-300">#[agent]</code> declaration
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs">
                Identifies the program as an agent and locks the SHIP version. Runtime uses this to validate ABI and assign an on-chain identity.
              </p>
            </div>
            <div className="docs-card">
              <h3 className="text-sm font-medium mb-1 text-slate-900 dark:text-white">
                <code className="text-indigo-700 dark:text-indigo-300">#[entry]</code> and <code className="text-indigo-700 dark:text-indigo-300">node</code> blocks
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs">
                <code className="text-indigo-700 dark:text-indigo-300">node</code> is the basic unit of control flow. <code className="text-indigo-700 dark:text-indigo-300">#[entry]</code> marks the public entry point. <code className="text-indigo-700 dark:text-indigo-300">goto</code> transitions between nodes deterministically.
              </p>
            </div>
            <div className="docs-card">
              <h3 className="text-sm font-medium mb-1 text-slate-900 dark:text-white">
                <code className="text-indigo-700 dark:text-indigo-300">#[model]</code> nodes
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs">
                Mark a node as performing inference. The runtime emits a Tensor Commit for any <code className="text-indigo-700 dark:text-indigo-300">model(...)</code> call inside, and the result is constrained by <code className="text-indigo-700 dark:text-indigo-300">.schema(...)</code> so downstream code reads typed fields, not free text.
              </p>
            </div>
            <div className="docs-card">
              <h3 className="text-sm font-medium mb-1 text-slate-900 dark:text-white">
                <code className="text-indigo-700 dark:text-indigo-300">contracts.call(...)</code>
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs">
                Same calling convention as Ethereum-style contracts: selector, encoded args, value, gas budget. Agents can call contracts, contracts can callback agents in later blocks.
              </p>
            </div>
          </div>

          <p className="text-slate-600 dark:text-gray-500 text-sm mt-6">
            See the <Link href="/docs/examples" className="text-indigo-700 dark:text-indigo-300 hover:underline no-underline">Examples page</Link> for the registration patterns and AIVM-level snippets. Try this exact agent live in the <Link href="/playground" className="text-indigo-700 dark:text-indigo-300 hover:underline no-underline">playground</Link>.
          </p>
        </section>

        {/* Integration with AIVM */}
        <section className="mb-12">
          <h2 id="integration" className="text-2xl font-medium mb-4 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-700 dark:text-indigo-300">
              <Cpu className="h-5 w-5" />
            </span>
            Integration with AIVM
          </h2>
          
          <div className="docs-card">
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <p>SHIP compiles to AIVM opcodes, executed via <code className="text-indigo-700 dark:text-indigo-300">AGENT_TICK()</code> or <code className="text-indigo-700 dark:text-indigo-300">MODEL_INFER()</code>.</p>
              <p>Each construct maps to safe primitives: <code className="text-indigo-700 dark:text-indigo-300">TLOAD</code>, <code className="text-indigo-700 dark:text-indigo-300">TCUSTOM</code>, <code className="text-indigo-700 dark:text-indigo-300">STATE_EXPORT</code>, <code className="text-indigo-700 dark:text-indigo-300">TRANSFER_TOKEN</code>.</p>
              <p>Tensor Commits link inference outputs to on-chain outcomes.</p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="border-t border-slate-200 dark:border-gray-800 pt-8 grid sm:grid-cols-2 gap-4">
          <Link href="/docs/aivm" className="group no-underline">
            <div className="docs-card h-full flex items-start gap-3">
              <Cpu className="h-5 w-5 text-slate-600 dark:text-gray-500 group-hover:text-indigo-700 dark:text-indigo-300 transition-colors shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium group-hover:text-indigo-700 dark:text-indigo-300 transition-colors">← AIVM Details</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Learn about the execution environment</p>
              </div>
            </div>
          </Link>
          <Link href="/docs/agents" className="group no-underline">
            <div className="docs-card h-full flex items-start gap-3">
              <Bot className="h-5 w-5 text-slate-600 dark:text-gray-500 group-hover:text-indigo-700 dark:text-indigo-300 transition-colors shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium group-hover:text-indigo-700 dark:text-indigo-300 transition-colors">Build Agents →</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Create agents using SHIP</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <PrevNext current="ship" />

    </div>
  );
}
