'use client';

import { useState } from 'react';

interface SearchFilterProps {
  placeholder?: string;
  industries?: string[];
  onSearch: (query: string) => void;
  onFilterIndustry?: (industry: string | null) => void;
}

export default function SearchFilter({
  placeholder = 'Search companies, roles, or tracks...',
  industries = [],
  onSearch,
  onFilterIndustry,
}: SearchFilterProps) {
  const [query, setQuery] = useState('');
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const handleIndustry = (industry: string) => {
    const next = activeIndustry === industry ? null : industry;
    setActiveIndustry(next);
    onFilterIndustry?.(next);
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-card-border bg-card-bg py-3 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-teal/50 focus:outline-none focus:ring-1 focus:ring-accent-teal/30 transition-all"
        />
      </div>

      {industries.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => handleIndustry(industry)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                activeIndustry === industry
                  ? 'border-accent-teal/50 bg-accent-teal/10 text-accent-teal'
                  : 'border-card-border text-text-muted hover:border-[#444] hover:text-text-secondary'
              }`}
            >
              {industry}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
