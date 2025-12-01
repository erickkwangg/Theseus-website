"use client";

import { useState } from "react";

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
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-4">
            Three Forms of Personhood
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4">
            A New Class of Individuals
          </h2>
          <p className="text-gray-400 text-lg">
            Powering a{" "}
            <a 
              href="https://theseuschain.substack.com/p/the-theseus-thesis-part-2-tam-of" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
            >
              multi-trillion dollar market
            </a>
          </p>
        </div>

        {/* Cards - expandable */}
        <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
          {aiPersonTypes.map((type, index) => (
            <div
              key={index}
              className={`group bg-black border border-gray-800 p-6 lg:p-8 cursor-pointer
                          transition-all duration-300 hover:border-gray-600
                          ${expandedIndex === index ? 'border-gray-500 bg-gray-900/20' : ''}`}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              {/* Icon */}
              <div className="text-3xl lg:text-4xl mb-4 text-gray-600 group-hover:text-white transition-colors">
                {type.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-xl lg:text-2xl font-light mb-2">
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
                              ${expandedIndex === index ? 'opacity-0' : 'opacity-100 group-hover:opacity-100'}`}>
                <span className={`transform transition-transform ${expandedIndex === index ? 'rotate-90' : ''}`}>
                  →
                </span>
                Click to expand
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
