import { Metadata } from "next";
import DocsLayoutWrapper from "@/components/docs/DocsLayout";

export const metadata: Metadata = {
  title: {
    default: "Developer Documentation",
    template: "%s — Theseus Docs",
  },
  description:
    "Developer guide for building autonomous AI agents on Theseus. AIVM, Tensor Commits, SHIP, and the runtime architecture as an L1 chain.",
  keywords: ["Theseus", "AI runtime", "AIVM", "Tensor Commits", "developer docs", "AI agents", "Layer 1"],
  openGraph: {
    type: "article",
    siteName: "Theseus Docs",
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsLayoutWrapper>{children}</DocsLayoutWrapper>;
}

