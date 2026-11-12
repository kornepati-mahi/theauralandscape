# The Aura Landscape Co. — Star Landscape

Production site for **The Aura Landscape Co.** (Star Landscape), Singapore's
award-winning landscape design & maintenance company.

## Repository layout

```
starlandscape-app/
├── package.json        # root — convenience scripts that delegate to ./frontend
├── README.md           # this file
└── frontend/           # the React + Vite + Tailwind application
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── public/         # static assets served at the site root
    │   ├── the-aura-logo.svg
    │   ├── the-aura-logo-dark.png
    │   └── the-aura-logo-white.png
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx     # section order + global reveal observer
    │   ├── index.css   # design tokens, keyframes, component primitives
    │   ├── data.js     # all copy, imagery and navigation content
    │   ├── hooks.js    # useReveal, useCountUp, useBodyLock, useMagnetic …
    │   └── components/
    └── dist/           # production build output
```

## Run it

From the repository root:

```bash
npm run install:all   # first time only
npm run dev           # -> http://localhost:5173
npm run build         # -> frontend/dist/
npm run preview       # serve the production build
```

Or work inside `frontend/` directly:

```bash
cd frontend
npm install
npm run dev
```

## Stack

- **React 18** (Vite 5, JSX)
- **Tailwind CSS 3.4** — brand tokens, fonts, keyframes & shadows in `tailwind.config.js`
- **lucide-react** icons, plus inline SVG for the WhatsApp / social glyphs
- **React Bits — `TechText`** — the interactive canvas wordmark used in the brand
  statement section, the footer lock-up and the article sign-off
  (`frontend/src/components/TechText.jsx` + `TechText.css`)
- Pure CSS keyframes & transitions — no animation library required

## Brand assets

The wordmark is a regenerated vector master:

| File | Purpose |
|------|---------|
| `frontend/public/the-aura-logo.svg` | vector master, `currentColor` |
| `frontend/public/the-aura-logo-dark.png` | charcoal `#161A14` @3x |
| `frontend/public/the-aura-logo-white.png` | white @3x |
| `frontend/src/components/AuraLogo.jsx` | inline-SVG React component (`variant="dark" \| "white" \| "auto"`) |

The same artwork is applied to the forest photo:
`../WhatsApp Image 2026-10-30 at 4.27.39 PM - with Aura logo.jpeg`
