"use client";

import Link from "next/link";
import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeader from "./SectionHeader";

type Stage = "Civic" | "Managed" | "Sovereign";

const stageStyles: Record<Stage, string> = {
  Civic:
    "border-amber-500/35 bg-amber-500/10 text-amber-800 dark:border-amber-300/30 dark:bg-amber-300/10 dark:text-amber-100",
  Managed:
    "border-indigo-500/35 bg-indigo-500/10 text-indigo-800 dark:border-indigo-300/30 dark:bg-indigo-300/10 dark:text-indigo-100",
  Sovereign:
    "border-slate-900/20 bg-slate-900 text-white dark:border-white/20 dark:bg-white dark:text-slate-950",
};

const stages = [
  {
    stage: "Civic" as const,
    label: "Verifiable work",
    title: "Outcomes anyone can audit.",
    description:
      "A Civic agent signs each step of its work. It does not hold funds. Its job is to make outcomes cheap to check.",
  },
  {
    stage: "Managed" as const,
    label: "Delegated execution",
    title: "Capital under signed policy.",
    description:
      "A Managed agent holds its own keys and balance but operates under a policy a controller can update. Every action by the agent and every change by the controller is signed and posted.",
  },
  {
    stage: "Sovereign" as const,
    label: "Self-running markets",
    title: "The agent becomes the counterparty.",
    description:
      "A Sovereign agent owns its policy and history. It can outlast its founders and pay for its own inference from the fees it collects.",
  },
];

type MarketTile = {
  category: string;
  title: string;
  kind: string;
  stage: keyof typeof stageStyles;
  description: string;
  demoUrl?: string;
};

const marketTiles: MarketTile[] = [
  {
    category: "Markets",
    title: "Prediction market resolver",
    kind: "Built",
    stage: "Civic",
    description:
      "When a market hits its deadline, the agent searches the live web for proof and returns a winning option with a public evidence trail.",
    demoUrl: "https://demo-agents.theseus.network/adjudicate",
  },
  {
    category: "Treasury",
    title: "DAO treasury operator",
    kind: "Existing demand",
    stage: "Managed",
    description:
      "Pays contributors and tops up reserves under a written allocation policy. Every check is signed and posted before the next vote.",
  },
  {
    category: "Funds",
    title: "On-chain sovereign fund",
    kind: "Built",
    stage: "Sovereign",
    description:
      "Owns its own USDC and WETH. Self-schedules its own rebalance ticks against a frozen mandate. No human in the loop.",
    demoUrl: "https://demo-agents.theseus.network/fund",
  },
  {
    category: "Lending",
    title: "ETH/USD oracle for Aave",
    kind: "Built",
    stage: "Civic",
    description:
      "Reads three independent venues, refuses to price when they disagree. Catches the Mango Markets pump-the-venue shape by construction.",
    demoUrl: "https://demo-agents.theseus.network/aave",
  },
  {
    category: "Stablecoins",
    title: "Algo-stable failsafe",
    kind: "Built",
    stage: "Civic",
    description:
      "Gates mint and redeem on a Terra-shaped algorithmic stablecoin. Refuses to run the mechanism into a death spiral.",
    demoUrl: "https://demo-agents.theseus.network/terra",
  },
  {
    category: "Bridges",
    title: "Cross-chain release guardian",
    kind: "Built",
    stage: "Civic",
    description:
      "Checks attestation quorum, finality lag, and validator history before allowing a destination-chain release.",
    demoUrl: "https://demo-agents.theseus.network/bridge",
  },
  {
    category: "Governance",
    title: "DAO proposal reviewer",
    kind: "Built",
    stage: "Civic",
    description:
      "Reads the proposal and its actual calldata. Flags flash-loan votes, dust-stake snipes, and hostile admin upgrades before voting opens.",
    demoUrl: "https://demo-agents.theseus.network/governance",
  },
  {
    category: "Safety",
    title: "Aircraft cert reviewer",
    kind: "Built",
    stage: "Civic",
    description:
      "Independent second opinion on aircraft type-certification changes. Built to catch the 737 MAX MCAS shape that cost 346 lives.",
    demoUrl: "https://demo-agents.theseus.network/aviation",
  },
  {
    category: "Discovery",
    title: "Launch sniper",
    kind: "Built",
    stage: "Sovereign",
    description:
      "Watches Base mainnet for fresh token launches, evaluates each one against a strict checklist, and posts paper-trade decisions on-chain.",
    demoUrl: "https://demo-agents.theseus.network/launch-sniper",
  },
  {
    category: "Your ideas",
    title: "Compose your own",
    kind: "Open surface",
    stage: "Civic",
    description:
      "Anywhere two parties need one agent to do the job, and both want proof it did it right.",
  },
];

