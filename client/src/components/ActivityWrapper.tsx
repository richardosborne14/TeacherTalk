import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi2';

interface ActivityWrapperProps {
  title: string;
  instructions: string;
  children: React.ReactNode;
  onSubmit?: () => void;
  showSubmit?: boolean;
  feedback?: {
    type: 'success' | 'error' | 'info';
    message: string;
  } | null;
}

export default function ActivityWrapper({
  title,
  instructions,
  children,
  onSubmit,
  showSubmit = true,
  feedback,
}: ActivityWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-6 max-w-2xl"
      data-testid="activity-wrapper"
    >
      <div className="bg-accent/30 border border-accent-border rounded-xl p-6 shadow-sm">
        <div className="mb-4">
          <h3 className="font-serif text-xl font-bold text-foreground mb-2">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{instructions}</p>
        </div>

        <div className="mb-4">{children}</div>

        {showSubmit && (
          <div className="flex justify-end">
            <Button onClick={onSubmit} data-testid="button-submit-activity">
              Submit Answer
            </Button>
          </div>
        )}

        {feedback && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={`mt-4 flex items-start gap-2 p-3 rounded-lg ${
              feedback.type === 'success'
                ? 'bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-200'
                : feedback.type === 'error'
                ? 'bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-200'
                : 'bg-blue-50 dark:bg-blue-950/30 text-blue-800 dark:text-blue-200'
            }`}
            data-testid={`feedback-${feedback.type}`}
          >
            {feedback.type === 'success' ? (
              <HiCheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            ) : feedback.type === 'error' ? (
              <HiXCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            ) : null}
            <p className="text-sm">{feedback.message}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
