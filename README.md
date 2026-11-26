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
index.html              homepage (hero, about, education, skills, projects, contact, footer)
projects/index.html     projects page with filters
projects/<slug>/        one case study each: nexora-ai, interactive-calculator, weather-app
src/tokens.css          design tokens: the single source of truth
src/input.css           fonts, base styles, layout primitives
src/components.css      buttons, nav, cards, tags, form fields, status chip
src/sections.css        hero, contact, footer styles
tailwind.config.js      maps Tailwind classes to the tokens
assets/fonts/           self-hosted Manrope and Inter (latin, variable)
assets/img/             your own project screenshots
dist/styles.css         compiled CSS (commit this; GitHub Pages serves it)
js/nav.js               mobile menu, scrolled header, current-section marker
js/main.js              scroll reveal
js/projects.js          project filters (keyboard accessible, announces result count)
```

## Rules

- Change a color, radius or size in `src/tokens.css` only. Never hard-code values in components.
- Run `npm run build` and commit `dist/styles.css` before every deploy. Do not use the Tailwind CDN.
- Use relative links (no leading `/`) so the site works under `/portfolio/` on GitHub Pages.

## Progress

- [x] 1. Foundation
- [x] 2. Components
- [x] 3. Homepage
- [x] 4. Projects page
- [x] 5. Case studies
- [ ] 6. Contact
- [ ] 7. Extras (resume, 404, SEO)
- [ ] 8. Testing
- [ ] 9. Launch

## TODO before launch (search `TODO` in index.html)

- Rewrite the three About paragraphs in your own words
- Replace `[Institution name]`
- Replace `your.email@example.com` and the LinkedIn URL (contact section and footer)
- Replace each project card `href="#"` with the real live demo / code / case study URL
- Replace the screenshot placeholders with your own images
- Replace the same project links and screenshots in `projects/index.html`
- In each case study (`projects/<slug>/index.html`): replace the live demo and code links, the screenshot placeholders, and the two [bracketed] sentences under "What I learned and what I'd improve" (search for `TODO`). Check that every draft statement is true of your project.
- Set up the contact form service (stage 6)

Note: the project cards are written out in both `index.html` and `projects/index.html`. When you add or change a project, update both.
