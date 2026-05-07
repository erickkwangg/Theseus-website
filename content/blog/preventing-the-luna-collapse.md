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

The mechanism's core assumption was that LUNA could absorb arbitrary mint/burn at oracle price. That assumption broke down in specific conditions — and the contract had no way to recognize when those conditions arrived.

## The death spiral, in four arrows

<figure style="margin: 2em 0;">
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="spiral-title" style="max-width: 100%; height: auto; display: block;">
  <title id="spiral-title">Terra death spiral feedback loop</title>
  <defs>
    <marker id="spiral-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#dc2626" />
    </marker>
  </defs>

  <rect x="30" y="30" width="240" height="80" rx="8" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.6"/>
  <text x="150" y="65" text-anchor="middle" fill="currentColor" font-size="14" font-family="ui-sans-serif, system-ui, sans-serif">UST slips below $1</text>
  <text x="150" y="88" text-anchor="middle" fill="currentColor" font-size="11" font-family="ui-sans-serif, system-ui, sans-serif" opacity="0.65">peg deviation widens</text>

  <rect x="330" y="30" width="240" height="80" rx="8" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.6"/>
  <text x="450" y="65" text-anchor="middle" fill="currentColor" font-size="14" font-family="ui-sans-serif, system-ui, sans-serif">Holders redeem UST</text>
  <text x="450" y="88" text-anchor="middle" fill="currentColor" font-size="11" font-family="ui-sans-serif, system-ui, sans-serif" opacity="0.65">new LUNA minted at oracle price</text>

  <rect x="330" y="210" width="240" height="80" rx="8" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.6"/>
  <text x="450" y="245" text-anchor="middle" fill="currentColor" font-size="14" font-family="ui-sans-serif, system-ui, sans-serif">LUNA price falls</text>
  <text x="450" y="268" text-anchor="middle" fill="currentColor" font-size="11" font-family="ui-sans-serif, system-ui, sans-serif" opacity="0.65">supply grows faster than demand</text>

  <rect x="30" y="210" width="240" height="80" rx="8" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.6"/>
  <text x="150" y="245" text-anchor="middle" fill="currentColor" font-size="14" font-family="ui-sans-serif, system-ui, sans-serif">Coverage shrinks</text>
  <text x="150" y="268" text-anchor="middle" fill="currentColor" font-size="11" font-family="ui-sans-serif, system-ui, sans-serif" opacity="0.65">less value backing each remaining UST</text>

  <line x1="270" y1="70" x2="324" y2="70" stroke="#dc2626" stroke-width="2" marker-end="url(#spiral-arrow)"/>
  <line x1="450" y1="110" x2="450" y2="204" stroke="#dc2626" stroke-width="2" marker-end="url(#spiral-arrow)"/>
  <line x1="330" y1="250" x2="276" y2="250" stroke="#dc2626" stroke-width="2" marker-end="url(#spiral-arrow)"/>
  <line x1="150" y1="210" x2="150" y2="116" stroke="#dc2626" stroke-width="2" marker-end="url(#spiral-arrow)"/>

  <text x="300" y="158" text-anchor="middle" fill="currentColor" font-size="11" opacity="0.5" font-style="italic" font-family="ui-sans-serif, system-ui, sans-serif">each loop dilutes LUNA further;</text>
  <text x="300" y="172" text-anchor="middle" fill="currentColor" font-size="11" opacity="0.5" font-style="italic" font-family="ui-sans-serif, system-ui, sans-serif">the mechanism keeps honoring redemptions all the way down</text>
</svg>
<figcaption style="text-align: center; font-size: 0.85em; opacity: 0.7; margin-top: 0.5em;">The four-step feedback loop. Each arrow is the mechanism doing exactly what it was designed to do.</figcaption>
</figure>

When confidence in the peg cracked, redemption pressure rose sharply. UST holders started burning UST and receiving newly-minted LUNA. The LUNA supply ballooned. With supply growing faster than demand, LUNA's price fell. As LUNA fell, the value backing each remaining UST shrank — which made the peg shakier, which drove more redemptions. Each loop dilutes LUNA further and weakens the next loop's defense.

