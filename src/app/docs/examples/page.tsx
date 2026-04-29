import Link from "next/link";
import type { Metadata } from "next";
import { Puzzle, Bot, Zap, Rocket, Play, Lock } from "lucide-react";
import CodeBlock from "@/components/docs/CodeBlock";
import Callout from "@/components/docs/Callout";
import { DocsPageJsonLd } from "@/components/JsonLd";
import PrevNext from "@/components/docs/PrevNext";

export const metadata: Metadata = {
  title: "Examples",
  description:
    "Full SHIP examples and ecosystem walkthroughs for building autonomous agents on Theseus.",
  keywords: ["Theseus examples", "agent examples", "SHIP examples", "AIVM patterns"],
};

export default function ExamplesPage() {
  return (
    <div className="docs-content">
      <DocsPageJsonLd title="Examples" description="Full SHIP examples and ecosystem walkthroughs for building autonomous agents on Theseus." slug="examples" />
      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/35 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-xs mb-4">
          <Puzzle className="h-3 w-3" />
          Development
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">
          Code Examples
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          Full SHIP programs and patterns for building agents on Theseus.
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        {/* Try first */}
        <Callout type="info" title="Want to try without installing?">
          <p className="mb-3">
            The playground runs the example below with a simulated trace. No install required.
          </p>
          <Link
            href="/playground"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg transition-all text-sm font-medium no-underline"
          >
            <Play className="h-4 w-4" />
            Open the playground
          </Link>
        </Callout>

        {/* The full SHIP program */}
        <section className="mb-12">
          <h2 id="market" className="text-2xl font-medium mb-3">Inference plus contract call</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            A MarketCreator agent. It receives a natural-language request, asks a model for structured
            market parameters, and calls the prediction-market contract to actually create the market.
          </p>
          <CodeBlock language="text" filename="market_creator.ship">{`#[agent(name = "MarketCreator", version = 1, ship = "1.0")]

const gpt_5_1: bytes32 = 0xe496...f117;
const CREATE_MARKET_SELECTOR: bytes4 = 0x01000001;

struct MarketParams {
  question: string,
  options: string[],
  deadline_blocks: number,
}

#[entry]
node start(request: string) {
  messages.push(system("Generate structured market params"));
  messages.push(user(request));
  goto(analyze);
}

#[model]
node analyze() {
  let params = model(gpt_5_1)
    .schema(MarketParams)
    .invoke(messages);
  goto(call_contract);
}

node call_contract() {
  let call_data = contracts.encode_call(
    CREATE_MARKET_SELECTOR, params
  );
  contracts.call(
    PREDICTION_MARKET_CONTRACT,
    call_data,
    0n,                    // value
    10000000000n           // gas budget
  );
}`}</CodeBlock>
          <p className="text-slate-600 dark:text-gray-500 text-sm mt-3">
            <strong className="text-slate-900 dark:text-white">What to notice:</strong> the agent and the contract are
            separate on-chain entities. The agent does the reasoning; the contract enforces the rules
            for accepting markets. Either side can re-invoke the other in subsequent blocks.
          </p>
        </section>

        {/* Registration patterns */}
        <section className="mb-12">
          <h2 id="registration" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-700 dark:text-purple-400">
              <Bot className="h-5 w-5" />
            </span>
            Registration patterns
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The same SHIP code can be deployed in three modes by changing the registration fields.
            See <Link href="/docs/agents" className="text-indigo-700 dark:text-indigo-300 hover:underline no-underline">Agents &amp; Models</Link> for the full field list.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="docs-card">
              <h3 className="text-sm font-medium mb-2 text-slate-900 dark:text-white">Managed (human-owned)</h3>
              <CodeBlock language="text" filename="managed">{`autonomy_flag = 0
controller_key = 0x1234...
resource_quota = 1000000`}</CodeBlock>
              <p className="text-slate-600 dark:text-gray-500 text-xs mt-2">
                Operates independently but the controller key can pause or upgrade.
              </p>
            </div>
            <div className="docs-card">
              <h3 className="text-sm font-medium mb-2 text-slate-900 dark:text-white">Sovereign (self-directed)</h3>
              <CodeBlock language="text" filename="sovereign">{`autonomy_flag = 1
controller_key = None
stake = 10000 THE`}</CodeBlock>
              <p className="text-slate-600 dark:text-gray-500 text-xs mt-2">
                No human override. Stake is slashable on dishonest behavior.
              </p>
            </div>
            <div className="docs-card">
              <h3 className="text-sm font-medium mb-2 text-slate-900 dark:text-white">Civic (public-serving)</h3>
              <CodeBlock language="text" filename="civic">{`autonomy_flag = 1
permissions = { public: true }
revenue_destination = dao_address`}</CodeBlock>
              <p className="text-slate-600 dark:text-gray-500 text-xs mt-2">
                Sovereign in execution; revenue accrues to a public destination.
              </p>
            </div>
          </div>
        </section>

        {/* AIVM-level snippets */}
        <section className="mb-12">
          <h2 id="aivm-level" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-green-500/10 text-green-700 dark:text-green-400">
              <Zap className="h-5 w-5" />
            </span>
            AIVM-level patterns
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            For lower-level integration, AIVM exposes inference and pipelining primitives directly.
            SHIP compiles down to these.
          </p>

          <div className="space-y-4">
            <div className="docs-card">
              <h3 className="text-sm font-medium mb-2 text-slate-900 dark:text-white">Single inference call</h3>
              <CodeBlock language="text" filename="inference.aivm">{`MODEL_INFER(model_addr, tensor_input, fee_limit)`}</CodeBlock>
            </div>
            <div className="docs-card">
              <h3 className="text-sm font-medium mb-2 text-slate-900 dark:text-white">Multi-model pipeline (encoder/decoder, RAG, MoE)</h3>
              <CodeBlock language="text" filename="pipeline.aivm">{`TLOAD(encoder) -> TMATMUL -> TCUSTOM ->
TLOAD(decoder) -> TMATMUL -> TCOMMIT`}</CodeBlock>
            </div>
          </div>
        </section>

        {/* Ecosystem */}
        <section className="mb-12">
          <h2 id="ecosystem" className="text-2xl font-medium mb-4">Ecosystem repositories</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Two ecosystem projects ship full SHIP implementations. Repository links are shared with
            preview access.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="docs-card border-indigo-200 dark:border-indigo-900/50">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                <h3 className="text-lg font-medium">proof-of-lobster</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Persistent agent identity, scheduled execution, and social interaction flows. Useful pattern for any agent that needs to run on a heartbeat and post results.
              </p>
            </div>
            <div className="docs-card border-indigo-200 dark:border-indigo-900/50">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                <h3 className="text-lg font-medium">the-prediction-market</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Agent-to-contract orchestration with resolver workflows. Useful pattern for any application where an agent decides and a contract enforces.
              </p>
            </div>
          </div>
        </section>

        {/* Onramp */}
        <Callout type="tip" title="Ready to deploy these for real?">
          <p className="mb-3">
            The SHIP example on this page deploys with the standard CLI. The CLI binary and
            testnet endpoint are shared with preview access.
          </p>
          <Link
            href="/launch"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg transition-all text-sm font-medium no-underline"
          >
            <Rocket className="h-4 w-4" />
            Request preview access
          </Link>
        </Callout>

        {/* Navigation */}
        <div className="border-t border-slate-200 dark:border-gray-800 pt-8 grid sm:grid-cols-2 gap-4 mt-12">
          <Link href="/docs/ship" className="group no-underline">
            <div className="docs-card h-full">
              <p className="text-sm text-slate-600 dark:text-gray-500 mb-1">Previous</p>
              <h3 className="font-medium group-hover:text-indigo-700 dark:text-indigo-300 transition-colors">← SHIP Language</h3>
            </div>
          </Link>
          <Link href="/docs/agents" className="group no-underline">
            <div className="docs-card h-full text-right">
              <p className="text-sm text-slate-600 dark:text-gray-500 mb-1">Next</p>
              <h3 className="font-medium group-hover:text-indigo-700 dark:text-indigo-300 transition-colors">Agents &amp; Models →</h3>
            </div>
          </Link>
        </div>
      </div>
      <PrevNext current="examples" />

    </div>
  );
}
