# Foundation Scaffold Guardian

## Goal
Protect SaaS Foundation from architectural drift.

## Trigger
Use when changing monorepo layout, stack/tooling, shared package boundaries, or scaffold scripts.

## Rules
- Preserve frozen baseline in `docs/TECH_STACK_FREEZE.md`.
- Keep boundaries strict:
  - `packages/ui`: stateless reusable UI only
  - `packages/shared`: shared types/schemas/constants only
  - `apps/*`: app composition/examples
  - `services/*`: API/worker runtime scaffold
- Avoid product-specific naming and logic.

## Required Validation
1. `pnpm lint`
2. `pnpm build`
3. Update docs when behavior changes.
