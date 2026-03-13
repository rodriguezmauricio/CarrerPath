# 🗺️ ANTHROPIC PRODUCT SUPPORT SPECIALIST — FULL ROADMAP

---

## 1. CORE LANGUAGE & SCRIPTING

### Python
- Syntax, data types, control flow, functions
- File I/O, error handling, exceptions
- Working with JSON and XML
- HTTP requests with `requests` and `httpx`
- Environment variables and config management
- Virtual environments (`venv`, `pip`)
- Basic scripting and automation
- Reading/writing CSVs and logs
- Regular expressions (`re` module)
- Async basics (`asyncio`)

### JavaScript / Node.js
- ES6+: arrow functions, destructuring, spread, async/await, Promises
- Fetch API and working with REST responses
- Working with JSON
- Node.js basics: running scripts, `npm`, `require` vs `import`
- Basic error handling patterns

### Bash / Command Line
- Navigation, file ops (`ls`, `cd`, `cp`, `mv`, `rm`, `mkdir`)
- Reading and filtering logs (`cat`, `grep`, `tail`, `head`, `less`)
- Piping and redirection (`|`, `>`, `>>`)
- Process management (`ps`, `kill`, `top`)
- Environment variables (`export`, `.env` files)
- Writing basic shell scripts
- SSH basics
- `curl` for making HTTP requests from terminal
- File permissions (`chmod`, `chown`)

---

## 2. APIs & TECHNICAL INTEGRATIONS

### REST APIs
- What REST is: resources, endpoints, methods (GET/POST/PUT/DELETE/PATCH)
- HTTP status codes — every single one (200, 201, 400, 401, 403, 404, 429, 500, 502, 503)
- Request/response structure: headers, body, query params, path params
- Authentication methods: API keys, Bearer tokens, Basic Auth
- Rate limiting — what it is, how to handle it, retry strategies
- Pagination patterns (cursor-based, offset, page-based)
- Webhooks — what they are, how to register and debug them
- API versioning
- Using Postman and Insomnia for testing APIs
- Reading and navigating API documentation

### Anthropic API Specifically
- Messages API — structure, roles, content blocks
- Model families and when to use each
- Streaming responses
- Token counting and context windows
- System prompts and their behaviour
- Tool use / function calling
- Batch API
- Error types and how to handle them
- Rate limits and tiers
- The claude.ai vs API distinction

### GraphQL (awareness level)
- How it differs from REST
- Queries vs mutations
- Why some enterprise tools use it

---

## 3. AUTHENTICATION & SECURITY

### OAuth 2.0
- Authorization Code Flow (most common enterprise flow)
- Client Credentials Flow (machine-to-machine)
- PKCE
- Access tokens vs refresh tokens
- Scopes and permissions
- Common OAuth errors and how to debug them

### SAML 2.0
- What it's for (enterprise SSO)
- Identity Provider (IdP) vs Service Provider (SP)
- Assertions and how they work
- Metadata XML files
- Common SAML errors (clock skew, cert mismatch, NameID format)
- How to read a SAML trace in browser dev tools

### SSO (Single Sign-On)
- How SSO works conceptually
- SAML vs OAuth vs OIDC — when each is used
- JIT (Just-in-Time) provisioning
- Troubleshooting SSO login failures
- Common IdPs: Okta, Azure AD, Google Workspace, OneLogin

### OpenID Connect (OIDC)
- Built on OAuth 2.0
- ID tokens vs access tokens
- JWT structure: header, payload, signature
- How to decode and inspect a JWT (jwt.io)
- Token expiry and refresh flows

### API Keys & Security
- Key rotation best practices
- Storing secrets securely (env vars, secret managers)
- Never committing secrets to git
- Understanding CORS errors

---

## 4. SQL & DATA

### SQL Fundamentals
- SELECT, WHERE, ORDER BY, LIMIT
- JOINs: INNER, LEFT, RIGHT, FULL OUTER
- GROUP BY and aggregate functions (COUNT, SUM, AVG, MAX, MIN)
- Subqueries
- LIKE, IN, BETWEEN, IS NULL
- Basic indexes and why they matter for performance

### Applied SQL for Support
- Querying log tables to trace a user issue
- Filtering by timestamp ranges
- Identifying duplicate records
- Writing queries to count error occurrences
- Exporting results for reporting

### Databases (awareness)
- Difference between relational (Postgres, MySQL) and NoSQL (MongoDB, Redis)
- What a primary key, foreign key, and index are
- Connection strings and what they contain
- Why database errors surface in API responses

---

## 5. NETWORKING & INFRASTRUCTURE

### Networking Fundamentals
- DNS — how it resolves, TTL, A records, CNAME, MX
- TCP/IP basics
- HTTP vs HTTPS — TLS/SSL, certificates, handshake
- CDNs — what they do, how they affect latency
- Load balancers — what they are, how they affect debugging
- IP addresses, ports, firewalls
- VPNs and why enterprise customers use them
- Proxies and reverse proxies
- IPv4 vs IPv6 (awareness)

### Cloud Platforms (awareness to working knowledge)
- AWS: EC2, S3, Lambda, IAM, CloudWatch basics
- GCP: equivalent concepts
- Azure: equivalent concepts + Azure AD (big for enterprise auth)
- Regions and availability zones
- What serverless means
- How API gateways work

