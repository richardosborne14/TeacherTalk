import { motion } from 'framer-motion';

export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4" data-testid="indicator-typing">
      <div className="bg-card border border-card-border rounded-2xl px-4 py-3 shadow-sm">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-muted-foreground rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
