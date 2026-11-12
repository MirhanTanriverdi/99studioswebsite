# 99 Roots Studio – Website

Website for **99 Roots Studio**, a tattoo studio in Berlin Prenzlauer Berg.

- **Live:** https://99roots-studio.com
- **Studio:** Prenzlauer Allee 216, 10405 Berlin
- **Contact:** info99roots@gmail.com · +49 15560 859953 (phone / WhatsApp)
- **Instagram:** [@99.roots](https://www.instagram.com/99.roots/) · **Facebook:** [99 Roots Studio](https://www.facebook.com/profile.php?id=61565613471293)

## Tech stack

- [Vite](https://vitejs.dev) + React 18 + TypeScript
- Tailwind CSS 4, shadcn/ui components, Motion for animation
- Supabase (database + Edge Function) for booking requests
- Resend for booking notification emails
- Hosted on Vercel

## Getting started

Requires Node.js 20+ and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev      # dev server at http://localhost:5173
pnpm build    # production build into dist/
```

> Keep the project **outside iCloud Drive** (e.g. `~/Projects`). iCloud offloads files in
> `node_modules` and `.git`, which makes the dev server, builds and git hang.

## Project structure

```
index.html                  Page head: title, meta, Open Graph, JSON-LD, noscript summary
public/
  artists/                  Artist portraits
  work/<artist>/            Portfolio photos per artist (NN.webp + NN-grid.webp thumbnail)
  our-space/                Studio photos
  fonts/                    Self-hosted fonts
  robots.txt, sitemap.xml, llms.txt, og-image.jpg, favicons
src/app/
  App.tsx                   Page switching (single-page app, everything lives at "/")
  components/               Sections and pages (Hero, Artists, Gallery, Impressum, ...)
  data/                     Artist work + Our Space photo lists
  supabase/functions/server Booking API (Supabase Edge Function)
scripts/                    Image import / conversion helpers
```

## Common edits

| What | Where |
|---|---|
| Artist name, styles, bio, Instagram | `src/app/components/Artists.tsx` **and** `src/app/components/ArtistGalleryPage.tsx` (keep both in sync) |
| Artist portfolio photos | `public/work/<artist>/`, then regenerate `src/app/data/artistWork.ts` with `scripts/import-artist-work.mjs` |
| Gallery carousel | `galleryItems` in `src/app/components/Gallery.tsx` |
| Impressum details | constants at the top of `src/app/components/Impressum.tsx` |
| SEO title, description, structured data | `index.html` |
| Phone / email | search the project for `+49 15560 859953` / `info99roots@gmail.com` |

## Booking form

The appointment form posts to the Supabase Edge Function `make-server-3a4192f3`
(`src/app/supabase/functions/server/index.tsx`). Each request is saved to the
`contact-leads` table and emailed to the studio inbox through Resend.

The function is **not** deployed with the website. After changing it, deploy it in
Supabase (Edge Functions → `make-server-3a4192f3` → Code → Deploy). Secrets
(Supabase → Edge Functions → Secrets):

| Secret | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | yes | Without it requests are saved but no email is sent |
| `NOTIFY_EMAIL` | no | Inbox for notifications (default `info99roots@gmail.com`) |
| `RESEND_FROM` | no | Sender address, needs a verified domain in Resend |

## Deployment (Vercel)

1. Import the GitHub repo in Vercel. Framework preset **Vite**, build command `pnpm build`,
   output directory `dist`. No environment variables are needed.
2. Every push to `main` deploys to production; other branches get preview URLs.
3. Domain: add `99roots-studio.com` and `www.99roots-studio.com` in Vercel → Settings →
   Domains and set the DNS records it shows at GoDaddy.

After the first deploy, submit `https://99roots-studio.com/sitemap.xml` in Google Search
Console and Bing Webmaster Tools.

## Open items

- Opening hours differ between the homepage and the Booking Policy — pick one.
- Cookie banner mentions analytics that the site does not use; Privacy Policy does not
  yet cover Supabase and Google Maps; the map loads before consent.
- Portraits for Mike and Jelena are still loaded from imgur.
- `SEO.tsx`, `Sitemap.tsx` and `PerformanceOptimizer.tsx` are unused leftovers.
