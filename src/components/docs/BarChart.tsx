"use client";

import { useEffect, useRef, useState } from "react";

export type BarRow = {
  label: string;
  /** Value in the unit configured by the chart. Used to compute bar width. */
  value: number;
  /** Display string shown to the right of the bar. Defaults to value + unit. */
  display?: string;
  /** "highlight" makes Theseus stand out; "muted" for compared alternatives */
  variant?: "highlight" | "muted";
  /** Optional sub-label under the main label */
  sublabel?: string;
};

interface BarChartProps {
  rows: BarRow[];
  /** Used to compute proportional widths. Defaults to max(value) in rows. */
  max?: number;
  /** Suffix appended to display values (e.g., "%", "ms", "x"). */
  unit?: string;
  /** Use logarithmic scale for orders-of-magnitude differences. */
  log?: boolean;
  caption?: string;
}

export default function BarChart({ rows, max, unit = "", log = false, caption }: BarChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setAnimated(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setAnimated(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const dataMax = max ?? Math.max(...rows.map((r) => r.value));
  const transform = (v: number) => {
    if (!log) return (v / dataMax) * 100;
    // log10 with a small epsilon so 0 still shows a sliver
    const logMax = Math.log10(dataMax + 1);
    return (Math.log10(v + 1) / logMax) * 100;
  };

  return (
    <div ref={ref} className="my-2">
      <div className="space-y-3">
        {rows.map((r, i) => {
          const widthPct = transform(r.value);
          const isHighlight = r.variant === "highlight";
          const display = r.display ?? `${r.value}${unit}`;
          return (
            <div key={r.label} className="grid grid-cols-[12rem_1fr_auto] sm:grid-cols-[14rem_1fr_auto] gap-3 items-center">
              <div className="min-w-0">
                <div
                  className={`text-sm font-medium truncate ${
                    isHighlight
                      ? "text-indigo-700 dark:text-indigo-300"
                      : "text-slate-700 dark:text-slate-200"
                  }`}
                >
                  {r.label}
                </div>
                {r.sublabel && (
                  <div className="text-[11px] text-slate-500 dark:text-slate-500 truncate">
                    {r.sublabel}
                  </div>
                )}
              </div>
              <div className="h-7 rounded-md bg-slate-100 dark:bg-slate-800/60 overflow-hidden relative">
                <div
                  className={`h-full rounded-md transition-[width] duration-700 ease-out ${
                    isHighlight
                      ? "bg-gradient-to-r from-indigo-500 to-indigo-400 dark:from-indigo-500 dark:to-indigo-300"
                      : "bg-slate-300 dark:bg-slate-600"
                  }`}
                  style={{
                    width: animated ? `${Math.max(widthPct, 0.4)}%` : "0%",
                    transitionDelay: `${i * 90}ms`,
                  }}
                />
              </div>
              <div
                className={`text-sm font-mono tabular-nums ${
                  isHighlight
                    ? "text-indigo-700 dark:text-indigo-300 font-semibold"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                {display}
              </div>
            </div>
          );
        })}
      </div>
      {caption && (
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-500">{caption}</p>
      )}
    </div>
  );
}
