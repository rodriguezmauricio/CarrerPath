import { Track } from '../types';

export const authSecurityTrack: Track = {
  id: "auth-security",
  title: "Authentication & Security",
  color: "#ef4444",
  subtitle: "OAuth, SAML, SSO and enterprise security patterns",
  icon: "🔐",
  version: "1.0.0",
  lastUpdated: "2026-03-13",
  chapters: [
    {
      id: "auth-security-ch1",
      title: "Chapter 1 -- OAuth 2.0 & API Key Security",
      lessons: [
        {
          id: "auth-security-1-1",
          title: "OAuth 2.0 Flows & Token Management",
          duration: 60,
          type: "Concept",
          bloomLevel: "Understand",
          learningObjectives: [
            "Trace the four steps of the OAuth Authorization Code Flow",
            "Diagnose common token exchange failures from error responses",
            "Design a token refresh strategy that handles concurrent requests"
          ],
          commonMisconceptions: [
            {
              wrong: "The authorization code and the access token are the same thing",
              why: "Both are opaque strings returned during the OAuth flow, so beginners conflate them",
              correct: "The authorization code is a short-lived, single-use code exchanged for an access token. The access token is what grants API access.",
              codeExample: "// Auth code: used ONCE to get tokens (expires in ~60s)\ncode = 'abc123'\n\n// Access token: used for API calls (expires in ~1hr)\naccess_token = 'eyJhbG...'"
            },
            {
              wrong: "Storing OAuth tokens in localStorage is safe because only your app can access it",
              why: "Beginners don't realize that XSS attacks can read localStorage",
              correct: "localStorage is accessible to any JavaScript on the page. Tokens should be stored in httpOnly cookies or server-side sessions."
            }
          ],
          why: "Enterprise customers integrate Claude into systems protected by OAuth. When authentication breaks, you need to understand the flow to diagnose where it failed -- is it the token, the scope, or the identity provider?",
          mentalModel: "OAuth is like a hotel key card system. You don't give the guest the master key (your password). Instead, the front desk (authorization server) gives them a key card (token) that only opens their room (scoped access) and expires at checkout (token expiry).",
          concepts: [
            {
              title: "Authorization Code Flow",
              explanation: "The most common OAuth flow for web apps. The user is redirected to an authorization server, logs in, gets a code, which the app exchanges for an access token.",
              example: "When an enterprise customer sets up Claude in their internal tools portal, they often use OAuth Authorization Code Flow so that each employee's access to Claude is tied to their corporate identity.",
              codeSnippet: "// Step 1: Redirect user to authorization endpoint\nconst authUrl = `https://auth.example.com/authorize?\n  response_type=code&\n  client_id=${CLIENT_ID}&\n  redirect_uri=${REDIRECT_URI}&\n  scope=read+write&\n  state=${csrfToken}`;\n\n// Step 2: Exchange code for tokens (server-side)\nconst tokenResponse = await fetch('https://auth.example.com/token', {\n  method: 'POST',\n  body: new URLSearchParams({\n    grant_type: 'authorization_code',\n    code: authorizationCode,\n    client_id: CLIENT_ID,\n    client_secret: CLIENT_SECRET\n  })\n});"
            }
          ],
          miniExercises: [
            {
              id: "auth-security-1-1-m1",
              title: "Mini Exercise 1: Identify the OAuth flow step",
              question: "Given a series of HTTP requests, identify which step of the OAuth Authorization Code Flow each represents.",
              steps: [
                {
                  instruction: "Review the four steps of Authorization Code Flow: 1) Redirect to auth server, 2) User grants permission, 3) Auth server sends code to redirect URI, 4) App exchanges code for token.",
                  example: "A request to /authorize with response_type=code is Step 1 (the initial redirect).",
                  hint: "Look at the endpoint path and the parameters to determine the step."
                }
              ],
              solution: "// Step 1: GET /authorize?response_type=code&client_id=...\n// Step 2: User interaction (no HTTP request from your app)\n// Step 3: GET /callback?code=abc123&state=xyz\n// Step 4: POST /token with grant_type=authorization_code",
              explanation: "Each step has distinctive markers: /authorize with response_type=code is always step 1, the callback URL with a code parameter is step 3, and POST /token with grant_type=authorization_code is step 4."
            },
            {
              id: "auth-security-1-1-m2",
              title: "Mini Exercise 2: Debug a failed token exchange",
              question: "Given an error response from a token endpoint, identify the cause and fix.",
              steps: [
                {
                  instruction: "Analyze this error: `{\"error\": \"invalid_grant\", \"error_description\": \"Authorization code expired\"}`. What went wrong and how do you fix it?",
                  hint: "Authorization codes are typically valid for only 30-60 seconds."
                }
              ],
              solution: "// Cause: The authorization code expired before the app exchanged it for a token.\n// Fix: Ensure the token exchange happens immediately after receiving the code.\n// Prevention: Add monitoring for the time between code receipt and exchange."
            },
            {
              id: "auth-security-1-1-m3",
              title: "Mini Exercise 3: Design a token refresh strategy",
              question: "Write pseudocode for a robust token refresh mechanism that handles concurrent requests and race conditions.",
              steps: [
                {
                  instruction: "Design a function that checks if the access token is expired, refreshes it if needed, and handles the case where multiple requests try to refresh simultaneously."
                }
              ]
            }
          ],
          resources: [
            { label: "OAuth 2.0 Simplified", url: "https://aaronparecki.com/oauth-2-simplified/" },
            { label: "JWT.io Debugger", url: "https://jwt.io/" }
          ],
          whyItMatters: "At companies like Okta, Auth0, and within Anthropic's enterprise customer base, OAuth is the backbone of secure access. When a Fortune 500 company's Claude integration stops working at 2 AM, the support engineer who understands OAuth flows can diagnose 'your refresh token expired and your rotation logic has a bug' in minutes, while someone without this knowledge would escalate unnecessarily."
        }
      ],
      review: {
        id: "auth-security-ch1-review",
        type: "ChapterReview",
        coversLessons: ["auth-security-1-1"],
        questions: [
          { prompt: "List the four steps of the OAuth Authorization Code Flow in order.", expectedAnswer: "1) Redirect user to auth server, 2) User grants permission, 3) Auth server sends code to redirect URI, 4) App exchanges code for access token.", bloomLevel: "Remember", relatedLessonId: "auth-security-1-1" },
          { prompt: "A customer gets 'invalid_grant' when exchanging an authorization code. What are the two most likely causes?", expectedAnswer: "The authorization code expired (they waited too long) or the code was already used (codes are single-use).", bloomLevel: "Analyze", relatedLessonId: "auth-security-1-1" },
          { prompt: "Why should OAuth tokens never be stored in localStorage?", expectedAnswer: "localStorage is accessible to any JavaScript on the page, making tokens vulnerable to XSS attacks. Use httpOnly cookies or server-side sessions instead.", bloomLevel: "Understand", relatedLessonId: "auth-security-1-1" }
        ]
      }
    }
  ]
};
