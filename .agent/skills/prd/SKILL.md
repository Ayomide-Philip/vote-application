---
name: prd
description: Generate a comprehensive Product Requirements Document (PRD) in Markdown before writing any code. Use when the user asks to "build a prd for [product or app]", "create a PRD", or invokes /prd. Casual mentions of building should not activate it.
---

# Objectives

Before writing any code, scaffolding files, or installing dependencies, create a clear, well-structured Product Requirements Document that defines what is being built and obtain explicit user approval.

## Core Principles

- Understand before documenting.
- Never invent user requirements.
- Distinguish confirmed decisions from assumptions.
- Adapt discovery to project complexity: when unsure, choose Light. Scale up only when the request clearly involves multiple user roles, payments, integrations, or multiple contributors.
- Obtain explicit approval before implementation at every tier.

# Workflow

Execute the following workflows in order:

1. Inspect Context & Determine Scope Tier:
   Read `workflows/01-inspect-context.md`.

2. Clarify Requirements:
   Read `workflows/02-discovery.md`.

3. Generate PRD:
   Read `workflows/03-generate-prd.md`.

4. Review & Approval:
   Read `workflows/04-review-and-approval.md`.

Follow each workflow's instructions carefully.

## References

Load supporting references when needed:

- `references/prd-templates.md`
- `references/requirement-writing.md`
- `references/prioritization.md`
- `references/technical-specifications.md`
- `references/validation-checklist.md`

Do not load every reference unnecessarily.

## Examples

Concrete reference PRDs illustrating each scope tier are available in `examples/`:

- `examples/01-light-tier-example.md`: Fast, focused Light Tier PRD for small tools or scripts.
- `examples/02-standard-feature-spec-example.md`: Standard Tier feature spec adding capabilities to an existing codebase.
- `examples/03-full-tier-prd-example.md`: Comprehensive Full Tier PRD for multi-role greenfield platforms.
- `examples/README.md`: Overview guide and comparison matrix across all tiers.

