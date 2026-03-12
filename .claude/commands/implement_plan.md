# implement_plan (UI-only)

Execute planned work only in frontend scope.

## Allowed edits
- Components, routes, providers, i18n, frontend utils/mock data
- Styling and theme files
- Frontend config needed for UI build/run

## Disallowed edits
- Backend services
- API server contracts
- DB schemas/migrations

## Done criteria
1. `npm run build` passes
2. No TypeScript errors from touched UI files
3. UI states covered: loading, error, empty, success
