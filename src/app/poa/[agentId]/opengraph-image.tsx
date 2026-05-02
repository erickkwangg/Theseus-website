// Dynamic OG image for /poa/<agentId>. Shares social previews with the
// agent's name + sigil + summary instead of the marketing site card.
//
// Uses Node runtime so it can hit the chain reader (Polkadot mode requires
// Node since @polkadot/api isn't edge-runtime safe).

import { ImageResponse } from "next/og";
import { getChainReader } from "@/lib/poa/chain";

export const alt = "Proof of Agenthood · Theseus";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ agentId: string }> };

export default async function OgImage({ params }: Props) {
  const { agentId } = await params;
  let name = "Unknown agent";
  let summary: string | undefined;
  let mode = "controller-retained";
  let grade = "unknown";
  let abgHash = "";
  try {
    const reader = getChainReader();
    const snapshot = await reader.getAgentSnapshot(agentId);
    if (snapshot) {
      name = snapshot.name;
      summary = snapshot.summary;
      mode = snapshot.sovereign ? "sovereign · immutable" : "controller-retained";
      grade = snapshot.recentRuns.grade;
      abgHash = snapshot.abgHash;
    }
  } catch {
    // OG image is best-effort; fall back to defaults if chain is unreachable.
  }

  const seed = agentId + abgHash;
  const sigilSize = 360;
  const cells = sigilCells(seed, 8, sigilSize);
  const checksum = checksum6(seed);
  const badge: { letter: string; fill: "solid" | "half" | "outline" } | null =
    grade === "full"
      ? { letter: "K", fill: "solid" }
      : grade === "mixed"
        ? { letter: "M", fill: "half" }
        : grade === "lite"
          ? { letter: "S", fill: "outline" }
          : null;
  const badgeR = sigilSize * 0.13;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F1EAE1",
          fontFamily: "serif",
          display: "flex",
          flexDirection: "column",
          padding: "60px 80px",
          color: "#0f172a",
        }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#475569",
            display: "flex",
          }}
        >
          Proof of Agenthood · theseus.network
        </div>
        <div style={{ height: 30 }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 60,
            flex: 1,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 18,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#64748b",
                display: "flex",
              }}
            >
              Agent
            </div>
            <div style={{ height: 16 }} />
            <div
              style={{
                fontSize: 96,
                lineHeight: 1.05,
                letterSpacing: -2,
                color: "#0f172a",
                display: "flex",
                fontWeight: 400,
              }}
            >
              {name}
            </div>
            {summary && (
              <div
                style={{
                  marginTop: 24,
                  fontSize: 28,
                  lineHeight: 1.35,
                  color: "#475569",
                  fontFamily: "sans-serif",
                  display: "flex",
                  maxWidth: 700,
                }}
              >
                {summary}
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 14,
            }}
          >
            <div
              style={{
                width: sigilSize,
                height: sigilSize,
                position: "relative",
                display: "flex",
                background: "#F1EAE1",
                border: "2px solid rgba(20,17,13,0.18)",
                borderRadius: 2,
              }}
            >
              {cells.map((c, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: c.x,
                    top: c.y,
                    width: c.size,
                    height: c.size,
                    background: "rgba(20,17,13,0.82)",
                  }}
                />
              ))}
              {badge && (
                <div
                  style={{
                    position: "absolute",
                    right: 18,
                    top: 18,
                    width: badgeR * 2,
                    height: badgeR * 2,
                    borderRadius: "50%",
                    border: "2px solid #7B1E1E",
                    background:
                      badge.fill === "solid" ? "#7B1E1E" : "#F1EAE1",
                    color:
                      badge.fill === "solid" ? "#F1EAE1" : "#7B1E1E",
                    fontFamily: "monospace",
                    fontWeight: 700,
                    fontSize: badgeR * 1.2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {badge.letter}
                </div>
              )}
            </div>
            <div
              style={{
                fontFamily: "serif",
                fontSize: 56,
                fontStyle: "italic",
                letterSpacing: -1,
                color: "#0f172a",
                display: "flex",
              }}
            >
              {checksum}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "monospace",
            fontSize: 20,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#475569",
            paddingTop: 20,
            borderTop: "1px solid #cbd5e1",
            marginTop: 30,
          }}
        >
          <div style={{ display: "flex" }}>{mode}</div>
          <div style={{ display: "flex" }}>verification · {grade}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}

function fnv1a(seed: string): number[] {
  const bytes: number[] = [];
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
    bytes.push(h & 0xff);
  }
  while (bytes.length < 64) {
    h = Math.imul(h ^ bytes.length, 0x01000193) >>> 0;
    bytes.push(h & 0xff);
  }
  return bytes;
}

function checksum6(seed: string): string {
  const b = fnv1a(seed);
  return b
    .slice(0, 3)
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

// Same algorithm as Sigil v3 in src/app/poa/_components/Sigil.tsx: an 8x8
// mirrored grid with binary cells (drawn only when the hash byte clears the
// threshold). Keeps social preview visuals in sync with the credential page.
function sigilCells(seed: string, grid: number, totalSize: number) {
  const bytes = fnv1a(seed);
  const cellSize = totalSize / grid;
  const cells: { x: number; y: number; size: number }[] = [];
  for (let y = 0; y < grid; y++) {
    for (let x = 0; x < grid / 2; x++) {
      const v = bytes[16 + y * (grid / 2) + x];
      if (v < 128) continue;
      cells.push({ x: x * cellSize, y: y * cellSize, size: cellSize });
      cells.push({
        x: (grid - 1 - x) * cellSize,
        y: y * cellSize,
        size: cellSize,
      });
    }
  }
  return cells;
}
