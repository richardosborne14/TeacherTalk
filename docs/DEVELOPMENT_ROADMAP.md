# TeacherTalk Backend Development Roadmap
**AI-Assisted Development with Human Review Checkpoints**

**Date:** November 2, 2025  
**Development Model:** Cline (Implementation) + Claude (Senior Review)

---

## 🎯 How to Use This Roadmap

### Execution Flow

```
1. Read Phase Overview → Understand objectives
2. Copy Cline Prompt → Paste into Cline
3. Cline Implements → Following custom instructions
4. Human Review → Check work with Claude
5. Iterate/Approve → Fix issues or move forward
6. Next Phase → Repeat
```

### Color Legend
- 🔵 **Setup/Configuration** - Infrastructure and environment
- 🟢 **Core Development** - Primary features
- 🟡 **Integration** - Connecting pieces
- 🔴 **Critical** - Must be perfect (memory, security)
- 🟣 **Polish** - Testing and refinement

---

## 📊 Overview: 6 Phases, ~8 Weeks

```
Phase 0: Foundation Setup          [Week 1]      🔵
Phase 1: Database Layer            [Week 1-2]    🟢
Phase 2: Core API Endpoints        [Week 2-3]    🟢
Phase 3: AI Orchestration (n8n)    [Week 3-5]    🔴
Phase 4: RAG Memory System         [Week 5-6]    🔴
Phase 5: Testing & Integration     [Week 7-8]    🟣

MILESTONE: MVP Ready for Demo      [Week 8]      🎉
```

---

# Phase 0: Foundation Setup
**Duration:** 3-4 hours  
**Type:** 🔵 Infrastructure  
**Risk Level:** Low

## Objectives
- Create project structure
- Set up development environment
- Initialize documentation
- Create .clinerules file
- Set up version control

## Success Criteria
- [ ] Clean project structure exists
- [ ] .env.example is comprehensive
- [ ] Documentation folder is initialized
- [ ] .clinerules file is active
- [ ] Git repository initialized with .gitignore

---

## Task 0.1: Project Structure Setup

### 📋 Cline Prompt

```
# Task: Initialize TeacherTalk Backend Project Structure

**Objective:** Create a clean, organized project structure for the backend.

**Before you start:**
1. Confirm you've read your custom instructions
2. Rate your confidence (1-10) for this task
3. State any assumptions

**Requirements:**

Create this folder structure:
```
teachertalk-backend/
├── .implementation/           # Task tracking
│   └── templates/
│       └── task-template.md
├── docs/                      # Documentation
│   ├── architecture/
│   ├── api/
│   └── decisions/            # ADRs (Architecture Decision Records)
├── src/                       # Source code
│   ├── api/                   # Express routes
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── validators/
│   ├── services/              # Business logic
│   │   ├── ai/
│   │   ├── db/
│   │   └── vector/
│   ├── models/                # TypeScript interfaces
│   ├── utils/                 # Helpers
│   └── config/                # Configuration
├── tests/                     # Test files
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── scripts/                   # Utility scripts
├── .clinerules                # Project-specific rules
├── .env.example               # Environment template
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

**Implementation Notes:**
- Create empty `.gitkeep` files in empty directories
- Add brief README.md in each major folder explaining its purpose
- Follow the file header format from custom instructions

**Deliverables:**
1. Complete folder structure
2. .clinerules file (copy from docs/CLINE_PROMPTS.md)
3. .env.example with all required variables:
   - Database (Directus)
   - Vector store (Qdrant)
   - AI APIs (Groq, OpenAI, Claude)
   - n8n webhooks
   - Application config
4. .gitignore (Node.js + project-specific)
5. package.json with initial dependencies
6. Basic README.md

**Before marking complete:**
- Run the pre-completion checklist
- Rate final confidence
- Request human review

DO NOT BE LAZY. Create all files with proper content.
```

### 👨‍💻 Human Review Checklist

**After Cline completes, review with Claude:**

```
Claude, please review the project structure Cline created:

[Paste the file tree]

Specific checks:
1. Is the folder structure logical and scalable?
2. Does .env.example cover all necessary variables?
3. Is .gitignore comprehensive?
4. Are the initial dependencies appropriate?
5. Is the README clear for new developers?

Any improvements needed?
```

**Expected Output:**
- ✅ Clean, organized structure
- ✅ All config files present
- ✅ Documentation stubs ready

---

## Task 0.2: Development Environment Setup

### 📋 Cline Prompt

```
# Task: Set Up Development Environment

