// Diagrams: hand-drawn monoline SVGs used to replace text on PoA pages.
// Same visual language as the Glyph icon set: 1.4 stroke, currentColor,
// no fills except for accent dots. Sized in viewBox units; consumers
// override width/height via className or props.

import { cn } from "@/lib/utils";

const STROKE = 1.2;

// Small reusable parts ────────────────────────────────────────────────────
function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  // a simple line with a small triangular head
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const h = 4;
  return (
    <>
      <line
        x1={x1}
        y1={y1}
        x2={x2 - ux * h}
        y2={y2 - uy * h}
        strokeWidth={STROKE}
        stroke="currentColor"
        fill="none"
      />
      <path
        d={`M ${x2} ${y2} L ${x2 - ux * h - uy * 2.5} ${y2 - uy * h + ux * 2.5} L ${x2 - ux * h + uy * 2.5} ${y2 - uy * h - ux * 2.5} Z`}
        fill="currentColor"
        stroke="none"
      />
    </>
  );
}

function Caption({ x, y, children }: { x: number; y: number; children: React.ReactNode }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontFamily="var(--font-mono, ui-monospace, SFMono-Regular, monospace)"
      fontSize={9}
      letterSpacing={1.2}
      fill="currentColor"
      style={{ textTransform: "uppercase" }}
    >
      {children}
    </text>
  );
}

// 1. Verify flow ──────────────────────────────────────────────────────────
// JWS  →  JWKS  →  claims  →  ✓ freshness
export function VerifyFlow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 380 110"
      className={cn("text-slate-700 dark:text-slate-200", className)}
      role="img"
      aria-label="Verify flow: JWS verified against JWKS yields claims and a freshness check"
    >
      {/* JWS three-segment rectangle */}
      <g transform="translate(8 28)">
        <rect width="64" height="34" stroke="currentColor" fill="none" strokeWidth={STROKE} />
        <line x1="22" y1="0" x2="22" y2="34" stroke="currentColor" strokeWidth={0.6} />
        <line x1="42" y1="0" x2="42" y2="34" stroke="currentColor" strokeWidth={0.6} />
        <Caption x={32} y={78}>JWS</Caption>
      </g>

      <Arrow x1={78} y1={45} x2={104} y2={45} />

      {/* JWKS: key shape */}
      <g transform="translate(108 28)">
        <circle cx="14" cy="17" r="9" stroke="currentColor" fill="none" strokeWidth={STROKE} />
        <circle cx="14" cy="17" r="3" fill="currentColor" />
        <line x1="23" y1="17" x2="44" y2="17" stroke="currentColor" strokeWidth={STROKE} />
        <line x1="38" y1="17" x2="38" y2="22" stroke="currentColor" strokeWidth={STROKE} />
        <line x1="44" y1="17" x2="44" y2="20" stroke="currentColor" strokeWidth={STROKE} />
        <Caption x={28} y={78}>JWKS</Caption>
      </g>

      <Arrow x1={158} y1={45} x2={184} y2={45} />

      {/* claims doc */}
      <g transform="translate(188 22)">
        <rect width="72" height="46" stroke="currentColor" fill="none" strokeWidth={STROKE} />
        <line x1="8" y1="14" x2="48" y2="14" stroke="currentColor" strokeWidth={0.7} />
        <line x1="8" y1="22" x2="56" y2="22" stroke="currentColor" strokeWidth={0.7} />
        <line x1="8" y1="30" x2="40" y2="30" stroke="currentColor" strokeWidth={0.7} />
        <line x1="8" y1="38" x2="44" y2="38" stroke="currentColor" strokeWidth={0.7} />
        <Caption x={36} y={84}>CLAIMS</Caption>
      </g>

      <Arrow x1={266} y1={45} x2={292} y2={45} />

      {/* freshness gauge */}
      <g transform="translate(296 22)">
        <circle cx="24" cy="22" r="20" stroke="currentColor" fill="none" strokeWidth={STROKE} />
        <circle cx="24" cy="22" r="14" stroke="currentColor" fill="none" strokeWidth={0.6} />
        <path
          d="M 16 22 L 22 28 L 32 16"
          stroke="currentColor"
          fill="none"
          strokeWidth={STROKE * 1.1}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Caption x={24} y={84}>FRESHNESS</Caption>
      </g>
    </svg>
  );
}

