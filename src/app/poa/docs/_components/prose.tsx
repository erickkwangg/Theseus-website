import type { ReactNode } from "react";
import Link from "next/link";

// Small set of shared elements for PoA doc bodies. Each page composes these
// rather than reaching for global prose styles, which keeps the editorial
// register consistent with the rest of /poa.

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-12 mb-4 font-serif text-[clamp(1.5rem,2.6vw,2rem)] leading-tight tracking-tight text-[var(--poa-ink)] [text-wrap:balance]">
      {children}
    </h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-8 mb-3 font-serif text-[1.125rem] leading-snug text-[var(--poa-ink)]">
      {children}
    </h3>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="text-[15px] leading-[1.7] text-[var(--poa-ink-soft)]">{children}</p>;
}

export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="font-serif text-[18px] italic leading-snug text-[var(--poa-ink-soft)]">
      {children}
    </p>
  );
}

export function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-medium text-[var(--poa-ink)]">{children}</strong>;
}

export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-[2px] border border-[color:var(--poa-rule)] bg-[var(--poa-paper-card)] px-1.5 py-[1px] font-mono text-[12.5px] text-[var(--poa-ink)]">
      {children}
    </code>
  );
}

export function Code({
  children,
  language,
}: {
  children: string;
  language?: string;
}) {
  return (
    <pre
      className="my-4 overflow-x-auto rounded-[2px] border bg-[var(--poa-paper-card)] px-4 py-3 font-mono text-[12.5px] leading-[1.55] text-[var(--poa-ink)]"
      style={{ borderColor: "var(--poa-rule)" }}
      data-language={language}
    >
      <code>{children}</code>
    </pre>
  );
}

export function UL({ children }: { children: ReactNode }) {
  return (
    <ul className="ml-5 list-disc space-y-2 text-[15px] leading-[1.7] text-[var(--poa-ink-soft)] marker:text-[color:var(--poa-sepia)]">
      {children}
    </ul>
  );
}

export function OL({ children }: { children: ReactNode }) {
  return (
    <ol className="ml-5 list-decimal space-y-2 text-[15px] leading-[1.7] text-[var(--poa-ink-soft)] marker:text-[color:var(--poa-sepia)]">
      {children}
    </ol>
  );
}

export function Note({
  label = "Note",
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <aside
      className="my-6 border-l-2 px-4 py-3"
      style={{ borderColor: "var(--poa-wax)", background: "var(--poa-wax-soft)" }}
    >
      <p className="poa-stamp" style={{ color: "var(--poa-wax)" }}>
        {label}
      </p>
      <div className="mt-1.5 text-[14px] leading-[1.65] text-[var(--poa-ink)]">
        {children}
      </div>
    </aside>
  );
}

export function PrevNext({
  prev,
  next,
}: {
  prev?: { href: string; label: string };
  next?: { href: string; label: string };
}) {
  return (
    <div
      className="mt-16 flex items-center justify-between gap-6 border-t pt-6"
      style={{ borderColor: "var(--poa-rule)" }}
    >
      <div>
        {prev ? (
          <Link
            href={prev.href}
            className="block text-[13px] text-[var(--poa-ink-soft)] hover:text-[var(--poa-ink)]"
          >
            <span className="poa-stamp">&larr; Prev</span>
            <span className="mt-1 block font-serif italic">{prev.label}</span>
          </Link>
        ) : null}
      </div>
      <div className="text-right">
        {next ? (
          <Link
            href={next.href}
            className="block text-[13px] text-[var(--poa-ink-soft)] hover:text-[var(--poa-ink)]"
          >
            <span className="poa-stamp">Next &rarr;</span>
            <span className="mt-1 block font-serif italic">{next.label}</span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
