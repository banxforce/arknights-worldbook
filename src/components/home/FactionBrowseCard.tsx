import { ArrowRight, ChevronRight, Shield } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface FactionBrowseCardProps {
  factions: {
    slug: string;
    title: string;
    summary: string;
    tags: string[];
    cover?: string;
  }[];
}

export default function FactionBrowseCard({ factions }: FactionBrowseCardProps) {
  const getIconFrameClass = (hasCover: boolean) =>
    hasCover
      ? 'border-slate-900 bg-slate-950 p-2.5 shadow-inner shadow-white/10 group-hover:border-blue-400'
      : 'border-slate-200 bg-slate-50 text-slate-800 group-hover:border-blue-200 group-hover:text-blue-700';

  return (
    <Card className="relative min-h-[240px] overflow-hidden p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-normal text-slate-950">阵营组织 · 浏览</h2>
        <a
          href="/factions"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
        >
          查看全部
          <ArrowRight aria-hidden="true" className="size-4" />
        </a>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {factions.slice(0, 3).map((faction) => (
          <a
            key={faction.slug}
            href={`/factions/${faction.slug}`}
            className="group flex min-h-[150px] flex-col items-center justify-center rounded-xl border border-slate-200/80 bg-white px-4 py-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
          >
            <span
              className={`flex size-14 items-center justify-center rounded-2xl border transition ${getIconFrameClass(
                Boolean(faction.cover),
              )}`}
            >
              {faction.cover ? (
                <img
                  src={faction.cover}
                  alt={`${faction.title} 标志`}
                  className="size-full object-contain"
                  loading="lazy"
                />
              ) : (
                <Shield aria-hidden="true" className="size-7" />
              )}
            </span>
            <h3 className="mt-3 text-base font-semibold text-slate-950">{faction.title}</h3>
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{faction.summary}</p>
          </a>
        ))}
      </div>

      <button
        type="button"
        aria-label="浏览更多阵营"
        className="absolute right-[-1px] top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-l-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:text-blue-700 xl:flex"
      >
        <ChevronRight aria-hidden="true" className="size-5" />
      </button>
    </Card>
  );
}
