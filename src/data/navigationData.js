// Navigation data - IATMSI-2027

export const navigationTree = [
  { id: 'home', label: 'HOME', type: 'link', path: '/' },
  {
    id: 'about',
    label: 'ABOUT',
    type: 'dropdown',
    items: [
      { id: 'about-iatmsi', label: 'ABOUT IATMSI-2027', path: '/about' },
      { id: 'history', label: 'IATMSI HISTORY', path: '/about/history' },
      { id: 'committees', label: 'IATMSI COMMITTEES', path: '/committee' },
      { id: 'track-chairs', label: 'TRACK CHAIRS', path: '/about/track-chairs' },
    ]
  },
  {
    id: 'for-authors',
    label: 'FOR AUTHORS',
    type: 'dropdown',
    items: [
      { id: 'camera-ready', label: 'INSTRUCTIONS FOR CAMERA READY PAPER SUBMISSION', path: '/authors/camera-ready' },
      { id: 'copyright', label: 'INSTRUCTIONS FOR IEEE E-COPYRIGHT SUBMISSION', path: '/authors/copyright' },
      { id: 'oral-guidelines', label: 'ORAL PRESENTER\'S GUIDELINES', path: '/authors/oral-guidelines' },
      { id: 'poster-guidelines', label: 'POSTER PRESENTER\'S GUIDELINES', path: '/authors/poster-guidelines' },
      { id: 'venue-travel', label: 'VENUE/TRAVEL', path: '/authors/venue-travel' },
      { id: 'gallery', label: 'GALLERY', path: '/authors/gallery' },
    ]
  },
  { id: 'call-for-papers', label: 'CALL FOR PAPERS', type: 'link', path: '/call-for-papers/tracks' },
  { id: 'conference-program', label: 'CONFERENCE PROGRAM', type: 'link', path: '/conference-program' },
  { id: 'paper-submission', label: 'PAPER SUBMISSION', type: 'link', path: '/call-for-papers/paper-submission' },
  { id: 'sponsorship', label: 'SPONSORSHIP/EXHIBITS', type: 'link', path: '/sponsorship' },
  { id: 'registration', label: 'REGISTRATION', type: 'link', path: '/registration' },
  { id: 'important-dates', label: 'IMPORTANT DATES', type: 'link', path: '/important-dates' },
  { id: 'call-for-reviewers', label: 'CALL FOR REVIEWERS', type: 'link', path: '/call-for-reviewers' },
  { id: 'workshops', label: 'WORKSHOPS/TUTORIALS', type: 'link', path: '/workshops' },
  {
    id: 'awards',
    label: 'AWARDS/GRANTS',
    type: 'dropdown',
    items: [
      { id: 'hardnovate', label: 'HARDNOVATE CONTEST', path: '/awards/hardnovate' },
      { id: 'rising-researcher', label: 'RISING RESEARCHER AWARD', path: '/awards/rising-researcher' },
      { id: 'excellence-research', label: 'EXCELLENCE IN RESEARCH AWARD', path: '/awards/excellence' },
      { id: 'doctoral-dissertation', label: 'IEEE DOCTORAL DISSERTATION AWARD', path: '/awards/doctoral' },
      { id: 'simulation-excellence', label: 'SIMULATION EXCELLENCE AWARD', path: '/awards/simulation' },
      { id: 'best-paper', label: 'BEST PAPER AWARDS', path: '/awards/best-paper' },
      { id: 'fellowships', label: 'FELLOWSHIPS (TRAVEL/REGISTRATION GRANTS)', path: '/awards/fellowships' },
    ]
  },
  { id: 'keynote', label: 'KEYNOTE AND INVITED TALKS', type: 'link', path: '/keynote' },
  {
    id: 'help',
    label: 'HELP',
    type: 'dropdown',
    items: [
      { id: 'contact', label: 'CONTACT US', path: '/contact' },
      { id: 'faqs', label: 'FAQS', path: '/help/faqs' },
    ]
  },
  {
    id: 'extra',
    label: 'EXTRA',
    type: 'dropdown',
    items: [
      { id: 'travel-visa', label: 'Travel Visa Info', path: '/travel/visa' },
      { id: 'explore-gwalior', label: 'Explore Gwalior', path: '/travel/explore-gwalior' },
    ]
  }
];
