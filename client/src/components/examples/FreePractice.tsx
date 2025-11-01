import FreePractice from '../activities/FreePractice';

export default function FreePracticeExample() {
  return (
    <div className="p-6 max-w-3xl">
      <FreePractice
        prompt="Describe your morning routine. Try to use at least 5 different verbs."
        minWords={30}
        onSubmit={(response) => console.log('Submitted:', response)}
      />
    </div>
  );
}
