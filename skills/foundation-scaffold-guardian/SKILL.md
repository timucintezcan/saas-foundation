---
name: foundation-scaffold-guardian
description: Enforces SaaS Foundation architectural guardrails and prevents template drift. Use when changing monorepo structure, stack decisions, shared package boundaries, or scaffold scripts.
---

# Foundation Scaffold Guardian

## Use This Skill When
- A task changes repo structure, package boundaries, or build tooling.
- A task touches `scripts/create.ts`, `scripts/bootstrap.ts`, or template defaults.
- A task proposes new frameworks/providers not in the frozen profile.

## Guardrails
- Preserve frozen baseline in `docs/TECH_STACK_FREEZE.md`.
- Keep boundaries strict:
  - `packages/ui`: tokens, primitives, reusable UI only.
  - `packages/shared`: shared types/schemas/constants only.
  - `apps/*`: app composition.
  - `services/*`: API/worker runtime logic.
- Avoid product-specific naming inside foundation defaults.
- Prefer additive, backward-safe template changes.

## Required Checks Before Finishing
1. Verify structure still matches monorepo contract.
2. Run `pnpm lint` and `pnpm build` in foundation root.
3. Ensure README/INIT docs reflect behavior changes.
