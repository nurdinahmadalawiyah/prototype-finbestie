# AGENTS.md

## Project context

This repository is a static frontend prototype for a mobile personal-finance app.

Brand naming currently uses:

- Folder/repo name uses `prototype-finbestie`
- Product branding in source files uses `Budgetin`

Treat `Budgetin` as the source-of-truth product name unless the user explicitly asks for another rename.

## Main structure

- `index.html` starts the onboarding flow
- Other `*.html` files represent individual prototype screens
- `app.js` contains most prototype logic, mock data, page behavior, formatting helpers, and cross-screen state assumptions
- `styles.css` contains the shared visual system and mobile device mockup styling
- `assets/badges/` contains SVG badge assets for budgeting personas

## Working assumptions

- This is a prototype, not a production app
- No backend, API, database, bundler, or framework is currently set up
- There is no `package.json` at the time of writing
- Navigation and data flow are primarily frontend-only and mock-data based

## Editing guidance

- Prefer minimal, surgical edits
- Preserve the current visual language unless the user asks for a redesign
- Keep pages working as static HTML files
- Avoid introducing frameworks or build tooling unless the user explicitly requests it
- Keep Indonesian copy consistent with the existing UI tone unless asked otherwise

## Validation

- For small changes, validate by checking affected HTML, CSS, and JavaScript relationships
- If a local static server is needed, use a simple lightweight approach
- Do not assume there is an automated test suite

## Notes for future changes

- `app.js` acts as the effective source of truth for persona definitions, budget templates, account mock data, and formatting helpers
- Before refactoring shared logic, check whether multiple HTML screens depend on the same DOM hooks or local storage assumptions
- Be careful when changing naming, because repository naming and in-product branding are not yet aligned
