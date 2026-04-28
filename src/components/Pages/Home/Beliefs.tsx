import ScrollReveal from "@/components/ScrollReveal";
import BeliefsList from "./BeliefsList";
import Lineage from "./Lineage";
import Receipt from "./Receipt";
import SectionHeader from "./SectionHeader";

export default function Beliefs() {
  return (
    <>
      <section id="mission" className="bg-white px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 text-slate-900 dark:bg-transparent dark:text-white">
        <div className="hero-card relative overflow-hidden rounded-2xl bg-[#F1EAE1] lg:rounded-3xl dark:bg-slate-900">
          <div className="relative z-10 max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-16 py-12 sm:py-14 lg:py-16">
            <SectionHeader
              label="Mission"
              number="01"
              className="mb-8 lg:mb-10"
            />

            <ScrollReveal>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-[clamp(3rem,4.1vw,5rem)] font-normal tracking-[-0.02em] leading-[1.04] max-w-5xl mb-12 lg:mb-14">
                Agents with the trust properties of smart contracts
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16 lg:items-start">
              <BeliefsList />

              <ScrollReveal>
                <div className="lg:sticky lg:top-24">
                  <Receipt />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 sm:px-12 lg:px-16 pb-4 sm:pb-6 lg:pb-8 text-slate-900 dark:bg-transparent dark:text-white">
        <div className="max-w-[1700px] mx-auto">
          <ScrollReveal>
            <Lineage />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
