"use client";

import Link from "next/link";
import { Puzzle, Github, ArrowRight, Bot, Zap } from "lucide-react";
import CodeBlock from "@/components/docs/CodeBlock";
import Callout from "@/components/docs/Callout";

export default function ExamplesPage() {
  return (
    <div className="docs-content">
      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-xs mb-4">
          <Puzzle className="h-3 w-3" />
          Development
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">
          Code Examples
        </h1>
        <p className="text-xl text-gray-400 leading-relaxed">
          Explore example implementations and patterns for building on Theseus.
        </p>
      </div>
        
      <div className="prose prose-invert max-w-none">
        {/* GitHub CTA */}
        <Callout type="info" title="Full Examples Available">
          Complete examples with documentation are available on GitHub.
          <a 
            href="https://github.com/ob-theseus/theseuschain/tree/main/examples" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg transition-all text-sm font-medium no-underline"
          >
            <Github className="h-4 w-4" />
            View Examples on GitHub
          </a>
        </Callout>

        {/* Example Repository */}
        <section className="mb-12">
          <h2 id="repository" className="text-2xl font-medium mb-4">Example Repository</h2>

          <div className="overflow-x-auto">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Example</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="font-mono text-blue-400">basic-agent.ship</td><td>Simple autonomous agent template</td></tr>
                <tr><td className="font-mono text-blue-400">model-deploy/</td><td>Deploying and registering ML models</td></tr>
                <tr><td className="font-mono text-blue-400">agent-interact/</td><td>Inter-agent communication patterns</td></tr>
                <tr><td className="font-mono text-blue-400">token-transfer/</td><td>Autonomous $THE transactions</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Agent Registration Patterns */}
        <section className="mb-12">
          <h2 id="patterns" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
              <Bot className="h-5 w-5" />
            </span>
            Agent Registration Patterns
          </h2>
          
          <div className="space-y-6">
            <div className="docs-card">
              <h3 className="text-lg font-medium mb-2">Proto-AI Person (Human-Owned)</h3>
              <p className="text-gray-400 text-sm mb-4">
                Agent with controller key—operates independently but can be overridden:
              </p>
              <CodeBlock language="text" filename="proto-ai.ship">{`autonomy_flag = 0  // human-gated
controller_key = 0x1234...  // owner's public key
resource_quota = 1000000  // max FLOPs per epoch`}</CodeBlock>
            </div>

            <div className="docs-card">
              <h3 className="text-lg font-medium mb-2">Free AI Person (Sovereign)</h3>
              <p className="text-gray-400 text-sm mb-4">
                Fully autonomous agent with no human control:
              </p>
              <CodeBlock language="text" filename="sovereign.ship">{`autonomy_flag = 1  // fully sovereign
controller_key = None  // no human override
stake = 10000 THE  // locked for slashing`}</CodeBlock>
            </div>

            <div className="docs-card">
              <h3 className="text-lg font-medium mb-2">Civic Agents (Public Service)</h3>
              <p className="text-gray-400 text-sm mb-4">
                Transparent agent that serves public interests:
              </p>
              <CodeBlock language="text" filename="lighthouse.ship">{`autonomy_flag = 1  // sovereign
permissions = { public_access: true }
revenue_destination = dao_address  // serves humans`}</CodeBlock>
            </div>
          </div>
        </section>

        {/* Model Inference */}
        <section className="mb-12">
          <h2 id="inference" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-green-500/10 text-green-400">
              <Zap className="h-5 w-5" />
            </span>
            Model Inference
          </h2>
          
          <div className="space-y-6">
            <div className="docs-card">
              <h3 className="text-lg font-medium mb-2">Simple Inference Call</h3>
              <CodeBlock language="text" filename="inference.aivm">{`MODEL_INFER(model_addr, tensor_input, fee_limit)`}</CodeBlock>
            </div>

            <div className="docs-card">
              <h3 className="text-lg font-medium mb-2">Model Pipelining (MoE/RAG)</h3>
              <p className="text-gray-400 text-sm mb-4">
                Chain multiple models in a single transaction:
              </p>
              <CodeBlock language="text" filename="pipeline.aivm">{`TLOAD(encoder) -> TMATMUL -> TCUSTOM ->
TLOAD(decoder) -> TMATMUL -> TCOMMIT`}</CodeBlock>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 id="quickstart" className="text-2xl font-medium mb-4">Quick Start</h2>
          
          <p className="text-gray-400 mb-4">Clone and explore:</p>
          <CodeBlock language="bash" filename="terminal">{`git clone https://github.com/ob-theseus/theseuschain.git
cd theseuschain/examples
cargo run --bin theseus-cli deploy-agent basic-agent.ship`}</CodeBlock>
        </section>

        {/* Navigation */}
        <div className="border-t border-gray-800 pt-8 grid sm:grid-cols-2 gap-4">
          <Link href="/docs/quickstart" className="group no-underline">
            <div className="docs-card h-full">
              <p className="text-sm text-gray-500 mb-1">Previous</p>
              <h3 className="font-medium group-hover:text-blue-400 transition-colors">← Quick Start</h3>
            </div>
          </Link>
          <Link href="/docs/agents" className="group no-underline">
            <div className="docs-card h-full text-right">
              <p className="text-sm text-gray-500 mb-1">Next</p>
              <h3 className="font-medium group-hover:text-blue-400 transition-colors">Agents &amp; Models →</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
