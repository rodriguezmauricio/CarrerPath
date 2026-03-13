# Course / Career Path Content Generation Spec

Use this document as the blueprint every time you create a new course, career path, or learning track for this platform. Follow every section exactly.

---

## 1. Content Hierarchy

```
Track (e.g., "Java Mastery")
  -> Chapter (e.g., "Chapter 1 - OOP Fundamentals")
    -> Review Checkpoint (warm-up from previous chapter)
    -> Lesson (e.g., "Classes, Objects & Constructors")
      -> Learning Objectives (2-4 measurable outcomes)
      -> Why This Matters (opening motivation)
      -> Concepts (3-5 core teaching blocks)
      -> Common Misconceptions (2-4 proactive error corrections)
      -> Mental Model (optional memorable analogy)
      -> Mini Exercises (exactly 3, progressive disclosure)
      -> Main Exercise (1 comprehensive challenge + rubric)
      -> Resources (external links)
      -> Why What You Learned Is Important (closing real-world motivation)
    -> Review Checkpoint (end-of-chapter recall quiz)
  -> Midpoint Assessment (at track 50%)
  -> Capstone Assessment (at track end)
```

---

## 2. Target Audience Assumption

Always write for someone who:
- KNOWS general programming concepts (variables, loops, arrays, functions, classes, conditionals)
- Has NEVER used the specific language/framework being taught
- They know WHAT a class is but NOT how to write one in [language]
- Needs Java/Python/etc. syntax taught explicitly at every step

---

## 3. Track Definition

```typescript
interface Track {
  id: string;           // e.g., "java"
  title: string;        // e.g., "Java Mastery"
  color: string;        // hex color for UI accent
  subtitle: string;     // 1-line value proposition
  icon: string;         // emoji
  chapters: Chapter[];
}
```

- **subtitle** should answer "why should I learn this?" in one sentence tied to the career goal
- Example: "Fidelity's core language -- the language of enterprise fintech"

---

## 4. Lesson Definition

```typescript
interface Lesson {
  id: string;
  title: string;
  duration: number;         // minutes
  type: LessonType;         // "Concept" | "Exercise" | "Project" | "Domain" | "Tool" | etc.
  why: string;              // 2-3 sentences on WHY this matters (shown at top)
  learningObjectives: string[];  // 2-4 measurable outcomes (see §4a)
  prerequisites?: string[];      // lesson IDs this depends on (see §4b)
  bloomLevel: BloomLevel;        // cognitive level target (see §4c)
  concepts: Concept[];
  commonMisconceptions?: Misconception[];  // (see §4d)
  mentalModel?: string;
  miniExercises?: MiniExercise[];
  exercise?: Exercise;
  resources?: Resource[];
  whyItMatters?: string;    // real-world closing paragraph (shown at bottom)
}
```

### 4a. Learning Objectives (required, 2-4 per lesson)

Every lesson MUST declare explicit, measurable outcomes using the format:
> "By the end of this lesson, the learner will be able to **[action verb]** + **[observable behavior]**."

#### Rules:
- Use action verbs from Bloom's Taxonomy matching the lesson's `bloomLevel` (see §4c)
- Each objective must be testable -- if you can't write an exercise that proves mastery, rewrite it
- Assessments (mini exercises + main exercise) must align backward from these objectives
- Objectives are displayed at the TOP of the lesson, after the `why` section

#### Examples:
- BAD: "Understand classes in Java" (not measurable)
- GOOD: "Declare a Java class with private fields, a constructor, and getter methods"
- BAD: "Learn about inheritance" (vague)
- GOOD: "Extend a base class and override a method to change its behavior"

### 4b. Prerequisite Mapping

```typescript
interface Lesson {
  prerequisites?: string[];  // Array of lesson IDs
}
```

- List every lesson ID that must be completed before this one
- If a lesson references syntax or concepts from an earlier lesson, that lesson is a prerequisite
- The UI uses this to enforce learning order and show a dependency graph
- When restructuring content, check prerequisite chains to avoid orphaned dependencies
- "Hotspot" lessons (depended on by 3+ downstream lessons) should be flagged for extra quality review

### 4c. Cognitive Level Progression (Bloom's Taxonomy)

```typescript
type BloomLevel = "Remember" | "Understand" | "Apply" | "Analyze" | "Evaluate" | "Create";
```

