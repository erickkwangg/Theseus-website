import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Pages/Home/Header";
import Footer from "@/components/Pages/Home/Footer";
import { credentialStore } from "@/lib/poa/store";
import { chainMode, getChainReader } from "@/lib/poa/chain";
import { evaluateRevocation } from "@/lib/poa/revocation";
import type { AgentSnapshot, RevocationReason } from "@/lib/poa/types";
import CredentialDocument from "../_components/CredentialDocument";
import ChainModeBanner from "../_components/ChainModeBanner";
import ImageSlot from "../_components/ImageSlot";

function portraitSlug(name: string): string {
  return name.toLowerCase().split(" ")[0];
}

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ agentId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { agentId } = await params;
  return {
    title: `Proof of Agenthood · ${agentId.slice(0, 10)}…`,
    description: `Verifiable credential for Theseus agent ${agentId}.`,
    alternates: { canonical: `/poa/${agentId}` },
  };
}

export default async function PoaCredentialPage({ params }: Props) {
  const { agentId } = await params;
  let stored: Awaited<ReturnType<typeof credentialStore.latestByAgent>> =
    undefined;
  try {
    stored = await credentialStore.latestByAgent(agentId);
  } catch {
    // Store unreachable. Page still renders without a credential body.
  }
  const reader = getChainReader();
  const mode = chainMode();

  let liveSnapshot: AgentSnapshot | null = null;
  let chainError: string | null = null;
  let liveBlock: number | null = null;
  try {
    liveSnapshot = await reader.getAgentSnapshot(agentId);
    if (mode === "polkadot") {
      try {
        liveBlock = await reader.currentBlock();
      } catch {
        // Snapshot succeeded; block read failing is non-fatal for the banner.
      }
    }
  } catch (err) {
    // `instanceof Error` can lie across module/realm boundaries; duck-type.
    chainError =
      err && typeof err === "object" && "message" in err
        ? String((err as { message: unknown }).message)
        : String(err);
  }

  let revocation: RevocationReason | null = null;
  if (stored && !chainError) {
    if (stored.revoked) {
      revocation = stored.revoked.reason;
    } else {
      try {
        revocation = await evaluateRevocation(reader, stored);
        if (revocation) await credentialStore.revoke(stored.jti, revocation);
      } catch {
        // Don't kill the page if revocation eval fails. Surface chainError instead.
      }
    }
  }

  // The credential is the page. Anything else is just signage around it.
  return (
    <main className="poa-shell min-h-screen">
      <Header />
      <ChainModeBanner
        mode={mode}
        chainError={chainError}
        livePolkadotBlock={liveBlock}
        pollAgentId={mode === "polkadot" ? agentId : undefined}
      />

      {/* Top signage: tiny stamp + portrait. No outer card. */}
      <section className="px-4 pt-28 pb-4 lg:pt-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="poa-stamp">Proof of Agenthood</p>
          {liveSnapshot && !chainError && (
            <ImageSlot
              src={`/poa/agents/${portraitSlug(liveSnapshot.name)}.png`}
              alt={`Portrait of ${liveSnapshot.name}`}
              width={400}
              height={400}
              className="mt-5 w-[72px]"
              imgClassName="rounded-full [filter:drop-shadow(0_8px_18px_rgb(20_17_13_/_0.18))]"
              fallback={null}
            />
          )}
        </div>
      </section>

      {/* The credential, centered. */}
      {stored && !chainError && (
        <section className="px-3 sm:px-4 lg:px-6 pb-4">
          <div className="mx-auto max-w-[920px]">
            <CredentialDocument credential={stored} revocation={revocation} />

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              <Link
                className="poa-stamp underline decoration-[color:var(--poa-rule)] underline-offset-[4px] transition-colors hover:text-[var(--poa-ink)] hover:decoration-[color:var(--poa-ink)]"
                href={`/poa/api/credential/${stored.jti}`}
              >
                /poa/api/credential/{stored.jti}
              </Link>
              <Link
                className="poa-stamp underline decoration-[color:var(--poa-rule)] underline-offset-[4px] transition-colors hover:text-[var(--poa-ink)] hover:decoration-[color:var(--poa-ink)]"
                href="/poa/.well-known/jwks.json"
                target="_blank"
              >
                /poa/.well-known/jwks.json
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Empty / error states: spare, centered. */}
      {(!stored || chainError) && (
        <section className="px-4 py-10 lg:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-serif text-3xl italic leading-snug text-[var(--poa-ink)] sm:text-4xl [text-wrap:balance]">
              {chainError
                ? "The chain is asleep right now. Try again in a moment."
                : !liveSnapshot
                  ? "This address is not a registered Theseus agent."
                  : `Registered. ${liveSnapshot.name} hasn’t been credentialed yet.`}
            </p>
            {!chainError && liveSnapshot && !stored && (
              <Link
                href="/poa/claim"
                className="cta-ink mt-8 inline-flex items-center px-7 py-3.5 text-sm font-medium tracking-wide"
              >
                If you operate this agent, claim a credential &rarr;
              </Link>
            )}
          </div>
        </section>
      )}

      <div className="pb-24" />
      <Footer />
    </main>
  );
}
