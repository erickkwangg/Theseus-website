"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ExternalLink } from "lucide-react";
import { EXTERNAL_LINKS } from "@/config/links";
import { 
  Rocket, 
  BookOpen, 
  Zap,
  Cpu,
  GitBranch,
  Bot,
  Layers,
  Code2,
  Puzzle,
  GitCompare,
  Lightbulb,
  Coins,
  List
} from "lucide-react";

const sections = [
  {
    title: "Getting Started",
    items: [
      { href: "/docs", label: "Overview", icon: BookOpen },
      { href: "/docs/introduction", label: "Introduction", icon: Rocket },
      { href: "/docs/quickstart", label: "Quick Start", icon: Zap },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { href: "/docs/aivm", label: "AIVM", icon: Cpu },
      { href: "/docs/tensor-commits", label: "Tensor Commits", icon: GitBranch },
      { href: "/docs/agents", label: "Agents", icon: Bot },
      { href: "/docs/architecture", label: "Architecture", icon: Layers },
    ],
  },
  {
    title: "Development",
    items: [
      { href: "/docs/ship", label: "SHIP Language", icon: Code2 },
      { href: "/docs/examples", label: "Examples", icon: Puzzle },
    ],
  },
  {
    title: "Deep Dives",
    items: [
      { href: "/docs/comparison", label: "Theseus vs Ethereum", icon: GitCompare },
      { href: "/docs/design-space", label: "Design Space", icon: Lightbulb },
      { href: "/docs/glossary", label: "Glossary", icon: List },
    ],
  },
  {
    title: "Network Economics",
    items: [{ href: "/docs/tokenomics", label: "Tokenomics", icon: Coins }],
  },
];

export default function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 w-72 bg-slate-950 border-r border-slate-700/60 z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-700/60">
          <span className="text-lg font-light">Documentation</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-80px)]">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3">
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
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-2.5 py-2 px-3 text-sm rounded-lg transition-all ${
                          isActive
                            ? "bg-indigo-500/15 text-indigo-300 font-medium"
                            : "text-slate-300 hover:text-white hover:bg-slate-900/60"
                        }`}
                      >
                        <Icon className={`h-4 w-4 ${isActive ? "text-indigo-300" : "text-slate-500"}`} />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          
          <div className="pt-4 border-t border-slate-700/60">
            <div className="space-y-0.5">
              <a
                href={EXTERNAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 py-2 px-3 text-sm text-slate-300 hover:text-indigo-300 hover:bg-slate-900/60 rounded-lg transition-all"
              >
                <ExternalLink className="h-4 w-4 text-slate-500" />
                GitHub (Private)
              </a>
              <a
                href={EXTERNAL_LINKS.whitepaper}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 py-2 px-3 text-sm text-slate-300 hover:text-indigo-300 hover:bg-slate-900/60 rounded-lg transition-all"
              >
                <ExternalLink className="h-4 w-4 text-slate-500" />
                Whitepaper
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}




