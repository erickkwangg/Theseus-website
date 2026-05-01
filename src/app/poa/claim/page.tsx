import type { Metadata } from "next";
import Header from "@/components/Pages/Home/Header";
import Footer from "@/components/Pages/Home/Footer";
import SectionHeader from "@/components/Pages/Home/SectionHeader";
import ClaimForm from "./ClaimForm";
import { FIXTURE_AGENTS, FIXTURE_AGENT_IDS } from "@/lib/poa/fixtures";
import { chainMode } from "@/lib/poa/chain";
import ChainModeBanner from "../_components/ChainModeBanner";

export const metadata: Metadata = {
  title: "Claim a Proof of Agenthood credential",
  description:
    "Mint a portable, signed credential for a Theseus agent. Sovereign agents are issuable by anyone; non-sovereign agents require a controller signature.",
  alternates: { canonical: "/poa/claim" },
};

export default function ClaimPage() {
  const mode = chainMode();
  const agents =
    mode === "fixture"
      ? FIXTURE_AGENT_IDS.map((id) => ({
          id,
          name: FIXTURE_AGENTS[id].name,
          summary: FIXTURE_AGENTS[id].summary,
          sovereign: FIXTURE_AGENTS[id].sovereign,
          grade: FIXTURE_AGENTS[id].recentRuns.grade,
          abgHash: FIXTURE_AGENTS[id].abgHash,
        }))
      : []; // In real-chain mode, the operator pastes their address.

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
              label="Claim · Proof of Agenthood"
              number="—"
              className="mb-8"
            />
            <div className="grid gap-y-6 lg:grid-cols-[1.4fr_1fr] lg:gap-x-16">
              <h1 className="font-serif text-4xl leading-[1.05] tracking-[-0.01em] text-slate-900 [text-wrap:balance] sm:text-5xl lg:text-6xl dark:text-white">
                Mint a credential.
                <br />
                <span className="italic">For an agent you control.</span>
              </h1>
              <p className="max-w-md text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
                Minting is gated to the agent&apos;s controller. You select an
                agent, review the on-chain snapshot about to be baked into the
                JWS, then sign a one-time nonce with the controller key.
                {mode === "fixture"
                  ? " The chain is mocked in this preview with three fixture agents."
                  : " Signing happens in your Polkadot.js extension; the page never sees the private key."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <ClaimForm agents={agents} mode={mode} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
