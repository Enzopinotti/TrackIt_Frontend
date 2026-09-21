# B0 — TrackIt baseline authority

## Starting point

Modernization starts from:

`185d6a99239349566421b45483ff57b79d08e3b8`

That commit already removed tracked root environment material from the maintained tree and replaced it with a value-free `.env.example`.

Historical/external credential classification remains tracked separately in issue #1 and is not claimed as solved by this modernization lane.

## Repository truth

TrackIt is a React frontend for a requirements/ticket-management prototype.

The paired public `TrackIt_Backend` repository is effectively empty. The frontend therefore depends on a historical external backend that is not versioned in this repository.

The modernization must preserve that truth boundary.

## Current toolchain

- React 18.3.1
- React DOM 18.3.1
- React Router 6.28.0
- Create React App / react-scripts 5.0.1
- Sass 1.81.0
- React Hook Form + Yup
- DOMPurify
- SweetAlert2
- Testing Library dependencies present
- no maintained source tests found at B0
- no existing GitHub Actions workflow at B0
- npm lockfile v3

## Current product/data boundaries

Maintained source includes:

- public login / registration / account recovery;
- JWT-style token storage in localStorage;
- authenticated profile and requirement calls;
- requirement creation and file constraints;
- internal/admin routes;
- local/mock users, types and categories;
- localStorage-backed requirement/type/category state in some screens.

Not every screen has a maintained backend contract.

## Measured configuration/API debt

The B0 source gate records:

- legacy hard-coded `http://trackit.somee.com` references: **17**
- hard-coded localhost callback origins inside `src`: **3**
- CRA `process.env.REACT_APP_*` reads: **3**
- maintained consumers of `useBackend` outside its declaration: **0**

The frontend deployment metadata points to an HTTPS Vercel origin, while maintained API calls are hard-coded to HTTP. That boundary must be centralized and made production-safe before closeout.

## B0 CI authority

B0 introduces a first permanent workflow based on:

- SHA-pinned checkout;
- SHA-pinned setup-node;
- Node 24.20.0;
- exact `npm ci`;
- baseline source/config authority gate;
- current CRA test command with `--passWithNoTests`;
- current CRA production build;
- measured production/full npm audits.

The audit steps are intentionally measurement-only in B0. They must become blocking once the modern dependency graph is established.

## Non-goals

B0 does not:

- migrate to Vite;
- upgrade React/Router;
- change API behavior;
- invent the missing backend;
- close the historical credential-review issue;
- redesign TrackIt.

## Observed baseline

PR #4 Quality run:

`35648148592`

Result:

- Node 24.20.0 setup: success;
- exact `npm ci`: success;
- baseline authority gate: success;
- maintained application tests: **0** (`--passWithNoTests`);
- CRA production build: success;
- production/full audit snapshot: **68 vulnerabilities**;
  - 15 low;
  - 17 moderate;
  - 33 high;
  - 3 critical.

The audit report confirms substantial debt in the CRA/Jest/Webpack dependency graph and also identifies direct-package upgrade pressure such as DOMPurify and React Router.

This is evidence for replacing the historical toolchain rather than applying a blind `npm audit fix --force`.

## Exit condition

B0 is complete: the current CRA tree has a reproducible GitHub-run baseline and its main failures/debt are measured rather than guessed.
