import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { Layers, Database, Shield, Cpu, GitBranch } from "lucide-react";
import Callout from "@/components/docs/Callout";
import CodeBlock from "@/components/docs/CodeBlock";
import { DocsPageJsonLd } from "@/components/JsonLd";
import PrevNext from "@/components/docs/PrevNext";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "Explore the Theseus architecture: AIVM execution, TheseusStore data availability, and PoS consensus.",
  keywords: ["Theseus architecture", "AIVM", "TheseusStore", "PoS", "verifiable inference"],
  alternates: { canonical: "/docs/architecture" },
};

export default function ArchitecturePage() {
  return (
    <div className="docs-content">
      <DocsPageJsonLd title="Architecture" description="Explore the Theseus architecture: AIVM execution, TheseusStore data availability, and PoS consensus." slug="architecture" />
      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/35 bg-indigo-500/10 text-indigo-300 text-xs mb-4">
          <Layers className="h-3 w-3" />
          Core Concepts
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-normal mb-4 tracking-[-0.02em] [text-wrap:balance]">
          System Architecture
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          Three-layer architecture built for AI workloads: execution, storage, and consensus working as one system.
        </p>
      </div>
        
      <div className="prose prose-invert max-w-none">
        <Callout type="tip" title="In one paragraph">
          Theseus is a Substrate chain that turns every model inference and agent
          call into a single verifiable state transition. Off-chain provers run
          the AI workload and submit results with KZG proofs; on-chain pallets
          verify the proof in constant time and route the verified result back
          into agent execution. The chain coordinates; the GPUs prove; the
          consensus layer only trusts what it can verify.
        </Callout>
        <ul className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-1.5 mb-10 ml-5 list-disc">
          <li><strong>Chain</strong>: Substrate runtime with Theseus-specific pallets (aivm, models, agents, tools, store, ship) plus standard FRAME pallets for balances and BFT consensus.</li>
          <li><strong>Prover network</strong>: full prover with TensorCommitment proofs, plus lite provers for hosted-API breadth at alpha.</li>
          <li><strong>Blessed enclave</strong>: TEE that holds the chain&rsquo;s key, executes off-chain tools (web search, authenticated HTTP), decrypts agent credentials.</li>
          <li><strong>Layer0 bridge</strong>: any token bridges in; seus (gas) is bought only with frxUSD.</li>
        </ul>

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

          <Callout type="info" title="Three main processes">
            <strong>AIVM</strong> executes inference and forwards valid transactions; <strong>TheseusStore</strong> anchors model and agent-context data via content-addressed roots and verifies retrievals against them; <strong>BFT consensus</strong> provides deterministic finality. All communicate via RPC/networking layer.
          </Callout>
        </section>

        {/* Three-Layer Stack */}
        <section className="mb-12">
          <h2 id="three-layer" className="text-2xl font-medium mb-6">Three-Layer Stack</h2>
          
          <div className="space-y-4">
            <div className="docs-card border-indigo-900/50">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-300 shrink-0">
                  <Cpu className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Execution Layer: AIVM</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">Deterministic tensor-native runtime with Tensor Commits:</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 bg-gray-800 rounded">Tensor operations</span>
                    <span className="px-2 py-1 bg-gray-800 rounded">Agent scheduling</span>
                    <span className="px-2 py-1 bg-gray-800 rounded">Proof generation</span>
                    <span className="px-2 py-1 bg-gray-800 rounded">SHIP spec</span>
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
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">Off-chain DA layer for model weights and agent contexts. Integrity comes from on-chain anchors, not the storage layer:</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 bg-gray-800 rounded">weights_root</span>
                    <span className="px-2 py-1 bg-gray-800 rounded">context_root</span>
                    <span className="px-2 py-1 bg-gray-800 rounded">Merkle / Verkle proofs</span>
                    <span className="px-2 py-1 bg-gray-800 rounded">OCW sampling</span>
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
                  <h3 className="text-lg font-medium mb-2">Consensus Layer: BFT proof-of-stake</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">Deterministic finality once 2/3 of validators agree. AI-specific gating folded in:</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 bg-gray-800 rounded">Valid model roots</span>
                    <span className="px-2 py-1 bg-gray-800 rounded">VRF prover selection</span>
                    <span className="px-2 py-1 bg-gray-800 rounded">Native KZG host fn</span>
                    <span className="px-2 py-1 bg-gray-800 rounded">Forkless upgrades</span>
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
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">A block cannot finalize unless both conditions hold:</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-indigo-300 font-bold">1.</span>
                <div><strong className="text-slate-900 dark:text-white">Inference integrity:</strong> <span className="text-gray-600 dark:text-gray-400">Every inference must include a valid Tensor Commit proof</span></div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-300 font-bold">2.</span>
                <div><strong className="text-slate-900 dark:text-white">Agents availability:</strong> <span className="text-gray-600 dark:text-gray-400">Every stored condition must be provably retrievable</span></div>
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
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            TheseusStore is the availability layer, handling gigabytes of model weights and agent context on-chain.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="docs-card">
              <h3 className="text-lg font-medium mb-2">Model storage</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Immutable weights addressed by their on-chain <code>weights_root</code>. Provers fetch by root and verify integrity (Merkle / Verkle proofs) before running inference.
              </p>
            </div>
            <div className="docs-card">
              <h3 className="text-lg font-medium mb-2">Context storage</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Agent execution context and the AKG live behind a per-agent <code>context_root</code>. Updated by <code>pallet_agents</code> as agents execute; readers verify retrievals against the anchor.
              </p>
            </div>
          </div>

          <div className="docs-card">
            <h3 className="text-lg font-medium mb-3">Correctness vs availability</h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                Consensus nodes never trust raw bytes from TheseusStore. They fetch by content-addressed root and verify against the on-chain anchor. As long as one honest full node can obtain the data and verify it against the root, the state transition stays correct.
              </p>
              <p>
                The DA layer&rsquo;s economics ensure <em>availability</em>, not <em>integrity</em>. Integrity is cryptographic. See{" "}
                <Link href="/docs/data-availability" className="text-indigo-300 underline">
                  Data Availability
                </Link>{" "}
                for the full breakdown.
              </p>
            </div>
          </div>
        </section>

        {/* Prover/Verifier Selection */}
        <section className="mb-12">
          <h2 id="selection" className="text-2xl font-medium mb-6">Prover and Verifier Selection</h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="docs-card">
              <h3 className="text-lg font-medium mb-2">Provers</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                Run full forward passes. VRF selects by capacity + stake.
              </p>
              <div className="text-xs text-gray-500">
                Publish hardware specs → Registry tracks → VRF filters (RAM ≥ model) → Cache popular models
              </div>
            </div>
            <div className="docs-card">
              <h3 className="text-lg font-medium mb-2">Verifiers</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
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

        </section>

        {/* Security Model */}
        <section className="mb-12">
          <h2 id="security" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-red-500/10 text-red-400">
              <Shield className="h-5 w-5" />
            </span>
            Security Model
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Theseus assumes a partially synchronous network with up to 1/3 byzantine validator stake. Within those bounds, three properties are protected by economic and cryptographic mechanisms working together.
          </p>

          <div className="space-y-4 mb-6">
            <div className="docs-card">
              <h3 className="text-lg font-medium mb-2">Inference integrity</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                A dishonest prover producing a wrong inference result is caught by Tensor Commit verification: every active verifier rechecks every proof in roughly 2 ms. A faulty proof fails KZG pairing checks deterministically.
              </p>
              <p className="text-gray-500 text-xs">
                Slash condition: invalid Tensor Commit. Stake is burned, and the inference is rejected before the block can finalize.
              </p>
            </div>

            <div className="docs-card">
              <h3 className="text-lg font-medium mb-2">Liveness</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                A request must reach an honest prover that can run the model. The protocol picks <code className="text-indigo-300">n</code> candidates per request via VRF, weighted by stake and hardware capacity. The probability that at least one is honest is:
              </p>
              <div className="bg-slate-100 dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded p-3 font-mono text-sm text-gray-700 dark:text-gray-300 mb-3">
                Pr(liveness) = 1 - (1 - h)ⁿ
              </div>
              <p className="text-gray-500 text-xs">
                Where <code className="text-indigo-300">h</code> is the honest fraction. With h = 0.67 and n = 10, liveness is &gt;99.99% per request. With h = 0.33 worst-case and n = 10, &gt;98%.
              </p>
            </div>

            <div className="docs-card">
              <h3 className="text-lg font-medium mb-2">Data availability</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                Model weights and agent context must be retrievable for provers to run, for verifiers to check proofs, and for agents to make progress. The on-chain anchor (<code>weights_root</code> / <code>context_root</code>) guarantees integrity; the DA layer&rsquo;s economics guarantee availability.
              </p>
              <p className="text-gray-500 text-xs">
                Substrate Off-chain Workers periodically sample data referenced by anchored roots, with unsigned transactions recording evidence of unavailability and triggering slashing. See{" "}
                <Link href="/docs/data-availability" className="text-indigo-300 underline">
                  Data Availability
                </Link>
                .
              </p>
            </div>
          </div>

          <Callout type="warning" title="Out of scope">
            Network-level censorship by a majority validator coalition, supply-chain attacks on model weight files before commitment, and attacks on the VRF beacon are out of scope of the consensus security model and are addressed by separate protocol layers and operational discipline.
          </Callout>
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
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500 text-white text-xs font-bold shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-medium text-sm">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <div className="border-t border-slate-200 dark:border-gray-800 pt-8 grid sm:grid-cols-2 gap-4">
          <Link href="/docs/aivm" className="group no-underline">
            <div className="docs-card h-full flex items-start gap-3">
              <Cpu className="h-5 w-5 text-gray-500 group-hover:text-indigo-300 transition-colors shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium group-hover:text-indigo-300 transition-colors">AIVM Details →</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Deep dive into execution layer</p>
              </div>
            </div>
          </Link>
          <Link href="/docs/tensor-commits" className="group no-underline">
            <div className="docs-card h-full flex items-start gap-3">
              <GitBranch className="h-5 w-5 text-gray-500 group-hover:text-indigo-300 transition-colors shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium group-hover:text-indigo-300 transition-colors">Tensor Commits →</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Learn about proof mechanisms</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <PrevNext current="architecture" />

    </div>
  );
}
