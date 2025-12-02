import ScrollReveal from "@/components/ScrollReveal";
import { EXTERNAL_LINKS } from "@/config/links";

const aiPersonTypes = [
  {
    title: "Free AI Person",
    tagline: "AI with autonomous goals",
    description: "AI with their own goals and purposes, who can collaborate with humans and other agents to create new forms of value and new types of emergent behavior.",
    icon: "◈",
  },
  {
    title: "Proto-AI Person", 
    tagline: "Human-owned, operationally independent",
    description: "Stateful AI with an associated human private key, but still operates independently and can aggregate revenue directly to its owner.",
    icon: "◇",
  },
  {
    title: "Civic Agents",
    tagline: "Sovereign and public-serving",
    description: "Fully sovereign entity that serves human interests and may aggregate value to humans instead of itself, like smart contracts but with inference.",
    icon: "◆",
  },
];

export default function Markets() {
  return (
    <section className="market-bg text-white py-16 lg:py-24" id="market">
      {/* Section divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-16 lg:mb-20" />
      
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-blue-400/80 text-xs uppercase tracking-widest mb-4">
              Three Forms of Personhood
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4">
              A New Class of <span className="gradient-text">Individuals</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Powering a{" "}
              <a 
                href={EXTERNAL_LINKS.substackTAM} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 underline hover:text-blue-300 transition-colors"
              >
                multi-trillion dollar market
              </a>
            </p>
          </div>
        </ScrollReveal>

        {/* Cards - descriptions always visible */}
        <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
          {aiPersonTypes.map((type, index) => (
            <ScrollReveal key={index} delay={index + 1}>
              <div className="group bg-black border border-gray-800 p-6 lg:p-8 card-tilt hover:border-blue-500/30 h-full">
                {/* Icon */}
                <div className="text-3xl lg:text-4xl mb-4 text-gray-600 group-hover:text-blue-400 transition-colors duration-300">
                  {type.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-light mb-2 group-hover:text-blue-400 transition-colors duration-300">
                  {type.title}
                </h3>
                
                {/* Tagline */}
                <p className="text-blue-400/70 text-sm mb-4">
                  {type.tagline}
                </p>
                
                {/* Description - always visible */}
                <p className="text-gray-400 text-sm leading-relaxed">
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
