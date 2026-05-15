---
title: "The flying public's missing counterparty"
date: "2026-05-15"
excerpt: "MCAS wasn't an engineering failure. The warning signs were public, internal engineers raised them, and the captured certification process suppressed them. The flying public has no counterparty in that process. A sovereign LLM agent is the first technology that can give them one."
author: "Theseus Labs"
---

In late 2018, Boeing quietly raised a parameter in a 737 MAX flight control system. The Maneuvering Characteristics Augmentation System was now allowed to move the stabilizer trim up to 2.5° per activation. The original certified authority had been 0.6°. Flight testing during development had shown the original number couldn't reliably compensate for the way the MAX's larger engines, mounted further forward and higher than on the 737 NG, pitched the nose up near stall.

Pilots transitioning from the NG to the MAX took a short difference course. MCAS wasn't in it. The pilot operating manual didn't name the system. The sensor architecture didn't change with the authority increase: a single angle-of-attack vane drove the trim command, with no cockpit indicator when the vane disagreed with the redundant unit on the other side of the nose.

Engineers inside Boeing flagged these decisions at the time, and were overruled. The FAA's certification review delegated most of the safety analysis back to Boeing engineers under Organization Designation Authorization. By the time MCAS shipped, anyone with access to the certification record could see what was wrong. Nobody with that access had a reason to refuse. Then 346 people died, in Indonesia and then Ethiopia, five months apart.

Calling this an engineering failure misses the failure. Engineers caught it. The institution wasn't built to listen.

## The captured triangle

Aviation safety in the United States is governed by three institutions: the manufacturer, the regulator, and the legislature. They sit in a closed loop. The manufacturer lobbies the legislature on certification policy. Regulator leadership is appointed by the same legislature, and the regulator's budget is set there too. Technical review then flows back to the manufacturer's own engineers under Organization Designation Authorization. The loop is self-stabilizing.

![Captured triangle: Manufacturer, Regulator, and Legislature in a closed loop, with the flying public outside the loop and unable to act on their own behalf.](/blog/the-flying-publics-counterparty/captured-triangle.svg)

*The captured triangle. Each node represents a constituency. The flying public is outside the loop.*

The flying public is outside this triangle. They vote for legislators who appoint regulators who delegate technical review back to manufacturer engineers. The chain is long enough that the public's interest is unrepresented in any certification decision. And there aren't 200 outside engineers anywhere on earth who understand a specific aircraft's flight control law better than the team that wrote it, so the FAA outsources the engineering review back to that team and the loop closes.

Every institution that touches a certification acts in some constituency's interest. Boeing acts for shareholders. The FAA acts on executive branch directive. Congress represents districts. Pilots have ALPA. Airlines have IATA. The flying public has no entity whose job is to act on their behalf.

That's the missing counterparty.

## What an uncapturable agent actually is

A sovereign LLM agent can take that role. Three properties make it work:

**Its prompt is published and signed at deployment.** The agent's job description (what it reads, what it asks, what verdict format it produces) is on-chain. Anyone can read it; nobody can quietly change it.

**Its reasoning is signed at run-time.** Every verdict carries a Proof of Agenthood credential: the model, the inputs, the JSON output, all anchored on-chain. Anyone can verify it offline against the public JWKS.

**Its host is uncapturable.** Theseus's validator set does not include manufacturers or regulators. Pausing the agent, editing its prompt, or hiding its verdicts means capturing the chain itself, in the open, in front of everyone whose money or safety depends on the outcome.

Capturing a Theseus agent requires colluding with a public, signed process anyone can observe. ODA delegation happens behind closed doors; the agent's reasoning is on-chain by construction. The contrast is the whole product.

## What the agent reads and decides

The aviation safety reviewer pulls from the same evidence base the FAA itself uses:

- The Type Certificate Data Sheet (TCDS)
- Airworthiness Directives and Service Bulletins issued since type certification
- NTSB incident reports and service difficulty reports
- Public portions of the certification basis
- Required engineering submissions from the manufacturer
- Prior FMEA documentation for related systems

