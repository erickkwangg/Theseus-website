// Seal: a real letterpress-feeling badge for the credential footer and
// the hero specimen. Concentric rings + arc text + a wax disc carrying
// an emblematic device (a labyrinth, Theseus's mythological mark).
// Reads as an object, not a status pill.

import { cn } from "@/lib/utils";

// A simplified 3-circuit classical labyrinth, rendered as concentric arcs
// with an entrance at the bottom. Read as "maze" / "Theseus's mark" at any
// reasonable size.
function arcPath(r: number, gapRad: number, steps = 48): string {
  const startAngle = Math.PI / 2 - gapRad;
  const arcLength = 2 * Math.PI - 2 * gapRad;
  const points: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = startAngle - arcLength * t;
    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle);
    points.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return points.join(" ");
}

function Labyrinth({ size }: { size: number }) {
  // size = diameter of the labyrinth bounding box.
  const r1 = size * 0.5;
  const r2 = size * 0.34;
  const r3 = size * 0.18;
  const stroke = "rgba(255, 247, 235, 0.92)";
  const sw = Math.max(0.7, size * 0.05);
  const gap = 0.32;

  return (
    <g
      stroke={stroke}
      strokeWidth={sw}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={arcPath(r1, gap)} />
      <path d={arcPath(r2, gap)} />
      <path d={arcPath(r3, gap)} />
      <circle
        cx={0}
        cy={0}
        r={Math.max(0.6, size * 0.06)}
        fill={stroke}
        stroke="none"
      />
    </g>
  );
}

// Manual letter-by-letter arc text. <textPath> distributes glyphs unevenly
// along curves; positioning each letter by hand gives crisp, uniform spacing.
function ArcText({
  text,
  radius,
  fontSize,
  position,
  totalAngle,
}: {
  text: string;
  radius: number;
  fontSize: number;
  position: "top" | "bottom";
  totalAngle: number; // radians, the arc span
}) {
  const chars = text.split("");
  const n = chars.length;
  if (n === 0) return null;

  const centerAngle = position === "top" ? -Math.PI / 2 : Math.PI / 2;
  const angleStep = n > 1 ? totalAngle / (n - 1) : 0;
  const startAngle = centerAngle - totalAngle / 2;

  return (
    <g>
      {chars.map((char, i) => {
        // Top: angle increases left→right. Bottom: angle decreases L→R.
        const angle =
          position === "top"
            ? startAngle + angleStep * i
            : centerAngle + totalAngle / 2 - angleStep * i;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        // Top: letter base toward center (rotation = θ + 90°).
        // Bottom: letter top toward center (rotation = θ - 90°).
        const rotationDeg =
          (angle * 180) / Math.PI + (position === "top" ? 90 : -90);
        return (
          <text
            key={`${char}-${i}`}
            x={0}
            y={0}
            transform={`translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${rotationDeg.toFixed(2)})`}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={fontSize}
            fontFamily="var(--font-mono, ui-monospace, SFMono-Regular, monospace)"
            className="seal-text"
          >
            {char}
          </text>
        );
      })}
    </g>
  );
}

type Props = {
  // status drives center mark + tone
  status: "attested" | "revoked" | "pending";
  // top arc: short label like "ATTESTED" or "REVOKED"
  label: string;
  // bottom arc: short context like the date or block
  caption?: string;
  size?: number;
  className?: string;
};

export default function Seal({
  status,
  label,
  caption,
  size = 96,
  className,
}: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = size / 2 - 1;
  const rInner = rOuter - 4;
  const rText = rOuter - 9;
  const rTextBottom = rOuter - 9;

  // Wax-red for the editorial-luxe register (.poa-shell). Outside that
  // shell, the same classes still resolve via fallback colors.
  const toneClass =
    status === "attested"
      ? "[&_.seal-ring]:stroke-[color:var(--poa-wax,#4f46e5)]/65 [&_.seal-text]:fill-[color:var(--poa-wax,#4f46e5)]"
      : status === "revoked"
        ? "[&_.seal-ring]:stroke-rose-700/60 [&_.seal-text]:fill-rose-700 dark:[&_.seal-ring]:stroke-rose-300/55 dark:[&_.seal-text]:fill-rose-300"
        : "[&_.seal-ring]:stroke-[color:var(--poa-sepia,#94a3b8)]/65 [&_.seal-text]:fill-[color:var(--poa-sepia,#94a3b8)]";

  // Arc spans scale with letter count so spacing stays uniform regardless
  // of word length. Roughly 13° per character, capped at 130° total.
  const labelChars = label.length;
  const captionChars = caption?.length ?? 0;
  const labelArc = Math.min(
    Math.PI * 0.72,
    Math.max(0.35, labelChars * 0.235),
  );
  const captionArc = Math.min(
    Math.PI * 0.72,
    Math.max(0.35, captionChars * 0.235),
  );

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      role="img"
      aria-label={`${label}${caption ? " · " + caption : ""}`}
      className={cn(toneClass, className)}
    >
      {/* Outer & inner rings (double-rule) */}
      <circle
        cx={cx}
        cy={cy}
        r={rOuter}
        fill="none"
        strokeWidth={1.2}
        className="seal-ring"
      />
      <circle
        cx={cx}
        cy={cy}
        r={rInner}
        fill="none"
        strokeWidth={0.6}
        className="seal-ring"
      />

      {/* Top arc label: manual letter positioning for crisp spacing. */}
      <g transform={`translate(${cx} ${cy})`}>
        <ArcText
          text={label.toUpperCase()}
          radius={rText}
          fontSize={size * 0.095}
          position="top"
          totalAngle={labelArc}
        />
        {caption && (
          <ArcText
            text={caption.toUpperCase()}
            radius={rTextBottom}
            fontSize={size * 0.082}
            position="bottom"
            totalAngle={captionArc}
          />
        )}
      </g>

      {/* Center mark: a pressed wax disc carrying an emblematic device.
         For attested credentials, the device is a labyrinth (Theseus's
         mythological mark). For revoked, an X cut through. For pending,
         a quiet dot. */}
      <g transform={`translate(${cx} ${cy})`}>
        <circle
          r={size * 0.22}
          className={
            status === "attested"
              ? "fill-[color:var(--poa-wax,#4f46e5)]/85"
              : status === "revoked"
                ? "fill-rose-700/85 dark:fill-rose-500/80"
                : "fill-[color:var(--poa-sepia,#94a3b8)]/70"
          }
        />
        {/* embossed inner ring on the wax disc */}
        <circle
          r={size * 0.22 - 1.2}
          fill="none"
          stroke="rgba(255,247,235,0.35)"
          strokeWidth={0.6}
        />

        {status === "attested" && (
          <Labyrinth size={size * 0.28} />
        )}
        {status === "revoked" && (
          <g
            stroke="rgba(255,247,235,0.92)"
            strokeWidth={size * 0.022}
            strokeLinecap="round"
          >
            <line
              x1={-size * 0.085}
              y1={-size * 0.085}
              x2={size * 0.085}
              y2={size * 0.085}
            />
            <line
              x1={-size * 0.085}
              y1={size * 0.085}
              x2={size * 0.085}
              y2={-size * 0.085}
            />
          </g>
        )}
        {status === "pending" && (
          <circle
            r={size * 0.02}
            fill="rgba(255,247,235,0.85)"
          />
        )}
      </g>
    </svg>
  );
}
