// Renders the agent's deployable SKILL.md document. Theseus agents are
// authored and deployed as Claude-Skills-compatible SKILL.md files with
// extended Theseus frontmatter (models, tools, sovereign, controller,
// intent_types). This component shows the file verbatim so an operator
// can read or copy it and deploy a clone elsewhere.

import { buildSkillFile, agentSlug } from "@/lib/poa/skill";
import type { AgentSnapshot } from "@/lib/poa/types";
import CopyButton from "./CopyButton";

type Props = {
  snapshot: AgentSnapshot;
};

export default function SkillFile({ snapshot }: Props) {
  const skill = buildSkillFile(snapshot);
  const slug = agentSlug(snapshot);
  const path = `agents/${slug}/SKILL.md`;

  return (
    <section
      className="mx-auto mt-12 max-w-[920px] border-t pt-10 print:hidden"
      style={{ borderColor: "var(--poa-rule)" }}
      id="skill-file"
    >
      <header className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <div>
          <p className="poa-stamp">Skill file · deployable</p>
          <h2 className="mt-1 font-serif text-2xl text-[var(--poa-ink)]">
            <span className="italic">{snapshot.name}</span> deploys from this{" "}
            <code className="font-mono text-[15px]">SKILL.md</code>.
          </h2>
        </div>
        <CopyButton value={skill} label="SKILL.md" />
      </header>

      <p className="mb-5 max-w-2xl text-[13.5px] leading-relaxed text-[var(--poa-ink-soft)]">
        Same Markdown-with-YAML format Claude Skills use, plus a Theseus
        frontmatter extension that names the models, tools, controller, and
        intent surface. Fork it, change the body, deploy a sibling agent.
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
            {skill.length.toLocaleString()} chars
          </p>
        </div>
        <pre className="max-h-[70vh] overflow-y-auto whitespace-pre-wrap break-words px-5 py-4 font-mono text-[12px] leading-relaxed text-[var(--poa-ink)]">
          {skill}
        </pre>
      </div>
    </section>
  );
}
