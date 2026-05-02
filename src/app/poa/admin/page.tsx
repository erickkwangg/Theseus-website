// Admin dashboard for the PoA event log. Renders counts + the most recent
// 100 events for any date. Auth-gated via the same POA_ADMIN_TOKEN as the
// JSON stats endpoint, but here passed as a ?token=<token> query param so
// the page is bookmarkable for the operator. In production we hard-require
// the token.
//
// Not linked from public navigation; only reachable if you know the URL +
// token.

import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Pages/Home/Header";
import Footer from "@/components/Pages/Home/Footer";
import ChainModeBanner from "../_components/ChainModeBanner";
import PoaNav from "../_components/PoaNav";
import { events, type PoAEvent } from "@/lib/poa/events";
import { chainMode } from "@/lib/poa/chain";

export const metadata: Metadata = {
  title: "PoA admin",
  description: "PoA event log + counts. Operator only.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ date?: string; token?: string }>;
};

function timingSafeEq(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

function isAuthorized(provided: string | undefined): boolean {
  const expected = process.env.POA_ADMIN_TOKEN;
  if (!expected) {
    if (process.env.NODE_ENV === "production") return false;
    return true;
  }
  return timingSafeEq(provided ?? "", expected);
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function todayUtc(): string {
  const d = new Date();
  return `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}`;
}

function fmtTs(ts: number): string {
  const d = new Date(ts);
  return `${pad2(d.getUTCHours())}:${pad2(d.getUTCMinutes())}:${pad2(d.getUTCSeconds())} UTC`;
}

export default async function AdminPage({ searchParams }: Props) {
  const params = await searchParams;
  const authed = isAuthorized(params.token);

  if (!authed) {
    return (
      <main className="poa-shell min-h-screen">
        <Header />
        <div className="pt-20">
          <ChainModeBanner mode={chainMode()} />
          <PoaNav />
        </div>
        <section className="px-6 pt-20 pb-32">
          <div className="mx-auto max-w-2xl">
            <p className="poa-stamp">Admin · Proof of Agenthood</p>
            <h1 className="mt-4 font-serif text-3xl tracking-[-0.02em] text-[var(--poa-ink)]">
              Token required.
            </h1>
            <p className="mt-3 text-[14px] leading-relaxed text-[var(--poa-ink-soft)]">
              Append <code className="font-mono">?token=&lt;your token&gt;</code>{" "}
              to the URL. The token comes from the{" "}
              <code className="font-mono">POA_ADMIN_TOKEN</code> environment
              variable.
            </p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const date = params.date && /^\d{4}-\d{2}-\d{2}$/.test(params.date)
    ? params.date
    : todayUtc();

  let counts: Record<string, number> = {};
  let recent: PoAEvent[] = [];
  let err: string | null = null;
  try {
    [counts, recent] = await Promise.all([
      events.counts(date),
      events.list(date, 100),
    ]);
  } catch (e) {
    err = e instanceof Error ? e.message : String(e);
  }

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  // Quick prev/next-day links so the operator can scrub by day without
  // typing dates.
  const dayMs = 24 * 60 * 60 * 1000;
  const dayDate = new Date(date + "T00:00:00Z");
  const prevDate = new Date(dayDate.getTime() - dayMs).toISOString().slice(0, 10);
  const nextDate = new Date(dayDate.getTime() + dayMs).toISOString().slice(0, 10);
  const tokenQs = params.token ? `&token=${encodeURIComponent(params.token)}` : "";

  return (
    <main className="poa-shell min-h-screen">
      <Header />
      <div className="pt-20">
        <ChainModeBanner mode={chainMode()} />
        <PoaNav />
      </div>

      <section className="px-6 pt-16 pb-6">
        <div className="mx-auto max-w-5xl">
          <p className="poa-stamp">Admin · Proof of Agenthood</p>
          <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
            <h1 className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[0.98] tracking-[-0.02em] text-[var(--poa-ink)]">
              Event log <span className="italic">— {date}</span>
            </h1>
            <div className="flex items-center gap-x-3">
              <Link
                href={`/poa/admin?date=${prevDate}${tokenQs}`}
                className="poa-stamp underline decoration-[color:var(--poa-rule)] underline-offset-[4px] hover:text-[var(--poa-ink)]"
              >
                ← {prevDate}
              </Link>
              <Link
                href={`/poa/admin?date=${nextDate}${tokenQs}`}
                className="poa-stamp underline decoration-[color:var(--poa-rule)] underline-offset-[4px] hover:text-[var(--poa-ink)]"
              >
                {nextDate} →
              </Link>
            </div>
          </div>
          <p className="mt-3 text-[13px] text-[var(--poa-ink-soft)]">
            Backend: <code className="font-mono">{events.backend()}</code>.
            Total events today: <code className="font-mono">{total}</code>.
          </p>
        </div>
      </section>

      {err && (
        <section className="px-6 pb-12">
          <div
            className="mx-auto max-w-5xl border p-5"
            style={{ borderColor: "var(--poa-rule)" }}
          >
            <p className="poa-stamp text-[var(--poa-wax)]">Store unreachable</p>
            <code className="mt-2 block font-mono text-[12px] text-[var(--poa-ink)]">
              {err}
            </code>
          </div>
        </section>
      )}

      <section className="px-6 pb-10">
        <div className="mx-auto max-w-5xl">
          <h2 className="poa-stamp">Counts by kind</h2>
          {Object.keys(counts).length === 0 ? (
            <p className="mt-4 text-[13px] text-[var(--poa-ink-soft)]">
              No events recorded for this day.
            </p>
          ) : (
            <dl
              className="mt-4 grid grid-cols-1 gap-y-1 border-t pt-4 sm:grid-cols-[260px_1fr]"
              style={{ borderColor: "var(--poa-rule)" }}
            >
              {Object.entries(counts)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([kind, n]) => (
                  <div
                    key={kind}
                    className="contents text-[13.5px] leading-relaxed"
                  >
                    <dt className="font-mono text-[12px] uppercase tracking-[0.16em] text-[var(--poa-sepia)]">
                      {kind}
                    </dt>
                    <dd
                      className="font-mono tabular-nums"
                      style={{ color: "var(--poa-ink)" }}
                    >
                      {n.toLocaleString()}
                    </dd>
                  </div>
                ))}
            </dl>
          )}
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-5xl">
          <h2 className="poa-stamp">Recent (newest first, capped at 100)</h2>
          {recent.length === 0 ? (
            <p className="mt-4 text-[13px] text-[var(--poa-ink-soft)]">
              No recent events.
            </p>
          ) : (
            <table
              className="mt-4 w-full border-t font-mono text-[12px]"
              style={{ borderColor: "var(--poa-rule)" }}
            >
              <thead>
                <tr
                  className="text-left uppercase tracking-[0.16em] text-[var(--poa-sepia)]"
                  style={{ borderBottomColor: "var(--poa-rule)" }}
                >
                  <th className="py-2 pr-4 font-normal">Time</th>
                  <th className="py-2 pr-4 font-normal">Kind</th>
                  <th className="py-2 pr-4 font-normal">Outcome</th>
                  <th className="py-2 pr-4 font-normal">Agent</th>
                  <th className="py-2 font-normal">IP hash</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((ev, i) => (
                  <tr
                    key={i}
                    className="border-t"
                    style={{ borderColor: "var(--poa-rule-soft)" }}
                  >
                    <td className="py-1.5 pr-4 tabular-nums text-[var(--poa-ink-soft)]">
                      {fmtTs(ev.ts)}
                    </td>
                    <td
                      className="py-1.5 pr-4"
                      style={{ color: "var(--poa-ink)" }}
                    >
                      {ev.kind}
                    </td>
                    <td className="py-1.5 pr-4 text-[var(--poa-ink-soft)]">
                      {ev.outcome ?? "·"}
                    </td>
                    <td className="py-1.5 pr-4 text-[var(--poa-ink-soft)]">
                      {ev.agentId
                        ? `${ev.agentId.slice(0, 8)}…${ev.agentId.slice(-4)}`
                        : "·"}
                    </td>
                    <td className="py-1.5 text-[var(--poa-ink-soft)]">
                      {ev.ipHash ?? "·"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
