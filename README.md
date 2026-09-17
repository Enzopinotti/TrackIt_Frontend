# TrackIt Frontend

Historical React frontend for the **TrackIt** product/prototype.

This repository is being preserved as part of a portfolio-wide modernization program. The current codebase still reflects its original Create React App architecture; this README documents what the repository actually contains today and the security boundary that must be understood before any framework migration.

## Current technical baseline

- React 18
- Create React App / `react-scripts` 5
- React Router 6
- React Hook Form + Yup
- Sass
- DOMPurify
- Font Awesome / React Icons
- Lottie integrations
- Testing Library dependencies

## Configuration boundary

The frontend reads configuration through Create React App variables prefixed with `REACT_APP_`.

**Anything stored in a `REACT_APP_*` variable is compiled into browser-delivered JavaScript and must be considered public.** Passwords, private API keys, CAPTCHA server secrets and other privileged credentials must never be stored in frontend environment variables.

Use the committed `.env.example` only as a configuration contract:

```bash
cp .env.example .env
```

The historical variable name `REACT_APP_SECRET_KEY_CAPTCHA` is misleading. If this integration is used, the frontend value must only represent a public client/site key. Any server-side CAPTCHA secret belongs in a backend or another trusted server-side environment.

## Local development

Install dependencies:

```bash
npm install
```

Start the CRA development server and Sass watcher:

```bash
npm start
```

Create a production build:

```bash
npm run build
```

Run the existing CRA test command:

```bash
npm test
```

## Repository status

This repository is currently in **security/hygiene triage**, not full modernization.

The immediate goals are:

1. remove tracked local `.env` material from the current source tree;
2. keep only a value-free `.env.example` contract;
3. classify any historically exposed values outside the public repository and rotate/revoke them if they were ever privileged;
4. only after the security boundary is closed, decide whether the historical CRA application should be migrated or simply documented and preserved.

No visual redesign, backend invention or framework migration is part of this security pass.

## Historical context

The repository is intentionally not being rewritten to make older work look newer. Its value is showing a real stage of frontend development and the engineering lessons that follow from reviewing configuration, dependency and browser-security boundaries later.

Portfolio coordination: [`Enzopinotti/Enzopinotti#19`](https://github.com/Enzopinotti/Enzopinotti/issues/19)

## Author

Enzo Pinotti
