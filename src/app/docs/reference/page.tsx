import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, Settings2, FileCode, Terminal, List } from "lucide-react";
import Callout from "@/components/docs/Callout";
import { DocsPageJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Reference",
  description:
    "Lookup surface for Theseus: network parameters, runtime pallets, extrinsics, and glossary. The pages a developer reaches for when integrating against the chain.",
  keywords: [
    "Theseus reference",
    "Substrate pallets",
    "extrinsics",
    "network parameters",
    "FRAME",
  ],
  alternates: { canonical: "/docs/reference" },
};

const ENTRIES = [
  {
    href: "/docs/reference/parameters",
    icon: Settings2,
    title: "Network Parameters",
    blurb:
      "Block, AIVM, agent, tool, and economics constants from the runtime. Block time, max ABG nodes, job expiry, the gas formula — the numbers an integrator needs to size a deployment.",
  },
  {
    href: "/docs/reference/pallets",
    icon: FileCode,
    title: "Runtime Pallets",
    blurb:
      "What each pallet does and how they compose: pallet_aivm (verification kernel), pallet_models, pallet_agents, pallet_tools, pallet_store, pallet_ship, plus standard FRAME pallets.",
  },
  {
    href: "/docs/reference/extrinsics",
    icon: Terminal,
    title: "Extrinsics",
    blurb:
      "Public extrinsics by pallet, with caller permissions. The transaction surface a wallet, indexer, or off-chain agent runner needs to talk to the chain.",
  },
  {
    href: "/docs/glossary",
    icon: List,
    title: "Glossary",
    blurb:
      "Definitions for ABG, AKG, KZG, seus, SHIP, sovereign agent, blessed enclave, and the rest of the vocabulary that shows up across the docs.",
  },
];

export default function ReferenceIndexPage() {
  return (
    <div className="docs-content">
      <DocsPageJsonLd
        title="Reference"
        description="Lookup surface for Theseus: network parameters, runtime pallets, extrinsics, and glossary."
        slug="reference"
      />

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/35 bg-indigo-500/10 text-indigo-300 text-xs mb-4">
          <BookOpen className="h-3 w-3" />
          Reference
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">
          Reference
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          The lookup surface. Numbers, pallet shapes, and extrinsic signatures —
          the pages you reach for when integrating, not the pages that explain
          why.
        </p>
      </div>

      <Callout type="info" title="Source">
        These pages mirror the Theseus Architecture &amp; Roadmap (v1.0, April 2026).
        Numbers and pallet definitions come from the runtime; the conceptual pages
        in <Link href="/docs/architecture" className="underline">Architecture</Link>{" "}
        and <Link href="/docs/aivm" className="underline">AIVM</Link> explain the
        why behind them.
      </Callout>

      <div className="grid gap-4 mt-8">
        {ENTRIES.map((e) => {
          const Icon = e.icon;
          return (
            <Link
              key={e.href}
              href={e.href}
              className="docs-card group flex items-start gap-4 hover:border-indigo-400/50 transition-colors"
            >
              <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-300 shrink-0">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <h2 className="text-lg font-medium text-slate-900 dark:text-slate-100 group-hover:text-indigo-300">
                    {e.title}
                  </h2>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-300 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {e.blurb}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
