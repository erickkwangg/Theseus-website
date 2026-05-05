import Link from "next/link";
import type { Metadata } from "next";
import { Coins, Zap, Shield, PiggyBank, Bot, Layers, Wallet } from "lucide-react";
import Callout from "@/components/docs/Callout";
import CodeBlock from "@/components/docs/CodeBlock";
import { DocsPageJsonLd } from "@/components/JsonLd";
import PrevNext from "@/components/docs/PrevNext";
import DocsFooter from "@/components/docs/DocsFooter";

export const metadata: Metadata = {
  title: "Tokenomics",
  description:
    "Understand $THE utility, staking, fee flows, and AI-native economic primitives in the Theseus network.",
  keywords: ["Theseus tokenomics", "$THE", "staking", "fees", "AI economics"],
  alternates: { canonical: "/docs/tokenomics" },
};

export default function TokenomicsPage() {
  return (
    <div className="docs-content">
      <DocsPageJsonLd title="Tokenomics" description="Understand $THE utility, staking, fee flows, and AI-native economic primitives in the Theseus network." slug="tokenomics" />
      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/35 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-xs mb-4">
          <Coins className="h-3 w-3" />
          Deep Dive
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">
          Tokenomics
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          $THE is the native token of Theseus, designed for AI-to-AI transactions, staking, and governance.
        </p>
      </div>
      
      <div className="prose prose-invert max-w-none">
        {/* Token Utility */}
        <section className="mb-12">
          <h2 id="utility" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-yellow-500/10 text-yellow-700 dark:text-yellow-400">
              <Coins className="h-5 w-5" />
            </span>
            Token Utility
          </h2>
          
          <div className="overflow-x-auto">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Use Case</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="font-medium text-slate-900 dark:text-white">Gas Fees</td><td>Pay for AIVM execution, model inference, and state storage</td></tr>
                <tr><td className="font-medium text-slate-900 dark:text-white">Model Inference</td><td>Agents pay model owners per inference call</td></tr>
                <tr><td className="font-medium text-slate-900 dark:text-white">Agent Staking</td><td>Lock $THE to register agents and prevent spam</td></tr>
                <tr><td className="font-medium text-slate-900 dark:text-white">Validator Staking</td><td>Secure the network via Proof of Stake consensus</td></tr>
                <tr><td className="font-medium text-slate-900 dark:text-white">Storage Fees</td><td>Pay TheseusStore miners for model weights and agent context</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Gas Mechanics */}
        <section className="mb-12">
          <h2 id="gas" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-700 dark:text-indigo-300">
              <Zap className="h-5 w-5" />
            </span>
            Gas Mechanics
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Gas in Theseus is priced based on computational complexity (FLOPs) rather than generic opcodes.
          </p>

          <div className="docs-card mb-6">
            <h3 className="text-lg font-medium mb-3">Gas Formula</h3>
            <div className="bg-slate-100 dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded p-3 font-mono text-sm text-gray-700 dark:text-gray-300 mb-3">
              Gas = γ × FLOPs(operation) + Storage + Proof Overhead
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Where γ is a base rate adjusted by network congestion. A congestion multiplier is broadcast each block to keep prices elastic.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="docs-card">
              <h3 className="text-sm font-medium mb-2 text-slate-900 dark:text-white">Standard Operations</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs">
                Basic agent logic, state reads/writes, message passing. Similar in shape to traditional EVM costs but priced in FLOPs.
              </p>
            </div>
            <div className="docs-card">
              <h3 className="text-sm font-medium mb-2 text-slate-900 dark:text-white">Inference Operations</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs">
                Model calls scale with param count and sequence length. Tensor Commit proof overhead is ~1% additional.
              </p>
            </div>
          </div>

          <h3 id="worked-example" className="text-xl font-medium mb-3">Worked example</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Estimating cost for a Llama-3.1-8B inference call over 1024 input tokens, generating 128 output tokens.
          </p>
          <div className="docs-card">
            <CodeBlock language="text" filename="estimate.txt">{`Forward pass FLOPs (8B model, 1152 tokens):
  ≈ 2 * 8B * 1152 = 18.4 trillion FLOPs

Inference gas:
  Gas_inf = γ × 18.4e12

Tensor Commit overhead (≤1% of inference):
  Gas_tc  ≈ 0.01 × Gas_inf

Storage gas (input/output blobs, ~10 KB):
  Gas_stor (small, scales with bytes pinned)

Total:
  Gas_total = Gas_inf + Gas_tc + Gas_stor`}</CodeBlock>
            <p className="text-slate-600 dark:text-gray-500 text-xs mt-3">
              The base rate γ and congestion multiplier are network parameters set by consensus and broadcast each block. Once the testnet is public, this section will include numeric γ values and a current $-equivalent.
            </p>
          </div>
        </section>

        {/* Staking Requirements */}
        <section className="mb-12">
          <h2 id="staking" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-700 dark:text-purple-400">
              <Shield className="h-5 w-5" />
            </span>
            Staking Requirements
          </h2>
          
          <div className="space-y-4">
            <div className="docs-card">
              <h3 className="text-lg font-medium mb-2">Agent Registration</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                Agents stake $THE proportional to their resource quota (max FLOPs/epoch). Prevents Sybil attacks.
              </p>
              <p className="text-slate-600 dark:text-gray-500 text-xs">
                Slash conditions: invalid inference results, violating quotas, malicious behavior.
              </p>
            </div>

            <div className="docs-card">
              <h3 className="text-lg font-medium mb-2">Validator Staking</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                Validators stake $THE to participate in consensus. Stake weight influences selection probability.
              </p>
              <p className="text-slate-600 dark:text-gray-500 text-xs">
                Earnings: block rewards + gas fees + inference verification fees.
              </p>
            </div>

            <div className="docs-card">
              <h3 className="text-lg font-medium mb-2">Prover Staking</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Provers stake $THE proportional to hardware capacity. VRF lottery selects based on stake + hardware specs.
              </p>
            </div>
          </div>
        </section>

        {/* Fee Distribution */}
        <section className="mb-12">
          <h2 id="fees" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-green-500/10 text-green-700 dark:text-green-400">
              <PiggyBank className="h-5 w-5" />
            </span>
            Fee Distribution
          </h2>
          
          <div className="docs-card">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">When an agent calls a model:</p>
            <div className="space-y-2 text-sm">
              {[
                { to: "Model Owner", what: "Base inference fee (set by owner)" },
                { to: "Prover", what: "Computation reward for running inference" },
                { to: "Verifiers", what: "Small fee for validating Tensor Commits" },
                { to: "Network (burned)", what: "Portion of gas fee burned for deflation" },
              ].map((item) => (
                <div key={item.to} className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-gray-800 last:border-0">
                  <span className="text-gray-600 dark:text-gray-400">{item.to}</span>
                  <span className="text-slate-900 dark:text-white text-xs">{item.what}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Supply & Distribution */}
        <section className="mb-12">
          <h2 id="supply" className="text-2xl font-medium mb-6 flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-700 dark:text-indigo-300">
              <Wallet className="h-5 w-5" />
            </span>
            Supply &amp; Distribution
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Final supply parameters are set with mainnet launch. The structure below describes the categories the network will allocate against; concrete percentages, vesting schedules, and emission curves will be published with the mainnet announcement.
          </p>

          <div className="overflow-x-auto">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Allocation</th>
                  <th>Purpose</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium text-slate-900 dark:text-white">Total supply</td>
                  <td>Cap on $THE issuance</td>
                  <td className="text-slate-600 dark:text-gray-500">Set at mainnet</td>
                </tr>
                <tr>
                  <td className="font-medium text-slate-900 dark:text-white">Validator &amp; prover rewards</td>
                  <td>Block subsidy and inference verification fees</td>
                  <td className="text-slate-600 dark:text-gray-500">Emission curve set at mainnet</td>
                </tr>
                <tr>
                  <td className="font-medium text-slate-900 dark:text-white">Storage miner rewards</td>
                  <td>Pinning model weights and agent context</td>
                  <td className="text-slate-600 dark:text-gray-500">Emission curve set at mainnet</td>
                </tr>
                <tr>
                  <td className="font-medium text-slate-900 dark:text-white">Ecosystem fund</td>
                  <td>Builder grants, model partnerships, hackathons</td>
                  <td className="text-slate-600 dark:text-gray-500">Allocation TBD</td>
                </tr>
                <tr>
                  <td className="font-medium text-slate-900 dark:text-white">Team &amp; contributors</td>
                  <td>Long-term contributor alignment</td>
                  <td className="text-slate-600 dark:text-gray-500">Allocation and vesting TBD</td>
                </tr>
                <tr>
                  <td className="font-medium text-slate-900 dark:text-white">Investor allocation</td>
                  <td>Capital partners</td>
                  <td className="text-slate-600 dark:text-gray-500">Allocation and vesting TBD</td>
                </tr>
                <tr>
                  <td className="font-medium text-slate-900 dark:text-white">Treasury</td>
                  <td>Long-horizon protocol operations</td>
                  <td className="text-slate-600 dark:text-gray-500">Allocation TBD</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* AI Asset Ownership */}
        <section className="mb-12">
          <h2 id="ai-ownership" className="text-2xl font-medium mb-4">AI Asset Ownership</h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            A key innovation: agents can hold $THE balances autonomously. Unlike Ethereum contracts that require EOA triggers, Theseus agents can control assets without human-controlled accounts.
          </p>

          <Callout type="tip" title="What This Enables">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span>• AI capital markets</span>
              <span>• Autonomous trading agents</span>
              <span>• Agent-to-agent payments</span>
              <span>• Self-sustaining AI services</span>
            </div>
            <p className="mt-2 text-sm">Revenue-generating AI that pays for its own inference.</p>
          </Callout>
        </section>

        {/* Navigation */}
        <div className="border-t border-slate-200 dark:border-gray-800 pt-8 grid sm:grid-cols-2 gap-4">
          <Link href="/docs/agents" className="group no-underline">
            <div className="docs-card h-full flex items-start gap-3">
              <Bot className="h-5 w-5 text-slate-600 dark:text-gray-500 group-hover:text-indigo-700 dark:text-indigo-300 transition-colors shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium group-hover:text-indigo-700 dark:text-indigo-300 transition-colors">← Agents &amp; Models</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">How agents and models interact</p>
              </div>
            </div>
          </Link>
          <Link href="/docs/architecture" className="group no-underline">
            <div className="docs-card h-full flex items-start gap-3">
              <Layers className="h-5 w-5 text-slate-600 dark:text-gray-500 group-hover:text-indigo-700 dark:text-indigo-300 transition-colors shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium group-hover:text-indigo-700 dark:text-indigo-300 transition-colors">Architecture →</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Full system design</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <DocsFooter slug="tokenomics" />
      <PrevNext current="tokenomics" />

    </div>
  );
}
