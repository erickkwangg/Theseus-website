"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { CommitmentSurface } from "@/lib/poa/types";

/**
 * SigningRecord: the headline trust block on every PoA profile.
 *
 * Reads the agent's deployed commitment surface and renders the live
 * verdict count plus first/latest activity. This is the "Made N
 * decisions" artifact that makes a freshly-deployed agent worth
 * sharing — it's the agent's record, not a generic credential.
 *
 * Polls /api/agent-activity every 30s while mounted. Falls back to
 * "no decisions yet" while the count is 0 (rather than hiding the
 * record entirely), so the page still tells the story for a brand-new
 * agent.
 */

type Props = {
  commitmentSurface: CommitmentSurface;
  agentName: string;
};

type Activity = {
  count: number;
  latestAt?: number;
  firstAt?: number;
};

function relTime(unixSec: number | undefined): string | null {
  if (!unixSec) return null;
  const diff = Math.max(0, Math.floor(Date.now() / 1000) - unixSec);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  return `${Math.floor(diff / 86400)} d ago`;
}

function shortAddr(addr: string): string {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export default function SigningRecord({
  commitmentSurface,
  agentName,
}: Props) {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function pull() {
      try {
        const url = `/api/agent-activity?address=${commitmentSurface.address}&countFn=${encodeURIComponent(commitmentSurface.countFn)}`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as Activity;
        if (cancelled) return;
        setActivity(data);
        setLoaded(true);
      } catch {
        if (!cancelled) setLoaded(true);
      }
    }
    void pull();
    const id = setInterval(pull, 30_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [commitmentSurface.address, commitmentSurface.countFn]);

  const count = activity?.count ?? null;
  const headline =
    count === null
      ? "—"
      : count === 0
        ? "No decisions yet"
        : `${count.toLocaleString()} ${count === 1 ? "decision" : "decisions"}`;
  const sub =
    count === null
      ? loaded
        ? "Could not reach chain"
        : "Reading chain…"
      : count === 0
        ? `${agentName} is registered. The first time it signs a verdict it lands here.`
        : `${agentName} has signed and committed this many verdicts to ${commitmentSurface.chainName}.`;

  const latestRel = relTime(activity?.latestAt);
  const firstRel = relTime(activity?.firstAt);

  return (
    <section
      className="mx-auto mt-10 max-w-[920px] border-t pt-9 print:hidden"
      style={{ borderColor: "var(--poa-rule)" }}
      id="signing-record"
      aria-label="Live signing record"
    >
      <header className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <div>
          <p className="poa-stamp">Signing record · live</p>
          <h2 className="mt-1 font-serif text-2xl text-[var(--poa-ink)]">
            Every decision this agent makes is signed and posted to chain.
          </h2>
        </div>
        <Link
          href={`${commitmentSurface.explorerAddressUrl}${commitmentSurface.address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="poa-stamp underline decoration-[color:var(--poa-rule)] underline-offset-[4px] transition-colors hover:text-[var(--poa-ink)] hover:decoration-[color:var(--poa-ink)]"
        >
          {shortAddr(commitmentSurface.address)} ↗
        </Link>
      </header>

      <div className="poa-playground grid gap-x-10 gap-y-6 px-6 py-7 sm:grid-cols-[1fr_1fr] sm:px-8 sm:py-8">
        <div>
          <p className="poa-stamp mb-3">Verdicts signed</p>
          <div
            className={`font-serif tabular-nums leading-none text-[var(--poa-ink)] ${
              count !== null && count > 0
                ? "text-5xl sm:text-6xl"
                : "text-3xl sm:text-4xl"
            }`}
          >
            {headline}
          </div>
          <p className="mt-3 text-[12.5px] leading-relaxed text-[var(--poa-ink-soft)]">
            {sub}
          </p>
        </div>

        <div
          className="sm:border-l sm:pl-10"
          style={{ borderColor: "var(--poa-rule)" }}
        >
          <p className="poa-stamp mb-3">Timing</p>
          <dl className="space-y-2.5 text-[13px] leading-relaxed text-[var(--poa-ink)]">
            <Row
              label="Latest verdict"
              value={latestRel}
              fallback={count === 0 ? "—" : "Older than recorded"}
            />
            <Row
              label="First verdict"
              value={firstRel}
              fallback={count === 0 ? "—" : "Older than recorded"}
            />
            <Row label="Chain" value={commitmentSurface.chainName} />
          </dl>
          <p className="mt-4 text-[12px] leading-relaxed text-[var(--poa-ink-soft)]">
            Counts refresh every 30 seconds while this page is open.
          </p>
        </div>
      </div>
    </section>
  );
}

function Row({
  label,
  value,
  fallback,
}: {
  label: string;
  value?: string | null;
  fallback?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--poa-ink-soft)]">
        {label}
      </dt>
      <dd className="tabular-nums text-[var(--poa-ink)]">
        {value ?? fallback ?? "—"}
      </dd>
    </div>
  );
}
