import ScrollReveal from "@/components/ScrollReveal";
import { EXTERNAL_LINKS } from "@/config/links";

const agentTiers = [
  {
    title: "Sovereign Agent",
    tagline: "Self-directed, no human override",
    description: "Agents with their own goals and key custody that collaborate with humans and other agents to create new forms of value and emergent behavior.",
    icon: "◈",
  },
  {
    title: "Managed Agent", 
    tagline: "Human-owned, operationally independent",
    description: "Stateful agents with an associated human controller key, but still operate independently and can aggregate revenue directly to their owner.",
    icon: "◇",
  },
  {
    title: "Civic Agent",
    tagline: "Public-serving, transparent reasoning",
    description: "Fully autonomous agents that serve human interests with transparent reasoning, like smart contracts but with inference.",
    icon: "◆",
  },
];

export default function Markets() {
  return (
    <section className="market-bg text-white py-20 lg:py-28 section-soft-divider" id="market">
      {/* Section divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700/70 to-transparent mb-16 lg:mb-20" />
      
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-indigo-300/90 text-xs uppercase tracking-widest mb-4">
              Three Tiers of Agency
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4">
              A New Class of <span className="hero-title-gradient">Individuals</span>
            </h2>
            <p className="text-slate-300 text-lg sm:text-xl">
              Powering a{" "}
              <a 
                href={EXTERNAL_LINKS.substackTAM} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-300 underline hover:text-indigo-200 transition-colors"
              >
                multi-trillion dollar market
              </a>
            </p>
          </div>
        </ScrollReveal>

        {/* Cards - descriptions always visible */}
        <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
          {agentTiers.map((type, index) => (
            <ScrollReveal key={index} delay={index + 1}>
              <div className="group rounded-xl border border-gray-800 p-6 lg:p-8 
                             bg-gradient-to-br from-slate-900/90 via-slate-950/80 to-slate-950
                             card-tilt hover:border-indigo-400/40 hover:from-slate-900 h-full
                             transition-all duration-300">
                {/* Icon */}
                <div className="text-3xl lg:text-4xl mb-4 text-indigo-300/60 group-hover:text-indigo-300 transition-colors duration-300">
                  {type.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-light mb-2 group-hover:text-indigo-300 transition-colors duration-300">
                  {type.title}
                </h3>
                
                {/* Tagline */}
                <p className="text-indigo-300/75 text-sm sm:text-base mb-4">
                  {type.tagline}
                </p>
                
                {/* Description - always visible */}
                <p className="text-slate-300/90 text-sm sm:text-base leading-relaxed">
                  {type.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
