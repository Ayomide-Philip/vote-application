## 3. Generate the Product Requirements Document (PRD)

Using the requirements established during Workflow 2, generate a comprehensive, well-structured, implementation-ready Product Requirements Document.

The PRD must serve as a single source of truth for both human developers and AI coding agents.

It must clearly communicate what is being built, why it is being built, how the product should behave, and the constraints that implementation must respect.

### A. Scope Tier Structure Mapping

Generate the document using the scope tier determined in Workflow 1 (or overridden by the user):

| Section | Light Tier | Standard Tier | Full Tier |
| :--- | :---: | :---: | :---: |
| **1. Document Overview** | Omit (or 1-line title) | Yes (core metadata) | Yes (formal versioning & changelog) |
| **2. Product / Feature Overview** | Yes (problem + solution) | Yes (vision, goals, non-goals) | Yes (full problem, vision, goals) |
| **3. Target Users & User Roles** | Omit | Yes (applicable personas/roles) | Yes (detailed roles & permissions) |
| **4. Functional Requirements** | Yes (`FR-001` with testable AC) | Yes (`FR-xxx` with rules & AC) | Yes (`FR-xxx`, rules, dependencies, AC) |
| **5. User Journeys & Workflows** | Yes (concise primary flow) | Yes (happy path & error flow) | Yes (comprehensive journeys & edge cases) |
| **6. UI/UX Requirements** | Omit (unless requested) | Yes (core screens & states) | Yes (full screen inventory & all 5 states) |
| **7. Data & Technical Requirements**| Omit (unless requested) | Yes (key models & stack constraints) | Yes (schemas, API contracts, security) |
| **8. Non-Functional Requirements** | Omit (unless requested) | Yes (essential performance & a11y) | Yes (full performance, security, SLAs) |
| **9. MVP Scope & Prioritization** | Omit (unless requested) | Yes (core MoSCoW buckets) | Yes (formal MoSCoW & out-of-scope) |
| **10. Success Metrics** | Omit | Omit / Optional | Yes (measurable KPIs) |
| **11. Assumptions & Open Questions**| Yes (open questions) | Yes (assumptions & open questions) | Yes (assumptions, risks, open questions) |
| **12. Cross-Feature Validation** | Omit | Omit | Yes (multi-feature interaction tests) |

- **Light Tier:** A small feature or simple app. The PRD is short: problem, user flow, numbered requirements (`FR-001` etc.) with acceptance criteria, and open questions. No changelog, MoSCoW, success metrics, or cross-feature validation unless the user asks.
- **Standard Tier:** A typical project. Use the core sections that apply, skipping any that are empty.
- **Full Tier:** A large or long-lived project, such as a multi-role platform or a repo many people will maintain. All sections, plus versioning, changelog, and full validation.

For Existing Feature PRDs:

- Omit or condense product-level sections already documented in the existing codebase or main PRD.
- Avoid repeating established product vision, personas, technology stack, and architectural decisions unless they are directly relevant to the feature.
- Focus on the feature objective, user flows, functional requirements, UI states, permissions, and integration/data changes.
- Reference existing documentation where appropriate instead of duplicating it.

Do not force every project into an identical template. Adapt according to the active tier.

### B. PRD Document Structure

Use the following sections where relevant.

**1. Document Overview**

- Product or feature name.
- Document purpose.
- Version and status.
- Brief description.
- Changelog for document updates.

**2. Product Overview**

- Problem statement.
- Product vision.
- Proposed solution.
- Value proposition.
- Goals and non-goals.

**3. Target Users & User Roles**

- Target audience.
- User personas where useful.
- User roles and permissions.
- User needs and motivations.

**4. Functional Requirements**

- Features and capabilities.
- Detailed expected behaviour.
- Business rules.
- Dependencies between features.
- Unique requirement identifiers.
- Feature-specific acceptance criteria.

**5. User Journeys & Workflows**

- Entry points.
- Step-by-step user flows.
- Alternative flows.
- Success and failure scenarios.

**6. UI/UX Requirements**

- Pages and screens.
- Navigation structure.
- Interface behaviour.
- Responsive requirements.
- Loading, empty, error, and success states.
- Accessibility requirements.

**7. Data & Technical Requirements**

- Data entities and relationships.
- API requirements.
- Authentication and authorization.
- Third-party integrations.
- Architecture constraints.
- Data validation and retention.

**8. Non-Functional Requirements**

- Security and privacy.
- Performance.
- Scalability.
- Reliability.
- Accessibility.
- Maintainability.

**9. MVP Scope & Prioritization**

- Must-have features.
- Should-have features.
- Could-have features.
- Explicitly excluded functionality.

**10. Success Metrics**

