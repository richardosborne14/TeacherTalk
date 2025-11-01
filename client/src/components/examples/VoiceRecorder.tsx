import { useState } from 'react';
import { Button } from '@/components/ui/button';
import VoiceRecorder from '../VoiceRecorder';

export default function VoiceRecorderExample() {
  const [showRecorder, setShowRecorder] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setShowRecorder(true)}>
        Open Voice Recorder
      </Button>

      {showRecorder && (
        <VoiceRecorder
          onSend={(data) => {
            console.log('Sent audio:', data);
            setShowRecorder(false);
          }}
          onCancel={() => setShowRecorder(false)}
        />
      )}
    </div>
  );
}
