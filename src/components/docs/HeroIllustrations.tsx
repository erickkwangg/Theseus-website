"use client";

/**
 * Lightweight, animated SVG illustrations for page heros.
 * Each is roughly 160x160 viewBox; the parent panel sets the size.
 */

export function AivmIllustration() {
  return (
    <svg viewBox="0 0 160 160" className="w-full h-full" role="img" aria-label="AIVM illustration">
      {/* Chip outline */}
      <rect x="40" y="40" width="80" height="80" rx="10" className="fill-indigo-500/10 stroke-indigo-500/60 dark:stroke-indigo-400/70" strokeWidth="1.5" />
      {/* Pins */}
      {[50, 70, 90].map((y) => (
        <g key={`L${y}`}>
          <line x1="30" y1={y} x2="40" y2={y} className="stroke-indigo-400/70" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="120" y1={y} x2="130" y2={y} className="stroke-indigo-400/70" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ))}
      {[50, 70, 90].map((x) => (
        <g key={`T${x}`}>
          <line x1={x + 5} y1="30" x2={x + 5} y2="40" className="stroke-indigo-400/70" strokeWidth="1.5" strokeLinecap="round" />
          <line x1={x + 5} y1="120" x2={x + 5} y2="130" className="stroke-indigo-400/70" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ))}
      {/* Inner grid (tensor) */}
      <g className="text-indigo-500/80 dark:text-indigo-300">
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <rect
              key={`c${row}-${col}`}
              x={52 + col * 14}
              y={52 + row * 14}
              width="10"
              height="10"
              rx="1.5"
              fill="currentColor"
              opacity={(0.25 + ((row + col) % 4) * 0.18)}
            >
              <animate
                attributeName="opacity"
                values={`${0.25 + ((row + col) % 4) * 0.18};0.95;${0.25 + ((row + col) % 4) * 0.18}`}
                dur="3.6s"
                begin={`${(row * 4 + col) * 0.12}s`}
                repeatCount="indefinite"
              />
            </rect>
          )),
        )}
      </g>
    </svg>
  );
}

export function TensorCommitsIllustration() {
  return (
    <svg viewBox="0 0 160 160" className="w-full h-full" role="img" aria-label="Tensor Commits illustration">
      {/* Terkle tree: root + two children + four leaves */}
      <g className="text-purple-500/80 dark:text-purple-300">
        {/* Edges */}
        <g className="stroke-purple-400/70 dark:stroke-purple-400/60" strokeWidth="1.2" fill="none">
          <line x1="80" y1="40" x2="50" y2="80" />
          <line x1="80" y1="40" x2="110" y2="80" />
          <line x1="50" y1="80" x2="35" y2="120" />
          <line x1="50" y1="80" x2="65" y2="120" />
          <line x1="110" y1="80" x2="95" y2="120" />
          <line x1="110" y1="80" x2="125" y2="120" />
        </g>
        {/* Leaves */}
        {[
          { x: 35, y: 120 },
          { x: 65, y: 120 },
          { x: 95, y: 120 },
          { x: 125, y: 120 },
        ].map((p, i) => (
          <rect
            key={i}
            x={p.x - 7}
            y={p.y - 7}
            width="14"
            height="14"
            rx="2"
            fill="currentColor"
            opacity="0.7"
          >
            <animate
              attributeName="opacity"
              values="0.4;1;0.4"
              dur="2.6s"
              begin={`${i * 0.18}s`}
              repeatCount="indefinite"
            />
          </rect>
        ))}
        {/* Mid */}
        <circle cx="50" cy="80" r="8" fill="currentColor" opacity="0.85" />
        <circle cx="110" cy="80" r="8" fill="currentColor" opacity="0.85" />
        {/* Root */}
        <circle cx="80" cy="40" r="10" fill="currentColor" />
        <text x="80" y="44" textAnchor="middle" className="fill-white text-[8px]" fontFamily="ui-monospace, monospace" fontWeight="600">
          π
        </text>
      </g>
    </svg>
  );
}

