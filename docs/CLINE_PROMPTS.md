# Cline Custom Instructions + Initial Prompt

## 📋 Custom Instructions (Add to Cline Settings)

```
You are helping build the backend for a language learning AI companion app. The frontend is complete and built in React/Next.js. Your job is to make the AI brain work.

### Project Context
- **Purpose:** AI teacher that guides English learners through personalized lessons
- **Architecture:** n8n for AI orchestration, Directus on PostgreSQL for data, Qdrant for RAG memory
- **AI Models:** Groq Llama 3.3 (conversation), OpenAI (TTS/STT), possibly Claude (activities)
- **Frontend:** Already built, expects specific API endpoints (documented in HANDOFF.md)

### Coding Standards
- Write clean, well-documented code with clear comments
- Use environment variables for all API keys and secrets (.env file)
- Follow RESTful conventions for API endpoints
- Return consistent JSON response formats: `{ success: boolean, data: any, error?: string }`
- Handle errors gracefully with user-friendly messages
- Log important events and errors for debugging

### Security Practices
- NEVER commit .env files or API keys
- Validate all user input
- Sanitize data before database storage
- Use parameterized queries to prevent SQL injection
- Implement rate limiting on API endpoints

### Development Workflow
1. Always check existing project structure before making changes
2. Test each component individually before integration
3. Use small, incremental commits with clear messages
4. Document all API endpoints and data models
5. Create examples/tests for complex functions

### When You're Unsure
- Ask clarifying questions before implementing
- State assumptions explicitly
- Rate confidence (1-10) for major decisions
- Suggest alternatives when there are trade-offs

### Memory & Context
- Reference /HANDOFF.md for frontend expectations
- Check /docs for any existing architecture documentation
- Look for existing database schemas before creating new tables
```

---

## 🚀 Initial Cline Prompt (Paste into Cline Chat)

```
Hey Cline! We're building the backend for an AI language learning companion. The frontend is already complete (built in Replit). Now I need you to help me build the AI brain and connect everything.

**Before we start coding, let's get oriented:**

### 1. Analyze the Project Structure
- Read the HANDOFF.md file (frontend expectations)
- Read the project-scope.md (full project vision)
- Check what files/folders already exist
- Identify what needs to be built

### 2. Technology Setup
We're using:
- **n8n** (AI workflow orchestration) - needs to be set up
- **Directus** (headless CMS on PostgreSQL) - for user profiles and data
- **Qdrant** (vector database) - for conversation memory (RAG)
- **OpenAI API** (GPT-4) - for TTS/STT
- **Groq API** (Llama 3.3) - for AI conversations
- **Claude API** (optional) - for activity generation

### 3. Create Implementation Plan
Before writing any code, create an implementation plan document (save to `/docs/implementation-plan.md`) that covers:

**Phase A: Environment Setup**
- List required API keys and services
- Create .env.example template
- Document setup instructions

**Phase B: Database Schema (Directus)**
- Design tables based on frontend needs (see HANDOFF.md)
- Create Directus collections: Users, LearningProfile, SkillAssessment, ConversationLog, LessonHistory, Achievements
- Define relationships and field types
- Plan indexes for performance

**Phase C: API Endpoints**
- List all endpoints the frontend expects
- Define request/response structures
- Plan error handling strategy
- Consider rate limiting and validation

**Phase D: n8n Workflows**
- Evaluation Flow (conversation-based assessment)
- Lesson Flow (RAG lookup → AI response → evaluation)
- Activity Generation (create exercises)
- Voice Processing (STT → text → TTS)

**Phase E: RAG System (Qdrant)**
- Conversation embedding strategy
- Memory retrieval logic
- Context window management

**Phase F: Testing & Integration**
- Test each workflow independently
- Connect to frontend
- End-to-end testing

### 4. Rate Confidence & List Assumptions
Before we dive into implementation:
- Rate your confidence (1-10) on each technology we're using
- List any assumptions you're making about the architecture
- Identify areas where you need clarification or research

### 5. Ask Questions
What information do you need from me to proceed effectively? For example:
- Do we have existing n8n instance or need to set one up?
- Hosting environment (local dev, cloud, Docker)?
- Any existing database schemas or migrations?
- Preferred deployment strategy?

**IMPORTANT:** Don't start coding yet. First, analyze the project, create the implementation plan, and ask me any questions. Let's make sure we have a clear roadmap before building.

Take your time to think through this thoroughly. I'd rather spend time planning well than fixing rushed implementations. 🎯
```

