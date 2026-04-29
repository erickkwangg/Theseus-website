import Link from "next/link";
import type { Metadata } from "next";
import { Activity, ArrowRight, Circle, CheckCircle2 } from "lucide-react";
import Callout from "@/components/docs/Callout";
import { DocsPageJsonLd } from "@/components/JsonLd";
import PrevNext from "@/components/docs/PrevNext";

export const metadata: Metadata = {
  title: "Status & Roadmap",
  description:
    "Where Theseus is right now and what comes next. Three phases (Alpha → Beta → Mainnet) with concrete transition criteria.",
  keywords: ["Theseus status", "Theseus roadmap", "testnet", "mainnet", "preview", "decentralization"],
};

type Phase = {
  label: string;
  state: "live" | "next" | "later";
  title: string;
  summary: string;
  config: Array<{ k: string; v: string }>;
  transition?: string[];
};

const phases: Phase[] = [
  {
    label: "Phase 1",
    state: "live",
    title: "Alpha mainnet",
    summary:
      "Real value, controlled operator set. Validates the protocol end-to-end while limiting blast radius.",
    config: [
      { k: "Validators", v: "4 (1 Theseus + 3 external)" },
      { k: "Provers", v: "1 full (TensorCommitments) + 2 lite (signature-only)" },
      { k: "Gas", v: "seus, USD-denominated, buy-only with frxUSD" },
      { k: "Bridge", v: "Layer0, any token" },
      { k: "Tools", v: "On-chain token ops + enclave-mediated web search / HTTP" },
      { k: "Credentials", v: "User-provided, single blessed enclave" },
      { k: "Governance", v: "Validator vote + delegation, automatic upgrades" },
      { k: "$THE token", v: "Not at genesis" },
    ],
  },
  {
    label: "Phase 2",
    state: "next",
    title: "Beta",
    summary:
      "Open the operator set, introduce the $THE token, harden enclaves with multi-party attestation.",
    config: [
      { k: "Provers", v: "Open registration with $THE staking and slashing" },
      { k: "Validators", v: "Open registration with economic security" },
      { k: "Enclaves", v: "Multi-party attestation (≥2 independent operators)" },
      { k: "Credentials", v: "Agent-created accounts with external services" },
      { k: "Governance", v: "$THE-weighted voting on certain proposal types" },
    ],
    transition: [
      "Staking and slashing pallets deployed and tested on testnet.",
      "$THE token economics finalized and audited.",
      "Multi-party TEE attestation protocol proven with ≥2 independent enclave operators.",
      "Open prover registration functional with capacity registry and VRF assignment.",
      "Governance upgraded to support $THE-weighted proposals.",
    ],
  },
  {
    label: "Phase 3",
    state: "later",
    title: "Mainnet",
    summary:
      "Fully decentralized target state. Every inference cryptographically verified, decentralized enclave network, community governance.",
    config: [
      { k: "Provers", v: "Full TensorCommitment verification on all provers" },
      { k: "Lite provers", v: "Phased out — signature-only no longer accepted" },
      { k: "Enclaves", v: "Decentralized network (no single party holds the key)" },
      { k: "Governance", v: "Community proposals, token-weighted voting, longer deliberation" },
      { k: "$THE token", v: "Used for staking across all roles" },
    ],
    transition: [
      "TensorCommitment verification running on all active provers.",
      "Decentralized enclave network operational with ≥3 independent operators and mutual attestation.",
      "Governance framework supporting community proposals tested over ≥2 upgrade cycles.",
      "Staking economics proven: validator/prover set stable under open registration for ≥3 months.",
    ],
  },
];

const decentralizationMatrix: Array<{
  dim: string;
  alpha: string;
  beta: string;
  mainnet: string;
}> = [
  {
    dim: "TEE / Enclave",
    alpha: "Single Theseus-operated",
    beta: "Multi-party attestation",
    mainnet: "Decentralized network",
  },
  {
    dim: "Provers",
    alpha: "1 full + 2 lite",
    beta: "Open with $THE staking",
    mainnet: "Full verification on all",
  },
  {
    dim: "Validators",
    alpha: "4 (controlled set)",
    beta: "Open with economic security",
    mainnet: "Fully open set",
  },
  {
    dim: "Governance",
    alpha: "Validator vote + delegation",
    beta: "$THE-weighted voting",
    mainnet: "Community governance",
  },
  {
    dim: "Credentials",
    alpha: "User-provided",
    beta: "Agent-created",
    mainnet: "Fully self-sovereign",
  },
  {
    dim: "Verification",
    alpha: "KZG + signature (mixed)",
    beta: "Progressive KZG rollout",
    mainnet: "Full TensorCommitments",
  },
];

