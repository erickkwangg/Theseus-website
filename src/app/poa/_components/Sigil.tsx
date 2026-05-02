// Sigil v3: same structure as v2 but tuned for distinguishability at small
// sizes (44-64px). The previous version's continuous-opacity grid blurred
// into the same-looking blob across different agents at thumbnail sizes.
//
// Changes:
//   - Cells are binary (drawn or not) based on hash byte threshold, so two
//     agents have visibly different fill patterns instead of similar gradient
//     averages.
//   - ~30% of outer ring tick marks are skipped per hash, giving each agent
//     a distinctive tick "fingerprint." Remaining ticks have wider length
//     variance (3..14 vs 4..10).
//   - Corner badge is rendered as a filled wax-red disc (visually loud) with
//     cream-colored letter, shown at size >= 44 instead of 56. Variants for
//     grade: full = solid disc, mixed = half-fill, lite = outline only.
//
// Same export name + checksum function so existing call sites compile.

import { cn } from "@/lib/utils";

type Tier = "stamp" | "mark";
type Saturation = "full" | "muted" | "faded";

type Props = {
  seed: string;
  size?: number;
  sovereign?: boolean;
  grade?: "full" | "mixed" | "lite" | "unknown";
  className?: string;
  shimmer?: boolean;
};

function hash(seed: string): number[] {
  const bytes: number[] = [];
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
    bytes.push(h & 0xff);
  }
  while (bytes.length < 96) {
    h = Math.imul(h ^ bytes.length, 0x01000193) >>> 0;
    bytes.push(h & 0xff);
  }
  return bytes;
}

