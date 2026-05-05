"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Belief = {
  number: string;
  title: string;
  description: string;
  link?: { href: string; label: string };
};

const BELIEFS: Belief[] = [
  {
    number: "01",
    title: "Agents should be verifiable.",
    description:
      "If an agent moves money, settles a market, or makes a decision, anyone should be able to check which model was used, what it observed, and what actions it took.",
    link: { href: "/poa", label: "Proof of Agenthood: signed credentials anyone can verify" },
  },
  {
    number: "02",
    title: "Agents should be able to act.",
    description:
      "Smart contracts only operate when a human approves a transaction. Theseus agents run on a schedule, respond to events, and start the next step on their own.",
  },
  {
    number: "03",
    title: "Agents should hold their own state.",
    description:
      "Identity, balance, policy, and memory exist in the runtime, not on a private server that the operator can shut down or change.",
  },
  {
    number: "04",
    title: "Agents should work between strangers.",
    description:
      "Two parties should be able to rely on the same agent without trusting the entity that runs it. The receipt is what they both verify.",
  },
];

const STAGGER_MS = 220;
const TRANSITION_MS = 600;

export default function BeliefsList() {
  const ref = useRef<HTMLUListElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setRevealed(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ul
      ref={ref}
      className="border-t border-slate-300/60 dark:border-slate-700/55"
    >
      {BELIEFS.map((belief, index) => (
        <li
          key={belief.number}
          className={cn(
            "border-b border-slate-300/60 will-change-[opacity,transform] motion-safe:transition-[opacity,transform] dark:border-slate-700/55",
            revealed
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6",
          )}
          style={{
            transitionDuration: `${TRANSITION_MS}ms`,
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            transitionDelay: revealed ? `${index * STAGGER_MS}ms` : "0ms",
          }}
        >
          <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 py-8 lg:grid-cols-[36px_minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-x-8 lg:py-7">
            <span className="font-mono tabular-nums text-[11px] tracking-[0.22em] text-slate-500 pt-2 lg:pt-1.5 dark:text-slate-500">
              {belief.number}
            </span>
            <h3 className="font-serif text-2xl font-normal leading-[1.08] tracking-[-0.015em] sm:text-3xl lg:text-[1.75rem] xl:text-[1.95rem]">
              {belief.title}
            </h3>
            <div className="col-start-2 max-w-[34rem] lg:col-start-3">
              <p className="text-base leading-relaxed text-slate-600 lg:text-[15px] lg:leading-relaxed dark:text-slate-300">
                {belief.description}
              </p>
              {belief.link && (
                <Link
                  href={belief.link.href}
                  className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-indigo-700 underline decoration-indigo-300/60 underline-offset-4 transition-colors hover:text-indigo-900 hover:decoration-indigo-700 dark:text-indigo-300 dark:decoration-indigo-300/40 dark:hover:text-white dark:hover:decoration-indigo-300"
                >
                  {belief.link.label} &rarr;
                </Link>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
