import { CheckCircle2 } from 'lucide-react';

interface StackBadgeProps {
  label: string;
}

export function StackBadge({ label }: StackBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
      <CheckCircle2 aria-hidden="true" className="size-4" />
      {label}
    </span>
  );
}
