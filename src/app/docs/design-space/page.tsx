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
          <p className="text-xl text-gray-400 mb-8">
            Theseus agents aren&apos;t just smart contracts with ML capabilities—they represent a fundamentally 
            expanded design space that enables entirely new categories of on-chain applications.
          </p>

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
            <h2 className="text-3xl font-light mb-6">Attempts to Extend Smart Contracts</h2>
            <p className="text-gray-400 mb-6">
              Over the last decade, many efforts tried to expand or rethink smart contracts. Runtimes like SVM 
              or MoveVM promise cleaner programming than the EVM. Systems such as Polkadot or eWASM let arbitrary 
              languages compile to WebAssembly as EVM alternatives.
            </p>
            <p className="text-gray-400 mb-6">
              However, <strong className="text-white">none of these fundamentally change the design space</strong>: 
              they still let you write deterministic, Turing-complete code—the same core model, expressed through 
              different tooling. The underlying constraint remains: replicated execution across all nodes.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Smart Contracts vs. AI Agents</h2>
            <p className="text-gray-400 mb-6">
              Smart contracts are &quot;digital contracts stored on a blockchain that are automatically executed when 
              predetermined terms and conditions are met.&quot; You can think of a &quot;smart&quot; contract as a very dumb 
              agent: you feed the contract an input, it applies a narrow set of predefined rules, and produces 
              deterministic outputs.
            </p>
            <p className="text-gray-400 mb-6">
              Meanwhile, thanks to rapid progress in foundational models like LLMs in the web2 world, AI agents 
              have become far more capable. You can feed almost any input to an agent, whose behavior is shaped 
              by its context window and data access (via a vector database or knowledge graph), and it will return 
              a usually non-deterministic output with far greater complexity than a typical smart contract.
            </p>

            <div className="bg-gray-900 border border-gray-800 rounded p-6 mb-6">
              <h3 className="text-lg font-medium mb-4">The Problem with Web2 Agents</h3>
              <p className="text-gray-400 mb-3">
                Although agents can produce far more sophisticated outputs, they are not stateful or sovereign 
                like Ethereum smart contracts. As a result, they lack the replicated execution consensus 
                associated with smart contracts.
              </p>
              <p className="text-gray-400">
                Ideally, we should realize what Vitalik envisioned with the Turing-complete EVM: build anything—even 
                very complex applications—in a stateful, sovereign way. This is where Theseus comes in.
              </p>
            </div>

            <div className="bg-green-950 border border-green-900 rounded p-6">
              <h3 className="text-lg font-medium mb-4 text-green-400">The Theseus Solution</h3>
              <p className="text-gray-300 mb-3">
                Theseus re-envisions agents as functionally equivalent to smart contracts, but far smarter and 
                more capable. Technologies like tensor commitments make this possible and differentiate Theseus&apos;s 
                consensus and state machine from Ethereum&apos;s.
              </p>
              <p className="text-gray-300">
                Now agentic code can run on-chain like a smart contract, and the complex functionality of agents 
                gains statefulness and sovereignty. Building blockchain applications also becomes easier.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Why This Matters: The Natural Language Shift</h2>
            <p className="text-gray-400 mb-6">
              With the emergence of tools like Cursor and n8n, and with rapid progress toward more capable 
              models over the next five years, there&apos;s a strong chance agents will fully be deployed using 
              natural language.
            </p>
            <div className="bg-amber-950 border border-amber-800 rounded p-6 mb-6">
              <p className="text-gray-300 text-lg">
                In this likely scenario, if you had to choose between &quot;smart&quot; agents and dumb contracts, 
                which would you ship? <strong className="text-white">Imagine deploying an agent as easily as 
                writing an email.</strong>
              </p>
            </div>
            <p className="text-gray-400">
              Most teams will choose the more powerful option, and experimentation and participation in on-chain 
              applications will grow accordingly.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Concrete Example: Lending Protocol</h2>
            <p className="text-gray-400 mb-6">
              It&apos;s almost a meme at this point where every L1 or L2 is trying to get the same apps deployed 
              on each chain. Although we think that competing for the same limited pool of apps is a race to 
              the bottom, we nonetheless wanted to give a concrete example on how a lending app would work on 
              Ethereum vs. Theseus.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-xl font-medium mb-4 text-gray-300">Ethereum Today</h3>
                <div className="space-y-4 text-sm text-gray-400">
                  <div>
                    <strong className="text-white">Off-chain:</strong>
                    <p className="mt-1">A backend computes rates and a keeper pushes those parameters on-chain.</p>
                  </div>
                  <div>
                    <strong className="text-white">On-chain:</strong>
                    <p className="mt-1">The contract executes based on the oracle data.</p>
                  </div>
                  <div>
                    <strong className="text-white">Updates:</strong>
                    <p className="mt-1">If a change is needed—or if the contract has a bug or is attacked—the team 
                    deploys a new contract or upgrades the existing one.</p>
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
                    <p className="mt-1">If a bug is found or a change is required, the agent&apos;s context or 
                    underlying model is swapped—by the creator or, where allowed, by the agent itself.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Beyond Feature Parity: New Primitives</h2>
            <p className="text-gray-400 mb-6">
              It&apos;s important to note that, despite the lending example, <strong className="text-white">the design 
              space of Theseus agents isn&apos;t just &quot;Aave on Theseus, but better.&quot;</strong> It can of course 
              allow for that kind of application, but it&apos;s more about creating blockchain applications that 
              were never possible until Theseus.
            </p>

            <div className="space-y-6">
              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-3">Subjective Prediction Markets</h3>
                <p className="text-gray-400 mb-3">
                  Consider an agent that adjudicates subjective prediction-market outcomes. Traditional markets 
                  are limited to objective questions—&quot;Did Donald Trump win the 2024 election?&quot;
                </p>
                <p className="text-gray-400">
                  A lighthouse agent could deliver a neutral, evidence-based ruling on a subjective question 
                  such as <strong className="text-white">&quot;Was the iPhone Air launch a flop or a success?&quot;</strong>
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-3">AI Persons</h3>
                <p className="text-gray-400 mb-3">
                  An even larger design space is the notion of AI Persons. If you see AI having actual agency 
                  and freedom, you can imagine that AI persons living on-chain like fully autonomous smart 
                  contracts would constitute a large percentage of the global GDP.
                </p>
                <p className="text-gray-400">
                  Examples include: autonomous GPs of decentralized LP funds, marketing agents competing in 
                  swarms, DAO orchestrators, and computational transparency arbiters.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-3">Complex Governance</h3>
                <p className="text-gray-400">
                  Agents can evaluate proposals based on nuanced criteria that would be impractical to encode 
                  in Solidity. They can read documentation, analyze trade-offs, and provide reasoned 
                  recommendations—all verifiably on-chain.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-3">Dynamic DeFi Strategies</h3>
                <p className="text-gray-400">
                  Agents can manage liquidity positions across protocols, rebalance portfolios based on 
                  market conditions, and execute complex trading strategies—all autonomously and verifiably.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Why This Is a Massive Market</h2>
            <p className="text-gray-400 mb-6">
              If Ethereum&apos;s market cap is ~$500B—and unlike Bitcoin, Ethereum&apos;s value is closely tied to 
              the value of its apps—then making those apps dramatically more capable should increase the value 
              captured by the base chain.
            </p>
            <p className="text-gray-400 mb-6">
              When applications become more powerful and cheaper to operate for decision-heavy logic, more 
              activity can live on-chain. That points to a substantially larger addressable market for the 
              underlying network, potentially by orders of magnitude.
            </p>

            <div className="bg-blue-950 border border-blue-900 rounded p-6">
              <h3 className="text-lg font-medium mb-3 text-blue-400">Sum &gt;&gt; Parts</h3>
              <p className="text-gray-300 mb-3">
                Before Bitcoin, there was Hashcash. It implemented a form of proof-of-work, which fundamentally 
                underpinned the architecture behind Bitcoin, yet it holds almost no market value or mindshare 
                compared to Bitcoin.
              </p>
              <p className="text-gray-300">
                By the same logic, the separate market caps of &quot;Ethereum&quot; and &quot;agents&quot; already exist; unifying 
                them in a single, verifiable substrate with tensor commitments (the proof-of-work equivalent 
                for AI in a sense) would then suggest one of the largest TAMs in crypto—where the whole can 
                be worth more than the sum of the parts; <strong className="text-white">the way the technologies 
                are combined matters far more than just the technologies that underpin the product.</strong>
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Conclusion: Our Life&apos;s Work</h2>
            <p className="text-gray-400 mb-6">
              Ethereum&apos;s contracts are Turing-complete and can in theory express almost anything, but their 
              design—replicated execution on every node—severely limits practical scalability and, with it, 
              the kinds of programs you can deploy.
            </p>
            <p className="text-gray-400 mb-6">
              Theseus takes the next step: it treats agents not just as the natural evolution of contracts, 
              but as first-class citizens in their own right.
            </p>
            <p className="text-gray-400 mb-6">
              With Theseus, the reason for a decision becomes as verifiable as the decision itself, while 
              operational overhead drops and complex applications become economical to run on-chain.
            </p>
            <div className="bg-green-950 border border-green-900 rounded p-6">
              <p className="text-gray-300 text-lg">
                The next generation of on-chain systems—AI Persons, Lighthouse agents, and beyond—are 
                genuinely new primitives. They move past &quot;apps&quot; toward entities with more fundamental, 
                durable rights. <strong className="text-white">This is the frontier we care about building. 
                It&apos;s the kind of work we&apos;re comfortable calling our life&apos;s work.</strong>
              </p>
            </div>
          </section>

          <div className="border-t border-gray-800 pt-8">
            <h3 className="text-xl font-light mb-4">Learn More</h3>
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
                <h4 className="font-medium mb-2">Theseus Thesis →</h4>
                <p className="text-sm text-gray-400">Read the full market analysis</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

