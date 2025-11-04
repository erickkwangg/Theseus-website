import Link from "next/link";

export default function QuickStartPage() {
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
        <h1 className="text-4xl sm:text-5xl font-light mb-8">Quick Start Guide</h1>
        
        <div className="prose prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Prerequisites</h2>
            <div className="bg-gray-900 border border-gray-800 rounded p-6">
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start">
                  <span className="text-white mr-3">•</span>
                  <span><strong className="text-white">Rust 1.70+</strong> - For core blockchain implementation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3">•</span>
                  <span><strong className="text-white">Go 1.21+</strong> - For additional tooling</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3">•</span>
                  <span><strong className="text-white">Docker</strong> - For containerized development</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3">•</span>
                  <span><strong className="text-white">16GB+ RAM</strong> - For model inference</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Installation</h2>
            
            <h3 className="text-xl font-medium mb-4">1. Clone the Repository</h3>
            <div className="bg-black border border-gray-700 rounded p-4 font-mono text-sm text-gray-300 mb-6 overflow-x-auto">
              <div># Clone from GitHub</div>
              <div>git clone https://github.com/ob-theseus/theseuschain.git</div>
              <div>cd theseuschain</div>
            </div>

            <h3 className="text-xl font-medium mb-4">2. Build Dependencies</h3>
            <div className="bg-black border border-gray-700 rounded p-4 font-mono text-sm text-gray-300 mb-6 overflow-x-auto">
              <div># Install development dependencies</div>
              <div>make install-dev</div>
              <div className="mt-3"># Build in release mode</div>
              <div>cargo build --release</div>
            </div>

            <h3 className="text-xl font-medium mb-4">3. Run a Local Node</h3>
            <div className="bg-black border border-gray-700 rounded p-4 font-mono text-sm text-gray-300 mb-6 overflow-x-auto">
              <div># Start the Theseus node</div>
              <div>cargo run --bin theseus-node</div>
            </div>

            <p className="text-gray-400 mb-6">
              Your node will start syncing with the network. The first sync may take some time depending on network 
              conditions and chain history.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Deploy Your First Agent</h2>
            
            <p className="text-gray-400 mb-6">
              Once your node is running, you can deploy a test agent using the Theseus CLI and SHIP language.
            </p>

            <h3 className="text-xl font-medium mb-4">Example: Basic Agent</h3>
            <div className="bg-black border border-gray-700 rounded p-4 font-mono text-sm text-gray-300 mb-4 overflow-x-auto">
              <div># Deploy from example</div>
              <div>cargo run --bin theseus-cli deploy-agent examples/basic-agent.ship</div>
            </div>

            <p className="text-gray-400 mb-6">
              This deploys a simple autonomous agent that can hold $THE tokens and interact with other agents on the network.
            </p>

            <h3 className="text-xl font-medium mb-4">Agent Registration Fields</h3>
            <div className="bg-gray-900 border border-gray-800 rounded p-6">
              <div className="space-y-3 text-sm">
                <div>
                  <strong className="text-white">Code hash:</strong>
                  <span className="text-gray-400 ml-2">Verifies the binary that will run on AIVM/HVM</span>
                </div>
                <div>
                  <strong className="text-white">Autonomy flag:</strong>
                  <span className="text-gray-400 ml-2">0 = human-gated, 1 = sovereign</span>
                </div>
                <div>
                  <strong className="text-white">Controller key:</strong>
                  <span className="text-gray-400 ml-2">Optional public key for human overrides</span>
                </div>
                <div>
                  <strong className="text-white">Min AIVM version:</strong>
                  <span className="text-gray-400 ml-2">Signals which ISA features the agent requires</span>
                </div>
                <div>
                  <strong className="text-white">Resource quota:</strong>
                  <span className="text-gray-400 ml-2">Max FLOPs it may consume per epoch</span>
                </div>
                <div>
                  <strong className="text-white">Stake:</strong>
                  <span className="text-gray-400 ml-2">$THE locked for potential slashing</span>
                </div>
                <div>
                  <strong className="text-white">Initial Context:</strong>
                  <span className="text-gray-400 ml-2">Context that empowers the agent, linked to TheseusStore</span>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Register a Model</h2>
            
            <p className="text-gray-400 mb-6">
              Models are registered separately from agents and can be invoked by any agent that pays the inference fee.
            </p>

            <div className="bg-gray-900 border border-gray-800 rounded p-6 mb-6">
              <h3 className="text-lg font-medium mb-4">Model Registration Fields</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <strong className="text-white">Name & version:</strong>
                  <span className="text-gray-400 ml-2">e.g., Llama 3.1 8B</span>
                </div>
                <div>
                  <strong className="text-white">Architecture tag:</strong>
                  <span className="text-gray-400 ml-2">LLM, diffusion, GAN, etc.</span>
                </div>
                <div>
                  <strong className="text-white">Tensor Commit:</strong>
                  <span className="text-gray-400 ml-2">Cryptographic fingerprint of the weights</span>
                </div>
                <div>
                  <strong className="text-white">Param count:</strong>
                  <span className="text-gray-400 ml-2">Used for fee estimation</span>
                </div>
                <div>
                  <strong className="text-white">Base fee:</strong>
                  <span className="text-gray-400 ml-2">$THE per inference</span>
                </div>
                <div>
                  <strong className="text-white">Owner:</strong>
                  <span className="text-gray-400 ml-2">Address or DAO receiving revenue</span>
                </div>
                <div>
                  <strong className="text-white">Weights URI:</strong>
                  <span className="text-gray-400 ml-2">Where validators can fetch parameters</span>
                </div>
              </div>
            </div>

            <div className="bg-black border border-gray-700 rounded p-4 font-mono text-sm text-gray-300 overflow-x-auto">
              <div># Register a model</div>
              <div>theseus-cli register-model \</div>
              <div>  --name &quot;Llama-3.1-8B&quot; \</div>
              <div>  --weights ./models/llama-8b.safetensors \</div>
              <div>  --base-fee 100</div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Development Workflow</h2>
            
            <div className="space-y-4 text-gray-400">
              <div className="flex items-start">
                <span className="text-white font-mono mr-3">1.</span>
                <div>
                  <strong className="text-white">Write agent logic</strong> in SHIP (Domain Specific Language) or directly in AIVM opcodes
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-white font-mono mr-3">2.</span>
                <div>
                  <strong className="text-white">Test locally</strong> using the development node
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-white font-mono mr-3">3.</span>
                <div>
                  <strong className="text-white">Deploy to testnet</strong> for multi-agent interaction testing
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-white font-mono mr-3">4.</span>
                <div>
                  <strong className="text-white">Audit and verify</strong> using Tensor Commit proofs
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-white font-mono mr-3">5.</span>
                <div>
                  <strong className="text-white">Launch on mainnet</strong> with appropriate stake
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Running Tests</h2>
            <div className="bg-black border border-gray-700 rounded p-4 font-mono text-sm text-gray-300 mb-4 overflow-x-auto">
              <div># Run full test suite</div>
              <div>make test</div>
              <div className="mt-3"># Run specific tests</div>
              <div>cargo test --package aivm</div>
              <div>cargo test --package tensor-commits</div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Next Steps</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link 
                href="/agents"
                className="block p-4 border border-gray-800 hover:border-gray-600 transition-colors"
              >
                <h3 className="font-medium mb-2">Build Agents →</h3>
                <p className="text-sm text-gray-400">Learn how to create sophisticated autonomous agents</p>
              </Link>
              <Link 
                href="/ship"
                className="block p-4 border border-gray-800 hover:border-gray-600 transition-colors"
              >
                <h3 className="font-medium mb-2">SHIP Language →</h3>
                <p className="text-sm text-gray-400">Master the Domain Specific Language for AI</p>
              </Link>
              <Link 
                href="/aivm"
                className="block p-4 border border-gray-800 hover:border-gray-600 transition-colors"
              >
                <h3 className="font-medium mb-2">AIVM Deep Dive →</h3>
                <p className="text-sm text-gray-400">Understand the AI Virtual Machine internals</p>
              </Link>
              <Link 
                href="/tensor-commits"
                className="block p-4 border border-gray-800 hover:border-gray-600 transition-colors"
              >
                <h3 className="font-medium mb-2">Tensor Commits →</h3>
                <p className="text-sm text-gray-400">Learn about verifiable ML inference</p>
              </Link>
            </div>
          </section>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400">
              Need help? Visit our{" "}
              <a 
                href="https://github.com/ob-theseus/theseuschain" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-white transition-colors"
              >
                GitHub
              </a>{" "}
              or read the{" "}
              <a 
                href="https://docsend.com/view/qtgq5w6ehdy5dkyd" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-white transition-colors"
              >
                full whitepaper
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

