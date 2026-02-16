"use client";

import { useEffect, useState } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Find all h2 and h3 headings with IDs
    const elements = document.querySelectorAll("h2[id], h3[id]");
    const items: TOCItem[] = Array.from(elements).map((el) => ({
      id: el.id,
      text: el.textContent || "",
      level: el.tagName === "H2" ? 2 : 3,
    }));
    setHeadings(items);

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden xl:block w-56 shrink-0">
      <div className="sticky top-24">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          On this page
        </h4>
        <ul className="space-y-2 text-sm border-l border-slate-700/60">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={`block py-1 transition-colors ${
                  heading.level === 3 ? "pl-6" : "pl-3"
                } ${
                  activeId === heading.id
                    ? "text-indigo-300 border-l-2 border-indigo-300 -ml-[1px]"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}




