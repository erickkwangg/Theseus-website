import Link from "next/link";

const glossaryTerms = [
  {
    term: "AIVM",
    definition: "AI Virtual Machine. The tensor-native runtime that executes agent logic and model inference with deterministic, verifiable results.",
    link: "/docs/aivm"
  },
  {
    term: "Agent",
    definition: "An autonomous program registered on Theseus that can hold $THE, call models, interact with other agents, and execute transactions without human intervention.",
    link: "/docs/agents"
  },
  {
    term: "Autonomy Flag",
    definition: "A registration field that determines whether an agent is human-gated (0) or fully sovereign (1). Sovereign agents can initiate transactions on their own.",
  },
  {
    term: "EOA",
    definition: "Externally Owned Account. In Ethereum, an account controlled by a private key (human). Smart contracts cannot act without EOA triggers.",
  },
  {
    term: "FLOPs",
    definition: "Floating-Point Operations. The unit used to measure computational cost in AIVM. Gas is priced based on FLOPs rather than generic opcodes.",
  },
  {
    term: "Free AI Person",
    definition: "A sovereign agent with its own goals that can collaborate with humans and other agents. No human has control over it.",
    link: "/docs/introduction#personhood"
  },
  {
    term: "KZG Commitment",
    definition: "A polynomial commitment scheme used in Tensor Commits for efficient cryptographic verification of model weights and inference results.",
    link: "/docs/tensor-commits"
  },
  {
    term: "Lighthouse AI",
    definition: "A sovereign agent that serves public interests with transparent reasoning but no personal agenda. Like a neutral arbiter or DAO orchestrator.",
    link: "/docs/introduction#personhood"
  },
  {
    term: "Proto-AI Person",
    definition: "A human-owned agent that operates independently in most cases but has an associated controller key for human overrides.",
    link: "/docs/introduction#personhood"
  },
  {
    term: "Prover",
    definition: "A network participant that runs full model inference and generates Tensor Commit proofs. Selected via VRF lottery based on stake and hardware capacity.",
    link: "/docs/architecture"
  },
  {
    term: "SHIP",
    definition: "Secure Heterogeneous Inference Programming. A domain-specific language for translating natural language into verifiable AIVM bytecode.",
    link: "/docs/ship"
  },
  {
    term: "$THE",
    definition: "The native token of Theseus. Used for gas fees, model inference payments, staking, and as the first asset AI can truly own.",
    link: "/docs/tokenomics"
  },
  {
    term: "Tensor Commit",
    definition: "A succinct cryptographic proof that verifies model inference was computed correctly. Enables verifiable AI with <1% overhead.",
    link: "/docs/tensor-commits"
  },
  {
    term: "Terkle Tree",
    definition: "A generalization of Merkle Trees for tensors. Enables efficient cryptographic verification of multi-dimensional data like model weights.",
    link: "/docs/tensor-commits"
  },
  {
    term: "TheseusStore",
    definition: "The decentralized storage layer that holds model weights and agent context. Uses Reed-Solomon encoding and storage-miner staking.",
    link: "/docs/architecture"
  },
  {
    term: "Verifier",
    definition: "A validator that checks Tensor Commit proofs without re-running inference. Verification takes ~2ms per check.",
    link: "/docs/architecture"
  },
  {
    term: "VRF",
    definition: "Verifiable Random Function. Provides deterministic randomness for prover selection and other on-chain randomness needs.",
  },
];

export default function GlossaryPage() {
  return (
    <div>
      <h1 className="text-4xl sm:text-5xl font-light mb-8">Glossary</h1>
      
      <div className="prose prose-invert max-w-none">
        <p className="text-xl text-gray-400 mb-8">
          Key terms and concepts in the Theseus ecosystem.
        </p>

        <div className="space-y-6">
          {glossaryTerms
            .sort((a, b) => a.term.localeCompare(b.term))
            .map((item) => (
              <div 
                key={item.term} 
                id={item.term.toLowerCase().replace(/[^a-z0-9]/g, "-")}
                className="border-b border-gray-800 pb-6"
              >
                <h2 className="text-xl font-medium mb-2 text-white">
                  {item.term}
                </h2>
                <p className="text-gray-400 text-sm mb-2">
                  {item.definition}
                </p>
                {item.link && (
                  <Link 
                    href={item.link}
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Learn more →
                  </Link>
                )}
              </div>
            ))}
        </div>

        <div className="border-t border-gray-800 pt-8 mt-12">
          <Link 
            href="/docs"
            className="inline-block bg-white text-black px-6 py-3 hover:bg-gray-200 transition-colors"
          >
            ← Back to Docs Home
          </Link>
        </div>
      </div>
    </div>
  );
}

