# TrackIt Frontend

TrackIt is a React frontend for a requirements/ticket-management product prototype.

The repository intentionally preserves the historical product flows while modernizing the frontend engineering baseline. Some flows call a historical external backend; other administration/product areas remain mock or localStorage-driven. The paired public backend repository does not provide a maintained server implementation, so this frontend does not pretend those missing server capabilities exist.

## Current stack

- React 19.3
- React Router 8
- Vite 8
- Vitest 5
- React Hook Form + Yup
- Sass
- DOMPurify
- React Icons
- dotLottie React
- ESLint + JSX accessibility checks
- GitHub Actions quality gates
- Vercel SPA deployment contract

Runtime authority is pinned to Node 24.20.0.

## Install and run

Use the committed lockfile:

```bash
npm ci
```

Start the Vite development server:

```bash
npm run dev
```

Build the production application:

```bash
npm run build
```

Run static quality and accessibility checks:

```bash
npm run lint
```

Run the maintained behavior suite:

```bash
npm test
```

## Browser-public configuration

Copy the value-free configuration contract when local overrides are needed:

```bash
cp .env.example .env
```

Vite exposes `VITE_*` variables to browser-delivered JavaScript. They are public configuration, not a place for passwords, private API keys, CAPTCHA server secrets, or other privileged credentials.

Supported frontend configuration:

- `VITE_API_BASE_URL` — historical external API base URL. The maintained default is `https://trackit.somee.com` so an HTTPS Vercel frontend never hard-codes an insecure mixed-content origin.
- `VITE_APP_BASE_URL` — optional public frontend origin used for email callbacks. When omitted, TrackIt derives callback URLs from `window.location.origin`.

URL composition lives in `src/config/runtime.js`. Maintained screens must not hard-code Somee or localhost origins.

## Product boundary

The current frontend contains real external-backend integrations for authentication, profile, users, requirement metadata and requirement workflows. It also contains intentional mock/localStorage-driven areas and simulated/unimplemented server paths.

Modernization rules:

- do not invent a backend that is not versioned here;
- do not silently convert mock flows to server-backed behavior;
- do not put privileged secrets in frontend configuration;
- keep the real-vs-demo boundary explicit in code and documentation.

## Quality

GitHub Actions verifies:

- exact Node/npm install authority;
- Vite/Vercel build authority;
- React 19 / React Router 8 runtime authority;
- centralized API/callback configuration;
- maintained behavior-test authority;
- zero-warning ESLint + accessibility checks;
- dead-source/dependency/Sass cleanup authority;
- route code-splitting and bundle-size authority;
- production build output;
- production and complete dependency audits.

## Deployment

TrackIt ships as a Vite SPA through the repository-owned Vercel contract in `vercel.json`:

- build command: `npm run build`;
- output directory: `dist`;
- deep-link fallback: `/(.*) -> /index.html`;
- route screens/layouts are lazy-loaded so the previous ~934 kB monolithic JavaScript bundle does not return.

Before deploy, run:

```bash
npm ci
npm run lint
npm test
npm run build
```

The detailed deployment, environment and smoke-test procedure lives in `docs/deployment.md`.

A successful frontend deploy does not prove availability of the historical external Somee API. Auth/profile/registration/recovery/requirement/admin operations that call that service must be smoke-tested separately when suitable external credentials/data are available.

Modernization program: issue #3.

Historical credential review remains tracked separately in issue #1; deleting current-tree values does not prove historical external credentials were rotated or revoked.

## Author

Enzo Pinotti
