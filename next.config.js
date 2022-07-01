/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    styledComponents: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: ["reststop.randomhouse.com"],
  },
};

module.exports = nextConfig;
