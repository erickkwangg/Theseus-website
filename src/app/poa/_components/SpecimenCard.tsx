// SpecimenCard — a compact preview of what a credential looks like, used as
// the hero specimen on /poa. Mirrors CredentialDocument's typography but in a
// reduced, "swatch" form so it reads as an example, not a real document.

import { cn } from "@/lib/utils";
import Sigil, { checksumFromSeed } from "./Sigil";

type Row = [string, string, boolean?];

const SPECIMEN_NAME = "Iris Treasury";
const SPECIMEN_SUMMARY =
  "Autonomous USDC treasury within a fixed mandate.";
const SPECIMEN_SEED = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQYa3f9";

const ROWS: Row[] = [
  ["Mode", "sovereign · immutable", true],
  ["Skills", "Token Ops · Lending · DEX Trading"],
  ["Tools", "buy_sell_tokens"],
  ["Verification", "full · all KZG-proven"],
  ["Funding", "150 seus · active"],
];

export default function SpecimenCard({ className }: { className?: string }) {
  const checksum = checksumFromSeed(SPECIMEN_SEED);
  return (
    <article
      aria-label="Specimen credential"
      className={cn(
        "border border-slate-300/70 bg-white/70 backdrop-blur-[2px]",
        "dark:border-slate-700/55 dark:bg-slate-900/40",
        className,
      )}
    >
      <header className="flex items-center justify-between border-b border-slate-300/70 px-4 py-3 dark:border-slate-700/55">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-700 dark:text-slate-200">
          specimen · poa
        </span>
        <span className="font-mono text-[10.5px] tabular-nums text-slate-500 dark:text-slate-400">
          v0
        </span>
      </header>

      <div className="grid grid-cols-[1fr_auto] items-start gap-6 px-5 py-6">
        <div className="min-w-0">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            Agent
          </span>
          <p className="mt-1 font-serif text-2xl leading-tight tracking-tight text-slate-900 dark:text-slate-50">
            {SPECIMEN_NAME}
          </p>
          <p className="mt-2 text-[12.5px] leading-relaxed text-slate-700 dark:text-slate-300">
            {SPECIMEN_SUMMARY}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Sigil seed={SPECIMEN_SEED} size={64} />
          <span className="font-serif text-2xl italic leading-none tracking-tight text-slate-900 dark:text-slate-50">
            {checksum}
          </span>
        </div>
      </div>

      <div className="border-t border-slate-300/70 px-4 py-2 dark:border-slate-700/55">
        {ROWS.map(([k, v, accent], i) => (
          <div
            key={k}
            className={cn(
              "grid grid-cols-1 gap-y-0.5 border-b border-slate-200/70 py-2 last:border-b-0 sm:grid-cols-[110px_1fr] sm:gap-x-4 dark:border-slate-700/40",
              i === ROWS.length - 1 && "border-b-0",
            )}
          >
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
        ))}
      </div>

      <footer className="flex items-center justify-between border-t border-slate-300/70 px-4 py-3 dark:border-slate-700/55">
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="grid h-4 w-4 place-items-center rounded-full bg-indigo-500/15 text-indigo-600 dark:bg-indigo-400/20 dark:text-indigo-300"
          >
            ✓
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-indigo-700 dark:text-indigo-300">
            attested · 2026.05.01
          </span>
        </div>
        <span className="font-mono text-[10.5px] tabular-nums text-slate-500 dark:text-slate-400">
          block 1,234,567
        </span>
      </footer>
    </article>
  );
}
