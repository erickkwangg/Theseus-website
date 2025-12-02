import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Layers, Database, Shield, Cpu, GitBranch } from "lucide-react";
import Callout from "@/components/docs/Callout";
import CodeBlock from "@/components/docs/CodeBlock";

export default function ArchitecturePage() {
  return (
    <div className="docs-content">
      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs mb-4">
          <Layers className="h-3 w-3" />
          Core Concepts
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">
          System Architecture
        </h1>
        <p className="text-xl text-gray-400 leading-relaxed">
          Three-layer architecture built for AI workloads: execution, storage, and consensus working as one system.
        </p>
      </div>
        
      <div className="prose prose-invert max-w-none">
        {/* Overview */}
        <section className="mb-12">
          <h2 id="overview" className="text-2xl font-medium mb-4">Architectural Overview</h2>
          
          <div className="docs-card mb-6">
            <Image 
              src="/theseus-architecture-diagram.png" 
              alt="Theseus System Architecture" 
              width={1200}
              height={600}
              className="w-full h-auto rounded"
            />
          </div>

          <Callout type="info" title="Three Main Processes">
            <strong>AIVM</strong> executes inference and forwards valid transactions; <strong>TheseusStore</strong> handles model/context data with DA sampling; <strong>HS BFT PoS</strong> provides HotStuff-based finality. All communicate via RPC/Networking layer.
          </Callout>
        </section>

        {/* Three-Layer Stack */}
        <section className="mb-12">
          <h2 id="three-layer" className="text-2xl font-medium mb-6">Three-Layer Stack</h2>
          
          <div className="space-y-4">
            <div className="docs-card border-blue-900/50">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                  <Cpu className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Execution Layer: AIVM</h3>
                  <p className="text-gray-400 text-sm mb-3">Deterministic tensor-native runtime with Tensor Commits:</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 bg-gray-800 rounded">Tensor operations</span>
                    <span className="px-2 py-1 bg-gray-800 rounded">Agent scheduling</span>
                    <span className="px-2 py-1 bg-gray-800 rounded">Proof generation</span>
                    <span className="px-2 py-1 bg-gray-800 rounded">SHIP DSL</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="docs-card border-green-900/50">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-green-500/10 text-green-400 shrink-0">
                  <Database className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Availability Layer: TheseusStore</h3>
                  <p className="text-gray-400 text-sm mb-3">Erasure-coded storage for model weights and agent contexts:</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 bg-gray-800 rounded">Reed-Solomon encoding</span>
                    <span className="px-2 py-1 bg-gray-800 rounded">RAG contexts</span>
                    <span className="px-2 py-1 bg-gray-800 rounded">Storage miners</span>
                    <span className="px-2 py-1 bg-gray-800 rounded">Merkle roots</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="docs-card border-purple-900/50">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Consensus Layer: Proof of Stake</h3>
                  <p className="text-gray-400 text-sm mb-3">HotStuff BFT with AI-specific requirements:</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 bg-gray-800 rounded">Valid model roots</span>
                    <span className="px-2 py-1 bg-gray-800 rounded">VRF selection</span>
                    <span className="px-2 py-1 bg-gray-800 rounded">One-block finality</span>
                    <span className="px-2 py-1 bg-gray-800 rounded">Coupled layers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Block Structure */}
        <section className="mb-12">
          <h2 id="block-structure" className="text-2xl font-medium mb-4">Block Structure</h2>
          
          <CodeBlock language="text" filename="block.header">{`header {
  parent_hash, height, timestamp
  post-state Merkle root
  Terkle tree of Tensor Commits
  Merkle root of available model and context blobs
  gas limit
  VRF-selected validator signature
}
body { Transaction[] }`}</CodeBlock>

          <div className="docs-card mt-4">
            <p className="text-gray-400 text-sm mb-3">A block cannot finalize unless both conditions hold:</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">1.</span>
                <div><strong className="text-white">Inference integrity:</strong> <span className="text-gray-400">Every inference must include a valid Tensor Commit proof</span></div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">2.</span>
                <div><strong className="text-white">Agents availability:</strong> <span className="text-gray-400">Every stored condition must be provably retrievable</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* TheseusStore */}
        <section className="mb-12">
          <h2 id="theseus-store" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-green-500/10 text-green-400">
              <Database className="h-5 w-5" />
            </span>
            TheseusStore Deep Dive
          </h2>
          
          <p className="text-gray-400 mb-6">
            TheseusStore is the availability layer, handling gigabytes of model weights and agent context on-chain.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="docs-card">
              <h3 className="text-lg font-medium mb-2">Model Storage</h3>
              <p className="text-gray-400 text-sm">
                Immutable weights (Reed-Solomon encoded) addressed by content hash. Cold storage optimized, enforced by miner staking.
              </p>
            </div>
            <div className="docs-card">
              <h3 className="text-lg font-medium mb-2">Context Storage</h3>
              <p className="text-gray-400 text-sm">
                Mutable agent data (conversations, embeddings, RAG). Reed-Solomon encoded with faster retrieval.
              </p>
            </div>
          </div>

          <div className="docs-card">
            <h3 className="text-lg font-medium mb-3">Agent State Synchronization</h3>
            <p className="text-gray-400 text-sm mb-3">Dual-ledger pattern:</p>
            <div className="space-y-2 text-sm">
              <div><strong className="text-white">On-Chain:</strong> <span className="text-gray-400">Balances, model versions, config in agent state root</span></div>
              <div><strong className="text-white">Off-Chain:</strong> <span className="text-gray-400">Large context (PDFs, embeddings) in TheseusStore with memory anchors</span></div>
              <div><strong className="text-white">Sync:</strong> <span className="text-gray-400">libp2p diff-sync with last-write-wins + optional semantic merge</span></div>
            </div>
          </div>
        </section>

        {/* Prover/Verifier Selection */}
        <section className="mb-12">
          <h2 id="selection" className="text-2xl font-medium mb-6">Prover and Verifier Selection</h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="docs-card">
              <h3 className="text-lg font-medium mb-2">Provers</h3>
              <p className="text-gray-400 text-sm mb-3">
                Run full forward passes. VRF selects by capacity + stake.
              </p>
              <div className="text-xs text-gray-500">
                Publish hardware specs → Registry tracks → VRF filters (RAM ≥ model) → Cache popular models
              </div>
            </div>
            <div className="docs-card">
              <h3 className="text-lg font-medium mb-2">Verifiers</h3>
              <p className="text-gray-400 text-sm mb-3">
                All active verifiers check every inference.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                <span>Never download weights</span>
                <span>~2ms per check</span>
                <span>1K validators → 100 jobs &lt;1s</span>
                <span>2/3 agreement for finality</span>
              </div>
            </div>
          </div>

          <div className="docs-card">
            <h3 className="text-lg font-medium mb-2">Liveness Mathematics</h3>
            <div className="bg-gray-900 border border-gray-800 rounded p-3 font-mono text-sm text-gray-300 mb-3">
              Pr(Liveness) = 1 - (1 - h)ⁿ
            </div>
            <p className="text-gray-400 text-sm">
              With h = 0.33, n = 10 → ≥98% chance at least one honest prover chosen.
            </p>
          </div>
        </section>

        {/* Transaction Lifecycle */}
        <section className="mb-12">
          <h2 id="lifecycle" className="text-2xl font-medium mb-6">Transaction Lifecycle</h2>
          
          <div className="space-y-3">
            {[
              { step: "1", title: "Model Deployment", desc: "Developer uploads weights (with Tensor Commit) to TheseusStore" },
              { step: "2", title: "Inference Transaction", desc: "User submits {modelRoot, input, maxGas} to AIVM" },
              { step: "3", title: "Block Proposal", desc: "Validator packages model and inference TXs with TheseusStore root" },
              { step: "4", title: "Execution & Proofing", desc: "AIVM runs the model and emits a Tensor Commit receipt" },
              { step: "5", title: "Finality", desc: "PoS finalizes; TheseusStore miners pin any new context/model shards" },
            ].map((item) => (
              <div key={item.step} className="docs-card">
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold shrink-0">
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

        {/* Navigation */}
        <div className="border-t border-gray-800 pt-8 grid sm:grid-cols-2 gap-4">
          <Link href="/docs/aivm" className="group no-underline">
            <div className="docs-card h-full flex items-start gap-3">
              <Cpu className="h-5 w-5 text-gray-500 group-hover:text-blue-400 transition-colors shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium group-hover:text-blue-400 transition-colors">AIVM Details →</h3>
                <p className="text-sm text-gray-400 mt-1">Deep dive into execution layer</p>
              </div>
            </div>
          </Link>
          <Link href="/docs/tensor-commits" className="group no-underline">
            <div className="docs-card h-full flex items-start gap-3">
              <GitBranch className="h-5 w-5 text-gray-500 group-hover:text-blue-400 transition-colors shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium group-hover:text-blue-400 transition-colors">Tensor Commits →</h3>
                <p className="text-sm text-gray-400 mt-1">Learn about proof mechanisms</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
