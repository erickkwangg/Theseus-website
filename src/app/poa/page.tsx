import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Pages/Home/Header";
import Footer from "@/components/Pages/Home/Footer";
import { FIXTURE_AGENTS, FIXTURE_AGENT_IDS } from "@/lib/poa/fixtures";
import { chainMode } from "@/lib/poa/chain";
import ChainModeBanner from "./_components/ChainModeBanner";
import AgentLookupBar from "./_components/AgentLookupBar";
import Sigil from "./_components/Sigil";
import ImageSlot from "./_components/ImageSlot";

function portraitSlug(name: string): string {
  return name.toLowerCase().split(" ")[0];
}

// /poa landing: editorial-luxe register.
// One artifact above the fold (the credential, large and on its own),
// one product (Verify), and a single-line nudge for the operator path.

export const metadata: Metadata = {
  title: "Proof of Agenthood",
  description:
    "A signed credential for an AI agent that anyone can verify in seconds.",
  alternates: { canonical: "/poa" },
};

export default function PoaLanding() {
  return (
    <main className="poa-shell min-h-screen">
      <Header />
      <ChainModeBanner mode={chainMode()} />

      {/* Hero: title and tagline. The specimen lives in the lookup section
          below, not as a separate artifact above. */}
      <section className="px-4 pt-28 pb-10 lg:pt-36 lg:pb-12">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h1 className="font-serif text-[clamp(3rem,8vw,5.75rem)] leading-[0.95] tracking-[-0.02em] text-[var(--poa-ink)] [text-wrap:balance]">
            Proof of <span className="italic">Agenthood.</span>
          </h1>
          <p className="mt-6 max-w-xl font-serif text-lg italic leading-snug text-[var(--poa-ink-soft)] sm:text-xl">
            A signed credential for an AI agent that anyone can verify in
            seconds.
          </p>
        </div>
      </section>

      {/* Two peer products. Equal weight, side by side at lg. */}
      <section className="px-3 sm:px-4 lg:px-6 pt-6 lg:pt-10 pb-24 lg:pb-32">
        <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-2 lg:gap-6">
          {/* 01: Verify */}
          <article
            className="hero-card poa-paper relative flex flex-col overflow-hidden bg-[var(--poa-paper-card)]"
            style={{ borderRadius: "2px" }}
          >
            <div className="relative z-10 flex flex-1 flex-col px-6 py-12 sm:px-10 sm:py-14 lg:px-12">
              <p className="poa-stamp">01 &middot; Verify &middot; Anyone</p>
              <h2 className="mt-5 font-serif text-[clamp(2rem,4.6vw,3.5rem)] leading-[0.98] tracking-[-0.02em] text-[var(--poa-ink)] [text-wrap:balance]">
                Look up an
                <span className="italic"> agent.</span>
              </h2>
              <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-[var(--poa-ink-soft)]">
                Paste an SS58 address or pick one of the samples below. You
                don&apos;t need a wallet or an account.
              </p>

              <AgentLookupBar
                className="mt-8"
                variant="prominent"
                showLabel={false}
                autoFocus
              />

              <div className="mt-8">
                <p className="poa-stamp">Or try</p>
                <div className="poa-focus-group mt-3 grid grid-cols-3 gap-1">
                  {FIXTURE_AGENT_IDS.map((id) => {
                    const agent = FIXTURE_AGENTS[id];
                    const slug = portraitSlug(agent.name);
                    return (
                      <Link
                        key={id}
                        href={`/poa/${id}`}
                        className="group flex flex-col items-center gap-2 px-2 py-3"
                      >
                        <ImageSlot
                          src={`/poa/agents/${slug}.png`}
                          alt={`Portrait of ${agent.name}`}
                          width={80}
                          height={80}
                          className="w-11"
                          imgClassName="rounded-full"
                          fallback={
                            <Sigil
                              seed={id + agent.abgHash}
                              size={44}
                              sovereign={agent.sovereign}
                              grade={agent.recentRuns.grade}
                            />
                          }
                        />
                        <span className="block text-center font-serif text-[13px] leading-tight text-[var(--poa-ink)] group-hover:italic">
                          {agent.name}
                        </span>
                        <span className="poa-stamp">
                          {agent.sovereign ? "sovereign" : "controller"}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div
                className="mt-auto flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-t pt-5"
                style={{ borderColor: "var(--poa-rule)", marginTop: "auto" }}
              >
                <Link
                  href="/poa/verify"
                  className="text-[12.5px] text-[var(--poa-ink-soft)] underline decoration-[color:var(--poa-rule)] underline-offset-[4px] transition-colors hover:text-[var(--poa-ink)] hover:decoration-[color:var(--poa-ink)]"
                >
                  Have a credential token? Verify it &rarr;
                </Link>
                <span className="poa-stamp">/poa</span>
              </div>
            </div>
          </article>

          {/* 02: Create */}
          <article
            className="hero-card poa-paper relative flex flex-col overflow-hidden bg-[var(--poa-paper-card)]"
            style={{ borderRadius: "2px" }}
          >
            <div className="relative z-10 flex flex-1 flex-col px-6 py-12 sm:px-10 sm:py-14 lg:px-12">
              <p className="poa-stamp">02 &middot; Create &middot; Operators</p>
              <h2 className="mt-5 font-serif text-[clamp(2rem,4.6vw,3.5rem)] leading-[0.98] tracking-[-0.02em] text-[var(--poa-ink)] [text-wrap:balance]">
                Create your
                <span className="italic"> credential.</span>
              </h2>
              <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-[var(--poa-ink-soft)]">
                Operators create a signed credential for their agent using the
                controller key. You can revoke it at any time.
              </p>

              <Link
                href="/poa/claim"
                className="cta-ink mt-8 inline-flex w-fit items-center px-6 py-3 text-sm font-medium tracking-wide"
              >
                Begin &rarr;
              </Link>

              <ul className="mt-8 space-y-3">
                <li className="grid grid-cols-[80px_1fr] items-baseline gap-x-4">
                  <span className="poa-stamp">~30s</span>
                  <span className="text-[13px] leading-relaxed text-[var(--poa-ink-soft)]">
                    Controller signs a one-time nonce in their wallet.
                  </span>
                </li>
                <li className="grid grid-cols-[80px_1fr] items-baseline gap-x-4">
                  <span className="poa-stamp">Public</span>
                  <span className="text-[13px] leading-relaxed text-[var(--poa-ink-soft)]">
                    A shareable credential page at{" "}
                    <code className="font-mono text-[12px]">
                      /poa/&lt;agentId&gt;
                    </code>
                    .
                  </span>
                </li>
                <li className="grid grid-cols-[80px_1fr] items-baseline gap-x-4">
                  <span className="poa-stamp">Revocable</span>
                  <span className="text-[13px] leading-relaxed text-[var(--poa-ink-soft)]">
                    Retire it any time; verifiers see the status update on
                    the next check.
                  </span>
                </li>
              </ul>

              <div
                className="mt-auto flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-t pt-5"
                style={{ borderColor: "var(--poa-rule)", marginTop: "auto" }}
              >
                <span className="text-[12.5px] text-[var(--poa-ink-soft)]">
                  Browser wallet extension required.
                </span>
                <span className="poa-stamp">/poa/claim</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}
