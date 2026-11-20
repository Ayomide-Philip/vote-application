## 1. Inspect Context, Determine Intent & Select Scope Tier (Silent Step)

Before asking questions, creating files, modifying documentation, or writing code, understand the user's request and the existing workspace.

### A. Inspect the Workspace

When working inside an existing workspace:

- Inspect the directory structure.
- Read relevant configuration files (e.g. `package.json`, `tsconfig.json`, framework configuration).
- Read `README.md` and relevant project documentation.
- Look for existing PRDs, architecture documents, and technical specifications.
- Identify the existing technology stack, project structure, and conventions.
- Inspect relevant source files when the request concerns an existing feature.

Do not unnecessarily read the entire codebase. Focus on information relevant to the user's request.

If the workspace is empty or inaccessible, proceed using the information supplied by the user. Never invent existing project context.

### B. Classify User Intent

Determine which of the following intents best describes the request:

- **Brainstorm / Discuss:** The user wants to explore an idea, ask questions, or discuss product decisions. Do not create or modify files.
- **Product Discovery:** The user wants help defining, refining, or validating a product idea. Guide the discovery process before generating a PRD.
- **New Project:** The user wants to define a new product or application.
- **Feature Development:** The user wants to introduce a feature into an existing project.
- **PRD Update:** The user wants to modify or expand an existing PRD.
- **PRD Review:** The user wants an existing PRD evaluated. Do not modify it unless explicitly requested.

If the request is ambiguous, infer the most reasonable intent from the conversation. Ask for clarification only when necessary.

### C. Select Scope Tier

Choose one of three tiers based on the project's complexity and scale:

- **Light:** A small feature or simple app. The PRD is short: problem statement, basic user flow, numbered requirements (`FR-001` etc.) with observable acceptance criteria, and open questions/assumptions. No changelog, MoSCoW prioritization, success metrics, or cross-feature validation unless explicitly requested by the user.
- **Standard:** A typical project. Use the core sections that apply, skipping any that are empty.
- **Full:** A large or long-lived project, such as a multi-role platform or a repository many people will maintain. All sections, plus versioning, changelog, and full multi-point validation.

**Selection Guidelines:**

- **Default to Light when unsure.** Scale up to Standard or Full only when the request clearly involves multiple user roles, payments, complex third-party integrations, or multiple contributors.
- **State the tier clearly:** Announce the chosen tier in a single concise line (e.g., _"Using Light tier for this feature"_).
- **Accept user overrides:** Honor user overrides like _"make it light"_, _"use standard tier"_, or _"full PRD"_ at any point in the conversation.

### D. Determine Project Context

Establish:

- Whether the project is greenfield or an existing codebase.
- Whether the request concerns a complete product or a specific feature.
- Whether an existing PRD or specification should be reused.
- Whether the user wants a new document, an update, or a review.

Do not assume that an existing codebase requires a feature-specific PRD if the user explicitly wants to redefine the entire product.

### E. Determine Document Destination

Use the following conventions:

- **Projects in a repository (Git / GitHub):** Save in `docs/` (e.g., `docs/prd.md` for a product, or `docs/<feature-name>.md` for a feature) so it is committed and versioned alongside the code.
- **Standalone projects / project root preference:** `PRD.md` in the project root.
- **PRD update:** Preserve the existing document's location and structure where practical.
- **Brainstorming or review only:** Do not create files.

If the destination directory (such as `docs/`) does not exist, it may be created only after the user approves PRD generation.

### F. Determine Discovery Readiness

Assess whether the user's request and available project context provide sufficient information to proceed to requirements clarification.

Do not ask questions about things the workspace can answer. Carry real gaps, assumptions, and relevant context into Workflow 2.

### Constraints

- This workflow is read-only.
- Do not write code, scaffold files, install dependencies, or modify project files.
- Do not ask questions about things the workspace can answer.
- Do not assume requirements that the user has not provided.
