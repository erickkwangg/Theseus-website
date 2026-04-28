import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import { EXTERNAL_LINKS } from "@/config/links";

const FOOTER_LINK_CLASS =
  "text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors text-sm";

export default function Footer() {
  return (
    <footer className="bg-white px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 text-slate-900 dark:bg-transparent dark:text-white">
      <div className="hero-card relative overflow-hidden rounded-2xl bg-[#F1EAE1] lg:rounded-3xl dark:bg-slate-900">
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-10 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
            <div className="space-y-5">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[-0.015em] leading-[1.05] text-slate-900 dark:text-white">
                Run agents anyone
                <br />
                <span className="italic">can verify.</span>
              </h2>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/docs">
                  <Button className="rounded-md primary-cta px-6 py-2 text-sm w-full sm:w-auto">
                    Developer Docs
                  </Button>
                </Link>
                <a href={EXTERNAL_LINKS.whitepaper} target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-md ghost-cta px-6 py-2 text-sm w-full sm:w-auto">
                    Read Whitepaper
                  </Button>
                </a>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="flex flex-col items-center">
                <Image
                  src={logo}
                  alt="Theseus Logo"
                  width={64}
                  height={64}
                  className="w-14 h-14 lg:w-16 lg:h-16 mb-3 brightness-0 dark:brightness-100 opacity-90"
                />
                <div className="text-base lg:text-lg font-light tracking-widest text-slate-900 dark:text-white">
                  THESEUS
                </div>
                <div className="text-[10px] text-slate-600 dark:text-slate-400 mt-1 tracking-wider">
                  AI AGENCY
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 lg:mt-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="space-y-4">
              <nav className="grid grid-flow-col grid-rows-4 gap-x-10 gap-y-2 text-sm">
                <Link href="/" className={FOOTER_LINK_CLASS}>
                  Home
                </Link>
                <Link href="#market" className={FOOTER_LINK_CLASS}>
                  Use Cases
                </Link>
                <Link href="/docs" className={FOOTER_LINK_CLASS}>
                  Docs
                </Link>
                <Link href="/playground" className={FOOTER_LINK_CLASS}>
                  Playground
                </Link>
                <Link href="/launch" className={FOOTER_LINK_CLASS}>
                  Launch
                </Link>
                <a
                  href={EXTERNAL_LINKS.substack}
                  className={FOOTER_LINK_CLASS}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blog
                </a>
                <a
                  href={EXTERNAL_LINKS.whitepaper}
                  className={FOOTER_LINK_CLASS}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Whitepaper
                </a>
              </nav>

              <p className="text-slate-500 dark:text-slate-400 text-xs">
                © 2026 THESEUS AI LABS
              </p>
            </div>

            <p
              aria-hidden
              className="font-serif italic leading-[1] text-right text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-indigo-600/25 dark:text-indigo-300/20 select-none"
            >
              Think. Act. Verify.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
