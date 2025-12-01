"use client";

import Link from "next/link";
import DocsSidebar from "./DocsSidebar";
import DocsSearch from "./DocsSearch";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-40 border-b border-gray-800 bg-black/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-light hover:text-gray-300 transition-colors">
            THESEUS
          </Link>
          <div className="flex items-center gap-4">
            <DocsSearch />
            <Link 
              href="/docs" 
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Docs
            </Link>
            <a
              href="https://github.com/ob-theseus/theseuschain"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-12">
          <DocsSidebar />
          <main className="flex-1 min-w-0 max-w-4xl">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

