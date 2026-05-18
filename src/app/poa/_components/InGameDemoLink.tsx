// Small banner that points Calder's profile at the in-game tamper-test
// demonstration. Renders only when the agent has an in-game demo wired
// (currently just Calder).

import Link from "next/link";

type Props = {
  agentId: string;
  agentName: string;
};

export default function InGameDemoLink({ agentId, agentName }: Props) {
  return (
    <section
      className="mx-auto mt-10 max-w-[920px] border-t pt-8 print:hidden"
      style={{ borderColor: "var(--poa-rule)" }}
    >
      <div
        className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border px-4 py-3"
        style={{ borderColor: "var(--poa-rule)" }}
      >
        <div className="max-w-2xl">
          <p className="poa-stamp">In-game demonstration</p>
          <p className="mt-1 text-[13.5px] leading-relaxed text-[var(--poa-ink)]">
            <span className="italic">{agentName}</span> is the sovereign
            chronicler of AI Town. The tamper test compares an operator-edited
            dispatch in a centralized runtime against the same edit attempted
            against {agentName}&rsquo;s on-chain signature. Two panes, one
            button, instant difference.
          </p>
        </div>
        <Link
          href={`/poa/${agentId}/tamper-test`}
          className="poa-stamp rounded border px-3 py-1 transition-colors hover:text-[var(--poa-ink)]"
          style={{ borderColor: "var(--poa-rule)" }}
        >
          Open the tamper test →
        </Link>
      </div>
    </section>
  );
}
