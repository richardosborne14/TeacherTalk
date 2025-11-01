import MatchingGame from '../activities/MatchingGame';

export default function MatchingGameExample() {
  const pairs = [
    { id: 1, word: 'ephemeral', definition: 'lasting for a very short time' },
    { id: 2, word: 'ubiquitous', definition: 'present everywhere' },
    { id: 3, word: 'serendipity', definition: 'finding something good by chance' },
    { id: 4, word: 'melancholy', definition: 'a feeling of deep sadness' },
  ];

  return (
    <div className="p-6 max-w-4xl">
      <MatchingGame
        pairs={pairs}
        onComplete={(correct) => console.log('Complete:', correct)}
      />
    </div>
  );
}
