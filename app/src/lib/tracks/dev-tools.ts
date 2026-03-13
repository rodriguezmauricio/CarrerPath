import { Track } from "../types";

export const devToolsTrack: Track = {
  id: "dev-tools",
  title: "Developer Tools & Workflow",
  color: "#ec4899",
  subtitle: "Git, versioning, documentation, and the tools of the trade",
  icon: "🛠️",
  version: "1.0.0",
  lastUpdated: "2026-03-13",
  chapters: [
    {
      id: "dev-tools-ch1",
      title: "Chapter 1 -- Git & Version Control",
      lessons: [
        {
          id: "dev-tools-1-1",
          title: "Git Fundamentals: Clone, Commit, Branch, Merge",
          duration: 45,
          type: "Tool",
          bloomLevel: "Apply",
          learningObjectives: [
            "Clone a repository and navigate its commit history with git log",
            "Read a git diff to identify what changed between versions",
            "Use git bisect to find the exact commit that introduced a regression"
          ],
          commonMisconceptions: [
            {
              wrong: "git pull and git fetch do the same thing",
              why: "Both seem to 'get updates from the remote'",
              correct: "git fetch downloads changes but doesn't modify your working directory. git pull does fetch + merge, which can overwrite local changes.",
              codeExample: "# Safe: fetch then inspect\ngit fetch origin\ngit log origin/main --oneline\n\n# Risky: pull merges immediately\ngit pull origin main  # could cause merge conflicts"
            },
            {
              wrong: "Deleting a file from the working directory removes it from git history",
              why: "Beginners think git tracks current files, not history",
              correct: "Git preserves the entire history. Deleted files can always be recovered from previous commits. Sensitive data committed by mistake requires history rewriting."
            }
          ],
          why: "Anthropic's SDK code, documentation, and internal tools all live in Git repositories. You need to clone repos to reproduce customer issues, read diffs to understand changes, and potentially contribute fixes.",
          concepts: [
            {
              title: "Core Git Operations",
              explanation: "Git tracks every change to every file. Clone downloads a repo, commit saves a snapshot, branch creates a parallel timeline, and merge combines branches back together.",
              example: "When a customer reports a bug in the Anthropic Python SDK, you'll clone the SDK repo, checkout the version they're using, and try to reproduce the issue locally.",
              codeSnippet: "# Clone the Anthropic SDK to reproduce an issue\ngit clone https://github.com/anthropics/anthropic-sdk-python.git\ncd anthropic-sdk-python\n\n# Check which version the customer is using\ngit tag | grep v0.18\ngit checkout v0.18.1\n\n# Read the recent changes\ngit log --oneline -10"
            }
          ],
          miniExercises: [
            {
              id: "dev-tools-1-1-m1",
              title: "Mini Exercise 1: Clone and explore a repo",
              question: "Clone the Anthropic Python SDK and find the most recent changes.",
              steps: [
                {
                  instruction: "Use `git clone` to download the repository, then `git log --oneline -5` to see the 5 most recent commits.",
                  example: "git clone https://github.com/openai/openai-python.git\ngit log --oneline -5",
                  hint: "Make sure you cd into the repo directory after cloning before running git commands."
                }
              ],
              solution: "git clone https://github.com/anthropics/anthropic-sdk-python.git\ncd anthropic-sdk-python\ngit log --oneline -5\ngit diff HEAD~1  # See what changed in the last commit",
              explanation: "git log shows commit history, --oneline makes it compact, and -5 limits to 5 entries. git diff HEAD~1 shows exactly what changed in the most recent commit."
            },
            {
              id: "dev-tools-1-1-m2",
              title: "Mini Exercise 2: Read a diff and explain the change",
              question: "Given a git diff output, explain what changed and whether it could cause a customer's reported issue.",
              steps: [
                {
                  instruction: "Read a diff: lines starting with - are removed, + are added. Focus on what behavior changed.",
                  hint: "Look at function signatures and default parameter values -- these often cause breaking changes."
                }
              ],
              solution: "# The diff shows:\n# - default_timeout was changed from 60 to 30 seconds\n# + This could cause timeouts for customers with slow connections\n# Recommendation: Customer should set explicit timeout parameter"
            },
            {
              id: "dev-tools-1-1-m3",
              title: "Mini Exercise 3: Bisect to find a breaking commit",
              question: "A customer reports that SDK version 0.18 works but 0.19 doesn't. Use git bisect to find the exact commit that introduced the bug.",
              steps: [
                {
                  instruction: "Set up git bisect with the known good and bad commits, then test each suggested commit."
                }
              ]
            }
          ],
          resources: [
            { label: "Git Official Documentation", url: "https://git-scm.com/doc" },
            { label: "GitHub Skills", url: "https://skills.github.com/" }
          ],
          whyItMatters: "At GitHub, GitLab, and Anthropic, every code change goes through Git. When a customer reports 'the SDK broke after updating', git blame and git bisect are how you find the exact commit that caused the regression. Support engineers who can navigate Git earn the respect of the engineering team and resolve issues without needing to escalate."
        }
      ],
      review: {
        id: "dev-tools-ch1-review",
        type: "ChapterReview",
        coversLessons: ["dev-tools-1-1"],
        questions: [
          { prompt: "What is the difference between git fetch and git pull?", expectedAnswer: "git fetch downloads changes without modifying local files. git pull does fetch + merge, which can cause conflicts.", bloomLevel: "Remember", relatedLessonId: "dev-tools-1-1" },
          { prompt: "A customer says the SDK broke after updating. What git commands would you use to find the breaking commit?", expectedAnswer: "git log to see recent commits, git diff between versions to see changes, and git bisect with known good/bad versions to binary search for the breaking commit.", bloomLevel: "Apply", relatedLessonId: "dev-tools-1-1" },
          { prompt: "In a git diff, what do lines starting with - and + mean?", expectedAnswer: "Lines with - were removed, lines with + were added. Lines without a prefix are unchanged context.", bloomLevel: "Remember", relatedLessonId: "dev-tools-1-1" }
        ]
      }
    }
  ]
};
