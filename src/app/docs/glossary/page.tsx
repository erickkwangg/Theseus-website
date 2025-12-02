import Link from "next/link";
import { BookOpen, ArrowRight, Search } from "lucide-react";

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
    term: "Civic Agents",
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
    <div className="docs-content">
      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs mb-4">
          <BookOpen className="h-3 w-3" />
          Reference
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">
          Glossary
        </h1>
        <p className="text-xl text-gray-400 leading-relaxed">
          Key terms and definitions used in Theseus.
        </p>
      </div>
      
      <div className="prose prose-invert max-w-none">
        {/* Quick Stats */}
        <div className="docs-card mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Search className="h-4 w-4" />
            <span>{glossaryTerms.length} terms defined</span>
          </div>
        </div>

        {/* Glossary Terms */}
        <div className="space-y-4">
          {glossaryTerms
            .sort((a, b) => a.term.localeCompare(b.term))
            .map((item) => (
              <div 
                key={item.term} 
                id={item.term.toLowerCase().replace(/[^a-z0-9]/g, "-")}
                className="docs-card group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-lg font-medium mb-2 text-white group-hover:text-blue-400 transition-colors">
                      {item.term}
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.definition}
                    </p>
                  </div>
                  {item.link && (
                    <Link 
                      href={item.link}
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors shrink-0 no-underline flex items-center gap-1"
                    >
                      Learn more <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
        </div>

        {/* Navigation */}
        <div className="border-t border-gray-800 pt-8 mt-12">
          <Link 
            href="/docs"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg transition-all font-medium no-underline"
          >
            ← Back to Docs Home
          </Link>
        </div>
      </div>
    </div>
  );
}
