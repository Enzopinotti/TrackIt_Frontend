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


## Candidate evidence

GitHub Actions Quality run `35674715406` proved candidate `7757c156959157b2203babf6680da30a37739edf`:

- B1–B6 authority gates: green;
- ESLint/accessibility with zero-warning ceiling: green;
- 6/6 Vitest files, 26/26 behavior tests: green;
- production build: green;
- emitted JavaScript chunks: 30;
- lazy route/layout imports: 19;
- eager page imports in `App.js`: 0;
- previous monolithic B5 JavaScript chunk: approximately 934.5 kB;
- B6 largest emitted JavaScript chunk: 339,337 bytes;
- B6 entry chunk: approximately 301.3 kB;
- 500,000-byte bundle gate: green;
- Vite >500 kB advisory: eliminated;
- production dependency audit: 0 vulnerabilities;
- complete dependency audit: 0 vulnerabilities.

The largest route-specific chunk is currently the requirement-detail surface. It remains below the permanent 500 kB gate, so B6 does not add manual vendor chunking solely for smaller numbers.
