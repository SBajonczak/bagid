import BulkEditClient from './BulkEditClient';

interface BulkEditPageProps {
  searchParams: { tags?: string };
}

export default function BulkEditPage({ searchParams }: BulkEditPageProps) {
  const tagIds = (searchParams.tags ?? '').split(',').filter(Boolean);
  return <BulkEditClient tagIds={tagIds} />;
}
