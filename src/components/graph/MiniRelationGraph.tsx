import { CircleDot } from 'lucide-react';
import type { EntrySummary } from '@/lib/entry';

interface MiniRelationGraphProps {
  title: string;
  related: EntrySummary[];
}

export default function MiniRelationGraph({ title, related }: MiniRelationGraphProps) {
  const visibleNodes = related.slice(0, 5);

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-slate-950">关系图</h2>
      <div className="relative mt-4 h-48 overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50">
        <div className="absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300 bg-white shadow-sm" />
        <div className="absolute left-1/2 top-1/2 h-px w-[78%] -translate-x-1/2 bg-blue-200" />
        <div className="absolute left-1/2 top-1/2 h-[78%] w-px -translate-y-1/2 bg-blue-200" />
        <div className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full text-center">
          <CircleDot aria-hidden="true" className="size-6 text-blue-700" />
          <span className="mt-1 max-w-16 truncate text-xs font-semibold text-slate-950">{title}</span>
        </div>
        {visibleNodes.map((node, index) => {
          const positions = [
            'left-[12%] top-[18%]',
            'right-[10%] top-[20%]',
            'left-[12%] bottom-[18%]',
            'right-[10%] bottom-[18%]',
            'left-1/2 bottom-[7%] -translate-x-1/2',
          ];

          return (
            <a
              key={`${node.collection}-${node.slug}`}
              href={node.href}
              className={`absolute ${positions[index]} max-w-24 rounded-full border border-slate-200 bg-white px-3 py-1 text-center text-xs font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700`}
            >
              <span className="block truncate">{node.title}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
