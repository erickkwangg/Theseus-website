"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  label?: string;
  className?: string;
};

export default function CopyButton({ value, label, className }: Props) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      if (typeof navigator === "undefined" || !navigator.clipboard) {
        throw new Error("clipboard unavailable");
      }
      await navigator.clipboard.writeText(value);
      setState("copied");
      setTimeout(() => setState("idle"), 1400);
    } catch {
      setState("failed");
      setTimeout(() => setState("idle"), 1400);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${label ?? "value"}`}
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded border px-1.5 py-0.5",
        "font-mono text-[10px] uppercase tracking-[0.16em] transition-colors",
        state === "copied"
          ? "border-indigo-400/60 bg-indigo-500/10 text-indigo-700 dark:border-indigo-300/40 dark:bg-indigo-400/10 dark:text-indigo-300"
          : state === "failed"
            ? "border-rose-400/60 bg-rose-500/10 text-rose-700 dark:border-rose-300/40 dark:bg-rose-400/10 dark:text-rose-300"
            : "border-slate-300/70 text-slate-500 hover:border-slate-500/60 hover:text-slate-800 dark:border-slate-700/55 dark:text-slate-400 dark:hover:text-slate-100",
        className,
      )}
    >
      {state === "copied" ? "copied" : state === "failed" ? "failed" : "copy"}
    </button>
  );
}
