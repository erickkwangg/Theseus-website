"use client";

import { useState } from "react";
import { Cpu, Database, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Layer = {
  key: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  bullets: string[];
  detail: string;
  accent: { text: string; bg: string; border: string; ring: string };
};

const layers: Layer[] = [
  {
    key: "execution",
    title: "Execution Layer",
    subtitle: "AIVM",
    icon: Cpu,
    bullets: ["Tensor operations", "Agent scheduling", "Proof generation", "SHIP DSL"],
    detail:
      "A deterministic, tensor-native runtime. Agents and models register here; SHIP compiles to AIVM bytecode; every model call produces a Tensor Commit before any state changes are accepted.",
    accent: {
      text: "text-indigo-700 dark:text-indigo-300",
      bg: "bg-indigo-50 dark:bg-indigo-950/30",
      border: "border-indigo-300/60 dark:border-indigo-500/40",
      ring: "ring-indigo-300 dark:ring-indigo-500/40",
    },
  },
  {
    key: "availability",
    title: "Availability Layer",
    subtitle: "TheseusStore",
    icon: Database,
    bullets: ["Reed-Solomon encoding", "RAG contexts", "Storage miners", "Merkle roots"],
    detail:
      "Erasure-coded storage for model weights and agent context. Storage miners stake to pin shards; verifiers can reconstruct from any sufficient quorum. Lets multi-GB models live alongside on-chain state.",
    accent: {
      text: "text-green-700 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-950/30",
      border: "border-green-300/60 dark:border-green-500/40",
      ring: "ring-green-300 dark:ring-green-500/40",
    },
  },
  {
    key: "consensus",
    title: "Consensus Layer",
    subtitle: "HotStuff BFT PoS",
    icon: Shield,
    bullets: ["Valid model roots", "VRF selection", "One-block finality", "Coupled layers"],
    detail:
      "HotStuff BFT proof-of-stake. A block cannot finalize unless every Tensor Commit verifies and every required shard is provably available. Validators, provers, and storage miners stake separately and can be slashed independently.",
    accent: {
      text: "text-purple-700 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-950/30",
      border: "border-purple-300/60 dark:border-purple-500/40",
      ring: "ring-purple-300 dark:ring-purple-500/40",
    },
  },
];

export default function LayeredStack() {
  const [active, setActive] = useState<string>("execution");
  const activeLayer = layers.find((l) => l.key === active) ?? layers[0];

  return (
    <div className="my-2">
      <div className="grid lg:grid-cols-[1fr_minmax(0,1.1fr)] gap-6 items-start">
        {/* Stack */}
        <div className="relative">
          <div className="space-y-2.5">
            {layers.map((l) => {
              const Icon = l.icon;
              const isActive = active === l.key;
              return (
                <button
                  key={l.key}
                  onClick={() => setActive(l.key)}
                  className={`relative w-full text-left rounded-lg border transition-all overflow-hidden group ${
                    isActive
                      ? `${l.accent.bg} ${l.accent.border} shadow-sm`
                      : "bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600"
                  }`}
                  style={{
                    transform: isActive ? "translateX(4px)" : "translateX(0)",
                    transitionDuration: "220ms",
                  }}
                  aria-pressed={isActive}
                >
                  {isActive && (
                    <span
                      className={`absolute inset-y-0 left-0 w-1 ${l.accent.text.replace("text-", "bg-").split(" ")[0]}`}
                      aria-hidden
                    />
                  )}
                  <div className="flex items-center gap-3 p-4">
                    <div
                      className={`shrink-0 w-9 h-9 rounded-md flex items-center justify-center ring-1 ${l.accent.ring} ${l.accent.bg}`}
                    >
                      <Icon className={`h-4.5 w-4.5 ${l.accent.text}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          {l.title}
                        </span>
                        <span className={`text-[11px] font-mono tracking-wider ${l.accent.text}`}>
                          {l.subtitle}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {l.bullets.slice(0, 3).join(" · ")}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-[11px] font-mono uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
            Click a layer for detail →
          </p>
        </div>

        {/* Detail panel */}
        <div
          className={`rounded-lg border p-5 ${activeLayer.accent.border} ${activeLayer.accent.bg}`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`w-9 h-9 rounded-md flex items-center justify-center ring-1 ${activeLayer.accent.ring} bg-white/60 dark:bg-slate-900/40`}
            >
              <activeLayer.icon className={`h-5 w-5 ${activeLayer.accent.text}`} />
            </div>
            <div>
              <div className="text-base font-medium text-slate-900 dark:text-white">
                {activeLayer.title}
              </div>
              <div className={`text-[11px] font-mono tracking-wider ${activeLayer.accent.text}`}>
                {activeLayer.subtitle}
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            {activeLayer.detail}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {activeLayer.bullets.map((b) => (
              <span
                key={b}
                className={`px-2 py-0.5 text-[11px] rounded-md bg-white/70 dark:bg-slate-900/40 ring-1 ${activeLayer.accent.ring} ${activeLayer.accent.text}`}
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
