import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, Bot, CheckCircle2, Code2, Database, GitPullRequest, Headphones, Lock, Network, ShieldCheck, Sparkles } from 'lucide-react';
import './styles.css';

const services = [
  { icon: Code2, title: 'Software Development', text: 'Web apps, internal tools, APIs, automations, and MVPs built with reviewable engineering workflows.' },
  { icon: Network, title: 'IT Solutions', text: 'Cloud, systems, service desk workflows, integrations, infrastructure planning, and operational runbooks.' },
  { icon: ShieldCheck, title: 'Security & Reliability', text: 'Security reviews, deployment gates, observability, backup planning, and practical risk reduction.' },
  { icon: Database, title: 'Business Automation', text: 'Connect your tools, reduce manual work, and create auditable workflows across teams and systems.' },
];

const agents = [
  ['Amina Khan', 'CEO', 'Strategy, scope, executive oversight'],
  ['Maya Rahman', 'CTO', 'Architecture, engineering standards'],
  ['Sofia Patel', 'CPO', 'Product roadmap and requirements'],
  ['Nadia Blake', 'CISO', 'Security, privacy, approval gates'],
  ['Ethan Brooks', 'PM', 'Backlog, acceptance criteria, delivery'],
  ['Noah Singh', 'DevOps/SRE', 'Deployments, reliability, runbooks'],
];

const starterQuestions = [
  { key: 'name', label: 'What is your name or company name?', type: 'text', placeholder: 'Acme LLC' },
  { key: 'need', label: 'What do you need help with?', type: 'select', options: ['New website/app', 'Automation', 'IT support', 'Cloud/infrastructure', 'Security review', 'Not sure yet'] },
  { key: 'timeline', label: 'Desired timeline?', type: 'select', options: ['ASAP', '2-4 weeks', '1-3 months', 'Planning phase'] },
  { key: 'budget', label: 'Budget range?', type: 'select', options: ['Under $5k', '$5k-$15k', '$15k-$50k', '$50k+', 'Need help estimating'] },
  { key: 'details', label: 'Briefly describe the problem or goal.', type: 'textarea', placeholder: 'Tell us what is broken, missing, or desired...' },
];

function SalesAgent() {
  const [form, setForm] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const completeness = useMemo(() => starterQuestions.filter(q => form[q.key]).length, [form]);
  const summary = `Client Intake Brief%0A%0AName/Company: ${form.name || ''}%0ANeed: ${form.need || ''}%0ATimeline: ${form.timeline || ''}%0ABudget: ${form.budget || ''}%0ADetails: ${form.details || ''}`;

  return <section className="agent-card" id="start">
    <div className="agent-header">
      <div className="bot-mark"><Bot size={28}/></div>
      <div>
        <p className="eyebrow">Sales Concierge Agent</p>
        <h2>Tell us what you need. We’ll route it to the right experts.</h2>
      </div>
    </div>
    <div className="progress"><span style={{ width: `${(completeness / starterQuestions.length) * 100}%` }} /></div>
    <div className="form-grid">
      {starterQuestions.map(q => <label key={q.key}>
        <span>{q.label}</span>
        {q.type === 'select' ? <select value={form[q.key] || ''} onChange={e => setForm({ ...form, [q.key]: e.target.value })}>
          <option value="">Select one</option>
          {q.options.map(o => <option key={o}>{o}</option>)}
        </select> : q.type === 'textarea' ? <textarea placeholder={q.placeholder} value={form[q.key] || ''} onChange={e => setForm({ ...form, [q.key]: e.target.value })} /> : <input placeholder={q.placeholder} value={form[q.key] || ''} onChange={e => setForm({ ...form, [q.key]: e.target.value })} />}
      </label>)}
    </div>
    <div className="agent-actions">
      <button onClick={() => setSubmitted(true)}>Generate getting-started brief <ArrowRight size={18}/></button>
      <a className="secondary" href={`mailto:sales@example.com?subject=Project intake&body=${summary}`}>Email brief</a>
    </div>
    {submitted && <div className="brief">
      <CheckCircle2/> <div><strong>Brief created.</strong><p>Recommended routing: CPO + Solutions Architect for discovery, CTO for feasibility, COO/PM for delivery plan, CISO for security review if sensitive data is involved.</p></div>
    </div>}
  </section>
}

function App() {
  return <main>
    <nav><div className="brand"><Sparkles/> Zoft Autonomous Solutions</div><a href="#start">Get started</a></nav>
    <header className="hero">
      <div>
        <p className="eyebrow">Software development + IT solutions</p>
        <h1>A modern delivery company powered by specialist role agents.</h1>
        <p className="lead">We plan, build, secure, document, and operate software and IT systems with clear stakeholder ownership and human approval gates for high-risk work.</p>
        <div className="cta"><a href="#start">Start with the sales agent</a><a className="ghost" href="#team">Meet the operators</a></div>
      </div>
      <div className="hero-panel"><Lock/><h3>Governed autonomy</h3><p>GitHub for code, Linear for work tracking, Notion for docs, and explicit approvals for production, credentials, spending, or external commitments.</p></div>
    </header>
    <section className="services">{services.map(({icon:Icon,title,text}) => <article key={title}><Icon/><h3>{title}</h3><p>{text}</p></article>)}</section>
    <SalesAgent />
    <section className="team" id="team"><p className="eyebrow">Stakeholder model</p><h2>The right role is involved at the right moment.</h2><div className="people">{agents.map(([name,title,focus]) => <article key={name}><h3>{name}</h3><strong>{title}</strong><p>{focus}</p></article>)}</div></section>
    <section className="workflow"><GitPullRequest/><h2>Tracked delivery workflow</h2><p>Every serious engagement becomes a Linear initiative, GitHub implementation work, and Notion documentation set. Reviews include product, engineering, operations, security, QA, and IT support when relevant.</p></section>
  </main>
}

createRoot(document.getElementById('root')).render(<App />);
