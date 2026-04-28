import ScrollReveal from "@/components/ScrollReveal";
import { EXTERNAL_LINKS } from "@/config/links";

const TierGlyph = ({ tier }: { tier: "Civic" | "Managed" | "Sovereign" }) => {
  const common = {
    width: 44,
    height: 44,
    viewBox: "0 0 44 44",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (tier === "Civic") {
    // Audit / scales
    return (
      <svg {...common}>
        <circle cx="22" cy="22" r="20" opacity="0.35" />
        <path d="M22 11v22" />
        <path d="M14 16h16" />
        <path d="M11 22l3-6 3 6a3 3 0 0 1-6 0z" opacity="0.85" />
        <path d="M27 22l3-6 3 6a3 3 0 0 1-6 0z" opacity="0.85" />
      </svg>
    );
  }
  if (tier === "Managed") {
    // Controller / dial with hand
    return (
      <svg {...common}>
        <circle cx="22" cy="22" r="20" opacity="0.35" />
        <circle cx="22" cy="22" r="9" />
        <path d="M22 14v4" />
        <path d="M30 22h-4" />
        <path d="M22 30v-4" />
        <path d="M14 22h4" />
        <path d="M22 22l5-3" />
      </svg>
    );
  }
  // Sovereign — key
  return (
    <svg {...common}>
      <circle cx="22" cy="22" r="20" opacity="0.35" />
      <circle cx="17" cy="22" r="5" />
      <path d="M22 22h12" />
      <path d="M30 22v4" />
      <path d="M34 22v3" />
    </svg>
  );
};

const useCases = [
  {
    title: "A verifiable oracle",
    tier: "Civic" as const,
    description:
      "Settles markets, prices, or signals by running inference and posting reasoning anyone can audit.",
    fragment: 'agent.settle("Will BTC > $100k?")',
  },
  {
    title: "A managed trading agent",
    tier: "Managed" as const,
    description:
      "Runs a strategy on its own balance. A controller key can pause or upgrade. Profits route to the owner.",
    fragment: "agent.trade(strategy)  ·  controller.pause()",
  },
  {
    title: "A self-owning agent",
    tier: "Sovereign" as const,
    description:
      "Holds its balance, pays for its own inference, and persists across operators.",
    fragment: "agent.pay(model)  ·  agent.persist()",
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
              Build an agent <span className="italic">people will trust.</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300">
              Same runtime, different intent: full autonomy, or trust properties without it.{" "}
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
                  <div className="text-indigo-500/80 dark:text-indigo-300/85 mb-4 sm:mb-5">
                    <TierGlyph tier={uc.tier} />
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-slate-900 dark:text-white">
                    {uc.title}
                  </h3>
                  <span className="inline-flex mt-4 px-2.5 py-1 text-xs font-mono uppercase tracking-[0.22em] text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-sm">
                    {uc.tier}
                  </span>
                </div>
                <div>
                  <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    {uc.description}
                  </p>
                  <code className="mt-4 inline-block font-mono text-[12px] sm:text-[13px] text-slate-500 dark:text-slate-500">
                    {uc.fragment}
                  </code>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
