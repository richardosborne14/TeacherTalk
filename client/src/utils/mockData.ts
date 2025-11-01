// Mock conversation data for initial chat display
export const mockConversation = [
  {
    id: '1',
    sender: 'ai' as const,
    content: "Hi! I'm so excited to be your English teacher. What brings you here today?",
    timestamp: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    sender: 'user' as const,
    content: 'I need to improve my grammar for work emails.',
    timestamp: '2024-01-15T10:31:00Z',
  },
  {
    id: '3',
    sender: 'ai' as const,
    content: "That's wonderful! Professional communication is so important. Let me ask - what types of emails do you write most often? Formal reports, quick updates, or something else?",
    timestamp: '2024-01-15T10:32:00Z',
  },
  {
    id: '4',
    sender: 'user' as const,
    content: 'Mostly updates to my team and clients.',
    timestamp: '2024-01-15T10:33:00Z',
  },
];

// Mock activities for testing different activity types
export const mockActivities = {
  fillInBlank: {
    type: 'fill-in-blank' as const,
    sentence: 'I ___ to the office every day by subway.',
    gaps: [{ position: 0, correctAnswer: 'go', userAnswer: '' }],
    hint: 'Present simple tense for daily routines',
  },
  fillInBlankAdvanced: {
    type: 'fill-in-blank' as const,
    sentence: 'She ___ been working here for three years and ___ many projects.',
    gaps: [
      { position: 0, correctAnswer: 'has', userAnswer: '' },
      { position: 1, correctAnswer: 'completed', userAnswer: '' },
    ],
    hint: 'Think about present perfect tense',
  },
  matching: {
    type: 'matching' as const,
    pairs: [
      { id: 1, word: 'definitely', definition: 'without doubt' },
      { id: 2, word: 'probably', definition: 'likely but not certain' },
      { id: 3, word: 'possibly', definition: 'perhaps, maybe' },
      { id: 4, word: 'certainly', definition: 'surely, undoubtedly' },
    ],
  },
  freePractice: {
    type: 'free-practice' as const,
    prompt: 'Write a brief email to your team about a project update. Use professional language and at least 2 transition words (however, therefore, additionally, etc.)',
    minWords: 40,
  },
};

// Mock user profile data
export const mockProfile = {
  currentLevel: 'B1 - Intermediate',
  streak: 5,
  lessonsCompleted: 12,
  skills: {
    listening: { level: 'B1', progress: 75 },
    reading: { level: 'A2', progress: 60 },
    writing: { level: 'B1', progress: 40 },
    speaking: { level: 'A2', progress: 80 },
  },
  badges: [
    { id: '1', title: 'First Flight', icon: '🚀', earned: true },
    { id: '2', title: '7-Day Streak', icon: '🔥', earned: true },
    { id: '3', title: 'Grammar Master', icon: '📚', earned: true },
    { id: '4', title: 'Brave Speaker', icon: '💬', earned: true },
    { id: '5', title: 'Confidence Builder', icon: '⭐', earned: true },
    { id: '6', title: 'Vocabulary Collector', icon: '📖', earned: false },
    { id: '7', title: 'Conversation Pro', icon: '🗣️', earned: false },
    { id: '8', title: 'Night Owl', icon: '🦉', earned: false },
    { id: '9', title: 'Early Bird', icon: '🌅', earned: false },
  ],
};

// Mock AI responses for different contexts
export const mockAIResponses = {
  grammar: [
    "Great question! Let me explain this grammar rule in a simple way...",
    "You're on the right track! Here's a tip to remember this...",
    "That's a common challenge! Let's practice this together.",
  ],
  encouragement: [
    "Excellent work! You're making real progress!",
    "That's wonderful! I can see your confidence growing.",
    "Perfect! You're getting the hang of this!",
  ],
  correction: [
    "Good try! Let me show you a more natural way to say that...",
    "Almost there! Native speakers would typically say it this way...",
    "Nice effort! Here's a small adjustment that will make it sound more fluent...",
  ],
  general: [
    "That's interesting! Tell me more about that.",
    "I understand. Let's work on that together.",
    "Great! Let's practice some more.",
  ],
};

// Helper to get a random response from a category
export const getRandomResponse = (category: keyof typeof mockAIResponses): string => {
  const responses = mockAIResponses[category];
  return responses[Math.floor(Math.random() * responses.length)];
};
