# Security Policy

## Supported Versions

This repository is a template/foundation. Security fixes are applied to `main`.

## Reporting a Vulnerability

Please do not open public issues for sensitive vulnerabilities.

Report privately via GitHub Security Advisories:
- Go to the repository `Security` tab
- Click `Report a vulnerability`

If Security Advisories is unavailable, open a private communication channel with the maintainer.

## Scope Notes

- Never commit secrets (API keys, private keys, service account files).
- Use `.env.example` files for placeholders only.
- Rotate credentials immediately if a secret is exposed.
