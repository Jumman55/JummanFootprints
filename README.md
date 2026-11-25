# Jumman Footprints

My personal portfolio website.

Static website built with [Astro](https://astro.build) from the "Jumman Footprints — Website V1" design.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs static files to dist/
```

## Where to edit

| What | File |
| --- | --- |
| Name, social links, contact email, newsletter endpoint | `src/data/site.ts` |
| YouTube videos (each gets its own page at `/adventures/<slug>/`) | `src/data/adventures.ts` |
| Nav, footer, button text in both languages | `src/i18n.ts` |
| Colours, fonts, shared styles | `src/styles/global.css` |
| Nav / footer / photo frames | `src/components/` |
| Pages | `src/pages/` (one file per URL) |

**English & Bangla:** English pages live at `/`, Bangla at `/bn/`. Each page file in `src/pages/` holds both languages side by side in a `copy = { en: {...}, bn: {...} }` block; the `src/pages/bn/` files are one-line wrappers that render the same page in Bangla. The EN/বাং button in the nav switches to the same page in the other language.

**Interactive lessons:** the Math & Physics course lives in `src/data/lessons.ts`. Each lesson is a list of steps (English + Bangla text, optional diagram, optional quiz), and each gets a page at `/learn/<slug>/`. Write maths as `$...$` inline or `$$...$$` on its own line; it is typeset with KaTeX when the site builds. The diagrams are in `src/components/widgets/`.

**Gear:** edit `src/data/gear.ts`. Put photos in `public/images/gear/` and set `image: '/images/gear/name.jpg'`; add a `link` for the product page. Items marked `placeholder: true` show dimmed until you fill them in.

**Travel guides:** edit `src/data/guides.ts`. When a PDF is ready, drop it in `public/guides/` and set `pdf: { en: '/guides/file.pdf', bn: '/guides/file-bn.pdf' }`. The guide page then shows download buttons instead of "Coming soon".

**New video:** copy an entry in `src/data/adventures.ts`, paste the YouTube ID, and fill in the `en` and `bn` text. The thumbnail comes from YouTube automatically.

**Real photos:** drop images in `public/images/` and pass `src="/images/your-photo.jpg"` to any `<Media>` (or set `image` on an adventure).
**YouTube:** set `youtubeId` at the top of `src/pages/adventures/drakensberg.astro`. The video only loads when someone presses play.
**Newsletter:** set `newsletterAction` in `site.ts` to your provider's form URL (Buttondown, ConvertKit, …).

## Publishing and automatic YouTube updates

The site is published on **GitHub Pages** by `.github/workflows/deploy.yml`:

- **Every push to `main`** builds and publishes the site.
- **Every hour** GitHub checks the YouTube channel. A new long video (not Shorts or live streams) is saved to `src/data/youtube-videos.json` and the site is republished, so it gets its own page, a place on the home page and in search. If nothing is new, nothing happens.
- **Actions tab → “Publish site” → Run workflow** checks YouTube and publishes immediately.

New videos arrive with YouTube's title and description in both languages. To add Bangla text, tags (`overnight`, `summit`, `hiking`, `city`, `film`) or a place, edit the entry in `youtube-videos.json`, or move it into `adventures.ts` for chapters and facts. Put a video ID in `"hide"` to keep it off the site. You can also run the check yourself with `npm run sync:youtube`.

Note: GitHub pauses hourly jobs in a repository with no activity for 60 days; the Actions tab shows a button to turn it back on.

## Deploy (other hosts)

`npm run build` makes a plain static site in `dist/`, which also works on Netlify, Vercel or Cloudflare Pages. The web address comes from the `SITE_URL` and `BASE_PATH` environment variables (see `astro.config.mjs`).
