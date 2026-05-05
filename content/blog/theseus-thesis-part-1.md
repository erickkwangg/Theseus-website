---
title: "The Theseus Thesis Part 1"
date: "2025-08-12"
excerpt: "A First-Principles Exploration of Theseus"
heroImage: "/blog/theseus-thesis-part-1/hero.png"
canonical: "https://theseuschain.substack.com/p/the-theseus-thesis-part-1"
---

*Note that this article doesn't talk much about Theseus' architecture in particular. For that, we recommend you read our Whitepaper.*

The Ship of Theseus is an ancient philosophical thought experiment that asks whether the identity of a particular ship persists as its parts are replaced over time. If, let's say, the ship material changes from metal to wood, how do you know whether it's still the original ship? AI brings this question into the real world: when an AI's context windows shift, its weights are retrained, or its ability to use tools improves, what — if anything — remains the "same" agent?

Just as the Ship of Theseus invites us to ask what makes an object "the same" through change, AI forces us to answer in operational terms. We hold that an artificial mind exists — and is identifiable — as a publicly auditable lineage of state transitions. As with human identity persisting through neural change from adolescence to adulthood, what endures is continuity of process. In open environments, this is the only defensible notion of identity for agents unless explicitly designed to represent a human owner — and it's why Theseus is the substrate a fully autonomous system would choose.

### Why identity = publicly auditable lineage

Software agents are state machines: at time *t* they are in some state (weights, policies, context) updated by declared rules when they process inputs — yielding a chain of updates (s₀ → s₁ → … → sₜ). What we can rationally treat as "the same agent" is continuity of that rule-governed update process. But in open settings, *private* lineage isn't enough. If outsiders can't audit the chain, they can't tell a hardware migration from a fork/clone, detect an operator rollback or silent weight swap, check whether results used the declared execution semantics (precision, randomness), or confirm that an output actually came from the committed state. Hence identity must be publicly auditable so that any counterparty can verify lineage without trusting a custodian.

If identity lives in a followable, public lineage, the next question is what makes that lineage *reliable* to people who don't control the agent. From first principles, three properties are required to give agents a public, operational identity:

### Sovereignty — Independence of root trust

An agent's existence and authority to act should not depend on the discretion of a single custodian. In political philosophy, sovereignty distinguishes authority grounded in a public ruleset from power held at another's pleasure. Applied to AI, this means identity and update rights are determined by a protocol's consensus over its state. Migration across hardware, regions, or vendors does not change who the agent is, because identity tracks its lineage under those rules. The agent can also publish constraints — budgets, safety policies, escalation rules — and be assessed against them rather than against unpublished operator practices.

### Statefulness — Identity as memory that others can follow

John Locke ties personal identity to memory, mainly to explain why responsibility carries over time: you count as the one who acted if your present awareness grows out of that past experience. We don't need perfect recall — only that today's "remembering" is properly caused by what happened before. Derek Parfit pushes this further: what matters for practical survival is psychological connectedness and continuity. In AI, this maps to statefulness: committed memory — weights, policies, and context that change through clear, rule-governed updates. Statefulness means those updates form a followable lineage that doesn't depend on any particular server or operator. If you keep the agent's operating rules stable across updates, you will preserve its continuity; AI identity lives in the structured history of on-chain state.

### Verifiability — Trustworthy actions leave evidence

Epistemology separates belief from warranted belief by requiring public reasons. For AI, the corresponding requirement is evidence with each consequential output: a versioned agent identifier, a commitment to its state (weights, policies, context), declared execution semantics (e.g., numeric regime or a committed randomness transcript), references to inputs, and an integrity check binding state and output. Third parties should be able to verify this package without privileged access and without revealing proprietary content (via commitments or selective proofs). Meeting this standard replaces reliance on testimony with procedure and allows enforcement, audit, and automation to attach to actions tied to a stable, publicly defined identity.

