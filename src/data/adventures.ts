// Your long-form YouTube videos (from youtube.com/@JummanFootprints), newest first.
// Two sources, merged below:
//   1. the hand-written list in this file (with Bangla text, chapters, facts…), and
//   2. src/data/youtube-videos.json, which the hourly GitHub job fills with new uploads automatically.
// Every video gets its own page at /adventures/<slug>/.
import type { Lang } from '../i18n';
import synced from './youtube-videos.json';

type T = Record<Lang, string>;

export interface Chapter { t: string; en: string; bn: string }

export interface Video {
  slug: string;
  youtubeId: string;
  date: string; // upload date, YYYY-MM-DD
  duration?: string; // e.g. '14:29' (YouTube's feed doesn't give it, so auto-added videos have none)
  title: T;
  place?: T;
  summary: T;
  tags: string[]; // filter keys: overnight, summit, hiking, city, film
  facts?: { label: T; value: T }[];
  chapters?: Chapter[];
  series?: { id: string; part: number };
  auto?: boolean; // added automatically from YouTube
}

export const ytThumb = (id: string, size: 'maxresdefault' | 'hqdefault' = 'maxresdefault') =>
  `https://i.ytimg.com/vi/${id}/${size}.jpg`;
export const ytWatch = (id: string, t?: string) => {
  if (!t) return `https://www.youtube.com/watch?v=${id}`;
  const secs = t.split(':').reduce((acc, n) => acc * 60 + Number(n), 0);
  return `https://www.youtube.com/watch?v=${id}&t=${secs}s`;
};

const abruzzo: T = { en: 'Abruzzo, Italy', bn: 'আব্রুৎসো, ইতালি' };
const lazio: T = { en: 'Lazio, Italy', bn: 'লাৎসিও, ইতালি' };

