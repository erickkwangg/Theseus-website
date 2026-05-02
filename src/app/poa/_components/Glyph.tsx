// Glyph: a small set of original 24px SVG icons for PoA-specific concepts.
// Hand-drawn lines, monoweight, sized to sit alongside the JetBrains Mono
// labels. Lucide is fine for general UI, but PoA has concepts (sigil,
// sovereignty, attestation, hash) that deserve their own marks.
//
// All glyphs use `currentColor` so they inherit text color cleanly.

type GlyphName =
  | "sovereign"
  | "controller"
  | "attest"
  | "revoke"
  | "kzg"
  | "lite"
  | "hash"
  | "scroll"
  | "key"
  | "sigil"
  | "block"
  | "chain";

type Props = {
  name: GlyphName;
  size?: number;
  className?: string;
};

const COMMON = "stroke-current fill-none";
const SW = 1.4;

export default function Glyph({ name, size = 18, className }: Props) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
    className,
  } as const;
  switch (name) {
    case "sovereign":
      // double-ring with a center dot (independent, immutable)
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" className={COMMON} strokeWidth={SW} />
          <circle cx="12" cy="12" r="5.5" className={COMMON} strokeWidth={SW} />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
        </svg>
      );
    case "controller":
      // shield-ish hex with a dot off-center (held by a controller)
      return (
        <svg {...props}>
          <path
            d="M 12 3 L 20 7 V 14 C 20 17.5 16.5 20 12 21 C 7.5 20 4 17.5 4 14 V 7 Z"
            className={COMMON}
            strokeWidth={SW}
          />
          <circle cx="12" cy="11" r="1.5" fill="currentColor" />
        </svg>
      );
    case "attest":
      // checkmark inside a circle (letterpress feel)
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" className={COMMON} strokeWidth={SW} />
          <path
            d="M 8 12.5 L 11 15 L 16 9.5"
            className={COMMON}
            strokeWidth={SW}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "revoke":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" className={COMMON} strokeWidth={SW} />
          <path
            d="M 8.5 8.5 L 15.5 15.5 M 15.5 8.5 L 8.5 15.5"
            className={COMMON}
            strokeWidth={SW}
            strokeLinecap="round"
          />
        </svg>
      );
    case "kzg":
      // K monogram in a small square (full KZG proof)
      return (
        <svg {...props}>
          <rect x="3.5" y="3.5" width="17" height="17" className={COMMON} strokeWidth={SW} />
          <path
            d="M 8 7 V 17 M 8 12 L 14 7 M 8 12 L 14 17"
            className={COMMON}
            strokeWidth={SW}
            strokeLinecap="round"
          />
        </svg>
      );
    case "lite":
      // S monogram (signature only)
      return (
        <svg {...props}>
          <rect x="3.5" y="3.5" width="17" height="17" className={COMMON} strokeWidth={SW} />
          <path
            d="M 15 8 C 13 6 9 6 9 9 C 9 12 15 11 15 14 C 15 17 11 17 9 16"
            className={COMMON}
            strokeWidth={SW}
            strokeLinecap="round"
          />
        </svg>
      );
    case "hash":
      // # icon (for ABG hash, content roots)
      return (
        <svg {...props}>
          <path
            d="M 9 4 L 7 20 M 16 4 L 14 20 M 4 9 H 20 M 3 15 H 19"
            className={COMMON}
            strokeWidth={SW}
            strokeLinecap="round"
          />
        </svg>
      );
    case "scroll":
      // a folded scroll (the credential itself)
      return (
        <svg {...props}>
          <path
            d="M 5 5 H 17 V 19 H 7 C 6 19 5 18 5 17 Z"
            className={COMMON}
            strokeWidth={SW}
          />
          <path
            d="M 17 5 C 18.5 5 19.5 6 19.5 7.5 C 19.5 9 18.5 10 17 10"
            className={COMMON}
            strokeWidth={SW}
          />
          <path
            d="M 9 10 H 14 M 9 13 H 14"
            className={COMMON}
            strokeWidth={SW}
            strokeLinecap="round"
          />
        </svg>
      );
    case "key":
      return (
        <svg {...props}>
          <circle cx="8" cy="12" r="4" className={COMMON} strokeWidth={SW} />
          <path
            d="M 12 12 H 21 M 17 12 V 16 M 21 12 V 15"
            className={COMMON}
            strokeWidth={SW}
            strokeLinecap="round"
          />
        </svg>
      );
    case "sigil":
      // a small condensed sigil (outer ring + inner mirrored mark)
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" className={COMMON} strokeWidth={SW} />
          <rect x="9" y="6" width="6" height="2" fill="currentColor" />
          <rect x="9" y="9" width="2" height="3" fill="currentColor" />
          <rect x="13" y="9" width="2" height="3" fill="currentColor" />
          <rect x="9" y="13" width="6" height="2" fill="currentColor" />
        </svg>
      );
    case "block":
      // chain block
      return (
        <svg {...props}>
          <rect x="4" y="4" width="7" height="7" className={COMMON} strokeWidth={SW} />
          <rect x="13" y="4" width="7" height="7" className={COMMON} strokeWidth={SW} />
          <rect x="4" y="13" width="7" height="7" className={COMMON} strokeWidth={SW} />
          <rect x="13" y="13" width="7" height="7" className={COMMON} strokeWidth={SW} />
        </svg>
      );
    case "chain":
      // two connected links
      return (
        <svg {...props}>
          <rect x="3" y="9" width="9" height="6" rx="3" className={COMMON} strokeWidth={SW} />
          <rect x="12" y="9" width="9" height="6" rx="3" className={COMMON} strokeWidth={SW} />
        </svg>
      );
  }
}
