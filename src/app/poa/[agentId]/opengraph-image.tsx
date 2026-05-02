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

  const cells = sigilCells(agentId + abgHash, 6, 56);
  const checksum = checksum6(agentId + abgHash);

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
                width: 56 * 6,
                height: 56 * 6,
                position: "relative",
                display: "flex",
                background: "#E2D8C8",
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
                    background: `rgba(67, 56, 202, ${c.opacity})`,
                  }}
                />
              ))}
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
  while (bytes.length < 36) {
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

function sigilCells(seed: string, grid: number, cellSize: number) {
  const bytes = fnv1a(seed);
  const cells: { x: number; y: number; size: number; opacity: number }[] = [];
  for (let y = 0; y < grid; y++) {
    for (let x = 0; x < grid / 2; x++) {
      const v = bytes[y * (grid / 2) + x];
      const opacity = (v / 255) * 0.95;
      cells.push({
        x: x * cellSize,
        y: y * cellSize,
        size: cellSize,
        opacity,
      });
      cells.push({
        x: (grid - 1 - x) * cellSize,
        y: y * cellSize,
        size: cellSize,
        opacity,
      });
    }
  }
  return cells;
}
