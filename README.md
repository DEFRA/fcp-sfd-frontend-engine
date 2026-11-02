# Frontend Engine

## Overview

This project aims to create a shared frontend engine used by both the internal and external frontend applications.

The goal is to reduce duplicated code, improve consistency between applications, and simplify long-term maintenance while still allowing each application to evolve independently where needed.

## Architecture Direction

The frontend engine will contain shared frontend functionality such as:

- shared components
- utilities
- validation
- queries and mutations
- presenters

The internal and external applications will continue to own:

- routes
- authentication
- app-specific pages and features

## Development Approach

We are starting with a small incremental implementation rather than a full migration.

The initial focus is to:

- identify common frontend patterns
- extract reusable functionality into the engine
- prove the shared architecture works cleanly
- minimise disruption to the existing applications

## Local Development

During development, the applications will consume the engine as a local package dependency.

Docker-based local development support will be used so engine changes can be picked up quickly during development.

## Principles

- keep the implementation simple and explicit
- prefer shared reusable modules over duplication
- avoid premature abstraction
- maintain clear ownership boundaries between the engine and applications
- evolve incrementally

## SonarQube Cloud scan

Run a local scan against [SonarCloud](https://sonarcloud.io/project/overview?id=defra_fcp-sfd-frontend-engine) for the current git branch. See the [DEFRA SonarCloud guide](https://github.com/DEFRA/cdp-documentation/blob/main/how-to/sonarcloud.md) for organisation access and CI setup.

### Setup

1. Log in to [SonarQube Cloud](https://sonarcloud.io) with your DEFRA GitHub account
2. Go to **My Account → Security → Generate Tokens** and create a personal token
3. Add `SONAR_TOKEN=<your-token>` to your `.env` file

### Run

Generate test coverage first, then scan:

```bash
npm test
npm run sonar
```

The script uploads results for the current branch and prints:

- Quality gate pass/fail and failed conditions
- Open issues on new code (when the gate fails)
- **Accepted / false-positive issues without comment** — DEFRA quality gates require a justification comment on each suppressed issue; add comments in SonarCloud under the issue **Activity** tab

Exit code is `0` when the gate passes and all suppressed issues are commented, `1` otherwise.

## Pre-commit hook

A [Husky](https://typicode.github.io/husky/) pre-commit hook runs [`sfd-id-check`](https://github.com/DEFRA/fcp-sfd-core/tree/main/scripts/check-synthetic-ids), which blocks commits that add real-looking CRNs or SBIs. Pull requests run the same check.

Enable the hook once per clone:

```bash
npm install
npm run setup:husky
```

Use synthetic identifiers only: CRNs from `9000000000` to `9999999999` and SBIs from `800000000` to `899999999`. If a flagged number isn't a CRN or SBI, such as a timestamp, add `sfd-id-check: allow` in a comment on the same line, or list it in `.sfd-id-check-allow`. See the [`sfd-id-check` README](https://github.com/DEFRA/fcp-sfd-core/tree/main/scripts/check-synthetic-ids) for details.
