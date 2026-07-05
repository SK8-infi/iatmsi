// Navigation data — ICGST-2026

export const navigationTree = [
  {
    id: 'home',
    label: 'Home',
    type: 'link',
    path: '/',
  },
  {
    id: 'about',
    label: 'About',
    type: 'link',
    path: '/about',
  },
  {
    id: 'call-for-papers',
    label: 'Call for Papers',
    type: 'dropdown',
    items: [
      { id: 'tracks', label: 'Tracks', path: '/call-for-papers/tracks' },
      { id: 'dates', label: 'Important Dates', path: '/important-dates' },
      { id: 'submission', label: 'Paper Submission', path: '/call-for-papers/paper-submission' },
      { id: 'reviewers', label: 'Call for Reviewers', path: '/call-for-reviewers' },
    ],
  },
  {
    id: 'registration',
    label: 'Registration',
    type: 'link',
    path: '/registration',
  },
  {
    id: 'travel',
    label: 'Travel',
    type: 'dropdown',
    items: [
      { id: 'visa', label: 'Visa Info', path: '/travel/visa' },
      { id: 'venue', label: 'Venue & Directions', path: '/travel/venue' },
      { id: 'explore', label: 'Explore Gwalior', path: '/travel/explore-gwalior' },
    ],
  },
  {
    id: 'committee',
    label: 'Committee',
    type: 'link',
    path: '/committee',
  },
  {
    id: 'contact',
    label: 'Contact Us',
    type: 'link',
    path: '/contact',
  },
];
