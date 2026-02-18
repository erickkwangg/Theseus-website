// Centralized external links - update in one place
export const EXTERNAL_LINKS = {
  github: "https://github.com/Theseuschain/theseuschain",
  whitepaper: "https://docsend.com/view/p9fw7vh3ygrrnwgg",
  substack: "https://theseuschain.substack.com",
  substackEvolution: "https://theseuschain.substack.com/p/the-theseus-thesis-part-1",
  substackTAM: "https://theseuschain.substack.com/p/the-theseus-thesis-part-2-tam-of",
  conwayTech: "https://conway.tech",
  web4ai: "https://web4.ai",
} as const;

// Navigation items shared between Header and Footer
export const NAV_ITEMS = [
  { href: "/", label: "Home", internal: true },
  { href: "#about", label: "About", internal: true },
  { href: "#market", label: "Use Cases", internal: true },
  { href: "/docs", label: "Docs", internal: true },
  { href: EXTERNAL_LINKS.substack, label: "Blog", internal: false },
  { href: EXTERNAL_LINKS.github, label: "GitHub", internal: false, icon: "github" },
] as const;




