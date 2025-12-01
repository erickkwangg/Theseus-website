"use client";

import Link from "next/link";
import CodeBlock from "@/components/docs/CodeBlock";

export default function ExamplesPage() {
  return (
    <div>
      <h1 className="text-4xl sm:text-5xl font-light mb-8">Code Examples</h1>
        
      <div className="prose prose-invert max-w-none">
        <p className="text-xl text-gray-400 mb-8">
          Explore example implementations and patterns for building on Theseus.
        </p>

        <section className="mb-12">
          <h2 id="repository" className="text-3xl font-light mb-6">Example Repository</h2>
          
          <div className="bg-blue-950 border border-blue-900 rounded p-6 mb-6">
            <p className="text-gray-300 mb-4">
              Full examples with documentation available on GitHub:
            </p>
            <a 
              href="https://github.com/ob-theseus/theseuschain/tree/main/examples" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors"
            >
              View Examples on GitHub →
            </a>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-black">
                <tr>
                  <th className="text-left p-3 border-b border-gray-800">Example</th>
                  <th className="text-left p-3 border-b border-gray-800">Description</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr>
                  <td className="p-3 border-b border-gray-800 text-white font-mono">basic-agent.ship</td>
                  <td className="p-3 border-b border-gray-800">Simple autonomous agent template</td>
                </tr>
                <tr>
                  <td className="p-3 border-b border-gray-800 text-white font-mono">model-deploy/</td>
                  <td className="p-3 border-b border-gray-800">Deploying and registering ML models</td>
                </tr>
                <tr>
                  <td className="p-3 border-b border-gray-800 text-white font-mono">agent-interact/</td>
                  <td className="p-3 border-b border-gray-800">Inter-agent communication patterns</td>
                </tr>
                <tr>
                  <td className="p-3 text-white font-mono">token-transfer/</td>
                  <td className="p-3">Autonomous $THE transactions</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 id="patterns" className="text-3xl font-light mb-6">Agent Registration Patterns</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium mb-3">Proto-AI Person (Human-Owned)</h3>
              <p className="text-gray-400 mb-4 text-sm">
                Agent with controller key—operates independently but can be overridden:
              </p>
              <CodeBlock 
                language="ship"
                code={`autonomy_flag = 0  // human-gated
controller_key = 0x1234...  // owner's public key
resource_quota = 1000000  // max FLOPs per epoch`}
              />
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3">Free AI Person (Sovereign)</h3>
              <p className="text-gray-400 mb-4 text-sm">
                Fully autonomous agent with no human control:
              </p>
              <CodeBlock 
                language="ship"
                code={`autonomy_flag = 1  // fully sovereign
controller_key = None  // no human override
stake = 10000 THE  // locked for slashing`}
              />
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3">Lighthouse AI (Public Service)</h3>
              <p className="text-gray-400 mb-4 text-sm">
                Transparent agent that serves public interests:
              </p>
              <CodeBlock 
                language="ship"
                code={`autonomy_flag = 1  // sovereign
permissions = { public_access: true }
revenue_destination = dao_address  // serves humans`}
              />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 id="inference" className="text-3xl font-light mb-6">Model Inference</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium mb-3">Simple Inference Call</h3>
              <CodeBlock 
                language="aivm"
                code={`MODEL_INFER(model_addr, tensor_input, fee_limit)`}
              />
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3">Model Pipelining (MoE/RAG)</h3>
              <p className="text-gray-400 mb-4 text-sm">
                Chain multiple models in a single transaction:
              </p>
              <CodeBlock 
                language="aivm"
                code={`TLOAD(encoder) -> TMATMUL -> TCUSTOM ->
TLOAD(decoder) -> TMATMUL -> TCOMMIT`}
              />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 id="quickstart" className="text-3xl font-light mb-6">Quick Start</h2>
          
          <p className="text-gray-400 mb-4 text-sm">
            Clone and explore:
          </p>
          <CodeBlock 
            language="bash"
            code={`git clone https://github.com/ob-theseus/theseuschain.git
cd theseuschain/examples
cargo run --bin theseus-cli deploy-agent basic-agent.ship`}
          />
        </section>

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
              <h3 className="font-medium mb-2">Agents &amp; Models →</h3>
              <p className="text-sm text-gray-400">Learn about agent development</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
