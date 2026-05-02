"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// AgentLookupBar: single-line input that takes an SS58 address and routes
// to /poa/<addr>. Used on the landing for quick-check, and also embeddable
// on the verify page as the "look up" half of the verification UI.

type Props = {
  className?: string;
  placeholder?: string;
  variant?: "compact" | "prominent";
  showLabel?: boolean;
  autoFocus?: boolean;
};

export default function AgentLookupBar({
  className,
  placeholder = "Paste an SS58 address. 5GrwvaEF…",
  variant = "compact",
  showLabel = true,
  autoFocus = false,
}: Props) {
  const [agentId, setAgentId] = useState("");
  const router = useRouter();
  const [pending, start] = useTransition();

  const isProminent = variant === "prominent";

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
        {showLabel && (
          <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            Look up an agent
          </span>
        )}
        <input
          value={agentId}
          onChange={(e) => setAgentId(e.target.value.trim())}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={cn(
            "w-full border-b bg-transparent text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:border-indigo-300",
            showLabel ? "mt-2" : "",
            isProminent
              ? "border-slate-400/70 py-3 font-mono text-[16px] sm:text-[18px] dark:border-slate-600/70"
              : "border-slate-400/60 py-2 font-mono text-[13px] dark:border-slate-600/60",
          )}
        />
      </label>
      <button
        type="submit"
        disabled={pending || !agentId.trim()}
        className={cn(
          "inline-flex items-center rounded-md font-medium tracking-wide",
          isProminent
            ? "primary-cta px-7 py-3.5 text-base"
            : "ghost-cta px-5 py-2.5 text-sm",
          (pending || !agentId.trim()) && "opacity-60",
        )}
      >
        {pending ? "Loading…" : isProminent ? "Open →" : "Open agent page →"}
      </button>
    </form>
  );
}
