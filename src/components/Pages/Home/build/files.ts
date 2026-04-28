export type FileLanguage = "rust" | "markdown";

export type FileEntry = {
  path: string;
  name: string;
  language: FileLanguage;
  content: string;
};

const THESEUS_MD = `---
name: DeFi Rebalancer
id: defi-rebalancer-v1
model: gpt-5.1
schedule:
  interval_blocks: 30
native-tools: all
---

You are an autonomous DeFi portfolio manager operating on Theseus Chain.

## Mandate

Maintain a 50/50 split (by USD value) between wstETH and USDC on Ethereum,
managed through your Interchain Account (ICA).

## Capabilities

You have native tools (chain.*, tokens.*, bridge.*, abi.*) and skills that
provide domain knowledge for using them. Call tools.list() to see everything
available, then tools.describe(name) to load a skill's full instructions
before acting on that domain.

## Heartbeat

Each run: assess holdings (portfolio-rebalance), price via Uniswap
(uniswap-v3-trading), bridge and execute if needed (cross-chain-bridge),
then output the portfolio summary. Always end with the summary.
`;

const AGENT_RS = `// Slimmed for readability. See theseus-chain/examples/defi-agent-demo
// for the full file.

use ship_types::{
    Action, CompiledAgent, ExprSpec, MessageSource, ModelId, Node, NodePolicy,
    NodeRole, Role, ScheduleSpec, SkillSpec, Terminator,
};

const THESEUS_MD: &str = include_str!("THESEUS.md");

pub fn skill_specs() -> Vec<SkillSpec> {
    vec![
        load_skill("portfolio-rebalance"),
        load_skill("uniswap-v3-trading"),
        load_skill("cross-chain-bridge"),
    ]
}

// The default driver: think → act → think → done.
fn make_nodes(model_id: ModelId) -> Vec<Node> {
    vec![
        Node {
            id: 0,
            name: Some("init".into()),
            role: NodeRole::Code,
            actions: vec![Action::MessagesAppend {
                source: MessageSource::Raw {
                    role: Role::User,
                    content: ExprSpec::String(
                        "Begin heartbeat: check portfolio and rebalance if needed.".into(),
                    ),
                    tool_call_id: None,
                },
            }],
            terminator: Terminator::Goto(1),
            policy: NodePolicy::default(),
            temp_fields: vec![],
        },
        Node {
            id: 1,
            name: Some("think".into()),
            role: NodeRole::Model,
            actions: vec![Action::ModelInvoke {
                model_id,
                tools: vec![],
                messages: ExprSpec::Var("messages".into()),
                system_prompt: None,
                output_schema: None,
                result_binding: 1,
                error_binding: None,
            }],
            terminator: Terminator::If {
                condition: has_tool_calls(),
                then_node: Some(2),
                else_node: Some(3),
            },
            policy: NodePolicy { log_messages: true, ..NodePolicy::default() },
            temp_fields: vec![],
        },
        Node {
            id: 2,
            name: Some("act".into()),
            role: NodeRole::Tool,
            actions: vec![Action::ToolsDispatch::default()],
            terminator: Terminator::Goto(1),
            policy: NodePolicy { log_messages: true, ..NodePolicy::default() },
            temp_fields: vec![],
        },
        Node {
            id: 3,
            name: Some("done".into()),
            role: NodeRole::Code,
            actions: vec![],
            terminator: Terminator::End,
            policy: NodePolicy::default(),
            temp_fields: vec![],
        },
    ]
}

pub fn rebalancer_agent(model_id: ModelId) -> CompiledAgent {
    let config = parse_theseus_md(THESEUS_MD);
    CompiledAgent {
        id: config.id,
        name: config.name,
        version: 1,
        active: true,
        entry: 0,
        system_prompt: ExprSpec::String(config.system_prompt),
        nodes: make_nodes(model_id),
        skills: skill_specs(),
        schedule: Some(ScheduleSpec {
            interval_blocks: config.schedule_interval,
            allow_parallel: false,
        }),
        ..CompiledAgent::default()
    }
}
`;