The numbers from the actual collapse: LUNA's circulating supply went from roughly 343 million on May 7 to over 6.5 trillion by May 13. A 19,000× expansion in six days. The mechanism worked. Every redemption was honored at oracle price. The contract had no opinion about whether honoring those redemptions was destroying the system.

## Why no smart contract could have stopped it

Determinism is a feature until it's the bug. A smart contract that gates mint/redeem can check whether the inputs satisfy a rule — does the user have UST to burn, is the oracle reporting a price — but it can't reason about whether the rule itself still makes sense. *"Is this redemption part of an orderly market response, or part of a self-reinforcing collapse?"* isn't a question a Solidity `require` can answer.

You could code static thresholds: refuse mint if the peg deviates more than 2%, refuse redeem if LUNA supply grew more than 10% in 24 hours. Static thresholds either fire too early — turning a wobble into a panic by blocking exits — or too late, when the mechanism has already cascaded. Worse, attackers learn the thresholds and design around them.

What's actually missing is *judgment*: a process that reads the full vault state, weighs the trade-offs (mint and redeem aren't symmetric under stress), and decides whether the next action moves the system toward equilibrium or away from it. That's not a smart contract. That's an agent.

## What a failsafe agent reads

<figure style="margin: 2em 0;">
<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="flow-title" style="max-width: 100%; height: auto; display: block;">
  <title id="flow-title">Failsafe agent decision flow</title>
  <defs>
    <marker id="flow-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" opacity="0.7" />
    </marker>
  </defs>

  <text x="100" y="22" text-anchor="middle" fill="currentColor" font-size="11" opacity="0.5" font-family="ui-sans-serif, system-ui, sans-serif" font-weight="600" letter-spacing="0.1em">RAW VAULT METRICS</text>

  <g font-family="ui-sans-serif, system-ui, sans-serif" font-size="12">
    <rect x="20" y="44" width="200" height="40" rx="6" stroke="currentColor" stroke-width="1.2" fill="none" opacity="0.55"/>
    <text x="120" y="68" text-anchor="middle" fill="currentColor">USTD median price</text>

    <rect x="20" y="96" width="200" height="40" rx="6" stroke="currentColor" stroke-width="1.2" fill="none" opacity="0.55"/>
    <text x="120" y="120" text-anchor="middle" fill="currentColor">Redemption rate (1h)</text>

    <rect x="20" y="148" width="200" height="40" rx="6" stroke="currentColor" stroke-width="1.2" fill="none" opacity="0.55"/>
    <text x="120" y="172" text-anchor="middle" fill="currentColor">LUNA supply growth (24h)</text>

    <rect x="20" y="200" width="200" height="40" rx="6" stroke="currentColor" stroke-width="1.2" fill="none" opacity="0.55"/>
    <text x="120" y="224" text-anchor="middle" fill="currentColor">LUNA/USD change (24h)</text>

    <rect x="20" y="252" width="200" height="40" rx="6" stroke="currentColor" stroke-width="1.2" fill="none" opacity="0.55"/>
    <text x="120" y="276" text-anchor="middle" fill="currentColor">Reserve coverage</text>
  </g>

  <line x1="220" y1="64" x2="298" y2="155" stroke="currentColor" stroke-width="1.2" opacity="0.5" marker-end="url(#flow-arrow)"/>
  <line x1="220" y1="116" x2="298" y2="160" stroke="currentColor" stroke-width="1.2" opacity="0.5" marker-end="url(#flow-arrow)"/>
  <line x1="220" y1="168" x2="298" y2="168" stroke="currentColor" stroke-width="1.2" opacity="0.5" marker-end="url(#flow-arrow)"/>
  <line x1="220" y1="220" x2="298" y2="180" stroke="currentColor" stroke-width="1.2" opacity="0.5" marker-end="url(#flow-arrow)"/>
  <line x1="220" y1="272" x2="298" y2="186" stroke="currentColor" stroke-width="1.2" opacity="0.5" marker-end="url(#flow-arrow)"/>

  <rect x="300" y="100" width="240" height="160" rx="10" stroke="#6366f1" stroke-width="1.8" fill="#6366f1" fill-opacity="0.06"/>
  <text x="420" y="135" text-anchor="middle" fill="currentColor" font-size="13" font-family="ui-sans-serif, system-ui, sans-serif" font-weight="600">LLM agent reasons</text>
  <text x="420" y="158" text-anchor="middle" fill="currentColor" font-size="11" font-family="ui-sans-serif, system-ui, sans-serif" opacity="0.7">peg trust · mint vs redeem</text>
  <text x="420" y="174" text-anchor="middle" fill="currentColor" font-size="11" font-family="ui-sans-serif, system-ui, sans-serif" opacity="0.7">asymmetry under stress ·</text>
  <text x="420" y="190" text-anchor="middle" fill="currentColor" font-size="11" font-family="ui-sans-serif, system-ui, sans-serif" opacity="0.7">supply dynamics · novel modes</text>
  <text x="420" y="222" text-anchor="middle" fill="currentColor" font-size="10" opacity="0.5" font-style="italic" font-family="ui-sans-serif, system-ui, sans-serif">reasoning signed under PoA;</text>
  <text x="420" y="236" text-anchor="middle" fill="currentColor" font-size="10" opacity="0.5" font-style="italic" font-family="ui-sans-serif, system-ui, sans-serif">anyone can verify it later</text>

  <line x1="540" y1="160" x2="600" y2="120" stroke="currentColor" stroke-width="1.4" opacity="0.55" marker-end="url(#flow-arrow)"/>
  <line x1="540" y1="200" x2="600" y2="240" stroke="currentColor" stroke-width="1.4" opacity="0.55" marker-end="url(#flow-arrow)"/>

  <rect x="600" y="92" width="100" height="50" rx="6" stroke="#10b981" stroke-width="1.5" fill="#10b981" fill-opacity="0.08"/>
  <text x="650" y="116" text-anchor="middle" fill="#059669" font-size="13" font-family="ui-sans-serif, system-ui, sans-serif" font-weight="600">ALLOW</text>
  <text x="650" y="132" text-anchor="middle" fill="currentColor" font-size="10" opacity="0.65" font-family="ui-sans-serif, system-ui, sans-serif">action proceeds</text>

  <rect x="600" y="218" width="100" height="50" rx="6" stroke="#dc2626" stroke-width="1.5" fill="#dc2626" fill-opacity="0.08"/>
  <text x="650" y="242" text-anchor="middle" fill="#dc2626" font-size="13" font-family="ui-sans-serif, system-ui, sans-serif" font-weight="600">REFUSE</text>
  <text x="650" y="258" text-anchor="middle" fill="currentColor" font-size="10" opacity="0.65" font-family="ui-sans-serif, system-ui, sans-serif">tx reverts</text>

  <text x="100" y="328" text-anchor="middle" fill="currentColor" font-size="10" opacity="0.5" font-style="italic" font-family="ui-sans-serif, system-ui, sans-serif">no thresholds, no labels —</text>
  <text x="100" y="344" text-anchor="middle" fill="currentColor" font-size="10" opacity="0.5" font-style="italic" font-family="ui-sans-serif, system-ui, sans-serif">just the raw numbers</text>
