/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 31536000,
  },
  experimental: {
    // Explicitly disable CSS optimization to prevent critters requirement
    optimizeCss: false,
  },
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
