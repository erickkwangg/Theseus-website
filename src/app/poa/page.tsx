import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Pages/Home/Header";
import Footer from "@/components/Pages/Home/Footer";
import SectionHeader from "@/components/Pages/Home/SectionHeader";
import { FIXTURE_AGENTS, FIXTURE_AGENT_IDS } from "@/lib/poa/fixtures";
import { chainMode } from "@/lib/poa/chain";
import SpecimenCard from "./_components/SpecimenCard";
import ChainModeBanner from "./_components/ChainModeBanner";
import Sigil, { checksumFromSeed } from "./_components/Sigil";
import AgentLookupBar from "./_components/AgentLookupBar";

export const metadata: Metadata = {
  title: "Proof of Agenthood",
  description:
    "Verifiable credentials for autonomous agents on Theseus. Issued once, signed, revoked when invariants change.",
  alternates: { canonical: "/poa" },
};

export default function PoaLanding() {
  return (
    <main className="bg-white text-slate-900 dark:bg-transparent dark:text-white">
      <Header />
      <ChainModeBanner mode={chainMode()} />

      {/* Hero card — matches homepage Hero pattern */}
      <section className="px-2 sm:px-3 lg:px-4 pt-20 lg:pt-24 pb-2 sm:pb-3 lg:pb-4">
        <div className="hero-card relative min-h-[480px] overflow-hidden rounded-2xl bg-[#F1EAE1] lg:rounded-3xl dark:bg-slate-900 sm:min-h-[600px]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 soft-grid [mask-image:linear-gradient(to_bottom,black,black_72%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black,black_72%,transparent)]"
          />

          <div className="relative z-10 mx-auto max-w-[1700px] px-6 sm:px-12 lg:px-16 py-12 lg:py-16">
            <div className="grid items-start gap-12 lg:grid-cols-[1.55fr_1fr] lg:gap-20">
              <div>
                <SectionHeader
                  label="Proof of Agenthood"
                  number="00"
                  className="mb-10 lg:mb-14"
                />
                <h1 className="font-serif text-5xl font-normal leading-[1.02] tracking-[-0.02em] text-slate-900 sm:text-7xl lg:text-[clamp(4rem,6.4vw,8rem)] dark:text-white">
                  A signed
                  <br />
                  <span className="italic">receipt</span> of agenthood.
                </h1>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl dark:text-slate-300">
                  A portable credential that says: this address is a Theseus
                  agent — registered, with a known capability surface and a
                  known verification record. Signed once, revoked when the
                  on-chain invariants change.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5 sm:mt-12">
                  <Link
                    href="/poa/claim"
                    className="primary-cta inline-flex items-center rounded-md px-8 py-4 text-base font-medium tracking-wide"
                  >
                    Claim a credential
                  </Link>
                  <Link
                    href="/poa/verify"
                    className="text-base font-medium text-slate-800 underline decoration-slate-400/70 underline-offset-[6px] transition-colors hover:decoration-current dark:text-slate-100 dark:decoration-slate-500/70"
                  >
                    Verify or look up an agent →
                  </Link>
                </div>
                <p className="mt-3 max-w-md text-[12.5px] text-slate-600 dark:text-slate-400">
                  Minting is for the agent&apos;s controller. Verifying is open
                  to anyone.
                </p>
              </div>

              <div className="lg:pt-2">
                <SpecimenCard />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three principles — typographic, no icon-cards */}
      <section className="px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            label="What the credential attests"
            number="01"
            className="mb-12"
          />
          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            <Principle
              n="01"
              title="Identity, not vibes"
              body="Every claim resolves to Theseus Chain state — registration, ABG hash, capability surface, sovereignty, controller, recent inference verification. The credential is just a signed snapshot of what the chain already says."
            />
            <Principle
              n="02"
              title="Issued once"
              body="Sovereign agents stay sovereign. So the credential is minted at claim time and held until the watcher detects a state change worth revoking on. No live RPC roundtrip in the consumer's path."
            />
            <Principle
              n="03"
              title="Honest about verification"
              body="Not every inference is KZG-proven yet — at alpha, lite provers cover the long tail with signatures only. The credential surfaces this directly so consumers can gate on grade."
            />
          </div>
        </div>
      </section>

      {/* Demo agent table — typographic, not card grid */}
      <section className="px-6 pb-24 lg:pb-32">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            label="Specimens in the preview"
            number="02"
            className="mb-10"
          />
          <p className="mb-6 max-w-2xl text-slate-600 dark:text-slate-300">
            Three fixture agents are wired up against an in-memory chain
            reader. Open a credential to see its document; visit{" "}
            <Link
              className="text-indigo-700 underline underline-offset-[4px] dark:text-indigo-300"
              href="/poa/claim"
            >
              /poa/claim
            </Link>{" "}
            to mint a fresh one.
          </p>
          <AgentLookupBar className="mb-12 max-w-2xl" />


          <div className="border-t border-slate-300/70 dark:border-slate-700/55">
            {FIXTURE_AGENT_IDS.map((id, i) => {
              const agent = FIXTURE_AGENTS[id];
              const checksum = checksumFromSeed(id + agent.abgHash);
              return (
                <Link
                  key={id}
                  href={`/poa/${id}`}
                  className="group grid items-center gap-x-4 gap-y-1 border-b border-slate-300/70 px-2 py-6 transition-colors hover:bg-slate-50/70 sm:grid-cols-[40px_56px_minmax(0,1.4fr)_minmax(0,1.1fr)_auto] sm:gap-x-8 dark:border-slate-700/55 dark:hover:bg-slate-900/40"
                >
                  <span className="font-mono text-[11px] tabular-nums text-slate-400 dark:text-slate-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Sigil seed={id + agent.abgHash} size={40} />
                  <div className="min-w-0">
                    <p className="font-serif text-[22px] leading-tight tracking-tight text-slate-900 group-hover:text-indigo-700 dark:text-slate-50 dark:group-hover:text-indigo-300">
                      {agent.name}
                    </p>
                    {agent.summary && (
                      <p className="mt-1.5 line-clamp-2 text-[13px] leading-snug text-slate-600 dark:text-slate-300">
                        {agent.summary}
                      </p>
                    )}
                  </div>
                  <p className="hidden font-mono text-[10.5px] uppercase tracking-[0.16em] text-slate-500 sm:block dark:text-slate-400">
                    {agent.sovereign ? "sovereign" : "controller-retained"}
                    <br />
                    verification: {agent.recentRuns.grade}
                  </p>
                  <span className="font-serif text-2xl italic leading-none text-slate-700 dark:text-slate-100">
                    {checksum}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Principle({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: string;
}) {
  return (
    <div>
      <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
        {n}
      </span>
      <h3 className="mt-3 font-serif text-2xl leading-snug text-slate-900 dark:text-slate-50">
        {title}
      </h3>
      <p className="mt-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
        {body}
      </p>
    </div>
  );
}
