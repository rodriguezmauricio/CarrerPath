import { allFundamentals } from '@/lib/fundamentals';
import Link from 'next/link';

export default function FundamentalsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative border-b border-card-border">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-transparent to-accent-purple/5" />
        <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-accent-blue to-accent-purple" />

        <div className="relative mx-auto max-w-5xl px-6 py-16 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 text-sm text-text-muted">
            <Link href="/" className="hover:text-text-secondary transition-colors">Home</Link>
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-accent-blue">Fundamentals</span>
          </nav>

          <h1 className="mb-3 text-3xl font-bold text-white">Fundamentals Courses</h1>
          <p className="max-w-2xl text-base leading-relaxed text-text-secondary">
            New to programming? Start here. These courses cover the essential skills you&apos;ll need
            before diving into any career path.
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allFundamentals.map((course) => (
            <Link
              key={course.id}
              href={`/fundamentals/${course.id}`}
              className="group block"
            >
              <div
                className="relative h-full overflow-hidden rounded-xl border border-card-border bg-card-bg p-6 transition-all duration-300 hover:border-[#333] hover:bg-[#1a1a1a]"
                style={{ borderTopColor: course.color, borderTopWidth: '2px' }}
              >
                <div
                  className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-3xl"
                  style={{ backgroundColor: course.color + '15' }}
                >
                  {course.icon}
                </div>

                <h3 className="mb-2 text-lg font-semibold text-text-primary group-hover:text-white transition-colors">
                  {course.title}
                </h3>

                <p className="mb-4 text-sm leading-relaxed text-text-muted line-clamp-2">
                  {course.description}
                </p>

                <div className="text-xs text-text-muted">
                  {course.topics.length} topics
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
