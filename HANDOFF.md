# 🔄 Backend Team Handoff Document

This document outlines what the backend team needs to implement to connect with the frontend.

⚠️ **NOTE:** This document describes the original frontend contract.
The backend architecture has evolved to v2.0 with additional features.

**For current backend architecture, see:**
- [ARCHITECTURE_OVERVIEW.md](docs/ARCHITECTURE_OVERVIEW.md)
- [PROJECT_AUDIT_3.md](docs/PROJECT_AUDIT_3.md)

---

## 📋 Overview

The frontend is **100% complete** and fully functional with mock data. All API integration points are ready and waiting for real backend endpoints.

**Frontend Status:**
- ✅ All UI components built and tested
- ✅ Mock data layer for development
- ✅ API integration layer with TypeScript interfaces
- ✅ Error handling and loading states
- ✅ Mobile-responsive design

**What's Needed:**
- Real AI conversation engine
- Activity generation and validation
- Voice processing (STT/pronunciation analysis)
- User authentication and progress persistence
- Badge unlock logic

---

## 🌐 Required API Endpoints

All endpoints should be prefixed with `/api` and return JSON.

### 1. **GET /api/conversation**

Fetch the user's conversation history.

**Headers:**
```
Authorization: Bearer {token}  // When auth is implemented
```

**Response (200 OK):**
```json
[
  {
    "id": "msg_123",
    "sender": "ai",
    "content": "Hi! I'm so excited to be your English teacher.",
    "timestamp": "2024-01-15T10:30:00Z"
  },
  {
    "id": "msg_124",
    "sender": "user",
    "content": "I need to improve my grammar.",
    "timestamp": "2024-01-15T10:31:00Z"
  }
]
```

**TypeScript Interface:**
```typescript
interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: string;  // ISO 8601 format
}
```

---

### 2. **POST /api/messages**

Send a user message and receive an AI response.

**Request Body:**
```json
{
  "message": "How do I use present perfect tense?"
}
```

**Response (200 OK):**
```json
{
  "id": "msg_125",
  "sender": "ai",
  "content": "Great question! The present perfect tense is used when...",
  "timestamp": "2024-01-15T10:32:00Z"
}
```

**Error Response (500):**
```json
{
  "error": "AI service unavailable",
  "message": "Unable to process message at this time"
}
```

**AI Requirements:**
- Context-aware responses (remember conversation history)
- Encouraging, teacher-like tone
- Grammar/vocabulary explanations when appropriate
- Can suggest activities based on student needs

---

### 3. **POST /api/voice**

Upload voice recording and receive pronunciation feedback.

**Request:**
- Content-Type: `multipart/form-data`
- Body: Audio file (WebM or MP3)

**Request (FormData):**
```
audio: [Binary audio file]
duration: 12.5  // seconds
```

**Response (200 OK):**
```json
{
  "id": "msg_126",
  "sender": "ai",
  "content": "Great pronunciation! Your intonation is improving. Try emphasizing the second syllable in 'important'.",
  "timestamp": "2024-01-15T10:33:00Z",
  "audioAnalysis": {
    "transcription": "I think this is important to understand",
    "pronunciationScore": 85,
    "suggestions": ["Emphasize 'important' more clearly"]
  }
}
```

**Processing Requirements:**
- Speech-to-text transcription
- Pronunciation quality assessment (0-100)
- Specific feedback on problem areas
- Optional: Return audio file with AI voice feedback

---

### 4. **GET /api/activities/:type**

Fetch a new activity of the specified type.

**URL Parameters:**
- `type`: One of `fill-in-blank`, `matching`, `free-practice`

**Response for Fill-in-Blank (200 OK):**
```json
{
  "id": "act_123",
  "type": "fill-in-blank",
  "sentence": "I ___ to the store yesterday and ___ some milk.",
  "gaps": [
    { "position": 0, "correctAnswer": "went" },
    { "position": 1, "correctAnswer": "bought" }
  ],
  "hint": "Think about past tense verbs"
}
```

**Response for Matching (200 OK):**
```json
{
  "id": "act_124",
  "type": "matching",
  "pairs": [
    { "id": 1, "word": "ephemeral", "definition": "lasting for a very short time" },
    { "id": 2, "word": "ubiquitous", "definition": "present everywhere" },
    { "id": 3, "word": "serendipity", "definition": "finding something good by chance" }
  ]
}
```

**Response for Free Practice (200 OK):**
```json
{
  "id": "act_125",
  "type": "free-practice",
  "prompt": "Describe your morning routine. Use at least 5 different verbs.",
  "minWords": 40
}
```

**Activity Generation Requirements:**
- Personalized to user's level (A1-C2)
- Varied difficulty and topics
- Progressive complexity based on user progress

---

