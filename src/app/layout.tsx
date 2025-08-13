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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html { visibility: hidden; }
              html.styled { visibility: visible; }
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                const checkCSS = () => {
                  const testEl = document.createElement('div');
                  testEl.className = 'bg-black text-white';
                  testEl.style.position = 'absolute';
                  testEl.style.visibility = 'hidden';
                  document.body.appendChild(testEl);
                  const styles = window.getComputedStyle(testEl);
                  const hasStyles = styles.backgroundColor === 'rgb(0, 0, 0)' && styles.color === 'rgb(255, 255, 255)';
                  document.body.removeChild(testEl);
                  
                  if (hasStyles) {
                    document.documentElement.classList.add('styled');
                  } else {
                    setTimeout(checkCSS, 10);
                  }
                };
                checkCSS();
              });
            `,
          }}
        />
      </head>
      <body className={`${ppTelegraf.className} antialiased`}>{children}</body>
    </html>
  );
}
