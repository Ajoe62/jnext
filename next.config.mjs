import nextBundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 31536000,
  },
  poweredByHeader: false,
  compress: true,
  // Ensure proper chunk loading
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups = {
        default: false,
        vendors: false,
        // vendor chunk
        vendor: {
          chunks: "all",
          test: /node_modules/,
          name: "vendor",
        },
      };
    }
    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
