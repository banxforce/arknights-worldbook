# Arknights Worldbook

《明日方舟》世界书首版，使用 React + TypeScript + Tailwind 构建。当前形态是罗德岛资料终端风格的单页档案馆，内置泰拉世界观、切尔诺伯格专题，以及维多利亚篇预留入口。

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## 内容源

- `泰拉世界观.md`
- `切尔诺伯格篇（上）.md`
- `切尔诺伯格篇（下）.md`
- `切尔诺伯格篇（终）.md`

这 4 篇 Markdown 会以源码形式保留，并通过 Vite 的 `?raw` 导入到前端中渲染。
