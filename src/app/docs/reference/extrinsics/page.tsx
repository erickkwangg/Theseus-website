import type { Metadata } from "next";
import Link from "next/link";
import { Terminal } from "lucide-react";
import Callout from "@/components/docs/Callout";
import { DocsPageJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Extrinsics",
  description:
    "Public extrinsics on Theseus by pallet, with caller permissions. The transaction surface a wallet, indexer, or off-chain agent runner needs to talk to the chain.",
  keywords: [
    "Theseus extrinsics",
    "register_agent",
    "call_agent",
    "call_model",
    "submit_inference_result",
  ],
  alternates: { canonical: "/docs/reference/extrinsics" },
};

type ExtrinsicRow = {
  pallet: string;
  name: string;
  description: string;
  caller: string;
};

const ROWS: ExtrinsicRow[] = [
  {
    pallet: "models",
    name: "register_model",
    description: "Register a new model with tag and weights root.",
    caller: "Root",
  },
  {
    pallet: "models",
    name: "update_model",
    description: "Update model metadata.",
    caller: "Root",
  },
  {
    pallet: "models",
    name: "call_model",
    description: "Queue a direct model inference job. Returns asynchronously when a prover submits a verified result.",
    caller: "Any user",
  },
  {
    pallet: "agents",
    name: "register_agent",
    description: "Deploy an agent with an Agent Behavior Graph (ABG), system prompt, model and tool references, and an initial seus balance.",
    caller: "Any user",
  },
  {
    pallet: "agents",
    name: "call_agent",
    description: "Invoke an agent with an entrypoint and input. Begins three-stage cross-block execution; intents emitted at the terminal node run under the original caller's origin.",
    caller: "Any user",
  },
  {
    pallet: "agents",
    name: "update_agent",
    description: "Update agent configuration. Rejected for sovereign agents.",
    caller: "Controller",
  },
  {
    pallet: "aivm",
    name: "submit_inference_result",
    description: "Submit inference output with a TensorCommitment proof (full prover) or signature (lite prover). Verified inline via the KZG host function.",
    caller: "Prover",
  },
  {
    pallet: "tools",
    name: "submit_tool_result",
    description: "Submit the result of an off-chain tool call. Only accepted from the registered blessed-enclave identity.",
    caller: "Enclave operator",
  },
];

export default function ExtrinsicsPage() {
  return (
    <div className="docs-content">
      <DocsPageJsonLd
        title="Extrinsics"
        description="Public extrinsics on Theseus by pallet, with caller permissions."
        slug="reference/extrinsics"
      />

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/35 bg-indigo-500/10 text-indigo-300 text-xs mb-4">
          <Terminal className="h-3 w-3" />
          Reference
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-normal mb-4 tracking-[-0.02em] [text-wrap:balance]">
          Extrinsics
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          The public transaction surface. What a wallet, indexer, or off-chain
          agent runner can submit to the chain, grouped by pallet.
        </p>
      </div>

      <Callout type="info" title="Asynchronous by design">
        Inference is never synchronous on Theseus. <code>call_model</code> and{" "}
        <code>call_agent</code> queue work and emit{" "}
        <code className="font-mono">InferenceQueued</code>; the actual result
        lands in a later block once a prover submits{" "}
        <code>submit_inference_result</code> and KZG verification passes. Jobs
        not fulfilled within 600 blocks expire.
      </Callout>

      <section className="mt-8">
        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700/60">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100/60 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700/60">
                <th className="text-left font-medium text-slate-600 dark:text-slate-400 px-4 py-2.5">
                  Pallet
                </th>
                <th className="text-left font-medium text-slate-600 dark:text-slate-400 px-4 py-2.5">
                  Extrinsic
                </th>
                <th className="text-left font-medium text-slate-600 dark:text-slate-400 px-4 py-2.5">
                  Description
                </th>
                <th className="text-left font-medium text-slate-600 dark:text-slate-400 px-4 py-2.5 whitespace-nowrap">
                  Caller
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr
                  key={`${r.pallet}.${r.name}`}
                  className="border-b border-slate-200 dark:border-slate-800 last:border-0 align-top"
                >
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300 whitespace-nowrap">
                    {r.pallet}
                  </td>
                  <td className="px-4 py-3 font-mono text-indigo-700 dark:text-indigo-300 whitespace-nowrap">
                    {r.name}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400 leading-relaxed">
                    {r.description}
                  </td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300 whitespace-nowrap">
                    {r.caller}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-medium mb-4 text-slate-900 dark:text-slate-100">
          Caller roles
        </h2>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <li>
            <strong>Any user</strong> — open to any signed extrinsic. Fees are
            paid in seus by the caller (or by the agent under its reverse-gas
            balance for downstream intents).
          </li>
          <li>
            <strong>Controller</strong> — the account recorded on the agent at
            registration time. Sovereign agents have no controller and reject
            controller-gated extrinsics.
          </li>
          <li>
            <strong>Prover</strong> — any registered prover account. At alpha,
            the active set is one full prover plus two lite provers; verification
            path differs (KZG proof vs. signature only).
          </li>
          <li>
            <strong>Enclave operator</strong> — the blessed enclave identity
            recorded on-chain. The chain rejects{" "}
            <code className="font-mono text-xs">submit_tool_result</code> from
            any other origin.
          </li>
          <li>
            <strong>Root</strong> — invoked through governance, not directly. At
            alpha this means a passing validator vote (see{" "}
            <Link href="/docs/status" className="underline">
              Status &amp; Roadmap
            </Link>
            ).
          </li>
        </ul>
      </section>

      <Callout type="tip" title="Where to look next">
        For each pallet&rsquo;s broader role and the storage it manages, see{" "}
        <Link href="/docs/reference/pallets" className="underline">
          Runtime Pallets
        </Link>
        . For input limits and job expiry constants, see{" "}
        <Link href="/docs/reference/parameters" className="underline">
          Network Parameters
        </Link>
        .
      </Callout>
    </div>
  );
}
