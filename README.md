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