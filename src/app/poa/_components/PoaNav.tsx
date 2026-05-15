"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Internal PoA nav strip. Sits below the header + ChainModeBanner on every
// PoA page so a user landing on a credential page can navigate back to
// Verify, Create, or the agents directory without going through the global
// header. The current page is bolded; everything else is a quiet link.

type Item = { label: string; href: string; matches: (p: string) => boolean };

const ITEMS: Item[] = [
  {
    label: "Home",
    href: "/poa",
    matches: (p) => p === "/poa",
  },
  {
    label: "Verify",
    href: "/poa/verify",
    matches: (p) => p.startsWith("/poa/verify"),
  },
  {
    label: "Create",
    href: "/poa/claim",
    matches: (p) => p.startsWith("/poa/claim"),
  },
  {
    label: "Docs",
    href: "/poa/docs",
    matches: (p) => p.startsWith("/poa/docs"),
  },
];

export default function PoaNav() {
  const pathname = usePathname() ?? "/poa";
  return (
    <nav
      aria-label="Proof of Agenthood"
      className="border-b"
      style={{ borderColor: "var(--poa-rule)" }}
    >
      <div className="mx-auto flex max-w-[1700px] items-center gap-x-5 px-6 py-2 sm:px-12 lg:px-16">
        {/* Section wordmark: serif italic, wax-red. Visually distinct from
            the mono-uppercase nav links so it doesn't read as a non-clickable
            sibling. Static (the current section) — the Home link covers
            the navigation use. */}
        <span
          aria-hidden
          className="font-serif text-[15px] italic leading-none tracking-tight"
          style={{ color: "var(--poa-wax)" }}
        >
          PoA
        </span>
        <span
          aria-hidden
          className="h-3 w-px"
          style={{ backgroundColor: "var(--poa-rule)" }}
        />
        <ul className="flex items-center gap-x-4 sm:gap-x-6">
          {ITEMS.map((item) => {
            const active = item.matches(pathname);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "font-mono text-[10.5px] uppercase tracking-[0.18em] transition-colors",
                    active
                      ? "text-[var(--poa-ink)]"
                      : "text-[var(--poa-sepia)] hover:text-[var(--poa-ink)]",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
