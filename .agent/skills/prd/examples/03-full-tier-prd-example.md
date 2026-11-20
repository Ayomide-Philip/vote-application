# Product Requirements Document (PRD)

## PulseLog: Real-Time Developer Incident Triage & Sprint Health Platform

- **Tier:** Full Tier (Greenfield Multi-Role Platform)
- **Document Version:** 1.0.0
- **Status:** Approved
- **Author:** Product Engineering Team
- **Target Release:** Q2 2027 (Public Beta)
- **Document Destination:** `PRD.md`

---

### 1. Executive Summary & Vision

#### 1.1 Problem Statement
Engineering organizations struggle with fractured incident response and delayed sprint retrospectives. When an alert fires in PagerDuty or Datadog, engineers coordinate chaotically across Slack, Jira, and Google Docs. Critical debugging timelines and root causes are lost in thread noise, leading to repeated regressions and inaccurate post-mortem metrics.

#### 1.2 Product Vision
PulseLog is an engineering observability and incident coordination workspace that bridges production anomalies directly with sprint execution. It automatically aggregates alerts, synthesizes live war-room discussions into structured post-mortems via AI, and generates preventative engineering backlog items.

#### 1.3 Value Proposition
- **Automated Incident Chronicle:** Real-time chronological capture of events, metric anomalies, and developer chat notes in one unified timeline.
- **Bi-Directional Sprint Sync:** Converts post-mortem action items into validated Jira/GitHub issues with automated blocker tracking.
- **Audit-Ready Post-Mortems:** Generates blameless retrospective documents in minutes, saving 3–5 engineering hours per incident.

#### 1.4 Goals & Non-Goals
- **Goals:**
  - Reduce Mean Time to Assemble (MTTA) incident context from 25 minutes to `< 3 minutes`.
  - Provide sub-second real-time event streaming across all connected war-room participants.
  - Automate 90% of post-mortem initial draft generation.
- **Non-Goals (Out of Scope for Initial Launch):**
  - Native alert routing engine (PulseLog ingests alerts from PagerDuty/Opsgenie; it does not replace pager escalation policies in MVP).
  - Voice/video call hosting (PulseLog links to existing Zoom/Slack Huddle rooms).

---

### 2. Target Users & Personas

| Persona / Role | Description | Primary Needs | Key Pain Points |
| :--- | :--- | :--- | :--- |
| **Incident Commander (On-Call Lead)** | Senior engineer responsible for production triage and resolution. | Rapid timeline visibility, assignment of tasks, and zero manual note-taking overhead during severity-1 events. | Context switching between monitoring dashboards, Slack threads, and issue trackers under pressure. |
| **Engineering Manager** | Manages sprint commitments, team workload, and stakeholder communication. | Clear post-incident action item tracking and incident MTTR/MTTD metrics across sprints. | Post-mortems are neglected or left as unassigned Google Docs that never become tracked sprint work. |
| **Staff Site Reliability Engineer (SRE)** | Oversees platform reliability, architecture standards, and audit compliance. | Structured incident data export, SOC2 audit trails, and root-cause pattern analysis. | Unstructured incident notes make compliance auditing tedious and retrospective pattern discovery impossible. |

---

### 3. User Journeys & Workflows

#### 3.1 Primary Journey: Live Incident Triage & Resolution
```
[Webhook / Alert] ---> [PulseLog Room Created] ---> [Engineers Join] 
                                                            |
[Resolved Incident] <--- [Generate Action Items] <--- [Live Timeline Tagging]
```

1. **Trigger:** Alert fires from Datadog webhook &rarr; PulseLog automatically provisions a war room `/incidents/INC-2027-089`.
2. **Assembly:** Slack notification sends deep link; engineers join and are assigned roles (Commander, Scribe, Investigator).
3. **Investigation:** Engineers post status updates, pin metrics screenshots, and tag log snippets directly into the timeline.
4. **Mitigation:** Commander changes status from `Investigating` &rarr; `Mitigated`.
5. **Post-Mortem Generation:** Commander clicks "Generate Retrospective". System synthesizes timeline entries into a Markdown document.
6. **Action Items:** Engineering Manager converts mitigation tasks into GitHub Issues with one click.

---

### 4. Functional Requirements

