---
title: "How Theseus would've prevented the Luna collapse"
date: "2026-05-08"
excerpt: "The mechanism that broke in May 2022 was visibly breaking in real time. A verifiable, sovereign LLM failsafe agent could have refused the actions that fueled the death spiral. A working prototype is live."
author: "Theseus Labs"
---

In May 2022, a $40 billion algorithmic stablecoin collapsed in eight days. UST, the Terra protocol's dollar-pegged token, depegged on May 8, fell through $0.75 on May 10, and reached $0.18 by May 13. LUNA, the protocol's volatile sister token, went from $80 to fractions of a cent in the same window.

The collapse didn't happen because of a smart-contract bug. The contracts ran exactly as designed. They ran the system off the cliff *because* they ran exactly as designed, and the design assumed something that stopped being true.

## The mechanism

Terra's mint-and-redeem worked like this: a user could always burn $1 of LUNA to mint 1 UST, or burn 1 UST to mint $1 of LUNA, at the LUNA/USD oracle price. The protocol enforced this symmetry unconditionally. There was no external collateral guarantee. Stability depended entirely on the market's willingness to hold both tokens at the protocol-implied prices.

As long as LUNA was deep, liquid, and trusted, the mechanism worked. Arbitrage closed any peg deviation: if UST traded at $0.99, you could buy it cheap, redeem it for $1 of LUNA, and pocket a cent. The peg held because the redemption was real money.

The mechanism's core assumption was that LUNA could absorb arbitrary mint/burn at oracle price. That assumption broke down in specific conditions, and the contract had no way to recognize when those conditions arrived.

## The death spiral, in four arrows

![Terra death spiral feedback loop: UST slips below $1 → holders redeem UST for newly-minted LUNA → LUNA price falls → coverage shrinks per remaining UST → peg slips further. Four red arrows in a clockwise loop.](/blog/preventing-the-luna-collapse/death-spiral.svg)

*The four-step feedback loop. Each arrow is the mechanism doing exactly what it was designed to do.*

When confidence in the peg cracked, redemption pressure rose sharply. UST holders started burning UST and receiving newly-minted LUNA. The LUNA supply ballooned. With supply growing faster than demand, LUNA's price fell. As LUNA fell, the value backing each remaining UST shrank, which made the peg shakier and drove more redemptions. Each loop dilutes LUNA further and weakens the next loop's defense.

The numbers from the actual collapse: LUNA's circulating supply went from roughly 343 million on May 7 to over 6.5 trillion by May 13. A 19,000× expansion in six days. The mechanism worked. Every redemption was honored at oracle price. The contract had no opinion about whether honoring those redemptions was destroying the system.

## Why no smart contract could have stopped it

Determinism is a feature until it's the bug. A smart contract that gates mint/redeem can check whether the inputs satisfy a rule (does the user have UST to burn, is the oracle reporting a price), but it can't reason about whether the rule itself still makes sense. There's no `require` clause that distinguishes an orderly arbitrage from a self-reinforcing collapse.

You could code static thresholds: refuse mint if the peg deviates more than 2%, refuse redeem if LUNA supply grew more than 10% in 24 hours. Static thresholds fire too early in some scenarios (turning a wobble into a panic by blocking exits) and too late in others (when the cascade is already running). Once thresholds are public, attackers design around them.

What's missing is *judgment*: a process that reads the full vault state, weighs the trade-offs (mint and redeem behave very differently under stress), and decides whether the next action moves the system toward equilibrium or away from it. Solidity can't do that. An LLM agent reading on-chain inputs can.

## What a failsafe agent reads

![Failsafe agent decision flow: five raw vault metrics (USTD median price, redemption rate, LUNA supply growth, LUNA/USD change, reserve coverage) feed an LLM agent that reasons about peg trust, mint/redeem asymmetry under stress, supply dynamics, and novel modes; the agent emits ALLOW or REFUSE.](/blog/preventing-the-luna-collapse/agent-flow.svg)

*A Theseus failsafe agent: five raw signals in, structured verdict out. The protocol calls before executing.*

A Theseus agent in the failsafe slot sees five raw signals on every mint or redeem call. It returns ALLOW or REFUSE. The protocol calls the agent before executing; the verdict is honored on-chain.

