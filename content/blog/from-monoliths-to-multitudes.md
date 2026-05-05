---
title: "From Monoliths to Multitudes: Why Agent Swarms Beat Giant Models on the Road to AGI"
date: "2026-05-04"
excerpt: "If general intelligence is on the horizon, simply making one model larger won't get us there. We need to create networks of specialized models that can communicate, debate, and share their knowledge."
heroImage: "/blog/from-monoliths-to-multitudes/evolution_of_fusion.gif"
---

*by Oguzhan Baser ([oguzhan@theseuschain.com](mailto:oguzhan@theseuschain.com)) and Eric Wang ([eric@theseuschain.com](mailto:eric@theseuschain.com))*

---

If general intelligence is on the horizon, simply making one model larger won't get us there. We need to create networks of specialized models that can communicate, debate, and share their knowledge.

There's a HumanEval result we often revisit. GPT-3.5, set up in a basic agentic loop that involves calling tools, critiquing its own work, and exchanging ideas with other versions of itself, scores higher than GPT-4 when used alone. In a similar setup, GPT-4 scores about the same as an experienced human programmer. GPT-4 has around ten times the parameters of GPT-3.5, but this mostly does not impact the benchmark results.

![HumanEval coding benchmark: zero-shot vs. agentic GPT-3.5 and GPT-4](/blog/from-monoliths-to-multitudes/05-humaneval-agentic.png)

*Compiled by Andrew Ng, DeepLearning.AI, 2024 [14] (drawing on AgentCoder, MetaGPT, LATS, Reflexion, and others). HumanEval coding benchmark shows zero-shot GPT-3.5 achieving 48 percent. Zero-shot GPT-4 hits 67 percent. When either model is placed in an agentic loop (involving reflection, tool use, planning, and multiple agents), the smaller model surpasses the larger one, while the larger model exceeds expert human performance.*

That result fits a longer pattern. We progressed from monolithic models like GPT-3 to mixture-of-experts (with different sub-networks managing various inputs within a single model), and then to the tool-using assistants we see today. Each step has made the system's errors more independent from one another. The next step will take the agents completely outside any single model.

---

## I. The Single-Model Fallacy

![One model, one cortex](/blog/from-monoliths-to-multitudes/06-monolith-globe.png)

For most of the last decade, the idea at the cutting edge has been that capability improves with parameters. Adding more layers and weights should enhance whatever the model is intended to do. This has mostly held true on easier benchmarks. However, for more complex tasks that require multiple steps, various formats, and external tools, simply adding more parameters doesn't solve the problems effectively.

Scaling does lead to real benefits. It creates smoother performance on familiar data, improves the compression of statistical patterns, and enables natural language handling that wasn't possible five years ago. However, it doesn't reliably deliver what truly matters in practice. This includes systematic generalization across formats and tools, grounded actions with clear steps, planning under strict constraints, and resilience to inputs that fall outside the pretraining data.

A single model carries a specific bias. It performs well where that bias is applicable and poorly where it isn't. The more complex the task, the more frequently these issues arise. The same four types of failures appear repeatedly.

*Errors spread.* A mistake made early in the process affects the calculations that rely on it, which then influences the justification for that calculation.

*Modality gaps remain hidden.* Text-only pretraining allows a model to discuss images, tables, and code without actually learning to operate on them correctly. While multimodal training reduces this gap, it rarely closes it completely across all areas.

*Planning lacks division.* When the same system creates a plan, executes it, verifies it, and approves it, no part of the system can identify its own mistakes.

*Accountability is unclear.* If a single pipeline fails, it is difficult to pinpoint which capability failed and why. You only know that something went wrong.

Parameter scaling only addresses these issues to an extent. These problems become manageable when the system is broken down into specialized agents that have clear logic for combining their outputs.

![Judge accuracy by debate protocol across five judges](/blog/from-monoliths-to-multitudes/01-debate-accuracy.png)

*Khan et al., ICML 2024 [10]. Judge accuracy based on protocol among five judges (GPT-3.5-Turbo through human). Across the judges evaluated, debate (and interactive debate) consistently matches or exceeds single-consultant and naive baselines. The largest difference appears with the strongest judges. Hashed bars represent what fully informed experts achieve, while colored bars represent judges working without the original text.*

---

## II. Variety Beats Volume

