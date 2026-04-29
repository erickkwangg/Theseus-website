import { OG_SIZE, renderOG } from "@/lib/og-template";

export const alt = "Theseus Playground — Run a SHIP agent live.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OpengraphImage() {
  return renderOG({
    eyebrow: "Theseus",
    headline: "Run an agent.",
    headlineEmphasis: "Watch it sign.",
    footerLeft: "Live playground",
  });
}
