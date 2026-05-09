import { getCollection, type CollectionEntry } from 'astro:content';

export type EntryCollection = 'regions' | 'factions' | 'events' | 'terms' | 'sources';

export type AnyEntry =
  | CollectionEntry<'regions'>
  | CollectionEntry<'factions'>
  | CollectionEntry<'events'>
  | CollectionEntry<'terms'>
  | CollectionEntry<'sources'>;

export interface EntrySummary {
  collection: EntryCollection;
  collectionLabel: string;
  slug: string;
  href: string;
  title: string;
  summary: string;
  tags: string[];
}

export const entryCollectionLabels: Record<EntryCollection, string> = {
  regions: '国家与地区',
  factions: '阵营组织',
  events: '事件',
  terms: '术语词典',
  sources: '档案库',
};

export const entryCollectionBasePaths: Record<EntryCollection, string> = {
  regions: '/regions',
  factions: '/factions',
  events: '/events',
  terms: '/terms',
  sources: '/sources',
};

export function getEntryHref(collection: EntryCollection, slug: string) {
  return `${entryCollectionBasePaths[collection]}/${slug}`;
}

export function toEntrySummary(entry: AnyEntry, collection: EntryCollection): EntrySummary {
  return {
    collection,
    collectionLabel: entryCollectionLabels[collection],
    slug: entry.data.slug,
    href: getEntryHref(collection, entry.data.slug),
    title: entry.data.title,
    summary: entry.data.summary,
    tags: entry.data.tags,
  };
}

export async function getAllEntrySummaries() {
  const [regions, factions, events, terms, sources] = await Promise.all([
    getCollection('regions'),
    getCollection('factions'),
    getCollection('events'),
    getCollection('terms'),
    getCollection('sources'),
  ]);

  return [
    ...regions.map((entry) => toEntrySummary(entry, 'regions')),
    ...factions.map((entry) => toEntrySummary(entry, 'factions')),
    ...events.map((entry) => toEntrySummary(entry, 'events')),
    ...terms.map((entry) => toEntrySummary(entry, 'terms')),
    ...sources.map((entry) => toEntrySummary(entry, 'sources')),
  ];
}

export function getRelatedSlugs(entry: AnyEntry) {
  const related = entry.data.related ?? {};
  return Object.values(related).flat();
}

export function getRelatedSummaries(entry: AnyEntry, allEntries: EntrySummary[]) {
  const summaryBySlug = new Map(allEntries.map((item) => [item.slug, item]));
  const uniqueSlugs = [...new Set(getRelatedSlugs(entry))];

  return uniqueSlugs
    .map((slug) => summaryBySlug.get(slug))
    .filter((item): item is EntrySummary => Boolean(item));
}

export function getSourceSummaries(entry: AnyEntry, allEntries: EntrySummary[]) {
  const sourceBySlug = new Map(
    allEntries.filter((item) => item.collection === 'sources').map((item) => [item.slug, item]),
  );

  return entry.data.sources
    .map((slug) => sourceBySlug.get(slug))
    .filter((item): item is EntrySummary => Boolean(item));
}
