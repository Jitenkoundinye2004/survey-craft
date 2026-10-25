# SurveyCraft Role-Based Access Control (RBAC) Matrix (Hardened)

**Last Updated:** October 26, 2026  
**Auditor:** Application Security & Access Control Auditor  
**Status:** **100% VERIFIED & HARDENED**

---

## 1. Discovered Application Roles

The SurveyCraft security architecture implements a granular role-based hierarchy enforced at both the Organization level (`Membership.role`) and the Workspace level (`WorkspaceTeam` / team permissions):

1. **Owner (Super Admin):**
   - Holds unrestricted authority over the Organization, its Workspaces, and all child resources.
   - Governs billing, enterprise licenses, custom CNAME domains, API keys, and team membership management.
   - Test Persona: `admin@surveycraft.dev`
2. **Manager (Admin):**
   - Has full operational authority over Workspaces.
   - Can create, edit, publish, pause, and delete surveys; manage contacts, integrations, webhooks, and tags.
   - Can invite new members to workspaces and teams.
   - Test Persona: `manager@surveycraft.dev`
3. **Member (Normal User):**
   - Standard team contributor.
   - Can view surveys, analyze responses, browse contacts, and view dashboards.
   - Cannot mutate organization-level governance settings (API keys, billing, domains, license).
   - Test Persona: `member@surveycraft.dev`
4. **Billing:**
   - Dedicated financial manager role.
   - Restricted exclusively to billing and enterprise license screens (`getBillingFallbackPath`).
   - Hard-blocked from accessing survey respondent data, contacts PII, or raw customer feedback.
5. **Anonymous / Public Respondent:**
   - Unauthenticated external visitor.
   - Authorized only to view and submit surveys via public links (`/s/[surveyId]`).
   - Hard-blocked from all internal routes and API endpoints via Edge HTTP 307 redirects.

---

## 2. Comprehensive Role-by-Module Access Matrix (Post-Hardening)

