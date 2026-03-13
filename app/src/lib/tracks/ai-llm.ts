import { Track } from "../types";

export const aiLlmTrack: Track = {
  id: "ai-llm",
  title: "AI & LLM Knowledge",
  color: "#f97316",
  subtitle: "Tokens, context windows, prompting, and how Claude works under the hood",
  icon: "🧠",
  version: "1.0.0",
  lastUpdated: "2026-03-13",
  chapters: [
    {
      id: "ai-llm-ch1",
      title: "Chapter 1 -- How LLMs Work",
      lessons: [
        {
          id: "ai-llm-1-1",
          title: "Tokens, Context Windows & Model Parameters",
          duration: 55,
          type: "Concept",
          bloomLevel: "Understand",
          learningObjectives: [
            "Estimate token counts for text, code, and documents using the 4-chars-per-token rule",
            "Diagnose context window exceeded errors and recommend appropriate solutions",
            "Calculate API costs based on input and output token usage"
          ],
          commonMisconceptions: [
            {
              wrong: "One token equals one word",
              why: "The word 'token' intuitively suggests a single word unit",
              correct: "A token is roughly 4 characters or 0.75 words. Common words are one token, but rare or long words get split into multiple tokens.",
              codeExample: "// 'Hello' = 1 token\n// 'anthropic' = 2-3 tokens\n// 'supercalifragilistic' = 5+ tokens\n// Code tokenizes less efficiently than prose"
            },
            {
              wrong: "Using a larger context window always gives better results",
              why: "Beginners assume more context means the model knows more",
              correct: "Stuffing irrelevant context can actually degrade response quality and increases cost. Send only the relevant information for best results."
            }
          ],
          why: "As an Anthropic support specialist, understanding how LLMs process text is your competitive advantage. When customers ask 'why did Claude give a weird response?' or 'why am I being charged so much?', the answer always comes back to tokens and context windows.",
          mentalModel: "Tokens are like Scrabble tiles. Each tile represents a piece of a word (not always a full word). The context window is the size of your Scrabble board -- it limits how many tiles you can have in play at once. Once the board is full, something has to come off.",
          concepts: [
            {
              title: "Tokenization",
              explanation: "LLMs don't read text as words -- they break text into tokens, which are sub-word pieces. Common words are single tokens, while rare words get split into multiple tokens. This affects both cost and context limits.",
              example: "A customer complains that their API calls are expensive. You check their token usage and find they're sending 50,000 tokens per request because they're including their entire codebase as context instead of just the relevant files.",
              codeSnippet: "# Token counting matters for billing\nimport anthropic\n\nclient = anthropic.Anthropic()\n\n# This prompt is ~15 tokens\nshort_prompt = \"What is the capital of France?\"\n\n# This prompt might be 50,000+ tokens\nlong_prompt = entire_codebase + \"\\nExplain this code\"\n\n# Cost = (input_tokens + output_tokens) * price_per_token\n# Claude Sonnet: $3/M input, $15/M output tokens"
            }
          ],
          miniExercises: [
            {
              id: "ai-llm-1-1-m1",
              title: "Mini Exercise 1: Estimate token counts",
              question: "Given several text samples, estimate the token count for each and calculate the API cost.",
              steps: [
                {
                  instruction: "A rough rule: 1 token is approximately 4 characters or 0.75 words in English. Use this to estimate tokens for a 500-word email, a 2000-line code file, and a 10-page PDF.",
                  example: "A tweet (280 chars) is roughly 280/4 = 70 tokens.",
                  hint: "Code tends to tokenize less efficiently than prose because of special characters and formatting."
                }
              ],
              solution: "// 500-word email ≈ 500 / 0.75 ≈ 667 tokens\n// 2000-line code file ≈ 2000 * 40 chars / 4 ≈ 20,000 tokens\n// 10-page PDF ≈ 10 * 500 words / 0.75 ≈ 6,667 tokens\n\n// Cost for all three as one request (Claude Sonnet):\n// Input: (667 + 20000 + 6667) = 27,334 tokens\n// Cost: 27,334 * $3/1M = $0.082",
              explanation: "Token estimation helps you quickly assess whether a customer's usage pattern is reasonable and predict costs. Real tokenizers (like Anthropic's) will give exact counts, but this estimation is useful for quick support conversations."
            },
            {
              id: "ai-llm-1-1-m2",
              title: "Mini Exercise 2: Diagnose a context window error",
              question: "A customer gets an error: 'prompt is too long: 210,000 tokens > 200,000 token limit'. Help them fix it.",
              steps: [
                {
                  instruction: "Identify strategies to reduce token usage: chunking documents, summarizing, using a model with a larger context window, or implementing RAG.",
                  hint: "Sometimes the fix is architectural (RAG) rather than just truncating input."
                }
              ],
              solution: "// Solutions in order of preference:\n// 1. Use prompt caching to reduce repeated context ($0.30/M vs $3/M)\n// 2. Implement RAG to only send relevant document sections\n// 3. Upgrade to a model with larger context if available\n// 4. Chunk the document and process in multiple calls\n// 5. Pre-summarize large documents before sending"
            },
            {
              id: "ai-llm-1-1-m3",
              title: "Mini Exercise 3: Optimize a customer's prompt for cost",
              question: "A customer is spending $500/day on API calls. Analyze their usage pattern and propose optimizations to reduce cost by 50% without sacrificing quality.",
              steps: [
                {
                  instruction: "Consider: prompt caching, system prompt optimization, model selection (Haiku vs Sonnet vs Opus), batching, and output token limits."
                }
              ]
            }
          ],
          resources: [
            { label: "Anthropic Tokenizer", url: "https://docs.anthropic.com/en/docs/build-with-claude/token-counting" },
            { label: "Anthropic Pricing", url: "https://www.anthropic.com/pricing" }
          ],
          whyItMatters: "At Anthropic, token management is the #1 topic in customer support. Every billing question, every 'context too long' error, and every 'Claude forgot what I said earlier' complaint comes back to understanding tokens and context windows. You now have the mental model that lets you explain these concepts clearly to customers ranging from solo developers to enterprise CTOs."
        }
      ],
      review: {
        id: "ai-llm-ch1-review",
        type: "ChapterReview",
        coversLessons: ["ai-llm-1-1"],
        questions: [
          { prompt: "Roughly how many tokens is a 1000-word English document?", expectedAnswer: "About 1,333 tokens (1000 / 0.75 words per token).", bloomLevel: "Remember", relatedLessonId: "ai-llm-1-1" },
          { prompt: "A customer's prompt is 210,000 tokens but the limit is 200,000. List three strategies to fix this.", expectedAnswer: "1) Implement RAG to send only relevant sections, 2) Use prompt caching for repeated context, 3) Pre-summarize large documents before sending.", bloomLevel: "Apply", relatedLessonId: "ai-llm-1-1" },
          { prompt: "Why can stuffing more context into a prompt actually make responses worse?", expectedAnswer: "Irrelevant context can distract the model, dilute the important information, and cause it to focus on the wrong parts of the input.", bloomLevel: "Understand", relatedLessonId: "ai-llm-1-1" }
        ]
      }
    }
  ]
};
