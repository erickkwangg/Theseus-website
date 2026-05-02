// SnapshotPreviewCard — shows the on-chain state that's about to be baked
// into a credential, *before* the user signs anything. Same visual language
// as SpecimenCard but rendered from real (or fixture) AgentSnapshot data.

import { cn } from "@/lib/utils";
import type { AgentSnapshot } from "@/lib/poa/types";
import { groupIntents } from "@/lib/poa/intents";
import Sigil, { checksumFromSeed } from "./Sigil";
import Glyph from "./Glyph";

type Props = { snapshot: AgentSnapshot; className?: string };

export default function SnapshotPreviewCard({ snapshot, className }: Props) {
  const checksum = checksumFromSeed(snapshot.agentId + snapshot.abgHash);
  const requiresSig = !snapshot.sovereign;
  return (
    <article
      className={cn(
        "border border-slate-300/70 bg-white/70 dark:border-slate-700/55 dark:bg-slate-900/40",
        className,
      )}
    >
      <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-slate-300/70 px-4 py-3 dark:border-slate-700/55">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-700 dark:text-slate-200">
          about to bake
        </span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          snapshot · block {snapshot.snapshotAtBlock.toLocaleString()}
        </span>
      </header>

      <div className="grid grid-cols-[1fr_auto] items-start gap-6 px-5 py-5">
        <div className="min-w-0">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            Agent
          </span>
          <p
            key={snapshot.agentId}
            className="poa-write-in mt-1 font-serif text-2xl leading-tight tracking-tight text-slate-900 dark:text-slate-50"
          >
            {snapshot.name}
          </p>
          {snapshot.summary && (
            <p className="mt-2 text-[12.5px] leading-relaxed text-slate-700 dark:text-slate-300">
              {snapshot.summary}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <Sigil
            seed={snapshot.agentId + snapshot.abgHash}
            size={72}
            sovereign={snapshot.sovereign}
            grade={snapshot.recentRuns.grade}
          />
          <span className="font-serif text-xl italic leading-none tracking-tight text-slate-900 dark:text-slate-50">
            {checksum}
          </span>
        </div>
      </div>

      <div className="border-t border-slate-300/70 px-4 py-2 dark:border-slate-700/55">
        <Row k="Mode" v={snapshot.sovereign ? "sovereign · immutable" : "controller-retained"} accent={snapshot.sovereign} />
        <Row k="Skills" v={skillsSummary(snapshot.capabilities.intentTypes)} />
        <Row
          k="Tools"
          v={snapshot.capabilities.tools.join(" · ") || "—"}
        />
        <Row k="Verification" v={gradeLabel(snapshot.recentRuns.grade)} />
        <Row k="Funding" v={fmtSeus(snapshot.funding.seusBalance)} />
      </div>

      <footer className="border-t border-slate-300/70 px-4 py-3 dark:border-slate-700/55">
        <p className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-700 dark:text-slate-200">
          <Glyph
            name={requiresSig ? "key" : "sovereign"}
            size={13}
            className="text-slate-500 dark:text-slate-400"
          />
          {requiresSig
            ? "controller will be asked to sign a nonce"
            : "no signature required — sovereign agent"}
        </p>
      </footer>
    </article>
  );
}

function Row({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-y-0.5 border-b border-slate-200/70 py-2 last:border-b-0 sm:grid-cols-[110px_1fr] sm:gap-x-4 dark:border-slate-700/40">
      <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
        {k}
      </span>
      <span
        className={cn(
          "text-[12.5px] break-words",
          accent
            ? "text-indigo-700 dark:text-indigo-300"
            : "text-slate-800 dark:text-slate-100",
        )}
      >
        {v}
      </span>
    </div>
  );
}

function gradeLabel(g: string): string {
  switch (g) {
    case "full":
      return "full · all KZG-proven";
    case "mixed":
      return "mixed · KZG + signature";
    case "lite":
      return "lite · signature only";
    default:
      return "unknown · indexer not wired";
  }
}

function skillsSummary(intentTypes: string[]): string {
  if (intentTypes.length === 0) return "—";
  const grouped = groupIntents(intentTypes);
  return grouped.map((g) => g.bundle.name).join(" · ");
}

function fmtSeus(raw: string): string {
  if (!/^\d+$/.test(raw)) return raw;
  if (raw === "0") return "0 seus";
  if (raw.length <= 12) return `${raw} micro-seus`;
  const whole = raw.slice(0, raw.length - 12);
  return `${Number(whole).toLocaleString()} seus`;
}
