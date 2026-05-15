import { NextResponse } from "next/server";
import { createPublicClient, http, type Address } from "viem";
import { baseSepolia } from "viem/chains";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const revalidate = 60;

/**
 * Aggregate liveness counters across every Theseus demo agent deployed
 * on Base Sepolia. Used by the homepage stats strip to make the
 * "Theseus agents are real" claim land with actual numbers.
 *
 * Returns:
 *   - totalVerdicts: sum of all signed decisions across the 7 contracts
 *   - agentsLive: number of deployed agent contracts (always 7 today)
 *   - latestTickAt: unix-seconds of the most recent commit, for an
 *     "X minutes ago" UI hint
 */

type AgentSpec =
  | {
      kind: "count";
      address: Address;
      label: string;
      countFn: string;
      latestFn?: string; // optional: function returning latest block.timestamp
    }
  | {
      kind: "terra";
      address: Address;
      label: string;
    };

const AGENTS: AgentSpec[] = [
  // Append-only history contracts: tickCount() = decisions signed.
  {
    kind: "count",
    address:
      "0xa6FBaadeA4e7F58D812d989737d708b279E8BD21" as Address,
    label: "Launch Sniper",
    countFn: "tickCount",
  },
  {
    kind: "count",
    address:
      "0x3e1cEd606571A35c43DA11a3b21C051690Bd926a" as Address,
    label: "Sovereign Fund",
    countFn: "tickCount",
  },
  // Terra has no touchedCount; only stores latest per Action enum
  // (MINT, REDEEM). Counted via latestTimestamp on each action.
  {
    kind: "terra",
    address:
      "0x0B59da3768CB0F1725A1C2183dD1Ad93058394d2" as Address,
    label: "Terra Failsafe",
  },
  {
    kind: "count",
    address:
      "0xe442277ba5ce3f5aF5eDAE26206976ADC964C26C" as Address,
    label: "Bridge Guardian",
    countFn: "touchedAttestationCount",
  },
  {
    kind: "count",
    address:
      "0xc9CCF578093603e419997358fa9646Bd891B018a" as Address,
    label: "Governance Reviewer",
    countFn: "touchedProposalCount",
  },
  {
    kind: "count",
    address:
      "0x453cE65E5D6eBc6C71f3e420e720d2C2E1D03bce" as Address,
    label: "Aviation Safety Reviewer",
    countFn: "touchedChangeCount",
  },
  {
    kind: "count",
    address:
      "0xd14A0963D48B944463F3fE6e776C11e09101bE40" as Address,
    label: "Prediction Market Adjudicator",
    countFn: "touchedMarketCount",
  },
];

const TERRA_LATEST_TS_ABI = [
  {
    type: "function",
    name: "latestTimestamp",
    stateMutability: "view",
    inputs: [{ name: "action", type: "uint8" }],
    outputs: [{ type: "uint256" }],
  },
] as const;

const COUNT_ABI = (name: string) =>
  [
    {
      type: "function",
      name,
      stateMutability: "view",
      inputs: [],
      outputs: [{ type: "uint256" }],
    },
  ] as const;

function getClient() {
  return createPublicClient({
    chain: baseSepolia,
    transport: http("https://sepolia.base.org"),
  });
}

export async function GET() {
  const client = getClient();

  try {
    const counts = await Promise.all(
      AGENTS.map(async (a) => {
        if (a.kind === "terra") {
          // Two actions: MINT (0), REDEEM (1). Count each one that
          // has ever been touched.
          const [mintTs, redeemTs] = await Promise.all([
            client
              .readContract({
                address: a.address,
                abi: TERRA_LATEST_TS_ABI,
                functionName: "latestTimestamp",
                args: [0],
              })
              .then((v) => Number(v))
              .catch(() => 0),
            client
              .readContract({
                address: a.address,
                abi: TERRA_LATEST_TS_ABI,
                functionName: "latestTimestamp",
                args: [1],
              })
              .then((v) => Number(v))
              .catch(() => 0),
          ]);
          return (mintTs > 0 ? 1 : 0) + (redeemTs > 0 ? 1 : 0);
        }
        return client
          .readContract({
            address: a.address,
            abi: COUNT_ABI(a.countFn),
            functionName: a.countFn,
          })
          .then((v) => Number(v))
          .catch(() => 0);
      }),
    );

    const totalVerdicts = counts.reduce((acc, n) => acc + n, 0);
    const agentsLive = AGENTS.filter((_, i) => counts[i] > 0).length;

    // Latest activity signal: most recent tick on Launch Sniper (the
    // contract with the highest cadence). Drives the "N min ago" cell.
    let latestTickAt = 0;
    try {
      const lsfAddr =
        "0xa6FBaadeA4e7F58D812d989737d708b279E8BD21" as Address;
      const lsfCount = counts[0];
      if (lsfCount > 0) {
        const last = await client.readContract({
          address: lsfAddr,
          abi: [
            {
              type: "function",
              name: "ticks",
              stateMutability: "view",
              inputs: [{ type: "uint256" }],
              outputs: [
                { name: "action", type: "uint8" },
                { name: "token", type: "address" },
                { name: "amountToken", type: "uint256" },
                { name: "amountUsdc", type: "uint256" },
                { name: "paperUsdcAfter", type: "uint256" },
                { name: "reasonHash", type: "bytes32" },
                { name: "timestamp", type: "uint256" },
              ],
            },
          ],
          functionName: "ticks",
          args: [BigInt(lsfCount - 1)],
        });
        const t = (last as readonly unknown[])[6] as bigint;
        latestTickAt = Number(t);
      }
    } catch {
      /* leave latestTickAt at 0 */
    }

    return NextResponse.json(
      {
        totalVerdicts,
        agentsLive,
        agentsDeployed: AGENTS.length,
        latestTickAt,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=600",
        },
      },
    );
  } catch (err) {
    return NextResponse.json(
      {
        totalVerdicts: 0,
        agentsLive: 0,
        agentsDeployed: AGENTS.length,
        error: (err as Error).message,
      },
      { status: 200 },
    );
  }
}
