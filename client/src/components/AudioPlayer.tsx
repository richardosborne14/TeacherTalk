import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { HiPlay, HiPause } from 'react-icons/hi2';
import { motion } from 'framer-motion';

interface AudioPlayerProps {
  duration: number;
  audioUrl?: string;
}

export default function AudioPlayer({ duration, audioUrl }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + (0.1 * playbackSpeed);
        });
      }, 100);
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying, duration, playbackSpeed]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (currentTime >= duration) {
      setCurrentTime(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    setCurrentTime(percentage * duration);
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIndex]);
  };

  const progress = (currentTime / duration) * 100;

  return (
    <div
      className="bg-card border border-card-border rounded-2xl px-4 py-3 shadow-sm max-w-md"
      data-testid="audio-player"
    >
      <div className="flex items-center gap-3">
        <Button
          size="icon"
          variant="ghost"
          onClick={handlePlayPause}
          className="flex-shrink-0 h-10 w-10"
          data-testid="button-play-pause"
        >
          {isPlaying ? (
            <HiPause className="h-5 w-5" />
          ) : (
            <HiPlay className="h-5 w-5" />
          )}
        </Button>

        <div className="flex-1">
          {/* Waveform/Progress Bar */}
          <div
            className="relative h-8 cursor-pointer group mb-1"
            onClick={handleProgressClick}
            data-testid="progress-bar"
          >
            <div className="absolute inset-0 flex items-center justify-center gap-0.5">
              {[...Array(30)].map((_, i) => {
                const heights = [30, 45, 60, 80, 95, 70, 50, 65, 85, 75, 55, 70, 90, 80, 60, 75, 85, 70, 55, 65, 80, 70, 50, 60, 75, 65, 50, 40, 35, 30];
                const barProgress = (i / 30) * 100;
                const isActive = barProgress <= progress;
                
                return (
                  <motion.div
                    key={i}
                    className={`w-0.5 rounded-full transition-colors ${
                      isActive ? 'bg-primary' : 'bg-muted'
                    }`}
                    style={{ height: `${heights[i]}%` }}
                    animate={
                      isPlaying && isActive
                        ? {
                            opacity: [0.6, 1, 0.6],
                          }
                        : {}
                    }
                    transition={
                      isPlaying && isActive
                        ? {
                            duration: 0.8,
                            repeat: Infinity,
                            delay: i * 0.02,
                          }
                        : {}
                    }
                  />
                );
              })}
            </div>
          </div>

          {/* Time Display */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-mono">{formatTime(currentTime)}</span>
            <span className="font-mono">{formatTime(duration)}</span>
          </div>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={cycleSpeed}
          className="flex-shrink-0 min-w-[60px] h-8 text-xs font-mono"
          data-testid="button-speed"
        >
          {playbackSpeed}x
        </Button>
      </div>
    </div>
  );
}
