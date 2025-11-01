import { useState, useRef, useEffect } from 'react';
import WelcomeHeader from '@/components/WelcomeHeader';
import ChatBubble from '@/components/ChatBubble';
import TypingIndicator from '@/components/TypingIndicator';
import ChatInput from '@/components/ChatInput';
import EmptyState from '@/components/EmptyState';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    
    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(text),
        isUser: false,
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        }),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  // todo: remove mock functionality
  const getAIResponse = (userMessage: string): string => {
    const responses = [
      "That's wonderful! I love your enthusiasm. Tell me more about that - what makes it special to you?",
      "Excellent! You're doing great. Let me help you practice that. Can you try using that word in a sentence?",
      "I understand what you're saying! Here's a tip: native speakers often say it this way instead. Would you like to try again?",
      "Perfect! Your grammar is improving. Now, let's make it sound even more natural. How about we try...",
      "That's a great question! Let me explain it in a simple way. English can be tricky, but you're getting it!",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <WelcomeHeader />
      
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 ? (
            <EmptyState onStarterSelect={handleSendMessage} />
          ) : (
            <div className="space-y-2 py-4">
              {messages.map((message) => (
                <ChatBubble
                  key={message.id}
                  message={message.text}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      <ChatInput onSend={handleSendMessage} disabled={isTyping} />
    </div>
  );
}
