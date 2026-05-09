# IMPLEMENTATION_CHECKLIST.md

## Phase 0-1

- [x] Astro 项目可运行
- [x] React 已配置
- [x] TypeScript 已配置
- [x] Tailwind CSS 已配置
- [x] MDX 已配置
- [x] `src/content.config.ts` 存在
- [x] collections 包含 `regions`、`factions`、`events`、`terms`、`sources`
- [x] 示例 MDX 条目不少于 12 个
- [x] `pnpm build` 通过

## Phase 2

- [x] `BaseLayout.astro`
- [x] `AppShell.astro`
- [x] `Sidebar.tsx`
- [x] `TopBar.tsx`
- [x] `Breadcrumbs.tsx`
- [x] Sidebar 只包含 6 个 MVP 导航
- [x] 没有角色索引
- [x] 没有我的工作区
- [x] 没有登录/头像/用户菜单
- [x] `pnpm build` 通过

## Phase 3

- [x] 首页是两列三行
- [x] 有 `泰拉世界 · 概览`
- [x] 有 `知识图谱 · 关系网络`
- [x] 有 `时间线 · 历史轨迹`
- [x] 有 `国家与地区 · 索引`
- [x] 有 `精选条目：源石`
- [x] 有 `阵营组织 · 浏览`
- [x] 没有核心数据面板
- [x] 没有近期更新面板
- [x] 没有最近更新面板
- [x] 视觉接近 `design-references/terra-homepage-light.png`
- [x] `pnpm build` 通过

## Phase 4

- [x] `/regions`
- [x] `/factions`
- [x] `/events`
- [x] `/terms`
- [x] `/sources`
- [x] 列表页数据来自 Content Collections
- [x] 有统一索引页样式
- [x] `pnpm build` 通过

## Phase 5

- [ ] `/regions/[slug]`
- [ ] `/factions/[slug]`
- [ ] `/events/[slug]`
- [ ] `/terms/[slug]`
- [ ] `/sources/[slug]`
- [ ] 详情页渲染 MDX 正文
- [ ] 右侧栏包含元信息、相关条目、资料出处
- [ ] `terms/originium` 详情页体验良好
- [ ] `pnpm build` 通过

## Phase 6

- [ ] Pagefind 已安装
- [ ] build 脚本包含 `pagefind --site dist`
- [ ] `/search` 可用
- [ ] TopBar 搜索可进入搜索功能
- [ ] `pnpm build` 通过
- [ ] `pnpm preview` 下搜索可用

## Phase 7

- [ ] `/timeline`
- [ ] `/graph`
- [ ] 时间线基于 events collection
- [ ] 图谱基于 related 字段
- [ ] `pnpm build` 通过

## Phase 8

- [ ] 404 页面
- [ ] README
- [ ] SEO title / description
- [ ] 空状态
- [ ] 基础响应式
- [ ] 无未使用大依赖
- [ ] 最终 `pnpm build` 通过
