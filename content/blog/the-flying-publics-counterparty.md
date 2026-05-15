---
title: "Boeing's MCAS and the case for an outside reviewer"
date: "2026-05-15"
excerpt: "MCAS wasn't an engineering failure. The warning signs were public, internal engineers raised them, and the captured certification process suppressed them. The flying public has no independent reviewer in that process. A sovereign LLM agent is the first technology that can act as one."
author: "Theseus Labs"
---

Sometime in the latter half of 2018, Boeing changed a parameter within the Maneuvering Characteristics Augmentation System (MCAS) of the 737 MAX from 0.6 degrees per activation to 2.5 degrees. MCAS uses that nose-down authority when a pitch-up condition is detected from the angle-of-attack sensor. The initial 0.6 degree number had been agreed upon as part of the type certification process. The 2.5 degree value came out of flight testing, where the smaller number was insufficient to counter the way the MAX's engines, larger and mounted further forward than those on the 737 NG, pitched the nose up near stall. Raising the parameter made the test result acceptable.

Additionally, the system had diverged in multiple ways from what had been documented during certification. MCAS remained dependent upon data from just one of the two angle-of-attack vanes, with no cockpit warning should the values from the two sensors conflict. The 737 MAX Pilot Operating Manual didn't document the existence of the system, and the short training course for 737 NG pilots transitioning to the MAX didn't introduce it.

Engineering personnel within Boeing had objected to all of these choices throughout the development process and lost each time. During certification, most of the pertinent safety analysis had been outsourced to Boeing staff under the Organization Designation Authorization regime of the Federal Aviation Administration. The engineers writing the system were therefore also the ones authoring its safety case. Lion Air Flight 610 crashed in October 2018, and Ethiopian Airlines Flight 302 in March 2019. Each crash was ascribed mainly to MCAS by the eventual investigation, and altogether they claimed the lives of 346 passengers and crew members.

Now, looking back on things, none of these failures were especially hidden. The problems had been spotted during development; the organizations overseeing the development process lacked the ability to address them because doing so would have been politically costly for the manufacturer.

## Closing the loop

American aviation safety takes place in a circle involving three players. Manufacturers lobby Congress on certification issues. Congress selects the heads of the regulator and determines the regulator's budget. The regulator lacks the engineering knowledge to certify modern flight control systems independently, so it delegates the bulk of that work to employees of the manufacturer under the Organization Designation Authorization program. There aren't several hundred independent engineers worldwide who could evaluate a given aircraft's control laws in greater depth than the engineers who developed them, which means there isn't a simple solution to this problem consisting of making the organization that delegates to manufacturers stronger. The interests of every party in the diagram are aligned to support the others, and the entire arrangement is stable in equilibrium.

![Captured triangle: Manufacturer, Regulator, and Legislature in a closed loop, with the flying public outside the loop and unable to act on their own behalf.](/blog/the-flying-publics-counterparty/captured-triangle.svg)

Each element of the network stands for a group. Boeing is accountable to investors; the FAA enforces regulations set by the executive branch; legislators are answerable to voters in districts; ALPA is the organization of airline pilots; the International Air Transport Association stands for commercial airlines. The group with the most immediate interest in a certification ruling, the flying public, has no representative organization whose purpose is to advocate on their behalf at the instant a control authority parameter is modified.

## How does an independent body accomplish what an internal audit cannot

The concept of a sovereign LLM agent is this: the act of reading, reasoning, and rendering judgment that would normally happen inside a private engineering review can now be performed by a model whose prompt, model identity, inputs, and JSON output are all published and cryptographically signed on a chain that none of the parties performing the certification can quietly modify.

The agent's job description (which evidence it reads, what questions it asks of that evidence, and what format it renders the verdict in) is placed on-chain at the moment of deployment. That means any challenger begins with the description of the agent's behavior that the agent actually had, rather than whatever description the manufacturer or regulator later says the agent was operating under. Every verdict contains a Proof of Agenthood credential that names the specific model that ran, the exact inputs it saw, and the JSON it produced. An auditor can verify offline against the public JWKS that the displayed verdict is the one the agent actually emitted, rather than a paraphrase or a summary. The chain does not contain any manufacturers or regulators in the validator set; pausing or modifying the agent is not a phone call to someone's office. It is corruption of a public consensus, visible in real time to everyone who might want to notice.

The safety certification review process carried out under the ODA happens behind closed doors, where the manufacturer's engineers sign off on the manufacturer's designs. The equivalent review performed by a sovereign agent is conducted in public, where the reasoning for each verdict is on view to anyone wishing to contest it.

## What the agent reads and decides

The safety reviewer uses the same evidence sources as the engineers working for the FAA: the Type Certificate Data Sheet, Airworthiness Directives and Service Bulletins issued since the type was certified, NTSB incident reports, service difficulty reports, the publicly available portions of the certification basis, required engineering submissions from the manufacturer, and prior FMEA documentation for related systems. None of it is restricted, and none of it requires the manufacturer to provide access.

![Agent decision flow: TCDS, AD/SB list, NTSB reports, FMEA summaries, prior incidents feed an LLM agent that reasons about single points of failure, training omissions, control authority creep, sensor architecture, and scope of change; the agent emits ALLOW or REFUSE with signed Proof of Agenthood.](/blog/the-flying-publics-counterparty/agent-flow.svg)

