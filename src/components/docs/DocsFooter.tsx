import { execFileSync } from "node:child_process";
import path from "node:path";
import DocsFeedback from "./DocsFeedback";

function getLastUpdated(slug: string): string | null {
  if (!/^[a-z0-9\-_]+$/i.test(slug)) return null;
  const filePath = path.join(process.cwd(), "src/app/docs", slug, "page.tsx");
  try {
    const iso = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", filePath],
      {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
        timeout: 2000,
      }
    ).trim();
    if (!iso) return null;
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return null;
  }
}

export default function DocsFooter({ slug }: { slug: string }) {
  const safeSlug = /^[a-z0-9\-_]+$/i.test(slug) ? slug : "";
  const lastUpdated = safeSlug ? getLastUpdated(safeSlug) : null;
  const reportSubject = encodeURIComponent(`Docs feedback: /docs/${safeSlug}`);
  const reportHref = `mailto:hello@theseus.network?subject=${reportSubject}`;

  return (
    <div className="mt-16 mb-2 flex flex-col gap-4 border-t border-slate-200 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
      <div className="text-slate-500 dark:text-slate-400">
        {lastUpdated ? `Last updated ${lastUpdated}` : null}
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <DocsFeedback slug={safeSlug} />
        <a
          href={reportHref}
          className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-300 transition-colors"
        >
          Report an issue
        </a>
      </div>
    </div>
  );
}
