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
                  DOWNLOAD WHITEPAPER
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
            <div className="w-64 h-64 lg:w-80 lg:h-80 logo-card">
              {/* Corner brackets */}
              <div className="corner-bracket-tl"></div>
              <div className="corner-bracket-tr"></div>
              <div className="corner-bracket-bl"></div>
              <div className="corner-bracket-br"></div>

              {/* Plus symbols at inner border corners */}
              <div className="plus-top-left">+</div>
              <div className="plus-top-right">+</div>
              <div className="plus-bottom-left">+</div>
              <div className="plus-bottom-right">+</div>

              {/* Logo and text content */}
              <div className="text-center space-y-6 z-10 relative">
                <Image
                  src={logo}
                  alt="Theseus Logo"
                  width={80}
                  height={80}
                  className="mx-auto w-16 h-16 lg:w-20 lg:h-20"
                />
                <div className="text-xl lg:text-2xl font-bold tracking-wider text-white">
                  THESEUS
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black mt-12 lg:mt-16 p-6 lg:p-8 corner-brackets">
          <div className="corner-bracket-tr"></div>
          <div className="corner-bracket-bl"></div>
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <p className="text-gray-500 text-xs lg:text-sm">
              © 2025 THESEUS AI LABS
            </p>

            <Image
              src={logo}
              alt="Theseus Logo"
              width={100}
              height={100}
              className="size-10"
            />

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
