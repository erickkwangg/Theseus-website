import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const ppTelegraf = localFont({
  src: "../assets/PPTelegraf-Regular.otf",
  weight: "400",
  style: "normal",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "THESEUS - The Cloud for AI Personhood",
  description:
    "Runtime infrastructure for autonomous AI agents to own assets, make decisions, and persist independently. Implemented as an L1 chain with verifiable AI execution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ppTelegraf.className} antialiased`}>
        {children}
        {/* Noise texture overlay */}
        <div className="noise-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
