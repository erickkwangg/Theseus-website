import Link from "next/link";

export default function DesignSpacePage() {
  return (
    <div>
      <h1 className="text-4xl sm:text-5xl font-light mb-8">The Theseus Design Space</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-gray-400 mb-6">
            Autonomous agents with verifiable inference enable applications impossible on existing smart contract platforms.
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
            <h2 className="text-3xl font-light mb-6">The Design Space Constraint</h2>
            <p className="text-gray-400 mb-4">
              Over the last decade, runtimes like SVM or MoveVM, and systems like Polkadot or eWASM improved 
              smart contract platforms with cleaner programming models or different languages. However, <strong className="text-white">
              all maintained the same fundamental constraint</strong>: deterministic, replicated execution across 
              all nodes. This design choice prioritizes security and verifiability but limits the complexity of 
              programs that can run economically on-chain.
            </p>
            <p className="text-gray-400">
              Theseus takes a different approach, using tensor commitments for verifiable inference. This makes 
              complex, intelligent applications economically feasible on-chain while preserving verifiability.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Concrete Example: Lending Protocol</h2>
            <p className="text-gray-400 mb-6">
              To illustrate the difference in design space, consider how a lending protocol would work on 
              Ethereum versus Theseus.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-xl font-medium mb-4 text-gray-300">Ethereum (Aave, Compound)</h3>
                <div className="space-y-4 text-sm text-gray-400">
                  <div>
                    <strong className="text-white">Off-chain:</strong>
                    <p className="mt-1">Backend computes interest rates, keeper pushes parameters on-chain</p>
                  </div>
                  <div>
                    <strong className="text-white">On-chain:</strong>
                    <p className="mt-1">Contract executes user transactions (borrowing, lending, liquidations) based on predetermined formulas</p>
                  </div>
                  <div>
                    <strong className="text-white">Updates:</strong>
                    <p className="mt-1">Deploy new contract or upgrade existing one through governance</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 border border-green-900 rounded p-6">
                <h3 className="text-xl font-medium mb-4 text-green-400">Theseus</h3>
                <div className="space-y-4 text-sm text-gray-400">
                  <div>
                    <strong className="text-white">On-chain Agent:</strong>
                    <p className="mt-1">The market runs as a lending agent—a first-class on-chain entity. Its 
                    inference process may be deterministic, but its code is nonetheless deterministically 
                    verifiable just like any smart contract.</p>
                  </div>
                  <div>
                    <strong className="text-white">Execution:</strong>
                    <p className="mt-1">Solvency and limit templates in the agent&apos;s context gate what the agent 
                    can execute. The pricing step runs via agent inference, and validators then verify a 
                    tensor-commit receipt.</p>
                  </div>
                  <div>
                    <strong className="text-white">Updates:</strong>
                    <p className="mt-1">Agent&apos;s context or underlying model can be swapped—by the creator or, 
                    where allowed, by the agent itself.</p>
                  </div>
                </div>
              </div>
            </div>
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
  );
}

