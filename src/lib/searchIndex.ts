// Builds the site search index at build time (served as /search.json and /bn/search.json).
// Everything that has a page is included automatically: videos, lessons, guides, gear and main pages.
import { videos, drakensberg } from '../data/adventures';
import { lessons } from '../data/lessons';
import { guides } from '../data/guides';
import { gear, categories } from '../data/gear';
import { localize, ui, type Lang } from '../i18n';

export interface Entry {
  type: string; // label shown on the result
  title: string;
  alt: string; // the title in the other language, so either language finds it
  text: string; // searchable body text (also used for the snippet)
  url: string;
  thumb?: string;
}

const plain = (s: string) =>
  s.replace(/\$\$[\s\S]+?\$\$/g, ' ').replace(/\$[^$]+\$/g, ' ').replace(/\*\*|_/g, '').replace(/\s+/g, ' ').trim();

const types = {
  en: { video: 'Adventure', lesson: 'Lesson', guide: 'Guide', gear: 'Gear', page: 'Page' },
  bn: { video: 'অভিযান', lesson: 'পাঠ', guide: 'গাইড', gear: 'সরঞ্জাম', page: 'পাতা' },
};

const pages: { url: string; title: Record<Lang, string>; text: Record<Lang, string> }[] = [
  { url: '/adventures/', title: { en: 'Adventures', bn: 'অভিযান' }, text: { en: 'Every trip, every film. Solo hikes, mountain nights and historic cities.', bn: 'প্রতিটি যাত্রা, প্রতিটি ফিল্ম। একা হাইক, পাহাড়ের রাত আর ঐতিহাসিক শহর।' } },
  { url: '/gear/', title: { en: 'Gear', bn: 'সরঞ্জাম' }, text: { en: 'Camera, drone, audio, hiking and camping gear.', bn: 'ক্যামেরা, ড্রোন, অডিও, হাইকিং আর ক্যাম্পিং সরঞ্জাম।' } },
  { url: '/guides/', title: { en: 'Travel guides', bn: 'ট্রাভেল গাইড' }, text: { en: 'Route guides with maps, public transport, timings and packing lists.', bn: 'মানচিত্র, পাবলিক ট্রান্সপোর্ট, সময় আর প্যাকিং তালিকাসহ পথনির্দেশিকা।' } },
  { url: '/learn/', title: { en: 'Learn', bn: 'শিখুন' }, text: { en: 'Free lessons on cinematography, maths and physics.', bn: 'সিনেমাটোগ্রাফি, গণিত আর পদার্থবিজ্ঞানের বিনামূল্যের পাঠ।' } },
  { url: '/learn/math-physics/', title: { en: 'Math & Physics', bn: 'গণিত ও পদার্থবিজ্ঞান' }, text: { en: 'An interactive trail from π to quantum mechanics.', bn: 'π থেকে কোয়ান্টাম মেকানিক্স পর্যন্ত ইন্টারঅ্যাকটিভ পথ।' } },
  { url: '/learn/cinematography/', title: { en: 'Cinematography', bn: 'সিনেমাটোগ্রাফি' }, text: { en: 'Framing, lenses, colour and grading in DaVinci Resolve.', bn: 'ফ্রেমিং, লেন্স, রং আর DaVinci Resolve-এ গ্রেডিং।' } },
  { url: '/now/', title: { en: 'Now', bn: 'এখন' }, text: { en: 'What I am working on this month: short film, next trip to Norway, learning.', bn: 'এই মাসে কী নিয়ে কাজ করছি: শর্ট ফিল্ম, নরওয়ের পরের যাত্রা, শেখা।' } },
  { url: '/journal/', title: { en: 'Journal', bn: 'জার্নাল' }, text: { en: 'Loose thoughts and field notes from the trail.', bn: 'ট্রেইল থেকে ছোট ভাবনা ও মাঠের নোট।' } },
  { url: '/about/', title: { en: 'About', bn: 'পরিচিতি' }, text: { en: 'About Jumman: Rome, Bangladesh, cinematic adventure films in Bangla. Contact.', bn: 'জুম্মান সম্পর্কে: রোম, বাংলাদেশ, বাংলায় সিনেমাটিক অ্যাডভেঞ্চার ফিল্ম। যোগাযোগ।' } },
];

export function buildIndex(lang: Lang): Entry[] {
  const o: Lang = lang === 'en' ? 'bn' : 'en';
  const t = types[lang];
  const tag = (k: string) => `${ui.en.tags[k] ?? ''} ${ui.bn.tags[k] ?? ''}`;
  const out: Entry[] = [];

  for (const v of videos) {
    out.push({
      type: t.video,
      title: v.title[lang],
      alt: v.title[o],
      text: [v.place?.[lang] ?? '', v.place?.[o] ?? '', v.summary[lang], v.tags.map(tag).join(' '), v.chapters?.map((c) => c[lang]).join(' ') ?? ''].join(' · '),
      url: localize(`/adventures/${v.slug}/`, lang),
      thumb: `https://i.ytimg.com/vi/${v.youtubeId}/mqdefault.jpg`,
    });
  }
  out.push({ type: t.video, title: drakensberg.title[lang], alt: drakensberg.title[o], text: `${drakensberg.place[lang]} · ${drakensberg.place[o]}`, url: localize(`/adventures/${drakensberg.slug}/`, lang) });

  for (const ls of lessons) {
    out.push({
      type: t.lesson,
      title: ls.title[lang],
      alt: ls.title[o],
      text: [ls.standfirst[lang], ...ls.steps.map((s) => `${s.title?.[lang] ?? ''} ${plain(s.body[lang])}`)].join(' · ').slice(0, 1500),
      url: localize(`/learn/${ls.slug}/`, lang),
    });
  }

  for (const g of guides) {
    const v = videos.find((x) => x.slug === g.videos[0]);
    out.push({
      type: t.guide,
      title: g.title[lang],
      alt: g.title[o],
      text: [g.place[lang], g.place[o], g.summary[lang]].join(' · '),
      url: localize(`/guides/${g.slug}/`, lang),
      thumb: v ? `https://i.ytimg.com/vi/${v.youtubeId}/mqdefault.jpg` : undefined,
    });
  }

  for (const g of gear.filter((x) => !x.placeholder)) {
    const c = categories.find((x) => x.id === g.category)!;
    out.push({ type: t.gear, title: g.name, alt: c.title[lang], text: `${g.note[lang]} · ${c.title[o]}`, url: localize(`/gear/#${g.category}`, lang) });
  }

  for (const p of pages) out.push({ type: t.page, title: p.title[lang], alt: p.title[o], text: p.text[lang], url: localize(p.url, lang) });

  return out;
}
