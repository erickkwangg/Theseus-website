"use client";

import Image from "next/image";
import { useState } from "react";

const evolutions = [
  {
    icon: "/bitcoin-white.svg",
    name: "Bitcoin",
    label: "Programmable Money",
    year: "2009",
  },
  {
    icon: "/ethereum-white.svg",
    name: "Ethereum",
    label: "Programmable Contracts",
    year: "2015",
  },
  {
    icon: "/theseus-white.svg",
    name: "Theseus",
    label: "Agentic Contracts",
    year: "2025",
  },
];

export default function Evolution() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="bg-black text-white py-16 lg:py-24 border-t border-gray-900">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light">
            Each step expands what can be sovereign.
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent -translate-y-8 hidden md:block" />
          
          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-16">
            {evolutions.map((item, index) => (
              <div key={index} className="text-center relative">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center 
                                  bg-gray-900/50 rounded-full border border-gray-800
                                  hover:border-gray-600 hover:bg-gray-800/50 transition-all duration-300">
                    <Image 
                      src={item.icon} 
                      alt={item.name}
                      width={40}
                      height={40}
                      className="w-8 h-8 lg:w-10 lg:h-10"
                    />
                  </div>
                </div>
                
                {/* Year badge */}
                <p className="text-gray-600 text-xs font-mono mb-2">{item.year}</p>
                
                {/* Name */}
                <h3 className="text-xl lg:text-2xl font-light mb-2">{item.name}</h3>
                
                {/* Label */}
                <p className="text-gray-400 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Expandable explanation */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-gray-500 text-sm hover:text-white transition-colors inline-flex items-center gap-2"
          >
            {expanded ? "Hide explanation" : "Why is this the next step?"}
            <span className={`transform transition-transform ${expanded ? "rotate-180" : ""}`}>
              ↓
            </span>
          </button>
          
          <div className={`overflow-hidden transition-all duration-300 ${expanded ? "max-h-48 opacity-100 mt-6" : "max-h-0 opacity-0"}`}>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed mb-4">
              Bitcoin made money sovereign. Ethereum made contracts sovereign. 
              Theseus makes agents sovereign. AI that can own assets, make decisions, 
              and persist without human control. Each evolution expands the design space 
              of what can exist on-chain.
            </p>
            <a 
              href="https://theseuschain.substack.com/p/agents-as-an-evolution-of-smart-contracts"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-sm underline hover:text-gray-300 transition-colors"
            >
              Read the full thesis →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

