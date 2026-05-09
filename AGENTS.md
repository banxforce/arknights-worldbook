# AGENTS.md

## Project Snapshot

- Project: `arknights-worldbook`
- Goal: a first-version Arknights worldbook site with a Rhodes Island archive terminal feel.
- Stack: React + TypeScript + Vite + Tailwind CSS.
- Content model: keep Markdown files in the repo and import them into the frontend with Vite raw imports.
- Current UI shape: single-page archive app with section navigation, Markdown reader, chapter index, keyword panels, visual placeholder slots, and a sealed Victoria archive entry.

## Key Content Sources

- `泰拉世界观.md`: Terra world overview.
- `切尔诺伯格篇（上）.md`: Chernobog opening narrative.
- `切尔诺伯格篇（下）.md`: Chernobog aftermath narrative.
- `切尔诺伯格篇（终）.md`: Chernobog metaphor/theme analysis.

## Working Notes

- Preserve the archive/terminal product feel; this is an app-like reader, not a marketing landing page.
- Keep the palette mostly black, white, and gray, with small accents of warning yellow, Originium cyan, and rust red.
- Avoid changing the Markdown sources unless the task is explicitly about content editing.
- Validate with `npm run build` after dependency installation is available.
- Remote repository provided by the user: `https://github.com/banxforce/arknights-worldbook.git`.

## Maintenance Rule

After each completed task, decide whether this file needs a concise update. Update it only when new durable project knowledge, workflow rules, or architectural decisions were learned.