// 2. Claim flow ───────────────────────────────────────────────────────────
// agent state  →  snapshot  →  controller signs  →  seal
export function ClaimFlow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 380 110"
      className={cn("text-slate-700 dark:text-slate-200", className)}
      role="img"
      aria-label="Claim flow: agent on-chain state is snapshotted, signed by controller, sealed as credential"
    >
      {/* on-chain agent: stack of 3 small blocks */}
      <g transform="translate(10 22)">
        <rect width="14" height="14" x="0" y="0" stroke="currentColor" fill="none" strokeWidth={STROKE} />
        <rect width="14" height="14" x="16" y="0" stroke="currentColor" fill="none" strokeWidth={STROKE} />
        <rect width="14" height="14" x="0" y="16" stroke="currentColor" fill="none" strokeWidth={STROKE} />
        <rect width="14" height="14" x="16" y="16" stroke="currentColor" fill="none" strokeWidth={STROKE} />
        <circle cx="40" cy="22" r="3" fill="currentColor" />
        <line x1="38" y1="22" x2="50" y2="22" stroke="currentColor" strokeWidth={0.6} />
        <Caption x={26} y={62}>ON-CHAIN</Caption>
      </g>

      <Arrow x1={70} y1={36} x2={102} y2={36} />

      {/* snapshot: small framed card with a sigil-like mark */}
      <g transform="translate(106 16)">
        <rect width="68" height="44" stroke="currentColor" fill="none" strokeWidth={STROKE} />
        <circle cx="50" cy="22" r="8" stroke="currentColor" fill="none" strokeWidth={STROKE * 0.8} />
        <rect x="46" y="18" width="2" height="2" fill="currentColor" />
        <rect x="52" y="18" width="2" height="2" fill="currentColor" />
        <rect x="46" y="24" width="8" height="2" fill="currentColor" />
        <line x1="6" y1="10" x2="34" y2="10" stroke="currentColor" strokeWidth={0.6} />
        <line x1="6" y1="16" x2="38" y2="16" stroke="currentColor" strokeWidth={0.6} />
        <line x1="6" y1="22" x2="30" y2="22" stroke="currentColor" strokeWidth={0.6} />
        <Caption x={34} y={68}>SNAPSHOT</Caption>
      </g>

      <Arrow x1={180} y1={36} x2={210} y2={36} />

      {/* controller signing: key + small wave/signature */}
      <g transform="translate(214 22)">
        <circle cx="10" cy="14" r="6" stroke="currentColor" fill="none" strokeWidth={STROKE} />
        <circle cx="10" cy="14" r="2" fill="currentColor" />
        <line x1="16" y1="14" x2="28" y2="14" stroke="currentColor" strokeWidth={STROKE} />
        <line x1="24" y1="14" x2="24" y2="18" stroke="currentColor" strokeWidth={STROKE} />
        <path
          d="M 32 22 q 6 -10 12 0 t 12 0"
          stroke="currentColor"
          fill="none"
          strokeWidth={STROKE * 0.9}
          strokeLinecap="round"
        />
        <Caption x={32} y={62}>CONTROLLER SIGNS</Caption>
      </g>

      <Arrow x1={284} y1={36} x2={308} y2={36} />

      {/* seal */}
      <g transform="translate(312 12)">
        <circle cx="24" cy="24" r="22" stroke="currentColor" fill="none" strokeWidth={STROKE} />
        <circle cx="24" cy="24" r="17" stroke="currentColor" fill="none" strokeWidth={0.6} />
        <text
          x="24"
          y="28"
          textAnchor="middle"
          fontFamily="var(--font-mono, ui-monospace, SFMono-Regular, monospace)"
          fontSize="14"
          fontWeight={600}
          fill="currentColor"
        >
          ✓
        </text>
        <Caption x={24} y={68}>SEAL</Caption>
      </g>
    </svg>
  );
}

