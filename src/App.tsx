import { isValidElement, type ReactNode, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Archive,
  BookOpenText,
  ChevronRight,
  CircleAlert,
  Crosshair,
  FileClock,
  Files,
  Flame,
  Map,
  RadioTower,
  Search,
  Shield,
  Sparkles,
  Terminal,
} from "lucide-react";
import terraWorld from "../泰拉世界观.md?raw";
import chernobogStart from "../切尔诺伯格篇（上）.md?raw";
import chernobogAftermath from "../切尔诺伯格篇（下）.md?raw";
import chernobogMetaphor from "../切尔诺伯格篇（终）.md?raw";

type SectionId = "terra" | "chernobog" | "victoria";

type ArchiveDoc = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  source: string;
  tags: string[];
  status: "online" | "sealed";
};

type HeadingItem = {
  id: string;
  text: string;
  level: number;
};

const chernobogDocs: ArchiveDoc[] = [
  {
    id: "chernobog-start",
    title: "切尔诺伯格篇（上）：伤口打开",
    eyebrow: "CHERNOBG-01",
    description: "城市陷落、博士归来、罗德岛与整合运动第一次正面进入档案。",
    source: chernobogStart,
    tags: ["乌萨斯", "博士", "整合运动", "塔露拉"],
    status: "online",
  },
  {
    id: "chernobog-aftermath",
    title: "切尔诺伯格篇（下）：火焰的余烬",
    eyebrow: "CHERNOBG-02",
    description: "撤离代价、龙门危机、霜星与爱国者，以及旧整合运动的倒下。",
    source: chernobogAftermath,
    tags: ["龙门", "霜星", "爱国者", "陈"],
    status: "online",
  },
  {
    id: "chernobog-metaphor",
    title: "火光照见现实：切尔诺伯格篇的隐喻",
    eyebrow: "CHERNOBG-03",
    description: "疾病污名、强权秩序、革命失控与人道主义局限的专题解读。",
    source: chernobogMetaphor,
    tags: ["现实隐喻", "矿石病", "城市治理", "青年激进化"],
    status: "online",
  },
];

const sections = [
  {
    id: "terra" as const,
    label: "世界观总览",
    caption: "泰拉 / 源石 / 国家",
    icon: Map,
  },
  {
    id: "chernobog" as const,
    label: "切尔诺伯格",
    caption: "主线专题 / 火与伤口",
    icon: Flame,
  },
  {
    id: "victoria" as const,
    label: "维多利亚",
    caption: "待解封档案",
    icon: FileClock,
  },
];

const worldSignals = [
  { label: "天灾", value: "常态化灾难", tone: "text-terminal-amber" },
  { label: "源石", value: "能源与病灶", tone: "text-terminal-cyan" },
  { label: "矿石病", value: "身份烙印", tone: "text-terminal-rust" },
  { label: "移动城市", value: "逃离与治理", tone: "text-zinc-200" },
];

const factionKeywords = [
  "罗德岛",
  "整合运动",
  "乌萨斯",
  "龙门",
  "维多利亚",
  "哥伦比亚",
  "萨卡兹",
  "感染者",
  "塔露拉",
  "阿米娅",
];

const visualSlots = [
  {
    title: "泰拉灾害观测图",
    label: "CAT-OBS / AREA-07",
    tone: "cyan",
  },
  {
    title: "切尔诺伯格核心城剖面",
    label: "MOBILE CITY / LOCKED",
    tone: "rust",
  },
  {
    title: "维多利亚王权档案",
    label: "VICTORIA / SEALED",
    tone: "amber",
  },
];

function countHeadings(markdown: string) {
  return markdown.split("\n").filter((line) => /^#{1,3}\s/.test(line)).length;
}

function slugifyHeading(text: string, index: number) {
  const normalized = text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || `section-${index + 1}`;
}

function getNodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getNodeText(node.props.children);
  }

  return "";
}

