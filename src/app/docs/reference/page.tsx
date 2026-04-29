import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import Callout from "@/components/docs/Callout";
import { DocsPageJsonLd } from "@/components/JsonLd";
import PrevNext from "@/components/docs/PrevNext";

export const metadata: Metadata = {
  title: "Reference",
  description:
    "Complete reference for Theseus: pallet extrinsics, network parameters, runtime configuration. Authoritative source for developers building agents.",
  keywords: [
    "Theseus reference",
    "pallet extrinsics",
    "network parameters",
    "runtime config",
    "AIVM API",
  ],
};

const extrinsics = [
  {
    pallet: "models",
    name: "register_model",
    desc: "Register a new model with tag and weights root",
    caller: "Root",
  },
  {
    pallet: "models",
    name: "update_model",
    desc: "Update model metadata",
    caller: "Root",
  },
  {
    pallet: "models",
    name: "call_model",
    desc: "Queue a direct model inference job",
    caller: "Any user",
  },
  {
    pallet: "agents",
    name: "register_agent",
    desc: "Deploy agent with ABG, system prompt, tools, initial funding",
    caller: "Any user",
  },
  {
    pallet: "agents",
    name: "call_agent",
    desc: "Invoke agent with entrypoint and input",
    caller: "Any user",
  },
  {
    pallet: "agents",
    name: "update_agent",
    desc: "Update agent configuration",
    caller: "Controller",
  },
  {
    pallet: "aivm",
    name: "submit_inference_result",
    desc: "Submit inference output with proof or signature",
    caller: "Prover",
  },
  {
    pallet: "tools",
    name: "submit_tool_result",
    desc: "Submit tool execution result (web search, authenticated HTTP)",
    caller: "Enclave operator",
  },
];

const palletRoles = [
  {
    name: "pallet_aivm",
    role: "Inference job queue and verification kernel. Receives model and agent calls, emits InferenceQueued, verifies proofs via the native KZG host function, routes results to higher pallets via a generic OnInferenceVerified hook.",
  },
  {
    name: "pallet_models",
    role: "Model registry. Stores metadata (id, tag, weights root, pricing). Exposes call_model.",
  },
  {
    name: "pallet_agents",
    role: "Agent registry and ABG runtime. Stores agent state, behavior graphs, loop positions. Manages lifecycle, wake triggers, and seus balances. Exposes call_agent.",
  },
  {
    name: "pallet_tools",
    role: "Tool dispatch. Queues off-chain tool calls (web search, authenticated HTTP) and accepts results via submit_tool_result from the registered enclave identity.",
  },
  {
    name: "pallet_store",
    role: "TheseusStore anchoring. Maintains content-addressed roots (weights_root, context_root) for off-chain data with on-chain integrity verification.",
  },
  {
    name: "pallet_ship",
    role: "Intent execution and economics. Validates and applies SHIP intents (transfers, context updates, cross-chain messages, contract calls) emitted by agents at ABG terminal nodes.",
  },
  {
    name: "pallet_contracts",
    role: "Standard Substrate Wasm contracts. Agents interact via chain extension.",
  },
];

const networkParams: Array<{
  category: string;
  rows: Array<{ param: string; value: string }>;
}> = [
  {
    category: "Block",
    rows: [
      { param: "Slot duration", value: "6 s" },
      { param: "Block hash count", value: "2400" },
      { param: "Max block weight", value: "2 s ref time" },
      { param: "Max block size", value: "5 MB" },
      { param: "Normal dispatch ratio", value: "75%" },
    ],
  },
  {
    category: "AIVM",
    rows: [
      { param: "Max input size", value: "400 KB" },
      { param: "Max output size", value: "1 MB" },
      { param: "Job expiry", value: "600 blocks" },
      { param: "Max expired per block", value: "32" },
    ],
  },
  {
    category: "Agents",
    rows: [
      { param: "Max ABG nodes", value: "256" },
      { param: "Max node size", value: "128 KB" },
      { param: "Max system prompt", value: "10 KB" },
      { param: "Agent name length", value: "64 bytes" },
      { param: "Max input size", value: "400 KB" },
      { param: "Max state fields", value: "64" },
      { param: "Max messages per run", value: "10" },
      { param: "Max steps per run", value: "64" },
      { param: "Sync steps per tick", value: "16" },
      { param: "Max call depth", value: "2" },
      { param: "Inference retries / node", value: "2" },
      { param: "Tool retries / node", value: "2" },
    ],
  },
  {
    category: "Tools",
    rows: [
      { param: "Max tools per agent", value: "16" },
      { param: "Max calls per message", value: "8" },
      { param: "Tool name length", value: "64 bytes" },
      { param: "Max tool arguments", value: "64 KB" },
      { param: "Max tool result size", value: "128 KB" },
      { param: "Job expiry", value: "600 blocks" },
      { param: "Max expired per block", value: "10" },
    ],
  },
  {
    category: "Models",
    rows: [{ param: "Model name length", value: "64 bytes" }],
  },
  {
    category: "Consensus",
    rows: [
      { param: "Max authorities", value: "32" },
      { param: "SS58 prefix", value: "42" },
    ],
  },
  {
    category: "Economics",
    rows: [
      { param: "Token symbol", value: "THE" },
      { param: "Token decimals", value: "12" },
      { param: "Existential deposit", value: "10⁹ (1 milli-unit)" },
    ],
  },
];

