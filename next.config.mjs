/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
  },
  
  // Basic optimizations
  poweredByHeader: false,
  
  // Explicitly disable experimental features to prevent caching issues
  experimental: {
    // Empty object to override any cached experimental settings
  },
  
  // Force fresh build
  generateBuildId: async () => {
    return 'build-' + new Date().getTime()
  },
};

export default nextConfig;