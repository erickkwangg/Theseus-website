import Link from "next/link";
import type { Metadata } from "next";
import { Activity, ArrowRight, Circle, Calendar } from "lucide-react";
import Callout from "@/components/docs/Callout";
import { DocsPageJsonLd } from "@/components/JsonLd";
import PrevNext from "@/components/docs/PrevNext";

export const metadata: Metadata = {
  title: "Status & Roadmap",
  description:
    "Current network state and roadmap for Theseus: what is live, what is in private preview, and what is planned next.",
  keywords: ["Theseus status", "Theseus roadmap", "testnet", "mainnet", "preview"],
};

const phases = [
  {
    label: "Now",
    title: "Private preview",
    state: "live",
    bullets: [
      "Runtime running for invited developers.",
      "Source repository private.",
      "CLI binary distributed with preview access.",
      "Two ecosystem repositories deployed: proof-of-lobster and the-prediction-market.",
    ],
  },
  {
    label: "Next",
    title: "Public testnet",
    state: "planned",
    bullets: [
      "Public RPC endpoint and faucet.",
      "Open registration for provers and storage operators.",
      "First open SHIP examples runnable end-to-end without invite.",
      "Status numbers (block height, validator count, agents deployed) published live on this page.",
    ],
  },
  {
    label: "Later",
    title: "Source release",
    state: "planned",
    bullets: [
      "Repository opened for public review and audit.",
      "Full whitepaper and protocol spec published.",
      "Bug-bounty program live.",
    ],
  },
  {
    label: "Mainnet",
    title: "Genesis",
    state: "planned",
    bullets: [
      "Genesis block, validator selection, and emission begin.",
      "$THE distribution mechanics activated.",
      "Tokenomics page updated with finalized supply, allocation, and vesting.",
    ],
  },
];

const liveStats = [
  { label: "Validators", value: "TBD" },
  { label: "Provers", value: "TBD" },
  { label: "Agents deployed", value: "TBD" },
  { label: "Inferences served", value: "TBD" },
];

export default function StatusPage() {
  return (
    <div className="docs-content">
      <DocsPageJsonLd title="Status & Roadmap" description="Current network state and roadmap for Theseus: what is live, what is in private preview, and what is planned next." slug="status" />
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs mb-4">
          <Activity className="h-3 w-3" />
          Network
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">
          Status &amp; Roadmap
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          Where the network is right now, and what is coming next.
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="info" title="Honest preview">
          Numbers below show TBD where the public testnet has not exposed them yet. This page is updated as concrete milestones land. If you want a more specific read on timing for an evaluation, contact the team.
        </Callout>

        {/* Live network */}
        <section className="mb-12">
          <h2 id="live" className="text-2xl font-medium mb-4">Network at a glance</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            These metrics will go live with the public testnet milestone.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {liveStats.map((s) => (
              <div key={s.label} className="docs-card text-center">
                <div className="text-2xl font-light text-slate-700 dark:text-slate-300">{s.value}</div>
                <div className="text-gray-500 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section className="mb-12">
          <h2 id="roadmap" className="text-2xl font-medium mb-4 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-300">
              <Calendar className="h-5 w-5" />
            </span>
            Phases
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Theseus ships in clearly defined phases. Each phase has a concrete deliverable rather than a calendar date, since dates depend on protocol stability.
          </p>

          <div className="space-y-4">
            {phases.map((phase) => {
              const isLive = phase.state === "live";
              return (
                <div
                  key={phase.title}
                  className={`docs-card ${isLive ? "border-green-500/30 bg-green-500/5" : ""}`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`mt-1 ${
                        isLive ? "text-green-400" : "text-slate-500"
                      }`}
                    >
                      {isLive ? (
                        <Circle className="h-3.5 w-3.5 fill-current" />
                      ) : (
                        <Circle className="h-3.5 w-3.5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span
                          className={`text-xs uppercase tracking-widest ${
                            isLive ? "text-green-400" : "text-slate-500"
                          }`}
                        >
                          {phase.label}
                        </span>
                        {isLive && (
                          <span className="text-[10px] uppercase tracking-widest text-green-400 bg-green-500/10 px-2 py-0.5 rounded">
                            Live
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-medium mb-3 text-slate-900 dark:text-white">{phase.title}</h3>
                      <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
                        {phase.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2">
                            <span className="text-slate-600 mt-0.5">·</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTAs */}
        <section className="mb-12 grid sm:grid-cols-2 gap-4">
          <Link href="/launch" className="group no-underline">
            <div className="docs-card h-full border-indigo-500/30 bg-indigo-500/5 hover:border-indigo-400/60 transition-all">
              <h3 className="font-medium text-slate-900 dark:text-white group-hover:text-indigo-300 transition-colors">Want preview access?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-3">
                Skip the queue by telling us what you are building.
              </p>
              <span className="inline-flex items-center gap-1 text-sm text-indigo-300">
                Request access <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
          <Link href="/docs/faq" className="group no-underline">
            <div className="docs-card h-full hover:border-indigo-400/40 transition-all">
              <h3 className="font-medium text-slate-900 dark:text-white group-hover:text-indigo-300 transition-colors">Have a question?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-3">
                The FAQ covers latency, model size, privacy, and how this differs from peers.
              </p>
              <span className="inline-flex items-center gap-1 text-sm text-indigo-300">
                Read the FAQ <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        </section>
      </div>
      <PrevNext current="status" />

    </div>
  );
}
