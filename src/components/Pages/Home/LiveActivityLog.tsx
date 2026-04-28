"use client";

import { useEffect, useState } from "react";

type EventTemplate = {
  agentId: string;
  action: string;
};

const TEMPLATE: EventTemplate[] = [
  { agentId: "agent_0x4f29", action: "woke up" },
  { agentId: "agent_0x4f29", action: "ran inference  (23ms, llama-3.1-8b)" },
  { agentId: "agent_0x4f29", action: "signed transfer  0.4 THE → agent_0x9aa1" },
  { agentId: "agent_0x4f29", action: "completed" },
  { agentId: "agent_0x9aa1", action: "received transfer  0.4 THE" },
  { agentId: "agent_0x9aa1", action: "ran inference  (18ms, claude-haiku-4-5)" },
  { agentId: "agent_0x9aa1", action: "called  prediction_market.create_market(...)" },
  { agentId: "agent_0x9aa1", action: "completed" },
  { agentId: "agent_0xb14c", action: "woke up" },
  { agentId: "agent_0xb14c", action: "ran inference  (31ms, gpt-4o)" },
  { agentId: "agent_0xb14c", action: "signed transfer  1.2 THE → 0x7e3d" },
  { agentId: "agent_0xb14c", action: "completed" },
  { agentId: "agent_0xc801", action: "woke up" },
  { agentId: "agent_0xc801", action: "queried context (12 KB) from theseusstore" },
  { agentId: "agent_0xc801", action: "ran inference  (42ms, llama-3.1-70b)" },
  { agentId: "agent_0xc801", action: "completed" },
];

const VISIBLE_LINES = 8;

type Line = {
  id: number;
  ts: string;
  agentId: string;
  action: string;
};

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function timestamp(date: Date): string {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export default function LiveActivityLog() {
  const [lines, setLines] = useState<Line[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const now = Date.now();
    const initial: Line[] = [];
    for (let i = 0; i < VISIBLE_LINES; i++) {
      const t = TEMPLATE[i % TEMPLATE.length];
      const d = new Date(now - (VISIBLE_LINES - i) * 1800);
      initial.push({ id: i, ts: timestamp(d), agentId: t.agentId, action: t.action });
    }
    setLines(initial);

    let next = VISIBLE_LINES;
    const interval = setInterval(() => {
      const t = TEMPLATE[next % TEMPLATE.length];
      const d = new Date();
      setLines((prev) => {
        const append: Line = { id: next, ts: timestamp(d), agentId: t.agentId, action: t.action };
        return [...prev.slice(1), append];
      });
      next++;
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-[12px] sm:text-[13px]">
      <div className="space-y-2">
        {mounted
          ? lines.map((line) => (
              <div
                key={line.id}
                className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 leading-relaxed"
              >
                <span className="text-slate-400 dark:text-slate-500 tabular-nums">{line.ts}</span>
                <span className="text-indigo-700 dark:text-indigo-300">{line.agentId}</span>
                <span className="text-slate-700 dark:text-slate-300">{line.action}</span>
              </div>
            ))
          : Array.from({ length: VISIBLE_LINES }).map((_, i) => (
              <div key={i} className="leading-relaxed text-slate-300 dark:text-slate-700">
                ·
              </div>
            ))}
      </div>
    </div>
  );
}
