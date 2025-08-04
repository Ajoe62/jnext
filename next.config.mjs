/** @type {import('next').NextConfig} */
const nextConfig = {
  // Minimal configuration to avoid any experimental features
  images: {
    formats: ["image/webp", "image/avif"],
  },
  // Basic optimizations only
  poweredByHeader: false,
};

export default nextConfig;
