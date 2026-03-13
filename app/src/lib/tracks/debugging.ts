import { Track } from "../types";

export const debuggingTrack: Track = {
  id: "debugging",
  title: "Logging, Monitoring & Debugging",
  color: "#10b981",
  subtitle: "Log analysis, monitoring tools, and systematic debugging methodology",
  icon: "🔍",
  version: "1.0.0",
  lastUpdated: "2026-03-13",
  chapters: [
    {
      id: "debugging-ch1",
      title: "Chapter 1 -- Log Analysis & Stack Traces",
      lessons: [
        {
          id: "debugging-1-1",
          title: "Reading Structured Logs & Stack Traces",
          duration: 45,
          type: "Concept",
          bloomLevel: "Analyze",
          learningObjectives: [
            "Read a Python stack trace and identify the file, line, and function where the error originated",
            "Use grep to filter structured logs by request ID, error level, and time range",
            "Combine command-line tools to produce a log analysis summary report"
          ],
          commonMisconceptions: [
            {
              wrong: "The first line of a stack trace is where the error occurred",
              why: "Beginners read stack traces top-to-bottom like normal text",
              correct: "In Python, the most recent call (where the error occurred) is at the BOTTOM of the stack trace. Read from bottom to top to find the root cause.",
              codeExample: "# Read bottom to top:\nTraceback (most recent call last):\n  File \"main.py\", line 10, in main        # called first\n  File \"api.py\", line 25, in send_request  # called second\n  File \"http.py\", line 42, in connect       # error HERE\nConnectionError: Failed to connect"
            },
            {
              wrong: "ERROR-level log entries are always the root cause of a problem",
              why: "ERROR sounds like the most important level so beginners focus only on those",
              correct: "WARN entries often appear before ERRORs and reveal the actual cause. Always check surrounding context and earlier log entries."
            }
          ],
          why: "When a customer sends you an error, it's usually buried in a stack trace or log output. Being able to read these quickly and extract the relevant information is the core skill of technical support.",
          mentalModel: "A stack trace is like a trail of breadcrumbs. The error at the top tells you WHAT happened. Each line below tells you WHERE it happened, with the most recent call at the top. Follow the trail backward to find the root cause.",
          concepts: [
            {
              title: "Structured JSON Logs",
              explanation: "Modern applications log in JSON format, with each log entry containing a timestamp, level, message, and metadata. This structured format makes logs searchable and parseable.",
              example: "When investigating a customer's failed API integration, you'll ask them to share their application logs. Structured logs let you filter by error level, search by request ID, and correlate events across services.",
              codeSnippet: "// Example structured log entries\n{\"timestamp\": \"2024-01-15T10:30:45Z\", \"level\": \"ERROR\", \"message\": \"API call failed\", \"status\": 429, \"request_id\": \"req-abc123\", \"model\": \"claude-sonnet-4-20250514\", \"retry_count\": 3}\n{\"timestamp\": \"2024-01-15T10:30:46Z\", \"level\": \"WARN\", \"message\": \"Rate limit approaching\", \"remaining\": 2, \"reset_at\": \"2024-01-15T10:31:00Z\"}\n{\"timestamp\": \"2024-01-15T10:31:01Z\", \"level\": \"INFO\", \"message\": \"API call succeeded\", \"status\": 200, \"latency_ms\": 1250}"
            }
          ],
          miniExercises: [
            {
              id: "debugging-1-1-m1",
              title: "Mini Exercise 1: Parse a stack trace",
              question: "Given a Python stack trace, identify the file, line number, and function where the error originated.",
              steps: [
                {
                  instruction: "Read the stack trace from bottom to top. The last 'File' line before the error message is where the error occurred. The actual error type and message are on the last line.",
                  example: "In a stack trace, `File \"app.py\", line 42, in process_request` tells you the error is in app.py at line 42 inside the process_request function.",
                  hint: "Always read stack traces from bottom to top -- the root cause is at the bottom."
                }
              ],
              solution: "# The error originated at:\n# File: api_client.py\n# Line: 87\n# Function: send_request\n# Error: ConnectionError: Failed to establish connection to api.anthropic.com",
              explanation: "The bottom of the stack trace shows the immediate cause. But sometimes the real fix is higher up the trace -- for example, fixing how the connection was configured, not how the request was sent."
            },
            {
              id: "debugging-1-1-m2",
              title: "Mini Exercise 2: Filter logs for a specific issue",
              question: "Given a multi-line log output, use grep patterns to find all errors related to a specific request ID.",
              steps: [
                {
                  instruction: "Use grep with the request ID to find all log lines associated with a single request. Chain with grep -i 'error' to narrow to errors only.",
                  hint: "Use `grep -A 2` to show 2 lines after each match for context."
                }
              ],
              solution: "# Find all logs for a specific request\ngrep 'req-abc123' application.log\n\n# Find only errors for that request\ngrep 'req-abc123' application.log | grep -i 'error'\n\n# With context\ngrep -A 2 -B 1 'req-abc123' application.log"
            },
            {
              id: "debugging-1-1-m3",
              title: "Mini Exercise 3: Build a log analysis report",
              question: "Given a day's worth of logs, write a series of commands to produce a summary report showing error counts by type, the most common error, and the time period with the most errors.",
              steps: [
                {
                  instruction: "Combine grep, sort, uniq, and awk to analyze log patterns and produce a summary."
                }
              ]
            }
          ],
          resources: [
            { label: "Datadog Log Management", url: "https://docs.datadoghq.com/logs/" },
            { label: "Sentry Error Tracking", url: "https://docs.sentry.io/" }
          ],
          whyItMatters: "At Datadog, Sentry, and within Anthropic's own infrastructure, structured logging and log analysis are how engineers find needles in haystacks. A customer reporting 'intermittent failures' gives you a vague symptom -- but grepping their logs for patterns of 429s clustered around specific timestamps turns that vague symptom into a clear diagnosis. This is the skill that earns trust from engineering teams."
        }
      ],
      review: {
        id: "debugging-ch1-review",
        type: "ChapterReview",
        coversLessons: ["debugging-1-1"],
        questions: [
          { prompt: "In a Python stack trace, where do you find the line that actually caused the error?", expectedAnswer: "At the bottom, just above the error message. Python stack traces show the most recent call last.", bloomLevel: "Remember", relatedLessonId: "debugging-1-1" },
          { prompt: "Write a grep command to find all ERROR-level log entries for request ID 'req-abc123' with 2 lines of context.", expectedAnswer: "grep 'req-abc123' application.log | grep -i 'error' or grep -A 2 -B 2 'req-abc123.*ERROR' application.log", bloomLevel: "Apply", relatedLessonId: "debugging-1-1" },
          { prompt: "Why should you check WARN-level logs when investigating an ERROR, not just the ERROR entries themselves?", expectedAnswer: "WARN entries often appear before ERRORs and reveal the approaching problem (like 'rate limit approaching') that caused the eventual error.", bloomLevel: "Understand", relatedLessonId: "debugging-1-1" }
        ]
      }
    }
  ]
};
