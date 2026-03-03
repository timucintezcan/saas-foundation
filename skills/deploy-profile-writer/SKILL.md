---
name: deploy-profile-writer
description: Writes deployment profile guidance based on selected backendCloud/frontendCloud options. Use when users ask how to deploy generated SaaS projects per cloud mix.
---

# Deploy Profile Writer

## Use This Skill When
- User asks deployment strategy after bootstrap.
- Need cloud-specific runbook for backend/frontend split.

## Inputs
- `backendCloud`
- `frontendCloud`
- `useObjectStorage`
- `region`

## Output
Create a short deployment profile with:
1. Backend targets
- API and worker runtime target.
- Database and queue managed service recommendation.

2. Frontend target
- Hosting target for web app.
- Required environment variables.

3. Storage profile
- Derived object storage provider from backend cloud.
- Signed URL ownership at backend side.

4. Release checklist
- Build, env setup, deploy order, smoke endpoints.

## Constraints
- Keep advice managed-service first.
- Avoid introducing non-frozen infra unless user explicitly requests it.
