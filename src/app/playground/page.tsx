import Link from "next/link";
import { Play } from "lucide-react";
import Header from "@/components/Pages/Home/Header";
import Footer from "@/components/Pages/Home/Footer";
import PlaygroundClient from "@/components/PlaygroundClient";

// Standalone playground page. The same interactive component used by
// /launch#playground; this page keeps a dedicated bookmarkable URL
// so anyone sharing the playground specifically has a clean route.

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen site-shell">
      <Header />

      <section className="relative pt-32 lg:pt-40 pb-12 px-6 overflow-hidden">
        <div className="absolute inset-0 soft-grid opacity-15 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300/80 mb-6 inline-flex items-center gap-2">
            <Play className="h-3 w-3" />
            Interactive Preview
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-normal leading-tight mb-6 tracking-[-0.02em] text-slate-900 dark:text-slate-100 [text-wrap:balance]">
            SHIP <span className="italic">Playground.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            See how SHIP compiles intent into verifiable agent execution.
            Hit run, watch the simulated trace.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <PlaygroundClient />
        </div>

        {/* Footer CTAs — minimal, since the bigger dev hub lives at /launch */}
        <div className="max-w-6xl mx-auto mt-12 grid sm:grid-cols-2 gap-4">
          <Link href="/docs/ship" className="group no-underline">
            <div className="docs-card h-full flex items-center justify-between gap-4 hover:border-indigo-400/40 transition-all duration-300">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400 mb-1">
                  Reference
                </div>
                <div className="text-slate-900 dark:text-slate-100 font-medium group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                  Read the SHIP docs
                </div>
              </div>
            </div>
          </Link>
          <Link href="/launch" className="group no-underline">
            <div className="docs-card h-full flex items-center justify-between gap-4 border-indigo-500/30 bg-indigo-500/5 hover:border-indigo-400/60 hover:bg-indigo-500/10 transition-all duration-300">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300/80 mb-1">
                  Developer hub
                </div>
                <div className="text-slate-900 dark:text-slate-100 font-medium group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                  CLI quickstart, reference, and request preview access
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
