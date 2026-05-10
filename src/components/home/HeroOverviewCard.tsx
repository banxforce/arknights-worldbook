import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

const overviewTags = ['天灾', '源石', '矿石病', '文明与冲突', '希望与未来'];

export default function HeroOverviewCard() {
  return (
    <Card className="relative min-h-[292px] overflow-hidden p-7">
      <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[52%] overflow-hidden sm:block">
        <div className="absolute inset-y-0 left-0 z-20 w-40 bg-gradient-to-r from-white via-white/82 to-transparent" />
        <div className="terra-orbit terra-orbit-one" />
        <div className="terra-orbit terra-orbit-two" />
        <div className="terra-orbit terra-orbit-three" />
        <div className="terra-star terra-star-primary" />
        <div className="terra-star terra-star-secondary" />
        <div className="terra-star terra-star-tertiary" />
        <img className="terra-planet" src="/images/home/terra-planet.png?v=2" alt="" aria-hidden="true" />
      </div>

      <div className="relative z-10 max-w-[430px]">
        <h1 className="text-3xl font-semibold tracking-normal text-slate-950">泰拉世界 · 概览</h1>
        <p className="mt-6 max-w-[410px] text-sm leading-7 text-slate-600">
          泰拉，是一个被“天灾”与“源石”所塑造的世界。源石蕴含神秘能量，推动了文明的进程，也带来了无法治愈的矿石病与社会动荡。
        </p>
        <p className="mt-3 max-w-[410px] text-sm leading-7 text-slate-600">
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