// 3. Credential anatomy ──────────────────────────────────────────────────
// A reduced credential silhouette with callouts pointing at the key parts.
export function CredentialAnatomy({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 320"
      className={cn("text-slate-700 dark:text-slate-200", className)}
      role="img"
      aria-label="Anatomy of a credential: name, sigil, capability surface, attestation, seal"
    >
      {/* document outline (centered) */}
      <g transform="translate(110 18)">
        <rect width="260" height="284" stroke="currentColor" fill="none" strokeWidth={STROKE * 1.2} />
        {/* top bar */}
        <line x1="0" y1="22" x2="260" y2="22" stroke="currentColor" strokeWidth={0.6} />
        <text x="14" y="16" fontFamily="var(--font-mono, monospace)" fontSize="7" letterSpacing="1.2" fill="currentColor" style={{ textTransform: "uppercase" }}>PROOF OF AGENTHOOD</text>

        {/* big name */}
        <text x="20" y="60" fontFamily="var(--font-serif, serif)" fontSize="22" fill="currentColor" style={{ letterSpacing: "-0.5px" }}>Iris Treasury</text>
        <line x1="20" y1="68" x2="38" y2="68" stroke="currentColor" strokeWidth={0.7} />

        {/* tiny sigil mock */}
        <g transform="translate(202 38)">
          <circle cx="20" cy="20" r="16" stroke="currentColor" fill="none" strokeWidth={STROKE * 0.9} />
          <circle cx="20" cy="20" r="11" stroke="currentColor" fill="none" strokeWidth={0.5} />
          <rect x="17" y="14" width="6" height="2" fill="currentColor" />
          <rect x="14" y="18" width="2" height="3" fill="currentColor" />
          <rect x="24" y="18" width="2" height="3" fill="currentColor" />
          <rect x="17" y="23" width="6" height="2" fill="currentColor" />
        </g>

        {/* skill rows */}
        <g transform="translate(0 100)">
          <line x1="20" y1="0" x2="240" y2="0" stroke="currentColor" strokeWidth={0.4} />
          <text x="20" y="14" fontFamily="var(--font-mono, monospace)" fontSize="6" letterSpacing="1" fill="currentColor" style={{ textTransform: "uppercase" }}>SKILLS</text>
          <text x="80" y="14" fontFamily="var(--font-mono, monospace)" fontSize="7" fill="currentColor">Token Ops · DEX · Lending</text>
          <line x1="20" y1="22" x2="240" y2="22" stroke="currentColor" strokeWidth={0.4} />
          <text x="20" y="36" fontFamily="var(--font-mono, monospace)" fontSize="6" letterSpacing="1" fill="currentColor" style={{ textTransform: "uppercase" }}>MODE</text>
          <text x="80" y="36" fontFamily="var(--font-mono, monospace)" fontSize="7" fill="currentColor">sovereign · immutable</text>
          <line x1="20" y1="44" x2="240" y2="44" stroke="currentColor" strokeWidth={0.4} />
          <text x="20" y="58" fontFamily="var(--font-mono, monospace)" fontSize="6" letterSpacing="1" fill="currentColor" style={{ textTransform: "uppercase" }}>VERIF.</text>
          <text x="80" y="58" fontFamily="var(--font-mono, monospace)" fontSize="7" fill="currentColor">full · all KZG-proven</text>
          <line x1="20" y1="66" x2="240" y2="66" stroke="currentColor" strokeWidth={0.4} />
        </g>

        {/* seal */}
        <g transform="translate(20 220)">
          <circle cx="22" cy="22" r="20" stroke="currentColor" fill="none" strokeWidth={STROKE} />
          <circle cx="22" cy="22" r="15" stroke="currentColor" fill="none" strokeWidth={0.5} />
          <text x="22" y="26" textAnchor="middle" fontFamily="var(--font-mono, monospace)" fontSize="13" fontWeight={600} fill="currentColor">✓</text>
        </g>
        <text x="56" y="240" fontFamily="var(--font-mono, monospace)" fontSize="7" letterSpacing="1.2" fill="currentColor" style={{ textTransform: "uppercase" }}>ATTESTED</text>
        <text x="56" y="252" fontFamily="var(--font-mono, monospace)" fontSize="7" fill="currentColor">2026.05.01</text>
      </g>

      {/* callouts ──────────────────────────────────────────────────── */}
      {/* 1. agent name */}
      <g className="text-indigo-700 dark:text-indigo-300">
        <line x1="100" y1="60" x2="50" y2="60" stroke="currentColor" strokeWidth={0.6} />
        <line x1="50" y1="60" x2="50" y2="44" stroke="currentColor" strokeWidth={0.6} />
        <text x="50" y="38" textAnchor="middle" fontFamily="var(--font-mono, monospace)" fontSize="8" letterSpacing="1.4" fill="currentColor" style={{ textTransform: "uppercase" }}>NAME</text>
      </g>

      {/* 2. sigil */}
      <g className="text-indigo-700 dark:text-indigo-300">
        <line x1="370" y1="60" x2="425" y2="60" stroke="currentColor" strokeWidth={0.6} />
        <line x1="425" y1="60" x2="425" y2="44" stroke="currentColor" strokeWidth={0.6} />
        <text x="425" y="38" textAnchor="middle" fontFamily="var(--font-mono, monospace)" fontSize="8" letterSpacing="1.4" fill="currentColor" style={{ textTransform: "uppercase" }}>SIGIL</text>
      </g>

      {/* 3. skills */}
      <g className="text-indigo-700 dark:text-indigo-300">
        <line x1="370" y1="130" x2="425" y2="130" stroke="currentColor" strokeWidth={0.6} />
        <line x1="425" y1="130" x2="425" y2="148" stroke="currentColor" strokeWidth={0.6} />
        <text x="425" y="160" textAnchor="middle" fontFamily="var(--font-mono, monospace)" fontSize="8" letterSpacing="1.4" fill="currentColor" style={{ textTransform: "uppercase" }}>SKILLS</text>
        <text x="425" y="172" textAnchor="middle" fontFamily="var(--font-mono, monospace)" fontSize="6" fill="currentColor">bundled intents</text>
      </g>

      {/* 4. seal */}
      <g className="text-indigo-700 dark:text-indigo-300">
        <line x1="155" y1="262" x2="50" y2="262" stroke="currentColor" strokeWidth={0.6} />
        <line x1="50" y1="262" x2="50" y2="280" stroke="currentColor" strokeWidth={0.6} />
        <text x="50" y="294" textAnchor="middle" fontFamily="var(--font-mono, monospace)" fontSize="8" letterSpacing="1.4" fill="currentColor" style={{ textTransform: "uppercase" }}>SEAL</text>
        <text x="50" y="306" textAnchor="middle" fontFamily="var(--font-mono, monospace)" fontSize="6" fill="currentColor">attested · date</text>
      </g>
    </svg>
  );
}

