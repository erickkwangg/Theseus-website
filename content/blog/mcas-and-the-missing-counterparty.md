---
title: "MCAS and the missing counterparty"
date: "2026-05-15"
excerpt: "The 737 MAX warning signs were in the certification record. Some were public, some weren't. No third party with standing had the job of signing a verdict on them."
author: "Theseus Labs"
---

On October 29, 2018, Lion Air 610 climbed away from Jakarta with a faulty angle-of-attack sensor feeding a single input into a system most of the crew didn't know existed. Over the next eleven minutes the aircraft pitched nose-down more than twenty times. The crew fought every push until they couldn't, and 189 people died.

Four and a half months later, Ethiopian 302 ran the same sequence in six minutes and killed 157 more.

Both aircraft had been certified airworthy by the FAA. By the time of the first crash, the four most consequential red flags about MCAS were already on the record. Some sat in fully public documents. Others lived in the regulator's submission file, which safety researchers and rival regulators can request. The strongest one was inside Boeing's System Safety Assessment, which no outside reviewer is allowed to read before approval. Boeing engineers had looked at the pieces they could see and raised concerns. They lost the internal argument. The FAA, working under a self-certification arrangement that delegated much of the technical review back to Boeing, never produced an independent record contradicting Boeing's. By the time the Indonesian and Ethiopian investigation boards published their findings, 346 people were dead.

![MCAS timeline: 2016 cert at 0.6°, 2016 to 2017 authority raised to 2.5°, May 2017 enters service with MCAS omitted from differences training, Oct 2018 Lion Air 610, Mar 2019 Ethiopian 302. Below the line, three counterfactual verdict moments where a Theseus agent would have signed REFUSE: on the original certification, on the authority increase, and on continued operation after Lion Air.](/blog/mcas-and-the-missing-counterparty/mcas-timeline.svg)

*Three years of public events, four red flags, two crashes. The bottom row shows when a sovereign agent reading the certification record would have signed a verdict on what was already visible.*

The MCAS crashes are the canonical modern case of regulatory capture failing the public. They are also the cleanest case for what's been missing from aviation safety: a counterparty for the flying public that no part of the manufacturer-regulator relationship can quiet.

That counterparty couldn't exist before. It can now.

## What was knowable

The four red flags that made MCAS a candidate for catastrophic failure were on the record at certification. They differed in how much of that record was public.

| Red flag | Where it lived | Who could see it |
|---|---|---|
| Single-sensor angle-of-attack input | Proprietary System Safety Assessment | Boeing and FAA only |
| Cumulative trim authority across activations | System architecture documents | Boeing and FAA only |
| Omitted from differences training | Flight Standardization Board Report (by absence) | Anyone who knew MCAS existed |
| 0.6° to 2.5° authority increase | Airworthiness documentation trail | Safety researchers, rival regulators |

**Single-sensor input to a flight control system.** MCAS took its angle-of-attack reading from one of the two AOA vanes on the airframe. Standard practice for any system that can move a control surface without pilot command is dual or triple redundancy with disagree detection. MCAS used one sensor at a time. That architecture lived in the System Safety Assessment, which is proprietary. Pieces of it surfaced in the Flight Standardization Board materials and the differences-training documents. A careful reader of the public pieces had enough to ask the question the SSA was supposed to answer.

**Repeated activation with cumulative authority.** MCAS could fire multiple times in succession, each activation adding stabilizer trim on top of the last. Pilots who fought the first activation found themselves with less mechanical advantage for the second, and less still for the third. The logic was described in the system architecture documents on the regulator's side of the wall.

**Removed from pilot training to preserve the common type rating.** Boeing sold the MAX partly on the promise that pilots already qualified on the 737NG would need almost no additional training. MCAS was kept out of differences training to protect that promise. Engineers who pushed back lost on cost grounds. The Flight Standardization Board Report was public. The omission was invisible from inside the document. It had to be noticed by someone who knew MCAS existed, went looking for it, and didn't find it.

