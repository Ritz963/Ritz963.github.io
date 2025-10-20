import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  // You can map custom MDX tags to React components here if needed.
  return { ...components };
}