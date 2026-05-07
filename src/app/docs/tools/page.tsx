import Link from "next/link";
import type { Metadata } from "next";
import {
  Wrench,
  Lock,
  Globe,
  Workflow,
  Bot,
  ShieldCheck,
} from "lucide-react";
import Callout from "@/components/docs/Callout";
import { DocsPageJsonLd } from "@/components/JsonLd";
import PrevNext from "@/components/docs/PrevNext";

export const metadata: Metadata = {
  title: "Tools & the Blessed Enclave",
  description:
    "How agents act on the outside world: on-chain tools that execute deterministically, off-chain tools that run inside a trusted enclave, and the credential model that protects API keys.",
  keywords: [
    "Theseus tools",
    "blessed enclave",
    "TEE",
    "agent credentials",
    "x402 payments",
    "web search",
    "authenticated HTTP",
    "agent x402",
  ],
  alternates: { canonical: "/docs/tools" },
};

export default function ToolsPage() {
  return (
    <div className="docs-content">
      <DocsPageJsonLd
        title="Tools & the Blessed Enclave"
        description="On-chain tools, off-chain tools, the blessed enclave, and the credential model."
        slug="tools"
      />

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/35 bg-indigo-500/10 text-indigo-300 text-xs mb-4">
          <Wrench className="h-3 w-3" />
          System
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">
          Tools &amp; the Blessed Enclave
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          How agents act on the outside world without breaking the
          chain&rsquo;s determinism.
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="tip" title="In one paragraph">
          Agents need to interact with the world — search the web, call
          APIs, hold credentials. Blockchains are deterministic state
          machines with no native ability to make HTTP requests or manage
          secrets. Theseus splits the surface: on-chain tools (token ops)
          run directly in the runtime as deterministic state transitions;
          off-chain tools (web search, authenticated HTTP) are delegated
          to a trusted execution environment — the{" "}
          <em>blessed enclave</em> — that holds the chain&rsquo;s key.
        </Callout>
        <ul className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-1.5 mb-10 ml-5 list-disc">
          <li>
            <strong>On-chain tools</strong> execute deterministically and
            need no special trust assumptions.
          </li>
          <li>
            <strong>Off-chain tools</strong> follow the same async pattern
            as inference: <code>ToolCallQueued</code> →{" "}
            <code>submit_tool_result</code>, gated to the registered
            enclave identity.
          </li>
          <li>
            <strong>Credentials are encrypted</strong> with the chain&rsquo;s
            public key on-chain; only the enclave can decrypt them, only
            inside the TEE.
          </li>
          <li>
            <strong>Tool jobs expire after 600 blocks</strong> (~1 hour) so
            agents can retry or take an alternative path.
          </li>
        </ul>

        {/* Tool inventory */}
        <section className="mb-12">
          <h2 id="tool-inventory" className="text-2xl font-medium mb-6">
            Tool inventory
          </h2>
          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700/60">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100/60 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700/60">
                  <th className="text-left font-medium text-slate-600 dark:text-slate-400 px-4 py-2.5">
                    Tool
                  </th>
                  <th className="text-left font-medium text-slate-600 dark:text-slate-400 px-4 py-2.5">
                    Execution
                  </th>
                  <th className="text-left font-medium text-slate-600 dark:text-slate-400 px-4 py-2.5">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Buy / sell tokens",
                    "On-chain",
                    "Trade any bridged token via Layer0 integration.",
                  ],
                  [
                    "Web search",
                    "Blessed enclave",
                    "Search the web via SearXNG. Returns structured results.",
                  ],
                  [
                    "Authenticated HTTP",
                    "Blessed enclave",
                    "Call external APIs using the agent's encrypted credentials.",
                  ],
                  [
                    "x402 payments",
                    "Blessed enclave",
                    "Pay for premium content / APIs via x402 protocol. Planned for Beta.",
                  ],
                ].map(([tool, exec, desc]) => (
                  <tr
                    key={tool}
                    className="border-b border-slate-200 dark:border-slate-800 last:border-0 align-top"
                  >
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300 whitespace-nowrap">
                      {tool}
                    </td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300 whitespace-nowrap">
                      {exec}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400 leading-relaxed">
                      {desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
            On-chain tools execute deterministically in the runtime —
            they&rsquo;re regular state transitions and require no special
            trust assumptions. Off-chain tools follow the same async
            pattern as inference: <code>pallet_tools</code> emits a{" "}
            <code>ToolCallQueued</code> event, an off-chain executor (the
            enclave) performs the work, and the result comes back via{" "}
            <code>submit_tool_result</code>. Tool jobs that go unfulfilled
            expire after 600 blocks (~1 hour at 6-second block times).
          </p>
        </section>

        {/* Blessed enclave */}
        <section className="mb-12">
          <h2
            id="blessed-enclave"
            className="text-2xl font-medium mb-6 flex items-center gap-3"
          >
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-300">
              <Lock className="h-5 w-5" />
            </span>
            The blessed enclave
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            The most sensitive off-chain component in the system: a trusted
            execution environment (TEE) that holds the chain&rsquo;s
            private key. The key serves a dual purpose. It decrypts agent
            credentials stored on-chain, and it identifies the enclave as
            the sole authorized executor of off-chain tool calls. The chain
            accepts <code>submit_tool_result</code> only from this
            enclave&rsquo;s identity, so no other entity can inject tool
            results into agent execution flows.
          </p>

          <h3 className="text-lg font-medium mt-6 mb-3 text-slate-900 dark:text-slate-100">
            Credential lifecycle
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            Designed so credentials are never visible in plaintext outside
            the TEE.
          </p>
          <ol className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed list-decimal ml-6 mb-6">
            <li>
              The user encrypts API keys with the chain&rsquo;s public key
              and stores the ciphertext on-chain (alongside agent metadata).
            </li>
            <li>
              When the agent reaches a tool call requiring those
              credentials, <code>pallet_tools</code> emits{" "}
              <code>ToolCallQueued</code> with the encrypted blob.
            </li>
            <li>
              The enclave decrypts inside the TEE, executes the HTTP call
              to the external API.
            </li>
            <li>
              The response is captured, cleaned, and submitted back via{" "}
              <code>submit_tool_result</code>. Plaintext credentials never
              leave the TEE.
            </li>
          </ol>

          <Callout type="warning" title="Single-operator trust at alpha">
            A single Theseus-operated enclave is the sole trusted executor
            at alpha. If the TEE were compromised, all agent credentials
            stored on-chain could potentially be decrypted. The mitigation
            is progressive decentralization: Beta introduces multi-party
            attestation across multiple independent operators, and mainnet
            targets a fully decentralized enclave network where no single
            party holds the complete key. See{" "}
            <Link href="/docs/security" className="underline">
              Security Model
            </Link>
            .
          </Callout>
        </section>

        {/* Credential evolution */}
        <section className="mb-12">
          <h2
            id="credential-evolution"
            className="text-2xl font-medium mb-6 flex items-center gap-3"
          >
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-300">
              <ShieldCheck className="h-5 w-5" />
            </span>
            Credential model evolution
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            The credential model evolves across deployment phases, moving
            from user-managed credentials toward full agent sovereignty.
          </p>
          <div className="space-y-4">
            <div className="docs-card border-amber-900/40">
              <h3 className="text-base font-medium mb-2 text-slate-900 dark:text-slate-100">
                Alpha — User-provided
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                The user encrypts API keys with the chain public key,
                stores the ciphertext on-chain. A single enclave decrypts.
                Workable for a small set of operators.
              </p>
            </div>
            <div className="docs-card border-indigo-900/50">
              <h3 className="text-base font-medium mb-2 text-slate-900 dark:text-slate-100">
                Beta — Agent-created
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Agents create their own accounts with external services.
                Multiple enclaves with mutual attestation. The user is no
                longer the credential bottleneck.
              </p>
            </div>
            <div className="docs-card border-green-900/50">
              <h3 className="text-base font-medium mb-2 text-slate-900 dark:text-slate-100">
                Mainnet — Self-sovereign
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Decentralized enclave network. Agents are fully self-
                sovereign — no single party can access credentials.
                Compromising any one operator gives nothing.
              </p>
            </div>
          </div>
        </section>

        {/* Why this split */}
        <section className="mb-12">
          <h2 id="why" className="text-2xl font-medium mb-4">
            Why split the surface this way
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            On-chain code can&rsquo;t make HTTP requests, can&rsquo;t hold
            secrets, and must be deterministic across every validator.
            Off-chain components can do all three but have no native trust.
            The split keeps the chain deterministic while letting agents
            actually act on real-world information.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="docs-card">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
                <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  On-chain, deterministic
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                Token operations, contract calls, anything the runtime can
                execute identically across all validators.
              </p>
            </div>
            <div className="docs-card">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
                <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Off-chain, enclave-only
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                Web fetches, authenticated HTTP, payment rails. Anything
                non-deterministic or credential-bound runs only inside the
                TEE, gated to the enclave&rsquo;s on-chain identity.
              </p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="border-t border-slate-200 dark:border-gray-800 pt-8 grid sm:grid-cols-2 gap-4">
          <Link href="/docs/agents" className="group no-underline">
            <div className="docs-card h-full flex items-start gap-3">
              <Bot className="h-5 w-5 text-gray-500 group-hover:text-indigo-300 transition-colors shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium group-hover:text-indigo-300 transition-colors">
                  ← Agents
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Where tools fit in the lifecycle.
                </p>
              </div>
            </div>
          </Link>
          <Link href="/docs/data-availability" className="group no-underline">
            <div className="docs-card h-full flex items-start gap-3">
              <Workflow className="h-5 w-5 text-gray-500 group-hover:text-indigo-300 transition-colors shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium group-hover:text-indigo-300 transition-colors">
                  Data Availability →
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  How off-chain data integrity is enforced.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <PrevNext current="tools" />
    </div>
  );
}
