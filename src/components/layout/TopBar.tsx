import { Bell, Globe2, SunMedium } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import SearchBox from '@/components/search/SearchBox';
import { SITE_TITLE } from '@/lib/constants';

const iconActions = [
  { label: '主题', icon: SunMedium },
  { label: '语言与世界', icon: Globe2 },
  { label: '通知', icon: Bell },
] as const;

export default function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex min-h-[72px] items-center border-b border-slate-200/80 bg-white/86 px-4 py-3 backdrop-blur-xl sm:px-6 lg:h-[72px] lg:px-8 lg:py-0">
      <div className="mx-auto flex w-full max-w-[1500px] min-w-0 flex-wrap items-center gap-3 sm:flex-nowrap sm:gap-4">
        <a href="/" className="flex min-w-0 items-center gap-2 lg:hidden">
          <span className="flex size-9 items-center justify-center rounded-xl bg-slate-950 text-sm font-semibold text-white">
            泰
          </span>
          <span className="truncate text-base font-semibold text-slate-950">{SITE_TITLE}</span>
        </a>

        <SearchBox className="order-3 max-w-none basis-full sm:order-none sm:max-w-[760px] sm:min-w-0 sm:basis-auto" />

        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
          {iconActions.map((action) => {
            const Icon = action.icon;
            const compactClass = action.label === '通知' ? 'hidden sm:inline-flex' : '';

            return (
              <Button
                key={action.label}
                type="button"
                variant="ghost"
                size="icon"
                aria-label={action.label}
                title={action.label}
                className={`${compactClass} text-slate-600 hover:text-blue-700`}
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
