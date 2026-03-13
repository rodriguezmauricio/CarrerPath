import Link from 'next/link';
import { Company } from '@/lib/types';

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  const totalTracks = new Set(company.roles.flatMap((r) => r.trackRefs.map((t) => t.trackId))).size;

  return (
    <Link href={`/company/${company.id}`} className="group block">
      <div
        className="relative h-full overflow-hidden rounded-xl border border-card-border bg-card-bg p-6 transition-all duration-300 hover:border-[#333] hover:bg-[#1a1a1a]"
        style={{ borderTopColor: company.color, borderTopWidth: '2px' }}
      >
        <div
          className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-3xl"
          style={{ backgroundColor: company.color + '15' }}
        >
          {company.logo}
        </div>

        <h3 className="mb-1 text-lg font-semibold text-text-primary group-hover:text-white transition-colors">
          {company.name}
        </h3>

        <span className="mb-3 inline-block rounded-full border border-card-border px-2.5 py-0.5 text-[10px] font-medium text-text-muted">
          {company.industry}
        </span>

        <p className="mb-4 text-sm leading-relaxed text-text-muted line-clamp-2">
          {company.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-text-muted">
          <span>{company.roles.length} roles</span>
          <span>{totalTracks} tracks</span>
        </div>
      </div>
    </Link>
  );
}
