# Requirement Writing & Specification Guide

This guide defines how to write implementation-ready requirements that leave zero ambiguity for software engineers and AI coding agents.

---

## 1. Anatomy of an Implementation-Ready Functional Requirement

Every functional requirement (FR) must follow this standardized schema:

```markdown
#### FR-[XXX]: [Short, Descriptive Title]
- **Priority:** Must Have | Should Have | Could Have
- **Description:** Clear, non-technical or semi-technical explanation of what the system does.
- **User Story (Optional):** As a [user role], I want to [action] so that [outcome].
- **Business Rules:**
  - Explicit constraint, validation threshold, or authorization gate.
- **Dependencies:** Other requirements, external APIs, or database migrations required.
- **Acceptance Criteria:**
  - [ ] Given [precondition], when [action occurs], then [verifiable outcome].
  - [ ] Negative test: Given [invalid input], when [submission], then [expected error].
```

---

## 2. Crafting Testable Acceptance Criteria

Acceptance criteria are the contract between product intent and implementation testing. Subjective criteria cannot be tested and should never be used.

### The Given-When-Then (Gherkin) Pattern

* **Given:** The initial context or precondition (e.g., *"Given an unauthenticated visitor on the homepage"*).
* **When:** The triggering action (e.g., *"When they click the 'Download Resume' button"*).
* **Then:** The verifiable system outcome (e.g., *"Then the PDF file downloads and an analytics event 'resume_download' is logged"*).

### Good vs. Bad Criteria Examples

| Vague / Unverifiable (Bad) | Clear & Testable (Good) |
| :--- | :--- |
| "The site should load quickly." | "Given a standard 4G connection, the page First Contentful Paint (FCP) occurs within 1.2 seconds." |
| "Users should see an error if their email is wrong." | "Given an email input lacking an `@` or domain, when the user blurs or submits, display the message 'Please enter a valid email address' in red `#EF4444` below the input." |
| "Make project cards look modern and interactive." | "Hovering over a project card scales it to `1.02x` over 200ms ease-out and displays a subtle outer glow `#3B82F6` with 20% opacity." |
| "The contact form must be secure." | "The contact endpoint rejects requests with invalid CSRF tokens, rate limits submissions to 5 per IP per hour (HTTP 429), and sanitizes HTML entities before storage." |

---

## 3. Forbidden Ambiguous Words & Quantifiable Replacements

Avoid these subjective words unless accompanied by an explicit definition:

| Forbidden Word | Why It Fails | Replacement Strategy |
| :--- | :--- | :--- |
| **"Fast" / "Snappy"** | Subjective perception | Specify latency limits (e.g., `< 200ms response time`, `< 1s FCP`). |
| **"User-Friendly" / "Intuitive"** | Unmeasurable | Specify navigation step count, keyboard support, or clear error messaging. |
| **"Modern"** | Stylistically vague | Name design tokens, typography, border radiuses, or color palettes. |
| **"Scalable"** | Meaningless without load targets | Define concurrent users or database record volumes (e.g., `up to 50k DAU`). |
| **"Appropriate" / "Reasonable"** | Leaves business logic to developer guesswork | State the exact business rule, fallback, or timeout value. |

---

## 4. UI State Coverage Requirement

For every interactive or data-fetching view, document behavior across all 5 fundamental states:

1. **Loading State:**
   - How does the UI look during network latency? (Skeleton cards matching final layout vs central spinner).
   - Is background interaction disabled?
2. **Empty State:**
   - What is shown when a list, filter result, or portfolio category has zero items?
   - Must include an explanatory message and a clear recovery action (e.g., "No projects found in this category. [Reset Filters]").
3. **Error State:**
   - How are network timeouts, 500 server errors, or validation issues displayed?
   - Is there a "Retry" button or inline error banner?
4. **Success State:**
   - How is completed user action acknowledged? (Toast notification, badge, confetti, route redirect).
5. **Partial / Edge State:**
   - What happens with extremely long strings (truncation with ellipsis vs wrapping)?
   - How do extreme screen viewports (320px mobile up to 4K desktop) render the layout?

---

## 5. Requirement IDs and Traceability

- Always assign a permanent, immutable ID: `FR-001`, `FR-002`, or feature-scoped IDs like `FR-AUTH-001`.
- **Never re-use an ID** even if a requirement is removed.
- When deprecating a requirement during a PRD update, mark it:
  `#### FR-004: [DEPRECATED] Social Login via Twitter`
  *Reason: Deprecated due to API pricing changes; superseded by FR-012.*
