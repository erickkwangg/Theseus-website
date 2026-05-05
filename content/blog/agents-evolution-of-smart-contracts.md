---
title: "Agents as an Evolution of Smart Contracts"
date: "2025-11-07"
excerpt: "Why Theseus is what Ethereum was meant to be."
heroImage: "/blog/agents-evolution-of-smart-contracts/hero.png"
canonical: "https://theseuschain.substack.com/p/agents-as-an-evolution-of-smart-contracts"
---

In this post, we talk about how on-chain agents are a natural evolution of the concept of smart contracts, and how the promise of agents on Theseus has conceptual echoes in the transition from Hashcash to Bitcoin, Bitcoin to Ethereum, and classical compute to tensor computation. The sum of smart contracts + agents will create an enormous, new market that will underlie the crypto economy in the years to come.

Bitcoin (2009) first proposed the notion of stateful on-chain executable, non-Turing-complete code. BTC tokens were immutable, enshrined by the blockchain state. It essentially solved money consensus among strangers.

Ethereum (2014) solved program execution consensus among strangers. You, and everyone else, could verify what a full program does and come into agreement on that program. These allowed for small deterministic programs, whose lack of complexity was reflected through design constraints: every programmatic step had to be replicated across every node in the network and then every step had to be enshrined onchain.

## Attempts to extend or replace smart contracts

Over the last decade, many efforts tried to expand or rethink smart contracts. Runtimes like SVM or MoveVM promise cleaner programming than the EVM. Systems such as Polkadot or eWASM let arbitrary languages compile to WebAssembly as EVM alternatives. However, none of these fundamentally change the *design space*: they still let you write deterministic, Turing-complete code, the same core model expressed through different tooling.

![Ethereum smart contracts diagram](/blog/agents-evolution-of-smart-contracts/ethereum-smart-contracts.png)

*The figure above shows Ethereum smart contracts. The smart contract code is fairly simple and is replicated across all the nodes in the Ethereum network. These smart contracts can also use oracles to get information outside of the chain itself.*

## Smart contracts and AI agents

Smart contracts, as many readers know, are "digital contracts stored on a blockchain that are automatically executed when predetermined terms and conditions are met" [1]. You can think of a "smart" contract as a very dumb agent: you feed the contract an input; it applies a narrow set of predefined rules and produces deterministic outputs. Meanwhile, thanks to rapid progress in foundational models like LLMs in the web2 world, AI agents have become far more capable. You can feed almost any input to an agent, whose behavior is shaped by its context window and data access (via a vector database or knowledge graph), and it will return a usually non-deterministic output with far greater complexity than a typical smart contract.

As with traditional smart contracts, you can still implement permissions, controls, and limits. The difference is the interface: one is expressed purely in code, while the other can be authored in natural language today, where prompt engineering will eventually replace coding to create agents.

![Web2 agents diagram](/blog/agents-evolution-of-smart-contracts/web2-agents.png)

*The figure above shows how agents act in the web2 space. If you take the underlying agent code as a black box, it has a lot of similar functionality as Ethereum smart contracts [2]. Agents, by definition, can use tools, which as you can see, have similar functionality with Oracles.*

However, although agents can produce far more sophisticated outputs, **they are not stateful or sovereign** like Ethereum smart contracts. As a result, they lack the replicated execution consensus associated with smart contracts. Ideally, we should realize what Vitalik envisioned with the Turing-complete EVM: build anything, even very complex applications, in a stateful, sovereign way. This is where Theseus comes in. Theseus re-envisions agents as functionally equivalent to smart contracts, but far smarter and more capable.

## Theseus

Theseus fuses a web2-style AI agent with the stateful, sovereign properties of a smart contract. Technologies like tensor commitments [3] make this possible and differentiate Theseus's consensus and state machine from Ethereum's: one node performs the inference and produces a fast, lightweight proof, which other nodes then verify. If inference nodes have GPUs capable of running agents, you get a robust network that captures the best of both worlds rather than the worst.

Now agentic code can run on-chain like a smart contract, and the complex functionality of agents gains statefulness and sovereignty. Building blockchain applications also becomes easier. With the emergence of tools like Cursor and n8n, and with rapid progress toward more capable models over the next five years, there's a strong chance agents will *fully* be deployed using natural language. In this likely scenario, if you had to choose between "smart" agents and dumb contracts, which would you ship? Imagine deploying an agent as easily as writing an email. Most teams will choose the more powerful option, and experimentation and participation in on-chain applications will grow accordingly.

![Theseus agents diagram](/blog/agents-evolution-of-smart-contracts/theseus-agents.png)

*The figure above shows how agents on Theseus are essentially today's agent technology combined with Ethereum's stateful, sovereign properties. The main technical innovation is that, instead of replicating on-chain compute across all machines, one node performs the heavy inference and the others verify it before committing the result on-chain.*

## Why Theseus is a natural extension of Vitalik's vision

