"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// PoA docs sidebar. Editorial styling (mono-uppercase stamps, serif labels)
// to match the rest of the PoA shell. Lives only inside /poa/docs/* — not
// reused with the Theseus /docs sidebar, which carries different chrome.

type Item = { href: string; label: string };
type Section = { title: string; items: Item[] };

const SECTIONS: Section[] = [
  {
    title: "Start",
    items: [
      { href: "/poa/docs", label: "Overview" },
    ],
  },
  {
    title: "Reference",
    items: [
      { href: "/poa/docs/credential-format", label: "Credential format" },
      { href: "/poa/docs/issuing", label: "Issuing" },
      { href: "/poa/docs/verifying", label: "Verifying" },
      { href: "/poa/docs/revocation", label: "Revocation" },
    ],
  },
];

export default function DocsSidebar() {
  const pathname = usePathname() ?? "/poa/docs";
  return (
    <aside className="hidden lg:block w-56 shrink-0">
      <nav
        aria-label="PoA docs"
        className="sticky top-32 space-y-7"
      >
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <p className="poa-stamp mb-3">{section.title}</p>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block py-1.5 font-serif text-[14.5px] leading-snug transition-colors",
                        active
                          ? "italic text-[var(--poa-ink)]"
                          : "text-[var(--poa-ink-soft)] hover:text-[var(--poa-ink)]",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <div
          className="border-t pt-5"
          style={{ borderColor: "var(--poa-rule)" }}
        >
          <p className="poa-stamp mb-3">Underlying protocol</p>
          <ul className="space-y-1">
            <li>
              <Link
                href="/docs"
                className="block py-1.5 font-serif text-[14.5px] leading-snug text-[var(--poa-ink-soft)] transition-colors hover:text-[var(--poa-ink)]"
              >
                Theseus docs &rarr;
              </Link>
            </li>
            <li>
              <Link
                href="/docs/agents"
                className="block py-1.5 font-serif text-[14.5px] leading-snug text-[var(--poa-ink-soft)] transition-colors hover:text-[var(--poa-ink)]"
              >
                Agents on Theseus
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}
