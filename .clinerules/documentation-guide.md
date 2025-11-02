# Documentation Navigation Guide

> **Place this in `.clinerules/documentation-guide.md`**
>
> This guide helps AI assistants find information quickly without reading entire documentation files.

---

## Purpose

**Problem**: Reading all documentation wastes context window tokens.

**Solution**: This guide provides targeted lookups - telling the AI exactly which section of which document to read for specific tasks.

---

## How to Use This Guide

### For AI Assistants

Before implementing a feature:
1. Look up the task type in this guide
2. Read ONLY the listed sections
3. Proceed with implementation

**Don't:**
- Read all documentation upfront
- Re-read sections you just read
- Read entire files when you need one section

**Do:**
- Use this guide to find relevant sections
- Read just-in-time (when implementing, not before)
- Focus on task-relevant information

### For Humans

When you find yourself repeatedly referencing the same docs for similar tasks, add a lookup entry here.

---

## Quick Lookups by Task Type

### Architecture & Structure

**When**: Starting new major feature, understanding system design

**Read**:
- `docs/ARCHITECTURE.md` → "System Overview" section (~400 words)
- `docs/ARCHITECTURE.md` → "Core Principles" section (~300 words)

**Token savings**: ~2,000 words vs. reading full architecture doc

---

### Security Implementation

**When**: Implementing authentication, authorization, or handling sensitive data

**Read**:
1. `docs/SECURITY.md` → "Security Model" section (~500 words)
2. `docs/SECURITY.md` → "Best Practices" section (~300 words)
3. `docs/ARCHITECTURE.md` → "Security Layers" section (~200 words)

**Skip**: Security testing section (unless writing tests)

**Token savings**: ~1,500 words

---

### API Endpoints

**When**: Creating new REST/GraphQL endpoints

**Read**:
1. `docs/API.md` → "Endpoint Patterns" section (~300 words)
2. `docs/API.md` → "Authentication" section (~200 words)
3. `docs/API.md` → "Error Handling" section (~150 words)

**Then** (if needed):
4. `docs/EXAMPLES.md` → Find similar endpoint example

**Token savings**: ~1,200 words vs. reading full API docs

---

### Database/Data Layer

**When**: Working with database models, migrations, or queries

**Read**:
1. `docs/DATABASE.md` → "Schema Design" section (~400 words)
2. `docs/DATABASE.md` → "Query Patterns" section (~300 words)
3. `docs/ARCHITECTURE.md` → "Data Flow" section (~250 words)

**Token savings**: ~1,000 words

---

### State Management

**When**: Implementing state management, global state, or context

**Read**:
1. `docs/STATE_MANAGEMENT.md` → "Architecture" section (~300 words)
2. `docs/STATE_MANAGEMENT.md` → "Patterns" section (~400 words)
3. `docs/EXAMPLES.md` → "State Example" (~200 words)

**Token savings**: ~800 words

---

### Component Creation

**When**: Building new React/Vue/etc. components

**Read**:
1. `docs/COMPONENTS.md` → "Component Structure" section (~250 words)
2. `docs/COMPONENTS.md` → "Styling Guidelines" section (~200 words)
3. `.clinerules` → "Code Style & Patterns" section

**Then** (if complex):
4. `docs/EXAMPLES.md` → Find similar component

**Token savings**: ~1,500 words vs. reading all component docs

---

### Testing

**When**: Writing tests (unit, integration, or E2E)

**Read**:
1. `docs/TESTING.md` → "Test Structure" section (~300 words)
2. `docs/TESTING.md` → "Testing Patterns" section (~400 words)
3. `docs/EXAMPLES.md` → Find similar test

**Token savings**: ~1,000 words

---

### Performance Optimization

**When**: Optimizing slow code or implementing performance-critical features

**Read**:
1. `docs/PERFORMANCE.md` → "Optimization Strategies" (~400 words)
2. `docs/PERFORMANCE.md` → "Benchmarking" section (~300 words)
3. `.clinerules/implementation-standards.md` → "Performance Benchmarking"

**Token savings**: ~800 words

---

### Error Handling

**When**: Implementing error handling or creating custom errors

**Read**:
1. `docs/ERROR_HANDLING.md` → "Error Types" section (~250 words)
2. `docs/ERROR_HANDLING.md` → "Error Patterns" section (~300 words)
3. `docs/EXAMPLES.md` → Error handling example

**Token savings**: ~600 words

---

### Deployment & DevOps

**When**: Working on CI/CD, deployment, or infrastructure

**Read**:
1. `docs/DEPLOYMENT.md` → "Deployment Process" section (~400 words)
2. `docs/DEPLOYMENT.md` → "Environment Config" section (~300 words)

**Token savings**: ~1,200 words

---

## Task-Specific Workflows

### Example: Adding User Authentication

**Step 1**: Read Security docs
- `docs/SECURITY.md` → "Authentication" section (~300 words)

**Step 2**: Read API patterns
- `docs/API.md` → "Authentication Endpoints" (~200 words)

**Step 3**: Check database schema
- `docs/DATABASE.md` → "User Schema" (~150 words)

**Step 4**: Review example
- `docs/EXAMPLES.md` → "Auth Example" (~200 words)

**Total**: ~850 words
**Saved**: ~3,000 words vs. reading all related docs

---

### Example: Creating a New Component

