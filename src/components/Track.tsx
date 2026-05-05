"use client";

import { track } from "@vercel/analytics";
import Link from "next/link";
import type { ComponentProps, MouseEvent, ReactNode } from "react";

type TrackProps = {
  event: string;
  properties?: Record<string, string | number | boolean | null>;
  children: ReactNode;
};

type TrackedLinkProps = TrackProps &
  Omit<ComponentProps<typeof Link>, "onClick"> & {
    external?: boolean;
  };

export function TrackedLink({
  event,
  properties,
  external,
  children,
  ...linkProps
}: TrackedLinkProps) {
  const handleClick = () => {
    try {
      track(event, properties);
    } catch {
      // analytics failures must never break navigation
    }
  };

  if (external) {
    const { href, className, ...rest } = linkProps as ComponentProps<typeof Link> & {
      className?: string;
    };
    return (
      <a
        href={typeof href === "string" ? href : "#"}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={className}
        {...(rest as Record<string, unknown>)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link {...linkProps} onClick={handleClick}>
      {children}
    </Link>
  );
}

type TrackedAnchorProps = TrackProps & ComponentProps<"a">;

export function TrackedAnchor({
  event,
  properties,
  children,
  onClick,
  ...rest
}: TrackedAnchorProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    try {
      track(event, properties);
    } catch {
      // analytics failures must never break navigation
    }
    onClick?.(e);
  };
  return (
    <a {...rest} onClick={handleClick}>
      {children}
    </a>
  );
}