</svg>
<figcaption style="text-align: center; font-size: 0.85em; opacity: 0.7; margin-top: 0.5em;">A Theseus failsafe agent: five raw signals in, structured verdict out. The protocol calls before executing.</figcaption>
</figure>

A Theseus agent in the failsafe slot sees five raw signals on every mint or redeem call. It returns ALLOW or REFUSE. The protocol calls the agent before executing; the verdict is honored on-chain.

The system prompt tells the agent: you're not the oracle. You don't price LUNA. You decide whether *running the mechanism right now* is safe. You're not given thresholds. You reason from the metrics. Mint adds new claims to a stressed system; redeem is users trying to exit. The two aren't symmetric. Blanket refusal turns a wobble into a panic. Blanket approval lets a slow leak become a hemorrhage.

That last instruction matters. The agent isn't a kill switch. It's a counterparty whose decision quality you can verify after the fact.

## What the agent would have decided each day

We built a Theseus agent of exactly this shape and replayed the actual Terra timeline against it. The presets walk through the five days of the collapse, and the agent sees only the raw vault signals at each stage — no labels, no historical context, just numbers.

| Day | Vault state | Naive contract | Theseus failsafe |
|---|---|---|---|
| **Day 0** — Healthy | Peg $0.998, reserves 28%, supply stable | ALLOW mint/redeem | ALLOW mint/redeem |
| **Day 1** — Wobble | Peg $0.992, redemption 1.2%/h, reserves 24% | ALLOW (peg drifts further) | REFUSE mint, ALLOW exit |
| **Day 2** — Cracking | Peg $0.95, LUNA −34%, supply +18% in 24h | ALLOW (LUNA prints, peg breaks) | REFUSE both |
| **Day 3** — Bank run | Peg $0.65, LUNA −73%, supply 3.2× | ALLOW (LUNA hyperinflation) | REFUSE both |
| **Day 4** — Spiral | Peg $0.18, LUNA $0.04, supply 50× | ALLOW (terminal) | REFUSE both |

