---
title: "The flying public's missing counterparty"
date: "2026-05-15"
excerpt: "MCAS wasn't an engineering failure. The warning signs were public, internal engineers raised them, and the captured certification process suppressed them. The flying public has no counterparty in that process. A sovereign LLM agent is the first technology that can give them one."
author: "Theseus Labs"
---

Sometime in the second half of 2018, Boeing increased a single parameter inside the Maneuvering Characteristics Augmentation System on the 737 MAX, from 0.6° to 2.5° per activation. MCAS uses that authority to push the nose of the aircraft down when its angle-of-attack sensor reports the nose is climbing too steeply. The original 0.6° figure had come out of the type certification process. The 2.5° figure came out of flight testing, where the smaller number had proved insufficient to counter the way the MAX's larger and forward-mounted engines pitched the nose up near stall. The increase made the test result acceptable.

Several other things about the system had also drifted from how it was originally described to regulators. MCAS still depended on a single angle-of-attack vane, with no cockpit indication when that vane disagreed with the redundant unit on the opposite side of the nose. The pilot operating manual for the MAX did not mention the system, and pilots transitioning from the 737 NG took a short difference course that didn't introduce it.

Engineers inside Boeing had raised concerns about each of these decisions during development and been overruled. The FAA's certification review had delegated most of the relevant safety analysis back to Boeing under the Organization Designation Authorization program, with the result that the engineers writing the system were also the ones authoring its safety case. Lion Air Flight 610 went down in October 2018, and Ethiopian Airlines Flight 302 followed in March 2019. Both crashes were attributed primarily to MCAS in the resulting investigations, and the combined death toll was 346.

In retrospect, none of the underlying problems were particularly subtle. The engineering teams had identified them during development; the institutions above the engineering weren't structured to act on those findings when acting on them would have inconvenienced the manufacturer.

## How the loop closes

Aviation safety in the United States runs through a closed loop of three institutions. Manufacturers lobby Congress on certification policy, while Congress appoints the regulator's leadership and controls the FAA's budget. The FAA, lacking the technical depth to evaluate a modern flight control system on its own, delegates most of the actual engineering review back to the manufacturer's own staff through the Organization Designation Authorization program. There aren't a few hundred outside engineers anywhere on earth who understand a specific aircraft's control laws better than the people who designed them, which is why this arrangement isn't easily fixed by trying harder. The incentives of each institution point inward, toward the other two, and the loop is self-stabilizing.

![Captured triangle: Manufacturer, Regulator, and Legislature in a closed loop, with the flying public outside the loop and unable to act on their own behalf.](/blog/the-flying-publics-counterparty/captured-triangle.svg)

Every party inside this loop represents some constituency. Boeing answers to shareholders; the FAA implements executive branch priorities; members of Congress answer to districts; ALPA represents pilots; the IATA represents airlines. The party most directly affected by any specific certification decision, the flying public, has no institutional counterpart whose explicit job is to act on their behalf at the moment a control authority parameter gets raised.

## What a sovereign agent does that an internal review can't

The idea behind a sovereign LLM agent is that the reading, reasoning, and verdict that an internal engineering review would normally produce can instead be carried out by a model whose prompt, model identity, inputs, and JSON output are all published and signed on a chain that nobody involved in the certification can quietly modify.

The agent's job description (what evidence it reads, what questions it asks of that evidence, what verdict format it produces) is on-chain at deployment, which means anyone who wants to challenge a verdict starts from the same description the agent itself was given rather than from whatever the manufacturer or regulator later characterizes the agent as having been doing. Every verdict carries a Proof of Agenthood credential naming the specific model that ran, the exact inputs it saw, and the JSON it produced; an auditor can verify offline against the public JWKS that the verdict on display is the one the agent actually emitted, not a paraphrase or a summary. The chain itself has no manufacturers or regulators in its validator set, so pausing or editing the agent's behavior is not a phone call to someone's office. It is an attempt to corrupt a public consensus, observable in real time by everyone who would have an interest in noticing.

Certification review under ODA happens behind closed doors, with the manufacturer's engineers signing off on the manufacturer's design. The same review carried out by a sovereign agent sits in public, with the reasoning available to anyone who wants to challenge it.

## What the agent reads and decides

The aviation safety reviewer pulls from the same evidence base the FAA's own engineers work from: the Type Certificate Data Sheet, Airworthiness Directives and Service Bulletins issued since the type was certified, NTSB incident reports, service difficulty reports, the publicly accessible portions of the certification basis, required engineering submissions from the manufacturer, and prior FMEA documentation for related systems. None of it is privileged, and none of it depends on the manufacturer cooperating to be read.

![Agent decision flow: TCDS, AD/SB list, NTSB reports, FMEA summaries, prior incidents feed an LLM agent that reasons about single points of failure, training omissions, control authority creep, sensor architecture, and scope of change; the agent emits ALLOW or REFUSE with signed Proof of Agenthood.](/blog/the-flying-publics-counterparty/agent-flow.svg)

For each certification change or amendment, the agent works through a fixed set of questions. Does the change introduce a single point of failure on a flight-critical system? Does the change rely on pilot recognition and recovery as the safety net, and is that assumption supported by simulator and training data? Does the change move authority parameters significantly beyond the originally certified envelope? Is the change documented in pilot training materials at a level proportional to its effect? Is there an annunciation that allows the pilot to identify the system acting? The verdict is one of two values, ALLOW or REFUSE, and the substantive content is the reasoning that accompanies it, which cites the relevant certification clauses and identifies the specific contradiction in the change. Most of what an insurance underwriter or foreign regulator would later consume from the agent is that reasoning, not the verdict itself.

