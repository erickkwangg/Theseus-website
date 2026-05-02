"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// AgentLookupBar: single-line input that takes an agent address (SS58) and routes
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
  placeholder = "Paste an agent address. 5GrwvaEF…",
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
          <span className="poa-stamp">Look up an agent</span>
        )}
        <input
          value={agentId}
          onChange={(e) => setAgentId(e.target.value.trim())}
          placeholder={placeholder}
          autoFocus={autoFocus}
          style={{
            borderColor: "var(--poa-rule, rgba(20,17,13,0.20))",
            color: "var(--poa-ink, #14110D)",
          }}
          className={cn(
            "w-full border-b bg-transparent placeholder:text-[color:var(--poa-sepia,#8A7864)] focus:border-[color:var(--poa-ink,#14110D)] focus:outline-none",
            showLabel ? "mt-2" : "",
            isProminent
              ? "py-3 font-mono text-[16px] sm:text-[18px]"
              : "py-2 font-mono text-[13px]",
          )}
        />
      </label>
      <button
        type="submit"
        disabled={pending || !agentId.trim()}
        className={cn(
          "cta-ink inline-flex items-center font-medium tracking-wide",
          isProminent ? "px-7 py-3.5 text-base" : "px-5 py-2.5 text-sm",
          (pending || !agentId.trim()) && "opacity-60",
        )}
      >
        {pending ? "Loading…" : isProminent ? "Open →" : "Open agent page →"}
      </button>
    </form>
  );
}
