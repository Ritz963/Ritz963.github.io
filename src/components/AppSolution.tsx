export default function AppSolution({ href, children }: { image?: string; href: string; children: React.ReactNode }) {
  return <div>{children}{href && href !== '#' && <p><a className="source-link" href={href}>{href.includes('github.com') ? 'View source on GitHub' : 'View project on Devpost'} ↗</a></p>}</div>;
}
