/** @type {import('next').NextConfig} */
const nextConfig = {
  // Temporarily disable static optimization to bypass the error
  output: 'standalone',
  trailingSlash: false,
  generateStaticParams: false,
};

export default nextConfig;