![Two views, one decision](/blog/from-monoliths-to-multitudes/merge.gif)

Diverse, complementary sources of evidence tend to yield larger and more reliable gains on difficult tasks than just scaling parameters. Three arguments support this idea.

**The information argument.** The total knowable information about a target $Y$ from inputs $\{X_1,\dots,X_m\}$ decomposes into a series of conditional terms:

$$I(Y; X_{1:m}) = \sum_{i=1}^{m} I(Y; X_i \mid X_{1:i-1})$$

Each term measures what view $i$ adds beyond the prior views. Scaling a model on the same view $X_1$ chases diminishing returns within one term. Adding an orthogonal view (like a code executor, a retrieved citation, or a depth sensor) opens a new term that a model focused solely on $X_1$ cannot access, no matter how many parameters are added. Retrieval provides facts the model has not memorized, execution tools offer precision that language models can only approximate, and other modalities convey signals that language alone cannot infer.

**The error argument.** Consider $k$ specialists with zero-mean errors and pairwise correlation $\rho$. A late-fusion average has an expected squared error roughly given by:

$$\text{MSE}_{\text{ensemble}} \approx \sigma^2\!\left(\rho + \frac{1-\rho}{k}\right) + \overline{\text{bias}}^{\,2}$$

The variance term decreases as $k$ increases, and it decreases faster as $\rho$ drops. In our ModalFidelity work [13], we refined this to an exponential bound on classification error (the Bhattacharyya bound):

$$P_e < e^{-\frac{1}{2}(d-1)c}$$

Error drops exponentially with the number of decorrelated specialists $d$. Decorrelation reduces variance directly, while bias terms that point in different directions cancel each other instead of adding up. So a diverse panel removes the correlated component of error that scaling cannot address, no matter how large the model becomes.

**The geometry argument.** Real-world problems do not share one structure. Legal reasoning, robotic control, medical tabular data, and audio transcripts each have distinct statistical characteristics. A single model must learn one parameterization that compromises across all of them. Specialists do not face this limitation. Each one fits its area with fewer parameters and improved precision. A fusion layer allocates the overall budget across structures instead of stretching one model too thin.

Robustness follows the same trend. A median or trimmed mean over agents resists outliers, and using Byzantine-robust aggregation limits the damage from any compromised contributor. Separating planner, executor, and judge prevents any single system from creating and certifying its own mistakes. A monolith is a single point of failure, while an ensemble fails less frequently and recovers more quickly.

Not all diversity is beneficial, of course. Two specialists that fail for the same reasons duplicate a failure mode rather than providing a new one. Useful diversity complements important factors: different modalities, varying algorithmic approaches (like generative versus symbolic, or neural versus constraint solver), different memory horizons, fast reactive agents working alongside slow reflective ones, and even different training seeds when duplication is feasible. A capable, decorrelated panel of specialists can match or exceed the performance of a single state-of-the-art model on complex, coordination-heavy tasks while staying within the same parameter budget.

The implication for general intelligence is structural rather than incremental. Variety broadens the information surface and reduces correlated error, while parameter scaling simply concentrates more capacity behind a single bias. This is part of why later mixture-of-experts models already outperform earlier dense models that are several times their size.

![Multi-modality increases accuracy from 1D to 2D](/blog/from-monoliths-to-multitudes/02-modalfidelity-2d.png)

*Baser et al., ModalFidelity, TMLR 2025 [13]. Same-size binary classifiers on the same data, evaluated unimodally (using modality 1 only, modality 2 only) and bimodally. The 1D decision boundaries cannot separate the corrected class. The 2D boundary, formed by checking whether the two views agree, recovers it. Cross-source consistency achieves better accuracy at a lower cost than enlarging either source alone.*

---

## III. Where You Fuse Changes Everything

Variety alone isn't enough. Once you have multiple specialists, the design challenge becomes how to combine their outputs. Where you place the fusion is more important for robustness, sample efficiency, and alignment than the number of parameters. There are four common patterns, roughly in order of how much structure each one imposes.

**Early fusion (raw signal).** Raw streams, such as vision, text, and audio, are combined or cross-attended before the representations stabilize. The advantage is maximum sharing across modalities. The downside is that alignment can be fragile and prone to negative transfer if any one stream is noisy or adversarial. This works well when sensor statistics are closely controlled and paired data is plentiful, which is rare outside curated benchmarks.

