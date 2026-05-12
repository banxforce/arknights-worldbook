import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  CircleDot,
  Layers3,
  List,
  Map as MapIcon,
  MapPin,
  Network,
  ScrollText,
  ShieldAlert,
  Users,
} from 'lucide-react';
import TimelineFilter from './TimelineFilter';
import TimelineNode from './TimelineNode';
import type { TimelineEvent } from './TimelineNode';

interface TimelineProps {
  events: TimelineEvent[];
  filters: string[];
}

export default function Timeline({ events, filters }: TimelineProps) {
  const [activeFilter, setActiveFilter] = useState('全部');
  const [selectedSlug, setSelectedSlug] = useState(
    events.find((event) => event.slug === 'chernobog-incident')?.slug ?? events[0]?.slug ?? '',
  );
  const [visibleLimit, setVisibleLimit] = useState(6);
  const filterOptions = useMemo(() => ['全部', ...filters], [filters]);

  const visibleEvents = useMemo(() => {
    return events
      .filter((event) => activeFilter === '全部' || event.tags.includes(activeFilter))
      .sort((a, b) => a.sortYear - b.sortYear || a.title.localeCompare(b.title, 'zh-CN'));
  }, [activeFilter, events]);

  const displayEvents = useMemo(() => visibleEvents.slice(0, visibleLimit), [visibleEvents, visibleLimit]);

  useEffect(() => {
    setVisibleLimit(6);
  }, [activeFilter]);

  useEffect(() => {
    if (visibleEvents.length === 0) {
      setSelectedSlug('');
      return;
    }

    if (!visibleEvents.some((event) => event.slug === selectedSlug)) {
      setSelectedSlug(visibleEvents[0].slug);
    }
  }, [selectedSlug, visibleEvents]);

  const selectedEvent = useMemo(() => {
    return visibleEvents.find((event) => event.slug === selectedSlug) ?? visibleEvents[0];
  }, [selectedSlug, visibleEvents]);

  const eras = useMemo(() => {
    const groups = new globalThis.Map<string, { label: string; range: string; active: boolean }>();

    events
      .sort((a, b) => a.sortYear - b.sortYear)
      .forEach((event) => {
        const label = event.era ?? '未分期';
        const existing = groups.get(label);
        const years = events
          .filter((item) => (item.era ?? '未分期') === label)
          .map((item) => item.dateLabel);

        groups.set(label, {
          label,
          range: existing?.range ?? formatRange(years),
          active: visibleEvents.some((item) => (item.era ?? '未分期') === label),
        });
      });

    return [...groups.values()];
  }, [events, visibleEvents]);

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-200/80 bg-white/95 p-5 backdrop-blur sm:p-6 xl:flex-row xl:items-center xl:justify-between">
        <TimelineFilter filters={filterOptions} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1 text-sm font-semibold text-slate-600">
            <button
              type="button"
              className="inline-flex h-8 items-center gap-2 rounded-lg bg-blue-100 px-3 text-blue-700"
            >
              <Network aria-hidden="true" className="size-4" />
              时间轴视图
            </button>
            <button
              type="button"
              className="inline-flex h-8 items-center gap-2 rounded-lg px-3 text-slate-500 hover:text-slate-700"
            >
              <List aria-hidden="true" className="size-4" />
              列表视图
            </button>
          </div>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
          >
            按时间正序
            <ChevronDown aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>

      <div className="grid min-w-0 gap-0 xl:grid-cols-[180px_minmax(0,1fr)_430px]">
        <aside className="border-b border-slate-200/80 bg-slate-50/50 p-5 xl:border-b-0 xl:border-r xl:p-6">
          <div className="xl:sticky xl:top-[96px]">
            <div className="mb-5 flex items-center gap-2 text-xs font-bold text-slate-500">
              <Layers3 aria-hidden="true" className="size-4 text-blue-600" />
              时代索引
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1 xl:block xl:overflow-visible xl:pb-0">
              {eras.map((era) => (
                <div
                  key={era.label}
                  className={[
                    'relative min-w-[128px] border-l-2 py-2 pl-4 xl:min-w-0',
                    era.active ? 'border-blue-600' : 'border-slate-200',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'absolute -left-[5px] top-4 size-2 rounded-full',
                      era.active ? 'bg-blue-600 shadow-[0_0_0_5px_rgba(59,130,246,0.16)]' : 'bg-slate-300',
                    ].join(' ')}
                  />
                  <p className={['text-sm font-bold', era.active ? 'text-blue-700' : 'text-slate-600'].join(' ')}>
                    {era.label}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{era.range}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 hidden rounded-xl border border-slate-200 bg-white p-4 xl:block">
              <p className="text-xs font-bold text-slate-600">图例说明</p>
              <div className="mt-3 space-y-2 text-xs text-slate-500">
                <LegendDot className="bg-blue-600" label="主线剧情" />
                <LegendDot className="bg-sky-500" label="地区事件" />
                <LegendDot className="bg-violet-500" label="罗德岛相关" />
                <LegendDot className="bg-orange-500" label="灾变 / 源石" />
              </div>
              <p className="mt-4 text-xs leading-5 text-slate-400">点击事件可查看右侧详情。</p>
            </div>
          </div>
        </aside>

        <div className="min-w-0 bg-white p-5 sm:p-6">
          {visibleEvents.length > 0 ? (
            <ol className="space-y-5">
              {displayEvents.map((event, index) => (
                <TimelineNode
                  key={event.slug}
                  event={event}
                  index={index}
                  active={event.slug === selectedEvent?.slug}
                  onSelect={(nextEvent) => setSelectedSlug(nextEvent.slug)}
                />
              ))}
            </ol>
          ) : (
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6 text-sm text-slate-500">
              当前筛选下暂无事件。
            </div>
          )}

          {visibleEvents.length > displayEvents.length ? (
            <button
              type="button"
              onClick={() => setVisibleLimit((current) => current + 4)}
              className="mx-auto mt-5 flex h-10 min-w-[180px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-5 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              加载更多事件
              <ChevronDown aria-hidden="true" className="size-4" />
            </button>
          ) : null}
        </div>

        <aside className="border-t border-slate-200/80 bg-slate-50/60 p-5 xl:border-l xl:border-t-0 xl:p-6">
          {selectedEvent ? <TimelineDetail event={selectedEvent} /> : null}
        </aside>
      </div>
    </section>
  );
}

function TimelineDetail({ event }: { event: TimelineEvent }) {
  const metaRows = [
    { icon: MapPin, label: '涉及地区', value: event.locationLabel ?? '待整理' },
    { icon: Users, label: '涉及组织', value: event.involved.length > 0 ? event.involved.join('、') : '待整理' },
    { icon: CircleDot, label: '时间范围', value: event.displayDate ?? event.dateLabel },
    { icon: ShieldAlert, label: '事件性质', value: event.nature ?? event.eventType ?? '待整理' },
    { icon: BookOpen, label: '历史意义', value: event.significance ?? event.summary },
  ];

  return (
    <div className="sticky top-[96px] space-y-4">
      <article className="rounded-2xl border border-slate-200/90 bg-white shadow-sm">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200/80 p-5">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-base font-bold text-blue-600">{event.dateLabel}</span>
              <span className="text-sm font-semibold text-slate-400">{event.era ?? '时间线'}</span>
            </div>
            <h2 className="mt-2 text-2xl font-bold leading-tight text-slate-950">{event.title}</h2>
          </div>
          <a
            href={event.href}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            aria-label="打开事件详情页"
          >
            <ArrowRight aria-hidden="true" className="size-5" />
          </a>
        </div>

        <div className="p-5">
          <div className="flex flex-wrap gap-2">
            {event.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-600">{event.summary}</p>

          <dl className="mt-5 space-y-4">
            {metaRows.map((row) => {
              const Icon = row.icon;

              return (
                <div key={row.label} className="grid grid-cols-[24px_78px_minmax(0,1fr)] gap-3 text-sm">
                  <Icon aria-hidden="true" className="mt-0.5 size-4 text-slate-400" />
                  <dt className="font-semibold text-slate-500">{row.label}</dt>
                  <dd className="min-w-0 leading-6 text-slate-700">{row.value}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </article>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-700">相关地点</h3>
            <MapIcon aria-hidden="true" className="size-4 text-blue-600" />
          </div>
          <div className="relative aspect-[1.55] overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
            {event.cover ? (
              <img src={event.cover} alt="" className="size-full object-cover opacity-35 grayscale" loading="lazy" />
            ) : null}
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(248,250,252,0.72),rgba(219,234,254,0.64))]" />
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
              <span className="flex size-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_0_0_10px_rgba(59,130,246,0.18)]">
                <MapPin aria-hidden="true" className="size-5" />
              </span>
              <span className="rounded-lg bg-white/90 px-2.5 py-1 text-xs font-bold text-slate-700 shadow-sm">
                {event.locationLabel ?? '泰拉'}
              </span>
            </div>
            <div className="absolute left-[18%] top-[28%] size-1.5 rounded-full bg-blue-400" />
            <div className="absolute right-[24%] top-[38%] size-1 rounded-full bg-slate-400" />
            <div className="absolute bottom-[22%] left-[34%] size-1 rounded-full bg-slate-400" />
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-500">{event.mapNote ?? '地点信息待继续补全。'}</p>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-700">相关条目</h3>
            <ScrollText aria-hidden="true" className="size-4 text-blue-600" />
          </div>
          <div className="space-y-2">
            {[event.period, event.eventType, ...(event.involved ?? [])].filter(Boolean).slice(0, 5).map((item) => (
              <div key={item} className="rounded-xl bg-slate-50 px-3 py-2 text-sm font-semibold text-blue-700">
                {item}
              </div>
            ))}
          </div>
          <a href={event.href} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700">
            查看更多
            <ArrowRight aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>

      {event.sourceNote ? (
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 text-xs leading-5 text-slate-500 shadow-sm">
          <span className="font-bold text-slate-600">资料说明：</span>
          {event.sourceNote}
        </div>
      ) : null}
    </div>
  );
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={['size-2 rounded-full', className].join(' ')} />
      <span>{label}</span>
    </div>
  );
}

function formatRange(years: string[]) {
  if (years.length === 0) {
    return '时间待整理';
  }

  const first = years[0];
  const last = years[years.length - 1];

  return first === last ? first : `${first} - ${last}`;
}
