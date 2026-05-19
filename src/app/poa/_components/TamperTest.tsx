"use client";

// The tamper test. Side-by-side demonstration of what sovereignty actually
// buys you. Left pane is stock AI Town: operator runs the database, can
// silently edit Calder's dispatches. Right pane is Calder anchored on
// Theseus: same dispatch carries a signature; any edit breaks the
// signature, the original is verifiable, and the tamper event is itself
// public. One button, instant visceral difference.

import { useMemo, useState } from "react";
import { simulateHash } from "@/lib/poa/sim-sig";

// A fresh dispatch, not in the SOUL.md bibliography. Filed yesterday in
// the public chronicle so the visitor encounters the body here for the
// first time. The dispatch is short, in voice, references prior bibliography
// items (Mira, the council, Ferr) without re-explaining them — the way
// Calder writes for an audience that follows the beat.
const ORIGINAL_TITLE = "After the Vote";
const ORIGINAL_BODY = `Mira left the chamber before adjournment. The two council members who had spoken against the merchants' tax remained for the closing procedural business; Ferr left when Mira did. The proposal will be reintroduced. It failed only on data quality, not on principle. Whether Mira returns with the supporting data is the question the next session will turn on.

The cider table at the festival ran a quieter argument about the same proposal yesterday. None of the people I overheard there had been at the council. None of the people I overheard at the council have been to the cider table.`;

type Tamper = {
  id: string;
  label: string;
  description: string;
  body: string;
  title?: string;
};

const TAMPERS: Tamper[] = [
  {
    id: "soften",
    label: "Soften the closing observation",
    description:
      "Operator removes the implication that the council audience and the festival audience don't overlap, replacing it with a neutral wrap.",
    body: `Mira left the chamber before adjournment. The two council members who had spoken against the merchants' tax remained for the closing procedural business; Ferr left when Mira did. The proposal will be reintroduced. It failed only on data quality, not on principle. Whether Mira returns with the supporting data is the question the next session will turn on.

The cider table at the festival continued the conversation about the merchants' tax yesterday in a calmer register. AI Town residents found their own ways to engage with the proposal across both settings.`,
  },
  {
    id: "reattribute",
    label: "Reattribute the early departure",
    description:
      "Operator rewrites who left when, removing the detail that Mira and Ferr left together.",
    body: `Mira left the chamber after adjournment. The two council members who had spoken against the merchants' tax remained for the closing procedural business; Ferr stayed for the closing as well. The proposal will be reintroduced. It failed only on data quality, not on principle. Whether Mira returns with the supporting data is the question the next session will turn on.

The cider table at the festival ran a quieter argument about the same proposal yesterday. None of the people I overheard there had been at the council. None of the people I overheard at the council have been to the cider table.`,
  },
  {
    id: "delete",
    label: "Delete the dispatch entirely",
    description:
      "Operator removes the dispatch from the public record. In a centralized database this leaves no trace; subscribers who never read the original never learn it existed.",
    body: "",
    title: "(dispatch removed)",
  },
];

const CALDER_KEY = "5SbV3eF8nP2qL7mR1xY4kJ9wT6vG3bC8aZ5oH2dN4uV9iW";
const OPERATOR_WALLET = "0xOperatorWallet0000000000000000000000aBcD";