Each lesson targets a cognitive level. Content within a track should progress upward through these levels:

| Level | Verb Examples | Typical Lesson Type |
|-------|--------------|---------------------|
| Remember | Define, list, recall, identify | Early concept lessons |
| Understand | Explain, describe, compare, summarize | Concept lessons with analogies |
| Apply | Implement, use, execute, solve | Exercise-focused lessons |
| Analyze | Differentiate, examine, debug, test | Debugging & comparison lessons |
| Evaluate | Justify, critique, assess, choose | Design decision lessons |
| Create | Design, build, compose, architect | Capstone projects |

#### Rules:
- Chapters 1-2 of any track should primarily target Remember → Apply
- Mid-track chapters should push into Analyze → Evaluate
- Final chapters and capstone projects should reach Create
- Mini exercises within a lesson should climb at least 1-2 levels (Mini 1 = Apply, Mini 3 = Analyze)
- The main exercise should target the lesson's stated `bloomLevel` or one level above

### 4d. Common Misconceptions (2-4 per lesson, recommended)

```typescript
interface Misconception {
  wrong: string;       // The incorrect belief or common error
  why: string;         // Why it seems plausible / why beginners think this
  correct: string;     // The accurate understanding
  codeExample?: string; // Optional: show the wrong code vs. correct code
}
```

#### Rules:
- Proactively surface the top mistakes learners make at this point in the curriculum
- Frame errors as learning opportunities, never as failures
- Include "deliberate erroneous examples" where the learner sees broken code and must identify the bug
- Display these AFTER the concepts section but BEFORE exercises, so learners are pre-warned

#### Example:
```json
{
  "wrong": "Calling a method on a null reference will just return null",
  "why": "In JavaScript, accessing properties on undefined returns undefined -- so learners expect Java to behave the same way",
  "correct": "Java throws a NullPointerException at runtime. You must check for null before calling methods on an object.",
  "codeExample": "// WRONG: String name = account.getName(); // crashes if account is null\n// RIGHT: if (account != null) { String name = account.getName(); }"
}
```

---

## 5. Concepts (3-5 per lesson)

Each concept MUST have all 4 fields:

```typescript
interface Concept {
  title: string;        // short name
  explanation: string;  // 1-2 sentence definition
  example: string;      // 2-3 sentence REAL-WORLD scenario from the industry
  codeSnippet: string;  // working code showing the concept
}
```

### Rules for concepts:
- **explanation**: Brief, precise. Define the concept.
- **example**: Always a REAL-WORLD tech/industry scenario. Not "imagine you have a list of numbers". Instead: "When processing 10,000 trade records from the NYSE feed, you need..."
- **codeSnippet**: Working code. Include comments. Use realistic variable names from the target domain (not `foo`, `bar`, `x`).
- All examples must relate to the career goal (fintech, web dev, data science, etc.)

---

## 6. Mini Exercises (exactly 3 per lesson)

### Progressive Disclosure Pattern:

| Exercise | Steps | Solution | Explanation |
|----------|-------|----------|-------------|
| Mini 1   | Yes   | Yes      | Yes         |
| Mini 2   | Yes   | Yes      | Yes         |
| Mini 3   | Yes   | Yes      | Yes         |

```typescript
interface MiniExercise {
  id: string;           // "{lessonId}-m1", "-m2", "-m3"
  title: string;        // "Mini Exercise 1: [action verb] a [thing]"
  question: string;     // What to build/solve
  steps: ExerciseStep[];
  codeSnippet?: string; // Optional starter code
  solution?: string;    // Full working answer (all minis)
  explanation?: string; // Why the answer works (all minis)
}
```

### ExerciseStep format:

```typescript
interface ExerciseStep {
  instruction: string;  // Detailed: explain the syntax, what to type, what it does
  example?: string;     // SAME PATTERN, DIFFERENT CONTEXT (not the answer!)
  hint?: string;        // Common mistakes, gotchas, tips
}
```

### UI Accordion Pattern (Mini Exercises):

Each mini exercise renders as a card with **two separate collapsible sections**, stacked vertically:

1. **"Step-by-step guide"** accordion (collapsed by default)
   - Contains all numbered steps with instructions, examples, and hints
   - The learner should ATTEMPT the exercise on their own FIRST
   - Only expand this if they get stuck
   - Toggle label: "Show step-by-step guide" / "Hide step-by-step guide"