### 5. **POST /api/activities/submit**

Submit activity answers for validation and feedback.

**Request Body:**
```json
{
  "activityId": "act_123",
  "userAnswers": {
    "0": "went",
    "1": "bought"
  }
}
```

**Response (200 OK):**
```json
{
  "correct": true,
  "feedback": "Excellent work! You've mastered past tense verbs.",
  "score": 100
}
```

**Response for Incorrect (200 OK):**
```json
{
  "correct": false,
  "feedback": "Good try! The correct answers are 'went' and 'bought'. Remember, these are irregular past tense verbs.",
  "correctAnswers": {
    "0": "went",
    "1": "bought"
  },
  "score": 50
}
```

**Validation Requirements:**
- Accept minor spelling variations
- Provide constructive feedback
- Return correct answers when wrong
- Update user's skill progress based on performance

---

### 6. **GET /api/profile**

Get user's profile and progress data.

**Response (200 OK):**
```json
{
  "userId": "user_123",
  "currentLevel": "B1 - Intermediate",
  "streak": 5,
  "lessonsCompleted": 12,
  "skills": {
    "listening": { "level": "B1", "progress": 75 },
    "reading": { "level": "A2", "progress": 60 },
    "writing": { "level": "B1", "progress": 40 },
    "speaking": { "level": "A2", "progress": 80 }
  },
  "badges": [
    { "id": "badge_1", "title": "First Flight", "icon": "🚀", "earned": true },
    { "id": "badge_2", "title": "7-Day Streak", "icon": "🔥", "earned": true },
    { "id": "badge_3", "title": "Grammar Master", "icon": "📚", "earned": false }
  ]
}
```

**TypeScript Interface:**
```typescript
interface UserProfile {
  userId: string;
  currentLevel: string;  // CEFR level (A1, A2, B1, B2, C1, C2)
  streak: number;
  lessonsCompleted: number;
  skills: {
    listening: { level: string; progress: number };
    reading: { level: string; progress: number };
    writing: { level: string; progress: number };
    speaking: { level: string; progress: number };
  };
  badges: Badge[];
}

interface Badge {
  id: string;
  title: string;
  icon: string;  // Emoji or icon identifier
  earned: boolean;
}
```

---

### 7. **PUT /api/profile/streak**

Update the user's daily streak.

**Request Body:**
```json
{
  "date": "2024-01-15"
}
```

**Response (200 OK):**
```json
{
  "streak": 6,
  "message": "Congratulations! 6-day streak!"
}
```

**Logic Requirements:**
- Increment streak if user active today
- Reset to 1 if gap detected
- Track last active date

---

### 8. **POST /api/badges/earn**

Award a badge to the user (triggered by backend logic).

**Request Body:**
```json
{
  "badgeId": "badge_3"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "badge": {
    "id": "badge_3",
    "title": "Grammar Master",
    "icon": "📚",
    "earned": true
  },
  "message": "You've earned the Grammar Master badge!"
}
```

**Badge Unlock Conditions (Suggested):**
- **First Flight** 🚀 - Complete first lesson
- **7-Day Streak** 🔥 - Maintain 7-day login streak
- **Grammar Master** 📚 - Score 90%+ on 5 grammar activities
- **Brave Speaker** 💬 - Submit 10 voice recordings
- **Confidence Builder** ⭐ - Complete 20 lessons
- **Vocabulary Collector** 📖 - Learn 100 new words
- **Conversation Pro** 🗣️ - Have 50+ message exchanges
- **Night Owl** 🦉 - Study after 10 PM for 5 days
- **Early Bird** 🌅 - Study before 7 AM for 5 days

---

## 🔐 Authentication Flow

**Not yet implemented** but frontend is ready for it.

### Recommended Flow:
1. User logs in → Backend returns JWT token
2. Frontend stores token in localStorage
3. All API requests include: `Authorization: Bearer {token}`
4. Backend validates token on each request

### Frontend Changes Needed (When Ready):
```typescript
// Add to api.ts
export const setAuthToken = (token: string) => {
  localStorage.setItem('authToken', token);
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Include in all fetch calls
headers: {
  'Authorization': `Bearer ${getAuthToken()}`,
  'Content-Type': 'application/json'
}
```

---

## 🔄 WebSocket Requirements (Optional Enhancement)

For real-time AI responses (streaming):

### WebSocket Endpoint:
`wss://your-backend.com/ws`

### Events:

**Client → Server:**
```json
{
  "type": "message",
  "content": "How do I use present perfect?"
}
```

**Server → Client (Streaming):**
```json
{
  "type": "message_chunk",
  "content": "Great",
  "messageId": "msg_123"
}
{
  "type": "message_chunk",
  "content": " question!",
  "messageId": "msg_123"
}
{
  "type": "message_complete",
  "messageId": "msg_123"
}
```

