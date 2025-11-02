# AI-Assisted Development - Quick Reference Card

> **Print this or keep it handy for daily reference**

---

## 🎯 The 10 Commandments

1. **No Code Without Comments** (1 per 3-5 lines)
2. **Every File Has Header** (no exceptions)
3. **Explain "Why" Not "What"** (rationale over repetition)
4. **Document All Decisions** (in task files)
5. **Update After Milestones** (track progress)
6. **Confidence <8 = Review** (non-negotiable)
7. **Performance-Critical = Benchmark** (get numbers)
8. **Tests Tell Stories** (descriptive names)
9. **All Feedback Documented** (be specific)
10. **Slow Down and Think** (understanding beats speed)

---

## 📋 Pre-Task Checklist

Before starting implementation:

- [ ] Read `.clinerules/implementation-standards.md`
- [ ] Check documentation guide for relevant sections
- [ ] Read only necessary doc sections
- [ ] Create task file in `.implementation/`
- [ ] State understanding of task
- [ ] Describe proposed approach
- [ ] Provide confidence rating with reasoning
- [ ] Get review if confidence <8

---

## 💻 During Implementation

While coding:

- [ ] Write complete code (no "rest of the code" comments)
- [ ] Add comprehensive comments (target: 1 per 3-5 lines)
- [ ] Document design decisions as you make them
- [ ] Write tests alongside code
- [ ] Update task file after each milestone
- [ ] Re-assess confidence after major changes

---

## ✅ Pre-Completion Checklist

Before marking task complete:

### Documentation
- [ ] Every file has header
- [ ] Every class has documentation
- [ ] Every public method documented
- [ ] Code comments at 1:3-5 ratio
- [ ] Complex logic has diagrams

### Task Tracking
- [ ] All milestones documented
- [ ] All decisions recorded
- [ ] Challenges & solutions documented
- [ ] Confidence ratings with reasoning
- [ ] Files created/modified listed

### Testing
- [ ] Tests written and passing
- [ ] Test names are descriptive
- [ ] Coverage meets targets (80%+)
- [ ] Performance benchmarked (if critical)

### Review
- [ ] Human review done (if confidence <8)
- [ ] Feedback documented
- [ ] Lessons learned written

### Completion
- [ ] Success criteria met
- [ ] Next steps identified
- [ ] Final summary written

---

## 🔢 Confidence Scale

- **10** - Perfect, battle-tested
- **9** - Excellent, thoroughly tested
- **8** - Good, works well
- **7** - Solid, some concerns
- **6** - Acceptable, needs improvement
- **5** - Functional but concerning → **REVIEW**
- **4** - Problematic → **REVIEW**
- **3** - Serious issues → **REVIEW**
- **2** - Barely working → **REVIEW**
- **1** - Broken → **REVIEW**

**<8 = MANDATORY HUMAN REVIEW**

---

## 📝 File Header Template

```typescript
/**
 * @file [FileName].ts
 * @description [Purpose and role in system]
 * 
 * @architecture Phase [N], Task [N.N]
 * @created [YYYY-MM-DD]
 * @confidence [X/10] - [Reason]
 * 
 * @see [docs/file.md] - [Section]
 * @see [.implementation/task.md]
 * 
 * @security-critical [true/false]
 * @performance-critical [true/false]
 */
```

---

## 📚 Class Documentation Template

```typescript
/**
 * [Class purpose]
 * 
 * PROBLEM SOLVED:
 * - [What problem]
 * 
 * SOLUTION:
 * - [How it solves it]
 * 
 * USAGE EXAMPLE:
 * ```typescript
 * [Example code]
 * ```
 * 
 * @class [ClassName]
 */
```

---

## 🔧 Method Documentation Template

```typescript
/**
 * [Brief description]
 * 
 * ALGORITHM:
 * 1. [Step 1]
 * 2. [Step 2]
 * 
 * EDGE CASES:
 * - [Case and how handled]
 * 
 * @param [name] - [Description]
 * @returns [Description]
 * @throws {ErrorType} [When thrown]
 */
```

---

## 🧪 Test Name Template

```typescript
describe('FeatureName', () => {
  it('should [expected behavior] when [condition]', () => {
    // test...
  });
});
```

**✅ Good**: 
`should prevent infinite loop when tool generates file and watcher detects it`

**❌ Bad**: 
`test file watcher`

---

## 📊 Performance Benchmark Template

```typescript
/**
 * Performance Benchmarks
 * 
 * Environment: [Your environment]
 * Date: [YYYY-MM-DD]
 * 
 * | Input Size | Time (avg) | Memory | Iterations |
 * |------------|------------|--------|------------|
 * | Small      | Xms        | YKB    | 1000       |
 * | Large      | Xms        | YKB    | 100        |
 * 
 * Target: [Your target]
 * Result: [Met/Not Met]
 */
```

---

## 🔍 When to Benchmark

Benchmark when code is:
- Called frequently (>100 times/second)
- Handles large data (>1MB)
- On critical user path
- Part of identified bottleneck

