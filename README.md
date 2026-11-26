# Muhammad Akash - Portfolio

Frontend portfolio built with Tailwind CSS (v3) plus a small set of design tokens.
Spec: see the Portfolio Requirements doc.

## Setup

```bash
npm install
npm run build   # one-time build -> dist/styles.css
npm run dev     # rebuild on every change
```

Open `index.html` in a browser (or use a local server such as VS Code Live Server).

## Structure

```
index.html              homepage (stage 1: temporary foundation check page)
projects/               projects page and case studies (later stages)
src/tokens.css          design tokens: the single source of truth
src/input.css           fonts, base styles, layout primitives
tailwind.config.js      maps Tailwind classes to the tokens
assets/fonts/           self-hosted Manrope and Inter (latin, variable)
assets/img/             your own project screenshots
dist/styles.css         compiled CSS (commit this; GitHub Pages serves it)
js/                     scripts (later stages)
```

## Rules

- Change a color, radius or size in `src/tokens.css` only. Never hard-code values in components.
- Run `npm run build` and commit `dist/styles.css` before every deploy. Do not use the Tailwind CDN.
- Use relative links (no leading `/`) so the site works under `/portfolio/` on GitHub Pages.

## Progress

- [x] 1. Foundation
- [ ] 2. Components
- [ ] 3. Homepage
- [ ] 4. Projects page
- [ ] 5. Case studies
- [ ] 6. Contact
- [ ] 7. Extras (resume, 404, SEO)
- [ ] 8. Testing
- [ ] 9. Launch
