export type Project = {
  title: string;
  href: string;
  tag: string;
  description: string;
  tech: string;
  /** Short headline figure shown in the hover preview. */
  metric: string;
  metricLabel: string;
  /** Preview card background; text on it is light. */
  tone: string;
};

export const projects: Project[] = [
  {
    title: 'LLM Serving & Evaluation',
    href: '/apps/llm-serving-evaluation/',
    tag: 'ML systems',
    description: 'Multi-model inference serving and evaluation, with 35% lower p95 latency and 1.6× throughput.',
    tech: 'Python · FastAPI · PyTorch · Docker · vLLM · React',
    metric: '35%',
    metricLabel: 'lower p95 latency, with 1.6× throughput',
    tone: '#2d3a31',
  },
  {
    title: 'Digital Closet',
    href: '/apps/digital-closet/',
    tag: 'Full-stack',
    description: 'A digital wardrobe with image-based clothing identification and saved outfit previews.',
    tech: 'React · Node.js · Python · AWS S3 · Firebase',
    metric: 'Auto-ID',
    metricLabel: 'garment type, brand and color identified from a photo',
    tone: '#3b302b',
  },
  {
    title: 'Robust Vision System',
    href: '/apps/robust-vision/',
    tag: 'Computer vision',
    description: 'Foreground segmentation, panoramic stitching, and stereo depth estimation.',
    tech: 'Python · NumPy · OpenCV',
    metric: '3',
    metricLabel: 'pipelines: segmentation, panoramic stitching, stereo depth',
    tone: '#2a3140',
  },
  {
    title: 'Drone Face Recognition',
    href: '/apps/drone-face-recognition/',
    tag: 'Real-time CV',
    description: 'Real-time face recognition from DJI drone video feeds.',
    tech: 'Python · OpenCV · React',
    metric: 'Live',
    metricLabel: 'face recognition on DJI drone video feeds',
    tone: '#3a3628',
  },
];
