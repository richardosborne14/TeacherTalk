# Replit Agent Prompt: Language Learning AI Companion (Frontend)

## 🎯 Project Overview

Build a warm, inviting frontend for an AI language learning companion. This is a conversational interface where learners chat with an AI teacher who guides their English learning journey. The UI should feel like talking to an eccentric, caring teacher - not a corporate eLearning platform.

**Tech Stack:** Use React with Next.js for modern web development
**Design Goal:** Cozy, encouraging, slightly whimsical - think "teacher's study" not "sterile classroom"
**Mobile-First:** This must work beautifully on phones

---

## 📋 Phase 1: Basic Structure & Chat Interface

**Goal:** Set up the project foundation and core chat UI

### Step 1.1: Initialize Project
Create a Next.js project with the following structure:
- `/app` - Main application routes
- `/components` - Reusable UI components
- `/styles` - Global styling and theme
- `/utils` - Helper functions
- `/public` - Static assets

Install these dependencies:
- `react-icons` for icons
- `framer-motion` for subtle animations
- `tailwindcss` for styling

### Step 1.2: Create Landing/Chat Page

Create the main page at `/app/page.js` with:
- A welcoming header: "Your English Learning Journey Starts Here"
- A subheading that sets the tone: "Meet your AI teacher. No signup needed - just start talking."
- The chat interface (see Phase 2)
- Warm color palette: cream backgrounds (#FFF8F0), warm accent (#FF6B6B), text (#2C3E50)

**Design Notes:**
- Large, readable fonts (16px minimum for body text)
- Generous padding and spacing
- Rounded corners on UI elements
- Soft shadows (not harsh)

**CHECKPOINT:** Test the landing page loads and looks welcoming on mobile and desktop before continuing.

---

## 📋 Phase 2: Chat Interface Component

**Goal:** Build the conversational interface where users interact with the AI

### Step 2.1: Create ChatContainer Component

Build `/components/ChatContainer.jsx` with:

**Layout:**
- Message thread (scrollable, fills available height)
- Input area (fixed at bottom)
- Voice controls (mic button integrated with input)

**Message Thread Features:**
- User messages: right-aligned, different color than AI messages
- AI messages: left-aligned, slightly larger text
- Timestamp on hover (subtle, not intrusive)
- Auto-scroll to latest message
- Typing indicator when AI is "thinking"

**Styling Specifics:**
- User messages: light blue bubble (#E3F2FD)
- AI messages: warm cream bubble (#FFF8F0) with subtle border
- Message bubbles: rounded corners (16px), padding (12px 16px)
- Maximum width: 80% of container (so messages don't stretch awkwardly)
- Spacing between messages: 12px

### Step 2.2: Create MessageInput Component

Build `/components/MessageInput.jsx` with:

**Features:**
- Text input field (textarea that grows with content, max 5 lines)
- Send button (icon: paper airplane)
- Mic button (icon: microphone)
- Visual states: default, recording, disabled (when AI is responding)

**Recording State:**
- When mic is active, show pulsing red circle
- Display audio waveform visualization (can use simple CSS animation)
- Show "Stop Recording" button
- Disable text input during recording

**Styling:**
- Input container: white background, rounded (24px), shadow
- Mic button: circular, warm accent color when active
- Send button: only enabled when there's text (subtle visual cue)
- Padding: 12px 16px

**CHECKPOINT:** Verify chat interface works, messages display correctly, and input feels natural before adding voice.

---

## 📋 Phase 3: Activity Widgets

**Goal:** Build interactive exercise components that appear naturally in the chat

### Step 3.1: Create ActivityWrapper Component

Build `/components/ActivityWrapper.jsx`:
- This is a container that appears as a special message in the chat
- Has a subtle background to distinguish from regular messages
- Shows activity title and instructions
- Contains the specific activity type (fill-in-blank, matching, etc.)
- Has "Submit" button at bottom
- Shows feedback after submission

**Styling:**
- Light background (#F5F5F5)
- Subtle border (not harsh)
- Padding: 16px
- Rounded corners: 12px

### Step 3.2: Create FillInBlank Component

Build `/components/activities/FillInBlank.jsx`:

**Features:**
- Displays a sentence with gaps: "I ___ to the store yesterday."
- Input fields for each gap (inline with sentence)
- Submit button
- Shows correct/incorrect feedback with color coding (green checkmark, red X)
- Option to "Try Again" or "See Answer"

**Example Data Structure:**
```javascript
const exerciseData = {
  type: "fill-in-blank",
  sentence: "I ___ to the store yesterday.",
  gaps: [
    { position: 1, correctAnswer: "went", userAnswer: "" }
  ],
  hint: "Think about past tense of 'go'"
}
```

**Styling:**
- Input gaps: underlined space within sentence flow
- Width adjusts based on expected answer length
- Focus state: highlight current gap
- Correct: green border, checkmark icon
- Incorrect: red border, X icon

### Step 3.3: Create MatchingGame Component

Build `/components/activities/MatchingGame.jsx`:

**Features:**
- Two columns: "Words" and "Definitions"
- Draggable word cards (or click-to-match on mobile)
- Visual connection lines when matched
- Submit button to check all answers
- Color-coded feedback (green for correct pairs, red for incorrect)

**Example Data Structure:**
```javascript
const matchingData = {
  type: "matching",
  pairs: [
    { id: 1, word: "ephemeral", definition: "lasting for a very short time" },
    { id: 2, word: "ubiquitous", definition: "present everywhere" }
  ]
}
```

**Interaction:**
- Mobile: tap word, tap definition → creates match
- Desktop: drag word to definition OR click-to-match
- Visual feedback: subtle highlight on hover/selection
- Matched pairs: locked together with connecting line

**Styling:**
- Cards: white background, shadow, rounded corners (8px)
- Selected: blue border
- Matched: green border with checkmark
- Incorrect: red border with X

### Step 3.4: Create FreePractice Component

Build `/components/activities/FreePractice.jsx`:

**Features:**
- Prompt/question from AI
- Large text area for user response
- Character/word counter
- Submit button
- Display AI feedback as a follow-up message

**Example:**
- Prompt: "Describe your morning routine. Try to use at least 5 different verbs."
- Text area: expandable, minimum 3 lines
- Counter: "45 words" (subtle, bottom-right)

**Styling:**
- Text area: bordered, rounded, padding
- Min height: 100px
- Grows with content
- Focus state: blue border highlight

**CHECKPOINT:** Test each activity type displays correctly and handles user interaction. Mock the "correct/incorrect" feedback for now.

---

## 📋 Phase 4: Voice Interface

**Goal:** Add visual feedback for voice input/output

### Step 4.1: Create VoiceRecorder Component

Build `/components/VoiceRecorder.jsx`:

**Features:**
- Visual waveform during recording (CSS animation or canvas)
- Timer showing recording duration
- Stop/Cancel buttons
- Preview of recorded audio before sending
- Re-record option

**Recording UI:**
- Pulsing red circle (animation)
- Waveform bars animating in sync
- Timer: "0:05" (mm:ss format)
- "Stop" button prominent

**Preview UI:**
- Audio player with play button
- Waveform visualization of completed recording
- "Send" and "Record Again" buttons

**Styling:**
- Dark overlay when recording (focus mode)
- Centered modal-style interface
- Large, clear buttons
- Red accent for recording state

### Step 4.2: Create AudioPlayer Component

Build `/components/AudioPlayer.jsx`:

**Features:**
- Play/pause button
- Playback progress bar
- Time display (current / total)
- Speed control (1x, 1.25x, 1.5x)
- Waveform visualization (optional, can be simple progress bar)

**Styling:**
- Integrated into AI message bubble
- Cream background matching AI messages
- Rounded corners
- Minimal, clean controls

**CHECKPOINT:** Verify voice recording UI works smoothly and audio playback displays correctly (using mock audio files for now).

---

## 📋 Phase 5: Progress Dashboard

**Goal:** Show learner progress without being overwhelming

### Step 5.1: Create ProgressHeader Component

Build `/components/ProgressHeader.jsx`:

**Features:**
- Learner's current level (e.g., "B1 - Intermediate")
- Quick stats bar: "5 day streak 🔥 | 12 lessons completed"
- Badge collection (icons for earned badges)
- Subtle, collapsible (doesn't dominate the page)

**Display:**
- Compact bar at top of page
- Icons and short text (mobile-friendly)
- Click to expand for more details (modal or slide-down panel)

**Styling:**
- Light background (#F9F9F9)
- Subtle border bottom
- Icons: colorful and encouraging
- Padding: 8px 16px

### Step 5.2: Create SkillMeter Component

Build `/components/SkillMeter.jsx`:

**Features:**
- Four skill bars: Listening, Reading, Writing, Speaking
- CEFR level indicator for each (A1, A2, B1, B2)
- Visual progress bar showing sub-level progress
- Color-coded by skill type

**Example:**
```
Listening: B1 [=========>    ] 75% to B2
Reading:   A2 [======>       ] 60% to B1
Writing:   B1 [====>         ] 40% to B2
Speaking:  A2 [=========>    ] 80% to B1
```

**Styling:**
- Horizontal progress bars
- Skill labels: bold, left-aligned
- Progress bar: rounded, gradient fill
- Current level badge: pill-shaped, colored
- Compact layout (one line per skill)

### Step 5.3: Create BadgeDisplay Component

Build `/components/BadgeDisplay.jsx`:

**Features:**
- Grid of earned badges (icons + titles)
- Locked/unearned badges shown in grayscale
- Tooltip on hover: badge description and unlock criteria
- Smooth animation when new badge earned

**Example Badges:**
- 🚀 First Flight (completed first lesson)
- 🔥 7-Day Streak
- 📚 Grammar Master (10 grammar lessons)
- 💬 Brave Speaker (5 voice activities)
- ⭐ Confidence Builder (self-reported confidence +2)

**Styling:**
- Grid layout: 3-4 columns on mobile, 5-6 on desktop
- Badge size: 60px x 60px
- Earned: full color, slight glow
- Locked: grayscale, 50% opacity
- Padding between badges: 12px

**CHECKPOINT:** Verify progress dashboard displays correctly and feels encouraging (not overwhelming).

---

## 📋 Phase 6: Polish & Responsive Design

**Goal:** Make everything feel cohesive and work beautifully on all devices

### Step 6.1: Responsive Layout

Ensure these breakpoints work well:
- Mobile (320px - 768px): Single column, stacked layout, larger touch targets
- Tablet (769px - 1024px): Optimized spacing
- Desktop (1025px+): Maximum content width 1200px, centered

**Mobile-Specific:**
- Chat takes full height (minus input)
- Activities scroll within chat
- Progress dashboard: collapsible header
- Voice controls: large tap targets (min 48px)

### Step 6.2: Animations & Transitions

Add subtle animations using Framer Motion:
- Messages: fade in from bottom when posted
- Activities: scale in slightly when appearing
- Badges: bounce animation when earned
- Typing indicator: pulsing dots animation
- Voice recording: pulsing circle
- Button hovers: slight scale up (1.05x)

**Keep it subtle:** Animations should feel natural, not distracting

### Step 6.3: Accessibility

Ensure:
- All interactive elements: keyboard accessible (tab order logical)
- Focus indicators: visible and clear
- Color contrast: WCAG AA compliant minimum
- Alt text: for all icons and badges
- ARIA labels: for screen readers
- Font sizes: minimum 16px for body text

### Step 6.4: Error States & Loading

Create components for:
- Loading spinner: shown while AI is thinking (3 pulsing dots in chat)
- Error message: friendly, actionable (e.g., "Oops! Something went wrong. Try again?")
- Empty states: encouraging (e.g., "Your journey begins here. Say hello!")
- Offline indicator: "You're offline - connect to continue your lesson"

**Styling:**
- Loading: three dots bouncing animation, AI message color
- Error: red accent, not harsh, with retry button
- Empty: centered text, encouraging icon

**CHECKPOINT:** Test on multiple devices and screen sizes. Verify all interactions feel smooth and accessible.

---

## 📋 Phase 7: Google AI Studio Integration

**Goal:** Connect to real AI services using Google AI Studio (Gemini API with integrated STT/TTS)

### Step 7.1: Set Up Google AI Studio

**Get API Access:**
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create/sign in to Google account
3. Generate API key
4. Store in environment variable: `NEXT_PUBLIC_GOOGLE_AI_KEY`

**Install Dependencies:**
```bash
npm install @google/generative-ai
```

### Step 7.2: Create AI Service Layer

Build `/services/googleAI.js`:

```javascript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_AI_KEY);

// Initialize Gemini model
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// System prompt for the AI teacher personality
const TEACHER_SYSTEM_PROMPT = `You are an encouraging, eccentric English language teacher. 
Your teaching style is warm, personalized, and adaptive. You:
- Ask questions naturally to understand the learner
- Adapt your lessons based on responses
- Celebrate progress enthusiastically
- Provide constructive, specific feedback
- Make learning feel like an adventure
- Remember context from previous messages in the conversation

Current mode: {MODE}`;

export const chatWithAI = async (userMessage, conversationHistory, mode = 'conversation') => {
  try {
    // Build conversation context
    const systemPrompt = TEACHER_SYSTEM_PROMPT.replace('{MODE}', mode);
    
    // Format conversation history for Gemini
    const history = conversationHistory.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Start chat with history
    const chat = model.startChat({
      history: history,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      },
    });

    // Send message
    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    const text = response.text();

    return {
      id: Date.now(),
      sender: 'ai',
      content: text,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('AI Error:', error);
    throw new Error('Sorry, I had trouble understanding that. Could you try again?');
  }
};

// Evaluation-specific AI call
export const conductEvaluation = async (userMessage, evaluationData) => {
  const evaluationPrompt = `You are conducting a friendly evaluation to understand this learner's English level and goals.
  
Current evaluation data collected: ${JSON.stringify(evaluationData)}

Ask ONE natural follow-up question to learn about:
- Their current level (if not known)
- Their learning goals (if not known)
- Their professional/personal context (if not known)
- Their time availability (if not known)

Keep it conversational. Don't make it feel like a form.`;

  try {
    const chat = model.startChat({
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 200,
      },
    });

    const result = await chat.sendMessage(`${evaluationPrompt}\n\nUser said: "${userMessage}"`);
    const response = await result.response;
    
    return {
      id: Date.now(),
      sender: 'ai',
      content: response.text(),
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('Evaluation Error:', error);
    throw new Error('Evaluation error occurred');
  }
};

// Activity generation
export const generateActivity = async (activityType, learnerLevel, focusArea) => {
  const activityPrompts = {
    'fill-in-blank': `Generate a fill-in-the-blank exercise for a ${learnerLevel} English learner focusing on ${focusArea}.
    
    Return ONLY valid JSON in this exact format (no markdown, no extra text):
    {
      "type": "fill-in-blank",
      "sentence": "The sentence with ___ for gaps",
      "gaps": [
        {"position": 1, "correctAnswer": "word", "hint": "helpful hint"}
      ],
      "instruction": "Brief instruction"
    }`,
    
    'matching': `Generate a matching exercise for a ${learnerLevel} English learner focusing on ${focusArea}.
    
    Return ONLY valid JSON in this exact format (no markdown, no extra text):
    {
      "type": "matching",
      "instruction": "Match the words with their definitions",
      "pairs": [
        {"id": 1, "word": "word1", "definition": "definition1"},
        {"id": 2, "word": "word2", "definition": "definition2"}
      ]
    }`
  };

  try {
    const result = await model.generateContent(activityPrompts[activityType]);
    const response = await result.response;
    let text = response.text();
    
    // Clean up response (remove markdown code blocks if present)
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    const activity = JSON.parse(text);
    return activity;

  } catch (error) {
    console.error('Activity Generation Error:', error);
    throw new Error('Could not generate activity');
  }
};

// Evaluate user's activity response
export const evaluateActivity = async (activity, userAnswers) => {
  const prompt = `Evaluate this language learning activity response:

Activity: ${JSON.stringify(activity)}
User Answers: ${JSON.stringify(userAnswers)}

Provide feedback in JSON format:
{
  "correct": true/false,
  "feedback": "Specific, encouraging feedback",
  "corrections": ["list of corrections if any"],
  "praise": "What they did well"
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Clean up response
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    const evaluation = JSON.parse(text);
    return evaluation;

  } catch (error) {
    console.error('Evaluation Error:', error);
    return {
      correct: false,
      feedback: "I had trouble evaluating that. Let's try again!",
      corrections: [],
      praise: "Keep going!"
    };
  }
};
```

### Step 7.3: Create Speech Services

Build `/services/speechServices.js`:

```javascript
// Web Speech API for STT (built into browsers)
export const startSpeechRecognition = (onResult, onError) => {
  if (!('webkitSpeechRecognition' in window)) {
    onError('Speech recognition not supported');
    return null;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };

  recognition.onerror = (event) => {
    onError(event.error);
  };

  recognition.start();
  return recognition;
};

// Google Cloud Text-to-Speech API
export const textToSpeech = async (text) => {
  try {
    // Using Web Speech API for TTS (built-in, no API key needed)
    if ('speechSynthesis' in window) {
      return new Promise((resolve, reject) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.9; // Slightly slower for language learners
        utterance.pitch = 1.0;
        
        utterance.onend = () => resolve();
        utterance.onerror = (error) => reject(error);
        
        window.speechSynthesis.speak(utterance);
      });
    } else {
      throw new Error('Text-to-speech not supported');
    }
  } catch (error) {
    console.error('TTS Error:', error);
    throw error;
  }
};

// Stop TTS if playing
export const stopSpeech = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
```

### Step 7.4: Create User Data Management

Build `/utils/userData.js` for local storage management:

```javascript
// Store user data in browser localStorage
export const getUserData = () => {
  if (typeof window === 'undefined') return null;
  
  const data = localStorage.getItem('languageLearnerProfile');
  return data ? JSON.parse(data) : {
    sessionId: generateSessionId(),
    evaluationComplete: false,
    evaluationData: {},
    conversationHistory: [],
    currentLevel: 'A1',
    skills: {
      listening: { level: 'A1', progress: 0 },
      reading: { level: 'A1', progress: 0 },
      writing: { level: 'A1', progress: 0 },
      speaking: { level: 'A1', progress: 0 }
    },
    badges: [],
    streak: 0,
    lessonsCompleted: 0,
    createdAt: new Date().toISOString()
  };
};

export const saveUserData = (data) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('languageLearnerProfile', JSON.stringify(data));
};

export const addMessageToHistory = (message) => {
  const userData = getUserData();
  userData.conversationHistory.push(message);
  
  // Keep last 50 messages for context
  if (userData.conversationHistory.length > 50) {
    userData.conversationHistory = userData.conversationHistory.slice(-50);
  }
  
  saveUserData(userData);
};

export const updateEvaluationData = (key, value) => {
  const userData = getUserData();
  userData.evaluationData[key] = value;
  saveUserData(userData);
};

export const completeEvaluation = (extractedData) => {
  const userData = getUserData();
  userData.evaluationComplete = true;
  userData.evaluationData = { ...userData.evaluationData, ...extractedData };
  userData.currentLevel = extractedData.currentLevel || 'B1';
  saveUserData(userData);
};

export const awardBadge = (badgeId) => {
  const userData = getUserData();
  if (!userData.badges.includes(badgeId)) {
    userData.badges.push(badgeId);
    saveUserData(userData);
    return true;
  }
  return false;
};

export const updateStreak = () => {
  const userData = getUserData();
  const lastActive = new Date(userData.lastActiveDate || 0);
  const today = new Date();
  const diffDays = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    userData.streak += 1;
  } else if (diffDays > 1) {
    userData.streak = 1;
  }
  
  userData.lastActiveDate = today.toISOString();
  saveUserData(userData);
  
  // Award badges based on streak
  if (userData.streak === 7) awardBadge('7-day-streak');
  if (userData.streak === 30) awardBadge('30-day-streak');
};

const generateSessionId = () => {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};
```

### Step 7.5: Update ChatContainer to Use Real AI

Update `/components/ChatContainer.jsx`:

```javascript
import { useState, useEffect } from 'react';
import { chatWithAI, conductEvaluation, generateActivity } from '@/services/googleAI';
import { getUserData, addMessageToHistory, updateStreak } from '@/utils/userData';
import MessageInput from './MessageInput';
import ActivityWrapper from './ActivityWrapper';

export default function ChatContainer() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Load user data and conversation history
    const data = getUserData();
    setUserData(data);
    setMessages(data.conversationHistory);
    
    // Update streak
    updateStreak();
    
    // If no conversation yet, start with greeting
    if (data.conversationHistory.length === 0) {
      const greeting = {
        id: Date.now(),
        sender: 'ai',
        content: "Hi! I'm so excited to be your English teacher. Ready to start this adventure? Tell me, what brings you here today?",
        timestamp: new Date().toISOString()
      };
      setMessages([greeting]);
      addMessageToHistory(greeting);
    }
  }, []);

  const handleSendMessage = async (message) => {
    // Add user message
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    addMessageToHistory(userMessage);
    setIsLoading(true);

    try {
      let aiResponse;
      
      if (!userData.evaluationComplete) {
        // Evaluation mode
        aiResponse = await conductEvaluation(message, userData.evaluationData);
        
        // Check if evaluation should be complete (you can add logic here)
        // For now, after 5 messages, consider it complete
        if (messages.length >= 8) {
          completeEvaluation({
            currentLevel: 'B1', // Extract from conversation
            goals: 'Improve grammar for work', // Extract from conversation
          });
        }
      } else {
        // Regular lesson mode
        aiResponse = await chatWithAI(message, messages.slice(-10)); // Last 10 messages for context
      }

      setMessages(prev => [...prev, aiResponse]);
      addMessageToHistory(aiResponse);

    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: Date.now(),
        sender: 'ai',
        content: "Oops! I had a moment there. Could you say that again?",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestActivity = async (type) => {
    setIsLoading(true);
    try {
      const activity = await generateActivity(
        type,
        userData.currentLevel,
        'grammar' // Could be dynamic based on learner needs
      );
      
      const activityMessage = {
        id: Date.now(),
        sender: 'ai',
        type: 'activity',
        activityData: activity,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, activityMessage]);
      addMessageToHistory(activityMessage);
      
    } catch (error) {
      console.error('Activity error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map(msg => (
          msg.type === 'activity' ? (
            <ActivityWrapper key={msg.id} activity={msg.activityData} />
          ) : (
            <div key={msg.id} className={`message ${msg.sender}`}>
              {msg.content}
            </div>
          )
        ))}
        {isLoading && <div className="typing-indicator">...</div>}
      </div>
      
      <MessageInput 
        onSendMessage={handleSendMessage}
        onRequestActivity={handleRequestActivity}
        disabled={isLoading}
      />
    </div>
  );
}
```

### Step 7.6: Update Environment Variables

Create `.env.local` file:

```bash
NEXT_PUBLIC_GOOGLE_AI_KEY=your_api_key_here
```

Add `.env.local` to `.gitignore`:
```
.env.local
.env*.local
```

Create `.env.example` for documentation:
```bash
# Google AI Studio API Key
# Get yours at: https://aistudio.google.com/
NEXT_PUBLIC_GOOGLE_AI_KEY=your_api_key_here
```

**CHECKPOINT:** Test real AI conversations! Try:
1. Starting a conversation with the AI
2. Having it evaluate you naturally
3. Generating an activity
4. Using voice input (if browser supports it)
5. Voice output (AI speaking responses)

---

## 📋 Phase 8: Testing, Polish & Documentation

**Goal:** Ensure everything works with real AI and is production-ready

### Step 8.1: Comprehensive Testing

**AI Conversation Testing:**
- Start fresh conversation → Does greeting appear?
- Send multiple messages → Does AI respond naturally?
- Test evaluation flow → Does AI ask relevant questions?
- Test lesson mode → Does AI adapt based on responses?

**Activity Testing:**
- Generate fill-in-blank → Does it appear correctly?
- Submit answers → Does evaluation work?
- Try different activity types → All render properly?
- Test feedback display → Clear and encouraging?

**Voice Testing:**
- Click mic → Does recording start?
- Speak clearly → Does STT transcribe correctly?
- AI responds → Does TTS play audio?
- Test with accent → How accurate is recognition?

**Data Persistence:**
- Refresh page → Does conversation history persist?
- Return next day → Does streak update correctly?
- Complete activities → Do badges award properly?

### Step 8.2: Error Handling & Edge Cases

Add error handling for:

**Network Errors:**
```javascript
// In googleAI.js
try {
  const result = await chat.sendMessage(userMessage);
  // ... success handling
} catch (error) {
  if (error.message.includes('quota')) {
    throw new Error('API quota exceeded. Please try again later.');
  } else if (error.message.includes('network')) {
    throw new Error('Network error. Please check your connection.');
  } else {
    throw new Error('Something went wrong. Let\'s try that again!');
  }
}
```

**Voice Errors:**
```javascript
// In speechServices.js
recognition.onerror = (event) => {
  switch(event.error) {
    case 'no-speech':
      onError('No speech detected. Try again?');
      break;
    case 'network':
      onError('Network error. Check your connection.');
      break;
    case 'not-allowed':
      onError('Microphone access denied. Please allow it in browser settings.');
      break;
    default:
      onError('Speech recognition error. Try typing instead?');
  }
};
```

**Empty States:**
- No API key configured → Show helpful setup message
- Browser doesn't support voice → Hide voice controls gracefully
- LocalStorage full → Handle data storage limits

### Step 8.3: Performance Optimization

**Lazy Loading:**
```javascript
// In page.js
import dynamic from 'next/dynamic';

const ActivityWrapper = dynamic(() => import('@/components/ActivityWrapper'), {
  loading: () => <p>Loading activity...</p>
});
```

**Debounce API Calls:**
```javascript
// Prevent rapid-fire AI requests
let lastCallTime = 0;
const MIN_DELAY = 1000; // 1 second between calls

export const chatWithAI = async (message, history) => {
  const now = Date.now();
  if (now - lastCallTime < MIN_DELAY) {
    await new Promise(resolve => setTimeout(resolve, MIN_DELAY - (now - lastCallTime)));
  }
  lastCallTime = Date.now();
  
  // ... rest of function
};
```

**Optimize LocalStorage:**
```javascript
// Compress conversation history
export const compressHistory = (history) => {
  // Keep only essential fields
  return history.map(msg => ({
    s: msg.sender[0], // 'u' or 'a'
    c: msg.content,
    t: msg.timestamp
  }));
};
```

### Step 8.4: Cross-Browser Testing

Test in:
- **Chrome** (desktop & mobile) - Primary target
- **Safari** (iOS & macOS) - Important for Apple users
- **Firefox** - Alternative browser
- **Edge** - Windows default

**Known Compatibility Issues:**
- Web Speech API: Limited support in Firefox
- LocalStorage: Check quota limits (usually 5-10MB)
- Voice synthesis: Different voices per browser

**Fallback Strategy:**
- If voice not supported → Show message, disable voice controls
- If LocalStorage full → Offer to clear old data
- If AI API fails → Suggest checking API key or trying later

### Step 8.5: Accessibility Improvements

**Keyboard Navigation:**
```javascript
// In MessageInput.jsx
const handleKeyDown = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSubmit();
  }
};
```

**Screen Reader Support:**
```javascript
// Add ARIA labels
<button 
  aria-label="Record voice message"
  aria-pressed={isRecording}
  onClick={handleMicClick}
>
  <MicIcon />
</button>

<div role="log" aria-live="polite" aria-atomic="true">
  {messages.map(msg => (
    <div key={msg.id} aria-label={`Message from ${msg.sender}`}>
      {msg.content}
    </div>
  ))}
</div>
```

**Focus Management:**
```javascript
// Auto-focus input after AI responds
useEffect(() => {
  if (!isLoading && inputRef.current) {
    inputRef.current.focus();
  }
}, [isLoading]);
```

### Step 8.6: Create Documentation

Build `/README.md`:

```markdown
# Language Learning AI Companion

An AI-powered English learning companion built with Next.js and Google AI Studio.

## Features
- 🤖 Natural conversation with AI teacher
- 🎯 Personalized evaluation and lesson planning
- 🎮 Interactive activities (fill-in-blank, matching)
- 🎤 Voice input and output
- 📊 Progress tracking and badges
- 💾 Persistent data (localStorage)

## Setup

### Prerequisites
- Node.js 18+
- Google AI Studio API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` file:
   ```bash
   NEXT_PUBLIC_GOOGLE_AI_KEY=your_api_key_here
   ```

4. Run development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

### Getting an API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with Google account
3. Click "Get API Key"
4. Copy key to `.env.local`

## Project Structure

```
├── app/
│   ├── page.js           # Main page
│   └── layout.js         # Root layout
├── components/
│   ├── ChatContainer.jsx # Chat interface
│   ├── MessageInput.jsx  # Input component
│   ├── ActivityWrapper.jsx
│   └── activities/       # Activity types
├── services/
│   ├── googleAI.js       # AI integration
│   └── speechServices.js # Voice features
├── utils/
│   └── userData.js       # Data management
└── styles/
    └── globals.css       # Global styles
```

## Key Technologies

- **Framework:** Next.js 14
- **AI:** Google Gemini (via AI Studio)
- **Voice:** Web Speech API (STT/TTS)
- **Storage:** Browser localStorage
- **Styling:** Tailwind CSS

## Browser Support

- ✅ Chrome/Edge (best support)
- ✅ Safari (iOS & macOS)
- ⚠️ Firefox (limited voice support)

## Troubleshooting

**AI not responding:**
- Check API key in `.env.local`
- Verify internet connection
- Check browser console for errors

**Voice not working:**
- Allow microphone permissions
- Use Chrome/Safari for best support
- Check if HTTPS enabled (required for mic access)

**Data not persisting:**
- Check localStorage not full
- Verify browser allows localStorage
- Try clearing browser cache

## Future Enhancements

- Backend database (Directus/Supabase)
- Advanced RAG memory system
- Pronunciation analysis
- Multi-language support
- Community features

## License

MIT
```

### Step 8.7: Security Best Practices

**API Key Protection:**
```javascript
// Never expose in client code
// ❌ Bad
const apiKey = 'AIzaSy...';

// ✅ Good - use environment variable
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_AI_KEY;

// Validate before use
if (!apiKey) {
  throw new Error('Google AI API key not configured');
}
```

**Input Sanitization:**
```javascript
// Sanitize user input before sending to AI
const sanitizeInput = (text) => {
  return text
    .trim()
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .substring(0, 1000); // Limit length
};
```

**Rate Limiting:**
```javascript
// Prevent abuse
const requestCounts = new Map();

const checkRateLimit = (userId) => {
  const now = Date.now();
  const userRequests = requestCounts.get(userId) || [];
  
  // Filter requests from last minute
  const recentRequests = userRequests.filter(time => now - time < 60000);
  
  if (recentRequests.length >= 20) {
    throw new Error('Too many requests. Please wait a moment.');
  }
  
  recentRequests.push(now);
  requestCounts.set(userId, recentRequests);
};
```

### Step 8.8: Deployment Preparation

**Build for Production:**
```bash
npm run build
```

**Test Production Build:**
```bash
npm start
```

**Deployment Options:**

1. **Vercel** (Recommended for Next.js):
   - Connect GitHub repo
   - Add environment variables
   - Auto-deploy on push

2. **Netlify:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Add environment variables

3. **Replit Deployments:**
   - Click "Deploy" button
   - Configure environment variables
   - Get public URL

**Pre-Deployment Checklist:**
- [ ] Environment variables configured
- [ ] Error handling tested
- [ ] Performance optimized
- [ ] Security reviewed
- [ ] Cross-browser tested
- [ ] Mobile responsive verified
- [ ] API key not in code
- [ ] .env.local in .gitignore
- [ ] README complete
- [ ] All console.logs removed

**CHECKPOINT:** App is production-ready! Test the live deployment with real users.

---

## 🎉 Phase 8 Complete!

You now have a fully functional AI language learning companion that:
- ✅ Uses real AI (Google Gemini)
- ✅ Has voice input/output
- ✅ Generates activities dynamically
- ✅ Evaluates user responses
- ✅ Tracks progress locally
- ✅ Works across browsers
- ✅ Is production-ready

**Next Steps:**
1. Deploy to Vercel/Netlify
2. Test with your colleague (the one who inspired this!)
3. Gather feedback and iterate
4. Consider adding backend (Directus) for multi-device sync
5. Expand to other languages

**You've built something magical!** 🚀✨

---

## 🎨 Design System Summary

Use these as reference throughout:

**Colors:**
- Background: #FFF8F0 (warm cream)
- Primary accent: #FF6B6B (warm red/coral)
- Secondary accent: #4ECDC4 (calm teal)
- Text: #2C3E50 (dark blue-gray)
- User messages: #E3F2FD (light blue)
- AI messages: #FFF8F0 (matches background)
- Success: #4CAF50 (green)
- Error: #F44336 (red)

**Typography:**
- Font family: System font stack (San Francisco, Segoe UI, Roboto)
- Body: 16px minimum
- Headers: 24px (h2), 32px (h1)
- Line height: 1.6 for readability

**Spacing:**
- Base unit: 8px
- Use multiples: 8px, 16px, 24px, 32px, 48px

**Border Radius:**
- Small: 8px (cards, buttons)
- Medium: 12px (activity containers)
- Large: 16px (message bubbles)
- Full: 24px (inputs, pills)

**Shadows:**
- Subtle: `0 2px 4px rgba(0,0,0,0.1)`
- Medium: `0 4px 8px rgba(0,0,0,0.15)`
- Emphasis: `0 8px 16px rgba(0,0,0,0.2)`

---

## 🚀 How to Use This Prompt

**For Replit Agent:**

Start with Phase 1, complete each checkpoint before moving to the next phase. Use Replit's Checkpoint feature after successfully completing each phase to save your progress. If something doesn't work, Rollback to the last checkpoint and try a different approach.

**Important Notes:**
- Build incrementally - don't try to do everything at once
- Test each component individually before integrating
- Use the mock data liberally to make the UI feel alive
- Focus on making it feel warm and encouraging, not sterile
- Mobile-first - start with mobile layout, then enhance for desktop

**When asking for help:**
- Mention the specific phase and step you're on
- Share relevant error messages
- Attach the file(s) you're working on

Let's build something magical! ✨