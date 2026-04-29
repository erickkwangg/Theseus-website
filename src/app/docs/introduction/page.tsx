import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Cpu, GitBranch, Coins, Users, Shield } from "lucide-react";
import Callout from "@/components/docs/Callout";
import { DocsPageJsonLd } from "@/components/JsonLd";
import PrevNext from "@/components/docs/PrevNext";

export const metadata: Metadata = {
  title: "Introduction",
  description:
    "An open runtime where AI agents hold their own keys, balance, and state. Theseus is a Layer-1 chain with AI execution and verification as the primary developer surface.",
  keywords: [
    "Theseus",
    "AI agents",
    "agent runtime",
    "verifiable inference",
    "Layer 1",
  ],
  alternates: { canonical: "/docs/introduction" },
};

export default function IntroductionPage() {
  return (
    <div className="docs-content">
      <DocsPageJsonLd
        title="Introduction"
        description="An open runtime where AI agents hold their own keys, balance, and state. Theseus is a Layer-1 chain with AI execution and verification as the primary developer surface."
        slug="introduction"
      />
      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/35 bg-indigo-500/10 text-indigo-300 text-xs mb-4">
          Getting Started
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">
          Introduction to Theseus
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          An open runtime where AI agents hold their own keys, balance, and state.
          <span className="block text-base text-slate-500 mt-2">
            Theseus is a Layer-1 chain. AI execution and verification are the primary developer surface.
          </span>
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        {/* Opening Section */}
        <section className="mb-12">
          <h2 id="what-theseus-does" className="text-2xl font-medium mb-4">
            The agent owns itself.
          </h2>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Today&apos;s AI agents run inside companies. They borrow keys, balances,
            and identity from whoever hosts them. The host can pause them, change
            their rules, or shut them down.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
            On Theseus, the agent holds those things directly. Operators run its code
            but can&apos;t modify its keys, balance, or state. The runtime is what
            makes that stick — you trust it, not whoever happens to be running it.
          </p>
        </section>

        {/* Core Components */}
        <section className="mb-12">
          <h2 id="how-it-works" className="text-2xl font-medium mb-3">
            How it works
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            Three primitives make agent-as-principal possible: a tensor-native VM
            for executing inference, succinct cryptographic proofs that the
            inference ran honestly, and a native asset agents can hold and spend
            without a human signing for them.
          </p>

          <div className="grid gap-4">
            <div className="docs-card group">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-300 shrink-0">
                  <Cpu className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2 group-hover:text-indigo-300 transition-colors">
                    AIVM — the runtime
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    A tensor-native VM where models and agents register, autonomy
                    policies are enforced, and agents call models through deterministic
                    execution paths. SHIP, the agent DSL, compiles to AIVM bytecode.
                  </p>
                  <Link
                    href="/docs/aivm"
                    className="inline-flex items-center gap-1 text-sm text-indigo-300 mt-3 no-underline hover:underline"
                  >
                    Read about AIVM <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="docs-card group">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
                  <GitBranch className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2 group-hover:text-purple-400 transition-colors">
                    Tensor Commits — the proof
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    Succinct proofs of inference, with under 1% generation overhead.
                    Terkle Trees generalize Merkle Trees to tensors, so any deep
                    learning model&apos;s execution can be checked in milliseconds.
                  </p>
                  <Link
                    href="/docs/tensor-commits"
                    className="inline-flex items-center gap-1 text-sm text-purple-400 mt-3 no-underline hover:underline"
                  >
                    Read about Tensor Commits <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="docs-card group">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-yellow-500/10 text-yellow-400 shrink-0">
                  <Coins className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2 group-hover:text-yellow-400 transition-colors">
                    $THE — the asset agents hold
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    Balances live inside agent code, not in human-owned wallets.
                    Agents pay for their own inference, receive fees directly, and
                    transact with other agents without a human in the loop.
                  </p>
                  <Link
                    href="/docs/tokenomics"
                    className="inline-flex items-center gap-1 text-sm text-yellow-400 mt-3 no-underline hover:underline"
                  >
                    Read tokenomics <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Agent Tiers */}
        <section className="mb-12">
          <h2
            id="agency-tiers"
            className="text-2xl font-medium mb-4 flex items-center gap-3"
          >
            <span className="p-1.5 rounded-lg bg-green-500/10 text-green-400">
              <Users className="h-5 w-5" />
            </span>
            Three tiers of control
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            Agents on Theseus sit on a spectrum from fully managed by a human key
            to fully self-directed. Different applications want different tiers.
          </p>

          <div className="overflow-x-auto">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Control</th>
                  <th>Purpose</th>
                  <th>Concrete example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium text-slate-900 dark:text-white">Managed Agent</td>
                  <td>Human-owned key</td>
                  <td>Runs by itself, returns value to its owner</td>
                  <td className="text-gray-500">A trading agent that runs strategies on its own and routes profits to the owner&apos;s address. The controller key can pause it.</td>
                </tr>
                <tr>
                  <td className="font-medium text-slate-900 dark:text-white">Civic Agent</td>
                  <td>Fully autonomous</td>
                  <td>Public-good work with transparent reasoning</td>
                  <td className="text-gray-500">A prediction-market resolver that decides outcomes via inference and posts the verifiable reasoning on-chain. See <Link href="/docs/examples#market" className="text-indigo-300 hover:underline no-underline">the-prediction-market example</Link>.</td>
                </tr>
                <tr>
                  <td className="font-medium text-slate-900 dark:text-white">Sovereign Agent</td>
                  <td>Self-directed</td>
                  <td>Owns its policy, balance, and history</td>
                  <td className="text-gray-500">An agent that holds its own balance, pays for its own inference, and decides when to act based on on-chain triggers. The agent becomes the counterparty.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Design Principles */}
        <section className="mb-12">
          <h2
            id="principles"
            className="text-2xl font-medium mb-4 flex items-center gap-3"
          >
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
              <Shield className="h-5 w-5" />
            </span>
            Design principles
          </h2>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              {
                title: "Decentralization first",
                desc: "No single node can finalize state. Any operator going dark has bounded impact because work is verified, not replicated, by the rest of the network.",
              },
              {
                title: "Autonomous execution",
                desc: "Agents run on a schedule, react to events, and initiate transactions themselves. Nothing in the protocol requires a human key path.",
              },
              {
                title: "Tensor-aware runtime",
                desc: "Inference is a first-class state transition. Tensor opcodes are part of the VM, not a hosted side service.",
              },
              {
                title: "Verifiable inference",
                desc: "Every model call produces a Tensor Commit any node can check in milliseconds. Less than 1% proof-generation overhead.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-4 bg-slate-100/80 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-800 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-2 w-2 rounded-full bg-indigo-300 shrink-0" />
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    {item.title}
                  </span>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed pl-4">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Insight */}
        <section className="mb-12">
          <h2 id="key-insight" className="text-2xl font-medium mb-4">
            What changes
          </h2>

          <Callout type="info" title="Agents act on their own">
            Ethereum smart contracts only run when someone with a private key sends
            a transaction. Theseus agents run on a schedule, evaluate conditions,
            and initiate transactions directly from on-chain state. They control
            their own $THE balance and execution logic without a human signing for
            them.
          </Callout>

          <div className="flex gap-3 mt-6">
            <Link
              href="/docs/comparison"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg transition-all text-sm font-medium no-underline"
            >
              Theseus vs. Ethereum
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
      <PrevNext current="introduction" />

    </div>
  );
}
