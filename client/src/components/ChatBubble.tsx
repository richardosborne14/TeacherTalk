import { motion } from 'framer-motion';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
}

export default function ChatBubble({ message, isUser, timestamp }: ChatBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      data-testid={`message-${isUser ? 'user' : 'ai'}`}
    >
      <div className={`max-w-[80%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-card border border-card-border shadow-sm'
          }`}
        >
          <p className={`text-base leading-relaxed ${isUser ? '' : 'text-card-foreground'}`}>
            {message}
          </p>
        </div>
        {timestamp && (
          <span className="text-xs text-muted-foreground px-2" data-testid="text-timestamp">
            {timestamp}
          </span>
        )}
      </div>
    </motion.div>
  );
}
