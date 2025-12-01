"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { EXTERNAL_LINKS } from "@/config/links";

const sections = [
  {
    title: "Getting Started",
    items: [
      { href: "/docs", label: "Overview" },
      { href: "/docs/introduction", label: "Introduction" },
      { href: "/docs/quickstart", label: "Quick Start" },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { href: "/docs/aivm", label: "AIVM" },
      { href: "/docs/tensor-commits", label: "Tensor Commits" },
      { href: "/docs/agents", label: "Agents" },
      { href: "/docs/architecture", label: "Architecture" },
    ],
  },
  {
    title: "Development",
    items: [
      { href: "/docs/ship", label: "SHIP Language" },
      { href: "/docs/examples", label: "Examples" },
    ],
  },
  {
    title: "Deep Dives",
    items: [
      { href: "/docs/comparison", label: "Theseus vs Ethereum" },
      { href: "/docs/design-space", label: "Design Space" },
      { href: "/docs/tokenomics", label: "Tokenomics" },
      { href: "/docs/glossary", label: "Glossary" },
    ],
  },
];

export default function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <nav className="sticky top-8 space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block py-1.5 px-3 text-sm rounded-r transition-all ${
                        isActive
                          ? "bg-gray-900 text-white font-medium border-l-2 border-white -ml-[2px]"
                          : "text-gray-400 hover:text-white hover:bg-gray-900/50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        
        <div className="pt-4 border-t border-gray-800">
          <a
            href={EXTERNAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="block py-1.5 px-3 text-sm text-gray-400 hover:text-white transition-colors"
          >
            GitHub →
          </a>
          <a
            href={EXTERNAL_LINKS.whitepaper}
            target="_blank"
            rel="noopener noreferrer"
            className="block py-1.5 px-3 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Whitepaper →
          </a>
        </div>
      </nav>
    </aside>
  );
}

