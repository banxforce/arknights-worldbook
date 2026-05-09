import type { HTMLAttributes } from 'react';

interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
}

export function Separator({
  orientation = 'horizontal',
  className = '',
  ...props
}: SeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={[
        orientation === 'horizontal' ? 'h-px w-full bg-slate-200/80' : 'h-full w-px bg-slate-200/80',
        className,
      ].join(' ')}
      {...props}
    />
  );
}
