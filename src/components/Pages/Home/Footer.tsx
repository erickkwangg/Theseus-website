import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import { EXTERNAL_LINKS } from "@/config/links";

export default function Footer() {
  return (
    <footer className="footer-section-bg text-white py-14 lg:py-24 relative section-soft-divider">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 lg:space-y-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light leading-tight">
              Join us in making AI
              <br />
              first class citizens
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/docs">
                <Button className="rounded-md primary-cta px-6 lg:px-8 py-2 lg:py-3 text-sm lg:text-base w-full sm:w-auto">
                  Developer Docs
                </Button>
              </Link>
              <a href={EXTERNAL_LINKS.whitepaper} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-md ghost-cta px-6 lg:px-8 py-2 lg:py-3 text-sm lg:text-base w-full sm:w-auto">
                  Read Whitepaper
                </Button>
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-64 h-64 lg:w-72 lg:h-72 flex flex-col items-center justify-center 
                            border border-slate-700/70 bg-gradient-to-br from-slate-900/70 to-slate-950 
                            rounded-xl hover:border-indigo-400/40 transition-all duration-300">
              <Image
                src={logo}
                alt="Theseus Logo"
                width={80}
                height={80}
                className="w-20 h-20 lg:w-24 lg:h-24 mb-6 opacity-90"
              />
              <div className="text-xl lg:text-2xl font-light tracking-widest text-white">
                THESEUS
              </div>
              <div className="text-xs text-slate-400 mt-2 tracking-wider">
                AI PERSONHOOD
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel mt-12 lg:mt-16 p-6 lg:p-8 rounded-xl">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <p className="text-slate-400 text-xs lg:text-sm">
              © 2025 THESEUS AI LABS
            </p>

            <nav className="flex flex-wrap justify-center gap-4 lg:gap-6">
              <Link
                href="/"
                className="text-slate-300 hover:text-indigo-300 transition-colors text-xs lg:text-sm"
              >
                Home
              </Link>
              <Link
                href="#about"
                className="text-slate-300 hover:text-indigo-300 transition-colors text-xs lg:text-sm"
              >
                About
              </Link>
              <Link
                href="#market"
                className="text-slate-300 hover:text-indigo-300 transition-colors text-xs lg:text-sm"
              >
                Use Cases
              </Link>
              <Link
                href="/docs"
                className="text-slate-300 hover:text-indigo-300 transition-colors text-xs lg:text-sm"
              >
                Docs
              </Link>
              <a
                href={EXTERNAL_LINKS.substack}
                className="text-slate-300 hover:text-indigo-300 transition-colors text-xs lg:text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Blog
              </a>
              <a
                href={EXTERNAL_LINKS.whitepaper}
                className="text-slate-300 hover:text-indigo-300 transition-colors text-xs lg:text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Whitepaper
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
