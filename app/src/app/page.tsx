import { allCompanies } from '@/lib/companies';
import { allTracks } from '@/lib/tracks';
import CompanyCard from '@/components/CompanyCard';

export default function Home() {
  const totalRoles = allCompanies.reduce((s, c) => s + c.roles.length, 0);
  const totalLessons = allTracks.reduce(
    (s, t) => s + t.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0),
    0
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-card-border">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 via-transparent to-accent-purple/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-2/3 bg-gradient-to-r from-transparent via-accent-teal/50 to-transparent" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="flex flex-col items-start gap-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-teal/20 bg-accent-teal/5 px-4 py-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-accent-teal animate-pulse" />
              <span className="text-xs font-medium text-accent-teal">Multi-Company Career Platform</span>
            </div>

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white lg:text-5xl">
              Find Your{' '}
              <span className="bg-gradient-to-r from-accent-teal to-accent-blue bg-clip-text text-transparent">
                Career Path
              </span>{' '}
              in Tech
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-text-secondary">
              Tailored 24-month learning paths across {allCompanies.length} top tech companies.
              From support engineering to solutions architecture — master the skills that get you hired.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-text-muted">
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 text-accent-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {allCompanies.length} Companies
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 text-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {totalRoles} Roles
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 text-accent-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {allTracks.length} Tracks
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 text-accent-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {totalLessons} Lessons
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Company Grid */}
      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="mb-10">
          <h2 className="mb-2 text-2xl font-bold text-white">Choose a Company</h2>
          <p className="text-sm text-text-muted">
            Each company offers multiple career paths with tailored curricula
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </section>

      {/* Popular Paths */}
      <section className="mx-auto max-w-6xl px-6 pb-20 lg:px-8">
        <div className="mb-10">
          <h2 className="mb-2 text-2xl font-bold text-white">Popular Paths</h2>
          <p className="text-sm text-text-muted">Most chosen career paths across all companies</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allCompanies.slice(0, 6).map((company) => {
            const role = company.roles[0];
            return (
              <a
                key={`${company.id}-${role.id}`}
                href={`/company/${company.id}/role/${role.id}`}
                className="group flex items-center gap-4 rounded-xl border border-card-border bg-card-bg p-4 transition-all hover:border-[#333] hover:bg-[#1a1a1a]"
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl"
                  style={{ backgroundColor: company.color + '15' }}
                >
                  {company.logo}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-text-primary group-hover:text-white transition-colors truncate">
                    {role.title}
                  </div>
                  <div className="text-xs text-text-muted">
                    {company.name} · {role.duration} · {role.trackRefs.length} tracks
                  </div>
                </div>
                <svg className="ml-auto h-4 w-4 shrink-0 text-text-muted opacity-0 transition-all group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}
