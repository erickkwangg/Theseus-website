"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { track } from "@vercel/analytics";
import { Menu, X, ExternalLink, Rocket } from "lucide-react";
import { EXTERNAL_LINKS } from "@/config/links";
import { DOCS_SECTIONS } from "./sections";

export default function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleNav = (target: string) => {
    setIsOpen(false);
    try {
      track("docs_nav_click", { from: pathname, to: target, surface: "mobile_sidebar" });
    } catch {}
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-8 right-8 z-50 p-3 bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-500 transition-all"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5 text-white" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 w-72 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-700/60 z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700/60">
          <span className="text-lg font-light text-slate-900 dark:text-slate-100">Documentation</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-80px)]">
          {DOCS_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 px-3">
                {section.title}
              </h3>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => handleNav(item.href)}
                        className={`flex items-center gap-2.5 py-2 px-3 text-sm rounded-lg transition-all ${
                          isActive
                            ? "bg-indigo-500/10 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300 font-medium"
                            : "text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-900/60"
                        }`}
                      >
                        <Icon className={`h-4 w-4 ${isActive ? "text-indigo-700 dark:text-indigo-300" : "text-slate-400 dark:text-slate-500"}`} />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div className="pt-4 border-t border-slate-200 dark:border-slate-700/60">
            <div className="space-y-0.5">
              <Link
                href="/launch"
                onClick={() => handleNav("/launch")}
                className="flex items-center gap-2.5 py-2 px-3 text-sm text-indigo-700 hover:text-indigo-900 hover:bg-indigo-500/10 dark:text-indigo-300 dark:hover:text-white dark:hover:bg-indigo-500/15 rounded-lg transition-all"
              >
                <Rocket className="h-4 w-4" />
                Launch
              </Link>
              <a
                href={EXTERNAL_LINKS.whitepaper}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleNav(EXTERNAL_LINKS.whitepaper)}
                className="flex items-center gap-2.5 py-2 px-3 text-sm text-slate-700 hover:text-indigo-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-indigo-300 dark:hover:bg-slate-900/60 rounded-lg transition-all"
              >
                <ExternalLink className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                Whitepaper
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
