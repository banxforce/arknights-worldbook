import { Bell, Globe2, Search, SunMedium } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const iconActions = [
  { label: '主题', icon: SunMedium },
  { label: '语言与世界', icon: Globe2 },
  { label: '通知', icon: Bell },
] as const;

export default function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center border-b border-slate-200/80 bg-white/86 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1500px] items-center gap-4">
        <form action="/search" className="relative w-full max-w-[760px]">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400"
          />
          <Input
            name="q"
            type="search"
            aria-label="全局搜索"
            placeholder="搜索地区、组织、角色、时间线、术语..."
            className="h-11 rounded-xl border-slate-200/90 bg-slate-50/70 pl-12 text-sm shadow-inner shadow-slate-100/70"
          />
        </form>

        <div className="ml-auto flex items-center gap-2">
          {iconActions.map((action) => {
            const Icon = action.icon;

            return (
              <Button
                key={action.label}
                type="button"
                variant="ghost"
                size="icon"
                aria-label={action.label}
                title={action.label}
                className="text-slate-600 hover:text-blue-700"
              >
                <Icon aria-hidden="true" className="size-5" />
              </Button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