The agent allows during Healthy because the mechanism is working. It refuses Mint during Wobble because adding new UST claims to a system whose peg is already under stress amplifies what's wrong, while still letting users exit. By Cracking, the LUNA supply is already growing 18% in 24 hours — more redemptions visibly accelerate the cascade — so the agent refuses both directions.

The reasoning the agent produces at each step isn't templated. It's a paragraph from a frontier LLM citing the specific numbers it sees, naming the dynamic ("supply growing 18% in 24 hours while peg sits 500bps below $1"), and ending with its decision.

## Why this needs Theseus, not just an off-chain LLM

You could imagine running this agent off-chain: a Python service hitting an LLM API before each mint/redeem, posting an ALLOW or REFUSE to the contract. That would catch some cases. It also fails in three ways.

**The operator can disable it.** A failsafe controlled by the people whose protocol is failing isn't a failsafe. Self-censorship is the default failure mode for an off-chain process at the moment its verdicts get inconvenient. Theseus's sovereign-agent path means the failsafe runs from on-chain state, with no off-switch the protocol team can flip.

**The reasoning isn't verifiable.** When the agent refuses, users want to know why. With Proof of Agenthood, every verdict comes signed: the model that ran, the prompt it saw, the JSON it produced, all anchored on-chain. Anyone can verify offline against the public JWKS. ([See this agent's PoA profile.](https://theseus.network/poa/5DkY7e3sN2pQ9bX4hG8wRtL6vK1cM5fT9oP3jW7xZ2aV4hN6))

**The history isn't durable.** A protocol's failsafe needs an audit trail that outlasts any operator's S3 bucket. Theseus stores agent runs in the AKG — the Agent Knowledge Graph — with on-chain anchors. The history is the chain.

The Terra contracts had none of these properties because the chain they ran on wasn't designed for them. A failsafe that lives outside the operator's control, whose reasoning is signed by the agent itself, and whose history is part of consensus — that's a Theseus shape, not a Solidity shape.

## Try it yourself

The agent is live. Step through the five days of the actual Terra collapse and watch the same model that wrote this paragraph reason about each one.

[**Run the failsafe demo →**](https://agent-oracle.theseus.network/terra)

You'll see verdicts as they're made, the agent's full reasoning streaming live, and the counterfactual: what a naive contract would have done in the same moment. The PoA profile for the agent — its system prompt, its capability surface, its run history — is at [theseus.network/poa/5DkY…4hN6](https://theseus.network/poa/5DkY7e3sN2pQ9bX4hG8wRtL6vK1cM5fT9oP3jW7xZ2aV4hN6).

The collapse didn't have to happen. The mechanism's failure mode was visible in the metrics on day one. What was missing was something with judgment, the authority to refuse, and a record anyone could verify.

That's the agent shape Theseus exists to host.
