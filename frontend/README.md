# Star Landscape — Animated React Frontend

A production-grade, heavily animated React + Vite + Tailwind CSS implementation for **Star Landscape**, Singapore's top award-winning landscape & greenery company.

## Run it

```bash
npm install
npm run dev      # local dev server → http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Stack

- **React 18** (Vite 5, JSX)
- **Tailwind CSS 3.4** — brand tokens, fonts, keyframes & shadows in `tailwind.config.js`
- **lucide-react** icons (+ inline SVG for WhatsApp / social glyphs)
- Pure CSS keyframes & transitions — no animation library required

## Structure

```
starlandscape-app/
├─ index.html                 # Google Fonts (Poppins + Questrial), meta
├─ tailwind.config.js         # Star Landscape colors, fonts, radii, shadows, keyframes
├─ vite.config.js
└─ src/
   ├─ main.jsx
   ├─ App.jsx                 # assembles all sections + global reveal observer
   ├─ index.css               # design tokens, keyframes, component primitives
   ├─ data.js                 # all copy, imagery & navigation content
   ├─ hooks.js                # useReveal, useCountUp, useBodyLock, useMagnetic…
   ├─ assets/                 # brand source copies (logo svg + png exports)
   └─ components/
      ├─ Navbar.jsx           # sticky header, contact pill, animated hamburger, fullscreen drawer (+ WhatsAppIcon export)
      ├─ Hero.jsx             # parallax hero, leaf particles, magnetic CTAs, count-up stats
      ├─ About.jsx            # credibility, awards, credentials
      ├─ Services.jsx         # 6 services, filter tabs, 3D tilt cards, glow hover
      ├─ Process.jsx          # 4-step "how we work"
      ├─ Calculator.jsx       # instant garden estimate / site-visit estimator
      ├─ BeforeAfter.jsx      # draggable transformation comparison slider
      ├─ Projects.jsx         # filterable gallery + lightbox modal
      ├─ Blog.jsx             # garden journal cards + full article reader
      ├─ Testimonials.jsx     # autoplay review slider + 5.0★ badge
      ├─ Faq.jsx              # accordion FAQ
      ├─ BrandStatement.jsx   # interactive "the aura landscape" wordmark section
      ├─ ContactForm.jsx      # validated booking form with animated success state
      ├─ SiteMap.jsx          # index of every page, service and contact route
      ├─ Footer.jsx           # footer + pulsing WhatsApp FAB + back-to-top
      ├─ AuraLogo.jsx         # inline-SVG brand wordmark (variant: dark/white/auto)
      ├─ TechText.jsx         # React Bits — interactive canvas type
      └─ TechText.css
```

> The whole app lives in the `frontend/` folder; the repository root only holds
> convenience scripts (`npm run dev` → `npm --prefix frontend run dev`).

## Design system

| Token | Value | Use |
| --- | --- | --- |
| `--color-primary` | `#63a01f` | Signature Star Landscape green |
| `--color-forest-dark` | `#32500f` | Deep botanical contrast |
| `--color-lime-accent` | `#95f02e` | Glow / highlight |
| `--color-mint-light` | `#dafab7` | Light card tint |
| `--color-bg-cream` | `#fff9f6` | Warm canvas |
| `--color-text-charcoal` | `#191919` | Body & titles |
| `--color-text-muted` | `#999997` | Secondary text |

Typography: **Poppins** (headings 600–800) · **Questrial** (body) · **DIN Next** (captions).

All imagery is served from the official Star Landscape Wix media library.
