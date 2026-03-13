'use client';

import Link from 'next/link';
import { Track } from '@/lib/types';
import { useProgress } from '@/lib/progress';

interface TrackCardProps {
  track: Track;
  index: number;
  companyId?: string;
  roleId?: string;
  href?: string;
}

export default function TrackCard({ track, index, companyId, roleId, href }: TrackCardProps) {
  const { getTrackProgress } = useProgress();

  const totalLessons = track.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
  const totalDuration = track.chapters.reduce(
    (sum, ch) => sum + ch.lessons.reduce((s, l) => s + l.duration, 0),
    0
  );
  const hours = Math.round(totalDuration / 60);

  const progress = companyId && roleId ? getTrackProgress(companyId, roleId, track.id) : 0;
  const linkHref = href || `/track/${track.id}`;

  return (
    <Link href={linkHref} className="group block">
      <div
        className="relative h-full overflow-hidden rounded-xl border border-card-border bg-card-bg p-6 transition-all duration-300 hover:border-[#333] hover:bg-[#1a1a1a]"
        style={{ borderTopColor: track.color, borderTopWidth: '2px' }}
      >
        <div className="absolute right-4 top-4 text-xs font-mono text-text-muted">
          {String(index + 1).padStart(2, '0')}
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

        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%`, backgroundColor: track.color }}
          />
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-[10px] text-text-muted">{progress}% complete</span>
          <span className="text-[10px] font-medium" style={{ color: track.color }}>
            {progress === 0 ? 'Not started' : progress === 100 ? 'Complete' : 'In progress'}
          </span>
        </div>
      </div>
    </Link>
  );
}
