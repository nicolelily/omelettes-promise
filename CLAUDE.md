# Omelette's Promise — site notes for Claude

A small advocacy site for **Omelette's Promise**, a commitment by rescues, shelters,
fosters, and adopters to keep dogs rescued from research labs and other traumatic
settings safe (education, activated GPS collars, and 24/7 support).

## Stack & hosting

- **Plain static HTML/CSS/JS** — no framework, no build step.
- Hosted on **GitHub Pages** at the custom domain in `CNAME` (`omelettespromise.org`).
- **Deploy = `git push` to `main`.** Pages redeploys automatically in a minute or two.
- If the site ever outgrows plain HTML, the recommended next step is **Astro** (component
  model, zero-JS output, easy GitHub Pages deploy, can add Svelte islands later) — not
  SvelteKit, which is overkill until there's a database/auth/server-rendered data.

## Structure

- `index.html` — homepage (hero, story, promise, ordinance, products, get-involved, contact)
- `signers.html` — "Who's Signed" + rescue Amazon wishlists
- `resources.html` — "Resources for Adopters & Fosters": GPS collar request + educational resources
- `css/styles.css` — all styles (single file)
- `js/main.js` — mobile nav toggle + Formspree AJAX form handling
- `assets/` — logos, favicon, photos

## Conventions (important)

- **The header, nav, and footer are copy-pasted into every page.** When you change a nav
  or footer link, **update it in all three HTML files**. Mark the current page's nav item
  with `aria-current="page"`.
- **Nav is mobile-first.** Below 1230px it collapses to a hamburger dropdown (most visitors
  are on phones). Prefer *not adding* top-level nav items — consolidate instead. The
  Resources nav item is a hub, not a section anchor.
- **Images:** optimize before committing to roughly match existing photos (~1200px wide,
  JPEG ~quality 82, a few hundred KB max). On macOS:
  `sips -s format jpeg -s formatOptions 82 -Z 1200 in.png --out out.jpg`
- **Photos use a figure + graceful fallback pattern** — see `.hero-photo` / `.story-photo`
  with the `onerror` handler and `.photo-fallback` div. Reuse it for new images.
- **Forms:** pledge & volunteer post to **Formspree** via AJAX (`js/main.js`), donate uses
  **Donorbox** (popup via `.custom-dbox-popup`), GPS collar request links out to a
  **Tally** form. A form without an `action` shows a "coming soon" message.
- Copy tends to reference Omelette's story (e.g. "felt the sun"), Ridglan Farms closing,
  and the ~15,000 dogs still at Marshall BioResources. Keep that voice.

## Common updates

- **Update the "GPS collars donated" count.** In `index.html`, find the stat card marked
  with `<!-- Update this number as collars are donated -->` (in the Story section's
  `.stat-row`) and change the number inside `<span class="stat-number">`. Then commit and
  push. That's the only edit needed — the card styling and layout stay the same.

## To-do / ideas

- [ ] **Resources page photo gallery.** The resources page currently uses a single
  placeholder beagle photo (`assets/beagle-sunny-field.jpg`, AI-generated). Nicole is
  collecting real photos from people she sends GPS collars to. When several real photos
  arrive, replace the single image with a small **gallery** of real Omelette's Promise
  dogs (optimize each the same way). Until then, swap the single image as photos come in.