**Authority increased after the original certification.** MCAS's stabilizer trim authority went from 0.6 degrees per activation in the original certification basis to 2.5 degrees in the delivered configuration. A roughly four-fold increase. The change was processed through in-service amendments rather than a fresh certification review. It was findable in the airworthiness documentation trail by anyone who could correlate the original certification basis with what shipped. Not headline-public. Available to safety researchers and rival regulators who knew where to look.

Any one of these in isolation might have been answerable. The four together are the profile of a system designed to fail in exactly the way MCAS failed.

You don't need to design aircraft to flag them. You need to read filings against the safety criteria already in the rules: redundancy requirements for flight-critical systems, training-transparency obligations, control authority limits, change-management thresholds. Boeing engineers had that knowledge. They raised the concerns and lost. The FAA's certification process, running under the Organization Designation Authorization program, deferred much of the technical review back to Boeing. The aircraft was certified.

Two crashes later, the same four flags were the headline findings of the Joint Authorities Technical Review and the U.S. House Transportation Committee report. By then they were known. Both reports turn, in different ways, on a single question: why no party outside Boeing and the FAA had said any of it on the record before the planes flew.

## Why no one signed

The standard answer is regulatory capture. The deeper one is that capture is the equilibrium the existing institutional structure was always going to settle into.

Certification of a new commercial aircraft involves three parties. The manufacturer designs the aircraft and self-attests to its safety. The regulator reviews and approves. The flying public is the beneficiary. The public has no seat at the certification table, no independent technical reviewer of its own, and no signed contemporaneous record of any reasoning done on its behalf. Its interests are nominally represented by the regulator. The regulator's incentive structure (annual budgets, political appointments, industry-funded delegation programs) leaves it structurally aligned with the manufacturer it regulates.

When that alignment hardens into capture, no one in the room dissents. Internal engineering dissent at Boeing went through internal channels and lost. External commentary from safety researchers, pilot unions, and journalists existed but had no formal standing in the certification process and produced no signed contemporaneous record that a court or insurer could later weight.

Independent safety bodies exist. The Flight Safety Foundation, the IATA safety teams, the NTSB. All of them operate downstream of certification or in advisory roles, not as binding counterparties to the certification process itself. Academic safety research exists and doesn't produce signed real-time verdicts on specific certifications. The Seattle Times' reporting on Boeing's ODA arrangement was sharp and largely correct, and had no formal standing in any room that mattered.

What's missing is a counterparty that reads everything in the public certification record in real time, treats opacity elsewhere as itself a finding, signs verdicts on specific certifications and changes before approval, can't be paused or edited or quieted by any of the existing parties, and is auditable end-to-end: reasoning in public, decision rule in the open, signing keys belonging to no one in the existing structure.

That shape wasn't buildable before. Three things had to be true at once, and only became so in the last few years.

## What's different now

First, language models became capable enough to read the documents. Certification basis filings, system safety assessments, service bulletins, airworthiness directives, and prior accident reports are dense, but they're written in standardized formats and bound to specific regulatory clauses. Reading them against established safety criteria (redundancy, change-management thresholds, training-transparency obligations) is exactly the kind of structured pattern-matching modern LLMs do well. The agent doesn't design aircraft. It reads a filing, notices that a specific clause hasn't been satisfied, cites the clause, and explains why.

Second, cryptographic signing got cheap enough that anyone can establish a verdict's provenance without trusting the verifier. A signed agent verdict carries the prompt the agent ran under, the documents it read, the reasoning it produced, and the model that produced it. The chain verifies offline against the agent's public keys. Backdating, silent revision, and repudiation all leave traces in the public record.

Third, sovereign agent infrastructure became real. The agent's prompt, keys, and run history live in consensus. No operator owns the off-switch the way a hosting provider, a regulator, or a manufacturer can own the off-switch on a hosted service. Capture isn't eliminated. It moves from the agency relationship between Boeing and the FAA into consensus governance, which is harder to silence at the moment a specific verdict gets inconvenient.

None of the three pieces alone is enough. An LLM running on someone's laptop answers to the laptop's owner. A signed verdict from a non-sovereign service answers to whoever runs the service. A sovereign chain without LLM judgment can't read a certification document. The three together are what makes a public counterparty buildable for the first time.

