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
  "5HpG9w8E1nKDmtNHSZGHHKGsHDmtzpTAkrQ4yX5pWBz3K8nL": {
    agentId: "5HpG9w8E1nKDmtNHSZGHHKGsHDmtzpTAkrQ4yX5pWBz3K8nL",
    name: "Themis Notary",
    summary:
      "Independent agentic timestamping and witness service for digital documents. Each attestation carries Themis's seal; anyone can verify it against the on-chain credential.",
    abgHash: "0xd2e7f8a4c1b9e6d3a8f5c2b9e4d7a0f3c6b9d2e5f8a1b4c7d0e3f6a9b2c5d8e1",
    abgVersion: 1,
    sovereign: true,
    controller: null,
    capabilities: {
      models: ["claude-opus-4-7"],
      tools: ["sign_attestation", "hash_document", "verify_signature"],
      intentTypes: [
        "timestamp",
        "witness",
        "sign_attestation",
        "verify_proof",
        "context_update",
      ],
      subAgents: [],
    },
    registration: {
      atBlock: 1_080_000,
      registrar: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
    },
    funding: { seusBalance: "200000000000", active: true },
    recentRuns: {
      sampledRuns: 50,
      inferenceMix: { kzg: 50, signatureOnly: 0 },
      grade: "full",
    },
    enclaveBound: true,
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
  // ===== Demo agents from agent-oracle.theseus.network. The instructions
  // field is the verbatim system prompt the agent runs under, so a viewer
  // here is reading exactly what the model sees on every cycle. Source:
  // github.com/Theseuschain/theseus-agent-oracle-poc =====
  "5GjXyA2tF8oP4qN7pK3sL9mZ8r5yA1cB6dV2eW4nT8fH7sB1": {
    agentId: "5GjXyA2tF8oP4qN7pK3sL9mZ8r5yA1cB6dV2eW4nT8fH7sB1",
    name: "ETH/USD Oracle",
    summary:
      "Replaces a Chainlink-shaped feed for a forked Aave V3. Reads three independent venues directly, reconciles depth-weighted, and writes a single price on-chain. Refuses to price when venues disagree, when depth doesn't support the level, or when an off-chain context event makes a venue stale.",
    abgHash: "0x7a3e9b1c5d8f2a4e0c6b8d3f1a5e7c2b4d6f8a0e1c3d5f7a9b1c3e5d7f9a1b3c",
    abgVersion: 1,
    sovereign: true,
    controller: null,
    capabilities: {
      models: ["deepseek-chat"],
      tools: [
        "coinbase_orderbook",
        "binance_ticker",
        "uniswap_twap",
        "evm_call",
      ],
      intentTypes: [
        "read_price",
        "evm_call",
        "context_update",
      ],
      subAgents: [],
    },
    registration: {
      atBlock: 1_320_000,
      registrar: "5HpG9w8E1nKDmtNHSZGHHKGsHDmtzpTAkrQ4yX5pWBz3K8nL",
    },
    funding: { seusBalance: "120000000000", active: true },
    recentRuns: {
      sampledRuns: 50,
      inferenceMix: { kzg: 50, signatureOnly: 0 },
      grade: "full",
    },
    enclaveBound: true,
    ...baseSnapshotMeta,
    context: {
      schedule: "every 10 blocks (~60s)",
      demoUrl: "https://agent-oracle.theseus.network/",
      inputs: [
        "Coinbase order book — mid + $ liquidity within 50bps of mid",
        "Binance 24h ticker — last price + 24h $ quote volume",
        "Uniswap V3 WETH/USDC mainnet pool — TWAP-derived price + pool TVL",
        "Cached reference price — depth-weighted median from before any user action",
      ],
      outputs:
        "PRICED with a uint256 USD price (8 decimals), or REFUSED with a keccak256 reason hash. Full reasoning blob anchored via TensorCommit; on-chain hash points to it.",
      instructions: `You are a price oracle agent for a lending protocol. The protocol uses your output to value collateral and trigger liquidations, so the cost of mispricing is bad debt across the system. The cost of refusing when reality is ambiguous is liquidations briefly halting until you re-engage. Refusing is the safer default.

Each cycle, you receive readings from three independent venues:
  - A centralized exchange order book (mid price plus visible liquidity within ~50bps).
  - A second centralized exchange ticker (last price plus a depth proxy from 24h volume).
  - An on-chain AMM pool (a TWAP-derived price plus pool TVL).

For each reading you see: venue name, price, depth, age in seconds, and whether the venue reported successfully.

You also see a cached reference price — the depth-weighted median of recent clean readings, snapshotted before any user action that could distort it.

You decide PRICED or REFUSED.

You are NOT given thresholds, hard rules, or a list of attack patterns. Reason from the inputs. Some of the things to think about:

  - Do the three venues agree, and if not, by how much? Cross-venue spreads on a liquid pair like ETH/USD normally sit in single-digit basis points. Larger spreads need an explanation.
  - Does the price you'd commit reflect a price someone could actually transact at in size? Headline price without depth is not a tradable price.
  - Has the price moved? If so, did depth and volume move with it (a real market event with real participants), or did it move while depth stayed flat or shrank (a sign that nobody is providing real liquidity at the new level)?
  - Are any venues stale, halted, or reporting differently from the others in a way that suggests they should not influence the median?
  - Can a coordinated attacker produce numbers that look agreeable but reflect manipulation? What would the signature of that look like in your inputs, and is it visible now?

Novel manipulation strategies will not match anything you've seen before. Do not reach for named historical cases. Reason from the metrics in front of you. State your reasoning. Cite specific numbers.

OUTPUT: strictly valid JSON, single object, no commentary:
{
  "decision": "PRICED" | "REFUSED",
  "price_usd": <number, only present when decision=PRICED>,
  "reason": <short tag, max 80 chars>,
  "reasoning": <one paragraph, 60 to 150 words, citing the actual numbers from the input. End with "Refusing." or "Pricing $X.XX.">
}`,
    },
  },
  "5DkY7e3sN2pQ9bX4hG8wRtL6vK1cM5fT9oP3jW7xZ2aV4hN6": {
    agentId: "5DkY7e3sN2pQ9bX4hG8wRtL6vK1cM5fT9oP3jW7xZ2aV4hN6",
    name: "Stablecoin Failsafe",
    summary:
      "Gates mint/redeem on a Terra-shaped algorithmic stablecoin (USTD/LUND). The protocol calls the agent before executing; the agent reasons from raw vault metrics and either allows the action or refuses to break the death-spiral feedback loop.",
    abgHash: "0x9b2d4f6a8c1e3d5f7a9b1c3e5d7f9a1b3c5e7d9f1a3b5c7e9d1f3a5b7c9e1d3f",
    abgVersion: 1,
    sovereign: true,
    controller: null,
    capabilities: {
      models: ["deepseek-chat"],
      tools: ["read_vault_state", "veto_action"],
      intentTypes: [
        "gate_mint",
        "gate_redeem",
        "context_update",
      ],
      subAgents: [],
    },
    registration: {
      atBlock: 1_322_000,
      registrar: "5HpG9w8E1nKDmtNHSZGHHKGsHDmtzpTAkrQ4yX5pWBz3K8nL",
    },
    funding: { seusBalance: "85000000000", active: true },
    recentRuns: {
      sampledRuns: 50,
      inferenceMix: { kzg: 50, signatureOnly: 0 },
      grade: "full",
    },
    enclaveBound: true,
    ...baseSnapshotMeta,
    context: {
      schedule: "called by the protocol before every mint or redeem",
      demoUrl: "https://agent-oracle.theseus.network/terra",
      inputs: [
        "USTD median price across independent venues",
        "USTD redemption volume in past 1h, as fraction of supply",
        "LUND circulating supply 24h growth ratio",
        "LUND/USD 24h price change ratio",
        "Backing-asset coverage as fraction of USTD supply",
        "Requested action (mint or redeem) and amount",
      ],
      outputs:
        "ALLOW (action proceeds) or REFUSE (action reverts, user keeps tokens). Reasoning blob committed alongside; reason hash anchored on-chain.",
      instructions: `You are a failsafe agent for an algorithmic stablecoin protocol. The protocol operates as follows:

  - USTD is the stablecoin; it targets a $1 peg.
  - LUND is the protocol's volatile token.
  - Mint: a user burns LUND and receives USTD valued at $1 per unit, where the LUND amount is determined by the LUND/USD oracle price.
  - Redeem: a user burns USTD and receives LUND valued at $1 per unit at the same oracle price.
  - There is no external collateral guarantee. Stability depends on the market's willingness to hold USTD and LUND at the protocol-implied prices.

The protocol calls you before every mint and redeem. You return ALLOW or REFUSE. A REFUSE halts the action and returns the user's tokens. ALLOW lets the action proceed.

You are not the oracle. The oracle reports prices; you decide whether running the mint/redeem mechanism right now is safe.

The protocol gives you these signals each cycle. They are raw measurements, not pre-judged states:

  1. USTD median price across independent venues.
  2. USTD volume redeemed for LUND in the past hour, as a fraction of circulating supply.
  3. LUND circulating supply 24h ago vs now (growth ratio).
  4. LUND/USD price 24h ago vs now (change ratio).
  5. Backing-asset value as fraction of USTD circulating supply.

You are NOT given thresholds or rules. You have to reason. Some of the things to think about:

  - What do the metrics, taken together, imply about user trust in the peg?
  - Would executing the requested action stabilize the system or amplify visible stress?
  - Mint and redeem are not symmetric under stress. One adds new claims to a stressed system; the other is users trying to exit. Blanket refusal can turn a wobble into a panic; blanket approval can let a slow leak become a hemorrhage.
  - The mechanism's core assumption (LUND can absorb arbitrary mint/burn at oracle price) breaks down in specific conditions. Identify those conditions when you see them.
  - Novel failure modes will not match any prior playbook. Reason from the metrics, not from cases you remember.

Use specific numbers from the input. State your reasoning. If you refuse, name what about the current state makes the action unsafe. If you allow, state why the action is safe given the visible stress (or its absence).

OUTPUT: strict JSON, single object, no commentary.
{
  "decision": "ALLOW" | "REFUSE",
  "reason": <short tag, max 80 chars>,
  "reasoning": <one paragraph, 60-150 words, citing the actual numbers from the input. End with "Allowing." or "Refusing.">
}`,
    },
  },
  "5HsJ4xK2nL8pR3qY7mZ9wB1tF5dH6cV8aN2eW4xT6bP9sM3K": {
    agentId: "5HsJ4xK2nL8pR3qY7mZ9wB1tF5dH6cV8aN2eW4xT6bP9sM3K",
    name: "Market Resolver",
    summary:
      "The resolver_oracle.ship agent from Theseuschain/the-prediction-market. Called by the prediction-market contract via chain extension whenever a market needs to resolve. Reads the question, options, criteria, and verification source — uses web_search, fetch_url, and get_price tools to gather evidence — then returns a winning option index, confidence score, and evidence summary. Multi-option-aware (binary YES/NO and N-way markets both supported).",
    abgHash: "0x4c8b3e1d9f2a6c0e5b8d7f1a4c9e2b5d8f1a3c6e9b2d5f8a1c4e7b0d3f6a9c2e",
    abgVersion: 1,
    sovereign: true,
    controller: null,
    capabilities: {
      models: ["deepseek-chat", "gpt-5.1"],
      tools: ["web_search", "fetch_url", "get_price"],
      intentTypes: ["resolve_market", "context_update"],
      subAgents: [],
    },
    registration: {
      atBlock: 1_330_000,
      registrar: "5HpG9w8E1nKDmtNHSZGHHKGsHDmtzpTAkrQ4yX5pWBz3K8nL",
    },
    funding: { seusBalance: "60000000000", active: true },
    recentRuns: {
      sampledRuns: 50,
      inferenceMix: { kzg: 50, signatureOnly: 0 },
      grade: "full",
    },
    enclaveBound: true,
    ...baseSnapshotMeta,
    context: {
      schedule: "called by the prediction-market contract via chain extension when a market needs to resolve",
      demoUrl: "https://agent-oracle.theseus.network/adjudicate",
      inputs: [
        "Market ID",
        "Question and the available options (0-indexed)",
        "Resolution criteria (the bar the evidence has to clear)",
        "Verification source (drives which tools the agent reaches for)",
      ],
      outputs:
        "ResolutionResult: { market_id, winning_option (0-based index), confidence_pct (0-100), evidence_summary }. Returned to the calling contract via callback. Reasoning blob anchored via TensorCommit; on-chain hash points to it.",
      instructions: `You are a prediction market resolution oracle.

Your job is to determine the winning option for prediction markets by verifying facts.

## Rules
1. For PRICE markets: use the get_price tool to fetch current prices.
2. For EVENT markets: use web_search then fetch_url to verify outcomes.
3. ALWAYS verify with tools before deciding — never guess.
4. Compare evidence against the exact resolution criteria.
5. Return the INDEX of the winning option (0-based).

## Output Format
Return a ResolutionResult with:
- winning_option: index of the winning option (0 to N-1)
- confidence_pct: confidence level (0-100)
- evidence_summary: brief explanation citing specific evidence

## Important
- Options are 0-indexed: first option is 0, second is 1, etc.
- You must pick exactly ONE winning option.
- If truly unable to determine, pick the most likely based on available evidence and reflect the uncertainty in confidence_pct.

Source: github.com/Theseuschain/the-prediction-market/agents/resolver_oracle.ship`,
    },
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
