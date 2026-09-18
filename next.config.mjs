/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  reactStrictMode: true,
  basePath: '/new-portfolio-website',
  assetPrefix: '/new-portfolio-website/',
};

export default nextConfig;
