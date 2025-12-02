"use client";

import { useState } from "react";

interface AIPersonTooltipProps {
  children: React.ReactNode;
}

export default function AIPersonTooltip({ children }: AIPersonTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span className="relative inline-block">
      <span
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
      >
        {children}
      </span>

      {/* Tooltip - positioned to the right */}
      <div 
        className={`absolute left-full top-0 ml-4 w-72 lg:w-80 z-[100] transition-all duration-300 ${
          isVisible 
            ? "opacity-100 translate-x-0 pointer-events-auto" 
            : "opacity-0 -translate-x-4 pointer-events-none"
        }`}
      >
        {/* Solid card */}
        <div className="relative bg-gray-950 border border-gray-800 rounded-lg p-5 shadow-2xl">
          {/* Content */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <h3 className="text-white font-medium text-sm">What is AI Personhood?</h3>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              Like giving AI a social security number and a license to think freely.
            </p>
            
            <p className="text-gray-500 text-xs leading-relaxed">
              They have their own wallet, their own memory, and nobody else holds the keys.
            </p>
          </div>
        </div>
      </div>
    </span>
  );
}

