import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Pages/Home/Header";
import Footer from "@/components/Pages/Home/Footer";
import { getChainReader } from "@/lib/poa/chain";
import { agentSlug } from "@/lib/poa/agent-file";
import PoaNav from "../../_components/PoaNav";
import TamperTest from "../../_components/TamperTest";

// The tamper-test demonstration page. Per-agent for now: only Calder has
// the test wired (he's the in-game chronicler demo). Visitors to other
// agents' /tamper-test routes get 404. Easy to extend per agent once we
// have more in-game-shaped sovereign agents.

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ agentId: string }> };

const ENABLED_FOR = new Set(["calder"]);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { agentId } = await params;
  return {
    title: `Tamper test · ${agentId.slice(0, 8)}… · Proof of Agenthood`,
    description:
      "Side-by-side demonstration of what sovereignty buys an in-game agent: an operator-edited dispatch in a centralized runtime vs the same edit attempt against a Theseus-anchored signature.",
    alternates: { canonical: `/poa/${agentId}/tamper-test` },
    robots: { index: false, follow: true },
  };
}

export default async function TamperTestPage({ params }: Props) {
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
  if (!ENABLED_FOR.has(slug)) notFound();

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
              <p className="poa-stamp">In-game demo · {slug}</p>
              <h1 className="mt-1 font-serif text-3xl text-[var(--poa-ink)] sm:text-4xl">
                The tamper test for{" "}
                <span className="italic">{liveSnapshot.name}</span>.
              </h1>
            </div>
            <Link
              href={`/poa/${agentId}`}
              className="poa-stamp underline decoration-[color:var(--poa-rule)] underline-offset-[4px] transition-colors hover:text-[var(--poa-ink)] hover:decoration-[color:var(--poa-ink)]"
            >
              ← back to {liveSnapshot.name}&rsquo;s profile
            </Link>
          </div>

          <TamperTest />
        </div>
      </section>

      <div className="pb-24" />
      <Footer />
    </main>
  );
}
