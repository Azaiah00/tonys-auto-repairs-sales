# Tony's Auto Repairs & Sales — spec website

A finished, bilingual (English + Spanish) spec website for **Tony's Auto Repairs & Sales**, 5258 Hull Street Rd, Richmond, VA 23224. It was built by Couture House Co. to show the owner, and it's ready to launch once the owner approves it.

- Static HTML/CSS/vanilla JS. No build step, no frameworks, no external requests (fonts are self-hosted).
- English pages at the root; a full Spanish mirror in `/es/` with `hreflang` alternates and an EN | ES toggle.
- Pages: `index.html`, `services.html`, `tires.html`, `cars.html`, `contact.html`, `404.html` (plus the same set in `es/`).

## Preview locally
```
cd tonys-auto-repairs-sales
python3 -m http.server 8080
# open http://localhost:8080/
```
You can also double-click `index.html`, because every page except the 404s uses relative paths.

## Deploy (Netlify)
1. Drag the folder into Netlify (Sites > Add new site > Deploy manually), or connect a Git repo with publish directory `.` and no build command.
2. `netlify.toml` already sets security headers (including a CSP that allows the one inline bootstrap script by its hash), long cache headers for `/assets/*`, and 404 handling (`/es/*` falls back to `es/404.html`).
3. Forms: the contact forms (`contact` in English, `contacto` in Spanish) are Netlify Forms. They start working once the site is deployed on Netlify. Turn on email notifications under Site settings > Forms.
4. Add the custom domain and turn on HTTPS.

## Domain
Proposed: **tonysautorva.com**. All canonical, Open Graph, sitemap and JSON-LD URLs already use it. If you pick a different domain, find and replace `https://tonysautorva.com/` everywhere, including `sitemap.xml`, `robots.txt` and `llms.txt`.

## Structure
```
assets/css/fonts.css   @font-face (Oswald, Source Sans 3; Fontsource, OFL)
assets/css/site.css    all styles
assets/js/site.js      menu, EN/ES toggle, rolling tire, reveals, form
assets/fonts/          self-hosted woff2
assets/img/            photos (.webp), og.jpg, favicons
es/                    Spanish mirror
robots.txt, sitemap.xml, llms.txt, site.webmanifest, netlify.toml
```

## Editing
The copy lives directly in the HTML. If you change the English copy, change the matching page in `es/` too. If you edit the inline script in `<head>`, recompute its sha256 hash in the `netlify.toml` CSP, or the browser will block it.
