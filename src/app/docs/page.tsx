import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DocsHomePage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-6">
          Developer Documentation
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
          Technical documentation for building on Theseus—a Layer-1 blockchain for autonomous AI agents.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/docs/quickstart"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 hover:bg-gray-200 transition-colors"
          >
            Quick Start <ArrowRight className="h-4 w-4" />
          </Link>
          <Link 
            href="/docs/introduction"
            className="inline-flex items-center gap-2 bg-transparent border border-white text-white px-8 py-3 hover:bg-white hover:text-black transition-colors"
          >
            Read Introduction
          </Link>
        </div>
      </div>

      {/* Main Categories */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <Link href="/docs/introduction" className="group">
          <div className="bg-gray-900 border border-gray-800 p-6 hover:border-gray-600 transition-colors h-full">
            <h3 className="text-xl font-medium mb-3 group-hover:text-gray-300">Getting Started</h3>
            <p className="text-gray-400 text-sm mb-4">
              Learn the basics of Theseus, install dependencies, and deploy your first AI agent.
            </p>
            <span className="text-sm text-gray-500 group-hover:text-gray-300">Start here →</span>
          </div>
        </Link>

        <Link href="/docs/comparison" className="group">
          <div className="bg-gray-900 border border-blue-900 p-6 hover:border-blue-600 transition-colors h-full">
            <h3 className="text-xl font-medium mb-3 group-hover:text-blue-400">Theseus vs. Ethereum</h3>
            <p className="text-gray-400 text-sm mb-4">
              Understand the critical difference: true autonomy. Agents vs. smart contracts explained.
            </p>
            <span className="text-sm text-gray-500 group-hover:text-blue-400">Compare →</span>
          </div>
        </Link>

        <Link href="/docs/design-space" className="group">
          <div className="bg-gray-900 border border-green-900 p-6 hover:border-green-600 transition-colors h-full">
            <h3 className="text-xl font-medium mb-3 group-hover:text-green-400">Design Space</h3>
            <p className="text-gray-400 text-sm mb-4">
              Explore the expanded design space: new primitives, markets, and applications only possible with Theseus.
            </p>
            <span className="text-sm text-gray-500 group-hover:text-green-400">Explore →</span>
          </div>
        </Link>

        <Link href="/docs/aivm" className="group">
          <div className="bg-gray-900 border border-gray-800 p-6 hover:border-gray-600 transition-colors h-full">
            <h3 className="text-xl font-medium mb-3 group-hover:text-gray-300">AI Virtual Machine</h3>
            <p className="text-gray-400 text-sm mb-4">
              Deep dive into AIVM—tensor-native runtime, opcodes, and deterministic execution.
            </p>
            <span className="text-sm text-gray-500 group-hover:text-gray-300">Learn more →</span>
          </div>
        </Link>

        <Link href="/docs/tensor-commits" className="group">
          <div className="bg-gray-900 border border-gray-800 p-6 hover:border-gray-600 transition-colors h-full">
            <h3 className="text-xl font-medium mb-3 group-hover:text-gray-300">Tensor Commits</h3>
            <p className="text-gray-400 text-sm mb-4">
              Verifiable ML inference with &lt;1% overhead using Terkle Trees and KZG commitments.
            </p>
            <span className="text-sm text-gray-500 group-hover:text-gray-300">Explore →</span>
          </div>
        </Link>

        <Link href="/docs/agents" className="group">
          <div className="bg-gray-900 border border-gray-800 p-6 hover:border-gray-600 transition-colors h-full">
            <h3 className="text-xl font-medium mb-3 group-hover:text-gray-300">Agents & Models</h3>
            <p className="text-gray-400 text-sm mb-4">
              Register agents, deploy models, and enable autonomous interactions with $THE.
            </p>
            <span className="text-sm text-gray-500 group-hover:text-gray-300">Build agents →</span>
          </div>
        </Link>

        <Link href="/docs/architecture" className="group">
          <div className="bg-gray-900 border border-gray-800 p-6 hover:border-gray-600 transition-colors h-full">
            <h3 className="text-xl font-medium mb-3 group-hover:text-gray-300">Architecture</h3>
            <p className="text-gray-400 text-sm mb-4">
              Understand the three-layer stack: AIVM, TheseusStore, and Proof of Stake consensus.
            </p>
            <span className="text-sm text-gray-500 group-hover:text-gray-300">View architecture →</span>
          </div>
        </Link>

        <Link href="/docs/ship" className="group">
          <div className="bg-gray-900 border border-gray-800 p-6 hover:border-gray-600 transition-colors h-full">
            <h3 className="text-xl font-medium mb-3 group-hover:text-gray-300">SHIP Language</h3>
            <p className="text-gray-400 text-sm mb-4">
              Domain-specific language for translating natural language to verifiable bytecode.
            </p>
            <span className="text-sm text-gray-500 group-hover:text-gray-300">Write SHIP →</span>
          </div>
        </Link>

        <Link href="/docs/tokenomics" className="group">
          <div className="bg-gray-900 border border-yellow-900 p-6 hover:border-yellow-600 transition-colors h-full">
            <h3 className="text-xl font-medium mb-3 group-hover:text-yellow-400">Tokenomics</h3>
            <p className="text-gray-400 text-sm mb-4">
              Understand $THE token utility, gas mechanics, staking, and fee distribution.
            </p>
            <span className="text-sm text-gray-500 group-hover:text-yellow-400">View economics →</span>
          </div>
        </Link>
      </div>

      {/* Additional Resources */}
      <div className="border-t border-gray-800 pt-12">
        <h3 className="text-2xl font-light mb-6">Additional Resources</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <a 
            href="https://github.com/ob-theseus/theseuschain" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 border border-gray-800 hover:border-gray-600 transition-colors"
          >
            <span className="text-gray-400">GitHub Repository</span>
            <ArrowRight className="h-4 w-4 text-gray-600 ml-auto" />
          </a>
          <a 
            href="https://docsend.com/view/qtgq5w6ehdy5dkyd" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 border border-gray-800 hover:border-gray-600 transition-colors"
          >
            <span className="text-gray-400">Technical Whitepaper</span>
            <ArrowRight className="h-4 w-4 text-gray-600 ml-auto" />
          </a>
          <Link 
            href="/docs/glossary"
            className="flex items-center gap-3 p-4 border border-gray-800 hover:border-gray-600 transition-colors"
          >
            <span className="text-gray-400">Glossary</span>
            <ArrowRight className="h-4 w-4 text-gray-600 ml-auto" />
          </Link>
          <Link 
            href="/docs/examples"
            className="flex items-center gap-3 p-4 border border-gray-800 hover:border-gray-600 transition-colors"
          >
            <span className="text-gray-400">Code Examples</span>
            <ArrowRight className="h-4 w-4 text-gray-600 ml-auto" />
          </Link>
        </div>
      </div>
    </div>
  );
}
