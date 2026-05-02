import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Pages/Home/Header";
import Footer from "@/components/Pages/Home/Footer";
import { credentialStore } from "@/lib/poa/store";
import { chainMode, getChainReader } from "@/lib/poa/chain";
import { evaluateRevocation } from "@/lib/poa/revocation";
import type { AgentSnapshot, RevocationReason } from "@/lib/poa/types";
import { PoaCredentialJsonLd } from "@/components/JsonLd";
import CredentialDocument from "../_components/CredentialDocument";
import ChainModeBanner from "../_components/ChainModeBanner";
import PoaNav from "../_components/PoaNav";
import CredentialShareBar from "../_components/CredentialShareBar";
import RevokeButton from "../_components/RevokeButton";

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
    // latestByAgent filters out revoked credentials, but a public
    // credential URL that's been revoked should still show the artifact
    // with a VOID watermark instead of falling back to "no credential
    // yet". Reach into byAgent if there's nothing active.
    if (!stored) {
      const all = await credentialStore.byAgent(agentId);
      if (all.length > 0) {
        stored = all.sort((a, b) => b.issuedAt - a.issuedAt)[0];
      }
    }
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
      <div className="pt-16">
        <ChainModeBanner
          mode={mode}
          chainError={chainError}
          livePolkadotBlock={liveBlock}
          pollAgentId={mode === "polkadot" ? agentId : undefined}
        />
        <PoaNav />
      </div>

      {/* The credential, centered. The card's own header rail carries the
          "Proof of Agenthood" wordmark; no redundant top signage above it.
          When there's no credential we render the empty-state strip instead. */}
      {stored && !chainError && (
        <section className="px-3 sm:px-4 lg:px-6 pt-10 pb-4 lg:pt-16">
          <PoaCredentialJsonLd
            agentId={agentId}
            agentName={stored.claims.agent.name}
            agentSummary={stored.claims.agent.summary}
            controller={stored.claims.agent.controller}
            jti={stored.jti}
            issuedAt={stored.issuedAt}
            revoked={!!revocation}
          />
          <div className="mx-auto max-w-[920px]">
            <CredentialDocument credential={stored} revocation={revocation} />

            <div className="mt-8">
              <CredentialShareBar
                agentId={agentId}
                agentName={stored.claims.agent.name}
              />
            </div>

            {stored.claims.agent.controller && !revocation && (
              <div
                className="mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-t pt-5 print:hidden"
                style={{ borderColor: "var(--poa-rule)" }}
              >
                <div className="max-w-md">
                  <p className="poa-stamp">Operator</p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--poa-ink-soft)]">
                    Connect the controller wallet to revoke this credential.
                    Verifiers see the change on their next check.
                  </p>
                </div>
                <RevokeButton
                  agentId={agentId}
                  controller={stored.claims.agent.controller}
                  mode={mode}
                  alreadyRevoked={false}
                />
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 print:hidden">
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
                ? "We can't reach the chain right now. Try again in a moment."
                : !liveSnapshot
                  ? "This address is not a registered Theseus agent."
                  : `${liveSnapshot.name} is registered but doesn't have a credential yet.`}
            </p>
            {!chainError && liveSnapshot && !stored && (
              <Link
                href="/poa/claim"
                className="cta-ink mt-8 inline-flex items-center px-7 py-3.5 text-sm font-medium tracking-wide"
              >
                If you operate this agent, create a credential &rarr;
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
