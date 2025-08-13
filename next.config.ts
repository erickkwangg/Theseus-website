import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Ensure static assets and chunks are referenced relatively for GitHub Pages
  assetPrefix: './',
};

export default nextConfig;
