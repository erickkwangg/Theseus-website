"use client";

import { useState } from "react";
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
    title: "Lighthouse AI",
    tagline: "Sovereign and public-serving",
    description: "Fully sovereign entity that serves human interests and may aggregate value to humans instead of itself, like smart contracts but with inference.",
    icon: "◆",
  },
];

export default function Markets() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="market-bg text-white py-16 lg:py-24" id="market">
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

        {/* Cards - expandable */}
        <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
          {aiPersonTypes.map((type, index) => (
            <ScrollReveal key={index} delay={index + 1}>
              <div
                className={`group bg-black border border-gray-800 p-6 lg:p-8 cursor-pointer
                            card-tilt hover:border-blue-500/30
                            ${expandedIndex === index ? 'border-blue-500/50 bg-blue-950/10' : ''}`}
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              >
                {/* Icon */}
                <div className={`text-3xl lg:text-4xl mb-4 transition-colors duration-300 ${
                  expandedIndex === index ? 'text-blue-400' : 'text-gray-600 group-hover:text-blue-400'
                }`}>
                  {type.icon}
                </div>
                
                {/* Title */}
                <h3 className={`text-xl lg:text-2xl font-light mb-2 transition-colors duration-300 ${
                  expandedIndex === index ? 'text-blue-400' : 'group-hover:text-white'
                }`}>
                  {type.title}
                </h3>
                
                {/* Tagline - always visible */}
                <p className="text-gray-400 text-sm mb-4">
                  {type.tagline}
                </p>
                
                {/* Expanded content */}
                <div 
                  className={`overflow-hidden transition-all duration-300
                              ${expandedIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="pt-4 border-t border-gray-800">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {type.description}
                    </p>
                  </div>
                </div>
                
                {/* Expand indicator */}
                <div className={`text-gray-600 text-xs mt-4 flex items-center gap-2 transition-all duration-300
                                ${expandedIndex === index ? 'opacity-0' : 'opacity-100 group-hover:text-blue-400'}`}>
                  <span className={`transform transition-transform ${expandedIndex === index ? 'rotate-90' : ''}`}>
                    →
                  </span>
                  Click to expand
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
