"use client";

import { useState } from "react";
import { User, Eye, Bot } from "lucide-react";

type Tier = {
  key: string;
  title: string;
  control: string;
  example: string;
  icon: typeof User;
  accent: { dot: string; text: string; ring: string; bg: string };
};

const tiers: Tier[] = [
  {
    key: "managed",
    title: "Managed",
    control: "Human-owned key",
    example:
      "A trading agent that runs strategies on its own and routes profits to its owner's address. The controller key can pause it.",
    icon: User,
    accent: {
      dot: "bg-slate-400 dark:bg-slate-500",
      text: "text-slate-800 dark:text-slate-200",
      ring: "ring-slate-300 dark:ring-slate-600",
      bg: "bg-slate-100 dark:bg-slate-800/50",
    },
  },
  {
    key: "civic",
    title: "Civic",
    control: "Fully autonomous, public reasoning",
    example:
      "A prediction-market resolver that decides outcomes via inference and posts the verifiable reasoning on-chain. No private key, no owner; only public verification.",
    icon: Eye,
    accent: {
      dot: "bg-indigo-500",
      text: "text-indigo-700 dark:text-indigo-300",
      ring: "ring-indigo-300 dark:ring-indigo-500/50",
      bg: "bg-indigo-50 dark:bg-indigo-950/40",
    },
  },
  {
    key: "sovereign",
    title: "Sovereign",
    control: "Self-directed",
    example:
      "An agent that holds its own balance, pays for its own inference, and decides when to act based on on-chain triggers. The agent becomes the counterparty.",
    icon: Bot,
    accent: {
      dot: "bg-green-500",
      text: "text-green-700 dark:text-green-400",
      ring: "ring-green-300 dark:ring-green-500/50",
      bg: "bg-green-50 dark:bg-green-950/40",
    },
  },
];

export default function AgentSpectrum() {
  const [active, setActive] = useState<string>(tiers[1].key);
  const activeTier = tiers.find((t) => t.key === active) ?? tiers[1];

  return (
    <div className="my-2">
      {/* Spectrum bar */}
      <div className="relative mb-6">
        {/* Track */}
        <div className="absolute inset-x-6 top-5 h-px bg-gradient-to-r from-slate-300 via-indigo-400 to-green-500 dark:from-slate-600 dark:via-indigo-500 dark:to-green-500 -z-0" />
        <div className="relative grid grid-cols-3 gap-2">
          {tiers.map((t) => {
            const Icon = t.icon;
            const isActive = active === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className="group flex flex-col items-center text-center px-2"
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center ring-2 transition-all ${
                    isActive
                      ? `${t.accent.bg} ${t.accent.ring} ring-offset-2 ring-offset-white dark:ring-offset-slate-950 scale-110`
                      : "bg-white dark:bg-slate-900 ring-slate-200 dark:ring-slate-700"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 transition-colors ${
                      isActive ? t.accent.text : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                    }`}
                  />
                </div>
                <div
                  className={`mt-2 text-sm font-medium transition-colors ${
                    isActive ? t.accent.text : "text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200"
                  }`}
                >
                  {t.title}
                </div>
                <div
                  className={`text-[11px] transition-colors ${
                    isActive ? "text-slate-700 dark:text-slate-300" : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {t.control}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Anchor labels */}
      <div className="flex justify-between text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500 px-2 mb-4">
        <span>Human-controlled</span>
        <span>Self-directed</span>
      </div>

      {/* Detail panel */}
      <div
        className={`p-4 rounded-lg border transition-colors ${activeTier.accent.bg} border-slate-200 dark:border-slate-700/60`}
      >
        <div className="flex items-baseline gap-2 mb-1.5">
          <span className={`text-sm font-semibold ${activeTier.accent.text}`}>
            {activeTier.title}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-500">·</span>
          <span className="text-xs text-slate-600 dark:text-slate-400">{activeTier.control}</span>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {activeTier.example}
        </p>
      </div>
    </div>
  );
}
