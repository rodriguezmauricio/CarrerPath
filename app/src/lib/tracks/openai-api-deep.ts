import { Track } from "../types";

export const openaiApiDeepTrack: Track = {
  id: "openai-api-deep",
  title: "OpenAI API & Platform",
  color: "#10A37F",
  subtitle: "Master OpenAI's API ecosystem -- from chat completions and model selection to function calling, assistants, fine-tuning, and embeddings",
  icon: "🤖",
  version: "1.0.0",
  lastUpdated: "2026-03-13",
  tags: ["openai", "api", "gpt", "ai"],
  chapters: [
    {
      id: "openai-api-deep-ch1",
      title: "Chapter 1 -- GPT Models & Chat Completions API",
      lessons: [
        {
          id: "openai-api-deep-1-1",
          title: "Chat Completions, Model Selection & Parameters",
          duration: 60,
          type: "Concept",
          bloomLevel: "Apply",
          learningObjectives: [
            "Construct well-structured chat completion requests using the OpenAI Python SDK with appropriate roles (system, user, assistant)",
            "Select the correct GPT model for a given use case by comparing latency, cost, and capability trade-offs across GPT-4o, GPT-4o-mini, and GPT-4.5",
            "Tune generation parameters (temperature, top_p, max_tokens, frequency_penalty) to control output quality, creativity, and length for different application scenarios"
          ],
          commonMisconceptions: [
            {
              wrong: "Setting temperature to 0 makes the model deterministic and always returns the exact same output",
              why: "Developers assume temperature=0 eliminates all randomness in the generation process",
              correct: "While temperature=0 selects the most likely token at each step (greedy decoding), minor infrastructure changes, floating-point arithmetic differences, and batching can still cause slight variations between identical requests. For true reproducibility, use the seed parameter alongside temperature=0 and check the system_fingerprint in the response.",
              codeExample: "from openai import OpenAI\nclient = OpenAI()\n\n# More reproducible setup\nresponse = client.chat.completions.create(\n    model=\"gpt-4o\",\n    temperature=0,\n    seed=42,  # helps reproducibility\n    messages=[{\"role\": \"user\", \"content\": \"Explain recursion\"}]\n)\nprint(response.system_fingerprint)  # track if infrastructure changed"
            },
            {
              wrong: "GPT-4o is always better than GPT-4o-mini, so you should always use it",
              why: "Newer or larger models are assumed to be universally superior",
              correct: "GPT-4o-mini is significantly cheaper (~$0.15/M input vs ~$2.50/M input), faster, and often performs just as well for straightforward tasks like classification, extraction, and simple Q&A. Reserve GPT-4o or GPT-4.5 for complex reasoning, nuanced generation, or tasks where you've measured a quality difference.",
              codeExample: "# Cost comparison for 1M input + 200K output tokens per day:\n# GPT-4o-mini: $0.15 + $0.60  = $0.75/day\n# GPT-4o:      $2.50 + $10.00 = $12.50/day\n# GPT-4.5:     $75   + $150   = $225/day\n# That's 16x-300x cost difference!"
            }
          ],
          why: "As a support specialist working with OpenAI's platform, the chat completions endpoint is the single most heavily used API. The majority of customer tickets involve incorrect parameter usage, unexpected model behavior, or cost concerns tied to model selection. Understanding these fundamentals lets you quickly triage issues and guide developers to the right configuration.",
          mentalModel: "Think of the chat completions API like ordering at a restaurant. The model is the chef (each with different skill levels and prices). The messages array is your order slip -- system is the kitchen's standing instructions, user is the customer's request, and assistant is what the chef has already served. Temperature is how adventurous you want the chef to be: 0 means 'make it exactly by the book', 1 means 'surprise me', and 2 means 'go wild'. Max_tokens is the plate size -- it caps how much food the chef can serve.",
          concepts: [
            {
              title: "Chat Completions Request Structure",
              explanation: "The chat completions endpoint (/v1/chat/completions) accepts a messages array with role-based entries. The 'system' role sets behavioral instructions, 'user' provides the human input, and 'assistant' allows you to pre-fill or continue a conversation. The model parameter selects which GPT model to use, while parameters like temperature, max_tokens, and top_p control the generation behavior. Understanding this structure is essential because nearly every customer integration builds on it.",
              example: "A customer reports that their chatbot gives wildly different answers to the same question each time. You check their code and find they're using temperature=1.5 with no system prompt. You recommend lowering temperature to 0.3 for consistency and adding a system prompt to constrain behavior. Their satisfaction scores improve immediately.",
              codeSnippet: "from openai import OpenAI\n\nclient = OpenAI()  # reads OPENAI_API_KEY from env\n\n# Well-structured chat completion request\nresponse = client.chat.completions.create(\n    model=\"gpt-4o\",\n    messages=[\n        {\n            \"role\": \"system\",\n            \"content\": \"You are a helpful customer support agent for Acme Corp. \"\n                       \"Be concise, professional, and always offer to escalate \"\n                       \"if the customer is unsatisfied.\"\n        },\n        {\n            \"role\": \"user\",\n            \"content\": \"My order #12345 hasn't arrived yet. It's been 2 weeks.\"\n        }\n    ],\n    temperature=0.3,       # Low for consistent, focused responses\n    max_tokens=500,        # Cap output length\n    top_p=1.0,             # Default; don't set both temperature and top_p\n    frequency_penalty=0.0, # No penalty for repeated tokens\n    presence_penalty=0.0   # No penalty for new topics\n)\n\nprint(response.choices[0].message.content)\nprint(f\"Tokens used: {response.usage.prompt_tokens} in, \"\n      f\"{response.usage.completion_tokens} out\")"
            }
          ],
          miniExercises: [
            {
              id: "openai-api-deep-1-1-m1",
              title: "Mini Exercise 1: Build a chat completion request",
              question: "A developer wants to build a code review bot that analyzes Python code and provides structured feedback. Write the chat completion call with appropriate model selection and parameters.",
              steps: [
                {
                  instruction: "Choose a model, set a system prompt that instructs the model to act as a code reviewer, configure temperature for consistent output, and set a reasonable max_tokens limit.",
                  example: "For a classification task you might use GPT-4o-mini with temperature=0 and max_tokens=100.",
                  hint: "Code review requires reasoning ability but doesn't need creativity -- keep temperature low. GPT-4o is a good balance of cost and capability for code analysis."
                }
              ],
              solution: "from openai import OpenAI\n\nclient = OpenAI()\n\ncode_to_review = \"def fib(n):\\n    if n <= 1: return n\\n    return fib(n-1) + fib(n-2)\"\n\nresponse = client.chat.completions.create(\n    model=\"gpt-4o\",\n    messages=[\n        {\n            \"role\": \"system\",\n            \"content\": \"You are a senior Python code reviewer. Analyze the given code for: \"\n                       \"1) Bugs or correctness issues, 2) Performance problems, \"\n                       \"3) Style/readability. Be specific and suggest fixes.\"\n        },\n        {\n            \"role\": \"user\",\n            \"content\": f\"Review this code:\\n```python\\n{code_to_review}\\n```\"\n        }\n    ],\n    temperature=0.2,\n    max_tokens=1000\n)",
              explanation: "GPT-4o provides strong reasoning for code analysis at a reasonable cost. Low temperature ensures consistent, focused reviews. The system prompt constrains the output format so the bot delivers structured feedback rather than free-form commentary."
            },
            {
              id: "openai-api-deep-1-1-m2",
              title: "Mini Exercise 2: Diagnose unexpected model output",
              question: "A customer says their summarization API returns different-length summaries every time, sometimes 2 sentences and sometimes 2 paragraphs. They want consistent 3-sentence summaries. What parameters and prompt changes would you recommend?",
              steps: [
                {
                  instruction: "Consider how temperature, max_tokens, and the system/user prompt wording can each influence output length and consistency.",
                  example: "Adding 'Respond in exactly 3 bullet points' to the system prompt is more reliable than trying to control length with max_tokens alone.",
                  hint: "max_tokens is a hard ceiling, not a target length. The model doesn't try to fill max_tokens -- it stops when it thinks the response is complete."
                }
              ],
              solution: "response = client.chat.completions.create(\n    model=\"gpt-4o\",\n    messages=[\n        {\n            \"role\": \"system\",\n            \"content\": \"Summarize the following text in exactly 3 sentences. \"\n                       \"Each sentence should capture a key point. \"\n                       \"Do not include any preamble or conclusion.\"\n        },\n        {\"role\": \"user\", \"content\": article_text}\n    ],\n    temperature=0.3,  # Lower for more consistent output\n    max_tokens=300    # Safety cap, not a length target\n)",
              explanation: "Output length is best controlled through explicit instructions in the prompt rather than through max_tokens. Lowering temperature reduces variability in how the model interprets length instructions. The max_tokens parameter should be set as a safety net above your expected output length."
            },
            {
              id: "openai-api-deep-1-1-m3",
              title: "Mini Exercise 3: Model selection cost analysis",
              question: "A startup processes 10,000 customer emails per day. Each email averages 800 tokens input and 200 tokens output. They're using GPT-4o for classification (spam/support/sales). Could they reduce costs? Calculate both options.",
              steps: [
                {
                  instruction: "Calculate daily costs for GPT-4o vs GPT-4o-mini. Consider whether email classification requires GPT-4o's reasoning capabilities.",
                  example: "Cost = (input_tokens * input_price + output_tokens * output_price) * requests_per_day",
                  hint: "Classification tasks are generally well-handled by smaller models. Test GPT-4o-mini accuracy on a sample before recommending a switch."
                }
              ],
              solution: "# Daily volume: 10,000 emails\n# Per email: 800 input tokens, 200 output tokens\n# Total daily: 8M input tokens, 2M output tokens\n\n# GPT-4o pricing:\n# Input: 8M * $2.50/M = $20.00\n# Output: 2M * $10.00/M = $20.00\n# Daily total: $40.00 | Monthly: ~$1,200\n\n# GPT-4o-mini pricing:\n# Input: 8M * $0.15/M = $1.20\n# Output: 2M * $0.60/M = $1.20\n# Daily total: $2.40 | Monthly: ~$72\n\n# Savings: 94% cost reduction\n# Recommendation: Switch to GPT-4o-mini for classification,\n# benchmark accuracy on 500 labeled samples first.",
              explanation: "Classification is a well-defined task where smaller models typically perform comparably to larger ones. The 94% cost saving is significant, but always recommend the customer validates accuracy on their specific data before switching. This is one of the most impactful cost optimizations you can suggest in a support context."
            }
          ],
          resources: [
            { label: "OpenAI Chat Completions API Reference", url: "https://platform.openai.com/docs/api-reference/chat" },
            { label: "OpenAI Models Overview", url: "https://platform.openai.com/docs/models" }
          ],
          whyItMatters: "The chat completions API is the backbone of virtually every OpenAI integration. By mastering model selection, parameter tuning, and request structure, you can resolve the majority of customer issues on first contact -- from debugging unexpected outputs to dramatically reducing their API bills. This knowledge directly translates into faster resolution times and higher customer satisfaction."
        }
      ],
      review: {
        id: "openai-api-deep-ch1-review",
        type: "ChapterReview",
        coversLessons: ["openai-api-deep-1-1"],
        questions: [
          { prompt: "What are the three message roles in the chat completions API and what is each used for?", expectedAnswer: "'system' sets behavioral instructions and constraints for the model. 'user' provides the human's input or question. 'assistant' represents the model's previous responses and can be used to pre-fill or continue multi-turn conversations.", bloomLevel: "Remember", relatedLessonId: "openai-api-deep-1-1" },
          { prompt: "A customer is using GPT-4o with temperature=1.8 for a medical Q&A chatbot and getting unreliable answers. What changes would you recommend and why?", expectedAnswer: "Lower temperature to 0.1-0.3 for factual/medical content where accuracy is critical. High temperature increases randomness and creativity, which is dangerous for medical information. Also add a strong system prompt with safety guardrails and consider using structured outputs for consistent formatting.", bloomLevel: "Apply", relatedLessonId: "openai-api-deep-1-1" },
          { prompt: "Why is max_tokens not an effective way to control output length, and what should be used instead?", expectedAnswer: "max_tokens is a hard ceiling that truncates output mid-sentence if hit -- it doesn't tell the model to target a specific length. Instead, use explicit instructions in the system or user prompt (e.g., 'respond in exactly 3 sentences') to control output length, and set max_tokens as a safety cap above your expected output.", bloomLevel: "Understand", relatedLessonId: "openai-api-deep-1-1" }
        ]
      }
    },
    {
      id: "openai-api-deep-ch2",
      title: "Chapter 2 -- Function Calling & Assistants",
      lessons: [
        {
          id: "openai-api-deep-2-1",
          title: "Function Calling, Tool Use & Structured Outputs",
          duration: 65,
          type: "Concept",
          bloomLevel: "Apply",
          learningObjectives: [
            "Implement function calling with properly defined JSON schemas so the model can invoke external tools and APIs reliably",
            "Use structured outputs with response_format to guarantee valid JSON conforming to a specific schema from the model",
            "Architect multi-step tool-use workflows where the model chains multiple function calls to fulfill complex user requests"
          ],
          commonMisconceptions: [
            {
              wrong: "Function calling means the model actually executes the function on the server",
              why: "The name 'function calling' implies the model runs code, and many developers assume the model directly calls their APIs",
              correct: "The model only generates a JSON object with the function name and arguments. Your application code is responsible for executing the actual function, getting the result, and sending it back to the model in a follow-up message with role 'tool'. The model never executes code itself.",
              codeExample: "from openai import OpenAI\nclient = OpenAI()\n\n# Step 1: Model decides to 'call' a function (just returns JSON)\nresponse = client.chat.completions.create(\n    model=\"gpt-4o\",\n    messages=[{\"role\": \"user\", \"content\": \"What's the weather in Paris?\"}],\n    tools=[{\n        \"type\": \"function\",\n        \"function\": {\n            \"name\": \"get_weather\",\n            \"parameters\": {\n                \"type\": \"object\",\n                \"properties\": {\"city\": {\"type\": \"string\"}},\n                \"required\": [\"city\"]\n            }\n        }\n    }]\n)\n# response.choices[0].message.tool_calls[0].function.arguments\n# => '{\"city\": \"Paris\"}'\n# The model did NOT call any API -- your code must do that!"
            },
            {
              wrong: "Structured outputs and function calling are the same thing",
              why: "Both produce JSON output, so developers confuse when to use which",
              correct: "Function calling is for when you want the model to decide which tool to invoke and with what arguments -- it's about action selection. Structured outputs (response_format with json_schema) guarantee the model's text response conforms to a schema -- it's about output formatting. Use function calling when the model needs to trigger actions; use structured outputs when you need parseable, typed responses.",
              codeExample: "# Structured output: guaranteed JSON format for the response\nresponse = client.chat.completions.create(\n    model=\"gpt-4o\",\n    messages=[{\"role\": \"user\", \"content\": \"Analyze this review\"}],\n    response_format={\n        \"type\": \"json_schema\",\n        \"json_schema\": {\n            \"name\": \"review_analysis\",\n            \"schema\": {\n                \"type\": \"object\",\n                \"properties\": {\n                    \"sentiment\": {\"type\": \"string\", \"enum\": [\"positive\", \"negative\", \"neutral\"]},\n                    \"confidence\": {\"type\": \"number\"}\n                },\n                \"required\": [\"sentiment\", \"confidence\"]\n            }\n        }\n    }\n)\n# Response is GUARANTEED valid JSON matching the schema"
            }
          ],
          why: "Function calling and structured outputs are the features that transform GPT models from text generators into application backends. These are the APIs that power AI agents, chatbots with real-world capabilities, and reliable data extraction pipelines. Support tickets about function calling are often the most complex and high-value -- mastering these features lets you support enterprise customers building production AI systems.",
          mentalModel: "Think of function calling like a human assistant with a phone directory. When you ask 'What's the weather in Paris?', the assistant doesn't magically know -- they look through their directory (the tools list), pick the right contact (function name), write down what to ask (arguments), and hand you the note. YOU make the phone call, get the answer, and tell the assistant what you learned. The assistant then incorporates that information into their final response to you.",
          concepts: [
            {
              title: "Function Calling & Tool Use Loop",
              explanation: "Function calling follows a multi-turn pattern: (1) You send messages plus a list of available tools (functions with JSON Schema parameters). (2) The model responds with a tool_calls array containing the function name and arguments. (3) Your code executes the function and sends the result back as a 'tool' role message. (4) The model generates a final natural language response incorporating the tool results. This loop can repeat for multi-step workflows where the model chains several function calls. Structured outputs complement this by letting you enforce a JSON schema on the model's text responses, guaranteeing parseable output without tool calls.",
              example: "A customer is building a travel booking agent. The agent needs to search flights, check hotel availability, and book reservations. They define three functions (search_flights, check_hotels, book_reservation) and the model orchestrates calling them in sequence based on user requests. When a user says 'Book me a trip to Tokyo next week', the model first calls search_flights, then check_hotels with the flight dates, and finally book_reservation with the user's selections.",
              codeSnippet: "from openai import OpenAI\nimport json\n\nclient = OpenAI()\n\n# Define available tools\ntools = [\n    {\n        \"type\": \"function\",\n        \"function\": {\n            \"name\": \"search_flights\",\n            \"description\": \"Search for available flights between two cities\",\n            \"parameters\": {\n                \"type\": \"object\",\n                \"properties\": {\n                    \"origin\": {\"type\": \"string\", \"description\": \"Departure city IATA code\"},\n                    \"destination\": {\"type\": \"string\", \"description\": \"Arrival city IATA code\"},\n                    \"date\": {\"type\": \"string\", \"description\": \"Travel date in YYYY-MM-DD format\"}\n                },\n                \"required\": [\"origin\", \"destination\", \"date\"]\n            }\n        }\n    }\n]\n\nmessages = [{\"role\": \"user\", \"content\": \"Find flights from SFO to NRT on 2026-04-01\"}]\n\n# Step 1: Model decides to call a function\nresponse = client.chat.completions.create(\n    model=\"gpt-4o\",\n    messages=messages,\n    tools=tools,\n    tool_choice=\"auto\"\n)\n\nassistant_msg = response.choices[0].message\nmessages.append(assistant_msg)\n\n# Step 2: Execute the function yourself\nif assistant_msg.tool_calls:\n    for tool_call in assistant_msg.tool_calls:\n        args = json.loads(tool_call.function.arguments)\n        # YOUR code calls the real API\n        result = search_flights(**args)  # your implementation\n\n        # Step 3: Send result back to the model\n        messages.append({\n            \"role\": \"tool\",\n            \"tool_call_id\": tool_call.id,\n            \"content\": json.dumps(result)\n        })\n\n    # Step 4: Model generates final response with the data\n    final = client.chat.completions.create(\n        model=\"gpt-4o\",\n        messages=messages,\n        tools=tools\n    )\n    print(final.choices[0].message.content)"
            }
          ],
          miniExercises: [
            {
              id: "openai-api-deep-2-1-m1",
              title: "Mini Exercise 1: Define a function tool",
              question: "A customer wants their chatbot to look up order status. Define the tool schema for a get_order_status function that takes an order_id (string, required) and include_tracking (boolean, optional, defaults to false).",
              steps: [
                {
                  instruction: "Create the tools array with a single function definition using proper JSON Schema for the parameters. Include a clear description for the function and each parameter.",
                  example: "Each parameter should have a type, description, and be listed in 'required' if mandatory.",
                  hint: "The 'required' array in JSON Schema only lists parameter names that must be provided. Optional parameters are simply omitted from the 'required' array."
                }
              ],
              solution: "tools = [\n    {\n        \"type\": \"function\",\n        \"function\": {\n            \"name\": \"get_order_status\",\n            \"description\": \"Look up the current status of a customer order by its order ID\",\n            \"parameters\": {\n                \"type\": \"object\",\n                \"properties\": {\n                    \"order_id\": {\n                        \"type\": \"string\",\n                        \"description\": \"The unique order identifier, e.g. ORD-12345\"\n                    },\n                    \"include_tracking\": {\n                        \"type\": \"boolean\",\n                        \"description\": \"Whether to include shipping tracking details. Defaults to false.\"\n                    }\n                },\n                \"required\": [\"order_id\"]\n            }\n        }\n    }\n]",
              explanation: "Clear parameter descriptions help the model correctly extract values from natural language. The 'required' array ensures the model always provides essential parameters while leaving optional ones for cases where the user explicitly requests them (like asking for tracking info)."
            },
            {
              id: "openai-api-deep-2-1-m2",
              title: "Mini Exercise 2: Handle the tool call loop",
              question: "A customer's function calling implementation crashes because they're trying to access response.choices[0].message.content directly, but it's None when the model makes a tool call. Fix their code to properly handle both tool calls and regular responses.",
              steps: [
                {
                  instruction: "Check whether the response contains tool_calls before accessing content. When tool_calls are present, content may be None. Process the tool calls, send results back, and then get the final content response.",
                  example: "if response.choices[0].message.tool_calls: ... else: print(response.choices[0].message.content)",
                  hint: "The finish_reason field also helps: 'tool_calls' means the model wants to call a function, 'stop' means it's a regular text response."
                }
              ],
              solution: "response = client.chat.completions.create(\n    model=\"gpt-4o\",\n    messages=messages,\n    tools=tools\n)\n\nmsg = response.choices[0].message\n\n# Check finish_reason or tool_calls\nif msg.tool_calls:\n    # Model wants to call function(s) -- content may be None\n    messages.append(msg)\n    for tc in msg.tool_calls:\n        fn_name = tc.function.name\n        fn_args = json.loads(tc.function.arguments)\n        result = dispatch_function(fn_name, fn_args)\n        messages.append({\n            \"role\": \"tool\",\n            \"tool_call_id\": tc.id,\n            \"content\": json.dumps(result)\n        })\n    # Get final response after tool execution\n    final = client.chat.completions.create(\n        model=\"gpt-4o\", messages=messages, tools=tools\n    )\n    print(final.choices[0].message.content)\nelse:\n    # Regular text response\n    print(msg.content)",
              explanation: "This is one of the most common function calling bugs in support tickets. When the model decides to call a tool, the message content is typically None and the data is in tool_calls instead. Robust code must always check for tool_calls before accessing content."
            },
            {
              id: "openai-api-deep-2-1-m3",
              title: "Mini Exercise 3: Structured output for data extraction",
              question: "A customer needs to extract structured data from unstructured support emails -- specifically the customer name, issue category (billing/technical/account), urgency (low/medium/high), and a one-line summary. Implement this using structured outputs.",
              steps: [
                {
                  instruction: "Use response_format with json_schema to define the exact output structure. Use enum types for categorical fields to constrain the model's output to valid values.",
                  example: "response_format={\"type\": \"json_schema\", \"json_schema\": {\"name\": \"...\", \"schema\": {...}}}",
                  hint: "The 'strict' field set to true in the json_schema ensures 100% schema adherence. All properties should be listed as required when using strict mode, and additionalProperties must be false."
                }
              ],
              solution: "import json\nfrom openai import OpenAI\n\nclient = OpenAI()\n\nemail = \"Hi, I'm John Smith. I've been charged twice for my Pro subscription this month. This is urgent -- please fix ASAP!\"\n\nresponse = client.chat.completions.create(\n    model=\"gpt-4o\",\n    messages=[\n        {\"role\": \"system\", \"content\": \"Extract structured data from customer support emails.\"},\n        {\"role\": \"user\", \"content\": email}\n    ],\n    response_format={\n        \"type\": \"json_schema\",\n        \"json_schema\": {\n            \"name\": \"email_extraction\",\n            \"strict\": True,\n            \"schema\": {\n                \"type\": \"object\",\n                \"properties\": {\n                    \"customer_name\": {\"type\": \"string\"},\n                    \"category\": {\"type\": \"string\", \"enum\": [\"billing\", \"technical\", \"account\"]},\n                    \"urgency\": {\"type\": \"string\", \"enum\": [\"low\", \"medium\", \"high\"]},\n                    \"summary\": {\"type\": \"string\"}\n                },\n                \"required\": [\"customer_name\", \"category\", \"urgency\", \"summary\"],\n                \"additionalProperties\": False\n            }\n        }\n    }\n)\n\ndata = json.loads(response.choices[0].message.content)\n# {\"customer_name\": \"John Smith\", \"category\": \"billing\",\n#  \"urgency\": \"high\", \"summary\": \"Double charged for Pro subscription\"}",
              explanation: "Structured outputs with strict mode guarantee the response is valid JSON matching your schema. This eliminates the need for fragile regex parsing or try/except blocks around JSON parsing. The enum constraints ensure categorical fields always contain valid values, making downstream processing reliable."
            }
          ],
          resources: [
            { label: "OpenAI Function Calling Guide", url: "https://platform.openai.com/docs/guides/function-calling" },
            { label: "OpenAI Structured Outputs Guide", url: "https://platform.openai.com/docs/guides/structured-outputs" }
          ],
          whyItMatters: "Function calling and structured outputs are what make AI applications production-ready. Without function calling, chatbots can only generate text. With it, they can check databases, call APIs, and take real actions. Without structured outputs, you're parsing free-form text with brittle regex. These features are central to the highest-value enterprise use cases, and deep knowledge of them positions you to support the most important customer integrations."
        }
      ],
      review: {
        id: "openai-api-deep-ch2-review",
        type: "ChapterReview",
        coversLessons: ["openai-api-deep-2-1"],
        questions: [
          { prompt: "Describe the four steps in the function calling loop when a user asks a question that requires external data.", expectedAnswer: "1) Send the user message along with tool definitions to the model. 2) The model responds with tool_calls containing the function name and arguments as JSON. 3) Your code executes the actual function and sends the result back as a 'tool' role message with the matching tool_call_id. 4) The model generates a final natural language response incorporating the tool results.", bloomLevel: "Remember", relatedLessonId: "openai-api-deep-2-1" },
          { prompt: "A customer's code crashes with 'NoneType has no attribute strip' after a function calling response. What is likely wrong and how do you fix it?", expectedAnswer: "They are accessing response.choices[0].message.content directly, but when the model makes a tool call the content field is None. The fix is to check for tool_calls first (if msg.tool_calls:) and only access content when the model returns a regular text response (finish_reason='stop').", bloomLevel: "Apply", relatedLessonId: "openai-api-deep-2-1" },
          { prompt: "When should a developer use structured outputs (response_format) versus function calling, and why are they not interchangeable?", expectedAnswer: "Use structured outputs when you need the model's text response in a guaranteed JSON format (e.g., data extraction, classification). Use function calling when the model needs to decide which external action to take and with what arguments. They serve different purposes: structured outputs control response format, while function calling enables the model to trigger actions in your application.", bloomLevel: "Understand", relatedLessonId: "openai-api-deep-2-1" }
        ]
      }
    }
  ]
};
