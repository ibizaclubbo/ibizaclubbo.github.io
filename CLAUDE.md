# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static marketing website for **Ibiza Club Bolivia**, a nightclub in La Paz, Bolivia. Deployed via GitHub Pages at `ibizaclubbo.github.io`. No build system, bundler, or framework — plain HTML, CSS, and vanilla JS.

## Previewing locally

Since there is no build step, serve the files with any static server:

```bash
python3 -m http.server 8080
# or
npx serve .
```

Then open `http://localhost:8080`.

## Architecture

### File structure
- `index.html` — Homepage (hero pill gallery, events teaser, DJ cards, social grid)
- `events.html` — Tickets/events listing with photo grid
- `vip.html` — VIP membership page with benefits accordion
- `contacts.html` — Contact page with address, map link, and social links
- `privacy.html` — Privacy policy
- `styles.css` — Single shared stylesheet for all pages (~700 lines)
- `app.js` — Shared JS loaded by every page (4 functions, no dependencies)
- `assets/` — All images. The hero pill gallery uses `assets/pills/pill1.jpg` … `pill9.jpg`

### Shared JS (`app.js`)
All four functions run on every page; they are no-ops when their target elements are absent:
- `setActiveNav()` — marks the current page link as `.active` by comparing `location.pathname` to each `<a>` href
- `wireAccordion()` — one-open-at-a-time accordion for `.accItem` / `.accHead` / `.accBody` elements (used on `vip.html`)
- `wireMenu()` — opens/closes the mobile overlay (`#mobileMenu`) via `#menuBtn` / `#menuCloseBtn`; also closes on outside-click and Escape
- `wireScrollReveal()` — adds `.reveal` then `.visible` via `IntersectionObserver` on `.eventCard, .benefit, .djCard, .mediaCard, .photo, .card`

### CSS conventions (`styles.css`)
Design tokens are CSS custom properties at `:root`:
- `--accent` (#b400ff) and `--accent2` (#ff3bd4) — purple/pink brand colors
- `--panel`, `--stroke`, `--muted`, `--text` — glass-morphism surface values
- `--radius` (22px), `--max` (1040px), `--shadow`

Pill gallery heights are driven by CSS classes `.short`, `.mid`, `.tall` combined with inline `--mt` and `--d` custom properties per pill for stagger offsets and animation delay.

### Header / footer duplication
There is no templating layer. The `<header>`, mobile menu overlay, `<footer>`, and WhatsApp FAB (`<a class="whaFab">`) are copied verbatim into every HTML file. When updating navigation links or shared UI, edit all four pages.

### Contact details (hardcoded)
- WhatsApp: `https://wa.me/59177553297`
- Email: `ibizaclubbolivia@gmail.com`
- Address: Calle Fray de Ocaña N° 1200, Zona Alpacoma, La Paz, Bolivia
- TikTok / Facebook: `@ibiza.club.satelite_1` / `IbizaClubBolivia`
