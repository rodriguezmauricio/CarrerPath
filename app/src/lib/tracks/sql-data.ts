import { Track } from '../types';

export const sqlDataTrack: Track = {
  id: "sql-data",
  title: "SQL & Data",
  color: "#f59e0b",
  subtitle: "Query databases to investigate issues and analyze patterns",
  icon: "🗄️",
  version: "1.0.0",
  lastUpdated: "2026-03-13",
  chapters: [
    {
      id: "sql-data-ch1",
      title: "Chapter 1 -- SQL Fundamentals",
      lessons: [
        {
          id: "sql-data-1-1",
          title: "SELECT, WHERE, ORDER BY & Filtering",
          duration: 40,
          type: "Concept",
          bloomLevel: "Apply",
          learningObjectives: [
            "Write SELECT queries to retrieve specific columns from a table",
            "Filter rows using WHERE with multiple conditions and operators",
            "Combine GROUP BY with HAVING to aggregate and filter grouped data"
          ],
          commonMisconceptions: [
            {
              wrong: "WHERE and HAVING do the same thing and are interchangeable",
              why: "Both filter rows, so beginners think they're synonyms",
              correct: "WHERE filters individual rows before grouping. HAVING filters groups after aggregation. Use WHERE for row-level conditions and HAVING for aggregate conditions.",
              codeExample: "-- WHERE filters rows BEFORE grouping\nSELECT org_id, COUNT(*) FROM api_requests\nWHERE status_code = 429\nGROUP BY org_id\nHAVING COUNT(*) > 100; -- HAVING filters AFTER grouping"
            },
            {
              wrong: "Using SELECT * is fine for production queries",
              why: "It's convenient and returns everything",
              correct: "SELECT * is slow on large tables, returns unnecessary data, and breaks if columns are added or removed. Always specify the columns you need."
            }
          ],
          why: "When investigating customer issues, you often need to query internal databases to find their account details, usage patterns, or error logs. SQL is the universal language for this.",
          mentalModel: "A SQL query is like asking a librarian a very specific question. SELECT is what books you want, FROM is which shelf, WHERE is the filter criteria, and ORDER BY is how you want them sorted.",
          concepts: [
            {
              title: "SELECT and FROM",
              explanation: "SELECT specifies which columns you want, and FROM specifies which table to query. Together they form the most basic SQL query.",
              example: "When a customer asks 'how many API calls did I make last month?', you'd SELECT the count from the api_requests table filtered by their organization ID.",
              codeSnippet: "-- Get customer details for a support ticket\nSELECT customer_name, email, plan_tier, api_key_prefix\nFROM customers\nWHERE org_id = 'org-abc123';"
            },
            {
              title: "WHERE Clause Filtering",
              explanation: "WHERE filters rows based on conditions. You can combine conditions with AND, OR, and use operators like =, !=, >, <, LIKE, IN, and BETWEEN.",
              example: "When investigating rate limiting complaints, you'd filter the request log by customer ID and timestamp range to see their actual request volume.",
              codeSnippet: "-- Find rate-limited requests in the last 24 hours\nSELECT request_id, timestamp, status_code, model\nFROM api_requests\nWHERE org_id = 'org-abc123'\n  AND status_code = 429\n  AND timestamp >= NOW() - INTERVAL '24 hours'\nORDER BY timestamp DESC;"
            }
          ],
          miniExercises: [
            {
              id: "sql-data-1-1-m1",
              title: "Mini Exercise 1: Write a basic SELECT query",
              question: "Write a query to find all customers on the 'enterprise' plan tier.",
              steps: [
                {
                  instruction: "Use SELECT to pick the columns customer_name and email FROM the customers table WHERE plan_tier equals 'enterprise'.",
                  example: "SELECT product_name, price FROM products WHERE category = 'electronics';",
                  hint: "String values in SQL must be wrapped in single quotes, not double quotes."
                }
              ],
              solution: "SELECT customer_name, email\nFROM customers\nWHERE plan_tier = 'enterprise';",
              explanation: "The basic pattern is always SELECT [columns] FROM [table] WHERE [condition]. Single quotes are used for string literals in SQL."
            },
            {
              id: "sql-data-1-1-m2",
              title: "Mini Exercise 2: Filter with multiple conditions",
              question: "Find all API requests that returned errors (status >= 400) for a specific customer in the last week.",
              steps: [
                {
                  instruction: "Combine multiple WHERE conditions using AND. Use >= for the status code and a date comparison for the timestamp.",
                  hint: "In PostgreSQL, use NOW() - INTERVAL '7 days' for date arithmetic."
                }
              ],
              solution: "SELECT request_id, status_code, model, timestamp\nFROM api_requests\nWHERE org_id = 'org-abc123'\n  AND status_code >= 400\n  AND timestamp >= NOW() - INTERVAL '7 days'\nORDER BY timestamp DESC;"
            },
            {
              id: "sql-data-1-1-m3",
              title: "Mini Exercise 3: Complex filtering with aggregation",
              question: "Write a query to find which customers had more than 100 errors in the last 24 hours, sorted by error count.",
              steps: [
                {
                  instruction: "Use GROUP BY with HAVING to filter groups, and COUNT(*) to aggregate. This combines filtering, grouping, and sorting."
                }
              ]
            }
          ],
          resources: [
            { label: "SQLBolt Interactive Tutorial", url: "https://sqlbolt.com/" },
            { label: "PostgreSQL Documentation", url: "https://www.postgresql.org/docs/" }
          ],
          whyItMatters: "At Anthropic, support engineers regularly query internal databases to investigate usage patterns, verify billing disputes, and trace error histories. Without SQL skills, you'd have to ask a data analyst for every simple lookup -- adding hours of delay to ticket resolution. Companies like Stripe and Datadog expect their support engineers to be self-sufficient with SQL."
        }
      ],
      review: {
        id: "sql-data-ch1-review",
        type: "ChapterReview",
        coversLessons: ["sql-data-1-1"],
        questions: [
          { prompt: "Write a query to find all enterprise customers who had API errors in the last 24 hours.", expectedAnswer: "SELECT customer_name, email FROM customers c JOIN api_requests r ON c.org_id = r.org_id WHERE c.plan_tier = 'enterprise' AND r.status_code >= 400 AND r.timestamp >= NOW() - INTERVAL '24 hours';", bloomLevel: "Apply", relatedLessonId: "sql-data-1-1" },
          { prompt: "What is the difference between WHERE and HAVING in a SQL query?", expectedAnswer: "WHERE filters individual rows before grouping. HAVING filters groups after aggregation with GROUP BY.", bloomLevel: "Understand", relatedLessonId: "sql-data-1-1" },
          { prompt: "Why should you avoid SELECT * in production queries?", expectedAnswer: "It returns unnecessary columns, is slower on large tables, and breaks if the schema changes. Always specify needed columns.", bloomLevel: "Remember", relatedLessonId: "sql-data-1-1" }
        ]
      }
    }
  ]
};
