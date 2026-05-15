// CredentialDocument: the editorial centerpiece for /poa/[agentId].
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
  "px-4 py-4 sm:px-6 sm:py-5 border-t border-[color:var(--poa-rule)]";

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
      style={{
        backgroundColor: "var(--poa-paper-card)",
        borderColor: agent.sovereign
          ? "color-mix(in srgb, var(--poa-ink) 28%, transparent)"
          : "var(--poa-rule)",
      }}
      className={cn(
        "poa-paper poa-materialize relative border",
        agent.sovereign && "poa-double-frame",
        // Lite-grade agents read as "less verified" via subtle desaturation.
        agent.recentRuns.grade === "lite" && "poa-lite",
        // Revoked credentials carry a diagonal VOID watermark.
        revocation && "poa-void",
        className,
      )}
    >
      {/* Top bar: file header */}
      <header
        className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b px-4 py-3 sm:px-6"
        style={{ borderColor: "var(--poa-rule)" }}
      >
        <span className="flex items-center gap-2 poa-stamp">
          <Glyph name="scroll" size={14} />
          Proof of Agenthood
        </span>
        <span className="poa-stamp">kid · theseus-poa-2026-04</span>
      </header>

      {/* Identity block: name + summary lead, big sigil + checksum on the side. */}
      <section className="border-t-0 px-6 py-9 sm:px-10 sm:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1fr_auto] sm:gap-12">
          <div className="min-w-0">
            <span className="flex items-center gap-2 poa-stamp">
              <Glyph
                name={agent.sovereign ? "sovereign" : "controller"}
                size={13}
              />
              {agent.sovereign ? "Sovereign agent" : "Agent"}
            </span>
            <h2 className="poa-write-in mt-3 font-serif text-3xl leading-[1.1] tracking-tight text-[var(--poa-ink)] [text-wrap:balance] sm:text-4xl lg:text-[44px]">
              {agent.name}
            </h2>
            {/* Tiny ornamental rule under the name. */}
            <div
              className="mt-4 h-px w-12"
              style={{ backgroundColor: "var(--poa-wax)" }}
              aria-hidden
            />
            {agent.summary && (
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--poa-ink-soft)]">
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
            <span className="font-serif text-[34px] italic leading-none tracking-tight text-[var(--poa-ink)]">
              {checksum}
            </span>
          </div>
        </div>
      </section>

      {/* Capability surface */}
      <Section number="01" title="Capability surface">
        <KvRow k="Models" v={agent.capabilities.models.join(" · ") || "·"} />
        <KvRow k="Tools" v={agent.capabilities.tools.join(" · ") || "·"} />
        <IntentRow intentTypes={agent.capabilities.intentTypes} />
        <KvRow
          k="Sub-agents"
          v={
            agent.capabilities.subAgents.length
              ? agent.capabilities.subAgents.join(" · ")
              : "·"
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
          <p
            className="mt-1 text-[12px] leading-relaxed"
            style={{ color: "var(--poa-ink-soft)" }}
          >
            Verification grade requires aggregating recent{" "}
            <code className="font-mono">AgentRuns</code> against{" "}
            <code className="font-mono">Aivm</code> proof results. That&apos;s
            an indexer job, not a per-request RPC call. Not yet wired up in
            this preview.
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

      {/* Attestation: what kind, when */}
      <Section number="04" title="Attestation">
        <KvRow
          k="Kind"
          v={
            claims.attestation.kind === "snapshot"
              ? "snapshot · readable from chain by anyone"
              : "controller-attested · controller signed nonce"
          }
        />
        <div
          className="grid grid-cols-1 items-baseline gap-y-0.5 border-b py-2 last:border-b-0 sm:grid-cols-[minmax(140px,180px)_1fr] sm:gap-x-6"
          style={{ borderColor: "var(--poa-rule-soft)" }}
        >
          <span
            className="font-mono text-[11px] uppercase tracking-[0.16em]"
            style={{ color: "var(--poa-sepia)" }}
          >
            Issued
          </span>
          <span
            className="text-[13.5px] leading-relaxed"
            style={{ color: "var(--poa-ink)" }}
          >
            {issuedDate} · {issuedTime}{" "}
            <span style={{ color: "var(--poa-sepia)" }}>
              (
              <RelativeTime epochMs={credential.issuedAt} />)
            </span>
          </span>
        </div>
      </Section>

      {/* Machine-readable identity, disclosed by default. */}
      <details className="group">
        <summary
          className={cn(
            SECTION_GAP,
            "list-none cursor-pointer flex items-baseline justify-between transition-colors hover:bg-[color:var(--poa-rule-soft)]",
          )}
        >
          <span className="flex items-baseline gap-3">
            <span className="poa-stamp" style={{ color: "var(--poa-ink-soft)" }}>
              Machine-readable identity
            </span>
            <span className="poa-stamp group-open:hidden">expand →</span>
            <span className="poa-stamp hidden group-open:inline">↓ collapse</span>
          </span>
          <span className="poa-stamp tabular-nums">05 · 06</span>
        </summary>

        <div
          className="border-t"
          style={{ borderColor: "var(--poa-rule)" }}
        >
          <Section number="05" title="Identity">
            <KvRow k="Address" v={agent.agentId} mono copyable />
            <KvRow
              k={
                <PoaTooltip term="ABG hash">
                  Hash of the agent&apos;s compiled Agent Behavior Graph. It&apos;s
                  the on-chain bytecode-equivalent for what the agent can do,
                  and it changes when the controller updates the agent.
                </PoaTooltip>
              }
              v={agent.abgHash}
              mono
              copyable
            />
            <KvRow k="ABG version" v={`v${agent.abgVersion}`} mono />
            <KvRow
              k="Controller"
              v={agent.controller ?? "· (sovereign)"}
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
              <span className="poa-stamp">full JWS</span>
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

      {/* Footer: real seal */}
      <footer
        className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t px-4 py-5 sm:px-6"
        style={{ borderColor: "var(--poa-rule)" }}
      >
        <div className="flex items-center gap-4">
          <div className="poa-seal-press">
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
          </div>
          <div className="flex flex-col gap-0.5">
            <span
              className="font-mono text-[11px] uppercase tracking-[0.18em]"
              style={{
                color: status === "attested"
                  ? "var(--poa-ink)"
                  : "var(--poa-destructive)",
              }}
            >
              {status === "attested" ? "attested" : "revoked"} ·{" "}
              {issuedDate}
            </span>
            <span className="poa-stamp tabular-nums">
              <RelativeTime epochMs={credential.issuedAt} />
            </span>
          </div>
        </div>
        <span className="poa-stamp tabular-nums">theseus.network/poa</span>
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
      <span className="poa-stamp" style={{ color: "var(--poa-ink-soft)" }}>
        {title}
      </span>
      <span className="poa-stamp tabular-nums">{number}</span>
    </div>
  );
}

