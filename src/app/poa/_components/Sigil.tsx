// Sigil — a deterministic 6x6 monochrome mark generated from an agent's abgHash.
// Renders as a small SVG "stamp" using only indigo at varying opacities, plus a
// 6-character checksum drawn from the same hash. Intentionally restrained:
// the goal is a typographer's mark, not a blockie. Two of these don't read as
// "the same agent" — they read as "a credential of this kind."

type Props = {
  seed: string;
  size?: number;
  className?: string;
};

function hash(seed: string): number[] {
  // tiny FNV-1a so this can render server-side without bringing in crypto
  const bytes: number[] = [];
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
    bytes.push(h & 0xff);
  }
  while (bytes.length < 36) {
    h = Math.imul(h ^ bytes.length, 0x01000193) >>> 0;
    bytes.push(h & 0xff);
  }
  return bytes;
}

export function checksumFromSeed(seed: string): string {
  const bytes = hash(seed);
  return bytes
    .slice(0, 3)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

export default function Sigil({ seed, size = 56, className }: Props) {
  const bytes = hash(seed);
  const cell = size / 6;
  const cells: { x: number; y: number; opacity: number }[] = [];
  // Mirror across vertical axis for visual symmetry like classic blockies.
  for (let y = 0; y < 6; y++) {
    for (let x = 0; x < 3; x++) {
      const v = bytes[y * 3 + x];
      const opacity = (v / 255) * 0.95;
      cells.push({ x, y, opacity });
      cells.push({ x: 5 - x, y, opacity });
    }
  }
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <rect
        x={0}
        y={0}
        width={size}
        height={size}
        className="fill-slate-100 dark:fill-slate-900/60"
      />
      {cells.map((c, i) => (
        <rect
          key={i}
          x={c.x * cell}
          y={c.y * cell}
          width={cell}
          height={cell}
          className="fill-indigo-600 dark:fill-indigo-300"
          style={{ opacity: c.opacity }}
        />
      ))}
    </svg>
  );
}
