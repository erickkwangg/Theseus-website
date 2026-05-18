// Build the deployable THESEUS.md for a Theseus agent.
//
// The OpenClaw-style agent format: an agent directory contains a top-level
// THESEUS.md (analog to Claude Code's CLAUDE.md) plus optional skills/
// subdirectories where each reusable capability is its own SKILL.md.
// Canonical frontmatter fields: name, id, models, native-tools, schedule.
// Theseus extensions read by the chain at registration: sovereign,
// controller, intent_types.
//
// PoA fixtures don't currently define user-authored sub-skills (their
// tool surface is built-in native tools), so each fixture renders as a
// single THESEUS.md.

import type { AgentSkill, AgentSnapshot } from "./types";

export function agentSlug(snapshot: AgentSnapshot): string {
  return snapshot.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// YAML scalars that look like booleans, nulls, numbers, or dates get
// silently reinterpreted by parsers. Quote anything that could trip that.
const YAML_RESERVED = new Set([
  "y",
  "yes",
  "n",
  "no",
  "true",
  "false",
  "on",
  "off",
  "null",
  "~",
  "",
]);

function needsQuoting(s: string): boolean {
  if (YAML_RESERVED.has(s.toLowerCase())) return true;
  // Special YAML characters anywhere
  if (/[:#&*!|>'"%@`]/.test(s)) return true;
  // Leading punctuation that carries YAML meaning
  if (/^[-?,\[\]{}~&*!|>]/.test(s)) return true;
  // Numeric-shaped (int, float, hex, octal, exponent, sign)
  if (/^[+-]?(\.\d+|\d+\.?\d*([eE][+-]?\d+)?|0x[0-9a-fA-F]+|0o[0-7]+)$/.test(s))
    return true;
  // ISO date / datetime
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return true;
  if (s.includes("\n")) return true;
  // Trailing/leading whitespace
  if (s !== s.trim()) return true;
  return false;
}

function yamlString(s: string): string {
  if (needsQuoting(s)) return JSON.stringify(s);
  return s;
}

function yamlList(items: readonly string[]): string {
  if (items.length === 0) return "[]";
  // Quote any item that needs it (e.g., contains spaces, commas, or YAML hazards).
  // Within a flow list, items also need quoting if they contain `,` or `]`.
  const itemNeedsListQuoting = (s: string) =>
    needsQuoting(s) || /[,\]]/.test(s) || s.includes(" ");
  return (
    "[" +
    items.map((it) => (itemNeedsListQuoting(it) ? JSON.stringify(it) : it)).join(", ") +
    "]"
  );
}

// Collapse newlines and runs of whitespace to single spaces so a multi-line
// string fits on one markdown bullet without breaking the list.
function inlineLine(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

// Split an instructions blob into identity (soul) + operational rest.
// Heuristic: everything before the first `## ` heading is identity prose.
// If there are no headings, the first paragraph is identity and the rest
// is operational. Returns nulls for empty halves so callers can decide
// whether to emit the corresponding file.
function splitSoulAndRest(instructions: string): {
  soul: string | null;
  rest: string;
} {
  const trimmed = instructions.trim();
  if (!trimmed) return { soul: null, rest: "" };
  const headingMatch = trimmed.match(/^## /m);
  if (headingMatch && headingMatch.index !== undefined && headingMatch.index > 0) {
    const soul = trimmed.substring(0, headingMatch.index).trim();
    const rest = trimmed.substring(headingMatch.index).trim();
    return { soul: soul || null, rest };
  }
  // No `## ` heading. Take the first paragraph as soul, the rest as ops.
  const paraSplit = trimmed.indexOf("\n\n");
  if (paraSplit === -1) {
    // Single paragraph: treat as identity-only, no operational rest.
    return { soul: trimmed, rest: "" };
  }
  const soul = trimmed.substring(0, paraSplit).trim();
  const rest = trimmed.substring(paraSplit).trim();
  return { soul: soul || null, rest };
}

// Resolves the SOUL.md body for a snapshot, preferring an explicit
// `context.soul` field but falling back to the heuristic split.
export function resolveSoulBody(snapshot: AgentSnapshot): string | null {
  const explicit = snapshot.context?.soul?.trim();
  if (explicit) return explicit;
  const instructions = snapshot.context?.instructions;
  if (!instructions) return null;
  return splitSoulAndRest(instructions).soul;
}

// Resolves what THESEUS.md should put under its Instructions heading.
// If a soul was extracted from the instructions, we drop it here so the
// two files don't repeat content.
function resolveOperationalInstructions(
  snapshot: AgentSnapshot,
): string | null {
  const instructions = snapshot.context?.instructions;
  if (!instructions) return null;
  // If the snapshot ships an explicit soul, the whole instructions blob
  // is operational by definition.
  if (snapshot.context?.soul?.trim()) return instructions.trim() || null;
  const { rest } = splitSoulAndRest(instructions);
  return rest || null;
}

export function buildAgentFile(snapshot: AgentSnapshot): string {
  const slug = agentSlug(snapshot);
  const description =
    snapshot.summary?.split(/(?<=\.)\s/)[0]?.trim() ??
    `Theseus agent ${snapshot.name}.`;

  // Canonical THESEUS.md frontmatter, in the order the homepage Build
  // example uses, with Theseus extension fields grouped at the bottom.
  const frontmatter: string[] = ["---"];
  frontmatter.push(`name: ${yamlString(snapshot.name)}`);
  frontmatter.push(`id: ${slug}`);
  frontmatter.push(`description: ${yamlString(description)}`);
  frontmatter.push(`models: ${yamlList(snapshot.capabilities.models)}`);
  frontmatter.push(`native-tools: ${yamlList(snapshot.capabilities.tools)}`);
  if (snapshot.context?.schedule) {
    frontmatter.push(`schedule: ${yamlString(snapshot.context.schedule)}`);
  }
  // Theseus extensions
  frontmatter.push(`sovereign: ${snapshot.sovereign ? "true" : "false"}`);
  frontmatter.push(
    `controller: ${snapshot.controller ? snapshot.controller : "null"}`,
  );
  frontmatter.push(
    `intent_types: ${yamlList(snapshot.capabilities.intentTypes)}`,
  );
  frontmatter.push("---");

  const body: string[] = [];
  body.push("");
  body.push(`# ${snapshot.name}`);
  body.push("");

  if (snapshot.summary) {
    body.push("## What it does");
    body.push("");
    body.push(snapshot.summary);
    body.push("");
  }

  const ctx = snapshot.context;
  if (ctx?.inputs && ctx.inputs.length > 0) {
    body.push("## Inputs");
    body.push("");
    for (const line of ctx.inputs) {
      body.push(`- ${inlineLine(line)}`);
    }
    body.push("");
  }

  if (ctx?.outputs) {
    body.push("## Outputs");
    body.push("");
    body.push(ctx.outputs.trim());
    body.push("");
  }

  const operationalInstructions = resolveOperationalInstructions(snapshot);
  if (operationalInstructions) {
    body.push("## Instructions");
    body.push("");
    // Demote any `## ` headings inside the verbatim instructions to `### `
    // so they nest cleanly under the wrapping Instructions heading. Lines
    // that aren't headings pass through unchanged.
    const demoted = operationalInstructions.replace(/^## /gm, "### ");
    body.push(demoted);
    body.push("");
  }

  return frontmatter.join("\n") + body.join("\n");
}

// Build the SOUL.md (identity/persona/mandate) for an agent directory.
// Returns null if the snapshot has nothing identity-shaped to publish.
// Frontmatter is intentionally minimal (name/id/kind only) since the
// chain-side metadata already lives in THESEUS.md.
export function buildSoulFile(snapshot: AgentSnapshot): string | null {
  const soulBody = resolveSoulBody(snapshot);
  if (!soulBody) return null;
  const slug = agentSlug(snapshot);
  const frontmatter = [
    "---",
    `name: ${yamlString(snapshot.name)}`,
    `id: ${slug}`,
    "kind: identity",
    "---",
  ].join("\n");
  const body = `\n# ${snapshot.name}\n\n${soulBody}\n`;
  return frontmatter + body;
}

// Build a single skills/<name>/SKILL.md from an AgentSkill entry. Matches
// the Anthropic Skills frontmatter shape (name, description, allowed-tools)
// used by Claude Code and the homepage Build example.
export function buildSkillFile(skill: AgentSkill): string {
  const frontmatter = ["---"];
  frontmatter.push(`name: ${skill.name}`);
  // Description is a free-text scalar; allow newlines via folded indented
  // continuation if the source contains them. For one-liners just emit
  // as a quoted-or-bare scalar.
  if (skill.description.includes("\n")) {
    const lines = skill.description.split("\n").map((l) => l.trim());
    frontmatter.push(`description: ${lines[0]}`);
    for (const cont of lines.slice(1)) {
      frontmatter.push(`  ${cont}`);
    }
  } else {
    frontmatter.push(`description: ${yamlString(skill.description)}`);
  }
  if (skill.allowedTools && skill.allowedTools.length > 0) {
    // Space-separated, matching the Anthropic / homepage Build convention.
    frontmatter.push(`allowed-tools: ${skill.allowedTools.join(" ")}`);
  }
  frontmatter.push("---");
  return frontmatter.join("\n") + "\n\n" + skill.body.trim() + "\n";
}

// Describes the files in an agent directory for the directory-tree UI.
export type AgentDirectoryFile = {
  path: string;
  filename: string;
  /** Path relative to the agent directory, used for indentation in the tree.
   *  For agent/soul files this is the same as filename; for skills it's
   *  `skills/<name>/SKILL.md`. */
  treePath: string;
  kind: "agent" | "soul" | "skill";
  content: string;
};

export function buildAgentDirectory(
  snapshot: AgentSnapshot,
): AgentDirectoryFile[] {
  const slug = agentSlug(snapshot);
  const files: AgentDirectoryFile[] = [
    {
      path: `agents/${slug}/THESEUS.md`,
      filename: "THESEUS.md",
      treePath: "THESEUS.md",
      kind: "agent",
      content: buildAgentFile(snapshot),
    },
  ];
  const soul = buildSoulFile(snapshot);
  if (soul) {
    files.push({
      path: `agents/${slug}/SOUL.md`,
      filename: "SOUL.md",
      treePath: "SOUL.md",
      kind: "soul",
      content: soul,
    });
  }
  const skills = snapshot.context?.skills ?? [];
  for (const skill of skills) {
    files.push({
      path: `agents/${slug}/skills/${skill.name}/SKILL.md`,
      filename: "SKILL.md",
      treePath: `skills/${skill.name}/SKILL.md`,
      kind: "skill",
      content: buildSkillFile(skill),
    });
  }
  return files;
}
