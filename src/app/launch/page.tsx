import Link from "next/link";
import type { Metadata } from "next";
import {
  Mail,
  MessageCircle,
  Play,
  ShieldCheck,
  GitBranch,
  Cpu,
  Sparkles,
  Compass,
  Activity,
  BookOpen,
  Rocket,
  FileCode2,
  Boxes,
  Stamp,
  Layers,
} from "lucide-react";
import Header from "@/components/Pages/Home/Header";
import Footer from "@/components/Pages/Home/Footer";
import { Button } from "@/components/ui/button";
import { EXTERNAL_LINKS } from "@/config/links";

export const metadata: Metadata = {
  title: "Launch on Theseus",
  description:
    "Write SHIP, run it in the browser with a verifiable inference proof, land at a Proof of Agenthood profile. The playground is the deploy surface; everything else is supplemental.",
  alternates: { canonical: "/launch" },
  openGraph: {
    type: "website",
    title: "Launch on Theseus",
    description:
      "The playground is the deploy surface for Theseus agents. Write SHIP, run with verifiable proof, land at a PoA profile.",
    url: "/launch",
  },
};

const accessHref = `mailto:${EXTERNAL_LINKS.contactEmail}?subject=${encodeURIComponent(
  "Theseus preview access request"
)}&body=${encodeURIComponent(
  "Hi Theseus team,\n\nI'd like preview access to deploy agents on Theseus. A bit about what I'm building:\n\n"
)}`;

// Same content as /playground, lifted here as a static preview so the
// developer can see what they're about to open before they click.
const SHIP_PREVIEW = `#[agent(name = "MarketCreator", version = 1, ship = "1.0")]

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
    PREDICTION_MARKET_CONTRACT, call_data, 0n, 10000000000n
  );
}`;

const TRACE_STEPS = [
  {
    icon: Cpu,
    label: "Compile SHIP to a CompiledAgent",
    detail: "shipc emits a SCALE-encoded blob the chain decodes into ABG nodes.",
  },
  {
    icon: Sparkles,
    label: "Run inference on selected model",
    detail: "One prover node runs the forward pass.",
  },
  {
    icon: GitBranch,
    label: "Generate Tensor Commit",
    detail: "<1% overhead vs raw inference.",
  },
  {
    icon: ShieldCheck,
    label: "Verified by 3 nodes",
    detail: "KZG pairing checks pass. Result accepted.",
  },
];

