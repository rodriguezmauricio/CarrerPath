import Link from 'next/link';
import { Track } from '@/lib/types';

interface TrackCardProps {
  track: Track;
  index: number;
}

export default function TrackCard({ track, index }: TrackCardProps) {
  const totalLessons = track.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
  const totalDuration = track.chapters.reduce(
    (sum, ch) => sum + ch.lessons.reduce((s, l) => s + l.duration, 0),
    0
  );
  const hours = Math.round(totalDuration / 60);

  // Simulated progress (static/deterministic for now)
  const progressMap: Record<string, number> = {
    'core-lang': 18, 'apis': 12, 'auth-security': 5, 'sql-data': 0,
    'networking': 0, 'debugging': 8, 'dev-tools': 3, 'ai-llm': 22,
    'enterprise-support': 0, 'compliance': 0, 'soft-skills': 10,
  };
  const progress = progressMap[track.id] ?? 0;

  return (
    <Link href={`/track/${track.id}`} className="group block">
      <div
        className="relative h-full overflow-hidden rounded-xl border border-card-border bg-card-bg p-6 transition-all duration-300 hover:border-[#333] hover:bg-[#1a1a1a]"
        style={{ borderTopColor: track.color, borderTopWidth: '2px' }}
      >
        {/* Track number */}
        <div className="absolute right-4 top-4 text-xs font-mono text-text-muted">
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Icon */}
        <div
          className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
          style={{ backgroundColor: track.color + '15' }}
        >
          {track.icon}
        </div>

        {/* Title */}
        <h3 className="mb-1 text-base font-semibold text-text-primary group-hover:text-white transition-colors">
          {track.title}
        </h3>

        {/* Subtitle */}
        <p className="mb-4 text-sm leading-relaxed text-text-muted line-clamp-2">
          {track.subtitle}
        </p>

        {/* Stats */}
        <div className="mb-3 flex items-center gap-4 text-xs text-text-muted">
          <span className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {track.chapters.length} {track.chapters.length === 1 ? 'chapter' : 'chapters'}
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {totalLessons} {totalLessons === 1 ? 'lesson' : 'lessons'}
          </span>
          {hours > 0 && (
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {hours}h
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%`, backgroundColor: track.color }}
          />
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-[10px] text-text-muted">{progress}% complete</span>
          <span
            className="text-[10px] font-medium"
            style={{ color: track.color }}
          >
            {progress === 0 ? 'Not started' : 'In progress'}
          </span>
        </div>
      </div>
    </Link>
  );
}
