/** Tailwind maps to the CSS variables in src/tokens.css.
 *  Change a value in tokens.css and both Tailwind classes and custom CSS update. */
module.exports = {
  content: ["./*.html", "./projects/**/*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-raised": "var(--surface-raised)",
        line: "var(--border)",
        "line-control": "var(--border-control)",
        ink: "var(--text)",
        "ink-2": "var(--text-2)",
        "ink-3": "var(--text-3)",
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          text: "var(--accent-text)",
        },
        focus: "var(--focus)",
        error: "var(--error)",
        success: "var(--success)",
      },
      fontFamily: {
        heading: "var(--font-heading)",
        sans: "var(--font-body)",
      },
      borderRadius: {
        control: "var(--radius-control)",
        card: "var(--radius-card)",
        panel: "var(--radius-panel)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
      },
      maxWidth: {
        site: "var(--container)",
        prose: "65ch",
      },
      spacing: {
        nav: "var(--nav-height)",
        section: "var(--section-y)",
      },
      transitionDuration: {
        fast: "150ms",
        base: "250ms",
      },
    },
  },
  plugins: [],
};
