import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Pages/Home/Header";
import Footer from "@/components/Pages/Home/Footer";
import { chainMode } from "@/lib/poa/chain";
import ChainModeBanner from "../_components/ChainModeBanner";
import PoaNav from "../_components/PoaNav";
import VerifyForm from "./VerifyForm";
import VerificationRecipes from "./VerificationRecipes";
import { JwsShape, BadgeMockup } from "../_components/Diagrams";
import ImageSlot from "../_components/ImageSlot";

export const metadata: Metadata = {
  title: "Verify a Proof of Agenthood credential",
  description:
    "Paste a credential token to check the signature and freshness. Anyone can verify a credential without a wallet.",
  alternates: { canonical: "/poa/verify" },
  openGraph: {
    title: "Verify a Proof of Agenthood credential",
    description:
      "Paste a credential token. We check the signature with our public key and report whether the chain still agrees.",
    url: "https://theseus.network/poa/verify",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verify a Proof of Agenthood credential",
    description:
      "Paste a credential token. We check the signature with our public key and report whether the chain still agrees.",
  },
};

export default function VerifyPage() {
  return (
    <main className="poa-shell min-h-screen">
      <Header />
      <div className="pt-16">
        <ChainModeBanner mode={chainMode()} />
        <PoaNav />
      </div>

      {/* Hero: a single instruction. No diagram, no chrome. */}
      <section className="px-6 pt-28 pb-2 lg:pt-36">
        <div className="mx-auto max-w-3xl text-center">
          <p className="poa-stamp">Verify &middot; Proof of Agenthood</p>
          <h1 className="mt-4 font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98] tracking-[-0.02em] text-[var(--poa-ink)] [text-wrap:balance]">
            Verify a <span className="italic">credential.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[14.5px] leading-relaxed text-[var(--poa-ink-soft)]">
            Paste the credential token issued by{" "}
            <code className="font-mono">theseus.network/poa</code>. Or, to look
            up an agent by address,{" "}
            <Link
              href="/poa"
              className="text-[var(--poa-ink)] underline decoration-[color:var(--poa-rule)] underline-offset-[4px] transition-colors hover:decoration-[color:var(--poa-ink)]"
            >
              start at /poa
            </Link>
            .
          </p>
        </div>
      </section>

      {/* The form. Spare. */}
      <section className="px-6 pt-12 pb-8 lg:pt-16">
        <div className="mx-auto max-w-[820px]">
          <VerifyForm />
        </div>
      </section>

      {/* "What is a credential token?" hidden until asked. */}
      <section className="px-6 pb-12">
        <div className="mx-auto max-w-[820px]">
          <details className="group">
            <summary className="poa-stamp cursor-pointer list-none transition-colors hover:text-[var(--poa-ink)]">
              <span className="group-open:hidden">+ What is a credential token?</span>
              <span className="hidden group-open:inline">&minus; What is a credential token?</span>
            </summary>
            <div className="mt-6 grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-10">
              <ImageSlot
                src="/poa/verify-flow.png"
                alt="Editorial diagram: a credential token is checked against a key, yielding claims and a check seal."
                width={1400}
                height={500}
                className="w-full max-w-[360px]"
                imgClassName="rounded-sm"
                fallback={
                  <JwsShape className="w-full max-w-[360px] text-[var(--poa-ink-soft)]" />
                }
              />
              <p className="text-[13.5px] leading-relaxed text-[var(--poa-ink-soft)]">
                A credential token is a long string with three parts joined by
                dots. The first two are public data (who, what, when); the
                third is a cryptographic signature only we can produce. We
                check that signature with our public key (standard JWS / JWKS
                if you&apos;re wondering).
              </p>
            </div>
          </details>
        </div>
      </section>

      {/* For developers: verify it elsewhere. */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-[1100px]">
          <div
            className="mb-10 border-t pt-8"
            style={{ borderColor: "var(--poa-rule)" }}
          >
            <p className="poa-stamp">02 &middot; Verify elsewhere</p>
            <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-[var(--poa-ink-soft)]">
              The credential is a compact JWS signed with our Ed25519 key. The
              public JWK is at{" "}
              <code className="font-mono">/poa/.well-known/jwks.json</code>.
              Any JOSE-compatible library will verify it.
            </p>
            <p className="mt-3 max-w-2xl text-[12.5px] leading-relaxed text-[var(--poa-sepia)]">
              For programmatic gating, match against{" "}
              <code className="font-mono">
                claims.agent.capabilities.intentTypes
              </code>{" "}
              (the signed array of raw strings). The{" "}
              <code className="font-mono">bundles</code> field returned by{" "}
              <code className="font-mono">/poa/api/verify</code> is a derived
              display helper that can change without revoking credentials, so
              don&apos;t treat it as a contract.
            </p>
            <p className="mt-3 max-w-2xl text-[12.5px] leading-relaxed text-[var(--poa-sepia)]">
              Verifying from your agent: if you&apos;re writing a Theseus agent
              in <span className="font-mono">SHIP</span>, call PoA through a
              verification tool. If you&apos;re using{" "}
              <span className="font-mono">VIC-HTN</span> to compile intents,
              register PoA as a Logical Guardian invariant. Both paths hit the
              same{" "}
              <code className="font-mono">POST /poa/api/verify</code> endpoint
              as the cURL and library recipes.
            </p>
          </div>

          <VerificationRecipes />

          <div className="mt-12 grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-10">
            <ImageSlot
              src="/poa/badge-in-context.png"
              alt="A laptop showing a third-party site embedding a verified-agent badge."
              width={1600}
              height={900}
              className="w-full max-w-[360px]"
              imgClassName="rounded-sm"
              fallback={
                <BadgeMockup className="w-full max-w-[360px] text-[var(--poa-ink-soft)]" />
              }
            />
            <p className="max-w-md text-[13.5px] leading-relaxed text-[var(--poa-ink-soft)]">
              The point of a verified credential is that someone else uses it.
              A protocol fronting your agent on its own page can embed a small
              &ldquo;verified&rdquo; badge that links back to{" "}
              <code className="font-mono">/poa/&lt;agentId&gt;</code>. We
              don&apos;t ship a hosted widget yet. Render whatever you like
              from the signed claims.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
