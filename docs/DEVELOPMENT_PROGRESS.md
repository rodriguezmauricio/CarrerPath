# Development Progress

## Multi-Company Career Path Platform

### Step 1: Extract Tracks into Individual Files
- **Status**: DONE
- **Date**: 2026-03-13
- Split `curriculum.ts` (1,312 lines) into 11 individual track files under `src/lib/tracks/`
- Created `src/lib/tracks/index.ts` with track registry (`Map<string, Track>`) and `getTrack()` helper
- `curriculum.ts` is now a 4-line backward-compat shim
- TypeScript compiles clean, app works identically

**Files created:**
- `src/lib/tracks/core-lang.ts`
- `src/lib/tracks/apis.ts`
- `src/lib/tracks/auth-security.ts`
- `src/lib/tracks/sql-data.ts`
- `src/lib/tracks/networking.ts`
- `src/lib/tracks/debugging.ts`
- `src/lib/tracks/dev-tools.ts`
- `src/lib/tracks/ai-llm.ts`
- `src/lib/tracks/enterprise-support.ts`
- `src/lib/tracks/compliance.ts`
- `src/lib/tracks/soft-skills.ts`
- `src/lib/tracks/index.ts`

---

### Step 2: Add New Types (Company, Role, Phase, TrackRef)
- **Status**: DONE
- **Date**: 2026-03-13
- Added to `src/lib/types.ts`: `Company`, `Role`, `Phase`, `TrackRef`, `LessonCustomization`
- Added optional `tags` field to `Track` for filtering
- `TrackRef` supports per-lesson customizations (override `why` text and swap examples)
- TypeScript compiles clean, no breaking changes

### Step 3: Create Company Definitions (6 companies)
- **Status**: DONE
- **Date**: 2026-03-13
- Created `src/lib/companies/` directory with 7 files
- `anthropic.ts` — 3 roles: Support Engineer, Solutions Architect, Developer Advocate
- `openai.ts` — 3 roles: Support Engineer, Solutions Architect, Developer Advocate
- `google.ts` — 3 roles: Support Engineer, Cloud Solutions Architect, Developer Relations Engineer
- `meta.ts` — 3 roles: Support Engineer, Production Engineer (SRE), Developer Advocate
- `stripe.ts` — 3 roles: Support Engineer, Solutions Architect, Integration Engineer
- `aws.ts` — 3 roles: Cloud Support Engineer, Solutions Architect, Technical Account Manager
- `index.ts` — exports `allCompanies[]`, `companyRegistry` Map, and `getCompany()` helper
- Each role has 4 phases with month ranges and track assignments
- Anthropic Support Engineer maps to all 11 existing tracks (backward compatible)
- TypeScript compiles clean

### Step 4: Write Full Curricula for Company-Specific Tracks
- **Status**: DONE
- **Date**: 2026-03-13
- Created 5 company-specific track files under `src/lib/tracks/`:
  - `openai-api-deep.ts` — GPT models, chat completions, function calling, assistants API
  - `google-cloud.ts` — GCP core services, IAM, Vertex AI, BigQuery
  - `meta-infra.ts` — Production engineering culture, SLOs/SLIs, distributed systems at scale
  - `stripe-payments.ts` — PaymentIntents, Checkout, webhooks, Connect platforms
  - `aws-services.ts` — IAM policies, EC2/Lambda, CloudFormation, S3, VPC
- Each track: 2 chapters, 1 lesson each (full content with objectives, misconceptions, concepts, 3 mini exercises, resources, reviews)
- Registered all 5 in `src/lib/tracks/index.ts` (total: 16 tracks)
- Updated all 5 company definitions to reference their company-specific track
- TypeScript compiles clean

### Step 5: New Routing Structure
- **Status**: DONE
- **Date**: 2026-03-13
- Created nested route structure under `/company/[companyId]/role/[roleId]/track/[trackId]/lesson/[lessonId]`
- All pages have full breadcrumb navigation (Home > Company > Role > Track > Lesson)
- Old `/track/[trackId]` routes kept for standalone browsing
- Updated `LessonNav` to accept optional `basePath` prop for context-aware navigation
- `generateStaticParams` on server pages for static generation
- TypeScript compiles clean

**Files created:**
- `src/app/company/[companyId]/page.tsx` — Company detail with role cards
- `src/app/company/[companyId]/role/[roleId]/page.tsx` — Role curriculum (phases + track grid)
- `src/app/company/[companyId]/role/[roleId]/track/[trackId]/page.tsx` — Track detail with chapter/lesson list
- `src/app/company/[companyId]/role/[roleId]/track/[trackId]/lesson/[lessonId]/page.tsx` — Full lesson view

**Files modified:**
- `src/components/LessonNav.tsx` — Added `basePath` prop

### Step 6: New Components
- **Status**: DONE
- **Date**: 2026-03-13
- Created `CompanyCard.tsx`, `RoleCard.tsx`, `SearchFilter.tsx`
- Rewrote `Sidebar.tsx` — context-aware: shows companies at root, tracks within a role
- Updated `layout.tsx` metadata for multi-company platform
- TypeScript compiles clean

### Step 7: New Landing Page
- **Status**: NOT STARTED

### Step 8: Content Reuse Strategy & Tagging
- **Status**: NOT STARTED

### Step 9: localStorage Progress Tracking
- **Status**: NOT STARTED

### Step 10: Polish & Enhancements
- **Status**: NOT STARTED
