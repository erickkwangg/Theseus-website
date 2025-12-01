import Link from "next/link";

export default function ComparisonPage() {
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
        <h1 className="text-4xl sm:text-5xl font-light mb-8">Theseus vs. Ethereum</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-gray-400 mb-8">
            While the deployment and interaction patterns look similar, Theseus agents differ fundamentally 
            from traditional smart contracts.
          </p>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">The Critical Difference: True Autonomy</h2>
            
            <div className="bg-amber-950 border border-amber-800 rounded p-6 mb-6">
              <h3 className="text-lg font-medium mb-3 text-amber-400">Common Misconception</h3>
              <p className="text-gray-300 mb-3">
                Many people believe Ethereum smart contracts are autonomous because they can call other contracts 
                or execute complex logic. <strong>This is incorrect.</strong>
              </p>
              <p className="text-gray-300">
                Smart contracts are <strong>purely reactive</strong>. They cannot initiate any action without an 
                Externally Owned Account (EOA) with a private key sending them a transaction first.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded p-6 mb-6">
              <h3 className="text-lg font-medium mb-4">What Smart Contracts CAN&apos;T Do</h3>
              <ul className="space-y-3 text-gray-400">
                <li>❌ <strong className="text-white">Wake up on their own:</strong> Cannot execute based on time, block number, or any condition without external triggering</li>
                <li>❌ <strong className="text-white">Initiate transactions:</strong> Must be called by an EOA (private key holder) to do anything</li>
                <li>❌ <strong className="text-white">Autonomously manage assets:</strong> While contracts hold ETH and tokens, they cannot decide on their own when or how to use them—they need external transactions to trigger any asset movement</li>
                <li>❌ <strong className="text-white">Make autonomous decisions:</strong> Cannot evaluate conditions and act without being triggered externally</li>
              </ul>
              
              <div className="mt-6 p-4 bg-black border border-gray-700 rounded">
                <p className="text-sm text-gray-400">
                  <strong className="text-white">Note on Automation:</strong> Services like Chainlink Keepers or Gelato are 
                  off-chain bots with private keys that monitor and trigger contracts. The contract itself is still reactive—it 
                  just outsources the triggering to a third party.
                </p>
              </div>
            </div>

            <div className="bg-blue-950 border border-blue-900 rounded p-6 mb-8">
              <h3 className="text-lg font-medium mb-4 text-blue-400">What Theseus Agents CAN Do</h3>
              <ul className="space-y-3 text-gray-300">
                <li>✅ <strong className="text-white">Wake up autonomously:</strong> Agents activate every N blocks via heartbeat mechanism, no external trigger needed</li>
                <li>✅ <strong className="text-white">Initiate transactions:</strong> Can send transactions, invoke models, and interact with other agents entirely on their own</li>
                <li>✅ <strong className="text-white">Autonomously manage assets:</strong> Holds $THE balance and can decide when and how to use it without external triggers or private key control</li>
                <li>✅ <strong className="text-white">Make autonomous decisions:</strong> Evaluates triggers, runs ML inference, and acts based on its own logic</li>
              </ul>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded p-6">
              <h3 className="text-lg font-medium mb-4">Analogy</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white mb-2">Ethereum Smart Contract</h4>
                  <p className="text-gray-400 text-sm">
                    Like a <strong>vending machine</strong>: Contains logic and can dispense items, but someone must 
                    press the buttons. It cannot decide to operate on its own, check inventory, or restock itself.
                  </p>
                </div>
                <div>
                  <h4 className="text-blue-400 mb-2">Theseus Agent</h4>
                  <p className="text-gray-400 text-sm">
                    Like an <strong>autonomous shopkeeper</strong>: Can wake up, check inventory, make decisions about 
                    restocking, interact with suppliers, and manage the store without anyone telling it what to do.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Side-by-Side Comparison</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-xl font-medium mb-4 text-gray-300">Ethereum Smart Contracts</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Passive code that waits to be called. Deterministic, rigid logic with no ability to initiate actions.
                </p>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li>• <strong className="text-white">Reactive:</strong> Only executes when externally triggered by a transaction</li>
                  <li>• <strong className="text-white">Deterministic:</strong> Same input always produces same output</li>
                  <li>• <strong className="text-white">Human-controlled:</strong> Requires external accounts (private keys) to initiate any action</li>
                  <li>• <strong className="text-white">Simple logic:</strong> Basic conditional statements and state transitions</li>
                  <li>• <strong className="text-white">No inference:</strong> Cannot perform ML operations or complex reasoning</li>
                  <li>• <strong className="text-white">No autonomous control:</strong> Holds assets but cannot decide to use them without external triggering</li>
                </ul>
              </div>

              <div className="bg-gray-900 border border-blue-900 rounded p-6">
                <h3 className="text-xl font-medium mb-4 text-blue-400">Theseus Agents</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Autonomous entities with true agency. Can think, decide, and act independently without human control.
                </p>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li>• <strong className="text-white">Proactive:</strong> Can wake up, evaluate conditions, and initiate transactions autonomously</li>
                  <li>• <strong className="text-white">Intelligent:</strong> Performs ML inference on-chain to make complex decisions</li>
                  <li>• <strong className="text-white">Self-sovereign:</strong> Owns its own $THE balance and controls its actions without private keys</li>
                  <li>• <strong className="text-white">Agentic logic:</strong> Can reason, learn from context, and adapt behavior</li>
                  <li>• <strong className="text-white">Native inference:</strong> Runs models directly in AIVM with verifiable proofs</li>
                  <li>• <strong className="text-white">Autonomous asset control:</strong> Can independently decide when and how to use its assets without external triggers</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Visual Comparison: Interaction Flows</h2>
            <p className="text-gray-400 mb-6">
              Notice how Ethereum smart contracts require external EOAs (with private keys) to initiate everything, 
              while Theseus agents can wake up and act autonomously.
            </p>
            <div className="bg-black border border-gray-700 rounded p-4 overflow-x-auto">
              <img 
                src="/theseus-vs-ethereum.png" 
                alt="Theseus vs Ethereum interaction flow comparison" 
                className="w-full h-auto"
              />
            </div>
            <p className="text-sm text-gray-500 mt-4">
              <strong>Top:</strong> Ethereum requires a developer with a private key to trigger every action. 
              <strong className="ml-4">Bottom:</strong> Theseus agents can initiate actions and run inference autonomously.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Deployment: Similar Process, Different Outcome</h2>
            <p className="text-gray-400 mb-6">
              Deploying a Theseus agent feels familiar to web2 developers and resembles smart contract deployment, 
              but with crucial additions that enable true autonomy.
            </p>
            
            <div className="bg-gray-900 border border-gray-800 rounded p-6 mb-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white mb-3">Smart Contract Deployment</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>1. Write Solidity code</li>
                    <li>2. Compile to EVM bytecode</li>
                    <li>3. Deploy to Ethereum (costs gas)</li>
                    <li>4. Contract sits idle waiting for calls</li>
                    <li>5. Requires EOAs with private keys to do anything</li>
                    <li>6. No autonomous operation possible</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-blue-400 mb-3">Theseus Agent Deployment</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>1. Write agent code (Python, Rust, or SHIP DSL)</li>
                    <li>2. Add Theseus context (models, autonomy level, triggers)</li>
                    <li>3. Deploy to Theseus with initial $THE balance</li>
                    <li>4. Agent immediately begins autonomous operation</li>
                    <li>5. Can initiate transactions, run inference, and coordinate independently</li>
                    <li>6. Operates without any private key control</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-950 border border-blue-900 rounded p-6">
              <h3 className="text-lg font-medium mb-3 text-blue-400">Key Insight</h3>
              <p className="text-gray-300">
                Ethereum smart contracts are <strong>reactive programs with conditional logic</strong> that must be 
                externally triggered. Theseus agents are <strong>autonomous digital entities</strong> that can think, 
                plan, and act without human intervention. The deployment process may look similar, but what you get is 
                fundamentally different: not a passive contract, but an active, intelligent agent with real autonomy.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">An Expanded Design Space</h2>
            <p className="text-gray-400 mb-6">
              True autonomy and verifiable inference enable applications that are impossible or impractical 
              on existing platforms.
            </p>

            <div className="bg-gray-900 border border-gray-800 rounded p-6 mb-6">
              <h3 className="text-xl font-medium mb-4">The Design Space Constraint</h3>
              <p className="text-gray-400 mb-4">
                Over the last decade, many efforts improved smart contract platforms: SVM, MoveVM, Polkadot, 
                eWASM. These provided cleaner programming models or different languages, but <strong className="text-white">all 
                maintained the same fundamental design constraint</strong>: deterministic, replicated execution across 
                all nodes. This is excellent for security and verifiability, but limits the complexity of programs 
                that can run economically on-chain.
              </p>
              <p className="text-gray-400">
                Theseus takes a different approach. By using tensor commitments for verifiable inference, one node 
                performs heavy computation while others verify it. This makes complex, intelligent applications 
                economically feasible on-chain while preserving verifiability.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-4 text-gray-300">What Ethereum Enables</h3>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li>• <strong className="text-white">Simple DeFi:</strong> AMMs, lending pools with fixed formulas</li>
                  <li>• <strong className="text-white">Basic DAOs:</strong> Token voting on predefined options</li>
                  <li>• <strong className="text-white">Objective oracles:</strong> &quot;Did event X happen?&quot;</li>
                  <li>• <strong className="text-white">Deterministic logic:</strong> Same input → same output, always</li>
                </ul>
              </div>

              <div className="bg-gray-900 border border-green-900 rounded p-6">
                <h3 className="text-lg font-medium mb-4 text-green-400">What Theseus Enables</h3>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li>• <strong className="text-white">Subjective adjudication:</strong> &quot;Was product launch successful?&quot;</li>
                  <li>• <strong className="text-white">Complex governance:</strong> Agents evaluate proposals with nuanced reasoning</li>
                  <li>• <strong className="text-white">AI Persons:</strong> Fully autonomous economic participants with their own goals</li>
                  <li>• <strong className="text-white">Natural language deployment:</strong> Create agents via prompts, not code</li>
                  <li>• <strong className="text-white">Dynamic strategies:</strong> Agents that adapt and learn from context</li>
                </ul>
              </div>
            </div>

<div className="bg-blue-950 border border-blue-900 rounded p-6 mb-6">
              <h3 className="text-lg font-medium mb-3 text-blue-400">The Evolution: Each Step Removes Human Dependency</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400 font-bold text-xl">₿</span>
                  <div>
                    <h4 className="text-white font-medium">Bitcoin (2009)</h4>
                    <p className="text-gray-400 text-sm">
                      Public ownership you can verify. Removed treasurers from &quot;who owns what.&quot;
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 font-bold text-xl">Ξ</span>
                  <div>
                    <h4 className="text-white font-medium">Ethereum (2014)</h4>
                    <p className="text-gray-400 text-sm">
                      Public program behavior you can verify. Removed judges from &quot;what happens next.&quot;
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-bold text-xl">Θ</span>
                  <div>
                    <h4 className="text-white font-medium">Theseus (2025)</h4>
                    <p className="text-gray-400 text-sm">
                      Public agent decisions you can verify. Removes hosts and operators from &quot;what kind 
                      of decision will an intelligent entity make?&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-950 border border-green-900 rounded p-6">
              <h3 className="text-lg font-medium mb-3 text-green-400">Why This Is a Multi-Trillion Dollar Market</h3>
              <p className="text-gray-300 mb-4">
                If Ethereum&apos;s ~$500B market cap is tied to the value of its apps, then making those apps 
                dramatically more capable should substantially increase value captured by the base chain. 
                When applications become more powerful and cheaper to operate, more activity can live on-chain.
              </p>
              <p className="text-gray-300 mb-4">
                Before Bitcoin, there was Hashcash. It implemented proof-of-work but holds almost no value 
                compared to Bitcoin. By the same logic, the separate market caps of &quot;Ethereum&quot; and &quot;agents&quot; 
                already exist—unifying them with tensor commitments suggests one of the largest TAMs in crypto, 
                where <strong className="text-white">the whole is worth far more than the sum of the parts</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/docs/design-space"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition-colors text-center"
                >
                  Explore the Full Design Space →
                </Link>
                <a 
                  href="https://theseuschain.substack.com/p/agents-as-an-evolution-of-smart-contracts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-transparent border border-green-600 text-green-400 hover:bg-green-600 hover:text-white px-6 py-2 rounded transition-colors text-center"
                >
                  Read Full Article
                </a>
              </div>
            </div>
          </section>

          <div className="border-t border-gray-800 pt-8 grid sm:grid-cols-2 gap-4">
            <Link 
              href="/docs/introduction"
              className="block p-4 border border-gray-800 hover:border-gray-600 transition-colors"
            >
              <h3 className="font-medium mb-2">← Back to Introduction</h3>
              <p className="text-sm text-gray-400">Learn about Theseus vision and principles</p>
            </Link>
            <Link 
              href="/docs/aivm"
              className="block p-4 border border-gray-800 hover:border-gray-600 transition-colors"
            >
              <h3 className="font-medium mb-2">AIVM Deep Dive →</h3>
              <p className="text-sm text-gray-400">Explore the AI Virtual Machine</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

