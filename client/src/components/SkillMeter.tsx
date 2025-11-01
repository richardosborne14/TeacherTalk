import { motion } from 'framer-motion';

interface Skill {
  name: string;
  currentLevel: string;
  progress: number;
  color: string;
}

const skills: Skill[] = [
  { name: 'Listening', currentLevel: 'B1', progress: 75, color: 'hsl(210, 70%, 55%)' },
  { name: 'Reading', currentLevel: 'A2', progress: 60, color: 'hsl(160, 60%, 50%)' },
  { name: 'Writing', currentLevel: 'B1', progress: 40, color: 'hsl(280, 60%, 60%)' },
  { name: 'Speaking', currentLevel: 'A2', progress: 80, color: 'hsl(355, 75%, 60%)' },
];

export default function SkillMeter() {
  const getNextLevel = (currentLevel: string): string => {
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const currentIndex = levels.indexOf(currentLevel);
    return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : 'Mastery';
  };

  return (
    <div className="space-y-4" data-testid="skill-meter">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="space-y-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-medium text-sm text-foreground min-w-[80px]">
                {skill.name}
              </span>
              <span
                className="text-xs font-bold px-2 py-1 rounded-full"
                style={{
                  backgroundColor: `${skill.color}20`,
                  color: skill.color,
                }}
                data-testid={`level-badge-${skill.name.toLowerCase()}`}
              >
                {skill.currentLevel}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {skill.progress}% to {getNextLevel(skill.currentLevel)}
            </span>
          </div>

          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${skill.progress}%` }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
