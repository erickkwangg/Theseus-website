// Sigil v2: a richer, more distinctive deterministic mark.
//
// Layered structure:
//   - outer ring with bytewise tick marks (24 ticks, modulated by hash bytes)
//   - an interior mirrored 8-cell-wide grid (denser than v1's 6-cell)
//   - optional corner kzg/lite glyph keyed to verification grade
//   - color tier driven by sovereignty + grade (sovereign + full = full
//     saturation indigo; lite = desaturated; controller-retained = single
//     ring weight instead of double)
//
// Same export name + checksum function so existing call sites compile.

import { cn } from "@/lib/utils";

type Tier = "stamp" | "mark";
type Saturation = "full" | "muted" | "faded";

type Props = {
  seed: string;
  size?: number;
  // Optional tier props. If omitted, v2 falls back to a sensible default that
  // looks a touch richer than v1 but doesn't claim a particular grade.
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

// Tick marks around the outer ring: 24 evenly-spaced strokes, modulated by
// hash bytes (long/short/very short).
function ringTicks(bytes: number[], cx: number, cy: number, r: number) {
  const ticks: { x1: number; y1: number; x2: number; y2: number; opacity: number }[] = [];
  const n = 24;
  for (let i = 0; i < n; i++) {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    const v = bytes[i % bytes.length];
    const len = 4 + (v % 7); // 4..10
    const opacity = 0.3 + (v / 255) * 0.65;
    const x1 = cx + Math.cos(angle) * r;
    const y1 = cy + Math.sin(angle) * r;
    const x2 = cx + Math.cos(angle) * (r + len);
    const y2 = cy + Math.sin(angle) * (r + len);
    ticks.push({ x1, y1, x2, y2, opacity });
  }
  return ticks;
}

function gridCells(bytes: number[], grid: number, cell: number, offset: number) {
  const cells: { x: number; y: number; opacity: number }[] = [];
  for (let y = 0; y < grid; y++) {
    for (let x = 0; x < grid / 2; x++) {
      const v = bytes[16 + y * (grid / 2) + x] ?? 128;
      const opacity = (v / 255) * 0.95;
      cells.push({ x: offset + x * cell, y: offset + y * cell, opacity });
      cells.push({
        x: offset + (grid - 1 - x) * cell,
        y: offset + y * cell,
        opacity,
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

  // Layout: padded outer ring + inner grid centered.
  const cx = size / 2;
  const cy = size / 2;
  const innerPad = size * 0.12; // ~12% padding inside frame for the ring
  const ringR = size / 2 - innerPad;
  const gridSize = 8;
  const innerExtent = ringR * 1.35; // grid sits inside ring
  const cell = innerExtent / gridSize;
  const offset = cx - innerExtent / 2;

  const ticks = ringTicks(bytes, cx, cy, ringR * 0.78);
  const cells = gridCells(bytes, gridSize, cell, offset);

  const fillOpacity =
    saturation === "full" ? 1 : saturation === "muted" ? 0.78 : 0.55;
  const ringWidth = tier === "stamp" ? 1.4 : 0.9;
  const showDoubleRing = tier === "stamp";

  // Corner badge: 'k' for full-KZG, 'm' for mixed, 's' for signature/lite.
  const badge =
    grade === "full" ? "K" : grade === "mixed" ? "M" : grade === "lite" ? "S" : null;

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
        className="fill-slate-100 dark:fill-slate-900/60"
      />
      <circle
        cx={cx}
        cy={cy}
        r={ringR + 1}
        fill={`url(#sg-${seed.slice(0, 6)})`}
        className="text-indigo-500"
      />

      {/* outer ring (single or double) */}
      <circle
        cx={cx}
        cy={cy}
        r={ringR}
        fill="none"
        strokeWidth={ringWidth}
        className="stroke-indigo-700/55 dark:stroke-indigo-300/55"
      />
      {showDoubleRing && (
        <circle
          cx={cx}
          cy={cy}
          r={ringR - 3}
          fill="none"
          strokeWidth={0.6}
          className="stroke-indigo-700/35 dark:stroke-indigo-300/35"
        />
      )}

      {/* tick marks */}
      {ticks.map((t, i) => (
        <line
          key={i}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          strokeWidth={0.7}
          className="stroke-indigo-700 dark:stroke-indigo-300"
          style={{ opacity: t.opacity * fillOpacity }}
        />
      ))}

      {/* grid */}
      {cells.map((c, i) => (
        <rect
          key={i}
          x={c.x}
          y={c.y}
          width={cell}
          height={cell}
          className="fill-indigo-600 dark:fill-indigo-300"
          style={{ opacity: c.opacity * fillOpacity }}
        />
      ))}

      {/* corner glyph indicating verification tier */}
      {badge && size >= 56 && (
        <g>
          <circle
            cx={size - innerPad - 6}
            cy={innerPad + 6}
            r={7}
            className="fill-slate-100 stroke-indigo-700/60 dark:fill-slate-900 dark:stroke-indigo-300/60"
            strokeWidth={0.8}
          />
          <text
            x={size - innerPad - 6}
            y={innerPad + 6 + 3}
            textAnchor="middle"
            fontSize={8}
            fontFamily="var(--font-mono, ui-monospace, SFMono-Regular, monospace)"
            className="fill-indigo-700 dark:fill-indigo-300"
            style={{ fontWeight: 600 }}
          >
            {badge}
          </text>
        </g>
      )}
    </svg>
  );
}
