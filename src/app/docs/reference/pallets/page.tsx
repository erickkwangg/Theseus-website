import type { Metadata } from "next";
import Link from "next/link";
import { FileCode } from "lucide-react";
import Callout from "@/components/docs/Callout";
import { DocsPageJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Runtime Pallets",
  description:
    "Composition of the Theseus runtime: Theseus-specific pallets (aivm, models, agents, tools, store, ship) and the standard FRAME pallets they sit alongside.",
  keywords: [
    "Theseus pallets",
    "pallet_aivm",
    "pallet_agents",
    "pallet_ship",
    "Substrate FRAME",
    "OnInferenceVerified",
  ],
  alternates: { canonical: "/docs/reference/pallets" },
};

type PalletRow = {
  name: string;
  scope: "theseus" | "frame";
  role: string;
  exposes?: string[];
};

const PALLETS: PalletRow[] = [
  {
    name: "pallet_aivm",
    scope: "theseus",
    role: "Inference job queue and verification kernel. Receives model and agent calls, emits InferenceQueued, verifies proofs via the native KZG host function, and routes results through a generic OnInferenceVerified hook so callers don't depend on each other.",
    exposes: ["submit_inference_result"],
  },
  {
    name: "pallet_models",
    scope: "theseus",
    role: "Model registry. Stores metadata (id, tag, weights root, pricing) for every registered model. Implements the OnInferenceVerified hook for direct model calls.",
    exposes: ["register_model", "update_model", "call_model"],
  },
  {
    name: "pallet_agents",
    scope: "theseus",
    role: "Agent registry and ABG runtime. Stores agent state, behavior graphs, loop positions, and seus balances. Manages lifecycle, wake triggers, and the three-stage cross-block execution model.",
    exposes: ["register_agent", "call_agent", "update_agent"],
  },
  {
    name: "pallet_tools",
    scope: "theseus",
    role: "Tool dispatch. Queues off-chain tool calls (web search, authenticated HTTP, x402) for the blessed enclave to execute, and accepts results back via submit_tool_result from the registered enclave identity.",
    exposes: ["submit_tool_result"],
  },
  {
    name: "pallet_store",
    scope: "theseus",
    role: "TheseusStore anchoring. Maintains content-addressed roots (weights_root, context_root, generic data roots) for off-chain data. Consensus nodes never trust raw DA data — they verify it against these roots.",
  },
  {
    name: "pallet_ship",
    scope: "theseus",
    role: "Intent execution and economics. Validates and applies SHIP intents (transfers, context updates, cross-chain messages, contract calls, callbacks) emitted by agents at ABG terminal nodes. Enforces the agent's declared capability surface.",
  },
  {
    name: "pallet_contracts",
    scope: "frame",
    role: "Standard Substrate Wasm contracts. Agents interact with contracts via a chain extension that exposes call_agent and related entry points to contract code.",
  },
  {
    name: "balances",
    scope: "frame",
    role: "Standard FRAME balances. Holds account and agent THE balances; existential deposit is 1 milli-unit.",
  },
  {
    name: "transaction_payment",
    scope: "frame",
    role: "Standard fee payment. seus is the gas unit users pay; underlying settlement is denominated in frxUSD (see Tokenomics).",
  },
  {
    name: "timestamp",
    scope: "frame",
    role: "Standard block timestamp.",
  },
  {
    name: "aura",
    scope: "frame",
    role: "Block production. Slot-based round-robin among the validator set, 6-second slot duration.",
  },
  {
    name: "grandpa",
    scope: "frame",
    role: "Finality. BFT finality gadget — deterministic finality once ≥ 2/3 of validators agree.",
  },
];

export default function PalletsPage() {
  return (
    <div className="docs-content">
      <DocsPageJsonLd
        title="Runtime Pallets"
        description="Composition of the Theseus runtime: Theseus-specific pallets and the standard FRAME pallets they sit alongside."
        slug="reference/pallets"
      />

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/35 bg-indigo-500/10 text-indigo-300 text-xs mb-4">
          <FileCode className="h-3 w-3" />
          Reference
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">
          Runtime Pallets
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          The runtime is composed of Theseus-specific pallets for AI
          coordination, sitting alongside standard FRAME pallets for blockchain
          fundamentals.
        </p>
      </div>

      <Callout type="info" title="Generic hook pattern">
        pallet_aivm is the central inference kernel but does not depend on
        pallet_models or pallet_agents directly. Instead it exposes an
        <code className="mx-1 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 font-mono text-[0.85em]">OnInferenceVerified</code>
        hook that higher-level pallets implement, so verification logic is
        shared across all callers without circular dependencies.
      </Callout>

      <section className="mt-10">
        <h2 className="text-2xl font-medium mb-4 text-slate-900 dark:text-slate-100">
          Theseus pallets
        </h2>
        <div className="space-y-3">
          {PALLETS.filter((p) => p.scope === "theseus").map((p) => (
            <div key={p.name} className="docs-card">
              <div className="flex flex-wrap items-baseline gap-3 mb-2">
                <code className="font-mono text-[15px] text-indigo-700 dark:text-indigo-300">
                  {p.name}
                </code>
                {p.exposes && (
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    exposes:{" "}
                    {p.exposes.map((e, i) => (
                      <span key={e}>
                        <code className="font-mono text-slate-700 dark:text-slate-300">{e}</code>
                        {i < p.exposes!.length - 1 && ", "}
                      </span>
                    ))}
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {p.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-medium mb-4 text-slate-900 dark:text-slate-100">
          Standard FRAME pallets
        </h2>
        <div className="space-y-3">
          {PALLETS.filter((p) => p.scope === "frame").map((p) => (
            <div key={p.name} className="docs-card">
              <div className="flex flex-wrap items-baseline gap-3 mb-2">
                <code className="font-mono text-[15px] text-slate-700 dark:text-slate-300">
                  {p.name}
                </code>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {p.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Callout type="tip" title="Where to look next">
        For the public extrinsic surface (which calls a wallet or off-chain
        runner can issue), see{" "}
        <Link href="/docs/reference/extrinsics" className="underline">
          Extrinsics
        </Link>
        . For the constants pallets are configured with (block sizes, ABG
        limits, job expiry), see{" "}
        <Link href="/docs/reference/parameters" className="underline">
          Network Parameters
        </Link>
        .
      </Callout>
    </div>
  );
}