**Objective:** Prepare local development environment and initialize tooling.

**Context:** 
- Review docs/PROJECT_SCOPE.md for technology requirements
- We're using TypeScript, Express, and connecting to external services

**Requirements:**

1. **package.json setup:**
   ```json
   {
     "name": "teachertalk-backend",
     "version": "0.1.0",
     "description": "AI Language Learning Companion - Backend",
     "main": "dist/index.js",
     "scripts": {
       "dev": "nodemon --exec ts-node src/index.ts",
       "build": "tsc",
       "start": "node dist/index.js",
       "test": "jest",
       "test:watch": "jest --watch",
       "lint": "eslint src --ext .ts",
       "format": "prettier --write 'src/**/*.ts'"
     }
   }
   ```

2. **Install dependencies:**
   
   **Core:**
   - express
   - typescript
   - @types/express
   - @types/node
   - dotenv
   - cors
   - helmet (security)
   
   **Database:**
   - @directus/sdk (or appropriate Directus client)
   - pg (PostgreSQL driver)
   
   **AI/Vector:**
   - @qdrant/js-client (Qdrant vector store)
   - openai (OpenAI API)
   - groq-sdk (or appropriate Groq client)
   
   **Utilities:**
   - axios (HTTP client)
   - joi (validation)
   - winston (logging)
   - express-rate-limit (API protection)

   **Dev Dependencies:**
   - nodemon
   - ts-node
   - jest
   - @types/jest
   - eslint
   - @typescript-eslint/parser
   - @typescript-eslint/eslint-plugin
   - prettier

3. **TypeScript config (tsconfig.json):**
   ```json
   {
     "compilerOptions": {
       "target": "ES2020",
       "module": "commonjs",
       "lib": ["ES2020"],
       "outDir": "./dist",
       "rootDir": "./src",
       "strict": true,
       "esModuleInterop": true,
       "skipLibCheck": true,
       "forceConsistentCasingInFileNames": true,
       "resolveJsonModule": true,
       "declaration": true,
       "declarationMap": true,
       "sourceMap": true
     },
     "include": ["src/**/*"],
     "exclude": ["node_modules", "dist", "tests"]
   }
   ```

4. **ESLint config (.eslintrc.json)**
5. **Prettier config (.prettierrc)**
6. **Jest config (jest.config.js)**

7. **Create basic Express server (src/index.ts):**
   - Health check endpoint
   - Error handling middleware
   - CORS setup
   - Helmet security
   - Request logging

**Confidence Check:**
Before starting, rate confidence (1-10) for each major piece:
- TypeScript setup
- Express configuration
- Tooling setup (ESLint, Prettier, Jest)

**Deliverables:**
- package.json with all dependencies
- All config files created
- Basic Express server running on port 3000
- Health check at GET /health returns { status: 'ok' }

**Testing:**
After implementation, verify:
- `npm run dev` starts the server
- `curl http://localhost:3000/health` returns 200 OK
- TypeScript compilation works: `npm run build`
- Linting works: `npm run lint`

DO NOT BE LAZY. Provide complete config files.
```

### 👨‍💻 Human Review Checklist

```
Claude, review the development environment setup:

[Paste package.json, tsconfig.json, and Express server code]

Checks:
1. Are all necessary dependencies included?
2. Is TypeScript configured correctly for our use case?
3. Is the Express server properly structured?
4. Are security middleware (helmet, cors) properly configured?
5. Is error handling comprehensive?

Any missing pieces or improvements?
```

---

## Task 0.3: Documentation Foundation

### 📋 Cline Prompt

```
# Task: Create Documentation Foundation

**Objective:** Set up documentation structure and create initial architectural docs.

**Requirements:**

Create these documents:

1. **docs/ARCHITECTURE.md**
   - System overview diagram (text/ASCII art is fine)
   - Component descriptions (Express API, Directus, Qdrant, n8n)
   - Data flow explanation
   - Technology decisions with rationale

2. **docs/API_SPECIFICATION.md**
   - List all 8 API endpoints (from PROJECT_SCOPE.md)
   - For each endpoint:
     - Method and path
     - Request format (TypeScript interface)
     - Response format (TypeScript interface)
     - Error responses
     - Example curl command

3. **docs/DATABASE_SCHEMA.md**
   - All Directus collections (from PROJECT_SCOPE.md)
   - Field definitions
   - Relationships
   - Indexes needed for performance

