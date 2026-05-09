import { Archive, Boxes, CalendarClock, Globe2, Network, Sparkles } from 'lucide-react';
import TagPill from '@/components/cards/TagPill';
import type { EntryCollection } from '@/lib/entry';

interface EntryHeaderProps {
  collection: EntryCollection;
  collectionLabel: string;
  title: string;
  aliases: string[];
  summary: string;
  tags: string[];
  status: string;
  spoilerLevel: string;
}

const icons = {
  regions: Globe2,
  factions: Network,
  events: CalendarClock,
  terms: Sparkles,
  sources: Archive,
} satisfies Record<EntryCollection, typeof Globe2>;

export default function EntryHeader({
  collection,
  collectionLabel,
  title,
  aliases,
  summary,
  tags,
  status,
  spoilerLevel,
}: EntryHeaderProps) {
  const Icon = icons[collection];

  return (
    <header className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="grid gap-6 p-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:p-7">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <TagPill tone="blue">{collectionLabel}</TagPill>
            <TagPill>{status}</TagPill>
            <TagPill tone={spoilerLevel === 'none' ? 'slate' : 'amber'}>剧透 {spoilerLevel}</TagPill>
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-normal text-slate-950">{title}</h1>

          {aliases.length > 0 && (
            <p className="mt-2 text-sm font-medium text-slate-500">{aliases.join(' / ')}</p>
          )}

          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600">{summary}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <TagPill key={tag} tone="blue">
                {tag}
              </TagPill>
            ))}
          </div>
        </div>

        <div className="relative min-h-[220px] overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-200">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_22%,rgba(255,255,255,0.72),transparent_24%),linear-gradient(115deg,rgba(255,255,255,0.18)_0_18%,transparent_19%_100%)]" />
          <div className="absolute inset-x-8 bottom-8 top-8 rounded-full border border-white/20" />
          <div className="absolute left-1/2 top-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/12 text-white shadow-[0_24px_60px_rgba(15,23,42,0.25)] backdrop-blur">
            <Icon aria-hidden="true" className="size-11" />
          </div>
          <Boxes aria-hidden="true" className="absolute bottom-5 right-5 size-7 text-white/60" />
        </div>
      </div>
    </header>
  );
}
