'use client';

import { useId, useState } from 'react';

export default function ExperienceEntry({ title, date, description }: { title: string; date: string; description: string[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const [role, company] = title.split(' — ');

  return <div className={`experience-row${open ? ' is-open' : ''}`}>
    <h3 className="experience-heading"><button type="button" className="experience-toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen(value => !value)}>
      <span><span className="company">{company}</span><span className="job-role">{role}</span></span>
      <span className="date">{date}</span><span className="expand" aria-hidden="true">+</span>
    </button></h3>
    <div id={id} className="experience-panel" aria-hidden={!open}>
      <div className="experience-panel-inner"><ul>{description.map(line => <li key={line}>{line}</li>)}</ul></div>
    </div>
  </div>;
}
