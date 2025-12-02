"use client";

import { useState, useRef, useEffect } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code?: string;
  children?: string;
  language?: string;
  filename?: string;
}

export default function CodeBlock({ code, children, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currentTimeout = timeoutRef.current;
    return () => {
      if (currentTimeout) clearTimeout(currentTimeout);
    };
  }, []);

  const displayCode = code || children || "";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(displayCode);
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="bg-[#0d1117] border border-gray-800 rounded-lg overflow-hidden">
        {(filename || language) && (
          <div className="px-4 py-2 bg-gray-900/50 border-b border-gray-800 text-xs text-gray-500 font-mono">
            {filename || language}
          </div>
        )}
        <pre className="p-4 font-mono text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap">{displayCode}</pre>
      </div>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 bg-gray-800/80 hover:bg-gray-700 rounded-md opacity-0 group-hover:opacity-100 transition-all"
        title="Copy to clipboard"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-gray-400" />
        )}
      </button>
    </div>
  );
}