**Benefits:**
- More natural conversation feel
- Reduced perceived latency
- Better user engagement

---

## 📁 Voice File Specifications

### Upload Format:
- **Supported formats:** WebM (preferred), MP3, WAV
- **Max file size:** 10MB
- **Sample rate:** 16kHz or 44.1kHz
- **Channels:** Mono or Stereo

### Download Format (AI Feedback):
- **Format:** MP3 or WAV
- **Bitrate:** 128kbps minimum
- **Include:** Direct URL or base64 encoded

### Example Response:
```json
{
  "audioFeedbackUrl": "https://cdn.yourapp.com/audio/feedback_123.mp3",
  "duration": 15.2
}
```

---

## 💾 Database Schema Suggestions

Based on frontend requirements:

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  current_level VARCHAR(10),  -- A1, A2, B1, B2, C1, C2
  streak INTEGER DEFAULT 0,
  last_active_date DATE,
  lessons_completed INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Messages Table
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  sender VARCHAR(10),  -- 'user' or 'ai'
  content TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW()
);
```

### Skills Table
```sql
CREATE TABLE user_skills (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  skill_type VARCHAR(20),  -- listening, reading, writing, speaking
  level VARCHAR(10),       -- A1-C2
  progress INTEGER,        -- 0-100
  UNIQUE(user_id, skill_type)
);
```

### Activities Table
```sql
CREATE TABLE activities (
  id UUID PRIMARY KEY,
  type VARCHAR(50),     -- fill-in-blank, matching, free-practice
  content JSONB,        -- Activity data (flexible structure)
  difficulty VARCHAR(10),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Activity Submissions Table
```sql
CREATE TABLE activity_submissions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  activity_id UUID REFERENCES activities(id),
  user_answers JSONB,
  correct BOOLEAN,
  score INTEGER,
  submitted_at TIMESTAMP DEFAULT NOW()
);
```

### Badges Table
```sql
CREATE TABLE badges (
  id UUID PRIMARY KEY,
  title VARCHAR(100),
  icon VARCHAR(10),
  unlock_condition TEXT
);

CREATE TABLE user_badges (
  user_id UUID REFERENCES users(id),
  badge_id UUID REFERENCES badges(id),
  earned_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY(user_id, badge_id)
);
```

### Voice Recordings Table
```sql
CREATE TABLE voice_recordings (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  audio_url VARCHAR(500),
  transcription TEXT,
  pronunciation_score INTEGER,
  feedback TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🚦 CORS Configuration

Ensure backend allows requests from frontend origin:

```javascript
// Express example
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5000',  // Development
  // origin: 'https://yourapp.com',  // Production
  credentials: true
}));
```

---

## 🧪 Testing Recommendations

### Manual Testing:
1. Test all endpoints with Postman/Insomnia
2. Verify response formats match TypeScript interfaces
3. Test error cases (400, 401, 500)
4. Ensure CORS headers work

### Integration Testing:
1. Connect frontend to staging backend
2. Test complete user flows end-to-end
3. Verify loading states appear correctly
4. Confirm error messages display properly

---

## 📊 Performance Expectations

### Response Times:
- **GET /api/profile**: < 200ms
- **GET /api/conversation**: < 500ms
- **POST /api/messages**: < 2000ms (AI processing)
- **POST /api/voice**: < 5000ms (speech processing)
- **GET /api/activities/:type**: < 300ms
- **POST /api/activities/submit**: < 500ms

### Frontend Behavior:
- Shows loading spinner for > 500ms requests
- Displays typing indicator during AI responses
- Handles timeouts gracefully (30s default)

---

## ✅ Integration Checklist

Before connecting frontend to backend:

- [ ] All 8 endpoints implemented
- [ ] Response formats match TypeScript interfaces
- [ ] CORS configured correctly
- [ ] Error responses use proper HTTP status codes
- [ ] Authentication flow ready (if implementing)
- [ ] Voice upload/download working
- [ ] Database schema created
- [ ] Environment variables configured
- [ ] SSL certificate for production
- [ ] Rate limiting configured

---

## 🔗 Useful Resources

- **Frontend Code**: `client/src/utils/api.ts` - TypeScript interfaces
- **Mock Data**: `client/src/utils/mockData.ts` - Example data structures
- **API Guide**: `API_INTEGRATION_GUIDE.md` - Detailed integration steps
- **Component Docs**: See README.md for component overview

---

## 💬 Questions?

For frontend implementation questions, please check:
1. Source code comments in `client/src/`
2. TypeScript interfaces in `api.ts`
3. Mock data examples in `mockData.ts`

For backend architecture questions, feel free to reach out!

---

**Frontend ready and waiting! 🚀**
