import Link from "next/link";
import { 
  ArrowRight, 
  Rocket, 
  GitCompare, 
  Lightbulb, 
  Cpu, 
  GitBranch, 
  Bot, 
  Layers, 
  Code2, 
  Coins, 
  Github, 
  FileText,
  BookOpen,
  Puzzle
} from "lucide-react";

export default function DocsHomePage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative text-center mb-16 pb-12 border-b border-gray-800">
        {/* Gradient glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-transparent to-transparent -z-10 rounded-2xl" />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
          </span>
          Developer Documentation
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-6 tracking-tight">
          Build on <span className="text-blue-400">Theseus</span>
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          Technical documentation for the Layer-1 blockchain powering autonomous AI agents.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/docs/quickstart"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg transition-all hover:scale-[1.02] font-medium"
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
          <div className="relative h-full bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                <Rocket className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-medium group-hover:text-blue-400 transition-colors">Getting Started</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Learn the basics of Theseus and deploy your first AI agent.
            </p>
            <span className="text-sm text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              Start here <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </Link>

        <Link href="/docs/comparison" className="group">
          <div className="relative h-full bg-gradient-to-br from-gray-900 to-gray-950 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5">
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-medium bg-purple-500/20 text-purple-400 uppercase tracking-wider">
              Popular
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                <GitCompare className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-medium group-hover:text-purple-400 transition-colors">Theseus vs. Ethereum</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Understand the difference: true autonomy vs smart contracts.
            </p>
            <span className="text-sm text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              Compare <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </Link>

        <Link href="/docs/design-space" className="group">
          <div className="relative h-full bg-gradient-to-br from-gray-900 to-gray-950 border border-green-500/30 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-green-500/10 text-green-400 group-hover:bg-green-500/20 transition-colors">
                <Lightbulb className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-medium group-hover:text-green-400 transition-colors">Design Space</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Explore new primitives and applications only possible with Theseus.
            </p>
            <span className="text-sm text-green-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
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
              <Cpu className="h-5 w-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
              <div>
                <span className="text-sm font-medium group-hover:text-white transition-colors">AIVM</span>
                <p className="text-xs text-gray-500">Virtual machine</p>
              </div>
            </div>
          </Link>

          <Link href="/docs/tensor-commits" className="group">
            <div className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-700 hover:bg-gray-900 transition-all">
              <GitBranch className="h-5 w-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
              <div>
                <span className="text-sm font-medium group-hover:text-white transition-colors">Tensor Commits</span>
                <p className="text-xs text-gray-500">Verifiable inference</p>
              </div>
            </div>
          </Link>

          <Link href="/docs/agents" className="group">
            <div className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-700 hover:bg-gray-900 transition-all">
              <Bot className="h-5 w-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
              <div>
                <span className="text-sm font-medium group-hover:text-white transition-colors">Agents</span>
                <p className="text-xs text-gray-500">Registration & lifecycle</p>
              </div>
            </div>
          </Link>

          <Link href="/docs/architecture" className="group">
            <div className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-700 hover:bg-gray-900 transition-all">
              <Layers className="h-5 w-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
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
              <Code2 className="h-5 w-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
              <div>
                <span className="text-sm font-medium group-hover:text-white transition-colors">SHIP Language</span>
                <p className="text-xs text-gray-500">DSL for agents</p>
              </div>
            </div>
          </Link>

          <Link href="/docs/examples" className="group">
            <div className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-700 hover:bg-gray-900 transition-all">
              <Puzzle className="h-5 w-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
              <div>
                <span className="text-sm font-medium group-hover:text-white transition-colors">Examples</span>
                <p className="text-xs text-gray-500">Code samples</p>
              </div>
            </div>
          </Link>

          <Link href="/docs/tokenomics" className="group">
            <div className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-700 hover:bg-gray-900 transition-all">
              <Coins className="h-5 w-5 text-gray-500 group-hover:text-yellow-400 transition-colors" />
              <div>
                <span className="text-sm font-medium group-hover:text-white transition-colors">Tokenomics</span>
                <p className="text-xs text-gray-500">$THE mechanics</p>
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
            href="https://github.com/ob-theseus/theseuschain" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 border border-gray-800 rounded-lg hover:border-gray-700 hover:bg-gray-900/50 transition-all group"
          >
            <Github className="h-5 w-5 text-gray-500 group-hover:text-white transition-colors" />
            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">GitHub</span>
            <ArrowRight className="h-3 w-3 text-gray-600 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a 
            href="https://docsend.com/view/qtgq5w6ehdy5dkyd" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 border border-gray-800 rounded-lg hover:border-gray-700 hover:bg-gray-900/50 transition-all group"
          >
            <FileText className="h-5 w-5 text-gray-500 group-hover:text-white transition-colors" />
            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Whitepaper</span>
            <ArrowRight className="h-3 w-3 text-gray-600 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
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
            href="https://theseuschain.substack.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 border border-gray-800 rounded-lg hover:border-gray-700 hover:bg-gray-900/50 transition-all group"
          >
            <FileText className="h-5 w-5 text-gray-500 group-hover:text-white transition-colors" />
            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Substack</span>
            <ArrowRight className="h-3 w-3 text-gray-600 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </div>
  );
}
