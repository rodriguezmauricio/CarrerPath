import Link from 'next/link';
import { Role } from '@/lib/types';
import { getTrack } from '@/lib/tracks';

interface RoleCardProps {
  companyId: string;
  companyColor: string;
  role: Role;
}

export default function RoleCard({ companyId, companyColor, role }: RoleCardProps) {
  const totalLessons = role.trackRefs.reduce((sum, ref) => {
    const track = getTrack(ref.trackId);
    return sum + (track ? track.chapters.reduce((s, ch) => s + ch.lessons.length, 0) : 0);
  }, 0);

  return (
    <Link href={`/company/${companyId}/role/${role.id}`} className="group block">
      <div
        className="relative h-full overflow-hidden rounded-xl border border-card-border bg-card-bg p-6 transition-all duration-300 hover:border-[#333] hover:bg-[#1a1a1a]"
        style={{ borderTopColor: companyColor, borderTopWidth: '2px' }}
      >
        <div className="mb-4 text-3xl">{role.icon}</div>
        <h3 className="mb-2 text-lg font-semibold text-text-primary group-hover:text-white transition-colors">
          {role.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-text-muted line-clamp-3">
          {role.description}
        </p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted">
          <span>{role.duration}</span>
          <span>{role.phases.length} phases</span>
          <span>{role.trackRefs.length} tracks</span>
          <span>{totalLessons} lessons</span>
        </div>
      </div>
    </Link>
  );
}
