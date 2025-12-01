import Link from "next/link";

export default function AIVMPage() {
  return (
    <div>
      <h1 className="text-4xl sm:text-5xl font-light mb-8">AI Virtual Machine (AIVM)</h1>
      
      <div className="prose prose-invert max-w-none">
        <p className="text-xl text-gray-400 mb-8">
          The AIVM is the execution backbone of Theseus, engineered to support sovereign AI with tensor-native 
          opcodes, deterministic execution, and cryptographic proof generation.
        </p>

        <section className="mb-12">
          <h2 id="architecture" className="text-3xl font-light mb-6">Architecture</h2>
          
          <div className="bg-gray-900 border border-gray-800 rounded overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-black">
                <tr>
                  <th className="text-left p-3 border-b border-gray-800">Layer</th>
                  <th className="text-left p-3 border-b border-gray-800">Function</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr>
                  <td className="p-3 border-b border-gray-800 text-white">Execution</td>
                  <td className="p-3 border-b border-gray-800">Stack-based dispatch, fixed-point arithmetic for deterministic tensor ops</td>
                </tr>
                <tr>
                  <td className="p-3 border-b border-gray-800 text-white">Memory</td>
                  <td className="p-3 border-b border-gray-800">Sandboxed storage for contexts, embeddings, temp tensors</td>
                </tr>
                <tr>
                  <td className="p-3 border-b border-gray-800 text-white">Proof Interface</td>
                  <td className="p-3 border-b border-gray-800">Generates Tensor Commit receipts for validators (~ms verification)</td>
                </tr>
                <tr>
                  <td className="p-3 border-b border-gray-800 text-white">Syscall Gateway</td>
                  <td className="p-3 border-b border-gray-800">Verified, metered boundary crossing for external calls</td>
                </tr>
                <tr>
                  <td className="p-3 text-white">State Anchoring</td>
                  <td className="p-3">Merkle root per block for light clients and cross-chain verification</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 id="features" className="text-3xl font-light mb-6">Key Features</h2>
          
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
          <h2 id="performance" className="text-3xl font-light mb-6">Performance Metrics</h2>
          
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
          <h2 id="scheduling" className="text-3xl font-light mb-6">Agent Scheduling</h2>
          <p className="text-gray-400 mb-6">
            Theseus must juggle thousands of simultaneous model calls—from millisecond-critical trading bots to 
            overnight analytics—without favoring whales or letting gas fees spike at random.
          </p>

          <div className="bg-gray-900 border border-gray-800 rounded p-6 mb-6">
            <p className="text-gray-400 text-sm">
              Priority score (stake + latency + fairness) → Epoch-bound queues prevent starvation → On-chain scheduler respects latency classes
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded p-6">
            <h3 className="text-lg font-medium mb-3">Latency Classes</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-white font-medium">RT</div>
                <div className="text-gray-400">≤1 epoch</div>
              </div>
              <div>
                <div className="text-white font-medium">Interactive</div>
                <div className="text-gray-400">≤3 epochs</div>
              </div>
              <div>
                <div className="text-white font-medium">Bulk</div>
                <div className="text-gray-400">best-effort</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 id="pipelining" className="text-3xl font-light mb-6">Model Pipelining</h2>
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
          <h2 id="vs-evm" className="text-3xl font-light mb-6">Comparison to EVM</h2>
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
              href="/docs/tensor-commits"
              className="block p-4 border border-gray-800 hover:border-gray-600 transition-colors"
            >
              <h3 className="font-medium mb-2">Tensor Commits →</h3>
              <p className="text-sm text-gray-400">Learn about proof generation and verification</p>
            </Link>
            <Link 
              href="/docs/ship"
              className="block p-4 border border-gray-800 hover:border-gray-600 transition-colors"
            >
              <h3 className="font-medium mb-2">SHIP Language →</h3>
              <p className="text-sm text-gray-400">Write verifiable agent code with SHIP DSL</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
