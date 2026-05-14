import fs from "node:fs";
import path from "node:path";

type Props = {
  src?: string;
  alt?: string;
  title?: string;
};

const PUBLIC_DIR = path.join(process.cwd(), "public");

/**
 * Inline blog SVGs at server-render so the page's `.dark` class can reach
 * the SVG's own CSS. Without inlining, SVG referenced via `<img>` is in a
 * separate document context and can only see `prefers-color-scheme`, which
 * doesn't match when the user toggles theme via the in-app switcher.
 *
 * Falls back to a plain <img> for raster files and any non-local URL.
 */
export default function MarkdownImg({ src, alt, title }: Props) {
  if (!src) return null;

  const isLocalSvg = src.startsWith("/") && src.endsWith(".svg");
  if (isLocalSvg) {
    try {
      const filePath = path.join(PUBLIC_DIR, src);
      let svg = fs.readFileSync(filePath, "utf8");
      // Strip any XML/doctype prelude so the SVG can be embedded inline.
      svg = svg.replace(/<\?xml[^>]*\?>\s*/g, "");
      svg = svg.replace(/<!DOCTYPE[^>]*>\s*/g, "");
      return (
        <span
          className="block my-6 [&_svg]:max-w-full [&_svg]:h-auto"
          role="img"
          aria-label={alt || title || ""}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      );
    } catch {
      // Fall through to plain <img> if the file can't be read.
    }
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt ?? ""} title={title} />;
}
