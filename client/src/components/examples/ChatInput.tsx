import ChatInput from '../ChatInput';

export default function ChatInputExample() {
  return (
    <div className="border rounded-lg overflow-hidden">
      <ChatInput onSend={(message) => console.log('Sent message:', message)} />
    </div>
  );
}
