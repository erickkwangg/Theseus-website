"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

type Props = {
  event: string;
  /** Optional event payload props. */
  data?: Record<string, string | number | boolean | null>;
  /** Intersection threshold (0-1). Default 0.5. */
  threshold?: number;
  /** If false, fires every time element enters viewport. Default true (fire once). */
  once?: boolean;
};

/**
 * Renders an invisible 1px sentinel that fires a Vercel Analytics event
 * the first time it crosses into the viewport. Useful for "did the user
 * actually reach this section" signals without changing the surrounding
 * server-rendered DOM.
 *
 * Place near the top of a section for a "viewed" signal, or near the
 * bottom for a "scrolled through" / "read to end" signal.
 */
export default function TrackOnVisible({
  event,
  data,
  threshold = 0.5,
  once = true,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (once && fired.current) return;
          fired.current = true;
          track(event, data);
          if (once) observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [event, data, threshold, once]);

  return <span ref={ref} aria-hidden className="block h-px w-px" />;
}
