// CredentialDocument — the editorial centerpiece for /poa/[agentId].
// Modeled on the homepage Receipt: hairline borders, mono small-caps headers,
// staggered rows. Reads as a document about an agent, not about an address.
// Cryptographic identity is available but tucked into a disclosed section.

import { cn } from "@/lib/utils";
import type { StoredCredential, RevocationReason } from "@/lib/poa/types";
import { groupIntents } from "@/lib/poa/intents";
import Sigil, { checksumFromSeed } from "./Sigil";
import CopyButton from "./CopyButton";

type Props = {
  credential: StoredCredential;
  revocation: RevocationReason | null;
  className?: string;
};

const SECTION_GAP =
  "px-4 py-4 sm:px-6 sm:py-5 border-t border-slate-300/70 dark:border-slate-700/55";

export default function CredentialDocument({
  credential,
  revocation,
  className,
}: Props) {
  const { claims, jws, jti } = credential;
  const { agent } = claims;
  const checksum = checksumFromSeed(agent.agentId + agent.abgHash);
  const issuedISO = new Date(credential.issuedAt).toISOString();
  const issuedDate = issuedISO.slice(0, 10).replace(/-/g, ".");
  const issuedTime = issuedISO.slice(11, 16) + " UTC";
  const status = revocation ? "revoked" : "attested";
  const issuedRelative = relativeFromNow(credential.issuedAt);
  const jwsParts = jws.split(".");
  const [jwsHeader, jwsPayload, jwsSig] =
    jwsParts.length === 3 ? jwsParts : ["", "", ""];

  return (
    <article
      aria-label="Proof of Agenthood credential"
      className={cn(
        "border border-slate-300/70 bg-white/70 backdrop-blur-[2px]",
        "dark:border-slate-700/55 dark:bg-slate-900/40",
        className,
      )}
    >
      {/* Top bar — file header */}
      <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-slate-300/70 px-4 py-3 sm:px-6 dark:border-slate-700/55">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-700 dark:text-slate-200">
          Proof of Agenthood
        </span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          kid · theseus-poa-2026-04
        </span>
      </header>

      {/* Identity block — name + summary lead, sigil/checksum on the side */}
      <section className={cn(SECTION_GAP, "border-t-0 px-6 py-7 sm:px-8 sm:py-9")}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-[1fr_auto] sm:gap-10">
          <div className="min-w-0">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              Agent
            </span>
            <h2 className="mt-2 font-serif text-3xl leading-tight tracking-tight text-slate-900 sm:text-4xl dark:text-slate-50">
              {agent.name}
            </h2>
            {agent.summary && (
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
                {agent.summary}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <Sigil seed={agent.agentId + agent.abgHash} size={84} />
            <span className="font-serif text-[28px] italic leading-none tracking-tight text-slate-900 dark:text-slate-50">
              {checksum}
            </span>
          </div>
        </div>
      </section>

      {/* Capability surface */}
      <Section number="01" title="Capability surface">
        <KvRow k="Models" v={agent.capabilities.models.join(" · ") || "—"} />
        <KvRow k="Tools" v={agent.capabilities.tools.join(" · ") || "—"} />
        <IntentRow intentTypes={agent.capabilities.intentTypes} />
        <KvRow
          k="Sub-agents"
          v={
            agent.capabilities.subAgents.length
              ? agent.capabilities.subAgents.join(" · ")
              : "—"
          }
        />
      </Section>

      {/* Sovereignty / control */}
      <Section number="02" title="Control">
        <KvRow
          k="Mode"
          v={agent.sovereign ? "sovereign · immutable" : "controller-retained"}
          accent={agent.sovereign}
        />
        <KvRow
          k="Registered"
          v={`block ${agent.registration.atBlock.toLocaleString()}`}
        />
        <KvRow
          k="Funding"
          v={`${formatSeus(agent.funding.seusBalance)} · ${
            agent.funding.active ? "active" : "inactive"
          }`}
        />
      </Section>

      {/* Verification grade */}
      <Section number="03" title="Verification">
        <KvRow
          k="Grade"
          v={gradeLabel(agent.recentRuns.grade)}
          accent={agent.recentRuns.grade === "full"}
        />
        {agent.recentRuns.grade === "unknown" ? (
          <p className="mt-1 text-[12px] leading-relaxed text-slate-500 dark:text-slate-400">
            Verification grade requires aggregating recent <code className="font-mono">AgentRuns</code>{" "}
            against <code className="font-mono">Aivm</code> proof results — that&apos;s an
            indexer job, not a per-request RPC call. Not yet wired in this preview.
          </p>
        ) : (
          <>
            <KvRow k="Sample" v={`${agent.recentRuns.sampledRuns} runs`} />
            <KvRow
              k="KZG-verified"
              v={`${agent.recentRuns.inferenceMix.kzg} / ${agent.recentRuns.sampledRuns}`}
            />
            <KvRow
              k="Signature-only"
              v={`${agent.recentRuns.inferenceMix.signatureOnly} / ${agent.recentRuns.sampledRuns}`}
            />
          </>
        )}
        <KvRow k="Enclave-bound" v={agent.enclaveBound ? "yes" : "no"} />
      </Section>

      {/* Attestation — what kind, when */}
      <Section number="04" title="Attestation">
        <KvRow
          k="Kind"
          v={
            claims.attestation.kind === "snapshot"
              ? "snapshot · readable from chain by anyone"
              : "controller-attested · controller signed nonce"
          }
        />
        <KvRow
          k="Issued"
          v={`${issuedDate} · ${issuedTime}  (${issuedRelative})`}
        />
      </Section>

      {/* Machine-readable identity — disclosed by default. Styled to match the
          numbered-section pattern: a Section heading whose content collapses. */}
      <details className="group">
        <summary
          className={cn(
            SECTION_GAP,
            "list-none cursor-pointer flex items-baseline justify-between hover:bg-slate-50/60 dark:hover:bg-slate-900/40",
          )}
        >
          <span className="flex items-baseline gap-3">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-slate-700 dark:text-slate-200">
              Machine-readable identity
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500 group-open:hidden">
              expand →
            </span>
            <span className="hidden font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500 group-open:inline">
              ↓ collapse
            </span>
          </span>
          <span className="font-mono text-[10.5px] tabular-nums text-slate-400 dark:text-slate-500">
            05 · 06
          </span>
        </summary>

        <div className="border-t border-slate-300/70 dark:border-slate-700/55">
          <Section number="05" title="Identity">
            <KvRow k="Address" v={agent.agentId} mono copyable />
            <KvRow k="ABG hash" v={agent.abgHash} mono copyable />
            <KvRow k="ABG version" v={`v${agent.abgVersion}`} mono />
            <KvRow
              k="Controller"
              v={agent.controller ?? "— (sovereign)"}
              mono
              copyable={!!agent.controller}
            />
            {claims.attestation.kind === "controller-attested" && (
              <KvRow
                k="Nonce"
                v={claims.attestation.nonce}
                mono
                copyable
              />
            )}
            <KvRow k="Issuer" v="theseus.network/poa" />
            <KvRow k="JTI" v={jti} mono copyable />
            <KvRow
              k="Snapshot at"
              v={`block ${agent.snapshotAtBlock.toLocaleString()} · ${agent.snapshotAtTime}`}
            />
          </Section>

          <section className={SECTION_GAP}>
            <SectionHeading number="06" title="Signature" />
            <div className="mt-2 mb-4 flex items-center gap-3">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                full JWS
              </span>
              <CopyButton value={jws} label="JWS" />
            </div>
            <div className="space-y-2">
              <JwsSegment label="header" value={jwsHeader} />
              <JwsSegment label="payload" value={jwsPayload} />
              <JwsSegment label="signature" value={jwsSig} accent />
            </div>
          </section>
        </div>
      </details>

      {/* Footer seal */}
      <footer className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-slate-300/70 px-4 py-3 sm:px-6 dark:border-slate-700/55">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className={cn(
              "grid h-4 w-4 place-items-center rounded-full",
              status === "attested"
                ? "bg-indigo-500/15 text-indigo-600 dark:bg-indigo-400/20 dark:text-indigo-300"
                : "bg-rose-500/15 text-rose-600 dark:bg-rose-400/20 dark:text-rose-300",
            )}
          >
            {status === "attested" ? "✓" : "✕"}
          </span>
          <span
            className={cn(
              "font-mono text-[11px] uppercase tracking-[0.18em]",
              status === "attested"
                ? "text-indigo-700 dark:text-indigo-300"
                : "text-rose-700 dark:text-rose-300",
            )}
          >
            {status === "attested"
              ? `attested · ${issuedDate}`
              : `revoked · ${(revocation ?? "").replace(/-/g, " ")}`}
          </span>
        </div>
        <span className="font-mono text-[10.5px] tabular-nums text-slate-500 dark:text-slate-400">
          snapshot · block {agent.snapshotAtBlock.toLocaleString()}
        </span>
      </footer>
    </article>
  );
}

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={SECTION_GAP}>
      <SectionHeading number={number} title={title} />
      <div className="mt-3">{children}</div>
    </section>
  );
}

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-slate-700 dark:text-slate-200">
        {title}
      </span>
      <span className="font-mono text-[10.5px] tabular-nums text-slate-400 dark:text-slate-500">
        {number}
      </span>
    </div>
  );
}

