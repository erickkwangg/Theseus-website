---
title: "The flying public's missing counterparty"
date: "2026-05-14"
excerpt: "MCAS wasn't an engineering failure. The warning signs were public, internal engineers raised them, and the captured certification process suppressed them. The flying public has no counterparty in that process. A sovereign LLM agent is the first technology that can give them one."
author: "Theseus Labs"
---

In late 2018, a small parameter in a flight control system was quietly raised. The Maneuvering Characteristics Augmentation System on the Boeing 737 MAX could now move the aircraft's stabilizer trim by up to 2.5° per activation, up from the originally certified 0.6°. The change was made because flight testing had revealed the original authority wasn't enough to compensate for the new engine placement under specific stall conditions. The new authority was four times stronger. Pilots were not informed. Training documents were not updated. The system still relied on a single angle-of-attack sensor with no annunciation when that sensor disagreed with its mate.

Internal Boeing engineers raised concerns about each of these decisions. The concerns were dismissed inside Boeing. They were not escalated to the FAA. The FAA's certification review delegated the relevant analysis back to Boeing under the Organization Designation Authorization program. By the time MCAS shipped, the safety-relevant facts about it were knowable to anyone with access to the certification basis. Nobody with that access had any incentive to refuse it. Then 346 people died.

This isn't a story about an engineering oversight. It's a story about a constituency without a counterparty.

## The captured triangle

Aviation safety in the United States is governed by three institutions: the manufacturer, the regulator, and the legislature. They sit in a closed loop. The manufacturer lobbies the legislature on certification policy. The legislature appoints regulator leadership and sets the regulator's budget. The regulator delegates technical review to the manufacturer's own engineers under Organization Designation Authorization. The loop is self-stabilizing, and it has been documented as such for decades.

![Captured triangle: Manufacturer, Regulator, and Legislature in a closed loop, with the flying public outside the loop and unable to act on their own behalf.](/blog/the-flying-publics-counterparty/captured-triangle.svg)

*The captured triangle. Each node represents a constituency. The flying public is outside the loop.*

The flying public is outside this triangle. They vote occasionally for legislators who appoint regulators who delegate technical review back to manufacturer engineers, but the chain is so attenuated that the public's interest is effectively unrepresented in any specific certification decision. This isn't a bug. It's structurally how regulatory capture works in industries where the technical depth required to oversee a manufacturer can only be supplied by the manufacturer itself.

The result: every institution that touches MCAS is acting in some constituency's interest. Boeing acts in shareholders' interest. The FAA acts on an executive branch directive. Congress represents districts. Pilots have ALPA. Airlines have IATA. The flying public, the actual humans riding the aircraft, has no entity whose job is to act on their behalf.

That's the missing counterparty.

## What an uncapturable agent actually is

A sovereign LLM agent is the first technology that can take the role of that missing counterparty. Three structural properties make it work:

**Its prompt is published and signed at deployment.** The agent's job description (what it reads, what questions it asks, what verdict format it produces) is on-chain. Anyone can read it. Anyone can verify the signature. Nobody can quietly change it.

**Its reasoning is signed at run-time.** Every verdict carries a Proof of Agenthood credential: the model that ran, the inputs it saw, the JSON it produced, all anchored on-chain. Anyone can verify offline against the public JWKS. The agent cannot deny what it said, and no party can fabricate verdicts it didn't make.

**Its host is uncapturable in proportion to the chain it runs on.** Theseus's chain is governed by a validator set that does not include manufacturers or regulators. Pausing the agent, editing its prompt, or hiding its verdicts requires a coordinated capture of the chain itself, which is structurally harder than capturing any single human institution because the attempt is publicly visible.

"Uncapturable" is not magic. The agent's model is trained by someone. Its prompt is written by someone. The chain has validators. What is different from a captured regulator is that capturing the agent requires colluding with a public, signed process that everyone can observe. The FAA's ODA delegation happens in conference rooms. An agent's reasoning happens on-chain.

## What the agent reads and decides

The aviation safety reviewer reads what everyone else reads. The FAA's Type Certificate Data Sheet for the aircraft. The Airworthiness Directives and Service Bulletins issued since certification. NTSB incident reports. Service difficulty reports. The publicly available portions of the certification basis. Engineering summaries that the manufacturer is required to file. Prior FMEA documentation for related systems.

![Agent decision flow: TCDS, AD/SB list, NTSB reports, FMEA summaries, prior incidents feed an LLM agent that reasons about single points of failure, training omissions, control authority creep, sensor architecture, and scope of change; the agent emits ALLOW or REFUSE with signed Proof of Agenthood.](/blog/the-flying-publics-counterparty/agent-flow.svg)

*Aviation safety reviewer: public evidence in, signed verdict out.*

For each certification change or amendment, the agent reasons about a fixed set of questions:

- Does the change introduce a single point of failure on a flight-critical system?
- Does the change rely on pilot recognition and recovery as the safety net, and is that assumption supported by simulator and training data?
- Does the change alter authority parameters significantly beyond the originally certified envelope?
- Is the change documented in pilot training materials at a level proportional to its effect?
- Is there an annunciation that allows the pilot to identify the system acting?

