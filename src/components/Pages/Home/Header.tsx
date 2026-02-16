"use client";

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
import { EXTERNAL_LINKS } from "@/config/links";
import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-slate-950/85 backdrop-blur-xl border-b border-slate-700/50" 
        : "bg-slate-950/35 backdrop-blur-md"
    }`}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-4">
        <nav className="flex items-center justify-between">
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-slate-50 hover:text-indigo-300 transition-colors text-sm font-medium">
            Home
          </Link>
          <Link href="#about" className="text-slate-50 hover:text-indigo-300 transition-colors text-sm font-medium">
            About
          </Link>
          <Link href="#market" className="text-slate-50 hover:text-indigo-300 transition-colors text-sm font-medium">
            Use Cases
          </Link>
          <Link href="/docs" className="text-slate-50 hover:text-indigo-300 transition-colors text-sm font-medium">
            Docs
          </Link>
          <a
            href={EXTERNAL_LINKS.substack}
            className="text-slate-50 hover:text-indigo-300 transition-colors text-sm font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blog
          </a>
        </div>
        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-100 hover:bg-slate-800/70">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-slate-950 text-white border-r border-slate-800">
              <SheetTitle hidden />
              <nav className="flex flex-col space-y-4 mt-8 px-4">
                <Link
                  href="/"
                  className="text-slate-100 hover:text-indigo-300 transition-colors text-lg"
                >
                  Home
                </Link>
                <Link
                  href="#about"
                  className="text-slate-100 hover:text-indigo-300 transition-colors text-lg"
                >
                  About
                </Link>
                <Link
                  href="#market"
                  className="text-slate-100 hover:text-indigo-300 transition-colors text-lg"
                >
                  Use Cases
                </Link>
                <Link
                  href="/docs"
                  className="text-slate-100 hover:text-indigo-300 transition-colors text-lg"
                >
                  Docs
                </Link>
                <a
                  href={EXTERNAL_LINKS.substack}
                  className="text-slate-100 hover:text-indigo-300 transition-colors text-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blog
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        {/* Logo */}
        <div className="logo-pulse cursor-pointer">
          <Image
            src={logo}
            alt="Logo"
            height={100}
            width={100}
            className="size-12 transition-transform duration-300 hover:scale-110 drop-shadow-[0_0_16px_rgba(125,211,252,0.35)]"
          />
        </div>
        </nav>
      </div>
    </header>
  );
}
