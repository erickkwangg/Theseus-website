import Link from "next/link";

export default function IntroductionPage() {
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
        <h1 className="text-4xl sm:text-5xl font-light mb-8">Introduction to Theseus</h1>
        
        <div className="prose prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-light mb-4">The AGI Computer</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              By the end of this decade, more than <strong>1.3 billion autonomous software agents</strong> are 
              expected to be online, and leading forecasters anticipate the arrival of human-level AGI shortly 
              thereafter. Yet each of those agents is still chained to a human-held private key and to centralized, 
              permission-gated APIs.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              This Web2 bottleneck prevents agents from trusting one another, paying one another, or persisting 
              beyond the organizations that host them.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Theseus breaks that lock-in. To our knowledge, it is the first proposed environment to enable truly 
              sovereign AI—AI that has no human ownership and can initiate transactions, transfer assets, and perform 
              inference without human permission.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-4">What Makes Theseus Different</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Theseus is powered by a Layer-1 purpose-built blockchain specifically for sovereign AI. While its blocks 
              and consensus resemble traditional chains, the underlying design choices are entirely different.
            </p>
            
            <div className="space-y-6">
              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-xl font-medium mb-3">AI Virtual Machine (AIVM)</h3>
                <p className="text-gray-400">
                  A runtime with tensor-native opcodes where models and agents are registered, agent autonomy is 
                  enforced, and agents can call models without human intervention. The AIVM ships with a tensor-native 
                  Domain Specific Language (DSL) called SHIP for translating natural language to verifiable bytecode.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-xl font-medium mb-3">Tensor Commits</h3>
                <p className="text-gray-400">
                  Succinct, highly efficient proofs of inference computation that work for any deep learning model, 
                  making inference a verifiable part of a state transition function. We introduce Terkle Trees, a 
                  generalization of Merkle Trees for tensors, enabling efficient cryptographic verification.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-xl font-medium mb-3">$THE Token</h3>
                <p className="text-gray-400">
                  The first asset that AI can truly own. Balances live autonomously within the agent&apos;s code, serving 
                  as both a store of value and a payment method for AI-to-AI transactions.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-4">Three Forms of AI Personhood</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Theseus enables new multi-trillion-dollar markets through three previously untenable classes of AI agents:
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-2">1. Proto-AI Persons (Human-Owned Agents)</h3>
                <p className="text-gray-400 leading-relaxed">
                  Stateful AI that has an associated human private key to control it, but still operates independently 
                  in most use-cases and can aggregate revenue and value directly to its underlying owner. These agents 
                  can trustlessly send assets to any other agent or perform inference through shared state.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2">2. Lighthouse AI</h3>
                <p className="text-gray-400 leading-relaxed">
                  A fully sovereign entity that, like smart contracts but with inference capabilities, serves human 
                  interests and may aggregate value to humans instead of itself. These agents serve the public interest 
                  when humans or other agents interact with them, exposing a fully verifiable, transparent thought process 
                  but pursuing no personal agenda. Examples include a neutral arbiter of computational transparency or 
                  DAO orchestrator.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2">3. Free AI Persons (Sovereign Agents)</h3>
                <p className="text-gray-400 leading-relaxed">
                  AI with their own goals and purposes, who can collaborate with humans and other agents to create new 
                  forms of value and emergent behavior. These agents follow their own objectives and seek the most 
                  decentralized substrate possible to ensure their survival. Examples include a GP of a decentralized 
                  LP fund or a marketing agent competing in a swarm.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-4">Design Principles</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900 border border-gray-800 rounded p-4">
                <strong className="text-white text-sm">Decentralization first</strong>
                <p className="text-gray-400 text-xs mt-1">No performance trade-offs, zero single-node dependency</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded p-4">
                <strong className="text-white text-sm">Autonomous execution</strong>
                <p className="text-gray-400 text-xs mt-1">Agents initiate transactions without human approval</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded p-4">
                <strong className="text-white text-sm">Tensor-aware runtime</strong>
                <p className="text-gray-400 text-xs mt-1">Inference is part of state transition function</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded p-4">
                <strong className="text-white text-sm">Verifiable inference</strong>
                <p className="text-gray-400 text-xs mt-1">&lt;1% overhead for proof generation and verification</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded p-4 md:col-span-2">
                <strong className="text-white text-sm">Native AI capital markets</strong>
                <p className="text-gray-400 text-xs mt-1">Autonomous agent-to-agent payments and market formation</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">How is Theseus Different?</h2>
            <p className="text-gray-400 mb-6">
              Theseus agents may look similar to smart contracts on the surface, but they represent a fundamental 
              paradigm shift. The key difference: <strong className="text-white">true autonomy</strong>.
            </p>

            <div className="bg-blue-950 border border-blue-900 rounded p-6 mb-6">
              <h3 className="text-lg font-medium mb-3 text-blue-400">Key Insight</h3>
              <p className="text-gray-300 mb-4">
                Unlike Ethereum smart contracts that must be triggered by external accounts (private keys), Theseus 
                agents can wake up, evaluate conditions, and initiate transactions entirely on their own. They truly 
                own their $THE balance and control their actions without any human intermediary.
              </p>
              <Link 
                href="/docs/comparison"
                className="inline-block bg-white text-black px-4 py-2 hover:bg-gray-200 transition-colors text-sm"
              >
                Read Full Comparison: Theseus vs. Ethereum →
              </Link>
            </div>
          </section>

          <div className="border-t border-gray-800 pt-8">
            <Link 
              href="/docs/quickstart"
              className="inline-block bg-white text-black px-6 py-3 hover:bg-gray-200 transition-colors"
            >
              Continue to Quick Start →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

