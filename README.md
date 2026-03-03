# SaaS Foundation

Product-agnostic full-stack SaaS starter for shipping new products quickly.

## Purpose

`saas-foundation` removes repeated setup work for every new SaaS idea.
You start from a stable base and focus on product behavior, user flow, and business value.

## Includes

- Monorepo: pnpm workspaces + Turborepo
- Apps: `apps/web` (Next.js), `apps/mobile` (Expo)
- Services: `services/api` (NestJS), `services/worker` (BullMQ)
- Shared packages: `packages/ui`, `packages/shared`
- Local infra: Docker Compose (Postgres + Redis)
- Bootstrap scripts for project generation

## End-User Quick Start

1. Clone the foundation.

```bash
git clone https://github.com/timucintezcan/saas-foundation.git my-new-saas
cd my-new-saas
pnpm install
```

2. Generate a new product.

```bash
pnpm run create -- my-product \
  --backend-cloud gcp \
  --frontend-cloud firebase \
  --use-object-storage true \
  --mobile-release expo-eas \
  --region europe-west1
```

3. Run it locally.

```bash
cd my-product
pnpm install
docker compose up -d
pnpm dev
```

Result:
- A new SaaS project folder is created with web/mobile/api/worker/shared packages.
- `template.config.json` is generated from your inputs.
- `primaryDataStore` defaults to `relational` in Phase 1.

Detailed init reference:
- [docs/INIT_GUIDE.md](docs/INIT_GUIDE.md)

## Create Presets

### 1) Full Local (dev-first)

```bash
pnpm run create -- my-product \
  --backend-cloud none \
  --frontend-cloud none \
  --use-object-storage false \
  --region europe-west1
```

### 2) Backend GCP + Frontend Firebase

```bash
pnpm run create -- my-product \
  --backend-cloud gcp \
  --frontend-cloud firebase \
  --use-object-storage true \
  --mobile-release expo-eas \
  --region europe-west1
```

### 3) Backend AWS + Frontend Firebase

```bash
pnpm run create -- my-product \
  --backend-cloud aws \
  --frontend-cloud firebase \
  --use-object-storage true \
  --mobile-release expo-eas \
  --region eu-central-1
```

### 4) Backend AWS + Frontend Vercel

```bash
pnpm run create -- my-product \
  --backend-cloud aws \
  --frontend-cloud vercel \
  --use-object-storage true \
  --region eu-central-1
```

### 5) Backend Azure + Frontend Netlify

```bash
pnpm run create -- my-product \
  --backend-cloud azure \
  --frontend-cloud netlify \
  --use-object-storage true \
  --region westeurope
```

### 6) Web-Only Local

```bash
pnpm run create -- my-product \
  --web true \
  --mobile false \
  --backend-cloud none \
  --frontend-cloud none \
  --use-object-storage false \
  --region europe-west1
```

## Bootstrap Existing Copy

```bash
pnpm bootstrap --project-name my-product --backend-cloud gcp --frontend-cloud firebase --use-object-storage true
```

## Config Defaults

- `primaryDataStore` defaults to `relational` (Phase 1)
- Object storage provider is inferred from `backendCloud` when `useObjectStorage=true`:
  - `gcp` -> `gcs`
  - `aws` -> `aws-s3`
  - `azure` -> `azure-blob`
  - `none` -> `local`

## Foundation Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
```

## Agent Playbooks (Codex + Claude)

Shared playbooks:
- [docs/agent-playbooks/foundation-scaffold-guardian.md](docs/agent-playbooks/foundation-scaffold-guardian.md)
- [docs/agent-playbooks/saas-bootstrap-advisor.md](docs/agent-playbooks/saas-bootstrap-advisor.md)
- [docs/agent-playbooks/release-readiness-checker.md](docs/agent-playbooks/release-readiness-checker.md)
- [docs/agent-playbooks/deploy-profile-writer.md](docs/agent-playbooks/deploy-profile-writer.md)

Agent adapters:
- Codex: [agents/codex/AGENTS.md](agents/codex/AGENTS.md)
- Claude: [agents/claude/CLAUDE.md](agents/claude/CLAUDE.md)
