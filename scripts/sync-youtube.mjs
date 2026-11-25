// Checks the YouTube channel for new long-form videos and saves them to src/data/youtube-videos.json.
// Runs every hour on GitHub (see .github/workflows/deploy.yml); you can also run it yourself:
//   npm run sync:youtube
// It never changes videos you wrote by hand in src/data/adventures.ts, and never removes anything.
import { readFile, writeFile } from 'node:fs/promises';

const CHANNEL_ID = 'UCZEJrQjEJxEwruCXEHv5-pg';
const FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
// Paths can be overridden (used for testing): STORE_PATH, HANDWRITTEN_PATH.
const STORE = process.env.STORE_PATH ?? new URL('../src/data/youtube-videos.json', import.meta.url);
const HANDWRITTEN = process.env.HANDWRITTEN_PATH ?? new URL('../src/data/adventures.ts', import.meta.url);

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n));

// Titles on YouTube carry emoji, flags and hashtags; the site shows them plainer.
const cleanTitle = (t) =>
  t.replace(/#[\p{L}\p{N}_]+/gu, '').replace(/[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}️‍]/gu, '').replace(/\s*[|·]\s*(\|\s*)*/g, ' · ').replace(/(\s·)+\s*$/, '').replace(/^\s*·\s*/, '').replace(/\s{2,}/g, ' ').trim();

// First real paragraph of the description, without links, hashtags, chapters or mentions.
const cleanSummary = (d) => {
  const paras = d.split(/\n\s*\n/).map((p) => p.replace(/https?:\/\/\S+/g, '').replace(/[#@][\p{L}\p{N}_]+/gu, '').replace(/[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}️‍]/gu, '').replace(/\s+/g, ' ').trim());
  const p = paras.find((x) => x.length > 60 && !/^\d{1,2}:\d{2}/.test(x)) ?? paras.find((x) => x.length > 0) ?? '';
  return p.length > 420 ? p.slice(0, 417).replace(/\s+\S*$/, '') + '…' : p;
};

const slugify = (title, id) => {
  const words = title.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().match(/[a-z0-9]+/g) ?? [];
  const useful = words.filter((w) => !['the', 'a', 'an', 'in', 'on', 'of', 'and', 'to', 'part', 'my', 'i'].includes(w));
  return useful.length >= 2 ? useful.slice(0, 6).join('-') : `video-${id.toLowerCase()}`;
};

const res = await fetch(FEED, { headers: { 'User-Agent': 'Mozilla/5.0 (site sync)' } });
if (!res.ok) throw new Error(`YouTube feed returned ${res.status}`);
const xml = await res.text();

const store = JSON.parse(await readFile(STORE, 'utf8'));
const handwrittenIds = new Set([...(await readFile(HANDWRITTEN, 'utf8')).matchAll(/youtubeId:\s*'([^']+)'/g)].map((m) => m[1]));
const known = new Set([...handwrittenIds, ...store.videos.map((v) => v.youtubeId), ...store.hide]);
const slugs = new Set([...(await readFile(HANDWRITTEN, 'utf8')).matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]).concat(store.videos.map((v) => v.slug)));

const added = [];
for (const entry of xml.split('<entry>').slice(1)) {
  const get = (re) => entry.match(re)?.[1] ?? '';
  const id = get(/<yt:videoId>(.*?)<\/yt:videoId>/);
  const link = get(/<link rel="alternate" href="([^"]+)"/);
  const title = decode(get(/<title>([\s\S]*?)<\/title>/));
  const description = decode(get(/<media:description>([\s\S]*?)<\/media:description>/));
  const views = Number(get(/views="(\d+)"/) || 0);
  if (!id || known.has(id)) continue;
  if (link.includes('/shorts/')) continue; // Shorts stay on YouTube
  if (/live stream|livestream|premiere/i.test(title) || (views === 0 && !description.trim())) continue; // lives and not-yet-public uploads

  const clean = cleanTitle(title) || title;
  let slug = slugify(clean, id);
  while (slugs.has(slug)) slug = `${slug}-${id.slice(0, 4).toLowerCase()}`;
  slugs.add(slug);
  const summary = cleanSummary(description);
  const video = {
    slug,
    youtubeId: id,
    date: get(/<published>(.{10})/),
    title: { en: clean, bn: clean },
    summary: { en: summary, bn: summary },
    tags: [],
    auto: true,
  };
  store.videos.push(video);
  added.push(video);
}

if (added.length) {
  store.videos.sort((a, b) => b.date.localeCompare(a.date));
  await writeFile(STORE, JSON.stringify(store, null, 2) + '\n');
}
console.log(added.length ? `Added ${added.length} new video(s): ${added.map((v) => v.title.en).join(' | ')}` : 'No new videos.');
if (process.env.GITHUB_OUTPUT) await writeFile(process.env.GITHUB_OUTPUT, `added=${added.length}\n`, { flag: 'a' });
