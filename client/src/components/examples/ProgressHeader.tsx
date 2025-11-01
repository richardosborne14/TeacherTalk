import ProgressHeader from '../ProgressHeader';

export default function ProgressHeaderExample() {
  return (
    <div className="border rounded-lg overflow-hidden">
      <ProgressHeader
        level="B1 - Intermediate"
        streak={5}
        lessonsCompleted={12}
        earnedBadges={['🚀', '🔥', '📚', '💬', '⭐']}
      />
    </div>
  );
}
