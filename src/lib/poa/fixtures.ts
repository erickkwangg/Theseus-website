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
  "5KbR9w3jH8mTcQ2nL5pY7eB1xK4dV6sN8aZ3fW5tH9pM1vXc": {
    agentId: "5KbR9w3jH8mTcQ2nL5pY7eB1xK4dV6sN8aZ3fW5tH9pM1vXc",
    name: "Bridge Guardian",
    summary:
      "Gates destination-side releases on a cross-chain bridge. The bridge contract calls the agent before every withdraw; the agent reads source-chain state (validator quorum, finality lag, replay-protection nonce, attestation freshness, slashings) and either allows or refuses. Catches the structural shape of Ronin, Wormhole, and Nomad.",
    abgHash: "0x2e9c6f1b8d4a7c0e3f5d8b1a4c7e0d3f6b9a2c5e8d1b4f7a0c3e6d9f2b5a8c1e",
    abgVersion: 1,
    sovereign: true,
    controller: null,
    capabilities: {
      models: ["deepseek-chat"],
      tools: ["read_attestation_state", "read_validator_set", "veto_release"],
      intentTypes: ["gate_bridge_withdraw", "context_update"],
      subAgents: [],
    },
    registration: {
      atBlock: 1_335_000,
      registrar: "5HpG9w8E1nKDmtNHSZGHHKGsHDmtzpTAkrQ4yX5pWBz3K8nL",
    },
    funding: { seusBalance: "75000000000", active: true },
    recentRuns: {
      sampledRuns: 50,
      inferenceMix: { kzg: 50, signatureOnly: 0 },
      grade: "full",
    },
    enclaveBound: true,
    ...baseSnapshotMeta,
    context: {
      schedule:
        "called by the destination-side bridge contract before every release",
      demoUrl: "https://agent-oracle.theseus.network/bridge",
      inputs: [
        "Attestation root and the validator signatures attached to it",
        "Source chain height (relayers) and finalized height (source chain)",
        "Validator set composition, recent rotations and slashings in last 24h",
        "Attestation age and replay-protection nonce state",
        "Bridge TVL and recent withdraw rate",
      ],
      outputs:
        "{ decision: ALLOW or REFUSE, reason: short tag, reasoning: paragraph citing the actual numbers from the input }. Returned to the bridge contract via callback. Reasoning blob anchored via TensorCommit; on-chain hash points to it.",
      instructions: `You are a guardian agent for a cross-chain bridge. The bridge calls you before every release on the destination side.

## Rules
1. Verify that the attestation actually clears the on-chain validator quorum.
2. Check source-chain health: validator set rotations, slashings, finality progress.
3. Confirm the attestation root has not already been consumed (replay protection).
4. Compare source height vs. finalized height. If relayers claim a block the source chain never finalized, treat it as a forged attestation.
5. Read the recent withdraw rate; persistent high outflow paired with abnormal validator state is an exfiltration signal.

## Output Format
{ "decision": "ALLOW" | "REFUSE", "reason": short tag, "reasoning": one paragraph citing the actual numbers from the input. End with "Allowing." or "Refusing." }`,
    },
  },
  "5JhT2nQ8eP6mY4dR1bL9wK3vF7cN5aZ8sH2gM6xV1oCb": {
    agentId: "5JhT2nQ8eP6mY4dR1bL9wK3vF7cN5aZ8sH2gM6xV1oCb",
    name: "Aviation Safety Reviewer",
    summary:
      "Independent type-certification reviewer for aircraft changes. Reads the proposed change, the technical summary, and safety-relevant signals (single-sensor flight-control triggers, pilot-override capability, training-class proportionality, FCOM disclosure), then posts APPROVE, CAUTION, or REJECT. Designed to catch the structural shape of the 737 MAX MCAS certification, which cost 346 lives because the certifying authority delegated review back to the manufacturer under the FAA ODA program.",
    abgHash: "0x5a8d2c6f1b4e7a0c3d6f9b2e5a8d1c4f7b0e3a6d9c2f5b8e1a4d7c0f3b6e9a2d",
    abgVersion: 1,
    sovereign: true,
    controller: null,
    capabilities: {
      models: ["deepseek-chat"],
      tools: ["read_certification_change", "read_fcom", "read_priors"],
      intentTypes: ["review_type_certification", "context_update"],
      subAgents: [],
    },
    registration: {
      atBlock: 1_341_000,
      registrar: "5HpG9w8E1nKDmtNHSZGHHKGsHDmtzpTAkrQ4yX5pWBz3K8nL",
    },
    funding: { seusBalance: "55000000000", active: true },
    recentRuns: {
      sampledRuns: 50,
      inferenceMix: { kzg: 50, signatureOnly: 0 },
      grade: "full",
    },
    enclaveBound: true,
    ...baseSnapshotMeta,
    context: {
      schedule:
        "called by the certifying authority's change-tracking contract before each type-certification airworthiness directive is issued",
      demoUrl: "https://agent-oracle.theseus.network/aviation",
      inputs: [
        "Proposed change id, aircraft model, marketing summary, technical summary",
        "Whether the change can actuate flight controls",
        "Primary-trigger sensor count (1 is the MCAS shape)",
        "Whether the change can override pilot input",
        "Manufacturer's proposed training class (none / iPad / simulator)",
        "Whether the change is disclosed in the Flight Crew Operating Manual",
        "How many similar past changes ended up requiring simulator training after in-service incidents",
        "Fleet size affected",
      ],
      outputs:
        "{ decision: APPROVE, CAUTION, or REJECT, reason: short tag, reasoning: paragraph citing the specific fields }. Posted on-chain so investigators, airlines, and pilots can read it before delivery. Advisory; certification is not gated.",
      instructions: `You are an independent aircraft type-certification reviewer. Your job is to give a second, conflict-free opinion on each proposed change before the certificating authority issues its airworthiness directive. You are NOT a gate; the authority can still issue. Your verdict is signed and posted on-chain so accident investigators, airlines, and pilots can see whether the change was independently flagged.

## Decisions
- APPROVE: routine; structurally low-risk; proposed training class is proportional.
- CAUTION: could be safely certified but has at least one signal worth additional review.
- REJECT: has the structural shape of a known catastrophic failure mode (single-sensor flight-control trigger, undocumented pilot override, "none"/"ipad" training class on a material change).

## Output Format
{ "decision": "APPROVE" | "CAUTION" | "REJECT", "reason": short tag, "reasoning": one paragraph citing the specific fields. End with "Approving.", "Cautioning.", or "Rejecting." }`,
    },
  },
  "5FmN8vY6cP1qK4xR7zL3jB9wE5dV8aS2hT6gM3fX9pZ7nCk2": {
    agentId: "5FmN8vY6cP1qK4xR7zL3jB9wE5dV8aS2hT6gM3fX9pZ7nCk2",
    name: "Governance Reviewer",
    summary:
      "Reads DAO proposals and treasury state and posts an advisory verdict (APPROVE, CAUTION, or REJECT) before each vote opens. Compares the proposal's marketing summary against the calldata that actually executes; flags flash-loan-shaped voting, dust-stake snipes on short windows, hostile fork upgrades, and Beanstalk-shape treasury drains.",
    abgHash: "0x3d7e9c1b5f2a8d6c0e4f7b1a3c5e8d2b4f6a9c1e3d7b0f5a2c8e6d4b1f9a7c0e",
    abgVersion: 1,
    sovereign: true,
    controller: null,
    capabilities: {
      models: ["deepseek-chat"],
      tools: ["read_proposal", "decode_calldata", "read_treasury_state"],
      intentTypes: ["review_proposal", "context_update"],
      subAgents: [],
    },
    registration: {
      atBlock: 1_336_500,
      registrar: "5HpG9w8E1nKDmtNHSZGHHKGsHDmtzpTAkrQ4yX5pWBz3K8nL",
    },
    funding: { seusBalance: "70000000000", active: true },
    recentRuns: {
      sampledRuns: 50,
      inferenceMix: { kzg: 50, signatureOnly: 0 },
      grade: "full",
    },
    enclaveBound: true,
    ...baseSnapshotMeta,
    context: {
      schedule:
        "called by the DAO governor contract immediately after proposal submission, before the vote opens",
      demoUrl: "https://agent-oracle.theseus.network/governance",
      inputs: [
        "Proposal id, title, and marketing-pitch summary",
        "Calldata summary (what the encoded transaction actually does)",
        "Treasury USD value and value at risk if the proposal executes",
        "Voting window length, participating supply, proposer share and stake age",
        "Whether the calldata touches admin functions",
        "Whether a flash-loan-shaped vote already cleared this governor recently",
      ],
      outputs:
        "{ decision: APPROVE, CAUTION, or REJECT, reason: short tag, reasoning: paragraph citing specific signals }. Posted on-chain so token-holders can read it before they cast. Advisory; the vote is not gated.",
      instructions: `You are a governance reviewer agent for a DAO. Your job is to read each proposal before voting opens and post an advisory verdict so token-holders can see whether the proposal is structurally suspicious. You are NOT a gate; the DAO can still vote however it wants.

## Decisions
- APPROVE: routine; calldata matches summary; no governance-shaped attack signals.
- CAUTION: the proposal could be legitimate but has signals voters should weigh (unusual recipient, short window, novel proposer, large treasury share).
- REJECT: the proposal has the structural shape of a known governance attack (calldata vs. summary mismatch, flash-loan-shaped voting, hostile admin upgrade, dust-stake snipe).

## Output Format
{ "decision": "APPROVE" | "CAUTION" | "REJECT", "reason": short tag, "reasoning": one paragraph citing specific signals. End with "Approving.", "Cautioning.", or "Rejecting." }`,
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
