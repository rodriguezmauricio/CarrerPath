import { Track } from '../types';

export const coreLangTrack: Track = {
  id: "core-lang",
  title: "Core Language & Scripting",
  color: "#3b82f6",
  subtitle: "Python, JavaScript & Bash -- the languages of modern technical support",
  icon: "💻",
  version: "1.0.0",
  lastUpdated: "2026-03-13",
  chapters: [
    {
      id: "core-lang-ch1",
      title: "Chapter 1 -- Python Fundamentals",
      lessons: [
        {
          id: "core-lang-1-1",
          title: "Syntax, Data Types & Control Flow",
          duration: 45,
          type: "Concept",
          bloomLevel: "Remember",
          learningObjectives: [
            "Declare variables and identify their types using type()",
            "Write if/elif/else chains to classify HTTP status codes",
            "Use for loops to iterate through collections and count occurrences"
          ],
          commonMisconceptions: [
            {
              wrong: "Python variables must be declared with a type keyword like int or str",
              why: "Many beginners come from statically-typed languages like Java or C++ where type declarations are required",
              correct: "Python infers the type from the assigned value -- no type keyword is needed",
              codeExample: "# Wrong assumption:\n# int x = 5\n\n# Correct Python:\nx = 5  # Python knows this is an int"
            },
            {
              wrong: "Indentation in Python is just for readability and doesn't affect execution",
              why: "In most other languages, indentation is optional and braces define blocks",
              correct: "Python uses indentation to define code blocks -- incorrect indentation causes IndentationError"
            }
          ],
          why: "Every Anthropic support ticket eventually requires reading or writing Python. Whether you're reproducing a customer's API call, parsing error logs, or building internal tools, Python fluency is non-negotiable.",
          mentalModel: "Python is like a universal translator -- it speaks to APIs, databases, files, and the command line equally well. Learning Python first means you can debug anything a customer sends you.",
          concepts: [
            {
              title: "Variables & Data Types",
              explanation: "Python variables are dynamically typed containers that hold values. You don't declare a type -- Python infers it from the value you assign.",
              example: "When an Anthropic customer reports unexpected API behavior, the first debugging step is storing the response in a variable and inspecting its type to ensure the data is what you expect.",
              codeSnippet: "# Storing API response data for inspection\napi_key = \"sk-ant-api03-...\"  # str\nmax_tokens = 1024              # int\ntemperature = 0.7              # float\nis_streaming = True            # bool\n\n# Check types when debugging\nprint(type(max_tokens))  # <class 'int'>\nprint(type(temperature)) # <class 'float'>"
            },
            {
              title: "Control Flow with if/elif/else",
              explanation: "Control flow lets your code make decisions. Python uses indentation (not braces) to define code blocks, which makes it readable but strict about whitespace.",
              example: "When triaging API errors, you need to branch logic based on HTTP status codes. A 429 means rate limiting, a 401 means bad authentication, and a 500 means something broke server-side.",
              codeSnippet: "status_code = 429\n\nif status_code == 200:\n    print(\"Success -- response received\")\nelif status_code == 429:\n    print(\"Rate limited -- implement exponential backoff\")\nelif status_code == 401:\n    print(\"Authentication failed -- check API key\")\nelse:\n    print(f\"Unexpected status: {status_code}\")"
            },
            {
              title: "Loops and Iteration",
              explanation: "Loops let you repeat operations. Python's for loop iterates over sequences directly (no index needed), while while loops run until a condition becomes false.",
              example: "When a customer reports intermittent errors, you might need to loop through their request logs to find patterns -- checking timestamps, error codes, and request IDs across hundreds of entries.",
              codeSnippet: "# Iterate through error logs\nerror_codes = [200, 200, 429, 200, 500, 429]\n\nrate_limit_count = 0\nfor code in error_codes:\n    if code == 429:\n        rate_limit_count += 1\n\nprint(f\"Rate limit hits: {rate_limit_count}\")  # 2"
            }
          ],
          miniExercises: [
            {
              id: "core-lang-1-1-m1",
              title: "Mini Exercise 1: Store and inspect API configuration",
              question: "Create variables to hold common Anthropic API parameters and print their types.",
              steps: [
                {
                  instruction: "Create a Python file. Define a variable called `model` and set it to the string \"claude-sonnet-4-20250514\". In Python, strings are wrapped in quotes.",
                  example: "engine = \"gpt-4\"  # A string variable for a different API",
                  hint: "Python strings can use single or double quotes, but be consistent."
                },
                {
                  instruction: "Add a variable called `max_tokens` set to the integer 4096. Integers in Python don't need quotes.",
                  example: "timeout = 30  # An integer representing seconds",
                  hint: "Don't wrap numbers in quotes -- that would make them strings, not integers."
                }
              ],
              codeSnippet: "# Your code here\nmodel = ?\nmax_tokens = ?",
              solution: "model = \"claude-sonnet-4-20250514\"\nmax_tokens = 4096\ntemperature = 0.7\nprint(type(model))       # <class 'str'>\nprint(type(max_tokens))  # <class 'int'>\nprint(type(temperature)) # <class 'float'>",
              explanation: "Each variable automatically gets the correct type based on its value. Strings use quotes, integers are bare numbers, and floats have a decimal point. The type() function confirms what Python inferred."
            },
            {
              id: "core-lang-1-1-m2",
              title: "Mini Exercise 2: Write an error classifier",
              question: "Write an if/elif/else chain that classifies an HTTP status code into 'success', 'client error', or 'server error'.",
              steps: [
                {
                  instruction: "Create a variable `status` set to 403. Then write an if statement that checks if status is between 200-299 (inclusive). Python lets you chain comparisons: `200 <= status <= 299`.",
                  example: "if 100 <= code <= 199:\n    category = \"informational\"",
                  hint: "Python's chained comparison (200 <= x <= 299) is cleaner than writing x >= 200 and x <= 299."
                }
              ],
              codeSnippet: "status = 403\n# Classify into: success, client_error, server_error",
              solution: "status = 403\nif 200 <= status <= 299:\n    category = \"success\"\nelif 400 <= status <= 499:\n    category = \"client_error\"\nelse:\n    category = \"server_error\"\nprint(category)  # client_error"
            },
            {
              id: "core-lang-1-1-m3",
              title: "Mini Exercise 3: Analyze a batch of API responses",
              question: "Given a list of response status codes, count how many are successes, client errors, and server errors using a loop.",
              steps: [
                {
                  instruction: "Create a list of mixed status codes and use a for loop with if/elif/else to count each category. Track counts in separate variables initialized to 0.",
                  hint: "Remember to initialize your counter variables before the loop, not inside it."
                }
              ],
              codeSnippet: "responses = [200, 201, 400, 200, 500, 429, 200, 503]"
            }
          ],
          exercise: {
            title: "Build an API Response Analyzer",
            description: [
              "Create a Python script that analyzes a batch of API responses.",
              "Define a list of dictionaries, each with 'status_code', 'latency_ms', and 'model' keys.",
              "Loop through the responses and categorize each by status code range.",
              "Calculate the average latency across all responses.",
              "Find the slowest response and print its details.",
              "Print a summary report with counts per category."
            ],
            steps: [
              {
                instruction: "Create a new file called `response_analyzer.py`. At the top, define a list of dictionaries representing API responses.",
                example: "# Example with different data\norders = [\n    {\"id\": \"ord-1\", \"amount\": 99.99, \"status\": \"completed\"},\n    {\"id\": \"ord-2\", \"amount\": 45.50, \"status\": \"pending\"}\n]",
                hint: "Each dictionary uses curly braces {} and key-value pairs separated by colons."
              }
            ]
          },
          resources: [
            { label: "Python Official Tutorial", url: "https://docs.python.org/3/tutorial/" },
            { label: "Python for Beginners (freeCodeCamp)", url: "https://www.freecodecamp.org/learn/scientific-computing-with-python/" }
          ],
          whyItMatters: "At Anthropic, every support engineer writes Python daily. When a customer reports that their Claude integration is returning unexpected responses, the first thing you'll do is write a quick Python script to reproduce the issue using their exact parameters. Engineers who can't think in Python syntax waste hours on what should be a 5-minute reproduction. You just learned the exact building blocks that every debugging script starts with."
        }
      ],
      review: {
        id: "core-lang-ch1-review",
        type: "ChapterReview",
        coversLessons: ["core-lang-1-1"],
        questions: [
          { prompt: "What are the three basic data types you use most when storing API configuration values in Python?", expectedAnswer: "str (for API keys and model names), int (for max_tokens), and float (for temperature)", bloomLevel: "Remember", relatedLessonId: "core-lang-1-1" },
          { prompt: "Why does Python use indentation instead of braces to define code blocks, and what error do you get if indentation is wrong?", expectedAnswer: "Python uses indentation for readability as a core design philosophy. Incorrect indentation raises an IndentationError.", bloomLevel: "Understand", relatedLessonId: "core-lang-1-1" },
          { prompt: "Write a for loop that counts how many 429 status codes appear in a list of HTTP responses.", expectedAnswer: "Initialize a counter to 0, loop through the list, increment counter when code == 429, print the result.", bloomLevel: "Apply", relatedLessonId: "core-lang-1-1" }
        ]
      }
    },
    {
      id: "core-lang-ch2",
      title: "Chapter 2 -- JavaScript & Node.js Essentials",
      lessons: [
        {
          id: "core-lang-2-1",
          title: "ES6+ Fundamentals & Async/Await",
          duration: 50,
          type: "Concept",
          bloomLevel: "Understand",
          learningObjectives: [
            "Convert traditional functions to arrow function syntax",
            "Use destructuring to extract fields from API response objects",
            "Implement async/await with try/catch for error handling in API calls"
          ],
          prerequisites: ["core-lang-1-1"],
          commonMisconceptions: [
            {
              wrong: "await pauses the entire JavaScript program until the async call completes",
              why: "Beginners confuse await with synchronous blocking since the code reads sequentially",
              correct: "await only pauses the current async function -- other code and event handlers continue to run",
              codeExample: "// await pauses THIS function, not the whole program\nasync function fetchData() {\n  const data = await fetch(url); // only this function waits\n}\nfetchData();\nconsole.log('This runs immediately, not after fetch completes');"
            },
            {
              wrong: "Arrow functions and regular functions are interchangeable in all cases",
              why: "Arrow syntax looks like shorthand for regular functions",
              correct: "Arrow functions don't have their own 'this' binding, which matters in class methods and event handlers"
            }
          ],
          why: "Most Anthropic customers build web applications with JavaScript. When they send you code snippets showing their integration, you need to read and understand modern JS syntax fluently.",
          concepts: [
            {
              title: "Arrow Functions & Destructuring",
              explanation: "Arrow functions are a concise way to write functions in JavaScript. Destructuring lets you pull values out of objects and arrays into named variables.",
              example: "When an Anthropic customer sends you their API integration code, it will almost always use arrow functions and destructured response objects. You need to read this as fluently as English.",
              codeSnippet: "// Arrow function calling Claude API\nconst callClaude = async (prompt) => {\n  const response = await fetch('https://api.anthropic.com/v1/messages', {\n    method: 'POST',\n    headers: { 'x-api-key': process.env.API_KEY },\n    body: JSON.stringify({ model: 'claude-sonnet-4-20250514', messages: [{ role: 'user', content: prompt }] })\n  });\n  const { content, usage } = await response.json();  // destructuring\n  return content;\n};"
            },
            {
              title: "Promises & Async/Await",
              explanation: "Async/await is syntactic sugar over Promises that makes asynchronous code read like synchronous code. Every API call is async -- it takes time to get a response.",
              example: "Every customer integration with the Anthropic API involves async operations. When a customer reports 'my code hangs' or 'I get an unhandled promise rejection', understanding async flow is how you diagnose it.",
              codeSnippet: "// Common pattern: async API call with error handling\nconst getCompletion = async (userMessage) => {\n  try {\n    const response = await anthropic.messages.create({\n      model: 'claude-sonnet-4-20250514',\n      max_tokens: 1024,\n      messages: [{ role: 'user', content: userMessage }]\n    });\n    return response.content[0].text;\n  } catch (error) {\n    if (error.status === 429) {\n      console.log('Rate limited -- retrying...');\n    }\n    throw error;\n  }\n};"
            }
          ],
          miniExercises: [
            {
              id: "core-lang-2-1-m1",
              title: "Mini Exercise 1: Rewrite a function using arrow syntax",
              question: "Convert a traditional function declaration to an arrow function.",
              steps: [
                {
                  instruction: "Take the function `function formatError(code, msg) { return code + ': ' + msg; }` and rewrite it as an arrow function. Arrow syntax: `const name = (params) => expression`.",
                  example: "// Traditional\nfunction add(a, b) { return a + b; }\n// Arrow\nconst add = (a, b) => a + b;",
                  hint: "For single-expression arrow functions, you can omit the curly braces and the return keyword."
                }
              ],
              solution: "const formatError = (code, msg) => `${code}: ${msg}`;",
              explanation: "Arrow functions are more concise. When the body is a single expression, you can omit braces and return. Template literals (backticks) are preferred over string concatenation in modern JS."
            },
            {
              id: "core-lang-2-1-m2",
              title: "Mini Exercise 2: Destructure an API response",
              question: "Extract specific fields from a nested API response object using destructuring.",
              steps: [
                {
                  instruction: "Given a response object, use destructuring to extract `model`, `content`, and `usage` in one line.",
                  example: "const { name, age } = { name: 'Alice', age: 30, city: 'Dublin' };",
                  hint: "The variable names in destructuring must match the object's key names exactly."
                }
              ],
              solution: "const { model, content, usage } = response;\nconst { input_tokens, output_tokens } = usage;"
            },
            {
              id: "core-lang-2-1-m3",
              title: "Mini Exercise 3: Build an async retry wrapper",
              question: "Write an async function that retries a failed API call up to 3 times with a delay between attempts.",
              steps: [
                {
                  instruction: "Create an async function called `retryCall` that takes a function as a parameter, calls it, and retries on failure. Use a for loop with try/catch inside.",
                  hint: "Use `await new Promise(r => setTimeout(r, 1000))` to add a 1-second delay between retries."
                }
              ]
            }
          ],
          resources: [
            { label: "MDN JavaScript Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" },
            { label: "JavaScript.info - Modern Tutorial", url: "https://javascript.info/" }
          ],
          whyItMatters: "Over 60% of Anthropic's API customers use JavaScript or TypeScript. When you're reading a customer's code in a support ticket, recognizing arrow functions, destructuring, and async/await instantly is the difference between solving the ticket in 10 minutes versus 2 hours. You just built the JS fluency that makes enterprise customers trust you as a technical partner."
        }
      ],
      review: {
        id: "core-lang-ch2-review",
        type: "ChapterReview",
        coversLessons: ["core-lang-2-1"],
        questions: [
          { prompt: "What is the key difference between arrow functions and regular functions regarding 'this' binding?", expectedAnswer: "Arrow functions do not have their own 'this' -- they inherit 'this' from the enclosing scope.", bloomLevel: "Understand", relatedLessonId: "core-lang-2-1" },
          { prompt: "Rewrite `function greet(name) { return 'Hello ' + name; }` as an arrow function.", expectedAnswer: "const greet = (name) => `Hello ${name}`;", bloomLevel: "Apply", relatedLessonId: "core-lang-2-1" },
          { prompt: "What happens if you forget to use 'await' before an async function call?", expectedAnswer: "You get a Promise object instead of the resolved value, which can lead to bugs where you operate on a Promise rather than actual data.", bloomLevel: "Understand", relatedLessonId: "core-lang-2-1" }
        ]
      }
    }
  ]
};
