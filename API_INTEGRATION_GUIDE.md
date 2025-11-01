# API Integration Guide

This guide explains how the mock data and API layer work, and how to replace them with real backend endpoints.

## 📁 File Structure

```
client/src/utils/
├── mockData.ts    # Mock conversation, activities, and profile data
└── api.ts         # API functions (currently using mock data)
```

## 🔄 Current Mock API Implementation

All API calls are centralized in `client/src/utils/api.ts`. They currently simulate network delays and return mock data, but are structured to match the expected backend API contract.

### Available API Functions

#### 1. **getConversation()**
Fetches the conversation history.

```typescript
const messages = await getConversation();
// Returns: Message[] with id, sender, content, timestamp
```

**Backend endpoint to create:** `GET /api/conversation`

---

#### 2. **sendMessage(message: string)**
Sends a user message and receives an AI response.

```typescript
const aiResponse = await sendMessage("How do I use present perfect?");
// Returns: Message with AI response
```

**Backend endpoint to create:** `POST /api/messages`

Request body:
```json
{
  "message": "How do I use present perfect?"
}
```

Response:
```json
{
  "id": "123",
  "sender": "ai",
  "content": "Great question! Let me explain...",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

#### 3. **sendVoiceMessage(audioData: any)**
Processes voice recording and returns AI feedback.

```typescript
const aiResponse = await sendVoiceMessage(audioBlob);
// Returns: Message with voice feedback
```

**Backend endpoint to create:** `POST /api/voice`

Should accept audio file upload (FormData) and return AI analysis.

---

#### 4. **getActivity(type)**
Fetches a specific activity by type.

```typescript
const activity = await getActivity('fill-in-blank');
// Returns activity data based on type
```

**Backend endpoint to create:** `GET /api/activities/:type`

Types: `'fill-in-blank' | 'matching' | 'free-practice'`

---

#### 5. **submitActivity(submission)**
Submits activity answers for validation.

```typescript
const feedback = await submitActivity({
  activityId: "act_123",
  userAnswers: { /* ... */ }
});
// Returns: { correct: boolean, feedback: string, correctAnswers?: any }
```

**Backend endpoint to create:** `POST /api/activities/submit`

---

#### 6. **getProfile()**
Fetches user profile and progress data.

```typescript
const profile = await getProfile();
// Returns: UserProfile with level, streak, skills, badges
```

**Backend endpoint to create:** `GET /api/profile`

Response structure:
```json
{
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
    { "id": "1", "title": "First Flight", "icon": "🚀", "earned": true }
  ]
}
```

---

#### 7. **updateStreak()**
Updates the user's daily streak.

```typescript
const result = await updateStreak();
// Returns: { streak: number }
```

**Backend endpoint to create:** `PUT /api/profile/streak`

---

#### 8. **earnBadge(badgeId)**
Awards a badge to the user.

```typescript
const result = await earnBadge("badge_123");
// Returns: { success: boolean, badge: Badge }
```

**Backend endpoint to create:** `POST /api/badges/earn`

---

## 🔧 How to Replace with Real Backend

### Step 1: Update Environment Variables
Create a `.env` file with your backend URL:

```bash
VITE_API_BASE_URL=https://your-backend.com/api
```

### Step 2: Replace Mock Functions

In `client/src/utils/api.ts`, replace mock implementations with real fetch calls:

```typescript
// BEFORE (Mock)
export const sendMessage = async (message: string): Promise<Message> => {
  await delay(1000);
  return {
    id: Date.now().toString(),
    sender: 'ai',
    content: getRandomResponse('general'),
    timestamp: new Date().toISOString(),
  };
};

// AFTER (Real Backend)
export const sendMessage = async (message: string): Promise<Message> => {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`, // if using auth
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  return response.json();
};
```

### Step 3: Add Error Handling

Wrap API calls in try/catch blocks (already implemented in Home.tsx):

```typescript
try {
  const aiResponse = await api.sendMessage(text);
  // Handle success
} catch (error) {
  // Handle error - UI already shows error messages
  console.error('Failed to send message:', error);
}
```

### Step 4: Add Authentication (if needed)

If your backend requires authentication:

```typescript
// Add auth token management
let authToken: string | null = null;

export const setAuthToken = (token: string) => {
  authToken = token;
};

export const getAuthToken = () => authToken;

// Include in all requests
headers: {
  'Authorization': `Bearer ${getAuthToken()}`,
  // ...
}
```

---

## 📊 Mock Data Details

### Conversation Data
Located in `mockData.ts` - simulates a conversation history with 4 messages.

### Activities Data
Three types of activities are mocked:
- **Fill in the Blank**: Gap-fill exercises with hints
- **Matching Game**: Word-definition matching
- **Free Practice**: Open-ended writing prompts

### Profile Data
Includes:
- Current CEFR level (A1-C2)
- Daily streak counter
- Lessons completed
- 4 skill areas with progress (0-100)
- 9 badges (5 earned, 4 locked)

---

## 🧪 Testing the Integration

### Current Mock Behavior
1. **Network delays**: All API calls have simulated delays (500ms - 2s)
2. **Success rate**: Activities have a 70% mock success rate for testing error states
3. **Dynamic responses**: AI responses vary based on message content

### How Components Use the API

**Home.tsx** loads data on mount:
```typescript
useEffect(() => {
  const loadInitialData = async () => {
    const [profileData, conversationData] = await Promise.all([
      api.getProfile(),
      api.getConversation(),
    ]);
    // ... format and set state
  };
  loadInitialData();
}, []);
```

**Message sending** is async:
```typescript
const handleSendMessage = async (text: string) => {
  // Add user message immediately
  setMessages(prev => [...prev, userMessage]);
  
  // Fetch AI response
  const aiResponse = await api.sendMessage(text);
  setMessages(prev => [...prev, formattedResponse]);
};
```

---

## ✅ Integration Checklist

When connecting to the real backend:

- [ ] Set up `VITE_API_BASE_URL` environment variable
- [ ] Replace mock delay() calls with real fetch() calls
- [ ] Add authentication headers if required
- [ ] Update TypeScript interfaces to match backend response shapes
- [ ] Test error handling (network failures, 404s, 500s)
- [ ] Verify CORS settings on backend
- [ ] Test loading states work correctly
- [ ] Confirm all data flows through the UI properly

---

## 💡 Tips

1. **Keep the mock layer**: Don't delete `mockData.ts` - it's useful for:
   - Local development without backend
   - Testing UI changes quickly
   - Demos and screenshots

2. **Environment switching**: Use environment variables to toggle between mock and real backend:
   ```typescript
   const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK === 'true';
   ```

3. **Type safety**: The `api.ts` file exports TypeScript interfaces that should match your backend exactly. Update them as your API evolves.

---

## 🚀 Current Status

✅ All components wired to use API layer  
✅ Loading states implemented  
✅ Error handling implemented  
✅ Offline detection implemented  
✅ Mock data provides realistic UX  
🔲 Ready for backend integration  

The entire UI is fully functional with mock data and waiting for backend API endpoints!
