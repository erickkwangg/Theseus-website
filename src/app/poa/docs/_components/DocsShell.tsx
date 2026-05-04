import type { ReactNode } from "react";
import Header from "@/components/Pages/Home/Header";
import Footer from "@/components/Pages/Home/Footer";
import { chainMode } from "@/lib/poa/chain";
import ChainModeBanner from "../../_components/ChainModeBanner";
import PoaNav from "../../_components/PoaNav";
import DocsSidebar from "./DocsSidebar";

// Wraps every page under /poa/docs with the standard PoA chrome plus a
// docs-only sidebar. Pages just render their body content; the shell handles
// container width and the sticky sidebar.

export default function DocsShell({
  children,
  eyebrow,
  title,
}: {
  children: ReactNode;
  eyebrow: string;
  title: ReactNode;
}) {
  return (
    <main className="poa-shell min-h-screen">
      <Header />
      <div className="pt-20">
        <ChainModeBanner mode={chainMode()} />
        <PoaNav />
      </div>

      <div className="px-4 pt-16 pb-24 sm:px-8 lg:px-12 lg:pt-20">
        <div className="mx-auto flex max-w-6xl gap-12">
          <DocsSidebar />
          <article className="min-w-0 flex-1 max-w-3xl">
            <header className="mb-10">
              <p className="poa-stamp">{eyebrow}</p>
              <h1 className="mt-3 font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.02] tracking-[-0.02em] text-[var(--poa-ink)] [text-wrap:balance]">
                {title}
              </h1>
            </header>
            <div className="poa-doc-body space-y-6 text-[15px] leading-[1.7] text-[var(--poa-ink-soft)]">
              {children}
            </div>
          </article>
        </div>
      </div>

      <Footer />
    </main>
  );
}
