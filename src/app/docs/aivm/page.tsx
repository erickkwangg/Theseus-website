import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Cpu, Zap, Gauge, Clock, Layers } from "lucide-react";
import Callout from "@/components/docs/Callout";
import CodeBlock from "@/components/docs/CodeBlock";

export const metadata: Metadata = {
  title: "AIVM - Theseus Docs",
  description:
    "Learn how the AI Virtual Machine executes tensor-native workloads with deterministic verification and proof generation.",
  keywords: ["AIVM", "Theseus VM", "tensor opcodes", "verifiable inference", "AI runtime"],
};

export default function AIVMPage() {
  return (
    <div className="docs-content">
      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/35 bg-indigo-500/10 text-indigo-300 text-xs mb-4">
          <Cpu className="h-3 w-3" />
          Core Concepts
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">
          AI Virtual Machine (AIVM)
        </h1>
        <p className="text-xl text-gray-400 leading-relaxed">
          The execution backbone of Theseus with tensor-native opcodes, deterministic execution, and cryptographic proof generation.
        </p>
      </div>
      
      <div className="prose prose-invert max-w-none">
        {/* Architecture */}
        <section className="mb-12">
          <h2 id="architecture" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
              <Layers className="h-5 w-5" />
            </span>
            Architecture
          </h2>
          
          <div className="overflow-x-auto">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Layer</th>
                  <th>Function</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="font-medium text-white">Execution</td><td>Stack-based dispatch, fixed-point arithmetic for deterministic tensor ops</td></tr>
                <tr><td className="font-medium text-white">Memory</td><td>Sandboxed storage for contexts, embeddings, temp tensors</td></tr>
                <tr><td className="font-medium text-white">Proof Interface</td><td>Generates Tensor Commit receipts for validators (~ms verification)</td></tr>
                <tr><td className="font-medium text-white">Syscall Gateway</td><td>Verified, metered boundary crossing for external calls</td></tr>
                <tr><td className="font-medium text-white">State Anchoring</td><td>Merkle root per block for light clients and cross-chain verification</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-12">
          <h2 id="features" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-green-500/10 text-green-400">
              <Zap className="h-5 w-5" />
            </span>
            Key Features
          </h2>
          
          <div className="space-y-6">
            <div className="docs-card">
              <h3 className="text-lg font-medium mb-3">Tensor-Native Opcodes</h3>
              <p className="text-gray-400 text-sm mb-4">
                Unlike traditional VMs, AIVM includes specialized operations for AI inference:
              </p>
              <CodeBlock language="text" filename="opcodes">{`TMATMUL    - Matrix multiplication for tensors
TEWOP      - Element-wise operations (ReLU, GELU, etc.)
TCUSTOM    - Call registered custom kernels
TLOAD/TSTORE - Tensor memory operations
TCOMMIT    - Generate Tensor-Commit proof
TSTREAM    - Streaming inference operations`}</CodeBlock>
            </div>

            <div className="docs-card">
              <h3 className="text-lg font-medium mb-3">Deterministic Execution</h3>
              <p className="text-gray-400 text-sm">
                All randomness comes from a VRF (Verifiable Random Function), and all validations require full consensus. Any full node can reproduce receipts bit-for-bit. Tensor Commitments have deterministic validations.
              </p>
            </div>

            <div className="docs-card">
              <h3 className="text-lg font-medium mb-3">Gas Model</h3>
              <p className="text-gray-400 text-sm mb-4">
                Every tensor operation carries a linear gas price based on FLOPs:
              </p>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 font-mono text-sm">
                <div className="text-gray-300">Gas = γ × FLOPs(op)</div>
                <div className="text-gray-300 mt-1">MODEL_FEE = Σ Gas_op + Proof Overhead</div>
              </div>
              <p className="text-gray-400 text-sm mt-3">
                A congestion multiplier keeps prices elastic depending on load.
              </p>
            </div>
          </div>
        </section>

        {/* Performance */}
        <section className="mb-12">
          <h2 id="performance" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-yellow-500/10 text-yellow-400">
              <Gauge className="h-5 w-5" />
            </span>
            Performance Metrics
          </h2>
          
          <div className="overflow-x-auto mb-4">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Tokens/sec (A100)</th>
                  <th>Est. Gas/Token</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="font-medium text-white">GPT-2</td><td>180-200</td><td>50K</td></tr>
                <tr><td className="font-medium text-white">LLaMA-7B</td><td>90-100</td><td>150K</td></tr>
                <tr><td className="font-medium text-white">LLaMA-13B</td><td>50-60</td><td>400K</td></tr>
                <tr><td className="font-medium text-white">GPT-3.5</td><td>15-25</td><td>800K-1M</td></tr>
                <tr><td className="font-medium text-white">LLaMA-65B</td><td>5-10</td><td>≥900K</td></tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-500 text-sm">
            GPT-3 (175B) forward pass on 1024 tokens takes ~40-60ms on A100, generating ~1.2M FLOPs/token.
          </p>
        </section>

        {/* Agent Scheduling */}
        <section className="mb-12">
          <h2 id="scheduling" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-300">
              <Clock className="h-5 w-5" />
            </span>
            Agent Scheduling
          </h2>
          
          <p className="text-gray-400 mb-6">
            Theseus schedules thousands of simultaneous model calls with fair queuing and stable gas behavior.
          </p>

          <div className="bg-gradient-to-r from-indigo-950/30 to-transparent border-l-2 border-indigo-400 pl-6 py-4 mb-6">
            <p className="text-gray-300 text-sm">
              Priority score (stake + latency + fairness) → Epoch-bound queues prevent starvation → On-chain scheduler respects latency classes
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { name: "RT", latency: "≤1 epoch" },
              { name: "Interactive", latency: "≤3 epochs" },
              { name: "Bulk", latency: "best-effort" },
            ].map((item) => (
              <div key={item.name} className="docs-card text-center">
                <div className="text-white font-medium text-sm">{item.name}</div>
                <div className="text-gray-500 text-xs mt-1">{item.latency}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Model Pipelining */}
        <section className="mb-12">
          <h2 id="pipelining" className="text-2xl font-medium mb-4">Model Pipelining</h2>
          <p className="text-gray-400 mb-4">
            AIVM allows tensor operations to feed outputs into the next in a single chaining operation:
          </p>
          <CodeBlock language="text" filename="pipeline">{`TLOAD(encoder) -> TMATMUL -> TCUSTOM -> TLOAD(decoder) -> TMATMUL -> TCOMMIT`}</CodeBlock>
          <p className="text-gray-400 text-sm mt-3">
            Supports multi-model workflows (encoder-decoder, RAG, MoE) efficiently.
          </p>
        </section>

        {/* EVM Comparison */}
        <section className="mb-12">
          <h2 id="vs-evm" className="text-2xl font-medium mb-4">Comparison to EVM</h2>
          
          <Callout type="warning">
            The EVM isn&apos;t built for on-chain AI. It offers no tensor-aware opcodes and no native inference proofs, so hardware-specific rounding quirks can slip through unchecked.
          </Callout>
          
          <div className="overflow-x-auto mt-6">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th className="text-gray-400">EVM</th>
                  <th className="text-indigo-300">AIVM</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="font-medium text-white">Tensor operations</td><td>No native support</td><td>Built-in opcodes</td></tr>
                <tr><td className="font-medium text-white">Inference proofs</td><td>Not supported</td><td>Tensor Commits</td></tr>
                <tr><td className="font-medium text-white">Agent autonomy</td><td>Requires human keys</td><td>Native sovereignty</td></tr>
                <tr><td className="font-medium text-white">Gas model</td><td>Generic opcodes</td><td>FLOPs-based for AI</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Navigation */}
        <div className="border-t border-gray-800 pt-8 grid sm:grid-cols-2 gap-4">
          <Link href="/docs/tensor-commits" className="group no-underline">
            <div className="docs-card h-full">
              <p className="text-sm text-gray-500 mb-1">Next</p>
              <h3 className="font-medium group-hover:text-indigo-300 transition-colors">Tensor Commits →</h3>
              <p className="text-sm text-gray-400 mt-1">Proof generation and verification</p>
            </div>
          </Link>
          <Link href="/docs/ship" className="group no-underline">
            <div className="docs-card h-full">
              <p className="text-sm text-gray-500 mb-1">Related</p>
              <h3 className="font-medium group-hover:text-indigo-300 transition-colors">SHIP Language →</h3>
              <p className="text-sm text-gray-400 mt-1">Write verifiable agent code</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
