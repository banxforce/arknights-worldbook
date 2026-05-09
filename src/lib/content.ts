import type { CollectionEntry } from 'astro:content';

export type TerraCollection =
  | 'regions'
  | 'factions'
  | 'events'
  | 'terms'
  | 'sources';

export type TerraEntry = CollectionEntry<TerraCollection>;
