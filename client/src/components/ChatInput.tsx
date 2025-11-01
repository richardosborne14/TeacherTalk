import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { HiPaperAirplane } from 'react-icons/hi2';
import { motion } from 'framer-motion';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <motion.div 
      className="border-t border-border bg-background p-4"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              className="w-full resize-none rounded-full border border-border bg-background px-6 py-4 text-base focus:outline-none focus:ring-2 focus:ring-ring shadow-sm min-h-[56px] max-h-[120px]"
              rows={1}
              disabled={disabled}
              data-testid="input-message"
            />
          </div>
          <Button
            type="submit"
            size="icon"
            className="rounded-full h-14 w-14 shadow-md flex-shrink-0"
            disabled={!message.trim() || disabled}
            data-testid="button-send"
          >
            <HiPaperAirplane className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
