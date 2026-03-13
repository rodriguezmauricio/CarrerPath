import { Track } from "../types";

export const softSkillsTrack: Track = {
  id: "soft-skills",
  title: "Soft Skills & Communication",
  color: "#a855f7",
  subtitle: "Empathy, prioritization, and cross-functional communication",
  icon: "💬",
  version: "1.0.0",
  lastUpdated: "2026-03-13",
  chapters: [
    {
      id: "soft-skills-ch1",
      title: "Chapter 1 -- Written Communication for Support",
      lessons: [
        {
          id: "soft-skills-1-1",
          title: "Empathy, Clarity & De-escalation in Writing",
          duration: 35,
          type: "Domain",
          bloomLevel: "Apply",
          learningObjectives: [
            "Rewrite technical responses using the EAR (Empathize, Acknowledge, Resolve) framework",
            "Translate technical jargon into plain language for non-technical stakeholders",
            "Draft de-escalation responses for angry enterprise customers"
          ],
          commonMisconceptions: [
            {
              wrong: "Being empathetic means agreeing with the customer even when they're wrong",
              why: "Beginners confuse empathy with agreement",
              correct: "Empathy means acknowledging the customer's experience and frustration, not validating incorrect assumptions. You can be empathetic while still correcting a misunderstanding."
            },
            {
              wrong: "Technical accuracy is more important than tone in support responses",
              why: "Engineers value correctness above all else",
              correct: "A technically correct response that feels dismissive erodes trust. The best responses are both accurate AND empathetic -- accuracy without empathy leads to churn."
            }
          ],
          why: "Technical skills get you to the right answer. Communication skills get the customer to trust that answer. The best diagnosis in the world is useless if the customer doesn't understand it or feels dismissed.",
          mentalModel: "Every support interaction is a trust transaction. The customer is spending trust to ask for help. Your response either deposits trust (clear, empathetic, competent) or withdraws it (dismissive, jargon-heavy, slow). Your goal is to always leave the trust balance higher than you found it.",
          concepts: [
            {
              title: "The EAR Framework",
              explanation: "EAR stands for Empathize, Acknowledge, Resolve. Every support response should follow this pattern: show you understand the impact, confirm what went wrong, then provide the fix.",
              example: "A frustrated CTO emails at midnight: 'Claude has been returning errors for 3 hours and our entire product is down. Nobody has responded.' An EAR response transforms a potential churn event into a loyalty moment.",
              codeSnippet: "// EAR Framework Template\nconst response = `\n// EMPATHIZE: Show you understand the impact\n\"I completely understand the urgency -- having your product down for 3 hours\ndirectly impacts your customers and your business. I'm sorry for the\ndelayed response.\"\n\n// ACKNOWLEDGE: Confirm the problem\n\"I've confirmed that there was an elevated error rate on our Messages API\nbetween 9:00 PM and 11:45 PM UTC, which would have caused the 500 errors\nyou're seeing.\"\n\n// RESOLVE: Provide the fix + prevention\n\"The issue has been resolved as of 11:45 PM UTC. Your integration should\nbe fully functional now. I'd recommend implementing retry logic with\nexponential backoff to handle future transient errors gracefully.\n[link to retry guide]\"\n`;"
            }
          ],
          miniExercises: [
            {
              id: "soft-skills-1-1-m1",
              title: "Mini Exercise 1: Rewrite a response using EAR",
              question: "A support engineer wrote: 'The error is a 429. You need to reduce your request rate.' Rewrite it using the EAR framework.",
              steps: [
                {
                  instruction: "Take the factually correct but emotionally cold response and add empathy, acknowledge the customer's experience, then provide actionable resolution with specific steps.",
                  example: "Bad: 'Your certificate expired. Renew it.'\nGood: 'I can see why this is frustrating -- your service going down unexpectedly is stressful. The root cause is that your TLS certificate expired on March 1st. Here's how to renew it and set up auto-renewal so this doesn't happen again: [steps]'",
                  hint: "The customer doesn't just need to know WHAT happened -- they need to feel heard and get a clear path forward."
                }
              ],
              solution: "// Rewritten with EAR:\n// \"I understand how disruptive it is when your API calls start failing\n// unexpectedly, especially if this is affecting your production service.\n//\n// What's happening is that your application is exceeding the rate limit\n// for your current plan tier, which results in 429 (Too Many Requests)\n// responses.\n//\n// Here's how to fix this:\n// 1. Implement exponential backoff (code example below)\n// 2. Add request queuing to smooth out burst traffic\n// 3. If your usage has grown, I can help you explore a higher tier\n//    that better matches your needs.\n//\n// Would any of these be helpful to walk through together?\"",
              explanation: "The rewritten version acknowledges the customer's frustration, explains the problem clearly, and provides three actionable options. The closing question invites dialogue rather than closing the conversation."
            },
            {
              id: "soft-skills-1-1-m2",
              title: "Mini Exercise 2: Translate technical jargon for a non-technical stakeholder",
              question: "An engineer's root cause analysis says: 'The 502 was caused by an upstream timeout in the load balancer when the p99 latency exceeded the 30s threshold during a traffic spike.' Translate this for a VP of Product.",
              steps: [
                {
                  instruction: "Rewrite using plain language. Replace technical terms with their business impact. Keep it to 2-3 sentences.",
                  hint: "The VP doesn't care about load balancers. They care about: what happened, why, and will it happen again."
                }
              ],
              solution: "// For the VP:\n// \"The outage was caused by a surge in traffic that overwhelmed our\n// system's capacity to respond within the expected time. When requests\n// took longer than 30 seconds, they were automatically cancelled, which\n// caused errors for end users. We're increasing our capacity threshold\n// to handle similar traffic spikes in the future.\""
            },
            {
              id: "soft-skills-1-1-m3",
              title: "Mini Exercise 3: Handle an angry enterprise escalation",
              question: "A CTO writes: 'This is the third outage this month. We're evaluating competitors. I need a call with your VP of Engineering TODAY.' Draft a response that de-escalates, addresses their concerns, and protects the relationship.",
              steps: [
                {
                  instruction: "Address the pattern (not just this incident), show accountability, propose concrete next steps, and handle the meeting request diplomatically."
                }
              ]
            }
          ],
          resources: [
            { label: "Intercom's Customer Support Guide", url: "https://www.intercom.com/books/customer-support" },
            { label: "HBR: The Value of Customer Empathy", url: "https://hbr.org/2015/05/the-new-science-of-customer-emotions" }
          ],
          whyItMatters: "At Anthropic, your written communication represents the company to its most important customers. Stripe's support team is legendary because every response follows frameworks like EAR -- they turned support into a competitive advantage. The ability to de-escalate a furious CTO while providing a technical resolution is what separates a good support engineer from a great one. You just learned the communication patterns that build customer loyalty."
        }
      ],
      review: {
        id: "soft-skills-ch1-review",
        type: "ChapterReview",
        coversLessons: ["soft-skills-1-1"],
        questions: [
          { prompt: "What does EAR stand for in the support communication framework?", expectedAnswer: "Empathize, Acknowledge, Resolve -- show you understand the impact, confirm the problem, then provide the fix.", bloomLevel: "Remember", relatedLessonId: "soft-skills-1-1" },
          { prompt: "Rewrite this response using EAR: 'The error is a 429. Reduce your request rate.'", expectedAnswer: "Empathize with the disruption, acknowledge the rate limiting issue, then resolve with specific steps (backoff strategy, request queuing, tier upgrade options).", bloomLevel: "Apply", relatedLessonId: "soft-skills-1-1" },
          { prompt: "Why is empathy not the same as agreeing with the customer?", expectedAnswer: "Empathy acknowledges the customer's experience and frustration without validating incorrect assumptions. You can be empathetic while still correcting misunderstandings.", bloomLevel: "Understand", relatedLessonId: "soft-skills-1-1" }
        ]
      }
    }
  ]
};
