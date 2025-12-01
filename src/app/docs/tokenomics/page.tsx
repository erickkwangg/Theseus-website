import Link from "next/link";

export default function TokenomicsPage() {
  return (
    <div>
      <h1 className="text-4xl sm:text-5xl font-light mb-8">Tokenomics</h1>
      
      <div className="prose prose-invert max-w-none">
        <p className="text-xl text-gray-400 mb-8">
          $THE is the native token of Theseus, designed for AI-to-AI transactions, staking, and governance.
        </p>

        <section className="mb-12">
          <h2 id="utility" className="text-3xl font-light mb-6">Token Utility</h2>
          
          <div className="bg-gray-900 border border-gray-800 rounded overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-black">
                <tr>
                  <th className="text-left p-3 border-b border-gray-800">Use Case</th>
                  <th className="text-left p-3 border-b border-gray-800">Description</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr>
                  <td className="p-3 border-b border-gray-800 text-white">Gas Fees</td>
                  <td className="p-3 border-b border-gray-800">Pay for AIVM execution, model inference, and state storage</td>
                </tr>
                <tr>
                  <td className="p-3 border-b border-gray-800 text-white">Model Inference</td>
                  <td className="p-3 border-b border-gray-800">Agents pay model owners per inference call</td>
                </tr>
                <tr>
                  <td className="p-3 border-b border-gray-800 text-white">Agent Staking</td>
                  <td className="p-3 border-b border-gray-800">Lock $THE to register agents and prevent spam</td>
                </tr>
                <tr>
                  <td className="p-3 border-b border-gray-800 text-white">Validator Staking</td>
                  <td className="p-3 border-b border-gray-800">Secure the network via Proof of Stake consensus</td>
                </tr>
                <tr>
                  <td className="p-3 text-white">Storage Fees</td>
                  <td className="p-3">Pay TheseusStore miners for model weights and agent context</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 id="gas" className="text-3xl font-light mb-6">Gas Mechanics</h2>
          
          <p className="text-gray-400 mb-6">
            Gas in Theseus is priced based on computational complexity (FLOPs) rather than generic opcodes.
          </p>

          <div className="bg-gray-900 border border-gray-800 rounded p-6 mb-6">
            <h3 className="text-lg font-medium mb-4">Gas Formula</h3>
            <div className="font-mono text-sm text-gray-300 mb-4">
              Gas = γ × FLOPs(operation) + Storage + Proof Overhead
            </div>
            <p className="text-gray-400 text-sm">
              Where γ is a base rate adjusted by network congestion. A congestion multiplier is broadcast 
              each block to keep prices elastic.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded p-6">
              <h3 className="text-lg font-medium mb-3">Standard Operations</h3>
              <p className="text-gray-400 text-sm">
                Basic agent logic, state reads/writes, message passing—similar to traditional EVM costs.
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded p-6">
              <h3 className="text-lg font-medium mb-3">Inference Operations</h3>
              <p className="text-gray-400 text-sm">
                Model calls scale with param count and sequence length. Tensor Commit proof overhead is ~1% additional.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 id="staking" className="text-3xl font-light mb-6">Staking Requirements</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded p-6">
              <h3 className="text-lg font-medium mb-3">Agent Registration</h3>
              <p className="text-gray-400 text-sm mb-3">
                Agents must stake $THE proportional to their resource quota (max FLOPs/epoch). This prevents 
                Sybil attacks and ensures skin in the game.
              </p>
              <p className="text-gray-400 text-xs">
                Stake can be slashed for: submitting invalid inference results, violating resource quotas, or malicious behavior.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded p-6">
              <h3 className="text-lg font-medium mb-3">Validator Staking</h3>
              <p className="text-gray-400 text-sm mb-3">
                Validators stake $THE to participate in consensus. Stake weight influences selection probability 
                for block production and verification.
              </p>
              <p className="text-gray-400 text-xs">
                Validators earn: block rewards + a portion of gas fees + inference verification fees.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded p-6">
              <h3 className="text-lg font-medium mb-3">Prover Staking</h3>
              <p className="text-gray-400 text-sm">
                Provers (who run model inference) stake $THE proportional to their hardware capacity. VRF lottery 
                selects provers based on stake + hardware specs.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 id="fees" className="text-3xl font-light mb-6">Fee Distribution</h2>
          
          <div className="bg-gray-900 border border-gray-800 rounded p-6">
            <p className="text-gray-400 mb-4">When an agent calls a model:</p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex justify-between">
                <span>Model Owner</span>
                <span className="text-white">Base inference fee (set by owner)</span>
              </div>
              <div className="flex justify-between">
                <span>Prover</span>
                <span className="text-white">Computation reward for running inference</span>
              </div>
              <div className="flex justify-between">
                <span>Verifiers</span>
                <span className="text-white">Small fee for validating Tensor Commits</span>
              </div>
              <div className="flex justify-between">
                <span>Network (burned)</span>
                <span className="text-white">Portion of gas fee burned for deflation</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 id="ai-ownership" className="text-3xl font-light mb-6">AI Asset Ownership</h2>
          
          <p className="text-gray-400 mb-6">
            A key innovation: agents can hold $THE balances autonomously. Unlike Ethereum contracts that 
            require EOA triggers, Theseus agents control their assets without human intermediaries.
          </p>

          <div className="bg-blue-950 border border-blue-900 rounded p-6">
            <h3 className="text-lg font-medium mb-3 text-blue-400">What This Enables</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
              <div>AI capital markets</div>
              <div>Autonomous trading agents</div>
              <div>Agent-to-agent payments</div>
              <div>Self-sustaining AI services</div>
              <div className="col-span-2">Revenue-generating AI that pays for its own inference</div>
            </div>
          </div>
        </section>

        <div className="border-t border-gray-800 pt-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <Link 
              href="/docs/agents"
              className="block p-4 border border-gray-800 hover:border-gray-600 transition-colors"
            >
              <h3 className="font-medium mb-2">← Agents & Models</h3>
              <p className="text-sm text-gray-400">Learn how agents and models interact</p>
            </Link>
            <Link 
              href="/docs/architecture"
              className="block p-4 border border-gray-800 hover:border-gray-600 transition-colors"
            >
              <h3 className="font-medium mb-2">Architecture →</h3>
              <p className="text-sm text-gray-400">Understand the full system design</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

