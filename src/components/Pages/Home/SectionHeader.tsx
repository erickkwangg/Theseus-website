import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  number: string;
  className?: string;
}

export default function SectionHeader({ label, number, className }: SectionHeaderProps) {
  return (
    <div className={cn("w-full max-w-2xl", className)}>
      <div className="flex items-end justify-between pb-2.5 text-base sm:text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
        <span>{label}</span>
        <span className="font-mono tabular-nums text-[0.92em]">{number}</span>
      </div>
      <div className="h-px bg-slate-500/55 dark:bg-slate-400/35" />
    </div>
  );
}
