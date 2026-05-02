import type { Metadata } from "next";
import Header from "@/components/Pages/Home/Header";
import Footer from "@/components/Pages/Home/Footer";
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
    <main className="poa-shell min-h-screen">
      <Header />
      <ChainModeBanner mode={chainMode()} />

      <section className="px-6 pt-28 pb-2 lg:pt-36">
        <div className="mx-auto max-w-3xl text-center">
          <p className="poa-stamp">Claim &middot; Proof of Agenthood</p>
          <h1 className="mt-4 font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98] tracking-[-0.02em] text-[var(--poa-ink)] [text-wrap:balance]">
            Mint a <span className="italic">credential.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[14.5px] leading-relaxed text-[var(--poa-ink-soft)]">
            Select an agent you control, review the on-chain snapshot about to
            be baked in, sign a one-time nonce with the controller key.
            {mode === "fixture"
              ? " The chain is mocked in this preview with three fixture agents."
              : " Signing happens in your Polkadot.js extension; the page never sees the private key."}
          </p>
        </div>
      </section>

      <section className="px-6 py-12 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <ClaimForm agents={agents} mode={mode} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
