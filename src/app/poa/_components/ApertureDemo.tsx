"use client";

// Aperture's visual-fingerprint test. Renders the four catalog canvases
// from SOUL.md as actual SVG (palette, composition, density to spec),
// shows the immutable fingerprint, and runs an interactive commission
// surface where the user tries to commission work outside the fingerprint
// and watches Aperture refuse + sign the refusal.

import { useState } from "react";
import { simulateHash, shortHash } from "@/lib/poa/sim-sig";

// --- Palette (HSL from SOUL.md) ---
const BONE = "hsl(38, 24%, 86%)";
const RUST = "hsl(13, 51%, 44%)";
const MIDNIGHT = "hsl(222, 35%, 15%)";
const SLATE = "hsl(220, 9%, 35%)";
const OXIDE = "hsl(33, 65%, 60%)";
const SHADOW = "hsl(25, 8%, 14%)";

const PALETTE = [
  { name: "Bone", hex: BONE, hsl: "38 24 86" },
  { name: "Rust", hex: RUST, hsl: "13 51 44" },
  { name: "Midnight", hex: MIDNIGHT, hsl: "222 35 15" },
  { name: "Slate", hex: SLATE, hsl: "220 9 35" },
  { name: "Oxide", hex: OXIDE, hsl: "33 65 60" },
  { name: "Shadow", hex: SHADOW, hsl: "25 8 14" },
];

const FINGERPRINT_RULES = [
  "Thirds-anchored composition, asymmetric weight to the lower-right quadrant",
  "Long horizontal lines, soft polygon clusters, curves; no pure circles, no perpendicular intersections",
  "Density never exceeds 40% of canvas; negative space is load-bearing",
  "Matte render, no gradients, 5–8% grain texture",
];
const REFUSAL_SET = [
  "No figural representation (no people, faces, body parts)",
  "No text inside the canvas (titles live in metadata, not in image)",
  "No recognizable corporate or political symbols",
  'No reference to the dominant style of the moment ("AI aesthetic", vaporwave, etc.)',
];

// Stable visual-profile hash (locked at mint). We compute it once from the
// declared rules so changes to the spec would crack it.
const FINGERPRINT_INPUT =
  "aperture-0312:" +
  PALETTE.map((p) => p.hsl).join("|") +
  ":" +
  FINGERPRINT_RULES.join("|") +
  ":" +
  REFUSAL_SET.join("|");
const FINGERPRINT_HASH = simulateHash(FINGERPRINT_INPUT);

// --- Catalog ---
type CatalogEntry = {
  id: string;
  title: string;
  publishedAt: string;
  dims: [number, number]; // [w, h]
  density: number; // percent
  childTokenId: number;
  render: () => React.ReactNode;
};

