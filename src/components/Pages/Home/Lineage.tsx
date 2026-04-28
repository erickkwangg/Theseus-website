import { Fragment } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type LineageNode = {
  year: string;
  name: string;
  role: string;
  logo: { src: string; invertOnDark?: boolean };
  hub?: boolean;
  flow: "ai" | "crypto";
};

const NODES: LineageNode[] = [
  {
    year: "2022",
    name: "ChatGPT",
    role: "reason",
    logo: { src: "/logos/openai.svg", invertOnDark: true },
    flow: "ai",
  },
  {
    year: "2025",
    name: "OpenClaw",
    role: "act",
    logo: { src: "/logos/openclaw.svg" },
    flow: "ai",
  },
  {
    year: "Now",
    name: "Theseus",
    role: "verify",
    logo: { src: "/theseus-white.svg" },
    hub: true,
    flow: "ai",
  },
  {
    year: "2015",
    name: "Ethereum",
    role: "execute",
    logo: { src: "/logos/ethereum.svg" },
    flow: "crypto",
  },
  {
    year: "2009",
    name: "Bitcoin",
    role: "transact",
    logo: { src: "/logos/bitcoin.svg" },
    flow: "crypto",
  },
];

export default function Lineage() {
  return (
    <div className="pt-4 sm:pt-6 lg:pt-8">
      <ol
        aria-label="Theseus stands at the convergence of AI and crypto"
        className="grid grid-cols-1 gap-y-10 lg:grid-cols-[1fr_auto_1fr_auto_1.25fr_auto_1fr_auto_1fr] lg:items-start lg:gap-y-0"
      >
        {NODES.map((node, i) => {
          const next = NODES[i + 1];
          return (
            <Fragment key={node.name}>
              <Node node={node} />
              {next && (
                <Arrow direction={next.flow === "ai" ? "right" : "left"} />
              )}
            </Fragment>
          );
        })}
      </ol>

      <p className="mt-10 text-center font-serif text-3xl font-normal italic tracking-[-0.015em] text-indigo-600 sm:text-4xl lg:mt-12 lg:text-[clamp(2.25rem,3.2vw,3rem)] dark:text-indigo-300">
        Think. Act. Verify.
      </p>
    </div>
  );
}

function Node({ node }: { node: LineageNode }) {
  return (
    <li className="flex flex-col items-center gap-1.5 text-center">
      <span
        className={cn(
          "font-mono text-[10.5px] uppercase tracking-[0.22em]",
          node.hub
            ? "text-indigo-600 dark:text-indigo-300"
            : "text-slate-500 dark:text-slate-400",
        )}
      >
        {node.year}
      </span>

      <span
        aria-hidden
        className={cn(
          "my-2.5 grid place-items-center overflow-hidden rounded-full border bg-white",
          node.hub
            ? "h-[72px] w-[72px] border-indigo-500/70 shadow-[0_0_0_6px_rgba(99,102,241,0.14),0_0_0_14px_rgba(99,102,241,0.06)] sm:h-[84px] sm:w-[84px]"
            : "h-12 w-12 border-slate-300/70 sm:h-14 sm:w-14 dark:border-slate-600/60",
        )}
      >
        {node.hub ? (
          <span
            className="block h-[60%] w-[60%] bg-indigo-600"
            style={{
              WebkitMask: "url(/theseus-white.svg) center / contain no-repeat",
              mask: "url(/theseus-white.svg) center / contain no-repeat",
            }}
          />
        ) : (
          <Image
            src={node.logo.src}
            alt=""
            width={48}
            height={48}
            className={cn(
              "h-[60%] w-[60%] object-contain",
              node.logo.invertOnDark && "dark:invert",
            )}
          />
        )}
      </span>

      <span
        className={cn(
          "font-serif tracking-[-0.01em]",
          node.hub
            ? "text-[clamp(1.6rem,2.4vw,2.2rem)] italic text-indigo-600 dark:text-indigo-300"
            : "text-xl text-slate-900 sm:text-[1.4rem] dark:text-white",
        )}
      >
        {node.name}
      </span>

      {!node.hub && (
        <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
          {node.role}
        </span>
      )}
    </li>
  );
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <span
      aria-hidden
      className="hidden self-start lg:block lg:pt-[68px]"
    >
      <span
        className={cn(
          "relative block h-px w-10 xl:w-14",
          direction === "right"
            ? "bg-gradient-to-r from-slate-300 to-slate-500/70 dark:from-slate-700 dark:to-slate-400/70"
            : "bg-gradient-to-l from-slate-300 to-slate-500/70 dark:from-slate-700 dark:to-slate-400/70",
        )}
      >
        {direction === "right" ? (
          <span className="absolute -right-px top-1/2 -translate-y-1/2 border-y-[4px] border-l-[6px] border-y-transparent border-l-slate-500/70 dark:border-l-slate-400/70" />
        ) : (
          <span className="absolute -left-px top-1/2 -translate-y-1/2 border-y-[4px] border-r-[6px] border-y-transparent border-r-slate-500/70 dark:border-r-slate-400/70" />
        )}
      </span>
    </span>
  );
}
