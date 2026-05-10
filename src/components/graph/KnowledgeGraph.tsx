import { ArrowRight } from 'lucide-react';
import TagPill from '@/components/cards/TagPill';
import EmptyState from '@/components/ui/EmptyState';
import type { EntryCollection } from '@/lib/entry';

export interface GraphNode {
  id: string;
  slug: string;
  title: string;
  href: string;
  collection: EntryCollection;
  collectionLabel: string;
  summary: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
}

interface KnowledgeGraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

const toneByCollection: Record<EntryCollection, string> = {
  terms: 'border-blue-300 bg-blue-50 text-blue-800',
  regions: 'border-slate-300 bg-slate-50 text-slate-800',
  factions: 'border-indigo-200 bg-indigo-50 text-indigo-800',
  events: 'border-sky-200 bg-sky-50 text-sky-800',
  sources: 'border-slate-200 bg-white text-slate-700',
};

function getNodePosition(node: GraphNode, index: number, total: number) {
  if (node.slug === 'originium') {
    return { x: 50, y: 50 };
  }

  const angle = (Math.PI * 2 * index) / Math.max(total, 1) - Math.PI / 2;
  const radiusX = 34;
  const radiusY = 31;

  return {
    x: 50 + Math.cos(angle) * radiusX,
    y: 50 + Math.sin(angle) * radiusY,
  };
}

export default function KnowledgeGraph({ nodes, edges }: KnowledgeGraphProps) {
  if (nodes.length === 0) {
    return <EmptyState title="暂无图谱节点" description="当前内容集合还没有可用于生成关系图谱的条目。" />;
  }

  const sortedNodes = [...nodes].sort((a, b) => {
    if (a.slug === 'originium') return -1;
    if (b.slug === 'originium') return 1;
    return a.collection.localeCompare(b.collection) || a.title.localeCompare(b.title, 'zh-CN');
  });

  const outerNodes = sortedNodes.filter((node) => node.slug !== 'originium');
  const positionedNodes = new Map(
    sortedNodes.map((node) => {
      const index = outerNodes.findIndex((item) => item.id === node.id);
      const position = getNodePosition(node, index === -1 ? 0 : index, outerNodes.length);

      return [node.id, { ...node, ...position }];
    }),
  );

  const visibleEdges = edges
    .map((edge) => ({
      ...edge,
      sourceNode: positionedNodes.get(edge.source),
      targetNode: positionedNodes.get(edge.target),
    }))
    .filter((edge) => edge.sourceNode && edge.targetNode)
    .slice(0, 40);

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="relative min-h-[620px] border-b border-slate-200/80 bg-[radial-gradient(circle_at_50%_45%,rgba(219,234,254,0.9),transparent_34%),linear-gradient(180deg,#ffffff,#f8fbff)] xl:border-b-0 xl:border-r">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <ellipse cx="50" cy="50" rx="35" ry="32" fill="none" stroke="rgb(191 219 254)" strokeDasharray="1.4 1.4" strokeWidth="0.25" />
            {visibleEdges.map((edge) => (
              <line
                key={edge.id}
                x1={edge.sourceNode!.x}
                y1={edge.sourceNode!.y}
                x2={edge.targetNode!.x}
                y2={edge.targetNode!.y}
                stroke="rgb(147 197 253)"
                strokeOpacity="0.72"
                strokeWidth="0.28"
              />
            ))}
          </svg>

          {Array.from(positionedNodes.values()).map((node) => (
            <a
              key={node.id}
              href={node.href}
              className={[
                'absolute flex min-h-14 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl border px-3 py-2 text-center shadow-sm transition hover:-translate-y-[54%] hover:shadow-md',
                toneByCollection[node.collection],
                node.slug === 'originium' ? 'z-20 scale-110 border-blue-400 bg-white shadow-[0_18px_46px_rgba(37,99,235,0.16)]' : 'z-10',
              ].join(' ')}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <span className="max-w-full truncate text-sm font-semibold">{node.title}</span>
              <span className="mt-1 text-[11px] font-medium opacity-70">{node.collectionLabel}</span>
            </a>
          ))}
        </div>

        <aside className="p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">Relation Network</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-normal text-slate-950">知识图谱 · 关系网络</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            第一版图谱从各条目的 related 字段生成节点与边，用于快速查看源石、感染者、组织、事件和资料出处之间的关联。
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {Object.entries({
              terms: '术语',
              regions: '地区',
              factions: '阵营',
              events: '事件',
              sources: '档案',
            }).map(([key, label]) => (
              <TagPill key={key} tone={key === 'terms' ? 'blue' : 'slate'}>
                {label}
              </TagPill>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-slate-500">节点</dt>
                <dd className="mt-1 text-2xl font-semibold text-slate-950">{nodes.length}</dd>
              </div>
              <div>
                <dt className="text-slate-500">关系</dt>
                <dd className="mt-1 text-2xl font-semibold text-slate-950">{edges.length}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-6 space-y-3">
            {sortedNodes.slice(0, 8).map((node) => (
              <a
                key={`list-${node.id}`}
                href={node.href}
                className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white p-3 transition hover:border-blue-200 hover:shadow-sm"
              >
                <span>
                  <span className="block text-sm font-semibold text-slate-950">{node.title}</span>
                  <span className="mt-1 block text-xs text-slate-500">{node.collectionLabel}</span>
                </span>
                <ArrowRight aria-hidden="true" className="size-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-600" />
              </a>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
