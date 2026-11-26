#!/usr/bin/env node
/* Pre-launch check: finds every placeholder that must be replaced before you publish.
   Run:  npm run preflight   (or  npm run check  to rebuild the CSS first)
   Exits with code 1 if anything is left to fix. */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PLACEHOLDER_PDF_SHA256 =
  "100e7280ef3637f21c7caa5a27372b80cc619113139f029588e9db1f20d1bb76";

const SKIP_DIRS = new Set(["node_modules", ".git", "scripts"]);
function htmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(function (e) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return SKIP_DIRS.has(e.name) ? [] : htmlFiles(p);
    return e.name.endsWith(".html") ? [p] : [];
  });
}

const checks = [
  { re: /TODO/, what: "TODO comment still in the file" },
  { re: /YOUR_FORM_ID/, what: "Form service ID not set (Formspree)" },
  { re: /your\.email@example\.com/, what: "Placeholder email address" },
  { re: /linkedin\.com\/in\/your-profile/, what: "Placeholder LinkedIn URL" },
  { re: /\[Institution name\]/, what: "Institution name not filled in" },
  { re: /\[Write [^\]]*\]/, what: "Bracketed sentence for you to write" },
  { re: /href="#"/, what: 'Link that still points to "#" (needs a real URL)' },
  {
    re: /Screenshot goes here|screenshot goes here/,
    what: "Screenshot placeholder still showing",
  },
  {
    re: /Screenshot placeholder/,
    what: "Screenshot placeholder label still in the file",
  },
];

const problems = [];
htmlFiles(ROOT).forEach(function (file) {
  const rel = path.relative(ROOT, file);
  fs.readFileSync(file, "utf8")
    .split("\n")
    .forEach(function (line, i) {
      checks.forEach(function (c) {
        if (c.re.test(line)) problems.push(rel + ":" + (i + 1) + "  " + c.what);
      });
    });
});

// Résumé must exist and must not be the placeholder file
const pdf = path.join(ROOT, "assets", "Muhammad-Akash-Resume.pdf");
if (!fs.existsSync(pdf)) {
  problems.push("assets/Muhammad-Akash-Resume.pdf is missing");
} else if (
  require("crypto")
    .createHash("sha256")
    .update(fs.readFileSync(pdf))
    .digest("hex") === PLACEHOLDER_PDF_SHA256
) {
  problems.push(
    "assets/Muhammad-Akash-Resume.pdf is still the placeholder: replace it with your own résumé",
  );
}

// Compiled CSS must exist (GitHub Pages serves it directly)
if (!fs.existsSync(path.join(ROOT, "dist", "styles.css"))) {
  problems.push("dist/styles.css is missing: run  npm run build");
}

if (problems.length) {
  console.log(
    "\nNot ready to publish. " + problems.length + " thing(s) left:\n",
  );
  problems.forEach(function (p) {
    console.log("  - " + p);
  });
  console.log("");
  process.exit(1);
}
console.log("\nPreflight passed: no placeholders found.\n");
