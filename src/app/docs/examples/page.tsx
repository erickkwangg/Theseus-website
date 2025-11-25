import Link from "next/link";

export default function ExamplesPage() {
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
        <h1 className="text-4xl sm:text-5xl font-light mb-8">Code Examples</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-gray-400 mb-8">
            Explore example implementations and patterns for building on Theseus.
          </p>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Example Repository</h2>
            
            <p className="text-gray-400 mb-6">
              Check out the example implementations in the{" "}
              <a 
                href="https://github.com/ob-theseus/theseuschain/tree/main/examples" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-white transition-colors"
              >
                examples directory
              </a>{" "}
              of the Theseus GitHub repository.
            </p>

            <div className="bg-gray-900 border border-gray-800 rounded p-6">
              <h3 className="text-lg font-medium mb-4">Available Examples</h3>
              <ul className="space-y-3 text-gray-400">
                <li>• <strong className="text-white">basic-agent.ship</strong> - Simple autonomous agent template</li>
                <li>• <strong className="text-white">Model deployment</strong> - Deploying and registering ML models</li>
                <li>• <strong className="text-white">Agent interactions</strong> - Inter-agent communication patterns</li>
                <li>• <strong className="text-white">Token transfers</strong> - Autonomous $THE transactions</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Common Patterns</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-3">Proto-AI Person (Human-Owned Agent)</h3>
                <p className="text-gray-400 mb-4">
                  An agent with a controller key that can aggregate revenue but operates independently:
                </p>
                <div className="bg-black border border-gray-700 rounded p-4 font-mono text-sm text-gray-300 overflow-x-auto">
                  <div>autonomy_flag = 0  // human-gated</div>
                  <div>controller_key = 0x1234...  // owner&apos;s public key</div>
                  <div>resource_quota = 1000000  // max FLOPs per epoch</div>
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-3">Free AI Person (Sovereign Agent)</h3>
                <p className="text-gray-400 mb-4">
                  A fully autonomous agent with its own goals and no human control:
                </p>
                <div className="bg-black border border-gray-700 rounded p-4 font-mono text-sm text-gray-300 overflow-x-auto">
                  <div>autonomy_flag = 1  // fully sovereign</div>
                  <div>controller_key = None  // no human override</div>
                  <div>stake = 10000 THE  // locked for slashing</div>
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-3">Lighthouse AI</h3>
                <p className="text-gray-400 mb-4">
                  A public-serving agent with verifiable, transparent operations:
                </p>
                <div className="bg-black border border-gray-700 rounded p-4 font-mono text-sm text-gray-300 overflow-x-auto">
                  <div>autonomy_flag = 1  // sovereign</div>
                  <div>permissions = &#123; public_access: true &#125;</div>
                  <div>revenue_destination = dao_address  // serves humans</div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Model Invocation Patterns</h2>
            
            <div className="bg-gray-900 border border-gray-800 rounded p-6 mb-6">
              <h3 className="text-lg font-medium mb-4">Simple Inference</h3>
              <div className="bg-black border border-gray-700 rounded p-4 font-mono text-sm text-gray-300 overflow-x-auto">
                <div>MODEL_INFER(model_addr, tensor_input, fee_limit)</div>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded p-6">
              <h3 className="text-lg font-medium mb-4">Model Pipelining (MoE/RAG)</h3>
              <div className="bg-black border border-gray-700 rounded p-4 font-mono text-sm text-gray-300 overflow-x-auto">
                <div>TLOAD(encoder) -&gt; TMATMUL -&gt; TCUSTOM -&gt;</div>
                <div>TLOAD(decoder) -&gt; TMATMUL -&gt; TCOMMIT</div>
              </div>
            </div>
          </section>

          <div className="bg-gray-900 border border-gray-800 rounded p-6 mb-12">
            <h3 className="text-xl font-medium mb-4">🚀 Start Building</h3>
            <p className="text-gray-400 mb-4">
              Clone the repository and explore the examples:
            </p>
            <div className="bg-black border border-gray-700 rounded p-4 font-mono text-sm text-gray-300 overflow-x-auto">
              <div>git clone https://github.com/ob-theseus/theseuschain.git</div>
              <div>cd theseuschain/examples</div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="grid sm:grid-cols-2 gap-4">
              <Link 
                href="/docs/quickstart"
                className="block p-4 border border-gray-800 hover:border-gray-600 transition-colors"
              >
                <h3 className="font-medium mb-2">← Quick Start</h3>
                <p className="text-sm text-gray-400">Get started with Theseus</p>
              </Link>
              <Link 
                href="/docs/agents"
                className="block p-4 border border-gray-800 hover:border-gray-600 transition-colors"
              >
                <h3 className="font-medium mb-2">Agents & Models →</h3>
                <p className="text-sm text-gray-400">Learn about agent development</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

