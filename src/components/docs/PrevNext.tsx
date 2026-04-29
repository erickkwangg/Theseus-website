import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

/** Curated reading order for /docs pages. Defines Prev/Next navigation. */
const DOCS_ORDER: Array<{ slug: string; title: string }> = [
  { slug: "introduction", title: "Introduction" },
  { slug: "quickstart", title: "Quick Start" },
  { slug: "architecture", title: "Architecture" },
  { slug: "aivm", title: "AIVM" },
  { slug: "tensor-commits", title: "Tensor Commits" },
  { slug: "ship", title: "SHIP Language" },
  { slug: "agents", title: "Agents" },
  { slug: "examples", title: "Examples" },
  { slug: "comparison", title: "Theseus vs Ethereum" },
  { slug: "vs-ai-infra", title: "Theseus vs AI-Infra Peers" },
  { slug: "agentic-smart-contracts", title: "Agentic Smart Contracts" },
  { slug: "design-space", title: "Design Space" },
  { slug: "tokenomics", title: "Tokenomics" },
  { slug: "status", title: "Status & Roadmap" },
  { slug: "faq", title: "FAQ" },
  { slug: "glossary", title: "Glossary" },
];

type Props = {
  /** Current page slug under /docs (e.g. "aivm"). */
  current: string;
};

/**
 * Prev / Next links between docs pages, following DOCS_ORDER.
 * Renders nothing if `current` isn't in the order list.
 */
export default function PrevNext({ current }: Props) {
  const idx = DOCS_ORDER.findIndex((p) => p.slug === current);
  if (idx === -1) return null;

  const prev = idx > 0 ? DOCS_ORDER[idx - 1] : null;
  const next = idx < DOCS_ORDER.length - 1 ? DOCS_ORDER[idx + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Docs page navigation"
      className="mt-16 grid gap-3 border-t border-slate-200 pt-8 sm:grid-cols-2 dark:border-slate-800"
    >
      {prev ? (
        <Link
          href={`/docs/${prev.slug}`}
          className="group flex items-center gap-3 rounded-lg border border-slate-200 p-4 transition-colors hover:border-indigo-400/50 hover:bg-slate-50 dark:border-slate-800 dark:hover:border-indigo-400/50 dark:hover:bg-slate-900/50 no-underline"
        >
          <ArrowLeft className="h-4 w-4 text-slate-500 group-hover:text-indigo-300" />
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Previous</p>
            <p className="font-medium text-slate-900 group-hover:text-indigo-300 dark:text-white">
              {prev.title}
            </p>
          </div>
        </Link>
      ) : (
        <span aria-hidden />
      )}

      {next ? (
        <Link
          href={`/docs/${next.slug}`}
          className="group flex items-center justify-end gap-3 rounded-lg border border-slate-200 p-4 text-right transition-colors hover:border-indigo-400/50 hover:bg-slate-50 dark:border-slate-800 dark:hover:border-indigo-400/50 dark:hover:bg-slate-900/50 no-underline"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Next</p>
            <p className="font-medium text-slate-900 group-hover:text-indigo-300 dark:text-white">
              {next.title}
            </p>
          </div>
          <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-indigo-300" />
        </Link>
      ) : (
        <span aria-hidden />
      )}
    </nav>
  );
}
