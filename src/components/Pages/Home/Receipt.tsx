"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type Row = {
  n: string;
  k: string;
  v: string;
  accent?: boolean;
};

const ROWS: Row[] = [
  { n: "01", k: "Run started", v: "agent.treasury_0x7a1e" },
  { n: "02", k: "Model", v: "claude-sonnet-4.5" },
  { n: "03", k: "Reasoning verified", v: "proof ok", accent: true },
  { n: "04", k: "Plan", v: "supply 40,000 USDC to lending" },
  { n: "05", k: "Mandate check", v: "within 250k / run cap" },
  { n: "06", k: "Sent", v: "40,000 USDC → 0xb91…f24", accent: true },
  { n: "07", k: "Finalized", v: "block #2,841,402" },
];

const ROW_STAGGER_MS = 320;

export default function Receipt({ className }: { className?: string }) {
  const ref = useRef<HTMLElement | null>(null);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStarted(true);
      setDone(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setStarted(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const total = ROW_STAGGER_MS * ROWS.length + 200;
    const t = window.setTimeout(() => setDone(true), total);
    return () => window.clearTimeout(t);
  }, [started]);

  return (
    <aside
      ref={ref}
      aria-label="Example agent run receipt"
      className={cn(
        "receipt rounded-sm border border-slate-300/70 bg-white/60 backdrop-blur-[2px]",
        "dark:border-slate-700/55 dark:bg-slate-900/40",
        started && "is-in",
        done && "is-done",
        className,
      )}
    >
      <header className="flex items-center justify-between border-b border-slate-300/70 px-4 py-3 sm:px-5 dark:border-slate-700/55">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-700 dark:text-slate-200">
          receipt · 0x7a1e…09d3
        </span>
        <span className="font-mono text-[10.5px] tabular-nums text-slate-500 dark:text-slate-400">
          block #2,841,402
        </span>
      </header>

      <div className="px-1.5 py-1 sm:px-2.5">
        {ROWS.map((r, i) => (
          <div
            key={r.n}
            className="receipt-row grid grid-cols-[28px_minmax(0,1fr)] items-baseline gap-x-3 gap-y-0.5 border-b border-slate-200/70 px-2.5 py-2.5 last:border-b-0 sm:grid-cols-[28px_minmax(110px,auto)_minmax(0,1fr)] sm:gap-x-4 sm:py-3 dark:border-slate-700/40"
            style={{ animationDelay: `${i * ROW_STAGGER_MS}ms` }}
          >
            <span className="font-mono text-[10.5px] tabular-nums text-slate-400 dark:text-slate-500">
              {r.n}
            </span>
            <span
              className={cn(
                "font-mono text-[12px] sm:text-[12.5px]",
                r.accent
                  ? "text-indigo-600 dark:text-indigo-300"
                  : "text-slate-800 dark:text-slate-100",
              )}
            >
              {r.k}
            </span>
            <span className="col-start-2 font-mono text-[12px] text-slate-500 break-words sm:col-start-3 sm:text-right sm:text-[12.5px] dark:text-slate-400">
              {r.v}
            </span>
          </div>
        ))}
      </div>

      <footer className="flex items-center justify-between border-t border-slate-300/70 px-4 py-3 sm:px-5 dark:border-slate-700/55">
        <span className="receipt-foot-final flex items-center gap-2 font-mono text-[11px] tracking-[0.06em]">
          <span
            aria-hidden
            className="grid h-4 w-4 place-items-center rounded-full bg-indigo-500/15 text-indigo-600 dark:bg-indigo-400/20 dark:text-indigo-300"
          >
            ✓
          </span>
          <span className="text-indigo-600 dark:text-indigo-300">verified</span>
        </span>
        <span className="receipt-foot-final font-mono text-[11px] text-slate-500 dark:text-slate-400">
          fee 0.004 THE
        </span>
      </footer>
    </aside>
  );
}
