interface TimelineFilterProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function TimelineFilter({
  filters,
  activeFilter,
  onFilterChange,
}: TimelineFilterProps) {
  return (
    <div className="flex flex-wrap gap-2" aria-label="时间线筛选">
      {filters.map((filter) => {
        const active = filter === activeFilter;

        return (
          <button
            key={filter}
            type="button"
            onClick={() => onFilterChange(filter)}
            className={[
              'h-9 rounded-xl border px-4 text-sm font-semibold transition',
              active
                ? 'border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                : 'border-slate-200 bg-slate-50/80 text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700',
            ].join(' ')}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}