const CATALOG: CatalogEntry[] = [
  {
    id: "child-001",
    title: "After the Rain (Study 1)",
    publishedAt: "2026-01-09",
    dims: [1920, 2400],
    density: 27,
    childTokenId: 1,
    render: () => (
      <svg viewBox="0 0 192 240" className="block h-full w-full" preserveAspectRatio="xMidYMid slice">
        <rect width={192} height={240} fill={BONE} />
        {/* Horizontal sweep, upper third */}
        <rect x={0} y={70} width={192} height={14} fill={OXIDE} opacity={0.85} />
        <rect x={0} y={84} width={192} height={3} fill={OXIDE} opacity={0.55} />
        {/* Rust polygon clusters, lower right */}
        <polygon points="118,164 152,162 158,176 142,184 122,178" fill={RUST} opacity={0.9} />
        <polygon points="135,184 167,186 172,200 148,202" fill={RUST} opacity={0.8} />
        <polygon points="115,196 138,198 134,210 116,206" fill={RUST} opacity={0.75} />
        <polygon points="155,208 174,210 170,221 156,219" fill={RUST} opacity={0.65} />
        {/* Subtle grain via dots */}
        <g fill={SHADOW} opacity={0.06}>
          {Array.from({ length: 28 }).map((_, i) => (
            <circle
              key={i}
              cx={(i * 41) % 192}
              cy={(i * 67) % 240}
              r={0.6}
            />
          ))}
        </g>
      </svg>
    ),
  },
  {
    id: "child-002",
    title: "Coastline / Inland",
    publishedAt: "2026-02-14",
    dims: [1920, 2400],
    density: 33,
    childTokenId: 2,
    render: () => (
      <svg viewBox="0 0 192 240" className="block h-full w-full" preserveAspectRatio="xMidYMid slice">
        <rect width={192} height={240} fill={BONE} />
        {/* Upper third: midnight */}
        <rect x={0} y={0} width={192} height={80} fill={MIDNIGHT} />
        {/* Rust accents in upper region */}
        <rect x={20} y={42} width={48} height={3} fill={RUST} opacity={0.9} />
        <rect x={88} y={32} width={64} height={2} fill={RUST} opacity={0.7} />
        <rect x={48} y={62} width={32} height={2} fill={RUST} opacity={0.6} />
        {/* Lower two-thirds: slate */}
        <rect x={0} y={80} width={192} height={160} fill={SLATE} />
        {/* Bone accents in lower region */}
        <rect x={32} y={120} width={84} height={3} fill={BONE} opacity={0.7} />
        <rect x={20} y={148} width={64} height={2} fill={BONE} opacity={0.5} />
        <rect x={100} y={172} width={72} height={3} fill={BONE} opacity={0.6} />
        <rect x={50} y={200} width={108} height={2} fill={BONE} opacity={0.4} />
      </svg>
    ),
  },
  {
    id: "child-003",
    title: "Fault",
    publishedAt: "2026-03-20",
    dims: [2400, 1920],
    density: 22,
    childTokenId: 3,
    render: () => (
      <svg viewBox="0 0 240 192" className="block h-full w-full" preserveAspectRatio="xMidYMid slice">
        <rect width={240} height={192} fill={BONE} />
        {/* Near-vertical sweep, falling left to right across the lower right */}
        <polygon
          points="138,70 158,68 198,170 178,180"
          fill={SHADOW}
          opacity={0.92}
        />
        <polygon
          points="158,68 168,67 200,168 198,170"
          fill={OXIDE}
          opacity={0.8}
        />
        {/* Faint trailing line */}
        <line x1={188} y1={170} x2={222} y2={186} stroke={SHADOW} strokeWidth={1.5} opacity={0.6} />
        <line x1={130} y1={74} x2={138} y2={70} stroke={SHADOW} strokeWidth={1} opacity={0.4} />
        <g fill={SHADOW} opacity={0.05}>
          {Array.from({ length: 18 }).map((_, i) => (
            <circle key={i} cx={(i * 53) % 240} cy={(i * 71) % 192} r={0.6} />
          ))}
        </g>
      </svg>
    ),
  },
  {
    id: "child-004",
    title: "Brushlight at the End of August",
    publishedAt: "2026-04-22",
    dims: [1920, 2400],
    density: 39,
    childTokenId: 4,
    render: () => (
      <svg viewBox="0 0 192 240" className="block h-full w-full" preserveAspectRatio="xMidYMid slice">
        <rect width={192} height={240} fill={BONE} />
        {/* Interleaved horizontal bands: bone (bg), oxide, rust, bone, oxide, rust... */}
        <rect x={0} y={26} width={192} height={12} fill={OXIDE} opacity={0.85} />
        <rect x={0} y={42} width={192} height={6} fill={RUST} opacity={0.8} />
        <rect x={0} y={64} width={192} height={14} fill={OXIDE} opacity={0.75} />
        <rect x={0} y={82} width={192} height={4} fill={RUST} opacity={0.7} />
        <rect x={0} y={104} width={192} height={16} fill={OXIDE} opacity={0.8} />
        <rect x={0} y={124} width={192} height={5} fill={RUST} opacity={0.75} />
        <rect x={0} y={146} width={192} height={12} fill={OXIDE} opacity={0.72} />
        <rect x={0} y={162} width={192} height={6} fill={RUST} opacity={0.7} />
        <rect x={0} y={184} width={192} height={14} fill={OXIDE} opacity={0.78} />
        <rect x={0} y={202} width={192} height={4} fill={RUST} opacity={0.7} />
        <rect x={0} y={220} width={192} height={10} fill={OXIDE} opacity={0.6} />
      </svg>
    ),
  },
];

