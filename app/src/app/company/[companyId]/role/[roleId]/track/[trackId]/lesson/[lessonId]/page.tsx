'use client';

import { getCompany } from '@/lib/companies';
import { getTrack } from '@/lib/tracks';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ConceptBlock from '@/components/ConceptBlock';
import { MiniExerciseCard, MainExerciseCard } from '@/components/ExerciseCard';
import LessonNav from '@/components/LessonNav';

export default function CompanyLessonPage() {
  const params = useParams();
  const companyId = params.companyId as string;
  const roleId = params.roleId as string;
  const trackId = params.trackId as string;
  const lessonId = params.lessonId as string;

  const company = getCompany(companyId);
  if (!company) {
    return <div className="flex min-h-screen items-center justify-center"><p className="text-text-muted">Company not found.</p></div>;
  }

  const role = company.roles.find((r) => r.id === roleId);
  if (!role) {
    return <div className="flex min-h-screen items-center justify-center"><p className="text-text-muted">Role not found.</p></div>;
  }

  const track = getTrack(trackId);
  if (!track) {
    return <div className="flex min-h-screen items-center justify-center"><p className="text-text-muted">Track not found.</p></div>;
  }

  let lesson = null;
  let chapterTitle = '';
  for (const chapter of track.chapters) {
    const found = chapter.lessons.find((l) => l.id === lessonId);
    if (found) {
      lesson = found;
      chapterTitle = chapter.title;
      break;
    }
  }

  if (!lesson) {
    return <div className="flex min-h-screen items-center justify-center"><p className="text-text-muted">Lesson not found.</p></div>;
  }

  const allLessons = track.chapters.flatMap((ch) => ch.lessons);
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const basePath = `/company/${company.id}/role/${role.id}/track/${track.id}`;

  return (
    <div className="min-h-screen">
      {/* Lesson Header */}
      <section className="relative border-b border-card-border">
        <div className="absolute top-0 left-0 h-[2px] w-full" style={{ backgroundColor: track.color }} />
        <div className="mx-auto max-w-3xl px-6 py-10 lg:px-8">
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
            <Link href={basePath} className="hover:text-text-secondary transition-colors" style={{ color: track.color }}>
              {track.title}
            </Link>
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-text-secondary truncate">{lesson.title}</span>
          </nav>

          <div className="flex items-start gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl"
              style={{ backgroundColor: track.color + '15' }}
            >
              {track.icon}
            </div>
            <div>
              <div className="mb-1 text-xs text-text-muted">{chapterTitle}</div>
              <h1 className="mb-2 text-2xl font-bold text-white lg:text-3xl">{lesson.title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted">
                <span className="flex items-center gap-1">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {lesson.duration} min
                </span>
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
                  style={{ backgroundColor: track.color + '15', color: track.color }}
                >
                  {lesson.type}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lesson Content */}
      <div className="mx-auto max-w-3xl px-6 py-10 lg:px-8">
        {/* Why This Matters */}
        <section className="mb-10 rounded-xl border border-accent-amber/20 bg-accent-amber/5 p-6">
          <div className="mb-3 flex items-center gap-2">
            <svg className="h-5 w-5 text-accent-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-accent-amber">Why This Matters</h2>
          </div>
          <p className="leading-relaxed text-text-secondary">{lesson.why}</p>
        </section>

        {/* Mental Model */}
        {lesson.mentalModel && (
          <section className="mb-10">
            <div className="relative rounded-xl border border-[#333] bg-[#111] p-6">
              <div className="absolute -left-px top-4 bottom-4 w-[3px] rounded-full" style={{ backgroundColor: track.color }} />
              <div className="mb-2 flex items-center gap-2 pl-4">
                <svg className="h-4 w-4" style={{ color: track.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: track.color }}>Mental Model</span>
              </div>
              <blockquote className="pl-4 text-base italic leading-relaxed text-text-primary">
                &ldquo;{lesson.mentalModel}&rdquo;
              </blockquote>
            </div>
          </section>
        )}

        {/* Concepts */}
        {lesson.concepts && lesson.concepts.length > 0 && (
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-blue/15">
                <svg className="h-4 w-4 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white">Core Concepts</h2>
            </div>
            <div className="space-y-6">
              {lesson.concepts.map((concept, idx) => (
                <ConceptBlock key={idx} concept={concept} index={idx} trackColor={track.color} />
              ))}
            </div>
          </section>
        )}

        {/* Mini Exercises */}
        {lesson.miniExercises && lesson.miniExercises.length > 0 && (
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-purple/15">
                <svg className="h-4 w-4 text-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white">Mini Exercises</h2>
            </div>
            <div className="space-y-6">
              {lesson.miniExercises.map((exercise, idx) => (
                <MiniExerciseCard key={exercise.id} exercise={exercise} index={idx} />
              ))}
            </div>
          </section>
        )}

        {/* Main Exercise */}
        {lesson.exercise && (
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-purple/15">
                <svg className="h-4 w-4 text-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white">Main Exercise</h2>
            </div>
            <MainExerciseCard exercise={lesson.exercise} />
          </section>
        )}

        {/* Resources */}
        {lesson.resources && lesson.resources.length > 0 && (
          <section className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                <svg className="h-4 w-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white">Resources</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {lesson.resources.map((resource, idx) => (
                <a
                  key={idx}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-card-border bg-card-bg p-4 transition-all hover:border-[#444] hover:bg-[#1a1a1a]"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-teal/10">
                    <svg className="h-4 w-4 text-accent-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <span className="block text-sm font-medium text-text-primary group-hover:text-white transition-colors truncate">{resource.label}</span>
                    <span className="block text-xs text-text-muted truncate">{resource.url}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Why What You Learned Is Important */}
        {lesson.whyItMatters && (
          <section className="mb-10 rounded-xl border border-accent-teal/20 bg-accent-teal/5 p-6">
            <div className="mb-3 flex items-center gap-2">
              <svg className="h-5 w-5 text-accent-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-accent-teal">Why What You Learned Is Important</h2>
            </div>
            <p className="leading-relaxed text-text-secondary">{lesson.whyItMatters}</p>
          </section>
        )}

        {/* Lesson Navigation */}
        <LessonNav
          trackId={track.id}
          prevLesson={prevLesson ? { id: prevLesson.id, title: prevLesson.title } : null}
          nextLesson={nextLesson ? { id: nextLesson.id, title: nextLesson.title } : null}
          basePath={`/company/${company.id}/role/${role.id}/track/${track.id}`}
        />
      </div>
    </div>
  );
}