function extractHeadings(markdown: string): HeadingItem[] {
  return markdown
    .split("\n")
    .map((line) => /^(#{1,3})\s+(.+)$/.exec(line))
    .filter((match): match is RegExpExecArray => Boolean(match))
    .map((match, index) => {
      const text = match[2].replace(/\*\*/g, "").trim();
      return {
        id: slugifyHeading(text, index),
        text,
        level: match[1].length,
      };
    });
}

function estimateReadTime(markdown: string) {
  const compact = markdown.replace(/\s/g, "");
  return Math.max(2, Math.ceil(compact.length / 650));
}

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>("terra");
  const [activeDocId, setActiveDocId] = useState(chernobogDocs[0].id);

  const terraDoc = useMemo<ArchiveDoc>(
    () => ({
      id: "terra-overview",
      title: "泰拉世界观（Terra: A World Fractured by Originium）",
      eyebrow: "TERRA-00",
      description: "围绕天灾、源石、矿石病、种族、国家与组织建立世界底层认知。",
      source: terraWorld,
      tags: ["泰拉", "天灾", "源石", "矿石病", "罗德岛"],
      status: "online",
    }),
    [],
  );

  const activeDoc =
    activeSection === "terra"
      ? terraDoc
      : chernobogDocs.find((doc) => doc.id === activeDocId) ?? chernobogDocs[0];

  const stats = [
    { label: "内容源", value: "4", detail: "Markdown 档案" },
    { label: "可读章节", value: String(countHeadings(activeDoc.source)), detail: "标题索引" },
    { label: "预计阅读", value: `${estimateReadTime(activeDoc.source)}m`, detail: "当前档案" },
  ];
  const activeHeadings = activeSection === "victoria" ? [] : extractHeadings(activeDoc.source);

  return (
    <main className="min-h-screen bg-terminal-ink text-zinc-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_12%,rgba(71,214,200,0.16),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(199,82,55,0.14),transparent_24%),linear-gradient(135deg,#050607_0%,#111315_48%,#050607_100%)]" />
      <div className="fixed inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="mb-4 grid gap-4 border border-terminal-line bg-terminal-panel/90 p-4 shadow-terminal backdrop-blur md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-terminal-cyan/40 bg-terminal-cyan/10">
              <Terminal className="h-6 w-6 text-terminal-cyan" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-terminal-cyan">
                Rhodes Island Archive Terminal
              </p>
              <h1 className="mt-1 truncate text-2xl font-semibold text-terminal-paper sm:text-3xl">
                明日方舟世界书
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {stats.map((item) => (
              <div key={item.label} className="border border-terminal-line bg-black/20 px-3 py-2">
                <p className="font-mono text-[11px] uppercase text-terminal-muted">{item.label}</p>
                <p className="mt-1 text-xl font-semibold text-terminal-paper">{item.value}</p>
                <p className="text-[11px] text-zinc-500">{item.detail}</p>
              </div>
            ))}
          </div>
        </header>

        <div className="grid flex-1 gap-4 lg:grid-cols-[280px_minmax(0,1fr)_320px]">
          <aside className="space-y-4 lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:overflow-y-auto">
            <section className="border border-terminal-line bg-terminal-panel/95 p-3">
              <div className="mb-3 flex items-center gap-2 text-terminal-paper">
                <Archive className="h-4 w-4 text-terminal-amber" aria-hidden="true" />
                <h2 className="text-sm font-semibold">档案分区</h2>
              </div>
              <nav className="space-y-2" aria-label="档案分区">
                {sections.map(({ id, label, caption, icon: Icon }) => {
                  const selected = activeSection === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setActiveSection(id)}
                      className={`group flex w-full items-center gap-3 border px-3 py-3 text-left transition ${
                        selected
                          ? "border-terminal-cyan bg-terminal-cyan/10 text-terminal-paper"
                          : "border-terminal-line bg-black/20 text-zinc-300 hover:border-zinc-500 hover:bg-white/[0.04]"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 shrink-0 ${selected ? "text-terminal-cyan" : "text-terminal-muted"}`}
                        aria-hidden="true"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold">{label}</span>
                        <span className="block truncate text-xs text-terminal-muted">{caption}</span>
                      </span>
                      <ChevronRight
                        className={`h-4 w-4 shrink-0 transition ${selected ? "translate-x-0 text-terminal-cyan" : "text-zinc-600 group-hover:translate-x-0.5"}`}
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
              </nav>
            </section>

            <section className="border border-terminal-line bg-terminal-panel/95 p-3">
              <div className="mb-3 flex items-center gap-2">
                <Files className="h-4 w-4 text-terminal-cyan" aria-hidden="true" />
                <h2 className="text-sm font-semibold text-terminal-paper">切城专题</h2>
              </div>
              <div className="space-y-2">
                {chernobogDocs.map((doc) => {
                  const selected = activeSection === "chernobog" && activeDoc.id === doc.id;
                  return (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => {
                        setActiveSection("chernobog");
                        setActiveDocId(doc.id);
                      }}
                      className={`w-full border px-3 py-3 text-left transition ${
                        selected
                          ? "border-terminal-rust bg-terminal-rust/10"
                          : "border-terminal-line bg-black/20 hover:border-terminal-rust/60"
                      }`}
                    >
                      <span className="font-mono text-[11px] text-terminal-rust">{doc.eyebrow}</span>
                      <span className="mt-1 block text-sm font-semibold text-zinc-100">{doc.title}</span>
                      <span className="mt-2 block text-xs leading-5 text-terminal-muted">{doc.description}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          </aside>

          <section className="min-w-0 border border-terminal-line bg-terminal-panel/95 shadow-terminal">
            {activeSection === "victoria" ? (
              <LockedVictoria />
            ) : (
              <ArticleReader doc={activeDoc} />
            )}
          </section>

          <aside className="space-y-4 lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:overflow-y-auto">
            {activeSection !== "victoria" && (
              <section className="border border-terminal-line bg-terminal-panel/95 p-4">
                <div className="mb-4 flex items-center gap-2">
                  <BookOpenText className="h-4 w-4 text-terminal-cyan" aria-hidden="true" />
                  <h2 className="text-sm font-semibold text-terminal-paper">章节导航</h2>
                </div>
                <div className="max-h-72 space-y-1 overflow-y-auto pr-1">
                  {activeHeadings.map((heading) => (
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      className={`block border-l border-terminal-line py-1.5 text-xs leading-5 text-terminal-muted transition hover:border-terminal-cyan hover:text-terminal-paper ${
                        heading.level === 1 ? "pl-2 font-semibold" : heading.level === 2 ? "pl-4" : "pl-6"
                      }`}
                    >
                      {heading.text}
                    </a>
                  ))}
                </div>
              </section>
            )}

            <section className="border border-terminal-line bg-terminal-panel/95 p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <RadioTower className="h-4 w-4 text-terminal-cyan" aria-hidden="true" />
                  <h2 className="text-sm font-semibold text-terminal-paper">世界信号</h2>
                </div>
                <span className="font-mono text-[10px] uppercase text-terminal-muted">Live Index</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {worldSignals.map((signal) => (
                  <div key={signal.label} className="border border-terminal-line bg-black/20 p-3">
                    <p className={`text-lg font-semibold ${signal.tone}`}>{signal.label}</p>
                    <p className="mt-1 text-xs text-terminal-muted">{signal.value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border border-terminal-line bg-terminal-panel/95 p-4">
              <div className="mb-4 flex items-center gap-2">
                <Search className="h-4 w-4 text-terminal-amber" aria-hidden="true" />
                <h2 className="text-sm font-semibold text-terminal-paper">关键词索引</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {factionKeywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="border border-terminal-line bg-zinc-950 px-2.5 py-1 text-xs text-zinc-300"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </section>

            <section className="border border-terminal-line bg-terminal-panel/95 p-4">
              <div className="mb-4 flex items-center gap-2">
                <Crosshair className="h-4 w-4 text-terminal-rust" aria-hidden="true" />
                <h2 className="text-sm font-semibold text-terminal-paper">插图槽位</h2>
              </div>
              <div className="space-y-3">
                {visualSlots.map((slot) => (
                  <VisualSlot key={slot.title} {...slot} />
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

function ArticleReader({ doc }: { doc: ArchiveDoc }) {
  const headingIds = useMemo(() => {
    const headings = extractHeadings(doc.source);
    return new Map(headings.map((heading) => [heading.text, heading.id]));
  }, [doc.source]);

  return (
    <article className="min-w-0">
      <div className="border-b border-terminal-line bg-black/20 p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="border border-terminal-cyan/40 bg-terminal-cyan/10 px-2.5 py-1 font-mono text-xs text-terminal-cyan">
            {doc.eyebrow}
          </span>
          <span className="border border-terminal-line bg-zinc-950 px-2.5 py-1 font-mono text-xs text-terminal-muted">
            STATUS / {doc.status.toUpperCase()}
          </span>
        </div>
        <h2 className="text-balance text-2xl font-semibold leading-tight text-terminal-paper sm:text-4xl">
          {doc.title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-terminal-muted sm:text-base">{doc.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {doc.tags.map((tag) => (
            <span key={tag} className="border border-terminal-line bg-black/30 px-2.5 py-1 text-xs text-zinc-300">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <div className="markdown-body p-4 sm:p-6 lg:p-8">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => <h1 id={headingIds.get(getNodeText(children))}>{children}</h1>,
            h2: ({ children }) => <h2 id={headingIds.get(getNodeText(children))}>{children}</h2>,
            h3: ({ children }) => <h3 id={headingIds.get(getNodeText(children))}>{children}</h3>,
          }}
        >
          {doc.source}
        </ReactMarkdown>
      </div>
    </article>
  );
}

function LockedVictoria() {
  return (
    <section className="grid min-h-full place-items-center p-4 sm:p-8">
      <div className="w-full max-w-3xl border border-terminal-line bg-black/25 p-6 sm:p-8">
        <div className="mb-6 flex h-16 w-16 items-center justify-center border border-terminal-amber/50 bg-terminal-amber/10">
          <Shield className="h-8 w-8 text-terminal-amber" aria-hidden="true" />
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-terminal-amber">Victoria Archive / Sealed</p>
        <h2 className="mt-3 text-3xl font-semibold text-terminal-paper sm:text-5xl">待解封档案</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-terminal-muted">
          维多利亚篇入口已预留。后续新增对应 Markdown 内容后，可按现有档案结构接入章节导航、关键词索引与专题阅读。
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {["王权空位", "萨卡兹阴影", "帝国裂解"].map((item) => (
            <div key={item} className="border border-terminal-line bg-terminal-panel2 p-4">
              <Sparkles className="mb-3 h-5 w-5 text-terminal-amber" aria-hidden="true" />
              <p className="text-sm font-semibold text-zinc-100">{item}</p>
              <p className="mt-2 text-xs leading-5 text-terminal-muted">资料槽位等待后续内容归档。</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisualSlot({ title, label, tone }: { title: string; label: string; tone: string }) {
  const accent =
    tone === "cyan"
      ? "border-terminal-cyan/50 text-terminal-cyan"
      : tone === "rust"
        ? "border-terminal-rust/50 text-terminal-rust"
        : "border-terminal-amber/50 text-terminal-amber";
  const accentText =
    tone === "cyan" ? "text-terminal-cyan" : tone === "rust" ? "text-terminal-rust" : "text-terminal-amber";

  return (
    <div className="relative overflow-hidden border border-terminal-line bg-zinc-950 p-3">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.16)_48%,transparent_52%),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:140px_140px,18px_18px,18px_18px]" />
      <div className="relative flex aspect-[16/9] flex-col justify-between border border-dashed border-zinc-700 bg-black/35 p-3">
        <div className="flex items-start justify-between gap-3">
          <span className={`border px-2 py-1 font-mono text-[10px] ${accent}`}>{label}</span>
          <CircleAlert className={`h-4 w-4 ${accentText}`} aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-semibold text-terminal-paper">{title}</p>
          <p className="mt-1 text-xs text-terminal-muted">占位图槽 / 可替换资产</p>
        </div>
      </div>
    </div>
  );
}

export default App;
