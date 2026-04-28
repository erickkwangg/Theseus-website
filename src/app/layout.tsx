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
  title: "THESEUS - Agency for Agents",
  description:
    "Runtime infrastructure for autonomous AI agents to own assets, make decisions, and persist independently. Built on a verifiable execution layer with cryptographic inference proofs.",
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
