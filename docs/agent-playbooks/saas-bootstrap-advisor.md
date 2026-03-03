# SaaS Bootstrap Advisor

## Goal
Provide correct and minimal `create/bootstrap` inputs.

## Trigger
Use when users ask which flags to choose, or when init schema changes.

## Rules
- Prefer minimal flags + safe defaults.
- `primaryDataStore` is fixed to `relational` (Phase 1).
- Cloud model is split:
  - `backendCloud` for API/worker infra
  - `frontendCloud` for web hosting
- Object storage is inferred from `backendCloud` when `useObjectStorage=true`.
- If `packageScope` is missing, default to `@<normalized-projectName>`.

## Response Contract
Return:
1. Runnable command
2. Inferred defaults
3. Key `template.config.json` outputs
