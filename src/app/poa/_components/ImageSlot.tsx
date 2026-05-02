// ImageSlot: server-side check that a public/ image exists; render the real
// next/image if it does, otherwise a styled placeholder frame (or a custom
// fallback element). Lets us pre-wire layout for AI-generated images that
// haven't landed yet, so dropping a file at the documented path makes the
// page come alive.
//
// Server component: fs.existsSync runs at request time on the Node runtime.
// Microseconds; fine for these counts.

import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imgClassName?: string;
  // Optional element rendered when the file is missing. If not provided, a
  // styled placeholder with the slot path printed inside is used.
  fallback?: React.ReactNode;
  // If true, eagerly load (above the fold).
  priority?: boolean;
  // Caption for the placeholder, hinting what should land here.
  pendingHint?: string;
};

function fileExists(publicPath: string): boolean {
  try {
    const trimmed = publicPath.replace(/^\//, "");
    return fs.existsSync(path.join(process.cwd(), "public", trimmed));
  } catch {
    return false;
  }
}

export default function ImageSlot({
  src,
  alt,
  width,
  height,
  className,
  imgClassName,
  fallback,
  priority,
  pendingHint,
}: Props) {
  const exists = fileExists(src);
  if (exists) {
    return (
      <div className={className}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={cn("block h-auto w-full", imgClassName)}
        />
      </div>
    );
  }
  if (fallback !== undefined) {
    return <div className={className}>{fallback}</div>;
  }
  // Default placeholder frame: dashed, paper-tinted, matches credential rhythm.
  return (
    <div
      className={cn(
        "grid place-items-center border border-dashed border-slate-400/45 bg-white/45 dark:border-slate-500/40 dark:bg-slate-900/40",
        className,
      )}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <div className="flex flex-col items-center gap-1.5 px-4 py-4 text-center text-slate-500 dark:text-slate-400">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
          image pending
        </span>
        <code className="font-mono text-[10px]">{src}</code>
        {pendingHint && (
          <span className="mt-1 max-w-[28ch] text-[11px] italic leading-snug">
            {pendingHint}
          </span>
        )}
      </div>
    </div>
  );
}
