import { curriculum } from '@/lib/curriculum';
import TrackCard from '@/components/TrackCard';

const phases = [
  {
    phase: 1,
    title: 'Foundations',
    months: 'Months 1-6',
    description: 'Python, Bash, REST APIs, Git, SQL basics, HTTP/networking fundamentals, Anthropic API deep dive',
    color: '#3b82f6',
    tracks: ['core-lang', 'apis', 'sql-data'],
  },
  {
    phase: 2,
    title: 'Auth & Infrastructure',
    months: 'Months 7-12',
    description: 'OAuth/SAML/SSO, auth debugging, cloud awareness, log analysis, browser DevTools, LLM concepts deep dive',
    color: '#8b5cf6',
    tracks: ['auth-security', 'networking', 'debugging'],
  },
  {
    phase: 3,
    title: 'Enterprise Readiness',
    months: 'Months 13-18',
    description: 'Enterprise support tooling, GDPR/compliance, SCIM, Zendesk/Jira, advanced SQL, monitoring tools, communication patterns',
    color: '#f59e0b',
    tracks: ['enterprise-support', 'compliance', 'dev-tools'],
  },
  {
    phase: 4,
    title: 'Application',
    months: 'Months 18-24',
    description: 'Mock support scenarios, portfolio of resolved tickets, open source documentation contributions, real-world experience',
    color: '#00d4aa',
    tracks: ['ai-llm', 'soft-skills'],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-card-border">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 via-transparent to-accent-purple/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-2/3 bg-gradient-to-r from-transparent via-accent-teal/50 to-transparent" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="flex flex-col items-start gap-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-teal/20 bg-accent-teal/5 px-4 py-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-accent-teal animate-pulse" />
              <span className="text-xs font-medium text-accent-teal">24-Month Career Path</span>
            </div>

            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-white lg:text-5xl">
              Anthropic Product Support{' '}
              <span className="bg-gradient-to-r from-accent-teal to-accent-blue bg-clip-text text-transparent">
                Specialist
              </span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-text-secondary">
              A comprehensive learning path covering 11 technical tracks, from Python and APIs
              to enterprise support and AI systems. Built to take you from fundamentals to
              production-ready support engineering.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-text-muted">
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 text-accent-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                11 Tracks
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 text-accent-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                24 Months
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 text-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                4 Phases
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Phases */}
      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="mb-10">
          <h2 className="mb-2 text-2xl font-bold text-white">Learning Phases</h2>
          <p className="text-sm text-text-muted">Your 24-month progression from foundations to production readiness</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {phases.map((phase) => (
            <div
              key={phase.phase}
              className="group relative rounded-xl border border-card-border bg-card-bg p-5 transition-all hover:border-[#333]"
            >
              <div
                className="absolute left-0 top-0 h-full w-[3px] rounded-l-xl"
                style={{ backgroundColor: phase.color }}
              />
              <div className="mb-3 flex items-center justify-between">
                <span
                  className="phase-badge"
                  style={{ backgroundColor: phase.color + '15', color: phase.color }}
                >
                  Phase {phase.phase}
                </span>
                <span className="text-[10px] text-text-muted">{phase.months}</span>
              </div>
              <h3 className="mb-2 font-semibold text-text-primary">{phase.title}</h3>
              <p className="text-xs leading-relaxed text-text-muted">{phase.description}</p>
              <div className="mt-3 flex gap-1.5">
                {phase.tracks.map((trackId) => {
                  const track = curriculum.find((t) => t.id === trackId);
                  return track ? (
                    <span
                      key={trackId}
                      className="rounded-md px-2 py-0.5 text-[10px] font-medium"
                      style={{ backgroundColor: track.color + '15', color: track.color }}
                    >
                      {track.icon}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Tracks */}
      <section className="mx-auto max-w-6xl px-6 pb-20 lg:px-8">
        <div className="mb-10">
          <h2 className="mb-2 text-2xl font-bold text-white">All Tracks</h2>
          <p className="text-sm text-text-muted">11 comprehensive learning tracks covering every aspect of technical support</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {curriculum.map((track, idx) => (
            <TrackCard key={track.id} track={track} index={idx} />
          ))}
        </div>
      </section>
    </div>
  );
}
