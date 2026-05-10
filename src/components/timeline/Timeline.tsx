import { useMemo, useState } from 'react';
import TimelineFilter from './TimelineFilter';
import TimelineNode from './TimelineNode';
import type { TimelineEvent } from './TimelineNode';

interface TimelineProps {
  events: TimelineEvent[];
  filters: string[];
}

export default function Timeline({ events, filters }: TimelineProps) {
  const [activeFilter, setActiveFilter] = useState('全部');
  const filterOptions = useMemo(() => ['全部', ...filters], [filters]);

  const visibleEvents = useMemo(() => {
    return events
      .filter((event) => activeFilter === '全部' || event.tags.includes(activeFilter))
      .sort((a, b) => a.sortYear - b.sortYear || a.title.localeCompare(b.title, 'zh-CN'));
  }, [activeFilter, events]);

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-normal text-slate-950">事件时间轴</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            按年份或时期标签梳理事件，并用标签筛选主线、地区和设定关联。
          </p>
        </div>
        <TimelineFilter filters={filterOptions} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>

      <div className="mt-8 space-y-6">
        {visibleEvents.length > 0 ? (
          visibleEvents.map((event, index) => (
            <TimelineNode key={event.slug} event={event} index={index} />
          ))
        ) : (
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6 text-sm text-slate-500">
            当前筛选下暂无事件。
          </div>
        )}
      </div>
    </section>
  );
}