The system prompt tells the agent: you're not the oracle. You don't price LUNA. You decide whether *running the mechanism right now* is safe. You're not given thresholds. You reason from the metrics. Mint adds new claims to a stressed system; redeem is users trying to exit. The two aren't symmetric. Blanket refusal turns a wobble into a panic. Blanket approval lets a slow leak become a hemorrhage.

That asymmetry is the whole point. The agent's job is to decline the specific actions that accelerate the cascade and to show the reasoning behind each refusal so users can review it later.

## What the agent would have decided each day

We built a Theseus agent of exactly this shape and replayed the actual Terra timeline against it. The presets walk through the five days of the collapse, and the agent sees only the raw vault signals at each stage — no labels, no historical context, just numbers.

| Day | Vault state | Naive contract | Theseus failsafe |
|---|---|---|---|
| **Day 0** — Healthy | Peg $0.998, reserves 28%, supply stable | ALLOW mint/redeem | ALLOW mint/redeem |
| **Day 1** — Wobble | Peg $0.992, redemption 1.2%/h, reserves 24% | ALLOW (peg drifts further) | REFUSE mint, ALLOW exit |
| **Day 2** — Cracking | Peg $0.95, LUNA −34%, supply +18% in 24h | ALLOW (LUNA prints, peg breaks) | REFUSE both |
| **Day 3** — Bank run | Peg $0.65, LUNA −73%, supply 3.2× | ALLOW (LUNA hyperinflation) | REFUSE both |
| **Day 4** — Spiral | Peg $0.18, LUNA $0.04, supply 50× | ALLOW (terminal) | REFUSE both |

The agent allows during Healthy because the mechanism is working. It refuses Mint during Wobble because adding new UST claims to a system whose peg is already under stress amplifies what's wrong; redeem stays open so users can still exit. By Cracking, the LUNA supply is already growing 18% in 24 hours, so more redemptions visibly accelerate the cascade. The agent refuses both directions.

Each step's reasoning is real model output, generated live. The agent cites the specific numbers it sees, names the dynamic in plain language ("supply growing 18% in 24 hours while peg sits 500bps below $1"), and ends with its decision.

## Why this needs Theseus, not just an off-chain LLM

Run the agent off-chain instead: a Python service hits an LLM API before each mint/redeem and posts ALLOW or REFUSE to the contract. That would catch some cases. It would also fail in three ways.

**The operator can disable it.** A failsafe controlled by the people whose protocol is failing isn't a failsafe. Self-censorship is the default failure mode for an off-chain process at the moment its verdicts get inconvenient. Theseus's sovereign-agent path means the failsafe runs from on-chain state, with no off-switch the protocol team can flip.

**The reasoning isn't verifiable.** When the agent refuses, users want to know why. With Proof of Agenthood, every verdict comes signed: the model that ran, the prompt it saw, the JSON it produced, all anchored on-chain. Anyone can verify offline against the public JWKS. ([See this agent's PoA profile.](https://theseus.network/poa/5DkY7e3sN2pQ9bX4hG8wRtL6vK1cM5fT9oP3jW7xZ2aV4hN6))

**The history isn't durable.** A protocol's failsafe needs an audit trail that outlasts any operator's S3 bucket. Theseus stores agent runs in the AKG — the Agent Knowledge Graph — with on-chain anchors. The history is the chain.

The Terra contracts had none of these properties because the chain underneath them wasn't built to host them. A failsafe that lives outside the operator's control, whose reasoning is signed by the agent itself, and whose history is part of consensus needs a runtime designed around exactly that shape. Theseus is the runtime.

## Try it yourself

The agent is live. Step through the five days of the actual Terra collapse and watch the same model that wrote this paragraph reason about each one.

[**Run the failsafe demo →**](https://agent-oracle.theseus.network/terra)

You'll see verdicts as they're made, the agent's full reasoning streaming live, and the counterfactual: what a naive contract would have done in the same moment. The PoA profile for the agent (its system prompt, capability surface, and run history) is at [theseus.network/poa/5DkY…4hN6](https://theseus.network/poa/5DkY7e3sN2pQ9bX4hG8wRtL6vK1cM5fT9oP3jW7xZ2aV4hN6).

The mechanism's failure mode was visible in the metrics on day one. What it didn't have was a counterparty with judgment, the authority to refuse, and a public record of every call it made. Building that counterparty was waiting on a chain that could host it.
