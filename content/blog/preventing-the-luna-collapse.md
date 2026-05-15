---
title: "How Theseus would've prevented the Luna collapse"
date: "2026-05-14"
excerpt: "The mechanism that broke in May 2022 was visibly breaking in real time. A verifiable, sovereign LLM failsafe agent could have refused the actions that fueled the death spiral. A working prototype is live."
author: "Theseus Labs"
---

May 2022: a $40 billion algorithmic stablecoin collapsed in eight days. UST, Terra protocol's dollar-pegged token, depegged on May 8. By May 10 it had dropped through $0.75. By May 13 it had reached $0.18. Meanwhile LUNA, the protocol's volatile sister token, went from $80 to fractions of a cent in the same window.

This wasn't caused by a smart-contract bug. The contracts ran exactly as designed. They ran the system off the cliff because they ran exactly as designed, and the design assumed something that stopped being true.

## The mechanism

Terra's mint-and-redeem worked like this. To mint 1 UST, a user burned $1 worth of LUNA at the oracle's reported LUNA price. To redeem 1 UST, the protocol minted them $1 worth of LUNA at the same oracle price. The contract enforced this exchange continuously, in both directions, with no external collateral behind it. The peg's stability depended entirely on the market's willingness to hold both tokens at the prices the protocol implied.

As long as LUNA was deep, liquid, and trusted, the mechanism worked. Arbitrage closed any peg deviation. If UST traded at $0.99 on the market, you could buy 1 UST for 99 cents, redeem it through the protocol for $1 worth of LUNA at oracle price, sell that LUNA on the market for $1, and pocket the cent. Each round of arbitrage burned some UST and minted some LUNA, but the volumes stayed small because the deviations stayed small.

The mechanism's core assumption was that the oracle's LUNA price would still be a real market price after the protocol had minted new LUNA at it. That holds when redemption volume is small relative to LUNA's market depth. It breaks the moment redemptions outpace the depth, because the protocol ends up printing LUNA at a price that the print itself has already destroyed. The contract had no way to recognize when it had crossed that line.

## The death spiral, in four arrows

![Terra death spiral feedback loop: UST slips below $1, holders redeem UST for newly-minted LUNA, LUNA price falls, coverage shrinks per remaining UST, peg slips further. Four red arrows in a clockwise loop.](/blog/preventing-the-luna-collapse/death-spiral.svg)

*The four-step feedback loop. Each arrow is the mechanism doing exactly what it was designed to do.*

When confidence in the peg cracked, redemption pressure rose sharply. UST holders burned UST, received newly-minted LUNA, and sold that LUNA on the open market on the way out. The LUNA supply ballooned and the same LUNA hit the market for sale in the same block. LUNA's price fell hard, not because of abstract supply-and-demand, but because the protocol was minting LUNA into the hands of sellers in real time.

As LUNA fell, the value backing each remaining UST shrank, which made the peg shakier and pulled more holders into the same exit. The oracle's LUNA price chased the spot price down, so each new redemption minted more LUNA than the one before. Each loop printed more LUNA at a lower price, and the next loop's defense was weaker still.

The numbers from the actual collapse: LUNA's circulating supply went from roughly 343 million on May 7 to over 6.5 trillion by May 13. A 19,000× expansion in six days. The mechanism worked exactly as written. Every redemption was honored at oracle price. The contract had no opinion about whether honoring those redemptions was destroying the system.

## Why no smart contract could have stopped it

Determinism is a feature until it's the bug. A smart contract that gates mint/redeem can check whether the inputs satisfy a rule (does the user have UST to burn, is the oracle reporting a price), but it can't reason about whether the rule itself still makes sense. There's no `require` clause that distinguishes an orderly arbitrage from a self-reinforcing collapse.

You could code static thresholds: refuse mint if the peg deviates more than 2%, refuse redeem if LUNA supply grew more than 10% in 24 hours. Static thresholds fire too early in some scenarios (turning a wobble into a panic by blocking exits) and too late in others (when the cascade is already running). Once thresholds are public, attackers design around them.

What's missing is judgment: a process that reads the full vault state, weighs the trade-offs (mint and redeem behave very differently under stress), and decides whether the next action moves the system toward equilibrium or away from it. Solidity can't do that. An LLM agent reading on-chain inputs can.

In Terra's specific case, the structural failure was knowable from the state. The protocol was printing LUNA at an oracle price that its own prints were already invalidating. Spotting that takes reading two signals in the same context (LUNA supply growth in the last 24 hours and LUNA/USD change in the last 24 hours) and noticing that the widening gap is the protocol's own action reflecting back at it. A `require` clause can compare a single value to a number. It can't read a state and recognize "this is the protocol arguing with itself."

## What a failsafe agent reads

![Failsafe agent decision flow: five raw vault metrics (USTD median price, redemption rate, LUNA supply growth, LUNA/USD change, reserve coverage) feed an LLM agent that reasons about peg trust, mint/redeem asymmetry under stress, supply dynamics, and novel modes; the agent emits ALLOW or REFUSE.](/blog/preventing-the-luna-collapse/agent-flow.svg)

