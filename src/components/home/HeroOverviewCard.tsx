import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

const overviewTags = ['天灾', '源石', '矿石病', '文明与冲突', '希望与未来'];

export default function HeroOverviewCard() {
  return (
    <Card className="relative min-h-[292px] overflow-hidden p-7">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[48%] overflow-hidden">
        <div className="absolute -right-16 top-4 size-80 rounded-full border border-blue-100 bg-[radial-gradient(circle_at_36%_30%,rgba(255,255,255,0.92),rgba(147,197,253,0.42)_36%,rgba(30,64,175,0.12)_68%,transparent_70%)] opacity-90" />
        <div className="absolute -right-10 top-10 size-64 rounded-full border border-white/70 bg-[linear-gradient(110deg,transparent_0_34%,rgba(255,255,255,0.62)_35%_37%,transparent_38%_100%),linear-gradient(18deg,transparent_0_45%,rgba(37,99,235,0.16)_46%_48%,transparent_49%_100%)]" />
        <div className="absolute right-14 top-16 size-3 rounded-full border-4 border-white bg-blue-400 shadow-[0_0_0_1px_rgba(96,165,250,0.45)]" />
        <div className="absolute right-6 top-24 h-px w-56 rotate-[-18deg] bg-blue-200/70" />
        <div className="absolute right-24 top-3 h-72 w-72 rounded-full border border-white/60" />
      </div>

      <div className="relative z-10 max-w-[560px]">
        <h1 className="text-3xl font-semibold tracking-normal text-slate-950">泰拉世界 · 概览</h1>
        <p className="mt-6 max-w-[520px] text-sm leading-7 text-slate-600">
          泰拉，是一个被“天灾”与“源石”所塑造的世界。源石蕴含神秘能量，推动了文明的进程，也带来了无法治愈的矿石病与社会动荡。
        </p>
        <p className="mt-3 max-w-[520px] text-sm leading-7 text-slate-600">
          在危机与对抗之外，合作、探索与希望始终在英雄中延续。
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {overviewTags.map((tag) => (
            <Badge key={tag} tone="blue" className="bg-blue-50/80">
              {tag}
            </Badge>
          ))}
        </div>

        <a
          href="/terms/originium"
          className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
        >
          进入世界观总览
          <ArrowRight aria-hidden="true" className="size-4" />
        </a>
      </div>
    </Card>
  );
}