Per certification change or amendment, the agent asks the same questions in the same order. Does the change introduce a single point of failure on a flight-critical system? Does the certification change rely on pilot recognition and recovery as the safeguard, and is that assumption supported by simulator and training evidence? Does the change expand authority parameters beyond the original certified envelope? Is the change reflected in the pilot training documentation proportionally to its impact? Is there an annunciation that enables the pilot to discern the system that is acting? The outcome is one of two values: ALLOW or REFUSE. The substance of the answer is the reasoning that accompanies the decision, which references the applicable certification clauses and highlights the specific contradiction in the proposed change. Much of what an insurance underwriter or foreign regulator will later receive from the agent is this reasoning behind the outcome, not the outcome itself.

## MCAS through the agent's lens

The agent doesn't need to be more intelligent than Boeing's engineers. It needs to be more accountable than Boeing's process. Below is a recount of the actual MCAS events, annotated with the ruling an aviation safety reviewer agent would have handed down at each juncture, based on the public knowledge available at each stage.

| Stage | Public evidence | Agent verdict |
|---|---|---|
| **Original cert** (Mar 2017) | Single AOA sensor; 0.6° authority; not in pilot training; no disagree alert | REFUSE: single point of failure, no annunciation, no training |
| **Authority increase** (Aug 2018) | Authority raised to 2.5°; repeated activation; training docs unchanged | REFUSE: prior basis now magnified four-fold; pilot recovery unsupported |
| **Lion Air JT610** (Oct 2018) | FDR shows MCAS runaway trim; crew couldn't counter; AOA mismatch active | REFUSE: operational confirmation of training gap |
| **FAA emergency AD** (Nov 2018) | AD updates pilot reference; no sim training; no hardware change | REFUSE: addresses awareness, not the structural failure |
| **Ethiopian ET302** (Mar 2019) | Same scenario as Lion Air; second hull loss in five months | (already REFUSE; system grounded globally) |

So here we are: eighteen consecutive months of REFUSE outcomes prior to Ethiopian Airlines Flight 302. Each judgment based on publicly available facts, each verifiable on-chain, each capable of being accessed by insurers, lessors, carriers, or foreign regulators at any point during that window. These judgments require no hindsight. The single-AOA architecture, the authority increase, and the training omission were all visible in public records at the time, and the Boeing engineers voicing those issues internally did so in real time. The dispute was already on the record. What was missing, at the moment when refusing the change might have saved a plane, was an entity whose mission is to declare that disagreement on the passengers' behalf.

## How an unofficial verdict becomes binding

The agent has no enforcement powers yet, and a REFUSE ruling won't by itself halt a certification. Here is how a REFUSE becomes consequential.

Aviation underwriters routinely assess risk independently, and they have money on the line when aircraft crash. A REFUSE verdict from a trustworthy sovereign agent feeds into hull and liability insurance in predictable fashion. An aircraft type with outstanding REFUSE decisions commands higher insurance rates, prompting the manufacturer to justify the agent's rationale publicly or accept lower margins on each aircraft sale. This analogy applies precisely to the function of rating agencies like Moody's and S&P. Their reports became binding despite having no legal clout, because financial institutions ceased transacting at identical valuations for entities they downgraded.

Tort discovery post-crash is about what was knowable in advance. A signed pre-crash REFUSE verdict citing publicly available sources is devastating for a manufacturer's defense through the deposition phase of a wrongful death lawsuit, and given enough cycles through the legal system, manufacturers stop ignoring signed verdicts of this kind because ignoring them becomes uninsurable.

Foreign regulators already routinely disagree with FAA findings. Given enough cycles of those regulators citing sovereign agent verdicts in support of their disagreements, the FAA either matches their conclusions or becomes the outlier among the major civil aviation authorities.

These three channels compound over many verdicts, not the first one. No one is going to reprice a hull off a single REFUSE. A year into the verdicts being cited in underwriting memos, legal briefs, and EASA bulletins, the question of whether the agent is part of the workflow stops being open.

The most credible early adopter, who will likely consume the first batch of verdicts before any insurer does, is a foreign aviation regulator. CAAC grounded the 737 MAX before the FAA did, and EASA has split off from FAA findings on multiple occasions in the last decade. Each of these splits was a political fight against the grain in which the foreign regulator built the full technical case in-house against the dominant authority. A signed sovereign agent verdict, with its citations and reasoning attached, is a third-party exhibit a foreign regulator can insert in the file next to its own analysis when it announces a disagreement. Because the third-party exhibit isn't authored by the foreign regulator's own staff, the FAA can't dismiss it as the political product of a rival authority that wanted to disagree. The workflow change for the regulator is one more item in the disagreement filing, and the track record that lets insurers and courts later defer to the agent starts with those filings.

## This is already working faster

In DeFi, a sovereign agent's verdict is binding immediately because the protocol queries the agent prior to execution and a REFUSE reverses the transaction in one block. Aviation is essentially the same problem with a much slower binding mechanism. Repricing the market takes years; litigation waits for a crash; regulatory citations compound over time. The mechanics are the same: an unrepresented constituency gets an institutional counterparty whose verdicts cannot be silenced, and everyone else has to adjust to the reality, whether the adjustment happens in a block or over a decade.

The flying public has been the unrepresented constituency in commercial aviation for the better part of a century. Theseus is the platform we built to give them a way into the room.

[**See the aviation safety reviewer agent →**](https://demo-agents.theseus.network/aviation)