### Containers & Deployment (awareness)
- What Docker is and why it matters
- Basic Docker commands: `docker run`, `docker ps`, `docker logs`
- What Kubernetes is (don't need to operate it, just understand what it does)
- How deployments and rollbacks work

---

## 6. LOGGING, MONITORING & DEBUGGING

### Log Analysis
- Reading structured logs (JSON logs)
- Reading stack traces and understanding them
- Identifying error patterns across multiple log lines
- Using `grep` to search logs
- Understanding log levels: DEBUG, INFO, WARN, ERROR, FATAL
- Correlating timestamps across systems

### Monitoring Tools (familiarity)
- Datadog — dashboards, log queries, alerts
- Grafana — reading metrics dashboards
- Sentry — error tracking, stack traces
- PagerDuty — on-call incident management
- StatusPage — how companies communicate outages

### Browser DevTools for Support
- Network tab — inspecting API requests/responses, headers, payloads
- Console — reading JS errors
- Application tab — cookies, local storage, session storage
- SAML Tracer extension
- Reading a HAR file

### Debugging Methodology
- Reproduce first, fix second
- Binary search / isolation approach
- Checking the obvious first (auth, connectivity, version)
- Documenting steps to reproduce
- Knowing when to escalate and how to write an escalation

---

## 7. DEVELOPER TOOLS & WORKFLOW

### Git
- Clone, commit, push, pull, branch, merge
- Reading a diff
- Resolving conflicts
- Pull requests — what they are, how to review
- Git blame for finding when/where code changed
- `.gitignore`

### Version Control Concepts
- Semantic versioning (SemVer) — what 2.1.4 means
- API versioning strategies
- Changelogs and release notes — how to read them
- Deprecation notices — how to communicate them to customers

### Documentation
- Reading OpenAPI/Swagger specs
- Understanding code samples in multiple languages
- Writing runbooks and internal documentation
- Writing FAQs and knowledge base articles
- Using Notion, Confluence, or equivalent

---

## 8. AI & LLM KNOWLEDGE

### How LLMs Work (conceptual depth)
- Tokens — what they are, how to count them, why they matter
- Context windows — limits, what happens when you exceed them
- Temperature and sampling — what it controls
- System prompts vs user prompts vs assistant turns
- Prompt injection — what it is, why it's a security concern
- Hallucinations — causes and limitations
- Fine-tuning vs RAG vs prompting — differences and tradeoffs
- Embeddings — what they are, use cases
- Vector databases — Pinecone, Weaviate, pgvector

### Anthropic-Specific Knowledge
- Constitutional AI — what it is and why Anthropic uses it
- The model families: Haiku, Sonnet, Opus — use cases and tradeoffs
- Claude's safety features and policies
- The claude.ai product vs the API — different user types and use cases
- Claude Code, Claude in enterprise contexts
- Anthropic's usage policies and what violates them
- Common customer use cases: coding assistants, document analysis, customer support bots, agents

### AI Integration Patterns
- RAG (Retrieval Augmented Generation) — how it works end to end
- Agentic workflows — multi-step tool use
- Function/tool calling — how to debug it
- Streaming — SSE (Server-Sent Events), how to handle it client-side
- Prompt caching — what it is, how it affects billing

---

## 9. ENTERPRISE SUPPORT SKILLS

### Support Processes
- Ticket lifecycle: open → triage → investigation → resolution → closed
- SLAs (Service Level Agreements) — P1/P2/P3/P4 priority levels
- CSAT (Customer Satisfaction) — what it is, how to improve it
- First Response Time vs Time to Resolution
- Escalation paths — when to involve engineering
- On-call rotations — what they involve

### CRM & Support Tools
- Zendesk — ticket management, macros, views
- Salesforce — customer records, case management
- Jira — bug tracking, linking support tickets to engineering issues
- Linear — modern equivalent of Jira
- Slack — internal communication, support channels, on-call pings
- Notion — documentation

### Communication Skills for Enterprise Support
- Writing clear, concise bug reports for engineers
- Translating technical issues into plain language for executives
- De-escalation techniques for frustrated enterprise customers
- Structured response templates
- Following up without being annoying
- Knowing when to get on a call vs keep it async

---

## 10. COMPLIANCE & ENTERPRISE CONCEPTS

### Data Privacy
- GDPR basics — what it covers, user rights, data residency
- What a DPA (Data Processing Agreement) is
- SOC 2 — what it is, why enterprise customers ask about it
- ISO 27001 (awareness)
- HIPAA (awareness — relevant if supporting healthcare customers)

### Enterprise IT Concepts
- Active Directory / Azure AD
- SCIM — automated user provisioning
- MDM (Mobile Device Management)
- Zero Trust networking (awareness)
- Allowlisting/blocklisting IPs
- How enterprise procurement and legal reviews work

---

## 11. SOFT SKILLS

- Written empathy — responding to frustrated users with patience and clarity
- Reading between the lines of a vague bug report
- Prioritisation under pressure — multiple P1s at once
- Ambiguity tolerance — making a call when there's no playbook
- Cross-functional communication — writing something engineers will act on
- Proactive communication — updating customers before they chase you
- Documentation mindset — if you solve it once, write it down

---

## 📅 LEARNING PHASES

### Phase 1 — Months 1–6: Foundations
Python, Bash, REST APIs, Git, SQL basics, HTTP/networking fundamentals, Anthropic API deep dive

### Phase 2 — Months 7–12: Auth & Infrastructure
OAuth/SAML/SSO, auth debugging, cloud awareness, log analysis, browser DevTools, LLM concepts deep dive

### Phase 3 — Months 13–18: Enterprise Readiness
Enterprise support tooling, GDPR/compliance, SCIM, Zendesk/Jira, advanced SQL, monitoring tools, communication patterns

### Phase 4 — Months 18–24: Application
Mock support scenarios, build a portfolio of resolved "tickets", contribute to open source documentation, get a part-time support or junior dev role in Dublin tech