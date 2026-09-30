# Launch notes — Tony's Auto Repairs & Sales

Confirm every item below with the owner (Tony) before launch.

## Facts to confirm
- **Hours (conflict).** The business card says "Abierto 7 días a la semana" (open 7 days a week). One directory lists Mon–Sat 8am–6pm. BBB lists Mon–Fri 8am–6pm, closed weekends. The site currently shows "Open 7 days a week — call for today's hours", and the JSON-LD uses Mon–Sat 08:00–18:00. Get the real hours, then update the visible copy (EN and ES), the `openingHoursSpecification` in every page's JSON-LD, and `llms.txt`.
- **Google rating 4.3 from 116 reviews.** This is shown in the home trust strip (EN/ES) and in `aggregateRating` on both home pages. Check the current numbers on the Google Business Profile, or remove them.
- **In business since 2010.** BBB lists the business start as 3/1/2010 and incorporation as 2/4/2010. The site uses it in "On Hull Street since 2010", the "Est. 2010" photo plate, Quick facts, `foundingDate`, and `llms.txt`.
- **Free check-engine scan.** This comes from a directory listing and is only worded as "Ask about a free check-engine scan". Confirm it's offered.
- **Free brake inspection.** This is on the shop banner in the photos. Confirm the offer is still running.
- **Spanish spoken at the shop.** The site says customers can call in Spanish ("English y español", FAQ "Do you speak Spanish? Yes"). This is inferred from the Spanish business card. Confirm someone at the shop handles Spanish calls.
- **Texting.** The site offers `sms:` links to the shop line (804) 233-5599 ("Text for inventory", mobile bar). Confirm that line can receive texts. If it can't, swap the sms links for a number that can, or remove them.
- **Suspension and lowering installs** and **used car sales.** Both come from directory notes. Confirm they're current.
- **Parking.** The FAQ says there's a lot in front of the shop, based on the photos. Confirm customers may park there.
- **Name/spelling.** The site uses "Tony's Auto Repairs & Sales" (BBB legal name: Tony's Auto Repairs & Sales LLC). The card says "TONYS AUTO REPAIRS SALE" and Facebook says "Tony's Auto Repair". Confirm the preferred public name.
- **Tony's surname** is deliberately not published (BBB lists a managing partner surname). The site refers to him only as "Tony".
- **Tony's cell (804-833-3407)** is on the business card and is deliberately **not** published anywhere. The site uses the shop line (804) 233-5599 only. The recreated business card on the home page leaves the cell out.
- **Not claimed anywhere (on purpose):** warranties, financing, ASE certification, specific prices, towing, fleet service, specific car inventory. Add any of these only if the owner confirms them.
- **Logo (supplied by Couture House).** The header, footer, icons and schema use a new "TONY'S Auto Repairs & Sales" logo (tire and wrench emblem, blue/red/black). Files in assets/img: `tonys-logo.webp` (light backgrounds), `tonys-logo-reverse.webp` (white-text version for the dark footer), `tonys-logo.png` (schema), plus favicon and app icons built from the emblem. Tony has not seen it yet. Confirm he approves it, or ask for his own logo and original vector files for signage and print.
- **BBB.** The profile shows the business as not accredited, with a B- rating caused by one unanswered complaint. It is not linked or mentioned on the site. Suggest the owner responds to the complaint.

## Photos and credits
- All photos come from the business's own public Facebook page, facebook.com/hullstreettony (shop exterior with the "Free Brake Inspection" banner, two angles). The owner must approve their use and confirm they own them or have licensed them.
- Visible license plates were blurred or were already obscured.
- The business-card photo was **not** used as an image, because it shows Tony's cell number, a tire-brand mascot and stock car photos. Its text is recreated in HTML instead.
- Recommended swaps once the owner can supply them: interior bay or lift shots, tire racks (new and used), current cars on the lot, and a photo of Tony and the crew (with consent). The layout already has room for them (why-section photo, service rows, cars section).

## Forms
- The contact forms (`contact` in English, `contacto` in Spanish) are Netlify Forms with a honeypot. They work only after deploying on Netlify. Set up email notifications to the owner's address. After a successful submit, the form shows an on-page confirmation, or returns to `contact.html?sent=1` without JS.

## Domain and SEO
- Proposed domain: **tonysautorva.com** (register it). Canonicals, OG tags, hreflang, sitemap and JSON-LD all use it.
- After launch: claim or update the Google Business Profile website field, add the URL to Facebook, and submit `sitemap.xml` in Google Search Console.
- Schema: `AutoRepair` with `additionalType` TireShop. Used car sales appear as an offer in `hasOfferCatalog`. An AutoDealer type was deliberately not added, because the primary business is repair.

## Neighbor note (internal only)
- Teo Customs (body shop) is across the street at 5255 Hull St. Couture House built their spec site too. It is not mentioned on this site.

## Live preview domain (updated 28 Sep 2026)
The site is live at https://tonys-auto-repairs-sales.netlify.app/ and every canonical URL, Open Graph/Twitter tag, hreflang, JSON-LD URL, sitemap.xml, robots.txt and llms.txt now points there, so text-message and social link previews show this exact address.
When the owner's own domain (tonysautorva.com) is connected in Netlify, find-and-replace `tonys-auto-repairs-sales.netlify.app` with `tonysautorva.com` across the .html/.xml/.txt/.toml/.webmanifest files, then redeploy.
