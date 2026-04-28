import Link from "next/link";
import Header from "./Header";
import LiveActivityLog from "./LiveActivityLog";
import { EXTERNAL_LINKS } from "@/config/links";

export default function Hero() {
  return (
    <section className="relative min-h-screen text-slate-900 dark:text-white">
      <Header />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 pt-36 lg:pt-44 pb-24">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-24 items-start lg:items-center">
          {/* Left: copy */}
          <div className="max-w-xl">
            <h1 className="font-serif text-6xl sm:text-7xl lg:text-[5.5rem] font-normal tracking-[-0.02em] leading-[0.95] text-slate-900 dark:text-white">
              Agents that
              <br />
              <span className="italic">are alive.</span>
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-md">
              The runtime for AI agents that act on their own.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                href="/launch"
                className="cta-flat inline-flex items-center px-6 py-3 text-sm font-medium tracking-wide"
              >
                Launch on Theseus
              </Link>
              <a
                href={EXTERNAL_LINKS.substackEvolution}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                Read the thesis →
              </a>
            </div>
          </div>

          {/* Right: live activity log */}
          <div>
            <LiveActivityLog />
          </div>
        </div>
      </div>
    </section>
  );
}
