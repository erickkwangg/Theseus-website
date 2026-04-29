import { OG_SIZE, renderOG } from "@/lib/og-template";

export const alt = "Launch on Theseus — Build your first verifiable agent.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OpengraphImage() {
  return renderOG({
    eyebrow: "Theseus",
    headline: "Launch your",
    headlineEmphasis: "first agent.",
    footerLeft: "Preview access",
  });
}