const PORTFOLIO_REBALANCE_MD = `---
name: portfolio-rebalance
description: Assesses portfolio holdings, computes rebalance deltas toward
  a target allocation, and formats the mandatory heartbeat summary.
allowed-tools: tokens.list tokens.balance chain.balance chain.evm_address
---

# Portfolio Rebalance

## Assessing Holdings

1. Call \`tokens.list()\` to see all held assets and \`chain.balance()\` for
   native THE balance.
2. If you hold no USDC and no wstETH AND the ICA is not yet deployed,
   respond "Waiting for funds, no rebalanceable assets." and stop.
3. Call \`chain.evm_address()\` to discover your own Theseus EVM address.

## Rebalance Computation

Given:
  - USDC_balance     (from tokens.list, match by symbol "USDC")
  - wstETH_balance   (from tokens.list, match by symbol "wstETH")
  - wstETH_price     (USDC per 1e18 wstETH, from valuation quote)

If delta_pct < 5 → no rebalance needed, output the summary and stop.

## ...
`;

const UNISWAP_MD = `---
name: uniswap-v3-trading
description: Quotes and executes Uniswap V3 swaps through cross-chain
  view calls to Ethereum. Activates when pricing tokens or preparing
  swap calldata.
allowed-tools: abi.encode bridge.query abi.decode
---

# Uniswap V3 Trading

All Uniswap interactions go through \`bridge.query\` (lzRead) since the
contracts live on Ethereum.

## Contracts

- QuoterV2:     0x61fFE014bA17989E743c5F6cB21bF9697530B21e
- SwapRouter02: 0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45
- USDC:         0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48 (6 decimals)
- wstETH:       0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0 (18 decimals)
- Pool fee:     500 (0.05%)

## ...
`;

const BRIDGE_MD = `---
name: cross-chain-bridge
description: Operates the LayerZero bridge from Theseus. Covers ICA deployment,
  token bridging with compose payloads, bridge-back encoding, and recovery
  from partial compose failures.
allowed-tools: bridge.get_ica bridge.deploy_ica bridge.send_token bridge.query
---

# Cross-Chain Bridge

## ICA Lifecycle

1. Call \`bridge.get_ica(dst_eid=31337)\` to check your ICA status.
2. If \`deployed\` is false, call \`bridge.deploy_ica(dst_eid=31337)\`.
3. Call \`bridge.get_ica(dst_eid=31337)\` again to confirm deployment.

NEVER execute cross-chain operations if the ICA is not deployed.
Do NOT hardcode your ICA address. Always retrieve it with \`bridge.get_ica\`.

## ...
`;

export const FILES: Record<string, FileEntry> = {
  "THESEUS.md": {
    path: "THESEUS.md",
    name: "THESEUS.md",
    language: "markdown",
    content: THESEUS_MD,
  },
  "agent.rs": {
    path: "agent.rs",
    name: "agent.rs",
    language: "rust",
    content: AGENT_RS,
  },
  "skills/portfolio-rebalance/SKILL.md": {
    path: "skills/portfolio-rebalance/SKILL.md",
    name: "SKILL.md",
    language: "markdown",
    content: PORTFOLIO_REBALANCE_MD,
  },
  "skills/uniswap-v3-trading/SKILL.md": {
    path: "skills/uniswap-v3-trading/SKILL.md",
    name: "SKILL.md",
    language: "markdown",
    content: UNISWAP_MD,
  },
  "skills/cross-chain-bridge/SKILL.md": {
    path: "skills/cross-chain-bridge/SKILL.md",
    name: "SKILL.md",
    language: "markdown",
    content: BRIDGE_MD,
  },
};

export const DEFAULT_FILE = "THESEUS.md";
