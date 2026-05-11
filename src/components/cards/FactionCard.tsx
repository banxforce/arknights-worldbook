import { ArrowRight, Network, Shield } from 'lucide-react';
import { displayFactionType } from '@/lib/display';
import TagPill from './TagPill';

interface FactionCardProps {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  factionType?: string;
}

export default function FactionCard({ slug, title, summary, tags, factionType }: FactionCardProps) {
  const factionTypeLabel = displayFactionType(factionType);

  return (
    <a
      href={`/factions/${slug}`}
      className="group flex min-h-[244px] flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_18px_44px_rgba(15,23,42,0.08)]"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-800 transition group-hover:border-blue-200 group-hover:text-blue-700">
          <Shield aria-hidden="true" className="size-7" />
        </span>
        <Network aria-hidden="true" className="size-5 text-slate-400" />
      </div>
      <h2 className="mt-5 text-lg font-semibold text-slate-950">{title}</h2>
      {factionTypeLabel && <p className="mt-1 text-xs font-medium text-slate-500">{factionTypeLabel}</p>}
      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">{summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {tags.slice(0, 3).map((tag) => (
          <TagPill key={tag} tone="slate">
            {tag}
          </TagPill>
        ))}
      </div>
      <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-blue-600">
        查看组织档案
        <ArrowRight aria-hidden="true" className="size-4 transition group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}