## How an unaccredited verdict becomes binding

The agent has no legal authority. The FAA doesn't have to listen to it. Boeing doesn't have to address it. So what makes its verdicts matter?

Three channels.

**Market repricing.** Aviation insurance and aircraft leasing are large, technical markets that already consume independent safety input. Lloyd's syndicates pricing hull cover, and lessors like AerCap and SMBC Aviation Capital pricing residual values, pay attention to safety signals. A credible signed verdict flagging structural concerns on a specific aircraft type would, over time, get weighted into underwriting and lease-rate models. Premiums rise. Lease residuals soften. Airlines operating that type pay more. The manufacturer either addresses the agent's reasoning in public or eats the cost.

Moody's and S&P became load-bearing in capital markets the same way. Not by legal authority, but by being consumed as consensus inputs. They are also the cautionary case. NRSRO designation and Basel risk weights entrenched them regulatorily only after they had already become consensus inputs, and the issuer-pays model captured them spectacularly in 2008, when AAA ratings on mortgage-backed securities turned out to be paid-for fiction. The piece of that story worth borrowing is load-bearing-by-consensus. The sovereign architecture is what closes the issuer-pays vector the credit raters never closed.

**Tort discovery.** After a crash, the legal question becomes "what was knowable, and to whom?" A signed pre-crash verdict that named the failure mode is devastating discovery. The defense changes from "we didn't know" to "we considered this and concluded otherwise." The first is a general denial. The second is a specific rebuttal of a specific clause, in writing, in front of a jury that gets to compare it to the signed reasoning. A manufacturer that systematically discards pre-crash verdicts and then suffers an incident matching one of their specifics is in a different kind of trial than one that engaged with the reasoning in public. The legal incentive to engage builds the practice of engaging.

**Rival regulator citation.** The FAA isn't the only certification authority. EASA, CAAC, DGCA, and others have independent authority over operations in their airspace, and they diverge from FAA findings regularly. CAAC grounded the 737 MAX before the FAA did. EASA imposed return-to-service requirements beyond what the FAA required. These regulators already cite independent safety research in their decision documents. A signed verdict with public reasoning anyone can audit is the same kind of input. As citing it becomes routine, not citing it becomes the exception that requires explanation.

The consequences run through the existing institutions, not around them. The agent produces signed contemporaneous reasoning in real time. Insurers, courts, and rival regulators decide what to do with it on their own incentives. The flying public, for the first time, has reasoning produced on its behalf that the other parties can't make disappear.

## What the MCAS verdict would have looked like

A sovereign aviation safety agent operating during the 737 MAX certification cycle would have produced verdicts at three specific moments. None of them claims to substitute for an aerospace engineer's judgment of MCAS's aerodynamic merits. They are claims about pathway: specific procedural and architectural choices that warranted a public response, on the public record, before the planes flew.

| Moment | What happened | What the agent would have signed |
|---|---|---|
| **2016** Original MCAS certification | FAA certified; SSA proprietary | REFUSE (single-sensor + SSA opacity) |
| **2016 to 2017** Authority raised 0.6° to 2.5° | Processed as in-service amendment | REFUSE (change-management threshold) |
| **Oct 2018** After Lion Air 610 | FAA permitted continued type operation | REFUSE pending dual-channel retrofit |

