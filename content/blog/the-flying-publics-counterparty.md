---
title: "The flying public's missing counterparty"
date: "2026-05-14"
excerpt: "MCAS wasn't an engineering failure. The warning signs were public, internal engineers raised them, and the captured certification process suppressed them. The flying public has no counterparty in that process. A sovereign LLM agent is the first technology that can give them one."
author: "Theseus Labs"
---

In late 2018, a small parameter in a flight control system was quietly raised. The Maneuvering Characteristics Augmentation System on the Boeing 737 MAX could now move the aircraft's stabilizer trim by up to 2.5° per activation, up from the originally certified 0.6°. The change was made because flight testing had revealed the original authority wasn't enough to compensate for the new engine placement under specific stall conditions. The new authority was four times stronger. Pilots were not informed. Training documents were not updated. The system still relied on a single angle-of-attack sensor with no annunciation when that sensor disagreed with its mate.

Internal Boeing engineers raised concerns about each of these decisions and were overruled. The FAA's certification review delegated the relevant analysis back to Boeing under Organization Designation Authorization. By the time MCAS shipped, the safety-relevant facts were knowable to anyone with access to the certification basis. Nobody with that access had any incentive to refuse. Then 346 people died.

This isn't a story about an engineering oversight. It's a story about a constituency without a counterparty.

## The captured triangle

Aviation safety in the United States is governed by three institutions: the manufacturer, the regulator, and the legislature. They sit in a closed loop. The manufacturer lobbies the legislature on certification policy. The legislature appoints regulator leadership and sets the regulator's budget. The regulator delegates technical review to the manufacturer's own engineers under Organization Designation Authorization. The loop is self-stabilizing.

![Captured triangle: Manufacturer, Regulator, and Legislature in a closed loop, with the flying public outside the loop and unable to act on their own behalf.](/blog/the-flying-publics-counterparty/captured-triangle.svg)

*The captured triangle. Each node represents a constituency. The flying public is outside the loop.*

The flying public is outside this triangle. They vote for legislators who appoint regulators who delegate technical review back to manufacturer engineers. The chain is long enough that the public's interest is unrepresented in any certification decision. Regulatory capture isn't a bug in this kind of industry; it's the predictable outcome when the technical depth required to oversee a manufacturer can only come from the manufacturer.

Every institution that touches a certification acts in some constituency's interest. Boeing acts for shareholders. The FAA acts on executive branch directive. Congress represents districts. Pilots have ALPA. Airlines have IATA. The flying public has no entity whose job is to act on their behalf.

That's the missing counterparty.

## What an uncapturable agent actually is

A sovereign LLM agent can take that role. Three properties make it work:

**Its prompt is published and signed at deployment.** The agent's job description (what it reads, what it asks, what verdict format it produces) is on-chain. Anyone can read it; nobody can quietly change it.

**Its reasoning is signed at run-time.** Every verdict carries a Proof of Agenthood credential: the model, the inputs, the JSON output, all anchored on-chain. Anyone can verify it offline against the public JWKS.

**Its host is uncapturable.** Theseus's validator set does not include manufacturers or regulators. Pausing the agent, editing its prompt, or hiding its verdicts means capturing the chain itself, in the open, in front of everyone whose money or safety depends on the outcome.

Capturing a Theseus agent requires colluding with a public, signed process anyone can observe. The FAA's ODA delegation happens in conference rooms. The agent's reasoning happens on-chain. That asymmetry is the whole product.

## What the agent reads and decides

The aviation safety reviewer reads what everyone else reads: the Type Certificate Data Sheet, Airworthiness Directives and Service Bulletins, NTSB incident reports, service difficulty reports, the public portions of the certification basis, the engineering summaries the manufacturer is required to file, and prior FMEA documentation for related systems.

![Agent decision flow: TCDS, AD/SB list, NTSB reports, FMEA summaries, prior incidents feed an LLM agent that reasons about single points of failure, training omissions, control authority creep, sensor architecture, and scope of change; the agent emits ALLOW or REFUSE with signed Proof of Agenthood.](/blog/the-flying-publics-counterparty/agent-flow.svg)

*Aviation safety reviewer: public evidence in, signed verdict out.*

For each certification change or amendment, the agent reasons about a fixed set of questions:

- Does the change introduce a single point of failure on a flight-critical system?
- Does the change rely on pilot recognition and recovery as the safety net, and is that assumption supported by simulator and training data?
- Does the change alter authority parameters significantly beyond the originally certified envelope?
- Is the change documented in pilot training materials at a level proportional to its effect?
- Is there an annunciation that allows the pilot to identify the system acting?

