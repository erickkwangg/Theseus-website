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
            <h2 className="text-3xl font-light mb-4">Key Design Principles</h2>
            <div className="space-y-4 text-gray-400">
              <div>
                <strong className="text-white">Decentralization first.</strong> Sovereign AI should never trade 
                decentralization for performance. Once deployed, an agent&apos;s logic and state must remain reachable 
                without reliance on any single node.
              </div>
              <div>
                <strong className="text-white">Autonomous value execution.</strong> AI must be able to initiate and 
                execute transactions on its own, without a human &quot;approving&quot; the transfer.
              </div>
              <div>
                <strong className="text-white">Tensor-aware runtime.</strong> Inference that isn&apos;t included in the 
                blockchain&apos;s state-transition function leaves a system dependent on third-party services.
              </div>
              <div>
                <strong className="text-white">Low-overhead, verifiable inference.</strong> Auditing a deep-learning 
                model should add less than 1% overhead in storage and verification time.
              </div>
              <div>
                <strong className="text-white">Native support for AI capital markets.</strong> AIs must be able to pay 
                one another autonomously and form capital markets on their own.
              </div>
            </div>
          </section>

          <div className="border-t border-gray-800 pt-8">
            <Link 
              href="/quickstart"
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

