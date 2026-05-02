"use client";

import { useEffect, useState } from "react";

// RelativeTime — auto-updating "issued 14 min ago" string. Updates every 60s
// so a credential left open in a tab feels like it's tracking time, not
// frozen at the moment of load.

function relativeFromNow(epochMs: number): string {
  const diffSec = Math.max(0, (Date.now() - epochMs) / 1000);
  if (diffSec < 60) return "just now";
  const min = Math.floor(diffSec / 60);
  if (min < 60) return `${min} min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} h ago`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day} day${day === 1 ? "" : "s"} ago`;
  const month = Math.floor(day / 30);
  if (month < 12) return `${month} month${month === 1 ? "" : "s"} ago`;
  const year = Math.floor(day / 365);
  return `${year} year${year === 1 ? "" : "s"} ago`;
}

export default function RelativeTime({
  epochMs,
  className,
}: {
  epochMs: number;
  className?: string;
}) {
  const [now, setNow] = useState(() => relativeFromNow(epochMs));
  useEffect(() => {
    const id = setInterval(() => setNow(relativeFromNow(epochMs)), 60_000);
    return () => clearInterval(id);
  }, [epochMs]);
  return <span className={className}>{now}</span>;
}
