import { ArrowRight, BookOpenText } from 'lucide-react';
import TagPill from './TagPill';

interface TermCardProps {
  slug: string;
  title: string;
  aliases: string[];
  summary: string;
  tags: string[];
  termType?: string;
  spoilerLevel: string;
}

export default function TermCard({
  slug,
  title,
  aliases,
  summary,
  tags,
  termType,
  spoilerLevel,
}: TermCardProps) {
  return (
    <a
      href={`/terms/${slug}`}
      className="group flex min-h-[244px] flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_18px_44px_rgba(15,23,42,0.08)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
          <p className="mt-1 text-xs font-medium text-slate-500">
            {aliases[0] ?? termType ?? 'Terra Term'}
          </p>
        </div>
        <span className="flex size-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
          <BookOpenText aria-hidden="true" className="size-5" />
        </span>
      </div>
      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">{summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {tags.slice(0, 3).map((tag) => (
          <TagPill key={tag} tone="blue">
            {tag}
          </TagPill>
        ))}
        <TagPill tone={spoilerLevel === 'none' ? 'slate' : 'amber'}>剧透 {spoilerLevel}</TagPill>
      </div>
      <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-blue-600">
        查看术语解释
        <ArrowRight aria-hidden="true" className="size-4 transition group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}