**Step 1**: Component structure
- `docs/COMPONENTS.md` → "Structure" section (~200 words)

**Step 2**: Styling guidelines
- `docs/COMPONENTS.md` → "Styling" section (~150 words)

**Step 3**: State management (if needed)
- `docs/STATE_MANAGEMENT.md` → "Component State" (~200 words)

**Step 4**: Similar example (if complex)
- `docs/EXAMPLES.md` → Find relevant component

**Total**: ~550-750 words
**Saved**: ~2,000 words

---

### Example: Database Migration

**Step 1**: Migration process
- `docs/DATABASE.md` → "Migrations" section (~300 words)

**Step 2**: Schema patterns
- `docs/DATABASE.md` → "Schema Design" (~200 words)

**Step 3**: Testing migrations
- `docs/TESTING.md` → "Database Tests" (~150 words)

**Total**: ~650 words
**Saved**: ~1,500 words

---

## Document Index

Quick reference of what's in each doc:

### `docs/ARCHITECTURE.md`
- System Overview
- Core Principles  
- Layer Separation
- Security Layers
- Data Flow
- Plugin Architecture (if applicable)

### `docs/SECURITY.md`
- Security Model
- Authentication
- Authorization
- Input Validation
- Best Practices
- Security Testing

### `docs/API.md`
- Endpoint Patterns
- Authentication
- Request/Response Format
- Error Handling
- Rate Limiting
- Versioning

### `docs/DATABASE.md`
- Schema Design
- Migrations
- Query Patterns
- Performance
- Relationships

### `docs/TESTING.md`
- Test Structure
- Testing Patterns
- Coverage Requirements
- Test Types (Unit/Integration/E2E)
- Mocking

### `docs/COMPONENTS.md`
- Component Structure
- Styling Guidelines
- Props Patterns
- Lifecycle
- Best Practices

### `docs/STATE_MANAGEMENT.md`
- Architecture
- Patterns
- Global State
- Component State
- Side Effects

### `docs/EXAMPLES.md`
- Code Examples
- Common Patterns
- Complete Implementations

---

## When to Read FULL Documentation

**Read entire document when:**
- First time working on the project (one-time orientation)
- Making major architectural changes
- Document is short (<500 words)
- You need comprehensive understanding of a system

**Otherwise**: Use this guide for targeted reading.

---

## Updating This Guide

**Add entries when:**
- You repeatedly reference the same section
- New documentation is added
- Common tasks emerge
- Team members ask "where do I find X?"

**Template for new entry:**

```markdown
### [Task Name]

**When**: [When this task is performed]

**Read**:
1. `docs/FILE.md` → "[Section]" (~X words)
2. `docs/FILE2.md` → "[Section]" (~X words)

**Token savings**: ~X words
```

---

## Tips for Efficient Documentation

### For Writers

When creating new documentation:
1. Use clear section headers
2. Keep sections focused (200-500 words)
3. Add to this guide when you create new docs
4. Think about how it will be looked up

### For Readers (AI)

When using this guide:
1. Trust the guide - don't read extra sections "just in case"
2. If you need more info, ask the human
3. Update the guide if you find better lookup patterns

---

## Context Window Budget

**Typical documentation sizes:**
- Full architecture doc: ~3,000-5,000 words
- Full API doc: ~2,000-3,000 words
- Full security doc: ~2,000-3,000 words

**Total if reading everything**: ~10,000+ words

**Using this guide**: ~500-1,000 words per task

**Savings**: 90% reduction in documentation reading

---

## Examples of Good vs Bad

### ❌ Bad: Reading Everything

```
Human: "Add a new API endpoint for user profile"

AI: Let me read all the documentation first...
[reads ARCHITECTURE.md - 3,000 words]
[reads API.md - 2,500 words]
[reads SECURITY.md - 2,000 words]
[reads DATABASE.md - 1,500 words]

Total: 9,000 words read
Time: 5 minutes reading
```

### ✅ Good: Using This Guide

```
Human: "Add a new API endpoint for user profile"

AI: I'll look up API endpoints in the documentation guide...
[reads API.md → "Endpoint Patterns" - 300 words]
[reads API.md → "Authentication" - 200 words]
[reads EXAMPLES.md → "Similar endpoint" - 150 words]

Total: 650 words read
Time: 30 seconds reading
```

**Result**: 93% fewer words, 90% faster, same quality output.

---

## Remember

**"Read less, understand more."**

The goal is not to read all documentation. The goal is to read the RIGHT documentation for the current task.

This guide helps you find exactly what you need, when you need it.

---

**Last Updated**: [YYYY-MM-DD]
**Maintained By**: [Your Name/Team]
**Version**: 1.0

---

## Appendix: Creating Your First Entries

### Step 1: Identify Common Tasks

List the 5-10 most common development tasks in your project:
1. Adding API endpoints
2. Creating components
3. Database migrations
4. Adding tests
5. ...

### Step 2: Map to Documentation

For each task, identify:
- Which docs are relevant
- Which sections are needed
- What can be skipped

### Step 3: Create Lookup Entries

Use the template above to create entries for each common task.

### Step 4: Test and Refine

As you use the guide:
- Note what sections you still need to read
- Add those to the entry
- Remove sections that weren't helpful

### Step 5: Share with Team

Once you have good coverage of common tasks, share with your team and get feedback.