4. **docs/DEPLOYMENT.md**
   - Environment variables explained
   - Service setup instructions (Directus, Qdrant, n8n)
   - Local development setup
   - Production deployment considerations

5. **.implementation/templates/task-template.md**
   ```markdown
   # Task: [Name]
   
   ## Objective
   [What we're building]
   
   ## Confidence Level
   Initial: [X/10] - [Reasoning]
   Final: [X/10] - [Reasoning]
   
   ## Approach
   1. [Step 1]
   2. [Step 2]
   
   ## Assumptions
   - [List assumptions]
   
   ## Questions/Blockers
   - [Any uncertainties]
   
   ## Implementation Notes
   [Add notes as you build]
   
   ## Testing
   - [How you tested]
   - [Results]
   
   ## Human Review
   - Status: [PENDING/APPROVED/NEEDS_REVISION]
   - Feedback: [From human reviewer]
   
   ## Completion Checklist
   - [ ] Code complete with comments
   - [ ] Tests written
   - [ ] Documentation updated
   - [ ] Human review requested
   - [ ] Confidence ≥ 8 OR explicitly approved at lower confidence
   ```

**Reference Materials:**
- Read docs/PROJECT_SCOPE.md for full specifications
- Read docs/HANDOFF.md for API contract with frontend

**Documentation Standards:**
- Be comprehensive but concise
- Include examples where helpful
- Use clear section headers
- Add table of contents for long docs

**Deliverables:**
- All 5 documents created
- Content is accurate based on PROJECT_SCOPE.md
- Clear enough for a new developer to understand the system

**Confidence Check:**
Rate your confidence (1-10) on:
- Understanding the overall architecture
- API specification accuracy
- Database schema completeness
```

### 👨‍💻 Human Review Checklist

```
Claude, review the documentation Cline created:

[Paste relevant sections from each document]

Checks:
1. Is the architecture description accurate?
2. Do the API specs match the frontend expectations (HANDOFF.md)?
3. Is the database schema complete and well-designed?
4. Are deployment instructions clear?
5. Is anything missing or unclear?
```

---

## ✅ Phase 0 Completion Criteria

**Before proceeding to Phase 1:**

- [x] Project structure created and organized
- [x] Development environment working (server starts, compiles, lints)
- [x] Documentation foundation complete
- [x] .clinerules file active in project
- [x] Git repository initialized
- [x] **Human review approved all Phase 0 work**

**Deliverables:**
```
teachertalk-backend/
├── Complete folder structure
├── Working Express server
├── Comprehensive documentation
├── Task tracking system ready
└── Version control initialized
```

---

# Phase 1: Database Layer (Directus)
**Duration:** 1 week  
**Type:** 🟢 Core Development  
**Risk Level:** Medium

## Objectives
- Set up Directus connection
- Create all required collections
- Build TypeScript interfaces for data models
- Implement CRUD helper functions
- Write integration tests

## Success Criteria
- [ ] Directus connected and authenticated
- [ ] All 6 collections created with proper fields
- [ ] TypeScript models match database schema
- [ ] Helper functions tested and working
- [ ] Can create/read/update user profiles

---

## Task 1.1: Directus Connection Setup

### 📋 Cline Prompt

```
# Task: Set Up Directus Connection

**Objective:** Establish connection to Directus and create reusable client.

**Context:**
- We're using Directus as our headless CMS for structured data
- Need to support both local development and cloud deployment
- Review docs/DATABASE_SCHEMA.md for collection requirements

**Before starting:**
- Rate confidence (1-10) on Directus SDK familiarity
- Read Directus SDK documentation if confidence < 7
- State assumptions about authentication method

**Requirements:**

1. **Create src/config/directus.ts:**
   ```typescript
   /**
    * @file directus.ts
    * @description Directus client configuration and connection management
    * @author Cline
    * @created [date]
    * 
    * @architecture
    * - Singleton pattern for DB client
    * - Environment-based configuration
    * - Connection retry logic
    * - Error handling for auth failures
    */

   import { Directus } from '@directus/sdk';
   
   // [IMPLEMENT FULL CONNECTION LOGIC]
   // Include:
   // - Environment variable validation
   // - Client initialization
   // - Authentication
   // - Connection testing
   // - Error handling
   // - Retry logic (up to 3 attempts)
   ```

2. **Create src/services/db/directus-client.ts:**
   - Singleton Directus client instance
   - Health check function
   - Connection status checking
   - Graceful shutdown handling

