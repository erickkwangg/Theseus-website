import {
  Rocket,
  BookOpen,
  Zap,
  Cpu,
  GitBranch,
  Bot,
  Layers,
  Code2,
  Puzzle,
  GitCompare,
  Lightbulb,
  Coins,
  List,
  Sparkles,
  HelpCircle,
  Activity,
  Network,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type DocsSection = {
  title: string;
  items: { href: string; label: string; icon: LucideIcon }[];
};

export const DOCS_SECTIONS: DocsSection[] = [
  {
    title: "Start Here",
    items: [
      { href: "/docs", label: "Overview", icon: BookOpen },
      { href: "/docs/introduction", label: "Introduction", icon: Rocket },
      { href: "/docs/faq", label: "FAQ", icon: HelpCircle },
    ],
  },
  {
    title: "Why Theseus",
    items: [
      { href: "/docs/comparison", label: "Theseus vs Ethereum", icon: GitCompare },
      { href: "/docs/agentic-smart-contracts", label: "Agentic Smart Contracts", icon: Sparkles },
      { href: "/docs/vs-ai-infra", label: "vs AI Infra Peers", icon: Network },
      { href: "/docs/design-space", label: "Design Space", icon: Lightbulb },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { href: "/docs/aivm", label: "AIVM", icon: Cpu },
      { href: "/docs/tensor-commits", label: "Tensor Commits", icon: GitBranch },
      { href: "/docs/agents", label: "Agents", icon: Bot },
      { href: "/docs/architecture", label: "Architecture", icon: Layers },
    ],
  },
  {
    title: "Build",
    items: [
      { href: "/docs/ship", label: "SHIP Language", icon: Code2 },
      { href: "/docs/examples", label: "Examples", icon: Puzzle },
      { href: "/docs/quickstart", label: "Quick Start", icon: Zap },
    ],
  },
  {
    title: "Reference",
    items: [
      { href: "/docs/reference", label: "Runtime reference", icon: BookOpen },
      { href: "/docs/tokenomics", label: "Tokenomics", icon: Coins },
      { href: "/docs/glossary", label: "Glossary", icon: List },
    ],
  },
  {
    title: "Network",
    items: [
      { href: "/docs/status", label: "Status & Roadmap", icon: Activity },
    ],
  },
];
