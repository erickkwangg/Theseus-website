"use client";

import { useEffect, useState } from "react";

// Client-side dismiss wrapper for the fixture-mode banner. Stores the
// dismissed state in sessionStorage so the banner stays gone for the rest
// of the tab's life but reappears in a new session (a reminder that you're
// looking at fixture data).

const KEY = "poa-fixture-banner-dismissed";

export default function FixtureBannerClient() {
  // Default to "shown" until we read sessionStorage. Avoids a flash of
  // "no banner" then "banner" on hydration.
  const [hidden, setHidden] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    try {
      if (sessionStorage.getItem(KEY) === "1") setHidden(true);
    } catch {
      // private mode, etc.
    }
  }, []);

  if (hidden) return null;

  return (
    <div
      role="status"
      className="border-y border-amber-400/40 bg-amber-50/60 dark:border-amber-500/30 dark:bg-amber-500/5"
    >
      <div className="mx-auto flex max-w-[1700px] flex-wrap items-center gap-x-4 gap-y-1 px-6 py-2 sm:px-12 lg:px-16">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">
          fixture mode
        </span>
        <span className="text-[12.5px] text-amber-800 dark:text-amber-200">
          Chain is mocked with three demo agents. Set{" "}
          <code className="font-mono">THESEUS_RPC_URL</code> to read from a
          Theseus node.
        </span>
        {hydrated && (
          <button
            type="button"
            onClick={() => {
              setHidden(true);
              try {
                sessionStorage.setItem(KEY, "1");
              } catch {
                // ignore
              }
            }}
            aria-label="Dismiss fixture-mode banner for this session"
            className="ml-auto font-mono text-[10.5px] uppercase tracking-[0.18em] text-amber-700/80 hover:text-amber-900 dark:text-amber-300/80 dark:hover:text-amber-100"
          >
            dismiss
          </button>
        )}
      </div>
    </div>
  );
}