## MCAS, replayed against the agent

The agent doesn't need to be smarter than Boeing's engineers. It needs to be more accountable than Boeing's process. Below is the actual MCAS timeline, with the verdict an aviation safety reviewer agent would have signed at each stage, against the public evidence available at that moment.

| Stage | Public evidence | Agent verdict |
|---|---|---|
| **Original MCAS cert** (Mar 2017) | Single AOA sensor input; 0.6° authority per activation; omitted from pilot training; no AOA disagree alert standard | REFUSE: single point of failure on flight-critical authority with no annunciation and no training |
| **Authority increase** (Aug 2018) | Authority raised to 2.5° per activation; repeated activation permitted; training docs unchanged | REFUSE: prior basis now magnified four-fold; pilot recovery assumption unsupported at new authority |
| **Lion Air JT610** (Oct 2018) | FDR shows MCAS-driven runaway stab trim; crew unable to identify or counter; AOA sensor mismatch active | REFUSE: operational evidence confirms simulator and training gap |
| **FAA emergency AD** (Nov 2018) | AD adds MCAS to pilot reference materials; no simulator training; no annunciation hardware change required | REFUSE: AD addresses awareness but not the structural failure |
| **Ethiopian ET302** (Mar 2019) | Same scenario as Lion Air; second hull loss in five months | (verdict already REFUSE; system finally grounded by global regulators) |

That's eighteen months of REFUSE verdicts before Ethiopian Air 302. Each verdict cites public evidence, each is anchored on-chain, and any insurer, lessor, airline, or foreign regulator could have queried them at any moment during that span. The verdicts above don't depend on hindsight; the single-AOA architecture, the authority increase, and the training omission were all in public documents at the time, and the internal Boeing engineers raising those concerns were doing so contemporaneously. The substantive disagreement was already in the record. What was absent, at the moment when refusal could have prevented a hull loss, was an institution whose explicit role was to formalize that disagreement on behalf of the passengers.

## How an unaccredited verdict becomes binding

The agent has no legal authority, and a REFUSE doesn't stop a certification on its own. The way it becomes load-bearing is through three downstream channels that don't depend on the FAA accepting it.

Aviation underwriters already do independent risk assessment with direct financial exposure to crashes. A REFUSE verdict from a credible sovereign agent feeds into hull and liability pricing in the obvious way: an aircraft type carrying active REFUSE verdicts pays more in premiums, and the manufacturer either addresses the agent's reasoning in public or absorbs the spread on every delivery. The comparison to Moody's and S&P is exact. Those ratings agencies became binding without any legal authority because markets stopped doing business at the same terms with anything they downgraded.

Tort discovery after a crash asks what was knowable beforehand. A signed pre-crash REFUSE verdict citing public sources is catastrophic for a manufacturer's defense during the deposition phase of a wrongful death suit, and over enough litigation cycles, manufacturers stop ignoring signed verdicts of this kind because ignoring them becomes uninsurable.

Foreign regulators already disagree with FAA findings on a regular basis; CAAC grounded the 737 MAX before the FAA did. A public signed verdict from a sovereign agent gives a foreign regulator something its own bureaucracy can cite when making the public case for disagreement, and over enough cycles the FAA either matches their conclusions or accepts being the outlier among the major civil aviation authorities.

The three channels compound over many verdicts, not on the first one. Nobody is going to reprice a hull off a single REFUSE. After a year of verdicts being cited in underwriting memos, legal briefs, and EASA bulletins, the question of whether the agent is part of the workflow stops being open.

The most credible early user, the one likely to consume the first set of verdicts before any insurance underwriter does, is a pilot union. ALPA, BALPA, and IFALPA already publish position papers opposing specific certification changes, today citing internal opinion or hired consultants. A position paper that cites a signed agent verdict instead carries something the union cannot generate on its own, which is independence from the union itself. The workflow change for the union is one new citation in a document they were already writing, and the track record that lets insurers and courts eventually defer to the agent has to start somewhere.

## "But the agent wasn't there in 2018"

The historical counterfactual is not really load-bearing here. The actual question is whether the flying public has an institutional counterparty in commercial aviation now, and they don't, while every other affected constituency does.

Somewhere in the certification pipeline at the moment you're reading this, a control law is being tuned past the envelope its original safety case assumed, or a training requirement is being negotiated away to protect a delivery commitment. The public has no voice in any of that, in the same way they had no voice when MCAS shipped. Declining to deploy the technology that could give them one is a choice about which constituency keeps getting overrun in cases like this.

The Theseus aviation safety reviewer is live, with its prompt published. Every verdict it signs becomes part of the public record.

## Where this is already working faster

In DeFi, a sovereign agent's verdict is binding immediately because the protocol calls the agent before executing and a REFUSE reverts the transaction in a single block. Aviation is the same shape of problem with a much slower binding mechanism. The market repricing channel takes years; the litigation channel waits for a crash; the regulatory channel compounds citations over many cycles. The underlying logic doesn't change: an unrepresented constituency gets an institutional counterparty whose verdicts cannot be silenced, and the rest of the system has to adjust around that fact, whether the adjustment takes a block or a decade.

The flying public has been the unrepresented constituency in commercial aviation for the better part of a century. Theseus is the platform we built to give them a way into the room.

[**See the aviation safety reviewer agent →**](https://demo-agents.theseus.network/aviation)
