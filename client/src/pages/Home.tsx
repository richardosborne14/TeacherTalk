import { useState, useRef, useEffect } from 'react';
import WelcomeHeader from '@/components/WelcomeHeader';
import ProgressHeader from '@/components/ProgressHeader';
import ChatBubble from '@/components/ChatBubble';
import TypingIndicator from '@/components/TypingIndicator';
import ChatInput from '@/components/ChatInput';
import EmptyState from '@/components/EmptyState';
import FillInBlank from '@/components/activities/FillInBlank';
import MatchingGame from '@/components/activities/MatchingGame';
import FreePractice from '@/components/activities/FreePractice';
import VoiceRecorder from '@/components/VoiceRecorder';
import AudioPlayer from '@/components/AudioPlayer';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  text?: string;
  isUser: boolean;
  timestamp: string;
  activity?: {
    type: 'fill-in-blank' | 'matching' | 'free-practice';
    data: any;
  };
  voice?: {
    duration: number;
    audioUrl?: string;
  };
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
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
      const aiResponse = getAIResponse(text, messages.length);
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendVoice = (audioData: any) => {
    const voiceMessage: Message = {
      id: Date.now().toString(),
      isUser: true,
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
      voice: {
        duration: audioData.duration,
      },
    };

    setMessages((prev) => [...prev, voiceMessage]);
    setShowVoiceRecorder(false);

    // Simulate AI voice response
    setIsTyping(true);
    setTimeout(() => {
      const aiVoiceResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Great pronunciation! I can hear you're working on your English. Let me give you some feedback...",
        isUser: false,
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        }),
        voice: {
          duration: 12,
        },
      };
      setMessages((prev) => [...prev, aiVoiceResponse]);
      setIsTyping(false);
    }, 2000);
  };

  // todo: remove mock functionality
  const getAIResponse = (userMessage: string, messageCount: number): Message => {
    const timestamp = new Date().toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });

    // Send an activity after certain messages to demonstrate functionality
    if (messageCount === 2) {
      return {
        id: (Date.now() + 1).toString(),
        text: "Great! Let's practice past tense verbs. Fill in the blanks below:",
        isUser: false,
        timestamp,
        activity: {
          type: 'fill-in-blank',
          data: {
            sentence: 'Yesterday, I ___ to the park and ___ my friend there.',
            gaps: [
              { position: 0, correctAnswer: 'went', userAnswer: '' },
              { position: 1, correctAnswer: 'met', userAnswer: '' },
            ],
            hint: 'Think about irregular past tense verbs',
          },
        },
      };
    } else if (messageCount === 4) {
      return {
        id: (Date.now() + 1).toString(),
        text: "Excellent progress! Let's expand your vocabulary. Match these words with their meanings:",
        isUser: false,
        timestamp,
        activity: {
          type: 'matching',
          data: {
            pairs: [
              { id: 1, word: 'serene', definition: 'calm and peaceful' },
              { id: 2, word: 'vivid', definition: 'bright and clear' },
              { id: 3, word: 'grateful', definition: 'feeling thankful' },
            ],
          },
        },
      };
    } else if (messageCount === 6) {
      return {
        id: (Date.now() + 1).toString(),
        text: "You're doing wonderfully! Now, let's practice writing:",
        isUser: false,
        timestamp,
        activity: {
          type: 'free-practice',
          data: {
            prompt: 'Describe what you did last weekend. Use at least 3 past tense verbs and try to include some descriptive adjectives.',
            minWords: 25,
          },
        },
      };
    }

    const responses = [
      "That's wonderful! I love your enthusiasm. Tell me more about that - what makes it special to you?",
      "Excellent! You're doing great. Let me help you practice that. Can you try using that word in a sentence?",
      "I understand what you're saying! Here's a tip: native speakers often say it this way instead. Would you like to try again?",
      "Perfect! Your grammar is improving. Now, let's make it sound even more natural. How about we try...",
      "That's a great question! Let me explain it in a simple way. English can be tricky, but you're getting it!",
    ];
    
    return {
      id: (Date.now() + 1).toString(),
      text: responses[Math.floor(Math.random() * responses.length)],
      isUser: false,
      timestamp,
    };
  };

  const handleActivityComplete = (activityId: string, correct: boolean) => {
    console.log(`Activity ${activityId} completed, correct: ${correct}`);
    
    // Simulate AI feedback
    setTimeout(() => {
      const feedbackMessage: Message = {
        id: Date.now().toString(),
        text: correct 
          ? "Fantastic work! You're really getting the hang of this. Ready to continue?"
          : "Good try! Don't worry about mistakes - they're part of learning. Let's keep practicing!",
        isUser: false,
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        }),
      };
      setMessages((prev) => [...prev, feedbackMessage]);
    }, 500);
  };

  const renderActivity = (message: Message) => {
    if (!message.activity) return null;

    switch (message.activity.type) {
      case 'fill-in-blank':
        return (
          <FillInBlank
            {...message.activity.data}
            onComplete={(correct) => handleActivityComplete(message.id, correct)}
          />
        );
      case 'matching':
        return (
          <MatchingGame
            {...message.activity.data}
            onComplete={(correct) => handleActivityComplete(message.id, correct)}
          />
        );
      case 'free-practice':
        return (
          <FreePractice
            {...message.activity.data}
            onSubmit={(response) => {
              console.log('Free practice response:', response);
              handleActivityComplete(message.id, true);
            }}
          />
        );
      default:
        return null;
    }
  };

  // todo: remove mock functionality - Demo trigger buttons
  const triggerDemoActivity = (type: 'fill-in-blank' | 'matching' | 'free-practice') => {
    const timestamp = new Date().toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });

    let activityMessage: Message;

    if (type === 'fill-in-blank') {
      activityMessage = {
        id: Date.now().toString(),
        text: "Let's practice! Fill in the blanks:",
        isUser: false,
        timestamp,
        activity: {
          type: 'fill-in-blank',
          data: {
            sentence: 'I ___ to the store yesterday and ___ some milk.',
            gaps: [
              { position: 0, correctAnswer: 'went', userAnswer: '' },
              { position: 1, correctAnswer: 'bought', userAnswer: '' },
            ],
            hint: 'Think about past tense verbs',
          },
        },
      };
    } else if (type === 'matching') {
      activityMessage = {
        id: Date.now().toString(),
        text: "Match these words with their definitions:",
        isUser: false,
        timestamp,
        activity: {
          type: 'matching',
          data: {
            pairs: [
              { id: 1, word: 'ephemeral', definition: 'lasting for a very short time' },
              { id: 2, word: 'ubiquitous', definition: 'present everywhere' },
              { id: 3, word: 'serendipity', definition: 'finding something good by chance' },
            ],
          },
        },
      };
    } else {
      activityMessage = {
        id: Date.now().toString(),
        text: "Time for some free writing practice:",
        isUser: false,
        timestamp,
        activity: {
          type: 'free-practice',
          data: {
            prompt: 'Describe your morning routine. Try to use at least 5 different verbs.',
            minWords: 30,
          },
        },
      };
    }

    setMessages((prev) => [...prev, activityMessage]);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <WelcomeHeader />
      <ProgressHeader
        level="B1 - Intermediate"
        streak={5}
        lessonsCompleted={12}
        earnedBadges={['🚀', '🔥', '📚', '💬', '⭐']}
      />
      
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 ? (
            <EmptyState onStarterSelect={handleSendMessage} />
          ) : (
            <div className="space-y-2 py-4">
              {messages.map((message) => (
                <div key={message.id}>
                  {message.text && (
                    <ChatBubble
                      message={message.text}
                      isUser={message.isUser}
                      timestamp={message.timestamp}
                    />
                  )}
                  {message.voice && (
                    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}>
                      <div className={`max-w-[80%] ${message.isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                        <AudioPlayer duration={message.voice.duration} audioUrl={message.voice.audioUrl} />
                        <span className="text-xs text-muted-foreground px-2" data-testid="text-timestamp">
                          {message.timestamp}
                        </span>
                      </div>
                    </div>
                  )}
                  {message.activity && renderActivity(message)}
                </div>
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* todo: remove mock functionality - Demo buttons */}
          {messages.length > 0 && (
            <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-3">Demo: Trigger Activities & Voice</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => triggerDemoActivity('fill-in-blank')}
                  data-testid="button-demo-fillblank"
                >
                  Fill in Blanks
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => triggerDemoActivity('matching')}
                  data-testid="button-demo-matching"
                >
                  Matching Game
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => triggerDemoActivity('free-practice')}
                  data-testid="button-demo-practice"
                >
                  Free Practice
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowVoiceRecorder(true)}
                  data-testid="button-demo-voice"
                >
                  Voice Message
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ChatInput 
        onSend={handleSendMessage} 
        onVoiceClick={() => setShowVoiceRecorder(true)}
        disabled={isTyping} 
      />

      {showVoiceRecorder && (
        <VoiceRecorder
          onSend={handleSendVoice}
          onCancel={() => setShowVoiceRecorder(false)}
        />
      )}
    </div>
  );
}
