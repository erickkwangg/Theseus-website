"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Cpu, GitBranch, Loader2, Play, RotateCcw, ShieldCheck, Sparkles } from "lucide-react";
import Header from "@/components/Pages/Home/Header";
import Footer from "@/components/Pages/Home/Footer";
import { Button } from "@/components/ui/button";

const FILENAME = "market_creator.ship";

const DESCRIPTION =
  "An agent receives a natural-language request, asks a model for structured market parameters, and calls the prediction-market contract.";

const CODE = `#[agent(name = "MarketCreator", version = 1, ship = "1.0")]

const gpt_5_1: bytes32 = 0xe496...f117;
const CREATE_MARKET_SELECTOR: bytes4 = 0x01000001;

struct MarketParams {
  question: string,
  options: string[],
  deadline_blocks: number,
}

#[entry]
node start(request: string) {
  messages.push(system("Generate structured market params"));
  messages.push(user(request));
  goto(analyze);
}

#[model]
node analyze() {
  let params = model(gpt_5_1)
    .schema(MarketParams)
    .invoke(messages);
  goto(call_contract);
}

node call_contract() {
  let call_data = contracts.encode_call(
    CREATE_MARKET_SELECTOR, params
  );
  contracts.call(
    PREDICTION_MARKET_CONTRACT,
    call_data,
    0n,
    10000000000n
  );
}`;

const RESULT_LABEL = "On-chain effect";
const RESULT = "Market #4129 created. Question: \"Will GPT-5 ship by EOY?\"";

type TraceStep = {
  label: string;
  detail: string;
  icon: typeof Cpu;
  durationMs: number;
};

const TRACE_TEMPLATE: TraceStep[] = [
  {
    label: "Compile SHIP to a CompiledAgent",
    detail: "shipc emits a SCALE-encoded blob the chain decodes into ABG nodes.",
    icon: Cpu,
    durationMs: 600,
  },
  {
    label: "Run inference on selected model",
    detail: "One prover node runs the forward pass.",
    icon: Sparkles,
    durationMs: 1100,
  },
  {
    label: "Generate Tensor Commit",
    detail: "<1% overhead vs raw inference.",
    icon: GitBranch,
    durationMs: 700,
  },
  {
    label: "Verified by 3 nodes",
    detail: "KZG pairing checks pass. Result accepted.",
    icon: ShieldCheck,
    durationMs: 800,
  },
];

type RunState = "idle" | "running" | "done";

export default function PlaygroundPage() {
  const [runState, setRunState] = useState<RunState>("idle");
  const [visibleSteps, setVisibleSteps] = useState(0);

  const reset = useCallback(() => {
    setRunState("idle");
    setVisibleSteps(0);
  }, []);

  const handleRun = useCallback(() => {
    if (runState === "running") return;
    setRunState("running");
    setVisibleSteps(0);

    let cumulative = 0;
    TRACE_TEMPLATE.forEach((step, idx) => {
      cumulative += step.durationMs;
      setTimeout(() => {
        setVisibleSteps(idx + 1);
        if (idx === TRACE_TEMPLATE.length - 1) {
          setTimeout(() => setRunState("done"), 250);
        }
      }, cumulative);
    });
  }, [runState]);

  return (
    <main className="min-h-screen site-shell">
      <Header />

      {/* Hero */}
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

      {/* Status note */}
      <section className="px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
            Execution on this page is simulated. The real runtime is available through{" "}
            <Link
              href="/launch"
              className="text-indigo-600 dark:text-indigo-300 underline underline-offset-4 hover:text-indigo-800 dark:hover:text-white hover:underline"
            >
              preview access
            </Link>
            .
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">{DESCRIPTION}</p>
        </div>
      </section>

      {/* Editor + Trace */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6">
          {/* Editor */}
          <div className="rounded-lg overflow-hidden bg-[#060b16] border border-slate-200 dark:border-slate-700/60 shadow-lg dark:shadow-2xl">
            <div className="bg-[#0F172A] px-4 py-2 flex items-center gap-2 border-b border-slate-800/60">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="ml-4 px-3 py-0.5 bg-[#060b16] rounded text-xs text-slate-400 font-mono">
                {FILENAME}
              </div>
              <div className="ml-auto text-[10px] uppercase tracking-widest text-slate-500">
                Read only
              </div>
            </div>
            <pre className="scroll-fade-right p-4 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-slate-200 max-h-[480px]">
              <code>{CODE}</code>
            </pre>
          </div>

          {/* Trace */}
          <div className="rounded-lg overflow-hidden bg-[#060b16] border border-slate-700/60 shadow-2xl flex flex-col">
            <div className="bg-[#0F172A] px-4 py-2 flex items-center gap-2 border-b border-slate-800/60">
              <div className="text-xs text-slate-400 font-mono">Execution trace</div>
              <div className="ml-auto flex items-center gap-2">
                {runState === "done" && (
                  <button
                    onClick={reset}
                    className="text-[10px] uppercase tracking-widest text-slate-400 hover:text-indigo-300 inline-flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Reset
                  </button>
                )}
                <Button
                  onClick={handleRun}
                  disabled={runState === "running"}
                  className="primary-cta px-4 py-1.5 text-xs rounded-md inline-flex items-center gap-1.5"
                >
                  {runState === "running" ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin" /> Running
                    </>
                  ) : runState === "done" ? (
                    <>
                      <Play className="h-3 w-3" /> Run again
                    </>
                  ) : (
                    <>
                      <Play className="h-3 w-3" /> Run
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="p-5 flex-1 min-h-[440px] font-mono text-xs sm:text-sm">
              {runState === "idle" ? (
                <div className="text-slate-500 italic">
                  Press Run to compile, infer, and verify.
                </div>
              ) : (
                <div className="space-y-3">
                  {TRACE_TEMPLATE.map((step, idx) => {
                    const isVisible = idx < visibleSteps;
                    const isCurrent = idx === visibleSteps - 1 && runState === "running";
                    const Icon = step.icon;
                    if (!isVisible) return null;
                    return (
                      <div
                        key={step.label}
                        className={`flex items-start gap-3 transition-opacity ${
                          isCurrent ? "opacity-100" : "opacity-90"
                        }`}
                      >
                        <span
                          className={`mt-0.5 p-1 rounded ${
                            isCurrent
                              ? "bg-indigo-500/15 text-indigo-300"
                              : "bg-green-500/10 text-green-400"
                          }`}
                        >
                          {isCurrent ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Icon className="h-3.5 w-3.5" />
                          )}
                        </span>
                        <div>
                          <div
                            className={
                              isCurrent ? "text-indigo-200" : "text-slate-200"
                            }
                          >
                            {step.label}
                          </div>
                          <div className="text-slate-500 text-[11px] mt-0.5">
                            {step.detail}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {runState === "done" && (
                    <div className="mt-6 pt-4 border-t border-slate-800">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 p-1 rounded bg-green-500/15 text-green-400">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </span>
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">
                            {RESULT_LABEL}
                          </div>
                          <div className="text-green-300">{RESULT}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
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
              <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors" />
            </div>
          </Link>
          <Link href="/launch" className="group no-underline">
            <div className="docs-card h-full flex items-center justify-between gap-4 border-indigo-500/30 bg-indigo-500/5 hover:border-indigo-400/60 hover:bg-indigo-500/10 transition-all duration-300">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300/80 mb-1">
                  Run for real
                </div>
                <div className="text-slate-900 dark:text-slate-100 font-medium group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                  Request preview access and deploy
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
            </div>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
