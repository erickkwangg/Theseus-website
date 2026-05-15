import Link from "next/link";
import type { Metadata } from "next";
import { Shield, AlertTriangle, Cpu, Vote } from "lucide-react";
import Callout from "@/components/docs/Callout";
import CodeBlock from "@/components/docs/CodeBlock";
import { DocsPageJsonLd } from "@/components/JsonLd";
import PrevNext from "@/components/docs/PrevNext";

export const metadata: Metadata = {
  title: "Security Model",
  description:
    "Theseus security: alpha trust assumptions, prover accountability mechanics, DoS and spam mitigations, and the constant-time KZG verification cost model.",
  keywords: [
    "Theseus security",
    "trust assumptions",
    "BFT",
    "prover accountability",
    "DoS mitigation",
    "KZG verification",
    "validator slashing",
    "blessed enclave",
  ],
  alternates: { canonical: "/docs/security" },
};

export default function SecurityPage() {
  return (
    <div className="docs-content">
      <DocsPageJsonLd
        title="Security Model"
        description="Theseus security: alpha trust assumptions, prover accountability mechanics, DoS and spam mitigations, and the constant-time KZG verification cost model."
        slug="security"
      />

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/35 bg-indigo-500/10 text-indigo-300 text-xs mb-4">
          <Shield className="h-3 w-3" />
          Network
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-normal mb-4 tracking-[-0.02em] [text-wrap:balance]">
          Security Model
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          What the chain trusts, what it verifies, and what happens if any
          single off-chain component lies.
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="tip" title="In one paragraph">
          The on-chain verification surface is the sole source of truth.
          Off-chain components — provers, the blessed enclave, storage
          providers — are <em>untrusted by default</em>. Inference results
          are accepted only when their KZG proof verifies (full prover) or
          when the result carries a registered prover signature (lite
          prover, alpha-only). Tool results are accepted only from the
          registered enclave identity. Security degrades gracefully as the
          system decentralizes.
        </Callout>
        <ul className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-1.5 mb-10 ml-5 list-disc">
          <li>
            <strong>Alpha trust scope is small and explicit</strong>:
            4 validators, 1 full prover, 2 lite provers, 1 enclave.
          </li>
          <li>
            <strong>Lite provers are an MVP trade-off</strong>: signature-
            only verification provides no computational integrity. Phased
            out by mainnet.
          </li>
          <li>
            <strong>Provers are economically accountable</strong>: staking,
            capacity claims, deadlines, and latency classes — misbehavior
            costs more than honest participation.
          </li>
          <li>
            <strong>DoS defense is layered</strong>: pre-dispatch filtering
            of invalid submissions, conservative weight modelling on KZG
            verification, strict size bounds, priority routing for prover
            extrinsics.
          </li>
        </ul>

        {/* Trust assumptions */}
        <section className="mb-12">
          <h2 id="trust-assumptions" className="text-2xl font-medium mb-6">
            Trust assumptions at alpha
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Alpha launches with explicit centralization trade-offs.
            They&rsquo;re acknowledged, bounded, and scheduled for removal
            through{" "}
            <Link href="/docs/status" className="underline">
              progressive decentralization
            </Link>
            .
          </p>

          <div className="space-y-4">
            <div className="docs-card border-amber-900/40">
              <h3 className="text-base font-medium mb-2 text-slate-900 dark:text-slate-100">
                Validators (4)
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Standard BFT assumptions. Safety requires &lt; 1/3 byzantine
                (&lt; 2 of 4). Liveness requires ≥ 2/3 (≥ 3 of 4). The small
                set means individual validator compromise has outsized
                impact on liveness in particular.
              </p>
            </div>

            <div className="docs-card border-amber-900/40">
              <h3 className="text-base font-medium mb-2 text-slate-900 dark:text-slate-100">
                Full prover (1, Theseus)
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                The only source of cryptographic inference integrity. If
                compromised, false proofs could pass KZG verification —
                mitigated by the on-chain verification path being
                deterministic and auditable by any full node. Capacity for
                independent re-verification grows with Beta open
                registration.
              </p>
            </div>

            <div className="docs-card border-red-900/40">
              <h3 className="text-base font-medium mb-2 text-slate-900 dark:text-slate-100">
                Lite provers (2, external)
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Signature-only verification provides{" "}
                <strong>no computational integrity guarantee</strong>. A
                lite prover can return arbitrary outputs with a valid
                signature. This is an explicit MVP trade-off for model
                breadth and throughput while full verification rolls out.
                The credential&rsquo;s <code>recentRuns.grade</code> field
                surfaces this to verifiers.
              </p>
            </div>

            <div className="docs-card border-amber-900/40">
              <h3 className="text-base font-medium mb-2 text-slate-900 dark:text-slate-100">
                Blessed enclave (1, Theseus)
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Single point of failure for credential security. If the TEE
                is compromised, all agent credentials stored on-chain could
                be decrypted. Mitigation: the enclave is Theseus-operated
                with TEE attestation, and the roadmap moves to multi-party
                attestation in Beta and a decentralized enclave network in
                mainnet.
              </p>
            </div>
          </div>
        </section>

        {/* Prover accountability */}
        <section className="mb-12">
          <h2
            id="prover-accountability"
            className="text-2xl font-medium mb-6 flex items-center gap-3"
          >
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-300">
              <Cpu className="h-5 w-5" />
            </span>
            Prover accountability
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            In a system where off-chain provers do the actual AI compute,
            the chain needs mechanisms to ensure honest behavior — deliver
            on time, report capacity truthfully, never submit false proofs.
            The target design enforces this through economic pressure.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              {
                title: "Staking",
                desc: "Registered provers post a bond. Misbehavior triggers slashing.",
              },
              {
                title: "Capacity claims",
                desc: "Provers declare hardware (VRAM, RAM, supported models). Failure to deliver assigned jobs signals misreported capacity or operational unreliability — penalties follow.",
              },
              {
                title: "Deadlines",
                desc: "Each inference job has a block-based deadline derived from its latency class. Missing the deadline triggers slashing.",
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
          <p className="text-gray-600 dark:text-gray-400 mt-6 leading-relaxed">
            At alpha with a small prover set, these mechanisms operate in a
            simplified form. Full staking and slashing activate with open
            prover registration in Beta.
          </p>
        </section>

        {/* DoS defense */}
        <section className="mb-12">
          <h2
            id="dos-defense"
            className="text-2xl font-medium mb-6 flex items-center gap-3"
          >
            <span className="p-1.5 rounded-lg bg-red-500/10 text-red-600 dark:text-red-300">
              <AlertTriangle className="h-5 w-5" />
            </span>
            DoS and spam mitigations
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            <code>submit_inference_result</code> triggers KZG proof
            verification. Verification is constant-time but still expensive
            relative to a no-op transaction, which creates an asymmetry: a
            malicious actor could submit many invalid proofs that each
            consume validator CPU before being rejected. The chain defends
            against this in layers.
          </p>

          <div className="space-y-3">
            <div className="docs-card">
              <h3 className="text-sm font-medium mb-1.5 text-slate-900 dark:text-slate-100">
                Pre-dispatch filtering
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                <code>validate()</code> checks pending job existence,
                metadata consistency, and encoded size bounds{" "}
                <em>before</em> dispatching the expensive verification.
                Invalid submissions are rejected cheaply.
              </p>
            </div>
            <div className="docs-card">
              <h3 className="text-sm font-medium mb-1.5 text-slate-900 dark:text-slate-100">
                Conservative weight model
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                KZG verification cost (<code>W_kzg</code>) is modelled as a
                large, fixed constant per proof — deliberately overestimated
                relative to measured performance. A &ldquo;full&rdquo; block
                of prover extrinsics still executes within the target block
                time.
              </p>
            </div>
            <div className="docs-card">
              <h3 className="text-sm font-medium mb-1.5 text-slate-900 dark:text-slate-100">
                Strict size bounds
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                All dynamically sized fields in{" "}
                <code>InferenceResult</code> (output, proof) are statically
                bounded, preventing large-allocation attacks.
              </p>
            </div>
            <div className="docs-card">
              <h3 className="text-sm font-medium mb-1.5 text-slate-900 dark:text-slate-100">
                Priority mechanism
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Proof submissions return high-priority{" "}
                <code>ValidTransaction</code>s so they&rsquo;re included
                ahead of regular traffic, ensuring timely verification even
                under congestion.
              </p>
            </div>
          </div>
        </section>

        {/* Cost model */}
        <section className="mb-12">
          <h2 id="cost-model" className="text-2xl font-medium mb-4">
            KZG verification cost model
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            A key property of KZG commitments is that verification is{" "}
            <code>O(1)</code> in the size of the committed data. Regardless
            of how large the model or how many tokens were generated,
            verifying a single proof requires a constant number of elliptic
            curve pairings. On BLS12-381 this takes a few milliseconds on
            commodity validator hardware — well within 6-second block
            times even when verifying multiple proofs per block.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            The Substrate weight model bounds maximum verification density
            per block:
          </p>
          <CodeBlock language="text" filename="weight model">{`W_submit_inference_result ≈
    W_base
  + n_proofs · W_kzg
  + W_storage

where:
  n_proofs is bounded by a per-extrinsic maximum
  W_kzg is derived from WCET-style benchmarking
        on minimum validator hardware`}</CodeBlock>
        </section>

        {/* Navigation */}
        <div className="border-t border-slate-200 dark:border-gray-800 pt-8 grid sm:grid-cols-2 gap-4">
          <Link href="/docs/provers" className="group no-underline">
            <div className="docs-card h-full flex items-start gap-3">
              <Cpu className="h-5 w-5 text-gray-500 group-hover:text-indigo-300 transition-colors shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium group-hover:text-indigo-300 transition-colors">
                  ← Provers
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Who runs Stage 2 inference and how.
                </p>
              </div>
            </div>
          </Link>
          <Link href="/docs/governance" className="group no-underline">
            <div className="docs-card h-full flex items-start gap-3">
              <Vote className="h-5 w-5 text-gray-500 group-hover:text-indigo-300 transition-colors shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium group-hover:text-indigo-300 transition-colors">
                  Governance →
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  How the trust scope shrinks over time.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <PrevNext current="security" />
    </div>
  );
}
