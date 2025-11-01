import { motion, AnimatePresence } from 'framer-motion';
import { HiWifi } from 'react-icons/hi2';

interface OfflineIndicatorProps {
  isOffline: boolean;
}

export default function OfflineIndicator({ isOffline }: OfflineIndicatorProps) {
  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-0 left-0 right-0 z-50 bg-destructive text-destructive-foreground py-2 px-4 text-center"
          data-testid="offline-indicator"
        >
          <div className="flex items-center justify-center gap-2 text-sm font-medium">
            <HiWifi className="h-4 w-4" />
            <span>You're offline - connect to continue your lesson</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
