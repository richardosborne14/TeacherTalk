import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { HiExclamationTriangle } from 'react-icons/hi2';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start mb-4"
      data-testid="error-message"
    >
      <div className="max-w-[80%] bg-destructive/10 border border-destructive/30 rounded-2xl px-4 py-3">
        <div className="flex items-start gap-3">
          <HiExclamationTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-foreground mb-3">{message}</p>
            {onRetry && (
              <Button
                size="sm"
                variant="outline"
                onClick={onRetry}
                data-testid="button-retry"
              >
                Try Again
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
