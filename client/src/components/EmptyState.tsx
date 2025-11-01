import welcomeImage from '@assets/generated_images/Cozy_book_and_tea_illustration_23ce28c1.png';
import StarterPrompts from './StarterPrompts';

interface EmptyStateProps {
  onStarterSelect: (prompt: string) => void;
}

export default function EmptyState({ onStarterSelect }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6">
      <div className="max-w-md text-center">
        <img 
          src={welcomeImage} 
          alt="Welcome to learning" 
          className="w-40 h-40 mx-auto mb-6 opacity-90"
        />
        <h2 className="font-serif text-2xl font-bold text-foreground mb-3">
          Welcome, friend!
        </h2>
        <p className="text-base text-muted-foreground mb-8 leading-relaxed">
          I'm here to help you practice English in a relaxed, friendly way. 
          Think of this as a conversation with a patient teacher over a cup of tea.
        </p>
        <StarterPrompts onSelect={onStarterSelect} />
      </div>
    </div>
  );
}
