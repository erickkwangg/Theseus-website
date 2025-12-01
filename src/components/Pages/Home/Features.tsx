"use client";

import commitmentIcon from "@/assets/icon/commitment.svg";
import machineIcon from "@/assets/icon/machine.svg";
import treesIcon from "@/assets/icon/trees.svg";
import Image from "next/image";
import { useState } from "react";

const features = [
  {
    icon: machineIcon,
    title: "AIVM",
    subtitle: "AI Virtual Machine",
    description: "Full stateful agents as smart contracts, without the private keys that would control them. Not your weights, not your brain.",
  },
  {
    icon: commitmentIcon,
    title: "Tensor Commits",
    subtitle: "Verification Protocol",
    description: "<1% proof generation overhead. <0.1% verification time. The most efficient verification for shared-state AI.",
  },
  {
    icon: treesIcon,
    title: "Terkle Trees",
    subtitle: "Data Structures",
    description: "Merkle Trees generalized to tensor operations. Efficient cryptographic commitments for multi-dimensional AI data.",
  },
];

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-black text-white py-16 lg:py-24 grid-bg" id="about">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Big stat + tagline */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="mb-4">
            <span className="text-7xl sm:text-8xl lg:text-9xl font-extralight tracking-tight">
              1.3B
            </span>
          </div>
          <p className="text-gray-500 text-sm uppercase tracking-widest mb-6">
            AI agents by 2028
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light max-w-2xl mx-auto">
            Theseus gives them <span className="text-white">personhood</span>.
          </h2>
        </div>

        {/* Feature cards - icon-forward, hover to reveal */}
        <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 lg:p-10 rounded-lg border border-gray-800 bg-black/50 
                         hover:border-gray-600 transition-all duration-300 cursor-pointer
                         hover:bg-gray-900/30"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Icon - large and centered */}
              <div className="flex flex-col items-center text-center">
                <Image 
                  src={feature.icon} 
                  alt={feature.title} 
                  className="size-16 lg:size-20 mb-6 opacity-80 group-hover:opacity-100 
                             group-hover:scale-110 transition-all duration-300" 
                />
                <h3 className="text-xl lg:text-2xl font-medium mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">
                  {feature.subtitle}
                </p>
                
                {/* Description - fades in on hover */}
                <div 
                  className={`text-gray-400 text-sm leading-relaxed transition-all duration-300
                              ${hoveredIndex === index ? 'opacity-100 max-h-32' : 'opacity-0 max-h-0 overflow-hidden'}`}
                >
                  {feature.description}
                </div>
                
                {/* Hover hint */}
                <div 
                  className={`text-gray-600 text-xs mt-4 transition-opacity duration-300
                              ${hoveredIndex === index ? 'opacity-0' : 'opacity-100'}`}
                >
                  Hover to learn more
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
