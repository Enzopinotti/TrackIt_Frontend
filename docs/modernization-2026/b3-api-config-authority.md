# B3 — API and browser configuration authority

## Goal

Remove repeated insecure/hard-coded origins from maintained TrackIt flows without inventing or changing the external backend contract.

## Starting debt

The B0/B1 source baseline recorded:

- 17 hard-coded `http://trackit.somee.com` references;
- 3 hard-coded localhost callback origins;
- legacy CRA-style environment names that no longer matched the Vite toolchain.

The frontend is deployed through HTTPS Vercel, so the hard-coded HTTP API origin was not a production-safe browser contract.

## Runtime authority

B3 introduces:

`src/config/runtime.js`

It is the single maintained authority for:

- external API base URL composition;
- public frontend callback URL composition.

### API base

`VITE_API_BASE_URL` may override the external backend base.

The maintained fallback is:

`https://trackit.somee.com`

This does not claim ownership or implementation of that external backend. It only removes the insecure repeated browser origin and keeps the historical integration configurable.

### Callback base

`VITE_APP_BASE_URL` is optional.

When omitted, registration/recovery callbacks use `window.location.origin`. This keeps local development, Vercel previews and production origins aligned without hard-coded localhost values.

## Removed dead configuration

The old example contract contained names for:

- `REACT_APP_USE_BACKEND`;
- `REACT_APP_SECRET_KEY_CAPTCHA`;
- `REACT_APP_CLIENT_URI`.

No maintained product code consumed the backend switch or CAPTCHA value. B3 removes those dead/misleading names instead of renaming unused configuration.

## Preserved request behavior

B3 changes URL composition only.

It deliberately preserves:

- HTTP methods;
- JSON/FormData bodies;
- authentication headers;
- token storage semantics;
- response/error handling;
- external endpoint paths.

## Permanent gates

The quality workflow now validates:

- no hard-coded HTTP Somee origin in maintained source;
- no hard-coded localhost origin in maintained source;
- no direct environment reads outside `src/config/runtime.js`;
- documented Vite browser-public variables;
- exactly three centralized callback URL uses;
- continued B1/B2 build/runtime authority.

## Deferred

B3 does not add a backend, change mock/localStorage behavior, or claim the historical external service is under this repository's control.

Behavior tests for these contracts belong to B4.


## Final B3 evidence

GitHub Actions Quality run `35669600391` proved the B3 candidate on Node 24.20.0:

- exact `npm ci`: green;
- B1 Vite/deployment authority: green;
- B2 React/runtime authority: green;
- B3 API/config authority: green;
- hard-coded HTTP Somee references in maintained source: 0;
- hard-coded localhost origins in maintained source: 0;
- direct Somee consumer files outside runtime authority: 0;
- environment reads outside runtime authority: 0;
- files consuming centralized `apiUrl()`: 12;
- centralized callback URL calls: 3;
- Vitest command: green;
- Vite production build and `dist/` authority: green;
- production dependency audit: 0 vulnerabilities;
- complete dependency audit: 0 vulnerabilities.

The seventeenth historical Somee reference was the admin `DeleteUser` endpoint. It was discovered by the permanent zero-debt gate after code search had surfaced only the other sixteen consumers.

Vercel did not execute this preview because the account had already exceeded its daily deployment quota. The provider returned `api-deployments-free-per-day` before a TrackIt build started; this is an external quota condition, not a repository build failure.
