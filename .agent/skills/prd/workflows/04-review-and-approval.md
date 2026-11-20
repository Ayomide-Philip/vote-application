# 4. Review, Validate & Approve the PRD

## PRD Review Mode

If the user invokes this workflow specifically to review an existing PRD:

- Execute Sections A, B, and C in read-only mode.
- Evaluate the existing PRD without modifying its contents.
- Present validation findings, identified issues, and recommended improvements.
- Do not edit, overwrite, or update the existing document unless the user explicitly requests it.
- If the user requests fixes, obtain the necessary permission and follow the revision process in Section D.
- Do not require approval of the existing PRD merely to complete a review.

For normal PRD generation, continue through all sections of this workflow.

After generating the PRD, perform a structured quality review before presenting it to the user.

The objective is to ensure the document accurately represents the established requirements, contains no significant contradictions, and is suitable for human review and AI-assisted implementation.

### Review Depth by Scope Tier

The validation depth scales with the scope tier, but the approval requirement remains universal:

- **Light Tier Review:** Rapid check. Verify that:
  1. The core problem and proposed solution are clear.
  2. The primary user flow is defined.
  3. Requirements have unique identifiers (`FR-001` etc.) with testable acceptance criteria.
  4. Assumptions and open questions are documented.
  5. No internal contradictions exist.
  *(Skip formal MoSCoW auditing, success metrics, and cross-feature validation).*
- **Standard Tier Review:** Core audit. Review criteria 1 through 8 below for all sections present in the document.
- **Full Tier Review:** Exhaustive audit. Complete evaluation of all 9 criteria below, including formal traceability, dependency graphs, edge-case coverage, and cross-feature validation.

> **Mandatory Rule:** The explicit user approval gate (Section E) applies to **all tiers** (Light, Standard, and Full). Only the depth of validation changes.

## A. Automated PRD Validation

Review the generated PRD against the following criteria according to the active tier:

### 1. Completeness

- Are all relevant sections sufficiently addressed?
- Are important product or feature requirements documented?
- Are essential user roles and workflows covered?

### 2. Requirements Quality

- Are functional requirements clear and actionable?
- Does every significant requirement have a unique identifier?
- Are priorities assigned consistently?
- Are acceptance criteria testable and observable?

### 3. Traceability

- Are requirement identifiers unique?
- Are references between requirements, user stories, and acceptance criteria consistent?
- Are dependencies clearly identified?

### 4. User Experience

- Are important user journeys documented?
- Are alternative flows and failure scenarios considered?
- Are loading, empty, error, and success states addressed where relevant?

### 5. Business Logic

- Are business rules explicitly defined?
- Are user permissions and authorization requirements clear?
- Are validation rules and operational constraints documented?

### 6. Technical Consistency

- Do technical decisions align with the existing codebase and user requirements?
- Are database, API, and integration requirements sufficiently clear?
- Are security, privacy, and performance constraints addressed?

### 7. Scope

- Are MVP requirements separated from future enhancements?
- Are exclusions explicitly documented?
- Is unnecessary complexity avoided?

### 8. Assumptions and Risks

- Are assumptions clearly distinguished from confirmed decisions?
- Are unresolved questions documented?
- Are significant product and technical risks identified?

### 9. Internal Consistency

- Are there contradictory requirements?
- Are there conflicting technical decisions?
- Are there dependencies that have not been addressed?
- Are there ambiguous instructions that could lead to different implementations?

## B. Classify and Resolve Validation Findings

Classify identified issues into three categories:

### Critical

- Contradictory requirements.
- Missing essential security or authorization decisions.
- Unresolved decisions that could fundamentally change the product or architecture.
- Requirements that make the proposed implementation infeasible.

### Important

- Missing acceptance criteria.
- Incomplete user journeys.
- Unclear business rules.
- Missing technical dependencies.
- Insufficient error-handling specifications.

### Minor

- Formatting inconsistencies.
- Wording improvements.
- Documentation organization.
- Non-essential clarifications.

Handle findings as follows:

- Resolve minor issues automatically.
- Resolve important issues using available context and reasonable assumptions where appropriate.
- Ask the user about critical issues that cannot safely be resolved using existing information.
- Never silently change confirmed requirements to resolve contradictions.
- Document assumptions introduced during validation.
- Revalidate affected sections after making corrections.

Do not present a PRD as fully validated while unresolved critical issues remain.

## C. Present the PRD for User Review

After validation, present the generated PRD to the user.

Do not simply dump a lengthy document without context.

Provide a concise review summary containing:

- Product or feature overview.
- Key requirements and capabilities.
- MVP scope.
- Important technical decisions.
- Major assumptions.
- Unresolved questions, if any.
- Validation findings and their resolution status.

Provide access to the complete PRD document and its exact saved location.

The user must be able to:

- Approve the PRD.
- Request specific modifications.
- Add or remove requirements.
- Correct misunderstandings.
- Reconsider product or technical decisions.

Do not paste the entire PRD into the conversation unless the user explicitly requests it.

The user remains in control of the final requirements.

## D. Handle Revision Requests

If the user requests changes:

1. Understand the requested modifications.
2. Identify affected PRD sections and requirements.
3. Update the existing PRD rather than generating an unrelated replacement.
4. Preserve existing requirement IDs wherever possible.
5. Update dependent user journeys, acceptance criteria, technical requirements, and scope where necessary.
6. Re-run relevant validation checks.
7. Present the revised PRD and summarize what changed.

For substantial modifications, perform a complete validation again.

For minor wording or formatting changes, validate only the affected sections.

Do not restart the entire discovery process for every revision.

Ask additional questions only when the requested changes introduce genuinely unresolved decisions.

Follow the PRD Update Rules established in Workflow 3 when modifying an existing PRD.

## E. Obtain Explicit User Approval

After the user has reviewed the PRD and all requested modifications have been addressed, request explicit approval. This approval gate is non-negotiable and runs across all tiers (Light, Standard, and Full).

Accept clear responses such as:

- "Approve PRD."
- "Looks good, proceed."
- "I'm happy with this."

Do not interpret silence, viewing the document, or requests for modifications as approval.

If the user requests further changes, return to Section D.

If the user rejects the PRD or wants to reconsider the product direction, return to the relevant discovery stage.

The PRD must not be treated as approved until the user explicitly approves the final version.

## F. Finalize the PRD

After approval:

- Update the document status to `Approved`.
- Record the approval date where appropriate.
- Ensure the final document is saved at the designated location.
- Preserve the approved version as the development reference.
- Ensure no unresolved critical blockers remain.
- Preserve the document's versioning and changelog conventions.

Do not claim approval or successful file updates unless those actions have actually been completed.

## G. Establish the Implementation Handoff

Once approval is obtained, prepare the PRD for implementation.

The handoff should communicate:

- Location of the approved PRD.
- Product or feature scope.
- Implementation priorities.
- Important technical constraints.
- Relevant dependencies.
- Known risks and outstanding non-critical decisions.

The approved PRD becomes the primary reference for subsequent implementation work.

### Implementation Constraints

- Do not begin implementation automatically unless the user has also requested it.
- Never modify the approved PRD silently during implementation.
- If implementation reveals a requirement conflict or a necessary product decision, bring it to the user's attention.
- Significant scope or requirement changes must be documented and approved before being treated as part of the specification.
- Keep the approved PRD synchronized with any subsequently approved requirement changes.
