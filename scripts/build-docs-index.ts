/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "src/app/docs");
const OUT = path.join(process.cwd(), "public/docs-search-index.json");

type Section = { id: string; heading: string };
type Entry = {
  slug: string;
  title: string;
  href: string;
  sections: Section[];
  text: string;
};

const SLUG_TITLES: Record<string, string> = {
  introduction: "Introduction",
  quickstart: "Quick Start",
  architecture: "Architecture",
  aivm: "AIVM",
  "tensor-commits": "Tensor Commits",
  ship: "SHIP Language",
  agents: "Agents",
  examples: "Examples",
  comparison: "Theseus vs Ethereum",
  "vs-ai-infra": "Theseus vs AI-Infra Peers",
  "agentic-smart-contracts": "Agentic Smart Contracts",
  "design-space": "Design Space",
  reference: "Runtime reference",
  tokenomics: "Tokenomics",
  status: "Status & Roadmap",
  faq: "FAQ",
  glossary: "Glossary",
};

function extractProse(src: string): string {
  const out: string[] = [];

  // Match string literals (double, single, backtick) >= 20 chars
  const re = /(?:"((?:[^"\\]|\\.){20,})"|'((?:[^'\\]|\\.){20,})'|`((?:[^`\\]|\\.){20,})`)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    const raw = (m[1] ?? m[2] ?? m[3]).trim();
    if (!raw) continue;
    if (!/\b\w+\b\s+\b\w+\b\s+\b\w+\b/.test(raw)) continue; // need 3+ words
    if (/^https?:\/\//.test(raw)) continue;
    if (/^[a-z0-9\-_/.]+$/i.test(raw)) continue; // looks like a path/slug
    if (/(className|tw-|font-|text-|bg-|border-|rounded|flex|grid|space-|gap-|px-|py-|mx-|my-)/.test(raw)) continue;
    out.push(raw.replace(/\s+/g, " "));
  }

  // Match JSX text nodes between > and <
  const jsxRe = />([^<>{}\n]{20,})</g;
  while ((m = jsxRe.exec(src)) !== null) {
    const raw = m[1].trim();
    if (!/\b\w+\b\s+\b\w+\b/.test(raw)) continue;
    out.push(raw.replace(/\s+/g, " "));
  }

  return out.join(" ").replace(/\s+/g, " ").slice(0, 6000);
}

function extractSections(src: string): Section[] {
  const sections: Section[] = [];
  const seen = new Set<string>();

  const patterns: RegExp[] = [
    /<AnchorHeading\b[^>]*\bid=["']([^"']+)["'][^>]*>([^<]+)/g,
    /<h2\b[^>]*\bid=["']([^"']+)["'][^>]*>([^<]+)/g,
    /<h3\b[^>]*\bid=["']([^"']+)["'][^>]*>([^<]+)/g,
  ];
  for (const re of patterns) {
    let m: RegExpExecArray | null;
    while ((m = re.exec(src)) !== null) {
      const id = m[1];
      const heading = m[2].trim().replace(/\s+/g, " ");
      if (seen.has(id)) continue;
      seen.add(id);
      sections.push({ id, heading });
    }
  }
  return sections;
}

function buildEntry(slug: string, file: string): Entry | null {
  if (!fs.existsSync(file)) return null;
  const src = fs.readFileSync(file, "utf8");
  return {
    slug,
    title: SLUG_TITLES[slug] ?? slug,
    href: slug === "_root" ? "/docs" : `/docs/${slug}`,
    sections: extractSections(src),
    text: extractProse(src),
  };
}

const entries: Entry[] = [];

const root = buildEntry("_root", path.join(ROOT, "page.tsx"));
if (root) {
  root.title = "Overview";
  entries.push(root);
}

for (const dir of fs.readdirSync(ROOT)) {
  const full = path.join(ROOT, dir);
  if (!fs.statSync(full).isDirectory()) continue;
  const entry = buildEntry(dir, path.join(full, "page.tsx"));
  if (entry) entries.push(entry);
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(entries));
console.log(`[docs-index] wrote ${entries.length} entries (${(JSON.stringify(entries).length / 1024).toFixed(1)} KB) to ${path.relative(process.cwd(), OUT)}`);