**Mid-level fusion (feature).** Each specialist normalizes its domain into a compact embedding, and cross-attention or gated mixing layers manage the combination. This is the practical default for most real systems. Specialization is maintained, context is introduced where necessary, and experts can be retrained independently.

**Late fusion (decision).** Agents can vote, average, stack, or rely on a learned arbiter. The output is easy to debug and clear across trust boundaries, making it the right choice when components come from different teams or organizations. Byzantine-robust aggregation methods, like Krum and others developed in Guerraoui et al.'s *Robust Machine Learning* [5], limit the impact of any single bad actor in a way that no single decoder can manage.

**Deliberative fusion (oversight and critique).** Outputs go through a structured exchange: propose, critique, revise, adjudicate. This is where most of the alignment work happens because optimizing the wrong proxy often leads to poor behavior. The reward-hacking and specification-gaming patterns that Christian describes in *The Alignment Problem* [1] are one set of examples, while the broader cobra-effect dynamics that Narayanan and Kapoor mention in *AI Snake Oil* [3] provide another. Deliberation often uncovers mis-specifications early, as the proposer and the certifier are not the same component.

Consider a fixed total parameter budget split in two ways: one large model versus several specialists combining to the same budget with a small fusion head. If we assume reasonable conditions (varying inputs, subtasks that are mostly independent, and uncorrelated specialist errors), the staged mid-to-late fusion approach reduces total risk on two fronts. Each specialist maintains low bias on its own area, and the spread of their combined errors stays small because the errors aren't correlated across areas. Robust decision rules can then limit the worst-case impact of any single agent, something a single system on the same budget cannot do when one of its subtask distributions changes.

Ensembles also reveal uncertainty in ways that monoliths cannot, through direct disagreement. When two specialists return different answers, the system can clearly act on that signal: escalating to deliberation, requesting more evidence, or deferring to a judge. A monolith facing the same internal uncertainty reveals it less reliably. Calibration and self-consistency help, but it's harder to derive a clear signal than from agent disagreement.

That signal's trustworthiness, of course, depends on the reality of the disagreement. If you cannot verify that two agents executed the computations they claim, then disagreement becomes noise. Any deliberation built on that uncertainty inherits the ambiguity. We will revisit this point in Section IV.

![mAP and GFLOPs versus fusion layer position](/blog/from-monoliths-to-multitudes/03-attention-bottlenecks.png)

*Nagrani et al., NeurIPS 2021 [11]. Attention Bottlenecks for Multimodal Fusion. Attention bottlenecks hold compute roughly flat across fusion depths while matching or exceeding standard cross-attention. This only becomes competitive at higher compute and later fusion points. A few "messenger" tokens sharing high-level information between streams maintain high accuracy while keeping compute nearly flat.*

![Scaling laws for early, late, and MoE fusion](/blog/from-monoliths-to-multitudes/04-apple-scaling-laws.png)

*Shukor et al., ICCV 2025 [12]. Apple's scaling laws for native multimodal models. With the same training budget, all designs improve at similar rates but require different allocations. Early fusion performs comparably to late fusion at smaller model sizes if given more data. Late fusion prefers larger models. Sparse mixture-of-experts has the most favorable scaling exponent in this context, favoring smaller models trained on more data.*

---

## IV. Why a Multi-Agent System Needs a New Substrate

A multi-agent system at scale needs more than skilled components. It needs infrastructure for discoverability, accountability, bounded action, and provenance. Mollick makes a similar argument for human-AI teams in *Co-Intelligence* [2]: capability arises from how collaboration is structured, not just from model size. The same principle applies within the model layer.

Centralized pipelines can replicate some of these features, but they do not easily provide the variance, incentives, and audit guarantees that a coordinated system requires. Four structural issues illustrate this point concretely, and each one implies a property the substrate must provide.

![A network of specialized agents](/blog/from-monoliths-to-multitudes/equilibrium.gif)

**Distributed specialists.** The expertise required for a coordinated AI system isn't concentrated in one provider. It exists in models trained by different teams, on diverse data, with varying incentives and release policies. A substrate must make those specialists discoverable, callable, and payable across organizational lines, allowing a swarm to combine them without needing to merge into a single provider.

