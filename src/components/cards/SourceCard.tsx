import { ArrowRight, FileText } from 'lucide-react';
import TagPill from './TagPill';

interface SourceCardProps {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  sourceType?: string;
  updatedAt: string;
}

export default function SourceCard({
  slug,
  title,
  summary,
  tags,
  sourceType,
  updatedAt,
}: SourceCardProps) {
  return (
    <a
      href={`/sources/${slug}`}
      className="group flex min-h-[236px] flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_18px_44px_rgba(15,23,42,0.08)]"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-12 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-700">
          <FileText aria-hidden="true" className="size-6" />
        </span>
        <span className="text-xs font-medium text-slate-500">{updatedAt}</span>
      </div>
      <h2 className="mt-5 text-lg font-semibold text-slate-950">{title}</h2>
      {sourceType && <p className="mt-1 text-xs font-medium text-slate-500">{sourceType}</p>}
      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">{summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {tags.slice(0, 3).map((tag) => (
          <TagPill key={tag}>{tag}</TagPill>
        ))}
      </div>
      <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-blue-600">
        查看档案来源
        <ArrowRight aria-hidden="true" className="size-4 transition group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}
