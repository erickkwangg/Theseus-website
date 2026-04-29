import { ImageResponse } from "next/og";

// Google Fonts CSS API serves WOFF2; Satori cannot parse WOFF2.
// Pull TTFs directly from Google's official `google/fonts` GitHub mirror.
const FONT_URLS = {
  serifRegular:
    "https://raw.githubusercontent.com/google/fonts/main/ofl/instrumentserif/InstrumentSerif-Regular.ttf",
  serifItalic:
    "https://raw.githubusercontent.com/google/fonts/main/ofl/instrumentserif/InstrumentSerif-Italic.ttf",
} as const;

async function fetchFont(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Font fetch failed (${res.status}): ${url}`);
  return res.arrayBuffer();
}

export const OG_SIZE = { width: 1200, height: 630 } as const;

type Props = {
  /** Small uppercase label at the top, e.g. "Theseus Docs". */
  eyebrow: string;
  /** Plain part of the headline, e.g. "Agents that". */
  headline: string;
  /** Italic, accent-colored part of the headline, e.g. "own themselves." */
  headlineEmphasis: string;
  /** Italic small phrase bottom-left, e.g. "An open runtime". */
  footerLeft: string;
  /** Mono-style URL bottom-right. */
  footerRight?: string;
};

export async function renderOG({
  eyebrow,
  headline,
  headlineEmphasis,
  footerLeft,
  footerRight = "theseus.network",
}: Props) {
  const [serifNormal, serifItalic] = await Promise.all([
    fetchFont(FONT_URLS.serifRegular),
    fetchFont(FONT_URLS.serifItalic),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at 20% 0%, #1e1b4b 0%, #0f172a 55%, #020617 100%)",
          padding: "80px 96px",
          color: "white",
          fontFamily: '"Instrument Serif"',
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 26,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#cbd5e1",
          }}
        >
          {eyebrow}
        </div>

        <div
          style={{
            fontSize: 116,
            lineHeight: 1.04,
            letterSpacing: "-0.022em",
            color: "white",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <span>{headline}&nbsp;</span>
          <span style={{ fontStyle: "italic", color: "#a5b4fc" }}>
            {headlineEmphasis}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 28,
            letterSpacing: "0.04em",
            color: "#94a3b8",
          }}
        >
          <span style={{ fontStyle: "italic" }}>{footerLeft}</span>
          <span>{footerRight}</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Instrument Serif", data: serifNormal, weight: 400, style: "normal" },
        { name: "Instrument Serif", data: serifItalic, weight: 400, style: "italic" },
      ],
    },
  );
}