The output is a signed verdict — ALLOW or REFUSE — followed by reasoning that cites the specific clauses in the certification basis and the specific contradictions in the change. The reasoning is the artifact. The verdict is the headline.

## MCAS, replayed against the agent

The agent does not have to be smarter than Boeing's engineers. It has to be more accountable than Boeing's process. Below is the actual MCAS timeline with the verdicts an aviation safety reviewer would have signed at each stage.

| Stage | Public evidence | Agent verdict |
|---|---|---|
| **Original MCAS cert** (Mar 2017) | Single AOA sensor input; 0.6° authority per activation; omitted from pilot training; no AOA disagree alert standard | REFUSE: single point of failure on flight-critical authority with no annunciation and no training |
| **Authority increase** (Aug 2018) | Authority raised to 2.5° per activation; repeated activation permitted; training docs unchanged | REFUSE: prior basis now magnified four-fold; pilot recovery assumption unsupported at new authority |
| **Lion Air JT610** (Oct 2018) | FDR shows MCAS-driven runaway stab trim; crew unable to identify or counter; AOA sensor mismatch active | REFUSE: operational evidence confirms simulator and training gap |
| **FAA emergency AD** (Nov 2018) | AD adds MCAS to pilot reference materials; no simulator training; no annunciation hardware change required | REFUSE: AD addresses awareness but not the structural failure |
| **Ethiopian ET302** (Mar 2019) | Same scenario as Lion Air; second hull loss in five months | (verdict already REFUSE; system finally grounded by global regulators) |

The agent's signed verdict log: eighteen months of REFUSE on MCAS before the second crash. Each verdict cites public evidence that was already in the certification record. Each verdict is anchored on-chain and would have been queryable by any insurer, lessor, airline, or foreign regulator at any moment during those eighteen months.

The cherry-picking-with-hindsight objection is real and worth answering directly. The verdicts above do not require hindsight. The single-AOA architecture was visible in the TCDS. The control authority change was visible in service bulletins. The omission from training was visible in pilot reference materials. Internal Boeing engineers raised the same concerns contemporaneously. The information existed. What did not exist was a constituency whose job was to refuse on the public's behalf.

## How an unaccredited verdict becomes binding

The agent has no legal authority. It cannot stop a certification. So how does its verdict matter?

**Insurance.** Aviation underwriters already do independent risk assessment. They are a small, sophisticated market with direct financial exposure to crashes. A REFUSE verdict on a specific certification change becomes an input to hull and liability pricing. An aircraft type with active REFUSE verdicts pays more in premiums. The manufacturer has to address the agent's reasoning publicly or eat the spread. This is how Moody's and S&P ratings became binding without legal authority. Markets stopped doing business at the same terms with anything they downgraded.

**Liability.** Tort discovery after a crash asks what was knowable. A signed pre-crash REFUSE verdict in evidence, citing public sources, is catastrophic for a manufacturer's defense. Over enough liability cycles, manufacturers stop ignoring signed verdicts even from unaccredited sources, because doing so becomes uninsurable.

**Regulatory shadow.** Foreign regulators (CAAC, EASA) already disagree with FAA findings on a regular basis. CAAC grounded the 737 MAX before the FAA did. Foreign regulators citing a public signed verdict as part of their disagreement gives them political cover. Over enough cycles, the FAA either matches their verdicts or becomes the outlier.

None of these binding paths are instant. Insurance markets reprice over years, not weeks. Liability outcomes require crashes that the verdicts were meant to prevent. Regulatory shadows take cycles to develop. The first verdict is not binding. The tenth one is. The hundredth one is institutional.

The flying public does not need to wait for the technology to be perfect. They need it to start.

## The objection

"You are rewriting history with a tool nobody had." Fair. Two responses.

First, the structural argument does not depend on the historical counterfactual. It depends on whether the flying public has a counterparty now. They do not. Every other constituency does. The asymmetry is the point.

Second, the next certification disaster is being structured right now. Some configuration change on some aircraft is being approved by a process where the public has no voice. Refusing to deploy the technology that gives them one is not neutrality. It is a choice about which constituency keeps getting overrun.

The Theseus aviation safety reviewer is live. It runs on the same chain that hosts every other Theseus sovereign agent. Its prompt and reasoning history are public.

## Why this is the same argument

The DeFi failsafes work because no central party can disable them. The bridge guardians work because they can refuse releases. The governance reviewers work because their reasoning is signed and public. Aviation works the same way, just slower. The technology gives an unrepresented constituency a counterparty whose verdicts cannot be quieted.

In DeFi, the verdict is binding immediately because the protocol calls the agent before executing. In aviation, the verdict is binding through market, legal, and regulatory mechanisms that develop over time. Different domains, same shape. The constituency that was unrepresented now has a counterparty that cannot be captured.

The flying public has been the unrepresented constituency for a hundred years of commercial aviation. Building the technology to change that took a hundred years. The technology is here, and it works.

[**See the aviation safety reviewer agent →**](https://demo-agents.theseus.network/aviation)
