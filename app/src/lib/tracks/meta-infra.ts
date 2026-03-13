import { Track } from '../types';

export const metaInfraTrack: Track = {
  id: "meta-infra",
  title: "Meta Infrastructure & Production Engineering",
  color: "#0668E1",
  subtitle: "Master production engineering, reliability, and distributed systems at billion-user scale",
  icon: "⚙️",
  version: "1.0.0",
  lastUpdated: "2026-03-13",
  tags: ["meta", "infrastructure", "sre", "distributed-systems"],
  chapters: [
    {
      id: "meta-infra-ch1",
      title: "Chapter 1 -- Production Engineering Culture",
      lessons: [
        {
          id: "meta-infra-1-1",
          title: "SLOs, SLIs & Incident Management at Scale",
          duration: 60,
          type: "Domain",
          bloomLevel: "Apply",
          learningObjectives: [
            "Define and distinguish SLOs, SLIs, and SLAs and explain how Meta uses them to quantify service health",
            "Design an incident management workflow that includes detection, escalation, mitigation, and postmortem phases aligned with Meta's on-call practices",
            "Calculate error budgets from SLO targets and use them to make informed release and reliability trade-off decisions"
          ],
          commonMisconceptions: [
            {
              wrong: "An SLO of 99.99% means the service can never go down",
              why: "Engineers often confuse high availability targets with zero-downtime guarantees, not realizing that 99.99% still permits roughly 52 minutes of downtime per year",
              correct: "An SLO of 99.99% defines an acceptable error budget -- roughly 4.3 minutes of downtime per month. The goal is to stay within that budget, not to eliminate failures entirely. When the budget is exhausted, teams prioritize reliability work over feature launches.",
              codeExample: "// Error budget calculation\nconst SLO_TARGET = 0.9999; // 99.99%\nconst MINUTES_PER_MONTH = 30 * 24 * 60; // 43,200\nconst errorBudgetMinutes = MINUTES_PER_MONTH * (1 - SLO_TARGET);\nconsole.log(`Monthly error budget: ${errorBudgetMinutes.toFixed(1)} minutes`);\n// Output: Monthly error budget: 4.3 minutes"
            },
            {
              wrong: "On-call means you sit and wait for alerts -- if nothing fires, the system is healthy",
              why: "Reactive-only on-call culture misses slow-burning degradations that don't cross alerting thresholds but still impact user experience",
              correct: "Effective on-call at Meta includes proactive health checks, reviewing dashboards for trend anomalies, and running game days. A quiet pager doesn't mean a healthy system -- it might mean your alerts have gaps. Production engineers regularly audit alert coverage and run failure injection to validate detection.",
              codeExample: "# Meta-style on-call checklist (beginning of shift)\n# 1. Review SLI dashboards for the past 6 hours\n# 2. Check error budget burn rate\n# 3. Review any open SEVs or ongoing mitigations\n# 4. Verify canary deployments are healthy\n# 5. Confirm rollback procedures are tested and ready\n\n$ oncall status --team=infra-storage\nActive SEVs: 0\nError budget remaining: 78% (3.4 min used of 4.3 min)\nCanary: healthy (v2.41.3 on 2% of fleet)\nLast game day: 2026-03-08 (storage failover drill)"
            }
          ],
          why: "As a Meta production engineer, you own the reliability of services that billions of people depend on daily. Understanding SLOs and incident management isn't theoretical -- it determines whether you can make sound trade-off decisions during an outage at 3 AM, communicate impact clearly to leadership, and build a culture where reliability is balanced against velocity rather than treated as an afterthought.",
          mentalModel: "Think of SLOs as a bank account. Your balance is the error budget. Every incident is a withdrawal. Feature launches that skip reliability review are risky loans. When the balance hits zero, you freeze feature work and invest in reliability -- just like you'd stop spending and focus on earning when your bank balance is low. The SLI is your bank statement that tells you the current balance.",
          concepts: [
            {
              title: "SLOs, SLIs, and Error Budgets",
              explanation: "An SLI (Service Level Indicator) is a quantitative measurement of service behavior -- for example, the proportion of requests that complete in under 200ms. An SLO (Service Level Objective) is the target value for that SLI -- for example, 99.9% of requests should complete in under 200ms. The error budget is the inverse: the amount of unreliability you can tolerate before the SLO is violated. At Meta, SLOs are set per service and reviewed quarterly. Teams that exhaust their error budget shift engineering resources from features to reliability improvements.",
              example: "Meta's News Feed rendering service might define an SLI as the percentage of feed loads that complete within 500ms. The SLO target is 99.95%. In a month with 10 billion feed loads, the error budget allows up to 5 million slow loads. If a bad deployment causes 3 million slow loads in one day, the team has burned 60% of their monthly budget and must decide whether to halt further risky deployments.",
              codeSnippet: "// SLO monitoring and error budget tracking\ninterface SLOConfig {\n  name: string;\n  sliQuery: string;        // Scuba/ODS query for the SLI\n  target: number;          // e.g., 0.9995\n  windowDays: number;      // rolling window\n}\n\nfunction calculateErrorBudget(config: SLOConfig, goodEvents: number, totalEvents: number) {\n  const currentSLI = goodEvents / totalEvents;\n  const allowedBadEvents = totalEvents * (1 - config.target);\n  const actualBadEvents = totalEvents - goodEvents;\n  const budgetRemaining = (allowedBadEvents - actualBadEvents) / allowedBadEvents;\n\n  return {\n    sliName: config.name,\n    currentSLI: (currentSLI * 100).toFixed(3) + '%',\n    target: (config.target * 100).toFixed(2) + '%',\n    budgetRemainingPct: (budgetRemaining * 100).toFixed(1) + '%',\n    shouldFreezeReleases: budgetRemaining < 0.1,  // freeze below 10%\n  };\n}\n\n// Example usage for News Feed latency SLO\nconst feedSLO: SLOConfig = {\n  name: 'feed_load_latency_p99',\n  sliQuery: 'SELECT count_if(latency_ms < 500) / count(*) FROM feed_requests',\n  target: 0.9995,\n  windowDays: 30,\n};\n\nconst result = calculateErrorBudget(feedSLO, 9_994_500_000, 10_000_000_000);\n// {\n//   sliName: 'feed_load_latency_p99',\n//   currentSLI: '99.945%',\n//   target: '99.95%',\n//   budgetRemainingPct: '-10.0%',   // budget exhausted!\n//   shouldFreezeReleases: true\n// }"
            }
          ],
          miniExercises: [
            {
              id: "meta-infra-1-1-m1",
              title: "Mini Exercise 1: Calculate Error Budgets",
              question: "Given an SLO target of 99.95% and 2 billion requests in a 30-day window, calculate the error budget in absolute request count and determine if a deployment that caused 1.2 million errors should trigger a release freeze.",
              steps: [
                {
                  instruction: "Calculate the total number of allowed bad requests based on the SLO target.",
                  example: "allowedBad = totalRequests * (1 - sloTarget)\n// For 99.9% SLO with 1B requests: 1_000_000_000 * 0.001 = 1_000_000",
                  hint: "Remember that 99.95% means the failure allowance is 0.0005, not 0.005."
                },
                {
                  instruction: "Determine what percentage of the error budget the 1.2 million errors consume.",
                  example: "budgetConsumed = actualBad / allowedBad * 100",
                  hint: "Compare the 1.2 million against your calculated allowance from step 1."
                },
                {
                  instruction: "Decide whether to freeze releases based on Meta's typical threshold of freezing when less than 10% of the budget remains.",
                  hint: "If more than 90% of the budget is consumed, a freeze is warranted."
                }
              ],
              solution: "const totalRequests = 2_000_000_000;\nconst sloTarget = 0.9995;\nconst allowedBad = totalRequests * (1 - sloTarget); // 1,000,000\nconst actualBad = 1_200_000;\nconst budgetConsumed = (actualBad / allowedBad) * 100; // 120%\n// Budget is OVER-consumed (120%), meaning the SLO is already breached.\n// Immediate release freeze is required.",
              explanation: "With a 99.95% SLO over 2 billion requests, only 1 million failures are allowed. The 1.2 million errors exceed the entire budget by 20%, meaning the SLO is violated and the team must prioritize reliability work immediately."
            },
            {
              id: "meta-infra-1-1-m2",
              title: "Mini Exercise 2: Design an Incident Severity Matrix",
              question: "Create a severity classification (SEV1 through SEV4) for a Meta-scale messaging service, defining user impact thresholds, response time expectations, and escalation paths for each level.",
              steps: [
                {
                  instruction: "Define the user impact threshold for each severity level in terms of percentage of users affected and functionality degraded.",
                  example: "SEV1: >50% of users cannot send messages\nSEV2: >10% of users experience degraded performance",
                  hint: "Think about the difference between total outage, partial degradation, minor impact, and cosmetic issues."
                },
                {
                  instruction: "Assign response time and escalation requirements for each severity level.",
                  example: "SEV1: Page on-call immediately, VP notified within 15 min",
                  hint: "Higher severity means faster response and higher-level escalation. Consider who needs to be in the incident bridge."
                },
                {
                  instruction: "Specify the postmortem requirements for each level -- which severities require written postmortems and cross-team review?",
                  hint: "Not every incident needs a full postmortem, but patterns of SEV3s might warrant one."
                }
              ],
              solution: "const severityMatrix = {\n  SEV1: {\n    impact: '>50% users affected or data loss risk',\n    responseTime: '5 minutes',\n    escalation: 'On-call + team lead + VP + incident commander',\n    postmortem: 'Required within 48 hours, cross-org review',\n  },\n  SEV2: {\n    impact: '10-50% users affected or significant degradation',\n    responseTime: '15 minutes',\n    escalation: 'On-call + team lead',\n    postmortem: 'Required within 5 business days',\n  },\n  SEV3: {\n    impact: '<10% users, minor feature degradation',\n    responseTime: '1 hour',\n    escalation: 'On-call engineer',\n    postmortem: 'Optional, tracked in incident log',\n  },\n  SEV4: {\n    impact: 'Cosmetic or non-user-facing issues',\n    responseTime: 'Next business day',\n    escalation: 'Ticket queue',\n    postmortem: 'Not required',\n  },\n};",
              explanation: "Severity matrices ensure consistent incident response across teams. At Meta's scale, a SEV1 on Messenger could affect hundreds of millions of users within minutes, so the escalation path must be fast and well-defined. The key insight is that severity is based on user impact, not engineering complexity."
            },
            {
              id: "meta-infra-1-1-m3",
              title: "Mini Exercise 3: Write a Postmortem Timeline",
              question: "Given the following scenario -- a configuration push at 14:00 UTC caused News Feed to return stale content for 23% of users, detected by automated alerts at 14:12, mitigated by rollback at 14:38 -- construct a structured postmortem timeline with action items.",
              steps: [
                {
                  instruction: "Create a minute-by-minute timeline from the triggering event through detection, diagnosis, mitigation, and resolution.",
                  example: "14:00 - Config push deployed to 100% of feed-config fleet\n14:07 - Cache hit rate drops from 94% to 61%",
                  hint: "Include the gap between the trigger and detection -- this is the 'time to detect' (TTD) metric that Meta tracks."
                },
                {
                  instruction: "Identify root cause, contributing factors, and calculate key incident metrics (TTD, TTM, TTR).",
                  hint: "TTD = time to detect, TTM = time to mitigate, TTR = time to resolve. These are different: mitigation stops the bleeding, resolution fixes the root cause."
                },
                {
                  instruction: "Write 3 concrete action items with owners and due dates that would prevent recurrence.",
                  hint: "Good action items are specific and measurable, like 'Add canary stage to config push pipeline' not 'Be more careful with configs'."
                }
              ],
              solution: "// Postmortem: Feed Stale Content Incident 2026-03-13\n// Severity: SEV2 | Duration: 38 min | Users affected: ~23%\n\nconst timeline = [\n  { time: '14:00', event: 'Config push deployed to 100% of feed-config fleet (no canary)' },\n  { time: '14:03', event: 'Cache invalidation storm begins as new config changes TTL values' },\n  { time: '14:07', event: 'Cache hit rate drops from 94% to 61%' },\n  { time: '14:12', event: 'Automated alert fires: feed_staleness_ratio > 0.15 (TTD: 12 min)' },\n  { time: '14:14', event: 'On-call engineer acknowledges page and joins incident bridge' },\n  { time: '14:22', event: 'Root cause identified: config changed cache TTL from 300s to 3s' },\n  { time: '14:38', event: 'Rollback completed, cache hit rate recovering (TTM: 26 min)' },\n  { time: '15:10', event: 'Cache fully warmed, SLIs back to normal (TTR: 70 min)' },\n];\n\nconst actionItems = [\n  { action: 'Add canary stage to config push pipeline (1% -> 10% -> 100%)', owner: 'feed-infra', due: '2026-03-27' },\n  { action: 'Add config diff validation that flags TTL changes > 50%', owner: 'config-platform', due: '2026-04-03' },\n  { action: 'Lower staleness alert threshold from 0.15 to 0.08 to reduce TTD', owner: 'feed-oncall', due: '2026-03-20' },\n];",
              explanation: "The postmortem reveals three systemic issues: no canary for config pushes, no validation of dangerous config changes, and an alert threshold that allowed 12 minutes of impact before detection. The action items are specific, owned, and time-bound -- hallmarks of effective Meta postmortems."
            }
          ],
          resources: [
            { label: "Google SRE Book - Service Level Objectives", url: "https://sre.google/sre-book/service-level-objectives/" },
            { label: "Meta Engineering Blog - Production Engineering", url: "https://engineering.fb.com/category/production-engineering/" }
          ],
          whyItMatters: "At Meta, production engineers are the backbone of services used by over 3 billion people. A single misconfigured SLO can mean the difference between catching a degradation in 2 minutes versus 20 -- and at Meta's scale, those 18 minutes represent hundreds of millions of degraded user experiences. Mastering SLOs and incident management is what separates a production engineer who reacts to fires from one who systematically eliminates them."
        }
      ],
      review: {
        id: "meta-infra-ch1-review",
        type: "ChapterReview",
        coversLessons: ["meta-infra-1-1"],
        questions: [
          {
            prompt: "Explain the relationship between SLIs, SLOs, and error budgets. How does exhausting an error budget change a team's priorities at Meta?",
            expectedAnswer: "An SLI is the measurement (e.g., request latency), the SLO is the target (e.g., 99.95% under 200ms), and the error budget is the tolerable failure margin. When the budget is exhausted, teams freeze feature launches and redirect engineering effort toward reliability improvements until the budget recovers.",
            bloomLevel: "Understand",
            relatedLessonId: "meta-infra-1-1"
          },
          {
            prompt: "A configuration change caused 15% of Messenger users to experience failed message sends for 25 minutes before an alert fired. What severity would you assign, and what are two process improvements you would recommend?",
            expectedAnswer: "SEV2 (10-50% user impact with significant degradation). Improvements: (1) Add canary deployment stages for config changes so impact is limited to a small percentage before full rollout, (2) Lower alert thresholds or add anomaly detection on message send success rate to reduce time-to-detect.",
            bloomLevel: "Apply",
            relatedLessonId: "meta-infra-1-1"
          },
          {
            prompt: "Why is proactive on-call work (dashboard review, game days, alert audits) important even when the pager is quiet?",
            expectedAnswer: "A quiet pager might indicate gaps in alert coverage rather than a healthy system. Proactive work like reviewing dashboards catches slow-burn degradations, game days validate that detection and response procedures work, and alert audits ensure thresholds are still appropriate as traffic patterns and system behavior evolve.",
            bloomLevel: "Analyze",
            relatedLessonId: "meta-infra-1-1"
          }
        ]
      }
    },
    {
      id: "meta-infra-ch2",
      title: "Chapter 2 -- Distributed Systems at Scale",
      lessons: [
        {
          id: "meta-infra-2-1",
          title: "Sharding, Replication & Consistency Models at Meta Scale",
          duration: 65,
          type: "Domain",
          bloomLevel: "Analyze",
          prerequisites: ["meta-infra-1-1"],
          learningObjectives: [
            "Evaluate different sharding strategies (hash-based, range-based, geographic) and explain when each is appropriate for Meta's workloads",
            "Analyze the trade-offs between strong consistency, eventual consistency, and causal consistency in the context of Meta's social graph and messaging systems",
            "Design a replication topology for a Meta-scale service that balances read performance, write durability, and cross-region latency"
          ],
          commonMisconceptions: [
            {
              wrong: "Eventual consistency means data might never converge -- users could permanently see different versions",
              why: "The word 'eventual' sounds uncertain, leading engineers to believe convergence isn't guaranteed",
              correct: "Eventual consistency guarantees that if no new updates are made, all replicas will converge to the same value. The 'eventual' refers to a bounded time window, not uncertainty of outcome. At Meta, this window is typically milliseconds to low seconds for most services, with conflict resolution strategies (last-writer-wins, vector clocks) ensuring deterministic convergence.",
              codeExample: "// Eventual consistency in practice at Meta\n// User posts a photo in US-East region\n// Timeline of replica convergence:\n//\n// t=0ms    US-East: photo visible (primary write)\n// t=15ms   US-West: photo visible (cross-region replication)\n// t=45ms   EU-West: photo visible (transatlantic replication)\n// t=80ms   AP-South: photo visible (longest path)\n//\n// During the 0-80ms window, users in different regions\n// may see slightly different states -- this is the\n// 'eventual' window. After 80ms, all regions converge."
            },
            {
              wrong: "More shards always means better performance -- if the system is slow, just add more shards",
              why: "Engineers assume sharding is a linear scaling solution without considering the overhead of cross-shard operations and coordination",
              correct: "Sharding introduces coordination overhead for cross-shard queries, increases operational complexity (rebalancing, hotspot management), and can make transactions that span multiple shards extremely expensive. At Meta, the social graph's interconnected nature means naive sharding creates massive cross-shard fan-out for friend-of-friend queries. The optimal shard count balances parallelism against coordination cost.",
              codeExample: "// Cross-shard query cost explosion\n// Query: Get all friends-of-friends for user_123\n\n// With 10 shards:\n//   user_123 has 500 friends across ~8 shards\n//   Each friend has ~400 friends across ~9 shards\n//   Total fan-out: 500 * 9 = 4,500 cross-shard reads\n//   Latency: dominated by slowest shard (tail latency)\n\n// With 1000 shards:\n//   Same query now fans out to ~800 shards\n//   Total cross-shard reads: 500 * 800 = 400,000\n//   Coordination overhead: 800 shard connections\n//   Tail latency: much worse (p99 of 800 shards)\n\n// More shards made this query 88x more expensive!"
            }
          ],
          why: "Meta's infrastructure stores and serves data for over 3 billion users across dozens of data center regions. As a production engineer, you will debug replication lag causing stale reads, investigate hotspot shards under uneven load, and make architectural decisions about consistency guarantees. Understanding these distributed systems fundamentals isn't academic -- it's the difference between resolving a cross-region consistency incident in 20 minutes versus 2 hours.",
          mentalModel: "Think of sharding like a library system across multiple buildings. Each building (shard) holds a portion of all books (data). Hash-based sharding assigns books by ISBN -- evenly distributed but a search for 'all books by Author X' requires visiting every building. Range-based sharding groups books alphabetically -- great for browsing A-C in one building, but the 'S' building is overloaded because so many titles start with S. Geographic sharding puts books near the readers who want them most -- the Tokyo branch has more manga. Replication is making copies of popular books available in every branch. The consistency model is the policy for how quickly a new book added to one branch appears in the catalog of other branches.",
          concepts: [
            {
              title: "Sharding Strategies and Consistency Trade-offs",
              explanation: "Sharding partitions data across multiple machines so no single machine bears the full load. Hash-based sharding applies a hash function to a key (e.g., user ID) to determine the shard, giving uniform distribution but making range queries expensive. Range-based sharding assigns contiguous key ranges to shards, enabling efficient range scans but risking hotspots. Geographic sharding places data near the users who access it most, reducing latency but complicating cross-region operations. Replication copies data across shards or regions for durability and read scaling. The consistency model defines what guarantees readers get: strong consistency (read always sees the latest write), eventual consistency (reads may be stale but will converge), and causal consistency (reads respect the causal order of operations -- if you wrote A then B, no reader sees B without A).",
              example: "Meta's TAO (The Associations and Objects) system is the social graph data store. It uses consistent hashing to shard the social graph by object ID, with each shard replicated to a leader region (for writes) and multiple follower regions (for reads). Reads are served from local followers for low latency, while writes go to the leader and replicate asynchronously. This means a user in Japan might not see a post created by a US user for up to 1 second -- an acceptable trade-off for the massive read throughput gained by serving from local replicas. For Messenger, where consistency matters more (you shouldn't see a reply before the message it replies to), Meta uses causal consistency to preserve message ordering.",
              codeSnippet: "// Simplified model of Meta's TAO-style sharding and replication\n\ninterface ShardConfig {\n  shardId: number;\n  region: string;\n  role: 'leader' | 'follower';\n  replicaOf?: number;  // leader shardId if follower\n}\n\ninterface ConsistencyPolicy {\n  reads: 'strong' | 'eventual' | 'causal';\n  writeAck: 'leader-only' | 'majority' | 'all-replicas';\n  maxStalenessMs: number;\n}\n\n// Social graph: optimized for read throughput\nconst socialGraphPolicy: ConsistencyPolicy = {\n  reads: 'eventual',         // serve from local follower\n  writeAck: 'leader-only',   // fast writes, async replication\n  maxStalenessMs: 1000,      // tolerate up to 1s staleness\n};\n\n// Messenger: preserve causal ordering\nconst messengerPolicy: ConsistencyPolicy = {\n  reads: 'causal',           // respect happens-before ordering\n  writeAck: 'majority',      // ack after majority of replicas\n  maxStalenessMs: 100,       // tighter staleness bound\n};\n\n// Shard routing: consistent hashing\nfunction getShardId(objectId: bigint, totalShards: number): number {\n  // MurmurHash3 for uniform distribution\n  const hash = murmurHash3(objectId);\n  return hash % totalShards;\n}\n\n// Cross-shard fan-out estimation\nfunction estimateFanOut(\n  friendCount: number,\n  totalShards: number\n): { shardsHit: number; fanOutRatio: number } {\n  // Birthday paradox: expected distinct shards hit\n  // E[distinct] = N * (1 - ((N-1)/N)^k) where N=shards, k=friends\n  const expected = totalShards * (1 - Math.pow((totalShards - 1) / totalShards, friendCount));\n  return {\n    shardsHit: Math.round(expected),\n    fanOutRatio: expected / totalShards,\n  };\n}\n\n// Example: user with 500 friends, 4096 shards\nconst fanOut = estimateFanOut(500, 4096);\n// { shardsHit: 471, fanOutRatio: 0.115 }\n// A single friends-list query touches ~471 of 4096 shards"
            }
          ],
          miniExercises: [
            {
              id: "meta-infra-2-1-m1",
              title: "Mini Exercise 1: Choose a Sharding Strategy",
              question: "Meta is building a new service that stores user-generated short videos (Reels). The access pattern is: 80% of reads are for videos less than 24 hours old, videos are predominantly watched in the same geographic region where they were created, and trending videos spike to global access. Which sharding strategy would you recommend and why?",
              steps: [
                {
                  instruction: "Analyze the access patterns and identify which sharding strategy (hash, range, geographic) best fits the primary workload.",
                  example: "For a time-series database with sequential writes and range queries, range-based sharding by timestamp is optimal because queries like 'get all events between 14:00 and 15:00' hit a single shard.",
                  hint: "Consider that 80% of reads are recent and geographically local -- which strategy minimizes latency for the majority case?"
                },
                {
                  instruction: "Address the challenge of trending videos that spike to global access. How would you handle the hot-shard problem?",
                  example: "CDN caching layer, read replicas, or dynamic replica promotion",
                  hint: "You can combine strategies -- primary sharding for the common case with a caching or replication layer for the exceptional case."
                },
                {
                  instruction: "Estimate the shard count needed if the service handles 500,000 video uploads per hour and each shard can handle 2,000 writes/second.",
                  hint: "Convert uploads per hour to per second, then divide by shard write capacity. Add a buffer for peak traffic."
                }
              ],
              solution: "// Recommended: Geographic sharding with CDN overlay\n// Primary strategy: Geographic sharding by creator's region\n// - 80% of reads are local, so geo-sharding minimizes latency\n// - Writes are naturally distributed by region\n\n// Trending video handling: CDN + read replica promotion\n// - Videos that exceed a view threshold get replicated to\n//   edge caches in all regions\n// - This converts a hot-shard problem into a CDN problem\n\n// Shard sizing:\nconst uploadsPerHour = 500_000;\nconst uploadsPerSecond = uploadsPerHour / 3600; // ~139/s\nconst shardWriteCapacity = 2000; // writes/s per shard\nconst peakMultiplier = 3; // 3x headroom for traffic spikes\nconst minShards = Math.ceil((uploadsPerSecond * peakMultiplier) / shardWriteCapacity);\n// minShards = ceil(417 / 2000) = 1 shard for writes\n// But geo distribution across 6 regions = 6 shards minimum\n// With redundancy: 6 regions * 3 replicas = 18 shard instances",
              explanation: "Geographic sharding is ideal here because the dominant access pattern (recent + local) aligns with geographic locality. The trending video edge case is handled by a CDN layer rather than complicating the sharding strategy. This is a common Meta pattern: optimize the shard design for the 80% case and handle outliers with caching infrastructure."
            },
            {
              id: "meta-infra-2-1-m2",
              title: "Mini Exercise 2: Diagnose a Consistency Bug",
              question: "Users report that when they post a comment on Instagram and immediately refresh, their comment sometimes doesn't appear. It shows up after a few seconds. The system uses leader-follower replication with reads served from followers. Diagnose the issue and propose a fix that doesn't sacrifice read scalability.",
              steps: [
                {
                  instruction: "Identify the root cause of the inconsistency based on the leader-follower replication architecture.",
                  example: "In a leader-follower setup, the user writes to the leader but the subsequent read might go to a follower that hasn't received the replication yet.",
                  hint: "This is a classic read-after-write consistency problem."
                },
                {
                  instruction: "Propose a solution that ensures users see their own writes without forcing all reads to go to the leader.",
                  example: "Session-based consistency, sticky routing, or read-your-writes guarantee",
                  hint: "You only need strong consistency for the user who wrote the data. Other users can tolerate eventual consistency."
                },
                {
                  instruction: "Describe how you would implement this at Meta scale without creating a bottleneck on the leader.",
                  hint: "Consider a time-bounded approach: route to leader only for a short window after a write, then fall back to follower reads."
                }
              ],
              solution: "// Read-your-writes consistency implementation\n\ninterface WriteReceipt {\n  userId: string;\n  shardId: number;\n  writeTimestamp: number;  // leader's write timestamp\n  ttlMs: number;           // how long to enforce read-from-leader\n}\n\n// After a write, store a receipt in a fast local cache\nconst recentWrites = new Map<string, WriteReceipt>();\n\nfunction routeRead(userId: string, shardId: number): 'leader' | 'follower' {\n  const receipt = recentWrites.get(`${userId}:${shardId}`);\n  if (receipt && Date.now() - receipt.writeTimestamp < receipt.ttlMs) {\n    return 'leader';  // serve from leader to guarantee consistency\n  }\n  return 'follower';  // safe to serve from follower\n}\n\n// Typical TTL: 2-5 seconds (covers replication lag)\n// Impact: ~0.1% of reads go to leader (only post-write reads)\n// Result: users always see their own writes, 99.9% of reads\n// still served from low-latency followers",
              explanation: "This is the read-your-writes consistency pattern. By tracking recent writes per user and routing only those users' reads to the leader for a brief window, you get the consistency guarantee where it matters (the authoring user) without sacrificing read scalability for the other 99.9% of reads. Meta's TAO system uses a similar approach with write timestamps embedded in client-side cookies."
            },
            {
              id: "meta-infra-2-1-m3",
              title: "Mini Exercise 3: Capacity Planning for Shard Rebalancing",
              question: "Your team manages a 256-shard database cluster. Shard 42 has grown to 3x the average shard size because a viral celebrity account was hash-assigned to it. Plan a shard split operation that minimizes user impact.",
              steps: [
                {
                  instruction: "Outline the steps to split shard 42 into two new shards while the service remains online.",
                  example: "1. Create new shard 42b\n2. Begin dual-writing to both 42a and 42b\n3. Backfill historical data\n4. Switch reads to new shards\n5. Decommission old shard 42",
                  hint: "The critical challenge is ensuring no data is lost or duplicated during the split. Think about the ordering of operations."
                },
                {
                  instruction: "Calculate the network bandwidth required if shard 42 holds 2TB of data and the split must complete within 4 hours.",
                  hint: "You need to copy roughly half the data (1TB) to the new shard. Convert TB to bits and divide by time in seconds."
                },
                {
                  instruction: "Describe how you would validate the split was successful before cutting over reads.",
                  hint: "Consider checksums, row counts, and running read queries against both old and new shards in parallel to compare results."
                }
              ],
              solution: "// Shard split plan for shard 42\n\nconst splitPlan = {\n  phase1_prepare: {\n    steps: [\n      'Provision new shard 42b with same hardware spec',\n      'Update hash ring: shard 42 key range [0x00-0xFF] splits to 42a [0x00-0x7F] and 42b [0x80-0xFF]',\n      'Enable dual-write: all writes to shard 42 go to both 42a and 42b based on new hash range',\n    ],\n    duration: '30 minutes',\n    userImpact: 'None -- reads still from original shard 42',\n  },\n  phase2_backfill: {\n    steps: [\n      'Copy historical data for keys in [0x80-0xFF] range from 42a to 42b',\n      'Rate-limit copy to 600 Mbps to avoid saturating network',\n    ],\n    bandwidth: '1TB / 4hrs = 250GB/hr = ~570 Mbps sustained',\n    duration: '3-4 hours',\n    userImpact: 'Slight increase in shard 42 read latency (p99 +5ms)',\n  },\n  phase3_validate: {\n    steps: [\n      'Run parallel reads on 1% of traffic, compare results',\n      'Verify row counts match per key range',\n      'Compare checksums on random sample of 10,000 objects',\n    ],\n    duration: '1 hour',\n    successCriteria: '100% read parity, checksum match on all samples',\n  },\n  phase4_cutover: {\n    steps: [\n      'Gradually shift reads: 10% -> 50% -> 100% to new shards',\n      'Monitor error rates and latency at each step',\n      'Disable dual-write once reads fully migrated',\n      'Decommission old shard 42 after 7-day retention period',\n    ],\n    duration: '2 hours for gradual cutover',\n    rollback: 'Revert hash ring to original mapping, reads back to shard 42',\n  },\n};",
              explanation: "Online shard splitting is one of the most operationally complex tasks in distributed systems. The dual-write phase ensures no data is lost during the migration, the validation phase catches any inconsistencies before user traffic is affected, and the gradual cutover allows quick rollback if issues emerge. At Meta, these operations are largely automated but production engineers must understand the process to debug failures."
            }
          ],
          resources: [
            { label: "Meta Engineering - TAO: The Power of the Graph", url: "https://engineering.fb.com/2013/06/25/core-infra/tao-the-power-of-the-graph/" },
            { label: "Designing Data-Intensive Applications - Martin Kleppmann", url: "https://dataintensive.net/" }
          ],
          whyItMatters: "Every service at Meta is a distributed system. When Messenger messages arrive out of order, when Instagram feeds show stale content, when WhatsApp fails to deliver a message to one region -- these are all distributed systems problems rooted in sharding and consistency trade-offs. As a production engineer, you will be the person debugging these issues at 2 AM, and your depth of understanding directly determines how fast you resolve them and how many users are affected."
        }
      ],
      review: {
        id: "meta-infra-ch2-review",
        type: "ChapterReview",
        coversLessons: ["meta-infra-2-1"],
        questions: [
          {
            prompt: "Explain why Meta's TAO system uses eventual consistency for social graph reads instead of strong consistency. What would be the cost of strong consistency at Meta's scale?",
            expectedAnswer: "Strong consistency would require every read to contact the leader shard, which could be in a distant region, adding hundreds of milliseconds of latency. At Meta's scale of trillions of reads per day, this would also overwhelm the leader shards. Eventual consistency allows reads from local follower replicas with sub-10ms latency, at the cost of brief staleness windows that are acceptable for social graph data (e.g., seeing a friend's post 1 second late is fine).",
            bloomLevel: "Analyze",
            relatedLessonId: "meta-infra-2-1"
          },
          {
            prompt: "A hash-sharded database has a hot shard due to a single very popular account. Describe two different approaches to mitigate this hotspot without changing the sharding algorithm for all other keys.",
            expectedAnswer: "Approach 1: Shard splitting -- split the hot shard into two by subdividing its hash range, redistributing the load. Approach 2: Key-level replication -- identify the hot key and create read replicas specifically for that account's data, spreading reads across multiple nodes while writes still go to the primary shard. A third option is adding a caching layer (like Memcached) in front of the hot shard to absorb repeated reads.",
            bloomLevel: "Evaluate",
            relatedLessonId: "meta-infra-2-1"
          },
          {
            prompt: "Design a read-your-writes consistency solution for Instagram comments that doesn't require all reads to go to the leader. What trade-offs does your solution make?",
            expectedAnswer: "After a user writes a comment, store a write receipt (user ID + timestamp) in a fast local cache. For subsequent reads by that same user within a short TTL (e.g., 5 seconds), route to the leader to guarantee they see their own comment. All other users' reads continue going to followers. Trade-offs: slightly increased leader load for active commenters (~0.1% of reads), requires a low-latency receipt cache (single point of failure if it goes down, though failing open to follower reads is safe), and the TTL must be tuned to exceed the maximum replication lag.",
            bloomLevel: "Create",
            relatedLessonId: "meta-infra-2-1"
          }
        ]
      }
    }
  ]
};
