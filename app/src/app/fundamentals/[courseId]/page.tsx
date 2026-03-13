import { allFundamentals, getFundamentals } from '@/lib/fundamentals';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return allFundamentals.map((c) => ({ courseId: c.id }));
}

export default async function FundamentalCoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = getFundamentals(courseId);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative border-b border-card-border">
        <div
          className="absolute inset-0 opacity-5"
          style={{ background: `linear-gradient(135deg, ${course.color}30 0%, transparent 60%)` }}
        />
        <div
          className="absolute top-0 left-0 h-[2px] w-full"
          style={{ backgroundColor: course.color }}
        />

        <div className="relative mx-auto max-w-4xl px-6 py-16 lg:px-8">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-text-muted">
            <Link href="/" className="hover:text-text-secondary transition-colors">Home</Link>
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/fundamentals" className="hover:text-text-secondary transition-colors text-accent-blue">
              Fundamentals
            </Link>
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span style={{ color: course.color }}>{course.title}</span>
          </nav>

          <div className="flex items-start gap-5">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl"
              style={{ backgroundColor: course.color + '15' }}
            >
              {course.icon}
            </div>
            <div>
              <h1 className="mb-2 text-3xl font-bold text-white">{course.title}</h1>
              <p className="mb-4 max-w-2xl text-base leading-relaxed text-text-secondary">
                {course.description}
              </p>
              <div className="text-sm text-text-muted">
                {course.topics.length} topics
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-bold text-white">What You&apos;ll Learn</h2>
          <p className="text-sm text-text-muted">Topics covered in this fundamentals course</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {course.topics.map((topic, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 rounded-xl border border-card-border bg-card-bg p-4"
            >
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
                style={{ backgroundColor: course.color + '15', color: course.color }}
              >
                {idx + 1}
              </div>
              <span className="text-sm text-text-primary">{topic}</span>
            </div>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-12 rounded-xl border border-accent-amber/20 bg-accent-amber/5 p-6 text-center">
          <div className="mb-2 text-2xl">🚧</div>
          <h3 className="mb-2 text-lg font-semibold text-accent-amber">Full Course Coming Soon</h3>
          <p className="text-sm text-text-secondary">
            Detailed lessons with interactive exercises, code examples, and projects are being developed.
            Check back soon!
          </p>
        </div>
      </section>
    </div>
  );
}
