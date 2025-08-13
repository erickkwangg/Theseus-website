import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Disable streaming and force static generation for GitHub Pages
  experimental: {
    ppr: false,
  },
  // Use absolute paths for GitHub Pages
  basePath: '',
};

export default nextConfig;