2. **"Solution & Explanation"** accordion (collapsed by default, appears BELOW the step guide)
   - Contains the full working solution code
   - Contains the explanation of why it works (Mini 1 only)
   - Toggle label: "Show Solution" / "Hide Solution"
   - This section is ALWAYS separate from the step guide — never mix steps and solutions

**Key rule**: The step-by-step guide helps the learner DO the work without giving the answer. The solution section ONLY appears after/below, so the learner must make a conscious choice to reveal it. This two-tier disclosure encourages genuine problem-solving.

### "Example (different context, same pattern)" Sections:

Within each exercise step, the `example` field renders as a distinctly labeled subsection:

```
Step 1: [instruction text]

  📋 Example (different context, same pattern):
  ┌──────────────────────────────────────────┐
  │ // Code showing the SAME syntax pattern  │
  │ // but in a DIFFERENT domain context     │
  └──────────────────────────────────────────┘

  💡 Hint: [hint text]
```

- The "Example (different context, same pattern)" label must be rendered explicitly in the UI as a visible header/tag above the example code block
- This label reinforces to the learner that the example is NOT the answer — it's a parallel demonstration
- The example code block uses the same styling as other code blocks but is visually nested under its step

### Rules for steps:
- **instruction**: Assume they've never written this syntax before. Explain it.
  - BAD: "Create a class with two fields"
  - GOOD: "Create a new file called `Stock.java`. Inside it, declare a class using `class Stock { }`. Add two fields inside the curly braces. In Java, each field needs a type first, then a name, then a semicolon."

- **example**: Must demonstrate the EXACT SAME pattern but in a DIFFERENT domain context.
  - If the exercise asks to build a `Stock` class, the example shows a `Bond` class
  - If the exercise asks to filter trades, the example filters dividends
  - NEVER give the answer in the example
  - ALWAYS label it "Example (different context, same pattern)" in the rendered UI

- **hint**: Address the #1 mistake a beginner would make at this step
  - "Java uses `String` with a capital S, not `string`"
  - "Don't forget the semicolon after each field declaration"

### Rules for mini exercise content:
- All exercises must be themed to the career domain (fintech, web dev, etc.)
- Mini 1: Most basic application of the concept. One simple thing.
- Mini 2: Builds slightly on Mini 1. Adds one new element.
- Mini 3: Combines multiple concepts. No hand-holding. Real challenge.

---

## 7. Main Exercise (1 per lesson)

```typescript
interface Exercise {
  title?: string;       // "Build a [thing]"
  description: string[]; // 6-10 detailed bullet points
  steps: ExerciseStep[]; // 6-10 detailed steps with examples
}
```

### UI Accordion Pattern (Main Exercise):

The main exercise renders with THREE distinct sections, stacked vertically:

1. **Task description** (always visible, NOT collapsible)
   - The numbered list of requirements (description items)
   - This tells the learner WHAT to build
   - The learner should read this and attempt the exercise independently first

2. **"Step-by-step guide"** accordion (collapsed by default)
   - Contains all numbered steps with instructions, examples, and hints
   - Each step has the labeled "Example (different context, same pattern)" subsection
   - Toggle label: "Show step-by-step guide" / "Hide step-by-step guide"
   - Only expand if the learner needs guidance on HOW to build it

3. **"Solution"** accordion (collapsed by default, appears BELOW the step guide)
   - Contains the complete working solution code
   - Toggle label: "Show Solution" / "Hide Solution"
   - This is the LAST resort — learner should exhaust steps first

**The three tiers enforce this learning flow:**
- First: Read the task and TRY on your own
- Second: If stuck, open the step-by-step guide for structured help
- Third: Only if truly stuck, reveal the full solution

### Rules for description items:
- Each item should be a FULL SENTENCE explaining what to do, not a terse fragment
- BAD: "Fields: `owner` (String), `balance` (double)"
- GOOD: "Create a `TradingAccount` class file. Inside it, declare three fields: `accountHolder` of type String (text), `balance` of type double (decimal number), and `accountId` of type String marked as `final` (which means it can never be changed after the constructor sets it)."

### Rules for steps:
- Same format as mini exercise steps
- Each step explains EXACTLY what syntax to write and why
- Examples use DIFFERENT domain context (if building TradingAccount, examples use Portfolio)
- Each example is labeled "Example (different context, same pattern)" in the UI
- Include imports in examples when relevant
- Tell them what file to create, what to name the class
- Add hints to most steps (common mistakes, gotchas)
- Break large operations into multiple small steps