3. **Environment variables needed:**
   ```
   DIRECTUS_URL=http://localhost:8055
   DIRECTUS_EMAIL=admin@example.com
   DIRECTUS_PASSWORD=password
   # OR
   DIRECTUS_TOKEN=your-static-token
   ```

4. **Create src/services/db/health.ts:**
   ```typescript
   export async function checkDirectusHealth(): Promise<{
     connected: boolean;
     latency?: number;
     error?: string;
   }> {
     // Test connection with timing
   }
   ```

**Testing:**
Write a test script (scripts/test-directus-connection.ts) that:
- Connects to Directus
- Checks authentication
- Measures latency
- Reports status

**Error Handling:**
Handle these scenarios:
- Network timeout
- Invalid credentials
- Service unavailable
- Expired tokens

**Deliverables:**
1. Working Directus connection module
2. Health check function
3. Test script showing successful connection
4. Error handling for all failure modes

**Documentation:**
- Add connection details to docs/DEPLOYMENT.md
- Document environment variables in .env.example
- Add usage examples to docs/DATABASE_SCHEMA.md

**Pre-completion checklist:**
- [ ] Code has comprehensive comments
- [ ] Error handling is thorough
- [ ] Test script runs successfully
- [ ] Confidence ≥ 8

DO NOT BE LAZY. Implement complete error handling.
```

### 👨‍💻 Human Review Checklist

```
Claude, review the Directus connection implementation:

[Paste directus.ts and directus-client.ts]

Checks:
1. Is the singleton pattern implemented correctly?
2. Is error handling comprehensive?
3. Are retry mechanisms appropriate?
4. Is the health check robust?
5. Are environment variables properly validated?
6. Does the test script prove it works?

Security check:
- No credentials hardcoded?
- Proper token handling?
```

---

## Task 1.2: Create Database Collections

### 📋 Cline Prompt

```
# Task: Create Directus Collections (Database Schema)

**Objective:** Define and create all required Directus collections.

**Context:**
- Reference docs/DATABASE_SCHEMA.md for complete schema
- Reference docs/PROJECT_SCOPE.md for data requirements
- This is the foundation for ALL data storage - must be done right

**CRITICAL:** This is a schema design task. Confidence must be ≥ 8 OR request human review before proceeding.

**Before starting:**
1. Read docs/DATABASE_SCHEMA.md thoroughly
2. Rate confidence (1-10) on database schema design
3. If confidence < 8, create proposed schema and request human review

**Collections to Create:**

### 1. users
```typescript
interface User {
  id: string; // UUID primary key
  session_id: string; // Anonymous session identifier
  created_at: Date;
  last_active: Date;
}
```

### 2. learning_profiles
```typescript
interface LearningProfile {
  id: string;
  user_id: string; // Foreign key to users
  current_level: CEFRLevel; // 'A1' | 'A1+' | 'A2' | 'A2+' | 'B1' | 'B1+' | 'B2'
  goals: string; // Text field
  professional_context: string;
  personal_interests: string;
  time_availability: string;
  learning_style_notes: string;
  created_at: Date;
  updated_at: Date;
}
```

### 3. skill_assessments
```typescript
interface SkillAssessment {
  id: string;
  user_id: string;
  timestamp: Date;
  listening_level: CEFRLevel;
  reading_level: CEFRLevel;
  writing_level: CEFRLevel;
  speaking_level: CEFRLevel;
  confidence_score: number; // 1-10
  evaluation_notes: JSON; // Detailed breakdown
}
```

### 4. conversation_logs
```typescript
interface ConversationLog {
  id: string;
  user_id: string;
  timestamp: Date;
  message_type: 'user_text' | 'user_audio' | 'ai_text' | 'ai_audio';
  content: string; // Message text
  audio_url?: string; // S3/storage URL if audio
  ai_evaluation: JSON; // Grammar, vocab, confidence analysis
  context_retrieved: JSON; // RAG context used (for debugging)
}
```

### 5. lesson_history
```typescript
interface LessonHistory {
  id: string;
  user_id: string;
  lesson_id: string;
  timestamp: Date;
  theme: string; // e.g., "Business Email Writing"
  activities_completed: JSON; // Array of activity results
  performance_notes: string;
  duration_minutes: number;
}
```

### 6. achievements
```typescript
interface Achievement {
  id: string;
  user_id: string;
  badge_type: string; // 'first_lesson', '7_day_streak', etc.
  earned_at: Date;
  title: string;
  description: string;
}
```

