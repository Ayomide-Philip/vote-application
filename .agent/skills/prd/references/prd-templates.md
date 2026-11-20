# PRD Templates

This reference provides standardized, battle-tested Product Requirements Document (PRD) templates for both full products (greenfield) and feature additions (existing codebases).

---

## 1. Full Product PRD Template (`PRD.md`)

Use this template for new applications, complete products, or ground-up rewrites. It lives in the project root as `PRD.md`.

````markdown
# Product Requirements Document (PRD)

## [Product Name]

- **Document Version:** 1.0.0
- **Status:** Draft | In Review | Approved
- **Author:** [Author Name / Team]
- **Target Release:** [Target Date / Quarter]
- **Repository / Workspace:** [Repo Link or Path]

---

### 1. Executive Summary & Vision

#### 1.1 Problem Statement

[Clearly describe the user pain point, market gap, or inefficiency being addressed.]

#### 1.2 Product Vision

[What the product does and why it exists. The aspirational yet realistic end state.]

#### 1.3 Value Proposition

- **Primary Value:** [Main benefit for core users]
- **Differentiator:** [Why this approach succeeds over alternatives]

#### 1.4 Goals & Non-Goals

- **Goals:**
  - [Goal 1: Measurable outcome]
  - [Goal 2: Core functional objective]
- **Non-Goals (Out of Scope for Initial Launch):**
  - [Explicit exclusion 1]
  - [Explicit exclusion 2]

---

### 2. Target Users & Personas

| Persona / Role       | Description                           | Primary Needs            | Key Pain Points    |
| :------------------- | :------------------------------------ | :----------------------- | :----------------- |
| **[Persona Name 1]** | [Role, context, technical background] | [What they must achieve] | [Current friction] |
| **[Persona Name 2]** | [Role, context]                       | [Needs]                  | [Friction]         |

---

### 3. User Journeys & Workflows

#### 3.1 Primary Journey: [e.g., First-Time Onboarding & First Value]

1. **Entry Point:** [Where user lands / initiates action]
2. **Step 1:** [User action -> System response]
3. **Step 2:** [User action -> System response]
4. **Success State:** [Expected outcome / confirmation]
5. **Alternative / Failure Flow:** [Error state handling]

---

### 4. Functional Requirements

#### FR-001: [Feature / Requirement Name]

- **Priority:** Must Have | Should Have | Could Have
- **Description:** [Concise description of the capability]
- **User Story:** As a [user persona], I want to [action] so that [outcome].
- **Business Rules:**
  - [Rule 1: Constraint, validation, or permission]
  - [Rule 2: Behavioral requirement]
- **Dependencies:** [Other FRs or external systems]
- **Acceptance Criteria:**
  - [ ] Given [condition], when [action], then [expected outcome].
  - [ ] System handles [edge case] by [expected response].

#### FR-002: [Feature / Requirement Name]

- **Priority:** Must Have | Should Have | Could Have
- **Description:** [Description]
- **Business Rules:**
  - [Rules]
- **Acceptance Criteria:**
  - [ ] [Observable testable criterion]

---

### 5. UI/UX Specifications

#### 5.1 Screen & Navigation Inventory

- `[Screen 1 / URL path]`: [Purpose and primary components]
- `[Screen 2 / URL path]`: [Purpose and primary components]

#### 5.2 Key UI States

- **Loading State:** [Skeleton screens, spinners, or progressive loading]
- **Empty State:** [Helpful illustration, explanatory text, primary CTA]
- **Error State:** [Inline validation, toast notification, recovery options]
- **Success State:** [Visual confirmation, clear next steps]

#### 5.3 Responsive & Accessibility Expectations

- Responsive breakpoints: Mobile (<640px), Tablet (640-1024px), Desktop (>1024px).
- Accessibility: WCAG 2.1 AA compliant (color contrast, keyboard focus, screen reader aria attributes).

---

### 6. Technical Architecture & Data Requirements

#### 6.1 Technology Stack

- **Frontend:** [e.g., Next.js 16 App Router, React 19, Tailwind CSS]
- **Backend / APIs:** [e.g., Next.js Route Handlers / Node.js]
- **Database / Storage:** [e.g., PostgreSQL, Prisma, Local File Store]
- **External Services / APIs:** [e.g., Auth, Payments, Email]

