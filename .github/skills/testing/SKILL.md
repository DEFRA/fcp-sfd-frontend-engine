---
name: testing
description: Testing standards and conventions for this project. Use when writing tests, reviewing test changes, or asked how to test the frontend engine.
---

# Testing skill

## Framework

- Use `vitest`.
- Import test APIs explicitly from `vitest`.
- Test files are ESM and internal imports use `.js` extensions.

## Test layout

- Test files must match `**/test/**/*.test.js`.
- Unit tests live in `test/unit/` and mirror `src/` exactly — one `*.test.js` per source file, plus a test per barrel.
- There are no integration tests. This repo has no server, so there is nothing to `server.inject()` against.
- Start each file with the header comments used across the suite: `// Test framework dependencies`, then `// Test helpers`, then `// Thing under test`.
- `globals: true` is set in `vitest.config.js`, but test APIs are still imported explicitly from `vitest`.
- Use `test()`, not `it()`, and phrase names as `it <does something>`. Nest `describe()` blocks for context ("when ...", "and ...").
- GraphQL mutation strings are tested by `parse()`ing them with the `graphql` devDependency.

## Mocking and isolation

- Valid patterns in this repo include `vi.mock()`, `vi.doMock()`, `vi.spyOn()`, and `vi.fn()`.
- Reset or clear mocks between tests (for example `vi.clearAllMocks()`, `vi.resetModules()`, and `vi.restoreAllMocks()`).
- Never commit `describe.only()` or `it.only()`.

## Review expectations

- New or changed behaviour includes happy-path and key error-path coverage.
- Test names describe behaviour clearly.
- A new export is only complete when its barrel test also covers it.
- For review work, inspect tests first. If runtime verification is needed, ask the author to run `npm test`.

## Running tests

Everything runs on the host — there is no Docker in this repo.

- Full suite: `npm test` (or the ✅ Test Frontend Engine task). This runs `npm run build` first, then `vitest run --coverage`.
- Watch mode: `npm run test:watch` (does not rebuild `dist/`).
- Single file: `npx vitest run <path-to-test-file>` (or the ‼️ Only Test Frontend Engine task with the test file open).
