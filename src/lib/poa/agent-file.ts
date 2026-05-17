// Build the deployable agent file (SKILL.md) for a Theseus agent.
//
// Theseus agents are authored and deployed in the OpenClaw-style agent
// format: Markdown body plus a YAML frontmatter block that names the
// models, tools, sovereignty flag, controller, and intent surface. Same
// file shape personal-runtime skills tools use; the chain just reads the
// extra Theseus fields when the agent registers.

import type { AgentSnapshot } from "./types";

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

export function buildAgentFile(snapshot: AgentSnapshot): string {
  const slug = agentSlug(snapshot);
  const description =
    snapshot.summary?.split(/(?<=\.)\s/)[0]?.trim() ??
    `Theseus agent ${snapshot.name}.`;

  const frontmatter: string[] = ["---"];
  frontmatter.push(`name: ${slug}`);
  frontmatter.push(`description: ${yamlString(description)}`);
  frontmatter.push(`models: ${yamlList(snapshot.capabilities.models)}`);
  frontmatter.push(`tools: ${yamlList(snapshot.capabilities.tools)}`);
  frontmatter.push(`sovereign: ${snapshot.sovereign ? "true" : "false"}`);
  frontmatter.push(
    `controller: ${snapshot.controller ? snapshot.controller : "null"}`,
  );
  frontmatter.push(
    `intent_types: ${yamlList(snapshot.capabilities.intentTypes)}`,
  );
  if (snapshot.context?.schedule) {
    frontmatter.push(`schedule: ${yamlString(snapshot.context.schedule)}`);
  }
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

  if (ctx?.instructions) {
    body.push("## Instructions");
    body.push("");
    // Demote any `## ` headings inside the verbatim instructions to `### `
    // so they nest cleanly under the wrapping Instructions heading. Lines
    // that aren't headings pass through unchanged.
    const demoted = ctx.instructions
      .trim()
      .replace(/^## /gm, "### ");
    body.push(demoted);
    body.push("");
  }

  return frontmatter.join("\n") + body.join("\n");
}
