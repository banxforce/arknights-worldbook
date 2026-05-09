# AGENTS.md

## Project: 泰拉百科 / Terra World Index

You are building the frontend MVP for a fan-made static knowledge website dedicated to organizing and indexing the worldbuilding of Arknights / 明日方舟.

The website is a static, content-first knowledge base. It is not a game guide, not a user platform, and not a backend application.

Use the two screenshots in `design-references/` as the visual target:

- `design-references/terra-homepage-light.png`
- `design-references/terra-homepage-dark.png`

The light version is the primary MVP target. The dark version defines the future theme direction. Implement the UI so that a dark theme can be added cleanly, but do not block MVP delivery on a complete theme switcher.

---

## 1. Technical Stack

Use exactly this stack unless the user explicitly changes it:

- Astro
- React
- TypeScript
- Tailwind CSS
- MDX
- Astro Content Collections
- Zod
- Pagefind
- lucide-react
- pnpm

Do not use:

- Next.js
- Vue / Nuxt
- Svelte / SvelteKit
- Ant Design
- MUI
- Redux
- Zustand
- MobX
- Database
- Backend API
- Login / auth system
- Comment system
- User profile system
- CMS admin panel

---

## 2. Product Scope

MVP pages:

- `/` — homepage
- `/regions` — 国家与地区 index
- `/regions/[slug]` — region detail
- `/factions` — 阵营组织 index
- `/factions/[slug]` — faction detail
- `/timeline` — timeline page
- `/events` — event index
- `/events/[slug]` — event detail
- `/terms` — 术语词典 index
- `/terms/[slug]` — term detail
- `/sources` — 档案库 / source index
- `/sources/[slug]` — source detail
- `/graph` — basic knowledge graph page
- `/search` — search page or search shell

Not in MVP:

- 角色索引
- User workspace
- Favorites
- Browsing history
- Notes
- Custom lists
- Core statistics panel on homepage
- Recent updates panel on homepage
- Login
- User-submitted content
- Online editing

Characters can exist as referenced metadata later, but do not build character pages in MVP.

---

## 3. Homepage Final Design Requirements

The homepage must match the simplified final UI direction in the provided screenshots.

### Left Sidebar

Keep only:

1. 世界观总览
2. 国家与地区
3. 阵营组织
4. 时间线
5. 术语词典
6. 档案库

Remove:

- 角色索引
- 我的工作区
- 我的收藏
- 浏览历史
- 笔记与标注
- 自定义列表

Logo area:

- Site title: `泰拉百科`
- Subtitle: `明日方舟世界观知识库`

Sidebar visual:

- Fixed desktop sidebar
- Width around 260px
- Clean icon + text nav items
- Active item has blue accent and subtle filled background
- No login / account UI

### Top Bar

Include:

- Wide global search input
- Placeholder: `搜索地区、组织、角色、时间线、术语...`
- Right-side simple icon buttons:
  - theme/sun icon
  - globe icon
  - bell icon

No avatar, no profile menu, no login.

### Homepage Cards

Use a clean two-column dashboard layout.

Rows:

1. Left: `泰拉世界 · 概览`
   Right: `知识图谱 · 关系网络`

2. Left: `时间线 · 历史轨迹`
   Right: `国家与地区 · 索引`

3. Left: `精选条目：源石`
   Right: `阵营组织 · 浏览`

Do not add:

- 核心数据
- 近期更新
- 最近更新

The homepage should feel lighter, more focused, and more immediately shippable than a full analytics dashboard.

---

## 4. Visual Style

Primary style:

- Light theme
- White / pale blue background
- Blue-gray sci-fi accents
- Rounded cards
- Thin borders
- Soft shadows
- High information clarity
- Editorial knowledge-base feel
- Not a generic admin dashboard
- Not a blog
- Not a login app

Dark theme future direction:

- The dark screenshot is a secondary reference.
- Use semantic Tailwind tokens/classes where reasonable.
- Do not hard-code too many one-off colors.
- It is acceptable for MVP to ship light-only.

### Suggested Layout Tokens

Sidebar:

- `w-[260px]`
- `border-r`
- `bg-white`

Top bar:

- height around `72px`
- border bottom
- search input max width around `760px`

Cards:

- `rounded-2xl`
- `border border-slate-200/80`
- `bg-white`
- `shadow-sm`
- `transition`

Page background:

- `bg-slate-50`
- subtle radial gradient allowed

Accent:

- primary blue: `blue-600`
- soft blue: `blue-50`
- text: `slate-950`
- muted: `slate-500` / `slate-600`

---

## 5. Content Architecture

All lore/content data must live in `src/content`.

Use Astro Content Collections with MDX and frontmatter.

MVP collections:

- `regions`
- `factions`
- `events`
- `terms`
- `sources`

Do not include `characters` as a required MVP collection. If references to characters are needed, use string arrays in related metadata for now.

All relationships are slug-based.

Do not hard-code lore data directly in React components except minimal static UI labels.

---

## 6. Required Directory Structure

Use this general structure:

```txt
terra-world-index/
  public/
    images/
      regions/
      factions/
      terms/
      events/
    icons/
    maps/
  src/
    content.config.ts
    content/
      regions/
      factions/
      events/
      terms/
      sources/
    pages/
      index.astro
      regions/
        index.astro
        [slug].astro
      factions/
        index.astro
        [slug].astro
      events/
        index.astro
        [slug].astro
      terms/
        index.astro
        [slug].astro
      sources/
        index.astro
        [slug].astro
      timeline.astro
      graph.astro
      search.astro
    layouts/
      BaseLayout.astro
      AppShell.astro
      EntryLayout.astro
      IndexLayout.astro
    components/
      layout/
      home/
      cards/
      entry/
      search/
      graph/
      timeline/
      ui/
    lib/
      content.ts
      relations.ts
      timeline.ts
      format.ts
      constants.ts
    styles/
      global.css
  astro.config.mjs
  package.json
  tsconfig.json
  tailwind.config.ts
```

---

## 7. Content Schema Requirements

Create `src/content.config.ts`.

MVP collections:

### Shared fields

Most entries should include:

- `title`
- `slug`
- `aliases`
- `summary`
- `tags`
- `status`
- `spoilerLevel`
- `cover`
- `related`
- `sources`
- `updatedAt`

### Status enum

- `draft`
- `reviewing`
- `stable`
- `deprecated`

### Spoiler enum

- `none`
- `low`
- `medium`
- `high`

### Related shape

```ts
{
  regions?: string[];
  factions?: string[];
  events?: string[];
  terms?: string[];
  sources?: string[];
}
```

---

## 8. Seed Content

Add at least these MDX files:

Terms:

- `src/content/terms/originium.mdx`
- `src/content/terms/oripathy.mdx`
- `src/content/terms/catastrophe.mdx`
- `src/content/terms/originium-arts.mdx`

Factions:

- `src/content/factions/rhodes-island.mdx`
- `src/content/factions/reunion.mdx`

Regions:

- `src/content/regions/ursus.mdx`
- `src/content/regions/lungmen.mdx`
- `src/content/regions/victoria.mdx`

Events:

- `src/content/events/chernobog-incident.mdx`

Sources:

- `src/content/sources/main-00.mdx`
- `src/content/sources/main-01.mdx`

The content can be concise placeholder lore text, but frontmatter must be valid and buildable.

---

## 9. Component Requirements

### Layout

- `BaseLayout.astro`
- `AppShell.astro`
- `Sidebar.tsx`
- `TopBar.tsx`
- `Breadcrumbs.tsx`

### Homepage

- `HeroOverviewCard.tsx`
- `KnowledgeGraphPreview.tsx`
- `TimelinePreview.tsx`
- `RegionCarousel.tsx`
- `FeaturedEntryCard.tsx`
- `FactionBrowseCard.tsx`

Do not create homepage components for:

- `CoreStatsCard`
- `RecentUpdatesCard`

### Cards

- `RegionCard.tsx`
- `FactionCard.tsx`
- `EventCard.tsx`
- `TermCard.tsx`
- `SourceCard.tsx`
- `TagPill.tsx`
- `RelatedEntryCard.tsx`

### Entry

- `EntryHeader.tsx`
- `EntryMetaGrid.tsx`
- `EntryRightRail.tsx`
- `RelatedEntries.tsx`
- `SourceList.tsx`
- `QuoteCard.tsx`

### Search

- `SearchBox.tsx`
- `SearchDialog.tsx`
- `PagefindSearch.tsx`

### Graph and Timeline

- `MiniRelationGraph.tsx`
- `KnowledgeGraph.tsx`
- `Timeline.tsx`
- `TimelineNode.tsx`
- `TimelineFilter.tsx`

---

## 10. Implementation Rules

Always follow these rules:

1. Keep the project static-first.
2. Prefer Astro pages and layouts for page composition.
3. Use React only for interactive components.
4. Use TypeScript for every React component.
5. Use MDX content collections for all lore data.
6. Keep content and UI separate.
7. No user account assumptions.
8. No fake auth, no profile menu.
9. No database setup.
10. No backend API routes.
11. No giant component files.
12. No hard-coded large lore datasets in components.
13. Build small, composable components.
14. Ensure `pnpm build` passes after each phase.
15. Prefer a working clean MVP over excessive visual complexity.

---

## 11. Pagefind Search

Use Pagefind for static search.

Package script:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build && pagefind --site dist",
    "preview": "astro preview"
  }
}
```

MVP search:

- Global search input in top bar
- Search page or dialog
- Results show title, excerpt, and URL
- Advanced filters can wait

---

## 12. Acceptance Criteria

The MVP is acceptable when:

- `pnpm install` works.
- `pnpm build` works.
- Homepage matches the final simplified two-column visual direction.
- Sidebar only has the six MVP nav items.
- No user workspace appears anywhere.
- No role/character index appears in primary navigation.
- Homepage has no core stats card and no recent updates card.
- Content pages are generated from MDX.
- At least terms, regions, factions, events, and sources have working list and detail routes.
- Search is integrated with Pagefind after build.
- UI is clean, modern, blue-gray, light, rounded, and close to the provided reference screenshots.

---

## 13. First Action

Before writing code, inspect the repository.

If it is empty, initialize the project.

If it already contains code, preserve existing useful work and adapt it to this specification.

After each phase, run or document the expected validation command:

```bash
pnpm build
```
