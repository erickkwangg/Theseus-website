import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type FlowStep = {
  title: string;
  desc?: string;
  icon?: LucideIcon;
  meta?: string;
};

type Accent = "indigo" | "green" | "purple" | "amber";

const accentClasses: Record<Accent, { node: string; ring: string; text: string }> = {
  indigo: {
    node: "bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300",
    ring: "ring-indigo-300 dark:ring-indigo-500/40",
    text: "text-indigo-700 dark:text-indigo-300",
  },
  green: {
    node: "bg-green-500/10 dark:bg-green-500/20 text-green-700 dark:text-green-400",
    ring: "ring-green-300 dark:ring-green-500/40",
    text: "text-green-700 dark:text-green-400",
  },
  purple: {
    node: "bg-purple-500/10 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400",
    ring: "ring-purple-300 dark:ring-purple-500/40",
    text: "text-purple-700 dark:text-purple-300",
  },
  amber: {
    node: "bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400",
    ring: "ring-amber-300 dark:ring-amber-500/40",
    text: "text-amber-700 dark:text-amber-400",
  },
};

interface FlowDiagramProps {
  steps: FlowStep[];
  accent?: Accent;
  /** Numbered (1,2,3...) or icon-only nodes. Defaults to numbered. */
  variant?: "numbered" | "icon";
}

export default function FlowDiagram({
  steps,
  accent = "indigo",
  variant = "numbered",
}: FlowDiagramProps) {
  const a = accentClasses[accent];

  return (
    <div className="my-2">
      {/* Desktop: horizontal flow with connectors */}
      <div
        className="hidden md:grid gap-0 items-stretch"
        style={{
          gridTemplateColumns: steps
            .map((_, i) => (i === 0 ? "minmax(0, 1fr)" : "auto minmax(0, 1fr)"))
            .join(" "),
        }}
      >
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <Fragment key={`step-${i}`}>
              <div className="flex flex-col items-center text-center px-3 py-4 rounded-lg border border-slate-200 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/40 backdrop-blur">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ring-1 ${a.ring} ${a.node}`}>
                  {variant === "icon" && Icon ? (
                    <Icon className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{i + 1}</span>
                  )}
                </div>
                {s.meta && (
                  <div className={`text-[10px] font-mono uppercase tracking-[0.18em] mb-1 ${a.text}`}>
                    {s.meta}
                  </div>
                )}
                <div className="text-sm font-medium text-slate-900 dark:text-white mb-1.5 leading-snug">
                  {s.title}
                </div>
                {s.desc && (
                  <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {s.desc}
                  </div>
                )}
              </div>
              {i < steps.length - 1 && (
                <div className="flex items-center justify-center px-1">
                  <ArrowRight className="h-4 w-4 text-slate-400 dark:text-slate-600" />
                </div>
              )}
            </Fragment>
          );
        })}
      </div>

      {/* Mobile: vertical stack with down-arrows */}
      <div className="md:hidden flex flex-col">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <Fragment key={`m-step-${i}`}>
              <div className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/40">
                <div className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center ring-1 ${a.ring} ${a.node}`}>
                  {variant === "icon" && Icon ? (
                    <Icon className="h-4 w-4" />
                  ) : (
                    <span className="text-sm font-semibold">{i + 1}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  {s.meta && (
                    <div className={`text-[10px] font-mono uppercase tracking-[0.18em] mb-0.5 ${a.text}`}>
                      {s.meta}
                    </div>
                  )}
                  <div className="text-sm font-medium text-slate-900 dark:text-white leading-snug">
                    {s.title}
                  </div>
                  {s.desc && (
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {s.desc}
                    </div>
                  )}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="flex justify-center py-1.5">
                  <svg width="14" height="16" viewBox="0 0 14 16" fill="none" className="text-slate-400 dark:text-slate-600">
                    <path d="M7 0 L7 12 M2 8 L7 13 L12 8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