**Implementation Approach:**

Two options - decide based on your setup:

**Option A: Directus UI (Recommended for first time)**
- Create collections through Directus admin UI
- Export schema as JSON
- Save to scripts/directus-schema.json
- Document the manual steps in docs/DATABASE_SCHEMA.md

**Option B: Programmatic (Advanced)**
- Use Directus API to create collections programmatically
- Create script: scripts/setup-directus-schema.ts
- Include rollback capability

**Requirements:**
1. All collections created with correct field types
2. Foreign key relationships established
3. Indexes added for:
   - user_id fields (for fast lookups)
   - timestamp fields (for chronological queries)
   - session_id (for anonymous user tracking)
4. Default values set where appropriate
5. Field validation rules added (e.g., CEFR levels are enum)

**Testing:**
Create test script (scripts/test-directus-collections.ts):
```typescript
// For each collection:
// 1. Create test record
// 2. Read it back
// 3. Update it
// 4. Delete it
// 5. Verify foreign keys work
```

**Deliverables:**
1. All 6 collections created in Directus
2. Schema export (JSON) saved to scripts/
3. Test script proving CRUD works on all collections
4. Updated docs/DATABASE_SCHEMA.md with actual implementation notes

**Pre-completion checklist:**
- [ ] All collections exist
- [ ] Relationships work correctly
- [ ] Indexes are in place
- [ ] Test script passes
- [ ] Confidence ≥ 8

**If confidence < 8:** Stop and request schema review before implementing.

DO NOT BE LAZY. Test CRUD on every collection.
```

### 👨‍💻 Human Review Checklist

```
Claude, review the database schema implementation:

[Paste schema JSON or description]
[Paste test results]

Critical checks:
1. Are all required fields present?
2. Are data types appropriate?
3. Are relationships correctly established?
4. Are indexes added for performance?
5. Do the CRUD tests pass for all collections?
6. Does this schema support the MVP features (reference PROJECT_SCOPE.md)?

Schema validation:
- Can we store user profiles? ✓
- Can we track conversation history? ✓
- Can we record skill assessments? ✓
- Can we award badges? ✓
```

---

## Task 1.3: TypeScript Data Models

### 📋 Cline Prompt

```
# Task: Create TypeScript Interfaces for Data Models

**Objective:** Define type-safe interfaces matching the Directus schema.

**Context:**
- These types will be used throughout the application
- Must match the Directus schema exactly
- Will enable compile-time type checking

**Requirements:**

Create src/models/index.ts with all interfaces:

```typescript
/**
 * @file models/index.ts
 * @description TypeScript interfaces for all database models
 * @author Cline
 * @created [date]
 * 
 * @architecture
 * These interfaces must match the Directus schema exactly.
 * Any changes to database schema must be reflected here.
 * 
 * @see docs/DATABASE_SCHEMA.md for schema documentation
 */

// Enums
export type CEFRLevel = 
  | 'A1' 
  | 'A1+' 
  | 'A2' 
  | 'A2+' 
  | 'B1' 
  | 'B1+' 
  | 'B2';

export type MessageType = 
  | 'user_text' 
  | 'user_audio' 
  | 'ai_text' 
  | 'ai_audio';

// [IMPLEMENT ALL INTERFACES]
// For each collection, create:
// 1. Full interface
// 2. CreateDTO (for inserts - omit auto-generated fields)
// 3. UpdateDTO (for updates - all fields optional except ID)

export interface User {
  // [COMPLETE INTERFACE]
}

export interface UserCreateDTO {
  // [FOR CREATING NEW USERS]
}

export interface UserUpdateDTO {
  // [FOR UPDATING USERS]
}

// [REPEAT FOR ALL COLLECTIONS]

// API Response Types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  errorCode?: string;
}

// Evaluation Types (for AI analysis)
export interface GrammarEvaluation {
  errors: Array<{
    type: string;
    text: string;
    suggestion: string;
  }>;
  score: number; // 0-100
}

export interface VocabularyEvaluation {
  wordsUsed: string[];
  cefrLevel: CEFRLevel;
  complexity: number; // 0-100
}

export interface AIEvaluation {
  grammar: GrammarEvaluation;
  vocabulary: VocabularyEvaluation;
  confidence: number; // 1-10
  speakingFluency?: number; // 0-100, for audio
  recommendations: string[];
}
```

**Additionally create:**

src/models/validation.ts:
```typescript
// Joi validation schemas for each model
// Used to validate API inputs
```

