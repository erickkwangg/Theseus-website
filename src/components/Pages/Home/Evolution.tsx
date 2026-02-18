"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { EXTERNAL_LINKS } from "@/config/links";

const evolutions = [
  {
    icon: "/logos/chatgpt.svg",
    name: "ChatGPT",
    unlock: "Reasoning and language intelligence at scale.",
    cannot: "Can't act. Responds but never initiates.",
    year: "2022",
    invert: false,
  },
  {
    icon: "/logos/openclaw.svg",
    name: "OpenClaw",
    unlock: "Execution rails for AI actions.",
    cannot: "Can't transact or persist. No wallet or identity.",
    year: "2025",
    invert: true,
  },
  {
    icon: "/theseus-white.svg",
    name: "Theseus",
    unlock: "AI Persons that own keys, hold balances, and persist.",
    year: "Now",
    invert: false,
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
    <section ref={sectionRef} className="text-white py-20 lg:py-28 border-t border-slate-800/70 section-soft-divider">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light">
              AI can reason. AI can act. Only Theseus makes it <span className="text-indigo-300">sovereign</span>.
            </h2>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line with animated glow */}
          <div className="absolute top-10 lg:top-12 left-0 right-0 h-px hidden md:block overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent transition-all duration-1000"
              style={{ 
                opacity: activeIndex >= evolutions.length - 1 ? 1 : 0.3,
                transform: `scaleX(${activeIndex >= 0 ? 1 : 0})`,
              }}
            />
          </div>
          
          {/* Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-10 max-w-6xl mx-auto px-6">
            {evolutions.map((item, index) => (
              <div key={index} className="text-center relative">
                {/* Icon */}
                <div className="flex justify-center mb-5">
                  <div 
                    className={`w-20 h-20 lg:w-24 lg:h-24 flex items-center justify-center 
                                bg-slate-900/70 rounded-full border transition-all duration-500
                                ${activeIndex >= index 
                                  ? item.year === "Now"
                                    ? 'border-green-400 shadow-[0_0_30px_rgba(74,222,128,0.35)] scale-105'
                                    : 'border-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.35)] scale-105'
                                  : 'border-slate-700'}`}
                  >
                    <Image
                      src={item.icon}
                      alt={`${item.name} logo`}
                      width={44}
                      height={44}
                      className={`w-11 h-11 lg:w-12 lg:h-12 object-contain transition-all duration-500 ${
                        item.invert ? "brightness-0 invert" : ""
                      } ${
                        activeIndex >= index ? "opacity-100" : "opacity-60 grayscale"
                      }`}
                    />
                  </div>
                </div>
                
                {/* Year badge */}
                <p className={`text-xs font-mono mb-2 transition-colors duration-500 ${
                  item.year === "Now"
                    ? activeIndex >= index ? 'text-green-400' : 'text-slate-500'
                    : activeIndex >= index ? 'text-indigo-300' : 'text-slate-500'
                }`}>{item.year}</p>
                
                {/* Name */}
                <h3 className={`text-xl lg:text-2xl font-light mb-2 transition-colors duration-500 ${
                  activeIndex >= index ? 'text-white' : 'text-slate-400'
                }`}>{item.name}</h3>
                
                {/* Unlock */}
                <p className={`text-sm min-h-[3rem] transition-colors duration-500 ${
                  activeIndex >= index ? 'text-slate-300' : 'text-slate-500'
                }`}>{item.unlock}</p>

                {/* Constraint */}
                {item.cannot ? (
                  <p className={`hidden sm:block text-sm mt-2 min-h-[2.5rem] transition-colors duration-500 ${
                    activeIndex >= index ? 'text-rose-300/80' : 'text-slate-600'
                  }`}>
                    {item.cannot}
                  </p>
                ) : <div className="hidden sm:block min-h-[2.5rem]" />}
              </div>
            ))}
          </div>
        </div>

        {/* Expandable explanation */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-slate-400 text-sm hover:text-indigo-300 transition-colors inline-flex items-center gap-2 button-press"
          >
            {expanded ? "Hide" : "Why does this matter?"}
            <span className={`transform transition-transform ${expanded ? "rotate-180" : ""}`}>
              ↓
            </span>
          </button>
          
          <div className={`overflow-hidden transition-all duration-300 ${expanded ? "max-h-72 opacity-100 mt-6" : "max-h-0 opacity-0"}`}>
            <p className="text-slate-300/90 text-sm max-w-3xl mx-auto leading-relaxed mb-4">
              ChatGPT proved AI could reason. OpenClaw proved it could act. But neither gives AI native
              key custody, settlement, or economic persistence. Theseus closes that gap: AI Persons that
              hold their own keys, manage their own balances, and persist autonomously without a
              human-controlled key path.
            </p>
            <a
              href={EXTERNAL_LINKS.substackEvolution}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-300 text-sm underline hover:text-indigo-200 transition-colors"
            >
              Read the full thesis
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