---

## 8. "Why What You Just Learned Is Important" (whyItMatters)

Appears at the END of the lesson, after everything else. 3-5 sentences.

### Must include:
1. **Name a specific real company** where this is used (Fidelity, Goldman Sachs, Bloomberg, Stripe, etc.)
2. **Name a specific real system or tool** (Bloomberg Terminal, Athena, Apache Kafka, etc.)
3. **Explain what breaks** if an engineer doesn't know this
4. **Be motivating** -- make the student feel they just leveled up

### Example:
"At Fidelity, every financial instrument -- stocks, bonds, ETFs, mutual funds -- is represented as a Java class. When a customer opens their portfolio on the app, the system creates hundreds of objects from these classes to display real-time positions and values. An engineer who struggled with constructors would be unable to contribute to the portfolio service, which handles over 40 million customer accounts. You just learned the exact mental model that enterprise Java engineers use every single day."

---

## 9. Mental Model (optional, 1 per lesson)

A memorable analogy that makes the concept click. Displayed in a special styled quote block.

- 1-2 sentences max
- Use a physical world analogy
- Example: "A Class is a cookie cutter. An Object is an actual cookie made from it -- same shape, but with its own real filling."

---

## 10. Resources (2-4 per lesson)

```typescript
interface Resource {
  label: string;  // Human-readable name
  url: string;    // Direct link
}
```

- Official documentation first (Oracle, MDN, Python docs)
- Interactive tools second (Python Tutor, visualizers)
- Beginner-friendly tutorials third (W3Schools, freeCodeCamp)

---

## 11. UI Color System

| Element | Color | Hex |
|---------|-------|-----|
| Primary accent (links, highlights) | Teal | #00d4aa |
| Secondary accent (warnings, "why") | Amber | #f59e0b |
| Exercise cards | Purple | #8b5cf6 |
| Error/danger (actual errors only) | Coral | #ef4444 |
| Step guides | Blue | #3b82f6 |
| Solutions | Emerald | #10b981 |
| Track-specific | Custom per track | varies |

- Exercise cards should NEVER use red/coral -- it implies error
- "Why this matters" at top uses amber accent
- "Why what you learned is important" at bottom uses teal accent

---

## 12. Content Quality Checklist (Quick Reference)

> **Note:** This is the quick-reference checklist. See **§22** for the full, comprehensive checklist that includes accessibility, i18n, analytics, and assessment criteria.

Before finalizing any lesson, verify at minimum:

- [ ] 2-4 measurable `learningObjectives` defined
- [ ] `prerequisites` and `bloomLevel` set correctly
- [ ] Every concept has: title, explanation, real-world example, codeSnippet
- [ ] 2-4 common misconceptions documented
- [ ] Exactly 3 mini exercises with correct progressive disclosure
- [ ] Every mini exercise has 2-4 steps with instruction + example + hint
- [ ] Main exercise has 6-10 description items (full sentences, not fragments)
- [ ] Main exercise has 6-10 steps with instruction + example + hint
- [ ] Main exercise has a rubric with 3-5 criteria
- [ ] Step examples show the same PATTERN but DIFFERENT CONTEXT (never the answer)
- [ ] All content themed to the target career/industry (no generic Cars/Books/Animals)
- [ ] `whyItMatters` names specific companies, systems, and consequences
- [ ] Code uses realistic domain variable names (not foo/bar/x/y)
- [ ] Instructions explicitly explain syntax for beginners

---

## 13. TypeScript File Structure

All content goes in a single `lib/curriculum.ts` file:

```typescript
export const curriculum: Track[] = [
  {
    id: "track-id",
    title: "Track Title",
    color: "#hexcolor",
    subtitle: "One-line value prop",
    icon: "emoji",
    version: "1.0.0",
    lastUpdated: "2026-03-13",
    chapters: [
      {
        id: "track-ch1",
        title: "Chapter 1 -- Topic",
        warmUp: { ... },           // Review checkpoint (§16)
        lessons: [
          {
            id: "track-1-1",
            title: "Lesson Title",
            duration: 50,
            type: "Concept",
            bloomLevel: "Apply",
            prerequisites: ["track-1-0"],
            learningObjectives: [
              "Declare a class with private fields and a constructor",
              "Instantiate objects and call methods on them"
            ],
            why: "Why this matters (shown at top)...",
            concepts: [ ... ],
            commonMisconceptions: [ ... ],
            mentalModel: "Analogy...",
            miniExercises: [ ... ],
            exercise: { ... },      // Includes rubric (§15)
            resources: [ ... ],
            whyItMatters: "Real-world importance (shown at bottom)..."
          }
        ],
        review: { ... }            // End-of-chapter checkpoint (§16)
      }
    ]
  }
];
```

