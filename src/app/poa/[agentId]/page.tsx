import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Pages/Home/Header";
import Footer from "@/components/Pages/Home/Footer";
import SectionHeader from "@/components/Pages/Home/SectionHeader";
import { credentialStore } from "@/lib/poa/store";
import { chainMode, getChainReader } from "@/lib/poa/chain";
import { evaluateRevocation } from "@/lib/poa/revocation";
import type { AgentSnapshot, RevocationReason } from "@/lib/poa/types";
import CredentialDocument from "../_components/CredentialDocument";
import ChainModeBanner from "../_components/ChainModeBanner";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ agentId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { agentId } = await params;
  return {
    title: `Proof of Agenthood — ${agentId.slice(0, 10)}…`,
    description: `Verifiable credential for Theseus agent ${agentId}.`,
    alternates: { canonical: `/poa/${agentId}` },
  };
}

export default async function PoaCredentialPage({ params }: Props) {
  const { agentId } = await params;
  const stored = credentialStore.latestByAgent(agentId);
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
        if (revocation) credentialStore.revoke(stored.jti, revocation);
      } catch {
        // Don't kill the page if revocation eval fails — surface chainError instead.
      }
    }
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-transparent dark:text-white">
      <Header />
      <ChainModeBanner
        mode={mode}
        chainError={chainError}
        livePolkadotBlock={liveBlock}
      />

      <section className="px-2 sm:px-3 lg:px-4 pt-24 lg:pt-28 pb-2 sm:pb-3 lg:pb-4">
        <div className="hero-card relative overflow-hidden rounded-2xl bg-[#F1EAE1] lg:rounded-3xl dark:bg-slate-900">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 soft-grid [mask-image:linear-gradient(to_bottom,black,black_72%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black,black_72%,transparent)]"
          />
          <div className="relative z-10 mx-auto max-w-[1700px] px-6 sm:px-12 lg:px-16 py-10 lg:py-14">
            <SectionHeader label="Proof of Agenthood" number="—" className="mb-8" />

            <div className="grid items-end gap-y-6 sm:gap-y-10 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  Agent
                </p>
                <h1 className="mt-3 font-serif text-5xl leading-[1.05] tracking-[-0.01em] text-slate-900 [text-wrap:balance] sm:text-6xl lg:text-7xl dark:text-white">
                  {chainError ? "Chain unreachable" : liveSnapshot?.name ?? "Unknown agent"}
                </h1>
                {liveSnapshot?.summary && !chainError && (
                  <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-slate-700 sm:text-lg dark:text-slate-300">
                    {liveSnapshot.summary}
                  </p>
                )}
                <p className="mt-6 max-w-xl font-serif text-xl italic leading-snug text-slate-800 sm:text-2xl dark:text-slate-100">
                  {chainError
                    ? "Cannot read on-chain state right now."
                    : !liveSnapshot
                      ? "Not registered on Theseus Chain."
                      : !stored
                        ? "On-chain registration found. No credential issued yet."
                        : revocation
                          ? "This credential has been revoked."
                          : "A signed receipt of agenthood."}
                </p>
              </div>

              <div className="flex justify-start lg:justify-end">
                {chainError ? null : stored ? (
                  <KeyValueStack
                    rows={[
                      [
                        "Mode",
                        stored.claims.agent.sovereign
                          ? "sovereign"
                          : "controller-retained",
                      ],
                      ["Verification", stored.claims.agent.recentRuns.grade],
                      ["Status", revocation ? "revoked" : "attested"],
                      [
                        "Issued",
                        new Date(stored.issuedAt)
                          .toISOString()
                          .slice(0, 10)
                          .replace(/-/g, "."),
                      ],
                    ]}
                  />
                ) : liveSnapshot ? (
                  <Link
                    href="/poa/claim"
                    className="primary-cta inline-flex items-center rounded-md px-8 py-4 text-base font-medium tracking-wide"
                  >
                    Claim a credential →
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credential document — hidden when chain is unreachable so we don't
          present an "ATTESTED" credential whose revocation status we couldn't
          verify. */}
      {stored && !chainError && (
        <section className="px-2 sm:px-3 lg:px-4 py-10 lg:py-14">
          <div className="mx-auto max-w-[1100px] px-2 sm:px-4 lg:px-6">
            <CredentialDocument credential={stored} revocation={revocation} />

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] tabular-nums text-slate-500 dark:text-slate-400">
              <Link
                className="underline decoration-slate-400/60 underline-offset-[4px] hover:text-indigo-600 dark:hover:text-indigo-300"
                href={`/poa/api/credential/${stored.jti}`}
              >
                /poa/api/credential/{stored.jti}
              </Link>
              <Link
                className="underline decoration-slate-400/60 underline-offset-[4px] hover:text-indigo-600 dark:hover:text-indigo-300"
                href="/poa/.well-known/jwks.json"
                target="_blank"
              >
                /poa/.well-known/jwks.json
              </Link>
            </div>
          </div>
        </section>
      )}

      {!stored && liveSnapshot && !chainError && (
        <section className="px-2 sm:px-3 lg:px-4 py-10 lg:py-14">
          <div className="mx-auto max-w-[700px] px-4 text-slate-700 dark:text-slate-300">
            <p className="leading-relaxed">
              The agent is registered on Theseus Chain, but no Proof of
              Agenthood credential has been issued yet. Claim one to publish a
              portable, signed snapshot of its state.
            </p>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}

function KeyValueStack({ rows }: { rows: [string, string][] }) {
  return (
    <dl
      className={[
        "w-full max-w-md",
        // On mobile (stacked) use a top rule. On desktop (side-by-side) use a
        // left rail. Avoids a stranded left border when the column collapses.
        "border-t border-slate-400/40 pt-4 dark:border-slate-500/40",
        "lg:border-t-0 lg:border-l lg:pt-0 lg:pl-5",
      ].join(" ")}
    >
      {rows.map(([k, v]) => (
        <div
          key={k}
          className="flex items-baseline justify-between gap-6 border-b border-slate-300/55 py-2 last:border-b-0 dark:border-slate-700/45"
        >
          <dt className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            {k}
          </dt>
          <dd className="break-all text-right font-mono text-[12px] tabular-nums text-slate-800 dark:text-slate-100">
            {v}
          </dd>
        </div>
      ))}
    </dl>
  );
}
