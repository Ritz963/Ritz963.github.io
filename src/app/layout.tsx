import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ritz963.github.io'),
  title: { default: 'Ritvik Thakur — Software Engineer', template: '%s · Ritvik Thakur' },
  description: 'Software engineer and CS + Math student at UMD. Full-stack development, cybersecurity automation, and computer vision.',
  openGraph: { title: 'Ritvik Thakur — Software Engineer', description: 'Full-stack development, cybersecurity automation, and computer vision.', url: 'https://ritz963.github.io', siteName: 'Ritvik Thakur', locale: 'en_US', type: 'website' },
  twitter: { card: 'summary', title: 'Ritvik Thakur — Software Engineer' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="site-shell">
      <header className="site-header"><Link className="wordmark" href="/">Ritvik Thakur</Link><nav aria-label="Main navigation"><Link href="/#my-work">Projects</Link><Link href="/#work-experience">Experience</Link><Link href="/#contact">Contact</Link></nav></header>
      <main id="main">{children}</main>
      <footer className="site-footer"><span>© {new Date().getFullYear()} Ritvik Thakur</span><Link href="/leetcode/two-pointers/">Notes ↗</Link></footer>
    </div>
  </body></html>;
}
