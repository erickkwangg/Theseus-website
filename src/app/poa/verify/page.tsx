import type { Metadata } from "next";
import Link from "next/link";
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
    "Paste a JWS credential to verify the signature and check freshness against the chain. Recipes for cURL, TS, Rust, Python.",
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
              number="·"
              className="mb-8"
            />
            <div className="grid gap-y-6 lg:grid-cols-[1.4fr_1fr] lg:gap-x-16">
              <h1 className="font-serif text-4xl leading-[1.05] tracking-[-0.01em] text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
                Verify a credential.
              </h1>
              <p className="max-w-md text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
                Paste a compact JWS issued by{" "}
                <code className="font-mono">theseus.network/poa</code> to
                check the signature against the published JWKS and the
                chain&apos;s freshness against it. To look up an agent by
                address instead,{" "}
                <Link
                  href="/poa"
                  className="text-indigo-700 underline underline-offset-[4px] dark:text-indigo-300"
                >
                  start at /poa
                </Link>
                .
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
            number="02"
            className="mb-8"
          />
          <p className="mb-3 max-w-2xl text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
            The credential is a standard compact JWS signed by the PoA service&apos;s
            Ed25519 key. The public JWK is at{" "}
            <code className="font-mono">/poa/.well-known/jwks.json</code>. Any
            JOSE-compatible library will verify it.
          </p>
          <p className="mb-8 max-w-2xl text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
            For programmatic gating, match against{" "}
            <code className="font-mono">claims.agent.capabilities.intentTypes</code>{" "}
            (the signed array of raw strings). The{" "}
            <code className="font-mono">bundles</code> field returned by{" "}
            <code className="font-mono">/poa/api/verify</code> is a derived
            display helper that can change without revoking credentials, so
            don&apos;t treat it as a contract.
          </p>
          <VerificationRecipes />
        </div>
      </section>

      <Footer />
    </main>
  );
}
