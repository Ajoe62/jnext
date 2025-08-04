/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force fresh build - remove after successful deployment
  generateBuildId: async () => 'build-' + Date.now(),
  
  images: {
    formats: ["image/webp", "image/avif"],
  },
  poweredByHeader: false,
};

export default nextConfig;