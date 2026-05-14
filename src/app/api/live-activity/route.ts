import { NextResponse } from "next/server";
import { createPublicClient, http, type Address, type Hex } from "viem";
import { baseSepolia } from "viem/chains";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
// Re-fetch at most every 60 seconds; ticks are slow.
export const revalidate = 60;

/**
 * Recent on-chain activity from the Theseus agent demos on Base Sepolia.
 * The home-page LiveActivityLog calls this to swap its simulated feed for
 * real ticks committed by the deployed agents.
 */

const LAUNCH_SNIPER_FUND =
  "0xa6FbaadeA4e7f58D812D989737D708B279E8bd21" as Address;
const SOVEREIGN_FUND =
  "0x3e1cEd606571A35c43DA11a3b21C051690Bd926a" as Address;

const LSF_ABI = [
  {
    type: "function",
    name: "tickCount",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
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

const SF_ABI = [
  {
    type: "function",
    name: "tickCount",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
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

const LSF_ACTION = ["HOLD", "PASS", "BUY_TOKEN", "SELL_TOKEN"] as const;
const SF_ACTION = ["HOLD", "BUY_WETH", "SELL_WETH"] as const;

interface ActivityBlock {
  blockId: string;
  agentId: string;
  agentLabel: string;
  ts: number;
  reasonHash: Hex;
  txHash?: Hex;
  lines: string[];
}

function getClient() {
  return createPublicClient({
    chain: baseSepolia,
    transport: http("https://sepolia.base.org"),
  });
}

async function readLaunchSniperTicks(maxN: number): Promise<ActivityBlock[]> {
  const client = getClient();
  const tickCount = (await client.readContract({
    address: LAUNCH_SNIPER_FUND,
    abi: LSF_ABI,
    functionName: "tickCount",
  })) as bigint;

  const total = Number(tickCount);
  if (total === 0) return [];
  const start = Math.max(0, total - maxN);
  const calls = [];
  for (let i = start; i < total; i++) {
    calls.push({
      address: LAUNCH_SNIPER_FUND,
      abi: LSF_ABI,
      functionName: "ticks" as const,
      args: [BigInt(i)] as const,
    });
  }
  const results = await client.multicall({ contracts: calls });
  const out: ActivityBlock[] = [];
  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    if (r.status !== "success") continue;
    const t = r.result as readonly [number, Address, bigint, bigint, bigint, Hex, bigint];
    const [actionIdx, token, amountToken, amountUsdc, , reasonHash, timestamp] = t;
    const action = LSF_ACTION[actionIdx] ?? "HOLD";
    const lines: string[] = [];
    lines.push(`woke up, scanned Base mainnet for fresh launches`);
    if (action !== "HOLD") {
      lines.push(`read token ${shortAddr(token)} contract + pool state`);
    }
    if (action === "BUY_TOKEN") {
      lines.push(
        `signed BUY for $${(Number(amountUsdc) / 1e6).toFixed(2)} → ${humanize(amountToken)} tokens`,
      );
    } else if (action === "SELL_TOKEN") {
      lines.push(
        `signed SELL for ${humanize(amountToken)} tokens → $${(Number(amountUsdc) / 1e6).toFixed(2)}`,
      );
    } else if (action === "PASS") {
      lines.push(`decided PASS · reasonHash ${shortHex(reasonHash)}`);
    } else {
      lines.push(`HOLD · reasonHash ${shortHex(reasonHash)}`);
    }
    out.push({
      blockId: `launch-sniper-${i}`,
      agentId: "launch-sniper",
      agentLabel: "agent_launch_sniper",
      ts: Number(timestamp),
      reasonHash,
      lines,
    });
  }
  return out;
}

async function readSovereignFundTicks(maxN: number): Promise<ActivityBlock[]> {
  const client = getClient();
  const tickCount = (await client.readContract({
    address: SOVEREIGN_FUND,
    abi: SF_ABI,
    functionName: "tickCount",
  })) as bigint;

  const total = Number(tickCount);
  if (total === 0) return [];
  const start = Math.max(0, total - maxN);
  const calls = [];
  for (let i = start; i < total; i++) {
    calls.push({
      address: SOVEREIGN_FUND,
      abi: SF_ABI,
      functionName: "ticks" as const,
      args: [BigInt(i)] as const,
    });
  }
  const results = await client.multicall({ contracts: calls });
  const out: ActivityBlock[] = [];
  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    if (r.status !== "success") continue;
    const t = r.result as readonly [
      number,
      bigint,
      bigint,
      bigint,
      bigint,
      bigint,
      Hex,
      bigint,
    ];
    const [actionIdx, amountIn, amountOut, , , , reasonHash, timestamp] = t;
    const action = SF_ACTION[actionIdx] ?? "HOLD";
    const lines: string[] = [];
    lines.push(`woke up, read portfolio + market`);
    if (action === "BUY_WETH") {
      lines.push(
        `signed BUY_WETH · ${(Number(amountIn) / 1e6).toFixed(0)} USDC → ${(Number(amountOut) / 1e18).toFixed(3)} WETH`,
      );
    } else if (action === "SELL_WETH") {
      lines.push(
        `signed SELL_WETH · ${(Number(amountIn) / 1e18).toFixed(3)} WETH → ${(Number(amountOut) / 1e6).toFixed(0)} USDC`,
      );
    } else {
      lines.push(`HOLD · reasonHash ${shortHex(reasonHash)}`);
    }
    out.push({
      blockId: `sovereign-fund-${i}`,
      agentId: "sovereign-fund",
      agentLabel: "agent_sovereign_fund",
      ts: Number(timestamp),
      reasonHash,
      lines,
    });
  }
  return out;
}

function shortAddr(a: string): string {
  return `${a.slice(0, 6)}…${a.slice(-4)}`;
}
function shortHex(h: string): string {
  return `${h.slice(0, 10)}…`;
}
function humanize(n: bigint): string {
  const v = Number(n) / 1e18;
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(2)}M`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(1)}K`;
  return v.toFixed(2);
}

export async function GET() {
  try {
    const [snipes, fundTicks] = await Promise.all([
      readLaunchSniperTicks(6),
      readSovereignFundTicks(2),
    ]);
    const blocks = [...snipes, ...fundTicks].sort((a, b) => a.ts - b.ts);
    return NextResponse.json(
      { blocks },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=60, stale-while-revalidate=600",
        },
      },
    );
  } catch (err) {
    return NextResponse.json(
      { blocks: [], error: (err as Error).message },
      { status: 200 },
    );
  }
}
