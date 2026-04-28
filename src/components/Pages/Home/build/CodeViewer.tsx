import { FILES } from "./files";
import { tokenize } from "./highlight";

type Props = {
  path: string;
};

export default function CodeViewer({ path }: Props) {
  const file = FILES[path];
  if (!file) return null;
  const lines = tokenize(file.content, file.language);

  return (
    <pre className="h-full overflow-auto px-5 py-5 font-mono text-[12.5px] leading-[1.6] bg-white dark:bg-[#0A0A0C] text-slate-700 dark:text-slate-300 sm:px-6 sm:py-6">
      <code className="block">
        {lines.map((tokens, i) => (
          <div key={i} className="flex">
            <span
              className="select-none pr-4 text-right text-slate-300 tabular-nums dark:text-slate-600"
              style={{ minWidth: 36 }}
            >
              {i + 1}
            </span>
            <span className="flex-1 whitespace-pre">
              {tokens.length === 0 ? (
                <span>&nbsp;</span>
              ) : (
                tokens.map((t, j) => (
                  <span key={j} className={t.cls}>
                    {t.text}
                  </span>
                ))
              )}
            </span>
          </div>
        ))}
      </code>
    </pre>
  );
}
