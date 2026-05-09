import type { TerraEntry } from './content';

export function getRelatedSlugs(entry: TerraEntry) {
  return Object.values(entry.data.related ?? {}).flat();
}
