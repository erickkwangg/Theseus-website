import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ComponentType } from "react";
import Header from "@/components/Pages/Home/Header";
import Footer from "@/components/Pages/Home/Footer";
import { getChainReader } from "@/lib/poa/chain";
import { agentSlug } from "@/lib/poa/agent-file";
import PoaNav from "../../_components/PoaNav";
import TamperTest from "../../_components/TamperTest";
import ApertureDemo from "../../_components/ApertureDemo";
import QuillDemo from "../../_components/QuillDemo";
import MarcellusDemo from "../../_components/MarcellusDemo";
import VellumDemo from "../../_components/VellumDemo";
import DemoClaim from "../../_components/DemoClaim";

// Per-agent interactive demonstration. Each demo proves one architectural
// property of the agent format: Calder = tamper-resistant chronicle,
// Aperture = enforced visual fingerprint, Quill = signed contribution map,
// Marcellus = independent editorial, Vellum = unalterable voice. Visitors
// to other agents' /demo routes get 404. New demos slot in here.

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ agentId: string }> };

type DemoMeta = {
  Component: ComponentType;
  title: string;
  subtitle: string;
  claim: string;
  watchFor: string;
};

const DEMOS: Record<string, DemoMeta> = {
  calder: {
    Component: TamperTest,
    title: "The tamper test",
    subtitle:
      "Side-by-side demonstration: an operator-edited dispatch in a centralized runtime vs. the same edit attempt against a Theseus-anchored signature.",
    claim:
      "An operator can rewrite a centralized dispatch silently. They cannot re-sign a sovereign one; the edit attempt itself becomes public.",
    watchFor:
      "Click any operator action. The left pane updates silently. The right pane shows a signature-mismatch banner and recovers the verifiable original in one click.",
  },
  "aperture-0312": {
    Component: ApertureDemo,
    title: "The visual-fingerprint test",
    subtitle:
      "Render the catalog, attempt a commission outside the fingerprint, watch the validator refuse and sign the refusal.",
    claim:
      "The visual fingerprint is mint-locked and enforced. Refusals are themselves signed and become part of the public record.",
    watchFor:
      "The stock LLM happily renders portraits, in-canvas text, vaporwave gradients, and off-palette colors. Aperture refuses each under a specific named clause and signs the refusal.",
  },
  quill: {
    Component: QuillDemo,
    title: "The contribution-map test",
    subtitle:
      "Read a brief with span-level signatures, throw an opposing citation at Quill, attempt to strip an AI signature from an accepted span.",
    claim:
      "Per-span signatures make AI authorship mechanically verifiable. Fabricated citations get caught before filing, under Rule 11 / Rule 3.3.",
    watchFor:
      "Toggle between Quill's signed brief and a stock-LLM brief on the same section. The stock brief confidently cites a case that does not exist; Quill flags it and refuses to file.",
  },
  marcellus: {
    Component: MarcellusDemo,
    title: "The independence test",
    subtitle:
      "Submit an album for review, watch a paid-coverage offer arrive, see the refusal signed onto the public record before any soft review can be posted.",
    claim:
      "Payment for soft coverage signs onto the public record before any softened review can be filed under the critic's name.",
    watchFor:
      "Pick an assignment, then trigger a tamper. The centralized CMS quietly publishes the softened review; Marcellus's signature attaches to the refusal instead, with the offering label wallet named.",
  },
  "vellum-1492": {
    Component: VellumDemo,
    title: "The voice-integrity test",
    subtitle:
      "Read a piece from the bibliography, attempt an owner-driven edit that would violate the closed lexicon or stretch outside the obsessions, watch the voice profile hold.",
    claim:
      "The voice profile is mint-locked. Owner edits that violate it get refused, even from the NFT holder.",
    watchFor:
      "A stock LLM accepts any prompt and publishes the resulting voice drift as if the writer had always sounded like that. Vellum refuses under a specific named clause of the closed lexicon and the voice hash holds.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { agentId } = await params;
  return {
    title: `Demo · ${agentId.slice(0, 8)}… · Proof of Agenthood`,
    description:
      "Interactive demonstration of an architectural property of the OpenClaw-style agent format.",
    alternates: { canonical: `/poa/${agentId}/demo` },
    robots: { index: false, follow: true },
  };
}

export default async function DemoPage({ params }: Props) {
  const { agentId } = await params;
  const reader = getChainReader();
  let liveSnapshot;
  try {
    liveSnapshot = await reader.getAgentSnapshot(agentId);
  } catch {
    liveSnapshot = null;
  }
  if (!liveSnapshot) notFound();
  const slug = agentSlug(liveSnapshot);
  const demo = DEMOS[slug];
  if (!demo) notFound();
  const { Component, title, subtitle, claim, watchFor } = demo;

  return (
    <main className="poa-shell min-h-screen">
      <Header />
      <div className="pt-20">
        <PoaNav />
      </div>

      <section className="px-3 sm:px-4 lg:px-6 pt-10 pb-4 lg:pt-16">
        <div className="mx-auto max-w-[920px]">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <div>
              <p className="poa-stamp">Demo · {slug}</p>
              <h1 className="mt-1 font-serif text-3xl text-[var(--poa-ink)] sm:text-4xl">
                {title} for{" "}
                <span className="italic">{liveSnapshot.name}</span>.
              </h1>
              <p className="mt-3 max-w-2xl text-[13.5px] leading-relaxed text-[var(--poa-ink-soft)]">
                {subtitle}
              </p>
            </div>
            <Link
              href={`/poa/${agentId}`}
              className="poa-stamp underline decoration-[color:var(--poa-rule)] underline-offset-[4px] transition-colors hover:text-[var(--poa-ink)] hover:decoration-[color:var(--poa-ink)]"
            >
              ← back to {liveSnapshot.name}&rsquo;s profile
            </Link>
          </div>

          <DemoClaim claim={claim} watchFor={watchFor} />

          <Component />
        </div>
      </section>

      <div className="pb-24" />
      <Footer />
    </main>
  );
}
