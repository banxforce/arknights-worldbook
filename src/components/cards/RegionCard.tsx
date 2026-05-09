import { ArrowRight, Building2, MapPinned } from 'lucide-react';
import TagPill from './TagPill';

interface RegionCardProps {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  regionType?: string;
}

export default function RegionCard({ slug, title, summary, tags, regionType }: RegionCardProps) {
  return (
    <a
      href={`/regions/${slug}`}
      className="group flex min-h-[260px] flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_18px_44px_rgba(15,23,42,0.08)]"
    >
      <div className="relative h-28 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-300">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.75),transparent_22%),linear-gradient(115deg,rgba(255,255,255,0.18)_0_18%,transparent_19%_100%)]" />
        <MapPinned aria-hidden="true" className="absolute bottom-4 left-5 size-8 text-white/90" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
            {regionType && <p className="mt-1 text-xs font-medium text-slate-500">{regionType}</p>}
          </div>
          <Building2 aria-hidden="true" className="size-5 shrink-0 text-slate-400" />
        </div>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">{summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <TagPill key={tag} tone="blue">
              {tag}
            </TagPill>
          ))}
        </div>
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-blue-600">
          查看地区档案
          <ArrowRight aria-hidden="true" className="size-4 transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </a>
  );
}
