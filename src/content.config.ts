import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const statusSchema = z.enum(['draft', 'reviewing', 'stable', 'deprecated']);
const spoilerLevelSchema = z.enum(['none', 'low', 'medium', 'high']);

const relatedSchema = z
  .object({
    regions: z.array(z.string()).optional(),
    factions: z.array(z.string()).optional(),
    events: z.array(z.string()).optional(),
    terms: z.array(z.string()).optional(),
    sources: z.array(z.string()).optional(),
  })
  .default({});

const baseEntrySchema = z.object({
  title: z.string(),
  slug: z.string(),
  aliases: z.array(z.string()).default([]),
  summary: z.string(),
  tags: z.array(z.string()).default([]),
  status: statusSchema.default('draft'),
  spoilerLevel: spoilerLevelSchema.default('none'),
  cover: z.string().optional(),
  related: relatedSchema,
  sources: z.array(z.string()).default([]),
  updatedAt: z.string(),
});

const regions = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/regions' }),
  schema: baseEntrySchema.extend({
    regionType: z.string().optional(),
    mainlineOrder: z.number().optional(),
  }),
});

const factions = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/factions' }),
  schema: baseEntrySchema.extend({
    factionType: z.string().optional(),
    mainlineOrder: z.number().optional(),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/events' }),
  schema: baseEntrySchema.extend({
    eventDate: z.string().optional(),
    displayDate: z.string().optional(),
    eventSort: z.number().optional(),
    era: z.string().optional(),
    period: z.string().optional(),
    eventType: z.string().optional(),
    locationLabel: z.string().optional(),
    involved: z.array(z.string()).default([]),
    nature: z.string().optional(),
    significance: z.string().optional(),
    mapNote: z.string().optional(),
    sourceNote: z.string().optional(),
  }),
});

const terms = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/terms' }),
  schema: baseEntrySchema.extend({
    termType: z.string().optional(),
  }),
});

const sources = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/sources' }),
  schema: baseEntrySchema.extend({
    sourceType: z.string().optional(),
  }),
});

export const collections = {
  regions,
  factions,
  events,
  terms,
  sources,
};