#### 6.2 Data Models (High-Level Entities)

```typescript
interface [EntityName] {
  id: string;
  createdAt: string;
  // core fields
}
```
````

#### 6.3 Security & Authorization

- [Auth model, RBAC roles, data sanitization, API rate limiting]

---

### 7. Non-Functional Requirements

- **Performance:** [e.g., Sub-1s page loads, Lighthouse Performance score > 90]
- **Reliability:** [e.g., Graceful error boundaries, offline capabilities]
- **Security:** [e.g., OWASP Top 10 compliance, CSRF/XSS protection]

---

### 8. Prioritization & MVP Scope (MoSCoW)

- **Must Have (MVP):**
  - [FR-001: Core capability]
- **Should Have (v1.1):**
  - [FR-xxx: Important secondary capability]
- **Could Have (Future Consideration):**
  - [FR-xxx: Delight factor / non-essential]
- **Won't Have (Excluded):**
  - [Explicitly excluded feature]

---

### 9. Assumptions, Risks & Open Questions

| Type              | Description                               | Impact   | Mitigation / Status     |
| :---------------- | :---------------------------------------- | :------- | :---------------------- |
| **Assumption**    | [Assumed behavior or infrastructure]      | [Medium] | [Validation plan]       |
| **Risk**          | [Potential technical or business risk]    | [High]   | [Mitigation strategy]   |
| **Open Question** | [Unresolved design or technical decision] | [Low]    | [Pending user decision] |

---

### 10. Document Revision History

| Version | Date       | Author   | Description of Changes |
| :------ | :--------- | :------- | :--------------------- |
| 1.0.0   | YYYY-MM-DD | [Author] | Initial approved PRD   |

````

---

## 2. Feature PRD Template (`docs/<feature-name>.md`)

Use this lightweight template for adding a distinct feature to an existing codebase. It lives in `docs/<feature-name>.md`.

```markdown
# Feature Specification: [Feature Name]
## Parent Product: [Product Name]

- **Document Version:** 1.0.0
- **Status:** Draft | In Review | Approved
- **Target Release:** [Sprint / Milestone]
- **Related Main PRD:** `PRD.md`

---

### 1. Feature Objective & Context

#### 1.1 Problem Statement
[What problem does this feature solve within the existing product?]

#### 1.2 User Value & Objective
[What does the user achieve once this feature is shipped?]

---

### 2. User Entry Points & Interaction Flow

- **Entry Point:** [Button, menu item, or trigger event in the existing UI]
- **Happy Path:**
  1. User triggers [entry point].
  2. System presents [modal/page/drawer].
  3. User completes [input/action].
  4. System confirms with [success feedback] and updates [state].
- **Edge Cases & Failure Flows:**
  - [Network disconnect / validation failure / unauthorized attempt]

---

### 3. Functional Requirements

#### FR-[FEAT]-001: [Feature Capability 1]
- **Priority:** Must Have | Should Have
- **Description:** [Detailed behavior]
- **Acceptance Criteria:**
  - [ ] Given [precondition], when [action], then [outcome].
  - [ ] [Negative case validation].

#### FR-[FEAT]-002: [Feature Capability 2]
- **Priority:** Must Have | Should Have
- **Description:** [Detailed behavior]
- **Acceptance Criteria:**
  - [ ] [Observable testable criterion].

---

### 4. UI/UX Changes & State Handling

- **Existing Views Modified:** `[path/to/component.tsx]`
- **New Views / Components:** `[path/to/NewComponent.tsx]`
- **States Covered:**
  - Loading: [Behavior]
  - Error: [Behavior]
  - Empty: [Behavior]
  - Success: [Behavior]

---

### 5. Data & API Changes

- **Schema / Database Migrations:**
  - [New tables, columns, or relations]
- **API Endpoints:**
  - `METHOD /api/v1/[endpoint]`: Request payload -> Response format
- **Backward Compatibility:**
  - [How this change avoids breaking existing users or endpoints]

---

### 6. Acceptance & Rollout Checklist

- [ ] Unit & integration tests written for new business logic.
- [ ] No regression on existing parent features.
- [ ] Feature flag or direct release strategy confirmed.
````
