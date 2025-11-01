import ActivityWrapper from '../ActivityWrapper';

export default function ActivityWrapperExample() {
  return (
    <div className="p-6">
      <ActivityWrapper
        title="Practice Activity"
        instructions="Complete the exercise below to practice your English skills."
        onSubmit={() => console.log('Activity submitted')}
        feedback={{
          type: 'success',
          message: 'Great job! You got it right!',
        }}
      >
        <div className="p-4 bg-background rounded-lg border">
          <p className="text-foreground">Activity content goes here</p>
        </div>
      </ActivityWrapper>
    </div>
  );
}
