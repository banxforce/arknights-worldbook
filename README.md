# 泰拉百科 / Terra World Index

一个面向《明日方舟》世界观资料整理与设定索引的静态知识库 MVP。项目优先实现内容浏览、MDX 条目、静态搜索、时间线和基础关系图谱，不包含登录、用户系统、角色索引或后台服务。

## 技术栈

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

## 本地开发

```bash
pnpm install
pnpm dev
```

## 构建与预览

```bash
pnpm build
pnpm preview
```

`pnpm build` 会先执行 Astro 静态构建，再用 Pagefind 为 `dist` 生成搜索索引。

## 内容结构

所有设定内容位于 `src/content`，当前 MVP 包含五个集合：

- `regions`
- `factions`
- `events`
- `terms`
- `sources`

条目之间通过 frontmatter 中的 `related` 和 `sources` 字段建立 slug 关系。

## MVP 页面

- `/`
- `/regions` 与 `/regions/[slug]`
- `/factions` 与 `/factions/[slug]`
- `/events` 与 `/events/[slug]`
- `/terms` 与 `/terms/[slug]`
- `/sources` 与 `/sources/[slug]`
- `/timeline`
- `/graph`
- `/search`

## 范围说明

本项目是静态、内容优先的资料站。MVP 不包含登录、用户菜单、收藏、浏览历史、笔记、自定义列表、角色索引、数据库、后端 API 或 CMS 管理后台。
