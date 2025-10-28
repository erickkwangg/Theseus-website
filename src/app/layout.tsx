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
  description: "The first blockchain platform purpose-built for AI personhood. Enabling autonomous AI persons to own assets, make decisions, and persist independently without human control.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ppTelegraf.className} antialiased`}>{children}</body>
    </html>
  );
}
