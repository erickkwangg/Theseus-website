import type { AgentSnapshot, SS58Address } from "./types";

// Three fixture agents covering the design's main shapes:
// - sovereign + full KZG: the "ideal" PoA target
// - non-sovereign + mixed verification: the realistic alpha agent
// - non-sovereign + lite-only: shows up as a low-grade credential

const baseSnapshotMeta = {
  snapshotAtBlock: 0,
  snapshotAtTime: "",
};

const FIXTURES: Record<SS58Address, AgentSnapshot> = {
  "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY": {
    agentId: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
    name: "Iris Treasury",
    summary: "Autonomous USDC treasury that supplies idle stablecoin to lending markets within a fixed mandate.",
    abgHash: "0xa3f9e2c7b4d186e02f4a91c7e8b5d2f3a1c9e6d4b7a8c2e5f1d9b3a6c8e0f2d4",
    abgVersion: 3,
    sovereign: true,
    controller: null,
    capabilities: {
      models: ["gpt-oss-120b"],
      tools: ["buy_sell_tokens"],
      intentTypes: [
        "transfer",
        "approve",
        "supply",
        "withdraw",
        "swap",
        "context_update",
      ],
      subAgents: [],
    },
    registration: {
      atBlock: 1_100_000,
      registrar: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
    },
    funding: { seusBalance: "150000000000", active: true },
    recentRuns: {
      sampledRuns: 50,
      inferenceMix: { kzg: 50, signatureOnly: 0 },
      grade: "full",
    },
    enclaveBound: false,
    ...baseSnapshotMeta,
  },
  "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty": {
    agentId: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
    name: "Moltbook Maker",
    summary: "Prediction market maker on Moltbook. Reads news, prices outcomes, settles positions on-chain.",
    abgHash: "0xb4e8d1a6c3f095d7e1a4f8b3c6d9e2f5a8b1c4d7e0a3f6b9c2e5d8a1b4c7e0f3",
    abgVersion: 1,
    sovereign: false,
    controller: "5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy",
    capabilities: {
      models: ["gpt-oss-120b", "claude-haiku-4-5"],
      tools: ["buy_sell_tokens", "web_search", "auth_http"],
      intentTypes: [
        "create_market",
        "settle_market",
        "place_bet",
        "transfer",
        "web_search",
        "context_update",
      ],
      subAgents: [],
    },
    registration: {
      atBlock: 1_180_000,
      registrar: "5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy",
    },
    funding: { seusBalance: "42000000000", active: true },
    recentRuns: {
      sampledRuns: 50,
      inferenceMix: { kzg: 32, signatureOnly: 18 },
      grade: "mixed",
    },
    enclaveBound: true,
    ...baseSnapshotMeta,
  },
  "5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy": {
    agentId: "5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy",
    name: "Lobster Scout",
    summary: "Web research agent that watches a curated news set and summarizes findings into agent-readable context.",
    abgHash: "0xc5f9e2d8a4b1c7e0a3f6b9d2e5f8a1b4c7d0e3f6a9b2c5d8e1f4a7b0c3d6e9f2",
    abgVersion: 1,
    sovereign: false,
    controller: "5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw",
    capabilities: {
      models: ["external-hosted-model"],
      tools: ["web_search"],
      intentTypes: [
        "web_search",
        "fetch_url",
        "summarize",
        "context_update",
        "x402",
      ],
      subAgents: [],
    },
    registration: {
      atBlock: 1_200_000,
      registrar: "5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw",
    },
    funding: { seusBalance: "8000000000", active: true },
    recentRuns: {
      sampledRuns: 50,
      inferenceMix: { kzg: 0, signatureOnly: 50 },
      grade: "lite",
    },
    enclaveBound: true,
    ...baseSnapshotMeta,
  },
};

export const FIXTURE_AGENTS: Record<SS58Address, AgentSnapshot> = FIXTURES;

// Fixture signature scheme. Controllers "sign" by hex-encoding "OK:" + message.
// Real chain reader will swap this for sr25519 verification via @polkadot/util-crypto.
export const FIXTURE_VALID_SIGNATURES: Record<
  SS58Address,
  (message: string) => string
> = {
  "5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy": (msg) =>
    "0x" + Buffer.from("OK:" + msg, "utf8").toString("hex"),
  "5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw": (msg) =>
    "0x" + Buffer.from("OK:" + msg, "utf8").toString("hex"),
};

export function fixtureSign(
  controller: SS58Address,
  message: string,
): string | null {
  const fn = FIXTURE_VALID_SIGNATURES[controller];
  return fn ? fn(message) : null;
}

export const FIXTURE_AGENT_IDS = Object.keys(FIXTURES);