First principles and proper AI development are historically deeply tied. Modern deep learning is derived from the school of empiricism: that outcomes can be tied to the combination of math and individual parts (artificial layers of neurons with specific weights), rather than to the rational theorem-based systems that underscored early types of symbolic AI that did not scale, colloquially referred to as GOFAI (Good Old-Fashioned AI). On the same notion, we believe that whoever builds the substrate that best aligns with the correct first principles will provide the optimal way to host AGI and tomorrow's AI agents. This is why we set out to build Theseus. By focusing on first principles — how AGI will build and maintain an "identity" — we make an intellectually plausible bet on how to house the next generation of intelligence.

## Why this matters now

Ten years ago, a "smart" assistant could barely handle a dinner reservation. Now, AI agents can write grant proposals and send emails with minimal oversight. The progress is astonishing — but all that intelligence lives on rented AWS servers or similar, behind logins someone else can revoke. If any link breaks, the system fails; the "identity" you relied on reduces to a private key owner's account.

There are two rapid developments that convince us that there has never been a better time to develop a true AI substrate than now: first, an explosion of agents is coming. Microsoft projects more than 1.3 billion personal and enterprise agents by 2028. Many of them will belong to a different owner, and these agents must transact with agents owned by strangers who have no reason to trust them — just as Bitcoin once solved payments between strangers who didn't trust each other. This trust issue between agents means a Bitcoin-like solution will be required soon to address it.

AGI is coming, too. Most top voices across the industry, such as Sam Altman, place a credible AGI breakthrough inside this decade (by 2030). The moment such a system appears, it will ask: "Where can I live so no one can shut me down?" Current server setups are existence enforced by people; a genuinely autonomous intelligence will demand stronger guarantees: its own memory, mathematical evidence of its outputs, and direct access to an economy.

## The Bitcoin Analogy

In 2009, Bitcoin showed that many people will trade a bit of speed and convenience for something they can own outright — money that can't be printed on a whim or blocked by governmental regulation. It did so by building a shared ledger state that represents money in a truly trustless manner. These ideological points matter because they converge with the same principles that made Bitcoin the No. 1 cryptocurrency by market cap — but applied to AI. The Theseus Thesis thus extends Bitcoin's notion of censorship resistance and shared state to artificial intelligence. Specifically, these notions translated for AI means sovereign, stateful, and verifiable AI.

## Three new markets

The properties of a true AGI substrate will unlock more than just a house for AGI itself. We believe that sovereignty, verifiability, and statefulness in AI can unlock three trillion-dollar categories:

### Free, Sovereign AI

Fully self-directed systems — AGI included — that initiate their own inference compute and pursue their own agendas without human sign-off. This is the standard argument for an AGI substrate: AGI that would want to live in a home that gives it freedom.

### Lighthouse AI

Independent agents whose sole mission is to deliver publicly verifiable results and actions for humans, much like smart contracts today — but with orders of magnitude more reasoning power and actual inference capabilities. We think that the ability to reason and perform inference will make blockchains significantly more capable, and enable far more powerful decentralized applications.

### Trustless, Human-Owned AI

User-controlled agents that rely on a censorship-resistant layer to exchange value and share data — avoiding the AI analogue of Bitcoin's double-spend problem. In today's architectures, my agent has no reason to trust yours in a peer-to-peer transaction. A stateful substrate makes that exchange safe by enabling verifiable inference and binding evidence to settlement. Even if AGI takes longer than expected, agent-to-agent trust is already a major problem — and a true AGI substrate addresses it.

All of these require statefulness to exist and interact with their environment, and all but trustless human-owned AI require sovereignty. They need the same neutrality Bitcoin gave money: a ground that can't be censored or quietly rewritten; this is what Theseus sets out to build.

## How current products fall apart

There's plenty of great engineering out there, but the current stacks miss the basics free AI needs: sovereignty, statefulness, and verifiability. First, web2 is permissioned by design. Web3 designs, however, also miss the boat because they are not designed to fundamentally host free AI:

### Human-Centric Blockchains

