import { Archive, Boxes, CalendarClock, Globe2, Network, Sparkles } from 'lucide-react';
import TagPill from '@/components/cards/TagPill';
import { displaySpoilerLevel, displayStatus } from '@/lib/display';
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
  cover?: string;
}

const icons = {
  regions: Globe2,
  factions: Network,
  events: CalendarClock,
  terms: Sparkles,
  sources: Archive,
} satisfies Record<EntryCollection, typeof Globe2>;

const sceneBackgrounds = {
  regions: 'from-slate-950 via-blue-950 to-slate-300',
  factions: 'from-slate-950 via-indigo-950 to-blue-200',
  events: 'from-slate-950 via-sky-950 to-slate-300',
  terms: 'from-slate-950 via-blue-900 to-cyan-200',
  sources: 'from-slate-950 via-slate-800 to-blue-200',
} satisfies Record<EntryCollection, string>;

function isContainedCover(collection: EntryCollection, cover?: string) {
  if (!cover) {
    return false;
  }

  return collection === 'factions' || collection === 'terms' || cover.toLowerCase().endsWith('.svg');
}

export default function EntryHeader({
  collection,
  collectionLabel,
  title,
  aliases,
  summary,
  tags,
  status,
  spoilerLevel,
  cover,
}: EntryHeaderProps) {
  const Icon = icons[collection];
  const statusLabel = displayStatus(status);
  const spoilerLevelLabel = displaySpoilerLevel(spoilerLevel);
  const containedCover = isContainedCover(collection, cover);

  return (
    <header className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(260px,340px)] lg:gap-7 lg:p-7">
        <div className="relative z-10 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <TagPill tone="blue">{collectionLabel}</TagPill>
            {statusLabel && <TagPill>{statusLabel}</TagPill>}
            {spoilerLevelLabel && (
              <TagPill tone={spoilerLevel === 'none' ? 'slate' : 'amber'}>{spoilerLevelLabel}</TagPill>
            )}
          </div>

          <h1 className="mt-5 text-2xl font-semibold tracking-normal text-slate-950 sm:text-3xl">
            {title}
          </h1>

          {aliases.length > 0 && (
            <p className="mt-2 break-words text-sm font-medium text-slate-500">{aliases.join(' / ')}</p>
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

        <div
          className={[
            'relative min-h-[190px] overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br sm:min-h-[230px] lg:min-h-[260px]',
            sceneBackgrounds[collection],
          ].join(' ')}
        >
          {cover ? (
            <>
              <img
                src={cover}
                alt={`${title}封面`}
                className={[
                  'absolute inset-0 h-full w-full',
                  containedCover
                    ? 'object-contain p-8 drop-shadow-[0_18px_34px_rgba(255,255,255,0.12)] sm:p-10'
                    : 'object-cover',
                ].join(' ')}
                loading="eager"
                decoding="async"
              />
              <div
                className={[
                  'absolute inset-0',
                  containedCover
                    ? 'bg-[radial-gradient(circle_at_70%_20%,rgba(219,234,254,0.32),transparent_30%),linear-gradient(180deg,rgba(15,23,42,0.04),rgba(15,23,42,0.28))]'
                    : 'bg-gradient-to-t from-slate-950/48 via-slate-950/10 to-white/10',
                ].join(' ')}
              />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_22%,rgba(255,255,255,0.72),transparent_24%),linear-gradient(115deg,rgba(255,255,255,0.18)_0_18%,transparent_19%_100%)]" />
              <div className="absolute inset-x-8 bottom-8 top-8 rounded-full border border-white/20 sm:inset-x-12" />
              <div className="absolute left-1/2 top-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/12 text-white shadow-[0_24px_60px_rgba(15,23,42,0.25)] backdrop-blur">
                <Icon aria-hidden="true" className="size-11" />
              </div>
            </>
          )}
          <div className="absolute bottom-5 left-5 flex size-12 items-center justify-center rounded-full border border-white/40 bg-slate-950/25 text-white shadow-[0_18px_44px_rgba(15,23,42,0.24)] backdrop-blur">
            <Icon aria-hidden="true" className="size-6" />
          </div>
          <Boxes aria-hidden="true" className="absolute bottom-5 right-5 size-7 text-white/60" />
        </div>
      </div>
    </header>
  );
}
