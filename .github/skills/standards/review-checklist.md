# Standards review checklist

Use this checklist when reviewing changed code. Apply findings only to changed files.

## 1. Correctness and behaviour

- The code does what the change says it does.
- Edge cases are handled (null, empty, boundary values).
- Error paths return useful messages without leaking internals.

## 2. Tests and coverage

See `../testing/SKILL.md` for testing patterns and conventions.

- New code has unit tests covering the happy path and key error paths.
- Test names describe the behaviour being verified.
- New exports are covered by the relevant barrel test.
- Coverage does not decrease; target is 90% minimum (SonarCloud quality gate).
- Do not run the test suite as part of a review. Inspect test files and, if runtime verification is needed, ask the author to run `npm test`.

## 3. Security

- No secrets, API keys, or tokens are committed.
- User input is validated and sanitised. Schemas build on the extended `Joi` from `src/utils/joi.js` so control characters are rejected.
- Runtime dependencies are from trusted sources with no known vulnerabilities. The runtime dependency list is deliberately small — question any addition.
- Nothing in the engine logs, and nothing it returns should contain PII (names, addresses, emails, NI numbers, bank details).
- SonarCloud security hotspots are reviewed and resolved.
- No new vulnerabilities or code smells are introduced (SonarWay profile).

## 4. Performance and reliability

- No blocking operations on the event loop.
- The OS Places call is the only outbound request — it must stay bounded and handle failure.

## 5. Maintainability and readability

Apply the Writing code and Refactoring sections in [SKILL.md](./SKILL.md).

- No commented-out code.
- Functions and variables have descriptive names.
- Complex logic has explanatory comments or is split into named functions.
- Avoid magic numbers or strings; use named constants.

## 6. Architecture and boundaries

- Code follows the existing project structure.
- New exports are wired into their barrel; nothing else is added to the public API by accident.
- The change stays generic — no routes, auth, request/response handling or service-specific orchestration has crept in.
- No circular dependencies between modules.

## 7. Documentation and versioning

- Public functions have JSDoc comments.
- README is updated if setup steps or prerequisites change.
- `version` in `package.json` is bumped, and the bump level matches the impact on consumers: `patch` for fixes and internals, `minor` for new exports, `major` for renaming or removing anything on a barrel or changing a schema or function signature.
- Breaking changes are clearly documented, including what the consuming apps will need to change.

## 8. Accessibility

Applies only to HTML fragments emitted by the engine (for example the notification banner markup built in `src/services/build-fix-success-message-service.js`).

- Markup meets WCAG 2.2 Level AA and uses the GOV.UK Design System classes and structure.
- Interpolated values are safe to render as HTML.

## 9. AI customization files

- Applies when the change touches `.github/copilot-instructions.md`, `.github/instructions/*.instructions.md`, or `.github/skills/**/SKILL.md` and when it changes code that an existing instruction file describes.
- Every rule is verifiable in the code today. Open the file it cites and confirm the macro signature, symbol, option, or path actually exists.
- Examples match real call sites rather than an idealised version, and cover the variants in use.
- `applyTo` globs match the files the conventions actually govern.
- No rule contradicts another instruction file or `copilot-instructions.md`.
- Changing a layer that has an instruction file means checking that instruction still holds.