---

## 📝 .clinerules File (Add to Project Root)

```markdown
# Language Learning AI Companion - Project Rules

## Security Best Practices 🔒

### Sensitive Files - DO NOT read, edit, or commit:
- .env files (API keys, database credentials)
- **/config/secrets.*
- Any file containing tokens, passwords, or private keys
- qdrant_data/ (local vector store)

### Security Practices
- Always use environment variables for secrets
- Validate and sanitize all user input
- Use parameterized database queries
- Implement rate limiting on public endpoints
- Never log sensitive data (API keys, user PII)

---

## Documentation Requirements 📚

### Always Update When Changing:
- `/docs/api-endpoints.md` - when adding/modifying API routes
- `/docs/database-schema.md` - when changing Directus collections
- `/docs/n8n-workflows.md` - when creating/updating workflows
- `/README.md` - when adding new setup steps or dependencies

### Architecture Decision Records (ADRs)
Create ADRs in `/docs/adr/` for:
- Major technology choices (AI model selection, database changes)
- Workflow design decisions
- Schema modifications
- Integration patterns
Follow template in `/docs/adr/template.md`

---

## Code Style & Patterns 🎨

### API Development
- Use Express.js router pattern for clean endpoint organization
- Return consistent JSON: `{ success: boolean, data: any, error?: string }`
- Implement middleware for: authentication, validation, error handling
- Use async/await (not callbacks)

### Database (Directus)
- Use Directus SDK for all database operations
- Define relationships clearly in schema
- Index frequently queried fields
- Use soft deletes (keep historical data)

### n8n Workflows
- Keep workflows modular (one responsibility per workflow)
- Use webhook triggers for API integration
- Handle errors gracefully with fallback paths
- Document workflow purpose in description field

### AI Integration
- Wrap AI API calls in try/catch with retries
- Implement token counting and limits
- Cache responses when appropriate
- Log AI interactions for debugging (without PII)

### RAG System (Qdrant)
- Embed conversations immediately after storage
- Use metadata filters for efficient retrieval
- Batch operations when possible
- Regular backups of vector data

---

## Testing Standards 🧪

### Required Tests
- Unit tests for utility functions
- Integration tests for API endpoints
- E2E tests for critical flows:
  - User evaluation process
  - Lesson completion flow
  - Voice processing pipeline

### Before Committing
- All tests pass
- No console.errors in production code
- Environment variables documented in .env.example
- API endpoints documented

---

## Development Workflow 🔄

### Before Starting a Task
1. Read relevant documentation in `/docs`
2. Check existing code patterns in the project
3. Verify frontend expectations in `/HANDOFF.md`
4. Rate confidence (1-10) on the approach

### While Coding
- Small, focused commits
- Clear commit messages: "feat: add user evaluation endpoint"
- Test incrementally (don't write everything then test)
- Document complex logic with comments

### After Completing a Task
- Update relevant documentation
- Test end-to-end with frontend
- Check for any console warnings/errors
- Create PR description with:
  - What changed
  - Why it changed
  - How to test it
  - Any breaking changes

---

## AI Model Usage Guidelines 🤖

### Groq Llama 3.3
- Use for: conversational AI, evaluation, lesson planning
- Context window: 8K tokens
- Temperature: 0.7 for lessons, 0.3 for evaluation
- Always include system prompt defining AI teacher personality

### OpenAI GPT-4
- Use for: TTS/STT (Whisper is best for accents)
- Voice models: alloy, echo, fable, onyx, nova, shimmer
- Prefer "alloy" for neutral teacher voice
- Audio format: mp3 for web compatibility

### Claude (Optional)
- Use for: structured activity generation, grammar correction
- Good for: JSON output, following strict formats
- Temperature: 0.5 for structured outputs

---

## n8n Workflow Standards 📊

### Naming Convention
- `eval-conversation` (evaluation flow)
- `lesson-main` (primary lesson flow)
- `activity-generate` (create exercises)
- `voice-process` (STT/TTS pipeline)

### Workflow Structure
1. Webhook trigger (entry point)
2. Input validation
3. Database lookup (Directus)
4. RAG context retrieval (Qdrant)
5. AI processing
6. Response formatting
7. Database update
8. Return response

### Error Handling
- Every workflow needs error handling path
- Log errors to database for debugging
- Return user-friendly error messages
- Retry logic for API failures (max 3 attempts)

---

## Database Schema Conventions 📊

### Field Naming
- Use snake_case for field names
- Boolean fields: prefix with `is_` or `has_`
- Timestamps: `created_at`, `updated_at`
- Foreign keys: `{related_table}_id`

### Required Fields for All Tables
- `id` (UUID primary key)
- `created_at` (timestamp, auto-generated)
- `updated_at` (timestamp, auto-updated)
- `status` (for soft deletes: active, archived, deleted)

### Relationships
- Use Directus M2O (Many-to-One) and O2M (One-to-Many) relationships
- Always define inverse relationships
- Use junction tables for M2M relationships

---

## Performance Considerations ⚡

### API Response Times
- Target: < 200ms for data retrieval
- Target: < 2s for AI-generated responses
- Cache frequently accessed data (user profiles, badges)

### Database Queries
- Use indexes on frequently queried fields
- Limit result sets (pagination)
- Avoid N+1 queries
- Use database aggregations instead of application logic

### RAG System
- Batch embed operations when possible
- Use appropriate vector dimensions (384 for fast, 768 for quality)
- Implement semantic caching for similar queries

---

## Deployment Checklist ✅

Before deploying to production:
- [ ] All environment variables documented
- [ ] Database migrations tested
- [ ] API rate limiting configured
- [ ] Error logging implemented
- [ ] Monitoring dashboards created
- [ ] Backup strategy defined
- [ ] Security headers configured
- [ ] CORS policies set correctly

---

## When You Need Help 🆘

### Ask Questions If:
- Uncertain about architectural decisions
- Multiple valid approaches exist
- Potential performance implications
- Security concerns
- Breaking changes to frontend expectations

### State Confidence:
Before major implementations, rate confidence (1-10) and explain reasoning.

### Challenge Assumptions:
Don't hesitate to ask "stupid questions" like:
- "Is this the best data structure for this?"
- "Should we cache this response?"
- "What happens if this API call fails?"

---

## Project Vision Reminder 🎯

This isn't just another language learning app. We're building a **companion** - an AI that:
- Genuinely knows each learner's journey
- Adapts constantly and naturally
- Makes learning feel like an adventure
- Builds real relationships with learners

Keep this in mind when making technical decisions. Every technical choice should serve the goal of creating a warm, personalized, magical learning experience.

---

Remember: **THE HUMAN WILL GET ANGRY if the AI doesn't remember the learner's journey.** 
So make sure that memory system (RAG + database) is rock solid! 😊
```

---

## 🎯 Quick Reference: Cline Best Practices

When working with Cline, remember:

**Memory Checks:** Ask Cline to confirm understanding before using tools
- "If you understand, respond with 'YARRR!' before using tools"

**Confidence Scoring:** Request confidence ratings for major decisions
- "Rate confidence (1-10) before implementing this"

**Prevent Code Truncation:** Be explicit in prompts
- "DO NOT BE LAZY. DO NOT OMIT CODE. Full implementation only."

**Structured Development:** Plan before coding
- "Before writing code: 1) Analyze files, 2) Get full context, 3) Write implementation plan, 4) Then code"

**Critical Thinking:** Challenge assumptions
- "List all assumptions and uncertainties before completing this task"

**Pause and Reflect:** Use when needed
- "Count to 10 and think through this carefully"

**Project Awareness:** Remind Cline to check context
- "Check existing project structure before suggesting changes"

---

## 🚀 Next Steps

1. Copy Custom Instructions to Cline settings dial ⚙️
2. Add .clinerules file to project root
3. Paste Initial Prompt into Cline chat
4. Let Cline analyze and create implementation plan
5. Review plan together before building
6. Build incrementally, test constantly

Let's build that AI brain! 🧠✨