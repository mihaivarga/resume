# Mihai Varga — Resume Site

Angular 21 + Tailwind CSS v4 single-page CV deployed on Vercel.

## Architecture

- **Framework:** Angular 21 (standalone components, signals, `ChangeDetectionStrategy.OnPush`)
- **Styles:** Tailwind CSS v4 (class-based dark mode via `@custom-variant dark`)
- **Build:** Angular CLI / esbuild
- **Deploy:** Vercel (auto-deploy from `main`)
- **Analytics:** Vercel Analytics + Speed Insights

## Key Files

| Path | Purpose |
|------|---------|
| `src/app/app.component.ts` | Root — scroll spy, progress bar, nav shrink, dark mode |
| `src/app/app.component.html` | Root template — nav, mobile drawer, section layout |
| `src/app/resume.data.ts` | All CV content (PROFILE, SUMMARY, SKILL_GROUPS, EXPERIENCE, EDUCATION, CONTACT) |
| `src/styles.css` | Global CSS — animations, reveal, skill glow, progress bar |
| `src/app/components/` | hero, summary, skills, experience, education, contact |
| `src/app/services/weather.service.ts` | Fetches local weather for nav badge + aurora colors |

## Dev Commands

```bash
npm start          # ng serve — dev server at http://localhost:4200
npm run build      # production build → dist/resume/
npm test           # karma unit tests
```

## Code Conventions

- **All components are standalone** — import dependencies directly, no NgModules
- **Signals over observables** for local state (`signal()`, `computed()`)
- **OnPush change detection** on every component — mutate via signals/`update()`
- **Tailwind utilities first** — custom CSS only for animations and dynamic behavior
- **Print-safe** — all interactive UI (drawer, buttons, progress bar) hidden with `print:hidden`; experience bullets always visible in print

## Git Conventions

- Conventional commits: `feat(scope): description`, `fix(scope): description`, `refactor(scope): ...`
- One logical change per commit, ≤72 char subject
- Split large changes into multiple focused commits (do NOT blob everything into one)

## Content Updates

To update CV content, edit **only** `src/resume.data.ts`. All components read from it.

## Styling Notes

- Dark mode: toggle class `dark` on `<html>` — already wired in `AppComponent.setDark()`
- Weather aurora colors: set via CSS vars `--wc1 --wc2 --wc3` on `document.body`
- Skill categories map to hover glow classes in `styles.css`: `skill-backend`, `skill-frontend`, `skill-cloud`, `skill-databases`, `skill-methods`
- Scroll reveal: add class `reveal` to any wrapper element — `IntersectionObserver` adds `visible` when it enters viewport

## DO NOT

- Add NgModules — project is fully standalone
- Use `document.querySelector` inside components — use Angular `@ViewChild` or signals
- Commit directly to `main` without reviewing the diff first (Mihai reviews before commit)
- Import heavy third-party animation libraries — all animations are pure CSS
