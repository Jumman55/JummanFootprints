// Languages: English lives at /, Bangla at /bn/. Every page exists in both.
export type Lang = 'en' | 'bn';
export const langs: Lang[] = ['en', 'bn'];

export function getLang(url: URL): Lang {
  return url.pathname === '/bn' || url.pathname.startsWith('/bn/') ? 'bn' : 'en';
}

/** Turn an English path ("/about/") into the path for `lang` ("/bn/about/"). */
export function localize(path: string, lang: Lang): string {
  if (lang === 'en' || /^(https?:|mailto:|#)/.test(path)) return path;
  return path === '/' ? '/bn/' : `/bn${path}`;
}

/** The same page in the other language. */
export function switchPath(url: URL): string {
  const p = url.pathname;
  if (/^\/(bn\/)?404/.test(p)) return getLang(url) === 'bn' ? '/' : '/bn/';
  if (getLang(url) === 'bn') return p.replace(/^\/bn(\/|$)/, '/');
  return p === '/' ? '/bn/' : `/bn${p}`;
}

const bnDigitMap = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
/** Write digits in Bangla script when the page is Bangla. */
export function digits(s: string | number, lang: Lang): string {
  const str = String(s);
  return lang === 'bn' ? str.replace(/\d/g, (d) => bnDigitMap[+d]) : str;
}

export function monthYear(iso: string, lang: Lang): string {
  const d = new Date(iso + 'T12:00:00Z');
  return lang === 'bn'
    ? d.toLocaleDateString('bn-BD', { month: 'long', year: 'numeric', timeZone: 'UTC' })
    : d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });
}

export function fullDate(iso: string, lang: Lang): string {
  const d = new Date(iso + 'T12:00:00Z');
  return d.toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

/** Shared interface text (nav, footer, buttons). Page copy lives next to each page's markup. */
export const ui = {
  en: {
    nav: { adventures: 'Adventures', gear: 'Gear', guides: 'Guides', learn: 'Learn', now: 'Now', journal: 'Journal', about: 'About' },
    tagline: 'Footprints',
    homeLabel: 'Jumman Footprints, home',
    search: 'Search (coming soon)',
    switchLabel: 'Switch to Bangla',
    skip: 'Skip to content',
    footerBlurb: 'One place, my name, my data. Every adventure and lesson lives here first, then everywhere else.',
    explore: 'Explore',
    elsewhere: 'Elsewhere',
    newsletter: 'Newsletter',
    footerNote: '© 2026 Jumman · Rome',
    builtWith: 'Built with the Footprints template',
    nl: {
      eyebrow: 'Newsletter',
      title1: 'Follow the footprints,',
      title2: 'not the algorithm.',
      body: 'A short letter when a new adventure or lesson goes up. No platform can take it away.',
      label: 'Email address',
      button: 'Subscribe',
      note: 'Unsubscribe anytime.',
      thanks: 'Thanks! Sign-ups open soon.',
    },
    watchOnYouTube: 'Watch on YouTube',
    tags: { all: 'All', overnight: '#overnight', summit: '#summit', hiking: '#hiking', city: '#city', film: '#film', expedition: '#expedition' } as Record<string, string>,
  },
  bn: {
    nav: { adventures: 'অভিযান', gear: 'সরঞ্জাম', guides: 'গাইড', learn: 'শিখুন', now: 'এখন', journal: 'জার্নাল', about: 'পরিচিতি' },
    tagline: 'ফুটপ্রিন্টস',
    homeLabel: 'জুম্মান ফুটপ্রিন্টস, হোম',
    search: 'খুঁজুন (শিগগিরই আসছে)',
    switchLabel: 'Switch to English',
    skip: 'মূল লেখায় যান',
    footerBlurb: 'এক জায়গা, আমার নাম, আমার তথ্য। প্রতিটি অভিযান আর পাঠ আগে এখানে আসে, তারপর অন্য সব জায়গায়।',
    explore: 'ঘুরে দেখুন',
    elsewhere: 'অন্যান্য জায়গায়',
    newsletter: 'নিউজলেটার',
    footerNote: '© ২০২৬ জুম্মান · রোম',
    builtWith: 'Footprints টেমপ্লেটে তৈরি',
    nl: {
      eyebrow: 'নিউজলেটার',
      title1: 'অ্যালগরিদম নয়,',
      title2: 'পায়ের ছাপ অনুসরণ করুন।',
      body: 'নতুন কোনো অভিযান বা পাঠ এলে একটা ছোট চিঠি। কোনো প্ল্যাটফর্ম এটা কেড়ে নিতে পারবে না।',
      label: 'ইমেইল ঠিকানা',
      button: 'সাবস্ক্রাইব',
      note: 'যেকোনো সময় আনসাবস্ক্রাইব করতে পারবেন।',
      thanks: 'ধন্যবাদ! সাইন-আপ শিগগিরই চালু হবে।',
    },
    watchOnYouTube: 'YouTube-এ দেখুন',
    tags: { all: 'সব', overnight: '#রাতের_ক্যাম্প', summit: '#চূড়া', hiking: '#হাইকিং', city: '#শহর', film: '#ফিল্ম', expedition: '#অভিযান' } as Record<string, string>,
  },
} as const;