- Product success indicators.
- Measurable outcomes.
- Relevant performance indicators.

**11. Assumptions, Risks & Open Questions**

- Confirmed decisions.
- Assumptions.
- Technical and product risks.
- Unresolved decisions.

**12. Cross-Feature Validation (Where Applicable)**

- End-to-end acceptance scenarios.
- Interactions between multiple features.
- Cross-feature edge cases.
- System-level consistency requirements.

Adapt, combine, or omit sections when they are irrelevant to the project. Do not generate empty sections simply to satisfy the template.

### C. Make Functional Requirements Implementation-Ready

Every significant functional requirement must have:

- A unique identifier (e.g. FR-001).
- A clear description.
- A priority.
- Expected system behaviour.
- Relevant business rules.
- Testable acceptance criteria.

Keep acceptance criteria nested directly within their corresponding functional requirements.

Avoid duplicating the same acceptance criteria in another section.

Acceptance criteria must describe observable and testable outcomes rather than subjective expectations.

### D. Define User Stories Where Appropriate

Use the standard format:

"As a [user role], I want to [perform an action], so that [achieve an outcome]."

Connect relevant user stories to functional requirements and acceptance criteria.

Do not generate unnecessary user stories for minor technical implementation details.

### E. Specify UI/UX Requirements

For each relevant page or screen, document:

- Purpose of the screen.
- Users who can access it.
- Important interface components.
- Available actions.
- Navigation behaviour.
- Loading, empty, error, and success states.
- Responsive behaviour.

Respect existing design systems and UI conventions when working with an existing codebase.

Do not invent a visual design system unless required by the user or product.

### F. Define Technical Requirements

Document the technical requirements necessary to guide implementation.

Consider:

- Frontend and backend architecture.
- Technology stack.
- Database and data models.
- Authentication and authorization.
- API contracts.
- External integrations.
- Security and privacy requirements.
- Hosting and deployment constraints.

Distinguish clearly between:

- Confirmed technical decisions.
- Recommended technical decisions.
- Unresolved technical decisions.

For existing projects, respect the architecture and conventions already in place unless a change is explicitly requested or technically justified.

Do not prescribe implementation details unnecessarily or introduce technologies without a clear reason.

### G. Prioritize Requirements

Use MoSCoW prioritization:

- **Must Have:** Essential for the initial product or feature release.
- **Should Have:** Important but not essential for the initial release.
- **Could Have:** Useful improvements if resources permit.
- **Won't Have:** Explicitly excluded from the current release.

Ensure that MVP scope is clearly separated from future enhancements.

### H. Document Assumptions and Unresolved Decisions

Never present assumptions as confirmed requirements.

For important assumptions, document:

- What is being assumed.
- Why the assumption was made.
- Its potential impact.
- Whether future validation is required.

Keep unresolved questions visible instead of silently making consequential decisions.

### I. Ensure Human and AI Readability

The PRD must be:

**Human-readable:**

- Clear and concise language.
- Logical organization.
- Consistent terminology.
- Explanations of important product decisions.

**AI-implementation-ready:**

- Explicit and unambiguous requirements.
- Traceable requirement identifiers.
- Defined permissions and business rules.
- Testable acceptance criteria.
- Clear technical constraints.
- Defined feature boundaries and dependencies.

Avoid vague instructions such as "make it user-friendly", "ensure it is scalable", or "make the dashboard modern" without explaining what those expectations mean in practice.

### J. Generate the Document

- Use Markdown.
- Generate the document at the destination determined in Workflow 1.
- Create the destination directory if necessary.
- Preserve existing documentation when updating a PRD.
- Use descriptive headings and structured lists or tables where appropriate.
- Avoid unnecessary repetition.
- Ensure all relevant discovery decisions are represented accurately.

**PRD Update Rules:**

When updating an existing PRD:

- **Full Tier (Strict Lifecycle):**
  - Increment the document version appropriately (e.g. v1.0 to v1.1).
  - Add a brief changelog entry describing the modifications.
  - Preserve existing requirement identifiers such as FR-001.
  - Assign new requirement identifiers sequentially without reusing existing IDs.
  - Mark requirements that are no longer applicable as [DEPRECATED] rather than silently deleting them.
  - Preserve relevant historical decisions, assumptions, and out-of-scope notes unless their removal is explicitly requested.
- **Light & Standard Tiers:**
  - Update requirements, user flows, and open questions directly to reflect current user intent.
  - Formal changelog entries and [DEPRECATED] tags are omitted unless explicitly requested.
  - Ensure any active functional requirements continue to have unique identifiers (`FR-001`, etc.).
- Avoid rewriting unrelated sections.

Do not write application code, scaffold the application, install dependencies, or begin implementation during this workflow.
