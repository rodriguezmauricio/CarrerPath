'use client';

import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export default function CodeBlock({ code, language = 'typescript', title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block group relative my-4">
      {title && (
        <div className="flex items-center justify-between border-b border-[#2a2a4a] px-4 py-2">
          <span className="text-xs font-medium text-text-muted">{title}</span>
          <span className="text-xs text-text-muted">{language}</span>
        </div>
      )}
      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute right-3 top-3 rounded-md border border-[#2a2a4a] bg-[#1a1a2e] px-2.5 py-1 text-xs text-text-muted opacity-0 transition-all hover:border-accent-teal hover:text-accent-teal group-hover:opacity-100"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <code>{code}</code>
      </div>
    </div>
  );
}
