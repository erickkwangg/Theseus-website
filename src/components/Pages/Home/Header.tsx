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
import ThemeToggle from "@/components/ThemeToggle";

type NavItem = {
  label: string;
  number: string;
  href: string;
  external?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Mission", number: "01", href: "/#mission" },
  { label: "Build", number: "02", href: "/#build" },
  { label: "Markets", number: "03", href: "/#market" },
  { label: "Blog", number: "04", href: EXTERNAL_LINKS.substack, external: true },
  { label: "Docs", number: "05", href: "/docs" },
];

const DESKTOP_LINK_CLASS = [
  "group relative text-[15px] font-semibold tracking-tight",
  "text-slate-500 dark:text-slate-400",
  "underline decoration-1 underline-offset-[6px]",
  "decoration-slate-300/80 dark:decoration-slate-600/70",
  "transition-[color,text-decoration-color,text-underline-offset] duration-300 ease-out",
  "hover:text-indigo-600 hover:underline-offset-[8px] hover:decoration-indigo-500",
  "dark:hover:text-indigo-300 dark:hover:decoration-indigo-300",
].join(" ");

const MOBILE_LINK_CLASS = [
  "group flex items-baseline gap-3 border-b border-slate-200 py-3",
  "text-lg font-semibold tracking-tight",
  "text-slate-500 dark:border-slate-800 dark:text-slate-400",
  "transition-colors duration-200 hover:text-indigo-600 dark:hover:text-indigo-300",
].join(" ");

const NUMBER_DESKTOP_CLASS = [
  "font-mono text-[15px] tabular-nums",
  "text-slate-400 dark:text-slate-500",
  "transition-colors duration-300",
  "group-hover:text-indigo-500/80 dark:group-hover:text-indigo-300/80",
].join(" ");

const NUMBER_MOBILE_CLASS = [
  "w-8 shrink-0 font-mono text-sm tabular-nums",
  "text-slate-400 dark:text-slate-500",
].join(" ");

const LABEL_MOBILE_CLASS = [
  "underline decoration-1 underline-offset-[6px]",
  "decoration-slate-300/70 dark:decoration-slate-700",
  "transition-[color,text-decoration-color] duration-200",
  "group-hover:decoration-indigo-500 dark:group-hover:decoration-indigo-300",
].join(" ");

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700/50"
          : "bg-white/40 dark:bg-slate-950/35 backdrop-blur-md"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-4">
        <nav className="relative flex items-center justify-between">
          {/* Left cluster: logo (desktop) / hamburger (mobile) */}
          <div className="flex items-center">
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-700 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/70"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white border-r border-slate-200 dark:border-slate-800"
                >
                  <SheetTitle hidden />
                  <div className="mt-8 flex flex-col px-2">
                    {NAV_ITEMS.map((item) =>
                      item.external ? (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={MOBILE_LINK_CLASS}
                        >
                          <span className={NUMBER_MOBILE_CLASS}>{item.number}</span>
                          <span className={LABEL_MOBILE_CLASS}>{item.label}</span>
                        </a>
                      ) : (
                        <Link
                          key={item.label}
                          href={item.href}
                          className={MOBILE_LINK_CLASS}
                        >
                          <span className={NUMBER_MOBILE_CLASS}>{item.number}</span>
                          <span className={LABEL_MOBILE_CLASS}>{item.label}</span>
                        </Link>
                      ),
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <Link
              href="/"
              aria-label="Theseus home"
              className="logo-pulse hidden cursor-pointer md:inline-flex"
            >
              <Image
                src={logo}
                alt="Theseus"
                height={100}
                width={100}
                className="size-12 transition-transform duration-300 hover:scale-110 brightness-0 dark:brightness-100 drop-shadow-[0_0_12px_rgba(99,102,241,0.25)] dark:drop-shadow-[0_0_16px_rgba(125,211,252,0.35)]"
              />
            </Link>
          </div>

          {/* Center cluster: nav links (desktop only, optically centered) */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
            <ul className="pointer-events-auto flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={DESKTOP_LINK_CLASS}
                    >
                      <span className={NUMBER_DESKTOP_CLASS}>{item.number}</span>
                      {" "}
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className={DESKTOP_LINK_CLASS}>
                      <span className={NUMBER_DESKTOP_CLASS}>{item.number}</span>
                      {" "}
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right cluster: logo (mobile) / Launch + theme (desktop) */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              aria-label="Theseus home"
              className="logo-pulse cursor-pointer md:hidden"
            >
              <Image
                src={logo}
                alt="Theseus"
                height={100}
                width={100}
                className="size-12 transition-transform duration-300 hover:scale-110 brightness-0 dark:brightness-100 drop-shadow-[0_0_12px_rgba(99,102,241,0.25)] dark:drop-shadow-[0_0_16px_rgba(125,211,252,0.35)]"
              />
            </Link>

            <span className="hidden md:inline-flex">
              <ThemeToggle className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60" />
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
}
