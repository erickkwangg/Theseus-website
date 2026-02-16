import Link from "next/link";
import type { Metadata } from "next";
import { 
  ArrowRight, 
  Rocket, 
  GitCompare, 
  Cpu, 
  GitBranch, 
  Bot, 
  Layers, 
  Code2, 
  FileText,
  BookOpen,
  Puzzle,
  ExternalLink
} from "lucide-react";
import { EXTERNAL_LINKS } from "@/config/links";

export const metadata: Metadata = {
  title: "Docs Home - Theseus",
  description:
    "Developer documentation hub for Theseus: architecture, AIVM, SHIP language, examples, and quickstart guides.",
  keywords: ["Theseus docs", "AIVM", "SHIP", "quickstart", "Tensor Commits"],
};

export default function DocsHomePage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative text-center mb-16 pb-12 border-b border-slate-700/60">
        {/* Gradient glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/25 via-transparent to-transparent -z-10 rounded-2xl" />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/35 bg-indigo-500/10 text-indigo-300 text-sm mb-6">
          Developer Documentation
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-6 tracking-tight">
          Build with <span className="text-indigo-300">Theseus</span>
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Technical documentation for the Theseus runtime and agent execution stack.
          <span className="block text-base text-slate-400 mt-2">
            Theseus is implemented as a Layer-1 chain, with AI execution and verification as the primary developer surface.
          </span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/docs/quickstart"
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-lg transition-all hover:scale-[1.02] font-medium"
          >
            <Rocket className="h-4 w-4" />
            Quick Start
          </Link>
          <Link 
            href="/docs/introduction"
            className="inline-flex items-center justify-center gap-2 bg-transparent border border-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-900 hover:border-gray-600 transition-all"
          >
            Read Introduction
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Featured Cards - Top 3 */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Link href="/docs/introduction" className="group">
          <div className="relative h-full bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700/60 rounded-xl p-6 hover:border-indigo-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-300 group-hover:bg-indigo-500/20 transition-colors">
                <Rocket className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-medium group-hover:text-indigo-300 transition-colors">Getting Started</h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Learn Theseus fundamentals and deploy your first agent.
            </p>
            <span className="text-sm text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              Start here <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </Link>

        <Link href="/docs/ship" className="group">
          <div className="relative h-full bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700/60 rounded-xl p-6 hover:border-indigo-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-300 group-hover:bg-indigo-500/20 transition-colors">
                <Code2 className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-medium group-hover:text-indigo-300 transition-colors">SHIP Language</h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Build agent workflows using SHIP, the domain-specific language for Theseus.
            </p>
            <span className="text-sm text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              Start building <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </Link>

        <Link href="/docs/architecture" className="group">
          <div className="relative h-full bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700/60 rounded-xl p-6 hover:border-indigo-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-300 group-hover:bg-indigo-500/20 transition-colors">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-medium group-hover:text-indigo-300 transition-colors">Architecture</h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Understand the core execution and verification pipeline end-to-end.
            </p>
            <span className="text-sm text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              Explore <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </Link>
      </div>

      {/* Core Concepts */}
      <div className="mb-12">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
          <div className="h-px flex-1 bg-gray-800" />
          Core Concepts
          <div className="h-px flex-1 bg-gray-800" />
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link href="/docs/aivm" className="group">
            <div className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-700 hover:bg-gray-900 transition-all">
              <Cpu className="h-5 w-5 text-gray-500 group-hover:text-indigo-300 transition-colors" />
              <div>
                <span className="text-sm font-medium group-hover:text-white transition-colors">AIVM</span>
                <p className="text-xs text-gray-500">Virtual machine</p>
              </div>
            </div>
          </Link>

          <Link href="/docs/tensor-commits" className="group">
            <div className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-700 hover:bg-gray-900 transition-all">
              <GitBranch className="h-5 w-5 text-gray-500 group-hover:text-indigo-300 transition-colors" />
              <div>
                <span className="text-sm font-medium group-hover:text-white transition-colors">Tensor Commits</span>
                <p className="text-xs text-gray-500">Verifiable inference</p>
              </div>
            </div>
          </Link>

          <Link href="/docs/agents" className="group">
            <div className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-700 hover:bg-gray-900 transition-all">
              <Bot className="h-5 w-5 text-gray-500 group-hover:text-indigo-300 transition-colors" />
              <div>
                <span className="text-sm font-medium group-hover:text-white transition-colors">Agents</span>
                <p className="text-xs text-gray-500">Registration & lifecycle</p>
              </div>
            </div>
          </Link>

          <Link href="/docs/architecture" className="group">
            <div className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-700 hover:bg-gray-900 transition-all">
              <Layers className="h-5 w-5 text-gray-500 group-hover:text-indigo-300 transition-colors" />
              <div>
                <span className="text-sm font-medium group-hover:text-white transition-colors">Architecture</span>
                <p className="text-xs text-gray-500">System overview</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Development */}
      <div className="mb-12">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
          <div className="h-px flex-1 bg-gray-800" />
          Development
          <div className="h-px flex-1 bg-gray-800" />
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Link href="/docs/ship" className="group">
            <div className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-700 hover:bg-gray-900 transition-all">
              <Code2 className="h-5 w-5 text-gray-500 group-hover:text-indigo-300 transition-colors" />
              <div>
                <span className="text-sm font-medium group-hover:text-white transition-colors">SHIP Language</span>
                <p className="text-xs text-gray-500">DSL for agents</p>
              </div>
            </div>
          </Link>

          <Link href="/docs/examples" className="group">
            <div className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-700 hover:bg-gray-900 transition-all">
              <Puzzle className="h-5 w-5 text-gray-500 group-hover:text-indigo-300 transition-colors" />
              <div>
                <span className="text-sm font-medium group-hover:text-white transition-colors">Examples</span>
                <p className="text-xs text-gray-500">Code samples</p>
              </div>
            </div>
          </Link>

          <Link href="/docs/comparison" className="group">
            <div className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-700 hover:bg-gray-900 transition-all">
              <GitCompare className="h-5 w-5 text-gray-500 group-hover:text-indigo-300 transition-colors" />
              <div>
                <span className="text-sm font-medium group-hover:text-white transition-colors">Theseus vs Ethereum</span>
                <p className="text-xs text-gray-500">Architecture and trust model comparison</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Resources */}
      <div className="border-t border-gray-800 pt-8">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Resources
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <a 
            href={EXTERNAL_LINKS.github}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 border border-gray-800 rounded-lg hover:border-gray-700 hover:bg-gray-900/50 transition-all group"
          >
            <ExternalLink className="h-5 w-5 text-gray-500 group-hover:text-white transition-colors" />
            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">GitHub (Private)</span>
            <ExternalLink className="h-3 w-3 text-gray-600 ml-auto" />
          </a>
          <a 
            href={EXTERNAL_LINKS.whitepaper}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 border border-gray-800 rounded-lg hover:border-gray-700 hover:bg-gray-900/50 transition-all group"
          >
            <FileText className="h-5 w-5 text-gray-500 group-hover:text-white transition-colors" />
            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Whitepaper</span>
            <ExternalLink className="h-3 w-3 text-gray-600 ml-auto" />
          </a>
          <Link 
            href="/docs/glossary"
            className="flex items-center gap-3 p-4 border border-gray-800 rounded-lg hover:border-gray-700 hover:bg-gray-900/50 transition-all group"
          >
            <BookOpen className="h-5 w-5 text-gray-500 group-hover:text-white transition-colors" />
            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Glossary</span>
            <ArrowRight className="h-3 w-3 text-gray-600 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <a 
            href={EXTERNAL_LINKS.substack}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 border border-gray-800 rounded-lg hover:border-gray-700 hover:bg-gray-900/50 transition-all group"
          >
            <FileText className="h-5 w-5 text-gray-500 group-hover:text-white transition-colors" />
            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Blog</span>
            <ExternalLink className="h-3 w-3 text-gray-600 ml-auto" />
          </a>
        </div>
      </div>
    </div>
  );
}
