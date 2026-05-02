import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Try a SHIP agent in the Theseus playground: write the agent, run it against the runtime, and inspect the signed receipt.",
  keywords: [
    "Theseus playground",
    "SHIP agent",
    "agent runtime",
    "verifiable AI",
    "live demo",
  ],
  alternates: { canonical: "/playground" },
  openGraph: {
    type: "website",
    title: "Playground · Theseus",
    description:
      "Try a SHIP agent in the Theseus playground: write the agent, run it against the runtime, and inspect the signed receipt.",
    url: "/playground",
  },
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