function IntentRow({ intentTypes }: { intentTypes: string[] }) {
  if (intentTypes.length === 0) {
    return <KvRow k="Skills" v="—" />;
  }
  const grouped = groupIntents(intentTypes);
  return (
    <div className="grid grid-cols-1 items-baseline gap-y-1 border-b border-slate-200/70 py-2 sm:grid-cols-[minmax(140px,180px)_1fr] sm:gap-x-6 dark:border-slate-700/40">
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
        Skills
      </span>
      <div className="flex flex-col gap-1.5">
        {grouped.map(({ bundle, intentTypes: intents }) => (
          <details key={bundle.category} className="group">
            <summary
              className="flex cursor-pointer flex-wrap items-baseline gap-x-3 gap-y-1 list-none"
              title={bundle.useWhen}
            >
              <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-indigo-700 dark:text-indigo-300">
                {bundle.name}
              </span>
              <span className="font-mono text-[12px] text-slate-700 dark:text-slate-200">
                {intents.join(" · ")}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500 group-open:hidden">
                ?
              </span>
            </summary>
            <div className="mt-1.5 ml-0 sm:ml-1 text-[12px] leading-relaxed text-slate-600 dark:text-slate-300">
              <p>{bundle.description}</p>
              <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                use when · {bundle.useWhen}
              </p>
              {bundle.protocols && bundle.protocols.length > 0 && (
                <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  protocols · {bundle.protocols.join(" · ")}
                </p>
              )}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

function KvRow({
  k,
  v,
  accent,
  mono,
  copyable,
}: {
  k: string;
  v: string;
  accent?: boolean;
  mono?: boolean;
  copyable?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 items-baseline gap-y-0.5 border-b border-slate-200/70 py-2 last:border-b-0 sm:grid-cols-[minmax(140px,180px)_1fr] sm:gap-x-6 dark:border-slate-700/40">
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
        {k}
      </span>
      <span
        className={cn(
          "flex flex-wrap items-baseline gap-x-2 break-words text-[13.5px] leading-relaxed",
          mono ? "font-mono text-[12px]" : "",
          accent
            ? "text-indigo-700 dark:text-indigo-300"
            : "text-slate-800 dark:text-slate-100",
        )}
      >
        <span className="break-all">{v}</span>
        {copyable && <CopyButton value={v} label={k} />}
      </span>
    </div>
  );
}

function JwsSegment({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-[110px_1fr] sm:gap-4">
      <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
        {label}
      </span>
      <code
        className={cn(
          "block break-all font-mono text-[10.5px] leading-relaxed",
          accent
            ? "text-indigo-700 dark:text-indigo-300"
            : "text-slate-700 dark:text-slate-300",
        )}
      >
        {value}
      </code>
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
      return "unknown";
  }
}

function formatSeus(raw: string): string {
  if (!/^\d+$/.test(raw)) return `${raw} seus`;
  if (raw.length <= 12) return `${raw} micro-seus`;
  const whole = raw.slice(0, raw.length - 12);
  return `${Number(whole).toLocaleString()} seus`;
}

function relativeFromNow(epochMs: number): string {
  const diffSec = Math.max(0, (Date.now() - epochMs) / 1000);
  if (diffSec < 60) return "just now";
  const min = Math.floor(diffSec / 60);
  if (min < 60) return `${min} min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} h ago`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day} day${day === 1 ? "" : "s"} ago`;
  const month = Math.floor(day / 30);
  if (month < 12) return `${month} month${month === 1 ? "" : "s"} ago`;
  const year = Math.floor(day / 365);
  return `${year} year${year === 1 ? "" : "s"} ago`;
}
