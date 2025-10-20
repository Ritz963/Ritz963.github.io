/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: { unoptimized: true }, // GH Pages has no Next image optimizer
  };
  module.exports = nextConfig;
  