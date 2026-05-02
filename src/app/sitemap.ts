import type { MetadataRoute } from "next";
import { credentialStore } from "@/lib/poa/store";

const BASE_URL = "https://theseus.network";

const LAST_MODIFIED = "2026-05-02";

type Route = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const ROUTES: Route[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/launch", priority: 0.9, changeFrequency: "weekly" },
  { path: "/playground", priority: 0.8, changeFrequency: "weekly" },
  { path: "/docs", priority: 0.9, changeFrequency: "weekly" },
  { path: "/docs/introduction", priority: 0.8, changeFrequency: "monthly" },
  { path: "/docs/quickstart", priority: 0.9, changeFrequency: "monthly" },
  { path: "/docs/architecture", priority: 0.8, changeFrequency: "monthly" },
  { path: "/docs/aivm", priority: 0.8, changeFrequency: "monthly" },
  { path: "/docs/tensor-commits", priority: 0.8, changeFrequency: "monthly" },
  { path: "/docs/agents", priority: 0.8, changeFrequency: "monthly" },
  { path: "/docs/ship", priority: 0.8, changeFrequency: "monthly" },
  { path: "/docs/examples", priority: 0.7, changeFrequency: "monthly" },
  { path: "/docs/comparison", priority: 0.7, changeFrequency: "monthly" },
  { path: "/docs/vs-ai-infra", priority: 0.7, changeFrequency: "monthly" },
  { path: "/docs/agentic-smart-contracts", priority: 0.7, changeFrequency: "monthly" },
  { path: "/docs/design-space", priority: 0.6, changeFrequency: "monthly" },
  { path: "/docs/tokenomics", priority: 0.7, changeFrequency: "monthly" },
  { path: "/docs/status", priority: 0.6, changeFrequency: "weekly" },
  { path: "/docs/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/docs/glossary", priority: 0.6, changeFrequency: "monthly" },
  // Proof of Agenthood
  { path: "/poa", priority: 0.9, changeFrequency: "weekly" },
  { path: "/poa/verify", priority: 0.8, changeFrequency: "weekly" },
  { path: "/poa/claim", priority: 0.7, changeFrequency: "weekly" },
  { path: "/poa/agents", priority: 0.8, changeFrequency: "daily" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = ROUTES.map(
    ({ path, priority, changeFrequency }) => ({
      url: `${BASE_URL}${path}`,
      lastModified: LAST_MODIFIED,
      changeFrequency,
      priority,
    }),
  );

  // Dynamic per-credential entries. Best effort: if the store is unreachable
  // the sitemap still ships with the static routes above. Capped so a runaway
  // credential count doesn't break sitemap generation.
  let dynamicEntries: MetadataRoute.Sitemap = [];
  try {
    const credentials = await credentialStore.listLatest(5000);
    dynamicEntries = credentials.map((c) => ({
      url: `${BASE_URL}/poa/${c.agentId}`,
      lastModified: new Date(c.issuedAt).toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch {
    // Store offline: skip dynamic entries this generation.
  }

  return [...staticEntries, ...dynamicEntries];
}
