import type { MetadataRoute } from "next";

const BASE_URL = "https://theseus.network";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/launch",
    "/playground",
    "/docs",
    "/docs/introduction",
    "/docs/faq",
    "/docs/quickstart",
    "/docs/aivm",
    "/docs/tensor-commits",
    "/docs/agents",
    "/docs/architecture",
    "/docs/ship",
    "/docs/examples",
    "/docs/comparison",
    "/docs/vs-ai-infra",
    "/docs/agentic-smart-contracts",
    "/docs/design-space",
    "/docs/reference",
    "/docs/tokenomics",
    "/docs/status",
    "/docs/glossary",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route.startsWith("/docs") ? "weekly" : "daily",
    priority: route === "" ? 1 : 0.7,
  }));
}
