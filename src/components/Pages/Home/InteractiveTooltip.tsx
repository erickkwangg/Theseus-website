"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface InteractiveTooltipProps {
  word: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function InteractiveTooltip({
  title,
  description,
  children,
}: InteractiveTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) setIsVisible(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setIsVisible(false);
  };

  const handleClick = () => {
    if (isMobile) setIsVisible(!isVisible);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <span className="relative inline-block">
      <span
        className="cursor-pointer border-b border-dashed hover:border-solid border-gray-400"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {children}
      </span>

      {isVisible && (
        <>
          {/* Backdrop for mobile */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 md:hidden"
            onClick={handleClose}
          />

          {/* Tooltip */}
          <div className="fixed left-4 right-4 bottom-0 translate-y-0 md:-translate-y-1/2 bg-black  p-6 z-50 md:absolute md:left-full  md:ml-4 md:w-72 lg:w-96 md:right-auto border-2 border-gray-900">
            {/* Borders */}
            <div className="size-6 absolute -top-px -left-px border-l-2 border-t-2 border-white" />
            <div className="size-6 absolute -top-px -right-px border-r-2 border-t-2 border-white" />
            <div className="size-6 absolute -bottom-px -left-px border-l-2 border-b-2 border-white" />
            <div className="size-6 absolute -bottom-px -right-px border-r-2 border-b-2 border-white" />

            {/* Arrow pointing to the word */}
            {/* <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2">
              <div className="w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-gray-700"></div>
              <div className="w-0 h-0 border-t-7 border-b-7 border-r-7 border-t-transparent border-b-transparent border-r-black absolute left-0.5 top-1/2 -translate-y-1/2"></div>
            </div> */}

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors md:hidden"
            >
              <X size={16} />
            </button>

            {/* Content */}
            <div className="space-y-3 pr-6">
              <h3 className="text-white font-medium text-lg md:hidden">
                {title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </>
      )}
    </span>
  );
}
