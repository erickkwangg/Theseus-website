import ScrollReveal from "@/components/ScrollReveal";

export default function Features() {
  return (
    <section
      className="text-slate-900 dark:text-white py-32 lg:py-48 section-soft-divider no-top-divider"
      id="about"
    >
      <div className="w-full max-w-3xl mx-auto px-6 sm:px-8 text-center">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400 mb-10">
            The bet
          </p>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <p className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal tracking-[-0.02em] leading-[1.05] text-slate-900 dark:text-white mb-16">
            Build an agent users will <span className="italic">trust with their money.</span>
          </p>
        </ScrollReveal>

        <ScrollReveal delay={2}>
          <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[-0.015em] leading-[1.1] text-slate-900 dark:text-white">
            Theseus is the only runtime that <span className="italic">earns it.</span>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
