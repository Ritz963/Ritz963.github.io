// next.config.js
const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
    options: {
      // add remark/rehype plugins here if you use them
    },
  });
  
  module.exports = withMDX({
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    output: 'export',
    images: { unoptimized: true }, // GitHub Pages has no image optimizer
  });
  