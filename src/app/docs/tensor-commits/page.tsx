import Link from "next/link";

export default function TensorCommitsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <Link href="/docs/docs" className="text-base sm:text-xl font-light hover:text-gray-300 transition-colors">
            ← Back to Docs
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-light mb-8">Tensor Commits Protocol</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-gray-400 mb-8">
            The Tensor Commitment Protocol is the security base of Theseus, providing public verifiability and 
            tamper-proof computations with proven efficiency of &lt;1% overhead.
          </p>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Overview</h2>
            <p className="text-gray-400 mb-6">
              Tensor-commit protocols enable verifiable ML which focuses on proving that a machine learning model 
              was executed correctly. Traditional verification methods like recomputing the entire model are 
              prohibitively expensive, especially for large language models.
            </p>
            <p className="text-gray-400">
              Theseus&apos; Tensor Commits provide batch verification and reduce the opening costs while keeping the 
              computation overheads small. This is achieved through a novel application of KZG commitment schemes 
              extended to multi-dimensional tensor structures.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Key Achievements</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-xl font-medium mb-3">&lt;1% Proof Generation Overhead</h3>
                <p className="text-gray-400">
                  Minimal impact on inference performance. Generating proofs adds less than 1% to the total 
                  computation time, making it practical for production workloads.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-xl font-medium mb-3">&lt;0.1% Verification Time</h3>
                <p className="text-gray-400">
                  Fast cryptographic verification. Verifiers can check proofs in milliseconds, enabling thousands 
                  of validators to audit simultaneously without bottlenecks.
                </p>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded p-6">
              <h3 className="text-xl font-medium mb-3">Efficient & Scalable</h3>
              <ul className="space-y-2 text-gray-400 mt-4">
                <li>• Compact proofs with O(log n) verification complexity</li>
                <li>• Along with Terkle Trees, a frontier foundational model has a Tensor Commitment proof size of less than 1MB</li>
                <li>• Inference verification can scale to over a thousand verifiers simultaneously</li>
                <li>• Sublinear scaling with model size</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Terkle Trees</h2>
            <p className="text-gray-400 mb-6">
              A Terkle tree (tensor Merkle tree) is a Merkle tree whose leaves are sub-tensors, and whose internal 
              nodes carry tensor commitments instead of hash values. Tensor-commit takes advantage of Terkle trees 
              to compress and reduce the proof size, while adding proof of memberships for large models (with 
              millions of parameters).
            </p>

            <div className="bg-gray-900 border border-gray-800 rounded p-6 mb-6">
              <h3 className="text-lg font-medium mb-4">Structure</h3>
              <p className="text-gray-400 mb-4">
                Theseus uses Terkle trees by partitioning the full tensor into blocks. For a weight tensor with 
                dimensions d₁ × d₂ × ... × dₖ:
              </p>
              <ul className="space-y-2 text-gray-400">
                <li>• Each dimension j has mⱼ blocks where bⱼ is the block size</li>
                <li>• Total number of leaf nodes (blocks) is M = m₁ × m₂ × ... × mₖ</li>
                <li>• Each leaf cℓ is a tensor commitment of a sub-tensor Tℓ</li>
                <li>• Parent nodes are computed by committing to the concatenation of children tensors</li>
                <li>• The root cᵣₒₒₜ is the global fingerprint of the model</li>
              </ul>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded p-6">
              <h3 className="text-lg font-medium mb-4">Benefits</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• <strong className="text-white">Batch verification:</strong> Verify multiple tensor operations in one proof</li>
                <li>• <strong className="text-white">Selective opening:</strong> Open specific sub-tensors without revealing the entire model</li>
                <li>• <strong className="text-white">Efficient membership proofs:</strong> Prove a weight exists in the model with logarithmic proof size</li>
                <li>• <strong className="text-white">Hierarchical structure:</strong> Natural fit for neural network layer organization</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">How Verification Works</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-3">1. Model Registration</h3>
                <p className="text-gray-400">
                  When a model is registered, the prover uploads the model weights along with their Tensor Commit. 
                  This commitment is stored on-chain as the canonical fingerprint of the model.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-3">2. Inference Execution</h3>
                <p className="text-gray-400 mb-4">
                  During inference, the prover (a specialized node with high-end hardware) runs the full forward 
                  pass and emits a Tensor Commit proof. The proof includes:
                </p>
                <ul className="space-y-2 text-gray-400 list-none">
                  <li>• Opening (y, π) showing the computation result</li>
                  <li>• Commitment to input embeddings</li>
                  <li>• Commitment to each layer&apos;s output</li>
                  <li>• Merkle path through the Terkle tree</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-3">3. Verification</h3>
                <p className="text-gray-400">
                  Every verifier in the active set verifies every single inference. The process:
                </p>
                <div className="bg-gray-900 border border-gray-800 rounded p-6 mt-4">
                  <ul className="space-y-3 text-gray-400">
                    <li>• <strong className="text-white">Proof size:</strong> On the order of hundreds of kB or less</li>
                    <li>• <strong className="text-white">Check time:</strong> ≈ 2 ms on a modern CPU core</li>
                    <li>• <strong className="text-white">Network overhead:</strong> Each proof is gossiped once; 1,000 validators can confirm 100 simultaneous prover jobs in well under one second thanks to ordinary parallelism</li>
                    <li>• <strong className="text-white">Consensus:</strong> Verifiers run standard BFT finality atop the proof layer (2/3 verifier agreement needed)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Performance Comparison</h2>
            
            <div className="bg-gray-900 border border-gray-800 rounded overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead className="bg-black">
                  <tr>
                    <th className="text-left p-4 border-b border-gray-800">Operation</th>
                    <th className="text-left p-4 border-b border-gray-800">Latency</th>
                    <th className="text-left p-4 border-b border-gray-800">Proof Size</th>
                    <th className="text-left p-4 border-b border-gray-800">Gas Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 border-b border-gray-800">TMATMUL 512x512</td>
                    <td className="p-4 border-b border-gray-800 text-gray-400">4.1 ms</td>
                    <td className="p-4 border-b border-gray-800 text-gray-400">230 KB</td>
                    <td className="p-4 border-b border-gray-800 text-gray-400">18K</td>
                  </tr>
                  <tr>
                    <td className="p-4 border-b border-gray-800">TSTREAM 4x512</td>
                    <td className="p-4 border-b border-gray-800 text-gray-400">8.6 ms</td>
                    <td className="p-4 border-b border-gray-800 text-gray-400">400 KB</td>
                    <td className="p-4 border-b border-gray-800 text-gray-400">27K</td>
                  </tr>
                  <tr>
                    <td className="p-4">TCOMMIT 70B</td>
                    <td className="p-4 text-gray-400">22 ms</td>
                    <td className="p-4 text-gray-400">470 KB</td>
                    <td className="p-4 text-gray-400">120K</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-400 text-sm">
              * Gas costs based on base-load multiplier m = 1.0. Actual costs scale with network congestion.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">LLM-Specific Optimizations</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-4">Token and Positional Embeddings</h3>
                <p className="text-gray-400">
                  Input embeddings for tokens are committed polynomially with positional encoding leveraging 
                  homomorphic properties, allowing efficient verification without revealing input content.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-4">Layer Normalization</h3>
                <p className="text-gray-400">
                  Using polynomial commitments, we verify mean and variance computations. Inverse square root 
                  approximation is efficiently handled via polynomial approximation.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-4">Multi-Head Attention</h3>
                <p className="text-gray-400">
                  Attention computations (query Q, key K, and value V matrices) are committed individually. 
                  Attention scores and softmax weights are polynomially approximated for efficient verification.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-4">Residual Connections</h3>
                <p className="text-gray-400">
                  Residual paths are easily handled via commitment homomorphism: Comᵣ = Comₓ₍ℓ₎ · ComA. Each 
                  subsequent layer leverages prior commitments, enabling efficient recursive proof verification.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-4">Mixture-of-Experts</h3>
                <p className="text-gray-400">
                  Sparse expert activations are committed and verified efficiently using sparse tensor commitments. 
                  Only activated experts contribute proofs, significantly reducing verification complexity.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Why This Matters</h2>
            <p className="text-gray-400 mb-6">
              Theseus&apos; tensor commitments uniquely support scalable, transparent, and cryptographically sound 
              verification for LLM inference. This novel commitment mechanism positions Theseus as the ideal 
              blockchain solution for deploying trustworthy, decentralized, and verifiable large language models.
            </p>
            
            <div className="bg-gray-900 border border-gray-800 rounded p-6">
              <ul className="space-y-3 text-gray-400">
                <li>• <strong className="text-white">No recomputation required:</strong> Verifiers do not need to re-run the entire model</li>
                <li>• <strong className="text-white">Hardware independence:</strong> Proofs are valid regardless of the hardware used</li>
                <li>• <strong className="text-white">Privacy preserving:</strong> Model weights remain private while computation is verifiable</li>
                <li>• <strong className="text-white">Scalable verification:</strong> Thousands of validators can verify simultaneously</li>
              </ul>
            </div>
          </section>

          <div className="border-t border-gray-800 pt-8">
            <div className="grid sm:grid-cols-2 gap-4">
              <Link 
                href="/docs/aivm"
                className="block p-4 border border-gray-800 hover:border-gray-600 transition-colors"
              >
                <h3 className="font-medium mb-2">← AIVM Architecture</h3>
                <p className="text-sm text-gray-400">Learn how proofs integrate with execution</p>
              </Link>
              <Link 
                href="/docs/agents"
                className="block p-4 border border-gray-800 hover:border-gray-600 transition-colors"
              >
                <h3 className="font-medium mb-2">Build Agents →</h3>
                <p className="text-sm text-gray-400">Deploy verifiable AI agents on Theseus</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

