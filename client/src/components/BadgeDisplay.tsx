import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Badge {
  id: string;
  icon: string;
  title: string;
  description: string;
  unlockCriteria: string;
}

const allBadges: Badge[] = [
  {
    id: 'first-flight',
    icon: '🚀',
    title: 'First Flight',
    description: 'You completed your first lesson!',
    unlockCriteria: 'Complete your first lesson',
  },
  {
    id: 'seven-day-streak',
    icon: '🔥',
    title: '7-Day Streak',
    description: 'You practiced for 7 days in a row!',
    unlockCriteria: 'Practice for 7 consecutive days',
  },
  {
    id: 'grammar-master',
    icon: '📚',
    title: 'Grammar Master',
    description: 'You completed 10 grammar lessons!',
    unlockCriteria: 'Complete 10 grammar lessons',
  },
  {
    id: 'brave-speaker',
    icon: '💬',
    title: 'Brave Speaker',
    description: 'You completed 5 voice activities!',
    unlockCriteria: 'Complete 5 voice activities',
  },
  {
    id: 'confidence-builder',
    icon: '⭐',
    title: 'Confidence Builder',
    description: 'Your confidence level increased!',
    unlockCriteria: 'Increase confidence by 2 levels',
  },
  {
    id: 'vocabulary-collector',
    icon: '📖',
    title: 'Vocabulary Collector',
    description: 'You learned 50 new words!',
    unlockCriteria: 'Learn 50 new words',
  },
  {
    id: 'conversation-pro',
    icon: '🗣️',
    title: 'Conversation Pro',
    description: 'You completed 20 conversations!',
    unlockCriteria: 'Complete 20 conversation exercises',
  },
  {
    id: 'night-owl',
    icon: '🦉',
    title: 'Night Owl',
    description: 'You practiced late at night!',
    unlockCriteria: 'Practice after 10 PM',
  },
  {
    id: 'early-bird',
    icon: '🌅',
    title: 'Early Bird',
    description: 'You practiced early in the morning!',
    unlockCriteria: 'Practice before 7 AM',
  },
];

interface BadgeDisplayProps {
  earnedBadges?: string[];
}

export default function BadgeDisplay({ earnedBadges = ['🚀', '🔥', '📚', '💬', '⭐'] }: BadgeDisplayProps) {
  const isBadgeEarned = (badgeIcon: string) => earnedBadges.includes(badgeIcon);

  return (
    <div
      className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3"
      data-testid="badge-display"
    >
      {allBadges.map((badge, index) => {
        const isEarned = isBadgeEarned(badge.icon);

        return (
          <Tooltip key={badge.id}>
            <TooltipTrigger asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                  isEarned
                    ? 'bg-card border-card-border shadow-sm hover-elevate cursor-pointer'
                    : 'bg-muted/30 border-muted opacity-50 grayscale'
                }`}
                data-testid={`badge-${badge.id}`}
              >
                <div className="text-3xl">{badge.icon}</div>
                <p className="text-xs font-medium text-center text-foreground line-clamp-2">
                  {badge.title}
                </p>
                {isEarned && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.05 + 0.2, type: 'spring' }}
                  >
                    <span className="text-[8px] text-primary-foreground">✓</span>
                  </motion.div>
                )}
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="max-w-xs">
                <p className="font-semibold mb-1">{badge.title}</p>
                <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
                {!isEarned && (
                  <p className="text-xs text-muted-foreground italic">
                    🔒 {badge.unlockCriteria}
                  </p>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
