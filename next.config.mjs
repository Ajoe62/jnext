/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 31536000,
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "react-icons"],
  },
  // Enable aggressive caching
  poweredByHeader: false,
  generateEtags: false,
  compress: true,
};

export default nextConfig;
