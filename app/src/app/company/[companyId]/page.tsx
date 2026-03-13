import { allCompanies, getCompany } from '@/lib/companies';
import { getTrack } from '@/lib/tracks';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return allCompanies.map((c) => ({ companyId: c.id }));
}

export default async function CompanyPage({ params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const company = getCompany(companyId);

  if (!company) {
    notFound();
  }

  const totalTracks = new Set(company.roles.flatMap((r) => r.trackRefs.map((t) => t.trackId))).size;

  return (
    <div className="min-h-screen">
      {/* Company Header */}
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
          <nav className="mb-6 flex items-center gap-2 text-sm text-text-muted">
            <Link href="/" className="hover:text-text-secondary transition-colors">Home</Link>
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span style={{ color: company.color }}>{company.name}</span>
          </nav>

          <div className="flex items-start gap-5">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl"
              style={{ backgroundColor: company.color + '15' }}
            >
              {company.logo}
            </div>
            <div>
              <h1 className="mb-2 text-3xl font-bold text-white">{company.name}</h1>
              <p className="mb-4 max-w-2xl text-base leading-relaxed text-text-secondary">{company.description}</p>
              <div className="flex flex-wrap items-center gap-5 text-sm text-text-muted">
                <span className="rounded-full border border-card-border px-3 py-1 text-xs">{company.industry}</span>
                <span>{company.roles.length} roles</span>
                <span>{totalTracks} tracks</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-bold text-white">Career Paths</h2>
          <p className="text-sm text-text-muted">Choose a role to see the full 24-month learning path</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {company.roles.map((role) => {
            const roleTracks = role.trackRefs
              .map((ref) => getTrack(ref.trackId))
              .filter(Boolean);
            const totalLessons = roleTracks.reduce(
              (sum, t) => sum + (t ? t.chapters.reduce((s, ch) => s + ch.lessons.length, 0) : 0),
              0
            );

            return (
              <Link
                key={role.id}
                href={`/company/${company.id}/role/${role.id}`}
                className="group block"
              >
                <div
                  className="relative h-full overflow-hidden rounded-xl border border-card-border bg-card-bg p-6 transition-all duration-300 hover:border-[#333] hover:bg-[#1a1a1a]"
                  style={{ borderTopColor: company.color, borderTopWidth: '2px' }}
                >
                  <div className="mb-4 text-3xl">{role.icon}</div>
                  <h3 className="mb-2 text-lg font-semibold text-text-primary group-hover:text-white transition-colors">
                    {role.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-text-muted line-clamp-3">
                    {role.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {role.duration}
                    </span>
                    <span>{role.phases.length} phases</span>
                    <span>{role.trackRefs.length} tracks</span>
                    <span>{totalLessons} lessons</span>
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
