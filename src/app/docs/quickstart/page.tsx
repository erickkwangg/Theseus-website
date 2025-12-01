import Link from "next/link";

export default function QuickStartPage() {
  return (
    <div>
      <h1 className="text-4xl sm:text-5xl font-light mb-8">Quick Start Guide</h1>
      
      <div className="prose prose-invert max-w-none">
          <section className="mb-12">
          <h2 id="prerequisites" className="text-3xl font-light mb-6">Prerequisites</h2>
          <div className="bg-gray-900 border border-gray-800 rounded p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div><span className="text-white font-medium">Rust 1.70+</span></div>
              <div><span className="text-white font-medium">Go 1.21+</span></div>
              <div><span className="text-white font-medium">Docker</span></div>
              <div><span className="text-white font-medium">16GB+ RAM</span></div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 id="installation" className="text-3xl font-light mb-6">Installation</h2>
          
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
          <h2 id="deploy-agent" className="text-3xl font-light mb-6">Deploy Your First Agent</h2>
          
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

          <div className="bg-gray-900 border border-gray-800 rounded p-4 mb-6">
            <div className="text-xs text-gray-500 mb-2">Registration fields</div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-400">
              <div><span className="text-white">Code hash</span> — binary verification</div>
              <div><span className="text-white">Autonomy flag</span> — 0=human, 1=sovereign</div>
              <div><span className="text-white">Controller key</span> — optional override</div>
              <div><span className="text-white">AIVM version</span> — required features</div>
              <div><span className="text-white">Resource quota</span> — max FLOPs/epoch</div>
              <div><span className="text-white">Stake</span> — $THE locked</div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 id="register-model" className="text-3xl font-light mb-6">Register a Model</h2>
          
          <p className="text-gray-400 mb-6">
            Models are registered separately from agents and can be invoked by any agent that pays the inference fee.
          </p>

          <div className="bg-gray-900 border border-gray-800 rounded p-4 mb-6">
            <div className="text-xs text-gray-500 mb-2">Model fields</div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-400">
              <div><span className="text-white">Name/version</span> — e.g. Llama 3.1 8B</div>
              <div><span className="text-white">Architecture</span> — LLM, diffusion, etc.</div>
              <div><span className="text-white">Tensor Commit</span> — weight fingerprint</div>
              <div><span className="text-white">Param count</span> — for fee estimation</div>
              <div><span className="text-white">Base fee</span> — $THE per inference</div>
              <div><span className="text-white">Weights URI</span> — download location</div>
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
          <h2 id="workflow" className="text-3xl font-light mb-6">Development Workflow</h2>
          <div className="bg-gray-900 border border-gray-800 rounded p-6 text-sm text-gray-400">
            Write agent logic (SHIP/AIVM) → Test locally → Deploy to testnet → Audit with Tensor Commits → Launch on mainnet
          </div>
        </section>

        <section className="mb-12">
          <h2 id="tests" className="text-3xl font-light mb-6">Running Tests</h2>
          <div className="bg-black border border-gray-700 rounded p-4 font-mono text-sm text-gray-300 mb-4 overflow-x-auto">
            <div># Run full test suite</div>
            <div>make test</div>
            <div className="mt-3"># Run specific tests</div>
            <div>cargo test --package aivm</div>
            <div>cargo test --package tensor-commits</div>
          </div>
        </section>

        <section className="mb-12">
          <h2 id="next-steps" className="text-3xl font-light mb-6">Next Steps</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link 
              href="/docs/agents"
              className="block p-4 border border-gray-800 hover:border-gray-600 transition-colors"
            >
              <h3 className="font-medium mb-2">Build Agents →</h3>
              <p className="text-sm text-gray-400">Learn how to create sophisticated autonomous agents</p>
            </Link>
            <Link 
              href="/docs/ship"
              className="block p-4 border border-gray-800 hover:border-gray-600 transition-colors"
            >
              <h3 className="font-medium mb-2">SHIP Language →</h3>
              <p className="text-sm text-gray-400">Master the Domain Specific Language for AI</p>
            </Link>
            <Link 
              href="/docs/aivm"
              className="block p-4 border border-gray-800 hover:border-gray-600 transition-colors"
            >
              <h3 className="font-medium mb-2">AIVM Deep Dive →</h3>
              <p className="text-sm text-gray-400">Understand the AI Virtual Machine internals</p>
            </Link>
            <Link 
              href="/docs/tensor-commits"
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
  );
}
