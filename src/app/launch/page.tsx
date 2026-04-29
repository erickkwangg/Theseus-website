import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Mail, MessageCircle, Rocket, Terminal, Bot, BookOpen, Lock } from "lucide-react";
import Header from "@/components/Pages/Home/Header";
import Footer from "@/components/Pages/Home/Footer";
import { Button } from "@/components/ui/button";
import { EXTERNAL_LINKS } from "@/config/links";

export const metadata: Metadata = {
  title: "Launch on Theseus",
  description:
    "Build agents on the Theseus runtime. Request preview access, install the CLI, and deploy your first verifiable agent.",
  keywords: ["Theseus launch", "Theseus CLI", "preview access", "deploy agent", "verifiable AI"],
  alternates: { canonical: "/launch" },
  openGraph: {
    type: "website",
    title: "Launch on Theseus",
    description:
      "Build agents on the Theseus runtime. Request preview access, install the CLI, and deploy your first verifiable agent.",
    url: "/launch",
  },
};

const accessHref = `mailto:${EXTERNAL_LINKS.contactEmail}?subject=${encodeURIComponent(
  "Theseus preview access request"
)}&body=${encodeURIComponent(
  "Hi Theseus team,\n\nI'd like preview access to deploy agents on Theseus. A bit about what I'm building:\n\n"
)}`;

const steps = [
  {
    number: "1",
    icon: Mail,
    title: "Request preview access",
    description:
      "Tell us what you want to build. We'll send you the CLI binary and a testnet endpoint.",
  },
  {
    number: "2",
    icon: Terminal,
    title: "Install the CLI",
    description:
      "A single-binary install. No source build, no Rust toolchain. Connects to the Theseus testnet out of the box.",
  },
  {
    number: "3",
    icon: Bot,
    title: "Deploy your first agent",
    description:
      "Write a SHIP file, run one CLI command, watch it execute with a verifiable inference proof.",
  },
];

export default function LaunchPage() {
  return (
    <main className="min-h-screen site-shell text-white">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 soft-grid opacity-15 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/35 bg-indigo-500/10 text-indigo-300 text-xs mb-6">
            <Rocket className="h-3 w-3" />
            Developer Preview
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 tracking-tight leading-tight">
            Launch on <span className="hero-title-gradient">Theseus</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Build agents that own assets, run inference verifiably, and persist on a Layer-1 runtime.
            Preview access is open by request.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={accessHref}>
              <Button className="primary-cta px-8 py-6 text-base font-medium rounded-md transition-all duration-300 button-press">
                Request Preview Access
              </Button>
            </a>
            <Link href="/docs/quickstart">
              <Button className="ghost-cta px-8 py-6 text-base font-medium rounded-md transition-all duration-300">
                See What You Will Build
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Status */}
      <section className="py-12 px-6 border-t border-slate-800/70">
        <div className="max-w-4xl mx-auto">
          <div className="docs-card border-indigo-900/50 flex flex-col md:flex-row items-start gap-4">
            <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-300 shrink-0">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Where things stand</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-2">
                The Theseus runtime is in private preview. The source repository is currently
                closed while the protocol stabilizes, but the network is live for invited
                developers and the path to deploy a real agent is the same one it will be at
                public launch.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                If you are evaluating Theseus for a project, request access below and tell us
                what you are building. We respond to every request.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three steps */}
      <section className="py-20 lg:py-24 px-6 border-t border-slate-800/70">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-300/90 text-xs uppercase tracking-widest mb-4">
              From request to running agent
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4">
              Three steps to your first agent
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="group rounded-xl border border-gray-800 p-8
                             bg-gradient-to-br from-slate-900/90 via-slate-950/80 to-slate-950
                             hover:border-indigo-400/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-indigo-500/15 text-indigo-300 text-sm font-medium border border-indigo-500/30">
                      {step.number}
                    </span>
                    <Icon className="h-5 w-5 text-slate-500 group-hover:text-indigo-300 transition-colors" />
                  </div>
                  <h3 className="text-xl font-medium mb-3">{step.title}</h3>
                  <p className="text-slate-300/90 text-sm leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <a href={accessHref}>
              <Button className="primary-cta px-8 py-5 text-base font-medium rounded-md">
                Request Preview Access
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Read while you wait */}
      <section className="py-20 lg:py-24 px-6 border-t border-slate-800/70 grid-bg">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-4">
              Read first
            </h2>
            <p className="text-slate-400 text-base max-w-2xl mx-auto">
              The fastest way to evaluate Theseus is to read what the runtime actually is and
              what kind of agent it lets you build.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/docs/introduction",
                icon: BookOpen,
                title: "Introduction",
                desc: "What Theseus is and the three tiers of agency it supports.",
              },
              {
                href: "/docs/agentic-smart-contracts",
                icon: Rocket,
                title: "Agentic Smart Contracts",
                desc: "Why agents are the next runtime primitive, not a separate technology.",
              },
              {
                href: "/docs/quickstart",
                icon: Terminal,
                title: "Quickstart",
                desc: "The step-by-step you will run once preview access is in your hands.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="group no-underline">
                  <div className="docs-card h-full flex flex-col gap-3 hover:border-indigo-400/40 transition-all duration-300">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-300 w-fit">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-medium text-white group-hover:text-indigo-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                    <span className="text-xs text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 mt-auto">
                      Read <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="py-20 lg:py-24 px-6 border-t border-slate-800/70">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-4">Talk to us</h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto mb-10">
            Have a question, a use case to validate, or a partnership in mind? The fastest path
            is email.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <a
              href={`mailto:${EXTERNAL_LINKS.contactEmail}`}
              className="docs-card flex items-center gap-4 hover:border-indigo-400/40 transition-all duration-300"
            >
              <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-300">
                <Mail className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-white">Email us</h3>
                <p className="text-sm text-slate-400">{EXTERNAL_LINKS.contactEmail}</p>
              </div>
            </a>

            {EXTERNAL_LINKS.discord ? (
              <a
                href={EXTERNAL_LINKS.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="docs-card flex items-center gap-4 hover:border-indigo-400/40 transition-all duration-300"
              >
                <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-300">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-white">Join the Discord</h3>
                  <p className="text-sm text-slate-400">Builders and contributors</p>
                </div>
              </a>
            ) : (
              <div className="docs-card flex items-center gap-4 opacity-70">
                <div className="p-2.5 rounded-lg bg-slate-800 text-slate-500">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-slate-300">Discord</h3>
                  <p className="text-sm text-slate-500">Opening soon</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
