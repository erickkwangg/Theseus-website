import Link from "next/link";

export function SovereignAgentsSection() {
  return (
    <section className="relative py-24 lg:py-32 px-6 overflow-hidden section-soft-divider no-top-divider">
      <div className="absolute inset-0 soft-grid opacity-15 pointer-events-none" />

      {/* Title */}
      <div className="max-w-3xl mx-auto mb-12 lg:mb-16 relative z-10">
        <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400 mb-6">
          One agent, one file
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[-0.015em] leading-[1.05] text-slate-900 dark:text-white">
          <span className="italic">Creates a market</span> in thirty lines.
        </h2>
      </div>

      {/* IDE Window */}
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="rounded-lg overflow-hidden bg-[#060b16] border border-slate-200 dark:border-slate-700/60 shadow-2xl">
          {/* IDE Chrome */}
          <div className="bg-[#0F172A] px-4 py-2 flex items-center gap-2 border-b border-gray-800/50">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="ml-4 px-3 py-0.5 bg-[#060b16] rounded text-sm text-gray-400 font-mono">
              agents/market-creator/THESEUS.md
            </div>
          </div>

          {/* Code Content */}
          <div className="p-4 font-mono text-sm leading-[1.4] overflow-x-auto">
            <div className="flex">
              {/* Line Numbers */}
              <div className="select-none text-gray-600 pr-3 text-right leading-[1.4]">
                {Array.from({ length: 26 }, (_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {/* Code */}
              <div className="flex-1">
                <div className="text-gray-500">---</div>
                <div>
                  <span className="text-[#4BD3FF]">name</span>:{" "}
                  <span className="text-gray-300">Market Creator</span>
                </div>
                <div>
                  <span className="text-[#4BD3FF]">id</span>:{" "}
                  <span className="text-gray-300">market-creator</span>
                </div>
                <div>
                  <span className="text-[#4BD3FF]">description</span>:{" "}
                  <span className="text-gray-300">Creates prediction markets from natural-language requests.</span>
                </div>
                <div>
                  <span className="text-[#4BD3FF]">models</span>:{" "}
                  <span className="text-[#B794F4]">[gpt-5.1]</span>
                </div>
                <div>
                  <span className="text-[#4BD3FF]">native-tools</span>:{" "}
                  <span className="text-[#B794F4]">[predict.create_market]</span>
                </div>
                <div>
                  <span className="text-[#4BD3FF]">schedule</span>:{" "}
                  <span className="text-gray-300">on demand</span>
                </div>
                <div>
                  <span className="text-[#4BD3FF]">sovereign</span>:{" "}
                  <span className="text-[#FFD166]">true</span>
                </div>
                <div>
                  <span className="text-[#4BD3FF]">controller</span>:{" "}
                  <span className="text-[#FFD166]">null</span>
                </div>
                <div>
                  <span className="text-[#4BD3FF]">intent_types</span>:{" "}
                  <span className="text-[#B794F4]">[create_market, context_update]</span>
                </div>
                <div className="text-gray-500">---</div>
                <div className="mb-2" />
                <div className="text-[#5AE3FF]"># Market Creator</div>
                <div className="mb-2" />
                <div className="text-[#5AE3FF]">## What it does</div>
                <div className="mb-2" />
                <div className="text-gray-300">
                  Receives a natural-language request, asks gpt-5.1
                </div>
                <div className="text-gray-300">
                  for structured params, calls predict.create_market.
                </div>
                <div className="mb-2" />
                <div className="text-[#5AE3FF]">## Instructions</div>
                <div className="mb-2" />
                <div className="text-gray-300">
                  When called with a user request:
                </div>
                <div className="text-gray-300">
                  1. Send to the model with a JSON schema for MarketParams.
                </div>
                <div className="text-gray-300">
                  2. Call predict.create_market(...) with the response.
                </div>
                <div className="text-gray-300">
                  3. Return market_id on success; refuse with reason if not.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/playground"
            className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors underline-offset-4 hover:underline"
          >
            Try it in the playground →
          </Link>
        </div>
      </div>
    </section>
  );
}
