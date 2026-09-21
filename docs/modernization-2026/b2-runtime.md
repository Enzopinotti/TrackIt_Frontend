# B2 — React 19 and React Router 8 runtime

## Goal

Move TrackIt from the React 18 / React Router 6 runtime to the current maintained runtime without changing product behavior or inventing backend capabilities.

## Published starting point

B1 main:

`7ce759409c25aa396356814866f51eeb9a3f6623`

B1 left the application with:

- Vite 8.3.0 and Vitest 5.0.1;
- Node 24.20.0 authority;
- a green GitHub Actions build;
- a green Vercel Vite deployment contract;
- 2 moderate dependency findings, both in the React Router 6 line.

## Verified target baseline

B2 targets:

- React 19.3.0;
- React DOM 19.3.0;
- React Router 8.4.0;
- @fortawesome/react-fontawesome 3.5.0;
- maintained @lottiefiles/dotlottie-react instead of the archived React Lottie player;
- current React Testing Library packages compatible with React 19.

## Source migration

TrackIt uses React Router in declarative mode.

The existing APIs remain supported in React Router 8:

- BrowserRouter;
- Routes / Route;
- Link / NavLink;
- Navigate;
- Outlet;
- useNavigate;
- useParams;
- useSearchParams.

React Router 8 removes the `react-router-dom` compatibility package, so B2 moves maintained imports to `react-router`.

The old v7 future flags are removed from BrowserRouter because their behavior is already part of the v8 baseline.

## React 19 compatibility

React 19 removes function-component `defaultProps`.

The three maintained TrackIt function components that used `defaultProps` now use JavaScript default parameters instead:

- UserForm;
- CategoryForm;
- TypeForm.

TrackIt still contains legacy `propTypes` declarations. React 19 ignores those declarations for function components, so the full static typing cleanup is deferred to the dedicated quality/static-analysis block rather than mixed into this runtime migration.

Until that cleanup happens, `prop-types` is declared directly because TrackIt imports it directly.

## Lottie runtime

`@lottiefiles/react-lottie-player` is deprecated and its upstream repository is archived.

B2 moves the two maintained consumers to `@lottiefiles/dotlottie-react`:

- LoadingOverlay;
- PageNotFound.

The existing JSON animation sources, autoplay, loop, and sizing behavior are preserved.

## Lockfile policy

The B2 package lock is regenerated from the new manifest under Node 24.20.0.

No `--force` or `--legacy-peer-deps` resolution is accepted.

## Deferred boundaries

B2 does not change:

- the external Somee API origin;
- auth/token semantics;
- localhost callbacks;
- mock/localStorage product flows;
- the B3 API/configuration work;
- the future static typing strategy.

## Exit condition

B2 is complete when:

1. exact `npm ci` succeeds on the regenerated lock;
2. no maintained import references `react-router-dom` or the deprecated Lottie player;
3. no function component retains `defaultProps`;
4. Vitest command and Vite production build pass under Node 24.20.0;
5. dependency audit has no known high or critical findings and the Router findings from B1 are removed;
6. Vercel preview succeeds with the published Vite deployment contract.

## Final B2 evidence

GitHub Actions Quality run `35666633599` proved the runtime candidate on Node 24.20.0:

- exact `npm ci`: green;
- B1 Vite/deployment/API-debt authority: green;
- B2 React/runtime authority: green;
- React 19.3.0 / React DOM 19.3.0: confirmed;
- React Router 8.4.0: confirmed;
- maintained Router v8 consumer files: 22;
- maintained `react-router-dom` source references: 0;
- function-component `defaultProps`: 0;
- dotLottie React 0.19.16: confirmed;
- Vitest command: green;
- Vite production build and `dist/` authority: green;
- production dependency audit: 0 vulnerabilities;
- complete dependency audit: 0 vulnerabilities.

The deprecated Lottie player's direct-`eval` build warning is gone.

The build still reports non-blocking follow-up debt:

- Dart Sass deprecated global/color helpers such as `darken()`;
- the application JavaScript bundle remains above Vite's 500 kB advisory threshold.

Those are later style/performance modernization inputs, not runtime blockers.

### Vercel status for the final candidate

Vercel did not execute the B2 preview because the provider returned its account-level build-rate-limit / upgrade URL before a TrackIt build ran.

This is classified as an external provider quota condition, not as a TrackIt build failure. The repository deployment contract itself is unchanged from the B1 Vercel-proven configuration (`vite`, `npm run build`, `dist`, SPA rewrite), and the same application bundle builds successfully in GitHub Actions.
