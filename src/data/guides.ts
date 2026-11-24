// Travel guides, shown on /guides/. Each one gets a page at /guides/<slug>/.
// To publish a PDF: put the file in public/guides/ and set pdf.en and/or pdf.bn to '/guides/<file>.pdf'.
// With no PDF yet, the page shows "Coming soon".
import type { Lang } from '../i18n';

type T = Record<Lang, string>;

export interface Guide {
  slug: string;
  title: T;
  place: T;
  summary: T;
  cover?: string; // image path; if empty, the first related video's thumbnail is used
  videos: string[]; // related adventure slugs
  facts: { label: T; value: T }[];
  inside: T[]; // what the guide covers
  pdf?: Partial<Record<Lang, string>>;
  pages?: number;
}

const L = {
  start: { en: 'Start', bn: 'শুরু' },
  summit: { en: 'Summit', bn: 'চূড়া' },
  time: { en: 'Time', bn: 'সময়' },
  gain: { en: 'Elevation gain', bn: 'উচ্চতা অর্জন' },
  transport: { en: 'Getting there', bn: 'যাতায়াত' },
  region: { en: 'Region', bn: 'অঞ্চল' },
};

const commonInside: T[] = [
  { en: 'Route map with the trail, water points and camp spots', bn: 'ট্রেইল, পানির উৎস আর ক্যাম্প করার জায়গাসহ পথের মানচিত্র' },
  { en: 'Getting there and back by public transport', bn: 'পাবলিক ট্রান্সপোর্টে যাওয়া-আসা' },
  { en: 'Timings for each section of the walk', bn: 'হাঁটার প্রতিটি অংশের সময়' },
  { en: 'Packing list and food I carried', bn: 'যা যা নিতে হবে আর যে খাবার নিয়েছিলাম' },
  { en: 'Safety notes, weather and the best season', bn: 'নিরাপত্তা, আবহাওয়া আর সেরা মৌসুম' },
];