src/models/factories.ts:
```typescript
// Factory functions for creating test data
// Useful for tests
```

**Deliverables:**
1. Complete TypeScript interfaces
2. DTO types for create/update operations
3. Validation schemas
4. Factory functions for testing

**Testing:**
- TypeScript compilation should pass
- Types should match Directus schema
- Validation schemas should catch invalid data

DO NOT BE LAZY. Create complete interfaces with JSDoc comments.
```

### 👨‍💻 Human Review Checklist

```
Claude, review the TypeScript models:

[Paste models/index.ts]

Checks:
1. Do interfaces match Directus schema exactly?
2. Are DTO types properly defined?
3. Are validation schemas comprehensive?
4. Is JSDoc documentation clear?
5. Are all necessary types exported?
```

---

## Task 1.4: Database Helper Functions

### 📋 Cline Prompt

```
# Task: Create Database CRUD Helper Functions

**Objective:** Build reusable functions for database operations.

**Context:**
- These will be used by API routes and services
- Must handle errors gracefully
- Should include logging
- Must be type-safe

**Requirements:**

Create src/services/db/users.ts:
```typescript
/**
 * @file services/db/users.ts
 * @description User-related database operations
 * @author Cline
 * @created [date]
 */

import { User, UserCreateDTO, UserUpdateDTO } from '../../models';

/**
 * Create a new user (anonymous session)
 * 
 * @returns Created user with generated session_id
 * @throws DatabaseError if creation fails
 */
export async function createUser(): Promise<User> {
  // Generate unique session_id
  // Create user in Directus
  // Return created user
  // [FULL IMPLEMENTATION]
}

/**
 * Find user by session ID
 * 
 * @param sessionId - User's anonymous session identifier
 * @returns User if found, null otherwise
 */
export async function findUserBySessionId(sessionId: string): Promise<User | null> {
  // [FULL IMPLEMENTATION]
}

/**
 * Update user's last_active timestamp
 * 
 * @param userId - User ID to update
 */
export async function updateLastActive(userId: string): Promise<void> {
  // [FULL IMPLEMENTATION]
}

// [ADD MORE FUNCTIONS AS NEEDED]
```

**Create similar files for:**
- src/services/db/profiles.ts (learning profiles)
- src/services/db/conversations.ts (conversation logs)
- src/services/db/assessments.ts (skill assessments)
- src/services/db/lessons.ts (lesson history)
- src/services/db/achievements.ts (badges)

**Each file should have:**
- Create function
- Find by ID function
- Find by user ID function
- Update function
- Delete function (if needed)
- List/query functions
- Proper error handling
- Logging (using winston)
- JSDoc documentation
- Type safety

**Error Handling Pattern:**
```typescript
export class DatabaseError extends Error {
  constructor(
    message: string,
    public code: string,
    public originalError?: any
  ) {
    super(message);
    this.name = 'DatabaseError';
  }
}

// Usage:
try {
  // database operation
} catch (error) {
  logger.error('Failed to create user', { error });
  throw new DatabaseError(
    'Could not create user',
    'USER_CREATE_FAILED',
    error
  );
}
```

**Testing:**
Create tests/integration/database.test.ts:
```typescript
describe('Database Helper Functions', () => {
  describe('Users', () => {
    it('should create a new user with session ID', async () => {
      // Test implementation
    });
    
    it('should find user by session ID', async () => {
      // Test implementation
    });
    
    // [MORE TESTS]
  });
  
  // [TESTS FOR ALL COLLECTIONS]
});
```

**Deliverables:**
1. Helper functions for all 6 collections
2. Error classes defined
3. Logging integrated
4. Integration tests passing

**Pre-completion checklist:**
- [ ] All CRUD operations implemented
- [ ] Error handling is comprehensive
- [ ] Tests pass (>80% coverage)
- [ ] Code has detailed comments
- [ ] Confidence ≥ 8

DO NOT BE LAZY. Write complete functions with error handling.
```

### 👨‍💻 Human Review Checklist

```
Claude, review the database helper functions:

[Paste sample functions from each file]
[Paste test results]

Checks:
1. Are all CRUD operations properly implemented?
2. Is error handling consistent and comprehensive?
3. Are types correctly used?
4. Is logging appropriate?
5. Do the tests cover main use cases?
6. Are edge cases handled?

