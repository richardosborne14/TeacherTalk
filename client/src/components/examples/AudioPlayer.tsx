import AudioPlayer from '../AudioPlayer';

export default function AudioPlayerExample() {
  return (
    <div className="p-6 space-y-4">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Short audio (8 seconds)</p>
        <AudioPlayer duration={8} />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Medium audio (45 seconds)</p>
        <AudioPlayer duration={45} />
      </div>
    </div>
  );
}
