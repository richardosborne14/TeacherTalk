import StarterPrompts from '../StarterPrompts';

export default function StarterPromptsExample() {
  return (
    <div className="p-6">
      <StarterPrompts onSelect={(prompt) => console.log('Selected prompt:', prompt)} />
    </div>
  );
}
