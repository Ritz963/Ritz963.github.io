import DotField from '@/components/DotField';
import HomeIndex from '@/components/HomeIndex';

export default function Home() {
  return (
    <div className="home">
      <div className="home-left">
        <div>
          <p className="status"><span className="status-dot" aria-hidden="true" />Open to new-grad SWE roles · 2027</p>
          <h1 className="home-name">Ritvik<br /><em>Thakur</em></h1>
          <p className="home-bio">
            Software engineer building full-stack and AI/ML systems. Most recently at Amazon, where I built a Java/AWS Lambda
            system that surfaces removal reasons for 1M+ monthly takedowns.
          </p>
        </div>
        <DotField />
        <div>
          <dl className="home-meta">
            <dt>Now</dt><dd>MEng, Computer Science · Cornell</dd>
            <dt>Before</dt><dd>B.S. CS + Math · University of Maryland</dd>
            <dt>Focus</dt><dd>Full-stack, AI/ML, computer vision</dd>
          </dl>
          <div className="home-links">
            <a href="https://github.com/Ritz963">GitHub</a>
            <a href="https://www.linkedin.com/in/ritvik-thakur">LinkedIn</a>
            <span className="home-foot">© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
      <HomeIndex />
    </div>
  );
}
