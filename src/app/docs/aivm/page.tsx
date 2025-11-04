import Link from "next/link";

export default function AIVMPage() {
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
        <h1 className="text-4xl sm:text-5xl font-light mb-8">AI Virtual Machine (AIVM)</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-gray-400 mb-8">
            The AIVM is the execution backbone of Theseus, engineered to support sovereign AI with tensor-native 
            opcodes, deterministic execution, and cryptographic proof generation.
          </p>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Architecture Overview</h2>
            <p className="text-gray-400 mb-6">
              The AIVM comprises tightly modular subsystems designed specifically for AI workloads:
            </p>

            <div className="space-y-4">
              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-xl font-medium mb-3">Execution Layer</h3>
                <p className="text-gray-400">
                  Evaluates tensor opcodes deterministically using a stack-based dispatch and fixed-point arithmetic. 
                  This ensures that every node running the same computation produces identical results.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-xl font-medium mb-3">Memory Layer</h3>
                <p className="text-gray-400">
                  Manages sandboxed memory for quick information retrieval. Agent contexts, embeddings, and temporary 
                  tensors are stored here during execution.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-xl font-medium mb-3">Proof Interface</h3>
                <p className="text-gray-400">
                  Generates a succinct Tensor Commit receipt so any validator can check the result in milliseconds. 
                  This is the bridge between execution and verification.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-xl font-medium mb-3">Syscall Gateway</h3>
                <p className="text-gray-400">
                  Provides secure boundary crossing for external calls (e.g., agent messaging, external state anchoring). 
                  All cross-boundary operations are verified and metered.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-xl font-medium mb-3">State Anchoring Layer</h3>
                <p className="text-gray-400">
                  Emits a Merkle root each block, giving auditors a single hash to verify full execution traces. 
                  This enables light clients and cross-chain verification.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Key Features</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-3">Tensor-Native Opcodes</h3>
                <p className="text-gray-400 mb-4">
                  Unlike traditional VMs, AIVM includes specialized operations for AI inference:
                </p>
                <div className="bg-black border border-gray-700 rounded p-4 font-mono text-sm text-gray-300 overflow-x-auto">
                  <div>TMATMUL    - Matrix multiplication for tensors</div>
                  <div>TEWOP      - Element-wise operations (ReLU, GELU, etc.)</div>
                  <div>TCUSTOM    - Call registered custom kernels</div>
                  <div>TLOAD/TSTORE - Tensor memory operations</div>
                  <div>TCOMMIT    - Generate Tensor-Commit proof</div>
                  <div>TSTREAM    - Streaming inference operations</div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-3">Deterministic Execution</h3>
                <p className="text-gray-400">
                  All randomness comes from a VRF (Verifiable Random Function), and all validations require full 
                  consensus amongst the validator set. This means any full node can reproduce receipts bit-for-bit. 
                  Tensor Commitments also have deterministic validations.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-3">Gas Model</h3>
                <p className="text-gray-400 mb-4">
                  Every tensor operation carries a linear gas price based on FLOPs (floating-point operations):
                </p>
                <div className="bg-gray-900 border border-gray-800 rounded p-4">
                  <div className="font-mono text-sm text-gray-300">
                    Gas = γ × FLOPs(op)
                  </div>
                  <div className="font-mono text-sm text-gray-300 mt-2">
                    MODEL_FEE = Σ Gas_op + Proof Overhead
                  </div>
                </div>
                <p className="text-gray-400 mt-4">
                  A congestion multiplier (broadcast once per block) keeps prices elastic depending on load. This 
                  allows accurate gas metering while fairly tracking hardware costs and inference statefulness.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Performance Metrics</h2>
            
            <div className="bg-gray-900 border border-gray-800 rounded overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead className="bg-black">
                  <tr>
                    <th className="text-left p-4 border-b border-gray-800">Model</th>
                    <th className="text-left p-4 border-b border-gray-800">Tokens/sec (A100)</th>
                    <th className="text-left p-4 border-b border-gray-800">Est. Gas/Token</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 border-b border-gray-800">GPT-2</td>
                    <td className="p-4 border-b border-gray-800 text-gray-400">180-200</td>
                    <td className="p-4 border-b border-gray-800 text-gray-400">50K</td>
                  </tr>
                  <tr>
                    <td className="p-4 border-b border-gray-800">LLaMA-7B</td>
                    <td className="p-4 border-b border-gray-800 text-gray-400">90-100</td>
                    <td className="p-4 border-b border-gray-800 text-gray-400">150K</td>
                  </tr>
                  <tr>
                    <td className="p-4 border-b border-gray-800">LLaMA-13B</td>
                    <td className="p-4 border-b border-gray-800 text-gray-400">50-60</td>
                    <td className="p-4 border-b border-gray-800 text-gray-400">400K</td>
                  </tr>
                  <tr>
                    <td className="p-4 border-b border-gray-800">GPT-3.5</td>
                    <td className="p-4 border-b border-gray-800 text-gray-400">15-25</td>
                    <td className="p-4 border-b border-gray-800 text-gray-400">800K-1M</td>
                  </tr>
                  <tr>
                    <td className="p-4">LLaMA-65B</td>
                    <td className="p-4 text-gray-400">5-10</td>
                    <td className="p-4 text-gray-400">≥900K</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-400 text-sm">
              These benchmarks align with contemporary LLM workloads. For instance, in GPT-3 (175B), a single forward 
              pass on a prompt of 1024 tokens takes approximately 40-60 ms on A100 hardware, generating upwards of 
              1.2M FLOPs/token.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Agent Scheduling</h2>
            <p className="text-gray-400 mb-6">
              Theseus must juggle thousands of simultaneous model calls—from millisecond-critical trading bots to 
              overnight analytics—without favoring whales or letting gas fees spike at random.
            </p>

            <div className="bg-gray-900 border border-gray-800 rounded p-6 mb-6">
              <h3 className="text-lg font-medium mb-4">How It Works</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start">
                  <span className="text-white mr-3">•</span>
                  <span>Every agent gets a priority score based on stake, recent latency, and fairness</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3">•</span>
                  <span>Calls to AGENT_TICK() or MODEL_INFER() land in epoch-bound queues, so nothing starves</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-3">•</span>
                  <span>The AIVM ships with a minimal, on-chain scheduler that respects latency classes</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded p-6">
              <h3 className="text-lg font-medium mb-4">Latency Classes</h3>
              <div className="space-y-3">
                <div>
                  <strong className="text-white">RT (Real-Time):</strong>
                  <span className="text-gray-400 ml-2">≤ 1 epoch deadline</span>
                </div>
                <div>
                  <strong className="text-white">Interactive:</strong>
                  <span className="text-gray-400 ml-2">≤ 3 epochs deadline</span>
                </div>
                <div>
                  <strong className="text-white">Bulk:</strong>
                  <span className="text-gray-400 ml-2">Unbounded (best-effort)</span>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Model Pipelining</h2>
            <p className="text-gray-400 mb-4">
              Many real-world AI inference tasks, such as Mixture-of-Experts (MoE), do not involve a single forward 
              pass through one model. Treating each step as a separate on-chain transaction requires extra gas, extra 
              block confirmations, and losing the transaction flow.
            </p>
            <p className="text-gray-400 mb-4">
              Theseus enables model pipelining so that the AIVM understands complex model behavior. AIVM allows tensor 
              operations to feed outputs into the next in a single chaining operation (op-graph chaining):
            </p>
            <div className="bg-black border border-gray-700 rounded p-4 font-mono text-sm text-gray-300 overflow-x-auto">
              <div>TLOAD(encoder) -&gt; TMATMUL -&gt; TCUSTOM -&gt; TLOAD(decoder) -&gt; TMATMUL -&gt; TCOMMIT</div>
            </div>
            <p className="text-gray-400 mt-4">
              This supports multi-model workflows (encoder-decoder, RAG, etc.) efficiently.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Comparison to EVM</h2>
            <p className="text-gray-400 mb-6">
              The EVM simply isn&apos;t built for on-chain AI. It offers no tensor-aware opcodes and no native inference 
              proofs like AIVM&apos;s Tensor Commits, so hardware-specific rounding quirks can slip through unchecked.
            </p>
            
            <div className="bg-gray-900 border border-gray-800 rounded overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-black">
                  <tr>
                    <th className="text-left p-4 border-b border-gray-800">Feature</th>
                    <th className="text-left p-4 border-b border-gray-800">EVM</th>
                    <th className="text-left p-4 border-b border-gray-800">AIVM</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 border-b border-gray-800">Tensor operations</td>
                    <td className="p-4 border-b border-gray-800 text-gray-400">No native support</td>
                    <td className="p-4 border-b border-gray-800 text-gray-400">Built-in opcodes</td>
                  </tr>
                  <tr>
                    <td className="p-4 border-b border-gray-800">Inference proofs</td>
                    <td className="p-4 border-b border-gray-800 text-gray-400">Not supported</td>
                    <td className="p-4 border-b border-gray-800 text-gray-400">Tensor Commits</td>
                  </tr>
                  <tr>
                    <td className="p-4 border-b border-gray-800">Agent autonomy</td>
                    <td className="p-4 border-b border-gray-800 text-gray-400">Requires human keys</td>
                    <td className="p-4 border-b border-gray-800 text-gray-400">Native sovereignty</td>
                  </tr>
                  <tr>
                    <td className="p-4">Gas model</td>
                    <td className="p-4 text-gray-400">Generic opcodes</td>
                    <td className="p-4 text-gray-400">FLOPs-based for AI</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <div className="border-t border-gray-800 pt-8">
            <div className="grid sm:grid-cols-2 gap-4">
              <Link 
                href="/tensor-commits"
                className="block p-4 border border-gray-800 hover:border-gray-600 transition-colors"
              >
                <h3 className="font-medium mb-2">Tensor Commits →</h3>
                <p className="text-sm text-gray-400">Learn about proof generation and verification</p>
              </Link>
              <Link 
                href="/ship"
                className="block p-4 border border-gray-800 hover:border-gray-600 transition-colors"
              >
                <h3 className="font-medium mb-2">SHIP Language →</h3>
                <p className="text-sm text-gray-400">Write verifiable agent code with SHIP DSL</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

