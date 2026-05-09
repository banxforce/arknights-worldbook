import {
  Archive,
  BookOpenText,
  Building2,
  Clock3,
  Globe2,
  Network,
} from 'lucide-react';
import { SITE_SUBTITLE, SITE_TITLE } from '@/lib/constants';
import { Separator } from '@/components/ui/Separator';

interface SidebarProps {
  currentPath: string;
}

const navItems = [
  { label: '世界观总览', href: '/', icon: Globe2 },
  { label: '国家与地区', href: '/regions', icon: Building2 },
  { label: '阵营组织', href: '/factions', icon: Network },
  { label: '时间线', href: '/timeline', icon: Clock3 },
  { label: '术语词典', href: '/terms', icon: BookOpenText },
  { label: '档案库', href: '/sources', icon: Archive },
] as const;

function isActivePath(currentPath: string, href: string) {
  if (href === '/') {
    return currentPath === '/';
  }

  return currentPath === href || currentPath.startsWith(`${href}/`);
}

export default function Sidebar({ currentPath }: SidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[260px] border-r border-slate-200/80 bg-white/95 shadow-[8px_0_40px_rgba(15,23,42,0.04)] backdrop-blur lg:flex lg:flex-col">
      <a href="/" className="flex min-h-[88px] items-center gap-3 px-6">
        <span className="relative flex size-12 items-center justify-center rounded-2xl border border-blue-100 bg-gradient-to-br from-slate-950 to-slate-700 text-white shadow-sm">
          <span className="absolute inset-x-3 bottom-2 h-6 skew-x-[-18deg] border-l border-r border-white/70" />
          <span className="h-8 w-2 rounded-full bg-white" />
        </span>
        <span className="min-w-0">
          <span className="block text-xl font-semibold tracking-normal text-slate-950">
            {SITE_TITLE}
          </span>
          <span className="mt-1 block text-xs font-medium text-slate-500">
            {SITE_SUBTITLE}
          </span>
        </span>
      </a>

      <Separator />

      <nav className="flex-1 px-4 py-6" aria-label="主导航">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActivePath(currentPath, item.href);

            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={[
                  'group flex h-[52px] items-center gap-3 rounded-xl px-4 text-sm font-semibold transition',
                  active
                    ? 'border border-blue-100 bg-blue-50 text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950',
                ].join(' ')}
              >
                <Icon
                  aria-hidden="true"
                  className={[
                    'size-5 shrink-0 transition',
                    active ? 'text-blue-600' : 'text-slate-500 group-hover:text-slate-700',
                  ].join(' ')}
                />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
