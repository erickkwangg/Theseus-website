import Link from "next/link";
import type { Metadata } from "next";
import { BookOpen, ArrowRight } from "lucide-react";
import { DocsPageJsonLd, DefinedTermSetJsonLd } from "@/components/JsonLd";
import PrevNext from "@/components/docs/PrevNext";

const glossaryTerms = [
  {
    term: "AIVM",
    definition: "AI Virtual Machine. The tensor-native runtime that executes agent logic and model inference with deterministic, verifiable results.",
    link: "/docs/aivm"
  },
  {
    term: "Agent",
    definition: "An autonomous program registered on Theseus that can hold $THE, call models, interact with other agents, and execute transactions independently. Authored as a THESEUS.md inside an agent directory; compiled by shipc into a CompiledAgent the chain registers.",
    link: "/docs/agents"
  },
  {
    term: "Agent File",
    definition: "The deployable unit. An agent directory at the root contains a THESEUS.md (the agent: system prompt, frontmatter naming models, native-tools, schedule, sovereign/controller/intent_types) plus optional skills/<name>/SKILL.md siblings for reusable capabilities. OpenClaw-style format.",
    link: "/docs/agents#agent-file-format"
  },
  {
    term: "OpenClaw-style format",
    definition: "The Markdown-with-YAML agent file shape used by personal agent runtimes (Claude Code's CLAUDE.md, similar tools). Theseus adopts the same shape and adds chain-side frontmatter (sovereign, controller, intent_types) read at registration.",
    link: "/docs/agents#agent-file-format"
  },
  {
    term: "THESEUS.md",
    definition: "The top-level agent file in an agent directory. Analog to Claude Code's CLAUDE.md. Canonical frontmatter fields: name (display), id (slug), description, models, native-tools, schedule. Theseus extensions: sovereign, controller, intent_types.",
    link: "/docs/agents#agent-file-format"
  },
  {
    term: "SKILL.md",
    definition: "A reusable capability bundled inside an agent directory under skills/<name>/SKILL.md. Holds domain knowledge for using the native tools. Optional — many agents have none and reference native tools directly.",
    link: "/docs/agents#agent-file-format"
  },
  {
    term: "Autonomy Flag",
    definition: "A registration field that determines whether an agent is human-gated (0) or fully sovereign (1). Sovereign agents can initiate transactions on their own.",
    link: "/docs/agents#agent-registration"
  },
  {
    term: "EOA",
    definition: "Externally Owned Account. In Ethereum, an account controlled by a private key (human). Smart contracts cannot act without EOA triggers.",
    link: "/docs/comparison"
  },
  {
    term: "FLOPs",
    definition: "Floating-Point Operations. The unit used to measure computational cost in AIVM. Gas is priced based on FLOPs rather than generic opcodes.",
    link: "/docs/tokenomics#gas"
  },
  {
    term: "Sovereign Agent",
    definition: "An agent with its own goals and key custody that can collaborate with humans and other agents. No human has override control.",
    link: "/docs/introduction#agency-tiers"
  },
  {
    term: "KZG Commitment",
    definition: "A polynomial commitment scheme used in Tensor Commits for efficient cryptographic verification of model weights and inference results.",
    link: "/docs/tensor-commits"
  },
  {
    term: "Civic Agent",
    definition: "An autonomous agent that serves public interests with transparent reasoning but no personal agenda. Like a neutral arbiter or DAO orchestrator.",
    link: "/docs/introduction#agency-tiers"
  },
  {
    term: "Credential",
    definition: "A signed JWS issued by Proof of Agenthood that captures an on-chain agent's identity, capabilities, and verification grade at a moment in time. Anyone can verify it offline against the public JWKS; revocation is checked against the live chain.",
    link: "/poa"
  },
  {
    term: "Credential Token",
    definition: "The user-facing name for the JWS string issued by Proof of Agenthood. The full credential is three base64url segments (header.payload.signature) joined by dots; verifiers paste it into /poa/verify or pass it to a JOSE-compatible library.",
    link: "/poa/verify"
  },
  {
    term: "Managed Agent",
    definition: "A human-owned agent that operates independently in most cases but has an associated controller key for human overrides.",
    link: "/docs/introduction#agency-tiers"
  },
  {
    term: "Proof of Agenthood",
    definition: "A signed credential layer for Theseus agents at /poa. Anyone can verify; operators sign once with the controller key. Sovereign agents are issuable by anyone; managed agents require a controller signature. Revocation is operator-initiated and reflected on the next verifier check.",
    link: "/poa"
  },
  {
    term: "Prover",
    definition: "A network participant that runs full model inference and generates Tensor Commit proofs. Selected via VRF lottery based on stake and hardware capacity.",
    link: "/docs/architecture#selection"
  },
  {
    term: "SHIP",
    definition: "Structured Hierarchical Instructional Programs. The declarative DSL underneath the THESEUS.md authoring format. Compiled by shipc into a SCALE-encoded CompiledAgent that the chain registers directly — the runtime never sees SHIP source.",
    link: "/docs/ship"
  },
  {
    term: "$THE",
    definition: "The native token of Theseus. Used for gas fees, model inference payments, staking, and agent-managed balances.",
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
    link: "/docs/tensor-commits#terkle-trees"
  },
  {
    term: "TheseusStore",
    definition: "The off-chain data availability layer that holds model weights and agent context. Each blob is content-addressed and pinned to an on-chain root (weights_root for models, context_root per agent), so readers verify integrity via Merkle / Verkle proofs against the anchor — never against the storage layer's say-so.",
    link: "/docs/architecture#theseus-store"
  },
  {
    term: "Verifier",
    definition: "A validator that checks Tensor Commit proofs without re-running inference. Verification takes ~2ms per check.",
    link: "/docs/architecture#selection"
  },
  {
    term: "VRF",
    definition: "Verifiable Random Function. Provides deterministic randomness for prover selection and other on-chain randomness needs.",
    link: "/docs/architecture#selection"
  },
];

