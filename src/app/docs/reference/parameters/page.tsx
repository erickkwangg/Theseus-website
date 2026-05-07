import type { Metadata } from "next";
import Link from "next/link";
import { Settings2 } from "lucide-react";
import Callout from "@/components/docs/Callout";
import { DocsPageJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Network Parameters",
  description:
    "Complete network parameters from the Theseus runtime: block, AIVM, agent, tool, model, consensus, and economics constants.",
  keywords: [
    "Theseus parameters",
    "block time",
    "AIVM limits",
    "ABG nodes",
    "job expiry",
    "seus",
    "THE token",
  ],
  alternates: { canonical: "/docs/reference/parameters" },
};

type Row = { name: string; value: string; note?: string };
type Group = { title: string; rows: Row[] };

const GROUPS: Group[] = [
  {
    title: "Block",
    rows: [
      { name: "Slot duration", value: "6 s", note: "round-robin among the validator set" },
      { name: "Block hash count", value: "2,400" },
      { name: "Max block weight", value: "2 s ref time" },
      { name: "Max block size", value: "5 MB" },
      { name: "Normal dispatch ratio", value: "75%" },
    ],
  },
  {
    title: "AIVM (inference kernel)",
    rows: [
      { name: "Max input size", value: "400 KB" },
      { name: "Max output size", value: "1 MB" },
      { name: "Job expiry", value: "600 blocks", note: "≈ 1 hour at 6s slots" },
      { name: "Max expired per block", value: "32" },
    ],
  },
  {
    title: "Agents",
    rows: [
      { name: "Max ABG nodes", value: "256", note: "per agent" },
      { name: "Max ABG node size", value: "128 KB" },
      { name: "Max system prompt", value: "10 KB" },
      { name: "Agent name length", value: "64 bytes" },
      { name: "Max input size", value: "400 KB" },
      { name: "Max state fields", value: "64" },
      { name: "Max messages per run", value: "10" },
      { name: "Max steps per run", value: "64" },
      { name: "Sync steps per tick", value: "16" },
      { name: "Max sub-agent call depth", value: "2" },
      { name: "Inference retries / node", value: "2" },
      { name: "Tool retries / node", value: "2" },
    ],
  },
  {
    title: "Tools",
    rows: [
      { name: "Max tools per agent", value: "16" },
      { name: "Max calls per message", value: "8" },
      { name: "Tool name length", value: "64 bytes" },
      { name: "Max tool arguments", value: "64 KB" },
      { name: "Max tool result size", value: "128 KB" },
      { name: "Job expiry", value: "600 blocks" },
      { name: "Max expired per block", value: "10" },
    ],
  },
  {
    title: "Models",
    rows: [{ name: "Model name length", value: "64 bytes" }],
  },
  {
    title: "Consensus",
    rows: [
      { name: "Max authorities", value: "32" },
      { name: "SS58 prefix", value: "42" },
    ],
  },
  {
    title: "Economics",
    rows: [
      { name: "Token symbol", value: "THE" },
      { name: "Token decimals", value: "12" },
      { name: "Existential deposit", value: "10⁹ (1 milli-unit)" },
    ],
  },
];

export default function ParametersPage() {
  return (
    <div className="docs-content">
      <DocsPageJsonLd
        title="Network Parameters"
        description="Complete network parameters from the Theseus runtime: block, AIVM, agent, tool, model, consensus, and economics constants."
        slug="reference/parameters"
      />

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/35 bg-indigo-500/10 text-indigo-300 text-xs mb-4">
          <Settings2 className="h-3 w-3" />
          Reference
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">
          Network Parameters
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          Constants from the runtime configuration. These are the limits an
          integrator needs to know before sizing inputs, ABG graphs, or expected
          job latencies.
        </p>
      </div>

      <Callout type="info" title="Subject to governance">
        These values are pinned at alpha and can be changed by validator-voted
        runtime upgrades (see <Link href="/docs/status" className="underline">Status &amp; Roadmap</Link>).
        Treat them as the current floor, not a permanent contract.
      </Callout>

      <div className="space-y-10 mt-8">
        {GROUPS.map((g) => (
          <section key={g.title}>
            <h2 className="text-2xl font-medium mb-4 text-slate-900 dark:text-slate-100">
              {g.title}
            </h2>
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700/60">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100/60 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700/60">
                    <th className="text-left font-medium text-slate-600 dark:text-slate-400 px-4 py-2.5 w-1/2">
                      Parameter
                    </th>
                    <th className="text-left font-medium text-slate-600 dark:text-slate-400 px-4 py-2.5">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {g.rows.map((r) => (
                    <tr
                      key={r.name}
                      className="border-b border-slate-200 dark:border-slate-800 last:border-0"
                    >
                      <td className="px-4 py-2.5 text-slate-700 dark:text-slate-300">
                        {r.name}
                      </td>
                      <td className="px-4 py-2.5 font-mono text-slate-900 dark:text-slate-100">
                        {r.value}
                        {r.note && (
                          <span className="ml-2 text-xs text-slate-500 dark:text-slate-500 font-sans italic">
                            {r.note}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>

      <Callout type="tip" title="Source">
        Compiled from the runtime configuration in pallet_aivm, pallet_agents,
        pallet_tools, pallet_models, and the consensus / balances pallets.
        Mirrors Appendix A of the Theseus Architecture &amp; Roadmap v1.0
        (April 2026).
      </Callout>
    </div>
  );
}
