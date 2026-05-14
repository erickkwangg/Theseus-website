import { NextResponse } from "next/server";
import { createPublicClient, http, type Address } from "viem";
import { baseSepolia } from "viem/chains";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const revalidate = 60;

/**
 * Live verdict counter for a single agent commitment surface.
 *
 * The PoA profile calls this with the agent's published `commitmentSurface`
 * to render a "Made N decisions" line. We accept the contract address and
 * its count-fn name as query params so the same endpoint serves every
 * deployed shape (append-only tickCount contracts, per-key touched-count
 * contracts, and Terra's latestTimestamp(action) shape).
 *
 *   GET /api/agent-activity?address=0x..&countFn=tickCount
 *
 * Returns: { count, latestAt?, firstAt? } where latestAt/firstAt are unix
 * seconds when we can derive them from the contract shape, otherwise
 * omitted.
 */

const TICK_ABI = (name: string) =>
  [
    {
      type: "function",
      name,
      stateMutability: "view",
      inputs: [],
      outputs: [{ type: "uint256" }],
    },
  ] as const;

const TERRA_LATEST_TS_ABI = [
  {
    type: "function",
    name: "latestTimestamp",
    stateMutability: "view",
    inputs: [{ name: "action", type: "uint8" }],
    outputs: [{ type: "uint256" }],
  },
] as const;

// Append-only tick contracts (Launch Sniper, Sovereign Fund) all expose
// a `ticks(uint256)` array whose last field is a `uint256 timestamp`.
// The struct shape varies between contracts but `timestamp` always sits
// at the tail, so we read the tuple by index from the end.
const LSF_TICKS_ABI = [
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
] as const;

const SF_TICKS_ABI = [
  {
    type: "function",
    name: "ticks",
    stateMutability: "view",
    inputs: [{ type: "uint256" }],
    outputs: [
      { name: "action", type: "uint8" },
      { name: "amountIn", type: "uint256" },
      { name: "amountOut", type: "uint256" },
      { name: "minAmountOut", type: "uint256" },
      { name: "usdcAfter", type: "uint256" },
      { name: "wethAfter", type: "uint256" },
      { name: "reasonHash", type: "bytes32" },
      { name: "timestamp", type: "uint256" },
    ],
  },
] as const;

// Map of known tickCount-shape contracts → which `ticks` ABI to use when
// pulling first/last timestamps. Anything not in this map still returns
// a count via `tickCount`, just without timestamps.
const TICK_CONTRACTS: Record<string, typeof LSF_TICKS_ABI | typeof SF_TICKS_ABI> = {
  "0xa6FBaadeA4e7F58D812d989737d708b279E8BD21": LSF_TICKS_ABI, // Launch Sniper
  "0x3e1cEd606571A35c43DA11a3b21C051690Bd926a": SF_TICKS_ABI, // Sovereign Fund
};

function getClient() {
  return createPublicClient({
    chain: baseSepolia,
    transport: http("https://sepolia.base.org"),
  });
}

interface ActivityResult {
  count: number;
  latestAt?: number;
  firstAt?: number;
}

async function readTerra(address: Address): Promise<ActivityResult> {
  const client = getClient();
  const [mintTs, redeemTs] = await Promise.all([
    client
      .readContract({
        address,
        abi: TERRA_LATEST_TS_ABI,
        functionName: "latestTimestamp",
        args: [0],
      })
      .then((v) => Number(v))
      .catch(() => 0),
    client
      .readContract({
        address,
        abi: TERRA_LATEST_TS_ABI,
        functionName: "latestTimestamp",
        args: [1],
      })
      .then((v) => Number(v))
      .catch(() => 0),
  ]);
  const count = (mintTs > 0 ? 1 : 0) + (redeemTs > 0 ? 1 : 0);
  const ts = [mintTs, redeemTs].filter((n) => n > 0);
  return {
    count,
    latestAt: ts.length ? Math.max(...ts) : undefined,
    firstAt: ts.length ? Math.min(...ts) : undefined,
  };
}

async function readCount(
  address: Address,
  countFn: string,
): Promise<ActivityResult> {
  const client = getClient();
  const count = await client
    .readContract({
      address,
      abi: TICK_ABI(countFn),
      functionName: countFn,
    })
    .then((v) => Number(v))
    .catch(() => 0);

  if (count === 0) return { count: 0 };

  // For tickCount contracts in our known set, also fetch first/last tick
  // timestamps. We need the contract-specific ABI to decode the struct.
  if (countFn === "tickCount") {
    const ticksAbi = TICK_CONTRACTS[address];
    if (!ticksAbi) return { count };

    const [first, last] = await Promise.all([
      client
        .readContract({
          address,
          abi: ticksAbi,
          functionName: "ticks",
          args: [BigInt(0)],
        })
        .catch(() => null),
      client
        .readContract({
          address,
          abi: ticksAbi,
          functionName: "ticks",
          args: [BigInt(count - 1)],
        })
        .catch(() => null),
    ]);

    // Timestamp is always the last field in the returned tuple.
    const firstTs =
      first && Array.isArray(first)
        ? Number((first as readonly unknown[]).at(-1) as bigint)
        : undefined;
    const lastTs =
      last && Array.isArray(last)
        ? Number((last as readonly unknown[]).at(-1) as bigint)
        : undefined;

    return { count, firstAt: firstTs, latestAt: lastTs };
  }

  // Touched-count shapes (Bridge, Governance, Aviation, Adjudicator):
  // count is the number of distinct keys ever touched. There's no
  // generic way to ask "when did the first/last touch happen" without
  // iterating the touched-keys array, so we leave timestamps off.
  return { count };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");
  const countFn = searchParams.get("countFn");

  if (!address || !countFn) {
    return NextResponse.json(
      { error: "address and countFn are required" },
      { status: 400 },
    );
  }
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return NextResponse.json(
      { error: "invalid address" },
      { status: 400 },
    );
  }

  try {
    const result =
      countFn === "terraLatest"
        ? await readTerra(address as Address)
        : await readCount(address as Address, countFn);

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=600",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { count: 0, error: (err as Error).message },
      { status: 200 },
    );
  }
}
