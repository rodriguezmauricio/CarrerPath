import { Track } from '../types';

export const apisTrack: Track = {
  id: "apis",
  title: "APIs & Technical Integrations",
  color: "#8b5cf6",
  subtitle: "Master REST, the Anthropic API, and integration debugging",
  icon: "🔌",
  version: "1.0.0",
  lastUpdated: "2026-03-13",
  chapters: [
    {
      id: "apis-ch1",
      title: "Chapter 1 -- REST API Fundamentals",
      lessons: [
        {
          id: "apis-1-1",
          title: "HTTP Methods, Status Codes & Request Structure",
          duration: 55,
          type: "Concept",
          bloomLevel: "Remember",
          learningObjectives: [
            "Identify the correct HTTP method for common API operations",
            "Map HTTP status codes to their meaning and recommended action",
            "Construct a complete API request with correct headers and body structure"
          ],
          commonMisconceptions: [
            {
              wrong: "A 500 error always means the API provider has a bug",
              why: "Beginners assume server errors are always the server's fault",
              correct: "A 500 can be triggered by malformed input that the server didn't validate gracefully -- always check the request first",
              codeExample: "// A 500 caused by client-side issue:\n// Sending invalid JSON:\n// '{model: claude}' -- missing quotes around keys\n// vs valid JSON:\n// '{\"model\": \"claude-sonnet-4-20250514\"}'"
            },
            {
              wrong: "GET and POST are interchangeable -- you can send data with either",
              why: "Beginners see both methods successfully return data and assume they work the same way",
              correct: "GET requests should only retrieve data and have no body. POST creates resources and carries data in the body. Using the wrong method returns 405 Method Not Allowed."
            }
          ],
          why: "Every single Anthropic support interaction involves APIs. Understanding HTTP methods, status codes, and request structure is like a doctor understanding anatomy -- it's the foundation everything else builds on.",
          mentalModel: "Think of an API like a restaurant. The HTTP method is your type of request (GET = 'show me the menu', POST = 'place an order'). The status code is the waiter's response ('200 = here's your food', '404 = we don't serve that').",
          concepts: [
            {
              title: "HTTP Methods",
              explanation: "HTTP methods (also called verbs) tell the server what action you want to perform. The most common are GET (retrieve), POST (create), PUT (replace), PATCH (update), and DELETE (remove).",
              example: "When a customer calls the Anthropic Messages API, they always use POST because they're creating a new message completion. If they accidentally use GET, they'll get a 405 Method Not Allowed error.",
              codeSnippet: "# POST to create a message (correct)\ncurl -X POST https://api.anthropic.com/v1/messages \\\n  -H \"x-api-key: $API_KEY\" \\\n  -H \"content-type: application/json\" \\\n  -d '{\"model\": \"claude-sonnet-4-20250514\", \"max_tokens\": 1024, \"messages\": [{\"role\": \"user\", \"content\": \"Hello\"}]}'"
            },
            {
              title: "HTTP Status Codes",
              explanation: "Status codes are 3-digit numbers that tell you what happened. 2xx = success, 4xx = client error (your fault), 5xx = server error (our fault). Each specific code tells a different story.",
              example: "The most common Anthropic API errors are 401 (invalid API key), 429 (rate limited), and 529 (API overloaded). Knowing these instantly lets you triage customer issues in seconds.",
              codeSnippet: "// Common Anthropic API status codes\nconst STATUS_MAP = {\n  200: 'Success',\n  400: 'Bad Request -- malformed JSON or missing required field',\n  401: 'Unauthorized -- invalid API key',\n  403: 'Forbidden -- API key lacks permission',\n  404: 'Not Found -- wrong endpoint URL',\n  429: 'Rate Limited -- too many requests',\n  500: 'Internal Server Error -- Anthropic-side issue',\n  529: 'API Overloaded -- temporary capacity issue'\n};"
            },
            {
              title: "Request & Response Structure",
              explanation: "Every HTTP request has a method, URL, headers (metadata), and optionally a body (data). The response mirrors this with a status code, headers, and a body containing the result.",
              example: "When a customer says 'the API isn't working', the first thing you ask for is the full request and response. Headers reveal auth issues, the body reveals data format problems, and the status code tells you the category of error.",
              codeSnippet: "// Anatomy of an Anthropic API request\nconst request = {\n  method: 'POST',\n  url: 'https://api.anthropic.com/v1/messages',\n  headers: {\n    'x-api-key': 'sk-ant-...',\n    'anthropic-version': '2023-06-01',\n    'content-type': 'application/json'\n  },\n  body: {\n    model: 'claude-sonnet-4-20250514',\n    max_tokens: 1024,\n    messages: [{ role: 'user', content: 'Explain REST APIs' }]\n  }\n};"
            }
          ],
          miniExercises: [
            {
              id: "apis-1-1-m1",
              title: "Mini Exercise 1: Match status codes to meanings",
              question: "Given a list of status codes, write a function that returns a human-readable description for each.",
              steps: [
                {
                  instruction: "Create an object (dictionary) mapping status codes to descriptions. Include at least 200, 400, 401, 429, and 500.",
                  example: "const httpMethods = {\n  'GET': 'Retrieve a resource',\n  'POST': 'Create a new resource'\n};",
                  hint: "Use numeric keys in your object. In JavaScript, object keys are always strings, but you can use numbers and they'll be converted."
                }
              ],
              solution: "const statusDescriptions = {\n  200: 'Success',\n  400: 'Bad Request',\n  401: 'Unauthorized',\n  429: 'Rate Limited',\n  500: 'Internal Server Error'\n};\n\nconst describe = (code) => statusDescriptions[code] || 'Unknown';",
              explanation: "Object lookup is O(1) -- much faster than if/else chains. The || 'Unknown' provides a fallback for codes not in our map."
            },
            {
              id: "apis-1-1-m2",
              title: "Mini Exercise 2: Build a request object",
              question: "Construct a complete Anthropic API request object with correct headers and body structure.",
              steps: [
                {
                  instruction: "Create a JavaScript object with method, url, headers, and body properties matching the Anthropic API specification.",
                  hint: "Don't forget the 'anthropic-version' header -- it's required for all Anthropic API calls."
                }
              ],
              solution: "const request = {\n  method: 'POST',\n  url: 'https://api.anthropic.com/v1/messages',\n  headers: {\n    'x-api-key': process.env.ANTHROPIC_API_KEY,\n    'anthropic-version': '2023-06-01',\n    'content-type': 'application/json'\n  },\n  body: JSON.stringify({\n    model: 'claude-sonnet-4-20250514',\n    max_tokens: 256,\n    messages: [{ role: 'user', content: 'Hello Claude' }]\n  })\n};"
            },
            {
              id: "apis-1-1-m3",
              title: "Mini Exercise 3: Classify and handle multiple API errors",
              question: "Write a function that takes an array of response objects and returns a summary of error categories with counts and recommended actions.",
              steps: [
                {
                  instruction: "Create a function that loops through responses, groups them by status code category, and returns actionable advice for each error type found."
                }
              ]
            }
          ],
          resources: [
            { label: "MDN HTTP Status Codes", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status" },
            { label: "Anthropic API Reference", url: "https://docs.anthropic.com/en/api" }
          ],
          whyItMatters: "At Anthropic, you will handle 50+ API-related support tickets per week. The difference between a junior and senior support engineer is speed of diagnosis -- and that comes from instantly recognizing status codes, knowing which headers to check, and understanding request structure without thinking. Bloomberg, Stripe, and every major tech company expects this fluency from their support teams."
        }
      ],
      review: {
        id: "apis-ch1-review",
        type: "ChapterReview",
        coversLessons: ["apis-1-1"],
        questions: [
          { prompt: "Which HTTP method does the Anthropic Messages API use, and why?", expectedAnswer: "POST, because you are creating a new message completion -- POST is used for creating resources.", bloomLevel: "Remember", relatedLessonId: "apis-1-1" },
          { prompt: "A customer gets a 401 error. What is the most likely cause and what should they check?", expectedAnswer: "Invalid or missing API key. They should verify the x-api-key header value and ensure the key hasn't been revoked.", bloomLevel: "Understand", relatedLessonId: "apis-1-1" },
          { prompt: "What three required headers must every Anthropic API request include?", expectedAnswer: "x-api-key (authentication), anthropic-version (API version), and content-type: application/json (body format).", bloomLevel: "Remember", relatedLessonId: "apis-1-1" }
        ]
      }
    }
  ]
};
