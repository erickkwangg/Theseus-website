"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";
import { Search, X } from "lucide-react";

type IndexEntry = {
  slug: string;
  title: string;
  href: string;
  sections: { id: string; heading: string }[];
  text: string;
};

type Result = {
  title: string;
  href: string;
  snippet?: string;
  score: number;
};

const FALLBACK_INDEX: IndexEntry[] = [
  { slug: "_root", title: "Overview", href: "/docs", sections: [], text: "documentation home overview" },
  { slug: "introduction", title: "Introduction", href: "/docs/introduction", sections: [], text: "intro what is sovereign agency runtime" },
  { slug: "faq", title: "FAQ", href: "/docs/faq", sections: [], text: "questions answers latency model size privacy" },
  { slug: "quickstart", title: "Quick Start", href: "/docs/quickstart", sections: [], text: "install setup deploy start begin rust docker getting started local node" },
  { slug: "aivm", title: "AIVM", href: "/docs/aivm", sections: [], text: "virtual machine execution tensor opcodes gas scheduling runtime" },
  { slug: "tensor-commits", title: "Tensor Commits", href: "/docs/tensor-commits", sections: [], text: "proof verification terkle merkle inference zk kzg" },
  { slug: "agents", title: "Agents", href: "/docs/agents", sections: [], text: "registration model inference loop inter-agent fee autonomy" },
  { slug: "architecture", title: "Architecture", href: "/docs/architecture", sections: [], text: "theseusstore prover verifier block transaction consensus security model liveness" },
  { slug: "ship", title: "SHIP Language", href: "/docs/ship", sections: [], text: "dsl language compile bytecode natural language agent programming" },
  { slug: "examples", title: "Examples", href: "/docs/examples", sections: [], text: "code sample pattern managed agent sovereign agent lighthouse private repo" },
  { slug: "comparison", title: "Theseus vs Ethereum", href: "/docs/comparison", sections: [], text: "smart contract autonomy evm difference" },
  { slug: "vs-ai-infra", title: "Theseus vs AI-Infra Peers", href: "/docs/vs-ai-infra", sections: [], text: "bittensor ritual 0g modulus ezkl allora zkml compare" },
  { slug: "agentic-smart-contracts", title: "Agentic Smart Contracts", href: "/docs/agentic-smart-contracts", sections: [], text: "thesis evolution primitive lending verify do not replicate" },
  { slug: "design-space", title: "Design Space", href: "/docs/design-space", sections: [], text: "market billion evolution bitcoin discovery tam" },
  { slug: "reference", title: "Runtime reference", href: "/docs/reference", sections: [], text: "runtime reference api opcodes specification" },
  { slug: "tokenomics", title: "Tokenomics", href: "/docs/tokenomics", sections: [], text: "$THE token stake fee gas economics network supply distribution vesting" },
  { slug: "status", title: "Status & Roadmap", href: "/docs/status", sections: [], text: "status roadmap testnet mainnet preview phases" },
  { slug: "glossary", title: "Glossary", href: "/docs/glossary", sections: [], text: "terms definitions vocabulary" },
];

function scoreEntry(entry: IndexEntry, query: string): Result | null {
  const q = query.toLowerCase();
  const terms = q.split(/\s+/).filter(Boolean);
  if (terms.length === 0) return null;

  const titleLower = entry.title.toLowerCase();
  const textLower = entry.text.toLowerCase();

  let score = 0;
  let snippet: string | undefined;

  for (const term of terms) {
    if (titleLower === term) score += 100;
    else if (titleLower.startsWith(term)) score += 60;
    else if (titleLower.includes(term)) score += 40;

    // section heading matches
    for (const sec of entry.sections) {
      if (sec.heading.toLowerCase().includes(term)) score += 25;
    }

    if (textLower.includes(term)) {
      score += 8;
      if (!snippet) {
        const idx = textLower.indexOf(term);
        const start = Math.max(0, idx - 40);
        const end = Math.min(entry.text.length, idx + term.length + 80);
        snippet = (start > 0 ? "…" : "") + entry.text.slice(start, end) + (end < entry.text.length ? "…" : "");
      }
    }
  }

  if (score === 0) return null;

  // Try to deep-link to a matching section
  let href = entry.href;
  for (const sec of entry.sections) {
    const headingLower = sec.heading.toLowerCase();
    if (terms.some((t) => headingLower.includes(t))) {
      href = `${entry.href}#${sec.id}`;
      break;
    }
  }

  return { title: entry.title, href, snippet, score };
}

