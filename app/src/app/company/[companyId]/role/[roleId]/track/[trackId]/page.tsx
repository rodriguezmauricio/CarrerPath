import { allCompanies, getCompany } from '@/lib/companies';
import { getTrack } from '@/lib/tracks';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Params = { companyId: string; roleId: string; trackId: string };

export function generateStaticParams() {
  return allCompanies.flatMap((c) =>
    c.roles.flatMap((r) =>
      r.trackRefs.map((ref) => ({
        companyId: c.id,
        roleId: r.id,
        trackId: ref.trackId,
      }))
    )
  );
}

function getLessonTypeBadge(type: string) {
  const styles: Record<string, string> = {
    Concept: 'bg-accent-blue/15 text-accent-blue',
    Exercise: 'bg-accent-purple/15 text-accent-purple',
    Project: 'bg-accent-amber/15 text-accent-amber',
    Domain: 'bg-accent-emerald/15 text-accent-emerald',
    Tool: 'bg-accent-teal/15 text-accent-teal',
  };
  return styles[type] || 'bg-white/10 text-text-secondary';
}

export default async function CompanyTrackPage({ params }: { params: Promise<Params> }) {
  const { companyId, roleId, trackId } = await params;
  const company = getCompany(companyId);
  if (!company) notFound();

  const role = company.roles.find((r) => r.id === roleId);
  if (!role) notFound();

  const track = getTrack(trackId);
  if (!track) notFound();

  const totalLessons = track.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
  const totalDuration = track.chapters.reduce(
    (sum, ch) => sum + ch.lessons.reduce((s, l) => s + l.duration, 0),
    0
  );
  const hours = Math.round(totalDuration / 60);

  return (
    <div className="min-h-screen">
      {/* Track Header */}
      <section className="relative border-b border-card-border">
        <div
          className="absolute inset-0 opacity-5"
          style={{ background: `linear-gradient(135deg, ${track.color}20 0%, transparent 60%)` }}
        />
        <div
          className="absolute top-0 left-0 h-[2px] w-full"
          style={{ backgroundColor: track.color }}
        />

        <div className="relative mx-auto max-w-4xl px-6 py-16 lg:px-8">
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
            <Link href={`/company/${company.id}/role/${role.id}`} className="hover:text-text-secondary transition-colors">
              {role.title}
            </Link>
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span style={{ color: track.color }}>{track.title}</span>
          </nav>

          <div className="flex items-start gap-5">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl"
              style={{ backgroundColor: track.color + '15' }}
            >
              {track.icon}
            </div>
            <div>
              <h1 className="mb-2 text-3xl font-bold text-white">{track.title}</h1>
              <p className="mb-4 text-base text-text-secondary">{track.subtitle}</p>
              <div className="flex flex-wrap items-center gap-5 text-sm text-text-muted">
                <span>{track.chapters.length} chapters</span>
                <span>{totalLessons} lessons</span>
                <span>~{hours || 1}h total</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapters */}
      <section className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        <div className="space-y-8">
          {track.chapters.map((chapter, chIdx) => (
            <div key={chapter.id}>
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold"
                  style={{ backgroundColor: track.color + '15', color: track.color }}
                >
                  {chIdx + 1}
                </div>
                <h2 className="text-lg font-semibold text-white">{chapter.title}</h2>
                <span className="text-xs text-text-muted">
                  {chapter.lessons.length} {chapter.lessons.length === 1 ? 'lesson' : 'lessons'}
                </span>
              </div>

              <div className="space-y-2 pl-11">
                {chapter.lessons.map((lesson, lessonIdx) => (
                  <Link
                    key={lesson.id}
                    href={`/company/${company.id}/role/${role.id}/track/${track.id}/lesson/${lesson.id}`}
                    className="group flex items-center gap-4 rounded-xl border border-card-border bg-card-bg p-4 transition-all hover:border-[#333] hover:bg-[#1a1a1a]"
                  >
                    <div className="shrink-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#333]">
                        <span className="text-xs text-text-muted">{lessonIdx + 1}</span>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="mb-1 text-sm font-medium text-text-primary group-hover:text-white transition-colors truncate">
                        {lesson.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-text-muted">
                        <span>{lesson.duration} min</span>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${getLessonTypeBadge(lesson.type)}`}>
                          {lesson.type}
                        </span>
                        {lesson.concepts && <span>{lesson.concepts.length} concepts</span>}
                        {lesson.miniExercises && <span>{lesson.miniExercises.length} exercises</span>}
                      </div>
                    </div>
                    <svg className="h-4 w-4 shrink-0 text-text-muted opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
