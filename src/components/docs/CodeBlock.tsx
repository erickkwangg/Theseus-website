import { codeToHtml } from "shiki";
import CopyButton from "./CopyButton";

interface CodeBlockProps {
  code?: string;
  children?: string;
  language?: string;
  filename?: string;
}

const SAFE_LANGS = new Set<string>([
  "bash",
  "shell",
  "sh",
  "zsh",
  "json",
  "jsonc",
  "yaml",
  "toml",
  "rust",
  "go",
  "python",
  "typescript",
  "tsx",
  "javascript",
  "jsx",
  "html",
  "css",
  "diff",
  "sql",
  "md",
  "markdown",
]);

function resolveLang(lang?: string): string {
  if (!lang) return "plaintext";
  const normalized = lang.toLowerCase();
  if (normalized === "text" || normalized === "txt" || normalized === "plain") {
    return "plaintext";
  }
  return SAFE_LANGS.has(normalized) ? normalized : "plaintext";
}

export default async function CodeBlock({
  code,
  children,
  language,
  filename,
}: CodeBlockProps) {
  const display = (code ?? children ?? "").toString();
  const lang = resolveLang(language);

  let html: string;
  try {
    html = await codeToHtml(display, {
      lang,
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    });
  } catch {
    html = await codeToHtml(display, {
      lang: "plaintext",
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    });
  }

  return (
    <div className="relative group my-6">
      <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0d1117]">
        {(filename || language) && (
          <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700/60 text-xs text-slate-500 dark:text-slate-400 font-mono">
            {filename || language}
          </div>
        )}
        <div
          className="shiki-block px-4 py-3 text-sm overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      <CopyButton code={display} />
    </div>
  );
}
