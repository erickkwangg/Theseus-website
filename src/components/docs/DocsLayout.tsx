"use client";

import Link from "next/link";
import Image from "next/image";
import DocsSidebar from "./DocsSidebar";
import DocsSearch from "./DocsSearch";
import ReadingProgress from "./ReadingProgress";
import Breadcrumbs from "./Breadcrumbs";
import TableOfContents from "./TableOfContents";
import BackToTop from "./BackToTop";
import MobileSidebar from "./MobileSidebar";
import { EXTERNAL_LINKS } from "@/config/links";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Subtle grid background */}
      <div className="fixed inset-0 docs-grid-bg pointer-events-none opacity-30" />
      
      <ReadingProgress />
      
      {/* Improved Header */}
      <header className="sticky top-0 z-40 border-b border-gray-800 bg-black/95 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Image 
                src="/theseus-white.svg" 
                alt="Theseus" 
                width={28} 
                height={28}
                className="opacity-90"
              />
              <span className="text-xl font-light tracking-wide">THESEUS</span>
            </Link>
            <div className="hidden sm:block h-5 w-px bg-gray-700" />
            <Link 
              href="/docs" 
              className="hidden sm:flex items-center gap-2 text-sm text-blue-400 font-medium"
            >
              Documentation
              <span className="px-1.5 py-0.5 text-[10px] bg-blue-500/20 text-blue-400 rounded font-medium">
                BETA
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <DocsSearch />
            <div className="hidden md:flex items-center gap-4">
              <a
                href={EXTERNAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href={EXTERNAL_LINKS.whitepaper}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Whitepaper
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-8 relative">
        <div className="flex gap-8 lg:gap-12">
          <DocsSidebar />
          <main className="flex-1 min-w-0 max-w-4xl">
            <Breadcrumbs />
            {children}
          </main>
          <TableOfContents />
        </div>
      </div>

      {/* Mobile sidebar */}
      <MobileSidebar />
      
      {/* Back to top button */}
      <BackToTop />
    </div>
  );
}
