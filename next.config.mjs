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
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
