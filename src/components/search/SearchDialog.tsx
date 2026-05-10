import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import SearchBox from './SearchBox';

export default function SearchDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <Button type="button" variant="ghost" size="icon" aria-label="打开搜索" onClick={() => setOpen(true)}>
        <Search aria-hidden="true" className="size-5" />
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 bg-slate-950/20 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="mx-auto mt-24 max-w-2xl rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-slate-950">搜索泰拉百科</h2>
              <Button type="button" variant="ghost" size="icon" aria-label="关闭搜索" onClick={() => setOpen(false)}>
                <X aria-hidden="true" className="size-5" />
              </Button>
            </div>
            <SearchBox inputClassName="h-12 bg-white" />
          </div>
        </div>
      )}
    </>
  );
}
