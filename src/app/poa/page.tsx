import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Pages/Home/Header";
import Footer from "@/components/Pages/Home/Footer";
import SectionHeader from "@/components/Pages/Home/SectionHeader";
import { FIXTURE_AGENTS, FIXTURE_AGENT_IDS } from "@/lib/poa/fixtures";
import { chainMode } from "@/lib/poa/chain";
import ChainModeBanner from "./_components/ChainModeBanner";
import AgentLookupBar from "./_components/AgentLookupBar";
import Glyph from "./_components/Glyph";

// /poa is split for two distinct user-sets:
//   1. Verifiers (the larger audience) — paste an address, get the credential.
//      The whole landing is built around this single action so it reads as
//      "an app", not a marketing page.
//   2. Operators — claim a credential for an agent they control. Linked from
//      a smaller secondary section; the actual mint flow lives on /poa/claim
//      since it's controller-keyed and stateful.

export const metadata: Metadata = {
  title: "Proof of Agenthood",
  description:
    "Confirm an agent's identity. Paste an SS58 address — open to anyone, no wallet required.",
  alternates: { canonical: "/poa" },
};

export default function PoaLanding() {
  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-transparent dark:text-white">
      <Header />
      <ChainModeBanner mode={chainMode()} />

      {/* Slim title strip — just the wordmark, no marketing card. */}
      <section className="px-6 pt-24 pb-2 lg:pt-28">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            label="Proof of Agenthood"
            number="00"
            className="mb-0"
          />
        </div>
      </section>

      {/* Primary action: verify. */}
      <section className="px-6 pt-12 pb-8 lg:pt-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-serif text-5xl leading-[1.05] tracking-[-0.01em] text-slate-900 sm:text-6xl dark:text-white">
            Is this agent who it says it is?
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
            Paste an SS58 address to see whether it&apos;s a registered Theseus
            agent and what credential it holds. Open to anyone — no wallet, no
            permission.
          </p>

          <AgentLookupBar
            className="mt-8"
            variant="prominent"
            showLabel={false}
            autoFocus
          />

          <div className="mt-5 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-[12.5px] text-slate-500 dark:text-slate-400">
            <span className="font-mono uppercase tracking-[0.18em] text-[10.5px] text-slate-500 dark:text-slate-400">
              try:
            </span>
            {FIXTURE_AGENT_IDS.map((id) => (
              <Link
                key={id}
                href={`/poa/${id}`}
                className="text-slate-700 underline decoration-slate-400/60 underline-offset-[4px] hover:text-indigo-700 hover:decoration-indigo-400 dark:text-slate-200 dark:hover:text-indigo-300"
              >
                {FIXTURE_AGENTS[id].name}
              </Link>
            ))}
          </div>

          <details className="group mt-7 border-t border-slate-300/70 pt-5 dark:border-slate-700/55">
            <summary className="flex cursor-pointer items-center gap-2 text-[12.5px] text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">
              <span
                aria-hidden
                className="font-mono text-[12px] text-slate-400 transition-transform group-open:rotate-90 dark:text-slate-500"
              >
                ▸
              </span>
              First time here? What is this?
            </summary>
            <div className="mt-3 max-w-xl space-y-3 text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                Theseus agents are autonomous programs that run on-chain — they
                hold their own keys, balance, and behavior graph. Most of the
                time they act on someone&apos;s behalf, but anyone interacting
                with one wants to know: is this really{" "}
                <em>that</em> agent? Has its capability surface changed?
              </p>
              <p>
                A Proof of Agenthood credential is a portable, signed receipt
                of what the chain says about an agent — its name, capabilities,
                verification grade, and the controller key (if any). You can
                verify it without trusting us: paste the JWS into{" "}
                <Link
                  className="text-indigo-700 underline underline-offset-[4px] dark:text-indigo-300"
                  href="/poa/verify"
                >
                  /poa/verify
                </Link>
                , fetch our public JWKS, or use any JOSE-compatible library.
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                <Glyph name="sigil" size={12} className="mr-1 inline align-text-bottom" />
                Try a demo:{" "}
                <Link
                  className="text-indigo-700 underline underline-offset-[4px] dark:text-indigo-300"
                  href={`/poa/${FIXTURE_AGENT_IDS[0]}`}
                >
                  Iris Treasury →
                </Link>
              </p>
            </div>
          </details>

          <p className="mt-8 text-[12.5px] text-slate-500 dark:text-slate-400">
            Have a JWS credential to verify, or want to copy the verification
            recipe in your stack?{" "}
            <Link
              className="text-indigo-700 underline underline-offset-[4px] dark:text-indigo-300"
              href="/poa/verify"
            >
              Verify a JWS →
            </Link>
          </p>
        </div>
      </section>

      {/* Secondary: claim. */}
      <section className="px-6 pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="mx-auto max-w-3xl border-t border-slate-300/70 pt-10 dark:border-slate-700/55">
          <SectionHeader
            label="Operate an agent? Sign its identity."
            number="01"
            className="mb-6"
          />
          <p className="max-w-xl text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
            Mint a portable credential signed against your agent&apos;s current
            chain state. The mint flow asks the controller to sign a one-time
            nonce, then publishes a public credential page that anyone can
            verify without further help from you.
          </p>
          <Link
            href="/poa/claim"
            className="primary-cta mt-8 inline-flex items-center rounded-md px-7 py-3.5 text-base font-medium tracking-wide"
          >
            Claim a credential →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
