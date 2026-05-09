import { Quote } from 'lucide-react';

interface QuoteCardProps {
  children: string;
}

export default function QuoteCard({ children }: QuoteCardProps) {
  return (
    <aside className="mt-5 rounded-2xl border border-blue-200/80 bg-blue-50/70 p-5 text-blue-950">
      <Quote aria-hidden="true" className="size-5 text-blue-600" />
      <p className="mt-3 text-sm font-medium leading-7">{children}</p>
    </aside>
  );
}
