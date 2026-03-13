import { curriculum } from '@/lib/curriculum';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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

export default async function TrackPage({ params }: { params: Promise<{ trackId: string }> }) {
  const { trackId } = await params;
  const track = curriculum.find((t) => t.id === trackId);

  if (!track) {
    notFound();
  }

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
          style={{
            background: `linear-gradient(135deg, ${track.color}20 0%, transparent 60%)`,
          }}
        />
        <div
          className="absolute top-0 left-0 h-[2px] w-full"
          style={{ backgroundColor: track.color }}
        />

        <div className="relative mx-auto max-w-4xl px-6 py-16 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-text-muted">
            <Link href="/" className="hover:text-text-secondary transition-colors">
              Dashboard
            </Link>
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  {track.chapters.length} chapters
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {totalLessons} lessons
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  ~{hours || 1}h total
                </span>
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
              {/* Chapter header */}
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

              {/* Lessons */}
              <div className="space-y-2 pl-11">
                {chapter.lessons.map((lesson, lessonIdx) => {
                  // Simulated completion state
                  const isCompleted = lessonIdx === 0 && chIdx === 0;
                  const isCurrent = lessonIdx === 1 && chIdx === 0;

                  return (
                    <Link
                      key={lesson.id}
                      href={`/track/${track.id}/lesson/${lesson.id}`}
                      className="group flex items-center gap-4 rounded-xl border border-card-border bg-card-bg p-4 transition-all hover:border-[#333] hover:bg-[#1a1a1a]"
                    >
                      {/* Status indicator */}
                      <div className="shrink-0">
                        {isCompleted ? (
                          <div
                            className="flex h-8 w-8 items-center justify-center rounded-full"
                            style={{ backgroundColor: track.color + '20' }}
                          >
                            <svg className="h-4 w-4" style={{ color: track.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        ) : isCurrent ? (
                          <div
                            className="flex h-8 w-8 items-center justify-center rounded-full border-2"
                            style={{ borderColor: track.color }}
                          >
                            <div
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: track.color }}
                            />
                          </div>
                        ) : (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#333]">
                            <span className="text-xs text-text-muted">{lessonIdx + 1}</span>
                          </div>
                        )}
                      </div>

                      {/* Lesson info */}
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <h3 className="text-sm font-medium text-text-primary group-hover:text-white transition-colors truncate">
                            {lesson.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-text-muted">
                          <span>{lesson.duration} min</span>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${getLessonTypeBadge(lesson.type)}`}>
                            {lesson.type}
                          </span>
                          {lesson.concepts && (
                            <span>{lesson.concepts.length} concepts</span>
                          )}
                          {lesson.miniExercises && (
                            <span>{lesson.miniExercises.length} exercises</span>
                          )}
                        </div>
                      </div>

                      {/* Arrow */}
                      <svg className="h-4 w-4 shrink-0 text-text-muted opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
