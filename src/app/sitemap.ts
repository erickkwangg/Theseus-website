import type { MetadataRoute } from "next";
import { listPosts } from "@/lib/blog";

const BASE_URL = "https://theseus.network";

const LAST_MODIFIED = "2026-04-29";

type Route = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const ROUTES: Route[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/launch", priority: 0.9, changeFrequency: "weekly" },
  { path: "/playground", priority: 0.8, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.9, changeFrequency: "weekly" },
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
  { path: "/docs/reference", priority: 0.7, changeFrequency: "monthly" },
  { path: "/docs/tokenomics", priority: 0.7, changeFrequency: "monthly" },
  { path: "/docs/status", priority: 0.6, changeFrequency: "weekly" },
  { path: "/docs/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/docs/glossary", priority: 0.6, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = ROUTES.map(
    ({ path, priority, changeFrequency }) => ({
      url: `${BASE_URL}${path}`,
      lastModified: LAST_MODIFIED,
      changeFrequency,
      priority,
    }),
  );

  // Each markdown post in /content/blog is its own canonical URL on
  // theseus.network. Listing them here lets Google see the new home for posts
  // that were originally published on Substack (with substack canonical URLs
  // set to point back here, the substack copies become non-canonical).
  const blogEntries: MetadataRoute.Sitemap = listPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...blogEntries];
}
