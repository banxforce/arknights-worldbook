import { ArrowRight, Boxes, Castle, Radiation, Sparkles, Stethoscope, Tent } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const nodes = [
  { label: '天灾', icon: Sparkles, className: 'left-[34%] top-[12%]' },
  { label: '矿石病', icon: Stethoscope, className: 'right-[28%] top-[18%]' },
  { label: '泰拉各国', icon: Castle, className: 'left-[18%] top-[44%]' },
  { label: '各大势力', icon: Tent, className: 'right-[16%] top-[46%]' },
  { label: '技术与文明', icon: Boxes, className: 'left-[47%] bottom-[10%]' },
] as const;

export default function KnowledgeGraphPreview() {
  return (
    <Card className="relative min-h-[292px] overflow-hidden p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-normal text-slate-950">知识图谱 · 关系网络</h2>
      </div>

      <div className="relative mx-auto mt-2 h-[218px] max-w-[620px]">
        <div className="absolute left-1/2 top-1/2 h-36 w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-blue-200" />
        <div className="absolute left-1/2 top-1/2 h-px w-[430px] -translate-x-1/2 bg-blue-200" />
        <div className="absolute left-1/2 top-1/2 h-[178px] w-px -translate-x-1/2 -translate-y-1/2 bg-blue-200" />
        <div className="absolute left-[33%] top-[28%] h-px w-[200px] rotate-45 bg-blue-200" />
        <div className="absolute right-[30%] top-[30%] h-px w-[190px] -rotate-45 bg-blue-200" />

        <div className="absolute left-1/2 top-1/2 z-10 flex size-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-blue-300 bg-white text-center shadow-[0_14px_36px_rgba(37,99,235,0.12)]">
          <Radiation aria-hidden="true" className="size-8 text-slate-800" />
          <span className="mt-1 text-base font-semibold text-slate-950">源石</span>
        </div>

        {nodes.map((node) => {
          const Icon = node.icon;

          return (
            <div
              key={node.label}
              className={`absolute flex -translate-x-1/2 flex-col items-center gap-1 text-center ${node.className}`}
            >
              <span className="flex size-14 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 shadow-sm">
                <Icon aria-hidden="true" className="size-6" />
              </span>
              <span className="whitespace-nowrap text-sm font-semibold text-slate-700">{node.label}</span>
            </div>
          );
        })}
      </div>

      <a
        href="/graph"
        className="absolute bottom-6 left-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
      >
        探索完整图谱
        <ArrowRight aria-hidden="true" className="size-4" />
      </a>
    </Card>
  );
}
