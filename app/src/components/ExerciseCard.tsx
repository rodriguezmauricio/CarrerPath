'use client';

import { useState } from 'react';
import { MiniExercise, Exercise } from '@/lib/types';
import CodeBlock from './CodeBlock';

interface MiniExerciseCardProps {
  exercise: MiniExercise;
  index: number;
}

export function MiniExerciseCard({ exercise, index }: MiniExerciseCardProps) {
  const [showSolution, setShowSolution] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const disclosureLabel = index === 0
    ? 'Full solution with explanation'
    : index === 1
    ? 'Solution (no explanation)'
    : 'Try it yourself first!';

  return (
    <div className="rounded-xl border border-accent-purple/20 bg-accent-purple/5 p-6">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-purple/20 text-xs font-bold text-accent-purple">
          {index + 1}
        </span>
        <h4 className="font-semibold text-text-primary">{exercise.title}</h4>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-text-secondary">{exercise.question}</p>

      {exercise.steps.map((step, stepIdx) => (
        <div key={stepIdx} className="mb-4 rounded-lg border border-accent-blue/20 bg-accent-blue/5 p-4">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-xs font-semibold text-accent-blue">Step {stepIdx + 1}</span>
          </div>
          <p className="mb-2 text-sm leading-relaxed text-text-secondary">{step.instruction}</p>
          {step.example && (
            <div className="mb-2 rounded-md bg-[#0d1117] p-3">
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-text-muted">Example (different context)</span>
              <pre className="whitespace-pre-wrap font-mono text-xs text-text-secondary">{step.example}</pre>
            </div>
          )}
          {step.hint && (
            <div className="flex items-start gap-2 rounded-md bg-accent-amber/5 p-2">
              <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="text-xs text-accent-amber/80">{step.hint}</span>
            </div>
          )}
        </div>
      ))}

      {exercise.codeSnippet && (
        <CodeBlock code={exercise.codeSnippet} title="Starter Code" />
      )}

      {/* Progressive disclosure: solution */}
      {exercise.solution && (
        <div className="mt-4">
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="flex items-center gap-2 rounded-lg border border-accent-emerald/30 bg-accent-emerald/10 px-4 py-2 text-sm font-medium text-accent-emerald transition-all hover:bg-accent-emerald/20"
          >
            <svg
              className={`h-4 w-4 transition-transform ${showSolution ? 'rotate-90' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            {showSolution ? 'Hide Solution' : 'Show Solution'}
            <span className="text-xs text-accent-emerald/60">({disclosureLabel})</span>
          </button>

          {showSolution && (
            <div className="mt-3">
              <CodeBlock code={exercise.solution} title="Solution" />

              {exercise.explanation && (
                <div className="mt-3">
                  <button
                    onClick={() => setShowExplanation(!showExplanation)}
                    className="flex items-center gap-2 text-sm font-medium text-accent-emerald/80 transition-colors hover:text-accent-emerald"
                  >
                    <svg
                      className={`h-3.5 w-3.5 transition-transform ${showExplanation ? 'rotate-90' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    {showExplanation ? 'Hide Explanation' : 'Why This Works'}
                  </button>
                  {showExplanation && (
                    <div className="mt-2 rounded-lg border border-accent-emerald/20 bg-accent-emerald/5 p-4">
                      <p className="text-sm leading-relaxed text-text-secondary">{exercise.explanation}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Mini 3: no solution available */}
      {!exercise.solution && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-accent-purple/20 bg-accent-purple/5 px-4 py-3">
          <svg className="h-4 w-4 text-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-sm text-accent-purple">Challenge mode -- no solution provided. You&apos;ve got this!</span>
        </div>
      )}
    </div>
  );
}

interface MainExerciseCardProps {
  exercise: Exercise;
}

export function MainExerciseCard({ exercise }: MainExerciseCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-accent-purple/30 bg-gradient-to-br from-accent-purple/10 to-accent-purple/5 p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-purple/20">
          <svg className="h-5 w-5 text-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-purple">Main Exercise</span>
          {exercise.title && <h3 className="text-lg font-bold text-text-primary">{exercise.title}</h3>}
        </div>
      </div>

      <div className="mb-4 space-y-2">
        {exercise.description.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-purple/20 text-[10px] font-bold text-accent-purple">
              {idx + 1}
            </span>
            <p className="text-sm leading-relaxed text-text-secondary">{item}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 rounded-lg border border-accent-blue/30 bg-accent-blue/10 px-4 py-2 text-sm font-medium text-accent-blue transition-all hover:bg-accent-blue/20"
      >
        <svg
          className={`h-4 w-4 transition-transform ${expanded ? 'rotate-90' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        {expanded ? 'Hide Step-by-Step Guide' : 'Show Step-by-Step Guide'}
      </button>

      {expanded && (
        <div className="mt-4 space-y-4">
          {exercise.steps.map((step, idx) => (
            <div key={idx} className="rounded-lg border border-accent-blue/20 bg-accent-blue/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-blue/20 text-xs font-bold text-accent-blue">
                  {idx + 1}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-accent-blue">Step {idx + 1}</span>
              </div>
              <p className="mb-2 text-sm leading-relaxed text-text-secondary">{step.instruction}</p>
              {step.example && (
                <div className="mb-2 rounded-md bg-[#0d1117] p-3">
                  <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-text-muted">Example</span>
                  <pre className="whitespace-pre-wrap font-mono text-xs text-text-secondary">{step.example}</pre>
                </div>
              )}
              {step.hint && (
                <div className="flex items-start gap-2 rounded-md bg-accent-amber/5 p-2">
                  <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01" />
                  </svg>
                  <span className="text-xs text-accent-amber/80">{step.hint}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
