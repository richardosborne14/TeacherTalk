import ErrorMessage from '../ErrorMessage';

export default function ErrorMessageExample() {
  return (
    <div className="p-6">
      <ErrorMessage
        message="Oops! Something went wrong. Please try again."
        onRetry={() => console.log('Retry clicked')}
      />
    </div>
  );
}
