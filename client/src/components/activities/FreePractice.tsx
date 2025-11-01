import { useState } from 'react';
import ActivityWrapper from '../ActivityWrapper';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface FreePracticeProps {
  prompt: string;
  minWords?: number;
  onSubmit?: (response: string) => void;
}

export default function FreePractice({
  prompt,
  minWords = 0,
  onSubmit,
}: FreePracticeProps) {
  const [response, setResponse] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  const wordCount = response.trim().split(/\s+/).filter(Boolean).length;
  const charCount = response.length;

  const handleSubmit = () => {
    if (wordCount < minWords) {
      setFeedback({
        type: 'error',
        message: `Please write at least ${minWords} words. You currently have ${wordCount}.`,
      });
      return;
    }

    setSubmitted(true);
    setFeedback({
      type: 'success',
      message: "Great work! I'll review your response and provide feedback.",
    });
    onSubmit?.(response);
  };

  const handleTryAgain = () => {
    setResponse('');
    setSubmitted(false);
    setFeedback(null);
  };

  return (
    <ActivityWrapper
      title="Free Practice"
      instructions={prompt}
      showSubmit={false}
      feedback={feedback}
    >
      <div className="space-y-4">
        <Textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          disabled={submitted}
          placeholder="Type your response here..."
          className="min-h-[150px] text-base resize-y"
          data-testid="textarea-response"
        />

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {wordCount} word{wordCount !== 1 ? 's' : ''} · {charCount} character
            {charCount !== 1 ? 's' : ''}
            {minWords > 0 && wordCount < minWords && (
              <span className="text-destructive ml-2">
                (minimum {minWords} words)
              </span>
            )}
          </div>

          <div className="flex gap-2">
            {!submitted ? (
              <Button
                onClick={handleSubmit}
                disabled={!response.trim() || wordCount < minWords}
                data-testid="button-submit-practice"
              >
                Submit Response
              </Button>
            ) : (
              <Button onClick={handleTryAgain} variant="outline" data-testid="button-edit-practice">
                Edit Response
              </Button>
            )}
          </div>
        </div>
      </div>
    </ActivityWrapper>
  );
}
