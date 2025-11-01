import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';
import SkillMeter from './SkillMeter';
import BadgeDisplay from './BadgeDisplay';

interface ProgressHeaderProps {
  level: string;
  streak: number;
  lessonsCompleted: number;
  earnedBadges: string[];
}

export default function ProgressHeader({
  level,
  streak,
  lessonsCompleted,
  earnedBadges,
}: ProgressHeaderProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-border bg-accent/20" data-testid="progress-header">
      {/* Compact Bar */}
      <div className="px-4 py-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between hover-elevate rounded-lg px-2 py-1 transition-colors"
          data-testid="button-toggle-progress"
        >
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">Level</span>
              <span className="font-serif font-bold text-sm text-primary">
                {level}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-foreground">
              <span className="flex items-center gap-1">
                <span className="text-base">🔥</span>
                <span className="font-medium">{streak} day streak</span>
              </span>
              <span className="text-muted-foreground">|</span>
              <span className="font-medium">{lessonsCompleted} lessons completed</span>
            </div>

            <div className="flex items-center gap-1">
              {earnedBadges.slice(0, 3).map((badge, i) => (
                <span key={i} className="text-base" title={badge}>
                  {badge}
                </span>
              ))}
              {earnedBadges.length > 3 && (
                <span className="text-xs text-muted-foreground font-medium">
                  +{earnedBadges.length - 3}
                </span>
              )}
            </div>
          </div>

          <div className="flex-shrink-0">
            {isExpanded ? (
              <HiChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <HiChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </button>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-6 pt-2 space-y-6">
              <div>
                <h3 className="font-serif font-bold text-lg text-foreground mb-4">
                  Your Skills
                </h3>
                <SkillMeter />
              </div>

              <div>
                <h3 className="font-serif font-bold text-lg text-foreground mb-4">
                  Your Badges
                </h3>
                <BadgeDisplay earnedBadges={earnedBadges} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
