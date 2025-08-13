import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Disable streaming for static export to fix CSS loading
  experimental: {
    ppr: false,
  },
  // For GitHub Pages - use absolute paths
  basePath: '',
};

export default nextConfig;