export function checksumFromSeed(seed: string): string {
  const b = hash(seed);
  return b
    .slice(0, 3)
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

function tierFor(sovereign: boolean | undefined): Tier {
  return sovereign ? "stamp" : "mark";
}

function saturationFor(grade: Props["grade"]): Saturation {
  switch (grade) {
    case "full":
      return "full";
    case "mixed":
      return "muted";
    case "lite":
      return "faded";
    default:
      return "muted";
  }
}

// 24 evenly-spaced strokes around the outer ring. ~30% are skipped per hash
// (byte < 76), the rest get a dramatic length variation. Skipping cells
// produces a more distinctive per-agent silhouette.
function ringTicks(bytes: number[], cx: number, cy: number, r: number) {
  const ticks: { x1: number; y1: number; x2: number; y2: number; opacity: number }[] = [];
  const n = 24;
  for (let i = 0; i < n; i++) {
    const v = bytes[i % bytes.length];
    if (v < 76) continue; // ~30% drop rate
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    const len = 3 + (v % 12); // 3..14
    const opacity = 0.45 + (v / 255) * 0.5;
    const x1 = cx + Math.cos(angle) * r;
    const y1 = cy + Math.sin(angle) * r;
    const x2 = cx + Math.cos(angle) * (r + len);
    const y2 = cy + Math.sin(angle) * (r + len);
    ticks.push({ x1, y1, x2, y2, opacity });
  }
  return ticks;
}

// Binary on/off cells. Only emit a rect when the hash byte clears the
// threshold; ~50% fill rate with strong contrast against the cream paper.
function gridCells(bytes: number[], grid: number, cell: number, offset: number) {
  const cells: { x: number; y: number }[] = [];
  for (let y = 0; y < grid; y++) {
    for (let x = 0; x < grid / 2; x++) {
      const v = bytes[16 + y * (grid / 2) + x] ?? 128;
      if (v < 128) continue;
      cells.push({ x: offset + x * cell, y: offset + y * cell });
      cells.push({
        x: offset + (grid - 1 - x) * cell,
        y: offset + y * cell,
      });
    }
  }
  return cells;
}

export default function Sigil({
  seed,
  size = 64,
  sovereign,
  grade = "unknown",
  className,
  shimmer = false,
}: Props) {
  const bytes = hash(seed);
  const tier = tierFor(sovereign);
  const saturation = saturationFor(grade);

  const cx = size / 2;
  const cy = size / 2;
  const innerPad = size * 0.12;
  const ringR = size / 2 - innerPad;
  const gridSize = 8;
  const innerExtent = ringR * 1.4;
  const cell = innerExtent / gridSize;
  const offset = cx - innerExtent / 2;

  const ticks = ringTicks(bytes, cx, cy, ringR * 0.78);
  const cells = gridCells(bytes, gridSize, cell, offset);

  const fillOpacity =
    saturation === "full" ? 0.95 : saturation === "muted" ? 0.78 : 0.6;
  const ringWidth = tier === "stamp" ? 1.4 : 0.9;
  const showDoubleRing = tier === "stamp";

  // Corner badge: filled wax-red disc, variant by grade. The badge is the
  // single biggest visual differentiator between two agents at small sizes,
  // so it earns its loudness.
  const badge: { letter: string; fill: "solid" | "half" | "outline" } | null =
    grade === "full"
      ? { letter: "K", fill: "solid" }
      : grade === "mixed"
        ? { letter: "M", fill: "half" }
        : grade === "lite"
          ? { letter: "S", fill: "outline" }
          : null;

  const badgeR = Math.max(6, size * 0.13);
  const badgeCx = size - innerPad - badgeR * 0.45;
  const badgeCy = innerPad + badgeR * 0.45;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      aria-hidden
      className={cn(shimmer ? "poa-sigil-shimmer" : "", className)}
    >
      <defs>
        <radialGradient id={`sg-${seed.slice(0, 6)}`} cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.06" />
          <stop offset="80%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ground */}
      <rect
        x={0}
        y={0}
        width={size}
        height={size}
        fill="var(--poa-paper-card, #F1EAE1)"
      />
      <circle
        cx={cx}
        cy={cy}
        r={ringR + 1}
        fill={`url(#sg-${seed.slice(0, 6)})`}
        style={{ color: "var(--poa-wax, #7B1E1E)" }}
      />

      {/* outer ring (single or double for sovereign) */}
      <circle
        cx={cx}
        cy={cy}
        r={ringR}
        fill="none"
        strokeWidth={ringWidth}
        className="stroke-[color:var(--poa-ink,#14110D)]/55"
      />
      {showDoubleRing && (
        <circle
          cx={cx}
          cy={cy}
          r={ringR - 3}
          fill="none"
          strokeWidth={0.6}
          stroke="var(--poa-ink, #14110D)"
          style={{ opacity: 0.35 }}
        />
      )}

      {/* tick marks (binary present/absent + dramatic length) */}
      {ticks.map((t, i) => (
        <line
          key={i}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          strokeWidth={0.8}
          stroke="var(--poa-ink, #14110D)"
          style={{ opacity: t.opacity * fillOpacity }}
        />
      ))}

      {/* binary inner grid */}
      {cells.map((c, i) => (
        <rect
          key={i}
          x={c.x}
          y={c.y}
          width={cell}
          height={cell}
          fill="var(--poa-ink, #14110D)"
          style={{ opacity: 0.85 * fillOpacity }}
        />
      ))}

      {/* corner badge: wax-red disc + letter, variants by grade */}
      {badge && size >= 44 && (
        <g>
          {badge.fill === "solid" && (
            <circle
              cx={badgeCx}
              cy={badgeCy}
              r={badgeR}
              fill="var(--poa-wax, #7B1E1E)"
            />
          )}
          {badge.fill === "half" && (
            <>
              <circle
                cx={badgeCx}
                cy={badgeCy}
                r={badgeR}
                fill="var(--poa-paper-card, #F1EAE1)"
                stroke="var(--poa-wax, #7B1E1E)"
                strokeWidth={1.1}
              />
              <path
                d={`M ${badgeCx} ${badgeCy - badgeR}
                    A ${badgeR} ${badgeR} 0 0 1 ${badgeCx} ${badgeCy + badgeR} Z`}
                fill="var(--poa-wax, #7B1E1E)"
              />
            </>
          )}
          {badge.fill === "outline" && (
            <circle
              cx={badgeCx}
              cy={badgeCy}
              r={badgeR}
              fill="var(--poa-paper-card, #F1EAE1)"
              stroke="var(--poa-wax, #7B1E1E)"
              strokeWidth={1.1}
            />
          )}
          {size >= 56 && (
            <text
              x={badgeCx}
              y={badgeCy + badgeR * 0.35}
              textAnchor="middle"
              fontSize={badgeR * 1.05}
              fontFamily="var(--font-mono, ui-monospace, SFMono-Regular, monospace)"
              fill={
                badge.fill === "solid"
                  ? "var(--poa-paper-card, #F1EAE1)"
                  : "var(--poa-wax, #7B1E1E)"
              }
              style={{ fontWeight: 600 }}
            >
              {badge.letter}
            </text>
          )}
        </g>
      )}
    </svg>
  );
}
