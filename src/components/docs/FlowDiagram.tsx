"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type FlowStep = {
  title: string;
  desc?: string;
  icon?: LucideIcon;
  meta?: string;
};

type Accent = "indigo" | "green" | "purple" | "amber";

const accentClasses: Record<Accent, { node: string; ring: string; text: string; arrow: string }> = {
  indigo: {
    node: "bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300",
    ring: "ring-indigo-300 dark:ring-indigo-500/40",
    text: "text-indigo-700 dark:text-indigo-300",
    arrow: "text-indigo-400 dark:text-indigo-500",
  },
  green: {
    node: "bg-green-500/10 dark:bg-green-500/20 text-green-700 dark:text-green-400",
    ring: "ring-green-300 dark:ring-green-500/40",
    text: "text-green-700 dark:text-green-400",
    arrow: "text-green-400 dark:text-green-500",
  },
  purple: {
    node: "bg-purple-500/10 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400",
    ring: "ring-purple-300 dark:ring-purple-500/40",
    text: "text-purple-700 dark:text-purple-300",
    arrow: "text-purple-400 dark:text-purple-500",
  },
  amber: {
    node: "bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400",
    ring: "ring-amber-300 dark:ring-amber-500/40",
    text: "text-amber-700 dark:text-amber-400",
    arrow: "text-amber-400 dark:text-amber-500",
  },
};

interface FlowDiagramProps {
  steps: FlowStep[];
  accent?: Accent;
  /** Numbered (1,2,3...) or icon-only nodes. Defaults to numbered. */
  variant?: "numbered" | "icon";
}

const STEP_DELAY_MS = 220;

export default function FlowDiagram({
  steps,
  accent = "indigo",
  variant = "numbered",
}: FlowDiagramProps) {
  const a = accentClasses[accent];
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeUntil, setActiveUntil] = useState(-1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setActiveUntil(steps.length);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && activeUntil === -1) {
            steps.forEach((_, i) => {
              setTimeout(() => setActiveUntil(i), i * STEP_DELAY_MS);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [steps, activeUntil]);

  const isStepActive = (i: number) => i <= activeUntil;
  const isArrowActive = (i: number) => i < activeUntil;

  return (
    <div ref={containerRef} className="my-2">
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
          const active = isStepActive(i);
          return (
            <Fragment key={`step-${i}`}>
              <div
                className="flex flex-col items-center text-center px-3 py-4 rounded-lg border border-slate-200 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/40 backdrop-blur transition-all duration-500"
                style={{
                  opacity: active ? 1 : 0,
                  transform: active ? "translateY(0)" : "translateY(8px)",
                }}
              >
                <div
                  className={`relative w-10 h-10 rounded-full flex items-center justify-center mb-3 ring-1 ${a.ring} ${a.node} transition-transform duration-500`}
                  style={{ transform: active ? "scale(1)" : "scale(0.8)" }}
                >
                  {variant === "icon" && Icon ? (
                    <Icon className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{i + 1}</span>
                  )}
                  {active && i === activeUntil && i < steps.length - 1 && (
                    <span
                      className={`absolute inset-0 rounded-full ring-2 ${a.ring}`}
                      style={{ animation: "flow-pulse 1.4s ease-out 1" }}
                    />
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
                <div className="flex items-center justify-center px-1 relative">
                  <svg
                    width="40"
                    height="14"
                    viewBox="0 0 40 14"
                    fill="none"
                    className={a.arrow}
                  >
                    <path
                      d="M2 7 L34 7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray="40"
                      strokeDashoffset={isArrowActive(i) ? 0 : 40}
                      style={{ transition: "stroke-dashoffset 380ms ease-out" }}
                    />
                    <path
                      d="M30 3 L34 7 L30 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      style={{
                        opacity: isArrowActive(i) ? 1 : 0,
                        transition: "opacity 200ms ease-out 280ms",
                      }}
                    />
                  </svg>
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
          const active = isStepActive(i);
          return (
            <Fragment key={`m-step-${i}`}>
              <div
                className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/40 transition-all duration-500"
                style={{
                  opacity: active ? 1 : 0,
                  transform: active ? "translateY(0)" : "translateY(6px)",
                }}
              >
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
                  <svg
                    width="14"
                    height="20"
                    viewBox="0 0 14 20"
                    fill="none"
                    className={a.arrow}
                  >
                    <path
                      d="M7 2 L7 14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray="20"
                      strokeDashoffset={isArrowActive(i) ? 0 : 20}
                      style={{ transition: "stroke-dashoffset 380ms ease-out" }}
                    />
                    <path
                      d="M2 11 L7 16 L12 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      style={{
                        opacity: isArrowActive(i) ? 1 : 0,
                        transition: "opacity 200ms ease-out 280ms",
                      }}
                    />
                  </svg>
                </div>
              )}
            </Fragment>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes flow-pulse {
          0% {
            opacity: 0.7;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.7);
          }
        }
      `}</style>
    </div>
  );
}
