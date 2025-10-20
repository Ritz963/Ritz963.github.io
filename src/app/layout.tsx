import { ActivityBar, BottomBar, TabsContainer, TopBar } from '@/components';
import NavigationChange from '@/components/NavigationChange';
import TogglePortfolio from '@/components/TogglePortfolio';
import { loadApps, loadLeetcode } from '@/lib/mdx';
import { Providers } from '@/lib/providers';
import { type Section } from '@/lib/redux/slices/sectionSlice/sectionSlice';
import { Analytics } from '@vercel/analytics/react';
import glob from 'fast-glob';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ritvik Thakur Portfolio',
  description: 'Ritvik Thakur Portfolio',
  openGraph: {
    title: 'Ritvik Thakur — Software Engineer',
    description: 'Software Engineer · CS + Math @ UMD. Building full-stack and AI/ML projects.',
    url: 'https://ritz963.github.io',
    siteName: 'Ritvik Thakur Portfolio',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Ritvik Thakur — Software Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ritvik Thakur — Software Engineer',
    description: 'Software Engineer · CS + Math @ UMD. Building full-stack and AI/ML projects.',
    images: ['/og.png'],
  },
  alternates: {
    canonical: 'https://ritz963.github.io',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const mdxPages = await glob('**/*.mdx', { cwd: 'src/app' });
  const mdxSectionEntries = (await Promise.all(mdxPages.map(async (filename) => ['/' + filename.replace(/(^|\/)page\.mdx$/, ''), (await import(`./${filename}`)).sections]))) as Array<
    [string, Section[]]
  >;
  const tsxPages = await glob('**/page.tsx', { cwd: 'src/app' });
  const tsxSectionEntries = (await Promise.all(tsxPages.map(async (filename) => ['/' + filename.replace(/(^|\/)page\.tsx$/, ''), (await import(`./${filename}`)).sections]))) as Array<
    [string, Section[]]
  >;

  const allSections = Object.fromEntries([...mdxSectionEntries, ...tsxSectionEntries]);

  const allApps = await loadApps();
  const allLeetcode = await loadLeetcode();

  return (
    <Providers>
      <html lang="en">
        <body className="bg-dark_bg min-h-screen max-h-screen flex flex-col scroll-smooth">
          <Toaster />
          <TopBar />
          <main className="flex-1 flex overflow-hidden relative">
            <ActivityBar sections={allSections} allApps={allApps} allLeetcode={allLeetcode} />
            <div className="flex w-full flex-col overflow-hidden">
              <TabsContainer /> {children}
            </div>
          </main>
          <BottomBar />
          <TogglePortfolio />
          <NavigationChange allPaths={[...allApps, ...allLeetcode]} />
          <Analytics />
        </body>
      </html>
    </Providers>
  );
}
