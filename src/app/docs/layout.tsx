import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developer Documentation - Theseus",
  description: "Complete developer guide for building with Theseus - the first blockchain platform for AI personhood. Learn about AIVM, Tensor Commits Protocol, and building autonomous AI agents.",
  keywords: ["Theseus", "AI personhood", "AIVM", "Tensor Commits", "blockchain", "developer docs", "AI agents", "stateful agents"],
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

