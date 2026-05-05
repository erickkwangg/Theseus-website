"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";
import { Rocket, ExternalLink } from "lucide-react";
import { EXTERNAL_LINKS } from "@/config/links";
import { DOCS_VERSION, DOCS_VERSION_LABEL } from "@/config/version";
import { DOCS_SECTIONS } from "./sections";

export default function DocsSidebar() {
  const pathname = usePathname();

  const handleNav = (target: string) => {
    try {
      track("docs_nav_click", { from: pathname, to: target, surface: "sidebar" });
    } catch {}
  };

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <nav className="sticky top-24 space-y-6">
        {/* Version badge */}
        <div className="px-3 pb-4 border-b border-slate-200 dark:border-slate-700/60">
          <span className="text-xs text-slate-500 dark:text-slate-400">Version</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{DOCS_VERSION}</span>
            <span className="px-1.5 py-0.5 text-[10px] bg-indigo-500/15 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300 rounded font-medium">
              {DOCS_VERSION_LABEL}
            </span>
          </div>
        </div>

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
            <a
              href={EXTERNAL_LINKS.arxivPaper}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleNav(EXTERNAL_LINKS.arxivPaper)}
              className="flex items-center gap-2.5 py-2 px-3 text-sm text-slate-700 hover:text-indigo-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-indigo-300 dark:hover:bg-slate-900/60 rounded-lg transition-all"
            >
              <ExternalLink className="h-4 w-4 text-slate-400 dark:text-slate-500" />
              arXiv paper
            </a>
          </div>
        </div>
      </nav>
    </aside>
  );
}
