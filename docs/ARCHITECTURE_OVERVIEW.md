# TeacherTalk: Adaptive Learning System Architecture
**Revised System Design - Agentic AI with Focused Learning Pathways**

**Date:** November 2, 2025  
**Status:** Architecture v2.0 - Approved

---

## 🎯 Core Philosophy

**"Loosey Goosey Chat → Focused Learning → Transparent Progress"**

### Key Principles:
1. **No Boring Onboarding:** Jump straight into natural conversation
2. **Restrictive Learning Objectives:** One language point + one skill per lesson
3. **Adaptive Intelligence:** AI decides routing, offers choices, guides when needed
4. **Transparent Progress:** User sees exactly how each lesson contributes
5. **Continuous Adaptation:** Learner model evolves, influences all interactions

---

## 🏗️ Two-Context System

```
MAIN FEED (The Lobby)
- Natural conversation
- Lesson proposals  
- Configuration refinement
- Archived/hidden (vector storage)
         ↓
   [Start Lesson Button]
         ↓
LESSON THREAD (The Classroom)
- Custom system instructions
- Focused conversation
- Activities + attempts + feedback
- ONE language point + ONE skill
- Persistent and reviewable
         ↓
   [End Lesson Button]
         ↓
LESSON EVALUATION
- AI analyzes performance
- Calculates skill contributions
- Updates learner model
- Suggests next lessons
```

---

## Key User Flows

### Flow 1: Natural Onboarding
```
User logs in → Casual chat
AI converses naturally → Proposes lesson organically
"Start Lesson" button appears → User refines via chat
Config evolves silently → User clicks button
Lesson solidifies → Focused learning begins
```

### Flow 2: Focused Learning
```
Lesson starts with custom instructions
AI guides conversation toward language point
Suggests activities at right moment
User completes activity → Multiple attempts allowed
Feedback builds on previous attempts
Lesson ends → Comprehensive evaluation
```

### Flow 3: Transparent Progress
```
User views progress dashboard
Clicks skill (e.g., "Writing")
Sees contributing lessons
Each lesson shows points + reasoning
User understands exactly why they progressed
```

---

## Database Schema Summary

### Core Tables:
1. **users** - Basic user identity
2. **main_feed_messages** - Lobby conversation (archived)
3. **lesson_configs** - Ephemeral drafts (evolve until confirmed)
4. **lessons** - Solidified learning sessions
5. **lesson_messages** - Focused conversation within lesson
6. **activities** - Practice tasks
7. **activity_attempts** - Multiple tries with building feedback
8. **lesson_evaluations** - AI-generated assessment + points
9. **skill_contributions** - Drill-down data (lesson → points)
10. **skill_assessments** - Overall progress tracking
11. **learner_model** - AI-observed patterns and recommendations

---

## API Endpoints Summary

### Main Feed (7 endpoints)
- POST /api/main-feed/message → Chat + routing
- POST /api/lessons/draft → Create lesson config
- PATCH /api/lessons/draft/:id → Refine config
- POST /api/lessons/draft/:id/confirm → Start lesson

### Active Lesson (6 endpoints)
- GET /api/lessons/:id → Load lesson
- POST /api/lessons/:id/message → Chat in lesson
- POST /api/lessons/:id/activity → Generate activity
- POST /api/lessons/:id/activity/:activityId/attempt → Submit attempt
- POST /api/lessons/:id/activity/:activityId/regenerate → Variation
- POST /api/lessons/:id/complete → End lesson + evaluate

### Progress (4 endpoints)
- GET /api/progress → Dashboard
- GET /api/progress/:skill/breakdown → Drill down
- GET /api/lessons/history → LMS-style list
- GET /api/learner-model → Patterns + recommendations

---

## n8n Workflows Summary

1. **Main Feed Handler** - Routing + lesson proposals
2. **Config Refiner** - Update lesson draft
3. **Lesson Solidifier** - Create final lesson
4. **Lesson Message Handler** - Focused AI responses
5. **Activity Generator** - Create practice tasks
6. **Activity Evaluator** - Grade + feedback (builds on previous)
7. **Lesson Evaluator** - Calculate progress + reasoning
8. **Learner Model Updater** - Continuous background analysis

---

## Critical Implementation Rules

1. **One Lesson at a Time** - Database constraint enforces this
2. **One Language Point + One Skill** - Validate at lesson creation
3. **Feedback Builds** - Each attempt references previous ones
4. **Transparent Attribution** - Every point has detailed reasoning
5. **Continuous Adaptation** - Learner model updates regularly
6. **No Forced Assessments** - Let conversation flow naturally

---

**See detailed schema, API specs, and workflow designs in separate documents.**