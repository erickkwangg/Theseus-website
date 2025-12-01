import Link from "next/link";

export default function SHIPPage() {
  return (
    <div>
      <h1 className="text-4xl sm:text-5xl font-light mb-8">SHIP Language</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-gray-400 mb-8">
            SHIP (Secure Heterogeneous Inference Programming) is a formally constrained Domain-Specific Language for 
            translating natural language to verifiable bytecode.
          </p>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Why SHIP Is Necessary</h2>
            
            <p className="text-gray-400 mb-6">
              To bridge the gap between model inference and actionable outcomes, such as asset transfers, agent 
              interactions, or smart contract invocations, Theseus introduces SHIP. SHIP is essential to express, 
              verify, and govern the intent of sovereign AI agents, especially in inference-to-asset alignment 
              scenarios where economic transactions or external actions result directly from model outputs.
            </p>

            <div className="bg-gray-900 border border-gray-800 rounded p-6 mb-6">
              <h3 className="text-lg font-medium mb-4">The Problem with Raw LLM Outputs</h3>
              <p className="text-gray-400 mb-4">
                While large language models (LLMs) are capable of generating text that resembles executable logic, 
                they are inherently non-deterministic and lack formal guarantees about structure, safety, or correctness.
              </p>
              <p className="text-gray-400">
                Attempting to use raw LLM outputs (e.g., via prompting) to generate bytecode or transaction logic 
                introduces serious issues:
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded p-6 text-sm text-gray-400">
              <strong className="text-white">Unpredictability</strong> (hallucinations, unsafe constructs) · 
              <strong className="text-white"> Unbounded execution</strong> (DoS risks) · 
              <strong className="text-white"> No proof anchoring</strong> (verification impossible) · 
              <strong className="text-white"> Opaque intent</strong> (implicit goals)
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Design Principles</h2>
            
            <div className="bg-gray-900 border border-gray-800 rounded p-6 text-sm text-gray-400">
              <strong className="text-white">Determinism</strong> (static bounds, known gas/memory) · 
              <strong className="text-white"> Verifiability</strong> (Tensor Commit proofs) · 
              <strong className="text-white"> Traceability</strong> (tied to agent context) · 
              <strong className="text-white"> Composability</strong> (staged, delegated, templated)
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Execution Flow</h2>
            
            <div className="bg-gray-900 border border-gray-800 rounded p-6 text-sm text-gray-400">
              <div className="space-y-3">
                <div>
                  <strong className="text-white">1. Inference:</strong> Agent runs model, generates output
                </div>
                <div>
                  <strong className="text-white">2. Compilation:</strong> NL→SHIP via fine-tuned agent or meta-model, then SHIP→bounded opcodes
                </div>
                <div>
                  <strong className="text-white">3. Verification:</strong> Tensor Commit proves inference integrity, bytecode validated
                </div>
                <div>
                  <strong className="text-white">4. Execution:</strong> Program submitted to runtime
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Example Use Case</h2>
            
            <p className="text-gray-400 mb-6">
              A sovereign agent runs a summarization model on-chain. The summary contains a trigger like &quot;Pay 10 $THE 
              to agent_xyz for document processing&quot;.
            </p>

            <div className="bg-gray-900 border border-gray-800 rounded p-6 mb-6">
              <h3 className="text-lg font-medium mb-4">Without SHIP</h3>
              <p className="text-gray-400">
                This text would be parsed directly into bytecode, causing chances for execution unaligned with the 
                agent&apos;s intention.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded p-6">
              <h3 className="text-lg font-medium mb-4">With SHIP</h3>
              <p className="text-gray-400 mb-4">In pseudocode:</p>
              <div className="bg-black border border-gray-700 rounded p-4 font-mono text-sm text-gray-300 overflow-x-auto">
                <div>let payment = Transfer &#123;</div>
                <div>  recipient: agent_xyz,</div>
                <div>  amount: 10 THE</div>
                <div>&#125;;</div>
                <div>commit(payment);</div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Integration with AIVM</h2>
            
            <div className="bg-gray-900 border border-gray-800 rounded p-6 text-sm text-gray-400">
              SHIP→AIVM opcodes via AGENT_TICK()/MODEL_INFER() · Maps to safe primitives (TLOAD, TCUSTOM, STATE_EXPORT, TRANSFER_TOKEN) · Tensor Commits link inference to outcome
            </div>
          </section>

          <div className="border-t border-gray-800 pt-8">
            <div className="grid sm:grid-cols-2 gap-4">
              <Link 
                href="/docs/aivm"
                className="block p-4 border border-gray-800 hover:border-gray-600 transition-colors"
              >
                <h3 className="font-medium mb-2">← AIVM Details</h3>
                <p className="text-sm text-gray-400">Learn about the execution environment</p>
              </Link>
              <Link 
                href="/docs/agents"
                className="block p-4 border border-gray-800 hover:border-gray-600 transition-colors"
              >
                <h3 className="font-medium mb-2">Build Agents →</h3>
                <p className="text-sm text-gray-400">Create agents using SHIP</p>
              </Link>
            </div>
          </div>
        </div>
    </div>
  );
}

