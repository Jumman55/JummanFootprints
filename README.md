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

**New video:** copy an entry in `src/data/adventures.ts`, paste the YouTube ID, and fill in the `en` and `bn` text. The thumbnail comes from YouTube automatically.

**Real photos:** drop images in `public/images/` and pass `src="/images/your-photo.jpg"` to any `<Media>` (or set `image` on an adventure).
**YouTube:** set `youtubeId` at the top of `src/pages/adventures/drakensberg.astro`. The video only loads when someone presses play.
**Newsletter:** set `newsletterAction` in `site.ts` to your provider's form URL (Buttondown, ConvertKit, …).

## Deploy

`npm run build` makes a plain static site in `dist/`, which works on Netlify, Vercel, Cloudflare Pages or GitHub Pages. Before deploying, set `site` in `astro.config.mjs` to your domain.