function IntentRow({ intentTypes }: { intentTypes: string[] }) {
  if (intentTypes.length === 0) {
    return <KvRow k="Skills" v="·" />;
  }
  const grouped = groupIntents(intentTypes);
  return (
    <div
      className="grid grid-cols-1 items-baseline gap-y-1 border-b py-2 sm:grid-cols-[minmax(140px,180px)_1fr] sm:gap-x-6"
      style={{ borderColor: "var(--poa-rule-soft)" }}
    >
      <span
        className="font-mono text-[11px] uppercase tracking-[0.16em]"
        style={{ color: "var(--poa-sepia)" }}
      >
        Skills
      </span>
      <div className="flex flex-col gap-1.5">
        {grouped.map(({ bundle, intentTypes: intents }) => (
          <details key={bundle.category} className="group">
            <summary
              className="flex cursor-pointer flex-wrap items-baseline gap-x-3 gap-y-1 list-none"
              title={bundle.useWhen}
            >
              <span
                className="font-mono text-[10.5px] uppercase tracking-[0.16em]"
                style={{ color: "var(--poa-wax)" }}
              >
                {bundle.name}
              </span>
              <span
                className="font-mono text-[12px]"
                style={{ color: "var(--poa-ink)" }}
              >
                {intents.join(" · ")}
              </span>
              <span
                className="font-mono text-[10px] uppercase tracking-[0.16em] group-open:hidden"
                style={{ color: "var(--poa-sepia)" }}
              >
                ?
              </span>
            </summary>
            <div
              className="mt-1.5 ml-0 sm:ml-1 text-[12px] leading-relaxed"
              style={{ color: "var(--poa-ink-soft)" }}
            >
              <p>{bundle.description}</p>
              <p
                className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.14em]"
                style={{ color: "var(--poa-sepia)" }}
              >
                use when · {bundle.useWhen}
              </p>
              {bundle.protocols && bundle.protocols.length > 0 && (
                <p
                  className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.14em]"
                  style={{ color: "var(--poa-sepia)" }}
                >
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
    <div
      className="grid grid-cols-1 items-baseline gap-y-0.5 border-b py-2 last:border-b-0 sm:grid-cols-[minmax(140px,180px)_1fr] sm:gap-x-6"
      style={{ borderColor: "var(--poa-rule-soft)" }}
    >
      <span
        className="font-mono text-[11px] uppercase tracking-[0.16em]"
        style={{ color: "var(--poa-sepia)" }}
      >
        {k}
      </span>
      <span
        className={cn(
          "flex flex-wrap items-baseline gap-x-2 break-words text-[13.5px] leading-relaxed",
          mono ? "font-mono text-[12px]" : "",
        )}
        style={{
          color: accent ? "var(--poa-wax)" : "var(--poa-ink)",
        }}
      >
        {glyph && (
          <span
            className="inline-flex shrink-0 self-center"
            style={{ color: accent ? "var(--poa-wax)" : "var(--poa-sepia)" }}
          >
            <Glyph name={glyph} size={14} />
          </span>
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
      <span className="poa-stamp">{label}</span>
      <code
        className="block break-all font-mono text-[10.5px] leading-relaxed"
        style={{ color: accent ? "var(--poa-wax)" : "var(--poa-ink-soft)" }}
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
