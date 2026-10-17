import CaseStudy from '@/components/CaseStudy';

export const metadata = {
  title: 'LLM Serving & Evaluation Platform',
  description: 'An LLM inference platform with multi-model routing, batching, caching, asynchronous processing, and model evaluation.',
};

export default function LLMPlatform() {
  return <CaseStudy title="LLM Serving & Evaluation Platform" description={metadata.description}>
    <section aria-labelledby="implementation"><h2 id="implementation">Implementation</h2><ul>
      <li>Built an LLM inference platform serving 3 models with routing, batching, caching, and asynchronous processing.</li>
      <li>Optimized model serving to cut p95 latency by 35% and increase throughput by 1.6×.</li>
      <li>Built a model evaluation pipeline testing 1K+ prompts for quality, inference latency, and resource usage.</li>
    </ul></section>
    <section aria-labelledby="technologies"><h2 id="technologies">Technologies</h2><ul className="technology-list">
      {['Python', 'FastAPI', 'PyTorch', 'Docker', 'vLLM', 'React'].map(tech => <li className="technology-label" key={tech}>{tech}</li>)}
    </ul></section>
  </CaseStudy>;
}
