"use client";

import { useState, useRef, useEffect } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const t = timeoutRef.current;
    return () => {
      if (t) clearTimeout(t);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard may be unavailable in insecure contexts
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy code"}
      className="absolute top-2 right-2 p-2 rounded-md bg-slate-200/80 hover:bg-slate-300 dark:bg-slate-800/80 dark:hover:bg-slate-700 opacity-70 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
      ) : (
        <Copy className="w-4 h-4 text-slate-600 dark:text-slate-300" />
      )}
    </button>
  );
}
