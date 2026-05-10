import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';

interface SearchBoxProps {
  className?: string;
  inputClassName?: string;
  defaultValue?: string;
  placeholder?: string;
}

export default function SearchBox({
  className = '',
  inputClassName = '',
  defaultValue = '',
  placeholder = '搜索地区、组织、角色、时间线、术语...',
}: SearchBoxProps) {
  return (
    <form action="/search" className={['relative w-full', className].join(' ')}>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400"
      />
      <Input
        name="q"
        type="search"
        aria-label="全局搜索"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={[
          'h-11 rounded-xl border-slate-200/90 bg-slate-50/70 pl-12 text-sm shadow-inner shadow-slate-100/70',
          inputClassName,
        ].join(' ')}
      />
    </form>
  );
}
