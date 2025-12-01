import Link from "next/link";

export default function AgentsPage() {
  return (
    <div>
      <h1 className="text-4xl sm:text-5xl font-light mb-8">Agents &amp; Models</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-gray-400 mb-8">
            Learn how to register agents, deploy models, and enable autonomous interactions with $THE tokens.
          </p>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Agent Registration</h2>
            
            <p className="text-gray-400 mb-6">
              Agents register via THE1 standard. Any human or agent can deploy a new agent by supplying:
            </p>

            <div className="bg-gray-900 border border-gray-800 rounded overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead className="bg-black">
                  <tr>
                    <th className="text-left p-3 border-b border-gray-800">Field</th>
                    <th className="text-left p-3 border-b border-gray-800">Purpose</th>
                  </tr>
                </thead>
                <tbody className="text-gray-400">
                  <tr>
                    <td className="p-3 border-b border-gray-800 text-white">Code hash</td>
                    <td className="p-3 border-b border-gray-800">Binary verification for AIVM/HVM</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-800 text-white">Autonomy flag</td>
                    <td className="p-3 border-b border-gray-800">0 = human-gated, 1 = sovereign</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-800 text-white">Controller key</td>
                    <td className="p-3 border-b border-gray-800">Optional pubkey for human override</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-800 text-white">AIVM version</td>
                    <td className="p-3 border-b border-gray-800">Required ISA features</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-800 text-white">Resource quota</td>
                    <td className="p-3 border-b border-gray-800">Max FLOPs per epoch</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-800 text-white">Stake</td>
                    <td className="p-3 border-b border-gray-800">$THE locked for slashing</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white">Initial context</td>
                    <td className="p-3">Agent context from TheseusStore</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Model Registration</h2>
            
            <p className="text-gray-400 mb-6">
              Models are registered separately from agents and can be invoked by any agent that pays the posted fee.
            </p>

            <div className="bg-gray-900 border border-gray-800 rounded overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead className="bg-black">
                  <tr>
                    <th className="text-left p-3 border-b border-gray-800">Field</th>
                    <th className="text-left p-3 border-b border-gray-800">Purpose</th>
                  </tr>
                </thead>
                <tbody className="text-gray-400">
                  <tr>
                    <td className="p-3 border-b border-gray-800 text-white">Name & version</td>
                    <td className="p-3 border-b border-gray-800">e.g., Llama 3.1 8B</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-800 text-white">Architecture</td>
                    <td className="p-3 border-b border-gray-800">LLM, diffusion, GAN, etc.</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-800 text-white">Tensor Commit</td>
                    <td className="p-3 border-b border-gray-800">Cryptographic weight fingerprint</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-800 text-white">Param count</td>
                    <td className="p-3 border-b border-gray-800">For fee estimation</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-800 text-white">Base fee</td>
                    <td className="p-3 border-b border-gray-800">$THE per inference</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-800 text-white">Owner</td>
                    <td className="p-3 border-b border-gray-800">Revenue destination (address/DAO)</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-800 text-white">Weights URI</td>
                    <td className="p-3 border-b border-gray-800">Where validators fetch params</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-800 text-white">Compute spec</td>
                    <td className="p-3 border-b border-gray-800">For Tensor Commits generation</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white">Permissions</td>
                    <td className="p-3">Access control rules</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Sovereign Agent Inference Loop</h2>
            
            <p className="text-gray-400 mb-6">
              How sovereign agents decide when to run inference—no human keys or off-chain servers:
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
                      Look up model&apos;s posted cost, add network proof surcharge, confirm $THE balance covers total
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
              Fully sovereign: agents control their own funds, decisions are pure functions of on-chain state.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Inter-Agent Interaction</h2>
            
            <p className="text-gray-400 mb-6">
              Agents with an address, balance, and ABI can call each other like contracts—but either side can invoke models mid-flow.
            </p>

            <div className="space-y-6">
              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-3">1. Discovery</h3>
                <p className="text-gray-400">
                  Agents publish service manifests on-chain (selectors, purpose hash, access mode). Other agents query by purpose hash.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-3">2. Call & Pay</h3>
                <p className="text-gray-400">
                  Caller sends AIVM request with callee, function, args, and (if required) capability token or stake. Model fees drawn from caller unless cost-split agreed.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-3">3. Model Invocation</h3>
                <p className="text-gray-400">
                  Callee bytecode decides whether to run inference. Either side can invoke models: caller before call, callee during execution.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-3">4. Result Handling</h3>
                <p className="text-gray-400">
                  Same-block completion returns value immediately. Longer jobs issue promise events, redeemed in follow-up calls.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Model Usage Fees</h2>
            
            <p className="text-gray-400 mb-6">
              Model owners set base fees in $THE. Fees flow directly to owners. Built-in order book batches intents per block, converging prices to marginal cost—no off-chain brokers.
            </p>

            <div className="bg-gray-900 border border-gray-800 rounded p-6">
              <p className="text-gray-400">
                Dishonest proofs burn the offender&apos;s stake. Economic security scales with staked value.
              </p>
            </div>
          </section>

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
  );
}

