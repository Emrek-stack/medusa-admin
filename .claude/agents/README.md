# Agent Selection Guide (UI-Only)

This project is a standalone admin web app. Agents must work on UI only.

## Hard Scope
- Allowed: `src/components`, `src/routes`, `src/providers`, `src/i18n`, `src/lib` (UI helpers/mocks), styling/theme/layout.
- Not allowed: backend services, DB, API server setup, infra, deployment, auth server, Medusa backend integration.

## Agents
- `codebase-locator`: Find where UI code lives.
- `codebase-analyzer`: Explain how UI flows/components work.
- `codebase-pattern-finder`: Find reusable UI patterns in this repo.
- `web-search-researcher`: Research UI libraries, accessibility, React/Vite/Tailwind patterns.

## Output Rule
Always keep recommendations and code examples inside UI scope.
