# AGENTS.md

## Project Overview

This workspace contains a static mobile-first HTML prototype for a financial planner app called **FinBestie Planner**.

The prototype focuses on the early product flow:

- Quick intro onboarding
- Auth screen
- Interactive budgeting quiz
- Recommendation reveal
- Auto-budget preview

The design direction is a soft operational mobile UI inspired by modern dark dashboard/product case-study screens: dark phone surface, soft coral/periwinkle/cyan accents, bold display titles, and rounded data cards.

## File Structure

Each app screen has its own HTML file:

- `index.html` — onboarding
- `auth.html` — auth / Google login / guest login
- `quiz.html` — interactive recommendation quiz
- `result.html` — financial profile recommendation reveal
- `budget-preview.html` — auto-budget setup preview

Shared assets:

- `styles.css` — all shared styling
- `app.js` — shared state, quiz logic, screen-specific behavior

## Running Locally

This is a static prototype. Open `index.html` directly in a browser.

Recommended flow:

1. `index.html`
2. `auth.html`
3. `quiz.html`
4. `result.html`
5. `budget-preview.html`

State is stored in `sessionStorage`, so the selected quiz result carries across pages during the same browser session.

## Implementation Notes

- Do not add build tooling unless explicitly requested.
- Keep this as a static HTML/CSS/JS prototype for now.
- Prefer editing shared UI styles in `styles.css`.
- Prefer editing flow/data logic in `app.js`.
- Keep each screen HTML focused on structure only.
- Use ASCII in files unless existing text or product copy requires otherwise.

## Design Rules

- Mobile-first is the priority.
- Keep the phone preview usable at full mobile viewport width.
- Avoid heavy borders; use spacing, color, radius, and shadows for hierarchy.
- Keep title text bold/display-like.
- Keep descriptions readable with sans/body typography.
- Do not make auth feel like a traditional email/password form.
- The recommendation engine is the signature flow, so preserve:
  - one question per quiz screen
  - progress bar at the top
  - no `Lihat hasil` shortcut during quiz
  - result reveal before budget preview
  - manual profile selection after recommendation

## Product Logic

Supported budgeting methods:

- Okane Kakeibo
- 50/30/20 Rule
- Zero-Based Budgeting
- Sinking Fund Strategy
- FIRE Mode

Financial profile badges:

- Okane Kakeibo — The Zen Accountant
- 50/30/20 Rule — The Balanced Harmonist
- Zero-Based Budgeting — The Money Architect
- Sinking Fund Strategy — The Goal Crusher
- FIRE Mode — The Freedom Fighter

Quiz scoring and profile selection live in `app.js`.

## Verification

After changing JavaScript, run:

```powershell
node --check app.js
```

After changing cross-page navigation, manually verify the flow:

```text
index.html -> auth.html -> quiz.html -> result.html -> budget-preview.html
```

## Current Caveat

The in-app browser runtime has intermittently failed in this environment because of a Windows sandbox startup error. If browser automation fails, validate with local file checks and JavaScript syntax checks.
