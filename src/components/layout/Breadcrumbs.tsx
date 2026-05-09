import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav className="mb-5 flex items-center gap-2 text-sm text-slate-500" aria-label="面包屑">
      <a href="/" className="inline-flex items-center gap-1 transition hover:text-blue-700">
        <Home aria-hidden="true" className="size-4" />
        <span>首页</span>
      </a>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
            <ChevronRight aria-hidden="true" className="size-4 text-slate-300" />
            {item.href && !isLast ? (
              <a href={item.href} className="transition hover:text-blue-700">
                {item.label}
              </a>
            ) : (
              <span className="font-medium text-slate-700">{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