The output is a signed verdict, ALLOW or REFUSE, with reasoning that cites the specific clauses in the certification basis and the specific contradictions in the change. The reasoning is what anyone outside the agent will actually read.

## MCAS, replayed against the agent

Below is the actual MCAS timeline. The right column is the verdict an aviation safety reviewer agent would have signed at each stage, against the public evidence available at that moment.

| Stage | Public evidence | Agent verdict |
|---|---|---|
| **Original MCAS cert** (Mar 2017) | Single AOA sensor input; 0.6° authority per activation; omitted from pilot training; no AOA disagree alert standard | REFUSE: single point of failure on flight-critical authority with no annunciation and no training |
| **Authority increase** (Aug 2018) | Authority raised to 2.5° per activation; repeated activation permitted; training docs unchanged | REFUSE: prior basis now magnified four-fold; pilot recovery assumption unsupported at new authority |
| **Lion Air JT610** (Oct 2018) | FDR shows MCAS-driven runaway stab trim; crew unable to identify or counter; AOA sensor mismatch active | REFUSE: operational evidence confirms simulator and training gap |
| **FAA emergency AD** (Nov 2018) | AD adds MCAS to pilot reference materials; no simulator training; no annunciation hardware change required | REFUSE: AD addresses awareness but not the structural failure |
| **Ethiopian ET302** (Mar 2019) | Same scenario as Lion Air; second hull loss in five months | (verdict already REFUSE; system finally grounded by global regulators) |

Eighteen months of REFUSE before Ethiopian Air 302. Each verdict cites public evidence, each is anchored on-chain, and any insurer, lessor, airline, or foreign regulator could have queried them at any moment.

None of this requires hindsight. The single-AOA architecture, the authority increase, and the training omission were all visible in public documents at the time. Internal Boeing engineers were raising the same concerns contemporaneously. The information existed. What did not exist was a constituency whose job was to refuse on the public's behalf.

## How an unaccredited verdict becomes binding

The agent has no legal authority. How does its verdict matter, then?

**Insurance.** Aviation underwriters already do independent risk assessment with direct exposure to crashes. A REFUSE verdict feeds into hull and liability pricing. An aircraft type with active REFUSE verdicts pays more in premiums; the manufacturer addresses the agent's reasoning publicly or eats the spread. This is how Moody's and S&P became binding without legal authority: markets stopped doing business at the same terms with anything they downgraded.

**Liability.** Tort discovery after a crash asks what was knowable. A signed pre-crash REFUSE verdict citing public sources is catastrophic for a manufacturer's defense. Over enough cycles, manufacturers stop ignoring signed verdicts because doing so becomes uninsurable.

**Regulatory shadow.** Foreign regulators (CAAC, EASA) already disagree with FAA findings; CAAC grounded the 737 MAX before the FAA did. A public signed verdict gives a foreign regulator political cover for disagreement. Over enough cycles, the FAA either matches their verdicts or becomes the outlier.

These paths compound. The first verdict shows up in nobody's pricing model. The tenth one is a footnote in an underwriter's risk memo. The hundredth one is institutional infrastructure.

So who reads the first ten? The most credible early user is a pilot union. ALPA, BALPA, and IFALPA already publish position papers opposing specific certification changes, citing internal opinion or hired consultants. A position paper citing a signed agent verdict instead carries something the union cannot generate on its own: independence from the union. The workflow change is one citation. The track record that lets insurers and courts defer later has to start somewhere.

## "But the agent wasn't there in 2018"

The historical counterfactual isn't the argument. Whether the flying public has a counterparty *now* is the argument. They don't. Every other constituency does. That asymmetry is the entire premise of building this.

The next certification disaster is being structured right now: a control law tuned past its envelope, a training requirement negotiated away to protect a delivery date. The public has no voice in any of it. Refusing to deploy the technology that gives them one is a choice about which constituency keeps getting overrun.

The Theseus aviation safety reviewer is live, with its prompt published. Every verdict it signs becomes part of the public record.

## The same argument, slower

In DeFi, a sovereign agent's verdict is binding immediately because the protocol calls the agent before executing, and a REFUSE reverts the transaction in a single block. Aviation is the same shape, slower. The agent gives an unrepresented constituency a counterparty whose verdicts cannot be quieted; markets, courts, and rival regulators do over years what a smart contract does in seconds.

The flying public has been the unrepresented constituency for a hundred years of commercial aviation. The technology to change that has finally arrived.

[**See the aviation safety reviewer agent →**](https://demo-agents.theseus.network/aviation)
