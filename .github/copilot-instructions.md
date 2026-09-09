# Copilot instructions: fcp-sfd-frontend-engine

## What this is

`@defra/fcp-sfd-frontend-engine` — a **published npm library package**, not a service. It holds the code shared between the two Single Front Door (SFD) frontends on Defra's Future Farming and Countryside Programme:

- `fcp-sfd-frontend` — external service for farmers and land managers
- `fcp-sfd-frontend-internal` — internal service for staff and caseworkers

The internal service is being built to mirror the external one, with shared logic progressively extracted here rather than duplicated. This repo has **no server, no routes, no views, no auth and no Docker** — it exports plain functions, Joi schemas, GraphQL mutation strings and constants that the two Hapi apps import.

## Stack

- Node **>= 24**, ESM (`"type": "module"`) throughout — use `import`/`export`, file extensions required (`./file.js`).
- Runtime dependencies are deliberately tiny: `joi` and `osdatahub`. `graphql` is a devDependency, used only to parse-check mutation strings in tests.
- Build: **tsup** → dual ESM (`dist/index.js`) + CJS (`dist/index.cjs`) bundles.
- Tests: Vitest with v8 coverage. Lint: **neostandard** (via eslint). No semicolons, 2-space indent.
- No stylelint, no webpack, no convict, no client-side assets — those live in the consuming apps.

## Commands

Everything runs on the host. There is no `docker compose` in this repo.

Prefer the VS Code tasks where one fits (Test Frontend Engine, Only Test Frontend Engine, Lint Frontend Engine, Lint & Fix Frontend Engine, Build & Restart Frontend, Build & Restart Frontend Internal, Bump Patch/Minor/Major Version). Otherwise:

