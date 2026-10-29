import Link from 'next/link';
import DotSculpture from '@/components/DotSculpture';
import ExperienceEntry from '@/components/ExperienceEntry';
import { experience } from '@/lib/experience';

const projects = [
  { title: 'LLM Serving & Evaluation Platform', href: '/apps/llm-serving-evaluation/', description: 'Multi-model inference serving and evaluation, with 35% lower p95 latency and 1.6× throughput.', tech: 'Python · FastAPI · PyTorch · Docker · vLLM · React' },
  { title: 'Digital Closet App', href: '/apps/digital-closet/', description: 'A digital wardrobe with image-based clothing identification and saved outfit previews.', tech: 'React · Node.js · Python · AWS S3 · Firebase' },
  { title: 'Robust Vision System', href: '/apps/robust-vision/', description: 'Foreground segmentation, panoramic stitching, and stereo depth estimation.', tech: 'Python · NumPy · OpenCV' },
  { title: 'Drone Face Recognition', href: '/apps/drone-face-recognition/', description: 'Real-time face recognition from DJI drone video feeds.', tech: 'Python · OpenCV · React' },
];

export default function Home() {
  return (
    <>
      <section className="intro" id="about-me" aria-labelledby="intro-title">
        <div>
          <h1 id="intro-title">Hi, I’m Ritvik.</h1>
          <p className="role">Software engineer · MEng at Cornell.</p>
          <p className="intro-description">I build full-stack and AI/ML projects. My work spans cybersecurity automation, data pipelines, and computer vision.</p>
          <div className="inline-links"><a href="https://github.com/Ritz963">GitHub ↗</a><a href="https://www.linkedin.com/in/ritvik-thakur">LinkedIn ↗</a></div>
        </div>
        <DotSculpture />
      </section>

      <section id="my-work" className="portfolio-section" aria-labelledby="projects-title">
        <h2 id="projects-title" className="section-title">Projects</h2>
        <div className="project-list">
          {projects.map((project) => (
            <Link className="project-row" href={project.href} key={project.href}>
              <div><h3>{project.title}</h3><p>{project.description}</p><span className="tech">{project.tech}</span></div>
              <svg className="project-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg>
            </Link>
          ))}
        </div>
      </section>

      <section id="work-experience" className="portfolio-section" aria-labelledby="experience-title">
        <h2 id="experience-title" className="section-title">Experience</h2>
        <div className="experience-list">
          {experience.slice(1).map(item => <ExperienceEntry key={item.title} title={item.title} date={item.date} description={item.description} />)}
        </div>
      </section>

      <div className="info-grid">
        <section className="portfolio-section" aria-labelledby="education-title"><h2 id="education-title" className="section-title">Education</h2><h3>Cornell University</h3><p>Master of Engineering (MEng), Computer Science<br />Expected May 2027 · Merit Scholar</p><h3>University of Maryland, College Park</h3><p>B.S. Computer Science · Mathematics double major<br />May 2026 · GPA 3.76 / 4.00</p><p className="secondary">Algorithms, Computer Systems, Machine Learning, Computer Vision, Data Science.</p></section>
        <section id="skills" className="portfolio-section" aria-labelledby="skills-title"><h2 id="skills-title" className="section-title">Skills</h2><dl className="skills"><div><dt>Languages</dt><dd>Python, C, C++, Java, JavaScript, R, HTML/CSS, MIPS</dd></div><div><dt>Frameworks & platforms</dt><dd>React, Node.js, Express, Firebase, AWS, Docker, Apache NiFi, Git, GitHub, Jira</dd></div><div><dt>Data & ML</dt><dd>PyTorch, OpenCV, Pandas, NumPy, Matplotlib, GMM/EM, image segmentation</dd></div></dl></section>
      </div>
      <section id="contact" className="contact-section"><div><h2>Contact</h2><div className="inline-links"><a href="https://www.linkedin.com/in/ritvik-thakur">LinkedIn ↗</a><a href="https://github.com/Ritz963">GitHub ↗</a></div></div><p className="secondary">English (native) · Hindi (intermediate) · Mandarin (novice)</p></section>
    </>
  );
}
