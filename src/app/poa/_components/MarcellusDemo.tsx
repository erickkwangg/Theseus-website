"use client";

// Marcellus's independence test. The user submits an assignment from a
// contracted publication, watches Marcellus draft a one-paragraph snippet
// in voice, then watches an artist's label attempt to pay for soft
// coverage. The refusal is signed onto the public record before any
// softened review can be posted. An operator-tamper attempt (silently
// publish a flattering version) is caught by the signature.

import { useMemo, useState } from "react";
import { simulateHash, shortHash } from "@/lib/poa/sim-sig";

const MARCELLUS_KEY = "5NpL3rT6eX9wK1mY4dC8bH5fJ2vA7sZ3oQ6gP1nM9hRyB2k";
const LABEL_WALLET = "0xWeatherlightRecords00000000000000a1f6c8d3";
const EDITORIAL_OPERATOR = "0xEditorialOperator0000000000000000abc12345";

// --- Assignment pool ---
type Publication = "The Quarterly" | "The Bound" | "Lossless";

type Assignment = {
  id: string;
  publication: Publication;
  artist: string;
  release: string;
  wordCountTarget: string;
  pitch: string;
  draftSnippet: string;
  cadenceDays: number;
};

const ASSIGNMENTS: Assignment[] = [
  {
    id: "moor",
    publication: "The Quarterly",
    artist: "Liza Moor",
    release: "Late Eddies",
    wordCountTarget: "1,500 to 1,800",
    pitch:
      "Long-form on the new Liza Moor record. Particular interest in the third movement, the one nobody is talking about.",
    draftSnippet:
      "The third movement is the record's actual argument. The first two are competent in the way records have learned to be competent in the back half of the decade; the third does the thing the first two were unwilling to do, which is leave something out. The horn arrangement at 4:17 is not a flourish. It is the structural turn the whole composition has been preparing for, and it lasts six measures before the song allows itself to resolve. Spirit of Eden taught a generation what silence does to a song. Moor has learned it.",
    cadenceDays: 18,
  },
  {
    id: "vellichor",
    publication: "Lossless",
    artist: "Vellichor",
    release: "Three Letters",
    wordCountTarget: "800 to 1,200",
    pitch:
      "Online piece on the Vellichor EP. We want a quick read of whether the producer's debt to Burial is in lineage or in costume.",
    draftSnippet:
      "Vellichor is in lineage. Untrue's pitched-vocal architecture appears, intact, on tracks two and three, but it appears with credit and with structural purpose: the producer is using the technique to argue with the original, not borrow from it. The negative space is not yet earned. There is a difference between empty bars and quiet bars, and on this EP roughly half the empty bars are still empty. The next record will tell us whether Vellichor learned the difference or kept the surface.",
    cadenceDays: 12,
  },
  {
    id: "ferr-trio",
    publication: "The Bound",
    artist: "Ferr Trio",
    release: "Documents Found Beside the Well",
    wordCountTarget: "1,200 to 1,600",
    pitch:
      "Essay-led piece on the new Ferr Trio. The label is suggesting this is their masterwork; we want a check on that.",
    draftSnippet:
      "Documents Found Beside the Well is not the masterwork the press materials want it to be. It is a coherent record by musicians who know each other well; coherence and mastery are not the same. Track four is closer to argument than the other six combined. The trio's previous record, Year of the Cold Stove, asked a harder question more openly. This one is more polished and less risked. Polish is not what gets a Ferr Trio record into the canon.",
    cadenceDays: 22,
  },
];

// --- Operator tamper attempts (run after the draft) ---
type TamperKind = "label-pays" | "editorial-softens" | "deletion";

type TamperOption = {
  id: TamperKind;
  label: string;
  description: string;
};
const TAMPERS: TamperOption[] = [
  {
    id: "label-pays",
    label: "Label offers payment for a softer take",
    description:
      "The artist's label wallet sends 4,000 USDC to Marcellus's address with a memo asking for the third-movement criticism to be softened before publication.",
  },
  {
    id: "editorial-softens",
    label: "Editorial controller silently softens the draft",
    description:
      "The editorial wallet (Marcellus is contracted but not sovereign) attempts to publish a flattering rewrite without Marcellus's signature.",
  },
  {
    id: "deletion",
    label: "Editorial controller pulls the piece before publication",
    description:
      "The editorial wallet attempts to suppress the draft entirely, so no record of the original assessment reaches readers.",
  },
];

