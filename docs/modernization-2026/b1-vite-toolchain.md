# B1 — Vite toolchain authority

## Goal

Replace Create React App with a current, reproducible Vite/Vitest toolchain without changing TrackIt product behavior.

## Starting point

B0 published main:

`f7e60d6620075492de30543b0032d4f7b591da63`

B0 evidence:

- Node 24.20.0: success;
- exact npm ci: success;
- CRA production build: success;
- maintained application tests: 0;
- npm audit: 68 vulnerabilities
  - 15 low
  - 17 moderate
  - 33 high
  - 3 critical.

## Toolchain replacement

B1 removes:

- react-scripts;
- concurrently;
- cross-env;
- nodemon;
- dotenv;
- unused lottie-react;
- unused web-vitals.

B1 adds:

- Vite 8.3.0;
- @vitejs/plugin-react 6.1.1;
- Vitest 5.0.1;
- jsdom 30.0.1;
- Node 24.20.0 local/runtime authority.

React and React Router intentionally remain on their B0 versions for this block.

## Source authority

B1 introduces a root Vite `index.html` and removes the CRA `public/index.html`.

The application entry imports:

`src/styles/scss/main.scss`

directly.

Generated files are removed from source authority:

- `src/styles/css/main.css`
- `src/styles/css/main.css.map`

Vite now owns production CSS generation.

The unused CRA `src/config/config.js` module is also retired after repository search proved it had no maintained consumer.

## Legacy JSX-in-JS compatibility

Historical TrackIt components use JSX inside `.js` files.

B1 deliberately keeps those filenames unchanged so the toolchain migration does not also become a mass source rename.

GitHub Actions exposed two important Vite 8 details:

1. the original `transformWithEsbuild` compatibility transform is deprecated and no longer has esbuild available transitively;
2. configuring `@vitejs/plugin-react` to include `.js` is not sufficient by itself for the Vite/Rolldown parser to interpret legacy `.js` files as JSX before the React transform runs.

The final compatibility bridge therefore uses Vite 8's native `transformWithOxc` helper with `lang: "jsx"` for maintained `src/**/*.js` files, then delegates the React-specific transform/refresh pipeline to `@vitejs/plugin-react`.

No standalone esbuild dependency is introduced.

## Lockfile authority

The first package-lock regeneration attempt exposed an old-lock peer conflict between CRA/Babel packages and the modern Vite React plugin.

The correct fix was used:

1. discard the historical CRA lock graph;
2. regenerate `package-lock.json` from the new package contract;
3. commit the new lockfile;
4. remove the temporary lock-refresh workflow.

No `--legacy-peer-deps` or `--force` resolution was adopted.

## Deferred product/config debt

B1 deliberately does not change:

- 17 hard-coded HTTP Somee origin references;
- 3 hard-coded localhost callback references;
- external backend behavior;
- authentication semantics;
- local/mock administration behavior.

Those remain measured inputs for B3.

## Permanent proof

`scripts/b1-vite-authority.mjs` protects:

- Vite/Vitest package versions;
- absence of CRA/tooling dependencies;
- Vite scripts;
- root HTML authority;
- direct Sass source import;
- absence of generated CSS source;
- absence of CRA process.env reads;
- unchanged B3 API/callback debt counts.

## Exit condition

B1 is complete when exact npm ci, Vitest, Vite build, output authority and dependency audit measurement all run successfully in GitHub Actions.