---

## 14. Naming Conventions

- Track IDs: lowercase, no spaces (e.g., `java`, `ml-ai`, `fintech`, `tools`)
- Chapter IDs: `{trackId}-ch{n}` (e.g., `java-ch1`)
- Lesson IDs: `{trackId}-{chapter}-{lesson}` (e.g., `java-1-1`, `ml-2-3`)
- Mini exercise IDs: `{lessonId}-m{n}` (e.g., `java-1-1-m1`)

---

## 15. Assessment Rubrics

Every main exercise should have a transparent rubric so learners know how their work is evaluated (whether by self-check, peer review, or automated grading).

```typescript
interface Rubric {
  criteria: RubricCriterion[];  // 3-5 criteria per exercise
}

interface RubricCriterion {
  name: string;          // e.g., "Correct Output", "Code Structure", "Edge Cases"
  weight: number;        // percentage (all criteria must sum to 100)
  levels: {
    exemplary: string;   // What "excellent" looks like
    proficient: string;  // Meets expectations
    developing: string;  // Partially correct, needs improvement
    beginning: string;   // Fundamental misunderstanding
  };
}
```

### Rules:
- Publish the rubric BEFORE the learner starts the exercise (transparency drives quality)
- Align each criterion directly to one of the lesson's `learningObjectives`
- Weight "Correct Output" highest (40-50%), then "Code Quality" (20-30%), then "Edge Cases" (20-30%)
- For self-assessed exercises, provide a checklist version of the rubric the learner can tick off
- For auto-graded exercises, map rubric levels to test case categories

### Example criterion:
| Level | "Correct Output" (40%) |
|-------|----------------------|
| Exemplary | All test cases pass, including edge cases. Output format matches spec exactly. |
| Proficient | Core test cases pass. Minor formatting differences. |
| Developing | Some test cases pass. Logic is partially correct but has 1-2 bugs. |
| Beginning | Code does not compile/run, or output is unrelated to the problem. |

---

## 16. Spaced Repetition & Retrieval Practice

Build retention mechanics directly into the curriculum structure. Passive content delivery produces shallow learning; active recall at increasing intervals produces durable knowledge.

### Review Checkpoints

Insert lightweight retrieval exercises at these intervals:
- **End of every chapter**: 5-question quick recall quiz covering all lessons in that chapter
- **Start of every new chapter**: 3-question "warm-up" revisiting key concepts from the previous chapter
- **Track midpoint**: Cumulative mini-assessment covering all chapters completed so far
- **Track end**: Comprehensive capstone assessment

```typescript
interface ReviewCheckpoint {
  id: string;                // e.g., "java-ch1-review"
  type: "ChapterReview" | "WarmUp" | "MidpointAssessment" | "Capstone";
  coversLessons: string[];   // lesson IDs being reviewed
  questions: RetrievalQuestion[];
}

interface RetrievalQuestion {
  prompt: string;            // The question (no multiple choice -- force recall)
  expectedAnswer: string;    // Model answer for self-check
  bloomLevel: BloomLevel;    // Should mix levels
  relatedLessonId: string;   // Which lesson this tests
}
```

### Rules:
- Retrieval questions must require ACTIVE RECALL, not recognition (no multiple choice for review checkpoints)
- Mix Bloom levels: at least 1 Remember, 1 Apply, 1 Analyze per checkpoint
- Questions should reference the career domain, not abstract scenarios
- Show the learner which lesson each question relates to, so they can revisit if needed

---

## 17. Engagement & Progress Mechanics

Define how the platform motivates learners beyond content quality alone.

### Required Progress Elements:
- **Progress bar**: Visible at track, chapter, and lesson level. Shows percentage complete.
- **Streak tracking**: Count consecutive days with at least 1 completed lesson or exercise
- **Milestone badges**: Awarded at meaningful checkpoints, not randomly

