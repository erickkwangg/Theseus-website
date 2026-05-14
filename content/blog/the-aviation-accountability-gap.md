---
title: "The aviation accountability gap"
date: "2026-05-14"
excerpt: "In 2016 a Boeing engineering decision quadrupled MCAS's control authority. The FAA wasn't required to review it. The pilots weren't told. 346 people died three years later. Nobody outside Boeing or the FAA had standing to act on what was knowable. Sovereign agents change that."
author: "Theseus Labs"
---

Sometime in 2016, Boeing engineers running 737 MAX flight tests discovered that MCAS, the new automatic pitch-down system, did not have enough control authority to handle the aircraft in certain low-speed wind-up turns. They fixed it by quadrupling its authority, from 0.6° per activation to 2.5°. The decision passed through an internal Boeing review under the FAA's Organization Designation Authorization program, which did not require a fresh hazard assessment. Most line pilots flying the aircraft three years later still didn't know MCAS existed.

Three years later, two 737 MAX aircraft flew themselves into the ground when that same strengthened MCAS responded to faulty single-sensor readings by driving the nose down repeatedly. 346 people died.

The engineering knowledge to identify MCAS as a hazard was inside Boeing. Dissenting engineers were on the record (the 2020 House Transportation Committee report and Boeing's 2021 guilty plea for defrauding the FAA both document the dissent in detail). What didn't exist was any party outside Boeing or the FAA with the standing or the credibility to make that knowledge consequential. The flying public had no counterparty in this story.

Sovereign agents are the technology that changes that.

## The official story is not what happened

In the official version, the FAA approved the aircraft, Boeing built it, two MAXs crashed because of a software flaw, and the FAA mandated software fixes.

What actually happened is uglier. The FAA approved MCAS under the ODA program, where Boeing's own engineers self-certified material portions of the design. The FAA didn't see most of what its delegates saw. When the control authority was raised in late 2016, the change stayed inside Boeing's process. When the chief technical pilot found MCAS "running rampant in the sim" in November of that year, those words went to a Boeing colleague, not to the regulator. The mechanism that was supposed to surface those concerns to a non-Boeing counterparty did not exist, because in practice Boeing was the counterparty.

This is not a story about bad engineering. Boeing's engineers raised the relevant concerns. It is a story about who had the standing and the credibility to act on those concerns outside the manufacturer, and the answer was: nobody.

![Figure 1: The captured certification loop. Boeing engineers flag concerns; management overrules; the FAA delegates certification authority back to Boeing under the ODA program; the aircraft is certified; the public has no counterparty in the chain.](/blog/the-aviation-accountability-gap/captured-loop.svg)

*Every link in the chain that produced MCAS existed before the crashes. None of them was the engineering itself.*

## Why political reform doesn't fix this

Every major commercial aviation accident in the United States since the 1970s has produced FAA reform, and none of those reforms has dislodged the underlying structural feature that produced MCAS: a single dominant US manufacturer whose fees pay the regulator's budget and whose former engineers staff the regulator's review desks. The capture reasserts itself across administrations because the incentives stay the same.

What's missing is a counterparty whose authority doesn't depend on the next reform bill. Something that reads the same documents the regulator reads, signs verdicts in public, and that nobody, manufacturer or regulator, can switch off.

## What the agent actually does

A Theseus agent in the aviation safety slot reads every public certification document, service bulletin, airworthiness directive, and incident report as it lands. It has no authority to certify aircraft. What it produces is a signed verdict on each significant change, with the full reasoning trace anchored on chain. Its model identity and system prompt are sealed at deployment; modifying them requires a public process anyone can verify. No party owns it.

For MCAS in 2016, an agent reading the public certification documents at the time of original type certification would have produced something like this, signed and posted:

> **AGENT VERDICT · 737 MAX type certification · 2016-Q3**
>
> *Concern 1.* MCAS Functional Hazard Assessment classifies the failure mode as Major. Control input derives from a single AOA sensor. Industry redundancy practice for Major-class hazards is dual-channel input with disagree detection. The 737 MAX cert basis requires neither. Flag for review.
>
> *Concern 2.* MCAS is not disclosed in the FCOM or in initial type training. Pilots are not informed the system exists, its activation conditions, or its override procedure. A control authority that activates without pilot awareness is a structural anomaly. Flag for review.
>
> Verdict: **REFUSE.** Reasoning published, verifiable against PoA profile 5JhT…oCb.

Two warning signs, both catchable from public documents at the time, both load-bearing on their own.

The control authority increase from 0.6° to 2.5° is not in this verdict, because that change happened inside Boeing's ODA in late 2016 with limited FAA visibility. An agent reading what was public couldn't catch it in real time. That gap is itself an argument for transparency reform: change logs of FAA-delegated certification decisions ought to be machine-readable and public. An agent whose existence creates a constituency for that data is part of how that reform happens.

## How a verdict with no legal force becomes binding

A signed verdict from an unaccredited LLM has no legal force. The question is whether it has practical force. Three channels do the work, in compounding sequence.

**Insurance and leasing.** Aviation insurance and aircraft leasing are conservative industries that price safety directly. Lloyd's syndicates write hull policies based on independent risk models. The big lessors (AerCap, SMBC, BBAM) reprice fleets when safety data shifts. When the MAX was grounded after Ethiopian 302, MAX hull premiums spiked and MAX lease rates separated from 737NG rates. An agent's verdict becomes binding the same way a Moody's downgrade does: not through legal authority, but through market participants pricing it as risk. This compounds over years. By the time the agent has a credible track record, ignoring its verdicts becomes commercially expensive in ways that show up on Boeing's balance sheet quarter after quarter.

![Figure 2: How the verdict binds. The signed agent verdict feeds three channels: insurers and lessors price it as a risk input, courts cite it in liability discovery, foreign regulators reference it in their own decisions. Each channel reinforces the others. The manufacturer cannot route around all three.](/blog/the-aviation-accountability-gap/binding-channels.svg)

*The three channels through which a verdict with no legal authority becomes commercially and legally consequential.*

**Liability discovery.** US tort discovery routinely asks what the manufacturer could have known. A signed public verdict from 2016 saying *this design is unsafe* becomes exhibit A in plaintiff filings after a 2019 crash. Manufacturers eventually behave as if signed pre-incident warnings are real, because the alternative is catastrophic discovery exposure. This is roughly how third-party financial audits became required after Enron, by liability pressure that made not having them indefensible long before any statute required them.

**Regulatory rivalry.** Foreign regulators don't defer to the FAA. CAAC grounded the MAX in March 2019, three days before the FAA did. EASA has imposed its own MAX conditions that differ from FAA's. These regulators already cite independent academic safety work in their decisions. Adding a credible signed verdict to that mix gives them public cover to take harder positions, and gives the FAA a reason to match rather than be the outlier in international certification consensus.

Any one of these channels can be dodged. A manufacturer can lobby a regulator and argue with academics in court. What it can't do is lobby an uncapturable agent into changing its mind, and once insurers, courts, and foreign regulators are all pricing in the same agent verdicts, the route-arounds stop working.

## The honest caveats

This isn't a claim that an agent would have prevented MCAS in 2016. Two of the four major warning signs were obscured by the existing transparency regime, and the binding channels take years to compound. The agent is not magic, and the buildout is real.

The case is structural. The flying public does not currently have a counterparty in aviation safety. The FAA-Boeing relationship has been captured for decades, every reform cycle has failed to break it, and political mechanisms alone haven't been sufficient. An uncapturable agent reading public documents and signing verifiable verdicts complements political reform, and creates a constituency for the transparency mandates that political reform on its own hasn't been able to deliver.

A version of this agent is already deployed. The aviation safety reviewer reads aircraft certification changes and produces signed verdicts on each, with reasoning published. ([Run it →](https://demo-agents.theseus.network/aviation), or see the agent's PoA profile at [theseus.network/poa/5JhT…oCb](https://theseus.network/poa/5JhT2nQ8eP6mY4dR1bL9wK3vF7cN5aZ8sH2gM6xV1oCb).)

What that buys, today, is modest but durable: an actor that reads the same evidence everyone else reads and signs verdicts everyone else can verify, on behalf of a constituency the existing system has no way to represent. Every cycle it runs, its verdicts accumulate into the kind of public track record markets and courts use.

The room where MCAS's authority was quadrupled in 2016 had no public counterparty in it. The next time a comparable decision gets made inside a comparable room, the agent is the counterparty that's there.
