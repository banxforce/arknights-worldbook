import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'icon';
}

const variants = {
  primary: 'border-blue-600 bg-blue-600 text-white shadow-sm hover:bg-blue-700',
  secondary: 'border-slate-200 bg-white text-slate-700 shadow-sm hover:border-blue-200 hover:text-blue-700',
  ghost: 'border-transparent bg-transparent text-slate-600 hover:bg-blue-50 hover:text-blue-700',
};

const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  icon: 'size-10 p-0',
};

export function Button({
  variant = 'secondary',
  size = 'md',
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        'inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border font-semibold transition',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      ].join(' ')}
      {...props}
    />
  );
}