#### FR-001: Webhook Incident Ingestion & Auto-Provisioning
- **Priority:** Must Have
- **Description:** System must ingest incident alert webhooks from Datadog, PagerDuty, and generic HTTP endpoints, automatically creating a distinct incident workspace.
- **Business Rules:**
  - Deduping window: Identical alert signatures received within 5 minutes must attach to the existing active incident rather than creating a duplicate room.
  - Generates human-readable incident identifier: `INC-YYYY-[Sequential Number]`.
- **Dependencies:** None.
- **Acceptance Criteria:**
  - [ ] Given a valid JSON webhook payload from PagerDuty containing severity `P1`, when received at `/api/v1/webhooks/pagerduty`, create a new incident workspace and broadcast `incident.created` event within 800ms.
  - [ ] Given a duplicate webhook payload within 3 minutes of an open incident, append the payload as a timeline entry without incrementing the incident counter.

#### FR-002: Real-Time Collaborative Incident Timeline
- **Priority:** Must Have
- **Description:** Multi-user real-time timeline where responders post updates, pin metrics, and record timestamps collaboratively.
- **Business Rules:**
  - Updates must synchronize via WebSockets to all active viewers with `< 200ms` latency.
  - Responders can tag entries as `#hypothesis`, `#action`, `#metric`, or `#decision`.
  - Timeline entries are immutable; edits append an audit record rather than overwriting original timestamps.
- **Acceptance Criteria:**
  - [ ] Given multiple users in `/incidents/INC-101`, when User A posts an update tagged `#decision`, the update renders on User B's screen without a manual page refresh within 200ms.
  - [ ] Given an entry on the timeline, when edited, preserve the original timestamp and display an `(edited)` indicator with previous revision history.

#### FR-003: Role-Based Access Control (RBAC)
- **Priority:** Must Have
- **Description:** Granular permissions across three roles: `Owner`, `Responder`, and `Viewer`.
- **Business Rules:**
  - Only `Owner` and `Responder` can change incident state (`Investigating`, `Mitigated`, `Resolved`).
  - `Viewer` can read timelines, export reports, but cannot post or modify tags.
- **Acceptance Criteria:**
  - [ ] Given a user with role `Viewer`, when viewing an active incident, all status change buttons and comment inputs are disabled.

#### FR-004: Automated Retrospective Draft Synthesis
- **Priority:** Should Have
- **Description:** Generates a structured Markdown retrospective draft from the chronological timeline entries, categorizing root causes, impact metrics, and action items.
- **Business Rules:**
  - Synthesis execution time must not exceed 10 seconds.
  - Draft must leave placeholders `[Requires Engineering Confirmation]` for unverified technical deductions.
- **Acceptance Criteria:**
  - [ ] Given a resolved incident with at least 5 timeline events, when the Commander clicks "Generate Retrospective", a Markdown editor opens populated with: Executive Summary, Impact Duration, Chronological Sequence, and Root Cause Analysis.

---

### 5. UI/UX Specifications

#### 5.1 Screen & Navigation Inventory
- `/incidents`: Real-time incident dashboard listing active and resolved incidents with severity badges.
- `/incidents/:id`: War room interface featuring split-pane layout: Live Timeline (Left 60%), Responders & Metrics Panel (Right 40%).
- `/incidents/:id/post-mortem`: Markdown retrospective editor with version history and export toolbar.
- `/settings/integrations`: Webhook endpoint management and API token configuration.

#### 5.2 Key UI States
- **Loading:** Timeline displays shimmer skeleton placeholders matching the exact height of avatar + message card blocks.
- **Empty (No Active Incidents):** Green checkmark illustration with banner *"All systems operational — zero active incidents in the last 24 hours"*.
- **Error:** Disconnected WebSocket banner across top of window: *"Real-time connection lost. Reconnecting in 3s... [Reconnect Now]"*.
- **Success:** Status update pill animates with a pulse glow and plays an optional unobtrusive audio chime.

#### 5.3 Responsive & Accessibility Expectations
- Responsive breakpoints: Optimized for Desktop (`1280px+`) and Tablet/Laptop (`1024px+`). Mobile viewport (`<640px`) serves a responsive read-only on-call triage view.
- Accessibility: WCAG 2.1 AA compliant. High-contrast severity tokens (`P1` crimson `#DC2626`, `P2` amber `#D97706`, `P3` sky `#0284C7`). Keyboard navigation: `J`/`K` navigates timeline entries.

---

### 6. Technical Architecture & Data Requirements

