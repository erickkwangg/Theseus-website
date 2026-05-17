// Renders the agent's deployable agent file. Theseus agents author in the
// OpenClaw-style format: a Markdown body with YAML frontmatter that names
// the models, tools, controller, and intent surface. The file is shape-
// compatible with personal-runtime skills tools (it ships as SKILL.md), but
// the unit is an agent, not a skill. This section shows the file verbatim
// so an operator can read or copy it and deploy a sibling.

import { buildAgentFile, agentSlug } from "@/lib/poa/agent-file";
import type { AgentSnapshot } from "@/lib/poa/types";
import CopyButton from "./CopyButton";

type Props = {
  snapshot: AgentSnapshot;
};

export default function AgentFile({ snapshot }: Props) {
  const file = buildAgentFile(snapshot);
  const slug = agentSlug(snapshot);
  const path = `agents/${slug}/SKILL.md`;

  return (
    <section
      className="mx-auto mt-12 max-w-[920px] border-t pt-10 print:hidden"
      style={{ borderColor: "var(--poa-rule)" }}
      id="agent-file"
    >
      <header className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <div>
          <p className="poa-stamp">Agent file · deployable</p>
          <h2 className="mt-1 font-serif text-2xl text-[var(--poa-ink)]">
            <span className="italic">{snapshot.name}</span> deploys from this
            file.
          </h2>
        </div>
        <CopyButton value={file} label="agent file" />
      </header>

      <p className="mb-5 max-w-2xl text-[13.5px] leading-relaxed text-[var(--poa-ink-soft)]">
        OpenClaw-style format: a Markdown body and a YAML frontmatter block.
        Same file shape personal-runtime tools use, plus Theseus frontmatter
        that names the models, tools, controller, and intent surface. Fork it,
        change the body, deploy a sibling.
      </p>

      <div
        className="poa-playground overflow-hidden border"
        style={{ borderColor: "var(--poa-rule)" }}
      >
        <div
          className="flex items-baseline justify-between border-b px-4 py-2"
          style={{ borderColor: "var(--poa-rule)" }}
        >
          <p className="poa-stamp">{path}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--poa-ink-soft)]">
            {file.length.toLocaleString()} chars
          </p>
        </div>
        <pre className="max-h-[70vh] overflow-y-auto whitespace-pre-wrap break-words px-5 py-4 font-mono text-[12px] leading-relaxed text-[var(--poa-ink)]">
          {file}
        </pre>
      </div>
    </section>
  );
}