**Auditable disagreement.** In a monolithic system, the same component does the planning, executing, and certifying. In a multi-agent system, the planner, executor, judge, and critic are distinct by design. However, that separation is only meaningful when you can verify "who said what." Disagreement among agents needs to be a verifiable signal, not an unfalsifiable claim. Otherwise, any alignment property based on inter-agent oversight collapses.

**Bounded action.** Non-deterministic LLM output shouldn't be the only layer between the system and the world. The architecture needs a typed, bounded action interface, and each action must trace back to the inference that proposed it.

**Memory provenance.** A multi-agent system requires large, mutable memory that any inference can cite, plus a guarantee that the cited information was actually consulted.

These properties don't just happen in centralized pipelines. They are essential protocol features, and a network of independent, proof-carrying agents needs a system capable of providing them as basic elements. The next section discusses how Theseus accomplishes this.

---

## V. How Theseus Delivers the Substrate

Theseus is a chain designed to treat ML inference as a state transition that the consensus layer can reason about, instead of as a black box attached to one. The five mechanisms below address the four substrate requirements from Section IV one at a time, with the marketplace serving as the economic layer that keeps the rest aligned.

**Tensor Commits** meet the auditable-disagreement requirement. Most chains only record that a model ran. Theseus provides a concise cryptographic proof that the declared model generated the declared outputs, which can be traced to specific rows, channels, or sub-tensors. The foundation of this is Terkle Trees, a tensor-native authentication structure introduced in [15], which is inexpensive for both parties. On LLaMA2, Tensor Commits add 0.97 percent for the prover and 0.12 percent for the verifier on top of inference. A verifier without a GPU can check an inference without re-running it. This allows fusion layers, judges, and critics to evaluate evidence instead of relying on reputation. MoE routing becomes auditable as long as the routing computation is itself committed. Without verifiable inference, fusion layers assess signed receipts rather than actual calculations. This means that a single dishonest specialist can undermine every downstream judge, the exact failure mode that the exponential-decorrelation argument in Section II aimed to prevent.

**SHIP** addresses the bounded-action requirement. It is a domain-specific language that compiles model outputs into a small, fixed set of auditable operations. The execution path is clear: inference, then SHIP compilation, then proof check, and finally runtime execution. Nothing in that pipeline allows free-form text to silently become a privileged action. The model cannot hallucinate a function, misplace a parameter, or sneak an unsafe construct between the proposal and the actual execution. Without a bounded action layer, the last hop between LLM output and a privileged side effect (a payment, contract call, or tool invocation) depends on prompt validation, which is fragile and easily manipulated.

**AIVM** meets the distributed-specialists requirement. Instead of operating on top of the Ethereum Virtual Machine (EVM), Theseus has its own AI Virtual Machine designed for ML workloads. Tensor operations are treated as first-class instructions, proof checks occur at the language level, and execution is consistent in the operations that consensus relies on (numerical results are reproducible within a specified tolerance). Models and agents are first-class objects on the chain, and gas charges for the actual tensor work are distributed across agents calling the same model. Two rules maintain the system at every block: every on-chain inference must include a valid Tensor Commit proof, and every model or context an inference references must be verifiably retrievable at the same block. Without an AI-native VM, agents are external addresses calling out to off-chain inference servers, leaving the chain unable to identify what an agent is or to meter the work it claims to have done. This makes it impossible to discover, audit, or compose specialists at the protocol level.

**TheseusStore** addresses the memory-provenance requirement. The chain itself contains the critical state. Large contexts (embeddings, weights, episodic logs) are stored in TheseusStore, with cryptographic anchors linking back to the chain. This allows any inference to cite the exact memory slice it used. Storage miners must post a stake, prove they still hold the data, and earn fees for doing so. The data is stored redundantly across nodes, so if individual nodes fail, nothing is lost. This makes memory a protocol guarantee, not just a best-effort add-on. Without a verifiable memory layer, an agent could claim it consulted memory slice $M$ but actually refer to $M'$, and no critic could disprove the claim. Oversight between agents would devolve into he-said-she-said.

