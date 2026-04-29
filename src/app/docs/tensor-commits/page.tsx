import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { GitBranch, Shield, Zap, CheckCircle } from "lucide-react";
import Callout from "@/components/docs/Callout";
import FlowDiagram from "@/components/docs/FlowDiagram";
import BarChart from "@/components/docs/BarChart";
import PageHero from "@/components/docs/PageHero";
import { TensorCommitsIllustration } from "@/components/docs/HeroIllustrations";
import { DocsPageJsonLd } from "@/components/JsonLd";
import PrevNext from "@/components/docs/PrevNext";
import { EXTERNAL_LINKS } from "@/config/links";

export const metadata: Metadata = {
  title: "Tensor Commits",
  description:
    "Understand Tensor Commits: succinct cryptographic proofs for verifiable model inference on Theseus.",
  keywords: ["Tensor Commits", "proofs", "verifiable AI", "KZG", "Terkle tree"],
};

export default function TensorCommitsPage() {
  return (
    <div className="docs-content">
      <DocsPageJsonLd title="Tensor Commits" description="Understand Tensor Commits: succinct cryptographic proofs for verifiable model inference on Theseus." slug="tensor-commits" />
      <PageHero
        eyebrow="Core Concepts"
        eyebrowIcon={GitBranch}
        title="Tensor Commits"
        subtitle="Succinct cryptographic proofs that an inference ran honestly. Generated in under 1% overhead, checked in milliseconds, scale to frontier-size models."
        accent="purple"
        illustration={<TensorCommitsIllustration />}
        stats={[
          { value: "<1%", label: "Prover overhead" },
          { value: "~2ms", label: "Verifier check" },
          { value: "70B+", label: "Models" },
        ]}
      />
        
      <div className="prose prose-invert max-w-none">
        {/* Overview */}
        <section className="mb-12">
          <h2 id="overview" className="text-2xl font-medium mb-4">Overview</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Tensor-commit protocols enable verifiable ML by proving a model was executed correctly. Traditional verification via recomputation is prohibitively expensive for large models.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Theseus&apos; Tensor Commits provide batch verification and reduce opening costs through a novel application of KZG commitment schemes extended to multi-dimensional tensor structures.
          </p>
          <Callout type="info" title="Read the paper">
            Full construction, security proofs, and benchmarks are in the{" "}
            <a
              href={EXTERNAL_LINKS.arxivPaper}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium"
            >
              Tensor Commits paper on arXiv
            </a>
            .
          </Callout>
        </section>

        {/* How it Works */}
        <section className="mb-12">
          <h2 id="how-it-works" className="text-2xl font-medium mb-4">How Tensor Commits Work</h2>
          
          <div className="docs-card mb-6">
            <Image 
              src="/tensor-commits-diagram.png" 
              alt="Tensor Commits Verification Process" 
              width={1200}
              height={600}
              className="w-full h-auto rounded"
            />
          </div>

          <Callout type="info" title="Figure Explanation">
            A sovereign agent&apos;s token stream is fed auto-regressively into an LM Transformer whose every weight tensor and intermediate activation is bound by a single tensor commitment. All per-block commitments live in a Terkle &quot;tensor-commit&quot; tree, so a small set of Merkle-path openings plus KZG pairings suffices to verify every attention score, residual update, non-linearity, and final logit computation.
          </Callout>
        </section>

        {/* Key Achievements */}
        <section className="mb-12">
          <h2 id="achievements" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-green-500/10 text-green-700 dark:text-green-400">
              <CheckCircle className="h-5 w-5" />
            </span>
            Key Achievements
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="docs-card">
              <h3 className="text-lg font-medium mb-2">&lt;1% Proof Generation</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Minimal impact on inference performance. Practical for production workloads.</p>
            </div>
            <div className="docs-card">
              <h3 className="text-lg font-medium mb-2">&lt;0.1% Verification Time</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Verifiers check proofs in milliseconds. Thousands can audit simultaneously.</p>
            </div>
          </div>

          <div className="docs-card">
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-700 dark:text-yellow-400" />
              Efficient & Scalable
            </h3>
            <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-300" />
                O(log n) verification complexity
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-300" />
                Proof size &lt;1MB for frontier models
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-300" />
                1000+ simultaneous verifiers
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-300" />
                Sublinear scaling with model size
              </div>
            </div>
          </div>
        </section>

        {/* Terkle Trees */}
        <section className="mb-12">
          <h2 id="terkle-trees" className="text-2xl font-medium mb-4 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-700 dark:text-purple-400">
              <GitBranch className="h-5 w-5" />
            </span>
            Terkle Trees
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            A Terkle tree (tensor Merkle tree) has leaves that are sub-tensors and internal nodes that carry tensor commitments instead of hash values.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="docs-card">
              <h3 className="text-lg font-medium mb-3">Structure</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Each dimension j has mⱼ blocks</li>
                <li>• Each leaf cℓ is a commitment of sub-tensor Tℓ</li>
                <li>• Parents commit to children tensor concatenation</li>
                <li>• Root cᵣₒₒₜ is the global model fingerprint</li>
              </ul>
            </div>
            <div className="docs-card">
              <h3 className="text-lg font-medium mb-3">Benefits</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• <strong className="text-slate-900 dark:text-white">Batch verification:</strong> Multiple ops in one proof</li>
                <li>• <strong className="text-slate-900 dark:text-white">Selective opening:</strong> Without revealing full model</li>
                <li>• <strong className="text-slate-900 dark:text-white">Efficient proofs:</strong> Logarithmic proof size</li>
                <li>• <strong className="text-slate-900 dark:text-white">Hierarchical:</strong> Natural fit for NN layers</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Verification Process */}
        <section className="mb-12">
          <h2 id="verification" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-700 dark:text-indigo-300">
              <Shield className="h-5 w-5" />
            </span>
            Verification Process
          </h2>
          
          <FlowDiagram
            accent="indigo"
            steps={[
              { title: "Register", desc: "Prover uploads weights with a Tensor Commit; commitment is the canonical on-chain fingerprint." },
              { title: "Execute", desc: "Prover runs the forward pass and emits proof: opening, embeddings, layer outputs, Merkle path." },
              { title: "Verify", desc: "Every verifier rechecks in ~2ms. 2/3 BFT agreement is required before finalization." },
            ]}
          />
        </section>

        {/* Performance */}
        <section className="mb-12">
          <h2 id="performance" className="text-2xl font-medium mb-4">Performance Comparison</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Per-op cost on Theseus, with proof generation and verification overhead included.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Operation</th>
                  <th>Latency</th>
                  <th>Proof Size</th>
                  <th>Gas Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="font-medium text-slate-900 dark:text-white">TMATMUL 512x512</td><td>4.1 ms</td><td>230 KB</td><td>18K</td></tr>
                <tr><td className="font-medium text-slate-900 dark:text-white">TSTREAM 4x512</td><td>8.6 ms</td><td>400 KB</td><td>27K</td></tr>
                <tr><td className="font-medium text-slate-900 dark:text-white">TCOMMIT 70B</td><td>22 ms</td><td>470 KB</td><td>120K</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-600 dark:text-gray-500 text-sm mb-8">* Gas costs based on base-load multiplier m = 1.0</p>

          <h3 id="vs-alternatives" className="text-xl font-medium mb-3">Versus alternatives</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            How Tensor Commits compare to the two main approaches for verifying neural network inference. The chart below shows prover overhead — the cost a prover pays to produce a proof, on top of the raw inference itself.
          </p>

          <div className="docs-card mb-6">
            <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-1">Prover overhead vs raw inference</h4>
            <p className="text-xs text-slate-500 dark:text-slate-500 mb-4">Lower is better. Log scale — values span four orders of magnitude.</p>
            <BarChart
              log
              rows={[
                { label: "Tensor Commits", value: 1, display: "<1%", variant: "highlight", sublabel: "Theseus" },
                { label: "zkML (zk-SNARK)", value: 1000, display: "1,000–100,000×", variant: "muted", sublabel: "EZKL, Modulus, etc." },
                { label: "Full re-execution", value: 0, display: "0% (but every node pays)", variant: "muted", sublabel: "Ethereum-style" },
              ]}
            />
          </div>

          <div className="docs-card">
            <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-4">Other dimensions, side by side</h4>
            <div className="overflow-x-auto">
              <table className="docs-table">
                <thead>
                  <tr>
                    <th>Aspect</th>
                    <th className="text-gray-600 dark:text-gray-400">Re-execution</th>
                    <th className="text-gray-600 dark:text-gray-400">zkML</th>
                    <th className="text-indigo-700 dark:text-indigo-300">Tensor Commits</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-medium text-slate-900 dark:text-white">Verifier work / inference</td>
                    <td>Same as prover</td>
                    <td>~ms (constant)</td>
                    <td className="text-indigo-700 dark:text-indigo-300">~2 ms</td>
                  </tr>
                  <tr>
                    <td className="font-medium text-slate-900 dark:text-white">Practical model size</td>
                    <td>Smallest validator</td>
                    <td>Small (mostly)</td>
                    <td className="text-indigo-700 dark:text-indigo-300">Frontier (70B+)</td>
                  </tr>
                  <tr>
                    <td className="font-medium text-slate-900 dark:text-white">Hides model weights</td>
                    <td>No</td>
                    <td>Yes</td>
                    <td className="text-indigo-700 dark:text-indigo-300">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-slate-600 dark:text-gray-500 text-sm mt-3">
            Re-execution is what Ethereum uses for smart contracts — and the reason on-chain inference at frontier sizes is impractical there. zkML produces succinct proofs but the prover-side overhead has kept it confined to small networks. Tensor Commits target the same proof-size benefit as zkML with overhead that does not break the economics for production-sized models.
          </p>
        </section>

        {/* LLM Optimizations */}
        <section className="mb-12">
          <h2 id="optimizations" className="text-2xl font-medium mb-6">LLM-Specific Optimizations</h2>
          
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { title: "Token Embeddings", desc: "Committed polynomially with positional encoding using homomorphic properties" },
              { title: "Layer Normalization", desc: "Mean/variance via polynomial commitments, inverse sqrt via polynomial approximation" },
              { title: "Multi-Head Attention", desc: "Q, K, V matrices committed individually, attention scores polynomially approximated" },
              { title: "Residual Connections", desc: "Handled via commitment homomorphism, layers reuse prior commitments" },
              { title: "Mixture-of-Experts", desc: "Sparse expert activations committed efficiently, only activated experts contribute" },
            ].map((item) => (
              <div key={item.title} className="docs-card">
                <h3 className="text-sm font-medium mb-1 text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why This Matters */}
        <section className="mb-12">
          <h2 id="why-matters" className="text-2xl font-medium mb-4">Why This Matters</h2>
          
          <div className="docs-card">
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              {[
                { label: "No recomputation", desc: "Verifiers don't re-run the entire model" },
                { label: "Hardware independence", desc: "Proofs valid regardless of hardware" },
                { label: "Privacy preserving", desc: "Weights remain private, computation verifiable" },
                { label: "Scalable verification", desc: "Thousands of validators simultaneously" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-700 dark:text-green-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-slate-900 dark:text-white font-medium">{item.label}:</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-1">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="border-t border-slate-200 dark:border-gray-800 pt-8 grid sm:grid-cols-2 gap-4">
          <Link href="/docs/aivm" className="group no-underline">
            <div className="docs-card h-full">
              <p className="text-sm text-slate-600 dark:text-gray-500 mb-1">Previous</p>
              <h3 className="font-medium group-hover:text-indigo-700 dark:text-indigo-300 transition-colors">← AIVM Architecture</h3>
            </div>
          </Link>
          <Link href="/docs/agents" className="group no-underline">
            <div className="docs-card h-full text-right">
              <p className="text-sm text-slate-600 dark:text-gray-500 mb-1">Next</p>
              <h3 className="font-medium group-hover:text-indigo-700 dark:text-indigo-300 transition-colors">Build Agents →</h3>
            </div>
          </Link>
        </div>
      </div>
      <PrevNext current="tensor-commits" />

    </div>
  );
}
