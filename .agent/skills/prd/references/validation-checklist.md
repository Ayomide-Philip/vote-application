# PRD Validation & Quality Audit Checklist

This checklist is the definitive evaluation instrument used during Workflow 4 (`04-review-and-approval.md`) before any PRD is presented to the user for formal approval.

---

## 1. The 9-Point PRD Audit Matrix

Review the generated or updated PRD against each criterion below. Every item must pass or be flagged with a classification.

| # | Audit Criterion | Evaluation Standard | Pass Criteria |
| :-: | :--- | :--- | :--- |
| **1** | **Completeness** | Are all core sections (Overview, Personas, FRs, UI/UX, Tech Stack, Non-Functional, Scope) present and non-empty? | No placeholder `[TODO]` or missing mandatory sections without documented rationale. |
| **2** | **Requirements Quality** | Does every significant requirement possess a unique ID (`FR-001`), clear description, and observable acceptance criteria? | Zero subjective adjectives ("fast", "modern") used without measurable parameters. |
| **3** | **Traceability & Dependencies** | Are prerequisite dependencies between features and API endpoints explicitly mapped? | No circular dependencies; all referenced IDs exist within the document. |
| **4** | **UX & State Coverage** | Are all 5 fundamental states (Loading, Empty, Error, Success, Partial/Mobile) defined for user-facing features? | Interactive views clearly define error recovery and empty state displays. |
| **5** | **Business Logic & Security** | Are validation limits, authorization checks, and rate limits explicit? | Clear boundaries for user permissions, input length limits, and security headers. |
| **6** | **Technical Consistency** | Does the technical architecture align with the actual project workspace and runtime environment? | Stack choices (e.g., Next.js 16, React 19, Tailwind v4) match codebase reality without conflicting libraries. |
| **7** | **Scope Boundaries (MoSCoW)** | Is the MVP boundary crisp? Are out-of-scope capabilities documented in Won't Have? | Must-Haves represent a lean, coherent, shippable slice rather than an unconstrained wishlist. |
| **8** | **Assumptions & Risks** | Are assumptions transparently identified rather than disguised as confirmed requirements? | Every unconfirmed premise is listed under Assumptions with its potential impact. |
| **9** | **Internal Consistency** | Are there conflicting statements across different sections of the document? | E.g., No section stating "single page app only" while another defines "multi-page subroutes". |

---

## 2. Issue Severity Classification

When audit issues are discovered, classify them strictly according to this severity table:

```
+-------------------------------------------------------------------------------+
| CRITICAL  | Architectural contradictions, missing security/auth gates,        |
|           | infeasible dependencies, or unresolved core user intent.          |
|           | ACTION: Must be resolved with the user before approval.           |
+-------------------------------------------------------------------------------+
| IMPORTANT | Missing edge cases, absent loading/empty states, incomplete       |
|           | acceptance criteria, or unassigned priorities.                    |
|           | ACTION: Resolved using reasonable smart defaults & documented.    |
+-------------------------------------------------------------------------------+
| MINOR     | Formatting inconsistencies, typographical improvements, or        |
|           | slight wording polish.                                            |
|           | ACTION: Silently resolved during PRD generation/revision.         |
+-------------------------------------------------------------------------------+
```

---

## 3. Pre-Approval Readiness Verification

Before asking the user for formal approval, confirm:

- [ ] All Critical issues have been resolved.
- [ ] Any introduced assumptions are explicitly presented in the review summary.
- [ ] The document is saved at the designated path:
  - New product: `PRD.md` (project root)
  - Existing feature: `docs/<feature-name>.md`
- [ ] The summary presented to the user is concise (highlighting scope, key decisions, and open questions) rather than dumping raw markdown walls into chat.
- [ ] No application code, scaffolding, or dependency installations have been executed prior to approval.
