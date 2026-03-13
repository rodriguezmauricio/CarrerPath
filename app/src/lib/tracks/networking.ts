import { Track } from "../types";

export const networkingTrack: Track = {
  id: "networking",
  title: "Networking & Infrastructure",
  color: "#06b6d4",
  subtitle: "DNS, HTTP, cloud platforms, and how the internet actually works",
  icon: "🌐",
  version: "1.0.0",
  lastUpdated: "2026-03-13",
  chapters: [
    {
      id: "networking-ch1",
      title: "Chapter 1 -- Networking Fundamentals",
      lessons: [
        {
          id: "networking-1-1",
          title: "DNS, HTTP/HTTPS & TLS",
          duration: 50,
          type: "Concept",
          bloomLevel: "Analyze",
          learningObjectives: [
            "Use nslookup and dig to diagnose DNS resolution failures",
            "Interpret TLS certificate errors and recommend fixes",
            "Execute a systematic network diagnostic workflow for API connectivity issues"
          ],
          commonMisconceptions: [
            {
              wrong: "If a website works in the browser, DNS must be fine for all applications",
              why: "Beginners don't realize different apps can use different DNS resolvers",
              correct: "Browsers, curl, and application runtimes may use different DNS configurations. A server might use a corporate DNS that hasn't propagated a change yet."
            },
            {
              wrong: "A TLS certificate error always means the server's certificate is expired",
              why: "The error message says 'certificate problem' so beginners blame the server",
              correct: "The client's CA certificate bundle can also be outdated, causing it to reject a perfectly valid server certificate. Both sides need checking."
            }
          ],
          why: "When a customer says 'the API is down', it's often a networking issue on their end -- DNS resolution failures, TLS certificate problems, or firewall blocks. Understanding the network stack lets you diagnose these instantly.",
          concepts: [
            {
              title: "DNS Resolution",
              explanation: "DNS (Domain Name System) translates human-readable domain names (api.anthropic.com) into IP addresses that computers use to connect. DNS issues are a common source of 'the API is unreachable' tickets.",
              example: "An enterprise customer reports that Claude API calls work from their developer laptops but not from their production servers. The cause: their corporate DNS server hasn't propagated a recent DNS change, so the servers can't resolve api.anthropic.com.",
              codeSnippet: "# Check DNS resolution for Anthropic API\n$ nslookup api.anthropic.com\nServer:  8.8.8.8\nAddress: 8.8.8.8#53\n\nNon-authoritative answer:\napi.anthropic.com canonical name = ...\nAddress: 104.18.xx.xx\n\n# If this fails, the customer has a DNS problem"
            }
          ],
          miniExercises: [
            {
              id: "networking-1-1-m1",
              title: "Mini Exercise 1: Trace a DNS resolution",
              question: "Use command-line tools to check DNS resolution for a domain.",
              steps: [
                {
                  instruction: "Run `nslookup api.anthropic.com` and identify the IP address returned. Then try `dig api.anthropic.com` for more detailed output.",
                  example: "nslookup google.com returns 142.250.x.x",
                  hint: "If nslookup fails, the issue is DNS-related, not API-related."
                }
              ],
              solution: "# Step 1: Basic lookup\nnslookup api.anthropic.com\n\n# Step 2: Detailed lookup with dig\ndig api.anthropic.com +short\n\n# Step 3: Check specific DNS server\nnslookup api.anthropic.com 8.8.8.8",
              explanation: "nslookup gives you the IP address. dig gives more detail including TTL (time to live). Testing against 8.8.8.8 (Google's DNS) helps determine if the issue is with the customer's DNS server."
            },
            {
              id: "networking-1-1-m2",
              title: "Mini Exercise 2: Diagnose a TLS certificate error",
              question: "Given a curl error output showing a certificate problem, identify the cause and recommend a fix.",
              steps: [
                {
                  instruction: "Analyze this error: `curl: (60) SSL certificate problem: certificate has expired`. What does this mean and what should the customer do?",
                  hint: "The error could be from the server's cert OR the client's CA bundle being outdated."
                }
              ],
              solution: "# Check certificate details\nopenssl s_client -connect api.anthropic.com:443 -servername api.anthropic.com\n\n# If the server cert is fine, the client's CA bundle is outdated\n# Fix: Update the OS CA certificates\n# Ubuntu: sudo update-ca-certificates\n# macOS: Update to latest OS version"
            },
            {
              id: "networking-1-1-m3",
              title: "Mini Exercise 3: Full network diagnostic workflow",
              question: "A customer reports 'Cannot connect to the Anthropic API'. Create a step-by-step diagnostic checklist using command-line tools.",
              steps: [
                {
                  instruction: "Design a systematic 5-step diagnostic process that checks DNS, connectivity, TLS, firewall, and proxy settings."
                }
              ]
            }
          ],
          resources: [
            { label: "How DNS Works (comic)", url: "https://howdns.works/" },
            { label: "Cloudflare Learning Center", url: "https://www.cloudflare.com/learning/" }
          ],
          whyItMatters: "At Anthropic, networking issues account for a significant percentage of 'API not working' tickets. At companies like Cloudflare and AWS, support engineers who understand DNS, TLS, and routing resolve tickets 3x faster than those who treat the network as a black box. You just learned the diagnostic toolkit that separates senior support engineers from juniors."
        }
      ],
      review: {
        id: "networking-ch1-review",
        type: "ChapterReview",
        coversLessons: ["networking-1-1"],
        questions: [
          { prompt: "A customer says 'the API is unreachable.' What is the first command-line tool you use and why?", expectedAnswer: "nslookup or dig to check DNS resolution -- if the domain doesn't resolve to an IP, no connection is possible.", bloomLevel: "Analyze", relatedLessonId: "networking-1-1" },
          { prompt: "What does 'curl: (60) SSL certificate problem: certificate has expired' mean, and what are the two possible causes?", expectedAnswer: "Either the server's TLS certificate has expired, or the client's CA certificate bundle is outdated and can't validate the server's cert.", bloomLevel: "Analyze", relatedLessonId: "networking-1-1" },
          { prompt: "Why might API calls work from a developer's laptop but fail from production servers?", expectedAnswer: "Different DNS resolvers, firewall rules, proxy settings, or CA certificate bundles between the two environments.", bloomLevel: "Understand", relatedLessonId: "networking-1-1" }
        ]
      }
    }
  ]
};
