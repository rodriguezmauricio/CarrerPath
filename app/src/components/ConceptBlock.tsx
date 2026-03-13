'use client';

import { Concept } from '@/lib/types';
import CodeBlock from './CodeBlock';

interface ConceptBlockProps {
  concept: Concept;
  index: number;
  trackColor: string;
}

export default function ConceptBlock({ concept, index, trackColor }: ConceptBlockProps) {
  return (
    <div className="group rounded-xl border border-card-border bg-card-bg p-6 transition-all duration-200 hover:border-[#333]">
      <div className="mb-4 flex items-start gap-3">
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
          style={{ backgroundColor: trackColor + '20', color: trackColor }}
        >
          {index + 1}
        </span>
        <h4 className="text-lg font-semibold text-text-primary">{concept.title}</h4>
      </div>

      <p className="mb-4 leading-relaxed text-text-secondary">{concept.explanation}</p>

      <div className="mb-4 rounded-lg border border-accent-amber/20 bg-accent-amber/5 p-4">
        <div className="mb-1 flex items-center gap-2">
          <svg className="h-4 w-4 text-accent-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-amber">Real-World Example</span>
        </div>
        <p className="text-sm leading-relaxed text-text-secondary">{concept.example}</p>
      </div>

      <CodeBlock code={concept.codeSnippet} />
    </div>
  );
}
