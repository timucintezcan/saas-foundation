# SaaS Foundation - Technology Profile

## 0. Purpose

This document defines the default technology profile for the SaaS Foundation template.
It is intentionally product-agnostic.

Use this as a stable baseline when creating new SaaS products.

## 1. Core Stack

- Monorepo: pnpm workspaces
- Build orchestration: Turborepo
- Language: TypeScript
- Formatting/Linting baseline: Prettier + lint scripts

## 2. Repository Layout

```text
apps/
  web/
  mobile/
services/
  api/
  worker/
packages/
  ui/
  shared/
docs/
scripts/
```

## 3. Frontend Defaults

Web:
- Next.js (App Router)
- TailwindCSS
- Framer Motion
- XState support for explicit flow modeling

Mobile:
- Expo React Native
- React Navigation
- XState support

Shared UI:
- `packages/ui` as design-system source
- single token source + reusable primitives/components

## 4. Backend Defaults

API:
- Node.js LTS + NestJS scaffold
- versioned API convention (`/v1`, `/v2`)

Worker:
- BullMQ worker scaffold
- async pipeline pattern (enqueue + background processing)

## 5. Data & Infra Defaults

- Database default: PostgreSQL
- Queue default: Redis
- Local infra: Docker Compose (Postgres + Redis)
- Deploy targets: configurable by bootstrap inputs

## 6. Non-Negotiable Foundation Rules

- Keep stack and architecture product-agnostic.
- Keep UI/business boundaries strict (`packages/ui` vs product apps/services).
- Avoid product-specific naming in foundation files.
- Prefer minimal defaults + explicit bootstrap configuration.

## 7. Bootstrap Customization Inputs (MVP)

- `projectName`
- `packageScope`
- `web` / `mobile`
- `auth`
- `billing`
- `backendCloud`
- `frontendCloud`
- `useObjectStorage`
- `primaryDataStore` (default: `relational` in Phase 1)
- `objectStorageProvider` (derived from backend cloud)
- `mobileRelease`
- `region`

These inputs drive generated project naming and baseline setup.
