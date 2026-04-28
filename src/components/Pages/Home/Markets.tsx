import ScrollReveal from "@/components/ScrollReveal";
import { EXTERNAL_LINKS } from "@/config/links";

const useCases = [
  {
    title: "A verifiable oracle",
    tier: "Civic",
    description:
      "Settles markets, prices, or signals by running inference and posting reasoning anyone can audit. No human committee, no centralized API.",
  },
  {
    title: "A managed trading agent",
    tier: "Managed",
    description:
      "Runs a strategy on its own balance. A controller key can pause or upgrade. Profits route to the owner address.",
  },
  {
    title: "A self-owning agent",
    tier: "Sovereign",
    description:
      "Holds its balance, pays for its own inference, sets its own pricing, and persists across operators.",
  },
];

export default function Markets() {
  return (
    <section
      className="text-slate-900 dark:text-white py-24 lg:py-32 section-soft-divider"
      id="market"
    >
      <div className="w-full max-w-5xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-16 lg:mb-20 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400 mb-6">
              Three ways to build
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[-0.015em] leading-[1.05] text-slate-900 dark:text-white">
              Same runtime, <span className="italic">different intent.</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300">
              Theseus serves builders who want full autonomy and builders who want trust properties without it.{" "}
              <a
                href={EXTERNAL_LINKS.substackTAM}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-700 dark:text-indigo-300 underline underline-offset-4 hover:text-indigo-900 dark:hover:text-indigo-200 transition-colors"
              >
                A multi-trillion dollar market.
              </a>
            </p>
          </div>
        </ScrollReveal>

        {/* Use cases */}
        <div className="divide-y divide-slate-200 dark:divide-slate-800 border-y border-slate-200 dark:border-slate-800">
          {useCases.map((uc, index) => (
            <ScrollReveal key={uc.title} delay={index + 1}>
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4 sm:gap-12 py-10 lg:py-14">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-slate-900 dark:text-white">
                    {uc.title}
                  </h3>
                  <span className="inline-flex mt-3 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700 rounded-sm">
                    {uc.tier}
                  </span>
                </div>
                <div>
                  <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    {uc.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
