# AGENTS.md — SaaS Foundation Engineering Contract

## Purpose
Defines non-negotiable rules for evolving this repository as a reusable SaaS template.

Priority order:
1. This file
2. Repository docs

## Core Rule
This repository must stay product-agnostic.
Do not add product/domain-specific language, flows, or endpoint names.

## Scope
This repo owns reusable foundation layers:
- Monorepo structure and build tooling
- Shared UI tokens/components
- API/worker scaffolding patterns
- Local infra and deployment scaffolding
- Bootstrap/config generation workflow

## Boundaries
- `packages/ui`: reusable, stateless primitives and components
- `packages/shared`: reusable schemas/types/constants
- `apps/*` and `services/*`: generic examples/scaffold only

No product business logic in foundation packages.

## Design System Rules
- Single source of truth for tokens
- No hardcoded design values in components
- Web + mobile compatibility for shared primitives/components

## API/Worker Rules
- API contracts must be versioned
- Keep transport, domain, and orchestration separated
- Worker pipelines must be async and idempotent by default

## Build & DX Rules
- `pnpm install`, `pnpm build`, `pnpm lint` should work from root
- Keep defaults simple; avoid overengineering
- Prefer minimal required inputs + strong defaults for bootstrap

## Delivery Standard
For template changes:
- Keep commits small and focused
- Update docs for changed workflows
- Verify compile/build for touched packages
