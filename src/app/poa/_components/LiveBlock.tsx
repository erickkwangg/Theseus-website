"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// LiveBlock — animated block-height ticker that briefly highlights when the
// number changes. Used in the trust strip on credential pages.
//
// Polls /poa/api/snapshot/<agentId> every 12s to refresh; in fixture mode the
// block stays static (or simulates a slow tick) so the demo feels alive.

type Props = {
  initial: number;
  agentId?: string; // when provided, polls for current block
  pollMs?: number;
  simulate?: boolean; // in fixture mode, fake-tick once every 6s for liveness
  className?: string;
};

export default function LiveBlock({
  initial,
  agentId,
  pollMs = 12000,
  simulate = false,
  className,
}: Props) {
  const [block, setBlock] = useState(initial);
  const [bumped, setBumped] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (simulate) {
      const id = setInterval(() => {
        if (cancelled) return;
        setBlock((b) => b + 1);
        setBumped(true);
        setTimeout(() => setBumped(false), 600);
      }, 6000);
      return () => {
        cancelled = true;
        clearInterval(id);
      };
    }
    if (!agentId) return;
    const tick = async () => {
      try {
        const res = await fetch(`/poa/api/snapshot/${agentId}`);
        if (!res.ok) return;
        const data = (await res.json()) as {
          snapshot?: { snapshotAtBlock?: number };
        };
        const next = data.snapshot?.snapshotAtBlock;
        if (cancelled || typeof next !== "number") return;
        setBlock((prev) => {
          if (next > prev) {
            setBumped(true);
            setTimeout(() => setBumped(false), 600);
          }
          return next;
        });
      } catch {
        // ignore — the banner already conveys chain reachability
      }
    };
    const id = setInterval(tick, pollMs);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [agentId, pollMs, simulate]);

  return (
    <span
      className={cn(
        "font-mono tabular-nums transition-colors duration-500",
        bumped
          ? "text-indigo-700 dark:text-indigo-300"
          : "text-indigo-700/80 dark:text-indigo-300/80",
        className,
      )}
    >
      block {block.toLocaleString()}
    </span>
  );
}
