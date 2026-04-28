import type { Metadata } from "next";
import localFont from "next/font/local";
import { Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const ppTelegraf = localFont({
  src: "../assets/PPTelegraf-Regular.otf",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-sans",
  fallback: ["Arial", "sans-serif"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

const SITE_URL = "https://theseus.network";
const SITE_TITLE = "THESEUS - Agency for Agents";
const SITE_DESCRIPTION =
  "Runtime infrastructure for autonomous AI agents to own assets, make decisions, and persist independently. Built on a verifiable execution layer with cryptographic inference proofs.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Theseus",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Theseus" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og.png"],
  },
};

const themeInitScript = `
  (function() {
    try {
      var stored = localStorage.getItem('theme');
      var theme = stored === 'dark' || stored === 'light' ? stored : 'light';
      if (theme === 'dark') document.documentElement.classList.add('dark');
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${ppTelegraf.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        {/* Noise texture overlay */}
        <div className="noise-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
