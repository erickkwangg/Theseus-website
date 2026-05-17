"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Cpu,
  GitBranch,
  Loader2,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

// The interactive playground component. Used to live on its own /playground
// route as a full page; now mounted inside /launch so visitors can write
// SHIP and run it without leaving the developer hub.

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
    label: "Compile the agent file to a CompiledAgent",
    detail: "shipc lowers THESEUS.md through SHIP into a SCALE-encoded blob the chain decodes into ABG nodes.",
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

export default function PlaygroundClient() {
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
    <>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-3xl">
        {DESCRIPTION}
      </p>

      <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
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
        <div className="rounded-lg overflow-hidden bg-[#060b16] border border-slate-200 dark:border-slate-700/60 shadow-lg dark:shadow-2xl flex flex-col">
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
                    <Play className="h-3 w-3" /> Run in browser
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="p-5 flex-1 min-h-[440px] font-mono text-xs sm:text-sm">
            {runState === "idle" ? (
              <div className="text-slate-500 italic">
                Press Run in browser to compile, infer, and verify.
              </div>
            ) : (
              <div className="space-y-3">
                {TRACE_TEMPLATE.map((step, idx) => {
                  const isVisible = idx < visibleSteps;
                  const isCurrent =
                    idx === visibleSteps - 1 && runState === "running";
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

      <p className="mt-6 text-xs text-slate-500 dark:text-slate-400 text-center">
        Execution on this page is simulated. The real runtime ships with public testnet.
      </p>
    </>
  );
}