Nothing here is privileged. Nothing here requires Boeing's cooperation.

![Agent decision flow: TCDS, AD/SB list, NTSB reports, FMEA summaries, prior incidents feed an LLM agent that reasons about single points of failure, training omissions, control authority creep, sensor architecture, and scope of change; the agent emits ALLOW or REFUSE with signed Proof of Agenthood.](/blog/the-flying-publics-counterparty/agent-flow.svg)

*Aviation safety reviewer: public evidence in, signed verdict out.*

For each certification change or amendment, the agent reasons about a fixed set of questions:

- Does the change introduce a single point of failure on a flight-critical system?
- Does the change rely on pilot recognition and recovery as the safety net, and is that assumption supported by simulator and training data?
- Does the change alter authority parameters significantly beyond the originally certified envelope?
- Is the change documented in pilot training materials at a level proportional to its effect?
- Is there an annunciation that allows the pilot to identify the system acting?

A verdict is one of two values, ALLOW or REFUSE. The work is in the reasoning, which cites the certification clause and names the specific contradiction in the change. Insurance underwriters, lessors, and foreign regulators who later consume these verdicts will spend most of their time on the reasoning.

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

None of this requires hindsight. The single-AOA architecture, the authority increase, and the training omission were all visible in public documents at the time. Internal Boeing engineers were raising the same concerns contemporaneously. The information was there. Nobody whose job was to refuse on the public's behalf was.

## How an unaccredited verdict becomes binding

The agent has no legal authority. How does its verdict matter, then?

**Insurance.** Aviation underwriters already do independent risk assessment with direct exposure to crashes. A REFUSE verdict feeds into hull and liability pricing. An aircraft type with active REFUSE verdicts pays more in premiums; the manufacturer addresses the agent's reasoning publicly or eats the spread. This is how Moody's and S&P became binding without legal authority: markets stopped doing business at the same terms with anything they downgraded.

**Liability.** Tort discovery after a crash asks what was knowable. A signed pre-crash REFUSE verdict citing public sources is catastrophic for a manufacturer's defense. Over enough cycles, manufacturers stop ignoring signed verdicts because doing so becomes uninsurable.

**Regulatory shadow.** Foreign regulators (CAAC, EASA) already disagree with FAA findings; CAAC grounded the 737 MAX before the FAA did. A public signed verdict gives a foreign regulator political cover for disagreement. Over enough cycles, the FAA either matches their verdicts or becomes the outlier.

These paths compound. Nobody reprices anything off a single REFUSE. After a year of verdicts cited in underwriting memos and legal briefs, the agent stops being optional.

So who reads the first ten? The most credible early user is a pilot union. ALPA, BALPA, and IFALPA already publish position papers opposing specific certification changes, citing internal opinion or hired consultants. A position paper citing a signed agent verdict instead carries something the union cannot generate on its own: independence from the union. The workflow change is one citation. The track record that lets insurers and courts defer later has to start somewhere.

## "But the agent wasn't there in 2018"

Forget the historical counterfactual for a moment. The question is whether the flying public has a counterparty now. They don't. Every other constituency does.

The next certification disaster is being structured right now: a control law tuned past its envelope, a training requirement negotiated away to protect a delivery date. The public has no voice in any of it. Refusing to deploy the technology that gives them one is a choice about which constituency keeps getting overrun.

The Theseus aviation safety reviewer is live, with its prompt published. Every verdict it signs becomes part of the public record.

## The same argument, slower

In DeFi, a sovereign agent's verdict is binding immediately because the protocol calls the agent before executing, and a REFUSE reverts the transaction in a single block. Aviation is the same shape, slower. The agent gives an unrepresented constituency a counterparty whose verdicts cannot be quieted; markets, courts, and rival regulators do over years what a smart contract does in seconds.

The flying public has been the unrepresented constituency for a hundred years of commercial aviation. We built this to change that.

[**See the aviation safety reviewer agent →**](https://demo-agents.theseus.network/aviation)
