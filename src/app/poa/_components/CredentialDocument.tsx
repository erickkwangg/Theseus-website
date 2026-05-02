// CredentialDocument — the editorial centerpiece for /poa/[agentId].
// v2: artifact treatment. Paper grain. Sovereign agents get a double-rule
// frame. Lite-grade agents are subtly desaturated. The bottom carries a real
// Seal, not a status pill. Sigil is large and central, shimmering when the
// credential is active. Technical terms have inline plain-language tooltips.

import { cn } from "@/lib/utils";
import type { StoredCredential, RevocationReason } from "@/lib/poa/types";
import { groupIntents } from "@/lib/poa/intents";
import Sigil, { checksumFromSeed } from "./Sigil";
import Seal from "./Seal";
import Glyph from "./Glyph";
import CopyButton from "./CopyButton";
import PoaTooltip from "./PoaTooltip";
import RelativeTime from "./RelativeTime";

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
  const status: "attested" | "revoked" = revocation ? "revoked" : "attested";
  const jwsParts = jws.split(".");
  const [jwsHeader, jwsPayload, jwsSig] =
    jwsParts.length === 3 ? jwsParts : ["", "", ""];

  return (
    <article
      aria-label="Proof of Agenthood credential"
      className={cn(
        "poa-paper poa-materialize relative border bg-white/72 backdrop-blur-[2px]",
        // Sovereign agents get a quiet double-frame. Controller-retained get
        // a single rule.
        agent.sovereign
          ? "border-indigo-700/30 poa-double-frame dark:border-indigo-300/30"
          : "border-slate-300/70 dark:border-slate-700/55",
        // Lite-grade agents read as "less verified" via subtle desaturation.
        agent.recentRuns.grade === "lite" && "poa-lite",
        "dark:bg-slate-900/45",
        className,
      )}
    >
      {/* Top bar — file header */}
      <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-slate-300/70 px-4 py-3 sm:px-6 dark:border-slate-700/55">
        <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-700 dark:text-slate-200">
          <Glyph name="scroll" size={14} className="text-slate-500 dark:text-slate-400" />
          Proof of Agenthood
        </span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          kid · theseus-poa-2026-04
        </span>
      </header>

      {/* Identity block — name + summary lead, big sigil + checksum on the side. */}
      <section className="border-t-0 px-6 py-9 sm:px-10 sm:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1fr_auto] sm:gap-12">
          <div className="min-w-0">
            <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              <Glyph
                name={agent.sovereign ? "sovereign" : "controller"}
                size={13}
              />
              {agent.sovereign ? "Sovereign agent" : "Agent"}
            </span>
            <h2 className="mt-3 font-serif text-3xl leading-[1.1] tracking-tight text-slate-900 [text-wrap:balance] sm:text-4xl lg:text-[44px] dark:text-slate-50">
              {agent.name}
            </h2>
            {/* Tiny ornamental rule under the name. */}
            <div
              className="mt-4 h-px w-12 bg-indigo-700/40 dark:bg-indigo-300/40"
              aria-hidden
            />
            {agent.summary && (
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
                {agent.summary}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end gap-3">
            <Sigil
              seed={agent.agentId + agent.abgHash}
              size={148}
              sovereign={agent.sovereign}
              grade={agent.recentRuns.grade}
              shimmer={status === "attested"}
            />
            <span className="font-serif text-[34px] italic leading-none tracking-tight text-slate-900 dark:text-slate-50">
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
          glyph={agent.sovereign ? "sovereign" : "controller"}
        />
        <KvRow
          k="Registered"
          v={`block ${agent.registration.atBlock.toLocaleString()}`}
          glyph="block"
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
          glyph={
            agent.recentRuns.grade === "full"
              ? "kzg"
              : agent.recentRuns.grade === "lite"
                ? "lite"
                : undefined
          }
        />
        {agent.recentRuns.grade === "unknown" ? (
          <p className="mt-1 text-[12px] leading-relaxed text-slate-500 dark:text-slate-400">
            Verification grade requires aggregating recent{" "}
            <code className="font-mono">AgentRuns</code> against{" "}
            <code className="font-mono">Aivm</code> proof results — that&apos;s
            an indexer job, not a per-request RPC call. Not yet wired in this
            preview.
          </p>
        ) : (
          <>
            <KvRow k="Sample" v={`${agent.recentRuns.sampledRuns} runs`} />
            <KvRow
              k={
                <PoaTooltip term="KZG-verified">
                  Inferences for which the prover produced a TensorCommitment
                  proof and the chain verified it via its native KZG host
                  function. Strongest verification tier.
                </PoaTooltip>
              }
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
        <div className="grid grid-cols-1 items-baseline gap-y-0.5 border-b border-slate-200/70 py-2 last:border-b-0 sm:grid-cols-[minmax(140px,180px)_1fr] sm:gap-x-6 dark:border-slate-700/40">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            Issued
          </span>
          <span className="text-[13.5px] leading-relaxed text-slate-800 dark:text-slate-100">
            {issuedDate} · {issuedTime}{" "}
            <span className="text-slate-500 dark:text-slate-400">
              (
              <RelativeTime epochMs={credential.issuedAt} />)
            </span>
          </span>
        </div>
      </Section>

      {/* Machine-readable identity — disclosed by default. */}
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
            <KvRow
              k={
                <PoaTooltip term="ABG hash">
                  Hash of the agent&apos;s compiled Agent Behavior Graph — the
                  on-chain bytecode-equivalent for what the agent can do.
                  Changes when the controller updates the agent.
                </PoaTooltip>
              }
              v={agent.abgHash}
              mono
              copyable
            />
            <KvRow k="ABG version" v={`v${agent.abgVersion}`} mono />
            <KvRow
              k="Controller"
              v={agent.controller ?? "— (sovereign)"}
              mono
              copyable={!!agent.controller}
            />
            {claims.attestation.kind === "controller-attested" && (
              <KvRow k="Nonce" v={claims.attestation.nonce} mono copyable />
            )}
            <KvRow k="Issuer" v="theseus.network/poa" />
            <KvRow
              k={
                <PoaTooltip term="JTI">
                  Unique credential ID. Use it to look up or revoke this
                  specific credential. Different from the agent&apos;s
                  on-chain address.
                </PoaTooltip>
              }
              v={jti}
              mono
              copyable
            />
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

      {/* Footer — real seal */}
      <footer className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-slate-300/70 px-4 py-5 sm:px-6 dark:border-slate-700/55">
        <div className="flex items-center gap-4">
          <Seal
            status={status}
            label={status === "attested" ? "Attested" : "Revoked"}
            caption={
              status === "attested"
                ? `BLOCK ${agent.snapshotAtBlock.toLocaleString()}`
                : (revocation ?? "").replace(/-/g, " ")
            }
            size={84}
          />
          <div className="flex flex-col gap-0.5">
            <span
              className={cn(
                "font-mono text-[11px] uppercase tracking-[0.18em]",
                status === "attested"
                  ? "text-indigo-700 dark:text-indigo-300"
                  : "text-rose-700 dark:text-rose-300",
              )}
            >
              {status === "attested" ? "attested" : "revoked"} ·{" "}
              {issuedDate}
            </span>
            <span className="font-mono text-[10.5px] tabular-nums text-slate-500 dark:text-slate-400">
              <RelativeTime epochMs={credential.issuedAt} />
            </span>
          </div>
        </div>
        <span className="font-mono text-[10.5px] tabular-nums text-slate-500 dark:text-slate-400">
          theseus.network/poa
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

type GlyphName = React.ComponentProps<typeof Glyph>["name"];

function KvRow({
  k,
  v,
  accent,
  mono,
  copyable,
  glyph,
}: {
  k: React.ReactNode;
  v: string;
  accent?: boolean;
  mono?: boolean;
  copyable?: boolean;
  glyph?: GlyphName;
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
        {glyph && (
          <Glyph
            name={glyph}
            size={14}
            className={cn(
              "shrink-0 self-center",
              accent
                ? "text-indigo-700 dark:text-indigo-300"
                : "text-slate-500 dark:text-slate-400",
            )}
          />
        )}
        <span className="break-all">{v}</span>
        {copyable && <CopyButton value={v} label={typeof k === "string" ? k : undefined} />}
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
      return "unknown · indexer not wired";
  }
}

function formatSeus(raw: string): string {
  if (!/^\d+$/.test(raw)) return `${raw} seus`;
  if (raw.length <= 12) return `${raw} micro-seus`;
  const whole = raw.slice(0, raw.length - 12);
  return `${Number(whole).toLocaleString()} seus`;
}
