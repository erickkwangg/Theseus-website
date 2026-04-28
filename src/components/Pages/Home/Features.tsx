import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

const features = [
  {
    title: "AIVM",
    description:
      "Stateful AI agents run as verifiable programs that execute autonomously. No host platform can silently override them.",
    href: "/docs/aivm",
  },
  {
    title: "Tensor Commits",
    description:
      "Sub-1% proof generation overhead. ~2 ms verification per inference. The cheapest verifiable inference primitive at frontier scale.",
    href: "/docs/tensor-commits",
  },
  {
    title: "Terkle Trees",
    description:
      "Merkle trees generalized to tensors. Cryptographic commitments to multi-dimensional weights and activations.",
    href: "/docs/tensor-commits",
  },
];

export default function Features() {
  return (
    <section
      className="text-slate-900 dark:text-white py-24 lg:py-32 section-soft-divider no-top-divider"
      id="about"
    >
      <div className="w-full max-w-5xl mx-auto px-6 sm:px-8">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-16 lg:mb-20 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mb-6">
              The runtime
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[-0.015em] leading-[1.05] text-slate-900 dark:text-white">
              Three primitives that make agents
              <br />
              <span className="italic">first-class on-chain.</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Feature list */}
        <div className="divide-y divide-slate-200 dark:divide-slate-800 border-y border-slate-200 dark:border-slate-800">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index + 1}>
              <Link
                href={feature.href}
                className="group grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4 sm:gap-12 py-10 lg:py-14 transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/40"
              >
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                  {feature.title}
                </h3>
                <div>
                  <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-4 text-sm text-slate-500 dark:text-slate-500 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                    Read more →
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