Integration test:
Run the test suite and share results.
```

---

## ✅ Phase 1 Completion Criteria

**Before proceeding to Phase 2:**

- [x] Directus connected and working
- [x] All 6 collections created with proper schema
- [x] TypeScript interfaces match database
- [x] CRUD helper functions implemented and tested
- [x] Integration tests passing
- [x] **Human review approved all Phase 1 work**

**Deliverable Checkpoint:**
```typescript
// Should be able to run this successfully:
const user = await createUser();
const profile = await createLearningProfile(user.id, {
  goals: "Improve business English",
  current_level: "A2"
});
const conversation = await logConversation(user.id, {
  message_type: "user_text",
  content: "Hello, teacher!"
});
```

---

# [CONTINUE IN NEXT MESSAGE DUE TO LENGTH]

**Remaining Phases to Document:**
- Phase 2: Core API Endpoints (8 endpoints)
- Phase 3: AI Orchestration (n8n workflows)
- Phase 4: RAG Memory System (Qdrant + embeddings)
- Phase 5: Testing & Integration
- Appendix: Quick Reference Prompts

# Development Roadmap - Updated for Adaptive System

**Version 2.0** - Based on Product Owner Feedback  
**Date:** November 2, 2025

---

## 🎉 What Changed?

### From: Basic Chat + Activities
**Old Vision:**
- Generic chat history
- Activities as separate feature
- Simple progress tracking

### To: Adaptive Learning Management System
**New Vision:**
- Main Feed (lobby) vs Lesson Threads (classrooms)
- Agentic AI routing (JSON + conversation)
- One language point + one skill per lesson
- Multi-attempt activities with building feedback
- Transparent progress with drill-down (see which lessons contributed which points)
- Continuous learner model adaptation

---

## 📊 Revised Phase Structure

### Phase 0: Foundation Setup [Week 1]
**No changes** - Still need project structure, env, docs

### Phase 1: Database Layer [Week 1-2] ⚠️ REVISED
**What changed:**
- 11 tables instead of 6
- New: lesson_configs (ephemeral drafts)
- New: skill_contributions (drill-down data)
- New: learner_model (AI-observed patterns)
- Updated: lessons table (one active per user constraint)
- Updated: conversation_logs → split into main_feed_messages + lesson_messages

**Tasks:**
1.1 Directus connection (unchanged)
1.2 Create collections (NEW schema)
1.3 TypeScript models (NEW interfaces)
1.4 CRUD helpers (NEW tables)

**Critical:** Review new schema carefully before implementation

---

### Phase 2: Main Feed & Routing [Week 2-3] 🆕 NEW PHASE
**Purpose:** Build the "lobby" experience + intelligent routing

**Tasks:**
2.1 Main Feed Message Handler
- POST /api/main-feed/message
- AI classifier (conversation vs lesson proposal)
- Archive messages to Qdrant
- Return JSON routing + conversational response

2.2 Lesson Config Draft System
- POST /api/lessons/draft (create ephemeral config)
- PATCH /api/lessons/draft/:id (refine via conversation)
- Lesson config evolves silently as user refines
- AI offers fixed choices when helpful

2.3 Lesson Solidifier
- POST /api/lessons/draft/:id/confirm (Start Lesson button)
- Build comprehensive system instructions
- Create lesson record in DB
- Transition to lesson view

**Key Innovation:** AI decides routing strategy based on user intent

---

### Phase 3: Focused Lesson System [Week 3-4] 🆕 REVISED
**Purpose:** Build the "classroom" experience with custom instructions

**Tasks:**
3.1 Lesson Message Handler
- POST /api/lessons/:id/message
- Load lesson context (system instructions + history)
- AI responds within lesson focus
- Gently redirect if user deviates from language point

3.2 Activity System
- POST /api/lessons/:id/activity (generate)
- POST /api/lessons/:id/activity/:activityId/attempt (submit)
- POST /api/lessons/:id/activity/:activityId/regenerate (variation)
- Multiple attempts with building feedback

3.3 Lesson Evaluation
- POST /api/lessons/:id/complete
- AI comprehensive analysis
- Calculate skill point contributions with reasoning
- Update learner model
- Store in lesson_evaluations + skill_contributions

**Key Innovation:** Restrictive learning objectives + transparent attribution

---

### Phase 4: Progress & Learner Model [Week 5-6] 🆕 NEW PHASE
**Purpose:** Transparent progress + continuous adaptation

**Tasks:**
4.1 Progress Dashboard
- GET /api/progress (overall view)
- GET /api/progress/:skill/breakdown (drill down)
- Show contributing lessons with points + reasoning
- Graphs and visualizations

4.2 Lesson History (LMS View)
- GET /api/lessons/history
- Card/list layout
- Filter by status, skill, topic
- Click to review or continue

4.3 Learner Model System
- Background AI analysis after key events
- Update patterns, errors, confidence, recommendations
- Influence system instructions for future lessons
- GET /api/learner-model (view current model)

**Key Innovation:** User sees exactly why they progressed

---

### Phase 5: n8n AI Orchestration [Week 6-7] 🔴 CRITICAL
**Purpose:** Build the AI workflows that power everything

**Workflows to Build:**
1. Main Feed Handler (routing intelligence)
2. Lesson Config Refiner (update draft)
3. Lesson Solidifier (create final lesson)
4. Lesson Message Handler (focused responses)
5. Activity Generator (create practice)
6. Activity Evaluator (grade + feedback building)
7. Lesson Evaluator (comprehensive analysis)
8. Learner Model Updater (background analysis)

**Key Innovation:** Agentic AI that decides best interaction pattern

---

### Phase 6: RAG Memory System [Week 7-8] 🔴 CRITICAL
**Purpose:** Long-term memory for personalization

**Tasks:**
6.1 Qdrant Setup
- Connection and collections
- Separate collections for main feed vs lessons

6.2 Embedding Strategy
- Main feed messages (archived for reference)
- Lesson-specific memory (contextual retrieval)
- OpenAI embeddings

6.3 Retrieval Logic
- Relevant context for AI responses
- Lesson-specific memory recall
- User pattern recognition

**Key Innovation:** AI remembers journey without boring the user

---

### Phase 7: Testing & Polish [Week 8] 🟣
**Purpose:** Quality assurance and refinement

**Tasks:**
7.1 End-to-end testing
- Main feed → lesson config → lesson → evaluation flow
- Multiple attempts on activities
- Progress drill-down accuracy

7.2 Frontend integration
- Update UI for two-context system
- Implement lesson history view
- Progress drill-down interface

7.3 Performance optimization
- AI response latency
- Database query optimization
- Caching strategies

---

## 🎯 Updated Milestone Timeline

```
Week 1: Phase 0 + Start Phase 1 (database foundation)
Week 2: Finish Phase 1 + Start Phase 2 (main feed routing)
Week 3: Finish Phase 2 + Start Phase 3 (focused lessons)
Week 4: Finish Phase 3 + Start Phase 4 (progress system)
Week 5: Finish Phase 4 + Start Phase 5 (n8n workflows)
Week 6: Continue Phase 5 (complex workflows)
Week 7: Finish Phase 5 + Start Phase 6 (RAG memory)
Week 8: Finish Phase 6 + Phase 7 (testing & polish)

