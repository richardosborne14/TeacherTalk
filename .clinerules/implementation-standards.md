# Implementation Standards

> **Place this in `.clinerules/implementation-standards.md`**

**Philosophy: Quality over Speed. Documentation over Code. Understanding over Output.**

---

## Table of Contents

1. [Philosophy](#philosophy)
2. [Mandatory Code Documentation](#mandatory-code-documentation)
3. [Code Comment Standards](#code-comment-standards)
4. [Task Documentation Standards](#task-documentation-standards)
5. [Confidence Rating System](#confidence-rating-system)
6. [Performance Benchmarking](#performance-benchmarking)
7. [Testing Documentation](#testing-documentation)
8. [Human Review Process](#human-review-process)
9. [Pre-Completion Checklist](#pre-completion-checklist)
10. [Enforcement Rules](#enforcement-rules)

---

## Philosophy

This project is a complex system that will evolve over years. Every line of code must be:

1. **Self-explanatory** through comments
2. **Well-documented** in external docs
3. **Tracked** with decision rationale
4. **Reviewable** by humans who weren't present during creation

**Core Principle**: Future developers (including your future self) should be able to understand WHY every decision was made, not just WHAT was implemented.

---

## Mandatory Code Documentation

### File-Level Documentation

**EVERY source file MUST start with this header:**

```typescript
/**
 * @file [FileName].ts
 * @description [Clear, concise description of file's purpose and role in system]
 *              [Can span multiple lines to explain context]
 * 
 * @architecture Phase [N], Task [N.N] - [Task Name]
 * @created [YYYY-MM-DD]
 * @author AI (Cline) + Human Review
 * @confidence [X/10] - [Brief reason for confidence level]
 * 
 * @see [docs/relevant-doc.md] - [Specific section]
 * @see [.implementation/phase-X/task-X.Y.md] - Implementation details
 * 
 * @security-critical [true/false]
 * @performance-critical [true/false] - [Why this matters]
 */
```

**Example:**

```typescript
/**
 * @file FileChangeTracker.ts
 * @description Hash-based file change detection to prevent infinite loops between
 *              code generation and file watching. Critical for system stability.
 * 
 * @architecture Phase 0, Task 0.1 - File Watcher Foundation
 * @created 2025-10-25
 * @author AI (Cline) + Human Review
 * @confidence 9/10 - Extensively tested, minor edge cases on network drives
 * 
 * @see docs/ARCHITECTURE.md - Code Generation Loop Prevention
 * @see .implementation/phase-0-foundation/task-0.1-file-watcher.md
 * 
 * @security-critical false
 * @performance-critical true - Called on every file change event
 */
```

### Class-Level Documentation

**EVERY class MUST have comprehensive documentation:**

```typescript
/**
 * [Class purpose and responsibility]
 * 
 * PROBLEM SOLVED:
 * - [Explain the specific problem this class addresses]
 * - [Why existing solutions weren't sufficient]
 * 
 * SOLUTION:
 * - [How this class solves the problem]
 * - [Key design decisions]
 * 
 * USAGE EXAMPLE:
 * ```typescript
 * const tracker = new FileChangeTracker();
 * await tracker.onBeforeGenerate('file.ts', content);
 * // ... write file
 * await tracker.onAfterGenerate('file.ts');
 * ```
 * 
 * @class [ClassName]
 * @since [Version or Phase]
 */
class FileChangeTracker {
  // Implementation...
}
```

### Method-Level Documentation

**EVERY public method MUST be documented:**

```typescript
/**
 * [Brief description of what method does]
 * 
 * [Detailed explanation if needed]
 * 
 * ALGORITHM:
 * 1. [Step 1]
 * 2. [Step 2]
 * 3. [Step 3]
 * 
 * EDGE CASES:
 * - [Edge case 1 and how it's handled]
 * - [Edge case 2 and how it's handled]
 * 
 * @param [paramName] - [Description, including valid values/ranges]
 * @param [paramName2] - [Description]
 * @returns [Description of return value]
 * @throws {ErrorType} [When this error is thrown]
 * 
 * @example
 * ```typescript
 * const result = await method(param1, param2);
 * ```
 */
async function method(param1: Type1, param2: Type2): Promise<ReturnType> {
  // Implementation...
}
```

---

## Code Comment Standards

### Comment Density Target

**Goal: 1 comment per 3-5 lines of logic**

Not every line needs a comment, but complex logic should be well-explained.

### Comment Quality

**✅ GOOD Comments:**

```typescript
// Hash the file content to create a fingerprint we can compare later.
// This lets us detect if the file changed from what the tool generated.
const hash = crypto.createHash('sha256')
  .update(content)
  .digest('hex');

// Store the expected hash before writing. After write completes,
// file watcher will compare actual hash vs this expected hash.
this.generationHashes.set(filepath, hash);

// Pause change detection briefly to avoid detecting our own write.
// The file watcher will ignore events for this file during the pause.
this.pausedPaths.add(filepath);
```

**❌ BAD Comments:**

```typescript
// Create hash
const hash = crypto.createHash('sha256').update(content).digest('hex');

// Set hash
this.generationHashes.set(filepath, hash);

// Add to paused
this.pausedPaths.add(filepath);
```

**Why bad?** They just repeat what the code says without explaining WHY.

### When to Comment

**ALWAYS comment:**
- Complex algorithms or logic
- Non-obvious solutions to problems
- Workarounds for bugs or limitations
- Performance optimizations
- Security-critical code
- Edge case handling
- Business logic decisions

**DON'T comment:**
- Obvious code (e.g., `// set x to 5` above `x = 5`)
- Standard patterns (unless project-specific variation)
- Self-explanatory function calls

### Diagram Comments

For complex logic flows, include ASCII diagrams:

```typescript
/**
 * DECISION FLOW:
 * 
 *   File Changed Event
 *          |
 *          v
 *   Is file paused? ──YES──> Ignore (tool is writing)
 *          |
 *          NO
 *          v
 *   Compute actual hash
 *          |
 *          v
 *   Expected hash exists? ──NO──> Process (first time seeing file)
 *          |
 *          YES
 *          v
 *   Hashes match? ──YES──> Ignore (tool wrote exactly what we expected)
 *          |
 *          NO
 *          v
 *   Process as user edit
 */
```

---

## Task Documentation Standards

### Location

All task documentation goes in `.implementation/phase-X-name/task-X.Y-name.md`

### When to Update

Update task file after each milestone:
- Design decisions made
- Implementation completed
- Tests written
- Issues encountered and resolved
- Human review completed

**Don't update daily**, but do update after significant progress.

### Required Sections

1. **Task Overview**
   - Objective
   - Success criteria
   - References to relevant docs

2. **Milestones**
   - Each significant step
   - Confidence rating for each
   - Date completed

3. **Design Decisions**
   - Options considered
   - Choice made
   - Rationale for choice

4. **Implementation Notes**
   - Challenges encountered
   - Solutions implemented
   - Code locations (files/functions)

5. **Test Results**
   - Unit test count and status
   - Integration test results
   - Manual testing performed
   - Coverage percentage

6. **Human Review**
   - Reviewer name and date
   - Feedback received
   - Actions taken

7. **Lessons Learned**
   - What worked well
   - What didn't work
   - Reusable patterns discovered

### Milestone Template

Use `.implementation/templates/milestone-template.md` for structure:

```markdown
## Milestone: [Name]

**Date**: [YYYY-MM-DD]
**Duration**: [X hours]
**Confidence**: [X/10] - [Reason]

### Objective
[What you're trying to accomplish]

### Approach
[How you plan to accomplish it]

### Implementation
[What you actually did]

### Files Changed
- `path/to/file1.ts` - [What changed]
- `path/to/file2.ts` - [What changed]

### Challenges
1. **Challenge**: [Description]
   **Solution**: [How you solved it]

### Tests
- Unit tests: X/Y passing
- Coverage: X%
- Manual testing: [Describe]

### Confidence Change
- **Before**: X/10 - [Reason]
- **After**: Y/10 - [Reason]

### Next Steps
- [ ] [Next task]
- [ ] [Another task]
```

---

## Confidence Rating System

### Scale (1-10)

- **10**: Perfect, no possible improvements, battle-tested
- **9**: Excellent, thoroughly tested, minor edge cases may exist
- **8**: Good, works well, may need refinement
- **7**: Solid, functional, some concerns
- **6**: Acceptable, works but needs improvement
- **5**: Functional but concerning, needs review
- **4**: Problematic, requires attention
- **3**: Serious issues, needs major work
- **2**: Barely working, major problems
- **1**: Broken, doesn't work

### When Confidence <8

**STOP and get human review before proceeding.**

This is not optional. Low confidence indicates:
- Uncertainty about approach
- Potential issues not fully resolved
- Need for expert input
- Risk to project stability

### Providing Confidence Ratings

Always include reasoning:

**✅ GOOD:**
```
Confidence: 8/10 - Algorithm proven in tests with 1000+ iterations,
edge cases documented and handled, but haven't tested on very slow
network drives yet. Performance benchmarks meet targets.
```

**❌ BAD:**
```
Confidence: 8/10
```

### Rating Checkpoints

Provide confidence ratings:
1. **Before starting** - Initial assessment
2. **After design** - Confidence in approach
3. **After implementation** - Confidence in code
4. **After testing** - Final confidence
5. **After review** - Confidence with feedback incorporated

---

## Performance Benchmarking

### When to Benchmark

Benchmark when code is **performance-critical**:
- Called frequently (>100 times/second)
- Handles large data (>1MB)
- On critical path (affects user experience)
- Part of identified bottleneck

### How to Benchmark

1. Define target metrics (time, memory, throughput)
2. Create realistic test scenarios
3. Run multiple iterations (>100)
4. Record average, min, max
5. Document test environment

### Benchmark Format

```typescript
/**
 * Performance Benchmarks
 * 
 * Environment: MacBook Pro M1, 16GB RAM, Node 18.x
 * Date: 2025-10-25
 * 
 * | File Size | Hash Time (avg) | Memory | Iterations |
 * |-----------|----------------|--------|------------|
 * | 10 KB     | 0.1ms          | 2 KB   | 1000       |
 * | 100 KB    | 0.5ms          | 8 KB   | 1000       |
 * | 1 MB      | 2.5ms          | 45 KB  | 500        |
 * | 10 MB     | 18ms           | 350 KB | 50         |
 * 
 * Target: <5ms for files <1MB
 * Result: ✅ Target met
 * 
 * Notes:
 * - Tested with SHA-256 hashing algorithm
 * - Memory includes hash object overhead
 * - Slower on network drives (not benchmarked)
 */
```

---

## Testing Documentation

### Test Names as Stories

**✅ GOOD:**
```typescript
describe('FileChangeTracker', () => {
  it('should ignore file changes during pause period to prevent detecting tool edits', () => {
    // test...
  });
  
  it('should detect user edits after tool generation completes', () => {
    // test...
  });
  
  it('should handle concurrent edits on different files without race conditions', () => {
    // test...
  });
});
```

**❌ BAD:**
```typescript
describe('FileChangeTracker', () => {
  it('test pausedPaths', () => {
    // test...
  });
  
  it('test user edit', () => {
    // test...
  });
});
```

### Test Documentation in Task Files

Always include:
- Test count and pass/fail status
- Coverage percentage
- Notable failures and how they were fixed
- Manual test scenarios and results

**Example:**

```markdown
### Test Results

**Unit Tests**: 12/12 passing
**Coverage**: 90% (180/200 lines)

**Notable Failures**:
1. Race condition with concurrent file changes
   - Fixed by adding mutex lock
2. Hash comparison failing on Windows
   - Fixed by normalizing line endings

**Manual Testing**:
- ✅ Tested with 10MB file
- ✅ Tested with 100+ rapid changes
- ✅ Tested on slow network drive
- ⚠️ Not tested on Windows (no access to Windows machine)
```

---

## Human Review Process

### When Human Review is Required

**MANDATORY** review when:
- Confidence rating <8
- Security-critical code
- Architecture changes
- Performance-critical code
- Complex algorithms
- Edge case handling

### Documenting Review

**Template:**

```markdown
#### Human Review

**Reviewer**: [Name]
**Date**: [YYYY-MM-DD]
**Duration**: [X minutes]

**Feedback Received**:

**Positive**:
- ✅ Code quality excellent
- ✅ Edge cases well handled
- ✅ Test coverage comprehensive

**Concerns**:
1. ⚠️ Consider adding telemetry for debugging
   - **Action Taken**: Added TODO comment, defer to Phase 4
   - **Confidence Impact**: None (not critical)

2. ⚠️ What about concurrent tool operations?
   - **Action Taken**: Documented assumption (single-instance app)
   - **Confidence Impact**: None (architectural constraint)

3. ⚠️ Performance on network drives?
   - **Action Taken**: Added warning in docs, created benchmark issue
   - **Confidence Impact**: Reduced from 9 to 8

**Sign-off**:
- ✅ Code approved for merge
- ✅ Architecture approved
- ✅ Tests sufficient

**Final Confidence**: 8/10
```

---

## Pre-Completion Checklist

Before using `attempt_completion`, verify:

### Documentation
- [ ] Every file has header documentation
- [ ] Every class has comprehensive documentation
- [ ] Every public method documented
- [ ] Code-to-comment ratio is 1:3-5
- [ ] Complex logic has diagrams where helpful

### Task Tracking
- [ ] All milestones documented in task file
- [ ] All design decisions recorded
- [ ] All challenges and solutions documented
- [ ] Confidence ratings provided with reasoning
- [ ] Files created/modified listed

### Testing
- [ ] Tests written and passing
- [ ] Test names are descriptive stories
- [ ] Coverage meets targets (80%+ for critical paths)
- [ ] Performance benchmarked (if applicable)

### Review
- [ ] Human review completed (if confidence <8)
- [ ] Feedback documented and addressed
- [ ] Lessons learned section written

### Completion
- [ ] Success criteria met
- [ ] Next steps identified
- [ ] Final summary written

**If ANY checkbox is unchecked, DO NOT use attempt_completion.**

---

## Enforcement Rules

### Rule 1: No Code Without Comments

Target: 1 comment per 3-5 lines of logic.

Violation: Code review rejection.

### Rule 2: Every File Has Header

No exceptions. Every source file gets full header documentation.

### Rule 3: Explain "Why" Not Just "What"

Comments that just repeat code are useless. Explain rationale.

### Rule 4: Document All Decisions

Every design decision must be in task file with options, choice, rationale.

### Rule 5: Update Task Files After Milestones

Not daily, but after each significant milestone. No exceptions.

### Rule 6: Confidence <8 = Human Review

This is non-negotiable. Get review before proceeding.

### Rule 7: Performance-Critical = Benchmark

Must have numbers, not guesses.

### Rule 8: Tests Tell Stories

Test names must be clear, descriptive sentences.

### Rule 9: All Review Feedback Documented

No "looks good" without details. Document specific feedback.

### Rule 10: Slow Down and Think

Before coding:
1. State understanding
2. State approach
3. Identify issues
4. Rate confidence
5. If <8, ask questions

**Understanding > Speed**  
**Documentation > Features**  
**Quality > Quantity**

---

## Example: Good vs Bad

### Bad Implementation

```typescript
// file.ts
class FileTracker {
  private hashes = new Map();
  
  check(path, content) {
    const h = hash(content);
    return h !== this.hashes.get(path);
  }
}
```

**Problems:**
- No file header
- No class documentation
- No method documentation
- No comments in code
- No explanation of purpose
- No task tracking

### Good Implementation

```typescript
/**
 * @file FileChangeTracker.ts
 * @description Hash-based file change detection to prevent infinite loops
 * @architecture Phase 0, Task 0.1
 * @created 2025-10-25
 * @confidence 9/10 - Tested extensively
 * @see .implementation/phase-0-foundation/task-0.1-file-watcher.md
 * @performance-critical true
 */

/**
 * Tracks file changes using content hashing to distinguish tool edits from user edits.
 * 
 * PROBLEM SOLVED:
 * - Tool generates code, file watcher detects it, triggers regeneration = infinite loop
 * 
 * SOLUTION:
 * - Store hash of generated content before writing
 * - Compare actual hash with expected on file change
 * - If match = tool edit (ignore), if differ = user edit (process)
 * 
 * USAGE EXAMPLE:
 * ```typescript
 * const tracker = new FileChangeTracker();
 * await tracker.onBeforeGenerate('Button.tsx', code);
 * await fs.writeFile('Button.tsx', code);
 * await tracker.onAfterGenerate('Button.tsx');
 * ```
 * 
 * @class FileChangeTracker
 */
class FileChangeTracker {
  // Maps file paths to expected content hashes.
  // Used to detect if file content changed from what we generated.
  private generationHashes = new Map<string, string>();
  
  /**
   * Checks if a file change was made by user (not tool).
   * 
   * Compares actual file hash against expected hash stored before generation.
   * If hashes match, the file hasn't changed since we wrote it.
   * If hashes differ, user made an edit.
   * 
   * EDGE CASES:
   * - File doesn't have expected hash: Treat as user edit (safe default)
   * - File is paused: Return false immediately (tool is currently writing)
   * 
   * @param filepath - Absolute path to file
   * @param content - Current file content
   * @returns true if user made the edit, false if tool made it
   */
  isUserEdit(filepath: string, content: string): boolean {
    // If file is paused, tool is currently writing to it.
    // Don't compute hash, just return false immediately.
    if (this.pausedPaths.has(filepath)) {
      return false;
    }
    
    // Compute hash of current file content.
    // Using SHA-256 for good collision resistance.
    const actualHash = crypto.createHash('sha256')
      .update(content)
      .digest('hex');
    
    // Get the hash we expected after generation.
    // If we don't have an expected hash, treat as user edit (safe default).
    const expectedHash = this.generationHashes.get(filepath);
    if (!expectedHash) {
      return true;
    }
    
    // If hashes match, file hasn't changed since we generated it.
    // If hashes differ, user made an edit.
    return actualHash !== expectedHash;
  }
}
```

**Why good:**
- Complete file header with all metadata
- Comprehensive class documentation with problem/solution
- Usage example provided
- Every method documented
- Comments explain WHY, not just WHAT
- Edge cases documented
- Task file referenced

---

## Remember

**"Future you will thank present you for good documentation."**

Take the time to:
- Write clear comments
- Document decisions
- Track rationale
- Update task files
- Request reviews
- Test thoroughly

**Better to go slow and get it right than to go fast and create technical debt.**

---

**Last Updated**: [YYYY-MM-DD]
**Version**: 1.0