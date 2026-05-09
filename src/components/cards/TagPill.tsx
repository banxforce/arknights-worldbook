import type { HTMLAttributes } from 'react';

interface TagPillProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'blue' | 'slate' | 'amber' | 'red';
}

const tones = {
  blue: 'border-blue-200 bg-blue-50 text-blue-700',
  slate: 'border-slate-200 bg-slate-50 text-slate-600',
  amber: 'border-amber-200 bg-amber-50 text-amber-700',
  red: 'border-red-200 bg-red-50 text-red-700',
};

export default function TagPill({ tone = 'slate', className = '', ...props }: TagPillProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold',
        tones[tone],
        className,
      ].join(' ')}
      {...props}
    />
  );
}