### Milestone Badge Definitions:

| Badge | Trigger | Label |
|-------|---------|-------|
| Chapter Complete | All lessons in a chapter finished | "Chapter [N] Cleared" |
| Track Midpoint | 50% of track lessons completed | "Halfway There" |
| Track Complete | All lessons + capstone finished | "[Track Name] Graduate" |
| Perfect Exercise | Main exercise scores Exemplary on all rubric criteria | "Flawless" |
| Streak 7 | 7 consecutive learning days | "On Fire" |
| Streak 30 | 30 consecutive learning days | "Unstoppable" |

### Rules:
- Badges must represent genuine achievement, not participation
- Never use leaderboards by default -- they create anxiety. Offer opt-in "cohort comparison" only
- Progress data feeds into the analytics system (§20)
- Streaks reset at midnight in the learner's local timezone

---

## 18. Accessibility Requirements

All content must conform to **WCAG 2.1 Level AA** as a baseline. Accessibility is a design requirement, not an afterthought.

### Code Snippets:
- All `codeSnippet` fields must use semantic `<code>` / `<pre>` elements, never images of code
- Syntax highlighting must maintain a minimum 4.5:1 contrast ratio for all token colors
- Code blocks must be navigable and copyable via keyboard

### Text & Structure:
- All headings must follow a logical hierarchy (h1 > h2 > h3, no skipped levels)
- Body text minimum 16px, code text minimum 14px
- Line height minimum 1.5x for body text
- Maximum line length: 80 characters for code, 100 characters for prose
- All images/diagrams must have descriptive `alt` text
- Never rely on color alone to convey meaning (e.g., don't say "the green text" -- add an icon or label)

### Interactive Elements:
- All exercises must be completable via keyboard alone (no mouse-only interactions)
- Focus indicators must be visible on all interactive elements
- Form inputs must have associated `<label>` elements
- Error messages must be announced to screen readers (use `aria-live` regions)
- Timed interactions are prohibited unless an "extend time" option is provided

### Media:
- If video content is added in the future, captions and transcripts are mandatory
- Audio content requires transcripts

### Testing:
- Run automated accessibility checks (axe, Lighthouse) on every page template
- Manual keyboard-only navigation test for every new lesson type
- Screen reader test (NVDA or VoiceOver) for every new interactive component

---

## 19. Internationalization (i18n) Architecture

Design content for future translation even if launching in English only. Retrofitting i18n is 5-10x more expensive than building it in.

### Content Separation Rules:
- All user-facing strings must live in the content data layer (the `curriculum.ts` structure), never hard-coded in UI components
- UI chrome (buttons, labels, navigation) must use a separate i18n key system (e.g., `t("button.submit")`)
- Never embed text in images or SVGs -- use overlaid text elements instead
- Date, time, number, and currency formats must use `Intl` APIs, never hard-coded formats

### Content Authoring Rules:
- Avoid idioms, slang, and cultural references that don't translate (e.g., "knock it out of the park")
- Use simple, direct sentence structures -- they translate more accurately
- Leave room for text expansion: translations commonly expand 20-30% vs. English
- Keep variable names in code snippets in English (they are code, not prose)
- Real-world examples should be adaptable: mention "a major financial institution" alongside the specific company name so localizers can substitute regional equivalents

### Layout Considerations:
- UI must support LTR and RTL text direction
- Avoid fixed-width containers for text that will be translated
- Icons and symbols should be culturally neutral or localizable

---

## 20. Analytics & Learner Progress Tracking

Define what data the platform captures to close the feedback loop between content design and learning outcomes.

### Required Tracking Events:

| Event | Data Captured | Purpose |
|-------|--------------|---------|
| `lesson.started` | lessonId, timestamp, userId | Measure engagement |
| `lesson.completed` | lessonId, timestamp, duration, userId | Completion rates |
| `exercise.attempted` | exerciseId, attempt number, timestamp | Identify struggle points |
| `exercise.completed` | exerciseId, score, time spent, attempt count | Assessment effectiveness |
| `hint.viewed` | exerciseId, stepIndex, timestamp | Which steps need better instruction |
| `solution.viewed` | exerciseId, timestamp | Learners giving up vs. self-checking |
| `misconception.viewed` | lessonId, misconceptionIndex | Engagement with error content |
| `review.completed` | checkpointId, score, timestamp | Retention measurement |

### Key Metrics to Monitor:

| Metric | Formula | Action Threshold |
|--------|---------|-----------------|
| Lesson completion rate | completions / starts | Below 70% = investigate content |
| Exercise pass rate | passes / attempts | Below 60% = exercise too hard or poorly explained |
| Average attempts per exercise | total attempts / unique users | Above 3 = add more scaffolding |
| Hint usage rate | hint views / exercise attempts | Above 80% = step instruction unclear |
| Drop-off rate per lesson | (starts - completions) / starts | Above 40% = critical content problem |
| Time-on-task vs. estimated duration | actual / estimated | Consistently 2x+ = adjust duration estimate |

### Rules:
- Never track personally identifiable information beyond what's needed for progress (no keystroke logging, no screen recording)
- Provide learners a dashboard showing their own progress, streak, and scores
- Surface drop-off data to content authors so they can identify and fix problem lessons
- Review analytics quarterly and flag lessons that fall below action thresholds for revision

---

## 21. Content Versioning & Maintenance

### Version Tagging:
- Every track has a version using semantic versioning: `MAJOR.MINOR.PATCH`
  - **MAJOR**: Structural changes (chapters added/removed/reordered)
  - **MINOR**: Lesson content changes (new concepts, rewritten exercises)
  - **PATCH**: Typo fixes, link updates, minor wording improvements
- Store the version in the track definition:

```typescript
interface Track {
  // ... existing fields ...
  version: string;        // e.g., "2.1.0"
  lastUpdated: string;    // ISO date, e.g., "2026-03-13"
}
```

### Changelog:
- Maintain a `CHANGELOG.md` per track (e.g., `docs/changelogs/java-changelog.md`)
- Every content change must have an entry: what changed, why, and which lessons were affected
- Link changelog entries to analytics data when changes are driven by drop-off or failure rates

### Review Cadence:
- **Monthly**: Check all external resource links for broken URLs
- **Quarterly**: Review lessons flagged by analytics (drop-off > 40%, pass rate < 60%)
- **Per language/framework release**: Update syntax, APIs, and best practices within 30 days of a major release (e.g., Java 25, Python 3.14, React 20)
- **Annually**: Full curriculum audit -- verify all real-world examples still reference current company practices and tools

---

## 22. Updated Content Quality Checklist

Before finalizing any lesson, verify ALL of the following:

### Structure & Objectives:
- [ ] Lesson has 2-4 explicit, measurable `learningObjectives` using action verbs
- [ ] `prerequisites` array lists all required prior lessons (or is empty for entry-point lessons)
- [ ] `bloomLevel` is set and appropriate for the lesson's position in the track
- [ ] Exercises align backward from the stated learning objectives

### Content:
- [ ] Every concept has: title, explanation, real-world example, codeSnippet
- [ ] 2-4 `commonMisconceptions` are defined with wrong/why/correct fields
- [ ] Exactly 3 mini exercises with correct progressive disclosure
- [ ] Every mini exercise has 2-4 steps with instruction + example + hint
- [ ] Main exercise has 6-10 description items (full sentences, not fragments)
- [ ] Main exercise has 6-10 steps with instruction + example + hint
- [ ] Main exercise has a rubric with 3-5 weighted criteria
- [ ] Step examples show the same PATTERN but DIFFERENT CONTEXT (never the answer)
- [ ] All content themed to the target career/industry (no generic Cars/Books/Animals)
- [ ] `whyItMatters` names specific companies, systems, and consequences
- [ ] Code uses realistic domain variable names (not foo/bar/x/y)
- [ ] Instructions explicitly explain syntax for beginners

### Accessibility:
- [ ] Code snippets use semantic markup, not images
- [ ] Syntax highlighting meets 4.5:1 contrast ratio
- [ ] All interactive elements are keyboard-accessible
- [ ] No information conveyed by color alone
- [ ] Heading hierarchy is logical (no skipped levels)

### i18n Readiness:
- [ ] No hard-coded UI strings in content
- [ ] No text embedded in images
- [ ] No untranslatable idioms or cultural references in core explanations
- [ ] Dates and numbers use locale-aware formatting

### Analytics:
- [ ] All required tracking events are wired up for the lesson's interactive elements
- [ ] Duration estimate is realistic (validated against beta learner data if available)
