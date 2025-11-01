import ChatBubble from '../ChatBubble';

export default function ChatBubbleExample() {
  return (
    <div className="space-y-4 p-6 max-w-2xl">
      <ChatBubble 
        message="Hello! I'd like to practice my English conversation skills." 
        isUser={true}
        timestamp="2:30 PM"
      />
      <ChatBubble 
        message="Wonderful! I'm so happy you're here. Let's start with something fun - tell me about your favorite hobby! Take your time, and don't worry about making mistakes. That's how we learn!" 
        isUser={false}
        timestamp="2:30 PM"
      />
    </div>
  );
}