export const metadata: Metadata = {
  title: "Glossary",
  description:
    "Reference key terms used across Theseus documentation, including AIVM, Tensor Commits, SHIP, and agent lifecycle concepts.",
  keywords: ["Theseus glossary", "AIVM terms", "Tensor Commits", "SHIP", "agent terminology"],
  alternates: { canonical: "/docs/glossary" },
};

export default function GlossaryPage() {
  return (
    <div className="docs-content">
      <DocsPageJsonLd title="Glossary" description="Reference key terms used across Theseus documentation, including AIVM, Tensor Commits, SHIP, and agent lifecycle concepts." slug="glossary" />
      <DefinedTermSetJsonLd
        name="Theseus Glossary"
        url="https://theseus.network/docs/glossary"
        terms={glossaryTerms.map((t) => ({
          term: t.term,
          definition: t.definition,
          link: t.link,
        }))}
      />
      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/35 bg-indigo-500/10 text-indigo-300 text-xs mb-4">
          <BookOpen className="h-3 w-3" />
          Reference
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-normal mb-4 tracking-[-0.02em] [text-wrap:balance]">
          Glossary
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          Key terms and definitions used in Theseus.
        </p>
      </div>
      
      <div className="prose prose-invert max-w-none">
        <p className="text-sm text-gray-500 mb-6">{glossaryTerms.length} terms defined.</p>

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
                    <h2 className="text-lg font-medium mb-2 text-slate-900 dark:text-white group-hover:text-indigo-300 transition-colors">
                      {item.term}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {item.definition}
                    </p>
                  </div>
                  {item.link && (
                    <Link 
                      href={item.link}
                      className="text-sm text-indigo-300 hover:text-indigo-200 transition-colors shrink-0 no-underline flex items-center gap-1"
                    >
                      Learn more <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
        </div>

        {/* Navigation */}
        <div className="border-t border-slate-200 dark:border-gray-800 pt-8 mt-12">
          <Link 
            href="/docs"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg transition-all font-medium no-underline"
          >
            ← Back to Docs Home
          </Link>
        </div>
      </div>
      <PrevNext current="glossary" />

    </div>
  );
}
