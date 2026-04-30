import type { ReactNode } from "react";
import { Check, Minus, X } from "lucide-react";

type Verdict = "good" | "neutral" | "bad";

export type ComparisonRow = {
  label: string;
  /** Per-column cells. Position matches the columns array; caller decides order. */
  cells: { value: ReactNode; verdict?: Verdict; note?: string }[];
};

export type ComparisonColumn = {
  title: string;
  subtitle?: string;
  highlight?: boolean;
};

interface ComparisonGridProps {
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  caption?: string;
}

const verdictStyles: Record<Verdict, { bg: string; text: string; icon: typeof Check }> = {
  good: {
    bg: "bg-emerald-100 dark:bg-emerald-500/15",
    text: "text-emerald-700 dark:text-emerald-300",
    icon: Check,
  },
  neutral: {
    bg: "bg-slate-100 dark:bg-slate-700/40",
    text: "text-slate-500 dark:text-slate-400",
    icon: Minus,
  },
  bad: {
    bg: "bg-rose-100 dark:bg-rose-500/15",
    text: "text-rose-700 dark:text-rose-300",
    icon: X,
  },
};

export default function ComparisonGrid({ columns, rows, caption }: ComparisonGridProps) {
  const cols = columns.length;
  // grid-template: label column then N data columns
  const gridStyle = { gridTemplateColumns: `minmax(8rem, 0.9fr) repeat(${cols}, minmax(0, 1fr))` };

  return (
    <div className="my-2">
      {/* Header */}
      <div className="grid gap-px rounded-t-lg overflow-hidden ring-1 ring-slate-200 dark:ring-slate-700/60" style={gridStyle}>
        <div className="bg-slate-50 dark:bg-slate-900/60 px-3 py-3" />
        {columns.map((c) => (
          <div
            key={c.title}
            className={`px-3 py-3 ${
              c.highlight
                ? "bg-indigo-50 dark:bg-indigo-950/30"
                : "bg-slate-50 dark:bg-slate-900/60"
            }`}
          >
            <div
              className={`text-sm font-medium ${
                c.highlight
                  ? "text-indigo-700 dark:text-indigo-300"
                  : "text-slate-700 dark:text-slate-200"
              }`}
            >
              {c.title}
            </div>
            {c.subtitle && (
              <div className="text-[11px] text-slate-500 dark:text-slate-500 mt-0.5">
                {c.subtitle}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Rows */}
      <div className="rounded-b-lg overflow-hidden ring-1 ring-t-0 ring-slate-200 dark:ring-slate-700/60 border-t border-slate-200 dark:border-slate-700/60">
        {rows.map((row, rIdx) => (
          <div
            key={row.label}
            className="grid gap-px"
            style={gridStyle}
          >
            <div
              className={`px-3 py-3.5 text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider ${
                rIdx % 2 === 1 ? "bg-slate-50/60 dark:bg-slate-900/30" : "bg-white dark:bg-slate-950/40"
              }`}
            >
              {row.label}
            </div>
            {row.cells.map((cell, cIdx) => {
              const col = columns[cIdx];
              const verdict = cell.verdict ?? "neutral";
              const v = verdictStyles[verdict];
              const Icon = v.icon;
              return (
                <div
                  key={cIdx}
                  className={`px-3 py-3.5 ${
                    col?.highlight
                      ? rIdx % 2 === 1
                        ? "bg-indigo-50/60 dark:bg-indigo-950/15"
                        : "bg-indigo-50/40 dark:bg-indigo-950/10"
                      : rIdx % 2 === 1
                      ? "bg-slate-50/60 dark:bg-slate-900/30"
                      : "bg-white dark:bg-slate-950/40"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${v.bg} ${v.text}`}
                      aria-label={verdict}
                    >
                      <Icon className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    <span
                      className={`text-sm ${
                        col?.highlight
                          ? "text-slate-900 dark:text-white font-medium"
                          : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {cell.value}
                    </span>
                  </div>
                  {cell.note && (
                    <div className="ml-7 text-[11px] text-slate-500 dark:text-slate-500 mt-0.5">
                      {cell.note}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {caption && (
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-500">{caption}</p>
      )}
    </div>
  );
}
