"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

const searchIndex = [
  { title: "Overview", href: "/docs", keywords: ["home", "documentation", "docs"] },
  { title: "Introduction", href: "/docs/introduction", keywords: ["intro", "what is", "agi", "sovereign ai", "personhood"] },
  { title: "Quick Start", href: "/docs/quickstart", keywords: ["install", "setup", "deploy", "start", "begin", "rust", "docker"] },
  { title: "AIVM", href: "/docs/aivm", keywords: ["virtual machine", "execution", "tensor", "opcodes", "gas", "scheduling"] },
  { title: "Tensor Commits", href: "/docs/tensor-commits", keywords: ["proof", "verification", "terkle", "merkle", "inference"] },
  { title: "Agents", href: "/docs/agents", keywords: ["registration", "model", "inference loop", "inter-agent", "fee"] },
  { title: "Architecture", href: "/docs/architecture", keywords: ["theseusstore", "prover", "verifier", "block", "transaction"] },
  { title: "SHIP Language", href: "/docs/ship", keywords: ["dsl", "language", "compile", "bytecode", "natural language"] },
  { title: "Examples", href: "/docs/examples", keywords: ["code", "sample", "pattern", "proto-ai", "lighthouse", "free ai"] },
  { title: "Theseus vs Ethereum", href: "/docs/comparison", keywords: ["smart contract", "autonomy", "evm", "difference"] },
  { title: "Design Space", href: "/docs/design-space", keywords: ["market", "billion", "evolution", "bitcoin"] },
  { title: "Tokenomics", href: "/docs/tokenomics", keywords: ["$THE", "token", "stake", "fee", "gas", "economics"] },
  { title: "Glossary", href: "/docs/glossary", keywords: ["terms", "definitions", "vocabulary"] },
];

export default function DocsSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const results = query.length > 0
    ? searchIndex.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.keywords.some((k) => k.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

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

  const handleSelect = (href: string) => {
    router.push(href);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 bg-gray-900 border border-gray-800 rounded hover:border-gray-600 transition-colors"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Search docs...</span>
        <kbd className="hidden sm:inline px-1.5 py-0.5 text-xs bg-gray-800 rounded">⌘K</kbd>
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
          <div className="relative w-full max-w-lg mx-4 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search documentation..."
                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
                autoFocus
              />
              <button
                onClick={() => {
                  setIsOpen(false);
                  setQuery("");
                }}
                className="p-1 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {query.length > 0 && (
              <div className="max-h-80 overflow-y-auto">
                {results.length > 0 ? (
                  <ul className="py-2">
                    {results.map((item) => (
                      <li key={item.href}>
                        <button
                          onClick={() => handleSelect(item.href)}
                          className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                        >
                          {item.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-8 text-center text-gray-500">
                    No results for &quot;{query}&quot;
                  </div>
                )}
              </div>
            )}

            {query.length === 0 && (
              <div className="px-4 py-6 text-center text-gray-500 text-sm">
                Type to search documentation
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

