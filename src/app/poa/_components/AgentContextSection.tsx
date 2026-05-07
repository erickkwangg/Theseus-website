// Renders the agent's published context: the system prompt it runs under,
// what it reads as input each cycle, what it emits, and an optional link
// to a live demo. Shown only when a snapshot includes a `context` field
// (typically: agents that opt in to publishing their instructions).

import Link from "next/link";
import type { AgentContext } from "@/lib/poa/types";

type Props = {
  context: AgentContext;
  agentName: string;
};

export default function AgentContextSection({ context, agentName }: Props) {
  return (
    <section
      className="mx-auto mt-12 max-w-[920px] border-t pt-10 print:hidden"
      style={{ borderColor: "var(--poa-rule)" }}
      id="agent-context"
    >
      <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 mb-6">
        <div>
          <p className="poa-stamp">Agent context</p>
          <h2 className="mt-1 font-serif text-2xl text-[var(--poa-ink)]">
            What {agentName} reads, knows, and writes
          </h2>
          <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-[var(--poa-ink-soft)]">
            The instructions below are the verbatim system prompt the agent
            runs under. Every decision the agent makes, anyone can read
            exactly what the model saw and reasoned over.
          </p>
        </div>
        {context.demoUrl && (
          <Link
            href={context.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="poa-stamp underline decoration-[color:var(--poa-rule)] underline-offset-[4px] transition-colors hover:text-[var(--poa-ink)] hover:decoration-[color:var(--poa-ink)]"
          >
            See it running ↗
          </Link>
        )}
      </header>

      <div className="grid gap-6 sm:grid-cols-2 mb-6">
        {(context.inputs || context.schedule) && (
          <div>
            <p className="poa-stamp mb-2">Inputs</p>
            {context.schedule && (
              <p className="mb-2 text-[12.5px] italic text-[var(--poa-ink-soft)]">
                {context.schedule}
              </p>
            )}
            {context.inputs && (
              <ul className="space-y-1.5 text-[13px] leading-relaxed text-[var(--poa-ink)]">
                {context.inputs.map((line, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[var(--poa-ink-soft)]">·</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {context.outputs && (
          <div>
            <p className="poa-stamp mb-2">Output</p>
            <p className="text-[13px] leading-relaxed text-[var(--poa-ink)]">
              {context.outputs}
            </p>
          </div>
        )}
      </div>

      <div>
        <div className="mb-2 flex items-baseline justify-between">
          <p className="poa-stamp">System prompt (verbatim)</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--poa-ink-soft)]">
            {context.instructions.length.toLocaleString()} chars
          </p>
        </div>
        <pre
          className="max-h-[60vh] overflow-y-auto whitespace-pre-wrap break-words border bg-[var(--poa-paper)] px-5 py-4 font-mono text-[12px] leading-relaxed text-[var(--poa-ink)]"
          style={{ borderColor: "var(--poa-rule)" }}
        >
          {context.instructions}
        </pre>
      </div>
    </section>
  );
}
