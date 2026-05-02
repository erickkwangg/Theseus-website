import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Header from "@/components/Pages/Home/Header";
import Footer from "@/components/Pages/Home/Footer";
import SectionHeader from "@/components/Pages/Home/SectionHeader";
import { FIXTURE_AGENTS, FIXTURE_AGENT_IDS } from "@/lib/poa/fixtures";
import { chainMode } from "@/lib/poa/chain";
import ChainModeBanner from "./_components/ChainModeBanner";
import AgentLookupBar from "./_components/AgentLookupBar";
import Glyph from "./_components/Glyph";
import FreshnessGauge from "./_components/FreshnessGauge";
import Seal from "./_components/Seal";
import {
  VerifyFlow,
  ClaimFlow,
  CredentialAnatomy,
} from "./_components/Diagrams";

// /poa landing: two distinct product cards. Each one looks and feels like
// its own product (numbered, wordmarked, tagged with its audience, and
// stamped with its own URL), not a section of a page. Verify is dominant
// (larger, autofocused) because it's the bigger user-set. Claim is the
// smaller follow-on for operators.

export const metadata: Metadata = {
  title: "Proof of Agenthood",
  description:
    "Two utilities for one question: is this agent what it says it is?",
  alternates: { canonical: "/poa" },
};

export default function PoaLanding() {
  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-transparent dark:text-white">
      <Header />
      <ChainModeBanner mode={chainMode()} />

      {/* Slim hero strip: just the wordmark + the question. */}
      <section className="px-6 pt-24 pb-2 lg:pt-28">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            label="Proof of Agenthood"
            number="00"
            className="mb-8"
          />
          <p className="font-serif text-2xl leading-[1.15] text-slate-800 sm:text-3xl lg:text-4xl dark:text-slate-100">
            Two utilities for one question:
            <br />
            <span className="italic">is this agent what it says it is?</span>
          </p>
        </div>
      </section>

      {/* Product 01: VERIFY (dominant) */}
      <section className="px-2 sm:px-3 lg:px-4 pt-10 lg:pt-14">
        <div className="mx-auto max-w-5xl">
          <article className="hero-card poa-paper relative overflow-hidden rounded-2xl bg-[#F1EAE1] lg:rounded-3xl dark:bg-slate-900">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 soft-grid [mask-image:linear-gradient(to_bottom,black,black_72%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black,black_72%,transparent)]"
            />
            <div className="relative z-10 px-6 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16">
              {/* card header: number + audience tag */}
              <div className="flex items-baseline justify-between font-mono text-[10.5px] uppercase tracking-[0.22em] text-slate-700 dark:text-slate-200">
                <span className="flex items-center gap-2">
                  <span className="text-slate-400 dark:text-slate-500">01</span>
                  <span className="text-slate-700 dark:text-slate-200">
                    Verify
                  </span>
                </span>
                <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <Glyph name="attest" size={13} />
                  Anyone · no wallet
                </span>
              </div>

              <div className="mt-10 grid items-end gap-y-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-x-14">
                <div className="min-w-0">
                  {/* wordmark */}
                  <h2 className="font-serif text-[clamp(3rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.02em] text-slate-900 [text-wrap:balance] dark:text-white">
                    Look up an
                    <br />
                    <span className="italic">agent.</span>
                  </h2>
                  <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
                    Paste an SS58 address. See whether it&apos;s a registered
                    Theseus agent and what its credential says about its
                    capability surface, verification grade, and controller.
                  </p>

                  <AgentLookupBar
                    className="mt-8 max-w-xl"
                    variant="prominent"
                    showLabel={false}
                    autoFocus
                  />

                  <div className="mt-5 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-[12.5px] text-slate-700 dark:text-slate-300">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      try:
                    </span>
                    {FIXTURE_AGENT_IDS.map((id) => (
                      <Link
                        key={id}
                        href={`/poa/${id}`}
                        className="text-slate-800 underline decoration-slate-500/50 underline-offset-[4px] hover:text-indigo-700 hover:decoration-indigo-400 dark:text-slate-100 dark:hover:text-indigo-300"
                      >
                        {FIXTURE_AGENTS[id].name}
                      </Link>
                    ))}
                  </div>

                </div>

                {/* product mark: what verify returns */}
                <div className="flex flex-col items-center gap-3 lg:items-end">
                  <FreshnessGauge status="current" size={120} />
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    you get back: a freshness check
                  </span>
                </div>
              </div>

              {/* Verify flow: kills a wall of prose. */}
              <div className="mt-10 border-t border-slate-400/30 pt-7 dark:border-slate-500/30">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-slate-700 dark:text-slate-200">
                    What happens
                  </span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    server-side, no auth
                  </span>
                </div>
                <VerifyFlow className="mt-4 w-full max-w-[480px]" />
              </div>

              {/* First-time onboarding: visual instead of prose. */}
              <details className="group mt-8">
                <summary className="flex cursor-pointer items-center gap-2 text-[12.5px] text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100">
                  <span
                    aria-hidden
                    className="font-mono text-[12px] text-slate-500 transition-transform group-open:rotate-90 dark:text-slate-400"
                  >
                    ▸
                  </span>
                  First time here? See the anatomy of a credential.
                </summary>
                <div className="mt-5 grid gap-y-6 sm:grid-cols-[auto_1fr] sm:gap-x-8">
                  <CredentialAnatomy className="w-full max-w-[460px]" />
                  <div className="space-y-3 text-[13px] leading-relaxed text-slate-700 dark:text-slate-300">
                    <p>
                      Theseus agents are autonomous programs that run on-chain.
                      Anyone interacting with one wants to know it&apos;s really
                      that agent.
                    </p>
                    <p>
                      A credential is a portable, signed receipt of what the
                      chain says. Verify it without trusting us: paste the JWS,
                      fetch the public JWKS, or use any JOSE-compatible library.
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-slate-700 dark:text-slate-200">
                    Where this fits in Theseus
                  </span>
                  <div className="mt-3 max-w-[760px] overflow-hidden rounded border border-slate-400/30 bg-white/40 p-2 dark:border-slate-500/30 dark:bg-slate-900/40">
                    <Image
                      src="/theseus-architecture-diagram.png"
                      alt="Theseus architecture: chain, provers, blessed enclave, bridge"
                      width={1600}
                      height={900}
                      className="h-auto w-full"
                    />
                  </div>
                </div>
              </details>

              {/* footer: URL stamp + secondary action */}
              <div className="mt-12 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-slate-400/30 pt-5 dark:border-slate-500/30">
                <Link
                  href="/poa/verify"
                  className="text-[12.5px] text-slate-700 underline decoration-slate-500/50 underline-offset-[4px] hover:text-indigo-700 hover:decoration-indigo-400 dark:text-slate-200 dark:hover:text-indigo-300"
                >
                  Have a JWS to verify? Paste it on /poa/verify →
                </Link>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  theseus.network/poa
                </span>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Product 02: CLAIM (smaller, secondary) */}
      <section className="px-2 sm:px-3 lg:px-4 pt-12 pb-24 lg:pt-16 lg:pb-32">
        <div className="mx-auto max-w-5xl">
          <article className="hero-card poa-paper poa-double-frame relative overflow-hidden rounded-2xl border border-indigo-700/25 bg-[#F1EAE1] lg:rounded-3xl dark:border-indigo-300/25 dark:bg-slate-900">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 soft-grid [mask-image:linear-gradient(to_bottom,black,black_72%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black,black_72%,transparent)]"
            />
            <div className="relative z-10 px-6 py-9 sm:px-12 sm:py-11 lg:px-16 lg:py-12">
              <div className="flex items-baseline justify-between font-mono text-[10.5px] uppercase tracking-[0.22em] text-slate-700 dark:text-slate-200">
                <span className="flex items-center gap-2">
                  <span className="text-slate-400 dark:text-slate-500">02</span>
                  <span className="text-slate-700 dark:text-slate-200">
                    Claim
                  </span>
                </span>
                <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <Glyph name="key" size={13} />
                  Operators · controller key required
                </span>
              </div>

              <div className="mt-8 grid items-center gap-y-8 lg:grid-cols-[minmax(0,1.6fr)_auto] lg:gap-x-14">
                <div className="min-w-0">
                  <h2 className="font-serif text-[clamp(2.25rem,5.5vw,4rem)] leading-[0.98] tracking-[-0.02em] text-slate-900 [text-wrap:balance] dark:text-white">
                    Sign your agent&apos;s
                    <br />
                    <span className="italic">identity.</span>
                  </h2>
                  <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-slate-700 dark:text-slate-300">
                    Mint a portable credential signed against your agent&apos;s
                    current chain state. The flow takes about thirty seconds.
                    The controller signs a one-time nonce, we hand back a
                    public credential page anyone can verify.
                  </p>
                  <Link
                    href="/poa/claim"
                    className="primary-cta mt-7 inline-flex items-center rounded-md px-7 py-3.5 text-base font-medium tracking-wide"
                  >
                    Mint a credential →
                  </Link>
                </div>

                <div className="flex flex-col items-center gap-3 lg:items-end">
                  <Seal
                    status="attested"
                    label="Attested"
                    caption="THESEUS"
                    size={104}
                  />
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    you publish: a signed seal
                  </span>
                </div>
              </div>

              {/* Claim flow */}
              <div className="mt-8 border-t border-slate-400/30 pt-6 dark:border-slate-500/30">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-slate-700 dark:text-slate-200">
                    What you sign
                  </span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    one-time nonce
                  </span>
                </div>
                <ClaimFlow className="mt-4 w-full max-w-[480px]" />
              </div>

              <div className="mt-10 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-slate-400/30 pt-5 dark:border-slate-500/30">
                <span className="text-[12.5px] text-slate-600 dark:text-slate-400">
                  No wallet for fixture mode. Real-chain mint uses Polkadot.js
                  extension.
                </span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  theseus.network/poa/claim
                </span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}
