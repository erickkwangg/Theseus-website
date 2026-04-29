import type { FileLanguage } from "./files";

export type Token = { text: string; cls?: string };

const RUST_KEYWORDS = new Set([
  "use", "pub", "fn", "let", "const", "mut", "if", "else", "match",
  "return", "struct", "enum", "impl", "trait", "for", "in", "while",
  "loop", "break", "continue", "as", "where", "mod", "crate", "ref",
  "self", "Self", "true", "false", "Some", "None",
]);

const TOKEN = {
  comment: "text-slate-400 dark:text-slate-500",
  string: "text-emerald-700 dark:text-[#B794F4]",
  number: "text-orange-700 dark:text-[#FFD166]",
  keyword: "text-blue-700 dark:text-[#4BD3FF]",
  type: "text-teal-700 dark:text-[#5AE3FF]",
  attribute: "text-pink-700 dark:text-[#FF8FB1]",
  fmDelim: "text-slate-400 dark:text-slate-500",
  fmKey: "text-blue-700 dark:text-[#4BD3FF]",
  fmColon: "text-slate-400 dark:text-slate-500",
  heading: "text-orange-700 dark:text-[#FFD166]",
  headingText: "text-slate-900 dark:text-slate-100",
  bullet: "text-teal-700 dark:text-[#5AE3FF]",
  inlineCode: "text-purple-700 dark:text-[#B794F4]",
  fenceLine: "text-slate-500 dark:text-slate-400",
};

function tokenizeRustLine(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  let buffer = "";

  const flush = () => {
    if (buffer) {
      tokens.push({ text: buffer });
      buffer = "";
    }
  };

  while (i < line.length) {
    const rest = line.slice(i);

    if (rest.startsWith("//")) {
      flush();
      tokens.push({ text: line.slice(i), cls: TOKEN.comment });
      return tokens;
    }

    if (line[i] === "#" && line[i + 1] === "[") {
      flush();
      const close = line.indexOf("]", i);
      const end = close === -1 ? line.length : close + 1;
      tokens.push({ text: line.slice(i, end), cls: TOKEN.attribute });
      i = end;
      continue;
    }

    if (line[i] === '"') {
      flush();
      let j = i + 1;
      while (j < line.length && line[j] !== '"') {
        if (line[j] === "\\" && j + 1 < line.length) j += 2;
        else j += 1;
      }
      const end = Math.min(j + 1, line.length);
      tokens.push({ text: line.slice(i, end), cls: TOKEN.string });
      i = end;
      continue;
    }

    if (/[a-zA-Z_]/.test(line[i])) {
      flush();
      let j = i;
      while (j < line.length && /[a-zA-Z0-9_]/.test(line[j])) j += 1;
      const word = line.slice(i, j);
      if (RUST_KEYWORDS.has(word)) {
        tokens.push({ text: word, cls: TOKEN.keyword });
      } else if (/^[A-Z]/.test(word)) {
        tokens.push({ text: word, cls: TOKEN.type });
      } else {
        tokens.push({ text: word });
      }
      i = j;
      continue;
    }

    if (/[0-9]/.test(line[i])) {
      flush();
      let j = i;
      while (j < line.length && /[0-9_a-zA-Z]/.test(line[j])) j += 1;
      tokens.push({ text: line.slice(i, j), cls: TOKEN.number });
      i = j;
      continue;
    }

    buffer += line[i];
    i += 1;
  }
  flush();
  return tokens;
}

function tokenizeMarkdown(content: string): Token[][] {
  const lines = content.split("\n");
  const out: Token[][] = [];
  let inFrontmatter = false;
  let frontmatterSeen = false;
  let inCodeFence = false;

  for (let idx = 0; idx < lines.length; idx += 1) {
    const line = lines[idx];

    if (line.trim() === "---" && !inCodeFence) {
      if (!frontmatterSeen) {
        inFrontmatter = true;
        frontmatterSeen = true;
        out.push([{ text: line, cls: TOKEN.fmDelim }]);
        continue;
      }
      if (inFrontmatter) {
        inFrontmatter = false;
        out.push([{ text: line, cls: TOKEN.fmDelim }]);
        continue;
      }
    }

    if (line.trim().startsWith("```")) {
      inCodeFence = !inCodeFence;
      out.push([{ text: line, cls: TOKEN.fmDelim }]);
      continue;
    }

    if (inCodeFence) {
      out.push([{ text: line, cls: TOKEN.fenceLine }]);
      continue;
    }

    if (inFrontmatter) {
      const m = line.match(/^(\s*)([A-Za-z0-9_-]+)(:)(.*)$/);
      if (m) {
        out.push([
          { text: m[1] },
          { text: m[2], cls: TOKEN.fmKey },
          { text: m[3], cls: TOKEN.fmColon },
          { text: m[4] },
        ]);
        continue;
      }
      out.push([{ text: line }]);
      continue;
    }

    const heading = line.match(/^(#+)(\s.*)?$/);
    if (heading) {
      out.push([
        { text: heading[1], cls: TOKEN.heading },
        { text: heading[2] ?? "", cls: TOKEN.headingText },
      ]);
      continue;
    }

    const bullet = line.match(/^(\s*)([-*])(\s)(.*)$/);
    if (bullet) {
      out.push([
        { text: bullet[1] },
        { text: bullet[2], cls: TOKEN.bullet },
        { text: bullet[3] },
        ...tokenizeInlineMarkdown(bullet[4]),
      ]);
      continue;
    }

    out.push(tokenizeInlineMarkdown(line));
  }

  return out;
}

function tokenizeInlineMarkdown(line: string): Token[] {
  const out: Token[] = [];
  let i = 0;
  let buffer = "";
  while (i < line.length) {
    if (line[i] === "`") {
      if (buffer) {
        out.push({ text: buffer });
        buffer = "";
      }
      const close = line.indexOf("`", i + 1);
      const end = close === -1 ? line.length : close + 1;
      out.push({ text: line.slice(i, end), cls: TOKEN.inlineCode });
      i = end;
      continue;
    }
    buffer += line[i];
    i += 1;
  }
  if (buffer) out.push({ text: buffer });
  return out;
}

export function tokenize(content: string, language: FileLanguage): Token[][] {
  if (language === "markdown") return tokenizeMarkdown(content);
  return content.split("\n").map(tokenizeRustLine);
}
