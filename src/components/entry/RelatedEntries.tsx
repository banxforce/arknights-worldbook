import { ArrowRight } from 'lucide-react';
import TagPill from '@/components/cards/TagPill';
import type { EntrySummary } from '@/lib/entry';

interface RelatedEntriesProps {
  entries: EntrySummary[];
  title?: string;
  compact?: boolean;
}

export default function RelatedEntries({
  entries,
  title = '相关条目',
  compact = false,
}: RelatedEntriesProps) {
  if (entries.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-slate-950">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">暂无已整理的关联条目。</p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-slate-950">{title}</h2>
      <div className={compact ? 'mt-4 space-y-3' : 'mt-4 grid gap-3 sm:grid-cols-2'}>
        {entries.map((entry) => (
          <a
            key={`${entry.collection}-${entry.slug}`}
            href={entry.href}
            className="group block rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 transition hover:border-blue-200 hover:bg-white hover:shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <TagPill tone="blue">{entry.collectionLabel}</TagPill>
              <ArrowRight
                aria-hidden="true"
                className="size-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-600"
              />
            </div>
            <h3 className="mt-3 text-sm font-semibold text-slate-950">{entry.title}</h3>
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{entry.summary}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