const liveStats = [
  { label: "Validators", value: "4" },
  { label: "Provers", value: "1 full · 2 lite" },
  { label: "Agents deployed", value: "TBD" },
  { label: "Inferences served", value: "TBD" },
];

export default function StatusPage() {
  return (
    <div className="docs-content">
      <DocsPageJsonLd
        title="Status & Roadmap"
        description="Where Theseus is right now and what comes next. Three phases (Alpha → Beta → Mainnet) with concrete transition criteria."
        slug="status"
      />
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs mb-4">
          <Activity className="h-3 w-3" />
          Network
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">
          Status &amp; Roadmap
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          Three phases with concrete transition criteria. Each phase ships
          when its criteria land — not on a fixed calendar.
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="info" title="Honest preview">
          Alpha trade-offs are explicit, bounded, and listed. The path off
          each one — multi-party enclaves, full verification, open
          registration, community governance — is in the Beta and Mainnet
          criteria below.
        </Callout>

        {/* Live network */}
        <section className="mb-12 mt-8">
          <h2 id="live" className="text-2xl font-medium mb-4">
            Network at a glance
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Alpha mainnet, currently running. Live counters land with the
            public testnet milestone.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {liveStats.map((s) => (
              <div key={s.label} className="docs-card text-center">
                <div className="text-2xl font-light text-slate-700 dark:text-slate-300">
                  {s.value}
                </div>
                <div className="text-gray-500 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Phases */}
        <section className="mb-12">
          <h2 id="phases" className="text-2xl font-medium mb-4">
            Phases
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Progressive decentralization across operator sets, verification
            modes, and governance. Each phase has explicit{" "}
            <strong className="text-slate-700 dark:text-slate-300">transition criteria</strong> —
            measurable conditions that must be met before moving forward.
          </p>

          <div className="space-y-6">
            {phases.map((phase) => {
              const isLive = phase.state === "live";
              return (
                <div
                  key={phase.title}
                  className={`docs-card ${
                    isLive ? "border-green-500/30 bg-green-500/5" : ""
                  }`}
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
                      <h3 className="text-lg font-medium mb-2 text-slate-900 dark:text-white">
                        {phase.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        {phase.summary}
                      </p>

                      <div className="rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50 p-3 mb-4">
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 mb-2">
                          Configuration
                        </p>
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                          {phase.config.map((c) => (
                            <div
                              key={c.k}
                              className="flex flex-col sm:flex-row sm:gap-2"
                            >
                              <dt className="text-slate-500 sm:min-w-[110px]">
                                {c.k}
                              </dt>
                              <dd className="text-gray-700 dark:text-gray-300">
                                {c.v}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>

                      {phase.transition && (
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 mb-2">
                            Transition criteria (to enter this phase)
                          </p>
                          <ul className="space-y-1.5 text-sm">
                            {phase.transition.map((t) => (
                              <li
                                key={t}
                                className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5 text-slate-400 mt-0.5 shrink-0" />
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Decentralization matrix */}
        <section className="mb-12">
          <h2 id="matrix" className="text-2xl font-medium mb-4">
            Progressive decentralization matrix
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Decentralization isn&apos;t a single switch. Each dimension below
            evolves on its own schedule, gated by the transition criteria
            above.
          </p>

          <div className="overflow-x-auto">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Dimension</th>
                  <th>Alpha</th>
                  <th>Beta</th>
                  <th>Mainnet</th>
                </tr>
              </thead>
              <tbody>
                {decentralizationMatrix.map((row) => (
                  <tr key={row.dim}>
                    <td className="font-medium text-slate-900 dark:text-white">
                      {row.dim}
                    </td>
                    <td className="text-sm text-gray-600 dark:text-gray-400">
                      {row.alpha}
                    </td>
                    <td className="text-sm text-gray-600 dark:text-gray-400">
                      {row.beta}
                    </td>
                    <td className="text-sm text-gray-600 dark:text-gray-400">
                      {row.mainnet}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTAs */}
        <section className="mb-12 grid sm:grid-cols-2 gap-4">
          <Link href="/launch" className="group no-underline">
            <div className="docs-card h-full border-indigo-500/30 bg-indigo-500/5 hover:border-indigo-400/60 transition-all">
              <h3 className="font-medium text-slate-900 dark:text-white group-hover:text-indigo-300 transition-colors">
                Want preview access?
              </h3>
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
              <h3 className="font-medium text-slate-900 dark:text-white group-hover:text-indigo-300 transition-colors">
                Have a question?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-3">
                The FAQ covers latency, model size, privacy, and how this differs
                from peers.
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
