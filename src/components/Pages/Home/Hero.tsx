"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "./Header";
import LiveActivityLog from "./LiveActivityLog";
import SectionHeader from "./SectionHeader";
import { EXTERNAL_LINKS } from "@/config/links";

const ROTATING_WORDS = ["Verified.", "Autonomous.", "Sovereign."];
const TYPE_MS = 85;
const DELETE_MS = 40;
const HOLD_MS = 1800;

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [typed, setTyped] = useState(ROTATING_WORDS[0]);
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("holding");

  useEffect(() => {
    const word = ROTATING_WORDS[wordIndex];

    if (phase === "typing") {
      if (typed.length < word.length) {
        const t = setTimeout(
          () => setTyped(word.slice(0, typed.length + 1)),
          TYPE_MS,
        );
        return () => clearTimeout(t);
      }
      setPhase("holding");
      return;
    }

    if (phase === "holding") {
      const t = setTimeout(() => setPhase("deleting"), HOLD_MS);
      return () => clearTimeout(t);
    }

    if (typed.length > 0) {
      const t = setTimeout(
        () => setTyped(word.slice(0, typed.length - 1)),
        DELETE_MS,
      );
      return () => clearTimeout(t);
    }

    setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    setPhase("typing");
  }, [typed, phase, wordIndex]);

  return (
    <section className="bg-white px-2 sm:px-3 lg:px-4 pt-20 lg:pt-24 pb-2 sm:pb-3 lg:pb-4 text-slate-900 dark:bg-transparent dark:text-white">
      <Header />

      <div className="hero-card relative min-h-[480px] sm:min-h-[600px] max-h-[1000px] overflow-hidden rounded-2xl bg-[#F1EAE1] lg:rounded-3xl dark:bg-slate-900">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 soft-grid [mask-image:linear-gradient(to_bottom,black,black_72%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black,black_72%,transparent)]"
        />

        <div className="relative z-10 max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-16 py-12 lg:py-16">
          <div className="grid lg:grid-cols-[1.7fr_1fr] gap-12 lg:gap-20 items-start">
            <div>
              <SectionHeader
                label="Theseus Network"
                number="00"
                className="mb-10 lg:mb-14"
              />

              <h1 className="font-serif text-5xl sm:text-7xl lg:text-[clamp(4.5rem,7vw,9rem)] font-normal tracking-[-0.02em] leading-[1.02] text-slate-900 dark:text-white">
                Agents that can be
                <br />
                <span className="italic">{typed}</span>
                <span
                  aria-hidden
                  className="inline-block align-baseline w-[0.06em] h-[0.82em] ml-[0.05em] -mb-[0.04em] bg-current cursor-blink"
                />
              </h1>

              <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-x-6 gap-y-5 sm:gap-x-10">
                <Link
                  href="/launch"
                  className="primary-cta inline-flex items-center rounded-md px-8 py-4 text-base font-medium tracking-wide"
                >
                  Launch on Theseus
                </Link>
                <a
                  href={EXTERNAL_LINKS.substackEvolution}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-medium text-slate-800 dark:text-slate-100 underline underline-offset-[6px] decoration-slate-400/70 hover:decoration-current dark:decoration-slate-500/70 transition-colors"
                >
                  Read the thesis →
                </a>
              </div>
            </div>

            <div>
              <LiveActivityLog />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
