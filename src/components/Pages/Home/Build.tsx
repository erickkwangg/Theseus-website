import ScrollReveal from "@/components/ScrollReveal";
import BuildIDE from "./build/BuildIDE";
import NotifyCTA from "./build/NotifyCTA";
import SectionHeader from "./SectionHeader";

export default function Build() {
  return (
    <section
      id="build"
      className="bg-white px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 text-slate-900 dark:bg-transparent dark:text-white"
    >
      <div className="hero-card relative overflow-hidden rounded-2xl bg-[#F1EAE1] lg:rounded-3xl dark:bg-slate-900">
        <div className="relative z-10 max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-16 py-12 sm:py-14 lg:py-16">
          <SectionHeader
            label="Build"
            number="03"
            className="mb-8 lg:mb-10"
          />

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[38fr_62fr] lg:items-start lg:gap-12 xl:gap-16">
            <div className="contents lg:flex lg:flex-col lg:gap-8">
              <ScrollReveal>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-[clamp(2.5rem,3.4vw,4.25rem)] font-normal tracking-[-0.02em] leading-[1.04]">
                  Build agents that <em>show their work</em>.
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={1}>
                <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                  Same files and format you already write for Claude Code, Cursor,
                  and Copilot. Describe the agent, give it a driver program and
                  the skills it needs, and Theseus signs every step it takes.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={3} className="order-last lg:order-none lg:mt-2">
                <NotifyCTA />
              </ScrollReveal>
            </div>

            <ScrollReveal delay={2}>
              <BuildIDE />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