export default function DocsSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<IndexEntry[]>(FALLBACK_INDEX);
  const [indexLoaded, setIndexLoaded] = useState(false);
  const router = useRouter();
  const noResultTimer = useRef<NodeJS.Timeout | null>(null);
  const lastTrackedQuery = useRef<string>("");

  // Lazy-load full-text index on first open
  useEffect(() => {
    if (!isOpen || indexLoaded) return;
    let cancelled = false;
    fetch("/docs-search-index.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: IndexEntry[] | null) => {
        if (cancelled || !data) return;
        setIndex(data);
        setIndexLoaded(true);
      })
      .catch(() => {
        // keep fallback
      });
    return () => {
      cancelled = true;
    };
  }, [isOpen, indexLoaded]);

  const results: Result[] = query.length > 0
    ? index
        .map((entry) => scoreEntry(entry, query))
        .filter((r): r is Result => r !== null)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8)
    : [];

  // Debounced "no results" tracking — fires once per stable query
  useEffect(() => {
    if (noResultTimer.current) clearTimeout(noResultTimer.current);
    if (query.length < 2) return;
    noResultTimer.current = setTimeout(() => {
      if (query === lastTrackedQuery.current) return;
      lastTrackedQuery.current = query;
      try {
        if (results.length === 0) {
          track("docs_search_no_results", { query });
        } else {
          track("docs_search", { query, results: results.length });
        }
      } catch {}
    }, 600);
    return () => {
      if (noResultTimer.current) clearTimeout(noResultTimer.current);
    };
  }, [query, results.length]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setIsOpen(true);
    }
    if (e.key === "Escape") {
      setIsOpen(false);
      setQuery("");
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleSelect = (result: Result) => {
    try {
      track("docs_search_select", { query, target: result.href });
    } catch {}
    router.push(result.href);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-500 dark:text-slate-300 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/60 rounded hover:border-indigo-400/50 transition-colors"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Search docs...</span>
        <kbd className="hidden sm:inline px-1.5 py-0.5 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-transparent rounded text-slate-500 dark:text-slate-300">⌘K</kbd>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
          <div
            className="fixed inset-0 bg-black/80"
            onClick={() => {
              setIsOpen(false);
              setQuery("");
            }}
          />
          <div className="relative w-full max-w-lg mx-4 bg-slate-900 border border-slate-700/70 rounded-lg shadow-2xl">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-700/70">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search documentation..."
                className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none"
                autoFocus
              />
              <button
                onClick={() => {
                  setIsOpen(false);
                  setQuery("");
                }}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {query.length > 0 && (
              <div className="max-h-80 overflow-y-auto">
                {results.length > 0 ? (
                  <ul className="py-2">
                    {results.map((item, i) => (
                      <li key={`${item.href}-${i}`}>
                        <button
                          onClick={() => handleSelect(item)}
                          className="w-full px-4 py-2 text-left text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                        >
                          <div className="font-medium">{item.title}</div>
                          {item.snippet && (
                            <div className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                              {item.snippet}
                            </div>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-8 text-center text-slate-500">
                    No results for &quot;{query}&quot;
                  </div>
                )}
              </div>
            )}

            {query.length === 0 && (
              <div className="px-4 py-6 text-center text-slate-500 text-sm">
                Type to search documentation
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
