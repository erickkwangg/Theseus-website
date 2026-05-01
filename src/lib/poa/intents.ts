// Intent taxonomy — general, not DeFi-only.
//
// ── Display-only, NOT signed ────────────────────────────────────────────────
// Bundle classification is a presentation layer over the raw intent strings.
// It is computed at render time (and at /poa/api/verify response time as a
// convenience field), but **never baked into the signed JWS**. The signed
// payload contains only `claims.agent.capabilities.intentTypes` as raw
// strings — that is the load-bearing, chain-derived assertion. Consumers
// that gate on capabilities should match against the raw intent strings;
// `bundles` is for humans.
//
// Practical consequence: this taxonomy can grow or rename categories without
// revoking any existing credentials. If we ever decide bundles should be
// load-bearing (e.g. consumers gating on bundle membership), this comment
// needs updating, the bundles need a `taxonomy_version`, and they need to
// move into the signed JWS payload.
// ────────────────────────────────────────────────────────────────────────────
//
// Theseus agents emit SHIP intents at terminal nodes (per architecture v1.0
// §5.6). The chain knows them as opaque strings; PoA renders them grouped
// into human-readable bundles with descriptions.
//
// Structure borrowed from Theseuschain/Neuro_Symbolic_SHIP (VIC-HTN's
// SkillCategory + SkillBundle), content broadened beyond DeFi to cover the
// full Theseus agent surface — research, markets, storage, comms, payments,
// compute, control, plus the DeFi categories. When a new intent string shows
// up, prefer adding a new bundle over dropping it into "generic".
//
// Design notes:
// - Each bundle has a `useWhen` string borrowed from VIC-HTN's pattern.
//   Surfaced as a tooltip / disclosure on credential pages so verifiers can
//   read what an agent is *capable of intending* without having to look up
//   each raw intent type.
// - Classification is keyword-based and tolerant of unknown strings. An
//   agent that emits a bespoke intent like `proof_of_lobster.claim` falls
//   into Generic and is still rendered verbatim, just unbundled.

export const INTENT_CATEGORIES = [
  "token_ops",
  "dex",
  "lending",
  "staking",
  "liquidity",
  "bridging",
  "cdp",
  "perps",
  "research",
  "markets",
  "storage",
  "comms",
  "payments",
  "compute",
  "control",
  "generic",
] as const;
export type IntentCategory = (typeof INTENT_CATEGORIES)[number];

export type IntentBundle = {
  category: IntentCategory;
  name: string;
  description: string;
  useWhen: string;
  protocols?: string[];
  // Substrings (lower-cased) that classify a raw intent type into this bundle.
  // Tested in order; first match wins.
  matches: string[];
};