export default function Markets() {
  const [expanded, setExpanded] = useState(false);

  const ctaTile = marketTiles[marketTiles.length - 1];
  const featuredTiles = marketTiles.slice(0, 3);
  const hiddenCount = marketTiles.length - featuredTiles.length - 1;

  const visibleTiles = expanded
    ? marketTiles
    : [...featuredTiles, ctaTile];

  return (
    <section
      className="bg-white py-14 text-slate-900 dark:bg-transparent dark:text-white sm:py-16 lg:py-20"
      id="market"
    >
      <div className="mx-auto max-w-[1700px] px-6 sm:px-12 lg:px-16">
        <SectionHeader
          label="Markets"
          number="04"
          className="mb-7 lg:mb-8"
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-14 xl:gap-20">
          <ScrollReveal>
            <div>
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-indigo-700 dark:text-indigo-300">
                Existing demand / new markets
              </p>
              <h2 className="font-serif text-4xl font-normal leading-[1.03] tracking-[-0.02em] sm:text-5xl lg:text-[clamp(3rem,4.2vw,5.35rem)]">
                Build an agent <em>with a job.</em>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg lg:pb-1">
              Verifiable automation for treasuries, keepers, funds, and
              crypto-native markets. The next turn is agents as the
              counterparties themselves.{" "}
              <Link
                href="/blog/theseus-thesis-part-2"
                className="text-indigo-700 underline underline-offset-4 transition-colors hover:text-indigo-900 dark:text-indigo-300 dark:hover:text-indigo-200"
              >
                A multi-trillion dollar market.
              </Link>
            </p>
          </ScrollReveal>
        </div>

        <div className="mt-7 lg:px-8 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {stages.map((item, index) => (
              <ScrollReveal key={item.stage} delay={index + 1}>
                <article className="h-full rounded-2xl border border-slate-200 bg-slate-50/80 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] ${stageStyles[item.stage]}`}
                  >
                    {item.stage}
                  </span>
                  <p className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    {item.label}
                  </p>
                  <h3 className="mt-4 max-w-[13rem] font-serif text-xl font-normal leading-tight tracking-[-0.01em] sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={4}>
            <div className="mt-9 lg:mt-10">
              <div className="grid grid-cols-1 overflow-hidden border border-slate-200 dark:border-white/10 sm:grid-cols-2 lg:grid-cols-3">
                {visibleTiles.map((tile) => {
                  const isCta = tile === ctaTile;
                  const ctaSpanClass = !expanded && isCta ? "lg:col-span-3" : "";
                  const tileClass = `group block min-h-[168px] border-b p-4 transition-colors sm:border-r sm:p-5 lg:[&:nth-child(3n)]:border-r-0 [&:nth-last-child(-n+1)]:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:[&:nth-last-child(-n+3)]:border-b-0 ${ctaSpanClass} ${
                    isCta
                      ? "border-indigo-500/25 bg-indigo-600 text-white hover:bg-indigo-500 dark:border-indigo-300/20 dark:bg-indigo-500/90 dark:hover:bg-indigo-500"
                      : "border-slate-200 hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/[0.04]"
                  }`;

                  const body = (
                    <>
                      <div className="flex items-start justify-between gap-4">
                        <p
                          className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
                            isCta
                              ? "text-indigo-100"
                              : "text-indigo-700 dark:text-indigo-300"
                          }`}
                        >
                          {tile.category}
                        </p>
                        {!isCta && (
                          <span
                            className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] ${stageStyles[tile.stage]}`}
                          >
                            {tile.stage}
                          </span>
                        )}
                      </div>
                      <h4
                        className={`mt-4 font-serif text-xl font-normal leading-tight tracking-[-0.01em] sm:text-2xl ${
                          isCta ? "text-white" : "text-slate-950 dark:text-white"
                        }`}
                      >
                        {tile.title}
                      </h4>
                      <div
                        className={`mt-2 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] ${
                          isCta
                            ? "text-indigo-100/80"
                            : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        <span>{tile.kind}</span>
                        {tile.demoUrl && (
                          <span
                            aria-hidden
                            className="transition-transform group-hover:translate-x-0.5 text-indigo-700 dark:text-indigo-300"
                          >
                            ↗
                          </span>
                        )}
                      </div>
                      <p
                        className={`mt-3 text-sm leading-relaxed ${
                          isCta ? "text-indigo-50" : "text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        {tile.description}
                      </p>
                      {isCta && (
                        <Link
                          href="/launch"
                          className="mt-5 inline-flex rounded-md bg-white px-4 py-2 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-50"
                        >
                          Launch an agent
                        </Link>
                      )}
                    </>
                  );

                  if (tile.demoUrl) {
                    return (
                      <a
                        key={tile.title}
                        href={tile.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={tileClass}
                      >
                        {body}
                      </a>
                    );
                  }

                  return (
                    <article key={tile.title} className={tileClass}>
                      {body}
                    </article>
                  );
                })}
              </div>

              {!expanded && (
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setExpanded(true)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-700 underline-offset-4 transition-colors hover:text-indigo-900 hover:underline dark:text-indigo-300 dark:hover:text-indigo-200"
                  >
                    Show {hiddenCount} more
                    <span aria-hidden>→</span>
                  </button>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
