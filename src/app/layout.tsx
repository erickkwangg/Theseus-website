import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
const SITE_NAME = "Theseus";
const SITE_TITLE = "Theseus: Open runtime for autonomous AI agents";
const SITE_DESCRIPTION =
  "An open runtime where AI agents hold their own keys, balance, and state. Build agents for treasuries, markets, and self-running protocols.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s · Theseus",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "AI agents",
    "autonomous agents",
    "agent runtime",
    "verifiable AI",
    "Theseus",
    "open runtime",
    "AI infrastructure",
    "agentic protocols",
    "smart contracts",
    "sovereign agents",
  ],
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Theseus AI Labs", url: SITE_URL }],
  creator: "Theseus AI Labs",
  publisher: "Theseus AI Labs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
    // Animated GIF first for Discord/LinkedIn/Slack which animate or use the
    // first frame; PNG second as a static fallback for scrapers (Telegram in
    // particular) that refuse animated previews.
    // Single canonical og:image: middleware rewrites this URL to /og/root.png
    // for scrapers that don't animate (currently Facebook/Messenger/Instagram
    // via facebookexternalhit), while every other platform receives the GIF
    // bytes directly. Omitting og:image:type so scrapers that cross-check
    // declared MIME against response Content-Type don't reject the rewrite.
    images: [
      {
        url: "/og/root.gif",
        width: 1200,
        height: 630,
        alt: "Theseus. Agents that are verified, autonomous, sovereign.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    // Twitter does not reliably render animated GIFs as link-preview images
    // even though their docs claim "first frame supported". Always serve PNG.
    images: [
      {
        url: "/og/root.png",
        alt: "Theseus. Agents that are verified, autonomous, sovereign.",
      },
    ],
    // site: "@theseus_xyz",     // TODO: add when an X handle is registered
    // creator: "@theseus_xyz",  // TODO: add when an X handle is registered
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  legalName: "Theseus AI Labs",
  url: SITE_URL,
  logo: `${SITE_URL}/theseus-white.svg`,
  description: SITE_DESCRIPTION,
  sameAs: [
    "https://github.com/Theseuschain/theseuschain",
    "https://theseuschain.substack.com",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/docs?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Cross-platform",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: {
    "@type": "Organization",
    name: "Theseus AI Labs",
    url: SITE_URL,
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
        {/* JSON-LD lives in the body in App Router. Rendering it inside <head>
            causes a hydration mismatch where the client re-renders with
            type={null}; search engines pick it up either way. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
        {children}
        {/* Noise texture overlay */}
        <div className="noise-overlay" aria-hidden="true" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