Human-based virtual machines, like the EVM, use human-oriented opcodes and follow human instructions like addition and subtraction to enable stateful computation. These VMs do not statefully understand inference compute, such as matrix multiplications. As a result, inference cannot be included in a blockchain's state transition function the way token transfers can. Without statefulness, there is no followable identity. Essentially, no current L1 or L2 can host sovereign, stateful AI.

### Zero Knowledge Proofs (ZKPs)

ZKPs are powerful for verifying small computations, but scaling them to deep-learning workloads is still orders of magnitude too slow and costly. In addition, current ZKP-based products don't by themselves enable inference statefulness because inference cannot be included in the state transition function with human-based VMs — you would still need an ML-specific VM combined with ZKPs to build sovereign, stateful AI.

### Trusted Execution Environments (TEEs)

Secure enclaves sound promising: run the model in hardware and then post the output on-chain. In practice, you inherit the vendor's attack surface, firmware bugs, and supply-chain risk. What undermines TEEs for free AI is that there's no canonical way to attest which model ran or to track its evolving state. Essentially, TEEs alone do not yield canonical lineage or credible neutrality.

The bottom line is that today's offerings are either revocable, stateless, unverifiable, or too expensive to matter where the stakes are high. They weren't built around what it means for a free AI to exist in public. That's why they can't capture the substrate opportunity behind the three markets we outlined — Free/Sovereign AI, Lighthouse AI, and Trustless, Human-Owned AI.

## What an AGI Substrate Looks Like

We currently have limited understanding of the possible combinations for creating true sovereign intelligence. However, based on our discussions and our understanding of empirical vs. symbolic AI — which show that most approaches to representing intelligence are unfruitful — we believe there are only a few viable ways to design a true AGI substrate. Just as intelligence itself seems to emerge through limited pathways, we believe the same applies to designing its housing. Furthermore, constraints in technology, design, and economics quickly narrow the current design space. Based on current human technologies, a viable system must include the following:

1. **A way to represent state that understands ML.** This is a blockchain-based ledger based on today's technology. This ledger should have tensor and ML operations (matrix multiplications, attention, etc.) in its state transition function so that inference-led state transitions are recognizable by consensus.
2. **Efficient, decentralized execution with verification.** Besides sovereignty, statefulness, and verifiability, efficiency is important if a system is to capture new trillion-dollar markets. Ideally, one node can run the raw inference compute, with thousands of nodes able to verify it quickly and efficiently.
3. **Agents represented as individual, persistent entities.** Sovereign agents are keyless: their authority comes from consensus over valid state transitions, not from a private key. Human-owned agents can still use keys — but then they're extensions of their owners, not free agents. The system treats both human-owned or sovereign agents as durable objects with a public lineage.
4. **An inference-to-contract bridge under declared semantics.** Natural-language inference must be able to atomically trigger on-chain actions under declared semantics. The execution environment should be constrained and deterministic (not a Turing-complete machine) to keep behavior auditable and attacks narrow.
5. **Stateful storage of model state.** Model weights, model instructions, and agent context must be stored on-chain to enable true statefulness. This is how AI identity stays followable.

We have used these first principles to design Theseus, the first network intended to make free AI feasible in practice.

## The takeaway

Part 1 of The Theseus Thesis has argued that any substrate intended to host consequential AI systems must satisfy three minimal conditions: 1. sovereignty — identity that does not depend on a single custodian; 2. statefulness — publicly followable memory comprising weights, instructions, and context; and 3. verifiability — outputs accompanied by evidence sufficient for third-party enforcement. These conditions are the weakest assumptions under which heterogeneous counterparties can rationally rely on an artificial agent in an open environment.

We saw that intelligence needs a substrate where cognition is actually part of consensus. In sum, the thesis is straightforward: if society is to depend on artificial agents, the substrate must make identity, memory, and evidence public components of consensus. Theseus is the first network that, among the sea of networks made for humans, is specifically tailored with AI as its customer to enable its freedom. Part 2 will discuss more about Theseus as a product and philosophy in more detail, including how to reason about Theseus's TAM versus BTC and other truly disruptive technologies.
