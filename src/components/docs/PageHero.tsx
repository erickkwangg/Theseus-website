import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type Accent = "indigo" | "purple" | "green" | "amber";

const accentClasses: Record<Accent, { eyebrowBg: string; eyebrowText: string; gradFrom: string; gradTo: string; orb: string; ring: string }> = {
  indigo: {
    eyebrowBg: "bg-indigo-500/10 border-indigo-400/35",
    eyebrowText: "text-indigo-700 dark:text-indigo-300",
    gradFrom: "from-indigo-500/15",
    gradTo: "to-transparent",
    orb: "bg-indigo-500/20",
    ring: "ring-indigo-300/30 dark:ring-indigo-500/20",
  },
  purple: {
    eyebrowBg: "bg-purple-500/10 border-purple-400/35",
    eyebrowText: "text-purple-700 dark:text-purple-300",
    gradFrom: "from-purple-500/15",
    gradTo: "to-transparent",
    orb: "bg-purple-500/20",
    ring: "ring-purple-300/30 dark:ring-purple-500/20",
  },
  green: {
    eyebrowBg: "bg-green-500/10 border-green-400/35",
    eyebrowText: "text-green-700 dark:text-green-400",
    gradFrom: "from-green-500/15",
    gradTo: "to-transparent",
    orb: "bg-green-500/20",
    ring: "ring-green-300/30 dark:ring-green-500/20",
  },
  amber: {
    eyebrowBg: "bg-amber-500/10 border-amber-400/35",
    eyebrowText: "text-amber-700 dark:text-amber-300",
    gradFrom: "from-amber-500/15",
    gradTo: "to-transparent",
    orb: "bg-amber-500/20",
    ring: "ring-amber-300/30 dark:ring-amber-500/20",
  },
};

interface PageHeroProps {
  eyebrow: string;
  eyebrowIcon?: LucideIcon;
  title: string;
  subtitle: string;
  accent?: Accent;
  /** Right-side illustration (typically a custom SVG) */
  illustration?: ReactNode;
  /** Optional inline stats row shown below subtitle */
  stats?: { value: string; label: string }[];
}

export default function PageHero({
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  title,
  subtitle,
  accent = "indigo",
  illustration,
  stats,
}: PageHeroProps) {
  const a = accentClasses[accent];
  return (
    <div className="relative mb-12 overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-white/60 dark:bg-slate-900/40 backdrop-blur">
      {/* Background gradient + orb */}
      <div className={`absolute inset-0 bg-gradient-to-br ${a.gradFrom} ${a.gradTo} pointer-events-none`} />
      <div
        className={`absolute -top-24 -right-24 w-72 h-72 rounded-full ${a.orb} blur-3xl pointer-events-none`}
      />

      <div className="relative grid sm:grid-cols-[1fr_auto] gap-6 items-center p-6 sm:p-8">
        <div>
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${a.eyebrowBg} ${a.eyebrowText} text-xs mb-4`}
          >
            {EyebrowIcon && <EyebrowIcon className="h-3 w-3" />}
            {eyebrow}
          </div>
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-slate-900 dark:text-white">
            {title}
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            {subtitle}
          </p>
          {stats && stats.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
              {stats.map((s) => (
                <div key={s.label} className="flex items-baseline gap-2">
                  <span className={`text-xl font-light ${a.eyebrowText}`}>{s.value}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {illustration && (
          <div className="hidden sm:block">
            <div
              className={`relative w-44 h-44 lg:w-52 lg:h-52 rounded-xl ring-1 ${a.ring} bg-white/40 dark:bg-slate-950/40 flex items-center justify-center`}
            >
              {illustration}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
