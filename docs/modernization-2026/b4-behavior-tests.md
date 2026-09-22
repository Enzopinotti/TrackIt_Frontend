# B4 — Maintained behavior tests

## Goal

Turn the modernized TrackIt frontend from a build-only prototype into a behavior-protected codebase before source cleanup.

B4 deliberately tests the existing product truth instead of inventing new backend behavior.

## Protected contracts

### Route decisions

Tests protect:

- protected routes while auth is loading;
- unauthenticated protected-route redirect to the public root;
- authenticated protected content;
- public routes while auth is loading;
- authenticated public-route redirect to `/home`;
- unauthenticated public content.

### Authentication lifecycle

Tests protect:

- no-backend startup when there is no stored token;
- stored-token profile restoration;
- invalid stored-token removal;
- login token persistence and profile loading;
- logout token/state clearing.

### Runtime URL authority

Tests protect:

- secure historical API fallback;
- configured API base normalization;
- callback derivation from the actual browser origin;
- optional public callback-origin override;
- rejection of non-http(s) API configuration.

### Local storage

Tests protect:

- default values for absent data;
- JSON persistence and restoration;
- malformed-data fallback.

### Requirement attachments

The existing inline attachment validation is extracted to a pure helper without changing the product limits:

- maximum 5 files;
- Word, Excel and PDF extensions only;
- maximum 5 MiB per file;
- case-insensitive extension handling.

`RequirementForm` consumes the same tested contract.

### Intentional demo administration

Tests explicitly protect the current product boundary:

- Types/Categories start from mocks or persisted localStorage and persist locally;
- Users start from the mock dataset;
- neither demo administration screen performs backend fetches.

This is intentional until a real maintained backend contract exists.

## Permanent authority

Vitest now uses a shared browser test setup and `passWithNoTests: false`.

The permanent Quality workflow verifies that all six behavior-test surfaces remain present before executing the suite.

## Exit condition

B4 is complete when the behavior authority gate, complete Vitest suite, production build, previous B1–B3 authority gates and dependency audits are green on the same PR head.


## Final B4 evidence

GitHub Actions Quality run `35670058657` proved the behavior candidate under Node 24.20.0:

- exact `npm ci`: green;
- B1 Vite/deployment authority: green;
- B2 React/runtime authority: green;
- B3 API/config authority: green;
- B4 behavior-test authority: green;
- maintained test files: 6;
- Vitest: 6 files passed;
- behavior tests: 26 passed;
- Vite production build and `dist/` authority: green;
- production dependency audit: 0 vulnerabilities;
- complete dependency audit: 0 vulnerabilities;
- hard-coded localhost/Somee regressions: 0.

The first B4 run exposed that the B3 static gate was counting test fixtures as production consumers. B4 corrected that gate to inspect production source only while preserving all URL/environment restrictions.

The initial demo-administration tests also exposed duplicate visible labels between lists and form `<option>` elements. The tests were corrected to scope assertions to the actual list surfaces rather than weakening the product contract.

Vercel did not execute the preview because the account remains over its daily deployment quota (`api-deployments-free-per-day`). GitHub Actions remains the reproducible build authority for this candidate.
