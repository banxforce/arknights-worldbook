import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Loader2, Search } from 'lucide-react';
import TagPill from '@/components/cards/TagPill';
import SearchBox from './SearchBox';

interface PagefindResultData {
  url: string;
  excerpt: string;
  meta: {
    title?: string;
  };
}

interface PagefindResult {
  id: string;
  data: () => Promise<PagefindResultData>;
}

interface PagefindApi {
  search: (query: string) => Promise<{ results: PagefindResult[] }>;
}

interface LoadedResult {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  typeLabel: string;
}

interface PagefindSearchProps {
  initialQuery?: string;
}

const typeLabels = [
  { prefix: '/regions/', label: '地区' },
  { prefix: '/factions/', label: '阵营' },
  { prefix: '/events/', label: '事件' },
  { prefix: '/terms/', label: '术语' },
  { prefix: '/sources/', label: '档案' },
];

const loadPagefind = new Function('return import("/pagefind/pagefind.js")') as () => Promise<PagefindApi>;

function getTypeLabel(url: string) {
  return typeLabels.find((item) => url.startsWith(item.prefix))?.label ?? '页面';
}

function getQueryFromLocation(initialQuery: string) {
  if (initialQuery) {
    return initialQuery;
  }

  if (typeof window === 'undefined') {
    return '';
  }

  return new URLSearchParams(window.location.search).get('q') ?? '';
}

export default function PagefindSearch({ initialQuery = '' }: PagefindSearchProps) {
  const [query, setQuery] = useState(() => getQueryFromLocation(initialQuery));
  const [results, setResults] = useState<LoadedResult[]>([]);
  const [pagefind, setPagefind] = useState<PagefindApi | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    loadPagefind()
      .then((module) => {
        if (mounted) {
          setPagefind(module as PagefindApi);
        }
      })
      .catch(() => {
        if (mounted) {
          setError('搜索索引尚未加载。请先执行 pnpm build，并在 pnpm preview 下访问。');
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!pagefind) {
      return;
    }

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setResults([]);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setError('');

    pagefind
      .search(trimmedQuery)
      .then(async (search) => {
        const loaded = await Promise.all(
          search.results.slice(0, 12).map(async (result) => {
            const data = await result.data();

            return {
              id: result.id,
              title: data.meta.title ?? data.url,
              excerpt: data.excerpt,
              url: data.url,
              typeLabel: getTypeLabel(data.url),
            };
          }),
        );

        if (!cancelled) {
          setResults(loaded);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError('搜索失败，请稍后重试。');
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [pagefind, query]);

  const statusText = useMemo(() => {
    if (!query.trim()) {
      return '输入关键词后开始检索已构建的条目正文。';
    }

    if (isLoading) {
      return '正在检索泰拉百科索引...';
    }

    return `找到 ${results.length} 条结果`;
  }, [isLoading, query, results.length]);

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <div className="max-w-3xl">
        <SearchBox
          defaultValue={query}
          placeholder="搜索源石、罗德岛、切尔诺伯格..."
          inputClassName="h-12 bg-white"
        />
        <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
          {isLoading ? <Loader2 aria-hidden="true" className="size-4 animate-spin" /> : <Search aria-hidden="true" className="size-4" />}
          <span>{statusText}</span>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {error && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
            {error}
          </div>
        )}

        {!error &&
          results.map((result) => (
            <a
              key={result.id}
              href={result.url}
              className="group block rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 transition hover:border-blue-200 hover:bg-white hover:shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <TagPill tone="blue">{result.typeLabel}</TagPill>
                  <span className="text-xs font-medium text-slate-500">{result.url}</span>
                </div>
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-600"
                />
              </div>
              <h2 className="mt-3 text-lg font-semibold text-slate-950">{result.title}</h2>
              <p
                className="mt-2 text-sm leading-6 text-slate-600 [&_mark]:rounded [&_mark]:bg-blue-100 [&_mark]:px-1 [&_mark]:text-blue-800"
                dangerouslySetInnerHTML={{ __html: result.excerpt }}
              />
            </a>
          ))}

        {!error && query.trim() && !isLoading && results.length === 0 && (
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6 text-sm leading-6 text-slate-500">
            没有找到匹配条目。可以尝试搜索「源石」「矿石病」「罗德岛」或「切尔诺伯格」。
          </div>
        )}
      </div>
    </section>
  );
}
