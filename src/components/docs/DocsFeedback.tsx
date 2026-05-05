"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { track } from "@vercel/analytics";

export default function DocsFeedback({ slug }: { slug: string }) {
  const [voted, setVoted] = useState<"up" | "down" | null>(null);

  const handle = (value: "up" | "down") => {
    if (voted) return;
    setVoted(value);
    try {
      track("docs_feedback", { slug, value });
    } catch {}
  };

  if (voted) {
    return (
      <span className="text-slate-500 dark:text-slate-400">
        Thanks for the feedback.
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-slate-500 dark:text-slate-400">Was this helpful?</span>
      <button
        onClick={() => handle("up")}
        aria-label="Helpful"
        className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <ThumbsUp className="w-4 h-4 text-slate-500 dark:text-slate-400" />
      </button>
      <button
        onClick={() => handle("down")}
        aria-label="Not helpful"
        className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <ThumbsDown className="w-4 h-4 text-slate-500 dark:text-slate-400" />
      </button>
    </div>
  );
}
