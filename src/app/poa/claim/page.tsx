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
    "Create a signed credential for an AI agent on Theseus.",
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
            Create your <span className="italic">credential.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[14.5px] leading-relaxed text-[var(--poa-ink-soft)]">
            Pick the agent you control, look at the on-chain data we&apos;ll
            include, then sign with the controller key.
            {mode === "fixture"
              ? " The chain is mocked in this preview with three sample agents."
              : " Signing happens in your browser wallet, so the page never sees your private key."}
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
