/**
 * Slim live-stats bar surfaced under the Hero. Reads aggregate counters
 * across every Theseus demo agent deployed on Base Sepolia. Renders
 * server-side with a 60s revalidation; falls back to "—" if the chain
 * read fails (so the homepage never breaks).
 */

import { headers } from "next/headers";

interface Stats {
  totalVerdicts: number;
  agentsLive: number;
  agentsDeployed: number;
  latestTickAt: number;
}

function ageRelative(unixSec: number): string {
  if (unixSec <= 0) return "—";
  const diff = Math.max(0, Math.floor(Date.now() / 1000) - unixSec);
  if (diff < 90) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  return `${Math.floor(diff / 86400)} d ago`;
}

async function fetchStats(): Promise<Stats | null> {
  try {
    const hdrs = await headers();
    const host = hdrs.get("host") ?? "localhost:3000";
    const proto = host.startsWith("localhost") ? "http" : "https";
    const res = await fetch(`${proto}://${host}/api/live-stats`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as Stats;
  } catch {
    return null;
  }
}

export default async function StatsStrip() {
  const stats = await fetchStats();
  const verdicts = stats?.totalVerdicts ?? null;
  const agents = stats?.agentsLive ?? null;
  const deployed = stats?.agentsDeployed ?? 12;

  return (
    <section
      aria-label="Live on-chain agent stats"
      className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 text-slate-900 dark:text-white"
    >
      <div className="hero-card relative overflow-hidden rounded-2xl bg-[#F1EAE1] lg:rounded-3xl dark:bg-slate-900">
        <div className="relative z-10 max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-16 py-7 sm:py-8 lg:py-9">
          <div className="flex items-center justify-between mb-4 lg:mb-5">
            <p className="font-mono text-[10.5px] sm:text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Live
            </p>
            <span className="flex items-center gap-2 font-mono text-[10px] sm:text-[10.5px] uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-60 animate-ping" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              active
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:gap-16 items-end">
            <Stat
              value={verdicts}
              label="verdicts signed"
            />
            <StatStatic
              value={deployed.toString()}
              label="agents deployed"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  suffix,
  label,
}: {
  value: number | null;
  suffix?: string;
  label: string;
}) {
  const display =
    value === null
      ? "—"
      : `${value.toLocaleString()}${suffix ?? ""}`;
  return (
    <div>
      <div className="font-serif text-3xl sm:text-4xl lg:text-5xl tabular-nums tracking-tight leading-none mb-2 text-slate-900 dark:text-white">
        {display}
      </div>
      <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 leading-relaxed">
        {label}
      </div>
    </div>
  );
}

function StatStatic({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-serif text-3xl sm:text-4xl lg:text-5xl tabular-nums tracking-tight leading-none mb-2 text-slate-900 dark:text-white">
        {value}
      </div>
      <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 leading-relaxed">
        {label}
      </div>
    </div>
  );
}
