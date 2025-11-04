import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Github } from "lucide-react";

export default function Header() {
  return (
    <header className="mt-4 mx-8 bg-black px-4 sm:px-6 py-4 corner-brackets">
      <div className="corner-bracket-tr"></div>
      <div className="corner-bracket-bl"></div>
      <nav className="flex items-center justify-between">
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-white hover:text-gray-300 transition-colors text-sm"
          >
            HOME
          </Link>
          <Link
            href="#about"
            className="text-white hover:text-gray-300 transition-colors text-sm"
          >
            ABOUT
          </Link>
          <Link
            href="#market"
            className="text-white hover:text-gray-300 transition-colors text-sm"
          >
            MARKET
          </Link>
          <Link
            href="/docs"
            className="text-white hover:text-gray-300 transition-colors text-sm"
          >
            DOCS
          </Link>
          <a
            href="https://theseuschain.substack.com"
            className="text-white hover:text-gray-300 transition-colors text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            BLOG
          </a>
          <a
            href="https://github.com/ob-theseus/theseuschain"
            className="text-white hover:text-gray-300 transition-colors text-sm flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-4 w-4" />
            GITHUB
          </a>
        </div>
        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-black text-white">
              <SheetTitle hidden />
              <nav className="flex flex-col space-y-4 mt-8 px-4">
                <Link
                  href="/"
                  className="hover:text-gray-300 transition-colors text-lg"
                >
                  HOME
                </Link>
                <Link
                  href="#about"
                  className="hover:text-gray-300 transition-colors text-lg"
                >
                  ABOUT
                </Link>
                <Link
                  href="#market"
                  className="hover:text-gray-300 transition-colors text-lg"
                >
                  MARKET
                </Link>
                <Link
                  href="/docs"
                  className="hover:text-gray-300 transition-colors text-lg"
                >
                  DOCS
                </Link>
                <a
                  href="https://theseuschain.substack.com"
                  className="text-white hover:text-gray-300 transition-colors text-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  BLOG
                </a>
                <a
                  href="https://github.com/ob-theseus/theseuschain"
                  className="text-white hover:text-gray-300 transition-colors text-lg flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                  GITHUB
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        {/* Logo */}
        <div>
          <Image
            src={logo}
            alt="Logo"
            height={100}
            width={100}
            className="size-12"
          />
        </div>

        {/* Desktop Whitepaper Button */}
        {/* <Button
          variant="ghost"
          className="rounded-none border-white text-white hover:bg-white hover:text-black bg-transparent text-xs sm:text-sm px-3 sm:px-4 py-2"
        >
          <span className="hidden sm:inline">DOWNLOAD THE WHITEPAPER</span>
          <span className="sm:hidden">WHITEPAPER</span>
        </Button> */}
      </nav>
    </header>
  );
}
