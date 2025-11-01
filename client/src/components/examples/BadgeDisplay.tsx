import BadgeDisplay from '../BadgeDisplay';

export default function BadgeDisplayExample() {
  return (
    <div className="p-6 max-w-4xl">
      <BadgeDisplay earnedBadges={['🚀', '🔥', '📚', '💬', '⭐']} />
    </div>
  );
}
