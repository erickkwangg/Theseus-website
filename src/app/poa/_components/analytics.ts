// Tiny wrapper around @vercel/analytics' track() that:
//   - never throws (analytics failures must not break user flows)
//   - is safe to import from server components (no-ops if window is missing)
//   - centralizes the event-name namespace under "poa." so the dashboard
//     reads as a single funnel
//
// Event naming: "poa.<surface>.<action>", lowercase snake_case parts.

import { track as vercelTrack } from "@vercel/analytics";

type Props = Record<string, string | number | boolean | null>;

export function track(event: string, props?: Props): void {
  try {
    if (typeof window === "undefined") return;
    vercelTrack(event, props);
  } catch {
    // swallow
  }
}