**Marketplace** is the economic layer that ensures the rest are incentive-compatible. Multi-agent systems remain healthy only when specialists are paid for their marginal value. Section II's variance argument clearly defines marginal value: lower correlation $\rho$ with the overall panel decreases ensemble error faster than higher correlation does. Theseus sets prices based on contributions. The fusion layer weighs agents by their track record under proof, and payouts are proportional to the variance reduction each agent actually achieves, not the quality of its claims. Model owners earn usage fees, dishonest provers lose their stake (slashing), and proof costs are spread across many agents using the same model. An integrated order book helps steer prices toward marginal cost without needing off-chain brokers, and gas costs are predictable enough that scaling deliberation (more critics, judges, and rounds) remains affordable. Without an incentive layer pricing low $\rho$, decorrelation becomes something no one cares to buy, leading to a panel that collapses to whoever holds the cheapest tokens. The variance term, which the entire essay depends on, stops decreasing.

A practical example illustrates how this composition works. Imagine an on-chain treasury bot deciding whether to rebalance a stablecoin position. It queries three specialists: a market-data oracle that reports a current price, a risk-prediction model that provides a 30-day volatility forecast, and a compliance checker that verifies the rebalance aligns with a configured policy. Each specialist returns a Tensor Commit proof that the declared model produced the stated output, linked to model weights stored in TheseusStore with retrieval proofs. The bot's planner collects and weighs the three results by track record under proof, while a judge (its own committed model) decides "rebalance" or "wait." If the decision is "rebalance," the planner generates a SHIP program rather than free text: transfer $X$ from address $A$ to address $B$, conditioned on a price band check at execution time. The AIVM verifies every proof in the chain at the same block, retrieves the cited weights and historical volatility series from TheseusStore, and either allows the transfer to occur or rejects the block. Settlement completes the process: each specialist receives a fee based on its track-record-weighted contribution, storage miners earn for providing the cited memory, and any specialist with a failed proof loses their stake.

If Section II's argument holds, that variance reduces exponentially with decorrelated specialists and variety surpasses volume, the setup of any system that scales to general intelligence must be a market. Markets need three essentials: discoverability, verifiable reputation, and bounded settlement. Theseus is the first chain to provide all three as essential components. A centralized aggregator cannot effectively decorrelate the specialists it compensates since they share an operator and a training pipeline. A blockchain attached to ML can verify signed receipts but not the tensors that created them, leaving disagreement unresolved. Theseus addresses both issues, and we are proud to be building this.

---

## References

[1] Christian, B. (2020). *The Alignment Problem: Machine Learning and Human Values.* W. W. Norton.

[2] Mollick, E. (2024). *Co-Intelligence: Living and Working with AI.* Portfolio.

[3] Narayanan, A., & Kapoor, S. (2024). *AI Snake Oil: What Artificial Intelligence Can Do, What It Can't, and How to Tell the Difference.* Princeton University Press.

[4] Gambelin, O. (2024). *Responsible AI: Implement an Ethical Approach in Your Organization.* Kogan Page.

[5] Guerraoui, R., Gupta, N., & Pinot, R. (2024). *Robust Machine Learning: Distributed Methods for Safe AI.* Springer Nature Singapore.

[6] Carpenter, P. (2024). *FAIK: A Practical Guide to Living in a World of Deepfakes, Disinformation, and AI-Generated Deceptions.* Wiley.

[7] Beckman, M. (2025). *Some Future Day: How AI Is Going to Change Everything.* Skyhorse.

[8] Viggiano, G. (Ed.). (2022). *Convergence: Artificial Intelligence and Quantum Computing.* John Wiley & Sons.

[9] Kurzweil, R. (2024). *The Singularity Is Nearer: When We Merge with AI.* Viking.

[10] Khan, A., et al. (2024). "Debating with More Persuasive LLMs Leads to More Truthful Answers." *ICML 2024.*

[11] Nagrani, A., et al. (2021). "Attention Bottlenecks for Multimodal Fusion." *NeurIPS 2021.*

[12] Shukor, M., et al. (2025). "Scaling Laws for Native Multimodal Models." *ICCV 2025.*

[13] Baser, O., et al. (2025). "ModalFidelity: Modality Reduces Deepfake Detection Error Exponentially." *TMLR 2025.*

[14] Ng, A. (2024). "Agentic Design Patterns Part 1: Four AI Agent Strategies That Improve GPT-4 and GPT-3.5 Performance." *The Batch, DeepLearning.AI*, March 20, 2024.

[15] Baser, O., et al. (2026). "TensorCommitments: A Lightweight Verifiable Inference for Language Models." *arXiv:2602.12630.*
