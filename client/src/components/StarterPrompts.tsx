import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface StarterPromptsProps {
  onSelect: (prompt: string) => void;
}

const prompts = [
  "Help me introduce myself",
  "Practice ordering at a restaurant",
  "Discuss my favorite book",
  "Talk about my weekend plans",
];

export default function StarterPrompts({ onSelect }: StarterPromptsProps) {
  return (
    <div className="flex flex-col gap-3 max-w-md mx-auto">
      <p className="text-sm text-muted-foreground text-center mb-2">
        Try one of these to get started:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {prompts.map((prompt, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              variant="outline"
              className="w-full justify-start text-left h-auto py-3 px-4"
              onClick={() => onSelect(prompt)}
              data-testid={`button-starter-${index}`}
            >
              {prompt}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
