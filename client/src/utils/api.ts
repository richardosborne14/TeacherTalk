import { mockConversation, mockProfile, mockActivities, getRandomResponse } from './mockData';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * API ENDPOINTS - Ready for backend integration
 * All functions return promises that simulate async API calls
 * Replace these with actual fetch/axios calls when backend is ready
 */

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: string;
}

export interface ActivitySubmission {
  activityId: string;
  userAnswers: any;
}

export interface ActivityFeedback {
  correct: boolean;
  feedback: string;
  correctAnswers?: any;
}

export interface UserProfile {
  currentLevel: string;
  streak: number;
  lessonsCompleted: number;
  skills: {
    listening: { level: string; progress: number };
    reading: { level: string; progress: number };
    writing: { level: string; progress: number };
    speaking: { level: string; progress: number };
  };
  badges: Array<{
    id: string;
    title: string;
    icon: string;
    earned: boolean;
  }>;
}

/**
 * GET /api/conversation
 * Fetch conversation history
 */
export const getConversation = async (): Promise<Message[]> => {
  await delay(500);
  return mockConversation;
};

/**
 * POST /api/messages
 * Send a user message and get AI response
 */
export const sendMessage = async (message: string): Promise<Message> => {
  await delay(1000); // Simulate network delay
  
  // Mock AI response logic based on message content
  let responseCategory: 'grammar' | 'encouragement' | 'correction' | 'general' = 'general';
  
  if (message.toLowerCase().includes('grammar') || message.toLowerCase().includes('tense')) {
    responseCategory = 'grammar';
  } else if (message.toLowerCase().includes('good') || message.toLowerCase().includes('thanks')) {
    responseCategory = 'encouragement';
  } else if (message.includes('?')) {
    responseCategory = 'general';
  }
  
  return {
    id: Date.now().toString(),
    sender: 'ai',
    content: getRandomResponse(responseCategory),
    timestamp: new Date().toISOString(),
  };
};

/**
 * POST /api/voice
 * Send voice recording and get AI response
 */
export const sendVoiceMessage = async (audioData: any): Promise<Message> => {
  await delay(2000); // Voice processing takes longer
  
  return {
    id: Date.now().toString(),
    sender: 'ai',
    content: "Great pronunciation! I can hear you're really working on your English. Your intonation is improving - keep practicing!",
    timestamp: new Date().toISOString(),
  };
};

/**
 * POST /api/activities/submit
 * Submit activity answers and get feedback
 */
export const submitActivity = async (submission: ActivitySubmission): Promise<ActivityFeedback> => {
  await delay(800);
  
  // Mock feedback - in production, this would be validated server-side
  const isCorrect = Math.random() > 0.3; // 70% success rate for demo
  
  return {
    correct: isCorrect,
    feedback: isCorrect 
      ? "Excellent work! You got it right. You're making great progress!"
      : "Good try! Don't worry about mistakes - they're part of learning. Let me show you the correct answer.",
    correctAnswers: !isCorrect ? submission.userAnswers : undefined,
  };
};

/**
 * GET /api/activities/:type
 * Fetch a specific activity by type
 */
export const getActivity = async (type: 'fill-in-blank' | 'matching' | 'free-practice'): Promise<any> => {
  await delay(600);
  
  switch (type) {
    case 'fill-in-blank':
      return mockActivities.fillInBlank;
    case 'matching':
      return mockActivities.matching;
    case 'free-practice':
      return mockActivities.freePractice;
    default:
      throw new Error(`Unknown activity type: ${type}`);
  }
};

/**
 * GET /api/profile
 * Fetch user profile and progress
 */
export const getProfile = async (): Promise<UserProfile> => {
  await delay(500);
  return mockProfile;
};

/**
 * PUT /api/profile/streak
 * Update user streak (called daily)
 */
export const updateStreak = async (): Promise<{ streak: number }> => {
  await delay(400);
  return { streak: mockProfile.streak + 1 };
};

/**
 * POST /api/badges/earn
 * Award a badge to the user
 */
export const earnBadge = async (badgeId: string): Promise<{ success: boolean; badge: any }> => {
  await delay(500);
  
  const badge = mockProfile.badges.find(b => b.id === badgeId);
  if (!badge) {
    throw new Error('Badge not found');
  }
  
  return {
    success: true,
    badge: { ...badge, earned: true },
  };
};

// Export mock data for direct use in components during development
export { mockConversation, mockProfile, mockActivities };