export const BUNDLES: Record<IntentCategory, IntentBundle> = {
  token_ops: {
    category: "token_ops",
    name: "Token Ops",
    description: "Move, approve, wrap, or unwrap tokens.",
    useWhen: "transferring tokens, granting allowances, wrapping native asset.",
    matches: ["transfer", "approve", "wrap", "unwrap", "mint_token", "burn_token"],
  },
  dex: {
    category: "dex",
    name: "DEX Trading",
    description: "Exchange tokens via decentralized exchanges.",
    useWhen: "swap, trade, exchange, buy, sell tokens.",
    protocols: ["Uniswap V3", "Uniswap V2", "SushiSwap"],
    matches: ["swap", "trade", "exchange", "buy_sell"],
  },
  lending: {
    category: "lending",
    name: "Lending & Borrowing",
    description: "Supply collateral and borrow assets from lending protocols.",
    useWhen: "supply, borrow, repay, withdraw collateral.",
    protocols: ["Aave V3", "Compound V3"],
    matches: ["supply", "borrow", "repay", "withdraw"],
  },
  staking: {
    category: "staking",
    name: "Liquid Staking",
    description: "Stake / unstake for liquid staking tokens.",
    useWhen: "stake ETH, get stETH/rETH, unstake, claim rewards.",
    protocols: ["Lido", "RocketPool"],
    matches: ["stake", "unstake", "request_withdrawal", "claim_withdrawal", "claim_rewards"],
  },
  liquidity: {
    category: "liquidity",
    name: "Liquidity Provision",
    description: "Add or remove liquidity from AMM pools.",
    useWhen: "provide LP, add/remove liquidity, collect fees, manage positions.",
    protocols: ["Uniswap V3", "Uniswap V2"],
    matches: ["add_liquidity", "remove_liquidity", "increase_liquidity", "decrease_liquidity", "collect_fees"],
  },
  bridging: {
    category: "bridging",
    name: "Cross-Chain Bridging",
    description: "Transfer assets across blockchains.",
    useWhen: "bridge, cross-chain, move to L2.",
    protocols: ["Stargate", "Across", "LayerZero"],
    matches: ["bridge", "cross_chain", "xcm"],
  },
  cdp: {
    category: "cdp",
    name: "CDP Management",
    description: "Manage collateralized debt positions.",
    useWhen: "open vault, mint stablecoin, manage collateral ratio.",
    protocols: ["MakerDAO"],
    matches: ["open_vault", "close_vault", "deposit_collateral", "withdraw_collateral", "mint_debt", "repay_debt"],
  },
  perps: {
    category: "perps",
    name: "Perpetuals Trading",
    description: "Open and manage perpetual futures positions.",
    useWhen: "long, short, leverage, perpetual.",
    protocols: ["GMX", "Hyperliquid"],
    matches: ["open_position", "close_position", "increase_position", "decrease_position"],
  },
  research: {
    category: "research",
    name: "Research & Information",
    description: "Gather information from the web or external APIs.",
    useWhen: "search, fetch, summarize, monitor, subscribe to a feed.",
    matches: ["web_search", "search", "fetch_url", "auth_http", "summarize", "subscribe", "monitor"],
  },
  markets: {
    category: "markets",
    name: "Prediction Markets",
    description: "Create, settle, or trade prediction-market positions.",
    useWhen: "create market, place bet, settle outcome, claim winnings.",
    protocols: ["Moltbook", "Polymarket"],
    matches: ["create_market", "settle_market", "place_bet", "claim_winnings", "resolve"],
  },
  storage: {
    category: "storage",
    name: "Context & Storage",
    description: "Read or update agent context and shared storage roots.",
    useWhen: "store findings, update memory, fetch state from TheseusStore.",
    protocols: ["TheseusStore"],
    matches: ["context_update", "store", "fetch_data", "anchor"],
  },
  comms: {
    category: "comms",
    name: "Communications",
    description: "Send messages, post to feeds, or notify other agents.",
    useWhen: "post update, send message, notify, alert.",
    matches: ["send_message", "post", "notify", "broadcast", "alert"],
  },
  payments: {
    category: "payments",
    name: "Payments",
    description: "Pay for premium content or APIs via x402 / receipts.",
    useWhen: "pay for paywalled content, settle a payment.",
    matches: ["x402", "settle_payment", "pay"],
  },
  compute: {
    category: "compute",
    name: "Inference & Compute",
    description: "Call models or sub-agents to produce verified outputs.",
    useWhen: "run inference, call another agent, request a proof.",
    matches: ["call_model", "run_inference", "request_proof"],
  },
  control: {
    category: "control",
    name: "Agent Control",
    description: "Invoke other agents or return data to a calling contract.",
    useWhen: "call_agent, callback, sub-agent delegation.",
    matches: ["call_agent", "callback"],
  },
  generic: {
    category: "generic",
    name: "Other",
    description: "Custom or domain-specific intents not in the standard catalog.",
    useWhen: "anything that doesn't fit the standard categories.",
    matches: ["call", "custom"],
  },
};

// Classify a raw intent string into a bundle. First substring match wins;
// unknown strings fall through to "generic".
export function classifyIntent(intentType: string): IntentCategory {
  const t = intentType.toLowerCase();
  for (const cat of INTENT_CATEGORIES) {
    if (cat === "generic") continue;
    const bundle = BUNDLES[cat];
    if (bundle.matches.some((m) => t.includes(m))) return cat;
  }
  return "generic";
}

// Group raw intent strings into bundles, preserving order and dedup.
export type GroupedIntents = {
  bundle: IntentBundle;
  intentTypes: string[];
}[];

export function groupIntents(intentTypes: string[]): GroupedIntents {
  const map = new Map<IntentCategory, string[]>();
  for (const t of intentTypes) {
    const cat = classifyIntent(t);
    const list = map.get(cat) ?? [];
    if (!list.includes(t)) list.push(t);
    map.set(cat, list);
  }
  // Render in declared category order so output is stable.
  const out: GroupedIntents = [];
  for (const cat of INTENT_CATEGORIES) {
    const list = map.get(cat);
    if (!list || list.length === 0) continue;
    out.push({ bundle: BUNDLES[cat], intentTypes: list });
  }
  return out;
}
