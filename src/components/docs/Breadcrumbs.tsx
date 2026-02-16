"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const pageNames: Record<string, string> = {
  "docs": "Documentation",
  "introduction": "Introduction",
  "quickstart": "Quick Start",
  "aivm": "AIVM",
  "tensor-commits": "Tensor Commits",
  "agents": "Agents",
  "architecture": "Architecture",
  "ship": "SHIP Language",
  "examples": "Examples",
  "comparison": "Theseus vs Ethereum",
  "design-space": "Design Space",
  "tokenomics": "Tokenomics",
  "glossary": "Glossary",
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length <= 1) return null;

  return (
    <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-6">
      <Link href="/" className="hover:text-white transition-colors">
        <Home className="h-4 w-4" />
      </Link>
      {segments.map((segment, index) => {
        const path = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;
        const name = pageNames[segment] || segment;

        return (
          <span key={path} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-gray-600" />
            {isLast ? (
              <span className="text-white">{name}</span>
            ) : (
              <Link href={path} className="hover:text-white transition-colors">
                {name}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}