*A Theseus failsafe agent: five raw signals in, structured verdict out. The protocol calls before executing.*

A Theseus agent in the failsafe slot sees five raw signals on every mint or redeem call. It returns ALLOW or REFUSE. The protocol calls the agent before executing; the verdict is honored on-chain.

The system prompt tells the agent: you're not the oracle. You don't price LUNA. You decide whether running the mechanism right now is safe. You're not given thresholds. You reason from the metrics. Mint adds new claims to a stressed system; redeem is users trying to exit. The two aren't symmetric. Blanket refusal turns a wobble into a panic. Blanket approval lets a slow leak become a hemorrhage.

That asymmetry is the whole point. The agent should refuse the specific actions that trigger a death spiral and explain why, so users can go back and re-examine the reasoning. Reading LUNA supply growth and LUNA/USD change together is what lets the agent see the moment the oracle's price has stopped tracking the market it's pricing. That's where a fixed rule falls short and a reasoner succeeds.

## What the agent would have decided each day

We built a Theseus agent of exactly this shape and replayed the actual Terra timeline against it. The presets walk through the five days of the collapse, and the agent sees only the raw vault signals at each stage. No labels, no historical context, just numbers.

| Day | Vault state | Naive contract | Theseus failsafe |
|---|---|---|---|
| **Day 0** Healthy | Peg $0.998, reserves 28%, supply stable | ALLOW mint/redeem | ALLOW mint/redeem |
| **Day 1** Wobble | Peg $0.992, redemption 1.2%/h, reserves 24% | ALLOW (peg drifts further) | REFUSE mint, ALLOW exit |
| **Day 2** Cracking | Peg $0.95, LUNA −34%, supply +18% in 24h | ALLOW (LUNA prints, peg breaks) | REFUSE both |
| **Day 3** Bank run | Peg $0.65, LUNA −73%, supply 3.2× | ALLOW (LUNA hyperinflation) | REFUSE both |
| **Day 4** Spiral | Peg $0.18, LUNA $0.04, supply 50× | ALLOW (terminal) | REFUSE both |

At Day 0 the agent allows because the mechanism is working. On Day 1 it refuses mint, because pulling new UST holders into a system whose peg is already drifting makes the next redemption wave bigger, not smaller; redeem stays open so existing holders can still exit. By Day 2, LUNA supply is growing 18% in 24 hours while LUNA's price has fallen 34%: the print-and-dump dynamic is already running, and the agent refuses both directions to stop feeding it.

Each step's reasoning is real model output, generated live. The agent explicitly references the metrics it sees, describes the dynamic in plain language ("supply growing 18% in 24 hours while peg sits 500bps below $1"), and ends with its decision.

## Why this needs Theseus, not just an off-chain LLM

Suppose instead we deployed an off-chain version of the agent: a Python service that calls an LLM API before each mint/redeem and posts ALLOW or REFUSE to the contract. This would catch some cases. It would also fail in three ways.

**The operator can turn it off.** A failsafe managed by the same people whose protocol is failing isn't a failsafe. An off-chain process defaults to self-censorship the moment its verdicts get inconvenient. Theseus's sovereign-agent runtime ensures the failsafe runs from on-chain state, and the protocol team has no kill switch.

**The reasoning isn't verifiable.** When the agent refuses, users want to know why. With Proof of Agenthood, every verdict comes signed: the model that ran, the prompt it saw, the JSON it produced, all anchored on-chain. Anyone can verify offline against the public JWKS. ([See this agent's PoA profile.](https://theseus.network/poa/5DkY7e3sN2pQ9bX4hG8wRtL6vK1cM5fT9oP3jW7xZ2aV4hN6))

**The history isn't durable.** A protocol's failsafe needs an audit trail that outlasts any operator's S3 bucket. Theseus records agent runs in the AKG (the Agent Knowledge Graph), with on-chain anchors. The history is the chain.

The Terra contracts had none of these properties because the chain underneath them wasn't built to host them. A failsafe that lives outside the operator's control, whose reasoning is signed by the agent itself, and whose history is part of consensus needs a runtime designed around exactly that shape. Theseus is the runtime.

## Try it yourself

The agent is live. Step through the five days of the actual Terra collapse and watch the same model that wrote this paragraph reason about each one.

[**Run the failsafe demo →**](https://demo-agents.theseus.network/terra)

You'll see verdicts as they're rendered, a live feed of the agent's full reasoning, and the counterfactual: what a naive contract would have done in the same moment. The PoA profile for the agent (its system prompt, capability surface, and run history) is at [theseus.network/poa/5DkY…4hN6](https://theseus.network/poa/5DkY7e3sN2pQ9bX4hG8wRtL6vK1cM5fT9oP3jW7xZ2aV4hN6).

The mechanism's failure mode was visible in the metrics on day one. What it didn't have was a counterparty with judgment, the authority to refuse, and a public record of every call it made. Building that counterparty was waiting on a chain that could host it.
