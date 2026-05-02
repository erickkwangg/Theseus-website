// PoaTooltip: a tiny inline disclosure for technical terms. Server-render-
// safe: uses native <details> with a tooltip-flavored summary. No JS, no
// state. Click to reveal a short plain-language explanation.

import { cn } from "@/lib/utils";

type Props = {
  term: string;
  children: React.ReactNode; // the explanation
  className?: string;
};

export default function PoaTooltip({ term, children, className }: Props) {
  return (
    <details className={cn("group inline-block align-baseline", className)}>
      <summary
        className={cn(
          "cursor-help list-none border-b border-dotted border-slate-400/50 dark:border-slate-500/50",
          "hover:border-indigo-500/70 dark:hover:border-indigo-300/70",
        )}
      >
        {term}
      </summary>
      <span
        role="tooltip"
        className="mt-1 block max-w-xs border border-slate-300/70 bg-white/95 p-2 text-[12px] leading-relaxed text-slate-700 shadow-sm dark:border-slate-700/55 dark:bg-slate-900/95 dark:text-slate-200"
      >
        {children}
      </span>
    </details>
  );
}
