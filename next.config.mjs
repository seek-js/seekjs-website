import { createMDX } from "fumadocs-mdx/next";

/** @type {import('next').NextConfig} */
const config = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Disable Next.js telemetry for CI
  telemetry: false,
};

const withMDX = createMDX({
  configPath: "./.source/config.ts",
});

// Add .nojekyll to prevent Jekyll processing
const nextConfig = withMDX(config);

export default nextConfig;
