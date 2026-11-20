# Feature Specification: Scoped API Key Management
## Parent Product: CloudMetrics Observability Platform

- **Tier:** Standard Tier (Feature PRD)
- **Document Version:** 1.0.0
- **Status:** Approved
- **Target Release:** Sprint 42 (Q1 Release)
- **Document Location:** `docs/api-key-management.md`
- **Related Main PRD:** `PRD.md`

---

### 1. Feature Objective & Context

#### 1.1 Problem Statement
Customers currently share a single workspace-wide master API token to ingest metrics from multiple microservices and CLI tools. If a token is compromised or needs rotation, revoking it breaks ingestion across the entire organization.

#### 1.2 User Value & Objective
Allow Organization Admins and Developers to create, scope (read, write, admin), name, and instantly revoke individual API keys with optional expiration dates. This limits blast radius during credential exposure and enables automated CI/CD metric publishing.

---

### 2. User Entry Points & Interaction Flow

- **Entry Point:** Organization Settings &rarr; Developers &rarr; **API Keys** (`/settings/api-keys`).
- **Happy Path:**
  1. Admin clicks **"Create New API Key"**.
  2. A modal prompts for:
     - Key Name (e.g. `github-actions-ci`)
     - Scope checkboxes: `metrics:write`, `metrics:read`, `alerts:read`
     - Expiration: `30 days`, `90 days`, `1 year`, `Never`
  3. Admin clicks **"Generate Key"**.
  4. System generates the raw key `cm_live_xxxxxxxxxxxxxxxxxxxx` and presents it in a one-time reveal dialog with a **"Copy to Clipboard"** button.
  5. User confirms they saved the key and closes the modal.
  6. The new key appears in the API Keys table showing its prefix (`cm_live_abc12...`), scopes, creation date, last used timestamp, and a **"Revoke"** action.

- **Edge Cases & Failure Flows:**
  - **Duplicate Name:** If an active key with the same name exists, show inline error: *"A key with this name already exists in this workspace."*
  - **Key Revocation Confirmation:** Clicking "Revoke" requires typing the key's prefix into a confirmation prompt to prevent accidental production outages.
  - **Lost Raw Key:** The full raw key is never stored in plaintext and cannot be retrieved again after closing the initial dialog.

---

### 3. Functional Requirements

#### FR-KEY-001: Generate Scoped API Key
- **Priority:** Must Have
- **Description:** Allow authorized users (Role: `Admin` or `Owner`) to generate a cryptographically secure random API key with granular permission scopes.
- **Business Rules:**
  - Key format must adhere to `cm_live_[32 random hex characters]`.
  - Stored in database as a SHA-256 hash; the raw key is never stored in persistent storage.
  - Prefix (first 8 characters after `cm_live_`) is stored plaintext for identification in logs and UI.
  - Maximum of 25 active API keys per workspace on standard plans.
- **Acceptance Criteria:**
  - [ ] Given an Admin user on `/settings/api-keys`, when submitting valid key details, a new key record is created and the raw key string is displayed.
  - [ ] Given a workspace with 25 active keys, when the user clicks "Create New API Key", disable the submission and display: *"Workspace key limit reached (25/25). Revoke unused keys to create new ones."*

#### FR-KEY-002: One-Time Secret Reveal & Clipboard Action
- **Priority:** Must Have
- **Description:** The full generated API key secret must be presented exactly once in an explicit dialog with clipboard integration.
- **Business Rules:**
  - Closing the modal without copying must prompt a warning: *"You will not be able to view this key again. Have you saved it?"*
- **Acceptance Criteria:**
  - [ ] Given a newly generated key, when displayed in the modal, the full secret string is visible with a "Copy" button.
  - [ ] When the "Copy" button is clicked, write key to clipboard and show visual confirmation badge *"Copied!"* for 2000ms.

#### FR-KEY-003: Immediate Key Revocation
- **Priority:** Must Have
- **Description:** Allow immediate revocation of an API key, invalidating all subsequent API requests authenticated by it within 5 seconds.
- **Business Rules:**
  - Revoked keys cannot be unrevoked.
  - Key record remains in the table with status `Revoked` for audit logging for 90 days.
  - Ingestion gateway edge cache for this key hash must be purged immediately upon revocation.
- **Acceptance Criteria:**
  - [ ] Given an active key `cm_live_abc...`, when revoked by an admin, any subsequent API request using `Authorization: Bearer cm_live_abc...` returns `HTTP 401 Unauthorized` with `{"error": "API key has been revoked"}`.

---

### 4. UI/UX Changes & State Handling

- **Existing Views Modified:**
  - `src/components/settings/SettingsNavigation.tsx`: Add "API Keys" navigation tab under Developers section.
- **New Views / Components:**
  - `src/app/(dashboard)/settings/api-keys/page.tsx`: Main keys management dashboard.
  - `src/components/api-keys/CreateKeyModal.tsx`: Creation & scope picker dialog.
  - `src/components/api-keys/RevealKeyDialog.tsx`: One-time key display dialog.
  - `src/components/api-keys/RevokeKeyModal.tsx`: Two-step revocation confirmation.
- **States Covered:**
  - **Loading:** Table renders 4 animated skeleton rows while fetching keys via React Query.
  - **Empty:** Display centered key icon, title *"No API keys yet"*, description *"Create scoped keys to authenticate your apps and CI/CD pipelines"*, and primary button `+ Create API Key`.
  - **Error:** When API fails to load or revoke, render dismissible toast notification with error description and a "Retry" button.
  - **Success:** Dismiss modal, display green toast *"API Key 'github-actions' created successfully"*, and prepend new row into table.

---

### 5. Data & API Changes

#### 5.1 Database Schema (Prisma Migration)
```prisma
model ApiKey {
  id           String    @id @default(cuid())
  workspaceId  String
  name         String    @db.VarChar(80)
  keyPrefix    String    @db.VarChar(16)
  keyHash      String    @unique @db.VarChar(64) // SHA-256
  scopes       String[]  // ['metrics:write', 'metrics:read']
  lastUsedAt   DateTime?
  expiresAt    DateTime?
  revokedAt    DateTime?
  createdAt    DateTime  @default(now())
  createdBy    String

  workspace    Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)

  @@index([workspaceId, revokedAt])
  @@index([keyHash])
}
```

#### 5.2 API Endpoints
- `GET /api/v1/workspaces/:workspaceId/api-keys`: Returns list of keys (masked prefixes only, never raw keys).
- `POST /api/v1/workspaces/:workspaceId/api-keys`: Generates key, stores hash, returns `{ id, prefix, rawKey, scopes, expiresAt }`.
- `DELETE /api/v1/workspaces/:workspaceId/api-keys/:keyId`: Marks key revoked and purges authentication cache.

#### 5.3 Backward Compatibility
- Existing legacy organization tokens will continue functioning under the implicit `full:admin` scope until sunset announcement in Q3.
- No breaking changes to existing `/v1/metrics` payload ingestion endpoints.

---

### 6. Acceptance & Rollout Checklist

- [ ] Prisma schema migration tested on staging database.
- [ ] SHA-256 hash verification benchmarked at `< 2ms` per auth check.
- [ ] Unit tests written for key generation, scope checking, and expiration rules.
- [ ] Integration tests verify revoked keys are rejected within `< 1s` across edge gateway.
- [ ] Audit log events emitted for: `api_key.created`, `api_key.revoked`.
- [ ] Feature flagged behind `workspace_scoped_api_keys` for staged 10% canary rollout.
