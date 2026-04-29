"use client";

import { ChevronDown, FileCode, FileText, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

type FileLink = {
  path: string;
  label: string;
  language: "rust" | "markdown";
};

const ROOT_FILES: FileLink[] = [
  { path: "THESEUS.md", label: "THESEUS.md", language: "markdown" },
  { path: "agent.rs", label: "agent.rs", language: "rust" },
];

const SKILL_FILES: FileLink[] = [
  {
    path: "skills/portfolio-rebalance/SKILL.md",
    label: "portfolio-rebalance",
    language: "markdown",
  },
  {
    path: "skills/uniswap-v3-trading/SKILL.md",
    label: "uniswap-v3-trading",
    language: "markdown",
  },
  {
    path: "skills/cross-chain-bridge/SKILL.md",
    label: "cross-chain-bridge",
    language: "markdown",
  },
];

const ALL_FILES: FileLink[] = [...ROOT_FILES, ...SKILL_FILES];

const SELECTED_ROW =
  "bg-indigo-100 text-indigo-900 dark:bg-indigo-500/15 dark:text-indigo-200";
const HOVER_ROW =
  "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200";

type Props = {
  selected: string;
  onSelect: (path: string) => void;
};

export default function FileTree({ selected, onSelect }: Props) {
  return (
    <>
      <nav
        aria-label="Agent files"
        className="hidden flex-col gap-0.5 py-3 font-mono text-[12.5px] text-slate-700 dark:text-slate-300 lg:flex"
      >
        <FolderRow name="defi-rebalancer" depth={0} />
        {ROOT_FILES.map((f) => (
          <FileRow
            key={f.path}
            file={f}
            depth={1}
            selected={selected === f.path}
            onSelect={onSelect}
          />
        ))}
        <FolderRow name="skills" depth={1} />
        {SKILL_FILES.map((f) => (
          <SkillFolder
            key={f.path}
            file={f}
            selected={selected === f.path}
            onSelect={onSelect}
          />
        ))}
      </nav>

      <div
        aria-label="Agent files"
        className="scroll-fade-right flex gap-2 overflow-x-auto border-b border-slate-200 px-3 py-3 dark:border-slate-800/70 lg:hidden"
      >
        {ALL_FILES.map((f) => (
          <button
            key={f.path}
            type="button"
            onClick={() => onSelect(f.path)}
            aria-pressed={selected === f.path}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 font-mono text-[11.5px] transition-colors",
              selected === f.path
                ? "border-indigo-400 bg-indigo-100 text-indigo-700 dark:border-indigo-400/60 dark:bg-indigo-500/15 dark:text-indigo-200"
                : "border-slate-200 bg-white text-slate-500 hover:text-slate-900 dark:border-slate-700/70 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:text-slate-200",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
    </>
  );
}

function FolderRow({ name, depth }: { name: string; depth: number }) {
  return (
    <div
      className="flex items-center gap-1.5 py-0.5 text-slate-700 dark:text-slate-300"
      style={{ paddingLeft: depth * 14 + 8 }}
    >
      <ChevronDown className="size-3.5 text-slate-400 dark:text-slate-500" aria-hidden />
      <FolderOpen className="size-3.5 text-amber-500 dark:text-[#FFD166]" aria-hidden />
      <span>{name}/</span>
    </div>
  );
}

function FileRow({
  file,
  depth,
  selected,
  onSelect,
}: {
  file: FileLink;
  depth: number;
  selected: boolean;
  onSelect: (path: string) => void;
}) {
  const Icon = file.language === "rust" ? FileCode : FileText;
  return (
    <button
      type="button"
      onClick={() => onSelect(file.path)}
      aria-pressed={selected}
      style={{ paddingLeft: depth * 14 + 8 }}
      className={cn(
        "flex w-full items-center gap-1.5 py-1 pr-3 text-left transition-colors",
        selected ? SELECTED_ROW : HOVER_ROW,
      )}
    >
      <span className="size-3.5" aria-hidden />
      <Icon
        className={cn(
          "size-3.5",
          file.language === "rust"
            ? "text-blue-600 dark:text-[#4BD3FF]"
            : "text-slate-500 dark:text-slate-400",
        )}
        aria-hidden
      />
      <span className="truncate">{file.label}</span>
    </button>
  );
}

function SkillFolder({
  file,
  selected,
  onSelect,
}: {
  file: FileLink;
  selected: boolean;
  onSelect: (path: string) => void;
}) {
  return (
    <>
      <FolderRow name={file.label} depth={2} />
      <button
        type="button"
        onClick={() => onSelect(file.path)}
        aria-pressed={selected}
        style={{ paddingLeft: 3 * 14 + 8 }}
        className={cn(
          "flex w-full items-center gap-1.5 py-1 pr-3 text-left transition-colors",
          selected ? SELECTED_ROW : HOVER_ROW,
        )}
      >
        <span className="size-3.5" aria-hidden />
        <FileText className="size-3.5 text-slate-500 dark:text-slate-400" aria-hidden />
        <span className="truncate">SKILL.md</span>
      </button>
    </>
  );
}