| Module / Feature Area | Target Route | Owner | Manager | Member | Billing | Anonymous (Hardened) |
|---|---|:---:|:---:|:---:|:---:|:---:|
| **Public Survey Engine** | `/s/[surveyId]` | Access | Access | Access | Access | **Submit Only** |
| **Authentication: Login** | `/auth/login` | Access | Access | Access | Access | **Access** |
| **Authentication: Signup** | `/auth/signup` | Access | Access | Access | Access | **Access** |
| **Surveys List** | `/workspaces/[id]/surveys` | **Full** | **Full** | Read/Write | Blocked | **Denied (Edge 307)** |
| **Survey Builder / Editor** | `.../surveys/[id]/edit` | **Full** | **Full** | Read/Write | Blocked | **Denied (Edge 307)** |
| **Survey Analytics & Summary** | `.../surveys/[id]/summary` | **Full** | **Full** | Read | Blocked | **Denied (Edge 307)** |
| **Survey Responses Log** | `.../surveys/[id]/responses` | **Full** | **Full** | Read | Blocked | **Denied (Edge 307)** |
| **Contacts & Segments CRM** | `/workspaces/[id]/contacts` | **Full** | **Full** | Read | Blocked | **Denied (Edge 307)** |
| **Feedback Data (Unify)** | `/workspaces/[id]/unify/sources` | **Full** | **Full** | Read | Blocked | **Denied (Edge 307)** |
| **Analysis Dashboards** | `/workspaces/[id]/dashboards` | **Full** | **Full** | Read | Blocked | **Denied (Edge 307)** |
| **Automation Workflows** | `/workspaces/[id]/workflows` | **Full** | **Full** | Read | Blocked | **Denied (Edge 307)** |
| **Workspace General Settings** | `.../workspace/general` | **Manage** | **Manage** | Read-Only | Blocked | **Denied (Edge 307)** |
| **Workspace Team Access** | `.../workspace/teams` | **Manage** | **Manage** | Read-Only | Blocked | **Denied (Edge 307)** |
| **Workspace Languages** | `.../workspace/languages` | **Manage** | **Manage** | Read-Only | Blocked | **Denied (Edge 307)** |
| **Workspace Embedded Data** | `.../workspace/embedded-data` | **Manage** | **Manage** | Read-Only | Blocked | **Denied (Edge 307)** |
| **Workspace SDK Connections** | `.../workspace/app-connection` | **Manage** | **Manage** | Read-Only | Blocked | **Denied (Edge 307)** |
| **Workspace Integrations** | `.../workspace/integrations` | **Manage** | **Manage** | Read-Only | Blocked | **Denied (Edge 307)** |
| **Workspace Look & Feel** | `.../workspace/look` | **Manage** | **Manage** | Read-Only | Blocked | **Denied (Edge 307)** |
| **Workspace User Actions** | `.../workspace/user-actions` | **Manage** | **Manage** | Read-Only | Blocked | **Denied (Edge 307)** |
| **Workspace Tags Taxonomy** | `.../workspace/tags` | **Manage** | **Manage** | Read-Only | Blocked | **Denied (Edge 307)** |
| **Org General Settings** | `/organizations/[id]/settings/general` | **Manage** | Read-Only | Read-Only | Blocked | **Denied (Edge 307)** |
| **Org Team Management** | `.../settings/teams` | **Manage** | Read-Only | Read-Only | Blocked | **Denied (Edge 307)** |
| **Org Management API Keys** | `.../settings/api-keys` | **Manage** | Blocked | Blocked | Blocked | **Denied (Edge 307)** |
| **Org Data Retention (GDPR)**| `.../settings/data-retention` | **Manage** | Blocked | Blocked | Blocked | **Denied (Edge 307)** |
| **Org Custom CNAME Domain** | `.../settings/domain` | **Manage** | Blocked | Blocked | Blocked | **Denied (Edge 307)** |
| **Org Enterprise License** | `.../settings/enterprise` | **Manage** | Read-Only | Read-Only | **Manage** | **Denied (Edge 307)** |
| **Org Usage & Quotas** | `.../settings/usage` | **Manage** | Read-Only | Read-Only | **Manage** | **Denied (Edge 307)** |
| **Account Profile & Password** | `/account/settings/profile` | **Full** | **Full** | **Full** | **Full** | **Denied (Edge 307)** |
| **Account Notifications** | `/account/settings/notifications` | **Full** | **Full** | **Full** | **Full** | **Denied (Edge 307)** |
| **Account Authorized Apps** | `/account/settings/authorized-apps`| **Full** | **Full** | **Full** | **Full** | **Denied (Edge 307)** |
| **Management API v3** | `/api/v3/*` | **Full** | Scoped | Scoped | Blocked | **401 Unauthorized** |

---

## 3. Server-Side Enforcement Architecture

SurveyCraft strictly avoids cosmetic UI-only gating. Every permission is validated on the backend:

1. **Edge Proxy Level (`endpoint-validator.ts` & `proxy.ts`):**  
   Pre-routes requests before reaching React components. Validates token presence for `/workspaces/*`, `/account/*`, `/organizations/*`, and `/environments/*`. Unauthenticated requests receive immediate `HTTP 307 Redirect` to `/auth/login?callbackUrl=...`.
2. **Session Choke Point (`modules/auth/lib/session.ts`):**  
   Reads signed Better Auth cookies, verifies database session validity in Neon PostgreSQL, and checks `user.isActive === true`.
3. **Workspace Authorization Surface (`modules/workspaces/lib/utils.ts`):**  
   `resolveWorkspaceAuth()` enforces:
   - Tenant membership lookup (`getMembershipByUserIdOrganizationId`).
   - Role flag extraction (`isOwner`, `isManager`, `isMember`, `isBilling`).
   - Rejection of billing roles to financial paths.
   - Fine-grained permission checking (`can(user, "workspace.read", workspace)`).
4. **Data Layer DAL:**  
   Prisma queries filter strictly by `where: { organizationId, workspaceId }`.

---

## 4. Audit & Hardening Conclusion

The Role-Based Access Control system adheres to the principle of least privilege. Cross-tenant boundaries are strictly defended with `AuthorizationError` exceptions, and unauthenticated requests to APIs and protected routes are rejected immediately with HTTP 401 and HTTP 307.
