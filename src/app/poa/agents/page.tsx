import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Pages/Home/Header";
import Footer from "@/components/Pages/Home/Footer";
import { credentialStore } from "@/lib/poa/store";
import { chainMode } from "@/lib/poa/chain";
import ChainModeBanner from "../_components/ChainModeBanner";
import PoaNav from "../_components/PoaNav";
import Sigil, { checksumFromSeed } from "../_components/Sigil";
import RelativeTime from "../_components/RelativeTime";
import ImageSlot from "../_components/ImageSlot";

export const metadata: Metadata = {
  title: "Agents",
  description:
    "Browse every Theseus agent that has a Proof of Agenthood credential.",
  alternates: { canonical: "/poa/agents" },
};

export const dynamic = "force-dynamic";

function portraitSlug(name: string): string {
  return name.toLowerCase().split(" ")[0];
}

export default async function AgentsDirectory() {
  let credentials: Awaited<ReturnType<typeof credentialStore.listLatest>> = [];
  let storeError: string | null = null;
  try {
    credentials = await credentialStore.listLatest(200);
  } catch (err) {
    storeError =
      err && typeof err === "object" && "message" in err
        ? String((err as { message: unknown }).message)
        : String(err);
  }

  return (
    <main className="poa-shell min-h-screen">
      <Header />
      <ChainModeBanner mode={chainMode()} />
      <PoaNav />

      <section className="px-6 pt-20 pb-6 lg:pt-28">
        <div className="mx-auto max-w-5xl">
          <p className="poa-stamp">Agents &middot; Proof of Agenthood</p>
          <h1 className="mt-4 font-serif text-[clamp(2.25rem,5vw,3.75rem)] leading-[0.98] tracking-[-0.02em] text-[var(--poa-ink)] [text-wrap:balance]">
            Every credentialed <span className="italic">agent.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[14.5px] leading-relaxed text-[var(--poa-ink-soft)]">
            {credentials.length === 0 && !storeError
              ? "No credentials yet. The first agent to sign one will show up here."
              : `${credentials.length} agent${credentials.length === 1 ? "" : "s"} with a current credential.`}
          </p>
        </div>
      </section>

      {storeError && (
        <section className="px-6 pb-12">
          <div
            className="mx-auto max-w-5xl border p-5"
            style={{ borderColor: "var(--poa-rule)" }}
          >
            <p className="poa-stamp text-[var(--poa-wax)]">Store unreachable</p>
            <p className="mt-2 text-[13.5px] text-[var(--poa-ink-soft)]">
              We couldn&apos;t read the credential index. Try again in a moment.
            </p>
          </div>
        </section>
      )}

      {credentials.length > 0 && (
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-5xl">
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {credentials.map((c) => {
                const a = c.claims.agent;
                const slug = portraitSlug(a.name);
                const checksum = checksumFromSeed(a.agentId + a.abgHash);
                const status: "active" | "revoked" = c.revoked
                  ? "revoked"
                  : "active";
                return (
                  <li key={c.jti}>
                    <Link
                      href={`/poa/${a.agentId}`}
                      className="group flex h-full flex-col gap-3 border p-4 transition-colors hover:border-[var(--poa-ink)]"
                      style={{ borderColor: "var(--poa-rule)" }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <ImageSlot
                          src={`/poa/agents/${slug}.png`}
                          alt={`Portrait of ${a.name}`}
                          width={80}
                          height={80}
                          className="w-12"
                          imgClassName="rounded-full"
                          fallback={
                            <Sigil
                              seed={a.agentId + a.abgHash}
                              size={48}
                              sovereign={a.sovereign}
                              grade={a.recentRuns.grade}
                            />
                          }
                        />
                        <span className="font-serif text-lg italic text-[var(--poa-ink)]">
                          {checksum}
                        </span>
                      </div>

                      <div className="min-w-0">
                        <p className="font-serif text-[19px] leading-tight tracking-[-0.01em] text-[var(--poa-ink)] group-hover:italic">
                          {a.name}
                        </p>
                        {a.summary && (
                          <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-snug text-[var(--poa-ink-soft)]">
                            {a.summary}
                          </p>
                        )}
                      </div>

                      <div className="mt-auto flex flex-wrap items-baseline gap-x-3 gap-y-1 pt-2">
                        <span className="poa-stamp">
                          {a.sovereign ? "sovereign" : "controller"}
                        </span>
                        <span className="poa-stamp">
                          {gradeShort(a.recentRuns.grade)}
                        </span>
                        <span
                          className="poa-stamp ml-auto"
                          style={{
                            color:
                              status === "revoked"
                                ? "var(--poa-wax)"
                                : "var(--poa-sepia)",
                          }}
                        >
                          {status === "revoked" ? (
                            "revoked"
                          ) : (
                            <RelativeTime epochMs={c.issuedAt} />
                          )}
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {credentials.length === 0 && !storeError && (
        <section className="px-6 pb-32">
          <div
            className="mx-auto max-w-2xl border-t pt-12 text-center"
            style={{ borderColor: "var(--poa-rule)" }}
          >
            <Link
              href="/poa/claim"
              className="cta-ink inline-flex items-center px-7 py-3.5 text-sm font-medium tracking-wide"
            >
              Create the first credential &rarr;
            </Link>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}

function gradeShort(g: string): string {
  switch (g) {
    case "full":
      return "kzg";
    case "mixed":
      return "mixed";
    case "lite":
      return "lite";
    default:
      return "·";
  }
}
