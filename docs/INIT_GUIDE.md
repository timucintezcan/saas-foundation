# Init Guide

This guide explains how to initialize projects from `saas-foundation`.

## Quick Start

```bash
pnpm run create -- my-product \
  --package-scope @acme \
  --backend-cloud gcp \
  --frontend-cloud firebase \
  --use-object-storage true
```

## Main Inputs


### `packageScope` (optional)
- Default: `@<normalized-projectName>`
- Example: project `my-product` -> scope `@my-product`
- Override only if you want a shared org scope (for example `@timucintezcan`)

### `backendCloud`
- Values: `none | gcp | aws | azure`
- Default: `none`
- Meaning: where API/worker/backend infra is deployed

### `frontendCloud`
- Values: `none | firebase | vercel | netlify | gcp | aws | azure`
- Default: `none`
- Meaning: where web frontend is deployed

### `useObjectStorage`
- Values: `true | false`
- Default: `true`
- Meaning: whether object storage is enabled

When `useObjectStorage=true`, `objectStorageProvider` is auto-selected from `backendCloud`:
- `gcp` -> `gcs`
- `aws` -> `aws-s3`
- `azure` -> `azure-blob`
- `none` -> `local`

When `useObjectStorage=false`, provider falls back to `local`.

### `primaryDataStore` (fixed)
- Value: `relational`
- User input: none (fixed for Phase 1)

### `region`
- Type: `string`
- Default: `europe-west1`

### `mobileRelease`
- Values: `none | expo-eas | firebase-app-distribution`
- Default: `none`

### UI Inputs
- `themePreset`: `clean | bold | minimal`
- `colorMode`: `dark | light`
- `accentColor`: hex color, default `#3f8cff`
- `radiusStyle`: `sharp | soft | rounded`
- `buttonStyle`: `solid | outline | ghost`
- `density`: `compact | comfortable`
- `motionLevel`: `none | subtle | expressive`

## Generated Config Example

```json
{
  "projectName": "demo-saas",
  "packageScope": "@acme",
  "infra": {
    "backendCloud": "gcp",
    "frontendCloud": "firebase",
    "useObjectStorage": true,
    "primaryDataStore": "relational",
    "objectStorageProvider": "gcs",
    "region": "europe-west1"
  }
}
```
