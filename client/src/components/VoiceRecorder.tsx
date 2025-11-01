import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { HiMicrophone, HiStop, HiPaperAirplane, HiXMark } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceRecorderProps {
  onSend: (audioData: any) => void;
  onCancel: () => void;
}

export default function VoiceRecorder({ onSend, onCancel }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(true);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecording, setHasRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isRecording || hasRecording) return;

    const interval = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRecording, hasRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStop = () => {
    setIsRecording(false);
    setHasRecording(true);
  };

  const handleSend = () => {
    // todo: remove mock functionality - send actual audio data
    onSend({ duration: recordingTime, timestamp: Date.now() });
  };

  const handleRecordAgain = () => {
    setIsRecording(true);
    setHasRecording(false);
    setRecordingTime(0);
    setIsPlaying(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onCancel}
        data-testid="voice-recorder-overlay"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-background rounded-2xl p-8 max-w-md w-full shadow-2xl"
        >
          {isRecording && !hasRecording ? (
            // Recording State
            <div className="text-center">
              <div className="mb-6">
                <motion.div
                  className="w-24 h-24 mx-auto rounded-full bg-destructive/20 flex items-center justify-center relative"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-destructive flex items-center justify-center"
                    animate={{
                      scale: [1, 0.95, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    <HiMicrophone className="w-8 h-8 text-destructive-foreground" />
                  </motion.div>
                </motion.div>
              </div>

              <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                Recording...
              </h3>

              <div className="text-3xl font-mono font-bold text-destructive mb-6">
                {formatTime(recordingTime)}
              </div>

              {/* Animated Waveform */}
              <div className="flex items-center justify-center gap-1 mb-8 h-16">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 bg-primary rounded-full"
                    animate={{
                      height: ['20%', '100%', '20%'],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                    data-testid={`waveform-bar-${i}`}
                  />
                ))}
              </div>

              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={onCancel}
                  data-testid="button-cancel-recording"
                >
                  <HiXMark className="w-5 h-5 mr-2" />
                  Cancel
                </Button>
                <Button
                  size="lg"
                  onClick={handleStop}
                  className="bg-destructive hover:bg-destructive/90"
                  data-testid="button-stop-recording"
                >
                  <HiStop className="w-5 h-5 mr-2" />
                  Stop Recording
                </Button>
              </div>
            </div>
          ) : (
            // Preview State
            <div className="text-center">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
                Recording Preview
              </h3>

              <div className="bg-accent/30 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">Duration</span>
                  <span className="font-mono font-bold text-foreground">
                    {formatTime(recordingTime)}
                  </span>
                </div>

                {/* Static waveform for preview */}
                <div className="flex items-center justify-center gap-1 h-12 mb-4">
                  {[...Array(20)].map((_, i) => {
                    const heights = [30, 50, 70, 90, 60, 40, 80, 95, 70, 50, 60, 85, 75, 55, 65, 90, 70, 50, 40, 30];
                    return (
                      <motion.div
                        key={i}
                        className={`w-1 rounded-full transition-colors ${
                          isPlaying ? 'bg-primary' : 'bg-muted'
                        }`}
                        style={{ height: `${heights[i]}%` }}
                        animate={
                          isPlaying
                            ? {
                                opacity: [0.3, 1, 0.3],
                              }
                            : {}
                        }
                        transition={
                          isPlaying
                            ? {
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.05,
                              }
                            : {}
                        }
                      />
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-full"
                  data-testid="button-play-preview"
                >
                  {isPlaying ? 'Pause' : 'Play'} Preview
                </Button>
              </div>

              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleRecordAgain}
                  data-testid="button-record-again"
                >
                  <HiMicrophone className="w-5 h-5 mr-2" />
                  Record Again
                </Button>
                <Button
                  size="lg"
                  onClick={handleSend}
                  data-testid="button-send-recording"
                >
                  <HiPaperAirplane className="w-5 h-5 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
