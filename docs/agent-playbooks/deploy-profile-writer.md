# Deploy Profile Writer

## Goal
Generate deployment guidance based on selected cloud profile.

## Trigger
Use when users ask how to deploy generated projects.

## Inputs
- `backendCloud`
- `frontendCloud`
- `useObjectStorage`
- `region`

## Output Template
1. Backend deployment targets (API + worker)
2. Frontend hosting target
3. Object storage provider and ownership model (backend-managed signed URLs)
4. Environment variable checklist
5. Deploy order + smoke checks

## Constraints
- Managed-service first
- Do not introduce non-frozen infra unless explicitly requested
