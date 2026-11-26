# Launch guide (GitHub Pages, git on the command line)

Your repo: https://github.com/muhammadakashcodes/portfolio
Your live address: https://muhammadakashcodes.github.io/portfolio/

The plan: build the new site on a separate branch, check it, then merge to go live. The old site stays safe in git history the whole time.

## 0. Before you start
- [ ] Finish the content: README "TODO before launch" list
- [ ] In this project folder run `npm run check`. It rebuilds the CSS and lists every placeholder still left. Repeat until it prints "Preflight passed".
- [ ] Work through "Real phone", "Keyboard only" and "Screen reader" in `QA-CHECKLIST.md`

## 1. Find out how Pages is set up
On GitHub: repo, then Settings, then Pages. Under "Build and deployment" note the **Branch** (probably `main`) and **Folder** (probably `/ (root)`).
If the folder is `/docs`, copy the new files into `docs/` instead of the repo root in step 3.

## 2. Make a branch in your existing clone
```bash
cd path/to/your/portfolio-repo
git status                      # should say: working tree clean
git tag old-portfolio           # bookmark of the current site
git checkout -b redesign
```

## 3. Replace the old site with the new one
Extract the project zip somewhere (for example `~/Downloads/portfolio-stage-9`). Then:
```bash
git rm -r -q .                  # removes the old files from this branch (they stay in history)
cp -R ~/Downloads/portfolio-stage-9/portfolio/. .
```
The `/.` at the end matters: it also copies hidden files such as `.nojekyll` and `.gitignore`.
On Windows, use Git Bash (same commands, paths look like `/c/Users/you/Downloads/...`).

## 4. Build and check
```bash
npm install
npm run check                   # builds dist/styles.css, then checks for placeholders
```
Optional local look (the 404 page will look unstyled locally, that is normal):
```bash
python3 -m http.server 8000     # then open http://localhost:8000/
```

## 5. Commit and push the branch
```bash
git add -A
git status                      # check: dist/styles.css IS listed, node_modules is NOT
git commit -m "Redesign portfolio"
git push -u origin redesign
```

## 6. Go live
Pick one.

**Option A (on GitHub):** open the pull request GitHub suggests, look over the changed files, click "Merge pull request".

**Option B (command line):**
```bash
git checkout main               # use the Branch name you noted in step 1
git merge redesign
git push
```

Then in the repo open the **Actions** tab. A run called "pages build and deployment" turns green in about 1-2 minutes. Open the live address and hard-refresh (Ctrl+Shift+R, or Cmd+Shift+R on Mac).

## 7. Check the live site
Do the "After you deploy" list in `QA-CHECKLIST.md`. In particular:
- Send one real message through the form. If Formspree asks you to confirm your email, do that first.
- Open `https://muhammadakashcodes.github.io/portfolio/nothing-here` and confirm the styled 404 page appears.
- Submit `https://muhammadakashcodes.github.io/portfolio/sitemap.xml` in Google Search Console.

## If something goes wrong
**Roll back to the old site** (find the last commit of the old site with `git log --oneline`, call it `abc1234`):
```bash
git revert --no-commit abc1234..HEAD
git commit -m "Roll back redesign"
git push
```
The tag `old-portfolio` also marks the old site: `git log old-portfolio` shows it.

| Problem | Likely cause |
| --- | --- |
| Site still shows the old version | Wait 2 minutes, check the Actions run is green, hard-refresh |
| No styling at all | `dist/styles.css` was not committed. Run `npm run build`, `git add dist/styles.css`, commit, push |
| An image or the résumé returns 404 | GitHub Pages is case-sensitive: the file name must match exactly (`Muhammad-Akash-Resume.pdf`) |
| New Tailwind classes have no effect | Run `npm run build` again and commit `dist/styles.css` |
| Form shows "not connected yet" | `YOUR_FORM_ID` is still in the form's `action` in `index.html` |

## Updating the site later
1. Edit the HTML or `src/*.css`
2. `npm run build`
3. `git add -A`, `git commit`, `git push`

Project cards appear in both `index.html` and `projects/index.html`, so update both.

## If you move to a custom domain later
Update: the canonical and Open Graph URLs in every page, `sitemap.xml`, `robots.txt`, and change `/portfolio/` to `/` in `404.html`. Add a `CNAME` file and set the domain in Settings, Pages.
