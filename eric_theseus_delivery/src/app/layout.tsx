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
  title: "THESEUS",
  description: "Build. Verify. Liberate Intelligence",
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
