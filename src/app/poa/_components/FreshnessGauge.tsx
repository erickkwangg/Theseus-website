// FreshnessGauge: small radial indicator for the verifier result card.
// Replaces the plain "current/revoked/unknown" text strip with a graphic
// that carries weight.
//
//   current  → full indigo ring + checkmark
//   revoked  → rose ring with X
//   unknown  → dashed amber ring with question
//
// Reads as a status seal, not a label.

import { cn } from "@/lib/utils";

type Status = "current" | "revoked" | "unknown";

type Props = {
  status: Status;
  size?: number;
  className?: string;
};

export default function FreshnessGauge({
  status,
  size = 72,
  className,
}: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 4;
  const tone = {
    current:
      "stroke-indigo-700 dark:stroke-indigo-300 fill-indigo-500/8 dark:fill-indigo-400/10",
    revoked:
      "stroke-rose-700 dark:stroke-rose-300 fill-rose-500/8 dark:fill-rose-400/10",
    unknown:
      "stroke-amber-600 dark:stroke-amber-300 fill-amber-500/8 dark:fill-amber-400/10",
  }[status];

  const mark = {
    current: "✓",
    revoked: "✕",
    unknown: "?",
  }[status];

  const strokeDasharray = status === "unknown" ? "3 4" : undefined;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      role="img"
      aria-label={`Freshness ${status}`}
      className={cn("shrink-0", className)}
    >
      <circle
        cx={cx}
        cy={cy}
        r={r}
        strokeWidth={1.5}
        strokeDasharray={strokeDasharray}
        className={tone}
      />
      <circle
        cx={cx}
        cy={cy}
        r={r - 4}
        strokeWidth={0.6}
        fill="none"
        className={tone}
        style={{ opacity: 0.5 }}
      />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={size * 0.42}
        fontFamily="var(--font-mono, ui-monospace, SFMono-Regular, monospace)"
        className={tone.replace(/stroke-/g, "fill-")}
      >
        {mark}
      </text>
    </svg>
  );
}
