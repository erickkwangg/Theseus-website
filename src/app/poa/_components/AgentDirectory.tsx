// Renders the agent's deployable directory: a file-tree on the left, the
// selected file's content on the right. Each Theseus agent ships as a
// directory in the OpenClaw-style format: THESEUS.md is the agent itself,
// SOUL.md is the identity/persona/mandate, skills/<name>/SKILL.md are
// optional reusable capabilities (none for the 11 fixtures today).

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { AgentSnapshot } from "@/lib/poa/types";
import {
  agentSlug,
  buildAgentDirectory,
  type AgentDirectoryFile,
} from "@/lib/poa/agent-file";
import CopyButton from "./CopyButton";

// Per-agent interactive demo registered at /poa/<id>/demo. New demos slot
// in by adding the slug and a one-line headline; the profile page surfaces
// a callout linking to the demo so visitors see it at the top of the agent
// page, not buried at the bottom.
const DEMOS: Record<string, { headline: string }> = {
  calder: {
    headline: "Watch an operator try to retcon a dispatch.",
  },
  "aperture-0312": {
    headline: "Render the catalog, attempt a commission outside the fingerprint.",
  },
  quill: {
    headline: "Read a signed brief, throw a fabricated citation at Quill.",
  },
  marcellus: {
    headline: "Submit an album, watch a paid-coverage offer arrive.",
  },
  "vellum-1492": {
    headline: "Read a piece in voice, try an owner edit the voice forbids.",
  },
};

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

      {DEMOS[slug] && (
        <div
          className="mb-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border px-4 py-4"
          style={{ borderColor: "var(--poa-rule)" }}
        >
          <div className="min-w-0 flex-1">
            <p className="poa-stamp">Interactive demo</p>
            <p className="mt-1 text-[14px] leading-relaxed text-[var(--poa-ink)]">
              {DEMOS[slug].headline}
            </p>
          </div>
          <Link
            href={`/poa/${snapshot.agentId}/demo`}
            className="cta-ink inline-flex shrink-0 items-center gap-2 px-5 py-2.5 text-[13px] font-medium tracking-wide"
          >
            Open the demo
            <span aria-hidden>→</span>
          </Link>
        </div>
      )}

      {snapshot.context?.demoUrl && (
        <div
          className="mb-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border px-4 py-4"
          style={{ borderColor: "var(--poa-rule)" }}
        >
          <div className="min-w-0 flex-1">
            <p className="poa-stamp">Live demo · running on Base Sepolia</p>
            <p className="mt-1 text-[14px] leading-relaxed text-[var(--poa-ink)]">
              <span className="italic">{snapshot.name}</span> has been deciding
              on chain. Every verdict in this demo is signed and posted to a
              public contract you can read with viem.
            </p>
            <p className="mt-1 break-all font-mono text-[10.5px] uppercase tracking-[0.16em] text-[var(--poa-ink-soft)]">
              {snapshot.context.demoUrl.replace(/^https?:\/\//, "")}
            </p>
          </div>
          <a
            href={snapshot.context.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-ink inline-flex shrink-0 items-center gap-2 px-5 py-2.5 text-[13px] font-medium tracking-wide"
          >
            See it running
            <span aria-hidden>↗</span>
          </a>
        </div>
      )}

      {snapshot.tokenBinding && (
        <div
          className="mb-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border px-4 py-3"
          style={{ borderColor: "var(--poa-rule)" }}
        >
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="poa-stamp">NFT binding</span>
            <span className="font-mono text-[12.5px] text-[var(--poa-ink)]">
              {snapshot.tokenBinding.collectionName} #{snapshot.tokenBinding.tokenId}
              <span className="text-[var(--poa-ink-soft)]">
                {" "}
                / {snapshot.tokenBinding.collectionSize.toLocaleString()}
              </span>
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[var(--poa-ink-soft)]">
              {snapshot.tokenBinding.standard} · {snapshot.tokenBinding.chainName}
            </span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <a
              href={snapshot.tokenBinding.marketplaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="poa-stamp underline decoration-[color:var(--poa-rule)] underline-offset-[4px] transition-colors hover:text-[var(--poa-ink)] hover:decoration-[color:var(--poa-ink)]"
            >
              Marketplace ↗
            </a>
            <a
              href={snapshot.tokenBinding.explorerTokenUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="poa-stamp underline decoration-[color:var(--poa-rule)] underline-offset-[4px] transition-colors hover:text-[var(--poa-ink)] hover:decoration-[color:var(--poa-ink)]"
            >
              Token on explorer ↗
            </a>
          </div>
        </div>
      )}

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
