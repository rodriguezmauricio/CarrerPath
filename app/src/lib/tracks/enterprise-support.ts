import { Track } from "../types";

export const enterpriseSupportTrack: Track = {
  id: "enterprise-support",
  title: "Enterprise Support Skills",
  color: "#6366f1",
  subtitle: "Ticket lifecycle, SLAs, tooling, and enterprise communication",
  icon: "🏢",
  version: "1.0.0",
  lastUpdated: "2026-03-13",
  chapters: [
    {
      id: "enterprise-support-ch1",
      title: "Chapter 1 -- Support Processes & Methodology",
      lessons: [
        {
          id: "enterprise-support-1-1",
          title: "Ticket Lifecycle & SLA Management",
          duration: 40,
          type: "Domain",
          bloomLevel: "Evaluate",
          learningObjectives: [
            "Classify incoming tickets into P1-P4 priority levels based on impact and urgency",
            "Write clear SLA breach escalation messages with all required context",
            "Design a ticket triage decision tree that routes issues to the correct team"
          ],
          commonMisconceptions: [
            {
              wrong: "The customer's stated urgency should determine the ticket priority",
              why: "Beginners want to be responsive and take the customer's word at face value",
              correct: "Priority is based on objective criteria: production impact, number of users affected, and availability of workarounds -- not the customer's emotional tone.",
              codeExample: "// Customer says: 'URGENT!!! Fix immediately!!!'\n// But the issue is: 'Logo misaligned on settings page'\n// Correct priority: P4 (cosmetic, no functional impact)\n// Not P1 just because the customer used caps lock"
            },
            {
              wrong: "Escalation means you failed to solve the problem",
              why: "Beginners see escalation as admitting defeat",
              correct: "Escalation is a normal, expected part of the support process. Timely escalation to the right team is a sign of good judgment, not failure."
            }
          ],
          why: "Enterprise customers pay significant sums for guaranteed response times. Understanding the ticket lifecycle and SLA obligations isn't just process -- it's the difference between keeping and losing a major account.",
          concepts: [
            {
              title: "Ticket Priority Levels",
              explanation: "Tickets are classified P1 (critical, production down) through P4 (minor, feature request). Each level has different response time SLAs and escalation paths.",
              example: "A Fortune 500 bank's Claude-powered trading assistant stops working at market open. This is a P1 -- production is down, money is being lost every minute, and the SLA requires a response within 15 minutes and a resolution within 4 hours.",
              codeSnippet: "// SLA Response Time Guidelines\nconst SLA_TARGETS = {\n  P1: { first_response: '15 min', resolution: '4 hours',  description: 'Production down' },\n  P2: { first_response: '1 hour',  resolution: '24 hours', description: 'Major feature broken' },\n  P3: { first_response: '4 hours', resolution: '72 hours', description: 'Minor issue, workaround exists' },\n  P4: { first_response: '24 hours', resolution: '2 weeks',  description: 'Enhancement request' }\n};"
            }
          ],
          miniExercises: [
            {
              id: "enterprise-support-1-1-m1",
              title: "Mini Exercise 1: Classify ticket priority",
              question: "Given 5 customer reports, assign the correct priority level to each.",
              steps: [
                {
                  instruction: "Read each scenario and classify as P1-P4 based on: Is production affected? How many users are impacted? Is there a workaround?",
                  example: "Scenario: 'Our logo is slightly misaligned on the settings page' = P4 (cosmetic, no functional impact).",
                  hint: "The key question for P1 vs P2 is: is the customer's business losing money right now?"
                }
              ],
              solution: "// 1. 'All API calls returning 500' = P1 (production down)\n// 2. 'Streaming not working, non-streaming works' = P2 (major feature broken, workaround exists)\n// 3. 'Documentation has a typo' = P4 (enhancement)\n// 4. 'One user can't log in' = P3 (minor, affects single user)\n// 5. 'Data export includes wrong timezone' = P3 (minor, workaround: manual conversion)",
              explanation: "Priority classification is about impact and urgency. P1 means the customer's core business function is impaired with no workaround. P2 means a major feature is broken but they can work around it."
            },
            {
              id: "enterprise-support-1-1-m2",
              title: "Mini Exercise 2: Write an SLA breach escalation",
              question: "A P2 ticket has been open for 20 hours with no resolution. Write an internal escalation message to engineering.",
              steps: [
                {
                  instruction: "Include: ticket ID, customer name, issue summary, time elapsed, SLA deadline, business impact, and what you need from engineering.",
                  hint: "Be factual, not emotional. Engineers respond to clear problem statements, not urgency language."
                }
              ],
              solution: "// Subject: [SLA BREACH RISK] P2 Ticket #4521 - 4 hours to SLA\n// Customer: Acme Corp (Enterprise tier)\n// Issue: Messages API returning 400 for all tool_use requests since 14:00 UTC\n// Duration: 20 hours (SLA target: 24 hours)\n// Impact: Customer's AI assistant product is partially down for ~50k end users\n// Investigated: Confirmed valid request format, issue persists across models\n// Need: Engineering to check if recent deployment affected tool_use parsing"
            },
            {
              id: "enterprise-support-1-1-m3",
              title: "Mini Exercise 3: Design a ticket triage workflow",
              question: "Design a triage decision tree for incoming Anthropic support tickets that routes to the right team and priority level.",
              steps: [
                {
                  instruction: "Create a flowchart (in pseudocode) that asks key questions to determine priority and routing."
                }
              ]
            }
          ],
          resources: [
            { label: "ITIL Service Management", url: "https://www.axelos.com/best-practice-solutions/itil" },
            { label: "Zendesk Best Practices", url: "https://www.zendesk.com/blog/customer-support-best-practices/" }
          ],
          whyItMatters: "At Anthropic, Salesforce, and AWS, SLA management directly impacts revenue. An enterprise customer paying $500K/year expects their P1 tickets handled with military precision. One missed SLA can trigger contract renegotiations or customer churn. The engineers who master ticket lifecycle management become the backbone of the support organization."
        }
      ],
      review: {
        id: "enterprise-support-ch1-review",
        type: "ChapterReview",
        coversLessons: ["enterprise-support-1-1"],
        questions: [
          { prompt: "What are the four ticket priority levels and their typical first-response SLA targets?", expectedAnswer: "P1: 15 min (production down), P2: 1 hour (major feature broken), P3: 4 hours (minor issue), P4: 24 hours (enhancement request).", bloomLevel: "Remember", relatedLessonId: "enterprise-support-1-1" },
          { prompt: "A customer reports streaming is broken but non-streaming works. Is this P1 or P2, and why?", expectedAnswer: "P2 -- a major feature is broken but there is a workaround (non-streaming). P1 requires no workaround to be available.", bloomLevel: "Evaluate", relatedLessonId: "enterprise-support-1-1" },
          { prompt: "What five elements should every SLA breach escalation message include?", expectedAnswer: "Ticket ID, customer name/tier, issue summary, time elapsed vs SLA deadline, and specific ask from engineering.", bloomLevel: "Remember", relatedLessonId: "enterprise-support-1-1" }
        ]
      }
    }
  ]
};
