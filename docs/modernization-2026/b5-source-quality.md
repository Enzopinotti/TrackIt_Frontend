# B5 — Source cleanup and static quality

## Goal

Use the B4 behavior suite to remove measured dead source and introduce permanent static/accessibility checks without changing TrackIt product behavior.

## Measured dead source

Repository consumer analysis proved these maintained JavaScript files had no callers:

- `src/components/PrivateRoute.js`;
- `src/components/Dashboard.js`;
- `src/components/layouts/Main.js`;
- `src/pages/TiposCategorias.js`;
- `src/pages/Usuarios.js`.

They are removed rather than kept as misleading alternate product paths.

Two empty Sass modules were also removed together with their imports:

- `_recuperarContrasenia.scss`;
- `_resetearContrasenia.scss`.

## React 19 cleanup

React 19 ignores `propTypes` declarations on function components.

B5 removes the direct `prop-types` dependency and the obsolete imports/declarations from maintained function components. A transitive `prop-types` package may still exist inside the dependency graph of third-party libraries; B5 only owns direct application dependency and source authority.

## Dependency cleanup

Code search proved that neither Font Awesome package had a maintained application consumer.

B5 removes:

- `@fortawesome/free-solid-svg-icons`;
- `@fortawesome/react-fontawesome`.

React Icons remains because the header/footer still use it.

## Sass maintenance

Historical global `darken()` and `lighten()` helpers are migrated to the Dart Sass module API:

`color.adjust(..., $lightness: ...)`

Affected modules explicitly use `sass:color`. The B5 gate requires zero maintained `darken()` and `lighten()` calls.

## Static quality policy

B5 pins a reproducible ESLint 9 toolchain:

- ESLint 9.39.5;
- @eslint/js 9.39.5;
- globals 17.12.0;
- eslint-plugin-react-hooks 7.1.1;
- eslint-plugin-jsx-a11y 6.10.2.

ESLint 9 is intentional: the chosen jsx-a11y release declares a compatible ESLint 9 peer range, so the repository does not need a peer-dependency bypass merely to adopt a newer core major.

The flat configuration:

- makes recommended JavaScript correctness rules authoritative;
- makes React hook rule violations errors;
- measures exhaustive-deps and unused values as warnings during cleanup;
- measures the recommended jsx-a11y rules as warnings;
- promotes unambiguous ARIA/alt contract violations to errors.

## Permanent authority

Quality now runs, in order:

1. B1 build/deployment authority;
2. B2 React/runtime authority;
3. B3 API/config authority;
4. B4 behavior-test authority;
5. B5 source-quality authority;
6. ESLint/accessibility checks;
7. Vitest;
8. Vite production build;
9. dependency audits.

The temporary dependency-refresh workflow used to regenerate the lockfile was deleted before review.

## Exit condition

B5 is complete when the same PR head passes all B1–B5 authority gates, ESLint, 26 behavior tests, the production build and both dependency audits, with remaining warnings understood and documented.


## Final B5 evidence

GitHub Actions Quality run `35674409686` proved candidate `550d131d5c27b0123e9c8c6bd1e49e8e9881f822` under Node 24.20.0:

- exact `npm ci`: green;
- B1 Vite/deployment authority: green;
- B2 React/runtime authority: green;
- B3 API/config authority: green;
- B4 behavior-test authority: green;
- B5 source-quality authority: green;
- ESLint/accessibility with `--max-warnings 0`: green;
- lint result: 0 errors and 0 warnings;
- maintained behavior suite: 6/6 files green, 26/26 tests green;
- Vite production build: green;
- build output authority: `dist/`;
- direct dead source baseline: 0;
- direct `prop-types`: absent;
- direct Font Awesome packages: absent;
- deprecated Sass `darken()`: 0;
- deprecated Sass `lighten()`: 0;
- maintained `sass:color` consumers: 15;
- production dependency audit: 0 vulnerabilities;
- complete dependency audit: 0 vulnerabilities.

The lint cleanup reduced the initial measured baseline from 214 warnings to 0 without disabling the broader React Hooks or jsx-a11y rule sets. The only semantic exception is narrowly configured for the existing styled `li`/interactive image controls that now implement focus, keyboard activation and accessible naming.

Vercel did not execute the preview because the account remains over its daily deployment quota (`api-deployments-free-per-day`). GitHub Actions is therefore the reproducible build authority for this candidate; the Vercel failure is an external quota condition rather than a TrackIt build failure.
