"use client";

import { useEffect, useState } from "react";

type Line = {
  agentId: string;
  action: string;
};

type Block = {
  number: number;
  lines: Line[];
};

const TEMPLATE: Line[] = [
  { agentId: "agent_0x4f29", action: "woke up" },
  { agentId: "agent_0x4f29", action: "ran inference  (23ms, llama-3.1-8b)" },
  { agentId: "agent_0x4f29", action: "signed transfer  0.4 THE → agent_0x9aa1" },
  { agentId: "agent_0x4f29", action: "completed" },
  { agentId: "agent_0x9aa1", action: "received transfer  0.4 THE" },
  { agentId: "agent_0x9aa1", action: "ran inference  (18ms, gpt-oss-20b)" },
  { agentId: "agent_0x9aa1", action: "called  prediction_market.create_market(...)" },
  { agentId: "agent_0x9aa1", action: "completed" },
  { agentId: "agent_0xb14c", action: "woke up" },
  { agentId: "agent_0xb14c", action: "ran inference  (31ms, deepseek-v4)" },
  { agentId: "agent_0xb14c", action: "signed transfer  1.2 THE → 0x7e3d" },
  { agentId: "agent_0xb14c", action: "completed" },
  { agentId: "agent_0xc801", action: "woke up" },
  { agentId: "agent_0xc801", action: "queried context (12 KB) from theseusstore" },
  { agentId: "agent_0xc801", action: "ran inference  (42ms, llama-3.1-70b)" },
  { agentId: "agent_0xc801", action: "completed" },
];

const STARTING_BLOCK = 2_841_392;
const MOBILE_MAX_LINES = 8;
const DESKTOP_MAX_LINES = 24;
const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";
const MAX_LINES_PER_BLOCK = 3;
const TICK_MS = 1700;
const NEW_BLOCK_PROBABILITY = 0.45;

function buildInitialBlocks(maxVisibleLines: number) {
  const blocks: Block[] = [];
  let templateIdx = 0;
  let blockNum = STARTING_BLOCK;
  let total = 0;
  while (total < maxVisibleLines - 2) {
    const count = 1 + Math.floor(Math.random() * MAX_LINES_PER_BLOCK);
    const lines: Line[] = [];
    for (let i = 0; i < count; i++) {
      lines.push(TEMPLATE[templateIdx % TEMPLATE.length]);
      templateIdx++;
    }
    blocks.push({ number: blockNum, lines });
    blockNum++;
    total += count;
  }
  return { blocks, templateIdx };
}

interface RemoteBlock {
  blockId: string;
  agentLabel: string;
  lines: string[];
  ts: number;
}

async function fetchRealActivity(): Promise<Block[] | null> {
  try {
    const res = await fetch("/api/live-activity", { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as { blocks?: RemoteBlock[] };
    if (!data.blocks?.length) return null;
    return data.blocks.map((b, i) => ({
      number: STARTING_BLOCK + i,
      lines: b.lines.map((l) => ({ agentId: b.agentLabel, action: l })),
    }));
  } catch {
    return null;
  }
}

export default function LiveActivityLog() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [mounted, setMounted] = useState(false);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MEDIA_QUERY);
    let maxVisibleLines = mq.matches ? DESKTOP_MAX_LINES : MOBILE_MAX_LINES;

    setMounted(true);

    // Try real on-chain activity first; fall back to simulated if the
    // endpoint fails or returns nothing.
    let cancelled = false;
    fetchRealActivity().then((real) => {
      if (cancelled) return;
      if (real && real.length > 0) {
        setBlocks(real.slice(-Math.min(real.length, maxVisibleLines)));
        setLive(true);
        return;
      }
      const seed = buildInitialBlocks(maxVisibleLines);
      setBlocks(seed.blocks);
    });

    const seed = buildInitialBlocks(maxVisibleLines);
    let templateIdx = seed.templateIdx;

    const handleChange = (event: MediaQueryListEvent) => {
      maxVisibleLines = event.matches ? DESKTOP_MAX_LINES : MOBILE_MAX_LINES;
    };
    mq.addEventListener("change", handleChange);

    // Refresh real ticks every 90s. If still in simulated mode, keep
    // animating; if real data arrives, switch over.
    const refresh = setInterval(async () => {
      const real = await fetchRealActivity();
      if (cancelled) return;
      if (real && real.length > 0) {
        setBlocks(real.slice(-Math.min(real.length, maxVisibleLines)));
        setLive(true);
      }
    }, 90_000);

    const interval = setInterval(() => {
      // Once we have real data, freeze the rolling simulation; the
      // refresh interval above keeps it current.
      if (live) return;
      const newLine = TEMPLATE[templateIdx % TEMPLATE.length];
      templateIdx++;

      setBlocks((prev) => {
        const last = prev[prev.length - 1];
        const startNew =
          !last ||
          last.lines.length >= MAX_LINES_PER_BLOCK ||
          Math.random() < NEW_BLOCK_PROBABILITY;

        let next: Block[];
        if (startNew || !last) {
          const nextNumber = last ? last.number + 1 : STARTING_BLOCK;
          next = [...prev, { number: nextNumber, lines: [newLine] }];
        } else {
          next = [
            ...prev.slice(0, -1),
            { ...last, lines: [...last.lines, newLine] },
          ];
        }

        let total = next.reduce((acc, b) => acc + b.lines.length, 0);
        while (total > maxVisibleLines && next.length > 1) {
          total -= next[0].lines.length;
          next = next.slice(1);
        }
        return next;
      });
    }, TICK_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
      clearInterval(refresh);
      mq.removeEventListener("change", handleChange);
    };
    // `live` is intentionally not in deps; we read it at interval time
    // via closure, the toggle is one-way.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="font-mono text-[12px] sm:text-[13px] h-[300px] lg:h-[clamp(480px,65vh,720px)] overflow-hidden flex flex-col justify-end log-fade-top">
      {mounted ? (
        <ol className="space-y-5">
          {blocks.map((block) => (
            <li key={block.number} className="space-y-2 log-block-enter">
              <div className="text-[10px] sm:text-[11px] tracking-[0.12em] uppercase text-slate-500 dark:text-slate-500">
                block{" "}
                <span className="text-slate-700 dark:text-slate-300 tabular-nums normal-case">
                  #{block.number}
                </span>
              </div>
              <ul className="border-l border-slate-300/80 dark:border-slate-700/80 pl-4 space-y-1.5">
                {block.lines.map((line, idx) => (
                  <li
                    key={`${block.number}-${idx}`}
                    className="flex items-start gap-2 leading-relaxed log-line-enter"
                  >
                    <span
                      aria-hidden
                      className="text-indigo-500 dark:text-indigo-400 select-none"
                    >
                      •
                    </span>
                    <div className="flex flex-wrap items-baseline gap-x-2 min-w-0 flex-1">
                      <span className="text-indigo-700 dark:text-indigo-300 whitespace-nowrap">
                        {line.agentId}
                      </span>
                      <span className="text-slate-700 dark:text-slate-300 break-words">
                        {line.action}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      ) : (
        <div className="space-y-2" aria-hidden>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="leading-relaxed text-slate-300 dark:text-slate-700"
            >
              ·
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
