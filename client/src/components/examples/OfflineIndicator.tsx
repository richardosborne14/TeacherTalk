import { useState } from 'react';
import { Button } from '@/components/ui/button';
import OfflineIndicator from '../OfflineIndicator';

export default function OfflineIndicatorExample() {
  const [isOffline, setIsOffline] = useState(true);

  return (
    <div className="p-6">
      <Button onClick={() => setIsOffline(!isOffline)}>
        Toggle Offline State
      </Button>
      <OfflineIndicator isOffline={isOffline} />
    </div>
  );
}