const handWritten: Video[] = [
  {
    slug: 'monte-tino',
    youtubeId: 'ZQpJaiFlDUI',
    date: '2026-10-03',
    duration: '14:29',
    title: { en: 'Monte Tino summit: overnight camping on the peak', bn: 'মন্টে তিনোর চূড়া: পাহাড়ের মাথায় রাতের ক্যাম্প' },
    place: { en: 'Monte Tino · Abruzzo', bn: 'মন্টে তিনো · আব্রুৎসো' },
    summary: {
      en: 'After the Gole di Celano canyon in Part 1, we push on with heavy packs to the summit of Monte Tino (1,923 m) and camp overnight on the peak, with storm clouds brewing and a hard trail ahead.',
      bn: 'প্রথম পর্বে গোলে দি চেলানো গিরিখাত পার হওয়ার পর, ভারী ব্যাগ কাঁধে আমরা উঠে যাই মন্টে তিনোর চূড়ায় (১,৯২৩ মিটার)। মাথার ওপর জমছে ঝড়ের মেঘ, সামনে কঠিন পথ, আর রাত কাটে পাহাড়ের চূড়াতেই।',
    },
    tags: ['overnight', 'summit', 'hiking'],
    facts: [
      { label: { en: 'Summit', bn: 'চূড়া' }, value: { en: 'Monte Tino, 1,923 m', bn: 'মন্টে তিনো, ১,৯২৩ মিটার' } },
      { label: { en: 'Region', bn: 'অঞ্চল' }, value: abruzzo },
    ],
    chapters: [
      { t: '00:00', en: 'Intro', bn: 'শুরু' },
      { t: '00:28', en: 'Hike goal', bn: 'হাইকের লক্ষ্য' },
      { t: '05:19', en: 'Base camp', bn: 'বেস ক্যাম্প' },
      { t: '06:47', en: 'Summit push', bn: 'চূড়ার পথে' },
      { t: '10:22', en: 'Sunrise', bn: 'সূর্যোদয়' },
      { t: '12:42', en: 'Return', bn: 'ফেরা' },
    ],
    series: { id: 'celano-tino', part: 2 },
  },
  {
    slug: 'gole-di-celano',
    youtubeId: 'TXLO6TOXd98',
    date: '2026-09-09',
    duration: '10:54',
    title: { en: 'Gole di Celano: an easy hike, but not what I expected', bn: 'গোলে দি চেলানো: সহজ হাইক, কিন্তু যেমন ভেবেছিলাম তেমন নয়' },
    place: { en: 'Celano · Abruzzo', bn: 'চেলানো · আব্রুৎসো' },
    summary: {
      en: 'Deep into the Gole di Celano canyon, between towering rock walls and huge boulders. What looks like a simple walk turns into a different kind of hike as the trail goes deeper into the gorge.',
      bn: 'গোলে দি চেলানো গিরিখাতের গভীরে, উঁচু পাথুরে দেয়াল আর বিশাল বোল্ডারের মাঝ দিয়ে। শুরুতে সহজ হাঁটা মনে হলেও, পথ যত ভেতরে যায়, হাইকটা ততই অন্যরকম হয়ে ওঠে।',
    },
    tags: ['hiking'],
    facts: [
      { label: { en: 'Trail', bn: 'ট্রেইল' }, value: { en: 'Gole di Celano canyon', bn: 'গোলে দি চেলানো গিরিখাত' } },
      { label: { en: 'Region', bn: 'অঞ্চল' }, value: abruzzo },
    ],
    chapters: [
      { t: '00:00', en: 'Intro', bn: 'শুরু' },
      { t: '01:10', en: 'Starting the hike', bn: 'হাইক শুরু' },
      { t: '01:45', en: 'Gole di Celano trail', bn: 'গোলে দি চেলানো ট্রেইল' },
      { t: '05:02', en: 'How to stay safe', bn: 'কীভাবে নিরাপদ থাকবেন' },
      { t: '09:34', en: 'Final view', bn: 'শেষ দৃশ্য' },
    ],
    series: { id: 'celano-tino', part: 1 },
  },
  {
    slug: 'monte-tarino-night',
    youtubeId: 'eFUUMMfbiTs',
    date: '2026-08-05',
    duration: '14:33',
    title: { en: 'What was the night like on the mountain peak?', bn: 'পাহাড়ের চূড়ায় রাতটা আসলে কেমন ছিল?' },
    place: { en: 'Monte Tarino · Abruzzo', bn: 'মন্টে তারিনো · আব্রুৎসো' },
    summary: {
      en: 'Part 2 of my solo overnight hike from Campo dell’Osso to Monte Tarino: the quiet after sunset, cooking dinner by the campfire, a night alone in the tent, and a sunrise above the clouds.',
      bn: 'ক্যাম্পো দেল’ওসো থেকে মন্টে তারিনো পর্যন্ত আমার একার রাতের হাইকের দ্বিতীয় পর্ব: সূর্য ডোবার পর পাহাড়ের নীরবতা, ক্যাম্পফায়ারের পাশে নিজের হাতে রান্না, তাঁবুতে একা রাত, আর মেঘের ওপরে ভোরের প্রথম আলো।',
    },
    tags: ['overnight', 'summit'],
    facts: [
      { label: { en: 'Summit', bn: 'চূড়া' }, value: { en: 'Monte Tarino, 1,961 m', bn: 'মন্টে তারিনো, ১,৯৬১ মিটার' } },
      { label: { en: 'Getting there', bn: 'যাতায়াত' }, value: { en: 'Public transport', bn: 'পাবলিক ট্রান্সপোর্ট' } },
    ],
    chapters: [
      { t: '00:00', en: 'Intro', bn: 'শুরু' },
      { t: '00:12', en: 'Sunset at camp', bn: 'ক্যাম্পে সূর্যাস্ত' },
      { t: '03:43', en: 'Campfire', bn: 'ক্যাম্পফায়ার' },
      { t: '05:19', en: 'Mountain night', bn: 'পাহাড়ের রাত' },
      { t: '06:34', en: 'Sunrise', bn: 'সূর্যোদয়' },
      { t: '09:08', en: 'Hiking down', bn: 'নেমে আসা' },
      { t: '10:54', en: 'The final walk', bn: 'শেষ হাঁটা' },
    ],
    series: { id: 'tarino', part: 2 },
  },
  {
    slug: 'monte-tarino',
    youtubeId: 'iw32CGiGvW0',
    date: '2026-07-30',
    duration: '13:42',
    title: { en: 'A night on an Italian mountain peak', bn: 'ইতালির পাহাড়চূড়ায় এক রাত' },
    place: { en: 'Campo dell’Osso → Monte Tarino', bn: 'ক্যাম্পো দেল’ওসো → মন্টে তারিনো' },
    summary: {
      en: 'My first solo overnight hike: walking alone into the mountains, cooking my own food and spending a night in a tent, from sunset to sunrise. Part 1 covers the climb, the summit, setting up camp and the campfire.',
      bn: 'আমার জীবনের প্রথম একার রাতের হাইক: একা পাহাড়ে হাঁটা, নিজের হাতে রান্না, তাঁবুতে এক রাত, সূর্যাস্ত থেকে সূর্যোদয়। প্রথম পর্বে আছে চড়াই, চূড়ায় পৌঁছানো, ক্যাম্প সেটআপ আর ক্যাম্পফায়ার।',
    },
    tags: ['overnight', 'summit'],
    facts: [
      { label: { en: 'Summit', bn: 'চূড়া' }, value: { en: 'Monte Tarino, 1,961 m', bn: 'মন্টে তারিনো, ১,৯৬১ মিটার' } },
      { label: { en: 'Getting there', bn: 'যাতায়াত' }, value: { en: 'Public transport', bn: 'পাবলিক ট্রান্সপোর্ট' } },
    ],
    chapters: [
      { t: '00:00', en: 'Intro', bn: 'শুরু' },
      { t: '00:10', en: 'Goal of the hike', bn: 'হাইকের লক্ষ্য' },
      { t: '01:41', en: 'First viewpoint', bn: 'প্রথম ভিউপয়েন্ট' },
      { t: '05:25', en: 'Food check', bn: 'খাবারের হিসাব' },
      { t: '06:17', en: 'Summit climb', bn: 'চূড়ায় ওঠা' },
      { t: '08:10', en: 'Summit', bn: 'চূড়া' },
      { t: '09:29', en: 'Camping', bn: 'ক্যাম্পিং' },
      { t: '13:33', en: 'Amar Bangla', bn: 'আমার বাংলা' },
    ],
    series: { id: 'tarino', part: 1 },
  },
  {
    slug: 'perugia',
    youtubeId: 'aZu3AEgQbpw',
    date: '2026-07-28',
    duration: '6:41',
    title: { en: 'Perugia: exploring an 800-year-old medieval city', bn: 'পেরুজা: ৮০০ বছরের পুরোনো মধ্যযুগীয় শহরে' },
    place: { en: 'Perugia · Umbria', bn: 'পেরুজা · উমব্রিয়া' },
    summary: {
      en: 'An underrated hilltop city in Umbria: medieval streets, the underground fortress of Rocca Paolina, the Fontana Maggiore and the Etruscan arch.',
      bn: 'উমব্রিয়ার পাহাড়চূড়ার এক অবহেলিত রত্ন: মধ্যযুগীয় গলি, রোক্কা পাওলিনার মাটির নিচের দুর্গ, ফন্তানা মাজ্জোরে আর এট্রুস্কান যুগের তোরণ।',
    },
    tags: ['city'],
    chapters: [
      { t: '00:00', en: 'Intro & map', bn: 'শুরু ও মানচিত্র' },
      { t: '01:21', en: 'Rocca Paolina museum', bn: 'রোক্কা পাওলিনা জাদুঘর' },
      { t: '02:47', en: 'Fontana Maggiore', bn: 'ফন্তানা মাজ্জোরে' },
      { t: '05:15', en: 'Arco Etrusco', bn: 'আর্কো এট্রুস্কো' },
      { t: '06:02', en: 'Glimpse of Siena', bn: 'সিয়েনার এক ঝলক' },
    ],
  },
  {
    slug: 'monte-autore',
    youtubeId: 'rx2fxpsFLco',
    date: '2026-07-27',
    duration: '8:46',
    title: { en: 'My first solo summit: Campo dell’Osso to Monte Autore', bn: 'আমার প্রথম একার চূড়া: ক্যাম্পো দেল’ওসো থেকে মন্টে আউতোরে' },
    place: { en: 'Monte Autore · Lazio', bn: 'মন্টে আউতোরে · লাৎসিও' },
    summary: {
      en: 'A special day: my first summit alone. No guide and no company, just me and the mountain. Steep climbs, wide views, and the moment of reaching the top.',
      bn: 'জীবনের একটা বিশেষ দিন: প্রথমবার একা একা চূড়ায় ওঠা। কোনো গাইড নেই, কোনো সঙ্গী নেই, শুধু আমি আর পাহাড়। খাড়া চড়াই, বিস্তৃত দৃশ্য, আর চূড়ায় পৌঁছানোর সেই মুহূর্ত।',
    },
    tags: ['summit', 'hiking'],
    facts: [
      { label: { en: 'Summit', bn: 'চূড়া' }, value: { en: 'Monte Autore, 1,854 m', bn: 'মন্টে আউতোরে, ১,৮৫৪ মিটার' } },
      { label: { en: 'Region', bn: 'অঞ্চল' }, value: lazio },
    ],
    chapters: [
      { t: '00:40', en: 'Trailhead: the journey begins', bn: 'ট্রেইলহেড: যাত্রা শুরু' },
      { t: '05:57', en: 'Final push to Monte Autore', bn: 'মন্টে আউতোরের শেষ চড়াই' },
      { t: '07:44', en: 'Summit moment (1,854 m)', bn: 'চূড়ার মুহূর্ত (১,৮৫৪ মিটার)' },
    ],
  },
  {
    slug: 'lake-martignano',
    youtubeId: 'ZoU9vMtwLSk',
    date: '2026-07-03',
    duration: '8:16',
    title: { en: 'The best summer day trip from Rome: Lake Martignano', bn: 'রোম থেকে গ্রীষ্মের সেরা ডে-ট্রিপ: মার্তিনিয়ানো লেক' },
    place: { en: 'Lake Martignano · Lazio', bn: 'মার্তিনিয়ানো লেক · লাৎসিও' },
    summary: {
      en: 'This time the water called. A train out of Rome, bicycles from the station, a lake nobody really talks about, a kayak on still water, and one quiet second before the jump.',
      bn: 'এবার পাহাড় নয়, ডাকল পানি। রোম থেকে ট্রেন, স্টেশন থেকে সাইকেল, এমন এক লেক যার কথা কেউ তেমন বলে না, শান্ত পানিতে কায়াক, আর লাফ দেওয়ার আগের এক নিঃশব্দ মুহূর্ত।',
    },
    tags: ['film'],
    facts: [
      { label: { en: 'Getting there', bn: 'যাতায়াত' }, value: { en: 'Train + bicycle from Rome, no car', bn: 'রোম থেকে ট্রেন + সাইকেল, গাড়ি লাগে না' } },
      { label: { en: 'Shot on', bn: 'ক্যামেরা' }, value: { en: 'Sony A7 IV · DJI Mini 5 Pro · Osmo 360', bn: 'Sony A7 IV · DJI Mini 5 Pro · Osmo 360' } },
    ],
    chapters: [
      { t: '00:00', en: 'Intro', bn: 'শুরু' },
      { t: '00:36', en: 'Cycling to the lake', bn: 'সাইকেলে লেকের পথে' },
      { t: '05:20', en: 'Kayaking on Lake Martignano', bn: 'মার্তিনিয়ানো লেকে কায়াকিং' },
      { t: '07:23', en: 'The boat jump', bn: 'নৌকা থেকে লাফ' },
    ],
  },
  {
    slug: 'rome-night-ride',
    youtubeId: 'DkkD4M-hv-0',
    date: '2026-06-20',
    duration: '7:47',
    title: { en: 'Rome night ride: Colosseum, Trevi Fountain & Pantheon in 4K', bn: 'রাতের রোমে সাইকেল: কলোসিয়াম, ত্রেভি ফাউন্টেন ও প্যানথিয়ন' },
    place: { en: 'Rome · Lazio', bn: 'রোম · লাৎসিও' },
    summary: {
      en: 'A late-night bike ride through the Eternal City: the Colosseum, Trevi Fountain, Spanish Steps, Pantheon and Piazza Navona, quiet streets and golden light.',
      bn: 'চিরন্তন শহরে গভীর রাতের সাইকেল যাত্রা: কলোসিয়াম, ত্রেভি ফাউন্টেন, স্প্যানিশ স্টেপস, প্যানথিয়ন আর পিয়াৎসা নাভোনা। নিরিবিলি রাস্তা আর সোনালি আলো।',
    },
    tags: ['city', 'film'],
  },
  {
    slug: 'monte-petrella',
    youtubeId: 'N6jRs3DAGwk',
    date: '2026-06-19',
    duration: '16:38',
    title: { en: 'A night alone in Italy’s hidden mountains: Monte Petrella', bn: 'ইতালির লুকানো পাহাড়ে একা এক রাত: মন্টে পেত্রেলা' },
    place: { en: 'Monti Aurunci · Lazio', bn: 'মন্তি আউরুনচি · লাৎসিও' },
    summary: {
      en: 'The highest peak of the Monti Aurunci, Monte Petrella (1,533 m): a solo overnight hike from Rifugio Pornito, a night on the mountain, and at dawn the Gulf of Gaeta, Vesuvius and the Pontine Islands. The first time this mountain’s story has been told in Bangla.',
      bn: 'মন্তি আউরুনচির সর্বোচ্চ চূড়া মন্টে পেত্রেলা (১,৫৩৩ মিটার): রিফুজিও পরনিতো থেকে একার রাতের হাইক, চড়াই, তাঁবু, রাত, আর ভোরের আলোয় গায়েতা উপসাগর, ভিসুভিয়াস আর পন্টিন দ্বীপপুঞ্জ। ইতালির এই পাহাড়ের গল্প বাংলায় এই প্রথম।',
    },
    tags: ['overnight', 'summit'],
    facts: [
      { label: { en: 'Route', bn: 'পথ' }, value: { en: 'Rifugio Pornito (819 m) → Eremo di San Michele → summit (1,533 m)', bn: 'রিফুজিও পরনিতো (৮১৯ মি) → এরেমো দি সান মিকেলে → চূড়া (১,৫৩৩ মি)' } },
      { label: { en: 'Duration', bn: 'সময়' }, value: { en: '2 days, 1 night', bn: '২ দিন, ১ রাত' } },
      { label: { en: 'Elevation gain', bn: 'উচ্চতা অর্জন' }, value: { en: '~700 m', bn: '~৭০০ মিটার' } },
    ],
    chapters: [
      { t: '00:00', en: 'Intro', bn: 'শুরু' },
      { t: '01:23', en: 'Rifugio Pornito: the trail begins', bn: 'রিফুজিও পরনিতো: ট্রেইল শুরু' },
      { t: '04:49', en: 'Base camp: night on the peak', bn: 'বেস ক্যাম্প: পাহাড়ের চূড়ায় রাত' },
      { t: '10:58', en: 'Second day: the 1,533 m summit', bn: 'দ্বিতীয় দিন: ১,৫৩৩ মিটার চূড়া জয়' },
    ],
  },
  {
    slug: 'florence-winter',
    youtubeId: 'Jhyckatp4N4',
    date: '2025-12-22',
    duration: '2:41',
    title: { en: 'A winter in Florence: Christmas lights 2025', bn: 'ফ্লোরেন্সে এক শীত: ক্রিসমাসের আলো ২০২৫' },
    place: { en: 'Florence · Tuscany', bn: 'ফ্লোরেন্স · তুসকানি' },
    summary: {
      en: 'A short cinematic film of Florence at Christmas: quieter, warmer and timeless. Glowing streets and calm moments between ancient walls. Not rushed, not loud.',
      bn: 'ক্রিসমাসের ফ্লোরেন্স নিয়ে একটি ছোট সিনেমাটিক ফিল্ম: আরও শান্ত, আরও উষ্ণ, কালজয়ী। আলোকিত রাস্তা আর প্রাচীন দেয়ালের মাঝে শান্ত মুহূর্ত। তাড়াহুড়ো নেই, কোলাহল নেই।',
    },
    tags: ['film', 'city'],
  },
  {
    slug: 'siena',
    youtubeId: 'ea56Uh1gd0I',
    date: '2025-08-30',
    duration: '12:15',
    title: { en: 'Siena: the city of the world’s first bank', bn: 'যে শহরে বিশ্বের প্রথম ব্যাংক: সিয়েনা' },
    place: { en: 'Siena · Tuscany', bn: 'সিয়েনা · তুসকানি' },
    summary: {
      en: 'A 4K walking tour of UNESCO-listed Siena, a jewel of the Middle Ages: home of Monte dei Paschi, founded in 1472, a striking cathedral and medieval architecture.',
      bn: 'ইউনেস্কো ঐতিহ্যবাহী সিয়েনায় 4K হাঁটা ভ্রমণ, মধ্যযুগের আসল রত্ন: ১৪৭২ সালে প্রতিষ্ঠিত মন্টে দেই পাসকি ব্যাংক, দৃষ্টিনন্দন ক্যাথেড্রাল আর মধ্যযুগীয় স্থাপত্য।',
    },
    tags: ['city'],
  },
  {
    slug: 'calcata-monte-gelato',
    youtubeId: 't0UDIzjhZbE',
    date: '2025-08-18',
    duration: '22:22',
    title: { en: 'Ancient city, hidden waterfall: Calcata to Monte Gelato', bn: 'প্রাচীন শহর, লুকানো ঝরনা: কালকাতা থেকে মন্টে জেলাতো' },
    place: { en: 'Calcata · Lazio', bn: 'কালকাতা · লাৎসিও' },
    summary: {
      en: 'A hike that starts in the medieval village of Calcata and ends at a waterfall hidden in the forest at Monte Gelato. History, nature and adventure in one walk.',
      bn: 'এক হাইক, যার শুরু প্রাচীন মধ্যযুগীয় শহর কালকাতায়, আর শেষ ঘন জঙ্গলে লুকানো মন্টে জেলাতোর ঝরনায়। ইতিহাস, প্রকৃতি আর অ্যাডভেঞ্চার একসাথে।',
    },
    tags: ['hiking', 'city'],
  },
  {
    slug: 'monte-argentario',
    youtubeId: 'qBFO033Nx7Y',
    date: '2025-07-08',
    duration: '5:26',
    title: { en: 'Mountains, cliffs and sea: Monte Argentario', bn: 'পাহাড়, ক্লিফ আর সাগরের মাঝে: মন্টে আর্জেন্তারিও' },
    place: { en: 'Porto Santo Stefano · Tuscany', bn: 'পোর্তো সান্তো স্তেফানো · তুসকানি' },
    summary: {
      en: 'From an old seaside town up to the heights of Monte Argentario, with the blue sea below and centuries-old watchtowers along the coast.',
      bn: 'পুরোনো সৈকত শহর ছেড়ে মন্টে আর্জেন্তারিওর উঁচুতে, নিচে নীল সমুদ্র আর উপকূলজুড়ে শত বছরের পুরোনো ওয়াচটাওয়ার।',
    },
    tags: ['hiking'],
  },
  {
    slug: 'torre-paola',
    youtubeId: 'mRxMBBp_Gmc',
    date: '2025-06-28',
    duration: '15:07',
    title: { en: 'A trail between lake and sea: Torre Paola', bn: 'লেক ও সাগরের মাঝে অসাধারণ ট্রেইল: তোরে পাওলা' },
    place: { en: 'Torre Paola · Lazio', bn: 'তোরে পাওলা · লাৎসিও' },
    summary: {
      en: 'A calm lake on one side, the open sea on the other. This hike was my first big adventure in Europe.',
      bn: 'এক পাশে শান্ত লেক, আরেক পাশে বিশাল সমুদ্র। এই হাইকটাই ছিল ইউরোপে আমার প্রথম বড় অ্যাডভেঞ্চার।',
    },
    tags: ['hiking'],
  },
  {
    slug: 'reggia-di-caserta',
    youtubeId: 'f1U2YF9iOr0',
    date: '2025-06-03',
    duration: '12:30',
    title: { en: 'What’s inside the world’s biggest royal palace?', bn: 'বিশ্বের সবচেয়ে বড় রাজপ্রাসাদে কী আছে?' },
    place: { en: 'Reggia di Caserta · Campania', bn: 'রেজ্জা দি কাসের্তা · কাম্পানিয়া' },
    summary: {
      en: 'A tour of the Reggia di Caserta in southern Italy, recognised as the largest royal palace in the world, with more than 1,200 rooms.',
      bn: 'দক্ষিণ ইতালির রেজ্জা দি কাসের্তা ঘুরে দেখা, যা পৃথিবীর সবচেয়ে বড় রাজপ্রাসাদ হিসেবে স্বীকৃত, আর যেখানে কক্ষ আছে ১,২০০-রও বেশি।',
    },
    tags: ['city'],
  },
  {
    slug: 'tivoli',
    youtubeId: 'dehaQbhwz4E',
    date: '2025-05-09',
    duration: '11:55',
    title: { en: 'Italy’s 400-year-old fountains, powered by gravity', bn: 'ইতালির ৪০০ বছরের ঝর্ণা, চলে পাহাড়ি পানিতে' },
    place: { en: 'Tivoli · Lazio', bn: 'তিভোলি · লাৎসিও' },
    summary: {
      en: 'In Tivoli, fountains have run for centuries with no pumps at all, only mountain water and gravity. The history, beauty and engineering behind them.',
      bn: 'তিভোলিতে শতাব্দী ধরে ঝর্ণা চলছে কোনো পাম্প ছাড়াই, শুধু পাহাড়ি পানি আর মাধ্যাকর্ষণের জোরে। এর পেছনের ইতিহাস, সৌন্দর্য আর প্রকৌশল।',
    },
    tags: ['city'],
  },
];

// Hand-written entries win; auto-added ones fill in everything new, minus anything listed in "hide".
const hidden = new Set<string>(synced.hide);
const handIds = new Set(handWritten.map((v) => v.youtubeId));
export const videos: Video[] = [
  ...handWritten,
  ...(synced.videos as Video[]).filter((v) => !handIds.has(v.youtubeId)),
]
  .filter((v) => !hidden.has(v.youtubeId))
  .sort((a, b) => b.date.localeCompare(a.date));

export const filterTags = ['all', 'overnight', 'summit', 'hiking', 'city', 'film', 'expedition'];

/** Older story from before the channel, with its own hand-written page. */
export const drakensberg = {
  slug: 'drakensberg',
  date: '2022-03-01',
  title: { en: 'Eight days solo on the Drakensberg', bn: 'ড্রাকেন্সবার্গের চূড়ায়, একা আট দিন' },
  place: { en: 'South Africa / Lesotho', bn: 'দক্ষিণ আফ্রিকা / লেসোথো' },
  tags: ['expedition', 'hiking'],
};
