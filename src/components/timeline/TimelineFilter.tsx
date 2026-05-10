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
              'rounded-full border px-3 py-1.5 text-sm font-semibold transition',
              active
                ? 'border-blue-200 bg-blue-600 text-white shadow-sm'
                : 'border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700',
            ].join(' ')}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}
