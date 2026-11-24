// Your gear, shown on /gear/. Add an item by copying an entry.
// `image`: put a photo in public/images/gear/ and write '/images/gear/name.jpg'.
// `link`: the product page or an affiliate link (if you add affiliate links, set `affiliate: true` on the item).
// `videos`: slugs from src/data/adventures.ts where this gear was used.
import type { Lang } from '../i18n';

type T = Record<Lang, string>;

export interface GearItem {
  name: string;
  category: 'camera' | 'aerial' | 'audio' | 'hiking' | 'software';
  note: T;
  image?: string;
  link?: string;
  affiliate?: boolean;
  videos?: string[];
  placeholder?: boolean; // true = not filled in yet; shown dimmed
}

export const categories: { id: GearItem['category']; title: T; blurb: T }[] = [
  { id: 'camera', title: { en: 'Camera & lens', bn: 'ক্যামেরা ও লেন্স' }, blurb: { en: 'One body, one lens. Everything in the films is shot on this.', bn: 'একটি বডি, একটি লেন্স। ফিল্মের সবকিছু এতেই শুট করা।' } },
  { id: 'aerial', title: { en: 'Drone & 360', bn: 'ড্রোন ও ৩৬০' }, blurb: { en: 'For the wide shots that show how big the mountain really is.', bn: 'যে চওড়া শটগুলো দেখায় পাহাড় আসলে কত বড়।' } },
  { id: 'audio', title: { en: 'Audio', bn: 'অডিও' }, blurb: { en: 'Narration and the sound of the trail.', bn: 'ধারাবর্ণনা আর ট্রেইলের শব্দ।' } },
  { id: 'hiking', title: { en: 'Hiking & camping', bn: 'হাইকিং ও ক্যাম্পিং' }, blurb: { en: 'What I carry for a night on a summit.', bn: 'চূড়ায় এক রাতের জন্য যা সাথে নিই।' } },
  { id: 'software', title: { en: 'Edit & grade', bn: 'এডিট ও গ্রেড' }, blurb: { en: 'Where the footage becomes a film.', bn: 'যেখানে ফুটেজ হয়ে ওঠে ফিল্ম।' } },
];

export const gear: GearItem[] = [
  {
    name: 'Sony Alpha 7 IV',
    category: 'camera',
    note: { en: 'My main camera. I shoot in S-Log3 so there is room to grade the colour later.', bn: 'আমার প্রধান ক্যামেরা। S-Log3-এ শুট করি, যাতে পরে রং গ্রেড করার জায়গা থাকে।' },
    videos: ['lake-martignano'],
  },
  {
    name: '20 mm lens',
    category: 'camera',
    note: { en: 'Wide enough for big landscapes and for filming myself at arm’s length.', bn: 'বড় ল্যান্ডস্কেপের জন্য যথেষ্ট চওড়া, আবার হাত বাড়িয়ে নিজেকে শুট করার জন্যও।' },
  },
  {
    name: 'DJI Mini 5 Pro',
    category: 'aerial',
    note: { en: 'Light enough to carry to a summit. Shot in D-Log M.', bn: 'চূড়া পর্যন্ত বয়ে নেওয়ার মতো হালকা। D-Log M-এ শুট করা।' },
    videos: ['lake-martignano'],
  },
  {
    name: 'DJI Osmo 360',
    category: 'aerial',
    note: { en: 'For the shots no one else could film when I’m alone on the trail.', bn: 'একা ট্রেইলে থাকলে যে শটগুলো আর কেউ নিতে পারত না, তার জন্য।' },
    videos: ['lake-martignano'],
  },
  { name: '[Microphone]', category: 'audio', placeholder: true, note: { en: '[What you use to record narration and sound.]', bn: '[ধারাবর্ণনা আর শব্দ রেকর্ড করতে কী ব্যবহার করেন।]' } },
  { name: '[Backpack]', category: 'hiking', placeholder: true, note: { en: '[Model and size, and why.]', bn: '[মডেল, আকার, আর কেন।]' }, videos: ['monte-tino'] },
  { name: '[Tent]', category: 'hiking', placeholder: true, note: { en: '[Your tent for summit nights.]', bn: '[চূড়ার রাতের জন্য আপনার তাঁবু।]' }, videos: ['monte-tarino', 'monte-petrella'] },
  { name: '[Sleeping bag]', category: 'hiking', placeholder: true, note: { en: '[Comfort temperature, weight.]', bn: '[আরামদায়ক তাপমাত্রা, ওজন।]' } },
  { name: '[Stove]', category: 'hiking', placeholder: true, note: { en: '[What you cook on.]', bn: '[কী দিয়ে রান্না করেন।]' }, videos: ['monte-tarino-night'] },
  {
    name: 'DaVinci Resolve',
    category: 'software',
    note: { en: 'Editing, colour grading and subtitles, all in one place.', bn: 'এডিটিং, কালার গ্রেডিং আর সাবটাইটেল, সব এক জায়গায়।' },
    link: 'https://www.blackmagicdesign.com/products/davinciresolve',
  },
];
