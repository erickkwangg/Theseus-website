// Centralized external links - update in one place
export const EXTERNAL_LINKS = {
  github: "https://github.com/ob-theseus/theseuschain",
  whitepaper: "https://docsend.com/view/p9fw7vh3ygrrnwgg",
  substack: "https://theseuschain.substack.com",
  substackEvolution: "https://theseuschain.substack.com/p/agents-as-an-evolution-of-smart-contracts",
  substackTAM: "https://theseuschain.substack.com/p/the-theseus-thesis-part-2-tam-of",
} as const;

// Navigation items shared between Header and Footer
export const NAV_ITEMS = [
  { href: "/", label: "HOME", internal: true },
  { href: "#about", label: "ABOUT", internal: true },
  { href: "#market", label: "MARKET", internal: true },
  { href: "/docs", label: "DOCS", internal: true },
  { href: EXTERNAL_LINKS.substack, label: "BLOG", internal: false },
  { href: EXTERNAL_LINKS.github, label: "GITHUB", internal: false, icon: "github" },
] as const;

