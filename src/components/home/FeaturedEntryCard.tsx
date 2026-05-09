import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

interface FeaturedEntryCardProps {
  entry: {
    slug: string;
    title: string;
    aliases: string[];
    summary: string;
    tags: string[];
    spoilerLevel: string;
  };
}

export default function FeaturedEntryCard({ entry }: FeaturedEntryCardProps) {
  return (
    <Card className="relative min-h-[240px] overflow-hidden p-6">
      <div className="pointer-events-none absolute bottom-0 right-0 h-full w-[43%] min-w-[250px]">
        <div className="absolute bottom-7 right-8 h-40 w-32 bg-[linear-gradient(135deg,#e2e8f0,#0f172a_45%,#93c5fd)] shadow-[0_26px_50px_rgba(15,23,42,0.22)] [clip-path:polygon(50%_0,88%_25%,76%_100%,24%_100%,8%_28%)]" />
        <div className="absolute bottom-11 right-20 h-32 w-16 bg-[linear-gradient(150deg,#ffffff,#60a5fa_32%,#0f172a_74%)] opacity-95 [clip-path:polygon(42%_0,100%_34%,70%_100%,0_100%,10%_30%)]" />
        <div className="absolute bottom-5 right-2 size-60 rounded-full border border-blue-100" />
        <div className="absolute bottom-10 right-14 size-44 rounded-full border border-blue-100/80" />
        <div className="absolute bottom-20 right-0 h-px w-64 -rotate-12 bg-blue-100" />
      </div>

      <div className="relative z-10 max-w-[560px]">
        <h2 className="text-xl font-semibold tracking-normal text-slate-950">
          精选条目：{entry.title}
        </h2>

        <div className="mt-4 flex flex-wrap gap-2">
          {entry.tags.slice(0, 3).map((tag, index) => (
            <Badge key={tag} tone={index === 2 ? 'red' : 'blue'}>
              {tag}
            </Badge>
          ))}
        </div>

        <p className="mt-4 max-w-[520px] text-sm leading-7 text-slate-600">{entry.summary}</p>

        <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-600">
          <div className="flex gap-2">
            <dt className="font-semibold text-slate-700">别名:</dt>
            <dd>{entry.aliases[0] ?? 'Originium'}</dd>
          </div>
          <div className="text-slate-300">|</div>
          <div className="flex gap-2">
            <dt className="font-semibold text-slate-700">类型:</dt>
            <dd>矿物</dd>
          </div>
          <div className="text-slate-300">|</div>
          <div className="flex gap-2">
            <dt className="font-semibold text-slate-700">危险度:</dt>
            <dd>{entry.spoilerLevel === 'high' ? '高' : '中'}</dd>
          </div>
        </dl>

        <a
          href={`/terms/${entry.slug}`}
          className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
        >
          查看完整条目
          <ArrowRight aria-hidden="true" className="size-4" />
        </a>
      </div>
    </Card>
  );
}