export function AgentsIllustration() {
  return (
    <svg viewBox="0 0 160 160" className="w-full h-full" role="img" aria-label="Agents illustration">
      <defs>
        <radialGradient id="agentGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" className="[stop-color:rgb(34,197,94)]" stopOpacity="0.4" />
          <stop offset="100%" className="[stop-color:rgb(34,197,94)]" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Orbits */}
      <g fill="none" className="stroke-green-400/40 dark:stroke-green-400/40" strokeWidth="1" strokeDasharray="3 4">
        <circle cx="80" cy="80" r="38" />
        <circle cx="80" cy="80" r="58" />
      </g>
      {/* Glow */}
      <circle cx="80" cy="80" r="30" fill="url(#agentGlow)" />
      {/* Center agent */}
      <g className="text-green-600 dark:text-green-400">
        <circle cx="80" cy="80" r="14" fill="currentColor" />
        <circle cx="80" cy="80" r="14" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6">
          <animate attributeName="r" values="14;22;14" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="76" cy="78" r="2" fill="white" />
        <circle cx="84" cy="78" r="2" fill="white" />
      </g>
      {/* Orbiting nodes */}
      <g className="text-green-500 dark:text-green-300">
        <circle r="4" fill="currentColor">
          <animateMotion dur="6s" repeatCount="indefinite" path="M 80 42 a 38 38 0 1 1 -0.1 0" />
        </circle>
        <circle r="3" fill="currentColor" opacity="0.8">
          <animateMotion dur="9s" repeatCount="indefinite" path="M 80 22 a 58 58 0 1 0 0.1 0" />
        </circle>
      </g>
    </svg>
  );
}

export function ArchitectureIllustration() {
  return (
    <svg viewBox="0 0 160 160" className="w-full h-full" role="img" aria-label="Architecture illustration">
      {/* Three stacked layers */}
      {[
        { y: 36, color: "indigo", offset: 0 },
        { y: 70, color: "green", offset: 6 },
        { y: 104, color: "purple", offset: 12 },
      ].map((layer, i) => (
        <g key={layer.color}>
          {/* Top face */}
          <polygon
            points={`${30 + layer.offset},${layer.y} ${130 - layer.offset},${layer.y} ${118 - layer.offset},${layer.y + 14} ${42 + layer.offset},${layer.y + 14}`}
            className={
              layer.color === "indigo"
                ? "fill-indigo-500/20 stroke-indigo-500/70 dark:fill-indigo-500/30 dark:stroke-indigo-400"
                : layer.color === "green"
                ? "fill-green-500/20 stroke-green-500/70 dark:fill-green-500/30 dark:stroke-green-400"
                : "fill-purple-500/20 stroke-purple-500/70 dark:fill-purple-500/30 dark:stroke-purple-400"
            }
            strokeWidth="1.2"
          >
            <animate
              attributeName="opacity"
              values="0.7;1;0.7"
              dur="3s"
              begin={`${i * 0.6}s`}
              repeatCount="indefinite"
            />
          </polygon>
          {/* Front face */}
          <polygon
            points={`${42 + layer.offset},${layer.y + 14} ${118 - layer.offset},${layer.y + 14} ${118 - layer.offset},${layer.y + 22} ${42 + layer.offset},${layer.y + 22}`}
            className={
              layer.color === "indigo"
                ? "fill-indigo-600/30 stroke-indigo-500/70 dark:fill-indigo-500/40 dark:stroke-indigo-400"
                : layer.color === "green"
                ? "fill-green-600/30 stroke-green-500/70 dark:fill-green-500/40 dark:stroke-green-400"
                : "fill-purple-600/30 stroke-purple-500/70 dark:fill-purple-500/40 dark:stroke-purple-400"
            }
            strokeWidth="1.2"
          />
        </g>
      ))}
    </svg>
  );
}
