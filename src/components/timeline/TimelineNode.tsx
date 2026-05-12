import { Bookmark, CalendarClock } from 'lucide-react';

export interface TimelineEvent {
  slug: string;
  title: string;
  summary: string;
  dateLabel: string;
  displayDate?: string;
  sortYear: number;
  tags: string[];
  href: string;
  cover?: string;
  era?: string;
  period?: string;
  eventType?: string;
  locationLabel?: string;
  involved: string[];
  nature?: string;
  significance?: string;
  mapNote?: string;
  sourceNote?: string;
}

interface TimelineNodeProps {
  event: TimelineEvent;
  index: number;
  active: boolean;
  onSelect: (event: TimelineEvent) => void;
}

const toneByTag: Record<string, string> = {
  主线: 'border-blue-200 bg-blue-50 text-blue-700',
  主线剧情: 'border-blue-200 bg-blue-50 text-blue-700',
  地区事件: 'border-sky-200 bg-sky-50 text-sky-700',
  罗德岛相关: 'border-violet-200 bg-violet-50 text-violet-700',
  灾变史: 'border-orange-200 bg-orange-50 text-orange-700',
  科技发展: 'border-cyan-200 bg-cyan-50 text-cyan-700',
  古代文明: 'border-slate-200 bg-slate-100 text-slate-700',
  政治冲突: 'border-rose-200 bg-rose-50 text-rose-700',
  源石相关: 'border-amber-200 bg-amber-50 text-amber-700',
};

export default function TimelineNode({ event, index, active, onSelect }: TimelineNodeProps) {
  return (
    <li className="relative grid grid-cols-[64px_minmax(0,1fr)] gap-4">
      <div className="relative flex justify-center">
        <div className="absolute bottom-[-24px] top-9 w-px bg-slate-200" aria-hidden="true" />
        <button
          type="button"
          onClick={() => onSelect(event)}
          className={[
            'relative z-10 mt-7 flex size-6 items-center justify-center rounded-full border bg-white transition',
            active
              ? 'border-blue-500 shadow-[0_0_0_7px_rgba(59,130,246,0.14)]'
              : 'border-slate-300 shadow-[0_0_0_5px_rgba(248,250,252,0.95)] hover:border-blue-300',
          ].join(' ')}
          aria-label={`查看 ${event.title}`}
        >
          <span className={['size-2.5 rounded-full', active ? 'bg-blue-600' : 'bg-slate-400'].join(' ')} />
        </button>
      </div>

      <button
        type="button"
        onClick={() => onSelect(event)}
        className={[
          'group grid min-h-[118px] grid-cols-[1fr_172px] overflow-hidden rounded-2xl border bg-white text-left shadow-sm transition max-sm:grid-cols-1',
          active
            ? 'border-blue-500 shadow-[0_18px_48px_rgba(37,99,235,0.14)]'
            : 'border-slate-200/90 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_18px_44px_rgba(15,23,42,0.08)]',
        ].join(' ')}
      >
        <div className="min-w-0 p-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex min-w-[54px] items-center text-sm font-bold text-slate-700">
              {event.dateLabel}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <CalendarClock aria-hidden="true" className="size-3.5" />
              {event.period ?? event.era ?? '时间节点'}
            </span>
          </div>
          <h2 className={['mt-3 text-lg font-bold', active ? 'text-blue-700' : 'text-slate-950'].join(' ')}>
            {event.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{event.summary}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {event.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={[
                  'inline-flex rounded-lg border px-2.5 py-1 text-xs font-semibold',
                  toneByTag[tag] ?? 'border-slate-200 bg-slate-50 text-slate-600',
                ].join(' ')}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="relative hidden min-h-[118px] overflow-hidden bg-slate-100 sm:block">
          {event.cover ? (
            <img
              src={event.cover}
              alt=""
              className="size-full object-cover transition duration-500 group-hover:scale-105"
              loading={index > 2 ? 'lazy' : 'eager'}
            />
          ) : (
            <div className="size-full bg-[linear-gradient(135deg,#e2e8f0,#eff6ff)]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/28 to-slate-950/10" />
          {active && (
            <span className="absolute right-3 top-3 inline-flex size-7 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-600/30">
              <Bookmark aria-hidden="true" className="size-4 fill-current" />
            </span>
          )}
        </div>
      </button>
    </li>
  );
}
