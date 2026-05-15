"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

type Props = {
  /** Article slug, sent as a property of the tracking event. */
  slug: string;
};

const MILESTONES = [25, 50, 75, 100] as const;

/**
 * Fires blog.article.scroll_<pct> events as the reader scrolls past
 * 25/50/75/100% of the article body. Each milestone fires once per
 * page load. Used to estimate read-through rates for blog posts.
 *
 * Renders nothing; expects to be placed right before the article
 * content, and uses the visual scroll position relative to its
 * containing <article>.
 */
export default function ScrollMilestones({ slug }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const fired = useRef<Set<number>>(new Set());

  useEffect(() => {
    track("blog.article.opened", { slug });
  }, [slug]);

  useEffect(() => {
    const sentinel = ref.current;
    if (!sentinel) return;
    const article = sentinel.closest("article");
    if (!article) return;

    function onScroll() {
      const rect = article!.getBoundingClientRect();
      const articleTop = rect.top + window.scrollY;
      const articleHeight = article!.scrollHeight;
      const viewportBottom = window.scrollY + window.innerHeight;
      const readPx = Math.max(0, viewportBottom - articleTop);
      const pct = Math.min(100, (readPx / articleHeight) * 100);
      for (const milestone of MILESTONES) {
        if (pct >= milestone && !fired.current.has(milestone)) {
          fired.current.add(milestone);
          track(`blog.article.scroll_${milestone}`, { slug });
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  return <div ref={ref} aria-hidden className="hidden" />;
}
