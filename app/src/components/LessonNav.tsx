import Link from 'next/link';

interface LessonNavProps {
  trackId: string;
  prevLesson?: { id: string; title: string } | null;
  nextLesson?: { id: string; title: string } | null;
}

export default function LessonNav({ trackId, prevLesson, nextLesson }: LessonNavProps) {
  return (
    <div className="mt-12 flex items-stretch gap-4 border-t border-card-border pt-8">
      {prevLesson ? (
        <Link
          href={`/track/${trackId}/lesson/${prevLesson.id}`}
          className="group flex flex-1 flex-col rounded-xl border border-card-border bg-card-bg p-4 transition-all hover:border-[#444] hover:bg-[#1a1a1a]"
        >
          <span className="mb-1 flex items-center gap-1 text-xs text-text-muted">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Previous Lesson
          </span>
          <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
            {prevLesson.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      <Link
        href={`/track/${trackId}`}
        className="flex items-center justify-center rounded-xl border border-card-border bg-card-bg px-4 transition-all hover:border-[#444] hover:bg-[#1a1a1a]"
      >
        <svg className="h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      </Link>

      {nextLesson ? (
        <Link
          href={`/track/${trackId}/lesson/${nextLesson.id}`}
          className="group flex flex-1 flex-col items-end rounded-xl border border-card-border bg-card-bg p-4 transition-all hover:border-[#444] hover:bg-[#1a1a1a]"
        >
          <span className="mb-1 flex items-center gap-1 text-xs text-text-muted">
            Next Lesson
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
          <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
            {nextLesson.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
