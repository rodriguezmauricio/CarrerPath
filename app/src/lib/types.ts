export type LessonType = "Concept" | "Exercise" | "Project" | "Domain" | "Tool";

export type BloomLevel = "Remember" | "Understand" | "Apply" | "Analyze" | "Evaluate" | "Create";

export interface Resource {
  label: string;
  url: string;
}

export interface ExerciseStep {
  instruction: string;
  example?: string;
  hint?: string;
}

export interface MiniExercise {
  id: string;
  title: string;
  question: string;
  steps: ExerciseStep[];
  codeSnippet?: string;
  solution?: string;
  explanation?: string;
}

export interface RubricCriterion {
  name: string;
  weight: number;
  levels: {
    exemplary: string;
    proficient: string;
    developing: string;
    beginning: string;
  };
}

export interface Rubric {
  criteria: RubricCriterion[];
}

export interface Exercise {
  title?: string;
  description: string[];
  steps: ExerciseStep[];
  rubric?: Rubric;
}

export interface Concept {
  title: string;
  explanation: string;
  example: string;
  codeSnippet: string;
}

export interface Misconception {
  wrong: string;
  why: string;
  correct: string;
  codeExample?: string;
}

export interface RetrievalQuestion {
  prompt: string;
  expectedAnswer: string;
  bloomLevel: BloomLevel;
  relatedLessonId: string;
}

export interface ReviewCheckpoint {
  id: string;
  type: "ChapterReview" | "WarmUp" | "MidpointAssessment" | "Capstone";
  coversLessons: string[];
  questions: RetrievalQuestion[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: number;
  type: LessonType;
  bloomLevel: BloomLevel;
  prerequisites?: string[];
  learningObjectives: string[];
  why: string;
  concepts: Concept[];
  commonMisconceptions?: Misconception[];
  mentalModel?: string;
  miniExercises?: MiniExercise[];
  exercise?: Exercise;
  resources?: Resource[];
  whyItMatters?: string;
}

export interface Chapter {
  id: string;
  title: string;
  warmUp?: ReviewCheckpoint;
  lessons: Lesson[];
  review?: ReviewCheckpoint;
}

export interface Track {
  id: string;
  title: string;
  color: string;
  subtitle: string;
  icon: string;
  version: string;
  lastUpdated: string;
  chapters: Chapter[];
  midpointAssessment?: ReviewCheckpoint;
  capstoneAssessment?: ReviewCheckpoint;
  tags?: string[];
}

// --- Multi-Company Platform Types ---

export interface LessonCustomization {
  lessonId: string;
  why?: string;
  examples?: { original: string; replacement: string }[];
}

export interface TrackRef {
  trackId: string;
  customizations?: LessonCustomization[];
}

export interface Phase {
  phase: number;
  title: string;
  months: string;
  color: string;
  trackIds: string[];
}

export interface Role {
  id: string;
  title: string;
  icon: string;
  description: string;
  duration: string;
  phases: Phase[];
  trackRefs: TrackRef[];
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  color: string;
  description: string;
  industry: string;
  website: string;
  roles: Role[];
}
