import { ArrowRight, CalendarClock } from 'lucide-react';
import TagPill from './TagPill';

interface EventCardProps {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  eventDate?: string;
  spoilerLevel: string;
}

export default function EventCard({
  slug,
  title,
  summary,
  tags,
  eventDate,
  spoilerLevel,
}: EventCardProps) {
  return (
    <a
      href={`/events/${slug}`}
      className="group flex min-h-[236px] flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_18px_44px_rgba(15,23,42,0.08)]"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          <CalendarClock aria-hidden="true" className="size-4" />
          {eventDate ?? '时间待整理'}
        </span>
        <TagPill tone={spoilerLevel === 'high' ? 'red' : 'amber'}>剧透 {spoilerLevel}</TagPill>
      </div>
      <h2 className="mt-5 text-lg font-semibold text-slate-950">{title}</h2>
      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">{summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {tags.slice(0, 3).map((tag) => (
          <TagPill key={tag}>{tag}</TagPill>
        ))}
      </div>
      <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-blue-600">
        查看事件条目
        <ArrowRight aria-hidden="true" className="size-4 transition group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}