export default function LaunchPage() {
  return (
    <main className="min-h-screen site-shell">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 lg:pt-40 pb-16 lg:pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 soft-grid opacity-15 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300/80 mb-6 inline-flex items-center gap-2">
            <Rocket className="h-3 w-3" />
            Developer Preview · v.1.0
          </p>
          <h1 className="font-serif text-[clamp(3rem,7vw,5.5rem)] font-normal leading-[0.95] tracking-[-0.02em] mb-6 text-slate-900 dark:text-slate-100 [text-wrap:balance]">
            Ship your first <span className="italic">agent.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            Write SHIP. Run it in the browser with a verifiable inference proof. Land at a Proof of
            Agenthood profile anyone can verify.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/playground">
              <Button className="primary-cta px-8 py-6 text-base font-medium rounded-md transition-all duration-300 button-press">
                Open the playground
              </Button>
            </Link>
            <a href={accessHref}>
              <Button className="ghost-cta px-8 py-6 text-base font-medium rounded-md transition-all duration-300">
                Request preview access
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Playground preview */}
      <section className="px-6 pb-20 lg:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 lg:mb-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300/80 mb-4">
              The playground in your browser
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[-0.02em] text-slate-900 dark:text-slate-100 mb-4 [text-wrap:balance]">
              Write SHIP. Run it. Get a signed <span className="italic">credential.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base max-w-2xl mx-auto">
              This is the editor and the execution trace, live at{" "}
              <Link
                href="/playground"
                className="text-indigo-600 dark:text-indigo-300 underline underline-offset-4 hover:text-indigo-800 dark:hover:text-white"
              >
                /playground
              </Link>
              . No wallet, no install, no signup.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Editor preview */}
            <div className="rounded-lg overflow-hidden bg-[#060b16] border border-slate-200 dark:border-slate-700/60 shadow-lg dark:shadow-2xl">
              <div className="bg-[#0F172A] px-4 py-2 flex items-center gap-2 border-b border-slate-800/60">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="ml-4 px-3 py-0.5 bg-[#060b16] rounded text-xs text-slate-400 font-mono">
                  market_creator.ship
                </div>
                <div className="ml-auto text-[10px] uppercase tracking-widest text-slate-500">
                  Preview
                </div>
              </div>
              <pre className="scroll-fade-right p-4 font-mono text-[12px] leading-relaxed overflow-x-auto text-slate-200 max-h-[460px]">
                <code>{SHIP_PREVIEW}</code>
              </pre>
            </div>

            {/* Trace preview */}
            <div className="rounded-lg overflow-hidden bg-[#060b16] border border-slate-200 dark:border-slate-700/60 shadow-lg dark:shadow-2xl flex flex-col">
              <div className="bg-[#0F172A] px-4 py-2 flex items-center gap-2 border-b border-slate-800/60">
                <div className="text-xs text-slate-400 font-mono">Execution trace</div>
                <div className="ml-auto flex items-center gap-2">
                  <Link
                    href="/playground"
                    className="primary-cta px-4 py-1.5 text-xs rounded-md inline-flex items-center gap-1.5"
                  >
                    <Play className="h-3 w-3" /> Run in browser
                  </Link>
                </div>
              </div>
              <ul className="flex flex-col divide-y divide-slate-800/60">
                {TRACE_STEPS.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <li key={step.label} className="flex items-start gap-3 px-4 py-3.5">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono mt-0.5 shrink-0">
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 text-[13px] text-slate-100">
                          <Icon className="h-3.5 w-3.5 text-indigo-300" />
                          {step.label}
                        </div>
                        <p className="text-[11.5px] text-slate-400 mt-0.5 leading-relaxed">
                          {step.detail}
                        </p>
                      </div>
                    </li>
                  );
                })}
                <li className="px-4 py-3.5 bg-emerald-500/5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-emerald-400 mb-1">
                    On-chain effect
                  </p>
                  <p className="text-[12.5px] text-slate-200">
                    Market #4129 created · &quot;Will GPT-5 ship by EOY?&quot;
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quickstart: the real shipc compiler, today */}
      <section className="py-20 lg:py-24 px-6 border-t border-slate-200 dark:border-slate-800/70">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 lg:mb-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300/80 mb-4">
              From the browser to your terminal
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[-0.02em] text-slate-900 dark:text-slate-100 mb-4 [text-wrap:balance]">
              The SHIP compiler runs <span className="italic">locally.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base max-w-2xl mx-auto">
              <a
                href="https://github.com/Theseuschain/SHIP"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-300 underline underline-offset-4 hover:text-indigo-800 dark:hover:text-white"
              >
                shipc
              </a>{" "}
              is a Rust CLI that compiles <code className="font-mono text-[13px]">.ship</code> files
              into a canonical <code className="font-mono text-[13px]">CompiledAgent</code> blob,
              ready to be SCALE-encoded for the chain. The compiler is public and open today; the
              chain-deploy half ships with public testnet.
            </p>
          </div>

          <div className="rounded-lg overflow-hidden bg-[#060b16] border border-slate-200 dark:border-slate-700/60 shadow-lg dark:shadow-2xl">
            <div className="bg-[#0F172A] px-4 py-2 flex items-center gap-2 border-b border-slate-800/60">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="ml-4 text-xs text-slate-400 font-mono">~/agents · zsh</div>
              <div className="ml-auto text-[10px] uppercase tracking-widest text-slate-500">
                Real commands, today
              </div>
            </div>
            <pre className="p-5 font-mono text-[13px] leading-relaxed overflow-x-auto text-slate-200 sm:p-6">
              <code>
                <span className="text-slate-500"># install shipc from the public SHIP repo</span>{"\n"}
                <span className="text-indigo-300">$</span> cargo install --git https://github.com/Theseuschain/SHIP shipc{"\n"}
                {"\n"}
                <span className="text-slate-500"># lint the agent (syntax + semantics, no output)</span>{"\n"}
                <span className="text-indigo-300">$</span> shipc validate market_creator.ship{"\n"}
                <span className="text-emerald-400">✓ market_creator.ship is valid</span>{"\n"}
                {"\n"}
                <span className="text-slate-500"># compile to JSON (for tooling, CI, explorers)</span>{"\n"}
                <span className="text-indigo-300">$</span> shipc compile market_creator.ship --json{"\n"}
                {"\n"}
                <span className="text-slate-500"># compile to SCALE-encoded CompiledAgent (chain-ready)</span>{"\n"}
                <span className="text-indigo-300">$</span> shipc compile market_creator.ship --scale-hex{"\n"}
                <span className="text-emerald-400">0x4f2e8a...e4c1</span>{"\n"}
                {"\n"}
                <span className="text-slate-500"># default: write artifacts/agent.ship.json + .scale</span>{"\n"}
                <span className="text-indigo-300">$</span> shipc compile market_creator.ship{"\n"}
                <span className="text-emerald-400">✓ wrote ./artifacts/market_creator.ship.json</span>{"\n"}
                <span className="text-emerald-400">✓ wrote ./artifacts/market_creator.ship.scale</span>
              </code>
            </pre>
          </div>

          <p className="text-center mt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            <a
              href="https://github.com/Theseuschain/SHIP"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-300 underline underline-offset-4 hover:text-indigo-800 dark:hover:text-white"
            >
              github.com/Theseuschain/SHIP →
            </a>{" "}
            · Spec, examples, runtime types · Chain deploy ships with public testnet
          </p>
        </div>
      </section>

      {/* Reference: where to read about each layer */}
      <section className="py-20 lg:py-24 px-6 border-t border-slate-200 dark:border-slate-800/70">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-[-0.02em] mb-4 text-slate-900 dark:text-slate-100 [text-wrap:balance]">
              Reference, by <span className="italic">layer.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base max-w-2xl mx-auto">
              Four doc pages cover the pieces you&apos;ll touch most often.
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <li>
              <Link
                href="/docs/ship"
                className="docs-card group h-full flex flex-col gap-3 hover:border-indigo-400/40 transition-all duration-300"
              >
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 w-fit">
                  <FileCode2 className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                  SHIP language
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Syntax, nodes, model invocation, contract calls. The DSL agents are
                  written in.
                </p>
              </Link>
            </li>
            <li>
              <Link
                href="/docs/aivm"
                className="docs-card group h-full flex flex-col gap-3 hover:border-indigo-400/40 transition-all duration-300"
              >
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 w-fit">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                  AIVM
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  The execution layer. Tensor operations as first-class instructions, gas
                  pricing, host functions.
                </p>
              </Link>
            </li>
            <li>
              <Link
                href="/docs/tensor-commits"
                className="docs-card group h-full flex flex-col gap-3 hover:border-indigo-400/40 transition-all duration-300"
              >
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 w-fit">
                  <Stamp className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                  Tensor Commits
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  How inference proofs work, the prover/verifier split, KZG checks, &lt;1%
                  overhead.
                </p>
              </Link>
            </li>
            <li>
              <Link
                href="/docs/examples"
                className="docs-card group h-full flex flex-col gap-3 hover:border-indigo-400/40 transition-all duration-300"
              >
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 w-fit">
                  <Boxes className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                  Examples
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Reference SHIP programs you can fork. Oracle, governance reviewer,
                  prediction market resolver.
                </p>
              </Link>
            </li>
          </ul>

          <p className="text-center mt-8 text-sm text-slate-600 dark:text-slate-400">
            Want to see what reference implementations are running?{" "}
            <a
              href="https://demo-agents.theseus.network/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-300 underline underline-offset-4 hover:text-indigo-800 dark:hover:text-white"
            >
              demo-agents.theseus.network
            </a>{" "}
            has eight in production.
          </p>
        </div>
      </section>

      {/* Other tools */}
      <section className="py-20 lg:py-24 px-6 border-t border-slate-200 dark:border-slate-800/70 grid-bg">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-[-0.02em] mb-4 text-slate-900 dark:text-slate-100 [text-wrap:balance]">
              The rest of the <span className="italic">surface.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base max-w-2xl mx-auto">
              The playground is the main deploy path. These are the other places you&apos;ll
              spend time when you start building.
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <li>
              <Link
                href="/poa"
                className="docs-card group h-full flex flex-col gap-3 hover:border-indigo-400/40 transition-all duration-300"
              >
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 w-fit">
                  <Compass className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                  PoA directory
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Every Theseus agent with a current Proof of Agenthood credential.
                </p>
              </Link>
            </li>
            <li>
              <Link
                href="/docs"
                className="docs-card group h-full flex flex-col gap-3 hover:border-indigo-400/40 transition-all duration-300"
              >
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 w-fit">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                  Documentation
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  SHIP language reference, AIVM runtime, Tensor Commits, and the full architecture.
                </p>
              </Link>
            </li>
            <li>
              <a
                href="https://demo-agents.theseus.network/"
                target="_blank"
                rel="noopener noreferrer"
                className="docs-card group h-full flex flex-col gap-3 hover:border-indigo-400/40 transition-all duration-300"
              >
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 w-fit">
                  <Rocket className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                  Demo agents
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Eight live agents at demo-agents.theseus.network. Each signs its verdicts.
                </p>
              </a>
            </li>
            <li>
              <div className="docs-card h-full flex flex-col gap-3 opacity-75 cursor-default">
                <div className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 w-fit">
                  <Activity className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-slate-700 dark:text-slate-300">
                  Block explorer
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Browse every chain transaction, inference proof, and agent run.
                </p>
                <span className="mt-auto pt-2 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Shipping soon
                </span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Where things stand — demoted to a small note */}
      <section className="py-12 px-6 border-t border-slate-200 dark:border-slate-800/70">
        <div className="max-w-3xl mx-auto text-center text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          The playground is open without access. The rest of the runtime is in private preview
          while the protocol stabilizes; the source repository is currently closed.{" "}
          <a
            href={accessHref}
            className="text-indigo-600 dark:text-indigo-300 underline underline-offset-4 hover:text-indigo-800 dark:hover:text-white"
          >
            Request preview access →
          </a>
        </div>
      </section>

      {/* Community */}
      <section className="py-20 lg:py-24 px-6 border-t border-slate-200 dark:border-slate-800/70">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-[-0.02em] mb-4 text-slate-900 dark:text-slate-100 [text-wrap:balance]">
            Talk to <span className="italic">us.</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base max-w-2xl mx-auto mb-10">
            Have a question, a use case to validate, or a partnership in mind? The fastest path
            is email.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <a
              href={`mailto:${EXTERNAL_LINKS.contactEmail}`}
              className="docs-card flex items-center gap-4 hover:border-indigo-400/40 transition-all duration-300"
            >
              <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-300">
                <Mail className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-slate-900 dark:text-slate-100">Email us</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {EXTERNAL_LINKS.contactEmail}
                </p>
              </div>
            </a>

            {EXTERNAL_LINKS.discord ? (
              <a
                href={EXTERNAL_LINKS.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="docs-card flex items-center gap-4 hover:border-indigo-400/40 transition-all duration-300"
              >
                <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-300">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-slate-900 dark:text-slate-100">
                    Join the Discord
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Builders and contributors
                  </p>
                </div>
              </a>
            ) : (
              <div className="docs-card flex items-center gap-4 opacity-70">
                <div className="p-2.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-500">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-slate-700 dark:text-slate-300">Discord</h3>
                  <p className="text-sm text-slate-500">Opening soon</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
