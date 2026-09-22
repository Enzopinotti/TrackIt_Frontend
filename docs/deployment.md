# TrackIt deployment runbook

## Deployment authority

TrackIt is a Vite single-page application deployed through the connected Vercel project.

The repository owns the deployment contract in `vercel.json`:

- framework: Vite;
- build command: `npm run build`;
- output directory: `dist`;
- SPA rewrite: every application path falls back to `/index.html`.

Node runtime authority is 24.20.0 and the committed lockfile is the dependency authority.

## External backend boundary

TrackIt_Frontend does not contain a maintained backend implementation.

Maintained authenticated/product flows call the historical external API configured by `VITE_API_BASE_URL`. The frontend default remains:

`https://trackit.somee.com`

This repository does not claim ownership, availability or deployment authority over that service.

`VITE_APP_BASE_URL` is optional. When omitted, registration/recovery callback URLs derive from the browser origin.

Both variables are browser-public configuration. They must never contain privileged credentials or server secrets.

## Vercel SPA environment

For the standard deployment no private frontend secret is required.

Optional Vercel environment overrides:

- `VITE_API_BASE_URL` — only when the external API base differs from the maintained HTTPS default;
- `VITE_APP_BASE_URL` — only when email callbacks must use a public frontend origin different from the active browser origin.

Do not configure historical CRA `REACT_APP_*` names.

## Pre-deploy verification

Run from a clean checkout:

```bash
npm ci
npm run lint
npm test
npm run build
```

Expected contract:

- ESLint exits with 0 warnings and 0 errors;
- 6 Vitest files / 26 behavior tests pass;
- Vite writes `dist/`;
- B1–B6 authority gates pass in GitHub Actions;
- production and complete dependency audits report 0 vulnerabilities.

Published post-B5 main evidence: GitHub Actions run `35674532649` on merge commit `b7e9b0c9a3d22a36ba519afc0faf9212af910dc9` was green before B6 route splitting.

## Bundle authority

Route screens are lazy-loaded from `src/App.js`.

B6 requires:

- no eager `./pages/*` imports in `App.js`;
- at least 18 lazy route/layout imports;
- at least 5 emitted JavaScript chunks;
- no emitted JavaScript chunk larger than 500,000 bytes.

This gate prevents the previous ~934 kB single initial bundle from silently returning.

## Smoke checklist

### Public frontend-only checks

1. Open `/` and confirm the login-selection screen renders.
2. Navigate to internal and external login routes.
3. Open `/registro`, `/registro/interno` and `/registro/externo`.
4. Open `/recuperar-contrasenia`.
5. Reload each deep link directly and confirm the Vercel SPA rewrite returns the application instead of a 404.
6. Confirm route transitions load without console/module errors.

### External-backend-dependent checks

These require the historical external Somee API to be reachable and valid test credentials/data to exist:

1. Login and profile restore.
2. Registration/confirmation email flow.
3. Password recovery/reset API flow.
4. Requirement type/category retrieval.
5. Requirement creation/list/detail.
6. Admin external-user listing/status/delete.

A frontend deployment is not evidence that those external service operations are healthy.

### Intentional local/demo checks

- Types/Categories remains mock + localStorage driven.
- Users administration remains mock/state driven.
- Simulated comments/linking paths remain demo behavior where documented.

Do not reinterpret those screens as backend-backed during deployment verification.

## Vercel quota/status interpretation

A Vercel GitHub status can fail before build execution when the account exceeds its deployment quota. That provider condition is separate from repository build correctness.

During B5, the branch also produced a Vercel Preview marked Ready once quota capacity became available. GitHub Actions remains the deterministic repository validation authority because it runs the exact install, gates, tests, build and audits on every candidate.

## Historical security boundary

Issue #1 remains the authority for historical/external credential classification. Current-tree hygiene and a successful Vercel deployment do not prove that old external credentials were rotated or revoked.
