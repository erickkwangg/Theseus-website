import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: ["OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot"],
        allow: "/",
      },
      {
        userAgent: [
          "GPTBot",
          "Google-Extended",
          "CCBot",
          "Bytespider",
          "Applebot-Extended",
          "meta-externalagent",
          "Amazonbot",
          "cohere-ai",
          "Diffbot",
        ],
        disallow: "/",
      },
    ],
    sitemap: "https://theseus.network/sitemap.xml",
  };
}
