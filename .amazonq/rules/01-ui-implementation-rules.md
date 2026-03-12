# UI Implementation Rules

## General
- Reuse existing UI patterns before introducing new ones.
- Keep changes minimal and consistent with current design language.
- Do not add backend dependencies.

## UX States
For touched UI areas, handle:
- Loading state
- Error state
- Empty state
- Success state

## Accessibility
- Add meaningful labels/aria attributes when needed.
- Preserve keyboard accessibility for interactive elements.

## i18n
- User-facing text should use i18n keys when project pattern supports it.
- Keep translations consistent across locales.
