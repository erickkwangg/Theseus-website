// Renders the agent's deployable directory: a file-tree on the left, the
// selected file's content on the right. Each Theseus agent ships as a
// directory in the OpenClaw-style format: THESEUS.md is the agent itself,
// SOUL.md is the identity/persona/mandate, skills/<name>/SKILL.md are
// optional reusable capabilities (none for the 11 fixtures today).

"use client";

import { useMemo, useState } from "react";
import type { AgentSnapshot } from "@/lib/poa/types";
import {
  agentSlug,
  buildAgentDirectory,
  type AgentDirectoryFile,
} from "@/lib/poa/agent-file";
import CopyButton from "./CopyButton";

type Props = {
  snapshot: AgentSnapshot;
};

function fileKindLabel(kind: AgentDirectoryFile["kind"]): string {
  if (kind === "agent") return "Agent";
  if (kind === "soul") return "Identity";
  return "Skill";
}

export default function AgentDirectory({ snapshot }: Props) {
  const slug = agentSlug(snapshot);
  const files = useMemo(() => buildAgentDirectory(snapshot), [snapshot]);
  const [activePath, setActivePath] = useState<string>(files[0]?.path ?? "");
  const active = files.find((f) => f.path === activePath) ?? files[0];

  return (
    <section
      className="mx-auto mt-12 max-w-[920px] border-t pt-10 print:hidden"
      style={{ borderColor: "var(--poa-rule)" }}
      id="agent-file"
    >
      <header className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <div>
          <p className="poa-stamp">Agent directory · deployable</p>
          <h2 className="mt-1 font-serif text-2xl text-[var(--poa-ink)]">
            <span className="italic">{snapshot.name}</span> deploys from this
            directory.
          </h2>
        </div>
        <CopyButton value={active?.content ?? ""} label={active?.filename ?? "file"} />
      </header>

      <p className="mb-5 max-w-2xl text-[13.5px] leading-relaxed text-[var(--poa-ink-soft)]">
        OpenClaw-style format.{" "}
        <code className="font-mono text-[12px]">THESEUS.md</code> at the root
        is the agent (system prompt, models, native tools, schedule).{" "}
        <code className="font-mono text-[12px]">SOUL.md</code> holds the
        persistent identity and mandate. Reusable capabilities, if any, go in
        sibling <code className="font-mono text-[12px]">skills/&lt;name&gt;/SKILL.md</code>{" "}
        files.
      </p>

      <div
        className="poa-playground overflow-hidden border"
        style={{ borderColor: "var(--poa-rule)" }}
      >
        {/* Header rail: directory name + chars */}
        <div
          className="flex items-baseline justify-between border-b px-4 py-2"
          style={{ borderColor: "var(--poa-rule)" }}
        >
          <p className="poa-stamp">{`agents/${slug}/`}</p>
          {active && (
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--poa-ink-soft)]">
              {active.filename} · {active.content.length.toLocaleString()} chars
            </p>
          )}
        </div>

        <div className="grid sm:grid-cols-[200px_1fr]">
          {/* File tree */}
          <nav
            className="border-b sm:border-b-0 sm:border-r"
            style={{ borderColor: "var(--poa-rule)" }}
            aria-label="Agent directory"
          >
            <ul className="py-2">
              <li
                className="px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--poa-ink-soft)]"
                aria-hidden="true"
              >
                {slug}/
              </li>
              {(() => {
                const topLevel = files.filter((f) => f.kind !== "skill");
                const skills = files.filter((f) => f.kind === "skill");
                return (
                  <>
                    {topLevel.map((file) => {
                      const isActive = file.path === activePath;
                      return (
                        <li key={file.path}>
                          <button
                            type="button"
                            onClick={() => setActivePath(file.path)}
                            aria-current={isActive ? "true" : undefined}
                            className={`group flex w-full items-baseline gap-2 px-4 py-1.5 text-left font-mono text-[12px] transition-colors ${
                              isActive
                                ? "bg-[color:var(--poa-rule)]/40 text-[var(--poa-ink)]"
                                : "text-[var(--poa-ink-soft)] hover:bg-[color:var(--poa-rule)]/20 hover:text-[var(--poa-ink)]"
                            }`}
                          >
                            <span className="text-[var(--poa-ink-soft)]">▸</span>
                            <span>{file.filename}</span>
                            <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--poa-ink-soft)]">
                              {fileKindLabel(file.kind)}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                    {skills.length > 0 && (
                      <>
                        <li
                          className="mt-1 flex items-baseline gap-2 px-4 py-1 font-mono text-[12px] text-[var(--poa-ink-soft)]"
                          aria-hidden="true"
                        >
                          <span>▾</span>
                          <span>skills/</span>
                        </li>
                        {skills.map((file) => {
                          const isActive = file.path === activePath;
                          // skills/<name>/SKILL.md -> show <name>
                          const skillName = file.treePath.split("/")[1] ?? "";
                          return (
                            <li key={file.path}>
                              <button
                                type="button"
                                onClick={() => setActivePath(file.path)}
                                aria-current={isActive ? "true" : undefined}
                                className={`group flex w-full items-baseline gap-2 pl-7 pr-4 py-1.5 text-left font-mono text-[12px] transition-colors ${
                                  isActive
                                    ? "bg-[color:var(--poa-rule)]/40 text-[var(--poa-ink)]"
                                    : "text-[var(--poa-ink-soft)] hover:bg-[color:var(--poa-rule)]/20 hover:text-[var(--poa-ink)]"
                                }`}
                              >
                                <span className="text-[var(--poa-ink-soft)]">▸</span>
                                <span className="truncate">{skillName}</span>
                                <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--poa-ink-soft)]">
                                  {fileKindLabel(file.kind)}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </>
                    )}
                  </>
                );
              })()}
            </ul>
          </nav>

          {/* File viewer */}
          <pre className="max-h-[70vh] overflow-y-auto whitespace-pre-wrap break-words px-5 py-4 font-mono text-[12px] leading-relaxed text-[var(--poa-ink)]">
            {active?.content ?? ""}
          </pre>
        </div>
      </div>
    </section>
  );
}