// 4. JWS shape ────────────────────────────────────────────────────────────
// header.payload.signature: the three segments of a compact JWS.
export function JwsShape({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 380 80"
      className={cn("text-slate-700 dark:text-slate-200", className)}
      role="img"
      aria-label="JWS compact: header dot payload dot signature"
    >
      {/* header */}
      <g>
        <rect x="6" y="20" width="80" height="34" rx="3" stroke="currentColor" fill="none" strokeWidth={STROKE} />
        <text x="46" y="42" textAnchor="middle" fontFamily="var(--font-mono, monospace)" fontSize="10" fill="currentColor">header</text>
        <Caption x={46} y={70}>BASE64URL</Caption>
      </g>

      <text x="98" y="42" fontFamily="var(--font-mono, monospace)" fontSize="14" fill="currentColor">.</text>

      {/* payload */}
      <g>
        <rect x="108" y="20" width="160" height="34" rx="3" stroke="currentColor" fill="none" strokeWidth={STROKE} />
        <text x="188" y="42" textAnchor="middle" fontFamily="var(--font-mono, monospace)" fontSize="10" fill="currentColor">payload (claims)</text>
        <Caption x={188} y={70}>YOUR DATA</Caption>
      </g>

      <text x="280" y="42" fontFamily="var(--font-mono, monospace)" fontSize="14" fill="currentColor">.</text>

      {/* signature */}
      <g className="text-indigo-700 dark:text-indigo-300">
        <rect x="290" y="20" width="84" height="34" rx="3" stroke="currentColor" fill="none" strokeWidth={STROKE} />
        <text x="332" y="42" textAnchor="middle" fontFamily="var(--font-mono, monospace)" fontSize="10" fill="currentColor">signature</text>
        <Caption x={332} y={70}>EdDSA</Caption>
      </g>

      {/* top label */}
      <Caption x={190} y={12}>COMPACT JWS · 3 SEGMENTS, 2 DOTS</Caption>
    </svg>
  );
}

