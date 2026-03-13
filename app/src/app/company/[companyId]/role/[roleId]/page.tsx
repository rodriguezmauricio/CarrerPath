import { allCompanies, getCompany } from '@/lib/companies';
import { getTrack } from '@/lib/tracks';
import { getFundamentals } from '@/lib/fundamentals';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TrackCard from '@/components/TrackCard';

export function generateStaticParams() {
  return allCompanies.flatMap((c) =>
    c.roles.map((r) => ({ companyId: c.id, roleId: r.id }))
  );
}

export default async function RolePage({
  params,
}: {
  params: Promise<{ companyId: string; roleId: string }>;
}) {
  const { companyId, roleId } = await params;
  const company = getCompany(companyId);
  if (!company) notFound();

  const role = company.roles.find((r) => r.id === roleId);
  if (!role) notFound();

  return (
    <div className="min-h-screen">
      {/* Role Header */}
      <section className="relative border-b border-card-border">
        <div
          className="absolute inset-0 opacity-5"
          style={{ background: `linear-gradient(135deg, ${company.color}30 0%, transparent 60%)` }}
        />
        <div
          className="absolute top-0 left-0 h-[2px] w-full"
          style={{ backgroundColor: company.color }}
        />

        <div className="relative mx-auto max-w-5xl px-6 py-16 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-text-muted">
            <Link href="/" className="hover:text-text-secondary transition-colors">Home</Link>
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <Link href={`/company/${company.id}`} className="hover:text-text-secondary transition-colors" style={{ color: company.color }}>
              {company.name}
            </Link>
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-text-secondary">{role.title}</span>
          </nav>

          <div className="flex items-start gap-5">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl"
              style={{ backgroundColor: company.color + '15' }}
            >
              {role.icon}
            </div>
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span className="text-sm" style={{ color: company.color }}>{company.logo} {company.name}</span>
              </div>
              <h1 className="mb-2 text-3xl font-bold text-white">{role.title}</h1>
              <p className="mb-4 max-w-2xl text-base leading-relaxed text-text-secondary">{role.description}</p>
              <div className="flex flex-wrap items-center gap-5 text-sm text-text-muted">
                <span className="flex items-center gap-1">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {role.duration}
                </span>
                <span>{role.phases.length} phases</span>
                <span>{role.trackRefs.length} tracks</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prerequisites Banner */}
      {role.prerequisites && role.prerequisites.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 pt-12 lg:px-8">
          <div className="rounded-xl border border-accent-blue/20 bg-accent-blue/5 p-6">
            <div className="mb-3 flex items-center gap-2">
              <svg className="h-5 w-5 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-blue">Prerequisites</h3>
            </div>
            <p className="mb-4 text-sm text-text-secondary">
              Before you start, make sure you&apos;re comfortable with these fundamentals. New to any of them? Click to take the course.
            </p>
            <div className="flex flex-wrap gap-2">
              {role.prerequisites.map((prereqId) => {
                const course = getFundamentals(prereqId);
                if (!course) return null;
                return (
                  <Link
                    key={course.id}
                    href={`/fundamentals/${course.id}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-3 py-2 text-sm transition-all hover:border-accent-blue/30 hover:bg-accent-blue/5"
                  >
                    <span>{course.icon}</span>
                    <span className="text-text-primary">{course.title}</span>
                    <svg className="h-3.5 w-3.5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Phases */}
      <section className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-bold text-white">Learning Phases</h2>
          <p className="text-sm text-text-muted">Your {role.duration} progression</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {role.phases.map((phase) => (
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
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
                  style={{ backgroundColor: phase.color + '15', color: phase.color }}
                >
                  Phase {phase.phase}
                </span>
                <span className="text-[10px] text-text-muted">{phase.months}</span>
              </div>
              <h3 className="mb-2 font-semibold text-text-primary">{phase.title}</h3>
              <div className="flex flex-wrap gap-1.5">
                {phase.trackIds.map((trackId) => {
                  const track = getTrack(trackId);
                  return track ? (
                    <span
                      key={trackId}
                      className="rounded-md px-2 py-0.5 text-[10px] font-medium"
                      style={{ backgroundColor: track.color + '15', color: track.color }}
                    >
                      {track.icon} {track.title}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          ))}
        </div>

        {/* All Tracks */}
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-bold text-white">All Tracks</h2>
          <p className="text-sm text-text-muted">{role.trackRefs.length} tracks in this career path</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {role.trackRefs.map((ref, idx) => {
            const track = getTrack(ref.trackId);
            if (!track) return null;
            return (
              <TrackCard
                key={track.id}
                track={track}
                index={idx}
                companyId={company.id}
                roleId={role.id}
                href={`/company/${company.id}/role/${role.id}/track/${track.id}`}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