MVP Demo Ready: End of Week 8
```

---

## ⚠️ Breaking Changes from Original Plan

### Database
- **6 tables → 11 tables**
- Conversation logs split into two contexts
- New ephemeral config system
- Progress tracking much more granular

### API
- **8 endpoints → 17 endpoints**
- New main feed routing
- Lesson draft lifecycle endpoints
- Progress drill-down endpoints

### AI Orchestration
- **4 workflows → 8 workflows**
- Intelligent routing added
- Building feedback system
- Continuous learner model updates

### Frontend
- **One chat view → Two contexts**
- Lesson history (LMS-style) required
- Progress drill-down interface required
- Activity attempts UI needs expansion

---

## 🚀 Next Steps

1. **Review architecture-overview.md** - Understand new system
2. **Review database schema details** - Complex changes
3. **Update Cline custom instructions** - If needed for new complexity
4. **Start Phase 1.2** - Create new database schema

---

## 💡 Why These Changes Make It Better

### User Experience
- Natural onboarding (no boring tests)
- Clear learning focus (one point at a time)
- Transparent progress (see exactly why you improved)
- Iterative practice (try again, see improvement)
- Adaptive system (AI learns your patterns)

### Pedagogical Value
- Restrictive objectives enable proper evaluation
- Multiple attempts encourage growth mindset
- Detailed reasoning builds metacognition
- Continuous adaptation personalizes journey

### Technical Innovation
- Agentic AI routing (smart decision-making)
- Two-context system (lobby vs classroom)
- Transparent attribution (drill-down progress)
- Continuous adaptation (learner model)

**This is now a genuinely innovative product, not just a chat bot with activities!** 🎉

---

**Ready to build the future of language learning!** 🚀