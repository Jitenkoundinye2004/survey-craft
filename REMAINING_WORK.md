# SurveyCraft Remaining Work & Action Items (Updated Post-Remediation)

**Last Updated:** October 26, 2026  
**Status:** **ALL P1 SECURITY HARDENING & CORE DEFECTS REMEDIATED & VERIFIED**  
**Readiness Verdict:** **PRODUCTION READY**

---

## Task Status Summary

| Priority | Total Identified | Completed & Verified | Remaining Optional / Tech Debt |
|:---:|:---:|:---:|:---:|
| **P0** | 0 | 0 | **0** |
| **P1** | 1 | **1 (100%)** | **0** |
| **P2** | 3 | **2** | **1 (Optional OAuth)** |
| **P3** | 4 | 0 | 4 (Non-blocking cleanup) |
| **Total** | 8 | **3 Critical Remediated** | **5 Non-blocking** |

---

## P0: Critical Blockers (0 Items)

*No critical blockers. Authentication, database operations, session management, and AI services are fully operational.*

---

## P1: High Priority (1 Item — ALL RESOLVED)

### TASK-P1-01: Add `/workspaces` to Edge Middleware Route Protection
- **Status:** **COMPLETED AND VERIFIED**
- **Files Modified:**
  - `apps/web/app/middleware/endpoint-validator.ts`
  - `apps/web/app/middleware/endpoint-validator.test.ts`
- **Implemented Fix:**
  Updated `isAuthProtectedRoute` to include `"/workspaces"`, `"/account"`, and `"/billing-confirmation"`:
  ```typescript
  export const isAuthProtectedRoute = (url: string): boolean => {
    const protectedRoutes = [
      "/environments",
      "/setup/organization",
      "/organizations",
      "/workspaces",
      "/account",
      "/billing-confirmation",
    ];
    return protectedRoutes.some((route) => url.startsWith(route));
  };
  ```
- **Verification Evidence:**
  1. `pnpm --filter @formbricks/web test endpoint-validator.test.ts`: **56/56 tests PASSED**.
  2. `pnpm --filter @formbricks/web test proxy.test.ts`: **41/41 tests PASSED**.
  3. Live HTTP Integration Verification:
     ```
     GET /workspaces/clseedworkspace000000000/surveys (Anon) -> 307 Location: /auth/login?callbackUrl=...
     GET /account/settings/profile (Anon) -> 307 Location: /auth/login?callbackUrl=...
     GET /workspaces/clseedworkspace000000000/surveys (Auth) -> 200 OK
     ```
  4. Anonymous visitors are stopped right at the Edge proxy middleware without streaming SSR or invoking layouts.

---

## P2: Medium Priority (3 Items — 2 RESOLVED, 1 OPTIONAL)

### TASK-P2-01: Legacy Navigation Route Redirects
- **Status:** **COMPLETED AND VERIFIED**
- **Files Modified:** `apps/web/next.config.mjs`
- **Implemented Fix:**
  Added permanent HTTP 308 redirects from legacy Formbricks v5 paths to modern SurveyCraft v6 unified views:
  - `/workspaces/:workspaceId/feedback-data` -> `/workspaces/:workspaceId/unify/sources`
  - `/workspaces/:workspaceId/analysis` -> `/workspaces/:workspaceId/dashboards`
- **Verification Evidence:**
  Live test returned:
  - `feedback-data Status: 308 Location: /workspaces/clseedworkspace000000000/unify/sources`
  - `analysis Status: 308 Location: /workspaces/clseedworkspace000000000/dashboards`

### TASK-P2-02: Production Build & Node.js Memory Allocation
- **Status:** **COMPLETED AND VERIFIED**
- **Files Modified:** `apps/web/package.json`
- **Implemented Fix:**
  Configured `cross-env NODE_OPTIONS=--max-old-space-size=4096` in `apps/web/package.json` `"dev"` and `"go"` scripts (joining the existing 8192MB allocation on `"build"` and `"typecheck"`).
- **Verification Evidence:**
  Web development server booted cleanly with 4GB heap and compiled all application routes without memory pressure.

### TASK-P2-03: Optional Third-Party OAuth Social Logins
- **Status:** **OPTIONAL / DOCUMENTED**
- **Description:** Standard email/password authentication with Better Auth is 100% active and verified. If Google or GitHub social logins are required, add `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, and `GITHUB_CLIENT_SECRET` into production `.env`.
- **Blocker:** None — completely optional feature.

---

## P3: Low Priority & Codebase TODOs (4 Items — Non-blocking Tech Debt)

1. **TASK-P3-01: Survey Type Zod Deprecation Review** (`apps/web/lib/survey/service.ts:1288`)
   - Schema mapping preserves backwards compatibility for legacy survey records.
2. **TASK-P3-02: Block-Based Survey Model Transition** (`packages/types/surveys/types.ts:949`)
   - Future deprecation of flat question array in favor of block structures.
3. **TASK-P3-03: Response Pipeline Queue Worker Fallback** (`packages/jobs/src/processors/response-pipeline.ts:4`)
   - Worker registration fallback for multi-container topologies.
4. **TASK-P3-04: Submit Button Styling Refactor** (`packages/surveys/src/components/buttons/submit-button.tsx:29`)
   - Minor Tailwind CSS utility refactor.
