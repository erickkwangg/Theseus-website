import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Terminal, Box, Zap, Bot, Code2, Layers, GitBranch, CheckCircle } from "lucide-react";
import Callout from "@/components/docs/Callout";
import CodeBlock from "@/components/docs/CodeBlock";
import { EXTERNAL_LINKS } from "@/config/links";

export const metadata: Metadata = {
  title: "Quick Start - Theseus Docs",
  description:
    "Set up a Theseus node and deploy your first autonomous agent with this step-by-step quickstart.",
  keywords: ["Theseus quickstart", "install Theseus", "deploy AI agent", "AIVM", "SHIP"],
};

export default function QuickStartPage() {
  return (
    <div className="docs-content">
      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/35 bg-indigo-500/10 text-indigo-300 text-xs mb-4">
          <Zap className="h-3 w-3" />
          Getting Started
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">
          Quick Start Guide
        </h1>
        <p className="text-xl text-gray-400 leading-relaxed">
          Set up a Theseus node and deploy your first agent.
        </p>
      </div>
      
      <div className="prose prose-invert max-w-none">
        {/* Prerequisites */}
        <section className="mb-12">
          <h2 id="prerequisites" className="text-2xl font-medium mb-4 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-gray-800 text-gray-400">
              <Box className="h-5 w-5" />
            </span>
            Prerequisites
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              "Rust 1.70+",
              "Go 1.21+ (optional)",
              "Docker (optional)",
              "16GB+ RAM (recommended)",
            ].map((item) => (
              <span key={item} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-lg text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* Installation Steps */}
        <section className="mb-12">
          <h2 id="installation" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-300">
              <Terminal className="h-5 w-5" />
            </span>
            Installation
          </h2>
          
          <div className="space-y-6">
            <div className="docs-card">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500 text-white text-xs font-bold">1</span>
                <h3 className="text-lg font-medium">Clone the Repository</h3>
              </div>
              <CodeBlock language="bash" filename="terminal">{`git clone https://github.com/Theseuschain/theseuschain.git
cd theseuschain`}</CodeBlock>
            </div>

            <div className="docs-card">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500 text-white text-xs font-bold">2</span>
                <h3 className="text-lg font-medium">Install Tooling and Build</h3>
              </div>
              <CodeBlock language="bash" filename="terminal">{`# Install development dependencies
make install-dev

# Build the project
make build`}</CodeBlock>
            </div>

            <div className="docs-card">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500 text-white text-xs font-bold">3</span>
                <h3 className="text-lg font-medium">Run a Local Node</h3>
              </div>
              <CodeBlock language="bash" filename="terminal">{`# Start via Makefile
make node

# Equivalent cargo command
cargo run --bin theseus-node`}</CodeBlock>
              <p className="text-gray-400 text-sm mt-3">
                Your node will start syncing with the network. First sync may take time depending on network conditions.
              </p>
            </div>
          </div>
        </section>

        {/* Deploy Agent */}
        <section className="mb-12">
          <h2 id="deploy-agent" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
              <Bot className="h-5 w-5" />
            </span>
            Deploy Your First Agent
          </h2>
          
          <p className="text-gray-400 mb-6">
            Once your node is running, deploy a test agent using the Theseus CLI with a SHIP file.
          </p>

          <CodeBlock language="bash" filename="terminal">{`# Deploy from the repository example
cargo run --bin theseus-cli deploy-agent examples/basic-agent.ship`}</CodeBlock>

          <Callout type="tip" title="Agent Registration Fields">
            When deploying, you&apos;ll configure: code hash, autonomy flag (0=human, 1=sovereign), controller key, AIVM version, resource quota, and initial stake.
          </Callout>

          <Callout type="tip" title="Ecosystem Examples">
            For production-style SHIP implementations, see{" "}
            <a
              href="https://github.com/Theseuschain/proof-of-lobster"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-300 hover:underline"
            >
              proof-of-lobster
            </a>{" "}
            and{" "}
            <a
              href="https://github.com/Theseuschain/the-prediction-market"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-300 hover:underline"
            >
              the-prediction-market
            </a>
            .
          </Callout>

          <div className="overflow-x-auto mt-6">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="font-medium text-white">Code hash</td><td>Binary verification</td></tr>
                <tr><td className="font-medium text-white">Autonomy flag</td><td>0=human-owned, 1=sovereign</td></tr>
                <tr><td className="font-medium text-white">Controller key</td><td>Optional override key</td></tr>
                <tr><td className="font-medium text-white">AIVM version</td><td>Required features</td></tr>
                <tr><td className="font-medium text-white">Resource quota</td><td>Max FLOPs per epoch</td></tr>
                <tr><td className="font-medium text-white">Stake</td><td>$THE locked for security</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Register Model */}
        <section className="mb-12">
          <h2 id="register-model" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-green-500/10 text-green-400">
              <Layers className="h-5 w-5" />
            </span>
            Model Registration (API-Level)
          </h2>
          
          <p className="text-gray-400 mb-6">
            Model registration currently appears in the codebase as runtime API flows (AIVM + store),
            not as a stable, documented one-line CLI command.
          </p>

          <CodeBlock language="text" filename="flow">{`Model weights + metadata
        ↓
Store in TheseusStore
        ↓
Reference model root from agent/AIVM execution`}</CodeBlock>

          <div className="overflow-x-auto mt-6">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="font-medium text-white">Name/version</td><td>Llama 3.1 8B</td></tr>
                <tr><td className="font-medium text-white">Architecture</td><td>LLM, diffusion, etc.</td></tr>
                <tr><td className="font-medium text-white">Tensor Commit</td><td>Weight fingerprint for verification</td></tr>
                <tr><td className="font-medium text-white">Root reference</td><td>Used by agents during inference calls</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Workflow */}
        <section className="mb-12">
          <h2 id="workflow" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-yellow-500/10 text-yellow-400">
              <GitBranch className="h-5 w-5" />
            </span>
            Development Workflow
          </h2>
          
          <div className="flex flex-wrap items-center gap-3 text-sm">
            {["Write agent (SHIP/AIVM)", "Test locally", "Deploy to testnet", "Audit with Tensor Commits", "Launch on mainnet"].map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <span className="px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-300">{step}</span>
                {i < 4 && <ArrowRight className="h-4 w-4 text-gray-600" />}
              </div>
            ))}
          </div>
        </section>

        {/* Tests */}
        <section className="mb-12">
          <h2 id="tests" className="text-2xl font-medium mb-4">Running Tests</h2>
          <CodeBlock language="bash" filename="terminal">{`# Run full test suite
make test

# Component-specific targets
make test-aivm
make test-consensus
make test-store
make test-tensor
make test-ship`}</CodeBlock>
        </section>

        {/* Next Steps */}
        <section className="mb-12">
          <h2 id="next-steps" className="text-2xl font-medium mb-6">Next Steps</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { href: "/docs/agents", title: "Build Agents", desc: "Create sophisticated autonomous agents", icon: Bot },
              { href: "/docs/ship", title: "SHIP Language", desc: "Master the DSL for AI agents", icon: Code2 },
              { href: "/docs/aivm", title: "AIVM Deep Dive", desc: "Understand the VM internals", icon: Layers },
              { href: "/docs/tensor-commits", title: "Tensor Commits", desc: "Learn about verifiable ML", icon: GitBranch },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="group no-underline">
                <div className="docs-card h-full flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-300 group-hover:bg-indigo-500/20 transition-colors shrink-0">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 group-hover:text-indigo-300 transition-colors">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Help */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-400">
            Need help? Visit{" "}
            <a href={EXTERNAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:underline">
              GitHub
            </a>{" "}
            (private repository; access required){" "}
            and review{" "}
            <a
              href={`${EXTERNAL_LINKS.github}/blob/master/docs/getting-started.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-300 hover:underline"
            >
              docs/getting-started.md
            </a>{" "}
            for upstream command references,{" "}
            or read the{" "}
            <a href={EXTERNAL_LINKS.whitepaper} target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:underline">
              whitepaper
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
