import type { Metadata } from "next";
import Header from "@/components/Pages/Home/Header";
import Footer from "@/components/Pages/Home/Footer";
import SectionHeader from "@/components/Pages/Home/SectionHeader";
import { chainMode } from "@/lib/poa/chain";
import ChainModeBanner from "../_components/ChainModeBanner";
import VerifyForm from "./VerifyForm";
import VerificationRecipes from "./VerificationRecipes";

export const metadata: Metadata = {
  title: "Verify a Proof of Agenthood credential",
  description:
    "Look up an agent or paste a JWS credential to check it against the Theseus Chain registry.",
  alternates: { canonical: "/poa/verify" },
};

export default function VerifyPage() {
  return (
    <main className="bg-white text-slate-900 dark:bg-transparent dark:text-white">
      <Header />
      <ChainModeBanner mode={chainMode()} />

      <section className="px-2 sm:px-3 lg:px-4 pt-20 lg:pt-24 pb-2 sm:pb-3 lg:pb-4">
        <div className="hero-card relative overflow-hidden rounded-2xl bg-[#F1EAE1] lg:rounded-3xl dark:bg-slate-900">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 soft-grid [mask-image:linear-gradient(to_bottom,black,black_72%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black,black_72%,transparent)]"
          />
          <div className="relative z-10 mx-auto max-w-[1700px] px-6 sm:px-12 lg:px-16 py-10 lg:py-14">
            <SectionHeader
              label="Verify · Proof of Agenthood"
              number="—"
              className="mb-8"
            />
            <div className="grid gap-y-6 lg:grid-cols-[1.4fr_1fr] lg:gap-x-16">
              <h1 className="font-serif text-4xl leading-[1.05] tracking-[-0.01em] text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
                Check an agent.
                <br />
                <span className="italic">Or check a credential.</span>
              </h1>
              <p className="max-w-md text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
                Anyone can verify here — no wallet, no permission. Look up an
                agent by address, or paste a JWS to check the signature and the
                chain&apos;s freshness against it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:py-20">
        <div className="mx-auto max-w-[1100px]">
          <VerifyForm />
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-[1100px]">
          <SectionHeader
            label="Verify elsewhere"
            number="03"
            className="mb-8"
          />
          <p className="mb-8 max-w-2xl text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
            The credential is a standard compact JWS signed by the PoA service&apos;s
            Ed25519 key. The public JWK is at{" "}
            <code className="font-mono">/poa/.well-known/jwks.json</code>. Any
            JOSE-compatible library will verify it.
          </p>
          <VerificationRecipes />
        </div>
      </section>

      <Footer />
    </main>
  );
}
