import { Track } from "../types";

export const complianceTrack: Track = {
  id: "compliance",
  title: "Compliance & Enterprise Concepts",
  color: "#14b8a6",
  subtitle: "GDPR, SOC 2, SCIM, and enterprise IT requirements",
  icon: "📋",
  version: "1.0.0",
  lastUpdated: "2026-03-13",
  chapters: [
    {
      id: "compliance-ch1",
      title: "Chapter 1 -- Data Privacy & Compliance",
      lessons: [
        {
          id: "compliance-1-1",
          title: "GDPR, SOC 2 & Data Processing Agreements",
          duration: 45,
          type: "Domain",
          bloomLevel: "Understand",
          learningObjectives: [
            "Answer customer GDPR questions about data usage, storage, and deletion rights",
            "Explain SOC 2 certification in plain language to non-technical stakeholders",
            "Identify compliance requirements for regulated industries like healthcare and finance"
          ],
          commonMisconceptions: [
            {
              wrong: "GDPR only applies to companies based in the EU",
              why: "The regulation is European, so beginners assume it only governs EU companies",
              correct: "GDPR applies to any company that processes data of EU residents, regardless of where the company is headquartered."
            },
            {
              wrong: "Having SOC 2 certification means a company is fully secure",
              why: "Certifications sound like a guarantee of security",
              correct: "SOC 2 verifies that specific controls are in place, but it's a point-in-time audit, not an ongoing guarantee. It covers processes, not outcomes."
            }
          ],
          why: "Enterprise customers can't use Claude until their legal and compliance teams approve it. You'll field questions about data residency, processing agreements, and compliance certifications weekly. Knowing this material means you can unblock deals.",
          concepts: [
            {
              title: "GDPR Basics for Support",
              explanation: "GDPR (General Data Protection Regulation) governs how companies handle personal data of EU residents. Key rights include: access, deletion, portability, and the right to know how data is processed.",
              example: "A European bank wants to use Claude for customer service automation but their DPO (Data Protection Officer) needs to know: where is the data processed, is it stored, and can they request deletion? You need to answer these confidently.",
              codeSnippet: "// Common GDPR questions and Anthropic's position\nconst gdprFAQ = {\n  'data_storage': 'API inputs/outputs are not stored for training by default',\n  'data_residency': 'Check current data processing regions on trust page',\n  'right_to_deletion': 'Customers can request data deletion per DPA terms',\n  'dpa_available': 'Enterprise DPA available upon request',\n  'sub_processors': 'List of sub-processors available on trust page'\n};"
            }
          ],
          miniExercises: [
            {
              id: "compliance-1-1-m1",
              title: "Mini Exercise 1: Answer a GDPR compliance question",
              question: "A customer's legal team asks: 'Does Anthropic use our API data to train models?' Draft a response.",
              steps: [
                {
                  instruction: "Write a clear, factual response that addresses data usage, references official documentation, and offers to connect them with the appropriate team for a DPA.",
                  example: "For a similar question about data retention: 'By default, API data is retained for [X] days for abuse monitoring, after which it is automatically deleted. This is documented in our Terms of Service section 4.2.'",
                  hint: "Never make promises you're not sure about. Use phrases like 'per our current policy' and 'I'll confirm with our trust team'."
                }
              ],
              solution: "// Draft response:\n// 'Per Anthropic\\'s current API Terms, data submitted through the API is not\n// used to train our models. For enterprise customers, we offer a Data Processing\n// Agreement (DPA) that provides additional contractual guarantees. I can connect\n// you with our Trust team to review the DPA and discuss your specific compliance\n// requirements. Our Trust & Safety page at trust.anthropic.com has the most\n// current information on our data practices.'",
              explanation: "Compliance responses must be factual, reference official sources, and never make guarantees beyond what's documented. Always offer to escalate to the trust/legal team for binding commitments."
            },
            {
              id: "compliance-1-1-m2",
              title: "Mini Exercise 2: Explain SOC 2 to a non-technical buyer",
              question: "A procurement manager asks 'What is SOC 2 and do you have it?' Write a plain-language explanation.",
              steps: [
                {
                  instruction: "Explain SOC 2 without jargon. Cover what it certifies, why it matters, and how to share the report.",
                  hint: "SOC 2 reports are confidential -- they're shared under NDA, not posted publicly."
                }
              ],
              solution: "// 'SOC 2 is an independent audit that verifies a company\\'s security controls.\n// It covers five areas: security, availability, processing integrity,\n// confidentiality, and privacy. Think of it as a report card from an independent\n// auditor confirming that we handle your data securely. SOC 2 reports are\n// confidential documents -- I can arrange for our Trust team to share ours\n// under NDA with your security team.'"
            },
            {
              id: "compliance-1-1-m3",
              title: "Mini Exercise 3: Navigate a complex compliance scenario",
              question: "A healthcare company wants to process patient data through Claude. Identify all compliance considerations and draft a response.",
              steps: [
                {
                  instruction: "Consider HIPAA, BAA requirements, data residency, de-identification, and whether a BAA is available."
                }
              ]
            }
          ],
          resources: [
            { label: "Anthropic Trust Center", url: "https://trust.anthropic.com/" },
            { label: "GDPR Official Text", url: "https://gdpr-info.eu/" }
          ],
          whyItMatters: "At Anthropic, compliance questions can block six-figure enterprise deals. When Stripe, Notion, or a major bank evaluates Claude, their security team sends a 200-question vendor assessment. A support specialist who can confidently answer GDPR, SOC 2, and DPA questions accelerates the sales cycle by weeks. This knowledge directly impacts Anthropic's revenue."
        }
      ],
      review: {
        id: "compliance-ch1-review",
        type: "ChapterReview",
        coversLessons: ["compliance-1-1"],
        questions: [
          { prompt: "Does GDPR apply to Anthropic even though the company is US-based? Why?", expectedAnswer: "Yes, because GDPR applies to any company processing data of EU residents, regardless of where the company is headquartered.", bloomLevel: "Understand", relatedLessonId: "compliance-1-1" },
          { prompt: "A customer asks if Anthropic uses API data to train models. What is the correct response?", expectedAnswer: "Per Anthropic's API Terms, data submitted through the API is not used to train models. Offer a DPA for contractual guarantees and refer to the Trust page.", bloomLevel: "Remember", relatedLessonId: "compliance-1-1" },
          { prompt: "Why are SOC 2 reports shared under NDA rather than posted publicly?", expectedAnswer: "SOC 2 reports contain detailed information about internal security controls that could be exploited if made public. They are confidential by industry standard.", bloomLevel: "Understand", relatedLessonId: "compliance-1-1" }
        ]
      }
    }
  ]
};
