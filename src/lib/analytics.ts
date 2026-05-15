// Shared Vercel Analytics wrapper. Mirrors the PoA-scoped version
// (src/app/poa/_components/analytics.ts) so any component can fire
// custom events without re-importing @vercel/analytics directly.
//
// Event-naming convention: "<surface>.<area>.<action>", lowercase
// snake_case parts. Examples:
//   home.hero.cta_clicked
//   home.markets.tile_clicked
//   home.compare.viewed
//   blog.article.scroll_50
//   docs.page.viewed

import { track as vercelTrack } from "@vercel/analytics";

type Props = Record<string, string | number | boolean | null>;

export function track(event: string, props?: Props): void {
  try {
    if (typeof window === "undefined") return;
    vercelTrack(event, props);
  } catch {
    // analytics failures must not break user flows
  }
}
