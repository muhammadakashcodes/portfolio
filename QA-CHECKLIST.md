# QA checklist

## Automated results (run 2026-11-25, local server, all 6 pages)

| Check | Result |
| --- | --- |
| Lighthouse desktop (all pages) | Performance 100, Accessibility 100, Best practices 100, SEO 100 (404 page SEO 60 on purpose: it is set to noindex) |
| Lighthouse mobile, simulated slow 4G (all pages) | Performance 97-98, Accessibility 100, Best practices 100, LCP about 2.0 s, CLS 0 (0.03 on projects page) |
| axe (WCAG 2.2 AA + best practices) | 0 violations at 390px and 1440px on every page, including error and success states of the form |
| HTML validation (html-validate) | 0 errors on all 6 pages (checked the validator against a deliberately broken file) |
| Horizontal scroll | None at 320, 390, 768, 1024, 1440px |
| Text at 200% size | No horizontal scroll, no clipped text |
| Keyboard walkthrough (Tab through every page, desktop and mobile widths) | First stop is the skip link, every stop has a visible focus ring, nothing hidden under the sticky header, no focus traps |
| Console errors / failed requests | None |
| Internal links, icons, sitemap URLs, résumé, social image | All load (200) |
| JavaScript off | Content, nav links and form still work; filters hidden, all projects shown |
| Reduced motion | All content visible, no movement |
| Page weight (mobile, home) | About 120 KB total including fonts |

## What automated tools cannot check: do these yourself

### 1. Real phone (iPhone Safari and Android Chrome if you can)
- [ ] Menu button opens and closes; links scroll to the right section
- [ ] No sideways scrolling on any page; text is readable without zooming
- [ ] Project filters scroll sideways in their row and select correctly
- [ ] Contact form: keyboard type is right for email, errors are readable, success message shows
- [ ] Résumé button downloads or opens the PDF
- [ ] Rotate to landscape: hero is not cut off

### 2. Keyboard only (desktop, no mouse)
- [ ] Tab from the top: skip link appears first and works
- [ ] Narrow the window to phone width: menu opens with Enter or Space, focus lands on the first link, Escape closes it and returns focus to the button
- [ ] Projects page: filters work with Enter or Space
- [ ] Contact form: submit empty, errors appear, focus goes to the first problem field

### 3. Screen reader (NVDA with Firefox or Chrome on Windows; VoiceOver with Safari on iPhone or Mac)
- [ ] Headings list (NVDA: H key / VoiceOver rotor) reads in a sensible order: one H1, then H2 sections
- [ ] Landmarks list shows header, navigation, main, footer
- [ ] Menu button is announced with its expanded or collapsed state
- [ ] Project links are announced with their project (for example "Live demo of Nexora AI"), never just "link"
- [ ] Filter buttons announce pressed or not pressed; after choosing one, the result count is read aloud
- [ ] Form: each field's label and its error are read together; the status message is read after submitting
- [ ] Decorative parts (hero glow, green status dot) are not read out
- [ ] After you add screenshots: each image has meaningful alt text

### 4. Settings
- [ ] Browser zoom 200% and 400%: nothing overlaps or is cut off
- [ ] Operating system "reduce motion" on: no movement on scroll

## After you deploy (on the live address)
- [ ] Every link works, including GitHub, LinkedIn and email
- [ ] Send one real test message through the form and confirm it arrives
- [ ] Résumé is YOUR file (not the placeholder)
- [ ] Open a made-up address such as `/portfolio/nothing-here` and confirm the 404 page appears styled
- [ ] Paste the home link into a chat app or a social preview tool and check the preview image and title
- [ ] Run Lighthouse on the live site (Chrome DevTools) and compare with the table above
- [ ] Submit `sitemap.xml` in Google Search Console

## Content still to finish (see README TODO list)
- [ ] About text in your own words
- [ ] Institution, email, LinkedIn
- [ ] Live demo and code links for each project
- [ ] Your own project screenshots with alt text
- [ ] The [bracketed] sentences in each case study
- [ ] Real résumé PDF
- [ ] Form service ID
