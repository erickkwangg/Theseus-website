import Link from "next/link";
import type { Metadata } from "next";
import { Vote, Shield, Activity } from "lucide-react";
import Callout from "@/components/docs/Callout";
import { DocsPageJsonLd } from "@/components/JsonLd";
import PrevNext from "@/components/docs/PrevNext";

export const metadata: Metadata = {
  title: "Governance",
  description:
    "Validator-based governance on Theseus: forkless runtime upgrades, proposal flow with grace period, vote delegation, and the scope of changes governance can enact.",
  keywords: [
    "Theseus governance",
    "forkless runtime upgrade",
    "validator vote",
    "vote delegation",
    "set_code",
    "proposal flow",
  ],
  alternates: { canonical: "/docs/governance" },
};

export default function GovernancePage() {
  return (
    <div className="docs-content">
      <DocsPageJsonLd
        title="Governance"
        description="Validator-based governance on Theseus: forkless runtime upgrades, proposal flow with grace period, vote delegation, and scope."
        slug="governance"
      />

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/35 bg-indigo-500/10 text-indigo-300 text-xs mb-4">
          <Vote className="h-3 w-3" />
          Network
        </div>
        <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-tight">
          Governance
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          How the chain evolves: who can propose changes, how decisions are
          made, and how upgrades land without a hard fork.
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="tip" title="In one paragraph">
          Theseus governance is validator-based and designed for
          operational speed — ship upgrades quickly, respond to issues,
          preserve decentralization through delegation and transparent
          proposals. Once a proposal passes, the new runtime is enacted in
          the next block. No hard forks, no validator binary updates, no
          coordination calls.
        </Callout>
        <ul className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-1.5 mb-10 ml-5 list-disc">
          <li>
            <strong>Forkless upgrades</strong>: the runtime (compiled to
            Wasm) is replaced on-chain via <code>set_code</code>. Validators
            don&rsquo;t need to download new binaries.
          </li>
          <li>
            <strong>Grace period + delegation</strong>: every proposal has a
            12&ndash;24h grace window for direct votes; un-voted validators
            fall back to their designated delegate.
          </li>
          <li>
            <strong>Bounded scope at alpha</strong>: runtime upgrades,
            prover-set changes, validator-set changes. No token-weighted
            voting yet.
          </li>
          <li>
            <strong>Replaces the sudo model</strong>: no single key has
            unilateral authority once governance is enabled.
          </li>
        </ul>

        {/* Forkless upgrades */}
        <section className="mb-12">
          <h2 id="forkless-upgrades" className="text-2xl font-medium mb-4">
            Forkless runtime upgrades
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            One of Substrate&rsquo;s most powerful features: the
            chain&rsquo;s logic, compiled to Wasm, can be replaced on-chain
            via the <code>set_code</code> mechanism — without requiring
            validators to download new binaries or coordinate a hard fork.
            Theseus leverages this so upgrades are fully automatic. Once a
            proposal passes, the new runtime is enacted in the next block.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            The mechanic is the same one that lets the chain ship a new
            pallet, change a parameter, or fix a bug at the runtime layer:
            you don&rsquo;t coordinate a node-software release, you ship
            Wasm.
          </p>
        </section>

        {/* Proposal flow */}
        <section className="mb-12">
          <h2 id="proposal-flow" className="text-2xl font-medium mb-6">
            Proposal flow
          </h2>
          <ol className="space-y-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed list-decimal ml-6">
            <li>
              <strong>Submit</strong>: a proposal is submitted on-chain
              with the new runtime Wasm or the parameter change.
            </li>
            <li>
              <strong>Open + grace window</strong>: validators have 12&ndash;24
              hours to inspect the upgrade and vote directly. No outcome is
              tallied during the grace window.
            </li>
            <li>
              <strong>Delegated vote (after grace)</strong>: any validator
              that hasn&rsquo;t voted directly falls back to their
              designated delegate&rsquo;s vote (if any). If neither has
              voted, no vote is cast for that validator.
            </li>
            <li>
              <strong>Tally</strong>: votes are counted. Majority yes
              auto-enacts in the next block. Majority no rejects the
              proposal.
            </li>
            <li>
              <strong>Enactment</strong>: the new runtime takes effect
              automatically; state is preserved.
            </li>
          </ol>
        </section>

        {/* Vote delegation */}
        <section className="mb-12">
          <h2 id="delegation" className="text-2xl font-medium mb-4">
            Vote delegation
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            With only four validators at alpha, governance has to stay
            responsive — a single offline or slow validator shouldn&rsquo;t
            block a critical upgrade. Delegation handles that without
            removing the validator&rsquo;s right to override.
          </p>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            <li>
              Each validator can designate another validator as their
              delegate.
            </li>
            <li>
              On every proposal, the delegate&rsquo;s vote is{" "}
              <em>only</em> applied after the grace period and only if the
              delegating validator hasn&rsquo;t voted directly.
            </li>
            <li>
              The delegating validator can override at any point inside the
              grace window by voting directly.
            </li>
          </ul>
          <Callout type="info" title="Default behavior in practice">
            If three validators trust the Theseus operator&rsquo;s judgment
            on routine upgrades, they can delegate to it and only vote
            actively when they want to inspect or reject something. Each
            still keeps a unilateral override.
          </Callout>
        </section>

        {/* Scope */}
        <section className="mb-12">
          <h2 id="scope" className="text-2xl font-medium mb-4">
            Scope at alpha
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            Governance covers three categories of changes today:
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              {
                title: "Runtime upgrades",
                desc: "New pallets, logic changes, parameter updates.",
              },
              {
                title: "Prover set",
                desc: "Adding or removing provers from the registered set.",
              },
              {
                title: "Validator set",
                desc: "Adding or removing validators.",
              },
            ].map((item) => (
              <div key={item.title} className="docs-card">
                <h3 className="text-sm font-medium mb-1.5 text-slate-900 dark:text-slate-100">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-6 leading-relaxed">
            This replaces the initial <code>sudo</code> model — a single
            admin key with unilateral authority — with a multi-party system
            where no single entity can push through changes alone.
          </p>
        </section>

        {/* Future */}
        <section className="mb-12">
          <h2 id="future" className="text-2xl font-medium mb-4">
            Where this goes
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            <strong>Beta</strong> expands the validator set and introduces{" "}
            <code>$THE</code>-weighted voting for certain proposal types,
            backed by validator and prover staking.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            <strong>Mainnet</strong> targets full token-weighted governance
            with community participation and longer deliberation periods
            for major changes. The validator-only mechanic at alpha is
            scaffolding — the path to community governance is the same
            forkless mechanism, with a wider electorate.
          </p>
        </section>

        {/* Navigation */}
        <div className="border-t border-slate-200 dark:border-gray-800 pt-8 grid sm:grid-cols-2 gap-4">
          <Link href="/docs/security" className="group no-underline">
            <div className="docs-card h-full flex items-start gap-3">
              <Shield className="h-5 w-5 text-gray-500 group-hover:text-indigo-300 transition-colors shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium group-hover:text-indigo-300 transition-colors">
                  ← Security
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  The trust scope governance shrinks.
                </p>
              </div>
            </div>
          </Link>
          <Link href="/docs/status" className="group no-underline">
            <div className="docs-card h-full flex items-start gap-3">
              <Activity className="h-5 w-5 text-gray-500 group-hover:text-indigo-300 transition-colors shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium group-hover:text-indigo-300 transition-colors">
                  Status &amp; Roadmap →
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  The phase plan governance ships against.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <PrevNext current="governance" />
    </div>
  );
}
