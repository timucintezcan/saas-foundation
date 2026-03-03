# SaaS Foundation

Product-agnostic full-stack SaaS starter for shipping new products quickly.

## Purpose

`saas-foundation` exists to remove repeated engineering setup work from every new SaaS idea.
Instead of rebuilding backend/frontend/UI/infrastructure from scratch, you start from a stable,
opinionated base and focus on product behavior, user flow, and business value.

In short: this repository is not a single SaaS product; it is the reusable engine used to create many SaaS products.

## Includes

- Monorepo: pnpm workspaces + Turborepo
- Apps: `apps/web` (Next.js), `apps/mobile` (Expo)
- Services: `services/api` (NestJS), `services/worker` (BullMQ)
- Shared packages: `packages/ui`, `packages/shared`
- Local infra: Docker Compose (Postgres + Redis)
- Bootstrap scripts for generating new projects

## End-User Quick Start

1. Clone the foundation repository.

```bash
git clone https://github.com/timucintezcan/saas-foundation.git my-new-saas
cd my-new-saas
pnpm install
```

2. Generate your new product from the template.

```bash
pnpm run create -- my-product \
  --backend-cloud gcp \
  --frontend-cloud firebase \
  --use-object-storage true \
  --mobile-release expo-eas \
  --region europe-west1
```

3. Run the generated product locally.

```bash
cd my-product
pnpm install
docker compose up -d
pnpm dev
```

Result:
- A new SaaS project folder is created with web/mobile/api/worker/shared packages.
- `template.config.json` is generated from your inputs.
- `primaryDataStore` is fixed to `relational` in Phase 1.

## Agent Playbooks (Codex + Claude)

Shared, agent-agnostic playbooks live in:
- [docs/agent-playbooks/foundation-scaffold-guardian.md](/Users/ttezcan/Documents/saas-foundation/docs/agent-playbooks/foundation-scaffold-guardian.md)
- [docs/agent-playbooks/saas-bootstrap-advisor.md](/Users/ttezcan/Documents/saas-foundation/docs/agent-playbooks/saas-bootstrap-advisor.md)
- [docs/agent-playbooks/release-readiness-checker.md](/Users/ttezcan/Documents/saas-foundation/docs/agent-playbooks/release-readiness-checker.md)
- [docs/agent-playbooks/deploy-profile-writer.md](/Users/ttezcan/Documents/saas-foundation/docs/agent-playbooks/deploy-profile-writer.md)

Agent-specific adapters:
- Codex: [agents/codex/AGENTS.md](/Users/ttezcan/Documents/saas-foundation/agents/codex/AGENTS.md)
- Claude: [agents/claude/CLAUDE.md](/Users/ttezcan/Documents/saas-foundation/agents/claude/CLAUDE.md)

Example prompts:
- "Use bootstrap advisor and generate the best create command for backend AWS + frontend Firebase."
- "Run release readiness checker before I publish this template update."
- "Write deploy profile for backendCloud=gcp frontendCloud=firebase region=europe-west1."

## Foundation Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
```

## Create a New SaaS Project

```bash
pnpm run create -- my-product \
  --backend-cloud gcp \
  --frontend-cloud firebase \
  --use-object-storage true \
  --mobile-release expo-eas \
  --region europe-west1
```

Primary data store is fixed for Phase 1:
- `primaryDataStore` -> `relational` (no user input)

Object storage mapping is automatic from `backendCloud`:
- `gcp` -> `gcs`
- `aws` -> `aws-s3`
- `azure` -> `azure-blob`
- `none` -> `local`

## Bootstrap Current Folder

```bash
pnpm bootstrap --project-name my-product --backend-cloud gcp --frontend-cloud firebase --use-object-storage true
```

Full parameter docs:
- [docs/INIT_GUIDE.md](/Users/ttezcan/Documents/saas-foundation/docs/INIT_GUIDE.md)
