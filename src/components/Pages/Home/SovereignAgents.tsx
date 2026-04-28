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
        <div className="rounded-lg overflow-hidden bg-[#0A0A0C] border border-slate-200 dark:border-slate-700/60 shadow-2xl">
          {/* IDE Chrome */}
          <div className="bg-[#111115] px-4 py-2 flex items-center gap-2 border-b border-gray-800/50">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="ml-4 px-3 py-0.5 bg-[#0A0A0C] rounded text-sm text-gray-400 font-mono">
              market_creator.ship
            </div>
          </div>

          {/* Code Content */}
          <div className="p-4 font-mono text-sm leading-[1.4] overflow-x-auto">
            <div className="flex">
              {/* Line Numbers */}
              <div className="select-none text-gray-600 pr-3 text-right leading-[1.4]">
                {Array.from({ length: 30 }, (_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {/* Code */}
              <div className="flex-1">
                <div className="text-[#4BD3FF]">{`#[agent(name = "MarketCreator", version = 1, ship = "1.0")]`}</div>
                <div className="mb-2" />
                <div>
                  <span className="text-[#4BD3FF]">const</span>{" "}
                  <span className="text-[#5AE3FF]">gpt_5_1</span>:{" "}
                  <span className="text-[#4BD3FF]">bytes32</span> ={" "}
                  <span className="text-[#FFD166]">0xe496...f117</span>;
                </div>
                <div>
                  <span className="text-[#4BD3FF]">const</span>{" "}
                  <span className="text-[#5AE3FF]">CREATE_MARKET_SELECTOR</span>:{" "}
                  <span className="text-[#4BD3FF]">bytes4</span> ={" "}
                  <span className="text-[#FFD166]">0x01000001</span>;
                </div>
                <div className="mb-2" />
                <div>
                  <span className="text-[#4BD3FF]">struct</span>{" "}
                  <span className="text-[#5AE3FF]">MarketParams</span> {"{"}
                </div>
                <div className="pl-4">
                  <span className="text-gray-300">question:</span>{" "}
                  <span className="text-[#4BD3FF]">string</span>,
                </div>
                <div className="pl-4">
                  <span className="text-gray-300">options:</span>{" "}
                  <span className="text-[#4BD3FF]">string[]</span>,
                </div>
                <div className="pl-4">
                  <span className="text-gray-300">deadline_blocks:</span>{" "}
                  <span className="text-[#4BD3FF]">number</span>
                </div>
                <div>{"}"}</div>
                <div className="mb-2" />
                <div className="text-gray-500">{`// Entry: parse prompt, route through model, call contract`}</div>
                <div>
                  <span className="text-[#4BD3FF]">#[entry]</span>
                </div>
                <div>
                  <span className="text-[#4BD3FF]">node</span>{" "}
                  <span className="text-[#5AE3FF]">start</span>(request: string) {"{"}
                </div>
                <div className="pl-4">
                  <span className="text-[#5AE3FF]">messages.push</span>(<span className="text-[#4BD3FF]">system</span>(
                  <span className="text-[#B794F4]">&quot;Generate structured market params&quot;</span>));
                </div>
                <div className="pl-4">
                  <span className="text-[#5AE3FF]">messages.push</span>(<span className="text-[#4BD3FF]">user</span>(request));
                </div>
                <div className="pl-4">
                  <span className="text-[#5AE3FF]">goto</span>(analyze);
                </div>
                <div>{"}"}</div>
                <div className="mb-2" />
                <div>
                  <span className="text-[#4BD3FF]">#[model]</span>
                </div>
                <div>
                  <span className="text-[#4BD3FF]">node</span>{" "}
                  <span className="text-[#5AE3FF]">analyze</span>() {"{"}
                </div>
                <div className="pl-4">
                  <span className="text-[#4BD3FF]">let</span> params ={" "}
                  <span className="text-[#5AE3FF]">model</span>(gpt_5_1).schema(MarketParams).invoke(messages);
                </div>
                <div className="pl-4">
                  <span className="text-[#5AE3FF]">goto</span>(call_contract);
                </div>
                <div>{"}"}</div>
                <div className="mb-2" />
                <div>
                  <span className="text-[#4BD3FF]">node</span>{" "}
                  <span className="text-[#5AE3FF]">call_contract</span>() {"{"}
                </div>
                <div className="pl-4">
                  <span className="text-[#4BD3FF]">let</span> call_data = contracts.encode_call(CREATE_MARKET_SELECTOR, ...);
                </div>
                <div className="pl-4">
                  contracts.call(<span className="text-[#FFD166]">PREDICTION_MARKET_CONTRACT</span>, call_data, 0n, 10000000000n);
                </div>
                <div>{"}"}</div>
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