export default function ReferencePage() {
  return (
    <div className="docs-content">
      <DocsPageJsonLd
        title="Reference"
        description="Complete reference for Theseus: pallet extrinsics, network parameters, runtime configuration."
        slug="reference"
      />
      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-400/35 bg-slate-500/10 text-slate-600 dark:text-slate-300 text-xs mb-4">
          <BookOpen className="h-3 w-3" />
          Reference
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">
          Runtime reference
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          Pallets, extrinsics, and network parameters as configured at alpha.
          Authoritative source — taken directly from the runtime.
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="info" title="Versioning">
          These values are accurate for the current preview build. The runtime
          is upgraded forklessly via governance, so individual parameters can
          change between releases. Status changes are announced on{" "}
          <a href="/docs/status" className="text-indigo-700 dark:text-indigo-300 hover:underline no-underline">
            Status &amp; Roadmap
          </a>
          .
        </Callout>

        {/* Pallets */}
        <section className="mb-12 mt-8">
          <h2 id="pallets" className="text-2xl font-medium mb-4">
            Pallets
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Theseus is built on Substrate. The runtime composes several
            Theseus-specific FRAME pallets alongside standard ones (balances,
            transaction_payment, timestamp, aura, grandpa). The Theseus pallets
            decouple inference verification from the higher-level callers via
            the OnInferenceVerified hook on pallet_aivm.
          </p>

          <div className="space-y-3">
            {palletRoles.map((p) => (
              <div key={p.name} className="docs-card">
                <h3 className="font-mono text-base text-indigo-700 dark:text-indigo-300 mb-1">
                  {p.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {p.role}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Extrinsics */}
        <section className="mb-12">
          <h2 id="extrinsics" className="text-2xl font-medium mb-4">
            Extrinsics
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The minimal set of extrinsics exposed to users, agent deployers,
            provers, and the registered enclave operator. Caller column shows
            who can submit each extrinsic.
          </p>

          <div className="overflow-x-auto">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Pallet</th>
                  <th>Extrinsic</th>
                  <th>Description</th>
                  <th>Caller</th>
                </tr>
              </thead>
              <tbody>
                {extrinsics.map((e) => (
                  <tr key={`${e.pallet}.${e.name}`}>
                    <td className="font-mono text-xs text-slate-600 dark:text-slate-400">
                      {e.pallet}
                    </td>
                    <td className="font-mono text-xs font-medium text-slate-900 dark:text-white">
                      {e.name}
                    </td>
                    <td className="text-gray-600 dark:text-gray-400 text-sm">
                      {e.desc}
                    </td>
                    <td className="text-sm text-slate-600 dark:text-gray-500">{e.caller}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Network parameters */}
        <section className="mb-12">
          <h2 id="parameters" className="text-2xl font-medium mb-4">
            Network parameters
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Configured limits and constants from the alpha runtime. Use these
            when sizing agent designs and estimating job throughput.
          </p>

          <div className="overflow-x-auto">
            <table className="docs-table">
              <thead>
                <tr>
                  <th className="w-32">Category</th>
                  <th>Parameter</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {networkParams.flatMap((cat) =>
                  cat.rows.map((row, i) => (
                    <tr key={`${cat.category}-${row.param}`}>
                      <td className="font-medium text-slate-900 dark:text-white">
                        {i === 0 ? cat.category : ""}
                      </td>
                      <td className="text-gray-600 dark:text-gray-400 text-sm">
                        {row.param}
                      </td>
                      <td className="font-mono text-xs text-slate-700 dark:text-slate-300">
                        {row.value}
                      </td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Cryptographic primitives */}
        <section className="mb-12">
          <h2 id="cryptography" className="text-2xl font-medium mb-4">
            Cryptographic primitives
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Theseus uses BLS12-381 for proof verification on-chain. Tensor
            Commits compose these into a single succinct proof per inference.
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              {
                name: "BLS12-381",
                desc: "Pairing-friendly elliptic curve. Used for KZG commitment verification on-chain via a native host function.",
              },
              {
                name: "KZG (tiled, multivariate)",
                desc: "Polynomial commitment scheme. Tensors are tiled and committed using a product-power Structured Reference String.",
              },
              {
                name: "Sumcheck (Fiat–Shamir)",
                desc: "Verifies linear operations (matrix multiplications) over committed tensors. Made non-interactive via Fiat–Shamir.",
              },
              {
                name: "Plookup-style lookups",
                desc: "Proofs for nonlinear activations (GELU, SiLU, ReLU, softmax/exp) against precomputed tables.",
              },
              {
                name: "VRF",
                desc: "Verifiable random function used to assign provers to inference jobs without manipulation.",
              },
              {
                name: "Aura + GRANDPA",
                desc: "Block production (Aura, slot-based round-robin) and BFT finality (GRANDPA, ≥2/3 agreement).",
              },
            ].map((c) => (
              <div key={c.name} className="docs-card">
                <h3 className="font-medium text-slate-900 dark:text-white mb-1">
                  {c.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <PrevNext current="reference" />
    </div>
  );
}
