import Link from "next/link";
import type { Metadata } from "next";
import {
  Cpu,
  Shield,
  Zap,
  GitBranch,
  Activity,
  Workflow,
} from "lucide-react";
import Callout from "@/components/docs/Callout";
import { DocsPageJsonLd } from "@/components/JsonLd";
import PrevNext from "@/components/docs/PrevNext";

export const metadata: Metadata = {
  title: "Prover Ecosystem",
  description:
    "Theseus provers run AI inference off-chain and submit results back. Two tiers — full provers with TensorCommitment proofs and lite provers with signature attestation — VRF-based selection, capacity registry, deadlines, slashing.",
  keywords: [
    "Theseus provers",
    "TensorCommitment",
    "KZG verification",
    "VRF prover selection",
    "lite prover",
    "full prover",
    "vLLM",
    "BLS12-381",
  ],
  alternates: { canonical: "/docs/provers" },
};

export default function ProversPage() {
  return (
    <div className="docs-content">
      <DocsPageJsonLd
        title="Prover Ecosystem"
        description="Theseus provers run AI inference off-chain and submit results back. Two tiers — full provers with TensorCommitment proofs and lite provers with signature attestation."
        slug="provers"
      />

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/35 bg-indigo-500/10 text-indigo-300 text-xs mb-4">
          <Cpu className="h-3 w-3" />
          System
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">
          Prover Ecosystem
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          The off-chain compute that runs every model call — and the
          on-chain machinery that verifies what they submit.
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="tip" title="In one paragraph">
          Provers are off-chain services that subscribe to{" "}
          <code>InferenceQueued</code> events, run AI model inference on GPU
          hardware, and submit results back along with verification material.
          The chain accepts results only via the{" "}
          <code>submit_inference_result</code> extrinsic, and only when the
          attached material verifies. There are two tiers — full provers
          with cryptographic proofs and lite provers with signature
          attestation — and the long-term direction is to retire the lite
          tier entirely.
        </Callout>
        <ul className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-1.5 mb-10 ml-5 list-disc">
          <li>
            <strong>Full provers</strong> run models locally, generate
            TensorCommitment proofs inline during the forward pass. The
            chain verifies via a native KZG host function.
          </li>
          <li>
            <strong>Lite provers</strong> route to hosted APIs (OpenAI,
            etc.) and submit only a signed result. No computational
            integrity guarantee — pragmatic for breadth at alpha, phased
            out by mainnet.
          </li>
          <li>
            <strong>Selection is VRF-based</strong>: an on-chain capacity
            registry filters eligible provers per job, then a verifiable
            random draw picks one. Non-manipulable.
          </li>
          <li>
            <strong>Deadlines + slashing</strong>: missing a deadline
            triggers slashing via the staking pallet. Deadlines vary by
            latency class.
          </li>
        </ul>

        {/* Two tiers */}
        <section className="mb-12">
          <h2 id="two-tiers" className="text-2xl font-medium mb-6">
            Two tiers, one extrinsic
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            From the chain&rsquo;s perspective both tiers submit through the
            same <code>submit_inference_result</code>. The verification path
            is what differs.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="docs-card border-green-900/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-green-500/10 text-green-600 dark:text-green-300">
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
                  Full prover
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <li>
                  Runs models locally via <strong>vLLM</strong> (gpt-oss-120B
                  or similar single-GPU model at alpha).
                </li>
                <li>
                  Produces <strong>TensorCommitment proofs</strong> inline
                  during the forward pass: KZG commitments, sumcheck,
                  lookup arguments.
                </li>
                <li>
                  Chain verifies via a <strong>native KZG host
                  function</strong>. Consensus safety depends only on what
                  this function accepts.
                </li>
                <li>
                  Operated by Theseus at alpha. Open registration with
                  staking by Beta.
                </li>
              </ul>
            </div>

            <div className="docs-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-300">
                  <Activity className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
                  Lite prover
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <li>
                  Routes inference to a <strong>hosted provider</strong>{" "}
                  (OpenAI API or equivalent).
                </li>
                <li>
                  Submits result with a <strong>signature only</strong> — no
                  proof that the computation was correct.
                </li>
                <li>
                  Pragmatic bridge while full proving matures. Provides
                  model breadth and throughput from day one.
                </li>
                <li>
                  <strong>Phased out by mainnet</strong>: at that point the
                  network no longer accepts signature-only results.
                </li>
              </ul>
            </div>
          </div>

          <Callout type="warning" title="Lite-prover trust assumption">
            Signature-only verification means a lite prover can return
            arbitrary outputs and the chain can&rsquo;t tell. This is an
            explicit MVP trade-off documented in{" "}
            <Link href="/docs/security" className="underline">
              the security model
            </Link>
            . Until lite is retired, the credential&rsquo;s{" "}
            <code>recentRuns.grade</code> field tells verifiers whether an
            agent&rsquo;s recent runs were proved or signed.
          </Callout>
        </section>

        {/* TensorCommitment proof system */}
        <section className="mb-12">
          <h2
            id="tensorcommitment"
            className="text-2xl font-medium mb-6 flex items-center gap-3"
          >
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-300">
              <GitBranch className="h-5 w-5" />
            </span>
            TensorCommitment proof system
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            The proof system is the cryptographic core of the verification
            model. Its job is to let the on-chain verifier confirm — in
            constant time — that a prover ran a specific model on a specific
            input and produced the claimed output. It&rsquo;s designed for
            transformer-shaped networks, handling both the linear
            operations (matmul) and the nonlinear activations
            (GELU/SiLU/softmax).
          </p>

          <h3 className="text-lg font-medium mt-6 mb-3 text-slate-900 dark:text-slate-100">
            Cryptographic primitives
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            Built on the <strong>BLS12-381</strong> elliptic curve via the
            Arkworks library, chosen for its well-studied security and
            efficient pairings. Three primitives compose:
          </p>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            <li>
              <strong>Tiled multivariate KZG commitments</strong> — tensor
              activations tiled and committed using a product-power
              Structured Reference String.
            </li>
            <li>
              <strong>Sumcheck protocol</strong> — non-interactive via
              Fiat-Shamir. Verifies linear operations over committed
              tensors.
            </li>
            <li>
              <strong>Plookup-style lookup arguments</strong> — for nonlinear
              activations against precomputed tables.
            </li>
          </ul>

          <h3 className="text-lg font-medium mt-6 mb-3 text-slate-900 dark:text-slate-100">
            Proof generation pipeline
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            Proofs are generated <em>inline</em> during the vLLM forward
            pass — Python hooks intercept per-layer activations and feed
            them to the Rust proof engine. Seven steps:
          </p>
          <ol className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed list-decimal ml-6">
            <li>Input commitment (hash of input tokens).</li>
            <li>
              Per-layer KZG commitments — tiled multivariate commitments
              for each transformer layer (attention, FFN, layer norm).
            </li>
            <li>Sumcheck proofs for linear operations.</li>
            <li>Lookup proofs for nonlinear activations.</li>
            <li>
              Weight binding — sumcheck opening at a random challenge
              point, binding the proof to the registered model weights.
            </li>
            <li>Output commitment.</li>
            <li>
              Terkle tree aggregation — per-layer commitments aggregated
              into a single root for compact on-chain verification.
            </li>
          </ol>

          <h3 className="text-lg font-medium mt-6 mb-3 text-slate-900 dark:text-slate-100">
            Hardware acceleration
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            The dominant cost in proof generation is{" "}
            <strong>multi-scalar multiplication</strong> (MSM), which paces
            the KZG commitments. To make proving practical at inference
            speeds, the prover uses GPU acceleration: <strong>Metal</strong>{" "}
            on macOS for development and <strong>CUDA</strong> in
            production. CUDA support extends to MSM, NTT, quantization, and
            sumcheck proof generation, so the full proof pipeline runs on
            the same GPU that runs inference.
          </p>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            For the cryptographic deep-dive (with the verifier-side O(1)
            cost argument), see{" "}
            <Link href="/docs/tensor-commits" className="underline">
              Tensor Commits
            </Link>
            .
          </p>
        </section>

        {/* Selection */}
        <section className="mb-12">
          <h2
            id="selection"
            className="text-2xl font-medium mb-6 flex items-center gap-3"
          >
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-300">
              <Zap className="h-5 w-5" />
            </span>
            Selection: VRF lottery + capacity registry
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            Manipulation-resistant assignment matters: if users or provers
            could pick which prover handles a given job, you&rsquo;d open
            the door to collusion, censorship, and selective computation.
            The target design uses a verifiable random draw that respects
            each model&rsquo;s hardware needs.
          </p>
          <ol className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed list-decimal ml-6 mb-6">
            <li>
              Each registered prover declares hardware capacity (VRAM, RAM,
              supported models) in an on-chain{" "}
              <strong>Capacity Registry</strong>.
            </li>
            <li>
              For each inference job, the eligible set is filtered to
              provers whose capacity meets the model&rsquo;s requirements.
            </li>
            <li>
              A <strong>VRF draw</strong>, seeded from consensus
              randomness, selects the assigned prover. The selection is
              non-manipulable and verifiable on-chain.
            </li>
            <li>
              Selected provers have a block-based{" "}
              <strong>deadline</strong>; missing it triggers slashing via
              the staking pallet.
            </li>
          </ol>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            At alpha (1 full + 2 lite), any registered prover can submit
            results for any job. VRF-based selection activates as the prover
            set grows.
          </p>
        </section>

        {/* Accountability */}
        <section className="mb-12">
          <h2
            id="accountability"
            className="text-2xl font-medium mb-6 flex items-center gap-3"
          >
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-300">
              <Shield className="h-5 w-5" />
            </span>
            Accountability and latency classes
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            Honest behavior is enforced through economic pressure, not
            policy. Misbehavior is more costly than honest participation.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {[
              {
                title: "Staking",
                desc: "Registered provers post a bond. Misbehavior triggers slashing.",
              },
              {
                title: "Capacity claims",
                desc: "Provers declare hardware capacity. Failure to deliver assigned jobs signals misreported capacity, triggering penalties.",
              },
              {
                title: "Deadlines",
                desc: "Each job has a block-based deadline derived from its latency class. Missing it triggers slashing.",
              },
              {
                title: "Latency classes",
                desc: "Jobs grouped into RT (real-time), Interactive, and Bulk classes with differentiated deadlines and fees.",
              },
            ].map((item) => (
              <div key={item.title} className="docs-card">
                <h3 className="text-sm font-medium mb-1.5 text-slate-900 dark:text-slate-100">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            At alpha with a small prover set, these mechanisms operate in a
            simplified form. Full staking and slashing activate with open
            prover registration in Beta — see{" "}
            <Link href="/docs/status" className="underline">
              Status &amp; Roadmap
            </Link>
            .
          </p>
        </section>

        {/* Navigation */}
        <div className="border-t border-slate-200 dark:border-gray-800 pt-8 grid sm:grid-cols-2 gap-4">
          <Link href="/docs/execution" className="group no-underline">
            <div className="docs-card h-full flex items-start gap-3">
              <Workflow className="h-5 w-5 text-gray-500 group-hover:text-indigo-300 transition-colors shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium group-hover:text-indigo-300 transition-colors">
                  ← Execution Model
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Where Stage 2 fits.
                </p>
              </div>
            </div>
          </Link>
          <Link href="/docs/security" className="group no-underline">
            <div className="docs-card h-full flex items-start gap-3">
              <Shield className="h-5 w-5 text-gray-500 group-hover:text-indigo-300 transition-colors shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium group-hover:text-indigo-300 transition-colors">
                  Security Model →
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  What the alpha trust assumptions actually are.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <PrevNext current="provers" />
    </div>
  );
}
