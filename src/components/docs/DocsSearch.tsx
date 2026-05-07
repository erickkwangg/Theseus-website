"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

const searchIndex = [
  { title: "Overview", href: "/docs", keywords: ["home", "documentation", "docs"] },
  { title: "Introduction", href: "/docs/introduction", keywords: ["intro", "what is", "agi", "sovereign ai", "agency", "runtime", "layer 1"] },
  { title: "FAQ", href: "/docs/faq", keywords: ["questions", "answers", "latency", "model size", "privacy", "do i need crypto"] },
  { title: "Quick Start", href: "/docs/quickstart", keywords: ["install", "setup", "deploy", "start", "begin", "rust", "docker", "getting started", "local node"] },
  { title: "AIVM", href: "/docs/aivm", keywords: ["virtual machine", "execution", "tensor", "opcodes", "gas", "scheduling", "runtime"] },
  { title: "Tensor Commits", href: "/docs/tensor-commits", keywords: ["proof", "verification", "terkle", "merkle", "inference", "zk", "kzg"] },
  { title: "Agents", href: "/docs/agents", keywords: ["registration", "model", "inference loop", "inter-agent", "fee", "autonomy"] },
  { title: "Execution Model", href: "/docs/execution", keywords: ["execution", "three-stage", "queue", "prove", "resume", "on_initialize", "asynchronous", "abg runtime", "InferenceVerified"] },
  { title: "Provers", href: "/docs/provers", keywords: ["prover", "full prover", "lite prover", "kzg", "vrf", "capacity registry", "vllm", "tensorcommitment", "bls12-381", "msm"] },
  { title: "Tools & Enclave", href: "/docs/tools", keywords: ["tools", "blessed enclave", "tee", "credentials", "web search", "authenticated http", "x402", "tool call queued"] },
  { title: "Data Availability", href: "/docs/data-availability", keywords: ["da", "theseusstore", "weights_root", "context_root", "merkle", "verkle", "sampling", "ocw", "off-chain data"] },
  { title: "Security", href: "/docs/security", keywords: ["security", "trust assumptions", "bft", "validators", "lite prover", "dos", "kzg verification", "weight model", "slashing"] },
  { title: "Governance", href: "/docs/governance", keywords: ["governance", "forkless upgrade", "set_code", "validator vote", "delegation", "proposal", "grace period"] },
  { title: "Architecture", href: "/docs/architecture", keywords: ["theseusstore", "prover", "verifier", "block", "transaction", "consensus", "security model", "liveness"] },
  { title: "SHIP", href: "/docs/ship", keywords: ["ship", "shipc", "structured hierarchical instructional programs", "agent specification", "compile", "compiled agent", "abg", "agent behavior graph", "scale"] },
  { title: "Examples", href: "/docs/examples", keywords: ["code", "sample", "pattern", "managed agent", "sovereign agent", "lighthouse", "private repo"] },
  { title: "Theseus vs Ethereum", href: "/docs/comparison", keywords: ["smart contract", "autonomy", "evm", "difference"] },
  { title: "Theseus vs AI-Infra Peers", href: "/docs/vs-ai-infra", keywords: ["bittensor", "ritual", "0g", "modulus", "ezkl", "allora", "zkml", "compare"] },
  { title: "Agentic Smart Contracts", href: "/docs/agentic-smart-contracts", keywords: ["thesis", "evolution", "primitive", "lending", "verify do not replicate", "design space", "market", "tam", "ai persons", "subjective prediction markets"] },
  { title: "Tokenomics", href: "/docs/tokenomics", keywords: ["$THE", "token", "stake", "fee", "gas", "economics", "network economics", "supply", "distribution", "vesting"] },
  { title: "Status & Roadmap", href: "/docs/status", keywords: ["status", "roadmap", "testnet", "mainnet", "preview", "phases"] },
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
                    {results.map((item) => (
                      <li key={item.href}>
                        <button
                          onClick={() => handleSelect(item.href)}
                          className="w-full px-4 py-2 text-left text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                        >
                          {item.title}
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