#### 6.1 Technology Stack
- **Frontend:** Next.js 16 App Router, React 19, Tailwind CSS v4, Lucide Icons, Radix UI.
- **Backend / Realtime:** Node.js, Next.js Route Handlers, WebSocket Server (Socket.io / PartyKit edge cluster).
- **Database & Cache:** PostgreSQL (Neon / Supabase), Prisma ORM, Redis (Upstash) for pub/sub and rate limiting.
- **Authentication:** Auth.js (NextAuth) with GitHub & Google OAuth and SAML SSO support.

#### 6.2 Data Models (High-Level Entities)
```typescript
export interface Incident {
  id: string;               // e.g. "inc_cm19x8"
  slug: string;             // e.g. "INC-2027-089"
  title: string;            // Brief summary
  severity: 'P1' | 'P2' | 'P3' | 'P4';
  status: 'INVESTIGATING' | 'IDENTIFIED' | 'MITIGATED' | 'RESOLVED';
  commanderId: string;
  startedAt: string;        // ISO 8601
  mitigatedAt?: string;
  resolvedAt?: string;
  createdAt: string;
}

export interface TimelineEntry {
  id: string;
  incidentId: string;
  authorId: string;
  content: string;
  tag: 'NOTE' | 'HYPOTHESIS' | 'ACTION' | 'METRIC' | 'DECISION';
  pinned: boolean;
  timestamp: string;        // ISO 8601
  createdAt: string;
}
```

#### 6.3 API Contract Specifications
```markdown
### POST /api/v1/incidents/:id/timeline
- **Authentication:** Bearer JWT (Role: Owner, Responder)
- **Rate Limit:** 30 requests/minute per user

#### Request Payload
| Field | Type | Required | Constraints |
| :--- | :--- | :--- | :--- |
| `content` | string | Yes | Min 1 char, max 5000 chars |
| `tag` | string | Yes | One of: `NOTE`, `HYPOTHESIS`, `ACTION`, `METRIC`, `DECISION` |
| `pinned` | boolean | No | Default `false` |

#### Response Codes
- `201 Created`: `{"success": true, "entry": { ...TimelineEntry }}`
- `400 Bad Request`: `{"error": "Invalid tag type"}`
- `403 Forbidden`: `{"error": "Viewers cannot append to timeline"}`
- `429 Too Many Requests`: `{"error": "Rate limit exceeded"}`
```

---

### 7. Non-Functional Requirements

- **Performance:** WebSocket event broadcast delivery to all room subscribers `< 200ms` at 95th percentile.
- **Availability:** 99.95% uptime SLA for webhook ingestion and war-room access.
- **Security:**
  - All data encrypted in transit via TLS 1.3 and at rest via AES-256.
  - Strict tenant isolation enforced at Prisma query layer (`workspaceId` scoped on all queries).
- **Audit Logging:** Every status change, role change, and entry deletion recorded in an immutable audit ledger retained for 365 days.

---

### 8. Prioritization & MVP Scope (MoSCoW)

- **Must Have (Day 1 MVP):**
  - FR-001: Webhook incident creation (PagerDuty & generic webhook).
  - FR-002: Real-time collaborative timeline with tagging and pinning.
  - FR-003: RBAC (`Owner`, `Responder`, `Viewer`).
  - Markdown post-mortem manual export.
- **Should Have (v1.1):**
  - FR-004: Automated retrospective draft synthesis.
  - Bi-directional GitHub/Jira issue creation.
- **Could Have (v1.2):**
  - Slack Bot integration for inline `/pulselog note [text]` timeline additions.
- **Won't Have (Excluded from Initial Milestones):**
  - Native video calling or screen sharing.
  - Custom SMS telephony paging engine.

---

### 9. Assumptions, Risks & Mitigation Matrix

| Type | Description | Impact | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **Assumption** | Most engineering teams already utilize PagerDuty or Datadog for initial alert triggers. | High | Provide a generic REST webhook with copy-paste curl examples for teams with custom monitoring. |
| **Risk** | High-volume alert storms could flood the WebSocket channel during major infrastructure outages. | High | Implement client-side batching and server-side message debouncing (max 20 messages/sec per room). |
| **Risk** | Database downtime during a major cloud provider outage could render PulseLog inaccessible. | Critical | Multi-region database read replica and edge-cached static fallback UI. |

---

### 10. Document Revision History

| Version | Date | Author | Description of Changes |
| :--- | :--- | :--- | :--- |
| 1.0.0 | 2026-11-15 | Product Engineering Lead | Initial comprehensive PRD approved for implementation. |
