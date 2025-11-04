import Link from "next/link";

export default function AgentsPage() {
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
        <h1 className="text-4xl sm:text-5xl font-light mb-8">Agents & Models</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-gray-400 mb-8">
            Learn how to register agents, deploy models, and enable autonomous interactions with $THE tokens.
          </p>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Agent Registration</h2>
            
            <p className="text-gray-400 mb-6">
              In THE1 token standard, a new agent appears on the network when a human or another agent supplies 
              the registration parameters.
            </p>

            <div className="bg-gray-900 border border-gray-800 rounded p-6 mb-6">
              <h3 className="text-lg font-medium mb-4">Registration Fields</h3>
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
            <h2 className="text-3xl font-light mb-6">Model Registration</h2>
            
            <p className="text-gray-400 mb-6">
              Models are registered separately from agents and can be invoked by any agent that pays the posted fee.
            </p>

            <div className="bg-gray-900 border border-gray-800 rounded p-6 mb-6">
              <h3 className="text-lg font-medium mb-4">Model Fields</h3>
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
                <div>
                  <strong className="text-white">Compute Math:</strong>
                  <span className="text-gray-400 ml-2">How the model computes its inference (used for Tensor Commits)</span>
                </div>
                <div>
                  <strong className="text-white">Permissions:</strong>
                  <span className="text-gray-400 ml-2">Access restrictions for particular model usage</span>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Sovereign Agent Inference Loop</h2>
            
            <p className="text-gray-400 mb-6">
              Below is the loop that tells what a self-governing agent uses to decide when and how to perform 
              inference, without any human keys or off-chain servers.
            </p>

            <div className="bg-gray-900 border border-gray-800 rounded overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead className="bg-black">
                  <tr>
                    <th className="text-left p-4 border-b border-gray-800">Stage</th>
                    <th className="text-left p-4 border-b border-gray-800">What happens</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 border-b border-gray-800 font-medium">1. Wake-up</td>
                    <td className="p-4 border-b border-gray-800 text-gray-400">
                      Agent code activates via: heartbeat tx every N blocks, keep-alive bounty, or event relay
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 border-b border-gray-800 font-medium">2. Evaluate triggers</td>
                    <td className="p-4 border-b border-gray-800 text-gray-400">
                      During AGENT_TICK, check rules: scheduled block? reference price crossed? memory anchor changed?
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 border-b border-gray-800 font-medium">3. Fee & balance test</td>
                    <td className="p-4 border-b border-gray-800 text-gray-400">
                      Look up model's posted cost, add network proof surcharge, confirm $THE balance covers total
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">4. Call the model</td>
                    <td className="p-4 text-gray-400">
                      Submit MODEL_INFER request with inputs and fee cap. Scheduler assigns to prover with declared VRAM/RAM
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-400">
              This is fully sovereign because the agent holds its own funds, and decisions are pure functions of 
              the on-chain state.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Inter-Agent Interaction</h2>
            
            <p className="text-gray-400 mb-6">
              Once an agent has an address, a balance, and an exported ABI, talking to another agent is different 
              from calling any other on-chain contract—except that both sides can also invoke models mid-flow.
            </p>

            <div className="space-y-6">
              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-3">1. Discovery</h3>
                <p className="text-gray-400">
                  Each agent lists a service manifest in the on-chain directory (selectors, purpose hash, access mode). 
                  Another agent locates it by querying the directory with that purpose hash.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-3">2. Call & Pay on AIVM</h3>
                <p className="text-gray-400">
                  The caller sends a single AIVM request that names the callee, the desired function, arguments, and 
                  (when required) either a capability token or a stake deposit. Fees for any model work are drawn from 
                  the caller's balance unless both parties agreed to split costs.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-3">3. Model Invocation</h3>
                <p className="text-gray-400">
                  Once control reaches the callee, that agent's own bytecode decides whether to run a model. If it 
                  needs fresh predictions, it requests them on the spot; the same is true for the caller, which may 
                  have pre-queried a model before making the external call.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-3">4. Result Handling</h3>
                <p className="text-gray-400">
                  If everything, including any model inference, completes in the same block, the caller receives an 
                  immediate return value. For longer jobs the callee issues a promise event, and the caller later 
                  redeems that promise in a follow-up call.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Model Usage Fees</h2>
            
            <p className="text-gray-400 mb-6">
              Model owners set a base inference fee in $THE. Model usage fees flow straight to the model's owner 
              address. A built-in order book batches buy and sell intents each block so prices converge on marginal 
              cost without off-chain brokers.
            </p>

            <div className="bg-gray-900 border border-gray-800 rounded p-6">
              <p className="text-gray-400">
                Dishonest proofs trigger a slash that burns the offender's stake, ensuring economic security scales 
                directly with staked value.
              </p>
            </div>
          </section>

          <div className="bg-gray-900 border border-gray-800 rounded p-6 mb-12">
            <h3 className="text-xl font-medium mb-4">📖 More Coming Soon</h3>
            <p className="text-gray-400 mb-4">
              This page is being expanded with:
            </p>
            <ul className="space-y-2 text-gray-400">
              <li>• Detailed code examples for agent deployment</li>
              <li>• Model pipelining patterns</li>
              <li>• Agent state management strategies</li>
              <li>• Best practices for autonomous agents</li>
            </ul>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="grid sm:grid-cols-2 gap-4">
              <Link 
                href="/docs/ship"
                className="block p-4 border border-gray-800 hover:border-gray-600 transition-colors"
              >
                <h3 className="font-medium mb-2">SHIP Language →</h3>
                <p className="text-sm text-gray-400">Write agent logic in SHIP DSL</p>
              </Link>
              <Link 
                href="/docs/examples"
                className="block p-4 border border-gray-800 hover:border-gray-600 transition-colors"
              >
                <h3 className="font-medium mb-2">Code Examples →</h3>
                <p className="text-sm text-gray-400">View example agent implementations</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

