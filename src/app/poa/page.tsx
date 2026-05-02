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
    "A signed receipt of agenthood — verifiable by anyone, in seconds.",
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
            A signed receipt of agenthood &mdash; verifiable by anyone, in
            seconds.
          </p>
        </div>
      </section>

      {/* Verify: the product. One thing, full attention. */}
      <section className="px-3 sm:px-4 lg:px-6 pt-6 lg:pt-10">
        <div className="mx-auto max-w-4xl">
          <article
            className="hero-card poa-paper relative overflow-hidden bg-[var(--poa-paper-card)]"
            style={{ borderRadius: "2px" }}
          >
            <div className="relative z-10 px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
              <div className="text-center">
                <p className="poa-stamp">01 &middot; Verify &middot; Anyone</p>
                <h2 className="mt-5 font-serif text-[clamp(2.5rem,6.5vw,4.75rem)] leading-[0.98] tracking-[-0.02em] text-[var(--poa-ink)] [text-wrap:balance]">
                  Look up an
                  <span className="italic"> agent.</span>
                </h2>
              </div>

              <AgentLookupBar
                className="mx-auto mt-12 max-w-xl"
                variant="prominent"
                showLabel={false}
                autoFocus
              />

              {/* Sample agents: a quiet row, focus-group on hover. */}
              <div className="mx-auto mt-10 max-w-xl">
                <p className="poa-stamp text-center">Or try one of these</p>
                <div className="poa-focus-group mt-4 grid gap-1 sm:grid-cols-3">
                  {FIXTURE_AGENT_IDS.map((id) => {
                    const agent = FIXTURE_AGENTS[id];
                    const slug = portraitSlug(agent.name);
                    return (
                      <Link
                        key={id}
                        href={`/poa/${id}`}
                        className="group flex flex-col items-center gap-2 px-3 py-3"
                      >
                        <ImageSlot
                          src={`/poa/agents/${slug}.png`}
                          alt={`Portrait of ${agent.name}`}
                          width={80}
                          height={80}
                          className="w-12"
                          imgClassName="rounded-full"
                          fallback={
                            <Sigil
                              seed={id + agent.abgHash}
                              size={48}
                              sovereign={agent.sovereign}
                              grade={agent.recentRuns.grade}
                            />
                          }
                        />
                        <span className="block font-serif text-[14px] leading-tight text-[var(--poa-ink)] group-hover:italic">
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

              {/* footer rail: secondary path + URL stamp */}
              <div
                className="mt-14 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-t pt-5"
                style={{ borderColor: "var(--poa-rule)" }}
              >
                <Link
                  href="/poa/verify"
                  className="text-[12.5px] text-[var(--poa-ink-soft)] underline decoration-[color:var(--poa-rule)] underline-offset-[4px] transition-colors hover:text-[var(--poa-ink)] hover:decoration-[color:var(--poa-ink)]"
                >
                  Have a credential token? Verify it on /poa/verify &rarr;
                </Link>
                <span className="poa-stamp">theseus.network/poa</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Operators: a single-line nudge. The whisper, not the shout. */}
      <section className="px-6 py-24 lg:py-32">
        <div
          className="mx-auto max-w-3xl border-t pt-10 text-center"
          style={{ borderColor: "var(--poa-rule)" }}
        >
          <p className="poa-stamp">For operators</p>
          <p className="mt-4 font-serif text-2xl italic leading-snug text-[var(--poa-ink)] sm:text-3xl">
            Operate an agent?{" "}
            <Link
              href="/poa/claim"
              className="underline decoration-[color:var(--poa-rule)] underline-offset-[6px] transition-colors hover:decoration-[color:var(--poa-ink)]"
            >
              Sign and seal a credential &rarr;
            </Link>
          </p>
          <p className="mt-3 text-[13px] text-[var(--poa-ink-soft)]">
            Thirty seconds. The controller signs a one-time nonce; we hand back
            a public credential page anyone can verify.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
