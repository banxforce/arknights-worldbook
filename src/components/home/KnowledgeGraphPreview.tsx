import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';

type GraphIconProps = {
  className?: string;
};

function OriginiumIcon({ className = '' }: GraphIconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M31.6 5.5 47 25.1 40.4 58.5H24.1L16.2 26.7 31.6 5.5Z" fill="currentColor" />
      <path d="m31.6 5.5 2.8 27.9 12.6-8.3L31.6 5.5Z" fill="#e0f2fe" opacity="0.86" />
      <path d="m31.6 5.5-7.5 30.2-7.9-9L31.6 5.5Z" fill="#93c5fd" opacity="0.72" />
      <path d="m24.1 35.7 10.3-2.3 6 25.1H24.1V35.7Z" fill="#0f172a" opacity="0.72" />
      <path d="m47 25.1 9 12.3-8.9 19.4-6.7 1.7L47 25.1Z" fill="#1e3a8a" opacity="0.76" />
      <path d="m16.2 26.7-8 13 8.6 16 7.3 2.8-7.9-31.8Z" fill="#334155" />
      <path d="m34.4 33.4 12.6-8.3M24.1 35.7l10.3-2.3M24.1 35.7l-7.9-9" stroke="#f8fafc" strokeOpacity="0.62" strokeWidth="1.2" />
    </svg>
  );
}

function CatastropheIcon({ className = '' }: GraphIconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M32 6v16M32 42v16M6 32h16M42 32h16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="m32 16 5.4 10.6L49 32l-11.6 5.4L32 49l-5.4-11.6L15 32l11.6-5.4L32 16Z" fill="currentColor" />
      <path d="M18.6 18.6 26 26M38 38l7.4 7.4M45.4 18.6 38 26M26 38l-7.4 7.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 5" opacity="0.34" />
    </svg>
  );
}

function OripathyIcon({ className = '' }: GraphIconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M26 11h12l6 10-6 10H26l-6-10 6-10Z" stroke="currentColor" strokeWidth="3" />
      <path d="M14 33h12l6 10-6 10H14L8 43l6-10ZM38 33h12l6 10-6 10H38l-6-10 6-10Z" stroke="currentColor" strokeWidth="3" />
      <path d="M32 31v8M26 43h12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M32 17v8M20 39l-5 7M44 39l5 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

function MobileCityIcon({ className = '' }: GraphIconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M12 51h40M16 28h32v23H16V28Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M23 19h18v9H23v-9ZM28 9h8v10h-8V9Z" fill="currentColor" />
      <path d="M21 51V35M32 51V35M43 51V35M18 41h28" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="m10 51 5-7h34l5 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
    </svg>
  );
}

function FactionIcon({ className = '' }: GraphIconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M22 10v44M23 12h25l-5.5 10L48 32H23V12Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M30 20h10M30 27h7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" opacity="0.55" />
      <path d="M15 54h20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M21 42 12 54M24 42l9 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.48" />
    </svg>
  );
}

function CivilizationIcon({ className = '' }: GraphIconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="m32 7 22 12.5v25L32 57 10 44.5v-25L32 7Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M10 19.5 32 32l22-12.5M32 32v25" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" />
      <path d="m20 26 22-12.5M22 39.5l10 5.8 10-5.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

const nodes = [
  { label: '天灾', icon: CatastropheIcon, className: 'left-[35%] top-[13%]' },
  { label: '矿石病', icon: OripathyIcon, className: 'left-[70%] top-[15%]' },
  { label: '泰拉各国', icon: MobileCityIcon, className: 'left-[16%] top-[48%]' },
  { label: '各大势力', icon: FactionIcon, className: 'left-[84%] top-[48%]' },
  { label: '技术与文明', icon: CivilizationIcon, className: 'left-1/2 top-[82%]' },
] as const;

const relationLabels = [
  { label: '诱发', className: 'left-[54%] top-[16%]' },
  { label: '影响', className: 'left-[73%] top-[46%]' },
  { label: '塑造', className: 'left-[25%] top-[46%]' },
  { label: '驱动', className: 'left-[52%] top-[66%]' },
] as const;

export default function KnowledgeGraphPreview() {
  return (
    <Card className="relative min-h-[336px] overflow-hidden p-6 sm:min-h-[292px]">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-normal text-slate-950">知识图谱 · 关系网络</h2>
      </div>

      <div className="relative mx-auto mt-1 h-[226px] max-w-[640px] sm:h-[218px]">
        <svg
          className="pointer-events-none absolute inset-x-0 top-2 h-[196px] w-full overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <ellipse
            cx="50"
            cy="48"
            rx="39"
            ry="31"
            fill="none"
            stroke="#bfdbfe"
            strokeWidth="0.7"
            strokeDasharray="2.2 2.4"
          />
          <path
            d="M16 48 H50 H84 M50 48 V82 M50 48 L35 13 M50 48 L70 15"
            stroke="#bfdbfe"
            strokeWidth="0.75"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M35 13 C43 1 60 2 70 15 M16 48 C15 30 24 18 35 13 M70 15 C82 24 88 36 84 48"
            fill="none"
            stroke="#dbeafe"
            strokeWidth="0.65"
            strokeLinecap="round"
            strokeDasharray="2 3"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {relationLabels.map((item) => (
          <span
            key={item.label}
            className={`absolute z-10 -translate-x-1/2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-slate-400 shadow-[0_0_0_1px_rgba(219,234,254,0.8)] ${item.className}`}
          >
            {item.label}
          </span>
        ))}

        <div className="absolute left-1/2 top-[48%] z-20 flex size-[88px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-blue-300 bg-[radial-gradient(circle_at_50%_32%,#ffffff_0%,#eff6ff_60%,#dbeafe_100%)] text-center shadow-[0_18px_40px_rgba(37,99,235,0.16)] sm:size-24">
          <OriginiumIcon className="size-9 text-slate-900 drop-shadow-[0_8px_12px_rgba(30,58,138,0.18)]" />
          <span className="mt-0.5 text-base font-semibold text-slate-950">源石</span>
        </div>

        {nodes.map((node) => {
          const Icon = node.icon;

          return (
            <div
              key={node.label}
              className={`absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 text-center ${node.className}`}
            >
              <span className="flex size-12 items-center justify-center rounded-full border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.06)] sm:size-14">
                <Icon className="size-6 sm:size-7" />
              </span>
              <span className="whitespace-nowrap text-xs font-semibold text-slate-700 sm:text-sm">{node.label}</span>
            </div>
          );
        })}
      </div>

      <a
        href="/graph"
        className="absolute bottom-6 left-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
      >
        探索完整图谱
        <ArrowRight aria-hidden="true" className="size-4" />
      </a>
    </Card>
  );
}
