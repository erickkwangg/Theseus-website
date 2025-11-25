import Link from "next/link";

export default function DesignSpacePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <Link href="/docs" className="text-base sm:text-xl font-light hover:text-gray-300 transition-colors">
            ← Back to Docs
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-light mb-8">The Theseus Design Space</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-gray-400 mb-6">
            Theseus agents aren&apos;t just smart contracts with ML capabilities—they represent a fundamentally 
            expanded design space that enables entirely new categories of on-chain applications.
          </p>

          <div className="bg-blue-950 border border-blue-900 rounded p-6 mb-12">
            <p className="text-gray-300 mb-4">
              This page provides an overview of the expanded design space. For the complete analysis 
              including technical details, market dynamics, and the full vision, read the original article:
            </p>
            <a 
              href="https://theseuschain.substack.com/p/agents-as-an-evolution-of-smart-contracts"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded transition-colors font-medium"
            >
              Read Full Article: Agents as an Evolution of Smart Contracts →
            </a>
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">The Evolution: A Natural Progression</h2>
            
            <div className="space-y-6 mb-8">
              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-xl font-medium mb-3 text-yellow-400">Bitcoin (2009)</h3>
                <p className="text-gray-400">
                  First proposed stateful on-chain executable, non-Turing Complete code. BTC tokens were immutable, 
                  enshrined by the blockchain state. <strong className="text-white">It solved money consensus among strangers.</strong>
                </p>
                <p className="text-sm text-gray-500 mt-3 italic">
                  Public ownership you can verify.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-xl font-medium mb-3 text-blue-400">Ethereum (2014)</h3>
                <p className="text-gray-400">
                  Solved program execution consensus among strangers. You, and everyone else, could verify what a 
                  full program does and come into agreement on that program. These allowed for small deterministic 
                  programs, whose lack of complexity was reflected through design constraints: every programmatic 
                  step had to be replicated across every node in the network.
                </p>
                <p className="text-sm text-gray-500 mt-3 italic">
                  Public program behavior you can verify.
                </p>
              </div>

              <div className="bg-gray-900 border border-green-900 rounded p-6">
                <h3 className="text-xl font-medium mb-3 text-green-400">Theseus (2025)</h3>
                <p className="text-gray-400">
                  Fuses web2-style AI agents with the stateful, sovereign properties of smart contracts. Instead 
                  of replicating on-chain compute across all machines, one node performs heavy inference and others 
                  verify it before committing the result on-chain. This makes complex, intelligent applications 
                  economically feasible.
                </p>
                <p className="text-sm text-gray-500 mt-3 italic">
                  Public agent decisions you can verify.
                </p>
              </div>
            </div>

            <div className="bg-blue-950 border border-blue-900 rounded p-6">
              <h3 className="text-lg font-medium mb-3 text-blue-400">Key Insight</h3>
              <p className="text-gray-300">
                Each step removes a human dependency from something markets care about. Bitcoin removed treasurers 
                from &quot;who owns what.&quot; Ethereum removed judges from &quot;what happens next.&quot; Theseus removes hosts and 
                operators from &quot;what kind of decision will an intelligent entity make?&quot;
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Why Previous Blockchain Attempts Failed to Expand the Design Space</h2>
            <p className="text-gray-400 mb-4">
              Over the last decade, runtimes like SVM or MoveVM, and systems like Polkadot or eWASM tried to 
              improve smart contracts. However, <strong className="text-white">none fundamentally changed the 
              design space</strong>—they still required deterministic, replicated execution across all nodes.
            </p>
            <p className="text-gray-400">
              Theseus breaks this constraint using tensor commitments for verifiable inference, making complex, 
              intelligent applications economically feasible on-chain for the first time.
            </p>
          </section>


          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">New Primitives Only Possible with Theseus</h2>
            <p className="text-gray-400 mb-6">
              <strong className="text-white">The design space isn&apos;t just &quot;existing apps, but better.&quot;</strong> It&apos;s 
              about creating blockchain applications that were never possible before.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900 border border-gray-800 rounded p-4">
                <h3 className="text-base font-medium mb-2">Subjective Prediction Markets</h3>
                <p className="text-gray-400 text-sm">
                  Agents adjudicate nuanced questions like &quot;Was the iPhone Air launch successful?&quot; instead 
                  of only objective outcomes.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-4">
                <h3 className="text-base font-medium mb-2">AI Persons</h3>
                <p className="text-gray-400 text-sm">
                  Fully autonomous entities with their own goals: GPs of LP funds, marketing swarms, DAO 
                  orchestrators.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-4">
                <h3 className="text-base font-medium mb-2">Complex Governance</h3>
                <p className="text-gray-400 text-sm">
                  Evaluate proposals based on nuanced criteria, read documentation, analyze trade-offs—all 
                  verifiably on-chain.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-4">
                <h3 className="text-base font-medium mb-2">Dynamic DeFi Strategies</h3>
                <p className="text-gray-400 text-sm">
                  Manage liquidity, rebalance portfolios, execute complex trading strategies autonomously 
                  and verifiably.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Why This Is a Multi-Trillion Dollar Market</h2>
            <div className="bg-blue-950 border border-blue-900 rounded p-6 mb-6">
              <h3 className="text-lg font-medium mb-3 text-blue-400">Sum &gt;&gt; Parts</h3>
              <p className="text-gray-300 mb-3">
                If Ethereum&apos;s ~$500B market cap is tied to the value of its apps, then making those apps 
                dramatically more capable should substantially increase value captured by the base chain.
              </p>
              <p className="text-gray-300">
                Before Bitcoin, there was Hashcash—it implemented proof-of-work but holds almost no value. 
                By the same logic, the market caps of &quot;Ethereum&quot; and &quot;agents&quot; already exist; unifying them 
                with tensor commitments suggests one of the largest TAMs in crypto, where <strong className="text-white">
                the whole is worth far more than the sum of the parts</strong>.
              </p>
            </div>

            <div className="bg-green-950 border border-green-900 rounded p-6">
              <p className="text-gray-300 text-lg mb-4">
                <strong className="text-white">Bitcoin:</strong> public ownership you can verify.<br/>
                <strong className="text-white">Ethereum:</strong> public program behavior you can verify.<br/>
                <strong className="text-white">Theseus:</strong> public agent decisions you can verify.
              </p>
              <p className="text-gray-300">
                Each step removes a human dependency. Theseus removes hosts and operators from &quot;what kind of 
                decision will an intelligent entity make?&quot;
              </p>
            </div>
          </section>

          <div className="border-t border-gray-800 pt-8">
            <div className="bg-blue-950 border border-blue-900 rounded p-6 mb-6">
              <h3 className="text-xl font-medium mb-3 text-blue-400">Want the Full Story?</h3>
              <p className="text-gray-300 mb-4">
                Read the complete article with detailed examples, technical deep dives, and the full vision 
                for why agentic smart contracts represent a generational shift in blockchain technology.
              </p>
              <a 
                href="https://theseuschain.substack.com/p/agents-as-an-evolution-of-smart-contracts"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded transition-colors font-medium"
              >
                Read: Agents as an Evolution of Smart Contracts →
              </a>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Link 
                href="/docs/comparison"
                className="block p-4 border border-gray-800 hover:border-gray-600 transition-colors"
              >
                <h4 className="font-medium mb-2">← Technical Comparison</h4>
                <p className="text-sm text-gray-400">Deep dive into Theseus vs. Ethereum</p>
              </Link>
              <a 
                href="https://theseuschain.substack.com/p/the-theseus-thesis-part-2-tam-of"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border border-gray-800 hover:border-gray-600 transition-colors"
              >
                <h4 className="font-medium mb-2">Theseus Thesis: TAM →</h4>
                <p className="text-sm text-gray-400">Full market analysis</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