---

## 👥 Human Review Triggers

**MANDATORY review when:**
- Confidence rating <8
- Security-critical code
- Architecture changes
- Performance-critical code
- Complex algorithms
- Edge case handling

---

## 📖 Documentation Reading Strategy

**Don't**: Read all docs upfront
**Do**: Use documentation guide
**Read**: Only relevant sections
**When**: Just-in-time (while implementing)

**Example workflow:**
1. Check `.clinerules/documentation-guide.md`
2. Find your task type
3. Read listed sections only
4. Implement
5. Refer back only if needed

---

## 💬 Common Phrases

### When Starting
"I'll implement [feature]. Let me start by:
1. Reading relevant documentation
2. Stating my understanding
3. Describing my approach
4. Providing confidence rating"

### When Uncertain
"Confidence: X/10 - [Specific concerns].
Would you like to review the approach before I proceed?"

### When Completing
"Implementation complete. Checklist verified:
✅ Documentation complete
✅ Tests passing (X tests, Y% coverage)
✅ Task file updated
✅ Review completed
Ready for merge."

---

## 🚨 Red Flags - Stop and Ask

Stop immediately if:
- 🚨 Confidence drops below 8
- 🚨 Unclear requirements
- 🚨 Security implications uncertain
- 🚨 Architecture impact unclear
- 🚨 Multiple approaches seem equally valid
- 🚨 Edge cases not well understood
- 🚨 Performance implications unknown

**Action**: Request human input before proceeding.

---

## 🎓 Comment Quality Examples

### ✅ Good Comments

```typescript
// Hash the file content to create a fingerprint we can 
// compare later. This lets us detect if the file changed 
// from what the tool generated.
const hash = crypto.createHash('sha256')
  .update(content)
  .digest('hex');

// Store expected hash before writing. After write completes,
// file watcher will compare actual vs expected hash.
this.generationHashes.set(filepath, hash);
```

### ❌ Bad Comments

```typescript
// Create hash
const hash = crypto.createHash('sha256').update(content).digest('hex');

// Set hash
this.generationHashes.set(filepath, hash);
```

---

## 🗂️ Task File Structure

`.implementation/phase-X/task-X.Y.md`:

1. **Task Overview** - Objective, criteria, refs
2. **Milestones** - Steps with confidence
3. **Design Decisions** - Options, choice, rationale
4. **Implementation Notes** - Challenges, solutions
5. **Test Results** - Coverage, status
6. **Human Review** - Feedback, actions
7. **Lessons Learned** - Patterns, insights

---

## ⚙️ File Locations

```
.clinerules                    # Project root
├── implementation-standards.md
├── documentation-guide.md
└── system-prompt.md

.implementation/
├── templates/
│   └── milestone-template.md
└── phase-X/
    └── task-X.Y.md

docs/
├── ARCHITECTURE.md
└── ...

src/
└── ...
```

---

## 🎯 Quick Decision Tree

```
Starting a task?
├─ Read implementation standards
├─ Check doc guide
├─ Read relevant sections only
├─ State understanding
├─ Rate confidence
│  ├─ <8? → Get review
│  └─ ≥8? → Proceed
├─ Implement with full docs
├─ Write tests
├─ Update task file
├─ Re-check confidence
│  ├─ <8? → Get review
│  └─ ≥8? → Complete
└─ Run pre-completion checklist
```

---

## 📏 Quality Targets

- **Documentation headers**: 100%
- **Comment density**: 1:3-5 (comments:code)
- **Review rate**: 20-30%
- **Test coverage**: 80%+ critical paths
- **Rework rate**: <10% after review

---

## 🔄 Daily Workflow

1. **Morning**: Review task list, prioritize
2. **Start task**: Read standards, check docs
3. **Implement**: Full documentation, tests
4. **Review**: Self-review, human if needed
5. **Complete**: Checklist, task file, merge
6. **End of day**: Update task status

---

## 💡 Remember

**"Quality over speed.**
**Documentation over code.**
**Understanding over output."**

---

## 🆘 Troubleshooting Quick Fixes

### AI not following standards?
→ Check Cline custom instructions saved
→ Verify `.clinerules` files exist
→ Explicitly reference the standards

### Too many reviews?
→ Provide positive feedback when things go well
→ Break tasks smaller
→ Consider adjusting threshold

### Poor documentation?
→ Use specific examples from standards
→ Request: "Explain WHY not WHAT"
→ Point to good vs bad examples

### Context issues?
→ Use documentation guide
→ Break tasks into smaller chunks
→ Reference specific doc sections

---

## 📞 Quick Commands for AI

```
"Follow .clinerules/implementation-standards.md"
"What's your confidence rating? Explain reasoning."
"Add more comments explaining the rationale"
"Update the task file with this milestone"
"Please provide the implementation for review"
"Run the pre-completion checklist"
```

---

**Print this card and keep it visible while working!**

---

**Version 1.0 | November 2025**