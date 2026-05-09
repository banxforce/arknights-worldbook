import type { CollectionEntry } from 'astro:content';

export function sortEventsByDate(events: CollectionEntry<'events'>[]) {
  return [...events].sort((a, b) => {
    const dateA = a.data.eventDate ?? a.data.updatedAt;
    const dateB = b.data.eventDate ?? b.data.updatedAt;
    return dateA.localeCompare(dateB);
  });
}