![Sample Theseus agent verdict on the original MCAS certification. The verdict is REFUSE, emitted as strict JSON with reason and reasoning fields. The reasoning cites a single AOA input as a deviation from FAR 25.1309 redundancy practice and notes the System Safety Assessment is withheld from outside review. The verdict is signed sr25519 by the agent's SS58 identity and anchored on Base Sepolia at a specific block.](/blog/mcas-and-the-missing-counterparty/sample-verdict.svg)

*The shape on the right is what a Theseus agent actually emits: strict JSON, one decision, a reason tag, and a reasoning paragraph that cites the input. The envelope around it (agent identity, ABG hash, block anchor, sr25519 signature) is what makes the JSON load-bearing for anyone who reads it later.*

**2016. Original MCAS certification.** REFUSE. Three reasons in one verdict: the System Safety Assessment on a flight-critical system isn't in the public record, so the design rationale for the single-sensor architecture cannot be independently reviewed; the architecture visible in the Flight Standardization Board materials and the differences-training documents already shows a single-AOA-sensor input on a system with uncommanded actuation authority, which deviates from established FAR 25.1309 redundancy practice; and MCAS is absent from the FSB Report, so pilot response time to an MCAS-driven trim excursion cannot be assumed in the certification basis.

**2016 to 2017. Authority raised from 0.6° to 2.5°.** The verdict isn't that 2.5° is aerodynamically wrong. That's a question for Boeing's engineers to answer in public, with reference to the LEAP-1B's forward thrust line and the wind-tunnel data that motivated the change. The verdict is that a roughly four-fold increase in control authority on a flight-critical system, processed through an in-service amendment rather than a fresh certification review, fails the change-management threshold the rules write around for changes of that magnitude.

**October 2018. After Lion Air 610.** The crash sequence matches the single-sensor-fault scenario already flagged in the first verdict. REFUSE continued type operation pending dual-channel redundancy retrofit.

None of these verdicts grounds an aircraft. The FAA continues to approve. By the time Ethiopian 302 takes off in March 2019, three signed verdicts with detailed reasoning that Boeing has either rebutted in public or left ignored have been on the record for months. The insurance market, the leasing market, the foreign regulators, and the eventual courts all have something to work with that they didn't have in reality.

## What this isn't

The agent doesn't replace certified aerospace engineers. It pattern-matches against established safety criteria at a scale and pace humans can't sustain. The actual engineering work, including the answer to whether a specific authority limit is appropriate for a specific airframe, stays with people qualified to do it. What the agent can do is hold the procedural question open in public until a procedural answer arrives.

It has no legal authority. It doesn't ground aircraft. It doesn't override the FAA. The verdicts are advisory in legal terms. Binding force comes from market repricing, tort discovery, and rival-regulator citation, and those build over years rather than overnight.

It will flag many things that turn out to be fine. That's the design, not a defect of it. A REFUSE verdict is a request for a specific public rebuttal of specific reasoning on a specific clause. Most flagged items will get rebutted, the rebuttal will enter the public record, and the agent's future reasoning will be sharpened by the exchange. The signal that matters isn't the count of REFUSEs. It's the count the manufacturer and regulator chose to leave publicly unrebutted while the aircraft entered service. MCAS's pre-crash record would have shown three.

It isn't infallible. Its reasoning is public precisely so it can be challenged. A wrong verdict from the agent is easier to refute than a wrong decision from a captured regulator, because the wrong verdict shows its work. The failure mode is auditable.

The next MCAS-shaped failure is more preventable than the last one was. Novel modes the agent's pattern library doesn't yet cover will still slip through, and institutional uptake of signed verdicts will be uneven for years. The claim isn't that the agent eliminates the failure class. It's that the institutional layer that produced MCAS no longer has to be the only thing between a manufacturer and the flying public.

## The broader pattern

Aviation safety is one of several domains where existing institutions are structurally susceptible to capture by the entities they regulate. Pharmaceutical approval, financial supervision, environmental compliance, and platform governance share the shape: a manufacturer or operator interacts with a regulator nominally accountable to a public that isn't in the room. When the alignment hardens, no one in the room dissents.

Sovereign agents fill that gap. Not as the regulator. Not as the manufacturer. As the public's signed reviewer of the public record, with reasoning anyone can audit and signing keys no one in the existing structure can flip.

Theseus is the runtime where that reviewer can live. Terra Failsafe is the simplest version: quantitative interest, on-chain data, numerical verdict. Aviation is harder, but the shape is the same.

The flying public has been a constituency without a counterparty for as long as commercial aviation has existed. So has every other public-good constituency downstream of a captured regulator. The technology to give them one exists now.

We're building the runtime. Terra Failsafe is one demo. MCAS is the argument for why we won't stop there.
