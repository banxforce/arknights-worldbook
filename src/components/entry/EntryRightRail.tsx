import EntryMetaGrid from './EntryMetaGrid';
import RelatedEntries from './RelatedEntries';
import SourceList from './SourceList';
import MiniRelationGraph from '@/components/graph/MiniRelationGraph';
import type { EntrySummary } from '@/lib/entry';

interface MetaItem {
  label: string;
  value?: string | number;
}

interface EntryRightRailProps {
  title: string;
  meta: MetaItem[];
  related: EntrySummary[];
  sources: EntrySummary[];
}

export default function EntryRightRail({ title, meta, related, sources }: EntryRightRailProps) {
  return (
    <div className="space-y-4">
      <EntryMetaGrid items={meta} />
      <MiniRelationGraph title={title} related={related} />
      <RelatedEntries entries={related.slice(0, 4)} compact />
      <SourceList sources={sources} />
    </div>
  );
}
