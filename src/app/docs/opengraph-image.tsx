import { OG_SIZE, renderOG } from "@/lib/og-template";

export const alt = "Theseus Docs · Build with the Theseus runtime.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OpengraphImage() {
  return renderOG({
    eyebrow: "Theseus Docs",
    headline: "Build with",
    headlineEmphasis: "Theseus.",
    footerLeft: "Developer documentation",
  });
}
