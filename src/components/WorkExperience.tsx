import { Border, FadeIn, FadeInStagger } from '@/components';
import clsx from 'clsx';
import { default as Image } from 'next/image';

const experience = [
  {
    title: 'University of Maryland, College Park — B.S. Computer Science; Double Major in Mathematics',
    date: 'Expected May 2027',
    description: [
      'GPA: 3.86/4.00',
      'Relevant coursework: Algorithms; Computer Systems; Machine Learning; Computer Vision; Data Science',
    ],
    image: { url: '/work/umd-logo.png', height: 96, width: 96, className: 'rounded-none' },
  },
  {
    title: 'Cybersecurity Engineering Intern — Ernst & Young',
    date: 'Jun 2025 – Aug 2025',
    description: [
      'Built NIST SSDF filter automation, cutting manual review time 80–90% and improving audit traceability.',
      'Co-authored AppSec policy aligned to regulatory standards, speeding client approvals by 1–2 weeks.',
      'Integrated compliance checks into CI/CD pipelines, catching vulnerabilities earlier and reducing release delays.',
    ],
    image: { url: '/work/ey-logo.png', height: 96, width: 96, className: 'rounded-none' },
  },
  {
    title: 'Full Stack Engineer — MITRE Sponsored Project',
    date: 'Jan 2025 – May 2025',
    description: [
      'Built containerized orchestration app on Elasticsearch, centralizing data and cutting triage time 25–40%.',
      'Designed NiFi pipelines that automated malware analysis, boosting throughput 3–5×.',
      'Stored tool outputs in Elasticsearch as a vector store; integrated Ollama embeddings (Llama 3-1B) for air-gapped RAG.',
    ],
    image: { url: '/work/mitre-logo.png', height: 96, width: 96, className: '' },
  },
  {
    title: 'Research Intern — START (National Security & Terrorism)',
    date: 'Jan 2025 – May 2025',
    description: [
      'Researched agentic AI for wargaming to improve scenario realism and decision modeling.',
      'Analyzed AI methods for predicting conflict onset from historical/geopolitical indicators.',
    ],
    image: { url: '/work/start-logo.png', height: 96, width: 96, className: '' },
  },
  {
    title: 'Undergraduate Research Assistant — University of Maryland',
    date: 'Aug 2024 – Dec 2024',
    description: [
      'Processed financial/policy data for model training; streamlined ingestion/cleaning workflows.',
      'Built Python models forecasting lobbying from 10k+ records, improving data quality and reliability.',
    ],
    image: { url: '/work/umd-logo.png', height: 96, width: 96, className: '' },
  },
  {
    title: 'Software Engineer Intern — Washington Software',
    date: 'Nov 2022 – Jun 2023',
    description: [
      'Developed Power Automate workflow that fetched topic-relevant sources, automating research inputs.',
      'Built a React Native essay-writing MVP with Firebase + OpenAI GPT API in ~3 months.',
      'Ran sprints for a 4-person team using Jira and UML workflows.',
    ],
    image: { url: '/work/washington-software-logo.png', height: 96, width: 96, className: 'bg-white' },
  },
];

export default function WorkExperience() {
  return (
    <div className="mt-24 text-gray-500 relative z-10 @container">
      <FadeIn
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        viewportProp={{ once: true }}
      >
        <div className="border-l border-gray-500/30 absolute bottom-0 top-0"></div>
      </FadeIn>
      <FadeInStagger>
        {experience.map((item, index) => (
          <WorkRole key={index} title={item.title} date={item.date} image={item.image}>
            {item.description.map((desc, index) => (
              <li key={index} className="py-1">
                {desc}
              </li>
            ))}
          </WorkRole>
        ))}
      </FadeInStagger>
    </div>
  );
}

function WorkRole({ children, title, date, image }: { children: React.ReactNode; title: string; date?: string; image: { url: string; className: string; height: number; width: number } }) {
  return (
    <FadeIn className="flex group mt-8 first:mt-0 px-3">
      <div className="hidden @lg:flex @lg:flex-col">
        <p className="px-4 pt-8 group-first:pt-0 text-white text-sm leading-7 min-w-[180px] max-w-[180px] @lg:min-w-[195px] @lg:max-w-[195px] @xl:max-w-[215px] @xl:min-w-[215px] flex-none">{date}</p>
        <div className={clsx('flex-none rounded-md overflow-hidden self-center mx-4 mt-auto mb-auto', image.className)}>
          <Image
            src={image.url}
            alt="Company logo"
            height={image.height}
            width={image.width}
            className="object-contain max-h-24 max-w-32"
            style={{
              width: 'auto',
              height: 'auto',
              maxWidth: '128px',
              maxHeight: '96px',
            }}
          />
        </div>
      </div>
      <Border className="pt-8 group-first:pt-0 group-first:before:hidden group-first:after:hidden">
        <div className="flex mb-4">
          <div className={clsx('flex-none rounded-md overflow-hidden self-center ml-2 mr-4 @lg:hidden', image.className)}>
            <Image
              src={image.url}
              alt="Company logo"
              height={image.height}
              width={image.width}
              className="object-contain max-h-16 max-w-24"
              style={{
                width: 'auto',
                height: 'auto',
                maxWidth: '96px',
                maxHeight: '64px',
              }}
            />
          </div>
          <div>
            <p className="font-semibold text-work_experience_orange text-lg">{title}</p>
            <p className="@lg:hidden mt-2 text-white text-sm">{date}</p>
          </div>
        </div>
        <ul className="list-disc pl-10">{children}</ul>
      </Border>
    </FadeIn>
  );
}
