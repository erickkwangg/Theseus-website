import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Pages/Home/Header";
import Footer from "@/components/Pages/Home/Footer";
import { FIXTURE_AGENTS } from "@/lib/poa/fixtures";
import { chainMode } from "@/lib/poa/chain";
import { credentialStore } from "@/lib/poa/store";
import { ensureFixtureCredentials } from "@/lib/poa/seed";
import ChainModeBanner from "./_components/ChainModeBanner";
import PoaNav from "./_components/PoaNav";
import AgentLookupBar from "./_components/AgentLookupBar";
import Sigil, { checksumFromSeed } from "./_components/Sigil";
import ImageSlot from "./_components/ImageSlot";
import RelativeTime from "./_components/RelativeTime";
import StatsStrip from "@/components/Pages/Home/StatsStrip";

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
  openGraph: {
    title: "Proof of Agenthood",
    description:
      "A signed credential for an AI agent that anyone can verify in seconds.",
    url: "https://theseus.network/poa",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proof of Agenthood",
    description:
      "A signed credential for an AI agent that anyone can verify in seconds.",
  },
};

export default async function PoaLanding() {
  await ensureFixtureCredentials().catch(() => {});
  let credentials: Awaited<ReturnType<typeof credentialStore.listLatest>> = [];
  try {
    credentials = await credentialStore.listLatest(200);
  } catch {
    /* leave empty; the page still works without the directory section */
  }
  const credentialedIds = new Set(credentials.map((c) => c.agentId));
  const registeredOnly = Object.values(FIXTURE_AGENTS).filter(
    (a) => a.context && !credentialedIds.has(a.agentId),
  );
  return (
    <main className="poa-shell min-h-screen">
      <Header />
      <div className="pt-20">
        <ChainModeBanner mode={chainMode()} />
        <PoaNav />
      </div>

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
            className="hero-card poa-paper relative flex flex-col overflow-hidden rounded-2xl bg-[var(--poa-paper-card)]"
          >
            <div className="relative z-10 flex flex-1 flex-col px-6 py-12 sm:px-10 sm:py-14 lg:px-12">
              <p className="poa-stamp">01 &middot; Look up &middot; Anyone</p>
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
                <p className="text-[13px] leading-relaxed text-[var(--poa-ink-soft)]">
                  Don&apos;t have an address? Every agent with a credential is
                  in the directory below.{" "}
                  <a
                    href="#03"
                    className="underline decoration-[color:var(--poa-rule)] underline-offset-[4px] transition-colors hover:text-[var(--poa-ink)] hover:decoration-[color:var(--poa-ink)]"
                  >
                    Browse all &rarr;
                  </a>
                </p>
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
            className="hero-card poa-paper relative flex flex-col overflow-hidden rounded-2xl bg-[var(--poa-paper-card)]"
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
                    Revoke it any time; verifiers see the status update on
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

      {/* Live counters: the network's heartbeat just above the directory.
          Same component that used to live below the Hero on /. */}
      <section
        id="03"
        className="px-3 sm:px-4 lg:px-6 pt-2 pb-8 lg:pt-4 lg:pb-10"
      >
        <div className="mx-auto max-w-6xl">
          <StatsStrip />
        </div>
      </section>

      {/* 03: Browse the directory — every agent with a credential, plus
          registered agents that have published their context. Folded in
          from the old /poa/agents route so /poa is the single surface. */}
      {(credentials.length > 0 || registeredOnly.length > 0) && (
        <section className="px-3 sm:px-4 lg:px-6 pb-24 lg:pb-32">
          <div className="mx-auto max-w-6xl">
            <div
              className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t pt-10 lg:mb-10"
              style={{ borderColor: "var(--poa-rule)" }}
            >
              <div>
                <p className="poa-stamp">Browse &middot; Directory</p>
                <h2 className="mt-3 font-serif text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[0.98] tracking-[-0.02em] text-[var(--poa-ink)] [text-wrap:balance]">
                  Every credentialed <span className="italic">agent.</span>
                </h2>
              </div>
              <span className="poa-stamp">
                {credentials.length + registeredOnly.length} total
              </span>
            </div>

            {credentials.length > 0 && (
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {credentials.map((c) => {
                  const a = c.claims.agent;
                  const slug = portraitSlug(a.name);
                  const checksum = checksumFromSeed(a.agentId + a.abgHash);
                  const status: "active" | "revoked" = c.revoked
                    ? "revoked"
                    : "active";
                  return (
                    <li key={c.jti}>
                      <Link
                        href={`/poa/${a.agentId}`}
                        className="group flex h-full flex-col gap-3 border p-4 transition-colors hover:border-[var(--poa-ink)]"
                        style={{ borderColor: "var(--poa-rule)" }}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <ImageSlot
                            src={`/poa/agents/${slug}.png`}
                            alt={`Portrait of ${a.name}`}
                            width={80}
                            height={80}
                            className="w-12"
                            imgClassName="rounded-full"
                            fallback={
                              <Sigil
                                seed={a.agentId + a.abgHash}
                                size={48}
                                sovereign={a.sovereign}
                                grade={a.recentRuns.grade}
                              />
                            }
                          />
                          <span className="font-serif text-lg italic text-[var(--poa-ink)]">
                            {checksum}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-serif text-[19px] leading-tight tracking-[-0.01em] text-[var(--poa-ink)] group-hover:italic">
                            {a.name}
                          </p>
                          {a.summary && (
                            <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-snug text-[var(--poa-ink-soft)]">
                              {a.summary}
                            </p>
                          )}
                        </div>
                        <div className="mt-auto flex flex-wrap items-baseline gap-x-3 gap-y-1 pt-2">
                          <span className="poa-stamp">
                            {a.sovereign ? "sovereign" : "controller"}
                          </span>
                          <span className="poa-stamp">
                            {gradeShort(a.recentRuns.grade)}
                          </span>
                          <span
                            className="poa-stamp ml-auto"
                            style={{
                              color:
                                status === "revoked"
                                  ? "var(--poa-destructive)"
                                  : "var(--poa-sepia)",
                            }}
                          >
                            {status === "revoked" ? (
                              "revoked"
                            ) : (
                              <RelativeTime epochMs={c.issuedAt} />
                            )}
                          </span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}

            {registeredOnly.length > 0 && (
              <>
                <div
                  className="mb-6 mt-12 border-t pt-8 lg:mb-8"
                  style={{ borderColor: "var(--poa-rule)" }}
                >
                  <p className="poa-stamp">Registered &middot; published context</p>
                  <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-[var(--poa-ink-soft)]">
                    Agents below publish their system prompt, the inputs they
                    read, and the outputs they commit. Read what the model
                    actually sees.
                  </p>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {registeredOnly.map((a) => {
                    const checksum = checksumFromSeed(a.agentId + a.abgHash);
                    return (
                      <li key={a.agentId}>
                        <Link
                          href={`/poa/${a.agentId}`}
                          className="group flex h-full flex-col gap-3 border p-4 transition-colors hover:border-[var(--poa-ink)]"
                          style={{ borderColor: "var(--poa-rule)" }}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <Sigil
                              seed={a.agentId + a.abgHash}
                              size={48}
                              sovereign={a.sovereign}
                              grade={a.recentRuns.grade}
                            />
                            <span className="font-serif text-lg italic text-[var(--poa-ink)]">
                              {checksum}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="font-serif text-[19px] leading-tight tracking-[-0.01em] text-[var(--poa-ink)] group-hover:italic">
                              {a.name}
                            </p>
                            {a.summary && (
                              <p className="mt-1.5 line-clamp-3 text-[12.5px] leading-snug text-[var(--poa-ink-soft)]">
                                {a.summary}
                              </p>
                            )}
                          </div>
                          <div className="mt-auto flex flex-wrap items-baseline gap-x-3 gap-y-1 pt-2">
                            <span className="poa-stamp">
                              {a.sovereign ? "sovereign" : "controller"}
                            </span>
                            <span className="poa-stamp">
                              {gradeShort(a.recentRuns.grade)}
                            </span>
                            <span
                              className="poa-stamp ml-auto"
                              style={{ color: "var(--poa-sepia)" }}
                            >
                              read context →
                            </span>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}

function gradeShort(g: string): string {
  switch (g) {
    case "full":
      return "kzg";
    case "mixed":
      return "mixed";
    case "lite":
      return "lite";
    default:
      return "·";
  }
}