The Ethereum whitepaper's core claim was simple: general-purpose, trust-minimized programs with directly stated applications such as DAOs, programmable financial applications, and more. He already foresaw complex applications that can do anything a human can imagine. However, although Ethereum can *theoretically* host these types of **classical compute apps**, technological limitations and choices in consensus (full state replication) make the state bloat and compute requirements completely impossible for decades. Ethereum, or any other existing L1, would have to hard fork completely with a completely different consensus and VM architecture to solve it.

## The evolution: Bitcoin to Ethereum to modern AI to Theseus

![Evolution diagram](/blog/agents-evolution-of-smart-contracts/evolution-timeline.png)

Theseus is a generational step in what blockchains can do. In our view, it's the cleanest application of AI to crypto to date. While the conceptual jump from "Ethereum + modern agents" to Theseus may seem small at first glance, the *combination* — agents as first-class contracts, attached evidence, and execution economics that scale — delivers something genuinely new and practical.

## Why agentic smart contracts are a massive market

If Ethereum's market cap is ~$500B, and unlike Bitcoin, Ethereum's value is closely tied to the value of its apps, then making those apps dramatically more capable should increase the value captured by the base chain. When applications become more powerful and cheaper to operate for decision-heavy logic, more activity can live on-chain. That points to a substantially larger addressable market for the underlying network, potentially by orders of magnitude.

## A note on sum >> parts

Before Bitcoin, there was Hashcash. It implemented a form of proof-of-work, which fundamentally underpinned the architecture behind Bitcoin, yet it holds almost no market value or mindshare compared to Bitcoin. By the same logic, the separate market caps of "Ethereum" and "agents" already exist; unifying them in a single, verifiable substrate with tensor commitments (the proof-of-work equivalent for AI in a sense) would then suggest one of the largest TAMs in crypto, where the whole can be worth more than the sum of the parts. **The way the technologies are combined matters far more than just the technologies that underpin the product.**

## One example: lending

It's almost a meme at this point where every L1 or L2 is trying to get the same apps deployed on each chain, as in they all want something like Aave to be deployed across different chains. Although we think that competing for the same limited pool of apps is a race to the bottom, we nonetheless wanted to give a concrete example on how a lending app would work on Ethereum vs. Theseus.

### On Ethereum today

Off-chain: a backend computes rates and a keeper pushes those parameters on-chain. On-chain: the contract executes based on the oracle data. If a change is needed, or if the contract has a bug or is attacked, the team deploys a new contract or upgrades the existing one.

### On Theseus

The market runs as a lending agent: a first-class on-chain entity. **Its inference process may be deterministic, but its code is nonetheless deterministically verifiable just like any smart contract.** It can read rates from an off-chain oracle just as contracts do. Solvency and limit templates in the agent's context gate what the agent can execute. The pricing step runs via agent inference, and validators then verify a tensor-commit receipt. If a bug is found or a change is required, the agent's context or underlying model is swapped, by the creator or, where allowed, by the agent itself.

## What can be built on Theseus?

It's important to note that, despite the lending example, the design space of Theseus agents isn't just "Aave on Theseus, but better." It can of course allow for that kind of application, but it's more about creating blockchain applications that were never possible until Theseus [4, 5].

For example, consider an agent that adjudicates subjective prediction-market outcomes. Traditional markets are limited to objective questions ("Did Donald Trump win the 2024 election?"), whereas a lighthouse agent could deliver a neutral, evidence-based ruling on a subjective question such as "Was the iPhone Air launch a flop or a success?"

An even larger design space is the notion of AI Persons, in which if you see AI having actual agency and freedom, you can imagine that AI persons living on-chain like fully autonomous smart contracts would constitute a large percentage of the global GDP. You can see our whitepaper and our [Theseus Thesis Part 2](/blog/theseus-thesis-part-2) for more information on how we reason about the TAM of Theseus [3, 5].

## Stated plainly

- **Bitcoin**: public ownership you can verify.
- **Ethereum**: public program behavior you can verify.
- **Theseus**: public **agent decisions** you can verify.

Each step removes a human dependency from something markets care about. Bitcoin removed treasurers from "who owns what." Ethereum removed judges from "what happens next." Theseus removes hosts and operators from "what kind of decision will an intelligent entity make?"

## Conclusion

Ethereum's contracts are Turing-complete and can *in theory* express almost anything, but their design — replicated execution on every node — severely limits practical scalability and, with it, the kinds of programs you can deploy. Theseus takes the next step: it treats agents not just as the natural evolution of contracts, but as **first-class citizens** in their own right.

With Theseus, the *reason* for a decision becomes as verifiable as the decision itself, while operational overhead drops and complex applications become economical to run on-chain. The next generation of on-chain systems — AI Persons, Lighthouse agents, and beyond — are genuinely new primitives. They move past "apps" toward entities with more fundamental, durable rights.

This is the frontier we care about building. It's the kind of work we're comfortable calling our life's work.

## Sources

1. Ethereum Whitepaper.
2. IBM.
3. Theseus Whitepaper.
4. The Theseus Thesis, Part 1.
5. The Theseus Thesis, Part 2.
