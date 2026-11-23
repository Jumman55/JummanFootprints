// One settings file: name and links live here so the template stays reusable.
export const site = {
  name: 'JUMMAN',
  // TODO: replace with your real contact email
  email: '',
  social: {
    youtube: 'https://www.youtube.com/@JummanFootprints',
    instagram: 'https://www.instagram.com/jummanfootprints/',
    facebook: 'https://www.facebook.com/profile.php?id=61575965342306',
  },
  youtubeSubscribe: 'https://www.youtube.com/@JummanFootprints?sub_confirmation=1',
  // TODO: point this at your newsletter provider's form endpoint (Buttondown, ConvertKit, etc.)
  newsletterAction: '',
};

export const navLinks = [
  { id: 'adventures', href: '/adventures/' },
  { id: 'learn', href: '/learn/' },
  { id: 'now', href: '/now/' },
  { id: 'journal', href: '/journal/' },
  { id: 'about', href: '/about/' },
] as const;

export type NavId = 'home' | (typeof navLinks)[number]['id'];
