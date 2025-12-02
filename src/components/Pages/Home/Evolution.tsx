"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { EXTERNAL_LINKS } from "@/config/links";

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
  const [activeIndex, setActiveIndex] = useState(-1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Animate icons sequentially when section comes into view
  useEffect(() => {
    const currentSection = sectionRef.current;
    const timeouts = timeoutsRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Start sequential animation
          evolutions.forEach((_, index) => {
            const timeout = setTimeout(() => {
              setActiveIndex(index);
            }, index * 400);
            timeouts.push(timeout);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      observer.disconnect();
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-black text-white py-16 lg:py-24 border-t border-gray-900">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light">
              Each step expands what can be <span className="text-blue-400">sovereign</span>.
            </h2>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line with animated glow */}
          <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-8 hidden md:block overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent transition-all duration-1000"
              style={{ 
                opacity: activeIndex >= 2 ? 1 : 0.3,
                transform: `scaleX(${activeIndex >= 0 ? 1 : 0})`,
              }}
            />
          </div>
          
          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-12 max-w-4xl mx-auto">
            {evolutions.map((item, index) => (
              <div key={index} className="text-center relative">
                {/* Icon */}
                <div className="flex justify-center mb-5">
                  <div 
                    className={`w-20 h-20 lg:w-24 lg:h-24 flex items-center justify-center 
                                bg-gray-900/50 rounded-full border transition-all duration-500
                                ${activeIndex >= index 
                                  ? 'border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.4)] scale-105' 
                                  : 'border-gray-800'}`}
                  >
                    <Image 
                      src={item.icon} 
                      alt={item.name}
                      width={48}
                      height={48}
                      className={`w-10 h-10 lg:w-12 lg:h-12 transition-all duration-500 ${
                        activeIndex >= index ? 'opacity-100' : 'opacity-50'
                      }`}
                    />
                  </div>
                </div>
                
                {/* Year badge */}
                <p className={`text-xs font-mono mb-2 transition-colors duration-500 ${
                  activeIndex >= index ? 'text-blue-400' : 'text-gray-600'
                }`}>{item.year}</p>
                
                {/* Name */}
                <h3 className={`text-xl lg:text-2xl font-light mb-2 transition-colors duration-500 ${
                  activeIndex >= index ? 'text-white' : 'text-gray-500'
                }`}>{item.name}</h3>
                
                {/* Label */}
                <p className={`text-sm transition-colors duration-500 ${
                  activeIndex >= index ? 'text-gray-300' : 'text-gray-600'
                }`}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Expandable explanation */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-gray-500 text-sm hover:text-blue-400 transition-colors inline-flex items-center gap-2 button-press"
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
              href={EXTERNAL_LINKS.substackEvolution}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 text-sm underline hover:text-blue-300 transition-colors"
            >
              Read the full thesis →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

