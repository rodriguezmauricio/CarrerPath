import { allCompanies, getCompany } from '@/lib/companies';
import { getTrack } from '@/lib/tracks';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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

            const totalLessons = track.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
            const totalDuration = track.chapters.reduce(
              (sum, ch) => sum + ch.lessons.reduce((s, l) => s + l.duration, 0),
              0
            );
            const hours = Math.round(totalDuration / 60);

            return (
              <Link
                key={track.id}
                href={`/company/${company.id}/role/${role.id}/track/${track.id}`}
                className="group block"
              >
                <div
                  className="relative h-full overflow-hidden rounded-xl border border-card-border bg-card-bg p-6 transition-all duration-300 hover:border-[#333] hover:bg-[#1a1a1a]"
                  style={{ borderTopColor: track.color, borderTopWidth: '2px' }}
                >
                  <div className="absolute right-4 top-4 text-xs font-mono text-text-muted">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                    style={{ backgroundColor: track.color + '15' }}
                  >
                    {track.icon}
                  </div>
                  <h3 className="mb-1 text-base font-semibold text-text-primary group-hover:text-white transition-colors">
                    {track.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-text-muted line-clamp-2">
                    {track.subtitle}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-text-muted">
                    <span>{track.chapters.length} chapters</span>
                    <span>{totalLessons} lessons</span>
                    {hours > 0 && <span>{hours}h</span>}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
