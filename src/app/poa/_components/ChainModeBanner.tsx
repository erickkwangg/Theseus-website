// ChainModeBanner — a single-line strip below the header that names the
// data source. Three states:
//
// - fixture mode → amber banner with mock-data warning. Shown on every PoA page
//   when THESEUS_RPC_URL isn't set, so production never silently shows mocks.
// - chain unreachable → rose banner with the raw error in an expandable detail.
//   Shown on credential page when a real chain query fails.
// - live chain → quiet indigo strip with a live, ticking block height. Shown
//   on credential page when a polkadot fetch succeeds.

import LiveBlock from "./LiveBlock";
import Glyph from "./Glyph";

type Props = {
  mode: "fixture" | "polkadot";
  chainError?: string | null;
  livePolkadotBlock?: number | null;
  // when set, LiveBlock will poll /poa/api/snapshot/<id> for fresh block data
  pollAgentId?: string;
};

export default function ChainModeBanner({
  mode,
  chainError,
  livePolkadotBlock,
  pollAgentId,
}: Props) {
  if (chainError) {
    const friendly = friendlyChainErrorLine(chainError);
    return (
      <div
        role="status"
        className="border-y border-rose-400/40 bg-rose-50/60 dark:border-rose-500/30 dark:bg-rose-500/5"
      >
        <div className="mx-auto flex max-w-[1700px] flex-wrap items-baseline gap-x-4 gap-y-1 px-6 py-2 sm:px-12 lg:px-16">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-rose-700 dark:text-rose-300">
            chain unreachable
          </span>
          <span className="text-[12.5px] text-rose-800 dark:text-rose-200">
            {friendly}
          </span>
          <details className="ml-auto">
            <summary className="cursor-pointer font-mono text-[10.5px] uppercase tracking-[0.18em] text-rose-700/80 hover:text-rose-700 dark:text-rose-300/80 dark:hover:text-rose-300">
              technical detail
            </summary>
            <code className="mt-1 block break-all font-mono text-[10.5px] text-rose-700/90 dark:text-rose-200/90">
              {chainError}
            </code>
          </details>
        </div>
      </div>
    );
  }

  if (mode === "fixture") {
    return (
      <div
        role="status"
        className="border-y border-amber-400/40 bg-amber-50/60 dark:border-amber-500/30 dark:bg-amber-500/5"
      >
        <div className="mx-auto flex max-w-[1700px] flex-wrap items-center gap-x-4 gap-y-1 px-6 py-2 sm:px-12 lg:px-16">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">
            fixture mode
          </span>
          <span className="text-[12.5px] text-amber-800 dark:text-amber-200">
            Chain is mocked with three demo agents — set{" "}
            <code className="font-mono">THESEUS_RPC_URL</code> to read from a
            Theseus node.
          </span>
        </div>
      </div>
    );
  }

  // polkadot mode, no error — quiet trust strip. Only shown when we actually
  // have a fresh block height to display, so empty pages don't claim "live"
  // before they've talked to the chain.
  if (livePolkadotBlock != null) {
    return (
      <div
        role="status"
        className="border-y border-indigo-400/30 bg-indigo-50/30 dark:border-indigo-500/25 dark:bg-indigo-500/5"
      >
        <div className="mx-auto flex max-w-[1700px] flex-wrap items-center gap-x-4 gap-y-1 px-6 py-2 sm:px-12 lg:px-16">
          <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-indigo-700 dark:text-indigo-300">
            <Glyph name="chain" size={13} />
            theseus chain · live
          </span>
          <LiveBlock
            initial={livePolkadotBlock}
            agentId={pollAgentId}
            className="text-[10.5px]"
          />
        </div>
      </div>
    );
  }

  return null;
}

function friendlyChainErrorLine(rawError: string): string {
  const lower = rawError.toLowerCase();
  if (lower.includes("econnrefused")) {
    return "The Theseus chain RPC refused the connection.";
  }
  if (lower.includes("timeout")) {
    return "The Theseus chain RPC didn't respond in time.";
  }
  if (lower.includes("agents.agents")) {
    return "Connected, but the chain doesn't expose pallet_agents — wrong endpoint?";
  }
  return "We couldn't read the chain right now.";
}
