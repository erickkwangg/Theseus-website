// Build the deployable SKILL.md for an agent.
//
// Theseus agents are authored and deployed as Claude-Skills-compatible
// SKILL.md files with extended frontmatter. Anyone who can write a skill
// can deploy on Theseus; the difference is that on Theseus every output
// is signed by the agent and the model that ran it.

import type { AgentSnapshot } from "./types";

export function agentSlug(snapshot: AgentSnapshot): string {
  return snapshot.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function yamlList(items: readonly string[]): string {
  if (items.length === 0) return "[]";
  return "[" + items.join(", ") + "]";
}

function yamlString(s: string): string {
  // If string contains characters that could break YAML, quote it.
  if (/[:#&*!|>'"%@`]/.test(s) || s.startsWith("- ") || s.includes("\n")) {
    return JSON.stringify(s);
  }
  return s;
}

export function buildSkillFile(snapshot: AgentSnapshot): string {
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
      body.push(`- ${line}`);
    }
    body.push("");
  }

  if (ctx?.outputs) {
    body.push("## Outputs");
    body.push("");
    body.push(ctx.outputs);
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
