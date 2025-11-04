import Link from "next/link";

export default function SHIPPage() {
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

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-3">Unpredictability</h3>
                <p className="text-gray-400">
                  LLMs may hallucinate functions, misplace parameters, or generate unsafe constructs
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-3">Unbounded Execution</h3>
                <p className="text-gray-400">
                  Outputs may contain Turing-complete logic or fail to terminate, creating DoS risks
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-3">Lack of Proof Anchoring</h3>
                <p className="text-gray-400">
                  Free-form outputs cannot be cleanly tied to proof anchors, making verification infeasible
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-3">Opaque Intent</h3>
                <p className="text-gray-400">
                  The economic or operational intention behind raw outputs is implicit
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">SHIP Design Principles</h2>
            
            <p className="text-gray-400 mb-6">
              To overcome these limitations, SHIP adheres to the following principles:
            </p>

            <div className="space-y-4">
              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-3">Determinism</h3>
                <p className="text-gray-400">
                  All constructs are statically bounded and compiled to verifiable opcode sequences with known gas 
                  and memory profiles.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-3">Verifiability</h3>
                <p className="text-gray-400">
                  SHIP programs are compatible with Theseus' backends and generate Tensor Commit proofs alongside 
                  inference outputs.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-3">Traceability</h3>
                <p className="text-gray-400">
                  Each program is uniquely tied to its originating agent context and is traceable.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-3">Composability</h3>
                <p className="text-gray-400">
                  SHIP fragments can be staged, delegated, or templated by meta-agents.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">SHIP Execution Flow</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-3">1. Inference</h3>
                <p className="text-gray-400">
                  The agent runs a model and produces outputs (e.g., a token string).
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-3">2. Compilation</h3>
                <p className="text-gray-400">
                  SHIP is used to translate natural language into structured outputs in two ways:
                </p>
                <ul className="mt-3 space-y-2 text-gray-400 list-none">
                  <li>• The agent itself is fine-tuned on the SHIP language or provided context on the DSL</li>
                  <li>• There is a "meta-model" whose specific task is to transform natural language from an initial 
                    model into an output</li>
                </ul>
                <p className="text-gray-400 mt-3">
                  The SHIP compiler transforms structured outputs into a valid, bounded sequence of operations.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-3">3. Verification</h3>
                <p className="text-gray-400">
                  Tensor Commit proves inference integrity, and SHIP bytecode is cross-validated against execution 
                  constraints.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-3">4. Execution</h3>
                <p className="text-gray-400">
                  Upon finalization, the program is submitted to the runtime.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Example Use Case</h2>
            
            <p className="text-gray-400 mb-6">
              A sovereign agent runs a summarization model on-chain. The summary contains a trigger like "Pay 10 $THE 
              to agent_xyz for document processing".
            </p>

            <div className="bg-gray-900 border border-gray-800 rounded p-6 mb-6">
              <h3 className="text-lg font-medium mb-4">Without SHIP</h3>
              <p className="text-gray-400">
                This text would be parsed directly into bytecode, causing chances for execution unaligned with the 
                agent's intention.
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
            <h2 className="text-3xl font-light mb-6">SHIP Integration with AIVM</h2>
            
            <div className="space-y-4 text-gray-400">
              <p>
                SHIP programs are compiled to AIVM opcodes and executed via AGENT_TICK() or MODEL_INFER() syscall 
                extensions.
              </p>
              <p>
                Each SHIP construct maps directly to safe AIVM primitives, such as TLOAD, TCUSTOM, STATE_EXPORT, or 
                TRANSFER_TOKEN.
              </p>
              <p>
                Proofs are attached via Tensor Commit to anchor the linkage between inference and outcome.
              </p>
            </div>
          </section>

          <div className="bg-gray-900 border border-gray-800 rounded p-6 mb-12">
            <h3 className="text-xl font-medium mb-4">📖 More Coming Soon</h3>
            <p className="text-gray-400 mb-4">
              This page is being expanded with:
            </p>
            <ul className="space-y-2 text-gray-400">
              <li>• Complete SHIP language reference</li>
              <li>• Syntax and grammar specification</li>
              <li>• Code examples and patterns</li>
              <li>• Compiler usage and tooling</li>
            </ul>
          </div>

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
    </div>
  );
}

