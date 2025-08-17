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
import { Menu } from "lucide-react";

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
          <a
            href="https://theseuschain.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors text-sm"
          >
            BLOG
          </a>
          {/* <a
            href="https://docsend.com/view/p9fw7vh3ygrrnwgg"
            className="text-white hover:text-gray-300 transition-colors text-sm"
          >
            WHITEPAPER
          </a> */}
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
                <a
                  href="https://theseuschain.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors text-sm"
                >
                  BLOG
                </a>
                {/* <a
                  href="https://docsend.com/view/p9fw7vh3ygrrnwgg"
                  className="hover:text-gray-300 transition-colors text-lg"
                >
                  WHITEPAPER
                </a>
                <Button
                  variant="ghost"
                  className="rounded-none border-white text-white hover:bg-white hover:text-black bg-transparent text-sm"
                >
                  DOWNLOAD THE WHITEPAPER
                </Button> */}
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
