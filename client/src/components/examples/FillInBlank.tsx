import FillInBlank from '../activities/FillInBlank';

export default function FillInBlankExample() {
  return (
    <div className="p-6 max-w-3xl">
      <FillInBlank
        sentence="I ___ to the store yesterday and ___ some milk."
        gaps={[
          { position: 0, correctAnswer: 'went', userAnswer: '' },
          { position: 1, correctAnswer: 'bought', userAnswer: '' },
        ]}
        hint="Think about past tense verbs"
        onComplete={(correct) => console.log('Complete:', correct)}
      />
    </div>
  );
}
