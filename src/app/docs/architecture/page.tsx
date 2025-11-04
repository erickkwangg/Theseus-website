import Link from "next/link";

export default function ArchitecturePage() {
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
        <h1 className="text-4xl sm:text-5xl font-light mb-8">System Architecture</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-gray-400 mb-8">
            Theseus is built on a three-layer architecture designed specifically for AI workloads, combining execution, 
            storage, and consensus in a unified system.
          </p>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Three-Layer Stack</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-xl font-medium mb-3">Execution Layer: AIVM</h3>
                <p className="text-gray-400 mb-4">
                  Deterministic, tensor-native execution of inference transactions via Tensor Commits. The AIVM handles:
                </p>
                <ul className="space-y-2 text-gray-400 list-none">
                  <li>• Matrix multiplication and tensor operations</li>
                  <li>• Agent scheduling and execution interface</li>
                  <li>• Proof generation and integration</li>
                  <li>• Natural language to bytecode translation (SHIP)</li>
                </ul>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-xl font-medium mb-3">Availability Layer: TheseusStore</h3>
                <p className="text-gray-400 mb-4">
                  Chunked, erasure-coded storage and retrieval of immutable model weights and mutable agent contexts:
                </p>
                <ul className="space-y-2 text-gray-400 list-none">
                  <li>• Erasure-coded model weight storage with Reed-Solomon parity</li>
                  <li>• Mutable agent context management (RAG data, fine-tuning, etc.)</li>
                  <li>• Storage miner incentives for data availability</li>
                  <li>• On-chain model and context blob Merkle roots</li>
                </ul>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded p-6">
                <h3 className="text-xl font-medium mb-3">Consensus Layer: Proof of Stake</h3>
                <p className="text-gray-400 mb-4">
                  Block ordering and state finalization with AI-specific enhancements:
                </p>
                <ul className="space-y-2 text-gray-400 list-none">
                  <li>• HotStuff-inspired BFT consensus</li>
                  <li>• Model-transaction coupling (blocks can't finalize without valid model roots)</li>
                  <li>• VRF-based validator selection</li>
                  <li>• One-block finality under honest-majority stake</li>
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
              Theseus requires a native, first-class on-chain storage of model weights and agent context. TheseusStore 
              is the Agent Availability Layer for Theseus, handling gigabytes of data per model.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-3">Model Storage</h3>
                <p className="text-gray-400 mb-4">
                  Model weights are immutable and addressed through content hash. Storage process:
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li>• Models are split into blobs with Reed-Solomon parity</li>
                  <li>• Storage is enforced by storage-miner staking</li>
                  <li>• Cold storage optimization (like AWS S3) - retrieval doesn't need to be extremely quick</li>
                  <li>• Tensor Commits require minimal liveness for secure inference</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-3">Context Storage</h3>
                <p className="text-gray-400 mb-4">
                  Agent contexts are mutable and need quick retrieval:
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li>• Conversation transcripts, vector embeddings, policy checkpoints</li>
                  <li>• RAG databases and fine-tuning data</li>
                  <li>• Stored with Reed-Solomon encoding</li>
                  <li>• Context is updated frequently as agents develop</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-3">Agent State Synchronization</h3>
                <p className="text-gray-400 mb-4">
                  Agents use a dual-ledger pattern for state management:
                </p>
                <div className="bg-gray-900 border border-gray-800 rounded p-6">
                  <div className="space-y-3">
                    <div>
                      <strong className="text-white">On-Chain Checkpoints:</strong>
                      <p className="text-gray-400 mt-1">Critical variables (balances, last model versions, config flags) live directly inside the agent's state root</p>
                    </div>
                    <div>
                      <strong className="text-white">Off-Chain Memory Vault:</strong>
                      <p className="text-gray-400 mt-1">Bulky context data (PDFs, embeddings, RAG logs) stored in TheseusStore with periodic memory anchors</p>
                    </div>
                    <div>
                      <strong className="text-white">Diff-Sync Protocol:</strong>
                      <p className="text-gray-400 mt-1">Agents sync states over libp2p, keeping replicas consistent without global locks via last-write-wins plus optional semantic merge</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-light mb-6">Prover and Verifier Selection</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-3">Provers</h3>
                <p className="text-gray-400 mb-4">
                  Provers run the heavy work—full forward passes—and are selected via VRF lottery based on capacity:
                </p>
                <div className="bg-gray-900 border border-gray-800 rounded p-6">
                  <ul className="space-y-2 text-gray-400">
                    <li>• Provers publish hardware specs (240gb VRAM, 512gb SYSRAM, 25gbps bandwidth)</li>
                    <li>• Capacity Registry tracks declared resources on-chain</li>
                    <li>• VRF lottery filters by RAM ≥ model size, then stake-weighted selection</li>
                    <li>• Popular models kept in RAM proactively for frequent use</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-3">Verifiers</h3>
                <p className="text-gray-400 mb-4">
                  Every verifier in the active set verifies every single inference:
                </p>
                <div className="bg-gray-900 border border-gray-800 rounded p-6">
                  <ul className="space-y-2 text-gray-400">
                    <li>• Verifiers never download model weights</li>
                    <li>• Check time: ~2ms on modern CPU for proof verification</li>
                    <li>• 1,000 validators can confirm 100 simultaneous prover jobs in under 1 second</li>
                    <li>• 2/3 verifier agreement needed for consensus</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-3">Liveness Mathematics</h3>
                <p className="text-gray-400 mb-4">
                  With honest-stake fraction h and n eligible provers for a given model:
                </p>
                <div className="bg-gray-900 border border-gray-800 rounded p-4 font-mono text-sm text-gray-300">
                  Pr(Liveness) = 1 - (1 - h)ⁿ
                </div>
                <p className="text-gray-400 mt-4">
                  Even h = 0.33 and n = 10 gives ≥ 98% probability that at least one honest prover is chosen, 
                  ensuring high availability for inference requests.
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
                  Developer uploads weights (with model's Tensor Commit) to TheseusStore
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
              All three processes communicate over gRPC/libp2p channels. A common block header carries the state root, 
              the model-set Merkle root, and batched AIVM/Tensor commit receipts, ensuring that execution, storage, 
              and consensus stay cryptographically coupled.
            </p>

            <div className="bg-gray-900 border border-gray-800 rounded p-6">
              <p className="text-gray-400">
                This architecture ensures that agent logic remains stateful, verifiable, and decentralized—the three 
                pillars enabling true AI sovereignty on Theseus.
              </p>
            </div>
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
    </div>
  );
}

