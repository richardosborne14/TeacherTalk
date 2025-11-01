import { useState } from 'react';
import ActivityWrapper from '../ActivityWrapper';
import { Button } from '@/components/ui/button';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi2';

interface Pair {
  id: number;
  word: string;
  definition: string;
}

interface MatchingGameProps {
  pairs: Pair[];
  onComplete?: (correct: boolean) => void;
}

export default function MatchingGame({ pairs, onComplete }: MatchingGameProps) {
  const [selectedWord, setSelectedWord] = useState<number | null>(null);
  const [matches, setMatches] = useState<Map<number, number>>(new Map());
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  const shuffledDefinitions = [...pairs].sort(() => Math.random() - 0.5);

  const handleWordClick = (wordId: number) => {
    if (submitted) return;
    
    if (selectedWord === wordId) {
      setSelectedWord(null);
    } else {
      setSelectedWord(wordId);
    }
  };

  const handleDefinitionClick = (defId: number) => {
    if (submitted || selectedWord === null) return;

    const newMatches = new Map(matches);
    
    Array.from(newMatches.entries()).forEach(([key, value]) => {
      if (value === defId) newMatches.delete(key);
      if (key === selectedWord) newMatches.delete(key);
    });

    newMatches.set(selectedWord, defId);
    setMatches(newMatches);
    setSelectedWord(null);
  };

  const handleSubmit = () => {
    if (matches.size !== pairs.length) {
      setFeedback({
        type: 'error',
        message: 'Please match all words before submitting!',
      });
      return;
    }

    let correctCount = 0;
    matches.forEach((defId, wordId) => {
      if (wordId === defId) correctCount++;
    });

    const allCorrect = correctCount === pairs.length;
    setSubmitted(true);

    if (allCorrect) {
      setFeedback({
        type: 'success',
        message: 'Excellent! All matches are correct!',
      });
      onComplete?.(true);
    } else {
      setFeedback({
        type: 'error',
        message: `You got ${correctCount} out of ${pairs.length} correct. Try again!`,
      });
      onComplete?.(false);
    }
  };

  const handleTryAgain = () => {
    setMatches(new Map());
    setSelectedWord(null);
    setSubmitted(false);
    setFeedback(null);
  };

  const isMatched = (id: number, type: 'word' | 'definition') => {
    if (type === 'word') {
      return matches.has(id);
    } else {
      return Array.from(matches.values()).includes(id);
    }
  };

  const isCorrect = (wordId: number) => {
    if (!submitted) return false;
    const matchedDefId = matches.get(wordId);
    return matchedDefId === wordId;
  };

  return (
    <ActivityWrapper
      title="Matching Game"
      instructions="Match each word with its correct definition by clicking a word and then its definition."
      showSubmit={false}
      feedback={feedback}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground mb-2">Words</h4>
            {pairs.map((pair) => {
              const matched = isMatched(pair.id, 'word');
              const correct = isCorrect(pair.id);
              const selected = selectedWord === pair.id;

              return (
                <button
                  key={pair.id}
                  onClick={() => handleWordClick(pair.id)}
                  disabled={submitted}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all hover-elevate ${
                    selected
                      ? 'border-ring bg-accent'
                      : submitted && correct
                      ? 'border-green-500 bg-green-50 dark:bg-green-950/30'
                      : submitted && matched && !correct
                      ? 'border-red-500 bg-red-50 dark:bg-red-950/30'
                      : matched
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-card'
                  }`}
                  data-testid={`word-${pair.id}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{pair.word}</span>
                    {submitted && (
                      <span>
                        {correct ? (
                          <HiCheckCircle className="h-5 w-5 text-green-600" />
                        ) : matched ? (
                          <HiXCircle className="h-5 w-5 text-red-600" />
                        ) : null}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground mb-2">
              Definitions
            </h4>
            {shuffledDefinitions.map((pair) => {
              const matched = isMatched(pair.id, 'definition');

              return (
                <button
                  key={pair.id}
                  onClick={() => handleDefinitionClick(pair.id)}
                  disabled={submitted || selectedWord === null}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all hover-elevate ${
                    matched
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-card'
                  } ${selectedWord === null && !submitted ? 'opacity-50' : ''}`}
                  data-testid={`definition-${pair.id}`}
                >
                  <span className="text-sm text-card-foreground">{pair.definition}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          {!submitted ? (
            <Button
              onClick={handleSubmit}
              disabled={matches.size !== pairs.length}
              data-testid="button-submit-matches"
            >
              Check Matches
            </Button>
          ) : (
            <Button onClick={handleTryAgain} data-testid="button-try-again-match">
              Try Again
            </Button>
          )}
        </div>
      </div>
    </ActivityWrapper>
  );
}
