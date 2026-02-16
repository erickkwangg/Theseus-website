"use client";

import { useState } from "react";
import { Link as LinkIcon, Check } from "lucide-react";

interface AnchorHeadingProps {
  id: string;
  level?: 2 | 3;
  children: React.ReactNode;
  className?: string;
}

export default function AnchorHeading({ id, level = 2, children, className = "" }: AnchorHeadingProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const Tag = level === 2 ? "h2" : "h3";
  const baseStyles = level === 2 
    ? "text-2xl font-medium mb-4" 
    : "text-xl font-medium mb-3";

  return (
    <Tag id={id} className={`${baseStyles} ${className} group flex items-center gap-2`}>
      {children}
      <a
        href={`#${id}`}
        onClick={handleCopy}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-800 rounded"
        title="Copy link to section"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-400" />
        ) : (
          <LinkIcon className="h-4 w-4 text-slate-500 hover:text-indigo-300" />
        )}
      </a>
    </Tag>
  );
}




