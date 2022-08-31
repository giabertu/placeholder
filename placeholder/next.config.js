/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  rules: {
    "react/no-unescaped-entities": "off",
  }
}

module.exports = nextConfig
