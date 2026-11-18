import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

export default function CaseStudy({ title, description, image, children }: { title: string; description: string; image?: StaticImageData; children: React.ReactNode }) {
  return <div className="site-shell">
    <header className="site-header"><Link className="wordmark" href="/">Ritvik Thakur</Link><nav aria-label="Main navigation"><Link href="/">Work</Link><Link href="/#experience">Experience</Link><Link href="/#about">About</Link></nav></header>
    <article className="case-study"><Link className="back-link" href="/">← All projects</Link><header className="case-header"><h1>{title}</h1><p>{description}</p>{image && <Image className="project-image" src={image} alt={`${title} project screenshot`} sizes="(max-width: 920px) 90vw, 840px" priority />}</header>{children}</article>
    <footer className="site-footer"><span>© {new Date().getFullYear()} Ritvik Thakur</span></footer>
  </div>;
}
