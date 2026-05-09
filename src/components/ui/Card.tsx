import type { HTMLAttributes } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className = '', ...props }: CardProps) {
  return (
    <div
      className={[
        'rounded-2xl border border-slate-200/80 bg-white shadow-sm transition',
        'shadow-[0_18px_44px_rgba(15,23,42,0.05)]',
        className,
      ].join(' ')}
      {...props}
    />
  );
}

export function CardHeader({ className = '', ...props }: CardProps) {
  return <div className={['px-6 pt-6', className].join(' ')} {...props} />;
}

export function CardTitle({ className = '', ...props }: CardProps) {
  return (
    <div
      className={['text-lg font-semibold tracking-normal text-slate-950', className].join(' ')}
      {...props}
    />
  );
}

export function CardDescription({ className = '', ...props }: CardProps) {
  return <div className={['mt-2 text-sm leading-6 text-slate-600', className].join(' ')} {...props} />;
}

export function CardContent({ className = '', ...props }: CardProps) {
  return <div className={['p-6', className].join(' ')} {...props} />;
}
