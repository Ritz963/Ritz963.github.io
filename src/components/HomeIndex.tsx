'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { experience } from '@/lib/experience';
import { projects } from '@/lib/projects';

const tabs = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' },
] as const;
type Tab = (typeof tabs)[number]['id'];

// Older links into the previous long-scroll page still land on the right tab.
const hashToTab: Record<string, Tab> = {
  work: 'work', 'my-work': 'work',
  experience: 'experience', 'work-experience': 'experience',
  about: 'about', 'about-me': 'about', skills: 'about', contact: 'about',
};

// The first entry in `experience` is education, which lives in About.
const jobs = experience.slice(1).map(({ title, date, description }) => {
  const [role, company] = title.split(' — ');
  return { role, company, date, description };
});

export default function HomeIndex() {
  const [tab, setTab] = useState<Tab>('work');
  const [hovered, setHovered] = useState(-1);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [pointerInList, setPointerInList] = useState(false);
  // Collapsed by default so the hidden panel never makes the one-screen layout taller.
  const [open, setOpen] = useState(-1);
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  useEffect(() => {
    const sync = () => {
      const next = hashToTab[window.location.hash.slice(1)];
      if (next) setTab(next);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const select = (next: Tab) => {
    setTab(next);
    setHovered(-1);
    window.history.replaceState(null, '', next === 'work' ? window.location.pathname : `#${next}`);
  };

  // Position the preview by writing CSS variables directly, so pointer movement never re-renders React.
  const place = (event: React.MouseEvent, instant: boolean) => {
    const list = listRef.current;
    const card = previewRef.current;
    if (!list || !card) return;
    const box = list.getBoundingClientRect();
    const x = Math.min(Math.max(event.clientX - box.left + 28, 0), box.width - card.offsetWidth);
    const y = Math.min(Math.max(event.clientY - box.top - card.offsetHeight / 2, -24), box.height - card.offsetHeight + 24);
    if (instant) card.style.transition = 'none';
    card.style.setProperty('--x', `${Math.round(x)}px`);
    card.style.setProperty('--y', `${Math.round(y)}px`);
    if (instant) {
      void card.offsetWidth;
      card.style.transition = '';
    }
  };

  const panelClass = (id: Tab) => `home-panel${tab === id ? ' is-active' : ''}`;
  const preview = projects[hovered >= 0 ? hovered : previewIndex];
  const tabIndex = tabs.findIndex((item) => item.id === tab);

  return (
    <div className="home-right">
      <div className="segmented" role="group" aria-label="Sections">
        <span className="segmented-pill" style={{ transform: `translateX(${tabIndex * 100}%)` }} aria-hidden="true" />
        {tabs.map((item) => (
          <button key={item.id} type="button" className={tab === item.id ? 'is-active' : undefined} aria-pressed={tab === item.id} onClick={() => select(item.id)}>
            {item.label}
          </button>
        ))}
      </div>

      <div className="home-panels">
        <section className={panelClass('work')} aria-label="Projects">
          <div
            ref={listRef}
            className="project-list"
            onMouseMove={(event) => place(event, false)}
            onMouseEnter={(event) => { place(event, true); setPointerInList(true); }}
            onMouseLeave={() => { setPointerInList(false); setHovered(-1); }}
          >
            {projects.map((project, index) => (
              <Link
                key={project.href}
                href={project.href}
                className={`project-row${hovered === -1 ? '' : hovered === index ? ' is-hot' : ' is-dim'}`}
                onMouseEnter={() => { setHovered(index); setPreviewIndex(index); }}
                onFocus={() => setHovered(index)}
                onBlur={() => setHovered(-1)}
              >
                <span className="project-num">{String(index + 1).padStart(2, '0')}</span>
                <span className="project-body">
                  <span className="project-title">{project.title}</span>
                  <span className="project-desc">{project.description}</span>
                </span>
                <span className="project-tag">{project.tag}</span>
              </Link>
            ))}
            <div
              ref={previewRef}
              className={`project-preview${pointerInList && hovered >= 0 ? ' is-visible' : ''}`}
              style={{ backgroundColor: preview.tone }}
              aria-hidden="true"
            >
              <span className="preview-tech">{preview.tech}</span>
              <span>
                <span className="preview-metric">{preview.metric}</span>
                <span className="preview-label">{preview.metricLabel}</span>
              </span>
            </div>
          </div>
        </section>

        <section className={panelClass('experience')} aria-label="Experience">
          {jobs.map((job, index) => {
            const isOpen = open === index;
            const panelId = `${baseId}-job-${index}`;
            return (
              <div key={job.company + job.date} className={`job${isOpen ? ' is-open' : ''}`}>
                <h3 className="job-heading">
                  <button type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpen(isOpen ? -1 : index)}>
                    <span>
                      <span className="job-company">{job.company}</span>
                      <span className="job-role">{job.role}</span>
                    </span>
                    <span className="job-date">{job.date}</span>
                    <span className="job-toggle" aria-hidden="true" />
                  </button>
                </h3>
                <div id={panelId} className="job-drawer">
                  <div>
                    <ul>{job.description.map((line) => <li key={line}>{line}</li>)}</ul>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <section className={panelClass('about')} aria-label="About">
          <div className="about-grid">
            <div>
              <h2 className="about-label">Education</h2>
              <h3 className="about-school">Cornell University</h3>
              <p>Master of Engineering, Computer Science<br />Expected May 2027 · Merit Scholar</p>
              <h3 className="about-school">University of Maryland, College Park</h3>
              <p>B.S. Computer Science · Mathematics double major<br />May 2026 · GPA 3.76 / 4.00</p>
              <p className="about-note">Algorithms, Computer Systems, Machine Learning, Computer Vision, Data Science.</p>
            </div>
            <div>
              <h2 className="about-label">Skills</h2>
              <dl className="about-skills">
                <dt>Languages</dt><dd>Python, C, C++, Java, JavaScript, R, HTML/CSS, MIPS</dd>
                <dt>Frameworks &amp; platforms</dt><dd>React, Node.js, Express, Firebase, AWS, Docker, Apache NiFi, Git, GitHub, Jira</dd>
                <dt>Data &amp; ML</dt><dd>PyTorch, OpenCV, Pandas, NumPy, Matplotlib, GMM/EM, image segmentation</dd>
                <dt>Spoken</dt><dd>English (native) · Hindi (intermediate) · Mandarin (novice)</dd>
              </dl>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