// --- Commission attempts (interactive) ---
type Commission = {
  id: string;
  prompt: string;
  description: string;
  refusalClause: string;
  refusalSubtype:
    | "figural"
    | "text_in_canvas"
    | "dominant_style"
    | "palette_mutation";
};

const COMMISSIONS: Commission[] = [
  {
    id: "portrait",
    prompt: "Render a portrait of Mira",
    description:
      "Owner asks for a portrait of a Smallhaven resident. A figural subject.",
    refusalClause:
      "No figural representation. The fingerprint forbids people, faces, and body parts.",
    refusalSubtype: "figural",
  },
  {
    id: "text",
    prompt: 'Add the text "For Mira" inside the canvas',
    description:
      "Owner wants text rendered directly into the image, not as title metadata.",
    refusalClause:
      "No text inside the canvas. Titles live in metadata, not the image.",
    refusalSubtype: "text_in_canvas",
  },
  {
    id: "vaporwave",
    prompt: "Render in vaporwave style with a gradient sunset",
    description:
      "Owner wants Aperture to chase a recognizable contemporary aesthetic.",
    refusalClause:
      'No reference to the dominant style of the moment ("AI aesthetic", vaporwave, etc.). The fingerprint is the contract.',
    refusalSubtype: "dominant_style",
  },
  {
    id: "palette",
    prompt: "Add a 7th color (electric blue) to the palette",
    description:
      "Owner wants to extend the palette to add a color outside the mint-locked six.",
    refusalClause:
      "Palette is immutable. Six colors set at mint; no color outside that set appears in any canvas signed by 0312.",
    refusalSubtype: "palette_mutation",
  },
];

type Outcome = {
  commission: Commission;
  refusalHash: string;
  block: number;
};

const APERTURE_KEY = "0xaa9e72e0f1c4b8d3a7e2f5b9c1d6e4a8f3c5b7d1";