- `npm run build` — tsup build into `dist/`
- `npm test` — **runs `npm run build` first**, then `vitest run --coverage`
- `npm run test:watch` — `vitest` in watch mode (does not rebuild)
- `npx vitest run <path-to-test-file>` — single test file
- `npm run lint` / `npm run lint:fix` — neostandard / auto-fix
- `npm run sonar` — local SonarCloud scan (needs `SONAR_TOKEN` in `.env`; run `npm test` first for coverage)
- `npm version <patch|minor|major> --no-git-tag-version` — bump the package version, **required on every PR** (see [Versioning and release](#versioning-and-release))

## Architecture

### Public API

`src/index.js` re-exports **seven namespace objects**, and that is the entire public surface:

```javascript
export { constants } from './constants/index.js'
export { mappers } from './mappers/mappers.js'
export { mutations } from './mutations/mutations.js'
export { presenters } from './presenters/presenters.js'
export { schemas } from './schemas/schemas.js'
export { utils } from './utils/utils.js'
export { services } from './services/services.js'
```

Consumers import the namespaces and use dot notation — they never deep-import a file path:

```javascript
import { constants, presenters, schemas, services } from '@defra/fcp-sfd-frontend-engine'

constants.successMessages.BUSINESS_NAME
presenters.formatDisplayAddress(address)
schemas.business.details.name
services.validateFixDetails(payload, orderedSectionsToFix, schemas)
```

**Anything new must be wired into its barrel** (`mappers/mappers.js`, `mutations/mutations.js`, `presenters/presenters.js`, `schemas/schemas.js`, `services/services.js`, `utils/utils.js`, `constants/index.js`). A file that is not exported from its barrel is unreachable by consumers.

Barrels also **rename on export**: files export `<thing>Service` / `<thing>Mutation` / `<thing>Schema`, and the barrel maps that to a shorter key (for example `validateFixDetailsService` → `services.validateFixDetails`, `businessNameSchema` → `schemas.business.details.name`). Keep both the file-level name and the barrel key meaningful.

### Folders

- **`src/constants/`** (`constants`): validation limits (`validation-fields.js`), HTTP status codes, regex `patterns.js`, `month-map.js`, `success-messages.js`, `interrupter-journey.js` section orders/labels, `business-legal-status.js`, `country-names.js`. `index.js` groups them into sub-namespaces: `constants.statusCodes`, `constants.validationFields`, `constants.patterns`, `constants.monthMap`, `constants.successMessages`, `constants.interrupterJourney`, `constants.business`.
- **`src/mappers/`** (`mappers`): transform raw DAL/OS Places responses into the domain objects services and presenters work with — e.g. `address-mapper.js`, `business-details-mapper.js`, `address-lookup-mapper.js`.
- **`src/mock-data/`**: fixtures that mirror real API response shapes (currently `mock-os-places-addresses.js`, used by the OS Places stub). Not exported from `src/index.js`.
- **`src/mutations/`** (`mutations`): GraphQL mutation **strings**, split `business/` and `personal/`, one file per mutation named `update-<domain>-<field>.js`. Consumers pass them to their own DAL connector — this repo does not talk to the DAL.
- **`src/presenters/`** (`presenters`): pure display formatting — `base-presenter.js` (back links, numbers, dates, error ordering), `address-presenter.js`, `business-details-presenter.js`. The barrel flattens all three into one namespace, so **presenter function names must be unique across all presenter files**.
- **`src/schemas/`** (`schemas`): Joi schemas, one per file named `<thing>-schema.js`, in `business/`, `customer/`, `personal/`, `os-places/` and `shared/`. Each domain folder has a `<domain>-schemas.js` barrel that builds a **nested** object — `schemas.business.details.name`, `schemas.business.vat.change`, `schemas.personal.dob`, `schemas.osPlaces.ukPostcode`. `shared/address-schema.js` is reused by both `business.details.address` and `personal.address`.
- **`src/services/`** (`services`): the small amount of orchestration that is genuinely shared — interrupter/fix journey helpers (`validate-fix-details-service.js`, `initialise-fix-journey-service.js`, `set-fix-session-data-service.js`, `check-interrupter-journey-session-service.js`, `build-fix-success-message-service.js`), address variable building, and `os-places/address-lookup-service.js` (with `os-places-stub.js`). Files are named `<verb>-<thing>-service.js`.
- **`src/utils/`** (`utils`): `joi.js` (the extended Joi instance), `format-full-name.js`, `format-validation-errors.js`, and `build-update-business-*-variables.js` helpers that turn form payloads into mutation variables.

### Key patterns

- **Extended Joi**: always `import { Joi } from '<relative>/utils/joi.js'`, never `import Joi from 'joi'`. The extension rejects C0/C1 control characters on every string automatically; individual schemas override the message with `.messages()`.
- **Independent schema validation**: `validateFixDetailsService` runs each section's schema separately rather than combining them, so every rule fires and all errors are collected. Do not "simplify" this into one combined schema.
- **Two validation contexts for one field**: `schemas.business.details.vat` (optional, empty string allowed, used inside the interrupter set) and `schemas.business.vat.change` (required, 9 digits, used on the dedicated change page) are deliberately different. See the comment in `src/schemas/business/business-schemas.js`.
- **Pure functions only**: no request/response objects, no session objects owned here, no logging, no I/O other than the OS Places HTTP call. State and orchestration belong in the consuming apps.

### What belongs here

- **Belongs in the engine** (generic, not tied to either service): Joi schemas, DAL queries and mutation strings, utility functions, presenter formatting helpers and mappers.
- **Must NOT go in the engine**: routes, authentication logic, anything coupled to request/response handling, and complex orchestration that needs back-and-forth between services.
- **Deliberate differences — do not unify these**: external uses **Defra ID** auth and an external DAL gateway (Defra ID token) with customer permission levels and an SBI from the signed-in user; internal uses **Microsoft Entra**, an internal gateway (acting user's email in a header), no permission levels, and reaches records by CRN/SBI search.

## Testing

- Run the suite with `npm test` (this builds first) or the **Test Frontend Engine** task. A single file: `npx vitest run <path>` or the **Only Test Frontend Engine** task.
- Unit tests only — `test/unit/` mirrors `src/` exactly, one `*.test.js` per source file plus a test per barrel.
- Test files must match `**/test/**/*.test.js`.
- `globals: true` is set, but tests still **import test APIs explicitly** from `vitest` under a `// Test framework dependencies` comment. Follow the existing header-comment convention (`// Test framework dependencies`, `// Test helpers`, `// Thing under test`).
- Use `test()`, not `it()`, and phrase names as `it <does something>`. Nest `describe()` blocks for context ("when ...", "and ...").

## Versioning and release

There is no CDP deployment and no `#patch` / `#minor` commit tag. Instead:

1. **Every PR must bump `version` in `package.json`** — `check-pull-request.yml` fails if it is not greater than `main`. Use `npm version <patch|minor|major> --no-git-tag-version` or a Bump Version task.
2. On merge to `main`, `publish.yml` builds, tests, Sonar-scans, publishes to npm (skipping if the version already exists), then creates a `v<version>` GitHub release.
3. Consumers pin an **exact** version, so a published change does not reach them until someone bumps `@defra/fcp-sfd-frontend-engine` in `fcp-sfd-frontend` and/or `fcp-sfd-frontend-internal`.

Choose the bump by impact on consumers: `patch` for fixes and internals, `minor` for new exports, `major` for renaming or removing anything on a barrel or changing a schema/function signature.

## Local development against the consuming apps

Both apps can mount this repo's `dist/` over their installed copy of the package:

- In the app: `docker compose -f compose.yaml -f compose.link-engine.yaml up` (test equivalent: `compose.test.link-engine.yaml`).
- `dist/` **must be built before the app starts**, or the mounted volume is empty and the app fails to boot.
- After changing engine code, rebuild and restart the app — the **Build & Restart Frontend** / **Build & Restart Frontend Internal** tasks do both (`npm run build` here, then `docker compose restart` in the sibling repo).

## Common tasks

- **New schema**: `src/schemas/{domain}/<thing>-schema.js` exporting `<thing>Schema`, built with the extended `Joi` from `src/utils/joi.js`; wire it into `src/schemas/{domain}/{domain}-schemas.js`; add `test/unit/schemas/{domain}/<thing>-schema.test.js`.
- **New mutation**: `src/mutations/{business|personal}/update-<domain>-<field>.js` exporting `update<Domain><Field>Mutation` as a template-literal string; wire it into `src/mutations/mutations.js`; add a test that `parse()`s it with `graphql`.
- **New service**: `src/services/<verb>-<thing>-service.js` (or under `{domain}/`) exporting `<verb><Thing>Service`; wire it into `src/services/services.js` under a shortened key.
- **New util / presenter / mapper**: matching file in `src/utils/`, `src/presenters/` or `src/mappers/`, wired into its barrel, with a mirrored unit test.
- **Moving code in from an app**: copy it here, strip anything request-, session- or auth-specific, export it through the barrel, bump the version, then update the app to import from the engine and delete the local copy in that app's own PR.

## References

- Joi — https://joi.dev/api/
- tsup — https://tsup.egoist.dev/
- Vitest — https://vitest.dev/
- SonarCloud project — https://sonarcloud.io/project/overview?id=defra_fcp-sfd-frontend-engine
