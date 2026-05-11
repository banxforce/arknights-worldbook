import { ArrowRight, CalendarClock } from 'lucide-react';
import TagPill from '@/components/cards/TagPill';

export interface TimelineEvent {
  slug: string;
  title: string;
  summary: string;
  dateLabel: string;
  sortYear: number;
  tags: string[];
  href: string;
}

interface TimelineNodeProps {
  event: TimelineEvent;
  index: number;
}

export default function TimelineNode({ event, index }: TimelineNodeProps) {
  const alignRight = index % 2 === 1;

  return (
    <div className="relative grid min-w-0 gap-4 md:grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)]">
      <div className={['timeline-card', alignRight ? 'md:col-start-3' : 'md:col-start-1'].join(' ')}>
        <a
          href={event.href}
          className="group block rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_18px_44px_rgba(15,23,42,0.08)]"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              <CalendarClock aria-hidden="true" className="size-4" />
              {event.dateLabel}
            </span>
            {event.tags.slice(0, 2).map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </div>
          <h2 className="mt-4 text-lg font-semibold text-slate-950">{event.title}</h2>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{event.summary}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
            查看事件条目
            <ArrowRight aria-hidden="true" className="size-4 transition group-hover:translate-x-0.5" />
          </span>
        </a>
      </div>

      <div className="absolute left-0 top-0 hidden h-full w-px bg-blue-100 md:left-1/2 md:block" />
      <div className="relative hidden items-start justify-center md:col-start-2 md:flex">
        <span className="z-10 mt-6 size-4 rounded-full border-2 border-blue-600 bg-white shadow-[0_0_0_6px_rgba(219,234,254,0.9)]" />
      </div>
    </div>
  );
}