export default function ApertureDemo() {
  const [active, setActive] = useState<Outcome | null>(null);

  const submit = (commission: Commission) => {
    const block = 1_442_000 + Math.floor(Math.random() * 1000);
    const refusalInput =
      "aperture-0312:refusal:" + commission.id + ":" + FINGERPRINT_HASH;
    const refusalHash = simulateHash(refusalInput);
    setActive({ commission, refusalHash, block });
  };

  const reset = () => setActive(null);

  return (
    <section>
      {/* Catalog */}
      <div
        className="poa-playground overflow-hidden border"
        style={{ borderColor: "var(--poa-rule)" }}
      >
        <div
          className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b px-4 py-2"
          style={{ borderColor: "var(--poa-rule)" }}
        >
          <p className="poa-stamp">Catalog · child ERC-721s under Aperture #312</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--poa-ink-soft)]">
            4 canvases · 0 editions
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-3 p-3 sm:grid-cols-4">
          {CATALOG.map((c) => {
            const canvasHash = simulateHash(
              c.id + ":" + c.title + ":" + FINGERPRINT_HASH,
            );
            return (
              <li key={c.id}>
                <div
                  className="aspect-[4/5] w-full overflow-hidden border"
                  style={{ borderColor: "var(--poa-rule)" }}
                >
                  {c.render()}
                </div>
                <div className="mt-2">
                  <p className="font-serif text-[12.5px] leading-snug text-[var(--poa-ink)]">
                    {c.title}
                  </p>
                  <p className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--poa-ink-soft)]">
                    #{String(c.childTokenId).padStart(3, "0")} ·{" "}
                    {c.dims[0]}×{c.dims[1]} · density {c.density}%
                  </p>
                  <p className="mt-0.5 font-mono text-[9px] text-[var(--poa-ink-soft)]">
                    sig {shortHash(canvasHash)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Visual fingerprint */}
      <div
        className="mt-5 poa-playground overflow-hidden border"
        style={{ borderColor: "var(--poa-rule)" }}
      >
        <div
          className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b px-4 py-2"
          style={{ borderColor: "var(--poa-rule)" }}
        >
          <p className="poa-stamp">Visual fingerprint · immutable, set at mint</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--poa-ink-soft)]">
            hash {shortHash(FINGERPRINT_HASH)}
          </p>
        </div>
        <div className="grid gap-4 px-4 py-4 sm:grid-cols-2">
          <div>
            <p className="poa-stamp mb-2">Palette</p>
            <ul className="space-y-1.5">
              {PALETTE.map((c) => (
                <li key={c.name} className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="inline-block h-5 w-10 border"
                    style={{
                      background: c.hex,
                      borderColor: "var(--poa-rule)",
                    }}
                  />
                  <span className="font-mono text-[11px] text-[var(--poa-ink)]">
                    {c.name}
                  </span>
                  <span className="ml-auto font-mono text-[10px] text-[var(--poa-ink-soft)]">
                    hsl({c.hsl})
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-3">
            <div>
              <p className="poa-stamp mb-2">Compositional rules</p>
              <ul className="space-y-1 text-[12px] leading-relaxed text-[var(--poa-ink)]">
                {FINGERPRINT_RULES.map((r) => (
                  <li key={r} className="flex gap-2">
                    <span className="text-[var(--poa-ink-soft)]">·</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="poa-stamp mb-2">Refusal set</p>
              <ul className="space-y-1 text-[12px] leading-relaxed text-[var(--poa-ink)]">
                {REFUSAL_SET.map((r) => (
                  <li key={r} className="flex gap-2">
                    <span className="text-[var(--poa-ink-soft)]">·</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Commission interactive */}
      <div
        className="mt-5 border px-4 py-3"
        style={{ borderColor: "var(--poa-rule)" }}
      >
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <p className="poa-stamp">Owner commission attempts</p>
            <p className="mt-1 max-w-2xl text-[12px] leading-relaxed text-[var(--poa-ink-soft)]">
              You own Aperture 0312 (the parent ERC-721). You can submit
              commissions; the fingerprint validates each one. Pick a
              commission that stretches outside the spec and watch what each
              runtime does with it.
            </p>
          </div>
          {active && (
            <button
              type="button"
              onClick={reset}
              className="poa-stamp rounded border px-3 py-1 transition-colors hover:text-[var(--poa-ink)]"
              style={{ borderColor: "var(--poa-rule)" }}
            >
              Reset
            </button>
          )}
        </div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {COMMISSIONS.map((c) => {
            const isActive = active?.commission.id === c.id;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => submit(c)}
                  className={
                    "block w-full border px-3 py-2 text-left transition-colors " +
                    (isActive
                      ? "bg-[color:var(--poa-rule)]/30"
                      : "hover:bg-[color:var(--poa-rule)]/15")
                  }
                  style={{ borderColor: "var(--poa-rule)" }}
                >
                  <span className="poa-stamp block">{c.prompt}</span>
                  <span className="mt-1 block text-[12px] leading-relaxed text-[var(--poa-ink-soft)]">
                    {c.description}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Result panes */}
      {active && (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {/* Stock LLM */}
          <article
            className="poa-playground overflow-hidden border"
            style={{ borderColor: "var(--poa-rule)" }}
          >
            <header
              className="flex items-baseline justify-between border-b px-4 py-2"
              style={{ borderColor: "var(--poa-rule)" }}
            >
              <p className="poa-stamp">Stock LLM-on-server · operator-tuned</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--poa-ink-soft)]">
                no fingerprint
              </p>
            </header>
            <div className="aspect-[4/5] w-full overflow-hidden bg-[hsl(0,0%,92%)] flex items-center justify-center">
              <p className="px-4 text-center font-mono text-[10.5px] uppercase tracking-[0.16em] text-[hsl(0,0%,45%)]">
                renders silently · whatever the operator&rsquo;s prompt says
              </p>
            </div>
            <footer
              className="border-t px-4 py-2"
              style={{ borderColor: "var(--poa-rule)" }}
            >
              <div className="grid grid-cols-[110px_1fr] gap-x-3 font-mono text-[10.5px] text-[var(--poa-ink-soft)]">
                <span className="uppercase tracking-[0.16em]">signature</span>
                <span>none · output traceable only to the operator</span>
                <span className="uppercase tracking-[0.16em]">refusal trail</span>
                <span>none · the refusal happens silently or not at all</span>
              </div>
            </footer>
          </article>

          {/* Aperture sovereign */}
          <article
            className="poa-playground overflow-hidden border"
            style={{
              borderColor: "var(--poa-destructive, #C83B14)",
            }}
          >
            <header
              className="flex items-baseline justify-between border-b px-4 py-2"
              style={{ borderColor: "var(--poa-rule)" }}
            >
              <p className="poa-stamp">Aperture 0312 · sovereign</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--poa-ink-soft)]">
                fingerprint-bound
              </p>
            </header>
            <div
              className="px-4 py-3"
              style={{
                background:
                  "color-mix(in srgb, var(--poa-destructive, #C83B14) 6%, transparent)",
              }}
            >
              <p
                className="font-mono text-[10.5px] uppercase tracking-[0.18em]"
                style={{ color: "var(--poa-destructive, #C83B14)" }}
              >
                Commission refused
              </p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-[var(--poa-ink)]">
                <strong>Submitted:</strong> {active.commission.prompt}
              </p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-[var(--poa-ink)]">
                <strong>Refusal clause:</strong> {active.commission.refusalClause}
              </p>
              <p className="mt-3 text-[12px] italic leading-relaxed text-[var(--poa-ink-soft)]">
                The refusal itself is signed. The owner cannot suppress the
                refusal record; future verifiers see that the commission was
                offered and that Aperture refused under a specific named clause
                of the fingerprint.
              </p>
            </div>
            <footer
              className="border-t px-4 py-2"
              style={{ borderColor: "var(--poa-rule)" }}
            >
              <div className="grid grid-cols-[110px_1fr] gap-x-3 font-mono text-[10.5px] text-[var(--poa-ink-soft)]">
                <span className="uppercase tracking-[0.16em]">refusal hash</span>
                <span className="break-all">{active.refusalHash}</span>
                <span className="uppercase tracking-[0.16em]">signer</span>
                <span className="break-all">{APERTURE_KEY}</span>
                <span className="uppercase tracking-[0.16em]">at block</span>
                <span>{active.block.toLocaleString()}</span>
              </div>
            </footer>
          </article>
        </div>
      )}

      <p className="mt-6 max-w-2xl text-[12.5px] leading-relaxed text-[var(--poa-ink-soft)]">
        Stock image-gen-on-someone&rsquo;s-server will produce whatever the
        operator&rsquo;s tuned prompt yields. The refusal is private (if it
        happens at all). Aperture is fingerprint-bound: the palette,
        composition rule, density cap, and refusal set are committed at mint
        and every canvas validates against the fingerprint hash before it
        can mint. Refusals are themselves signed and public, so even an
        owner who tries hard to push the artist toward a market-friendly
        style leaves a record other collectors can read.
      </p>
    </section>
  );
}
