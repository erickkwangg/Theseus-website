import type { MetadataRoute } from "next";

const BASE_URL = "https://theseuschain.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/docs",
    "/docs/introduction",
    "/docs/quickstart",
    "/docs/aivm",
    "/docs/tensor-commits",
    "/docs/agents",
    "/docs/architecture",
    "/docs/ship",
    "/docs/examples",
    "/docs/comparison",
    "/docs/design-space",
    "/docs/tokenomics",
    "/docs/glossary",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route.startsWith("/docs") ? "weekly" : "daily",
    priority: route === "" ? 1 : 0.7,
  }));
}
