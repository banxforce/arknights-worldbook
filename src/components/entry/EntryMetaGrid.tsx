interface MetaItem {
  label: string;
  value?: string | number;
}

interface EntryMetaGridProps {
  items: MetaItem[];
}

export default function EntryMetaGrid({ items }: EntryMetaGridProps) {
  const visibleItems = items.filter((item) => item.value !== undefined && item.value !== '');

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <section className="mt-5 grid gap-3 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
      {visibleItems.map((item) => (
        <div key={item.label} className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-4">
          <dt className="text-xs font-semibold text-slate-500">{item.label}</dt>
          <dd className="mt-2 text-sm font-semibold text-slate-900">{item.value}</dd>
        </div>
      ))}
    </section>
  );
}
