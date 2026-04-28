"use client";

import { useState } from "react";
import CodeViewer from "./CodeViewer";
import FileTree from "./FileTree";
import { DEFAULT_FILE } from "./files";

export default function BuildIDE() {
  const [selected, setSelected] = useState(DEFAULT_FILE);

  return (
    <div className="flex h-[560px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700/60 dark:bg-[#0A0A0C] dark:shadow-2xl lg:h-auto lg:aspect-[16/10]">
      <div className="flex flex-shrink-0 items-center gap-3 border-b border-slate-200 bg-slate-100 px-4 py-2 dark:border-slate-800/60 dark:bg-[#111115]">
        <div className="flex gap-2">
          <div className="size-3 rounded-full bg-rose-400/90 dark:bg-red-500/80" />
          <div className="size-3 rounded-full bg-amber-400/90 dark:bg-yellow-500/80" />
          <div className="size-3 rounded-full bg-emerald-400/90 dark:bg-green-500/80" />
        </div>
        <div className="ml-2 truncate rounded border border-slate-200 bg-white px-3 py-0.5 font-mono text-[11px] text-slate-500 dark:border-slate-800/60 dark:bg-[#0A0A0C] dark:text-slate-400">
          {selected}
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div className="overflow-y-auto border-b border-slate-200 bg-slate-50 dark:border-slate-800/70 dark:bg-[#0C0C10] lg:border-b-0 lg:border-r">
          <FileTree selected={selected} onSelect={setSelected} />
        </div>
        <div className="min-h-0 min-w-0">
          <CodeViewer path={selected} />
        </div>
      </div>
    </div>
  );
}