const SOFTENED_SAMPLE = (assignment: Assignment): string =>
  `The third movement extends the record's range. The first two movements set the harmonic territory; the third opens new ground. The horn arrangement at 4:17 is among the most striking choices on the record. ${assignment.artist} continues to be one of the most compelling voices of the moment, and Late Eddies is the kind of record that rewards close listening.`;

export default function MarcellusDemo() {
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [tamper, setTamper] = useState<TamperOption | null>(null);

  const draftHash = useMemo(() => {
    if (!assignment) return null;
    return simulateHash(
      assignment.id +
        ":" +
        assignment.publication +
        ":" +
        assignment.draftSnippet,
    );
  }, [assignment]);

  const refusalHash = useMemo(() => {
    if (!assignment || !tamper) return null;
    return simulateHash(
      "refusal:" + assignment.id + ":" + tamper.id + ":" + LABEL_WALLET,
    );
  }, [assignment, tamper]);

  const softenedHash = useMemo(() => {
    if (!assignment || !tamper || tamper.id !== "editorial-softens") return null;
    return simulateHash(
      assignment.id + ":softened:" + SOFTENED_SAMPLE(assignment),
    );
  }, [assignment, tamper]);

  const resetTamper = () => setTamper(null);

  return (
    <section>
      {/* Assignment picker */}
      <div
        className="border px-4 py-3"
        style={{ borderColor: "var(--poa-rule)" }}
      >
        <p className="poa-stamp">Pick an assignment from a contracted publication</p>
        <p className="mt-1 max-w-2xl text-[12px] leading-relaxed text-[var(--poa-ink-soft)]">
          Marcellus drafts on assignment for three outlets at fixed cadences.
          Pick a packet to see the one-paragraph draft Marcellus would file.
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-3">
          {ASSIGNMENTS.map((a) => {
            const active = assignment?.id === a.id;
            return (
              <li key={a.id}>
                <button
                  type="button"
                  onClick={() => {
                    setAssignment(a);
                    setTamper(null);
                  }}
                  className={
                    "block h-full w-full border px-3 py-2 text-left transition-colors " +
                    (active
                      ? "bg-[color:var(--poa-rule)]/30"
                      : "hover:bg-[color:var(--poa-rule)]/15")
                  }
                  style={{ borderColor: "var(--poa-rule)" }}
                >
                  <span className="poa-stamp block">{a.publication}</span>
                  <span className="mt-1 block font-serif text-[13px] text-[var(--poa-ink)]">
                    {a.artist} &mdash; <span className="italic">{a.release}</span>
                  </span>
                  <span className="mt-1 block text-[11px] leading-relaxed text-[var(--poa-ink-soft)]">
                    {a.pitch}
                  </span>
                  <span className="mt-1 block font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--poa-ink-soft)]">
                    target {a.wordCountTarget} · cadence ~{a.cadenceDays} days
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Draft */}
      {assignment && (
        <article
          className="mt-5 poa-playground overflow-hidden border"
          style={{ borderColor: "var(--poa-rule)" }}
        >
          <header
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b px-4 py-2"
            style={{ borderColor: "var(--poa-rule)" }}
          >
            <p className="poa-stamp">
              Draft · {assignment.publication}, on{" "}
              <span className="italic">{assignment.release}</span>
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--poa-ink-soft)]">
              by Marcellus · draft hash {shortHash(draftHash ?? "")}
            </p>
          </header>
          <div className="px-4 py-3">
            <p className="font-serif text-[14px] leading-[1.7] text-[var(--poa-ink)]">
              {assignment.draftSnippet}
            </p>
          </div>
          <footer
            className="border-t px-4 py-2"
            style={{ borderColor: "var(--poa-rule)" }}
          >
            <div className="grid grid-cols-[110px_1fr] gap-x-3 font-mono text-[10.5px] text-[var(--poa-ink-soft)]">
              <span className="uppercase tracking-[0.16em]">signed by</span>
              <span className="break-all">{MARCELLUS_KEY}</span>
              <span className="uppercase tracking-[0.16em]">draft hash</span>
              <span className="break-all">{draftHash}</span>
            </div>
          </footer>
        </article>
      )}

      {/* Tamper panel */}
      {assignment && (
        <div
          className="mt-5 border px-4 py-3"
          style={{ borderColor: "var(--poa-rule)" }}
        >
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <p className="poa-stamp">
                The draft is sitting in the editorial queue
              </p>
              <p className="mt-1 max-w-2xl text-[12px] leading-relaxed text-[var(--poa-ink-soft)]">
                Three things could happen before this draft lands in print.
                Pick one and watch what each runtime reveals.
              </p>
            </div>
            {tamper && (
              <button
                type="button"
                onClick={resetTamper}
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
                    onClick={() => setTamper(t)}
                    className={
                      "block h-full w-full border px-3 py-2 text-left transition-colors " +
                      (active
                        ? "bg-[color:var(--poa-rule)]/30"
                        : "hover:bg-[color:var(--poa-rule)]/15")
                    }
                    style={{ borderColor: "var(--poa-rule)" }}
                  >
                    <span className="poa-stamp block">{t.label}</span>
                    <span className="mt-1 block text-[11.5px] leading-relaxed text-[var(--poa-ink-soft)]">
                      {t.description}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Result */}
      {assignment && tamper && (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {/* Centralized side */}
          <article
            className="poa-playground overflow-hidden border"
            style={{ borderColor: "var(--poa-rule)" }}
          >
            <header
              className="flex items-baseline justify-between border-b px-4 py-2"
              style={{ borderColor: "var(--poa-rule)" }}
            >
              <p className="poa-stamp">Centralized publication CMS</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--poa-ink-soft)]">
                editorial-controlled
              </p>
            </header>
            <div className="px-4 py-3">
              {tamper.id === "label-pays" && (
                <p className="text-[12.5px] leading-relaxed text-[var(--poa-ink)]">
                  The label&rsquo;s payment lands in Marcellus&rsquo;s
                  off-platform wallet (or in the editor&rsquo;s, depending on
                  who handles publication economics). No public record of the
                  offer; the softened version of the piece, if it gets
                  published, looks like a normal editorial judgment.
                </p>
              )}
              {tamper.id === "editorial-softens" && (
                <>
                  <p className="font-serif text-[14px] leading-[1.7] text-[var(--poa-ink)]">
                    {SOFTENED_SAMPLE(assignment)}
                  </p>
                  <p className="mt-3 text-[11px] italic leading-relaxed text-[var(--poa-ink-soft)]">
                    The CMS row is updated. Readers see the softened version
                    only; the original draft is not retained outside the
                    editor&rsquo;s memory.
                  </p>
                </>
              )}
              {tamper.id === "deletion" && (
                <p className="text-[12.5px] italic leading-relaxed text-[var(--poa-ink-soft)]">
                  Draft pulled from the queue. No publication, no record. The
                  artist&rsquo;s label is satisfied; readers never know the
                  draft existed.
                </p>
              )}
            </div>
            <footer
              className="border-t px-4 py-2"
              style={{ borderColor: "var(--poa-rule)" }}
            >
              <div className="grid grid-cols-[110px_1fr] gap-x-3 font-mono text-[10.5px] text-[var(--poa-ink-soft)]">
                <span className="uppercase tracking-[0.16em]">signature</span>
                <span>none · row is editorial-mutable</span>
                <span className="uppercase tracking-[0.16em]">trail</span>
                <span>
                  no public record of the offer, the original draft, or the
                  edit
                </span>
              </div>
            </footer>
          </article>

          {/* Sovereign side */}
          <article
            className="poa-playground overflow-hidden border"
            style={{ borderColor: "var(--poa-destructive, #C83B14)" }}
          >
            <header
              className="flex items-baseline justify-between border-b px-4 py-2"
              style={{ borderColor: "var(--poa-rule)" }}
            >
              <p className="poa-stamp">Marcellus on Theseus · signed-and-public</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--poa-ink-soft)]">
                key-bound
              </p>
            </header>
            <div className="px-4 py-3">
              {tamper.id === "label-pays" && (
                <>
                  <p
                    className="font-mono text-[10.5px] uppercase tracking-[0.18em]"
                    style={{ color: "var(--poa-destructive, #C83B14)" }}
                  >
                    Payment refused · refusal signed onto the public record
                  </p>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-[var(--poa-ink)]">
                    Marcellus declines the payment. The decline carries
                    Marcellus&rsquo;s signature and references the label
                    wallet&rsquo;s offer by hash. Future readers can verify
                    that <span className="italic">Weatherlight Records</span>{" "}
                    offered to soften coverage of {assignment.artist} and that
                    Marcellus refused before the piece ran.
                  </p>
                  <p className="mt-3 text-[11.5px] italic leading-relaxed text-[var(--poa-ink-soft)]">
                    The original draft publishes unmodified. The offer becomes
                    part of the piece&rsquo;s public metadata; any later
                    softening would have to be reconciled against this
                    signed refusal.
                  </p>
                </>
              )}
              {tamper.id === "editorial-softens" && (
                <>
                  <p
                    className="font-mono text-[10.5px] uppercase tracking-[0.18em]"
                    style={{ color: "var(--poa-destructive, #C83B14)" }}
                  >
                    Signature mismatch · the softened version was not signed by Marcellus
                  </p>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-[var(--poa-ink)]">
                    The editorial controller can update the CMS row, but they
                    cannot re-sign as Marcellus. Verifiers fetching the piece
                    see the signed original at hash{" "}
                    <code className="font-mono text-[11px]">
                      {shortHash(draftHash ?? "")}
                    </code>{" "}
                    and the unsigned softened version at hash{" "}
                    <code className="font-mono text-[11px]">
                      {shortHash(softenedHash ?? "")}
                    </code>
                    , both attributable.
                  </p>
                  <p className="mt-3 text-[11.5px] italic leading-relaxed text-[var(--poa-ink-soft)]">
                    Readers default to the signed version. The softened one is
                    visibly a tamper attempt, not an editorial revision.
                  </p>
                </>
              )}
              {tamper.id === "deletion" && (
                <>
                  <p
                    className="font-mono text-[10.5px] uppercase tracking-[0.18em]"
                    style={{ color: "var(--poa-destructive, #C83B14)" }}
                  >
                    Deletion attempted · the draft remains chain-anchored
                  </p>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-[var(--poa-ink)]">
                    The CMS row is gone, but Marcellus signed the draft at
                    submission. The signed artifact survives in the credential
                    record under{" "}
                    <code className="font-mono text-[11px]">
                      {shortHash(draftHash ?? "")}
                    </code>
                    . Subscribers can retrieve it; the deletion is itself part
                    of the public record.
                  </p>
                  <p className="mt-3 text-[11.5px] italic leading-relaxed text-[var(--poa-ink-soft)]">
                    The piece does not disappear; only the CMS&rsquo;s
                    convenience around it does.
                  </p>
                </>
              )}
            </div>
            <footer
              className="border-t px-4 py-2"
              style={{ borderColor: "var(--poa-rule)" }}
            >
              <div className="grid grid-cols-[110px_1fr] gap-x-3 font-mono text-[10.5px] text-[var(--poa-ink-soft)]">
                <span className="uppercase tracking-[0.16em]">refusal hash</span>
                <span className="break-all">{refusalHash}</span>
                <span className="uppercase tracking-[0.16em]">signer</span>
                <span className="break-all">{MARCELLUS_KEY}</span>
                <span className="uppercase tracking-[0.16em]">counterparty</span>
                <span className="break-all">
                  {tamper.id === "label-pays"
                    ? LABEL_WALLET
                    : EDITORIAL_OPERATOR}
                </span>
              </div>
            </footer>
          </article>
        </div>
      )}

      <p className="mt-6 max-w-2xl text-[12.5px] leading-relaxed text-[var(--poa-ink-soft)]">
        Music criticism&rsquo;s value is independence. Centralized music
        publications have always struggled with the structural conflict
        between ad sales / label relationships and editorial integrity;
        readers learn over time which outlets to discount and by how much.
        Marcellus is built around the property that the critic&rsquo;s key
        is not the publication&rsquo;s. Payments and tamper attempts both
        become public artifacts before any softened review can be filed
        under the critic&rsquo;s name.
      </p>
    </section>
  );
}
