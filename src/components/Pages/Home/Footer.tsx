import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import { Github } from "lucide-react";
import { EXTERNAL_LINKS } from "@/config/links";

export default function Footer() {
  return (
    <footer className="footer-section-bg text-white py-12 lg:py-20 relative ">
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
                <Button className="rounded-none bg-white text-black hover:bg-gray-200 px-6 lg:px-8 py-2 lg:py-3 text-sm lg:text-base w-full sm:w-auto">
                  DEVELOPER DOCS
                </Button>
              </Link>
              <a href={EXTERNAL_LINKS.whitepaper} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-none bg-transparent border border-white text-white hover:bg-white hover:text-black px-6 lg:px-8 py-2 lg:py-3 text-sm lg:text-base w-full sm:w-auto">
                  READ WHITEPAPER
                  <span className="ml-2 text-xs">🔒</span>
                </Button>
              </a>
              <a href={EXTERNAL_LINKS.github} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-none bg-transparent border border-white text-white hover:bg-white hover:text-black px-6 lg:px-8 py-2 lg:py-3 text-sm lg:text-base flex items-center gap-2 w-full sm:w-auto">
                  <Github className="h-4 w-4" />
                  VIEW ON GITHUB
                </Button>
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-64 h-64 lg:w-72 lg:h-72 flex flex-col items-center justify-center 
                            border border-gray-800 bg-gradient-to-br from-gray-900/50 to-black 
                            rounded-lg hover:border-blue-500/30 transition-all duration-300">
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
              <div className="text-xs text-gray-500 mt-2 tracking-wider">
                AI PERSONHOOD
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black mt-12 lg:mt-16 p-6 lg:p-8 border border-gray-800 rounded-lg">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <p className="text-gray-500 text-xs lg:text-sm">
              © 2025 THESEUS AI LABS
            </p>

            <nav className="flex flex-wrap justify-center gap-4 lg:gap-6">
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors text-xs lg:text-sm"
              >
                HOME
              </Link>
              <Link
                href="#about"
                className="text-gray-400 hover:text-white transition-colors text-xs lg:text-sm"
              >
                ABOUT
              </Link>
              <Link
                href="#market"
                className="text-gray-400 hover:text-white transition-colors text-xs lg:text-sm"
              >
                MARKET
              </Link>
              <Link
                href="/docs"
                className="text-gray-400 hover:text-white transition-colors text-xs lg:text-sm"
              >
                DOCS
              </Link>
              <a
                href={EXTERNAL_LINKS.substack}
                className="text-gray-400 hover:text-white transition-colors text-xs lg:text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                BLOG
              </a>
              <a
                href={EXTERNAL_LINKS.whitepaper}
                className="text-gray-400 hover:text-white transition-colors text-xs lg:text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                WHITEPAPER
              </a>
              <a
                href={EXTERNAL_LINKS.github}
                className="text-gray-400 hover:text-white transition-colors text-xs lg:text-sm flex items-center gap-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-3 w-3" />
                GITHUB
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
