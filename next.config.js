const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ });

module.exports = withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: { cpus: 2 },
});