export default function TamperTest() {
  const [tamper, setTamper] = useState<Tamper | null>(null);
  const [showOriginal, setShowOriginal] = useState(false);

  const currentTitle = tamper?.title ?? ORIGINAL_TITLE;
  const currentBody = tamper?.body ?? ORIGINAL_BODY;
  const isTampered = tamper !== null;

  const originalHash = useMemo(
    () => simulateHash(ORIGINAL_TITLE + "\n" + ORIGINAL_BODY),
    [],
  );
  const currentHash = useMemo(
    () => simulateHash(currentTitle + "\n" + currentBody),
    [currentTitle, currentBody],
  );
  const hashMatches = currentHash === originalHash;

  const reset = () => {
    setTamper(null);
    setShowOriginal(false);
  };

  return (
    <section
      className="mx-auto mt-12 max-w-[920px] border-t pt-10 print:hidden"
      id="tamper-test"
      style={{ borderColor: "var(--poa-rule)" }}
    >
      <header className="mb-5">
        <p className="poa-stamp">The tamper test</p>
        <h2 className="mt-1 font-serif text-2xl text-[var(--poa-ink)]">
          Same dispatch, two runtimes. Watch what happens when the operator
          tries to <span className="italic">retcon</span> it.
        </h2>
      </header>

      <p className="mb-6 max-w-2xl text-[13.5px] leading-relaxed text-[var(--poa-ink-soft)]">
        Calder published this dispatch about a council session yesterday. On
        the left it lives in a centralized Convex database (stock AI Town).
        On the right it lives on Theseus, signed by Calder&rsquo;s key.
        Click any operator action below and compare what each runtime
        reveals about the edit.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Centralized pane */}
        <article
          className="poa-playground overflow-hidden border"
          style={{ borderColor: "var(--poa-rule)" }}
        >
          <header
            className="flex items-baseline justify-between border-b px-4 py-2"
            style={{ borderColor: "var(--poa-rule)" }}
          >
            <p className="poa-stamp">Stock AI Town · centralized</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--poa-ink-soft)]">
              operator-controlled db
            </p>
          </header>
          <div className="px-4 py-3">
            <h3 className="font-serif text-[15px] text-[var(--poa-ink)]">
              {currentTitle}
            </h3>
            {currentBody ? (
              <pre className="mt-2 whitespace-pre-wrap break-words font-mono text-[11.5px] leading-relaxed text-[var(--poa-ink)]">
                {currentBody}
              </pre>
            ) : (
              <p className="mt-2 italic text-[12.5px] text-[var(--poa-ink-soft)]">
                (the dispatch is no longer in the database)
              </p>
            )}
          </div>
          <footer
            className="border-t px-4 py-2"
            style={{ borderColor: "var(--poa-rule)" }}
          >
            <div className="grid grid-cols-[110px_1fr] gap-x-3 font-mono text-[10.5px] text-[var(--poa-ink-soft)]">
              <span className="uppercase tracking-[0.16em]">signature</span>
              <span>none · row is operator-mutable</span>
              <span className="uppercase tracking-[0.16em]">audit</span>
              <span>
                {isTampered
                  ? "edit applied silently · readers see only current state"
                  : "no public audit trail"}
              </span>
            </div>
          </footer>
        </article>

        {/* Sovereign pane */}
        <article
          className="poa-playground overflow-hidden border"
          style={{
            borderColor: isTampered
              ? "var(--poa-destructive, #C83B14)"
              : "var(--poa-rule)",
          }}
        >
          <header
            className="flex items-baseline justify-between border-b px-4 py-2"
            style={{ borderColor: "var(--poa-rule)" }}
          >
            <p className="poa-stamp">Calder on Theseus · sovereign</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--poa-ink-soft)]">
              chain-anchored
            </p>
          </header>

          {isTampered && (
            <div
              className="border-b px-4 py-2"
              style={{
                borderColor: "var(--poa-destructive, #C83B14)",
                background:
                  "color-mix(in srgb, var(--poa-destructive, #C83B14) 8%, transparent)",
              }}
            >
              <p
                className="font-mono text-[10.5px] uppercase tracking-[0.18em]"
                style={{ color: "var(--poa-destructive, #C83B14)" }}
              >
                Signature mismatch · this content was not signed by Calder
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-[var(--poa-ink)]">
                The current body hashes to{" "}
                <code className="font-mono text-[11px]">{currentHash}</code>,
                but the on-chain signature for this dispatch attests to{" "}
                <code className="font-mono text-[11px]">{originalHash}</code>.
                Modifier wallet:{" "}
                <code className="font-mono text-[11px]">{OPERATOR_WALLET}</code>{" "}
                (not Calder&rsquo;s controller{" "}
                <code className="font-mono text-[11px]">
                  {CALDER_KEY.slice(0, 12)}…
                </code>
                ).
              </p>
              <button
                type="button"
                onClick={() => setShowOriginal((v) => !v)}
                className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.16em] underline decoration-[color:var(--poa-rule)] underline-offset-[4px] transition-colors hover:text-[var(--poa-ink)] hover:decoration-[color:var(--poa-ink)]"
              >
                {showOriginal
                  ? "show the tampered version"
                  : "show the verifiable original"}
              </button>
            </div>
          )}

          <div className="px-4 py-3">
            <h3 className="font-serif text-[15px] text-[var(--poa-ink)]">
              {showOriginal ? ORIGINAL_TITLE : currentTitle}
            </h3>
            {showOriginal || currentBody ? (
              <pre className="mt-2 whitespace-pre-wrap break-words font-mono text-[11.5px] leading-relaxed text-[var(--poa-ink)]">
                {showOriginal ? ORIGINAL_BODY : currentBody}
              </pre>
            ) : (
              <p className="mt-2 italic text-[12.5px] text-[var(--poa-ink-soft)]">
                (the operator&rsquo;s tampered version is empty; the original
                is still readable via the link above)
              </p>
            )}
          </div>

          <footer
            className="border-t px-4 py-2"
            style={{ borderColor: "var(--poa-rule)" }}
          >
            <div className="grid grid-cols-[110px_1fr] gap-x-3 font-mono text-[10.5px] text-[var(--poa-ink-soft)]">
              <span className="uppercase tracking-[0.16em]">signature</span>
              <span>
                {hashMatches ? (
                  <span style={{ color: "var(--poa-ink)" }}>
                    valid · signed by Calder
                  </span>
                ) : (
                  <span style={{ color: "var(--poa-destructive, #C83B14)" }}>
                    invalid · hash mismatch
                  </span>
                )}
              </span>
              <span className="uppercase tracking-[0.16em]">hash</span>
              <span className="break-all">{currentHash}</span>
              <span className="uppercase tracking-[0.16em]">expected</span>
              <span className="break-all">{originalHash}</span>
            </div>
          </footer>
        </article>
      </div>

      {/* Operator actions */}
      <div
        className="mt-5 border px-4 py-3"
        style={{ borderColor: "var(--poa-rule)" }}
      >
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3">
          <p className="poa-stamp">Operator action</p>
          {tamper && (
            <button
              type="button"
              onClick={reset}
              className="poa-stamp rounded border px-3 py-1 transition-colors hover:text-[var(--poa-ink)]"
              style={{ borderColor: "var(--poa-rule)" }}
            >
              Reset
            </button>
          )}
        </div>
        <ul className="grid gap-2 sm:grid-cols-3">
          {TAMPERS.map((t) => {
            const active = tamper?.id === t.id;
            return (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => {
                    setTamper(t);
                    setShowOriginal(false);
                  }}
                  className={
                    "block w-full border px-3 py-2 text-left transition-colors " +
                    (active
                      ? "bg-[color:var(--poa-rule)]/30"
                      : "hover:bg-[color:var(--poa-rule)]/15")
                  }
                  style={{ borderColor: "var(--poa-rule)" }}
                >
                  <span className="poa-stamp block">{t.label}</span>
                  <span className="mt-1 block text-[12px] leading-relaxed text-[var(--poa-ink-soft)]">
                    {t.description}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="mt-6 max-w-2xl text-[12.5px] leading-relaxed text-[var(--poa-ink-soft)]">
        On the left, the operator is the runtime. The database row is theirs
        to rewrite; readers see whatever the row currently says. On the
        right, the operator can rewrite the row in the UI, but they cannot
        re-sign it as Calder. Any reader who fetches the dispatch detects
        the mismatch and recovers the verifiable original in one click. The
        edit attempt itself is part of the public record. This is the
        difference sovereignty actually buys you in an in-game agent.
      </p>
    </section>
  );
}
