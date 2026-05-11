import { ArrowRight, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface RegionCarouselProps {
  regions: {
    slug: string;
    title: string;
    summary: string;
    tags: string[];
    cover?: string;
  }[];
}

const regionTone = [
  'from-slate-900 via-slate-700 to-blue-300',
  'from-blue-950 via-slate-700 to-sky-200',
  'from-slate-800 via-blue-700 to-slate-300',
  'from-slate-950 via-slate-600 to-blue-200',
];

export default function RegionCarousel({ regions }: RegionCarouselProps) {
  return (
    <Card className="relative min-h-[220px] overflow-hidden p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-normal text-slate-950">国家与地区 · 索引</h2>
        <a
          href="/regions"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
        >
          查看全部
          <ArrowRight aria-hidden="true" className="size-4" />
        </a>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {regions.slice(0, 4).map((region, index) => (
          <a
            key={region.slug}
            href={`/regions/${region.slug}`}
            className="group overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
          >
            <div className={`h-20 bg-gradient-to-br ${regionTone[index % regionTone.length]}`}>
              {region.cover ? (
                <img
                  src={region.cover}
                  alt={`${region.title}地区封面`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="h-full w-full bg-[linear-gradient(115deg,rgba(255,255,255,0.18)_0_18%,transparent_19%_100%),radial-gradient(circle_at_72%_28%,rgba(255,255,255,0.56),transparent_24%)]" />
              )}
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold text-slate-950">{region.title}</h3>
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{region.summary}</p>
            </div>
          </a>
        ))}
      </div>

      <button
        type="button"
        aria-label="浏览更多地区"
        className="absolute right-[-1px] top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-l-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:text-blue-700 xl:flex"
      >
        <ChevronRight aria-hidden="true" className="size-5" />
      </button>
    </Card>
  );
}
