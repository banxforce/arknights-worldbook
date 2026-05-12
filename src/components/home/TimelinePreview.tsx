import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface TimelinePreviewProps {
  events: {
    slug: string;
    title: string;
    summary: string;
    eventDate?: string;
    sortYear?: number;
  }[];
}

const fallbackNodes = [
  { title: '远古时期', summary: '源石与原始生态' },
  { title: '古代文明期', summary: '多文明兴起与交汇' },
  { title: '天灾频发期', summary: '天灾开始频繁' },
  { title: '近现代', summary: '矿石病蔓延' },
  { title: '现代', summary: '多方对抗与合作' },
];

export default function TimelinePreview({ events }: TimelinePreviewProps) {
  const eventNodes = [...events]
    .sort((a, b) => (a.sortYear ?? 999999) - (b.sortYear ?? 999999) || a.title.localeCompare(b.title, 'zh-CN'))
    .slice(0, 5)
    .map((event) => ({
      title: event.eventDate ? `${event.eventDate} · ${event.title}` : event.title,
      summary: event.summary,
    }));
  const nodes = eventNodes.length >= 3 ? eventNodes : fallbackNodes;

  return (
    <Card className="min-h-[220px] p-6">
      <h2 className="text-xl font-semibold tracking-normal text-slate-950">时间线 · 历史轨迹</h2>

      <div className="mt-8">
        <div className="relative hidden h-4 xl:block">
          <div className="absolute left-1 right-1 top-1/2 h-px -translate-y-1/2 bg-blue-500" />
          <div className="relative z-10 grid grid-cols-5">
            {nodes.map((node, index) => (
              <div key={`${node.title}-dot-${index}`} className="flex justify-center">
                <span className="block size-4 rounded-full border-2 border-blue-600 bg-white shadow-[0_0_0_4px_rgba(219,234,254,0.9)]" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 xl:grid-cols-5">
          {nodes.map((node, index) => (
            <div key={`${node.title}-${index}`} className="relative xl:text-center">
              <span className="mb-3 block size-4 rounded-full border-2 border-blue-600 bg-white shadow-[0_0_0_4px_rgba(219,234,254,0.9)] xl:hidden" />
              <h3 className="text-sm font-semibold text-slate-950">{node.title}</h3>
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{node.summary}</p>
            </div>
          ))}
        </div>
      </div>

      <a
        href="/timeline"
        className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
      >
        查看完整时间线
        <ArrowRight aria-hidden="true" className="size-4" />
      </a>
    </Card>
  );
}
