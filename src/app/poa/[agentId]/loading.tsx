import Header from "@/components/Pages/Home/Header";
import Footer from "@/components/Pages/Home/Footer";

// Server-rendered skeleton for /poa/[agentId]. The page is force-dynamic
// and waits on chain reads, which can be slow in real-chain mode. Without
// a skeleton the user sees a blank section then a sudden full credential.

export default function CredentialLoading() {
  return (
    <main className="poa-shell min-h-screen">
      <Header />

      <section className="px-4 pt-28 pb-4 lg:pt-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="poa-stamp opacity-60">Proof of Agenthood</div>
          <div
            className="mt-5 h-[72px] w-[72px] animate-pulse rounded-full"
            style={{ backgroundColor: "var(--poa-rule)" }}
            aria-hidden
          />
        </div>
      </section>

      <section className="px-3 sm:px-4 lg:px-6 pb-4">
        <div className="mx-auto max-w-[920px]">
          <article
            className="poa-paper relative border"
            style={{
              backgroundColor: "var(--poa-paper-card)",
              borderColor: "var(--poa-rule)",
            }}
            aria-busy="true"
            aria-label="Loading credential"
          >
            <div
              className="flex items-center justify-between border-b px-4 py-3 sm:px-6"
              style={{ borderColor: "var(--poa-rule)" }}
            >
              <div className="poa-stamp opacity-60">Proof of Agenthood</div>
              <div className="poa-stamp opacity-40">loading…</div>
            </div>
            <div className="px-6 py-9 sm:px-10 sm:py-12">
              <div
                className="h-9 w-2/3 animate-pulse"
                style={{ backgroundColor: "var(--poa-rule)" }}
              />
              <div
                className="mt-4 h-px w-12"
                style={{ backgroundColor: "var(--poa-wax)" }}
              />
              <div
                className="mt-5 h-3 w-3/4 animate-pulse"
                style={{ backgroundColor: "var(--poa-rule-soft)" }}
              />
              <div
                className="mt-2 h-3 w-1/2 animate-pulse"
                style={{ backgroundColor: "var(--poa-rule-soft)" }}
              />
            </div>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border-t px-4 py-5 sm:px-6"
                style={{ borderColor: "var(--poa-rule)" }}
              >
                <div className="flex items-baseline justify-between">
                  <div
                    className="h-2 w-24 animate-pulse"
                    style={{ backgroundColor: "var(--poa-rule)" }}
                  />
                  <div className="poa-stamp opacity-40 tabular-nums">
                    {String(i).padStart(2, "0")}
                  </div>
                </div>
                <div
                  className="mt-3 h-2 w-full animate-pulse"
                  style={{ backgroundColor: "var(--poa-rule-soft)" }}
                />
                <div
                  className="mt-2 h-2 w-5/6 animate-pulse"
                  style={{ backgroundColor: "var(--poa-rule-soft)" }}
                />
              </div>
            ))}
          </article>
        </div>
      </section>

      <div className="pb-24" />
      <Footer />
    </main>
  );
}
