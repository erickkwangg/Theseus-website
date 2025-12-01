import Link from "next/link";

export default function ArchitecturePage() {
  return (
    <div>
      <h1 className="text-4xl sm:text-5xl font-light mb-8">System Architecture</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-gray-400 mb-8">
            Three-layer architecture built for AI workloads: execution, storage, and consensus working as one system.
          </p>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Architectural Overview</h2>
            
            <div className="bg-gray-900 border border-gray-800 rounded p-6 mb-8">
              <img 
                src="/theseus-architecture-diagram.png" 
                alt="Theseus System Architecture" 
                className="w-full h-auto"
              />
            </div>

            <div className="bg-gray-950 border-l-4 border-blue-500 p-6 mb-8">
              <p className="text-sm text-gray-400 leading-relaxed">
                Three main processes: <strong className="text-white">AIVM</strong> executes inference and forwards valid transactions; 
                <strong className="text-white"> TheseusStore</strong> handles model/context data with DA sampling; 
                <strong className="text-white"> HS BFT PoS</strong> provides HotStuff-based finality. All communicate via RPC/Networking 
                layer for read calls, signed transactions, and responses.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Three-Layer Stack</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-xl font-medium mb-3">Execution Layer: AIVM</h3>
                <p className="text-gray-400 mb-4">
                  Deterministic tensor-native runtime with Tensor Commits:
                </p>
                <ul className="space-y-2 text-gray-400 list-none">
                  <li>• Tensor operations and matrix multiplication</li>
                  <li>• Agent scheduling and execution</li>
                  <li>• Proof generation and integration</li>
                  <li>• Natural language to bytecode (SHIP)</li>
                </ul>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-xl font-medium mb-3">Availability Layer: TheseusStore</h3>
                <p className="text-gray-400 mb-4">
                  Erasure-coded storage for model weights and agent contexts:
                </p>
                <ul className="space-y-2 text-gray-400 list-none">
                  <li>• Model weights with Reed-Solomon encoding</li>
                  <li>• Agent contexts (RAG, fine-tuning data)</li>
                  <li>• Storage miner incentives</li>
                  <li>• On-chain Merkle roots for blobs</li>
                </ul>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-xl font-medium mb-3">Consensus Layer: Proof of Stake</h3>
                <p className="text-gray-400 mb-4">
                  HotStuff BFT with AI-specific requirements:
                </p>
                <ul className="space-y-2 text-gray-400 list-none">
                  <li>• Blocks require valid model roots to finalize</li>
                  <li>• VRF-based validator selection</li>
                  <li>• One-block finality with honest majority</li>
                  <li>• Coupled execution, storage, consensus</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Block Structure</h2>
            
            <div className="bg-black border border-gray-700 rounded p-6 font-mono text-sm text-gray-300 mb-6 overflow-x-auto">
              <div>header &#123;</div>
              <div>  parent_hash, height, timestamp</div>
              <div>  post-state Merkle root</div>
              <div>  Terkle tree of Tensor Commits</div>
              <div>  Merkle root of available model and context blobs</div>
              <div>  gas limit</div>
              <div>  VRF-selected validator signature</div>
              <div>&#125;</div>
              <div>body &#123; Transaction[] &#125;</div>
            </div>

            <p className="text-gray-400 mb-4">
              A block cannot finalize unless both conditions hold:
            </p>
            <ul className="space-y-2 text-gray-400">
              <li><strong className="text-white">1. Inference integrity:</strong> Every inference must include a valid Tensor Commit proof</li>
              <li><strong className="text-white">2. Agents availability:</strong> Every stored condition for inference (models, contexts) must be provably retrievable at the same height</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">TheseusStore Deep Dive</h2>
            
            <p className="text-gray-400 mb-6">
              TheseusStore is the availability layer, handling gigabytes of model weights and agent context on-chain.
            </p>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-900 border border-gray-800 rounded p-6">
                  <h3 className="text-lg font-medium mb-3">Model Storage</h3>
                  <p className="text-gray-400 text-sm">
                    Immutable weights (Reed-Solomon encoded) addressed by content hash. Cold storage optimized, enforced by miner staking. Tensor Commits require minimal liveness.
                  </p>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded p-6">
                  <h3 className="text-lg font-medium mb-3">Context Storage</h3>
                  <p className="text-gray-400 text-sm">
                    Mutable agent data (conversations, embeddings, RAG, fine-tuning). Reed-Solomon encoded with faster retrieval. Updates as agents evolve.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-3">Agent State Synchronization</h3>
                <p className="text-gray-400 mb-4">
                  Dual-ledger pattern:
                </p>
                <div className="bg-gray-900 border border-gray-800 rounded p-6">
                  <div className="space-y-3">
                    <div>
                      <strong className="text-white">On-Chain:</strong>
                      <p className="text-gray-400 mt-1">Critical variables (balances, model versions, config) in agent state root</p>
                    </div>
                    <div>
                      <strong className="text-white">Off-Chain:</strong>
                      <p className="text-gray-400 mt-1">Large context (PDFs, embeddings, RAG) in TheseusStore with memory anchors</p>
                    </div>
                    <div>
                      <strong className="text-white">Sync:</strong>
                      <p className="text-gray-400 mt-1">libp2p diff-sync keeps replicas consistent via last-write-wins + optional semantic merge</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Prover and Verifier Selection</h2>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-900 border border-gray-800 rounded p-6">
                  <h3 className="text-lg font-medium mb-3">Provers</h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Run full forward passes. VRF selects by capacity + stake.
                  </p>
                  <p className="text-gray-400 text-xs">
                    Publish hardware specs → Registry tracks on-chain → VRF filters (RAM ≥ model size) → Cache popular models
                  </p>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded p-6">
                  <h3 className="text-lg font-medium mb-3">Verifiers</h3>
                  <p className="text-gray-400 text-sm mb-3">
                    All active verifiers check every inference.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                    <div>Never download weights</div>
                    <div>~2ms per check</div>
                    <div>1K validators → 100 jobs &lt;1s</div>
                    <div>2/3 agreement for finality</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-3">Liveness Mathematics</h3>
                <p className="text-gray-400 mb-4">
                  With honest-stake h and n eligible provers:
                </p>
                <div className="bg-gray-900 border border-gray-800 rounded p-4 font-mono text-sm text-gray-300">
                  Pr(Liveness) = 1 - (1 - h)ⁿ
                </div>
                <p className="text-gray-400 mt-4">
                  h = 0.33, n = 10 → ≥98% chance at least one honest prover chosen.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Transaction Lifecycle</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-2">1. Model Deployment</h3>
                <p className="text-gray-400">
                  Developer uploads weights (with model&apos;s Tensor Commit) to TheseusStore
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-2">2. Inference Transaction</h3>
                <p className="text-gray-400">
                  User (human or agent) submits &#123;modelRoot, input, maxGas&#125; to AIVM
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-2">3. Block Proposal</h3>
                <p className="text-gray-400">
                  Validator packages model and inference TXs and includes latest TheseusStore root
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-2">4. Execution & Proofing</h3>
                <p className="text-gray-400">
                  AIVM runs the model and emits a Tensor Commit receipt
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-lg font-medium mb-2">5. Finality</h3>
                <p className="text-gray-400">
                  PoS finalizes the block; TheseusStore miners pin any new context/model shards
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Inter-Process Interfaces</h2>
            <p className="text-gray-400 mb-6">
              Processes communicate over gRPC/libp2p. Block headers carry state root, model-set Merkle root, and 
              Tensor Commit receipts, keeping execution, storage, and consensus cryptographically coupled.
            </p>
          </section>

          <div className="border-t border-gray-800 pt-8">
            <div className="grid sm:grid-cols-2 gap-4">
              <Link 
                href="/docs/aivm"
                className="block p-4 border border-gray-800 hover:border-gray-600 transition-colors"
              >
                <h3 className="font-medium mb-2">AIVM Details →</h3>
                <p className="text-sm text-gray-400">Deep dive into the execution layer</p>
              </Link>
              <Link 
                href="/docs/tensor-commits"
                className="block p-4 border border-gray-800 hover:border-gray-600 transition-colors"
              >
                <h3 className="font-medium mb-2">Tensor Commits →</h3>
                <p className="text-sm text-gray-400">Learn about proof mechanisms</p>
              </Link>
            </div>
          </div>
        </div>
    </div>
  );
}