export const guides: Guide[] = [
  {
    slug: 'monte-petrella-overnight',
    title: { en: 'Monte Petrella overnight', bn: 'মন্টে পেত্রেলায় এক রাত' },
    place: { en: 'Monti Aurunci · Lazio', bn: 'মন্তি আউরুনচি · লাৎসিও' },
    summary: {
      en: 'A two-day solo hike to the highest peak of the Monti Aurunci, with a night on the mountain and dawn views over the Gulf of Gaeta.',
      bn: 'মন্তি আউরুনচির সর্বোচ্চ চূড়ায় দুই দিনের একার হাইক, পাহাড়ে এক রাত আর ভোরে গায়েতা উপসাগরের দৃশ্য।',
    },
    videos: ['monte-petrella'],
    facts: [
      { label: L.start, value: { en: 'Rifugio Pornito, 819 m', bn: 'রিফুজিও পরনিতো, ৮১৯ মি' } },
      { label: L.summit, value: { en: 'Monte Petrella, 1,533 m', bn: 'মন্টে পেত্রেলা, ১,৫৩৩ মি' } },
      { label: L.time, value: { en: '2 days, 1 night', bn: '২ দিন, ১ রাত' } },
      { label: L.gain, value: { en: '~700 m', bn: '~৭০০ মি' } },
    ],
    inside: commonInside,
  },
  {
    slug: 'monte-tarino-public-transport',
    title: { en: 'Monte Tarino by public transport', bn: 'পাবলিক ট্রান্সপোর্টে মন্টে তারিনো' },
    place: { en: 'Campo dell’Osso · Abruzzo', bn: 'ক্যাম্পো দেল’ওসো · আব্রুৎসো' },
    summary: {
      en: 'My first solo overnight hike: from Campo dell’Osso to the summit of Monte Tarino, a night in the tent and sunrise above the clouds, with no car needed.',
      bn: 'আমার প্রথম একার রাতের হাইক: ক্যাম্পো দেল’ওসো থেকে মন্টে তারিনোর চূড়া, তাঁবুতে এক রাত আর মেঘের ওপরে সূর্যোদয়, গাড়ি ছাড়াই।',
    },
    videos: ['monte-tarino', 'monte-tarino-night'],
    facts: [
      { label: L.start, value: { en: 'Campo dell’Osso', bn: 'ক্যাম্পো দেল’ওসো' } },
      { label: L.summit, value: { en: 'Monte Tarino, 1,961 m', bn: 'মন্টে তারিনো, ১,৯৬১ মি' } },
      { label: L.time, value: { en: 'Overnight', bn: 'এক রাত' } },
      { label: L.transport, value: { en: 'Public transport', bn: 'পাবলিক ট্রান্সপোর্ট' } },
    ],
    inside: commonInside,
  },
  {
    slug: 'gole-di-celano-monte-tino',
    title: { en: 'Gole di Celano and Monte Tino', bn: 'গোলে দি চেলানো ও মন্টে তিনো' },
    place: { en: 'Celano · Abruzzo', bn: 'চেলানো · আব্রুৎসো' },
    summary: {
      en: 'Through the Gole di Celano canyon, then up to the summit of Monte Tino to camp on the peak. Two films, one route.',
      bn: 'গোলে দি চেলানো গিরিখাত পার হয়ে মন্টে তিনোর চূড়ায় উঠে সেখানেই ক্যাম্প। দুটি ফিল্ম, একটি পথ।',
    },
    videos: ['gole-di-celano', 'monte-tino'],
    facts: [
      { label: L.start, value: { en: 'Celano', bn: 'চেলানো' } },
      { label: L.summit, value: { en: 'Monte Tino, 1,923 m', bn: 'মন্টে তিনো, ১,৯২৩ মি' } },
      { label: L.time, value: { en: 'Overnight', bn: 'এক রাত' } },
      { label: L.region, value: { en: 'Abruzzo, Italy', bn: 'আব্রুৎসো, ইতালি' } },
    ],
    inside: [
      { en: 'Canyon section: what to expect and how to stay safe', bn: 'গিরিখাতের অংশ: কী আশা করবেন আর কীভাবে নিরাপদ থাকবেন' },
      ...commonInside,
    ],
  },
  {
    slug: 'day-trips-from-rome',
    title: { en: 'Day trips from Rome by train', bn: 'রোম থেকে ট্রেনে ডে-ট্রিপ' },
    place: { en: 'Around Rome · Lazio', bn: 'রোমের আশপাশ · লাৎসিও' },
    summary: {
      en: 'Lakes, waterfalls and old towns you can reach from Rome without a car: Lake Martignano, Tivoli, Calcata and Monte Gelato.',
      bn: 'গাড়ি ছাড়াই রোম থেকে পৌঁছানো যায় এমন লেক, ঝরনা আর পুরোনো শহর: মার্তিনিয়ানো লেক, তিভোলি, কালকাতা আর মন্টে জেলাতো।',
    },
    videos: ['lake-martignano', 'tivoli', 'calcata-monte-gelato'],
    facts: [
      { label: L.start, value: { en: 'Rome', bn: 'রোম' } },
      { label: L.time, value: { en: 'One day each', bn: 'প্রতিটি এক দিন' } },
      { label: L.transport, value: { en: 'Train, bus, bicycle', bn: 'ট্রেন, বাস, সাইকেল' } },
      { label: L.region, value: { en: 'Lazio, Italy', bn: 'লাৎসিও, ইতালি' } },
    ],
    inside: [
      { en: 'How to get to each place from Rome, step by step', bn: 'রোম থেকে প্রতিটি জায়গায় কীভাবে যাবেন, ধাপে ধাপে' },
      { en: 'What to see and where to eat', bn: 'কী দেখবেন আর কোথায় খাবেন' },
      { en: 'Timings and the best season', bn: 'সময়সূচি আর সেরা মৌসুম' },
    ],
  },
];
