# B6 — Deployment and documentation closeout

## Goal

Close the 2026 TrackIt frontend modernization on a published, reproducible deployment contract rather than ending at a green pull request.

## Published starting point

B6 starts from B5 merge commit:

`b7e9b0c9a3d22a36ba519afc0faf9212af910dc9`

Post-merge GitHub Actions run `35674532649` passed on `main` with:

- B1–B5 authority gates green;
- zero-warning ESLint;
- 26/26 behavior tests;
- Vite production build;
- zero production/full audit vulnerabilities.

## Final deploy debt discovered

The published B5 build emitted one application JavaScript chunk of approximately 934.5 kB minified and Vite reported its >500 kB chunk advisory.

The cause was explicit in `src/App.js`: all route screens and layouts were imported eagerly.

## B6 implementation

B6 converts route/layout surfaces to `React.lazy()` imports behind one `Suspense` boundary.

This is a deployment/performance change only:

- route paths are unchanged;
- auth/public guard placement is unchanged;
- page implementations are unchanged;
- external API behavior is unchanged;
- mock/local product boundaries are unchanged.

A permanent post-build B6 gate verifies the Vercel contract and prevents a >500 kB JavaScript chunk regression.

## Deployment documentation

The repository now carries `docs/deployment.md` with:

- exact Vercel SPA contract;
- browser-public environment configuration;
- external backend boundary;
- clean-checkout verification commands;
- public/deep-link smoke checklist;
- external-backend-dependent smoke checklist;
- intentional mock/demo boundaries;
- Vercel quota interpretation;
- historical-security boundary.

## Exit condition

B6 can close the modernization program when one exact candidate proves:

- B1–B6 gates green;
- zero-warning lint;
- behavior suite green;
- production build green;
- no JS chunk over 500 kB;
- dependency audits green;
- README/runbook current;
- merge to `main`;
- post-merge `main` Quality green;
- final issue #3 evidence recorded.
