// Seal: a real letterpress-feeling badge for the credential footer.
// Concentric rings + arc text + center mark. Reads as an object, not a
// status pill.

import { cn } from "@/lib/utils";

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
  const rText = rOuter - 12;
  const rTextBottom = rOuter - 12;

  const tone =
    status === "attested"
      ? "indigo"
      : status === "revoked"
        ? "rose"
        : "slate";
  const toneClass = {
    indigo:
      "[&_.seal-ring]:stroke-indigo-700/55 [&_.seal-text]:fill-indigo-700 dark:[&_.seal-ring]:stroke-indigo-300/55 dark:[&_.seal-text]:fill-indigo-300",
    rose: "[&_.seal-ring]:stroke-rose-700/55 [&_.seal-text]:fill-rose-700 dark:[&_.seal-ring]:stroke-rose-300/55 dark:[&_.seal-text]:fill-rose-300",
    slate:
      "[&_.seal-ring]:stroke-slate-500/55 [&_.seal-text]:fill-slate-500 dark:[&_.seal-ring]:stroke-slate-400/55 dark:[&_.seal-text]:fill-slate-400",
  }[tone];

  const topPathId = `seal-top-${label.replace(/[^a-z0-9]/gi, "")}-${size}`;
  const bottomPathId = `seal-bot-${(caption ?? "").replace(/[^a-z0-9]/gi, "")}-${size}`;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      role="img"
      aria-label={`${label}${caption ? " · " + caption : ""}`}
      className={cn(toneClass, className)}
    >
      <defs>
        {/* Top arc: label runs along this path. */}
        <path
          id={topPathId}
          d={`M ${cx - rText},${cy} a ${rText},${rText} 0 0 1 ${rText * 2},0`}
          fill="none"
        />
        {/* Bottom arc: caption runs along this path, flipped so text is upright. */}
        <path
          id={bottomPathId}
          d={`M ${cx - rTextBottom},${cy} a ${rTextBottom},${rTextBottom} 0 0 0 ${rTextBottom * 2},0`}
          fill="none"
        />
        {/* Subtle inner shadow for letterpress depth */}
        <filter id="seal-emboss" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="0.6" />
          <feOffset dx="0" dy="0.4" result="o" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.6" />
          </feComponentTransfer>
          <feComposite in2="SourceGraphic" operator="atop" />
        </filter>
      </defs>

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

      {/* Top arc label */}
      <text
        fontSize={size * 0.105}
        fontFamily="var(--font-mono, ui-monospace, SFMono-Regular, monospace)"
        letterSpacing={size * 0.02}
        className="seal-text"
        filter="url(#seal-emboss)"
      >
        <textPath
          href={`#${topPathId}`}
          startOffset="50%"
          textAnchor="middle"
        >
          {label.toUpperCase()}
        </textPath>
      </text>

      {/* Bottom arc caption */}
      {caption && (
        <text
          fontSize={size * 0.085}
          fontFamily="var(--font-mono, ui-monospace, SFMono-Regular, monospace)"
          letterSpacing={size * 0.018}
          className="seal-text"
        >
          <textPath
            href={`#${bottomPathId}`}
            startOffset="50%"
            textAnchor="middle"
          >
            {caption.toUpperCase()}
          </textPath>
        </text>
      )}

      {/* Center mark */}
      <g transform={`translate(${cx} ${cy})`}>
        <circle
          r={size * 0.16}
          className={
            status === "attested"
              ? "fill-indigo-500/12 stroke-indigo-700/40 dark:fill-indigo-400/15 dark:stroke-indigo-300/40"
              : status === "revoked"
                ? "fill-rose-500/12 stroke-rose-700/40 dark:fill-rose-400/15 dark:stroke-rose-300/40"
                : "fill-slate-500/10 stroke-slate-500/40"
          }
          strokeWidth={0.7}
        />
        <text
          fontSize={size * 0.18}
          fontFamily="var(--font-mono, ui-monospace, SFMono-Regular, monospace)"
          textAnchor="middle"
          dominantBaseline="central"
          className="seal-text"
        >
          {status === "attested" ? "✓" : status === "revoked" ? "✕" : "·"}
        </text>
      </g>
    </svg>
  );
}
