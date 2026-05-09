import type { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      className={[
        'w-full border bg-white px-4 text-slate-900 transition placeholder:text-slate-400',
        'focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100',
        className,
      ].join(' ')}
      {...props}
    />
  );
}
