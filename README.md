# 🌍 AI Language Learning Companion

A warm, inviting frontend for an AI-powered English learning companion that feels like chatting with an eccentric, caring teacher. Built with React, TypeScript, and a "teacher's study" aesthetic.

![Language Learning Companion](https://img.shields.io/badge/Status-Ready%20for%20Backend-brightgreen) ![React](https://img.shields.io/badge/React-18.x-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

---

## 📖 Project Description

This is a mobile-first language learning application that combines conversational AI tutoring with interactive activities, voice practice, and progress tracking. The interface is designed to feel personal and encouraging—like working with a supportive teacher rather than a sterile corporate app.

**Key Features:**
- 💬 **Conversational Chat Interface** - Natural dialogue with AI teacher
- 🎯 **Interactive Activities** - Fill-in-blanks, matching games, free writing
- 🎤 **Voice Practice** - Record and receive pronunciation feedback
- 📊 **Progress Dashboard** - Track skills, streaks, and earn badges
- 🎨 **Warm Design System** - Cream backgrounds, rounded corners, encouraging micro-copy
- 📱 **Mobile-First** - Fully responsive with 44px minimum touch targets

---

## 🛠 Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Wouter** - Lightweight routing
- **Framer Motion** - Smooth animations
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library
- **React Icons** - Additional icons

### Components
- **Shadcn UI** - Accessible component primitives
- **Radix UI** - Headless UI components
- **React Hook Form** - Form handling

### Backend (Ready to Integrate)
- **Express** - Server framework (currently serving frontend only)
- Mock API layer ready for replacement with real endpoints

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5000`

### Environment Variables
Create a `.env` file (optional for now, required when connecting backend):
```bash
VITE_API_BASE_URL=http://localhost:5000/api  # Your backend URL
VITE_USE_MOCK=true                            # Toggle mock data
```

---

## 🧩 Component Overview

### Core Layout Components

#### `WelcomeHeader`
Displays a warm greeting at the top of the app with the teacher persona.
- Props: None
- Location: `client/src/components/WelcomeHeader.tsx`

#### `ProgressHeader`
Collapsible header showing user level, streak, and earned badges.
- Props: `level`, `streak`, `lessonsCompleted`, `earnedBadges`
- Location: `client/src/components/ProgressHeader.tsx`

### Chat Components

#### `ChatBubble`
Individual message bubble with user/AI styling and timestamp.
- Props: `message`, `isUser`, `timestamp`
- Styling: User messages (light blue), AI messages (cream)
- Location: `client/src/components/ChatBubble.tsx`

#### `TypingIndicator`
Animated dots showing AI is "thinking".
- Props: None
- Animation: 3 bouncing dots with staggered timing
- Location: `client/src/components/TypingIndicator.tsx`

#### `ChatInput`
Text input with send button and microphone for voice.
- Props: `onSendMessage`, `onVoiceClick`
- Features: Enter to send, auto-focus
- Location: `client/src/components/ChatInput.tsx`

#### `EmptyState`
Welcome screen with starter prompts when no messages exist.
- Props: `onStarterSelect`
- Features: 4 pre-written conversation starters
- Location: `client/src/components/EmptyState.tsx`

### Activity Components

#### `FillInBlank`
Gap-fill exercise with inline inputs and instant feedback.
- Props: `sentence`, `gaps`, `hint`, `onSubmit`
- Features: Tab navigation, color-coded feedback
- Location: `client/src/components/activities/FillInBlank.tsx`

#### `MatchingGame`
Click-to-match words with definitions.
- Props: `pairs`, `onComplete`
- Features: Animated connections, shuffle on load
- Location: `client/src/components/activities/MatchingGame.tsx`

#### `FreePractice`
Open-ended writing exercise with word counter.
- Props: `prompt`, `minWords`, `onSubmit`
- Features: Real-time word count, validation
- Location: `client/src/components/activities/FreePractice.tsx`

### Voice Components

#### `VoiceRecorder`
Full-screen recording interface with waveform visualization.
- Props: `onRecordingComplete`, `onClose`
- Features: Pulsing animation, timer, preview playback
- Location: `client/src/components/VoiceRecorder.tsx`

#### `AudioPlayer`
Interactive playback with waveform and speed controls.
- Props: `audioUrl`, `duration`
- Features: Play/pause, 1x-2x speed, progress bar
- Location: `client/src/components/AudioPlayer.tsx`

### Progress Components

#### `SkillMeter`
Individual skill progress bar with CEFR level.
- Props: `skill`, `level`, `progress`
- Styling: Color-coded by skill type
- Location: `client/src/components/SkillMeter.tsx`

#### `BadgeDisplay`
Grid of achievement badges with earned/locked states.
- Props: `badges`
- Features: Grayscale locked badges, tooltips
- Location: `client/src/components/BadgeDisplay.tsx`

### UI Feedback Components

#### `ErrorMessage`
Friendly error display with retry button.
- Props: `message`, `onRetry`
- Location: `client/src/components/ErrorMessage.tsx`

#### `OfflineIndicator`
Red banner shown when network is offline.
- Props: `isOffline`
- Location: `client/src/components/OfflineIndicator.tsx`

#### `LoadingSpinner`
Animated loading indicator.
- Props: None
- Location: `client/src/components/LoadingSpinner.tsx`

---

## 📊 Mock Data Structure

All mock data is located in `client/src/utils/mockData.ts`:

### Conversation Messages
```typescript
{
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: string; // ISO 8601
}
```

### User Profile
```typescript
{
  currentLevel: string;        // e.g., "B1 - Intermediate"
  streak: number;              // Daily login streak
  lessonsCompleted: number;
  skills: {
    listening: { level: string, progress: number },
    reading: { level: string, progress: number },
    writing: { level: string, progress: number },
    speaking: { level: string, progress: number }
  };
  badges: Array<{
    id: string;
    title: string;
    icon: string;
    earned: boolean;
  }>;
}
```

### Activities
```typescript
// Fill in the Blank
{
  type: 'fill-in-blank';
  sentence: string;
  gaps: Array<{ position: number, correctAnswer: string }>;
  hint: string;
}

// Matching Game
{
  type: 'matching';
  pairs: Array<{ id: number, word: string, definition: string }>;
}

// Free Practice
{
  type: 'free-practice';
  prompt: string;
  minWords: number;
}
```

---

## 🎨 Design System

### Colors
```css
--background: #FFF8F0;      /* Warm cream */
--primary: #FF6B6B;         /* Warm coral */
--secondary: #4ECDC4;       /* Calm teal */
--text: #2C3E50;            /* Dark blue-gray */
--user-bubble: #E3F2FD;     /* Light blue */
--ai-bubble: #FFF8F0;       /* Cream */
--success: #4CAF50;         /* Green */
--error: #F44336;           /* Red */
```

### Typography
- **Font**: System font stack (San Francisco, Segoe UI, Roboto)
- **Body**: 16px minimum
- **H1**: 32px
- **H2**: 24px
- **Line Height**: 1.6

### Spacing
Base unit: 8px  
Multiples: 8px, 16px, 24px, 32px, 48px

### Border Radius
- Small: 8px (buttons, cards)
- Medium: 12px (activity containers)
- Large: 16px (message bubbles)
- Full: 24px (inputs, pills)

### Shadows
- Subtle: `0 2px 4px rgba(0,0,0,0.1)`
- Medium: `0 4px 8px rgba(0,0,0,0.15)`
- Emphasis: `0 8px 16px rgba(0,0,0,0.2)`

---

## 🔌 API Endpoints (Backend Integration)

The frontend expects these API endpoints. See `API_INTEGRATION_GUIDE.md` for detailed specs.

### Chat Endpoints
- `GET /api/conversation` - Fetch message history
- `POST /api/messages` - Send message, get AI response
- `POST /api/voice` - Upload voice recording, get feedback

### Activity Endpoints
- `GET /api/activities/:type` - Fetch activity by type
- `POST /api/activities/submit` - Submit answers for validation

### User Profile Endpoints
- `GET /api/profile` - Get user progress data
- `PUT /api/profile/streak` - Update daily streak
- `POST /api/badges/earn` - Award badge to user

**All endpoints should:**
- Return JSON
- Use HTTP status codes (200, 400, 500)
- Include proper CORS headers
- Support authentication (when implemented)

---

## 📁 Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── activities/   # Activity type components
│   │   │   ├── ui/          # Shadcn UI primitives
│   │   │   └── *.tsx        # Core components
│   │   ├── pages/           # Route pages
│   │   │   └── Home.tsx     # Main app page
│   │   ├── utils/           # Utilities
│   │   │   ├── mockData.ts  # Mock data for testing
│   │   │   └── api.ts       # API integration layer
│   │   ├── App.tsx          # Root component
│   │   └── index.css        # Global styles
│   └── index.html           # HTML entry point
├── server/
│   ├── index.ts             # Express server
│   └── routes.ts            # API routes (ready for implementation)
├── API_INTEGRATION_GUIDE.md # Backend integration guide
├── HANDOFF.md               # Backend team handoff document
└── README.md                # This file
```

---

## 🧪 Testing

### Current Test Coverage
- End-to-end test for chat flow ✅
- Mock data loading ✅
- API integration layer ✅
- Error handling ✅
- Loading states ✅

### Manual Testing Checklist
- [ ] Test on Chrome (mobile & desktop)
- [ ] Test on Safari (iOS & macOS)
- [ ] Test on Firefox
- [ ] Test on Edge
- [ ] Verify all interactions work
- [ ] Check responsive breakpoints
- [ ] Validate accessibility (keyboard nav, screen readers)

---

## 🚧 Current Status

**✅ Complete:**
- All UI components built and styled
- Mock data integration complete
- API layer ready for backend
- Responsive design (mobile-first)
- Animations and transitions
- Error handling
- Loading states
- Accessibility features

**🔲 Pending (Backend Required):**
- Real AI conversation responses
- Activity validation logic
- Voice processing (speech-to-text, pronunciation analysis)
- User authentication
- Progress persistence
- Badge unlock logic

---

## 🤝 Contributing

This frontend is ready for backend integration. See `HANDOFF.md` for backend team requirements.

### Design Decisions & Rationale

1. **Mobile-First**: 80% of language learners use mobile devices
2. **Warm Colors**: Reduces anxiety, encourages experimentation
3. **Rounded Corners**: Friendly, approachable, less "corporate"
4. **Generous Spacing**: Prevents crowding, improves readability
5. **Encouraging Copy**: Celebrates effort, normalizes mistakes
6. **Instant Feedback**: Reduces uncertainty, builds confidence

---

## 📄 License

[Your License Here]

---

## 🙋 Support

For questions about the frontend implementation, see:
- `API_INTEGRATION_GUIDE.md` - API integration details
- `HANDOFF.md` - Backend requirements
- Component source code with inline comments

---

**Built with ❤️ for language learners everywhere**
