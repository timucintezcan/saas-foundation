---
name: saas-bootstrap-advisor
description: Guides and validates create/bootstrap inputs for new SaaS generation. Use when users ask which init parameters to choose or when extending template input schema.
---

# SaaS Bootstrap Advisor

## Use This Skill When
- User asks "which flags should I use?"
- Input schema in `scripts/create.ts` or `scripts/bootstrap.ts` changes.
- You need to explain generated `template.config.json` fields.

## Decision Rules
- Default to minimum inputs and safe defaults.
- Keep Phase 1 primary data store fixed: `relational`.
- Cloud selection split:
  - `backendCloud` for API/worker infra.
  - `frontendCloud` for web hosting.
- Object storage behavior:
  - Controlled by `useObjectStorage`.
  - Provider inferred from `backendCloud`.
- If `packageScope` not provided, derive from normalized `projectName`.

## Output Format
Provide:
1. Ready-to-run command.
2. Short explanation of inferred defaults.
3. Expected `template.config.json` highlights.
