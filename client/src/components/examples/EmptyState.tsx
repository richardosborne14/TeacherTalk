import EmptyState from '../EmptyState';

export default function EmptyStateExample() {
  return (
    <EmptyState onStarterSelect={(prompt) => console.log('Selected:', prompt)} />
  );
}
