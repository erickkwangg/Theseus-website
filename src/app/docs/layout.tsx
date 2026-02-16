import { Metadata } from "next";
import DocsLayoutWrapper from "@/components/docs/DocsLayout";

export const metadata: Metadata = {
  title: "Developer Documentation - Theseus",
  description:
    "Complete developer guide for building autonomous AI agents on Theseus. Learn AIVM, Tensor Commits, and the runtime architecture implemented as an L1 chain.",
  keywords: ["Theseus", "AI runtime", "AIVM", "Tensor Commits", "developer docs", "AI agents", "Layer 1"],
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsLayoutWrapper>{children}</DocsLayoutWrapper>;
}

