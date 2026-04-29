import ScrollReveal from "@/components/ScrollReveal";
import SectionHeader from "./SectionHeader";

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.18em] text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/70 border border-slate-300/70 dark:border-slate-600/70 rounded-sm">
    {children}
  </span>
);

const Connector = ({ label }: { label: string }) => (
  <div className="flex items-center justify-center my-3 lg:my-4">
    <div className="flex flex-col items-center text-slate-400 dark:text-slate-500">
      <span className="text-[10px] font-mono uppercase tracking-[0.2em]">{label}</span>
      <svg width="16" height="20" viewBox="0 0 16 20" fill="none" className="mt-1">
        <path d="M8 0 L8 16 M3 11 L8 16 L13 11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  </div>
);

type CardProps = {
  role: string;
  title: string;
  emphasis?: boolean;
  accent?: "neutral" | "indigo";
  children?: React.ReactNode;
};

const Card = ({ role, title, emphasis = false, accent = "neutral", children }: CardProps) => {
  const ring =
    accent === "indigo"
      ? "border-indigo-400/60 dark:border-indigo-400/50 shadow-[0_0_0_1px_rgba(99,102,241,0.12),0_8px_24px_-12px_rgba(99,102,241,0.35)] bg-white dark:bg-slate-900/60"
      : emphasis
      ? "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900/60"
      : "border-slate-200/80 dark:border-slate-700/70 bg-slate-50/60 dark:bg-slate-900/30";
  return (
    <div className={`relative border rounded-md px-5 py-4 ${ring} transition-colors`}>
      <div className={`font-serif text-2xl lg:text-3xl tracking-[-0.01em] leading-tight ${emphasis || accent === "indigo" ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"} mb-1`}>
        {role}
      </div>
      <div className="text-sm text-slate-500 dark:text-slate-400 italic mb-4">
        {title}
      </div>
      {children}
    </div>
  );
};

export default function Architecture() {
  return (
    <section className="text-slate-900 dark:text-white py-24 lg:py-32 section-soft-divider">
      <div className="w-full max-w-5xl mx-auto px-6 sm:px-8">
        <SectionHeader
          label="How it works"
          number="02"
          className="mb-8 lg:mb-10"
        />

        {/* Header */}
        <ScrollReveal>
          <div className="max-w-3xl mb-14 lg:mb-20">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[-0.015em] leading-[1.05] text-slate-900 dark:text-white">
              The agent <span className="italic">owns itself.</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              On most runtimes, the operator holds your agent&apos;s keys, balance, and state.
              On Theseus, the agent holds them. You trust the runtime, not whoever happens
              to be running it.
            </p>
          </div>
        </ScrollReveal>

        {/* Diagram */}
        <ScrollReveal delay={1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-14">
            {/* LEFT: Hosted */}
            <div>
              <div className="flex items-baseline justify-between mb-5">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  Hosted (today)
                </p>
                <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                  trust the operator
                </p>
              </div>

              <Card role="Operator" title="Holds the keys." emphasis>
                <div className="flex flex-wrap gap-1.5">
                  <Chip>Key</Chip>
                  <Chip>Balance</Chip>
                  <Chip>State</Chip>
                  <Chip>Off switch</Chip>
                </div>
              </Card>

              <Connector label="controls" />

              <Card role="Agent" title="Just a process.">
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Runs only while the operator pays for it and lets it run.
                </p>
              </Card>
            </div>

            {/* RIGHT: On Theseus */}
            <div>
              <div className="flex items-baseline justify-between mb-5">
                <p className="text-xs uppercase tracking-[0.22em] text-indigo-700 dark:text-indigo-300">
                  On Theseus
                </p>
                <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                  trust the runtime
                </p>
              </div>

              <Card role="Agent" title="Holds its own." accent="indigo">
                <div className="flex flex-wrap gap-1.5">
                  <Chip>Key</Chip>
                  <Chip>Balance</Chip>
                  <Chip>State</Chip>
                  <Chip>Memory</Chip>
                </div>
              </Card>

              <Connector label="executes for" />

              <Card role="Operator" title="Interchangeable.">
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Runs the agent&apos;s code. Can&apos;t modify its keys, balance, or state.
                </p>
              </Card>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
