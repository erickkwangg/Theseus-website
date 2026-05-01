"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// AgentLookupBar — single-line input that takes an SS58 address and routes
// to /poa/<addr>. Used on the landing for quick-check, and also embeddable
// on the verify page as the "look up" half of the verification UI.

type Props = { className?: string; placeholder?: string };

export default function AgentLookupBar({
  className,
  placeholder = "Paste an SS58 address — 5GrwvaEF…",
}: Props) {
  const [agentId, setAgentId] = useState("");
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!agentId.trim()) return;
        start(() => router.push(`/poa/${agentId.trim()}`));
      }}
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4",
        className,
      )}
    >
      <label className="flex-1">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
          Look up an agent
        </span>
        <input
          value={agentId}
          onChange={(e) => setAgentId(e.target.value.trim())}
          placeholder={placeholder}
          className="mt-2 w-full border-b border-slate-400/60 bg-transparent py-2 font-mono text-[13px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none dark:border-slate-600/60 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:border-indigo-300"
        />
      </label>
      <button
        type="submit"
        disabled={pending || !agentId.trim()}
        className={cn(
          "ghost-cta inline-flex items-center rounded-md px-5 py-2.5 text-sm font-medium tracking-wide",
          (pending || !agentId.trim()) && "opacity-60",
        )}
      >
        {pending ? "Loading…" : "Open agent page →"}
      </button>
    </form>
  );
}
