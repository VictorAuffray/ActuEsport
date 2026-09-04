/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Plain <img> is used across the app instead of next/image, on purpose:
    // article photos come from whatever source the scraper just discovered,
    // so a fixed remotePatterns allow-list would break every time a new
    // outlet is added. See components/ArticleCard.js.
  }
};

export default nextConfig;
