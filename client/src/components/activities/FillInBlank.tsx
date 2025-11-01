import { useState } from 'react';
import ActivityWrapper from '../ActivityWrapper';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi2';
import { Button } from '@/components/ui/button';

interface Gap {
  position: number;
  correctAnswer: string;
  userAnswer: string;
}

interface FillInBlankProps {
  sentence: string;
  gaps: Gap[];
  hint?: string;
  onComplete?: (correct: boolean) => void;
}

export default function FillInBlank({
  sentence,
  gaps: initialGaps,
  hint,
  onComplete,
}: FillInBlankProps) {
  const [gaps, setGaps] = useState(initialGaps);
  const [submitted, setSubmitted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  const handleInputChange = (position: number, value: string) => {
    setGaps((prev) =>
      prev.map((gap) =>
        gap.position === position ? { ...gap, userAnswer: value } : gap
      )
    );
  };

  const handleSubmit = () => {
    const allCorrect = gaps.every(
      (gap) => gap.userAnswer.trim().toLowerCase() === gap.correctAnswer.toLowerCase()
    );
    setSubmitted(true);
    
    if (allCorrect) {
      setFeedback({
        type: 'success',
        message: 'Perfect! You got all the answers correct!',
      });
      onComplete?.(true);
    } else {
      setFeedback({
        type: 'error',
        message: 'Not quite right. Check the highlighted answers and try again!',
      });
      onComplete?.(false);
    }
  };

  const handleTryAgain = () => {
    setGaps((prev) =>
      prev.map((gap) => ({ ...gap, userAnswer: '' }))
    );
    setSubmitted(false);
    setShowAnswer(false);
    setFeedback(null);
  };

  const renderSentence = () => {
    const parts = sentence.split('___');
    const result: JSX.Element[] = [];

    parts.forEach((part, index) => {
      result.push(<span key={`text-${index}`}>{part}</span>);

      if (index < gaps.length) {
        const gap = gaps[index];
        const isCorrect =
          submitted &&
          gap.userAnswer.trim().toLowerCase() === gap.correctAnswer.toLowerCase();
        const isIncorrect = submitted && !isCorrect && gap.userAnswer.trim() !== '';

        result.push(
          <span key={`gap-${index}`} className="inline-flex items-center gap-1 mx-1">
            <input
              type="text"
              value={showAnswer ? gap.correctAnswer : gap.userAnswer}
              onChange={(e) => handleInputChange(gap.position, e.target.value)}
              disabled={submitted || showAnswer}
              className={`inline-block border-b-2 px-2 py-1 text-center focus:outline-none focus:border-ring transition-colors ${
                isCorrect
                  ? 'border-green-500 bg-green-50 dark:bg-green-950/30'
                  : isIncorrect
                  ? 'border-red-500 bg-red-50 dark:bg-red-950/30'
                  : 'border-border bg-transparent'
              }`}
              style={{ width: `${Math.max(gap.correctAnswer.length * 10, 80)}px` }}
              data-testid={`input-gap-${index}`}
            />
            {submitted && (
              <span className="inline-block">
                {isCorrect ? (
                  <HiCheckCircle className="h-5 w-5 text-green-600" />
                ) : isIncorrect ? (
                  <HiXCircle className="h-5 w-5 text-red-600" />
                ) : null}
              </span>
            )}
          </span>
        );
      }
    });

    return <div className="text-lg leading-relaxed text-foreground">{result}</div>;
  };

  return (
    <ActivityWrapper
      title="Fill in the Blanks"
      instructions="Complete the sentence by filling in the missing words."
      showSubmit={false}
      feedback={feedback}
    >
      <div className="space-y-4">
        <div className="bg-background p-4 rounded-lg border border-border">
          {renderSentence()}
        </div>

        {hint && !submitted && (
          <div className="text-sm text-muted-foreground italic">
            💡 Hint: {hint}
          </div>
        )}

        <div className="flex gap-2 justify-end">
          {!submitted ? (
            <Button onClick={handleSubmit} data-testid="button-submit-blanks">
              Check Answer
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => setShowAnswer(!showAnswer)}
                data-testid="button-show-answer"
              >
                {showAnswer ? 'Hide' : 'Show'} Answer
              </Button>
              <Button onClick={handleTryAgain} data-testid="button-try-again">
                Try Again
              </Button>
            </>
          )}
        </div>
      </div>
    </ActivityWrapper>
  );
}
