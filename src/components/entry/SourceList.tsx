import { FileText } from 'lucide-react';
import type { EntrySummary } from '@/lib/entry';

interface SourceListProps {
  sources: EntrySummary[];
}

export default function SourceList({ sources }: SourceListProps) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-slate-950">资料出处</h2>
      {sources.length > 0 ? (
        <div className="mt-4 space-y-3">
          {sources.map((source) => (
            <a
              key={source.slug}
              href={source.href}
              className="flex gap-3 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3 transition hover:border-blue-200 hover:bg-white"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                <FileText aria-hidden="true" className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-slate-900">{source.title}</span>
                <span className="mt-1 line-clamp-2 block text-xs leading-5 text-slate-500">
                  {source.summary}
                </span>
              </span>
            </a>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-sm leading-6 text-slate-500">暂无单独标注的资料来源。</p>
      )}
    </section>
  );
}