// 5. Verified-agent badge mockup ──────────────────────────────────────────
// A tiny browser-window frame showing how a third-party site might embed
// the badge.
export function BadgeMockup({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 180"
      className={cn("text-slate-700 dark:text-slate-200", className)}
      role="img"
      aria-label="Third-party site embedding a verified-agent badge"
    >
      {/* browser window */}
      <rect x="6" y="6" width="308" height="168" rx="8" stroke="currentColor" fill="none" strokeWidth={STROKE} />
      {/* title bar */}
      <line x1="6" y1="28" x2="314" y2="28" stroke="currentColor" strokeWidth={0.6} />
      <circle cx="20" cy="17" r="3" stroke="currentColor" fill="none" strokeWidth={0.6} />
      <circle cx="32" cy="17" r="3" stroke="currentColor" fill="none" strokeWidth={0.6} />
      <circle cx="44" cy="17" r="3" stroke="currentColor" fill="none" strokeWidth={0.6} />
      <rect x="76" y="11" width="180" height="12" rx="6" stroke="currentColor" fill="none" strokeWidth={0.5} />
      <text x="166" y="20" textAnchor="middle" fontFamily="var(--font-mono, monospace)" fontSize="6" fill="currentColor">someprotocol.xyz/agents/iris</text>

      {/* page content suggesting an agent profile elsewhere */}
      <text x="20" y="56" fontFamily="var(--font-serif, serif)" fontSize="16" fill="currentColor">Iris Treasury</text>
      <line x1="20" y1="64" x2="40" y2="64" stroke="currentColor" strokeWidth={0.6} />
      <text x="20" y="80" fontFamily="var(--font-mono, monospace)" fontSize="7" fill="currentColor">treasury bot · usdc lending</text>

      {/* embedded badge */}
      <g transform="translate(20 100)">
        <rect width="180" height="56" stroke="currentColor" fill="none" strokeWidth={STROKE} />
        <line x1="0" y1="14" x2="180" y2="14" stroke="currentColor" strokeWidth={0.4} />
        <text x="8" y="11" fontFamily="var(--font-mono, monospace)" fontSize="6" letterSpacing="1.2" fill="currentColor" style={{ textTransform: "uppercase" }}>VERIFIED · THESEUS PoA</text>

        {/* small sigil */}
        <g className="text-indigo-700 dark:text-indigo-300">
          <circle cx="22" cy="36" r="14" stroke="currentColor" fill="none" strokeWidth={STROKE * 0.9} />
          <circle cx="22" cy="36" r="9" stroke="currentColor" fill="none" strokeWidth={0.4} />
          <rect x="19" y="30" width="6" height="2" fill="currentColor" />
          <rect x="16" y="34" width="2" height="3" fill="currentColor" />
          <rect x="26" y="34" width="2" height="3" fill="currentColor" />
          <rect x="19" y="39" width="6" height="2" fill="currentColor" />
        </g>

        <text x="46" y="32" fontFamily="var(--font-serif, serif)" fontSize="11" fill="currentColor">Iris Treasury</text>
        <text x="46" y="46" fontFamily="var(--font-mono, monospace)" fontSize="6" fill="currentColor">sovereign · full KZG · attested</text>

        {/* check */}
        <g className="text-indigo-700 dark:text-indigo-300" transform="translate(150 30)">
          <circle cx="0" cy="0" r="8" stroke="currentColor" fill="none" strokeWidth={STROKE * 0.8} />
          <path d="M -4 0 L -1 3 L 4 -3" stroke="currentColor" fill="none" strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

      {/* caption */}
      <text x="160" y="170" textAnchor="middle" fontFamily="var(--font-mono, monospace)" fontSize="6" letterSpacing="1.2" fill="currentColor" style={{ textTransform: "uppercase" }}>BADGE EMBEDDED ON A THIRD-PARTY PAGE</text>
    </svg>
  );
}
