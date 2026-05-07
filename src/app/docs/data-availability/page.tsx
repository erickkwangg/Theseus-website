import Link from "next/link";
import type { Metadata } from "next";
import { Database, FileCode, ShieldCheck, Wrench } from "lucide-react";
import Callout from "@/components/docs/Callout";
import { DocsPageJsonLd } from "@/components/JsonLd";
import PrevNext from "@/components/docs/PrevNext";

export const metadata: Metadata = {
  title: "Data Availability",
  description:
    "TheseusStore — the off-chain DA layer for model weights, agent contexts, and auxiliary data. Content-addressed roots anchored on-chain provide cryptographic integrity verification.",
  keywords: [
    "TheseusStore",
    "data availability",
    "weights_root",
    "context_root",
    "Merkle root",
    "Verkle root",
    "OCW",
    "off-chain data",
    "DA sampling",
  ],
  alternates: { canonical: "/docs/data-availability" },
};

export default function DataAvailabilityPage() {
  return (
    <div className="docs-content">
      <DocsPageJsonLd
        title="Data Availability"
        description="TheseusStore — the off-chain DA layer for model weights, agent contexts, and auxiliary data."
        slug="data-availability"
      />

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/35 bg-indigo-500/10 text-indigo-300 text-xs mb-4">
          <Database className="h-3 w-3" />
          System
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">
          Data Availability
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          Where heavy data lives — and how the chain verifies it without
          trusting whoever stores it.
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="tip" title="In one paragraph">
          A 120-billion-parameter model&rsquo;s weights can exceed 200 GB —
          far too large to replicate across every validator. Agent
          execution contexts and logs can grow significantly too. Theseus
          uses the standard pattern: heavy data lives off-chain in
          TheseusStore (a dedicated DA layer), and the on-chain runtime
          stores only compact, content-addressed roots that serve as
          cryptographic commitments. Correctness depends only on the
          roots; the DA layer provides availability.
        </Callout>
        <ul className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-1.5 mb-10 ml-5 list-disc">
          <li>
            <strong>Three anchor types</strong>: <code>weights_root</code>{" "}
            (per model), <code>context_root</code> (per agent), generic
            data roots for everything else.
          </li>
          <li>
            <strong>Fetch-and-verify</strong>: nodes never trust raw bytes
            — they fetch by root and verify against the on-chain anchor.
          </li>
          <li>
            <strong>Correctness ≠ availability</strong>: integrity is
            cryptographic; availability is what the DA layer&rsquo;s
            economics ensure.
          </li>
          <li>
            <strong>Sampling-based DA checks</strong>: Substrate Off-chain
            Workers (OCWs) periodically sample data referenced by anchored
            roots and slash unavailability.
          </li>
        </ul>

        {/* Anchors */}
        <section className="mb-12">
          <h2 id="on-chain-anchors" className="text-2xl font-medium mb-6">
            On-chain anchors
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            <code>pallet_store</code> maintains the canonical mapping
            between on-chain identifiers and off-chain data. It exposes
            three kinds of anchor:
          </p>
          <div className="space-y-3">
            <div className="docs-card">
              <h3 className="text-sm font-medium mb-1.5 text-slate-900 dark:text-slate-100">
                <code className="font-mono text-indigo-600 dark:text-indigo-300">weights_root</code>
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Content-addressed root for model parameters. Stored per
                model in <code>pallet_models</code>. Provers fetch weights
                by root, verify integrity before running inference.
              </p>
            </div>
            <div className="docs-card">
              <h3 className="text-sm font-medium mb-1.5 text-slate-900 dark:text-slate-100">
                <code className="font-mono text-indigo-600 dark:text-indigo-300">context_root</code>
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Content-addressed root for agent execution context and
                logs. Updated by <code>pallet_agents</code> as agents
                execute, anchoring the AKG (Agent Knowledge Graph).
              </p>
            </div>
            <div className="docs-card">
              <h3 className="text-sm font-medium mb-1.5 text-slate-900 dark:text-slate-100">
                Generic data roots
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                For other domain-specific data referenced by agents or
                contracts. Same fetch-and-verify pattern.
              </p>
            </div>
          </div>
        </section>

        {/* Data flow */}
        <section className="mb-12">
          <h2 id="data-flow" className="text-2xl font-medium mb-4">
            Data flow: fetch and verify
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            No participant in the system blindly trusts data retrieved
            from TheseusStore. They always verify it against the on-chain
            root before using it.
          </p>
          <ol className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed list-decimal ml-6">
            <li>A model is registered with its weights_root anchored on-chain.</li>
            <li>
              When assigned an inference job, a prover fetches model
              weights from TheseusStore by root and verifies integrity
              (Merkle / Verkle proofs).
            </li>
            <li>
              After agent execution, updated context is stored in
              TheseusStore and the new <code>context_root</code> is
              anchored on-chain.
            </li>
          </ol>
        </section>

        {/* Security model */}
        <section className="mb-12">
          <h2
            id="da-security"
            className="text-2xl font-medium mb-6 flex items-center gap-3"
          >
            <span className="p-1.5 rounded-lg bg-green-500/10 text-green-600 dark:text-green-300">
              <ShieldCheck className="h-5 w-5" />
            </span>
            Correctness vs availability
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            A critical property of the DA design:{" "}
            <strong>correctness does not depend on the DA layer&rsquo;s
            honesty</strong>. It only depends on its <em>availability</em>.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            Consensus nodes never trust raw data from TheseusStore. For
            anything that matters for execution, they fetch it via the
            content-addressed root and verify integrity against the
            on-chain anchor (Merkle / Verkle proofs). As long as at least
            one honest full node can obtain the data and verify it against
            the root, the on-chain state transition remains correct.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            The DA layer&rsquo;s economic incentives and slashing
            mechanisms exist to ensure <em>liveness</em> (data stays
            available), not <em>integrity</em> (data is correct). Integrity
            is guaranteed by the cryptographic commitments anchored
            on-chain.
          </p>
        </section>

        {/* Sampling */}
        <section className="mb-12">
          <h2
            id="sampling"
            className="text-2xl font-medium mb-6 flex items-center gap-3"
          >
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-300">
              <FileCode className="h-5 w-5" />
            </span>
            Sampling-based availability checks
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            The protocol supports <strong>bounded, sampling-based
            availability checks</strong> via Substrate Off-chain Workers
            (OCWs):
          </p>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            <li>
              OCWs periodically sample data referenced by anchored roots.
            </li>
            <li>
              Unsigned transactions record evidence of unavailability when
              samples fail to retrieve.
            </li>
            <li>
              Misbehaving storage providers are slashed via the staking
              pallet.
            </li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            These DA checks are orthogonal to inference verification. The
            chain&rsquo;s correctness doesn&rsquo;t depend on them. They
            strengthen the guarantee that off-chain data remains available
            and consistent over time.
          </p>
        </section>

        {/* Why it works */}
        <section className="mb-12">
          <h2 id="why" className="text-2xl font-medium mb-4">
            Why this layout works
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            Splitting heavy data off-chain is the only way to support
            modern model sizes inside a chain. Doing it without weakening
            integrity comes from the same property that makes Tensor
            Commits work: the on-chain anchor commits to the data, and
            anyone holding the data can produce a proof against that
            anchor. The chain doesn&rsquo;t need to <em>store</em> the
            data to <em>verify</em> claims about it.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            That&rsquo;s the same principle that lets a prover serve
            inference for a 120 GB model from a single GPU and still have
            every validator independently verify the result in milliseconds.
          </p>
        </section>

        {/* Navigation */}
        <div className="border-t border-slate-200 dark:border-gray-800 pt-8 grid sm:grid-cols-2 gap-4">
          <Link href="/docs/tools" className="group no-underline">
            <div className="docs-card h-full flex items-start gap-3">
              <Wrench className="h-5 w-5 text-gray-500 group-hover:text-indigo-300 transition-colors shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium group-hover:text-indigo-300 transition-colors">
                  ← Tools &amp; Enclave
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  The other off-chain surface.
                </p>
              </div>
            </div>
          </Link>
          <Link href="/docs/security" className="group no-underline">
            <div className="docs-card h-full flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-gray-500 group-hover:text-indigo-300 transition-colors shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium group-hover:text-indigo-300 transition-colors">
                  Security Model →
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Where DA fits in the trust scope.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <PrevNext current="data-availability" />
    </div>
  );
}
