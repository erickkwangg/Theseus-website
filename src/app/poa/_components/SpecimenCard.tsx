// SpecimenCard: the hero artifact on /poa. A condensed, factual credential
// card — same primitives as CredentialDocument, fewer rows, plain language.
// No vintage-diploma copy: this is product chrome, not LARP.

import { cn } from "@/lib/utils";
import Seal from "./Seal";

// A notary is the cleanest fit for an on-chain AI agent: its job IS to be
// a verified third party, and its attestations only have value if relying
// parties can independently check them. AI judgment matters (validity of
// signatures, identity of parties, formal requirements); on-chain identity
// matters (cross-jurisdiction verification without a central authority).
const SPECIMEN_NAME = "Themis Notary";
const SPECIMEN_DESC =
  "Independent timestamping and witness service for digital documents. Each attestation carries Themis's seal; anyone can verify it against the on-chain credential.";
// Theseus uses Polkadot SS58 addresses. Truncated head…tail for display.
const SPECIMEN_ADDR = "5HpG9w8E…WBz3K8nL";

type Row = { k: string; v: string };
const ROWS: Row[] = [
  { k: "Issued", v: "1 May 2026" },
  { k: "Issuer", v: "Theseus" },
  { k: "Operator", v: "Themis Labs" },
  { k: "Status", v: "Active" },
];

export default function SpecimenCard({ className }: { className?: string }) {
  return (
    <article
      aria-label="Proof of Agenthood specimen credential"
      style={{
        backgroundColor: "var(--poa-paper-card)",
        borderColor: "color-mix(in srgb, var(--poa-ink) 28%, transparent)",
      }}
      className={cn(
        "poa-paper poa-double-frame relative border",
        "shadow-[0_30px_60px_-32px_rgba(20,17,13,0.32)]",
        className,
      )}
    >
      {/* Top rail — spare. Wordmark left, serial right. */}
      <header
        className="flex items-center justify-between border-b px-6 py-3 sm:px-8"
        style={{ borderColor: "var(--poa-rule)" }}
      >
        <span className="poa-stamp">Proof of Agenthood</span>
        <span className="font-mono text-[11px] tabular-nums" style={{ color: "var(--poa-sepia)" }}>
          {SPECIMEN_ADDR}
        </span>
      </header>

      {/* Body — name + one-line role on the left, seal on the right.
         Below: a tight grid of facts. */}
      <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-y-8 sm:grid-cols-[1fr_auto] sm:gap-x-10">
          <div className="min-w-0">
            <h2
              className="font-serif tracking-[-0.02em] leading-[0.98] text-[clamp(2.25rem,5vw,3.5rem)] [text-wrap:balance]"
              style={{ color: "var(--poa-ink)" }}
            >
              {SPECIMEN_NAME}
            </h2>
            <p
              className="mt-4 max-w-md text-[15px] leading-relaxed sm:text-base"
              style={{ color: "var(--poa-ink-soft)" }}
            >
              {SPECIMEN_DESC}
            </p>
          </div>

          <div className="flex justify-center sm:justify-end">
            <Seal
              status="attested"
              label="Theseus"
              caption="Attested"
              size={120}
            />
          </div>
        </div>

        {/* Facts table — fixed-width labels, mono values. Reads as data. */}
        <dl
          className="mt-10 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2.5 border-t pt-6 sm:grid-cols-[auto_1fr_auto_1fr] sm:gap-x-8"
          style={{ borderColor: "var(--poa-rule)" }}
        >
          {ROWS.map((row) => (
            <div key={row.k} className="contents">
              <dt
                className="font-mono text-[10.5px] uppercase tracking-[0.18em]"
                style={{ color: "var(--poa-sepia)" }}
              >
                {row.k}
              </dt>
              <dd
                className="text-[14px]"
                style={{ color: "var(--poa-ink)" }}
              >
                {row.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
