import { Check, Minus } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import TrackOnVisible from "@/components/TrackOnVisible";
import SectionHeader from "./SectionHeader";

type Cell = "yes" | "no" | "soon";

interface Row {
  label: string;
  personal: Cell;
  saas: Cell;
  theseus: Cell;
}

const ROWS: Row[] = [
  {
    label: "Anyone can read every decision it made",
    personal: "no",
    saas: "no",
    theseus: "yes",
  },
  {
    label: "Rules can't change behind your back",
    personal: "yes",
    saas: "no",
    theseus: "yes",
  },
  {
    label: "Keeps running if the owner walks away",
    personal: "no",
    saas: "no",
    theseus: "yes",
  },
  {
    label: "Strangers can rely on it without a middleman",
    personal: "no",
    saas: "no",
    theseus: "yes",
  },
  {
    label: "Your inputs stay private",
    personal: "yes",
    saas: "no",
    theseus: "no",
  },
  {
    label: "Easy to start using today",
    personal: "no",
    saas: "yes",
    theseus: "soon",
  },
];

export default function Compare() {
  return (
    <section
      id="compare"
      className="bg-white px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 text-slate-900 dark:bg-transparent dark:text-white"
    >
      <div className="hero-card relative overflow-hidden rounded-2xl bg-[#F1EAE1] lg:rounded-3xl dark:bg-slate-900">
        <div className="relative z-10 max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-16 py-12 sm:py-14 lg:py-16">
          <TrackOnVisible event="home.compare.viewed" />
          <SectionHeader label="Compare" number="02" className="mb-8 lg:mb-10" />

          <ScrollReveal>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[clamp(2.5rem,3.4vw,4.25rem)] font-normal tracking-[-0.02em] leading-[1.04] max-w-4xl mb-10 lg:mb-12">
              Theseus vs <span className="italic">everywhere else</span> an agent can run.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <div className="overflow-x-auto -mx-2 sm:mx-0">
              <table className="w-full text-left border-collapse min-w-[520px]">
                <thead>
                  <tr className="border-b border-slate-300/70 dark:border-slate-700/60">
                    <th className="py-5 pr-4 align-bottom"></th>
                    <ColHeader
                      label="Personal"
                      sub="OpenClaw"
                    />
                    <ColHeader
                      label="SaaS"
                      sub="Cursor, Claude Code, Devin"
                    />
                    <ColHeader
                      label="Theseus"
                      sub="8 live demos"
                      highlight
                    />
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => (
                    <tr
                      key={row.label}
                      className="border-b border-slate-200/70 dark:border-slate-700/40 last:border-b-0"
                    >
                      <td className="py-4 pr-4 text-[13.5px] sm:text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
                        {row.label}
                      </td>
                      <CellEl cell={row.personal} />
                      <CellEl cell={row.saas} />
                      <CellEl cell={row.theseus} highlight />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          <TrackOnVisible event="home.compare.scrolled_through" />
        </div>
      </div>
    </section>
  );
}

function ColHeader({
  label,
  sub,
  highlight,
}: {
  label: string;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <th
      scope="col"
      className={`py-5 px-3 sm:px-4 text-center align-bottom w-[18%] sm:w-[20%] ${
        highlight ? "" : ""
      }`}
    >
      <div
        className={`font-mono text-[10.5px] sm:text-[11px] uppercase tracking-[0.18em] mb-1 ${
          highlight
            ? "text-indigo-700 dark:text-indigo-300"
            : "text-slate-500 dark:text-slate-500"
        }`}
      >
        {label}
      </div>
      <div className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
        {sub}
      </div>
    </th>
  );
}

function CellEl({ cell, highlight }: { cell: Cell; highlight?: boolean }) {
  return (
    <td
      className={`py-4 px-3 sm:px-4 text-center align-middle ${
        highlight
          ? "bg-indigo-50/60 dark:bg-indigo-300/[0.04]"
          : ""
      }`}
    >
      {cell === "yes" ? (
        <Check
          className={`inline-block ${
            highlight
              ? "text-indigo-600 dark:text-indigo-300"
              : "text-slate-700 dark:text-slate-300"
          }`}
          size={22}
          strokeWidth={2.5}
        />
      ) : cell === "soon" ? (
        <span className="inline-block font-mono text-[10.5px] uppercase tracking-[0.16em] text-amber-700 dark:text-amber-300">
          soon
        </span>
      ) : (
        <Minus
          className="inline-block text-slate-400/70 dark:text-slate-600"
          size={22}
          strokeWidth={2.5}
        />
      )}
    </td>
  );
}
